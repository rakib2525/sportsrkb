import fs from "node:fs";
import path from "node:path";

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideFormula = {
  label: string;
  value: string;
  note: string;
};

export type GuideExample = {
  title: string;
  steps: string[];
};

export type GuideArticle = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  updatedAt: string;
  relatedTools: string[];
  relatedGuides: string[];
  faqs: GuideFaq[];
  intro: string;
  explanation: string[];
  formula?: GuideFormula;
  example: GuideExample;
  body: string;
};

type FrontmatterValue =
  | string
  | string[]
  | GuideFaq[]
  | GuideFormula
  | GuideExample
  | Record<string, string>
  | Array<Record<string, string>>;
type Frontmatter = Record<string, FrontmatterValue>;

const guidesDirectory = path.join(process.cwd(), "content", "guides");

export function getAllGuides(): GuideArticle[] {
  return fs
    .readdirSync(guidesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => getGuideFromFile(fileName))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export const guides = getAllGuides();

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

function getGuideFromFile(fileName: string): GuideArticle {
  const filePath = path.join(guidesDirectory, fileName);
  const rawContent = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(rawContent);

  const title = readString(frontmatter, "title");
  const slug = readString(frontmatter, "slug");
  const faqs = readFaqs(frontmatter);
  const formula = readFormula(frontmatter);
  const example = readExample(frontmatter);

  return {
    title,
    slug,
    metaTitle: readString(frontmatter, "metaTitle"),
    metaDescription: readString(frontmatter, "metaDescription"),
    excerpt: readString(frontmatter, "excerpt"),
    category: readString(frontmatter, "category"),
    updatedAt: readString(frontmatter, "updatedAt"),
    relatedTools: readStringArray(frontmatter, "relatedTools"),
    relatedGuides: readStringArray(frontmatter, "relatedGuides"),
    faqs,
    intro: readString(frontmatter, "intro"),
    explanation: readStringArray(frontmatter, "explanation"),
    formula,
    example,
    body: body.trim(),
  };
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Guide content is missing frontmatter.");
  }

  return {
    frontmatter: parseYamlSubset(match[1]),
    body: match[2],
  };
}

function parseYamlSubset(source: string): Frontmatter {
  const lines = source.split(/\r?\n/);
  const result: Frontmatter = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      continue;
    }

    const fieldMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!fieldMatch) {
      continue;
    }

    const key = fieldMatch[1];
    const inlineValue = fieldMatch[2]?.trim();

    if (inlineValue) {
      result[key] = parseScalarOrInlineArray(inlineValue);
      continue;
    }

    const blockLines: string[] = [];
    while (index + 1 < lines.length && lines[index + 1].startsWith("  ")) {
      index += 1;
      blockLines.push(lines[index]);
    }

    result[key] = parseBlock(blockLines);
  }

  return result;
}

function parseScalarOrInlineArray(value: string) {
  const cleaned = stripQuotes(value);

  if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
    return cleaned
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return cleaned;
}

function parseBlock(lines: string[]) {
  if (lines.every((line) => line.trim().startsWith("- "))) {
    return lines.map((line) => stripQuotes(line.trim().slice(2)));
  }

  if (lines.some((line) => line.trim().startsWith("- "))) {
    return parseObjectList(lines);
  }

  return parseObject(lines);
}

function parseObject(lines: string[]) {
  const object: Record<string, string> = {};

  for (const line of lines) {
    const match = line.trim().match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (match) {
      object[match[1]] = stripQuotes(match[2].trim());
    }
  }

  return object;
}

function parseObjectList(lines: string[]) {
  const items: Array<Record<string, string>> = [];
  let current: Record<string, string> | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      current = {};
      items.push(current);
      const firstField = trimmed.slice(2).match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (firstField) {
        current[firstField[1]] = stripQuotes(firstField[2].trim());
      }
      continue;
    }

    const field = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (field && current) {
      current[field[1]] = stripQuotes(field[2].trim());
    }
  }

  return items;
}

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function readString(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Guide frontmatter is missing required string: ${key}`);
  }
  return value;
}

function readStringArray(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Guide frontmatter is missing required string array: ${key}`);
  }
  return value as string[];
}

function readFaqs(frontmatter: Frontmatter) {
  const value = frontmatter.faqs;
  if (!Array.isArray(value)) {
    throw new Error("Guide frontmatter is missing required FAQ list.");
  }
  return value as GuideFaq[];
}

function readFormula(frontmatter: Frontmatter) {
  const value = frontmatter.formula;
  if (!isFrontmatterObject(value)) {
    return undefined;
  }
  return {
    label: readObjectString(value, "label"),
    value: readObjectString(value, "value"),
    note: readObjectString(value, "note"),
  };
}

function readExample(frontmatter: Frontmatter) {
  const value = frontmatter.example;
  if (!isFrontmatterObject(value)) {
    throw new Error("Guide frontmatter is missing required example object.");
  }
  return {
    title: readObjectString(value, "title"),
    steps: readObjectString(value, "steps")
      .split("|")
      .map((step) => step.trim())
      .filter(Boolean),
  };
}

function isFrontmatterObject(
  value: FrontmatterValue | undefined,
): value is Record<string, string> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readObjectString(object: Record<string, string>, key: string) {
  const value = object[key];
  if (!value) {
    throw new Error(`Guide object frontmatter is missing required field: ${key}`);
  }
  return value;
}
