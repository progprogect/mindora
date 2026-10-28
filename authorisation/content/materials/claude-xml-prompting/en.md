# Claude XML Prompting

Prompting Claude with XML tags — the technique that brings order to your prompts and sharpens the accuracy of the answers.

**XML** tags · **ready-made** examples · **free updates** forever

> 💡 Most people talk to Claude the way they would text a friend. That works fine for quick questions. But when you need Claude to work like a specialist, you have to interact with it like a system. XML tags are exactly what that takes. This template walks you through the structure, the logic behind every tag, and hands you a blueprint you can use straight away.

## Why XML tags change everything

Claude was trained to recognise XML tags as structural boundaries. When you wrap your instructions in tags like `<role>` or `<task>`, Claude doesn't just read your words. It **parses** them. It knows where your role definition ends and your task begins. It knows which part is context and which part is the actual instruction. The difference is real. When you type everything as one stream of text, you're hoping Claude works out what matters. When you type it in XML, Claude knows exactly what each piece of information is and how to use it. **Plain-text prompt:**

```
You are a business strategist. I want you to analyse my startup idea.
My idea is a mobile app for dog walking.
Give me the market risks, the target audience profiles
and your recommendations. Be detailed and be direct.
```

**The same request, but in an XML structure:**

```
<role>
You are a pragmatic business strategist with experience in
analysing business ideas for real-world viability.

</role>

<task>
Analyse the proposed business idea objectively. Consider its genuine
strengths and its potential weaknesses. Deliver a balanced, objective
assessment together with a recommendation.

</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
with real-time GPS tracking and automated scheduling.

</business_idea>

<response_format>
Business overview, 3 target profiles with their pain points, market
risks, alternative models, and a final recommendation.

</response_format>
```

The XML version lets Claude tell the roles apart cleanly. It understands that the role is separate from the task, that the business idea is input data, and that the response format is an output specification. That separation is precisely what produces clearer, better-structured answers.

* * *

## The 8 tags that turn a prompt into a megaprompt

You won't always need every one of these. Pick the ones your task genuinely calls for. Treat it as a menu, not a checklist.

### `<role>` — What Claude becomes

Tell Claude which role to play. The more specific the role, the more specialised the output. **Weak:** `You are a marketing expert.` **Strong:** `You are a copywriter who specialises in conversion-focused email and builds onboarding sequences for users of B2B SaaS products.` You need to spell out three things: the expertise, the specialisation, and the context (industry, audience, or application).

```
<role>
You are a specialist in conversion-focused email, specialising in
onboarding sequences for users of B2B SaaS products. You put
clarity of copy ahead of cleverness, and you always tie the copy back to the user's problems.
</role>
```

* * *

### `<goal>` — What success looks like

This is the overall outcome. Not the steps, not the format. Just the end goal. Keep it to 1-2 sentences. If you need more than that, your goal is probably several goals wearing a trench coat, and you should split them into separate prompts.

```
<goal>
Create a 5-email onboarding sequence that reduces user churn in the
first 14 days by addressing the 3 main reasons users abandon the product.

</goal>
```

* * *

### `<key_tasks>` — A step-by-step guide

Break the work into numbered steps. This stops Claude from skipping parts or reshuffling your logic. Each step should be one clear action.

```
<key_tasks>
Step 1: Identify the 3 main reasons for user churn from the feedback provided.

Step 2: Map each churn reason to a specific email in the sequence.

Step 3: Write the subject lines and body copy for all 5 emails.

Step 4: Add a suggested send schedule with the reasoning behind the timing.

</key_tasks>
```

💡**When to skip this tag:** If your task is simple enough to describe in a single sentence, you don't need `<key_tasks>`. The `<goal>` tag will handle it.

* * *

### `<response_structure>` — How Claude should think

This tag controls tone, depth, and persona. It's about the *character* of the answer, not the *format* (that's `<response_format>`, further down).

```
<response_structure>
- Give detailed, actionable recommendations (not surface-level advice).
- Use a direct, conversational tone. No corporate jargon.
- Take the perspective of an experienced copywriter reviewing a junior writer's draft.
- Where relevant, reference real examples from SaaS companies.
</response_structure>
```

* * *

* * *

### `<session_structure>` — How the conversation should unfold

Use this when you want Claude to run a multi-step conversation rather than dumping everything into one answer. It sets the interaction pattern.

```
<session_structure>
- Approach: Guided problem-solving.

- Start with 3 clarifying questions about my product and my target audience.

- Once I answer, give me a draft outline of the email sequence for approval.

- Only write the full emails after I approve the plan.

</session_structure>
```

💡**When to skip this tag:** If you want everything in a single answer, drop this tag entirely.

* * *

### `<examples>` — Show Claude what good looks like

A handful of examples is the most powerful steering tool you have. One convincing example beats a whole paragraph of instructions. Give Claude the inputs and the outputs you want back. Label them clearly.

