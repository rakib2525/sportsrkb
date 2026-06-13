# RKBSports.app Content Guide

This guide explains how to add high-quality local guide articles without
creating thin pages, copied content, or official team/league-branded pages.

## Where guide files live

Add guide files in:

```text
content/guides/
```

Use one Markdown file per guide:

```text
content/guides/example-guide-slug.md
```

The file name should match the `slug` frontmatter value.

## Required frontmatter

Every guide must start with frontmatter:

```yaml
---
title: "Example Cricket Guide"
slug: "example-cricket-guide"
metaTitle: "Example Cricket Guide"
metaDescription: "A clear 140-160 character description of the article."
excerpt: "A short summary used on guide cards."
category: "Team metrics"
updatedAt: "2026-06-13"
relatedTools: ["run-rate-calculator"]
relatedGuides: ["what-is-run-rate-in-cricket"]
intro: "One useful opening paragraph."
explanation:
  - "A plain-language explanation paragraph."
  - "Another useful explanation paragraph."
formula:
  label: "Formula label"
  value: "Runs / overs"
  note: "A short note about correct usage."
example:
  title: "Example"
  steps: "Step one.|Step two.|Step three."
faqs:
  - question: "Question one?"
    answer: "Helpful answer one."
  - question: "Question two?"
    answer: "Helpful answer two."
---
```

Use `relatedTools` and `relatedGuides` slugs that already exist. Keep FAQ
answers original and directly useful.

## Article body

Write the main article below the frontmatter in Markdown. Supported body content
for now:

- `##` headings
- `###` headings
- paragraphs
- simple `-` bullet lists

The content engine is intentionally small so the site stays fast and easy to
maintain.

## SEO writing checklist

- Use one clear search intent per article.
- Write an original title and meta description.
- Make the introduction answer the main question quickly.
- Include examples where the topic involves a calculation or rule scenario.
- Add internal links through `relatedTools` and `relatedGuides`.
- Keep headings descriptive rather than keyword-stuffed.
- Avoid repeating the same paragraph structure across many articles.

## AdSense-friendly checklist

- Keep content informational, helpful, and safe for general audiences.
- Do not add streaming links, live match claims, fake scores, betting prompts, or
  misleading download language.
- Do not use copied images, player photos, team logos, league logos, or official
  branding.
- Do not create doorway pages, spun pages, or thin pages made only to target a
  keyword.
- Use clear disclaimers when a tool is an estimate or a planning helper.

## Avoid thin content

Recommended article length: 800-1500 words once the guide is production-ready.

A starter guide can be shorter during development, but it must still contain:

- a useful intro
- clear explanation
- formula or rule breakdown when relevant
- a practical example
- FAQs
- internal links

Do not publish many near-identical pages with only small wording changes.

## Avoid copyrighted or team-branded content

RKBSports.app should stay generic and independent:

- Do not create official IPL, BPL, team, or franchise pages.
- Do not copy rulebook text verbatim.
- Do not use team/player images, official logos, or league badges.
- Use generic examples such as "Team A" and "Team B".

## Internal linking rules

- Link each guide to at least one relevant calculator when available.
- Link to one or two closely related guides.
- Do not force unrelated links.
- Keep links useful for readers, not just search engines.

## Publishing checklist

Before publishing a new guide:

- [ ] Frontmatter is complete.
- [ ] Slug is unique and matches the file name.
- [ ] Meta description is specific and not duplicated.
- [ ] Content is original and useful.
- [ ] No official team/league branding is used.
- [ ] No fake live score/API/demo data is included.
- [ ] Related tools and related guides exist.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
