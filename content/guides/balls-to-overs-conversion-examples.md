---
title: "Balls to Overs Conversion Examples"
slug: "balls-to-overs-conversion-examples"
metaTitle: "Balls to Overs Conversion Examples"
metaDescription: "Learn how to convert balls to cricket overs and overs to balls with clear examples for run rate and NRR calculations."
excerpt: "A practical guide to cricket over notation, legal balls, invalid overs like 4.6, and conversion examples."
category: "Cricket basics"
updatedAt: "2026-06-13"
relatedTools: ["balls-to-overs-converter", "run-rate-calculator", "nrr-calculator"]
relatedGuides: ["cricket-overs-and-balls-explained", "how-to-convert-balls-to-overs-in-cricket", "common-net-run-rate-mistakes"]
intro: "Cricket overs use a special format where the digit after the dot means balls, not decimal parts."
explanation:
  - "Six legal balls make one over."
  - "A value like 4.3 means 4 overs and 3 balls, which equals 27 balls."
formula:
  label: "Balls to overs"
  value: "Overs = full overs + remaining balls"
  note: "27 balls becomes 4.3 overs, while 4.6 is invalid because six balls complete the next over."
example:
  title: "Conversion example"
  steps: "Convert 39 balls.|39 divided by 6 gives 6 full overs with 3 balls left.|The cricket over format is 6.3 overs."
faqs:
  - question: "What does 4.3 overs mean?"
    answer: "It means 4 overs and 3 balls, or 27 legal balls."
  - question: "Is 4.6 overs valid?"
    answer: "No. After 4 overs and 5 balls, the next legal ball completes 5.0 overs."
  - question: "Why do calculators need decimal overs?"
    answer: "Run rate formulas divide by decimal overs, so cricket overs must be converted safely."
  - question: "Do wides count as balls?"
    answer: "Wides are not legal balls in standard scoring, so they do not increase the legal ball count."
---

## Why cricket overs are different

Cricket overs look like decimals, but they are not normal decimal numbers. The value after the dot counts balls in the current over. Because one over has six legal balls, the second digit can only be 0, 1, 2, 3, 4, or 5.

This is why 4.3 overs means 4 overs and 3 balls. It does not mean 4.3 ordinary overs. The difference matters when calculating run rate, economy rate, partnership run rate, and net run rate.

## Balls to overs examples

To convert balls to overs, divide by 6. The whole number is completed overs. The remainder is balls in the next over.

For 27 balls, 27 divided by 6 is 4 full overs with 3 balls left. The cricket format is 4.3 overs.

For 48 balls, 48 divided by 6 is exactly 8 overs. The cricket format is 8.0 overs.

For 59 balls, 59 divided by 6 is 9 full overs with 5 balls left. The cricket format is 9.5 overs.

## Overs to balls examples

To convert cricket overs to balls, multiply completed overs by 6 and add the ball part.

4.3 overs equals 4 times 6 plus 3, which is 27 balls.

7.5 overs equals 7 times 6 plus 5, which is 47 balls.

12.0 overs equals 12 times 6 plus 0, which is 72 balls.

## Why 4.6 is invalid

The value 4.6 looks natural if you think in decimals, but it is invalid in cricket notation. After 4 overs and 5 legal balls, the next legal delivery completes the over. The score should move to 5.0 overs, not 4.6.

Good calculators should reject overs ending in .6 or higher. A friendly message can explain: use cricket format like 4.3 for 4 overs and 3 balls.

## Decimal overs for formulas

Run rate formulas need decimal overs because division uses normal math. If a team scores 45 runs in 4.3 overs, the innings lasted 27 balls. Decimal overs are 27 divided by 6, or 4.5 overs. The run rate is 45 divided by 4.5, which equals 10.00.

If someone divides 45 by 4.3 directly, the answer is wrong because 4.3 was treated as a decimal.

## Legal and illegal balls

Only legal deliveries count toward overs. Wides and no-balls add runs or penalties, but they do not usually count as legal balls. Byes and leg byes can happen on legal balls, so they may count toward the over depending on the delivery.

For simple run rate and NRR calculations, use the official legal overs from the scorecard.

## Practical calculator use

The balls-to-overs converter is helpful when a scorer records balls, while the run rate calculator and NRR calculator need safe over handling. If you are entering a local tournament table, convert carefully before saving standings.

Once you understand the six-ball structure, most cricket math becomes easier. Many beginner mistakes come from treating cricket overs like ordinary decimals.

## Quick checking habit

Before using any score in a calculator, pause for a few seconds and check the over value. If the ball part is 6 or higher, rewrite it before calculating. If the innings ended after a wicket or chase, use the official legal balls actually faced. This small habit prevents wrong run rates, wrong economy rates, and wrong NRR estimates from spreading through a local score sheet.