```
<examples>
Example 1:
Input: "Users say the dashboard is confusing."
Output:

Subject: Your dashboard, simplified
Body: Hi [Name], we hear you. The dashboard can feel overwhelming
on day one. Here's a 2-minute video covering
the 3 panels you'll use every day...

Example 2:
Input: "Users forget to finish setup."
Output:
Subject: You're 80% there (one step left)
Body: Hi [Name], you started something good. Your account is set up,
your team is invited, but there's one setting that unlocks [key feature]...
</examples>
```

* * *

### `<information_about_me>` — Your context data

Give Claude detailed information about your business, your audience, your product, or your situation. This is the raw material Claude works with. Include only the variables that are relevant to your goal and your tasks. Random background information just adds noise.

```
<information_about_me>
- Product: TaskFlow, a SaaS project-management solution for remote teams (10-50 employees)
- Main churn reasons: 1) Dashboard overload, 2) Incomplete onboarding,

3) No integration with existing tools
- Brand voice: Friendly, direct, slightly informal. Never corporate.

- Current onboarding: One welcome email, no follow-up sequence.

</information_about_me>
```

* * *

### `<response_format>` — The blueprint for the output

Tell Claude exactly what the finished result should look like. This is where you define the format, not the tone.

```
<response_format>
For each email, give:
1. Email number and send day (for example, "Email 1 - Day 0")
2. Subject line
3. Body copy (150-200 words)
4. Call-to-action button text
5. An internal note explaining the strategic purpose of this email

Deliver the emails in numbered order, not as a table.

</response_format>
```

* * *

## Quick reference — when to use each tag

| Tag | When to use it | When not to use it |
| --- | --- | --- |
| `<role>` | You need specialist knowledge | The task is general knowledge |
| `<goal>` | Always use it | Never skip it |
| `<key_tasks>` | Multi-step work in a specific order | Simple, single-action tasks |
| `<response_structure>` | Tone, depth, or character matter to you | Claude's default tone works fine |
| `<session_structure>` | You want a guided, multi-turn flow | You want everything done in one go |
| `<examples>` | You have a specific output style in mind | You're exploring a topic and want Claude's own take |
| `<information_about_me>` | Claude needs your specific context | The task is hypothetical or general |
| `<response_format>` | You need a specific output shape | You don't mind Claude making its own call |

* * *

## The full template (copy and customise)

Take this outline, fill in what you need, and delete what you don't. Tag names are flexible. You can rename them however you like (for example, `<brand_info>` instead of `<information_about_me>`, `<steps>` instead of `<key_tasks>`, and so on). Claude reads the structure, not the exact tag name.

```
<role>
[Which expert role should Claude take on? Specify the expertise,
the specialisation, and the industry context.]
</role>

<goal>
[What is the single desired outcome? Keep it to 1-2 sentences.]
</goal>

<key_tasks>
Step 1: [First action]
Step 2: [Second action]
Step 3: [Third action]
</key_tasks>

<response_structure>
- [Guidance on tone and depth]
- [Persona or perspective to adopt]
- [Any stylistic constraints]
</response_structure>

<session_structure>
- [Interaction approach: single answer or multiple turns]
- [Who leads: you or Claude?]
- [Any checkpoints or approvals required]
</session_structure>

<examples>
Example 1:
Input: [Sample input]
Output: [The exact result you would like to see]
</examples>

<information_about_me>
- [Relevant detail #1]
- [Relevant detail #2]
- [Relevant detail #3]
</information_about_me>

<response_format>
[Exact output structure: list, table, prose, code block, and so on]
[Any length or formatting constraints]
</response_format>
```

* * *

## Full example — business idea validator

Here's a ready-to-run prompt you can test right now. It combines role, task, context, and a structured response format.

```
<role>
You are a pragmatic business strategist with experience analysing
business ideas for real-world viability.

</role>

<task>
Analyse the proposed business idea objectively, considering its genuine
strengths and its potential weaknesses. Create 3 hypothetical customer profiles,
and have each one give realistic feedback. Close the analysis with a clear verdict
and a recommendation.

</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
with real-time GPS tracking and automated scheduling.

</business_idea>

<response_format>
Structure your answer as follows:
1. Overview of the business idea (2-3 sentences)
2. Potential target markets
3. Three target audience profiles, each with age, occupation, pain points, and their
honest reaction to this product (written in the first person)
4. Market risks
5. Alternative business models worth considering
6. Final assessment and recommendation (be direct, not diplomatic)
</response_format>
```

💡Note that the `<response_format>` tag uses a numbered list to describe the output structure, but it does not force Claude to convert the data into XML. You are structuring the **input** for Claude; you are not demanding a rigid **output format**. Let Claude write naturally within the structure you've defined.

* * *

* * *

☰ Contents

↑
