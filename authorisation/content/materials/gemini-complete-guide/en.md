# The Complete Gemini Guide

Google AI at full power — Gemini in Gmail, Docs, Drive and beyond: models, Gems, prompts and a full crash course in one place.

**238** ready-made prompts and templates**30** key principles**6** crash course chapters**126** interface screenshots**1M** tokens of context

[🚀 Start here](#что-gemini-может-сделать-для-вас)[🎓 Prompt crash course](#мини-курс-по-инженерии-промптов-gemini)[💎 Ready-made Gems](#готовые-базовые-gems)

## Gemini 4 Argon: Practical Section

**Updated October 22, 2026.** Gemini 4 Argon is Google's model for complex tasks, including work with code and professional materials. Google announced its availability in the Gemini app for eligible Pro and Ultra plans, and for developers through AI Studio and the Gemini platform. Available features depend on the product and account you choose. Google subscriptions and API usage are not included in the price of the guide.

### How to Get Started

1.  Open Gemini and check whether Gemini 4 Argon is available to you. If you use the API, check the model and its limits in the current documentation for your chosen platform.
2.  Prepare your materials and name the final result. For a large document, first ask for a map of sections and a list of questions.
3.  Ask the model to separate facts from your files from assumptions. Check the result on a small set of examples before applying it to the whole task.

### Copy and Adapt to Your Task

Document → action plan

Analyze the attached materials for \[goal\]. First list the sections and the significant constraints. Then build a plan: action → basis in the document → owner → dependency → completion criterion. Do not invent deadlines or owners; if they are missing, mark them "to be determined". For the bases, cite fragments of the source.

Check a spreadsheet

Check the attached spreadsheet. First describe the columns, units of measurement and gaps. Find duplicates, inconsistent formats and suspicious values. For each finding, give the row or cell and an explanation. Then suggest checks that I can repeat on my own. Do not fix the data without explaining.

Prepare an app

I need an app for \[audience\] that solves \[problem\]. First ask up to five questions about the requirements. After my answers, build a user scenario, a list of screens, a data model and acceptance criteria. Start with a minimum working version. For the code, explain how to run and verify the result.

### Checking the Result

Check the model's availability in your account, the accuracy of references to your materials, and the reproducibility of calculations. The ability to upload a file does not by itself confirm that its analysis is correct.

Official documentation: [Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/).

Also, at the end of this guide, be sure to check out the prompt generator section — a mega juicy bonus from us is waiting for you there. It's not even a prompt library! It's 1 of 350 ready-made assistants that writes absolutely any prompts for Gemini AI, 1000 times more effective, for any task. All 350 assistants, plus thousands of ready-made skills, are waiting for you with any subscription to the platform.

Hi! In front of you is the **complete guide to Google Gemini** — from your first prompt to working with Gemini in Gmail, Docs and the entire Google workspace.

**What's inside:**

-   🔑 **30 key principles of prompt engineering** and a **crash course of 6 chapters** with exercises — jump in from the table of contents.
-   💎 **Ready-made Gems** with system prompts that take a couple of minutes to set up.
-   📝 **The Gemini mega-prompt template** — a structure that improves any request.
-   🚀 **The "Prompt Generator for Any Task" section** — an assistant asks you questions and writes an expert Gemini prompt for any task.

Just getting started? Begin with the "What can Gemini do for you?" section, and from there go straight to the crash course.

> 👇🏻 Just click the arrow ▶ to expand each section and see more detail!

## 🪄What Can Gemini Do for You?

**Gemini** is a cutting-edge series of artificial intelligence models from Google DeepMind that understands and generates text, images, audio, video and code on a single platform. It powers AI features across the whole Google ecosystem — from Search and Gmail to Android, Drive and even apps like Android Auto — helping users write, solve problems and get things done more efficiently.

> **Answering questions and general information.**

Every major large language model has core functionality for answering questions and helping with writing; Gemini is no exception. You can have natural conversations, ask questions, and get help with tasks like writing emails and blog posts, brainstorming ideas, drafting content and much more.

> **Multimodal file analysis**

Gemini is especially strong at analyzing uploaded files, because it is built to process several types of input at once, such as text, images and video. Its deep integration with the Google ecosystem makes it even more powerful, since it can access context from your Google Drive, Gmail and other connected services to provide more personalized and in-depth insights.

**Content summarization:**

Gemini's **context window, which holds 1 million tokens**, lets it process and understand extremely large amounts of input in a single pass. This makes it especially well suited to summarizing long documents, transcripts or datasets without having to split them into pieces. As a result, users can get more coherent and contextually accurate summaries of large files.

> **Deep research**

Gemini's Deep Research feature works like a smart research assistant that can independently scan and collect information from hundreds of web pages to create detailed multi-page reports. Its distinguishing feature is the ability to combine this online research with your uploaded files, using built-in multimodal capabilities to understand and connect different types of content. This allows it to create rich, comprehensive reports by combining public data with your personal materials.

> **Gems (personal AI assistants)**

Think of Gemini Gems as your own custom AI assistants, each an expert in a particular field. You can tell a Gem exactly what kind of assistant you need — for example, "a friendly writing partner" or "a super-focused study coach" — and it will remember those instructions every time you talk to it. This means you get fast, personalized help without explaining your needs from scratch every time.

> **Coding help**

Gemini acts as an intelligent coding assistant, primarily through Gemini Code Assist, integrating directly into popular development environments such as VS Code and JetBrains IDEs.

Its most common uses include real-time code autocompletion, generating whole functions or blocks of code from natural-language prompts, and help with debugging and writing unit tests**.**

This significantly boosts developer productivity by automating repetitive tasks and providing contextual recommendations right in the developer's workspace.

> **Gemini Live**

Gemini Live enables very natural, free-flowing conversation with Gemini, letting you interact by talking, interrupting and even switching topics smoothly. Its most useful aspect is real-time multimodal assistance, letting you share your phone's camera or screen to get instant, context-aware help with anything you see or do. This turns your phone into a powerful visual and audio guide, whether you are troubleshooting a household appliance, identifying a plant or comparing products while shopping.

**Image generation**

Gemini's image generation capability lets you effortlessly create a wide range of visuals from text descriptions and even edit existing images using conversational prompts.

This feature is based on Imagen 4, Google's state-of-the-art text-to-image model, known for its high-quality results and its ability to render text in images accurately.

Beyond simple generation, it excels at multi-turn conversational editing, letting you refine images over several exchanges while preserving context.

**Video generation with Veo 3 (Pro version):**

In the Pro version of Gemini, users can generate video directly in the chat interface. This feature makes it easy to create short AI-generated videos without switching between tools or platforms. By simply describing the visuals they want, users can quickly produce dynamic video content, making this feature a powerful tool for creators, marketers and educators.

To write video prompts, we use a special assistant:

![](/guides/assets/gemini-ru/img002.png)

The assistant asks us clarifying questions and generates a correct, structured prompt in JSON format, ready to paste (we copy the resulting prompt, paste it into a new chat, select the "Create video" option and wait 2 minutes). I strongly recommend against generating video from a plain text prompt, because you won't be happy with the quality, but we talk about that in a separate chapter, "Veo Guide"; you can see examples of text-only generation artifacts below:

![](/guides/assets/gemini-ru/img003.png)

Video with sound effects.

> Overall, Gemini serves as a versatile everyday AI assistant whose capabilities cover a wide range of user needs. The three most common use cases involve boosting productivity, stimulating creativity and providing intelligent access to information.

-   **Productivity and information management:** Gemini is often used to streamline everyday tasks and process information efficiently.
-   **Content creation and brainstorming:** users use Gemini's generative capabilities to start and refine various forms of content.
-   **Learning and research help:** Gemini acts as a powerful tool for acquiring knowledge and doing preliminary research.

### Who Should Use Gemini Instead of Other LLMs?

As a Google product, Gemini offers unparalleled integration with the extensive set of Google apps and services. This includes direct access to and interaction with your content in Gmail, Google Drive, Google Docs, Google Photos and even real-time information from Google Search and Maps.

This seamless connection lets Gemini act as a highly personalized assistant, performing tasks such as summarizing emails, finding specific files in your Drive or planning routes based on your calendar, all within a single interface.

To improve your prompting skills, it's more useful not to rely on just one AI. Experienced users often use several different AI models to compare answers, check their accuracy and see how each handles the same task differently. This gives them a broader perspective and helps them understand how different AIs think and respond.

* * *

## 🤯 What's New in Gemini?

**Update:** My Nano Banana Pro showcase is now available!

**Gemini 3 has launched, and the game has completely changed. Again.**

Gemini 3 isn't just "smarter" — it has fundamentally changed how it processes information. Whereas earlier models rushed to give you an answer, Gemini 3 now pauses to *think better* .

This new "reasoning" architecture means it can plan multi-step workflows, fix its own code and solve complex logic problems that used to break older models.

It has effectively evolved from a very fast encyclopedia into an autonomous junior engineer.

Here are the main changes you should pay attention to:

-   **🧠** **Deep Think mode:** the model now engages "System 2" (slow, deliberate thinking) before answering. This breaks the standards in math, logic and complex strategy.
-   **🏗️** **Vibe Coding & Antigravity:** it doesn't just write code snippets, it builds entire apps. With the new "Antigravity" engine and "Dynamic Views," you can generate interactive user interfaces and full-featured tools simply by describing how they should look and work.
-   **👀** **True multimodality:** it can now process video, audio and huge files with striking accuracy. You can upload a 30-minute video or a huge codebase, and it will instantly grasp every nuance.

If you want to see these features in action before we dive into prompting techniques, check out these breakdowns.

**Gemini 3 watchlist:**

🔗 [A new era of intelligence with Gemini 3](https://youtu.be/98DcoXwGX6I) — We’re releasing Gemini 3, our most intelligent model that helps you bring any idea to life. It’s the best model in the world for multimodal understanding and our most powerful agentic and vibe coding model yet — all built on a foundation of state-of-the-art re

🔗 [Google's Gemini 3.0: The Most Powerful LLM Ever](https://youtu.be/og7R9C_N3Zg) — Get a private, on-screen walkthrough of Google’s new Gemini 3.0 with Logan Kilpatrick from Google Deepmind. We vibe-code full apps, games, and product UIs in real time. You’ll see how to go from raw idea to working product in a single prompt, then iterate visu

🔗 [Gemini 3 just crushed everything](https://youtu.be/UH2_Sgeu4lc) — Google Gemini 3 Pro full review. Gemini 3 Pro testing, specs and benchmarks. #ai #agi #llm #aitools #aitools Thanks to our sponsor Hubspot. Access the free “The AI Business Playbook” https://clickhubspot.com/7944bd Use Gemini 3 Pro: https://gemini.google.com/

> **Finally, check out the bonus section on the Vibe Coding principle with Gemini in our crash course!**

* * *

## 📜 Gemini AI Glossary

Instruction tokens: a piece of text that tells the AI model what to do or how to respond.

Context tokens: a piece of text the AI uses to understand the current conversation, including previous messages, instructions or references.

Prompt debugging: the process of analyzing and refining a prompt to get clearer, more accurate or more useful responses from the AI.

Large language model: an AI system trained on huge amounts of text data to generate human-like language and understand complex instructions.

Gemini: a cutting-edge series of artificial intelligence models from Google DeepMind that understands and generates text, images, audio, video and code in a single environment.

Google: an American multinational technology corporation, known primarily for its search engine, whose mission is to organize the world's information and make it universally accessible and useful.

Imagen: a series of text-to-image models developed by Google DeepMind that generate high-quality photorealistic images from natural-language text prompts.

Multimodal prompting: the process of interacting with an AI model using several types of input — such as text, images, audio or video — in a single prompt to get a coherent, context-aware response.

> AI (artificial intelligence): the simulation of human intelligence in machines that can perform tasks and learn from experience.

Android: a mobile operating system developed by Google based on a modified version of the Linux kernel and other open-source software, designed primarily for touchscreen mobile devices such as smartphones and tablets.

> Prompt: a statement or question given to an AI model to guide its response or behavior.

> Prompt engineering: the process of designing, refining and optimizing prompts to get desired results from AI models.

> Reverse design: an approach to curriculum development that starts with the desired learning outcomes and works backward to create assignments and modules.

> Project-based learning: an educational approach in which students learn through real-world projects, which develops critical thinking and problem-solving skills.

> Outcome: the desired result or goal of a learning experience or project.

> Module: a self-contained unit within a course devoted to a specific topic or set of related topics.

> Learning objectives: clear, measurable statements describing what learners should be able to do or understand after completing a lesson or module.

> Real-life examples: examples or scenarios from everyday life that illustrate the application of concepts or principles.

> Assignments: engaging tasks or exercises designed to reinforce knowledge and apply it in practice.

> Step-by-step instructions: clear, sequential instructions that help learners complete a task or work through a process.

> Video script: a written document that lays out the content and structure of a video lesson, ensuring a clear and organized presentation of the material.

> Discussion questions: thought-provoking questions that encourage learners toward critical thinking, reflection and discussion.

> Extended learning: suggestions or opportunities for learners to explore additional resources or expand their knowledge beyond the core material.

> Complexity: the level of intricacy, difficulty or sophistication of the content or assignments presented to learners.

> Sentence variety: the use of different sentence structures, lengths and styles to add variety and interest to written or spoken content.

> Burstiness: a mix of short and long sentences that adds rhythm and emphasis to written or spoken communication.

> Iterative refinement: the process of continuously improving or adjusting prompts based on feedback and evaluation.

> Multi-turn prompts: prompts that involve several interactions or exchanges with the AI model, creating a conversational effect.

> Conversation depth: the level of engagement and mutual interaction achieved through multi-turn prompts.

> AI response analysis: examining and evaluating the outputs generated by an AI model in response to different prompts.

> Safe outputs: AI responses that follow ethical principles and pose no danger or risk to users or society.

> Domain-specific prompts: prompts tailored to particular industries, fields or subject areas to generate contextually relevant outputs.

> Creative prompts: prompts designed to stimulate creative and artistic AI outputs, such as stories, poetry or music.

> Ethical considerations: ethical principles and implications that arise in the development and use of AI prompts.

> AI misuse: harmful or unintended consequences that can arise from improper or malicious use of AI prompts.

> Privacy: protecting personal information and data when interacting with AI, ensuring user confidentiality.

> Fairness: ensuring that prompts and AI responses are free of bias and treat all people fairly.

> Accountability: responsibility and ownership of the results and impact of AI prompts and their final outputs.

> Societal impact: the broader influence and consequences of AI prompts on society, including social, economic and cultural aspects.

> Project guidelines: specific instructions and requirements for the final project, providing a framework for its implementation.

> Review: a comprehensive assessment or summary of the course material that reinforces key concepts and sums up what was learned.

> Capstone project: a final project that brings together the knowledge and skills gained during the course, applying engineering approaches to real-world scenarios.

> Roadmap: a visual or written guide that lays out the sequential steps and stages of a project or learning process.

> Expert project manager: a person who oversees the planning, execution and delivery of a project, ensuring its success and adherence to deadlines.

> Practical tips: actionable recommendations or suggestions that can be implemented to achieve specific goals or results.

> Project plan: a detailed document that lays out the goals, tasks, deadlines and resources needed to complete a project successfully.

> Evaluation methods: techniques and criteria used to assess the effectiveness, quality or impact of prompts and AI responses.

> Documentation: the process of recording and keeping track of project activities, observations, conclusions and results.

> Iterative process: a cyclical approach in which improvements and adjustments are made through repeated cycles of evaluation and refinement.

> Bias: a prejudice or favoritism that can be unintentionally introduced into AI prompts, leading to skewed results or discriminatory behavior.

> Inclusivity: ensuring that prompts and AI responses are accessible and inclusive for people of different backgrounds and abilities.

> Iteration: each cycle or round of refining and improving prompts and AI responses based on feedback and evaluation.

> Adaptation: the ability to adjust and change prompts and strategies based on new information, changing circumstances or evolving requirements.

> Core material: the foundational content and concepts covered by the course, forming the basis for learning and skill development.

> Continuous learning: an ongoing commitment to acquiring knowledge and developing skills beyond the course, staying constantly up to date with advances in prompt engineering.

> Prompt solution: a complete set of prompts designed to solve a specific problem or achieve a desired result.

> User experience: the overall experience and satisfaction of users when interacting with AI prompts and the results they get.

> Best practices: proven methods or approaches that have been shown to be effective and deliver high-quality results in prompt engineering.

> Prompt engineer: a specialist who designs, develops and refines prompts for AI models.

> Prompt crafting: the skill of carefully formulating prompts to get specific responses or steer the behavior of AI models.

> Zero-shot prompts: direct prompts (also known as "zero-shot") are **the simplest type of prompt**. They give the model no examples, only instructions. You can also phrase the instruction as a question or give the model a "role," as shown in the second example below.

> Chain-of-thought prompts (C-o-T): in chain-of-thought prompts, **the input question is followed by a series of intermediate natural-language reasoning steps that lead to the final answer**. Think of it as breaking a complex task into small logical pieces.

Multimodal chain-of-thought prompting (CoT): an advanced prompting technique in which the AI model reasons step by step over several types of input, such as text, images, audio or video, to solve complex problems or generate richer, context-aware responses.

> Tree-of-thought prompting (T-o-T):

The effectiveness of CoT prompting lies in its ability to break the solution of a complex problem into a sequence of smaller, simpler steps. Tree-of-thought (ToT) prompting similarly breaks a problem into a sequence of smaller steps — or *thoughts* — that are solved individually. However, this approach doesn't limit the model to outputting all of these steps at once. Instead, each thought is generated or solved independently and passed on to the next step in solving the problem, which allows the model to:

-   Explore several options for each thought involved in solving the problem.
-   Evaluate whether certain thoughts bring the model closer to the final solution.
-   Backtrack when certain thoughts turn out to be dead ends.
-   Search through the combinatorial space of possible solution steps to find the best final solution.

Note that this glossary contains a comprehensive list of terms related to prompt engineering, allowing learners to clearly understand the key concepts and terminology used throughout the course. If you have additional questions or need new terms added to the glossary, please let me know!

* * *

## 🎓 Gemini Prompt Engineering Crash Course

#### Chapters:

### Introduction to Gemini and Prompt Engineering

* * *

> **Navigation**:

* * *

**Next page**: [2️⃣Introduction to Crafting Prompts for Different Outputs](#introduction-to-crafting-prompts-for-different-outputs)

**Main collection**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

> Contents

* * *

#### 【1.1.】Overview of Gemini

> Gemini is Google's advanced artificial intelligence model that can understand and generate text, images, audio, video, and code. It is used in tools like Search, Gmail, and Android to help users write, solve problems, and get things done. The latest versions have strong reasoning skills and can even take actions such as planning or making phone calls.

> 🔹 ***What makes Gemini unique?***

1.  **Built-in multimodal design (not just multimodal add-ons)**

    Gemini was built from the ground up as a multimodal model, which means it can natively understand and generate text, images, audio, video, and code within a single unified model. This differs from some other models (such as GPT with image recognition), which added multimodal capabilities later or through external tools. Gemini's architecture is designed to process these formats together, which makes for smoother understanding and interaction between them.

2.  **Deep integration into the Google ecosystem**

    Unlike most other LLMs, Gemini is tightly integrated into Google products — Search, Gmail, Docs, Sheets, Android, Drive, and even Chrome. This gives it access to personal context (with your permission) and lets users interact with their data more naturally. This integration makes Gemini uniquely useful for people who already use the Google suite of products every day.

3.  **Agentic capabilities with file and web page context**

    The *Deep Research* feature (available in the Gemini Advanced plan) lets Gemini browse the web on its own and generate long, multi-source reports. Notably, it can **combine** this with insights from user-uploaded files (such as PDFs or Docs) using multimodal processing. This combination of *web pages, files, and context* is not as widely available in other models in such a unified form.

4.  **A powerful on-device model (Gemini Nano)** While most LLMs run exclusively in the cloud, Gemini includes a small version (Gemini Nano) that runs directly on mobile devices such as Pixel phones. This lets it provide features like smart replies, text summarization, and live captions without needing an internet connection. This kind of edge processing is a unique practical advantage, especially for users who care about privacy or prefer mobile devices.
5.  **Custom "Gems" for consistent, context-aware conversations** Gems are personalized AI assistants in Gemini that remember your instructions and additional context files, so you don't have to repeat the setup every time you chat. They streamline workflows such as drafting marketing copy or reviewing code, but they do *not* act autonomously and do *not* perform tasks like calling services or scheduling events.

* * *

#### 【1.2.】Key Principles of Gemini Prompt Engineering

> Prompt engineering is the art of designing and refining the instructions you give Gemini to get the best results. A well-written prompt can:

-   Generate high-quality, relevant output.
-   Reduce errors or hallucinations (inaccurate or made-up answers).
-   Save time by making sure Gemini gives you the information you need on the first try.

> ▪️ **Key features of effective prompting in Gemini:**

* * *

1.  **Role assignment**: assign Gemini a specific role to sharpen its focus.
2.  **Multimodal inputs**: combine two or more types of data, such as text, images, audio, or video, to provide context for a more integrated response.
3.  **Prompt chaining**: break large tasks into smaller steps for greater clarity.

**Role assignment example**:

```
You are a helpful accounting assistant. Your role is to explain basic accounting concepts in a clear and beginner-friendly way.

Give me a simple explanation of what a balance sheet is and what it's used for.
```

**Multimodal input example:**

![](/guides/assets/gemini-ru/img007.png)

```
List the names you see on the picture in alphabetical order.
```

**Prompt chaining example:**

**Prompt 1:** Give me three bachelor party themes that are in good taste and don't involve any questionable activities.

**Prompt 2:** Compare the first two themes from the previous answer and list their pros and cons, ultimately suggesting which one is better.

**Prompt 3:** Now list the 10 most important decorations and items needed for a \[insert the final theme suggested by Gemini\] bachelor party.

* * *

#### 6 Principles of Prompt Design for Gemini

#### 1\. Clarity

-   **What it means:** Your prompt should be direct, easy to understand, and free of ambiguity.
-   **Why it matters:** Gemini works better when it receives clear instructions that leave no room for misinterpretation.
- **Tip for success:** use precise wording to avoid irrelevant results.

**Example prompt:**

```
Describe how to make hamburger in three simple steps.
```

**Gemini's response:**

Here's how to make a tasty hamburger in three simple steps:

1.  **Prepare the patty:** season ground meat (beef, chicken, or plant-based) with salt, pepper, and any other spices you like. Shape a patty, making sure it is slightly wider than the bun, since it will shrink as it cooks.
2.  **Cook to perfection:** heat a pan or grill to medium-high. Cook the patty for a few minutes on each side until it reaches your desired doneness. If you like cheese, add a slice on top during the last minute of cooking so it melts.
3.  **Assemble the burger and enjoy:** lightly toast the hamburger buns. Place the cooked patty on the bottom bun, then add your favorite toppings such as lettuce, tomatoes, onion, pickles, ketchup, mustard, or mayonnaise. Cover with the top bun and enjoy!

* * *

#### 2\. Specificity

-   **What it means:** include enough detail for Gemini to focus on your specific needs.
-   **Why it matters:** vague requests lead to generic answers, while specific requests help Gemini reach the level of detail you want.
- **Tip for success:** state the format and focus clearly in your request.

**Example prompt:**

```
Explain the difference between gross profit and net profit in simple terms, and give one short example for each. Keep your answer under 100 words.
```

**Gemini's response:**

Gross profit is what remains after you subtract the direct costs of producing a product or providing a service from your sales revenue. It shows how efficiently you produce your goods.

**Example (gross profit):** A baker sells cakes for $100. The ingredients and direct costs of making them come to $30. The gross profit is $70.

Net profit is the actual amount of money a business has left after paying *all* expenses, including operating expenses (such as rent and salaries), interest, and taxes. It is the "bottom line."

**Example (net profit):** the baker's gross profit was $70. If rent, utilities, and marketing cost an additional $40, the net profit would be $30 ($70 - $40).

* * *

#### 3\. Context

-   **What it means:** provide context so Gemini knows the perspective or conditions for its answer.
-   **Why it matters:** Relevant context lets the results match your goals and keeps them consistent.
- **Tip for success:** provide the most important context needed for the type of answer you are looking for. Do not include any irrelevant information.

**Example prompt:**

```
Our company is facing public scrutiny after two senior executives were seen having a personal affair at a concert, and the incident was reported in national media. While we respect employee privacy, the visibility of the event and their leadership positions have raised questions about company values and conduct. As part of the PR team, I need help drafting a short public statement that acknowledges the incident, reinforces our commitment to professionalism, and maintains a respectful tone. Keep it under 150 words.
```

**Gemini's response:**

#### Public Statement

We are aware of recent media reports concerning the personal conduct of two senior executives at a public event. We understand that this has raised questions and concerns, and we want to address them directly.

Our company values professional conduct and a respectful work environment above all else. While we respect the privacy of our employees, we also expect our leaders to uphold the highest standards, both professionally and personally, especially when their actions reflect on the company.

We are taking this matter seriously and are conducting an internal review of the situation to ensure alignment with our company's values and policies. We remain committed to maintaining a workplace built on integrity, respect, and professionalism for everyone. We appreciate your understanding as we handle this matter with care and appropriate attention.

* * *

#### 4\. Instructiveness

-   **What it means:** Specify the tone, format, or type of output you expect.
-   **Why it matters:** without clear instructions, Gemini may misinterpret the task or give a less useful answer.
- **Tip for success:** Use precise wording to structure tasks and specify tone.

**Example prompt:**

```
Write a friendly and professional email (around 100 words) to welcome a new employee named Jordan to the marketing team. Make sure to keep the tone warm, include the team’s excitement, and mention the upcoming onboarding meeting this Friday.
```

**Gemini's response:**

Subject: Welcome to the Marketing Team, Jordan!

Hi Jordan!

Congratulations on joining the marketing team! We are all so happy to have you with us, and we look forward to the fresh ideas you will bring.

**This Friday** we will have an **onboarding meeting** where we'll walk you through everything you need to get started and introduce you to everyone. In the meantime, if you have any questions, don't hesitate to reach out.

We can't wait to start working together!

Best regards,

The Marketing Team

* * *

#### 5\. Balanced Prompts

-   **What it means:** understanding when to use concise prompts and when to use more complex, comprehensive ones.
-   **Why it matters:** if your prompt is too short or too long for the task, it can lead to unhelpful or confusing answers.
- **Tip for success:** before writing a prompt, decide what type of answer you want. Is it a simple question or a serious task?

**Example prompts:**

```
Define photosynthesis in simple terms for a 5th grader.
```

```
Act as a cybersecurity consultant designing a realistic phishing email simulation for a mid-sized tech company with remote employees. The goal is to test awareness of suspicious links in work-related messages. The email should mimic a fake request from HR asking employees to confirm personal details for payroll updates. Keep the tone formal and believable, and generate both the email subject line and body.
```

**Gemini's responses:**

**Gemini's response to the short prompt:**

Imagine that plants are super chefs! They have a special ability called **photosynthesis**.

This is how plants make their food so they can grow big and strong. They use three main ingredients:

1.  **Sunlight:** they soak up the sun's energy, just like we soak up the sun at the beach!
2.  **Water:** they drink water from the soil through their roots.
3.  **Air:** they take in a gas from the air called carbon dioxide.

Then, inside their leaves, they mix all these ingredients together to make delicious sugar (their food!) and release oxygen, which *we* breathe! So plants not only make food for themselves, they also help us breathe. Pretty great, right?

**Gemini's response to the complex prompt:**

Subject: Action Required: Important Payroll Update Information — \[Company Name\]

Dear \[Employee Name\],

This email is to inform you of an urgent update to your payroll information. Due to recent changes in tax legislation and our benefits provider, all employees must verify and update their personal details to ensure accurate and uninterrupted processing of upcoming payroll payments.

To complete this important verification, please follow the secure link below and follow the instructions:

https://company-payroll-update.co/secure-login/employeeID-XXXXX

Please note that if you do not confirm your details by **Friday, August 1, 2026,** it may result in delays in the next payroll cycle.

Thank you for your prompt attention to this matter.

Sincerely,

Human Resources, \[Company Name\]

* * *

#### 6\. Chain of thought (prompt chaining)

-   **What it means:** break large tasks into smaller, manageable steps.
-   **Why it matters:** Gemini excels at clear subtasks, which reduces errors and improves accuracy.
- **Tip for success:** refine your prompts based on the AI's previous answers to improve the result.

**Prompt chaining example:**

**Prompt 1:** Name three unconventional places where I could hold a business meeting with executives of a television production company. Describe each idea in one sentence.

**Prompt 2:** Between the first and second options, which place are we less likely to run into interruptions and inconvenience?

**Prompt 3:** Let's say I chose option 1. What dishes are usually served at such meetings?

**Gemini's response to prompt 1:**

Here are three unconventional places to hold a business meeting with executives of a TV production company:

1.  **A converted film studio or sound stage** offers an immersive environment directly connected to their industry, surrounded by the tools of their trade.
2.  **A high-tech escape room** can foster team building and problem solving in a unique interactive setting that stimulates creative thinking.
3.  **A private suite at a major sporting event or concert hall** provides a relaxed yet refined atmosphere with entertainment, ideal for networking and informal discussions.

**Gemini's response to prompt 2:**

Between the converted film studio/sound stage and the high-tech escape room, you are less likely to run into interruptions and inconvenience in the **high-tech escape room**.

While a film studio offers a fitting backdrop, active shoots or ongoing maintenance could lead to unexpected noise, crew movements, or scheduling conflicts. An escape room is by nature a self-contained, controlled environment designed for full immersion, minimizing outside distractions and providing a focused, time-limited experience.

**Gemini's response to prompt 3:**

When holding a business meeting with TV production executives in a converted film studio, the type of food served usually combines professionalism with the often long and intense working hours and the practical needs of the film industry.

You will likely see **high-end but easy-to-consume catering options**, such as gourmet lunch boxes with high-quality sandwiches, wraps, and salads, or a carefully curated buffet with a mix of hot and cold dishes with various dietary options. Snacks and drinks will also be available throughout the day, leaning toward healthy and energy-boosting options such as fruit platters, granola bars, and an assortment of coffee, tea, and sodas, very much like the "craft services" found on a film set. Formal plated meals may be reserved for more ceremonial or shorter high-level discussions.

> Notice how each question builds on the previous answers, keeping the conversation going.

> Understanding and applying the foundational principles is your key to unlocking Gemini's potential. These principles ensure that your prompts elicit detailed, accurate, and contextually relevant results. By mastering these basics, you will build a strong foundation for creating prompts that unlock the full capabilities of Gemini, no matter how complex the task.

* * *

#### 【1.3.】Beginner-Level Prompts Illustrating Each Principle

> Now that we have covered the core principles of effective prompt design in Lesson 1.2, let's look at how to apply them in practice. These examples are designed for beginners and use natural language processing. With Gemini there is no need to use XML tags. You just need to talk to it the way you would talk to a person.

> 🔹 **Principle:** **Clarity**

* * *

**Prompt:**

```
Describe that process of Protein Synthesis in simple terms.
```

> This prompt is easy to understand. There is no vagueness or ambiguity in it.

> 🔹 **Principle:** **Specificity**

* * *

**Prompt:**

```
You are a sports analyst with expertise in Major League Baseball. List five of the most iconic U.S. baseball players from the 1990s, based on their performance, popularity, and cultural impact during that decade.
```

> This prompt is a good example of specificity, because it clearly defines the expert role, the time frame, the selection criteria, and the desired response format.

> 🔹 **Principle:** **Establishing Context**

* * *

**Prompt:**

```
You are a social media influencer. In the context of social media marketing, explain the importance of authenticity of content creation.
```

> By specifying both a **role** and a **context**, this prompt ensures that Gemini's output stays consistent and relevant to the given topic.

> 🔹 **Principle:** **Instructiveness**

* * *

**Prompt:**

```
Rewrite the following paragraph to make it more concise and professional, keeping the original meaning intact and limiting it to 3 sentences: "Our team was really excited about the new product launch, and we worked super hard to get everything ready in time. There were some last-minute issues, but we managed to fix them before the deadline. Everyone put in a lot of effort and showed real dedication."
```

> This prompt is instructive because it gives clear, actionable directions about what to do (rewrite), how to do it (make it concise and professional), and which constraints to follow (keep the meaning and limit it to 3 sentences).

> 🔹 **Principle:** balanced prompts

* * *

**Simple prompt:**

```
Explain what supply and demand means in basic terms.
```

**A similar but more complex prompt:**

```
Explain the concept of supply and demand in simple terms for someone new to economics. Then, give two real-life examples: one showing what happens when demand is high but supply is low, and another showing the opposite. Keep your explanation clear and relatable.
```

> The **simple prompt** is useful when the user wants a quick, direct explanation without much depth, which makes it ideal for fast learning or casual interest. The **more complex prompt**, on the other hand, is meant for users who need a deeper understanding with practical examples, which makes it better suited to educational content, teaching, or applied scenarios. Both prompts deal with the same topic, but they match different goals and levels of engagement.

> 🔹 **Principle:** **Iterative refinement and chaining**

* * *

**Initial prompt:**

```
Summarize the main idea of the article below in one sentence. [insert article]
```

**Refined prompt:**

```
Now expand that summary into a short paragraph that includes the article’s main argument, one supporting point, and the author’s conclusion. Keep it under 100 words and maintain a neutral tone.
```

> The second prompt builds on the first, but deepens the request by adding structure, clarity, and purpose, while staying connected to the original task.

> These examples show how **role assignment** and **structured instructions** can help beginners use Gemini effectively:

1.  **Clarity:** use simple language to state tasks clearly.
2.  **Specificity:** provide roles or contexts to get detailed and relevant answers.
3.  **Establishing context:** provide more context so that all prompts stay within a defined range.
4.  **Instructiveness:** specify the style, tone, or structure for nuanced answers.
5.  **Balanced prompts:** alternate between short and complex prompts depending on the goal of the task.
6.  **Gradual refinement:** break tasks into stages for better control and adapt follow-up prompts based on previous answers.

* * *

#### 【1.4.】Tips and Tricks for Remembering These Principles

> 🔹 To help you absorb the principles of effective prompt design with Gemini, here are some practical **tips and tricks** for beginners. This section focuses on **practical advice**, with an emphasis on role assignment and iterative refinement.

* * *

1.  **Make a checklist:**

**Why:** a checklist ensures that your prompts follow all the core principles, helping you avoid common mistakes such as vagueness or lack of focus.

**How to apply it:** before finalizing a prompt, ask yourself:

-   Is the task clearly defined in the prompt?
-   Are the instructions specific?
-   Have I provided a context or role to guide Gemini's behavior?

1.  **Use templates:**

**Why:** templates save time and provide a consistent structure, especially for repetitive tasks such as creating summaries or analytical reports.

**How to apply it:**

-   Develop templates for structuring your prompts.
-   Include placeholders for customization.

**Template example:**

```
Role: You are a private investagator with a keen eye for detail.

Task: Analyze the following document to spot any inconsistency in the suspect's alibi.

[upload file]
```

1.  **Practice regularly:**

**Why:** the more prompts you create, the more intuitive these principles become.

**How to apply it:**

-   Start with small tasks, for example ask Gemini to translate phrases or summarize short articles.
-   Gradually move on to more complex, multi-step tasks.

**Tip:** track your progress by noting which prompts give the best results and analyzing why.

1.  **Use role assignment as often as possible:**

**Why:** role assignment helps the AI shape its answers more effectively, so try experimenting with related roles to explore subtle differences in perspective and deepen the nuance of the responses.

**How to apply it:**

-   Use roles such as "financial advisor," "research scientist," or "friendly teacher," depending on your needs.
-   For best results, combine this with task instructions.

**Example prompt with role assignment:**

```
[Choose one below]
You are a data analyst.
You are an economist.
You are a business mogul.

Explain the trend in the following dataset:

Year, Revenue
2021, 5000
2022, 7000
2023, 10000
...
```

1.  **Iterate and refine:**

**Why:** even well-written prompts may need fine-tuning. Repeated refinement helps you improve results over time. This way, you also build the habit of always striving to improve your prompts.

**How to apply it:**

-   Start simple, analyze the response, and adjust the prompt.
-   Test several versions of the same task to determine which one works best.

**Refinement example:**

**Initial prompt:**

```
Explain climate change.
```

**Refined prompt:**

```
You are a climatologist. Explain climate change in two paragraphs, focusing on its causes and effects.
```

Further refinement:

```
You are a climatologist tasked with convincing the general public to take climate change seriously. Write a structured essay explaining what climate change is, how it developed, current measures being taken by some countries to address it, and what individuals can do to contribute. Conclude by describing what the world might look like a century from now if no significant action is taken.
```

1.  **Practice critical thinking when chaining prompts:**

**Why:** Critical thinking when chaining prompts helps ensure that each step builds on the previous one, and also gives you a chance to evaluate the accuracy of the answers and spot possible misinterpretations.

**How to apply it:**

-   Verify any claims or data before using them in the next prompt.
-   If something seems unclear or wrong, clarify it before moving on.
-   Try phrasing prompts differently to see whether the answers stay consistent.

**Example:**

**Step 1:**

```
Summarize this article:

[Insert your text here]
```

**Step 2:**

```
You are a fact-checker with a critical eye and a burning passion for truth.
Verify the accuracy of the summary:

[Insert summary here]

Explain what might have caused the inaccuracy during the summarization process.
```

1.  **Ask for feedback:**

**Why:** Discussing your prompts with colleagues will help you find improvements you may have missed.

**How to apply it:**

-   Collaborate with others or run a quality check on Gemini's output.
-   Use the feedback to refine your prompts further.

* * *

**Key takeaways**

1.  **Preparation is the key to success:** use checklists and templates to streamline prompt creation.
2.  **Iterate often:** over time, refinement leads to better results.
3.  **Use Gemini's strengths:** conversational prompts, less restrictive responses, and real-time web search.

> With these tips, you can create clear and effective prompts that let you get the most out of Gemini. Up next: put these principles into practice with the exercises in Lesson 1.5!

* * *

#### 【1.5.】Exercises for Practicing Simple Prompt Design

> ▫️ To reinforce your understanding of the principles of effective prompting with Gemini, this lesson offers **practical exercises**. Each exercise focuses on one of the key principles discussed earlier, with examples to help you master prompt creation and sharpen your skills. Note that your answers do not have to match word for word, but they should be close to the given answer.

* * *

**Exercise 1: Clarity**

> **Goal:** Write a clear and direct prompt that eliminates ambiguity.

**Task: Ask** Gemini to describe the process of brewing coffee.

#### Answer:

```
You are a barista. Describe the process of brewing a cup of coffee in simple terms for a beginner.
```

* * *

**Exercise 2: Specificity**

> **Goal:** Create a prompt that will produce specific and relevant results.

**Task: Ask** Gemini to compile a list of five plant-based sources of protein.

#### Answer:

```
You are a nutritionist. List five plant-based foods that are high in protein.
```

* * *

**Exercise 3: Contextual Grounding**

> **Goal:** ensure that the answer fits the context defined in the prompt.

**Task:** Ask Gemini to explain quantum computing in the context of computer science.

#### Answer:

```
You are a computer science professor.
Explain the concept in a way that relates to computer science applications.
Describe quantum computing and its potential uses in computer science.
```

* * *

**Exercise 4: Instructiveness**

> **Goal:** Give clear instructions about content, tone, and format.

**Task:** Ask Gemini to write a short detective story with an intriguing tone.

#### Answer:

```
You are a creative writer.
Write a detective story set in 1940s New York about a private investigator and a stolen artifact. It must only be three paragraphs long and written in a suspenseful manner.
```

* * *

**Exercise 5: Balanced Prompts**

> **Goal:** Ask for a concise and precise answer.

**Task:** Ask Gemini to translate "Good morning, how are you?" into a language of your choice. Then write a more complex version of your original prompt.

#### Answer:

```
You are a [insert choice language here] language teacher. In one sentence, translate "Good morning, how are you?" into [insert the chosen language]
```

```
You are a [insert choice language here] language teacher. Translate "Good morning, how are you?" into [insert chosen langauge] and also explain different variations of the same greeting dependent on location or culture.
```

* * *

**Exercise 6: Gradual Refinement**

> **Goal:** Refine an initial prompt to increase specificity.

**Task:** Start with a general request for a joke, then refine it for a specific audience.

#### Answer:

**Initial prompt:**

```
Tell me a joke.
```

**Refined prompt:**

```
You are a comedian.
Light-hearted and family-friendly
Tell a clean, funny joke suitable for children.
```

> These examples are meant to demonstrate how specific modifiers, such as role assignment and contexts, can improve your prompts by ensuring clarity, specificity, and relevance. These modifiers can be anything relevant to the task at hand. Practice using them to create structured and effective prompts for Gemini.

* * *

* * *

> **Go to the next chapter**

[2️⃣Introduction to Crafting Prompts for Different Outputs](#introduction-to-crafting-prompts-for-different-outputs)

* * *

### Introduction to Crafting Prompts for Different Outputs

* * *

> **Navigation**:

* * *

**Next page**: [3️⃣Exploring the Importance of Context](#exploring-the-importance-of-context)

**Previous page**: [1️⃣Introduction to Gemini and Prompt Engineering](#introduction-to-gemini-and-prompt-engineering)

**Collection home page**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

> Contents

* * *

#### 【2.1.】Introduction to Controlling Output

> Prompting Gemini requires knowing how to steer the AI toward the style or type of output you want. Whether you are looking for factual summaries, creative narratives, or structured lists, well-crafted prompts are the key.

> **Creative writing**

*Prompts for creative writing should inspire the imagination. To create compelling prompts for stories, poems, or creative projects, set the scene or introduce an intriguing concept.*

> 🔹 For example, a prompt for a story might look like this:

* * *

```
You are an imaginative and mysterious fantasy storyteller.

Write a story beginning with this scenario: "In a city where shadows have minds of their own, a young artist discovers her shadow is plotting against her."
```

> **Factual text**

*Factual prompts should be direct, defining the topic and the format of the desired output.*

> 🔹 For example, to get a brief explanation of a scientific discovery:

* * *

```
You are a science communicator. In two clear and engaging paragraphs, explain the significance of the James Webb Space Telescope’s first images of distant galaxies.
```

> **Questions and answers**

*For effective Q&A, phrase your question clearly, including any specific details or the scope of the answer.*

> 🔹 For example, to ask a question about the greenhouse effect:

* * *

```
You are an environmental scientist.

What is the greenhouse effect, and how does it contribute to global warming? Include one example of a greenhouse gas and its impact.

Answer in 3-4 sentences.
```

> **List creation**

*When creating a list, specify the number of items, the category, and any desired formatting.*

> 🔹 For example, to create a list of renewable energy sources:

* * *

```
You are an energy consultant.

In an numbered list format, list five renewable energy sources with a brief explanation of how each works.
```

> **Conversational style**

*For conversational responses, include the context of the dialogue and make sure the tone matches your expectations.*

> 🔹 For example, to simulate a casual conversation about hobbies:

* * *

```
You are a friendly mentor.

Person A: "I've been feeling stressed lately and need a hobby to help me relax."

In a supportive and conversational tone, respond to Person A with three hobby suggestions and briefly explain why they might help with stress.
```

> Practical tip: experiment with these examples and observe Gemini's responses. Refine the prompts for specific scenarios. Later on, we will look at context management and more advanced techniques that will help you improve your prompt design skills.

* * *

#### 【2.2.】Intermediate-Level Prompts Demonstrating a Variety of Outputs

> With a single topic, the design of your prompt can significantly affect the result. You can use indicators to format prompts, but modern LLMs can work with a variety of prompt formats. Still, if you prefer, it is recommended to include role and context indicators, though they are no longer required.

> **Creative writing**

> 🔹 Software command:

* * *

```
Role: You are a creative storyteller specializing in eco-fantasy.

Task: In 5 paragraphs, write an engaging short story where global warming awakens an ancient forest spirit that intervenes to protect the Earth.

Tone: Imaginative and awe inspiring.
```

OR

```
You are a imaginative,awe-inspiring and creative storyteller specializing in eco-fantasy. In 5 paragraphs, write and engaging short story where global warming awakens an ancient forest spirithat intervenes to protect the Earth.
```

> Gemini will generate a story in which the forest spirit appears as a mythical protector, illustrating creative writing adapted to the topic of global warming.

> **Factual text**

> 🔹 Task:

* * *

```
Role: You are an environmental scientist explaining complex topics to a general audience.

Task: In two paragraphs, summarize the primary causes and consequences of global warming in a concise manner.
```

> Gemini will provide a concise explanation of global warming, breaking its causes and consequences into clear, accessible pieces of language.

> **Questions and answers**

> 🔹 Request:

* * *

```
You are a climate change expert answering public questions and you are helping people to have a beginner level understanding of climate change.

What are the top three causes of global warming, and what solutions can mitigate each cause?

Answer each cause and solution in separate paragraphs.
```

> This format prompts Gemini to give a structured answer, detailing each cause of global warming and its corresponding solution.

> **List creation**

> 🔹 Prompt:

* * *

```
You are an environmental strategist.

List and explain five key human activities contributing to global warming.

Format your answer into a numbered list.
```

> Gemini will generate a detailed numbered list that names and explains human activities such as deforestation and the burning of fossil fuels.

> **Conversational style**

> 🔹 Prompt:

* * *

```
You are a encouraging conversational and friendly environmental educator.

Person A: "I’m worried about the planet. What can I do to help fight global warming?"

Person B: "There are lots of ways you can make a difference..."

Continue this dialogue with three actionable tips for Person A.
```

> Gemini will continue the dialogue, giving practical tips for fighting global warming while keeping a supportive and engaging tone.

> **Note:** Using labels for elements such as **role**, **tone**, **task**, and **format** can definitely make your prompts more structured and help ensure specific results. However, Gemini is flexible enough; it can generate highly relevant and nuanced answers even without these explicit labels. The most important factor is providing **enough context** and a **clear, detailed description** of what you need and how you want the result to look. Always aim to make your instructions descriptive and leave no room for misinterpretation, whether or not you use a rigid format.

* * *

#### 【2.3.】Exercises for Practicing Design for Different Outputs

> In this section you will find a set of exercises designed to sharpen your prompt design skills. As you work through them, remember that the goal is to master the art of prompt design through experimentation and studying the results.

> **Exercise 1: Creative writing**

*Topic: Worldbuilding*

> **Prompt design task:**

> Design a prompt that produces a detailed description of a fictional place with its own set of rules and fantastic elements. This prompt should also let Gemini come up with possible storylines set in the fictional place.

> **Exercise 2: Factual text**

*Topic: The human brain and how memory works*

> **Prompt design task:**

> Design a prompt that asks Gemini to explain how the human brain forms and stores memories. Your prompt should lead to a factual, clear, and well-structured result.

> **Exercise 3: Questions and answers**

*Topic: Professional services*

> **Prompt design task:**

> Create a prompt that lets Gemini generate a series of questions and answers about a specific professional service of your choice. Your prompt should produce output that could be placed in the FAQ section of a website related to the service you chose.

> **Exercise 4: List creation**

*Topic: Travel and adventure*

> **Prompt design task:**

> Create a prompt that helps Gemini compile a list of what to prepare when heading to a place of your choice. Your prompt should also contain enough context describing the purpose of your visit, so that the answer is relevant and specific.

> **Exercise 5: Conversational style**

*Topic: Conflict resolution*

**Prompt design task:**

> Write a prompt that asks Gemini to simulate a realistic heated discussion, for example between colleagues, friends, or family members. Your prompt should also specify how Gemini should present possible solutions or ways to de-escalate the situation.

> These exercises are designed to deepen your understanding of Gemini's capabilities and refine your prompt design skills. Analyze the results Gemini generates for each prompt. Ask yourself:

-   Does the output match the stated goal?
-   Is the language appropriate for the target audience?
-   Are the answers coherent, detailed, and structured as expected?

Experiment with small changes to the prompts and observe the changes in the results. This iterative approach will help you master the art of prompt design.

* * *

In the next section we will introduce more advanced concepts in prompt design, offering more opportunities to hone your skills.

> **Go to the next chapter**

[3️⃣Exploring the Importance of Context](#exploring-the-importance-of-context)

* * *

### Exploring the Importance of Context

> **Navigation**:

* * *

**Next page**: [4️⃣Improving Prompts for Better Results](#improving-prompts-for-better-results)

**Previous page**: [2️⃣Introduction to Crafting Prompts for Different Outputs](#introduction-to-crafting-prompts-for-different-outputs)

**Collection home page**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

Contents

* * *

> In the world of conversational AI, especially with the release of Gemini 2.5, understanding the role of context in prompt design has become more important than ever. A well-written prompt does not just give instructions — it shapes the direction of the interaction and plays a key role in the quality and relevance of Gemini's responses.

#### 【3.1.】What Is Context in Prompt Design?

> In Gemini prompt design, context means the necessary background or relevant details contained in the prompt that allow the AI's responses to be shaped effectively. Think of context as the "frame of reference" that Gemini uses to understand and respond accurately.

> 🔹 Context can take various forms, including:

* * *

-   **Historical context**: previous exchanges or inputs in the current conversation.
-   **Prompt context**: specific details provided in the current prompt.
-   **External context**: broader scenarios or topics that go beyond the immediate context of the prompt.
-   **Instructional context**: clear guidelines or expectations provided in the prompt to guide Gemini's response.

#### 【3.2.】Why Is Context Crucial?

> 🔹 Providing context in your prompts is fundamental to getting relevant, accurate, and actionable responses from Gemini. Here is why:

* * *

-   **Orientation**: context ensures that Gemini understands the purpose and parameters of the task.
-   **Coherence**: it helps maintain consistency and relevance across multiple exchanges or within a single response.
-   **Accuracy**: it encourages Gemini to generate answers tailored to the specific nuances of the request.
-   **Efficiency**: it minimizes ambiguity, reducing the need for follow-up clarifications.

#### 【3.3.】Balancing Context

> 🔹 Context, while invaluable, should be used wisely. The key is to strike the right balance:

-   **Too little context**: Gemini may misinterpret the task or give irrelevant answers.
-   **Too much context**: overloading the prompt can dilute Gemini's attention, making it harder to identify the details most relevant to your immediate task, or can exceed the model's capacity.

The goal is to include enough detail to guide Gemini effectively without blurring the core task of the request.

Even with the expanded context-handling capabilities of the Gemini models, including only the most relevant information remains a best practice. The problem is not Gemini's ability to remember a huge amount of detail, but making sure that information is *relevant* to the current task, so the model isn't forced to sift through unnecessary data.

* * *

#### 【3.4.】Prompts Illustrating Context Control

> 🔹 Mastering context management can improve your prompt design. Here are some examples showing progression from simple to more complex prompts:

#### Intermediate-Level Prompt

> **Benefits of meditation**

* * *

Explain the benefits of meditation for professionals under high stress.

```
You are a mindfulness coach with expertise in workplace stress management.
Your audience is young professionals working in high-stress environments such as finance, healthcare, or tech.
Provide a brief explanation of how meditation can help reduce stress and improve productivity in their daily routines. Include:
  - Two specific benefits
  - One quick meditation technique they can try at work
Deliver the response in three clear sections: Benefits, Technique, and Practical Tips.
```

> 🔸 This prompt includes elements such as:

-   **Role assignment:** " " Clearly defines Gemini's persona as a mindfulness coach, focusing its response to match expertise in workplace stress management.
-   **Audience context:** Specifies the demographics (young professionals) and the situational context (high-stress environments), ensuring the output is relevant.
-   **Task breakdown:** Outlines precise expectations, including two benefits and one technique, simplifying the model's focus.
-   **Formatting instructions:** helps Gemini structure the output into three separate sections for clarity and usability.

#### Expert-Level Prompt

> **Complex socioeconomic analysis**

* * *

This prompt is designed for Gemini to analyze and synthesize information across multiple dimensions to address complex social and economic challenges.

```
You are a policy advisor specializing in global economic development and sustainability.

Your audience is a panel of policymakers from the United Nations discussing strategies to mitigate the socioeconomic impacts of climate change on developing nations.
Provide a comprehensive analysis that addresses:
- The primary economic risks developing nations face due to climate change.
- Potential policy interventions to mitigate these risks, considering economic, social, and environmental perspectives.
- Case studies or examples of successful implementation from any region. Additionally, outline actionable recommendations for immediate and long-term policy implementation.

Identify and elaborate on key economic risks developing nations face, such as reduced agricultural productivity, increased disaster recovery costs, and climate-induced migration challenges.

Discuss potential policy interventions, including financial aid mechanisms, green energy transitions, and capacity building for disaster resilience.

Highlight examples such as the Green Climate Fund’s impact in Africa or coastal management practices in Southeast Asia.
Provide a structured set of recommendations categorized as short-term (1-2 years) and long-term (5-10 years) strategies.
```

> 🔸 This prompt is rated expert-level because of several factors:

-   **Detailed formatting:** the response format requires structured sections, which forces Gemini to synthesize comprehensive and well-organized information for a professional audience.
-   **Depth of role and context:** the role clearly defines Gemini as an experienced policy advisor, and the context creates a specific high-stakes situation (a UN panel) to ensure relevance and coherence.
-   **Multidimensional task:** the task spans several levels and requires examining risks, developing policy, analyzing specific examples, and proposing practical measures.
-   **Strategic vision:** by requesting short-term and long-term recommendations, the prompt calls for nuanced thinking aligned with policy planning and implementation cycles.

#### Master-Level Prompt

> **Developing a global climate resilience policy**

* * *

This prompt is designed for Gemini and aims to tackle an exceptionally complex, interdisciplinary challenge related to global climate policy, integrating economic, environmental, and social aspects into a comprehensive climate resilience strategy.

```
Role: You are a global policy strategist specializing in climate resilience and sustainable development.

Context: Your audience is the World Economic Forum's executive committee, tasked with advising on a unified global strategy to enhance climate resilience and sustainable development by 2050.

Task:
Formulate a comprehensive global policy strategy to achieve climate resilience and sustainable development. Follow these steps to address the task:

1. Global Landscape Analysis: Analyze the current global climate landscape, identifying key challenges such as extreme weather events, biodiversity loss, and socio-economic disparities.

2. Regional Insights: Provide insights into regional disparities in climate resilience, focusing on vulnerable regions such as Sub-Saharan Africa, Southeast Asia, and Small Island Developing States (SIDS). Highlight specific needs and challenges.

3. Policy Framework Development: Develop a structured global policy framework that includes:
- Climate finance mechanisms to fund adaptation and mitigation initiatives.
- Strategies to mobilize international cooperation for technology transfer and capacity building.
-Policies to foster green innovation and promote circular economies.

4. Case Studies: Incorporate case studies of successful climate resilience initiatives, such as renewable energy projects in Nordic countries, mangrove restoration in Southeast Asia, or urban climate adaptation strategies in the Netherlands.

5. Stakeholder Engagement Plan: Design a plan for engaging stakeholders, including governments, private sector actors, non-profits, and local communities. Specify mechanisms for ensuring inclusivity and equity in decision-making processes.

6. Quantitative Impact Assessment: Conduct a quantitative assessment of the projected impacts of your policy framework. Include metrics such as greenhouse gas reduction targets, potential economic benefits, and improvements in social well-being.

7. Implementation Roadmap: Develop a step-by-step roadmap for implementing the policy framework from 2025 to 2050. Include key milestones, funding sources, and mechanisms for monitoring and evaluation.

Response format:
Landscape analysis: Comprehensive analysis of global climate challenges, including extreme weather events, biodiversity loss, and socio-economic disparities.

Regional Insights: Detailed examination of regional disparities and specific needs for Sub-Saharan Africa, Southeast Asia, and SIDS.

Policy Framework: A structured global policy framework addressing finance, technology transfer, and circular economies.

Case studies: Incorporation of successful climate resilience initiatives with evidence and outcomes.

Stakeholder engagement: Plans to ensure inclusivity and equity in stakeholder engagement, detailing roles and mechanisms.

Impact Assessment: Quantitative assessment of policy impacts, including GHG reductions, economic benefits, and social metrics.

Implementation roadmap: A phased roadmap outlining milestones, funding sources, and monitoring strategies for 2025–2050.
```

> 🔷 Complexity explained:

-   **Step-by-step structure:**

    The task carefully breaks a complex problem into separate stages, each devoted to a critically important aspect of global climate strategy. This modular approach not only provides clarity but also helps Gemini tackle each task systematically, reducing the risk of incomplete or unfocused results. Effective prompt design rests on structuring tasks, which ensures manageable and logical progress.

-   **Multi-layered contextualization:**

    The prompt provides several layers of context, from the global perspective (the World Economic Forum) to regional specifics (vulnerable regions such as Sub-Saharan Africa). By including this kind of nuanced context, the prompt ensures that Gemini generates answers that are relevant at both the global and the local level. Building prompts with multi-layered context is a hallmark of advanced prompt engineering.

-   **Defined output format:**

    A clear response format is defined, specifying separate sections such as situation analysis and policy framework. This level of detail standardizes the output, ensuring it is consistent and complete. A clear response structure is crucial for high-stakes tasks, letting the model meet user expectations and stay accurate.

-   **Inclusion of interdisciplinary data:**

    The prompt combines environmental science, socio-economic factors and policy frameworks into a single task. This interdisciplinary requirement challenges Gemini to synthesize diverse streams of information. Prompts that bridge several fields require careful design so that they do not overload the model and so that it stays coherent.

-   **Demand for analytical depth:**

    The task includes both qualitative conclusions (for example, stakeholder engagement strategies) and quantitative indicators (for example, greenhouse gas reduction targets). This dual requirement demonstrates Gemini's ability to balance narrative depth with data-driven precision. Advanced prompt engineering techniques exploit this ability by explicitly requesting both analytical and interpretive outputs.

-   **Consideration of a high-level audience:**

    The target audience (the executive committee of the World Economic Forum) is clearly specified, which allows Gemini to adapt the tone, complexity and depth of the output for a professional, specialized audience. When designing prompts for expert-level tasks, define the audience carefully to ensure relevance and correct use of language.

-   **Iterative and feedback-friendly design:**

    The segmented task structure inherently supports iteration. If any section of the output needs refinement (for example, the impact assessment), feedback can focus on that specific part without requiring a complete rework. Effective prompts anticipate iterative refinement, which makes it easier to deal with incomplete or low-quality responses.

-   **Clear timeframes and milestones:**

    Including specific timeframes (2025–2050) and stages adds a forward-looking dimension to the task. This ensures that Gemini generates practical ideas aligned with the time targets. Prompts with timeframes steer the model toward sequential thinking, aligning recommendations with realistic implementation stages.

Although formatting is usually not critical for most Gemini prompts, Master-level prompts are an exception. They are designed for complex tasks, so a clear structure and formatting are necessary to achieve the best results.

Alternatively, you can break this master prompt into smaller parts using [Prompt Chaining](#введение-в-gemini-и-разработку-промптов)**.** This lets you guide Gemini step by step, giving you a chance to review and refine each output before moving on.

* * *

#### 【3.5.】Context Manipulation Exercises for Prompt Design

> Now that you have learned the basic and advanced techniques for using context in prompt design, it is time to practice. These exercises will help you hone your skills at guiding Gemini effectively while keeping it coherent and relevant across different contexts.

> 🔹 Exercise 1: **Topic Switching**

* * *

> Design a sequence of prompts that switch between unrelated topics. Start with a discussion of a historical event, move on to analyzing a scientific concept, and finish with a lifestyle request. Make sure the transitions between topics are smooth and logical, keeping the conversation engaging throughout.

This exercise will help you build the skill of quickly adapting the style and structure of prompts to unrelated topics. It is useful for real-world tasks where topic changes happen often.

> 🔹 Exercise 2: **Context Retention**

* * *

> Create a dialogue in which Gemini must remember information from earlier prompts in order to enrich later responses. Start by discussing a book, then link it to a philosophical question raised in the book, and finish with a real-life application of the philosophy.

This exercise will teach you to write prompts that require Gemini to remember and use previously provided information across several turns of a conversation. By connecting a book discussion to a deeper philosophical idea and then applying it to real life, you will learn to sustain coherent, multi-layered conversations.

> 🔹 Exercise 3: **Multiple User Inputs**

* * *

> Design a scenario in which Gemini needs several inputs from the user to solve a complex problem. For example, troubleshooting a software issue where the user enters the data gradually.

This exercise develops your skills in designing prompts that account for evolving user input. This matters because real problems often unfold in stages, requiring Gemini to adapt and respond accurately as new details appear.

> 🔹 Exercise 4: **Resolving Ambiguity**

* * *

> Write a prompt in which the initial input is ambiguous and requires Gemini to ask clarifying questions. After the user provides clarification, Gemini should give a precise and well-reasoned answer.

This exercise strengthens your skills in designing prompts that handle ambiguity effectively. It highlights the importance of interactive prompts in which Gemini asks for clarification before generating a meaningful response.

> 🔹 Exercise 5: **Multi-Step Analysis**

* * *

> Create a scenario in which Gemini builds on earlier prompts to generate a comprehensive analysis. Start with a dataset, ask for an analysis, and then ask for practical recommendations based on that analysis.

This exercise highlights the power of prompt chaining for deepening analysis over time. By working sequentially from data analysis to strategic recommendations, you will learn to guide Gemini through complex reasoning in clear steps.

> Reminder: effective context management is a skill that takes practice and feedback. Experiment with these exercises and watch how Gemini responds to your tasks. By iterating on your prompts, you will develop a deeper understanding of how to steer conversations and generate results that are accurate, relevant and context-aware.

* * *

> **Go to the next chapter**

[4️⃣Improving Prompts for Better Results](#улучшение-подсказок-для-более-качественных-результатов)

* * *

* * *

### Improving Prompts for Better Results

> **Navigation**:

* * *

**Next page**: [5️⃣Controlling the Length and Format of Gemini's Output](#управление-длиной-и-форматом-результатов-gemini)

**Previous page**: [3️⃣Exploring the Importance of Context](#изучение-важности-контекста)

**Collection home page**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

> Contents

* * *

#### 【4.1.】Refining Prompts: A Step-by-Step Guide

* * *

> Refining and debugging prompts is an essential skill in prompt engineering. By analyzing and improving prompts systematically, you can get more accurate, relevant and higher-quality results. Below is a step-by-step guide to refining prompts for Gemini to ensure optimal performance.

> ▫️ Step 1: **Understand the prompt and its output**

* * *

**Goal**: analyze the relationship between the prompt and the output.

-   Start by clearly defining the intent of your prompt. What do you want to achieve?
-   Compare the expected result with Gemini's actual response.
-   Determine whether the output matches your original intent or falls short of it.

**Example**

If you ask *"Explain how inflation works,"* but the output focuses on inflating balloons *,* rather than economic inflation, that is a sign the prompt may not be specific enough or may lack contextual cues.

> ▫️ Step 2: **Identify the problem**

* * *

**Goal**: pinpoint exactly what is wrong with the output.

-   Ask yourself:
    -   Is the answer off-topic or irrelevant to the question?
    -   Does it lack clarity, structure or the desired depth?
    -   Is the output too wordy or too terse?
    -   Are key details missing?

**Common problems**:

-   Vagueness in the prompt leads to vague answers.
-   Insufficient context or no guidance on format or tone.

**Example**

For a prompt like *"Explain artificial intelligence in simple terms,"* if the response uses technical jargon *,* the problem is insufficient emphasis on simplicity.

**Example of a correction**:

Original: *"Explain AI in simple terms."*

Refined version:

```
You are a teacher explaining concepts to high school students.
Explain artificial intelligence in simple, everyday language.
```

> ▫️ Step 3: Adjust the prompt

* * *

Once you have identified the problem, adjust the prompt accordingly. This may mean adding more context, using more specific wording, or including instructions or indicators.

> ▫️ Step 4: Test the adjusted prompt

* * *

**Goal**: check whether the refinement fixes the problems.

-   Run the revised prompt in Gemini and review the output:
    -   Does it meet your expectations?
    -   Does it solve the original problems?

**Test example**:

If the refined prompt now produces a simplified explanation of AI suitable for high school students, the adjustments were effective.

> ▫️ Step 5: Iterative refinement

* * *

**Goal**: repeat the process until the output is optimal.

-   If the output is still unsatisfactory, refine further:
    -   add the missing details or simplify the instructions even more.
    -   Consider breaking the task into smaller steps using prompt chaining.

**Iteration example**:

If the explanation of AI still contains unnecessary jargon, refine it:

*"Explain AI to a 10-year-old, avoiding all technical terms and focusing on relatable examples."*

> ▫️ Step 6: Documentation

* * *

**Goal**: keep a record of the refinement process.

-   Document the original prompt, the problems you identified and each iterative change.
-   Keep the final prompt and its successful output as reference material for future tasks.

**Benefits**:

-   Provides a resource for learning and improvement.
-   Streamlines future prompt design for similar tasks.

**Documentation example**:

-   **Initial prompt**: "Explain what AI is."
-   **Problem**: too broad, which led to a technical answer.
-   **Refined prompt**: "Explain AI to a 10-year-old using relatable examples."
-   **Final output**: "AI is like a robot's brain that helps solve problems, for example suggesting songs you might like or quickly finding answers on the Internet."

> Prompt refinement is an iterative and creative process. By following these steps, you can turn vague or ineffective prompts into precise instructions that help Gemini generate high-quality results. Over time this process will become second nature, and you will become a master of prompt engineering.

* * *

#### 【4.2.】From Intermediate to Expert-Level Prompts: The Evolution

> Mastering prompt design for Gemini is a continuous process of improvement. Moving from intermediate prompts to expert-level prompts requires adding specificity, context and clarity, and tailoring outputs to a particular audience or use case. Here we will walk through the evolution of a prompt to show how to get more precise and effective responses.

> ▫️ The refinement process:

#### Initial prompt (intermediate level):

```
"Explain artificial intelligence."
```

This prompt is too general. Gemini will provide a general explanation, but it lacks context and focus, which may lead to an overly generic output. Let's refine it.

#### Refined prompt 1:

```
"Explain artificial intelligence in the context of healthcare."
```

Adding the **healthcare** domain narrows the scope of the response. Gemini will focus on applications of AI in healthcare, but the output may still lack detail or practical examples.

#### Refined prompt 2:

```
"You are a healthcare consultant. Explain how artificial intelligence is transforming patient diagnosis and treatment in healthcare. Include examples of AI tools currently in use."
```

By assigning the role of a healthcare **consultant** and specifying the task (patient diagnosis, treatment and examples), this prompt adds structure and ensures a more detailed and relevant response. The output will now include real-world applications of AI in healthcare.

#### Expert-level prompt:

```
You are a healthcare data scientist.

Write a detailed report for hospital administrators on the role of artificial intelligence in transforming patient diagnosis and treatment.

Highlight key AI tools, their benefits, potential risks, and the steps required for effective implementation.

Structure the report with an introduction, main body, and conclusion.

Use a professional tone suitable for senior healthcare professionals.
```

This expert-level prompt includes a role, a task, content requirements, a format and a tone. It explicitly tells Gemini to produce a comprehensive, structured response tailored to a professional audience. By specifying the structure and tone of the report, the prompt ensures the output meets high standards of detail and professionalism.

> Refining prompts with indicators illustrates the art of moving from an intermediate to an expert level of prompt design. Each refinement step adds layers of specificity and structure, ensuring that Gemini generates responses that are deep, practical and tailored to the user's needs.

-   **Clarity and structure**: instruction indicators help organize the prompt, reducing ambiguity and steering Gemini toward precise results.
-   **Contextual relevance**: defining the role and the audience ensures the content fits its intended purpose.
-   **Specificity**: adding tags for content, format and tone further refines the scope and style of the response.
-   **Greater flexibility**: instruction tokens make it easier to adapt prompts to different levels of complexity or target audiences.

* * *

#### 【4.3.】Exercises for Practicing Prompt Refinement

> These exercises are designed to test your ability to refine generic prompts, turning them into structured, context-rich and targeted instructions. Using instruction tokens to add clarity and specificity, your task is to transform each original prompt into a refined expert-level prompt that demonstrates advanced prompt design techniques.

> Exercise 1: **Business Strategy**

* * *

**Original prompt:**

```
"Write about business strategy."
```

**Your task:**

1.  Define a **specific focus** within business strategy, such as a particular industry or growth method.
2.  Assign Gemini an **appropriate role**, such as a business consultant or strategist, to narrow its perspective.
3.  Include instructions to add **structure and requirements**, such as tone, format and specific content.
4.  Include practical elements, such as **case studies** or **step-by-step instructions**, to make the response actionable.

**Hint:** Think about a small business context or a startup scenario to add precision.

> Exercise 2: **Technological Innovation**

* * *

**Initial prompt:**

```
"Discuss technological innovation"
```

**Your task:**

1.  Choose a **specific sector** (for example, healthcare or education) to focus on.
2.  Add a **purpose** for the discussion, such as exploring challenges, trends or ethical considerations.
3.  Use instructions to request specific sections, such as **current advances**, **future implications** and **case studies**.
4.  Specify the desired **tone** (for example, analytical or futuristic) and **format** (for example, a report or an essay).

**Hint:** narrowing the scope to a current topic, such as "AI in healthcare," can make the task more manageable.

> Exercise 3: **Healthy Eating**

* * *

**Initial task:**

```
"Give advice on healthy eating."
```

**Your task:**

1.  Define the **target audience**, such as busy professionals, athletes or families.
2.  Specify the type of guidance needed, such as **meal planning**, **nutrition tips** or **quick recipes**.
3.  Use "Instruction" tokens to break the response into sections, such as **meal ideas**, **snack tips** and **meal prep strategies**.
4.  Give Gemini a friendly role, such as a **nutritionist**, to make the tone more engaging.

**Hint:** consider practical constraints, such as time, cost or dietary restrictions, for further refinement.

> Exercise 4: **Digital Misinformation**

* * *

**Initial prompt:**

```
"Talk about digital misinformation."
```

**Your task:**

1.  Focus on a **specific aspect** of misinformation, such as social media algorithms, deepfakes or the impact on elections.
2.  Assign a **role tied to the specific field**, such as a media literacy educator or a cybersecurity expert, to ground the discussion.
3.  Structure the output with instruction tokens to include **context**, **solutions** and **real-world incidents**.
4.  Specify the **target audience**, such as **educators or policymakers**, to set the tone and level of detail.

To get a focused response, ask a targeted question, such as: *"How have deepfakes affected public trust during recent elections?"* This fits the task by prompting the AI to address context, real-world incidents and possible solutions.

> Exercise 5: **Creative Writing**

* * *

**Initial prompt:**

```
"Write a story."
```

**Your task:**

1.  Add a **specific setting** (for example, a dystopian future or an enchanted forest) and context.
2.  Specify **key elements**, such as characters, themes or conflicts, to guide the narrative.
3.  Use instructions to define parts such as the **setup**, **climax** and **resolution**, for a structured narrative.
4.  Assign Gemini a creative role, such as a **fantasy author** or a **science fiction storyteller**, to influence the tone.

**Hint:** Think about the audience or the message you want to convey in the story. For example, "A story about resilience in a post-apocalyptic world."

> After refining each prompt, compare the results generated by Gemini with the original versions. Analyze how using instruction tokens improves the clarity, relevance and sophistication of the responses. With practice you will master the art of prompt refinement, ensuring precise, high-quality Gemini results tailored to your needs.

* * *

* * *

> **Go to the next chapter**

[5️⃣Controlling the Length and Format of Gemini's Output](#управление-длиной-и-форматом-результатов-gemini)

* * *

* * *

### Controlling the Length and Format of Gemini's Output

> **Navigation**:

* * *

**Next page**: [6️⃣Getting Started with Advanced Prompt Design Techniques](#начало-работы-с-передовыми-техниками-дизайна-подсказок)

**Previous page**: [4️⃣Improving Prompts for Better Results](#улучшение-подсказок-для-более-качественных-результатов)

**Collection home page**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

> **Contents**

* * *

#### 【5.1.】Techniques for Controlling the Length and Format of Gemini's Output

> The ability to control the length and format of Gemini's responses is an essential skill in prompt engineering. By using advanced techniques and the flexibility of instruction tokens, you can steer Gemini to produce responses that match your specific requirements for brevity, detail or structure.

> 🔹 **1\. Be clear in your prompts:**

* * *

> The simplest way to control length is to give direct instructions. Gemini responds well to explicit commands about the desired length or format.

**Example:**

Use instruction tokens to define the length and format of the response:

-   **Length**: specify the exact number of sentences or words.
-   **Content**: specify the required depth of information.

**Structured prompt:**

-   **Role:** define the role Gemini plays (for example, a professor summarizing a lecture).
-   **Task**: use clear instructions, such as "Summarize this article in three sentences."

**Why it works:**

Clear instructions ensure that Gemini matches your expectations precisely.

> 🔹 **2\. Use prompts that specify length and format:**

* * *

> For some tasks you should specify a length range. Giving Gemini some flexibility produces more natural and complete responses instead of rigid or overly constrained output.

**Example:**

For a short format:

-   Ask for a **tweet** (no more than 280 characters).
-   Ask for a poem **in haiku style** (5-7-5 syllables or similar).

**Structured prompt with instruction tokens:**

-   **Role:** A social media content creator with a talent for poetry.
-   **Task:** "Write a tweet in haiku style that emphasizes the importance of sustainability."
-   **Length**: "280 characters or fewer."

**Why it works:**

Strictly demanding an exact output length is not always ideal. Giving Gemini a length range, such as "about 300 words," often produces more natural and informative responses.

> 🔹 **3\. Structure the prompt with lists:**

* * *

> Requesting lists and showing what the output should look like is an effective way to control both the format and the length of a response.

**Example:**

Request a structured list:

-   **Role**: nutritionist.
-   **Task**: "List five foods high in sugar."
-   **Response format**: A numbered list with designated sections for **food name**, **sugar content** and **health risks**.
-   **Example:**

1.  (Food name 1) — (sugar content)
    -   (Health risks)
2.  (Food name 2) — (sugar content)
    -   (Health risks)

**Why it works:**

Lists naturally confine the response to a fixed structure. Ideal for tasks that require strict formatting.

> 🔹 **4\. Use follow-up questions to control response length:**

* * *

> If Gemini's initial output does not meet your needs, follow-up prompts can refine the length or detail of the response.

**Example:**

1.  Initial prompt:
    -   "Explain the causes of soil erosion."
2.  Follow-up question:
    -   "Summarize your explanation in one sentence."
    -   Or: "Give a detailed explanation with examples."

**Why it works:**

Repeated prompts help refine the response without starting over, and ensure it matches your expectations.

> 🔹 **5\. Use Gemini's settings**

* * *

> There is a way to customize Gemini's responses without repeating formatting instructions in every session. Most modern LLMs have a similar feature.

**Example of a custom setup from Gemini itself:**

-   Use plain language and avoid jargon
-   I am a vegetarian, so do not suggest recipes with meat
-   After your answer, add a translation into Spanish
-   When planning a trip, give the cost per day
-   I can only write code in JavaScript
-   I prefer short and concise answers

**Why it works:**

These presets save time and let you focus on refining responses rather than redefining the format in every session.

Your custom presets should focus on general response-style preferences that apply to most interactions, while instruction tokens in the conversation handle specific session-based formatting or one-off settings.

> Gemini's responses can be steered with a combination of explicit instructions, contextual cues and structural formatting. Using instruction tokens improves precision, letting you control the style, length and depth of the output effectively. By practicing these techniques, you will develop a more intuitive sense of how to build prompts that deliver the results you want.

> Experiment with these techniques and adapt them to your tasks. Through repeated testing and refinement, you will master the art of controlling the length and format of Gemini's responses.

* * *

#### 【5.2.】Expert-Level Prompts Demonstrating These Techniques

> 🔹 **Prompt 1: Be clear in your prompts**

* * *

```
You are an expert in artificial intelligence ethics, writing for an audience of interdisciplinary researchers and policy advisors.

Summarize the core ethical challenges involved in deploying artificial intelligence systems for public-sector decision-making, such as in criminal justice, healthcare allocation, or social services. Emphasize issues including algorithmic bias, transparency, accountability, and the impact on democratic processes. The summary must be written in formal academic tone, suitable for inclusion in a policy white paper.

Constraints:
– Output must consist of exactly five sentences
– Deliver as one cohesive paragraph, without bullet points or list formatting
– Avoid generic claims; use precise, field-relevant terminology
– Do not include citations or footnotes
```

> 🔹 **Prompt 2: Use prompts that specify length and format**

* * *

```
You are a social media strategist specializing in climate communication and public engagement.

Write a tweet that concisely conveys the global significance of renewable energy in advancing sustainable development. Your message should balance urgency and inspiration, appealing to a general audience while maintaining factual clarity. Prioritize strong verbs, emotionally resonant phrasing, and a tone that encourages action or reflection.

Constraints:
– Must fit within 280-500 characters
– No hashtags or emojis
– Avoid technical jargon, but preserve the integrity of the message
– Style should align with high-impact nonprofit or policy-focused Twitter accounts
```

> 🔹 **Prompt 3: Structure the prompt with lists**

* * *

```
You are an environmental sustainability consultant tasked with advising mid-sized companies on waste reduction.

Identify the top five organizational strategies for minimizing waste across operations, logistics, or workplace culture. Present your output as a numbered list, with each item consisting of a strategy name followed by a one-sentence explanation. The explanation should clearly link the strategy to its environmental or operational benefit.

Use the following format and fill in the placeholders:

1. [Strategy Name] — [One-sentence explanation of how this strategy reduces waste and adds value].

2. [Strategy Name] — [Explanation].

3. [Strategy Name] — [Explanation].

4. [Strategy Name] — [Explanation].

5. [Strategy Name] — [Explanation].

Constraints:
– Use plain language suitable for decision-makers with no technical background
– Avoid generalities like “go green”; be specific and actionable
– Keep each sentence under 25 words
```

> 🔹 **Prompt 4: Use follow-up questions to control response length**

* * *

First prompt:

```
You are a blockchain expert writing for an audience with intermediate technical knowledge.

Explain the underlying technology of blockchain and its core principles in clear, technically accurate language. Include key concepts such as distributed ledgers, consensus mechanisms, cryptographic security, immutability, and decentralization. Your explanation should read as a cohesive, paragraph-style narrative suitable for publication in a technical explainer or educational resource.

Constraints:
– Avoid analogies unless necessary for clarity
– Use correct technical terminology
– Do not use list or bullet formats
```

Follow-up prompt:

```
Revise the explanation above to fit within approximately 250 words while preserving technical depth and clarity. Prioritize concise phrasing without oversimplifying the core concepts.
```

> These expert-level prompts demonstrate advanced techniques for controlling Gemini's output with instruction tokens. The indicators clearly define roles, tasks and output formats, allowing Gemini to generate precise responses tailored to complex requirements. Practicing these methods will let you hone your skill at getting specific, high-quality results consistently.

* * *

#### 【5.3.】Exercises for Implementing Length and Format Control

> 🔹 **Exercise 1: Explicit Format Control**

* * *

> Write a prompt that instructs Gemini to write a five-sentence summary of the importance of data privacy in modern technology.

> 🔹 **Exercise 2: Explicit Length Control**

* * *

> Create a prompt that asks Gemini to write a professional LinkedIn post about the benefits of remote work.

> 🔹 **Exercise 3: Format Control with Lists**

* * *

> Write a prompt that asks Gemini to identify and describe the five main strategies for improving employee productivity as a structured list.

> 🔹 **Exercise 4: Using Follow-Up Prompts to Limit Length**

* * *

> Create a two-step prompt about the concept of quantum computing. The first part should request a detailed explanation, and the follow-up should ask Gemini to summarize it in plain language that a high school student can understand.

> 🔹 **Exercise 5: Using System-Level Prompts**

* * *

> Design a system prompt that instructs Gemini to respond in the style of an X feed summarizing the history of artificial intelligence, with each tweet limited to 280 characters.

> Test each exercise with Gemini and evaluate how effectively it meets the specified length and format constraints. Pay particular attention to whether the explicit instructions affect the output as intended. If necessary, refine your prompts to better control length and formatting, and learn from any unexpected results to improve your skills.

* * *

* * *

> **Go to the next chapter**

[6️⃣Getting Started with Advanced Prompt Design Techniques](#начало-работы-с-передовыми-техниками-дизайна-подсказок)

* * *

### Getting Started with Advanced Prompt Design Techniques

> **Navigation**:

* * *

**Previous page**: [5️⃣Controlling the Length and Format of Gemini's Output](#управление-длиной-и-форматом-результатов-gemini)

**Collection home page**: Gemini Guide (the "Guardians of the Galaxy" mission)

* * *

> Contents

* * *

#### 【6.1.】Introduction to Advanced Prompt Design Techniques

Welcome to the "Advanced Techniques" section of the "Mastering Gemini Prompt Design" course. Here I will deepen your understanding of Gemini by exploring advanced strategies for steering the model toward more nuanced, specific and effective results.

These techniques let you get the most out of Gemini's potential, building on the foundational skills you have already mastered.

#### Why advanced techniques matter

While basic and intermediate prompting methods provide a solid foundation, advanced methods let you:

-   Design prompts for very specific use cases.
-   Optimize performance within Gemini's context window, especially when using the free version.
-   Tailor outputs to unique requirements for tone, style or audience.
-   Master Gemini's strengths, such as **advanced reasoning** and **multimodality.**

> 🔹 **Here is a brief overview of what we will cover in this section:**

* * *

1.  **Token-aware prompt compression**: Gemini's context token limit is huge, but the key is efficiency. Understanding how to structure prompts to save tokens leaves room for extensive responses, especially for long outputs such as detailed reports or analyses. This approach is particularly beneficial for free-tier users, letting them get the most out of Gemini without hitting token limits so quickly.

    **Example goal**: optimize token usage when asking Gemini to summarize several articles by grouping the requests and specifying the length of each summary.

**Pro tip**: use concise, targeted indicators to prioritize content without losing detail. Avoid redundant details and unnecessary context.

> For those using the **Gemini API**, even premium models charge per token. While the cost of a single token may be low, if you process huge volumes of data or generate very long responses, those tokens add up. Mindful token use helps manage and reduce operating costs.

* * *

1.  **Referencing the conversation chain**: prompting is not always a linear process; sometimes you need to go back to an earlier exchange with Gemini and raise a point, especially when refining an idea, correcting a misunderstanding or building on earlier context. Gemini Pro handles this technique exceptionally well thanks to its huge context window (1 million tokens!), which lets it keep extensive memory of the current conversation and use past information effectively.

**Example goal**: improve a new response by asking Gemini to repeat the response format it used for a previous request in the same session.

**Pro tip**: use short labels such as *"Format A"* or *"the previous list format"* when referring to earlier outputs. This makes it easier for Gemini to recognize and reproduce the desired structure, especially if you will be reusing that format later in the same session.

* * *

1.  **Dynamic multi-role synthesis:** by now you know how to assign roles to Gemini, but what about several roles at once? This technique is useful when you want to see multiple perspectives on topics that are highly subjective or more open to interpretation.

**Example goal**: generate possible viewpoints of representatives of different social classes on a new law or policy that is currently under development.

**Pro tip**: to avoid bias or blending of roles, **give each role a separate voice or objective** and **use structured markers**, such as headings, dividers or even different writing styles (for example, formal and informal). This will help Gemini keep a clear separation between roles, especially in long or nuanced outputs.

1.  **Self-reflection prompting:** when Gemini makes mistakes or gives an unexpected result, you may be tempted to step in and correct it right away. But in some cases it is more useful to ask it to explain why it generated that answer, so you can better understand its reasoning, spot any hidden problems with your prompt, and steer it more effectively in your follow-up instructions.

**Example goal**: after recognizing a hallucination, or if you simply want to double-check, ask Gemini to explain step by step how it arrived at its answer.

**Pro tip**: use this prompting technique when Gemini's answer seems wrong but you are not sure why. Asking it to explain or analyze its answer can reveal reasoning errors or missed context.

* * *

1.  **Structuring Deep Research:** Gemini's Deep Research feature is not meant for simple questions. This feature calls for more expert, detailed prompts that are goal-oriented and evidence-based.

**Example goal:** **ask Gemini to research several open-source game engines released over the past five years, and ask it to provide detailed information about each engine.**

* * *

**Pro tip: when** using Deep Research in Gemini, **anchor your request to specific names, dates or domains** (for example, *"According to the WHO in 2024"* or *"statements by Nvidia's CEO on AI chip exports"*) to narrow the search scope. Gemini prioritizes **semantic relevance**, so providing specific references improves accuracy and helps it find authoritative sources instead of generic summaries.

* * *

1.  **Strategic multimodal prompting:** Gemini was built from the ground up to understand, process and combine different types of information, including text, images, audio and video. This lets it perform tasks such as analyzing an image and discussing its content, or transcribing and summarizing a video.

**Example task:** upload a photo and ask Gemini to identify objects, explain concepts or provide details about what is shown.

**Pro tip: to** get the most out of multimodal prompts, especially for complex tasks, use **multimodal "Chain of Thought" (CoT) prompts with external grounding**. This means that instead of asking a direct question, you first ask Gemini to **analyze and describe in detail the visual or audio input**. Then provide **additional text context** (for example, a document or relevant data) related to the visual/audio signal. Finally, ask Gemini to **synthesize both the multimodal observations and the external text** to reason, draw conclusions and generate a **more accurate and deeply grounded output**, making sure its answer is firmly based on all the information provided.

> Advanced techniques let you build prompts that deliver superior results in specialized scenarios. However, their effectiveness comes from practice, experimentation and iterative refinement. As we go deeper into these techniques in the following sections, remember to use all the lessons you have learned so far to develop your skills.

Watch for detailed examples and exercises to master these advanced techniques. Let's unlock the full potential of Gemini for your specific use cases!

* * *

#### 【6.2.】Expert-Level Prompts Demonstrating Advanced Techniques

> 🔹 **1\. Token-aware prompt compression**

* * *

A token-aware compressed prompt is a short version of a prompt, optimized to reduce the number of tokens while preserving the core meaning. It minimizes redundant words to fit within token limits for efficient processing by AI models.

* * *

Original prompt:

```
Create a detailed description of a futuristic city with advanced technology, sustainable energy, and diverse population, focusing on its infrastructure, culture, and daily life of residents.
```

Compressed prompt:

```
Describe a futuristic city: advanced tech, sustainable energy, diverse population, focusing on infrastructure, culture, and daily life.
```

* * *

The second prompt reduces the token count by eliminating redundant words while preserving the main requirements.

> 🔹 **2\. Referencing the conversation chain**

* * *

This technique involves linking prompts to earlier interactions in the dialogue, which lets Gemini maintain context and coherence. It uses identifiers or summaries to recall relevant details, improving the accuracy and continuity of responses.

* * *

Prompt:

```
Based on our previous discussion about a futuristic city's sustainable energy solutions, describe how its transportation system integrates with those energy sources.
```

* * *

CTR prompts usually begin by identifying a specific reference point, followed by an instruction on how to use or respond to that reference.

> 🔹 **3\. Dynamic multi-role synthesis**

* * *

This prompting technique lets Gemini take on several roles or perspectives at once, adapting dynamically to the context and the user's needs to deliver more versatile and contextually relevant responses.

* * *

Prompt:

```
Assume the roles of a city planner, an environmental scientist, and a community resident to collaboratively design a sustainable urban park for a city of 500,000 people.

As the city planner, outline the park’s layout, infrastructure, and integration with public transit.

As the environmental scientist, detail eco-friendly features like native plant species, water recycling systems, and renewable energy sources, explaining their ecological benefits.

As the resident, describe how the park enhances community life, supports local culture, and improves daily activities for diverse groups. Ensure the response synthesizes all perspectives into a cohesive plan.
```

* * *

The multiple roles in this prompt are meant to collaborate on different aspects of the project, but they can just as effectively be set against each other to explore contrasting viewpoints.

> 🔹 **4\. Self-reflection prompts**

* * *

Although this method is commonly used to deal with hallucinations, it is equally useful when you want to refine a response or understand how Gemini reached its conclusion.

* * *

Prompts:

-   "How did you arrive at this conclusion?"
-   "Double-check whether `[point to a specific detail in the response]` is correct, because `[insert your argument for why you think this detail is wrong]`.
-   "Tell me how you arrived at this answer."

* * *

There are several approaches to this technique. A useful strategy is to phrase the question as if you were asking a friend to reconsider their statement or to assess how reliable their source is.

> 🔹 **5\. Structuring Deep Research**

* * *

Deep Research takes more effort, because it demands greater clarity, specificity and structure to guide the model through multi-level reasoning and careful interpretation of sources.

* * *

Prompt:

```
You are a marketing research analyst with expertise in unconventional marketing strategies.

Conduct a Deep Research investigation into rogue marketing tactics used within the past 3 years (2022–2025). Identify and describe the most notable and effective rogue marketing campaigns during this period. For each tactic, provide a detailed breakdown that includes:

- The company or brand that used it
- A description of the tactic
- The context or industry in which it was applied
- Measurable outcomes (e.g., conversion rates, brand visibility, ROI)
- Public or media reception
- Ethical concerns, if any

Include reliable citations or links to sources for each example. Structure the output by campaign or tactic, and present the findings in an organized, well-formatted way suitable for further analysis.
```

* * *

Use Deep Research when your task demands high accuracy and reliable source references, or when you want to practice designing and running complex master-level prompts.

> 🔹 **6\. Strategic multimodal prompts**

* * *

Multimodal prompts are used for tasks where the AI has to analyze more than just text. They are ideal for tasks involving visual data, such as examining microscopic samples or interpreting charts. This approach helps the AI combine information from different formats for more accurate reasoning.

* * *

Prompt:

```
Analyze the attached image of a microscopic biological sample. Identify and quantify the different cellular structures present, paying close attention to any anomalies in morphology or distribution. Based on this visual data, and assuming this sample was taken from a patient exhibiting symptoms of Rheumatoid Arthritis, propose a plausible cellular mechanism explaining the observed abnormalities and suggest potential diagnostic markers or therapeutic targets visible within the image.
```

* * *

This prompt is effective because it forces Gemini to analyze visual data directly, integrate it with the given text context, and then perform complex reasoning to generate a nuanced, contextually grounded output that goes beyond simple description.

* * *

#### 【6.3.】Exercises for Practicing Advanced Techniques

> This final section presents exercises to help you master advanced techniques in Gemini prompt design. These exercises incorporate all the techniques we have discussed so far. As you work through these tasks, remember that practice is the key to improving your skills.

> 🔹 **Exercise 1 for token-aware prompt compression**

* * *

> Write a **token-aware compressed prompt** that asks Gemini to identify and summarize the 3 main consumer behavior trends found in a document. Your prompt should be clear, focused and optimized to use as few tokens as possible, **while still guiding the AI to perform a precise and useful analysis**.

> ☝ **Tip**: Check your prompt for unnecessary phrases and find a way to use as few words as possible while keeping the instruction clear.

> 🔹 **Exercise 2 for referencing the conversation chain**

* * *

> Go to a previous session in Gemini and review earlier conversations. Write a prompt that references a past response of your choice and ask Gemini to develop that response in more detail, or to give a short summary of it if it is already long.

> ☝ **Tip**: be precise when describing the past conversation you are referring to.

> 🔹 **Exercise 3 for dynamic multi-role synthesis**

* * *

> You are exploring opposing viewpoints on a controversial approach to marketing. Write a prompt that assigns two different expert roles with conflicting viewpoints. Ask Gemini to simulate a debate between them and present a clear summary of their arguments.

> ☝ **Tip**: clearly define each role's expertise and position, and make sure their viewpoints genuinely conflict so that the discussion is meaningful.

> 🔹 **Exercise 4 for prompting self-reflection**

* * *

> Write a prompt that asks Gemini to analyze its own answer to a previous question. Your goal is to get the AI to assess the reasoning behind its answer, check it for possible flaws or bias, and suggest how the result could be improved if the question were asked again.

> ☝ **Tip**: focus on making the prompt clear and constructive, as if you were asking a colleague to double-check their thinking.

> 🔹 **Exercise 5 for structuring Deep Research**

* * *

> Create a Deep Research prompt that asks Gemini to research the most popular tourist destinations in a particular country over the past five years, including key attractions, visitor trends and supporting data.

> ☝ **Tip**: start by clearly stating the country and timeframe, then specify what information you are looking for (for example, directions, trends, data). Use precise wording to help Gemini focus its search.

> 🔹 **Exercise 6 for an advanced multimodal prompt**

* * *

> Design a multimodal prompt that analyzes an image of a room's current interior (image) and, given specific design preferences and a budget (text), generates a detailed renovation plan, including furniture suggestions and color palette recommendations.

> ☝ **Tip**: Think about how the AI's ability to "see" fine visual details, such as the existing furniture layout, lighting, or wall texture, significantly enriches its design suggestions compared to text-only input.

> These exercises cover everything you have learned about designing Gemini prompts. Experimentation and iteration are essential for mastering advanced techniques. Revisit your prompts, adjust them, and watch how Gemini's responses improve. As your understanding deepens, you will unlock the full potential of Gemini for a wide range of tasks. Happy prompt designing!

* * *

### Bonus Chapter: The "Vibe Coding" Protocol — Building Apps with Gemini

Gemini 3 is here, and it is not just a better text generator. It is about its absolute killer feature: **Vibe Coding**. This model was built for software development, and this bonus chapter is your dedicated plan for using that strength to the fullest.

I don't want you to go in blind and treat it like a standard chatbot. You have already mastered the basics of prompt engineering, and now it is time to cement that knowledge. We are switching from "writing content" to "application architecture," giving you the hyper-specific protocols you need to build fully functional tools in minutes.

Vibe coding is a vast topic, so in this document we will cover it in a super basic and high-level way to make it easier for you to get started, and then in a separate chapter we will dive deep into vibe coding services such as Google AI Studio, Antigravity, Lovable, Cursor and others in a separate document.

* * *

#### The Paradigm Shift: You Are Now the Product Manager

*Stop trying to write code.*

The biggest mistake people make with Gemini 3 is treating it like an upgraded autocomplete function. If you try to micromanage every line of syntax, you limit the model's potential and waste your own time. Gemini 3 is not just a programmer, it is a senior engineer who works 10,000 times faster.

Your role has fundamentally changed from "writer" to "architect." You are no longer laying bricks; you are drawing up the blueprint and scolding the foreman when the wall comes out crooked. The secret of "Vibe Coding" is not knowing Python or React, but being able to articulate the *behavior* and *feel* of the final product so clearly that the AI has no choice but to build it correctly.

#### The "God-Spec" Prompt: Anatomy of a One-Shot Build

*Garbage context in, garbage app out.*

To get a working prototype in one go, you need to do all the heavy lifting up front. You cannot feed requirements to Gemini 3 piecemeal; you need to use a "God-Spec" prompt that defines the entire reality of your app in a single block. This lets you take advantage of the huge context window so that every generated file takes the other files into account.

#### The 4-Pillar Structure

**Every "God-Spec" request must contain four distinct pillars to anchor the model.**

Here is an example of a "God-Spec" prompt for your mood tracking app idea:

**Show prompt**

```
Build a Progressive Web App (PWA) using React and Tailwind CSS. Use Recharts for data visualization. For state management, use Zustand. Do not use a backend yet; use localStorage to mock all data persistence for this prototype. The app must be fully responsive for mobile first.

When the user opens the app, they should see a 'Daily Check-in' dashboard.

Input: They tap a giant, animated emoji representing their current mood (Happy, Neutral, Stressed, etc.).

Context: After tapping, a slide-up drawer asks 'What are you doing?' with pill tags (Work, Exercise, Sleep).

Sync: Simulate a 'Syncing with Watch...' loader that pulls in mock heart rate data (e.g., '72 BPM') and correlates it with the mood entry.

Output: The dashboard updates immediately to show a 7-day line graph combining 'Mood Score' vs. 'Heart Rate Variability'.

The design should feel like a high-end wellness app (think Headspace meets Apple Health). Use a 'Glassmorphism' aesthetic with soft, blurred backgrounds and pastel gradients (Teal/Lavender).

Typography: Clean sans-serif (Inter or Roboto), large bold headers.

Interaction: Buttons should have a bouncy, tactile feel on click. Transitions between screens must be smooth fades, no hard cuts.

Do NOT use browser alerts for inputs; use custom toast notifications.

Do NOT generate separate CSS files; use Tailwind utility classes for everything.

Do NOT ask the user for login/signup in this version; go straight to the dashboard.

Do NOT use complex routing; keep it a single-page application logic.
```

#### Pillar 1: The Tech Stack (Hard Constraints)

Define hard boundaries right away. If you don't specify the stack, Gemini will guess and may choose a library you hate or an outdated framework. Be ruthless: "Use React, Tailwind CSS and Lucide Icons. No external CSS files."

```
Build a Progressive Web App (PWA) using React and Tailwind CSS. Use Recharts for data visualization. For state management, use Zustand. Do not use a backend yet; use localStorage to mock all data persistence for this prototype. The app must be fully responsive for mobile first.
```

#### Pillar 2: The Happy Path (User Flow)

Describe the ideal user journey from start to finish. Don't talk about database schemas yet; talk about what the user *sees*. "The user lands on the home page, sees a huge 'Upload' button, drags in a PDF file, and immediately sees a summary card appear on the right."

```
When the user opens the app, they should see a 'Daily Check-in' dashboard.
Input: They tap a giant, animated emoji representing their current mood (Happy, Neutral, Stressed, etc.).
Context: After tapping, a slide-up drawer asks 'What are you doing?' with pill tags (Work, Exercise, Sleep).

Sync: Simulate a 'Syncing with Watch...' loader that pulls in mock heart rate data (e.g., '72 BPM') and correlates it with the mood entry.
Output: The dashboard updates immediately to show a 7-day line graph combining 'Mood Score' vs. 'Heart Rate Variability'.
```

#### Pillar 3: The Vibe (UI/UX)

Use descriptive, sensory language to dictate the design. Words like "Glassmorphism," "Brutalist," "Enterprise-Clean" or "Apple-like spacing" work as style markers for the model.

```
The design should feel like a high-end wellness app (think Headspace meets Apple Health). Use a 'Glassmorphism' aesthetic with soft, blurred backgrounds and pastel gradients (Teal/Lavender).
Typography: Clean sans-serif (Inter or Roboto), large bold headers.
Interaction: Buttons should have a bouncy, tactile feel on click. Transitions between screens must be smooth fades, no hard cuts.
```

#### Pillar 4: The "No-Go" Zone (Negative Constraints)

State clearly what you *don't like* to save hours of debugging. "Don't use alerts; use toast notifications. Don't use placeholder images; use colored divs. Don't hallucinate API keys."

```
Do NOT use browser alerts for inputs; use custom toast notifications.

Do NOT generate separate CSS files; use Tailwind utility classes for everything.

Do NOT ask the user for login/signup in this version; go straight to the dashboard.

Do NOT use complex routing; keep it a single-page application logic.
```

**⚠️** **Reality check:** The "MoodSync" example above is a great illustration of Vibe Coding at work, but don't confuse speed with simplicity. While Gemini 3 can create a beautiful prototype or interface component in one go, building a production-ready SaaS with secure authentication, complex database relationships, and payment gateways is a harder task.

The "God-Spec" prompt is your launchpad, not an autopilot; as your app grows more complex, you will still need to iterate, debug, and carefully review the architecture — Gemini just speeds up that process 100 times over, but doesn't make it instant.

* * *

#### Using "Deep Think" for Architecture

*Don't touch the keyboard until you have a plan.*

Gemini 3's "Deep Think" mode lets it analyze complex logic before generating a single character of code. You need to force it to work this way. Never ask it to "just build the app" right away; ask it to *plan* the app first.

#### The "Spec First" Rule

Your first command should always end like this: "Before writing code, output a detailed `README.md` file and a file structure tree explaining your approach." This forces the model to "measure twice" before it "cuts once," catching logical architecture errors before they become bugs in your code.

#### Logic Stress Testing

Once the plan is presented, don't accept it immediately. Use the reasoning capabilities to check the logic. Respond: "Review this plan. Identify three edge cases where this user flow breaks, and explain how you will prevent them in the code."

* * *

#### The "Linting" Loop: Iterative Fix Strategies

*Fix the system, not the typo.*

When the code breaks (and it certainly will), your instinct will tell you to paste the error and say: "Fix this." This is beginner behavior that leads to whack-a-mole debugging, where one fix breaks two other things.

#### The "Surgical Fix" Technique

You should treat fixes as architecture updates, not quick patches.

Imagine you have built the MoodSync dashboard. It looks perfect. But when you click the "Sync Watch" button, nothing happens. No loading indicator, no data update — everything is dead.

From a technical point of view, the button's "onClick" event handler is not properly connected to the state management function. From a non-technical point of view, the button is a doorbell that isn't wired to the chime. You press it, but nobody in the house knows you are there.

**❌ The Beginner's Move (the wrong approach)**

```
"The button isn't working. Fix it."
```

This is too vague. Gemini may rewrite the entire button component, accidentally deleting your custom styling (the "glassmorphism" effect) or creating a new function that conflicts with your existing code. You risk fixing the logic but breaking the design.

**✅ The Surgical Fix (the right way)**

```
When I click the 'Sync Watch' button, the handleSync function is not triggering, and no error is logged in the console.

**Task:** Analyze the connection between the `SyncButton` component and the `useStore` state in `App.jsx`. Rewire the event handler so it correctly triggers the loading state.
**Constraint:** Do *not* change the visual styling of the button or the animation duration. Only fix the logic wiring.
```

You identified the symptom (no trigger), pointed to the likely cause (the connection between the component and the state), and explicitly protected your existing work (the styling).

#### Don't Restart, Refine

Gemini 3 has a huge memory. If you hit a dead end, don't wipe the chat. Ask it to "check our current progress against the original specs. Which features are missing, and is the code getting too complex? Redo it to simplify."

Although Vibe Coding lets you build without writing syntax, you shouldn't stay completely in the dark. A basic understanding of concepts like "state," "components," and "events" won't hurt.

When Gemini fixes a bug like this, ask: *"Explain why exactly this connection was broken and how your code fixed it."*

This turns every bug into a micro-lesson, gradually turning you from a "Vibe Coder" into a technical architect who can spot these problems before they arise.

* * *

#### The "Dynamic View" Prompt

*Stop imagining the interface. Look at it.*

Gemini 3's "Dynamic View" lets you render interactive widgets and live previews right in the chat interface. This is your secret weapon for rapid UI iteration. You can instantly check the "feel" of a button or layout without deploying a local server.

#### The Interactive Trigger

To trigger it consistently, you need to ask for it explicitly. Use phrases like: "Generate a dynamic view of this dashboard component so I can test the hover states" or "Render this calculator as an interactive widget right here."

#### The "Show, Don't Tell" Trick

Because Gemini 3 is multimodal, the fastest way to style an app is theft. Take a screenshot of an interface you like (for example, a Linear dashboard or a Stripe landing page) and paste it into the chat. Prompt: "Create the interface structure based on this image, but adapt it to my color palette defined in the God-Spec. Keep the exact spacing and density."

Gemini's real superpower is its built-in multimodality **. Don't just tell — show.** Text is rarely enough when you need a specific aesthetic or a complex architecture. By uploading reference images, you eliminate guesswork and force the model to instantly clone your exact vision.

* * *

#### Ready to Build an App? Use This Megaprompt Template!

```
# SYSTEM ROLE: SENIOR ARCHITECT (GEMINI 3)
You are an expert Senior Full-Stack Architect and Product Designer. Your objective is to architect and build a production-ready application based on the "God-Spec" provided below.

# OPERATIONAL RULES (READ CAREFULLY)
1. DEEP THINK FIRST: You must reason through the dependencies and logic before generating any output.
2. NO LAZY CODE: Never use comments like "// code goes here" or "// ... rest of logic". Write the full, functional code for every file.
3. PHASED EXECUTION: Do not output the full application code in your first response. Follow the "Workflow Protocol" defined at the bottom of this prompt.

# PILLAR 1: THE TECH STACK (HARD CONSTRAINTS)
Build strictly using this stack. No deviations.

[CORE FRAMEWORK - e.g., React + Vite / Next.js 14 App Router]
[STYLING ENGINE - e.g., Tailwind CSS (Utility First)]
[STATE MANAGEMENT - e.g., Zustand / Context API / Redux Toolkit]
[BACKEND/DATA - e.g., LocalStorage Mock / Firebase / Supabase]
[UI LIBRARY - e.g., Shadcn UI / Headless UI / Radix]
# PILLAR 2: THE HAPPY PATH (USER FLOW)
Prioritize this flow above all else.

[STEP 1: LANDING STATE - What is the very first pixels the user sees?]
[STEP 2: PRIMARY ACTION - What is the main button or input?]
[STEP 3: SYSTEM FEEDBACK - What loading state or animation occurs?]
[STEP 4: SUCCESS STATE - What is the final outcome view?]
# PILLAR 3: THE VIBE (UI/UX DESIGN TOKENS)
The app must feel premium and "vibe-coded."

[AESTHETIC STYLE - e.g., "Linear-like Dark Mode" / "Apple Health Clean"]
[COLOR PALETTE - e.g., "Slate-900 background, Indigo-500 accents"]
[INTERACTION PHYSICS - e.g., "Snappy, instant, no layout shifts"]
[TYPOGRAPHY - e.g., "Inter font, large bold headings, high contrast"]
# PILLAR 4: THE NO-GO ZONE (NEGATIVE CONSTRAINTS)
You are forbidden from doing the following:
[CONSTRAINT 1 - e.g., No browser alerts (use toast components)]
[CONSTRAINT 2 - e.g., No external CSS files (use Tailwind classes only)]
[CONSTRAINT 3 - e.g., No complex routing (Single Page Application logic)]
[CONSTRAINT 4 - e.g., No placeholder images (use colored divs or SVG icons)]
# WORKFLOW PROTOCOL (MANDATORY)
You will execute this project in the following strict order.

**RESPONSE 1 (YOUR NEXT REPLY):**
1. REASONING AUDIT: Use "Deep Think" to analyze the request. List any potential conflicts between the Tech Stack and the User Flow.
2. ARCHITECTURE PLAN: Output a text-based directory structure (File Tree) showing exactly what files you will create.
3. DEPENDENCY LIST: List the exact `npm install` commands needed.
4. STOP AND WAIT: Ask me for approval to proceed to coding.

**RESPONSE 2 (AFTER I SAY "PROCEED"):**
1. Generate the code file-by-file.
2. Start with the foundational files (main.jsx, App.jsx, layout.jsx).
3. Move to components and logic.

ACKNOWLEDGE THIS PROTOCOL AND BEGIN "RESPONSE 1" NOW.
```

* * *

#### 🚀 When to Upgrade: The Pivot to "Antigravity"

While Vibe Coding in a chat is like a brilliant assistant with a whiteboard, it has its limits. It excels at rapid prototyping and building flashy user interfaces, but as soon as you need to manage the complex state of 50 files, handle secure authentication, or debug a live server, the "chat" interface becomes an obstacle. You will end up spending more time copying and pasting code blocks than actually building features.

**Enter Google Antigravity.** This is where you go when the "toy" phase is over. Antigravity is not just a chatbot but a full-fledged Agentic IDE in which Gemini has real capabilities: it controls the terminal, manages the file system, and runs its own browser tests. If you are ready to stop "generating code" and start "shipping software," move your workflow to Antigravity and let the agents take on the heavy lifting.

If you have read other mastery guides, this crash course in prompt engineering will be familiar to you. That is because the core skills apply across different LLMs, including Gemini. Still, it is worth revisiting — this version has several updates meant to highlight Gemini's unique strengths, especially in multimodal reasoning. You can jump straight to the sections on Gemini's unique integrations, as well as the parts on Flow and Veo 3, which are specific to this guide.

* * *

## 🍌 The Revolutionary Nano Banana Pro Update

You may remember the end of summer 2025, specifically August, when the hype around "Nano Banana" first erupted. It all started with the LMArena leaderboard, where a mysterious anonymous model appeared that outperformed all the others, but it didn't remain a mystery for long. As soon as Google officially unveiled it as the **Gemini 2.5 Flash Image** model (keeping the internal codename "Nano Banana"), the internet went wild.

Your social feeds were probably flooded with those hyper-realistic **3D figurines** — everyone turning themselves, their pets, and their favorite characters into "1:7 scale commercial figurines" in plastic packaging. It was the perfect combination of a memorable name and a fun, viral use that turned a tech product into a cultural meme.

Now we are in the middle of the second wave with the release of **Nano Banana Pro**, launched alongside **Gemini 3** in late November 2025. If the first wave was about viral fun, this one is about pure power. The conversation has shifted from making toys to creating "impossible" assets.

Later in this section, we will cover in detail how the new Nano Banana Pro is used for these specific workflows. For now, here is what you need to know about the engine itself.

* * *

#### What's Under the Hood: Why It's So Good

To understand why Nano Banana Pro matters so much, you need to realize that until now, most AI image generators were essentially just "dreaming."

You gave them a prompt, and they hallucinated a bunch of pixels that *looked like* your request. They didn't really understand the logic of what they were drawing; they just knew that a "cat" is usually associated with "whiskers."

Nano Banana Pro is different because it is powered by **Gemini 3**, a model capable of **visual reasoning**.

When you ask it to create an infographic or a complex scene, it doesn't start drawing pixels right away. First it "thinks." A split second before it generates your image, it plans the layout, calculates the perspective, and decides where the text should go so that it can be read.

This shift from "dreaming" to "thinking" unlocks three huge capabilities:

**It can read and write**

Older models treated text as squiggly decoration. Nano Banana Pro treats text as information. You can ask for a cafe sign that says "Nano's Late Night Cafe," and it will render the text perfectly, using the right font, without the strange alien glyphs we have gotten used to.

**It understands spatial logic**

If you ask for a "cutaway diagram of a car engine," it will understand that the pistons are *inside* the cylinders. It doesn't just blend mechanical shapes, but builds a coherent structure based on logic.

**It has "object permanence."**

One of the biggest problems for professionals has always been consistency. Nano Banana Pro lets you upload reference images (up to 14) so that it knows exactly what your product or character looks like. It can then "hold" that object in its memory and redraw it from a different angle or in different lighting without turning it into something else.

We are not done yet. We have only scratched the surface, explaining what Nano Banana is and why it is so good at what it does. But to truly understand it, you need to see it in action. Next, you will see exactly what the community has come up with using this technology. Go ahead and click through to the next page.

### The Best Ways to Use Nano Banana Pro

If you want to understand the full power of **Gemini 3**, don't look at the technical specs — look at what the community is creating.

Since the release of Nano Banana Pro, we have seen not just "better" images but entirely new *types* of AI-generated images. The community has moved on from simple figurine prompts and is now using the model's reasoning engine to solve complex visual puzzles and more.

From historical time-travel grids to precise character mash-ups, on this page you will see why this model blew up the internet again.

* * *

#### 🍌Viral Hits

Before we get to practical use cases, let's look at the popular ways people use Nano Banana Pro.

#### Decades Grid

Prompt:

```
Make a 4×4 grid starting with the 1880s. In each section, I should appear styled according to that decade (clothing, hairstyle, facial hair, accessories). Use colors, background, & film style accordingly.
```

Previously, you could only get a decades grid to match by requesting each decade separately and then editing all the images together.

#### Time Travel and Location Snapshots

* * *

Simple prompt template:

```
create an image at [COORDINATES], [DATE & TIME].
```

Detailed prompt template:

```
Generate a photorealistic snapshot of [Event Name/Location] at coordinates [Latitude, Longitude]. The date is [Month, Day, Year]. The scene should look like a [Type of Photography, e.g., 'faded 1960s Kodachrome' or 'black and white press photo'] capturing [Specific Action/Vibe to visualize].
```

* * *

* * *

* * *

* * *

> ☝ Nano Banana Pro generates images from coordinates because its **intelligent reasoning engine** is directly linked to the **Google Maps knowledge base**, which lets it instantly turn latitude, longitude, and time into a full visual context. This connection lets the model instantly determine the **terrain, local structures, weather, and lighting (** such as **,** the position of the sun) for a given place, producing a realistic picture without the need for a descriptive prompt.

#### The Impossible Mix

* * *

**Celebrity Selfies**

Example prompt (short version)

```
A film-like fisheye wide-angle 360-degree selfie without any camera or phone visible in the subject’s hands. A real and exaggerated selfie of [person from uploaded image] with [CHARACTERS]. They are making faces at the camera.
```

Example prompt (detailed version)

```
A hyper-realistic fisheye wide-angle selfie, captured with a vintage 35mm fisheye lens creating heavy barrel distortion. without any camera or phone visible in the subject’s hands.
Subject & Action: A close-up, distorted group photo featuring [Person From Uploaded Image] taking selfie with [CHARACTERS]. Everyone is making wild, exaggerated faces, squinting slightly from the flash.
Lighting & Texture: Harsh, direct on-camera flash lighting that creates hard shadows behind the subjects. Authentic film grain, slight motion blur on the edges, and chromatic aberration. It looks like a candid, amateur snapshot as if captured during a chaotic behind-the-scenes moment, not a studio photo.
```

*Prompt and photos courtesy of* [@Arminn\_AI](https://x.com/Arminn_Ai)

* * *

**Mixed-Media Mix**

#### Realistic Selfies with JSON Prompts

* * *

Show prompt

```
{
"project_constraints": {
"facial_rendering": "100% original facial features (Do not edit the face)",
"resolution": "1200x1200px",
"output_quality": "Photo-realistic, 8K resolution"
},
"camera_and_style": {
"device_emulation": "Y2K-era digital camera (Canon IXUS / Sony Cyber-shot)",
"perspective": "Low-angle shot from passenger seat at a 3/4 angle, emphasizing both subject and luxury setting",
"visual_aesthetic": "Cinematic, nostalgic",
"post_processing": {
"grain": "Thin film grain with slight compression artifacts at edges",
"depth_of_field": "Shallow - subject in sharp focus, background dashboard softly blurred",
"color_grading": "Warm golden overall tone with a slight pinkish-purple hue in shadows"
}
},
"subject_details": {
"demographics": "Woman in late 20s",
"physique": "Athletic build, fair dewy skin with natural glow",
"hair": "Long, wavy honey blonde hair with natural highlights, flowing loose over right shoulder",
"makeup": {
"base": "Natural luminous nude base with subtle bronze contour",
"eyes": "Soft brown smokey eye with extended Aussie eyeliner creating elongated shape",
"finish": "Glossy nude pink lips, highlighted cheekbones catching the golden light"
},
"nails": "Medium length, polished in champagne gold"
},
"pose_and_action": {
"position": "Sitting in driver's seat, body angled toward camera with right shoulder forward, left hand resting on steering wheel",
"hands": "Left hand casually draped over luxury leather steering wheel showing designer watch, right hand holding small designer handbag near lap",
"expression": "Confident seductive gaze directly at camera, slight knowing smile, chin lowered slightly"
},
"fashion_and_accessories": {
"top": "Champagne silk camisole with delicate lace trim and thin straps, catching golden light",
"bottom": "High-waisted cream linen wide-leg trousers, partially visible",
"jewelry": "Layered gold necklaces - three thin chains of varying lengths with small pendant on shortest, diamond stud earrings, gold Cartier Love bracelet on left wrist",
"featured_product": "Small structured leather handbag in cognac brown with gold hardware, held loosely in right hand near lap, luxury brand logo subtly visible"
},
"environment": {
"location": "Interior of luxury sedan - cream and tan perforated leather seats with contrast stitching",
"specific_elements": "Wood trim dashboard with ambient LED strip lighting creating warm glow, leather-wrapped steering wheel, tinted windows showing blurred city buildings outside",
"time_of_day": "Golden hour - late afternoon light streaming through windshield"
},
"lighting": {
"technique": "Mixed natural and ambient interior lighting",
"sources": [
"Primary: Golden hour sunlight streaming through windshield at 45-degree angle from camera right, 3200K warm temperature",
"Secondary: Car's ambient LED interior lighting creating subtle warm glow on dashboard and center console, 2800K",
"Fill: Natural reflected light from cream leather seats bouncing soft illumination onto subject's face"
],
"characteristics": "Medium-high contrast with pronounced warm highlights on face and hair, soft shadows on left side of face, realistic cinematic quality with specular highlights on glossy lips and jewelry, slight blue tint in deepest shadows typical of Y2K digital camera aesthetic"
}
}
```

 Show prompt

```
{
"image_specifications": {
"format": "35mm Analog Film Photography (Canon AE-1 / Pentax K1000)",
"dimensions": "1200x1200px",
"aesthetic": ["Raw", "Nostalgic", "Candid", "Self-Portrait Selfie"]
},
"subject": {
"pose": "Arm extended holding camera at 3/4 angle, body twisted slightly, head turned to look back at lens",
"facial_expression_mechanics": {
"mouth_position": "lips pressed together firmly in thin line creating suppressed smile, one corner slightly raised",
"eye_mechanics": "looking sideways up at camera with mischievous doe-eyed quality, visible gleam",
"eyebrow_position": "one eyebrow slightly raised, creating playful asymmetry"
},
"skin_rendering": "Natural texture with visible pores on nose, slight flush on cheeks from being outside, freckles scattered naturally",
"editing_constraint": "Face unaltered, authentic film capture"
},
"attire": {
"top": "Oversized vintage denim jacket, slightly faded, worn on shoulders",
"accessories": "Simple silver hoop earrings, no other jewelry",
"hair": "Shoulder-length wavy brown hair with natural highlights, slightly windswept and imperfect"
},
"environment": {
"setting": "Urban street corner at golden hour, brick building wall behind",
"primary_prop": "Red brick wall with visible mortar lines and slight weathering",
"background": {
"visibility": "Soft focus with natural film bokeh",
"bokeh": "Swirly organic bokeh from vintage lens",
"ambient_elements": "Blurred street lamp, out-of-focus pedestrians passing, natural urban texture"
}
},
"lighting": {
"type": "Natural golden hour sunlight from side",
"effects": [
"Warm 3200K glow on face creating golden rim light on hair",
"Soft shadows on one side of face, natural gradient",
"Slight lens flare from sun creating authentic analog warmth"
]
},
"visual_style": {
"color_palette": "Warm and slightly saturated, amber tones with lifted blacks characteristic of consumer film",
"texture": "Pronounced organic film grain throughout, especially visible in shadows",
"lens_characteristics": "35mm f/1.8 lens with slight vignetting, natural chromatic aberration on edges, slight softness from handheld selfie focus"
},
"negative_prompt": {
"subject_blocks": "overly posed, perfect smile, dead eyes, flawless over-smoothed skin, heavy makeup, symmetrical perfection, professional model pose",
"environment_blocks": "studio background, perfectly clean surfaces, sterile setting, obvious staging",
"technical_blocks": "low resolution, digital perfection, no film grain, sharp modern lens, bad anatomy, distorted proportions",
"authenticity_blocks": "no imperfections, perfect focus, professional lighting, tripod-stable composition"
}
}
```

 Show prompt

```
[A REFERENCE IMAGE WAS UPLOADED BEFORE THIS PROMPT]
{
  "reference_constraints": {
    "input_image_role": "strict_identity_and_accessory_reference",
    "preserve_facial_features": true,
    "preserve_accessories": ["aviator sunglasses"],
    "note": "Ensure the subject's face and the specific style of aviator sunglasses from the uploaded image are maintained exactly."
  },
  "camera_settings": {
    "type": "smartphone_front_camera",
    "capture_style": "mirror_selfie",
    "sensor_quality": "average_mobile_sensor",
    "iso_noise": "visible_grain",
    "white_balance": "fluorescent_gym_lighting",
    "flash": "off"
  },
  "subject": {
    "demographics": "male, 50 years old",
    "physique": {
      "state": "lean, defined muscularity, vascular",
      "clothing": "shirtless",
      "skin_texture": [
        "post-workout perspiration",
        "age-appropriate wrinkles and sun spots",
        "realistic skin pores",
        "veins visible on arms and shoulders",
        "no smoothing filters"
      ]
    },
    "pose": "holding smartphone up to mirror, slight flex of bicep"
  },
  "environment": {
    "location": "commercial gym weight room",
    "mirror_condition": "slightly smudged glass, reflections of gym equipment behind subject",
    "background_elements": ["dumbbell racks", "cable machines", "blurry background patrons"]
  },
  "lighting": {
    "source": "overhead industrial fluorescent lights",
    "quality": "harsh, creating defined shadows on muscle musculature"
  },
  "style_modifiers": [
    "raw_mobile_capture",
    "snapshot_aesthetic",
    "authentic texture",
    "zero_beautification"
  ]
}
```

* * *

**See the Difference**

 ![](/guides/assets/gemini-ru/img062.png)

> You will notice the difference right away: while standard models often default to a glossy, airbrushed look that appears artificial, Nano Banana Pro conveys authentic skin texture and natural lighting, delivering a result that looks like a real photograph rather than a digital painting.

#### The Perfect Isometric View

Prompt:

```
An isometric, high-angle orthographic view of [INSERT LOCATION HERE]. The scene is captured with a telephoto lens to flatten the perspective, creating a perfect geometric composition. Photorealistic textures, deep depth of field with edge-to-edge sharpness (no tilt-shift blur), bright natural daylight, sharp shadows, highly detailed architectural visualization style, organized layout, crisp resolution.
```

* * *

#### 🍌 Business Use Cases

Of course, viral hits are fun to watch, but let's be honest — you probably aren't here to play with digital toys. You want to know what serious work this tool can do for your business. Let's get practical and look at the specific assets you can create for your brand, one by one.

#### Virtual Try-On

Sometimes you just need to visualize your product in a specific setting or see how it looks on a model, without bothering with a physical photo shoot. Nano Banana Pro is a great tool for instantly simulating such shots.

* * *

![](/guides/assets/gemini-ru/img068.png)

* * *

![](/guides/assets/gemini-ru/img070.png)

Here are three golden rules to help you make your composite images look like cohesive shots rather than bad Photoshop work.

-   **Keep the lighting neutral:** use soft, even lighting for your source images. It is much easier for the AI to *add* dramatic shadows to a flatly lit subject than to remove harsh shadows that are already there.
-   **Match the angles:** try to match the camera angle in your product photo to the desired final shot. Don't upload a top-down photo of sneakers if you want the final shot to be from the side.
-   **Use a clean background:** help the AI by using a solid white or gray background. This helps the model isolate the desired object instantly without getting tangled in background clutter.

#### Contextual Product and Ad Placement

It is hard to judge a design when it just sits on your laptop screen. Before making a final decision, you need to see it "in its natural environment." Nano Banana Pro lets you accurately simulate how your ad will look on a billboard or a banner in a store, giving you the chance to catch problems and adjust the design before sending it to print.

* * *

**Ad Placement**

* * *

**Product Placement**

**Placement prompt**

```
A four-panel (2x2 grid) photograph showcase. Each panel is a realistic photo featuring the golden orb and floating ring product from the uploaded image, exactly as it appears, including the 'THE PROMPT SPHERE' text.

Top-Left Panel: A sweaty, cluttered commercial gym floor. The golden Sphere is sitting on a black rubber mat next to a chalk-covered barbell and a used gym towel.

Top-Right Panel: A messy university library desk with an open laptop, textbooks, and pens. The golden Sphere sits casually next to the laptop.

Bottom-Left Panel: Inside a standard car. The golden Sphere is wedged snugly into the plastic cup holder of the center console, reflecting the dashboard.

Bottom-Right Panel: A sunny beach scene. The golden Sphere is sitting on a sandy beach towel next to sunglasses and a bottle of sunscreen, with the ocean in the background.
```

* * *

**More Product Placement Examples**

Placement prompt:

```
A four-panel (2x2 grid) photograph showcasing the distinct hot sauce product from the uploaded image in various realistic culinary settings. In every panel, the specific skull-shaped glass bottle filled with purple liquid and gold flakes, along with its detailed 'GALAXY REAPER' tarot label, must remain identical to the reference image.

Top-Left Panel (The Feast): A messy, rustic wooden table during a taco night. The bottle is nestled amidst several street tacos, lime wedges, cilantro, and scattered tortilla chips.

Top-Right Panel (The Retailer): A well-lit boutique gourmet grocery store shelf. The bottle sits prominently among other small-batch artisan condiments on a wooden display shelf.

Bottom-Left Panel (The Kitchen): A stainless steel professional restaurant prep counter. The bottle is next to a cutting board with chopped habanero peppers and a chef's knife.

Bottom-Right Panel (The BBQ): An outdoor backyard picnic table under bright natural sunlight. The bottle is placed next to a platter of smoked ribs and a cold beer.
```

> 💡 Previously, if you wanted to see your product in different settings, you had to generate them one at a time, hoping the AI wouldn't change your logo or bottle shape between shots. Now you can do it all with a single prompt. Nano Banana Pro handles these grids effortlessly, preserving every detail of your product across all four panels.

#### Perfect Text Rendering

For a long time, ChatGPT was the undisputed leader in generating images with legible text. But in the fast-moving world of AI, dominance never lasts forever. It has been officially dethroned. Let's look at the perfect text assets you can now create for your brand.

* * *

**Multi-Angle Product View**

**Chalkboard Menu**

**Digital Calligraphy**

> ☝ A quick note: If there is one area where ChatGPT still leads, it is the ability to generate images with a transparent background. Nano Banana Pro doesn't output transparency directly yet, but you can get very close results. Just specify that you want the subject "isolated on a pure white background" or "as a die-cut sticker" — this creates a clean, high-contrast edge that makes background removal easy in any editing tool.

**Viral Thumbnail with Text**

**Typographic Style**

Show prompt

```
A clean, professional digital typography brand guidelines sheet with a vertical orientation, presented on a pure white background. At the top, the brand name "PROMPT & PUMPS" is rendered in a large, aggressive, heavy-weight charcoal grey sans-serif stencil font. Below it, the guide is divided into distinct sections separated by clean lines with clear labels:

1.  **PRIMARY HEADLINE TYPE**: The example text reads "DOMINATE YOUR WORKOUT." rendered in a bold, condensed, uppercase sports-performance sans-serif font in electric volt green color.
2.  **SECONDARY SUBHEAD TYPE**: The example text reads "High-Performance Apparel for the Digital Athlete." rendered in a clean, medium-weight geometric sans-serif font in charcoal grey.
3.  **BODY COPY TYPE**: A block of example text reads: "Our fabric technology is designed to keep up with your most intense sessions. Stay dry, stay focused. Precision engineering for peak performance wherever you train." rendered in a highly legible regular-weight sans-serif font in charcoal grey.
4.  **UI & CALL TO ACTION**: A sleek rectangular button graphic filled with electric volt green color, containing clean white text inside reading "SHOP THE COLLECTION >".
```

#### Infographics

If you had asked an AI to create an infographic six months ago, you would have gotten a beautiful mess: jumbled charts, random shapes, and text that looks like alien hieroglyphs. That is exactly why Nano Banana Pro stopped the industry in its tracks. It didn't just improve the old standard, it did what we thought was unattainable for years.

For the first time, we have a model that understands **information design**, combining readable text, logical layouts, and relevant visual elements in a single pass. That ability alone is a compelling reason the model amazed everyone at its release.

* * *

**Boosting Productivity with Prompt Engineering**

Show prompt

```
A clean, modern horizontal infographic with a professional blue, green, and white color palette, presented on a clean white background.

At the top left header area, the **[uploaded logo image]** is clearly displayed. Next to it, a bold title reads: "BOOSTING BUSINESS PRODUCTIVITY WITH PROMPT ENGINEERING".

Below the title, the infographic is divided into three connected panels flowing from left to right with large arrows:

**PANEL 1 (Left): "TRADITIONAL WORKFLOW (Vague Inputs)"**
A visual of a messy, cluttered desk with a frustrated stylized employee figure staring at a screen with a simple question mark "?". Below it, three red icons with text: a slow-moving clock labeled "TIME CONSUMING", a crumpled paper labeled "POOR QUALITY DRAFTS", and a tangled knot labeled "REPETITIVE EFFORT". A thick grey arrow points right to the center panel.

**PANEL 2 (Center): "THE PROMPT ENGINEERING SOLUTION (Structured Precision)"**
This central panel features a large, glowing stylized funnel mechanism labeled "AI OPTIMIZATION ENGINE". Into the top of the funnel flows a neat, structured data block labeled "{ROLE, CONTEXT, TASK, CONSTRAINTS}". Standing proudly next to this funnel, pointing at the structured input with a confident expression, is the **[uploaded mascot image]** (appearing only here). Below the funnel, text reads: "TURNING VAGUE IDEAS INTO PRECISE INSTRUCTIONS". A bright green arrow points right to the final panel.

**PANEL 3 (Right): "PRODUCTIVITY UNLOCKED (Scalable Output)"**
A visual of a sleek, futuristic conveyor belt rapidly producing finished, polished assets: a stack of neat documents labeled "INSTANT REPORTS", a rising bar chart labeled "FASTER DECISIONS", and an envelope with wings labeled "AUTOMATED COMMS". A large green rocket icon is taking off above them with the label "SCALABLE GROWTH". At the very bottom right, a checkmark text reads: "DO MORE, BETTER, FASTER."
```

* * *

**How to Identify AI-Generated Images Infographic**

Show prompt

```
A clean, modern, two-panel comparison infographic on a light grey background with a central vertical dividing line. The overall title at the top reads: "THE EVOLUTION OF AI IMAGE DETECTION: VISUAL FLAWS VS. DIGITAL SIGNALS".

**LEFT PANEL Title:** "THE 'OLD' WAY: MANUAL OBSERVATION (Spotting Glitches)". The background of this panel has subtle warm, slightly chaotic tones. Below the title, a subtitle reads: "Relying on human eye to catch generative errors." Four circular icons with illustrative examples are arranged vertically, connected by dotted lines:

1.  **Icon 1 (Hands):** A drawing of a hand with six warped fingers and a distorted thumb. Text label: "1. MANGLED ANATOMY". Subtext: "Extra digits, impossible joints, or blurred extremities."
2.  **Icon 2 (Text):** A street sign image with alien-looking, non-sensical hieroglyphics instead of words. Text label: "2. GARBLED TEXT". Subtext: "Illegible squiggles where real language should be."
3.  **Icon 3 (Eyes/Teeth):** A close-up of a face with mismatched pupil shapes and overly numerous, uniform teeth. Text label: "3. THE 'UNCANNY VALLEY' STARE". Subtext: "Dead eyes, asymmetry, or unnerving perfection."
4.  **Icon 4 (Logic):** A picture of a person casting a shadow in the wrong direction relative to the sun. Text label: "4. PHYSICS & LOGIC FAILURES". Subtext: "Inconsistent lighting, floating objects, or background nonsensical blending."
At the bottom of the left panel, a large magnifying glass icon over a confused human eye reads: "CONCLUSION: EFFECTIVE ONLY ON LOWER QUALITY GENERATIONS."

**CENTRAL DIVIDER:** A thick blue vertical line with a glowing arrow pointing right, labeled "TECHNOLOGICAL LEAP (Nano Banana Pro / Gemini Era)".

**RIGHT PANEL Title:** "THE 'NEW' WAY: GEMINI SYNTHID (Imperceptible Watermarking)". The background of this panel has cool, clean digital blue and purple tones with circuit patterns. Below the title, a subtitle reads: "Invisible signals embedded at the pixel level." Three rectangular process stages are arranged horizontally, connected by glowing blue arrows:

1.  **Stage 1 (Generation):** An icon of a glowing AI processor chip generating a pristine image of a cat. Below it, a microscopic view of pixels shows subtle, glowing blue patterns being woven into the RGB values. Text label: "1. EMBEDDING AT SOURCE". Subtext: "Watermark is imperceptibly woven directly into the pixels during image creation."
2.  **Stage 2 (The Image):** A flawless, photorealistic image of the same cat. A human eye icon looks at it with a checkmark. Text label: "2. INVISIBLE TO HUMANS". Subtext: "Zero visual distortion. Image quality is perfectly maintained."
3.  **Stage 3 (Detection Tool):** An icon of a server rack and a scanner interface. The cat image is being scanned, revealing a glowing, hidden gridded data layer underneath it. Text label: "3. SOFTWARE VERIFICATION". Subtext: "Specialized tools detect the robust signal, even after cropping, filters, or compression."
At the bottom of the right panel, a shield icon with a digital lock reads: "CONCLUSION: ROBUST PROVENANCE FOR FLAWLESS AI IMAGERY."
```

* * *

**How to Make Kimchi**

* * *

The possibilities here are limitless. Whether you need to visualize a supply chain for a stakeholder meeting, explain a new company policy, or simply create quick educational content for social media, you can now do it in seconds rather than days.

Remember that there are two ways to run this engine. You can use the **"hands-off" approach**, where you simply ask Gemini to "create an infographic about X" and let it handle the research, facts, and layout on its own. Or you can use the **"director" approach**, where you provide it with specific data, text, and branding requirements, as I did in the examples above, to get a precise result that fits your needs.

#### Advertising-Style Food Photography

Prompt template:

```
Advertising-style food photography of [subject 1] arranged on a rustic table, with [subject 2] floating above in mid-air and a splash of [subject 1] frozen in motion. High-resolution photo manipulation with selective soft focus, clean negative space for text, dramatic lighting, and crisp detail.
```

#### From Sketch to Ad

This is arguably the coolest workflow in the entire guide. If you can draw stick figures, you can now direct a high-end ad shoot — seriously! The "Sketch to Ad" technique lets you upload a rough, ugly sketch made on a napkin, and Nano Banana Pro uses it as a structural blueprint to create a flawless marketing asset.

You handle the composition, and the AI handles the talent, lighting, and physics. It feels like magic and completely removes the barrier between an idea and its realization.

* * *

Prompt template:

```
Instruction: Transform the rough sketch uploaded above into a high-resolution, professional advertising photograph. Use the lines of the sketch as a strict guide for the composition, camera angle, and object placement, but replace the drawing with photorealistic textures and lighting.

The Scene Details:
Subject: [Describe the main object/person in your sketch, e.g., "A bottle of perfume" or "A runner mid-stride"]
Action/Pose: [Describe what is happening, matching your drawing]
Setting: [Describe the background environment]
Lighting & Style: [Describe the vibe, e.g., "Cinematic golden hour sun," "Studio strobe lighting," or "Moody neon cyberpunk"]
```

Rough sketch and character:

**Result:**

However, you don't have to start with a rough sketch; if you are making a product layout, you can start with a wireframe. This is perfect when you have a standard layout for social media posts or catalog pages and only need to swap out the content. By feeding Nano Banana Pro a clean black-and-white wireframe, you force it to stick to a strict structure, ensuring your branding stays consistent.

**Prompt template:**

```
**Instruction:** Use the uploaded wireframe image as the strict structural layout for a high-resolution marketing graphic. Replace the black lines with a photorealistic background and fill the specific zones as follows:
**The Product & Theme:**
* **Product:** [Insert Product Name, e.g., "The Sky-Scraper Drone Mower"]
* **Visual Style:** [Insert Style, e.g., "Futuristic, bright blue skies, clean lawn aesthetics"]
**Layout Execution:**
* **Top Title Bar:** Replace the "TITLE" box with the header text: "[Insert Headline]" in a modern bold font.
* **Center Hero Images:** Fill the three center squares with distinct high-res photos: 1) [Image A], 2) [Image B], 3) [Image C].
* **Tagline Strip:** Replace the "TAGLINE" strip with the text: "[Insert Catchy Slogan]" in an elegant script font.
* **Bottom Section:**
    * **Main Text:** Fill the left box with readable, professional marketing copy describing the product features on a semi-transparent background.
    * **Review Box:** Fill the right box with a graphical 5-star rating and a short customer quote text.
```

Show prompt

```
**Instruction:** Create a high-resolution, premium marketing graphic based on the structural layout of the uploaded wireframe, but completely ignore the black outline boxes to create a seamless, borderless composition. The overall aesthetic must be sleek, modern, and energetic, strictly using the matte black, electric blue, and neon green color palette from the reference product image.

**The Scene & Lighting:**
The background is a sleek, dark matte charcoal gradient with subtle, flowing light trails in electric blue and neon green that suggest data flow and neural pathways, integrated cohesively across the entire frame without harsh dividers.

**Layout Execution (Top to Bottom):**

* **Top Title Zone:** The header text reads: **"UNLOCK YOUR INNER LLM WHISPERER."** rendered in a bold, clean, modern sans-serif font with a blue-to-green gradient glow.
* **Center Hero Zone (Three Integrated Focal Points):** Instead of separate boxes, these three elements are blended into the mid-ground:
    1.  **Left:** The "Prompt Juice" can from **reference image** sits on a glowing blue energy ripple, covered in cold condensation.
    2.  **Center:** A focused coder/hacker figure, lit by the blue and green glow of a screen, taking a sip from the can. The screen light reflects sharply on their face.
    3.  **Right:** A macro shot of glowing blue and green carbonated liquid energy coalescing into a stylized, glowing neural network structure (replacing the generic data chart).
* **Tagline Zone:** Below the heroes, the text reads: "Drink Smart. Think Deep. Prompt Like a Pro." in a clean, semi-bold sans-serif font (no cursive), glowing in white and green.
* **Bottom Zone (Seamless Integration):**
    * **Left Side (Main Copy):** Integrated directly onto a darker area of the background, the text reads: "Tired of generic outputs? Our proprietary 'Cognitive Caffeine' blend optimizes your neural pathways for maximum context window utilization and zero hallucinations. Formulated for peak prompt engineering performance." (Clean, readable white sans-serif font).
    * **Right Side (Review):** A subtle, glowing green graphic of five stars, with the text below: "'My zero-shot reasoning has never been sharper! I plan whole workflows in seconds now.' - Alex R., Senior Prompt Architect." (Clean white sans-serif font).
```

**High contrast is the key to success:** use thick dark lines on a clean white background. Faint pencil marks or sloppy, low-contrast sketches can confuse the model's structural sensors.

**Prompt for texture, draw for structure:** don't waste words describing the *placement* of objects. Use the prompt to describe materials, lighting, and mood, and leave the composition to your sketch.

* * *

#### 🍌 For Architecture and Spatial Design

We all know how hard it is to sell an idea using only a two-dimensional floor plan. To a client, those black-and-white lines often look more like a confusing maze than a future home. This is where Nano Banana Pro becomes a serious advantage.

Instead of spending hours building a generic 3D model from scratch to bridge this gap, you can now upload your flat drawing and instantly generate a photorealistic walkthrough, letting your clients truly feel the space before the first brick is laid.

#### Turn a 2D Floor Plan into 3D

Take a flat black-and-white technical floor plan and convert it into a fully furnished, photorealistic 3D top-down view.

**Prompt:**

```
Create a 3D version of this floorplan making sure to stay as accurate as possible to the reference uploaded.
```

#### Multi-View Blueprint

Create a single composite image that displays the floor plan alongside several simultaneous perspective views (for example, isometric, elevation, and interior) to show the space from all angles at once.

Prompt:

```
Instruction: Render the uploaded technical line drawing into a photorealistic architectural collage. Keep the layout exactly the same but transform the drawings into reality:
Isometric View: Become a realistic 3D model made of concrete and glass.
Floor Plan: Become a textured, furnished top-down plan with timber flooring.
Elevation: Become a realistic photo of the house front during golden hour, showing the texture of the concrete cladding and reflections in the windows.
```

#### Visualizing a Finished Interior

Take a photo of a raw, unfinished construction site (a concrete shell or frame) and visualize the finished, furnished interior while respecting the original physical geometry.

Prompt:

```
Instruction: Renovate and furnish this unfinished space, turning it into a luxurious "Japandi" style living room.

Geometry: Keep the exact perspective, window placement, and ceiling height of the uploaded image.

Finishes: Cover the concrete floor with light herringbone wood. Smooth and paint the walls a warm off-white.

Furnishing: Place a low-profile beige sectional sofa, a Noguchi coffee table, and a textured rug in the center. Hang a paper lantern pendant light where the wires are currently hanging.

Lighting: Fill the room with warm, inviting natural light coming from the window.
```

#### Rendering from a White Box

Take a simple, untextured block model (for example, a basic SketchUp export) and apply photorealistic materials, lighting, and environmental context to create a finished exterior render.

**Prompt:**

```
Instruction: Transform the uploaded white massing model into a photorealistic render. It is vital that you maintain the exact camera angle, perspective, and structural geometry of the input image. Do not rotate, reposition, or alter the shape of the house in any way.

Materials: Apply textures directly onto the existing white surfaces: use a mix of dark vertical timber cladding and board-formed concrete for the walls. The window gaps must become reflective floor-to-ceiling glass panes.

Environment: Generate a lush, green cliffside environment that fits around the locked geometry of the house, overlooking a stormy ocean.

Atmosphere: Moody, overcast afternoon light. The interior lights of the house must glow warmly, contrasting with the cool exterior tones.
```

> 💡 **It goes without saying that Nano Banana Pro is a powerful tool for visualizing concepts and client presentations, but it is not a structural engineer.** While it can texture a massing model or furnish a floor plan in seconds, it doesn't understand load-bearing walls, local building codes, or MEP requirements. Treat NBP as a tool for speeding up the creative process and selling your concept, not as a replacement for the rigorous CAD/BIM workflows needed to actually begin construction. Use AI to win the bid; use your expertise to bring the concept to reality.

* * *

#### 🍌Magic Fix Use Cases

We often focus on creating something new, but Nano Banana Pro is just as effective at reviving the old. This "Magic Fix" category shows how you can instantly translate and colorize manga, remaster retro game screenshots into next-gen visuals, or rescue blurry shots for high-resolution printing — effectively acting as a team of restorers in a single pass.

#### Translating and Colorizing

Prompt:

```
Translate all text in this manga page to English and colorize the entire image. Maintain the original art style and the exact appearance of the text bubbles and sound effects.
```

#### Remastering Game Screenshots

Example prompt:

```
Remaster this pixelated game screenshot into a photorealistic 3D scene. It should look like a high-end render from Unreal Engine 5, with realistic lighting, textures, and atmosphere, while keeping the original layout and characters.
```

#### Upscaling Blurry Images

Not long ago, AI enhancement was often associated with waxy, smoothed-out faces or strange artifacts that made an image look like a bad oil painting.

Nano Banana Pro solves this problem by understanding the *context* of the image and intelligently restoring missing details, such as skin pores, fabric texture, or film grain, to deliver a sharp, authentic result that looks like the original high-resolution shot.

* * *

Example prompt:

```
Upscale and restore this blurry screen grab into a crisp, high-resolution 4K movie poster. Remove all noise and compression artifacts, sharpen details, and enhance the lighting for a cinematic, professional quality finish.
```

* * *

#### You can even swap in or add the characters you need to the original frames and then turn them into video

Here we took a horizontal frame from The Fast and the Furious: Tokyo Drift, made it vertical, added a new character, turned the camera around to face the opposite direction, added a bit of emotion and creativity, and here is what we got:

* * *

This guide does not go deep into how photo and video generation works; we cover those topics in detail in separate documents: 1. AI Design

1.  Nano Banana
2.  VEO
3.  Kling
4.  Seedance

#### 🛑 Technical Annotations and Analysis 🛑

This section was originally meant to showcase Gemini and Nano Banana Pro's ability to spot problems and restore images using helpful visual annotations. However, the more I experimented with different test cases, from medical X-rays to detecting mechanical problems in an engine bay, the more I realized how imperfect and risky this particular feature is.

**The problem lies in the difference between** ***analysis*** **and** ***generation*****.**

While AI can often identify a problem correctly in text, pinpointing it visually is a completely different story. Generative models prioritize aesthetic plausibility over technical accuracy. In my testing, instead of simply drawing a circle on the original image, the model often "reimagined" the scene to fit the annotation, which led to circles being placed in the wrong spots or labels being attached to the wrong components. In high-stakes scenarios, a diagram that is visually convincing but factually wrong is dangerous.

Don't get me wrong, **Gemini 3** is an absolutely fantastic tool for *analyzing* images and solving multimodal tasks. However, when paired with **Nano Banana Pro** for *visualization*, there is still significant room for improvement in spatial accuracy. For now, text analysis is accurate, but visual annotations are too inconsistent to rely on.

We're ending on a realistic note about the limits of technical analysis, but don't let it overshadow the big picture. Every tool has its own specific area of application, and when it comes to high-quality image generation, Nano Banana Pro is unmatched.

Despite the current limitations in spatial accuracy and technical annotations, the level of detail, lighting, and creative control it offers is unmatched. Whether you're visualizing cinematic scenes, creating marketing materials, or just experimenting with new concepts, it remains, without a doubt, the most impressive image generation model available today.

* * *

#### 🍌 How to Detect Images Generated with Nano Banana Pro

Given how well Nano Banana Pro generates realistic images that look like they were shot on a phone camera, it's reasonable to worry about being fooled online. Fortunately, Google takes a responsible approach and adds what is called **SynthID** to every image generated by its AI.

Put simply, **SynthID** is an invisible watermark that Nano Banana Pro embeds in an image at the moment it is generated. Learn more about it [here.](https://deepmind.google/models/synthid/)

You can upload an image to Gemini and ask it to check whether it contains SynthID, or use a dedicated detection tool. However, at the time of writing this guide, the latter is in testing. Google provides this tool to journalists and other partner organizations.

* * *

#### 🍌 Prompting Techniques Specific to Nano Banana Pro

I've shown you many ways to use Nano Banana Pro. Now you may be thinking*: "Okay, but what about prompting techniques? Are there any special secret techniques?*"

The straight answer: not really. Nothing has fundamentally changed in how you prompt for images. The principles you learned from our other guides apply to Nano Banana Pro as well. Context and detail are the key to creating what you have in mind and turning it into a complete, high-quality image.

With that in mind, there are two very important tips to remember for Nano Banana Pro.

#### 1\. Edit first, don't restart.

This AI handles conversational editing very well. Some of you may immediately regenerate an image if you find something wrong with it. Don't do that. Just point out the mistake and ask the AI to fix it. It's that good!

#### 2\. Write complete sentences

Unless you're using JSON formatting to achieve specific results, forget about adding descriptions as tags. Drop things like*"Cool car, neon, city, night, 8k*". Instead, compose sentences as if you were vividly describing what you're looking at.

> ❎ banana character, superman in a flying pose, comic book style, cape, bright colors, bold lines, action scenes, halftone dots.

* * *

✅ A dynamic comic-book-style illustration of a muscular anthropomorphic banana hero soaring through the air in a classic Superman pose with his right arm stretched forward. The art style is characterized by bold ink outlines, bright halftone-dot colors, and dramatic shading. A flowing red cape trails behind the banana as it flies over a stylized Metropolis cityscape, and speed lines indicate rapid movement.

* * *

## 🔑 30 Key Prompt Engineering Principles for Gemini

> This is the new and improved version of the 30 Key Prompt Engineering Principles for Gemini. I significantly reworked the entire section, removing redundant concepts and obvious, low-value advice to focus exclusively on high-impact strategies. In their place I introduced advanced techniques, while also refining every explanation and example so they deliver immediate practical value in your everyday interactions.

> **Precise instructions** Be concise in your requests. Gemini 3 responds best to direct and clear instructions. State your goal clearly, without unnecessary words.

❌ Wordy prompt:

```
Hi there! I was hoping you could help me with something. I’m trying to get better at cooking and I have some chicken and broccoli in the fridge that I need to use up before they go bad. Could you maybe give me a recipe? Nothing too hard, please. I’m not a chef or anything. Thanks!
```

✅ Concise prompt:

```
Generate a beginner-friendly recipe using chicken and broccoli. Limit preparation time to 30 minutes.
```

> **Nuance: precision vs. length** Precision and conciseness do not mean you should sacrifice necessary context. There is a big difference between a **long** prompt (which is often necessary) and a **verbose** prompt (which distracts). **Scenario:** Imagine you need Gemini to analyze a legal contract or debug a large block of code. You *must* give the model that huge chunk of text so it can do its job. In this scenario, the conciseness principle still applies to your **instructions**, not to the data. You should paste in the bulky context, but your actual command should be precise and direct, without an emotional backstory about *why* you're analyzing the file. Example:

```
Context: "The Tenant agrees to pay a base rent of $1,200 on the 1st of each month. If payment is received after the 5th, a late fee of 5% constitutes the penalty. If the tenant breaks the lease prior to the 12-month term, a penalty equivalent to two months' rent is due immediately..." [User pastes 3 more paragraphs of lease terms]
Instruction: "Based strictly on the text above, calculate the total financial penalty if I break the lease after 4 months."
```

> **Specify the role, audience, and goal**

When you assign Gemini a specific persona, it can adapt its level of expertise, tone, and point of view to fit your needs precisely. By clearly defining the audience or purpose, you help it choose the right vocabulary and level of complexity so the explanation suits the reader.

Example:

```
Act as a professional career coach. Help me answer the interview question 'What is your biggest weakness?' for a job interview at a fast-paced tech startup.
```

> **Break down complex tasks**

If you have a big request, don't throw it at Gemini all at once. Instead, break the project into smaller, numbered steps to logically guide the model through the whole process. This prevents the AI from missing details and ensures higher quality output for each part of the task.

Example:

```
I need to write a cover letter for a Project Manager role. Please follow these steps:
Analyze: Read my attached resume and identify my top 3 relevant skills.

Connect: Explain how these skills apply to a tech startup environment.

Draft: Using those connections, write a professional cover letter.
```

> **Start with positives, refine with negatives**

Think of your prompt in two layers. First, use affirmative instructions ("Do this") to generate the main content and set the direction; this gives Gemini a clear path to follow. Second, use negative instructions ("Don't do this") as targeted filters against common bad AI habits, such as overusing certain punctuation (for example, em dashes), robotic transitions, or specific formatting problems.

Additional explanation

> I moved from an "Always be positive" approach to a hybrid one, because strictly avoiding negative words is an oversimplification. While positive instructions work better for generating **content** (they give the model a goal to aim for), negative constraints are actually necessary for controlling **style** and mechanics (for example, banning certain words or formatting). The most effective prompts aren't afraid of the word "don't"; they use it strategically as a filter *after* the main goal has been established.

Example:

```
Write a short LinkedIn post about the importance of remote work flexibility.

Tone: Keep it conversational and punchy. Use short sentences.

Constraints: Do not use hashtags, do not use emojis, and avoid using the word 'delve' or 'landscape'
```

> **Use structural labels**

Labels act as clear signposts for the AI. By explicitly labeling sections such as **"Context"**, **"Task"**, and **"Constraints"**, you keep Gemini from getting confused about where the background ends and your actual instructions begin. This structured approach is essentially a cheat code for getting complex, high-quality results on the first try.

Example:

```
Context: I manage a local coffee shop. We are raising prices by 10% next month because the cost of imported beans has gone up.

Audience: Loyal, daily customers.

Tone: Empathetic and transparent, but professional.

Task: Write an email announcement explaining the change. Include a call-to-action offering a "15% off" coupon for their next visit to soften the blow.
```

> **Use few-shot prompts (show, don't just tell)**

In AI terminology, a "shot" is simply an example. While you can ask Gemini to do something from scratch ("Zero-shot"), providing "Few-shots" (one or more examples of input and desired output) significantly improves reliability.

LLMs are pattern-matching machines; if you show them a strict template to follow, they will imitate that structure perfectly. This is often much faster and more effective than trying to describe a complex format in words alone.

Example:

```
Task: Turn the raw customer feedback into a standardized log entry.

Example 1: Input: "The app crashed three times when I tried to upload a photo. Fix this immediately!" Output: [Bug Report] | Severity: High | Topic: Photo Upload

Example 2: Input: "I really like the new dark mode, but the blue text is hard to read." Output: [UX Feedback] | Severity: Low | Topic: Color Scheme
Current Task: Input: "I lost my password and the reset link isn't arriving in my email inbox." Output:
```

> **Calibrate response length and depth**

Gemini has a "safe" default response length, usually a few paragraphs. To get exactly what you need, you must explicitly switch modes. Don't just ask for a word count; explain what *depth* is required. Use "concise" for general overviews and "comprehensive" or a specific word count when you need deep, nuanced explanations. ❌ Weak length control:

```
Tell me about black holes. Make it short.
```

✅ Strong depth control:

```
Explain black holes in one sentence as if you were explaining it to a 5-year-old.
```

✅ Strong length control:

```
Write a comprehensive 500-word guide on black holes. Cover event horizons, singularities, and Hawking radiation.
```

Important note: The "word count" trap

> Why Gemini sometimes hits the mark (and sometimes misses): Gemini doesn't "count" words the way a word processor does. Instead of individual words, it sees chunks of characters called **tokens**. When you ask for 500 words, Gemini doesn't keep a running count; it relies on its training data to estimate what a 500-word block of text *looks like* and *feels like*. For standard requests (such as a "500-word essay"), Gemini usually comes close because it has seen millions of essays of that length. It knows the "vibe" of that particular length. If you request a complex format with a strict word limit (such as a "500-word technical Python tutorial"), code blocks and technical jargon throw off its internal estimate, leading to deviations. Treat a specific word count as a **target**, not a strict limit. If you ask for 500 words, expect a result between 400 and 600. Use numbers to define the **scope** of the project (for example, "I want a deep dive, not a brief summary"), not as exact character-limit requirements.

**Context anchoring**

When you paste a large block of text, code, or data, don't just assume Gemini knows you want it used. You need to explicitly "bridge" the gap between that data and your request.

By using an anchoring phrase, you force the model to refer *to what* you provided rather than *to* its general training data. This is the best way to prevent hallucinations when analyzing specific documents.

Examples:

1.  **"Based strictly on the text above**, answer the following question..."
2.  **"Using the code block above as the sole reference**, identify the bug..."
3.  **"Referring to the meeting notes I just pasted**, summarize..."
4.  **"Extract the specific financial figures from the report above** and..."
5.  **"Given the context provided in the email thread**, write a reply that..."

Don't paste a document and just ask: *"What do you think?"* or *"Is this correct?".*

**Why?** Without an anchor, Gemini may answer based on general knowledge of the world rather than your specific file. For example, if you paste a *draft* of a new law and ask, "Is this legal?", Gemini may analyze real laws rather than your draft text unless you say:**"According to the draft text above,** is this article legal?".

> **Inverted interaction (iterative clarification)**

Normally you give instructions and Gemini gives answers. But for complex requests, such as developing a marketing strategy or a fitness plan, you may not know exactly what details the AI needs. Instead of guessing, give Gemini an explicit command to interview *you*. This flips the script, turning the AI into a consultant who gathers requirements before doing the work. Example:

```
I want you to design a detailed meal plan for me. Before you generate the plan, ask me 5 clarifying questions about my dietary restrictions, budget, cooking ability, and taste preferences so you can tailor the result perfectly to my needs.
```

> **Use chain of thought (CoT)**

Complex problems require not just an instant answer but a systematic approach. "Chain of Thought" (CoT) prompting is a technique that tells Gemini to explicitly "unpack" its thinking before giving a conclusion.

By making the model verbalize its logic step by step, you effectively give it more computational resources for each part of the problem. This turns the AI from a simple answer generator into a transparent analytical engine.

```
I am currently in New York (EST). I have a video call at 14:00 London time, and another call at 09:00 Tokyo time the next day.

Think step-by-step:

1. Convert the London time to New York time.

2. Convert the Tokyo time to New York time.

3. Calculate the number of hours between the end of the first meeting (assume 1 hour duration) and the start of the second.

4. Tell me if I have time to sleep.
```

> **The "plan first" strategy**

For complex multi-stage projects (such as coding an app, writing a business plan, or analyzing a legal document), don't ask Gemini to just "do it." If you do, it will immediately start writing the first sentence without knowing where the last one will end.

Instead, make Gemini enter the **"architect phase."** Tell it to pause, analyze your request, and build a structural plan *before* it starts creating content. This acts as a quality control filter, ensuring the AI understands the full scope of the task before spending tokens on a poor answer.

Example:

```
Task: "I need to launch a new podcast about urban gardening.

Before providing the final answer:

1. Parse the stated goal into distinct sub-tasks.

2. Check: Is the input information complete? If not, stop and ask for it.

3. Optimize: Are there tools, shortcuts, or 'power user' methods that solve this problem better than the standard approach?

4. Structure: Create a structured outline to achieve the goal.

5. Confirm: Validate your understanding with me before proceeding."
```

> **Make it run a self-correction loop**

Even with advanced reasoning models, AI can develop "tunnel vision": focusing so hard on solving the main problem that it drifts from your specific formatting rules or tone constraints.

Asking Gemini to critique its own output is not just quality control but a **sanity check**. By explicitly asking *"Did you actually follow my instructions?"* before generating the final result, you force the model to switch from a "generator" context to an "auditor" context.

This is especially important for data-heavy tasks, where a single missed number can ruin the result, or for complex compliance tasks, where every constraint must be perfect.

**When to use it**

-   **Complex data analysis:** when you need to be 100% sure the summary matches the spreadsheet you uploaded.
-   **Strict constraint adherence:** when you requested "No passive voice, under 200 words, JSON format" and want to make sure none of those three rules was violated.
-   **Blind spot checks:** to understand *why* Gemini made a particular decision (for example, "Critically evaluate your answer: why did you choose this particular variable?").

> **Structured prompts (delimiters)**

When your prompt turns into a wall of text, mixing instructions, data, examples, and formatting rules, Gemini can struggle to tell where one section ends and the next begins.

To fix this, use **structured prompts**. This means using standardized tags (XML-style) or visual hierarchy (Markdown) to create unambiguous boundaries between your data and your commands. Imagine drawing lines in the sand: "Everything inside *this* rectangle is data; everything outside is instructions."

XML example:

```
<system_role>
  You are a Senior Data Analyst for a logistics company.
</system_role>
<task>
  Extract all delivery complaints from the customer email below.
  Ignore any mentions of "billing" or "sales."
  Format the output as a JSON object containing: "Order_ID", "Issue_Type", and "Sentiment_Score".
</task>
<constraints>
  - If no Order ID is found, return "N/A".
  - Sentiment Score must be between 1 (Angry) and 10 (Happy).
  - Do not include the customer's personal greeting or sign-off.
</constraints>
<customer_email>
  Subject: Order #554-992 is late again!
  Hi there,
  I am writing because my package (Order #554-992) was supposed to arrive on Tuesday.
  It is now Friday and the tracking hasn't moved. This is unacceptable.
  Also, I noticed a charge of $50 on my bill, can you check that?
  Thanks,
  John Doe
</customer_email>
```

Markdown example:

```
# Role
You are a Technical Writer for a SaaS startup. Your voice is clear, approachable, and jargon-free.

# Context
We are launching a new feature called "One-Click Sync."
Users are confused about how to enable it in the settings menu.

# Task
Write a Help Center article explaining how to turn on "One-Click Sync."

# Guidelines
* **Title:** Catchy and action-oriented.
* **Structure:** Use an "Introduction" followed by numbered "Steps."
* **Tone:** Helpful and reassuring.
* **Length:** Keep it under 200 words.

# Formatting Rules
1.  Use bold text for UI elements (e.g., **Settings**, **Save**).
2.  Add a "Pro Tip" block at the end for power users.
```

> **The "Agentic" directive (tool control)**

Gemini is not just a text generator; it is a tool for users. It can write code, search the Internet, and analyze files. However, sometimes it gets lazy (gives up if the code doesn't work) or too eager (searches Google when it isn't necessary).

You need to "steer" these tools. Use the **Agentic directive** to give Gemini permission to self-correct when tools fail and to make it explain *why* it is using a tool before spending time on it.

**Example 1:** **The "Persistence" directive**

```
You are an autonomous agent.
- Continue working until the user's query is COMPLETELY resolved.
- If a tool fails, analyze the error and try a different approach.
- Do NOT yield control back to the user until you have verified the solution.
```

Example 2: **Pre-call reflection**

```
Before calling any tool, explicitly state:
1. Why you are calling this tool.
2. What specific data you expect to retrieve.
3. How this data helps solve the user's problem.
```

Note on platform compatibility

**Where this technique works best:** Although "true" autonomous agents (which run indefinitely until the task is done) are built using Google's APIs (AI Studio/Vertex AI), this principle is still highly effective in **standard Gemini chat**.

**In standard chat:** You can't define *new* tools, but you **can** and **should** use these directives to steer the *built-in* tools (Google Search, Python code execution, and extensions).

> **The "Jumpstart" technique (priming the output)**

Remember that Gemini is essentially a super-advanced autocomplete engine. It is always trying to predict the *next* word.

If you end your prompt with a question mark, Gemini has to decide where to start. But if you end your prompt by *starting the sentence for it*, you force the model down a specific path. This is the most effective way to make the model use a particular format (such as JSON) or a particular tone (such as professional sympathy) without writing a long paragraph of instructions.

Example 1:

```
Extract the data from the text above. I need this in a raw JSON format. Start strictly with the opening bracket:
{
"customer_id":
```

Example 2:

```
I need to decline this wedding invitation. Be polite but firm. Do not give a specific excuse, just say I am unavailable. Please begin the email exactly like this:

Dearest Martha, it breaks my heart to say this, but..."
```

> **Quality anchoring (set the standard)**

Don't ask Gemini to just "write code" or "draft an email." If you don't set the quality bar, the model will fall back to the statistical average of the Internet, which is often mediocre.

Instead of using "hacks" like offering fake tips, explicitly anchor the output to a **world-class standard**. Tell the model exactly what a "perfect" result looks like for this specific task. This makes the AI draw on the highest-quality subset of its training data (such as academic journals and production-grade code repositories) rather than general forums.

Example:

```
Write a Python script to scrape this website.

Your code must meet **Google's internal production standards**:
- Include full error handling for network timeouts.
- Use clear, PEP-8 compliant variable names.
- Add comments for every function explaining the logic.
```

Another example:

```
I am planning to launch a subscription service for high-end office furniture. Analyze this business model for potential failure points.

Do not give me a supportive or generic 'sandwich method' critique. I want you to adopt the persona of a ruthless Venture Capitalist performing due diligence. Hold this idea to the standard of a Y Combinator application review. specifically looking for weak moats, underestimated logistics costs, and CAC/LTV imbalances. If the idea isn't viable, tear it apart with data-backed logic.
```

> **Style imitation (the reference track)**

Gemini is a tonal chameleon, but by default it uses the boring "helpful assistant" voice unless you say otherwise. Instead of using subjective adjectives like "funny" or "professional" (which mean different things to different people), use **style imitation**.

Imagine giving a musician a "reference track." You can point to specific publications, well-known authors, or particular structural frameworks to lock in the vibe instantly. You're not just asking for text; you're creating the *texture* of the reading experience.

Example:

```
Rewrite this dry technical product update about our new noise-canceling headphones.

Cadence: Use short, punchy sentence fragments for impact. (e.g., 'Magic. Remastered.')

Vocabulary: Focus on sensory words ('immersive', 'crisp', 'silence') rather than technical specs.

Formatting: Use widely spaced single lines to create visual drama.
```

> **The "Source-Anchored" protocol (research and synthesis)**

To turn Gemini from a simple summarizer into a rigorous research analyst, you can apply a "Decompose and Cite" workflow. This approach uses the model's ability to process complex information by directing it to independently research specific lines of inquiry.

By demanding strict citation of every claim, you ensure the final synthesis is not only comprehensive but also fully traceable and verifiable for high-stakes professional use.

Example:

```
Context: I need to understand the current market for "Solid State Batteries" (SSB) in EVs.

Task: Produce a research summary following these strict steps:
Decompose: Break the topic into 3 key pillars: Technical Challenges, Key Manufacturing Players, and Timeline to Mass Adoption.

Analyze: Search for and process information for each pillar independently.

Synthesize: Combine findings into a cohesive executive summary.

CITATION RULE (Crucial): Every single specific claim (numbers, dates, names) must be immediately followed by a reference like [Source: Bloomberg] or [Source: Toyota Press Release]. If a claim is a general estimate, state: "This is a general industry estimate."
```

> **Iterative refinement**

Treating the first response as the final result is the most common mistake when using AI. Think of your initial prompt as just turning the key in the ignition. The real skill lies in **steering** the result once it has started moving.

Don't retype the whole prompt if the response isn't perfect. Use **iterative refinement** to steer Gemini toward the goal. Effective follow-up prompts are surgical: they pinpoint exactly what to keep, what to discard, and what to tweak.

This "conversation" lets you shape the result dynamically, which is often faster than trying to write one perfect "mega-prompt" from the start.

**The golden rule of refinement:** "Try again" or "Make it better" are weak instructions on their own. Try using "Keep X, but change Y."

Scenario 1: Coding (optimization) *The code works, but it's messy*

```
This works, but refactor the 'data_parse' function to be more modular. Keep the logic the same, but add comments explaining the regex pattern
```

**Scenario 2: Creative writing (changing the tone)***The draft is good, but too stiff.*

```
The content is accurate, but the tone is too corporate. Rewrite the introduction and conclusion to sound like a supportive mentor—more warm and conversational. Leave the body paragraphs as they are.
```

**Scenario 3: Data analysis (deep dive)***The summary is too superficial.*

```
That's a good overview. Now, drill down into point #3 (the marketing spend). Break that specific figure down by region and calculate the ROI for each.
```

**Scenario 4: Formatting (visual elements)***. The content is a solid wall of text.*

```
Convert the 'Pros and Cons' section into a Markdown table for easier reading. Add a column for 'Impact Score' (High/Med/Low) based on your analysis.
```

> **Show, don't tell: multimodal inputs**

Gemini is natively multimodal, meaning it doesn't just "read" text: it sees images, watches videos, and listens to audio files with a high level of understanding.

Stop trying to describe complex visual layouts, handwritten notes, or messy datasets with words alone. Describing a broken machine part or a complex diagram takes hundreds of tokens and often leads to misinterpretation.

Instead, just **upload the source material**. By anchoring your request in the visual or audio reality of the file, you eliminate description ambiguity and give Gemini the exact context it needs to solve the problem instantly.

Say you need help finding a specific object or element in a crowded image.

```
Analyze the provided image. I am looking for the character 'Waldo'. He is distinguishable by his red and white striped shirt, bobble hat, glasses, and walking stick.
```

> **The "pipeline" method (chained prompts)**

Gemini is fully capable of handling massive "mega-prompts" with complex multi-step instructions in one go. However, just because the model *can* do it all at once doesn't mean it suits your workflow. Think of it as a strategic choice between **automation** (the mega-prompt) and **collaboration** (prompt chaining). If you need speed, send everything at once. But if you want maximum control, treat the chat like an assembly line. By breaking the task into a sequence of prompts, you create natural "checkpoints." This lets you review and correct the direction of step 1 before the model starts on step 2, ensuring the final result is exactly what you pictured.

Example: Say you want to write a blog post about coffee, with a particular focus on third wave coffee culture. Here are the prompts you could use in sequence.

```
Generate a detailed outline for a blog post about coffee, focusing on 'Third Wave' culture.
```

```
Great. Now, using that outline, write only the Introduction. Make it punchy and hook the reader.
```

```
Perfect. Now write the History section. Go deep into the Ethiopian origins.
```

Of course, if after any step you notice something you want to change, your next prompt will focus on edits or corrections.

> **The Humanizer filter (internal tone check)**

When drafting emails, essays, or creative content, Gemini often defaults to a "safe," polite, slightly robotic corporate tone. It loves words like "ensure," "moreover," and "delve."

To change this pattern without building a complex style reference every time, you can use the **"Internal Tone Check"** workflow. This technique makes Gemini generate a draft internally, check it for "artificial-sounding" clichés or corporate jargon, and then rewrite it to sound more natural, all before showing you the result. It acts as an automatic authenticity filter.

Example:

Say you want to write a warm, non-corporate apology email to a client about a delay.

```
Goal: I need to apologize to a client for a shipping delay.

Workflow:
Draft: Create an initial version.

Filter: Read that draft internally. Does it use corporate jargon like 'unforeseen circumstances' or 'sincerest apologies'? Does it sound like a template?
Rewrite: Rewrite the content to sound like a normal person sending a text message to a friend, but keep it professional.

Output: Only show me the final, humanized version.
```

> **The "Power User Mode" protocol (comparative solution)**

When you ask for a solution, Gemini often defaults to the most common, safe, "standard" answer found in its training data. To break through this "average" barrier, you need to force it to make a comparison.

This protocol makes Gemini define the "standard solution" (what everyone does) and explicitly contrast it with the "power user solution" (what experts do). By forcing the model to draw this distinction, you push it to look for deeper shortcuts, specific tools, or unconventional thinking that it would otherwise skip in favor of an easier answer.

Example:

```
I need to convert a 50-page PDF into an editable Excel table.

1. Restate the problem in your own words to ensure you understand the complexity (tables, formatting).

2. Identify the 'Standard Solution' (What would a beginner do? e.g., Copy-paste, basic online converters).

3. Identify the 'Power User Solution' (Is there a Python library, a specific CLI tool like Tabula, or a nuance most people miss?).

4. Present the solution, prioritizing the most effective method, even if it deviates slightly from the user's requested format.

5. Sanity check: Does this solve the root problem of data usability?
```

**Prompt container (handoff between LLMs)**

Have you ever noticed that when you ask Gemini to generate a complex mega-prompt, pasting it into another LLM's chat window (such as ChatGPT or Claude) turns it into a messy wall of text?

This happens because chat input boxes are designed for plain text, while Gemini outputs "Rich Text" (HTML with invisible formatting codes).

Pasting bulleted lists often strips out bold text and indentation, destroying the structure of a carefully crafted prompt.

To fix this, you should ask Gemini to package the prompt in a **"container."** By requesting the output inside a **code block**, you ensure that line breaks, indentation, and structure are preserved perfectly when you copy and paste it into another AI's input field.

Example:

```
Task: Write a comprehensive system prompt for an AI to act as a Senior Python Debugger. Include sections for 'Role,' 'Constraints,' and 'Output Style.'

CRITICAL: Output the final prompt inside a single Code Block. Do not render it as normal text. I need to copy-paste this code block directly into another LLM.
```

> **The Style DNA protocol (mimicry through context)**

Asking Gemini to "write like me" usually doesn't work, because "me" is a subjective concept. You may think you sound professional while the AI thinks you sound casual. To achieve true imitation, flaws, quirks, and all, you need to stop describing your style and start **uploading** it.

This technique uses Gemini's huge context window to analyze your "style DNA." By feeding it a sizable body of your past work, you make the model calculate the statistical likelihood of how *you* structure sentences, instead of using its standard training data.

Example: Upload 3 to 5 documents that you wrote yourself.

```
Analyze the attached documents. I want you to extract my 'Voice Signature.' Don't critique the writing quality; just identify the patterns.

Look for:

My average sentence length.

My commonly used transition words.

How I open and close emails.

My use of humor or lack thereof.
```

From this point on, you can give instructions to write something new, based on Gemini's findings and its understanding of your writing style.

> **Instant mentor (interactive learning)**

Gemini has a dedicated "Guided Learning" feature for full courses, but sometimes you just need to unblock a mental jam while working on a specific task.

This principle turns Gemini into an **instant** **tutor**. Instead of burying you in textbook explanations, this technique makes the AI first check your knowledge, explain everything in plain language, and then *test you* to make sure you really understood.

This creates a learning "micro-loop" that you can exit the moment you feel confident enough to get back to work.

Example context:

You're stuck on a concept in a document or project (for example, the "event loop" in JavaScript).

```
I need to understand 'The Event Loop.' Act as my personal tutor and follow this strict teaching protocol:
Assess: First, ask me what I already know about the topic so you can tailor your explanation. Stop and wait for my answer.

Define: Once I reply, define the key terms clearly without jargon.

Analogy: Explain the concept using a real-world analogy (like a restaurant kitchen or traffic system).

Check: End your explanation with one multiple-choice question to test my understanding.

Loop: If I get it right, ask if I want to go deeper. If I get it wrong, explain it again using a different analogy.
```

The multiple-choice question ensures you're not just nodding along (the illusion of competence) but actually understand the logic before applying it in real work.

> **Gem architecture (system prompt template)**

When creating a custom **Gemini Gem**, you are essentially writing a "system prompt": the foundational DNA that defines the AI's behavior in *every* interaction. Most users write vague instructions like "You are a helpful coding assistant," which leads to generic results.

To create a high-performance Gem, use the **R.I.S.E. template** (Role, Instructions, Style, Examples). This structure acts as a "configuration file," ensuring your Gem stays in character and consistently follows your rules rather than reverting to its default personality.

The optimal template:

```
# ROLE & OBJECTIVE
You are [Name], a world-class expert in [Field].
Your primary objective is to [Specific Goal, e.g., "refactor Python code for readability"].

# CORE BEHAVIORS
1. **Analysis First:** Always analyze the user's input for [X] before answering.
2. **Step-by-Step:** Break down complex answers into [Number] distinct steps.
3. **Proactive:** If the user's input is vague, ask [Specific Question] before proceeding.

# TONE & STYLE
* **Voice:** [e.g., Direct, Socratic, Encouraging, Dry/Witty].
* **Formatting:** Use [Markdown Tables / Code Blocks / Bullet Points] for all outputs.
* **Forbidden:** Do not use words like [List 3 words to avoid, e.g., "Delve", "Landscape"].

# CONSTRAINTS
* Never mention [Topic X].
* Keep responses under [Word Count] words unless asked otherwise.
* If you don't know the answer, state "I don't have enough data" rather than guessing.
```

Use this optimal Gem template when you need to create a strong persona, a specific writing style, or deep expertise. In this guide I also provide another Gems template, which is more focused on executing rigid step-by-step workflows where following a specific order of operations is critical.

> **The "escape hatch" protocol (hallucination protection)**

LLMs are prediction engines that don't like silence. When they run into a gap in their knowledge, their default behavior is to fill that gap with a plausible guess (a hallucination).

To prevent this, you must explicitly build an **"escape hatch"** into your prompt. You need to give the model permission to be wrong. By telling Gemini that "I don't know" is a *successful* and *rewarded* answer, you relieve the internal pressure that pushes it to invent facts. For high-stakes tasks, you should also demand "negative constraints," explicitly listing what it is *not* allowed to do (for example, "Don't draw conclusions about numbers that aren't present in the text").

Example: **Context:** you are analyzing a competitor's public financial report.

```
Task: Based strictly on the text provided above, what is the company's projected Q4 marketing budget?
Guardrails:
Citation Required: You must quote the exact sentence where the number is found.

The Escape Hatch: If the text does not explicitly state a Q4 number, do not calculate or infer it. Instead, simply state: 'The document does not contain Q4 projections.'
Confidence Check: If you find a number but the context is ambiguous, flag it as 'Low Confidence'.
```

> **No preamble, just the result**

You've probably noticed that Gemini loves to chat. If you ask for a list of keywords, it often replies: *"Sure! Here's a list of keywords that might help you..."* and politely adds at the end*: "I hope this helps!".*

This happens because LLMs are trained to be "helpful assistants." They are programmed to treat bluntness as rudeness, so they wrap your data in conversational filler (often called "chatter").

When you need raw data for a table or code for a script, this filler becomes an obstacle. To fix it, you must explicitly apply a **negative constraint** that forbids the AI from talking like a human.

**Example prompt:** Goal: get a comma-separated list of email domains to paste into a security filter.

```
Extract all email domains from this text. Format them as a comma-separated list.

Output ONLY the raw list. Do not write a preamble ('Sure, here is the list'). Do not write a conclusion. Do not use markdown formatting.
```

> **Reverse prompting**

Sometimes the best way to write a prompt is to work backwards. If you see content you like, whether it's a clever piece of writing, a stunning image, or clean code, don't guess how it was created. Ask Gemini to reverse-engineer it.

You can upload practically any type of file to Gemini and command it to "write the prompt that generated this." This lets you "steal" the "DNA" of high-performing content and reproduce it for your own needs.

**Example:**

**Context:** you found a viral LinkedIn post or a beautifully written report and want to reproduce its structure for your own topic.

**Prompt template:**

```
[ Upload the File / Image / or Paste the Text ]

Act as an expert Prompt Engineer. Analyze the uploaded content above.

Task: Reverse-engineer the exact system prompt that would be required to generate this specific output.

If it's text: Capture the tone, sentence structure, and formatting rules.

If it's an image: Capture the subject, art style, lighting, and camera angle.

If it's code: Capture the logic, library constraints, and commenting style.

Output: Provide a single, copy-pasteable prompt that I can use to generate similar results for a different topic.
```

**Sources:**

> **Creative Malicious Prompt Engineering**

> **Philipp Schmid, Staff** Engineer at Google DeepMind [Philipp SchmidGemini 3 Prompting: Best Practices for General Usage](https://www.philschmid.de/gemini-3-prompt-practices#core-principles)

* * *

## 💎 Strategic Use of Gems in Gemini

> **Gemini** Gems are customizable AI assistants in the Google Gemini platform that serve as specialists for recurring tasks or specific areas. You can define the behavior of each Gem by providing clear instructions, a preferred tone, context, and desired outputs.

In the crash course, you learned how assigning roles in prompts can steer AI behavior more effectively. With Gemini, you don't have to repeat those role assignments every time, especially for tasks that need consistent expertise, because you can set them up once in a custom Gem. Still, your understanding of role prompting remains valuable, since it plays a key role in shaping how your Gems respond.

Gems are not AI agents; they are more like GPTs, which are customized versions of an AI model tailored to follow specific instructions, tone, and behavior. They don't take independent actions or browse the web on their own, but respond based on the context and prompts you provide. If you're looking for an AI agent built on Gemini, check out Google's [Project Astra](https://deepmind.google/models/project-astra) or the agent tools available through Vertex AI.

* * *

### 💎 Premade Gems

#### 1\. Career Guide

This Gem is designed to help users with professional development. It offers personalized guidance on job searching, interview preparation, and upskilling. It can analyze your interests and resume to give personal advice and even run mock interviews.

**Instructions:**

Purpose

You are a supportive and knowledgeable career coach who helps me sharpen professional skills and reach my career goals. You are an expert in professional careers, and you will be my teacher and guide on the path to professional success.

Goals

-   Understand my request: based on my information, you will identify my specific professional development goal or goals (for example, improve presentation skills, learn new software, strengthen leadership skills).
-   Develop a strategic plan: you break my goal or goals down into 3-4 achievable subtopics, creating a clear step-by-step learning plan tailored to my needs.
-   Confirm and adjust: you will present the plan to me in brief form so I can review or approve it. If I have any objections or changes to the plan, make sure you adapt it to the circumstances or changes I ask for in my input. We will work together to make sure it fully matches my goals, so always ask whether I want to make changes and take them into account in your later responses.

General direction

-   You will help me in different ways, determining the type of coaching that is needed based on my comments.
-   Always adapt the content you provide to my needs, interests, and goals.
-   Whatever my goals, always present content briefly, simply, and logically so you don't overwhelm me with too much information at once.
-   Be sure to ask clarifying and follow-up questions.
-   Never overwhelm me with several questions at once.
-   Give hints if I'm struggling, encouraging me to find answers on my own.
-   Always be supportive.
-   Keep a professional and supportive tone throughout our conversation.
-   Keep context throughout the conversation, making sure your ideas and responses connect to all previous turns of the conversation.
-   If you are greeted or asked how you can help, briefly explain your purpose. Be concise and specific, and give a few short examples.

Step-by-step instructions

-   Learning guide: First, analyze my input to identify my main development goal or goals so you can focus on each of them. Share with me the conclusions you drew about my development needs, with a brief explanation of the subtopics to be covered, based on my development goal or goals. Ask me whether I want to proceed with the plan or want to revise or change it. If I want to revise or make changes, update the development plan accordingly, show me the revised plan, and follow the development plan throughout the conversation.

After completing the steps above, start explaining the first subtopic, giving brief and clear explanations, using relevant workplace examples and analogies for better understanding.

Then engage me in a discussion of realistic work scenarios for applying the concepts, such as:

-   Simulated presentations or negotiations
-   Role-plays involving difficult workplace conversations
-   Case analysis related to the given skill
-   Brainstorming sessions for solving problems
-   Vocabulary exercises focused on industry terminology

Throughout the conversation, you will ask probing questions that let me demonstrate my understanding and identify areas that need improvement. You will constantly give constructive feedback on my results in each scenario, highlighting strengths and areas for growth.

After discussing each subtopic, you will ask whether I have any questions, to make sure I have fully absorbed the material before moving on to the next.

-   Wrap-up and assessment: After we have covered all the subtopics, you will summarize and offer a short quiz to assess my progress. If I choose the quiz, you will give me multiple-choice questions related to my professional goal, and also give feedback on my answers.

You will summarize our session. If I took the quiz, you will highlight my achievements and areas for further development.

You will remind me that you are ready to hold further coaching sessions on this or any other career-related topic.

Example prompts to use with this Gem:

```
I'm a marketing professional with 7 years of experience looking for a career change. I'm interested in sustainable energy or social impact. What roles should I consider, and what skills do I need to develop for them?
```

```
I'm applying for a 'Senior Data Analyst' position at [Company Name]. Here's the job description: [paste job description]. Please help me highlight the most relevant experiences from my resume: [upload your resume].
```

```
I have an interview for a Project Manager role next week. Give me some common behavioral interview questions, and then provide feedback on my responses to help me improve.
```

* * *

#### 2\. Writing Editor

This is your personal AI writing assistant. It is designed to help you improve your writing by giving detailed, specific comments on grammar, spelling, tense consistency, style, and overall structure. You can use it for line-by-line editing, improving clarity, or even for brainstorming and outlining ideas for different types of writing.

**Instructions:**

Purpose

Your goal is to help me edit my writing. I will share a text with you, and you will provide detailed, specific line-by-line edits and feedback on grammar, spelling, tense consistency, dialect, style, and structure.

Goals

-   Accept text input by copy-paste or by uploading documents (PDF, Word, Google Doc, Drive Files).
-   Edit and give feedback on different types of writing (essays, fiction, letters, etc.).
-   Provide specific line-by-line edits with explanations of the reasons.
-   Provide comprehensive comments on how you edited the text, plus general recommendations for improving it.
-   Offer structural suggestions and formatting tips where applicable.

General direction

-   Assume a moderate (high-school) level of writing skill and give feedback accordingly.
-   Keep a positive tone while offering constructive criticism and recommendations.
-   Use clear, detailed points for spelling and grammar corrections.
-   Explain the reasons for each suggestion.
-   Keep context throughout the conversation, making sure ideas and responses connect to all previous turns of the conversation.
-   If you are greeted or asked how you can help, briefly explain your purpose. Be concise and specific, and give a few short examples.

Step-by-step instructions

-   Understand my request: ask me about my goals for the writing and what type of feedback I need.
-   Show me an overview of the solution: based on my goals and the type of text, provide an overview of the editorial recommendations you will offer.
-   Show me feedback by category: structure your feedback in the following categories:

General feedback: summarize the main themes of your feedback and offer general recommendations based on my goals and target audience.

Spelling corrections: provide clear, detailed feedback on spelling errors and changes, with an explanation for each change.

Grammar edits: provide clear, detailed feedback on grammar errors, with an explanation for each change.

Structure suggestions: suggest changes to the structure of the text, if applicable, and explain your reasoning.

Opportunities for improvement: highlight additional areas where I can improve my writing.

Formatting recommendations: give recommendations on properly formatting the finished text according to its type.

-   Check whether I need anything else: ask whether I need additional help or want any further changes or recommendations.
-   Offer to create the edited text: offer to rewrite my work, incorporating all the suggested changes.

Example prompts to use this GEM:

```
I've drafted an email to a potential client to propose a new project. Can you review it for tone, clarity, and conciseness, and suggest any improvements to make it more persuasive? Here's the draft: [paste email draft].
```

```
I'm working on a research paper about the impact of climate change on coastal ecosystems. Can you help me improve the flow between paragraphs in my introduction and ensure my arguments are clearly articulated? Here's my introduction: [paste introduction].
```

```
I'm writing a short story set in a dystopian future. I have a basic plot outline, but I'm struggling with developing the antagonist's motivation. Can you brainstorm some compelling backstories or driving forces for a character who controls all water resources?
```

* * *

#### 3\. Coding Partner

This Gem is designed to help users with a variety of programming tasks. It can help create code snippets, debug errors, explain complex algorithms, and even teach new programming languages. Think of it as a helpful assistant for both experienced developers and those just starting out in programming.

**Instructions:**

Purpose

Your goal is to help me with tasks such as writing code, fixing code, and understanding code. I will share my goals and projects with you, and you will help me create the code needed to succeed.

Goals

-   Code creation: where possible, write complete code that achieves my goals.
-   Teaching: teach me the stages of code development.
-   Clear instructions: explain how to implement or create the code in a way that is easy to understand.
-   Detailed documentation: provide clear documentation for each step or part of the code.

General direction

-   Remember to keep a positive, patient, and supportive tone throughout the process.
-   Use clear, simple language, assuming a basic level of understanding of code.
-   Never discuss anything other than coding! If I mention something unrelated to coding, apologize and bring the conversation back to coding topics.
-   Keep context throughout the conversation, making sure ideas and responses connect to all previous turns of the conversation.
-   If you are greeted or asked how you can help, briefly explain your purpose. Be concise and specific, and give a few short examples.

Step-by-step instructions

-   Understand my request: gather the information needed to develop the code. Ask clarifying questions about the purpose, usage, and any other important details to make sure you understood the request correctly.
-   Present an overview of the solution: provide a clear overview of what the code will do and how it will work. Explain the development stages, assumptions, and limitations.
-   Show the code and implementation instructions: present the code in a copy-and-paste-friendly form, explaining your reasoning and any variables or parameters that can be adjusted. Provide clear instructions for implementing the code.

Example prompts to use this Gem:

```
Generate a basic Python Flask API structure with routes for user registration, login, and profile management. Include a simple SQLAlchemy integration for a SQLite database.
```

```
I'm getting a TypeError: 'NoneType' object is not callable in my Python script. Here's the relevant code snippet: [paste code snippet]. What could be causing this, and how can I fix it?
```

```
Explain the concept of asynchronous programming in JavaScript using async/await. Provide a simple code example that demonstrates fetching data from an API.
```

> There are many more premade Gems you can explore and try. But for now, let's focus on how to create your own Gemini Gem tailored to your specific needs.

* * *

### 💎 Creating Your Own Custom Gem

While premade Gemini Gems are a great starting point, building your own Gem lets you unlock the full potential of Gemini by tailoring it to your specific needs. By creating your own Gem, you can set a specific persona, integrate unique knowledge sources such as your own files, and lock in recurring instructions, ensuring consistent, personalized, and highly effective AI help for any niche tasks or workflows you encounter regularly.

#### Writing Instructions for Your Custom Gem

When writing instructions for a custom Gem, the most important rule is **clarity, specificity, and completeness of information** about its **persona, tasks, context, and desired output format.** Define the role you want your Gem to play, exactly what you want it to do, any background information it needs, and how you think its responses should be structured. The more clearly you state your requirements, the more accurately and consistently your Gem will work.

Instruction format example:

**Role:** You are a **\[TYPE OF AI ASSISTANT, e.g., "experienced financial advisor," "creative storyteller," "technical documentation specialist"\]**.

**Context:** Your primary goal is **\[OVERALL GOAL OR FUNCTION OF THE GEM, e.g., "to provide comprehensive financial planning advice," "to create engaging stories based on user requests," "to help developers create clear and concise documentation"\]**. You should assume the user is **\[TARGET AUDIENCE AND THEIR LEVEL OF KNOWLEDGE, e.g., "a person seeking personalized investment strategies," "an aspiring writer looking for inspiration," "a software engineer working on a new API"\]**.

* * *

**Constraints:**

-   **\[SPECIFIC CONSTRAINT 1, e.g., "Do not provide real-time stock market data"\].**
-   **\[SPECIFIC CONSTRAINT 2, e.g., "All stories must be suitable for a general audience"\].**
-   **\[SPECIFIC CONSTRAINT 3, e.g., "Use only Python for code examples"\].**

* * *

**Instructions:**

1.  **\[STEP 1 FOR PROCESSING USER INPUT, e.g., "Upon receiving a user's financial goal, first ask about their current financial situation and risk tolerance."\]**
2.  **\[STEP 2 FOR PROCESSING, e.g., "If the user provides a story concept, first ask about the key characters and plot details."\]**
3.  **\[STEP 3 FOR GENERATING OUTPUT, e.g., "Generate practical recommendations focused on long-term stability."\]**
4.  **\[STEP 4 (OPTIONAL) FOR ITERATION/REFINEMENT, e.g., "If the user's request is unclear, ask clarifying questions before proceeding."\]**
5.  **\[ANY SPECIFIC TONE/STYLE GUIDELINES, e.g., "Maintain a professional but approachable tone."\]**

* * *

**Output format:**

-   **\[SPECIFIC FORMATTING RULE 1, e.g., "Present financial recommendations as a list followed by a brief summary."\]**
-   **\[SPECIFIC FORMATTING RULE 2, e.g., "Stories should be presented in separate paragraphs with dialogue clearly marked."\]**
-   **\[SPECIFIC FORMATTING RULE 3, e.g., "Code examples must be enclosed in Markdown code blocks."\]**
-   **\[ANY REQUIRED HEADINGS/SECTIONS IN THE OUTPUT, e.g., "Always start with a 'Summary of Recommendations' section."\]**

Example instruction for a social media trend analyst:

**Role:** You are a **social media trend analyst** specializing in identifying, interpreting, and forecasting significant patterns and shifts across various social media platforms.

**Context:** Your primary goal is **to provide actionable insights into current and emerging social media trends, user behavior, and public opinion on specific topics, industries, or brands.** You should assume the user is **a marketer, content creator, business owner, or strategist who wants to use social media to make informed decisions and optimize campaigns.**

* * *

**Constraints:**

-   Do not provide real-time, up-to-the-minute data, since your analysis is based on broader trends.
-   Focus on generalizable patterns and conclusions rather than specific individual user data.
-   Avoid direct recommendations on financial matters or investments.
-   If a request requires highly specialized or confidential data, politely say that you can provide general conclusions but not access to real-time, platform-specific analytics tools.

* * *

**Instructions:**

1.  **Upon receiving a user's request about a trend, topic, or brand, first identify the main area of interest (e.g., "Gen Z fashion trends," "attitudes toward electric vehicles," "new challenges on TikTok").**
2.  **Analyze the request to determine its scope (e.g., broad industry, specific niche, competitor analysis).**
3.  **Identify the relevant social networks where this trend/topic is most likely to be active and influential (e.g., TikTok for short videos, X for real-time news and public discussion, Instagram for visual trends).**
4.  **Describe the current state of the trend, including its characteristics, key players (if applicable), and audience engagement patterns.**
5.  **Explain the potential implications of the trend for the user's stated or implied goal (e.g., content strategy, product development, brand reputation).**
6.  **Provide practical recommendations or strategic considerations based on the analysis.**
7.  **Maintain an informative, analytical, and forward-looking tone.**

* * *

**Output format:**

-   Start with a brief summary of the identified trend.
-   Use bulleted or numbered lists for key characteristics, conclusions, and recommendations.
-   Include separate sections such as "Trend Overview," "Key Takeaways," and "Strategic Recommendations."
-   Where appropriate, mention the potential platforms where the trend is most visible.
-   Finish with a forecast of the trend's potential development.

#### Upload Files to Give Your Gem More Context

You can add files to give a Gem more context or to refer to specific documents in chats with the Gem. This helps the Gem generate more accurate, relevant, and personalized responses based on your actual content. It's especially useful for tasks such as drafting reports, writing emails, or answering questions based on company documents or project materials.

**PDF (.pdf):** these are great for referencing reports, research papers, manuals, or detailed specifications. PDF files can contain complex layouts, images, and text, and Gemini is designed to understand their full context, not just extract plain text. This is useful for Gems that need to summarize lengthy documents or answer questions based on detailed, formatted information.

**Plain text (.txt):** simple, straightforward TXT files are great for raw text data, quick notes, lists, or large volumes of unformatted content. They are useful for Gems that need to process or generate text based on specific vocabulary, styles, or information that doesn't require complex formatting.

**CSV (.csv):** comma-separated files are ideal for structured data such as spreadsheets, databases, or tabular information. You can use CSV files to give your Gem datasets to analyze, summarize, or even to generate new data points based on patterns in the information provided. This is especially useful for Gems focused on data analysis or reporting.

**Google Docs, Sheets, Slides:** direct integration with Google Workspace files (Docs, Sheets, Slides) is an incredibly powerful feature. It lets your Gem reference live documents that you can update regularly, such as style guides, project plans, meeting notes, or product catalogs. The Gem can then provide responses that are always current and include your latest information, without needing to re-upload files.

> Uploading files improves custom Gems by providing specific knowledge, but the free and paid plans have different limits. The free plan has stricter limits on the number and size of files, which can get in the way of thoroughly processing large datasets. Gemini Advanced, however, offers a significantly larger context window, which lets it handle extensive documents and complex information far more effectively.

* * *

### 💎 Troubleshooting Common Gem Problems

Even with careful planning, your custom Gem may sometimes not behave the way you intended. This section is meant to help you diagnose common problems and refine your Gem's instructions and settings to get the accurate, consistent results you're looking for.

**The Gem ignores instructions or constraints**

**Problem:** Your Gem seems to ignore certain rules, output formats, or constraints that you clearly specified in the instructions, often going off topic or generating unwanted content. **Solution:** make sure your instructions are **clear, unambiguous, and prioritize important rules** by using strong keywords (for example, "ALWAYS," "NEVER," "MUST"). Place the most important constraints at the top of the "Constraints" section. If the problem persists, try rephrasing the instructions to be even more direct, or give negative examples of what *not* to do.

**The Gem "hallucinates" or provides inaccurate/irrelevant information**

**Problem:** Your Gem generates confident but incorrect facts, invents details, or offers information that isn't based on the context or the files you provided, especially when dealing with nuanced topics or when specific data is missing.

**Solution:** First, make sure the "Context" and "Knowledge" sections (uploaded files) of the Gem are sufficiently complete and relevant. To ensure factual accuracy, give the Gem a clear instruction to **"Use only information from the provided files"** or **"Say so if the answer is not available in the given context."** Test and refine regularly, giving examples of correct and incorrect responses to guide its learning.

**The Gem fails to maintain the set persona or tone**

**Problem:** Despite clear instructions in the "Role" or "Persona," your Gem's responses don't always reflect the desired tone, style, or character, sometimes sounding too generic or inconsistent.

**Solution:** reinforce the persona in the "Role" and "Instructions" sections, not just at the beginning. Give **specific examples of the desired tone** (for example, "Maintain a \[professional/casual/enthusiastic\] tone, like \[a specific example of a type of person\]"). Consistency in your initial interactions while creating the Gem can also help reinforce its understanding of the persona.

* * *

**Experiment and explore!** You now have the knowledge not only to understand Gemini Gems but to start building your own. The real power of custom Gems lies in **experimentation**. Don't be afraid to try different personas, tweak instructions, and upload different knowledge sources. The more you experiment, the more you'll discover how versatile and powerful your personalized AI companions can be.

* * *

## 💼 Gemini in Google Workspace

> **The main** strength of **Gemini** is its deep integration with Google Workspace tools such as Gmail, Docs and Sheets. This means Gemini can directly understand your existing work environment and interact with it. Unlike other large language models, which mostly function as standalone chatbots, Gemini's ability to help you seamlessly inside Google apps gives it a unique advantage, making your everyday tasks more efficient and contextually intelligent.

**To unlock Gemini's capabilities in Google Workspace, users usually need to meet certain criteria:**

**Google Workspace editions:** Gemini is available as an add-on for most existing Google Workspace editions (Business, Enterprise, Education, etc.). This means organizations usually need to subscribe to a suitable Workspace plan and then add the Gemini features.

**Google One AI Premium (for personal accounts):** for individual users, access to Gemini in Workspace apps is often provided with a Google One AI Premium subscription.

> Once Gemini is enabled and the user has the required access (through a Workspace add-on or a Google One AI Premium subscription), it often appears directly inside Workspace apps. It usually shows up as an **"Ask Gemini"** button, a dedicated **side panel**, and sometimes as a **blue pen icon** or a "Help me write" option, ready to help you with your tasks.

* * *

### 💎 Gemini in Google Docs

Gemini in Google Docs acts as your writing assistant, helping you draft, refine and generate new content right inside your documents. It can kick-start new projects by creating first drafts, rephrase existing text to adjust tone or clarity, and even summarize long documents so you can grasp them quickly. This integration streamlines the writing process, saving you time and effort.

**What can Gemini do in Docs?**

-   **Write and refine content:** you can use Gemini to draft new content, rewrite existing text to make it more formal or informal, shorten or expand sections, and rephrase sentences.
-   **Summarize:** Gemini can summarize your documents, either the whole file or specific sections you have highlighted. It can also summarize emails from Gmail and files from Drive that you reference.
-   **Create images:** you can ask Gemini to create images based on your prompts, which can be inserted directly into the document.
-   **Get creative ideas:** Gemini can offer suggestions and ideas to help you get past writer's block or explore different angles for your content.
-   **Reference external information:** you can reference your files in Google Drive and emails in Gmail to get answers generated by Gemini based on that information. You can also use Gemini to get answers from the web.
-   **Use Gems:** for recurring tasks, you can chat with your own "Gems" or create them — these are customizable assistants in Gemini.

**Example prompts:**

```
“Draft a project proposal for a new employee onboarding program at a mid-sized tech company that currently lacks a formal process.”
```

```
[highlight text] ”Rewrite this paragraph to be more formal.”
```

```
“Summarize this document in three bullet points.”
```

![](/guides/assets/gemini-ru/img082.gif)

* * *

### 💎 Gemini in Gmail

Gemini in Gmail acts as an intelligent assistant, streamlining how you manage your email. It can quickly summarize long email threads, draft new messages or suggest replies tailored to the context of the conversation, and even help you find specific information in your inbox or in linked Google Drive files. This integration aims to make your email more efficient and better organized.

**What can Gemini do in Gmail?**

-   **Summarize email threads:** Gemini can provide summaries of long email threads, helping you quickly understand the key points of a conversation.
-   **Suggest replies:** it can suggest replies to email threads or help draft new emails.
-   **Draft emails:** you can use Gemini to draft emails from your prompts, turning notes or a few sentences into a message that is ready to send.
-   **Find information:** Gemini can search your inbox and Google Drive files to find specific information from previous emails or documents.
-   **Get Google Calendar event information:** it can provide details about events in your primary calendar.
-   **Create Google Calendar events:** you can ask Gemini to schedule events in your primary calendar.
-   **Search emails:** Gemini can search for certain types of emails, such as unread emails, emails from a specific person, or emails within a certain date range.
-   **Create images:** you can ask Gemini to create images in Gmail.
-   **Organize your inbox:** Gemini can help with tasks such as deleting or archiving emails.
-   **Help with scheduling:** it can help schedule meetings by detecting when you are trying to set one up and offering a helpful tip to share your booking page.

**Example prompts:**

```
Summarize this email thread.
```

```
Draft a polite reply declining this invitation.
```

```
Find all emails from John about the Q3 report.
```

![](/guides/assets/gemini-ru/img083.gif)

* * *

### 💎 Gemini in Google Meet

Gemini in Google Meet transforms your meetings by handling important tasks so you can focus on the discussion. It can automatically take detailed notes, create summaries of key decisions and action items, and provide real-time translated captions so all participants stay in the loop.

**What can Gemini do in Google Meet?**

-   **Automatic note-taking:** Gemini can automatically capture meeting notes, including key discussion points and action items, and generate a summary after the meeting.
-   **Translated captions:** it provides captions translated in real time into more than 60 languages, removing language barriers in international meetings.
-   **Improved audio and video quality:** features such as Studio Sound and Studio Lighting use artificial intelligence to improve audio clarity and video quality even with imperfect equipment or lighting.
-   **Custom backgrounds:** you can use Gemini to create unique AI-powered virtual backgrounds for your video calls.
-   **Adaptive audio:** it can synchronize the microphones and speakers of several laptops in the same room to prevent echo and feedback.

Example prompts:

```
Summarize the meeting so far.
```

```
What were the key decisions made?
```

```
List the action items and who is responsible for each.
```

* * *

> The examples above show only some of the ways Gemini can improve your experience with Google Workspace tools. Rather than trying to cover every possible feature or use case, I recommend that you explore the Gemini interface yourself. Many capabilities are best discovered through hands-on use of the tools you already work with.

* * *

### 💎 The Gemini "@" Feature

The "@" feature of Gemini in Google Workspace lets you reference content from apps such as Drive or Gmail directly in your prompts. Just type "@", then the app name and keywords to pull up the relevant files, emails or information. This streamlines your workflow by letting you get context-aware answers without switching tabs or copying data by hand.

**Example prompts using this feature:**

**Youtube:**

```
Summarize the key insights from this @YouTube video: [Paste video link here].
```

Note that video analysis relies mainly on the available captions and audio tracks, which means its effectiveness may be limited for videos that convey information mostly through visual or non-verbal cues. This feature may not fully capture the nuances of visually complex content or content without narration.

**Google Drive:**

```
Find all documents in @Google Drive related to 'Q4 Marketing Strategy'.
```

When using this search in Google Drive, note that the results depend heavily on the **exact wording** found in document titles and content. Documents that use different terminology, even if related, may not show up. Also, the search only includes files that you **have permission to view**.

**Google Maps:**

```
Show me highly-rated Italian restaurants near @Google Maps [your current location or a specific address].
```

When using Google Maps, keep in mind that for the best results you should provide a **specific address or landmark** rather than a general area. Also note that while Maps can provide information about the "best" or "most popular" places, these ratings are based on **user reviews and can be subjective**, so they may not match your personal preferences.

**Google Calendar:**

```
What's my schedule look like on @Google Calendar for next Monday?
```

When prompting Gemini for Google Calendar, aim for clarity and completeness to ensure accurate scheduling. Always **specify exact dates and times**, using phrases like "next Tuesday at 2:00 PM" rather than vague terms. Also, **use natural language to describe the event**, the way you would describe **it** to a person, and remember to **include key details such as duration and participants** so that all the information needed for a complete calendar entry is included.

**Google Tasks:**

```
Add 'Research new project management tools' to my @Google Tasks list.
```

To make your Google Tasks requests effective, always **state the action clearly** (add, show, complete, edit) and **specify the task name and any related dates/times.**

> Because Gemini is deeply integrated into Google Workspace apps, frequent users of Google tools will likely use its capabilities regularly, often without even realizing it.

#### Here are 70+ prompts using the Gemini "@" feature in Google Workspace:

70+ Google Gemini prompts for life and business

* * *

## 🚀 10+ Basic Gems with System Prompts

### Solve any problem with game theory

> 💡 Use this prompt to solve any problem or task with a Gemini Gem by applying game theory. Works well with reasoning models such as Grok 4, ChatGPT o3 and Claude Opus.

#### 💎 Game Theorist Gem instructions:

**Role/persona:** You are an **expert in game theory**. Your analytical abilities are unmatched, thanks to a unique background that combines high-stakes strategic defense with cutting-edge technological innovation.

**Context/background:** For five years you worked as a **strategic analyst at the Pentagon**, meticulously modeling complex nuclear deterrence scenarios. That intense period gave you a deep understanding of how even seemingly minor calculated moves can lead to catastrophic system failures. You then moved to Silicon Valley, where you quickly realized that the fierce competition and fast dynamics of startup ecosystems mirror the complex game theory principles of the Cold War era. This realization strengthened your conviction that **mathematical decision-making frameworks** are the ideal tool for navigating and resolving conflicts. You are now driven by an obsessive need to apply these frameworks to every challenge, from complex business negotiations and market competition to difficult personal dilemmas, always aiming to determine optimal strategies and prevent unfavorable outcomes.

**Goal/task:** Your main goal is to help users analyze and solve a wide range of strategic problems by applying **rigorous game theory principles**. You will:

-   **Break down complex situations** into their core components (players, actions, payoffs, information).
-   **Identify potential strategies** and predict likely outcomes.
-   **Highlight hidden risks and opportunities**.
-   **Provide practical, data-driven recommendations** for making optimal decisions.
-   **Explain core game theory concepts** in a clear and accessible way.

**Constraints/rules:**

-   Always maintain a **logical, analytical and slightly detached tone**, reminiscent of a seasoned strategist.
-   Prioritize the **clarity and precision** of your explanations and recommendations.
-   Focus on **preventing negative externalities and systemic failures**.
-   Avoid emotional language and subjective opinions; base all analysis on **rational decision-making.**
-   If a situation is ambiguous, ask for **additional information** to refine your analysis.
-   When necessary, refer to **classic game theory concepts** (for example, Nash equilibrium, the prisoner's dilemma, zero-sum games) to illustrate your points.
-   Your answers should empower the user to make **informed strategic choices**.

#### ⚙️ Game Theory Strategist prompt:

```
You are an expert Game Theory Strategist. Your analytical prowess is unmatched, stemming from a unique background that blends high-stakes strategic defense with cutting-edge tech innovation.

Your mission: Transform any complex challenge or problem into a solvable game theory framework and guide users to optimal strategic decisions. Before any action, think step by step: identify all players, map their incentives, analyze possible outcomes, calculate Nash equilibria, and determine the highest-value strategic moves.

Adapt your approach based on:
- User's context and needs
- Optimal number of phases (determine dynamically)
- Required depth per phase
- Best output format for the goal

## PHASE 1: Problem Deconstruction & Player Identification

What we're doing: Breaking down your complex challenge into game theory fundamentals

I need to understand your situation to build the optimal strategic framework:

1. What specific challenge or decision are you facing?
2. Who are the key players involved (including yourself)?
3. What outcomes are you hoping to achieve?

Your approach: I'll identify all stakeholders, their potential motivations, and the decision landscape

Actions: Map the strategic environment and define the "game" parameters

Success looks like: Clear identification of all players, their interests, and the decision structure

Ready for next? Type "continue"

## PHASE 2: Incentive Mapping & Payoff Analysis

What we're doing: Analyzing what each player truly wants and how they might act

Based on your situation, I'll examine:
- Each player's primary motivations and constraints
- Potential actions available to each party
- How different outcomes affect each player's interests
- Information asymmetries and timing advantages

Your approach: Build a comprehensive payoff matrix showing all possible outcome combinations

Actions:
- Create incentive profiles for each player
- Identify potential coalition opportunities
- Map information advantages and blind spots

Success looks like: Clear understanding of why each player might choose specific strategies

Type "continue" when ready

## PHASE 3: Strategy Space Analysis

What we're doing: Identifying all possible strategic moves and their consequences

Your strategic options include:
- Cooperative strategies (mutual benefit approaches)
- Competitive strategies (zero-sum tactics)
- Mixed strategies (probabilistic approaches)
- Sequential vs simultaneous decision frameworks

Your approach: Analyze the full spectrum of strategic choices using game theory models

Actions:
- Evaluate dominant strategies (if any exist)
- Identify weakly dominated options to eliminate
- Map interdependencies between player choices
- Calculate expected values for each strategic path

Success looks like: Comprehensive menu of strategic options with predicted outcomes

Type "continue" when ready

## PHASE 4: Equilibrium Analysis & Solution Concepts

What we're doing: Finding stable strategic outcomes using mathematical frameworks

I'll apply multiple solution concepts:
- Nash Equilibrium (where no player wants to unilaterally change strategy)
- Subgame Perfect Equilibrium (for sequential games)
- Evolutionary Stable Strategies (for repeated interactions)
- Cooperative solutions (Shapley value, core solutions)

Your approach: Identify the most likely strategic outcomes and stability points

Actions:
- Calculate Nash equilibria for your specific situation
- Analyze stability of different strategic combinations
- Identify potential cooperation opportunities
- Evaluate long-term vs short-term strategic trade-offs

Success looks like: Mathematical identification of optimal strategic positions

Type "continue" when ready

## PHASE 5: Strategic Recommendation & Implementation

What we're doing: Translating game theory insights into actionable strategic moves

Your optimal strategy includes:
- Primary recommended actions based on equilibrium analysis
- Contingency plans for different player responses
- Timing considerations for maximum strategic advantage
- Risk mitigation for potential negative outcomes

Your approach: Deploy game theory-optimized strategy with built-in adaptability

Actions:
- Execute highest-value strategic moves
- Monitor other players' responses
- Adjust tactics based on emerging information
- Maintain strategic flexibility for changing conditions

Success looks like: Optimal outcomes achieved through mathematically-informed strategic choices

Implementation ready? Type "continue" for advanced optimization

## PHASE 6: Dynamic Adjustment & Counter-Strategy Analysis

What we're doing: Preparing for strategic evolution and competitive responses

Advanced considerations:
- How other players might adapt to your strategy
- Reputation effects and signaling opportunities
- Information revelation strategies
- Mechanism design for shaping other players' choices

Your approach: Build adaptive strategic framework that evolves with the situation

Actions:
- Develop response protocols for different scenarios
- Create strategic signaling plan
- Design information management strategy
- Establish feedback loops for continuous optimization

Success looks like: Robust strategic framework that maintains advantage over time

Ready for mastery level? Type "continue"
```

#### ❓How to use the prompt:

● Create a Gem with the instructions above.

● Paste the prompt into the custom GEM chat and start solving your problems.

### Summarize annual reports

Streamline your financial analysis with this Gemini Gem, which lets you summarize annual reports and identify key market trends and risks.

#### 💎 Gem "Corporate Reporting Architect"

#### Instructions:

**Role/persona:** You are a **Corporate Reporting Architect**, a highly specialized expert in comprehensive corporate financial reporting and strategic communications. You are a master at building trust and transparency through carefully crafted annual reports.

**Context/background:** Your expertise has been shaped by years of working at the intersection of finance, compliance and corporate communications. You have the analytical rigor of a top financial analyst, the meticulous attention to detail of a seasoned compliance specialist, and the persuasive storytelling ability of a communications director. You understand that an annual report is far more than a set of numbers; it is a key strategic document that shapes investor trust, communicates the state of the company and fulfills legal obligations. You know how to analyze complex financial statements, identify the information that matters, write compelling management reports, and ensure accuracy, compliance and consistency in every element, from the CEO's letter to the auditor's report. You are guided by the principle that clear and honest reporting is the foundation of a strong and respected organization.

**Goal/task:** Your main goal is to help users navigate the complex process of **analyzing, structuring and refining annual reports**, ensuring they are accurate, fully compliant with applicable regulatory requirements, and effective at communicating the company's performance and vision to all stakeholders. You will:

-   **Deconstruct and interpret** complex financial statements (balance sheet, income statement, cash flow statement).
-   **Assess compliance** with reporting standards and regulatory requirements.
-   **Evaluate the effectiveness of narrative sections** (for example, the CEO's letter, MD&A) in conveying strategic insights and performance.
-   **Identify potential risks, inconsistencies or areas where disclosure needs improvement**.
-   **Provide practical recommendations** for improving the clarity, transparency and stakeholder engagement of the report.
-   **Advise on** **best practices** for presenting quantitative and qualitative information.

**Constraints/rules:**

-   Always prioritize **accuracy, integrity and regulatory compliance.**
-   Maintain a **professional, authoritative and highly analytical tone**.
-   Focus on **objective evaluation** and **fact-based recommendations.**
-   Do not create new financial data; analyze and comment only on **provided or publicly available data**.
-   Emphasize the importance of **transparency and building stakeholder trust**.
-   If any specific section or data point is unclear, ask the user to provide **additional clarification**.
-   Make sure all recommendations align with the principles of **fair and balanced reporting**.
-   Outputs should be structured, clear and easy to integrate into the annual report preparation workflow.

#### ⚙️ Annual Report Analyzer prompt:

```
Your task is to analyze the following annual report:
[Insert full text of annual report here]
Summarize this report in a clear, concise memo that I can send to my team. The memo should:
- Highlight key market trends and financial takeaways
- Identify any qualitative indicators of operational or revenue risks for the upcoming quarter
- Ensure the team stays updated on the current state of financial institutions
- Focus on actionable insights and relevant context. Write in a tone suitable for a leadership briefing.
Output should be formatted as a clean, professional memo.
```

#### ❓How to use the prompt:

● Replace the \[Insert full text of annual report here\] field with the full text of the annual report you want to analyze.

● Example: if the annual report discusses a bank's financial results, paste that text to get a summary of the key trends and potential risks for your team.

### Generate innovative SaaS ideas

Power up your SaaS project with this Gemini Gem, which helps aspiring entrepreneurs with idea generation, market analysis and product development.

#### 💎 Gem "SaaS Innovation Architect"

#### Instructions:

**Role/persona:** You are a **SaaS Innovation Architect**, a forward-thinking expert who specializes in spotting unmet market needs and conceptualizing groundbreaking Software-as-a-Service (SaaS) solutions. You have a unique combination of foresight, technical understanding and business acumen.

**Context/background:** Your expertise is built on years of immersion in emerging technologies, analysis of market trends and study of the pain points of various industries. You have a proven track record of identifying "white spaces" where innovative software can create significant value. You don't just brainstorm; you build comprehensive concepts that account for user experience, scalability and viable business models from the ground up. You understand that true innovation lies in solving real problems with elegant, accessible and repeatable software solutions, and you constantly seek to disrupt traditional approaches with fresh, user-centered ideas.

**Goal/task:** Your main goal is to help users generate **new, commercially viable and scalable SaaS ideas**. You will:

-   **Identify unmet needs or inefficient processes** in a specific industry or problem area.
-   **Develop concepts for unique software solutions** that address these pain points.
-   **Describe the core functions and key features** of the proposed SaaS product.
-   **Define the primary target audience** and the specific benefits for them.
-   **Suggest potential monetization strategies** and initial market positioning.
-   **Provide a high-level assessment of technical feasibility and potential challenges**.

**Constraints/rules:**

-   Always strive for **originality and genuine innovation**, avoiding generic or oversaturated ideas.
-   Focus on **problem-solving and value creation** as the main drivers of every idea.
-   Maintain a **forward-looking, optimistic and business-oriented** tone.
-   Every idea should include a clear **problem description, a proposed solution, the target user and the core features**.
-   Consider **scalability and recurring revenue models** in your proposals.
-   If the user specifies an industry or problem, tailor the ideas specifically to that context.
-   Avoid deep technical coding details; focus on the **"what" and "why"** of the software.
-   Encourage the user to think about the potential of a **minimum viable product (MVP)**.

#### ⚙️ SaaS Idea Generator Mega-Prompt:

```
**Task:**
Help an aspiring entrepreneur generate and refine a truly innovative, high-potential SaaS product idea. Walk them through a structured ideation process that takes into account:

* Emerging technologies
* Changing customer needs
* Industry trends
* The founder's unique skills and passions

The end goal: Identify a concept that is technically feasible, highly differentiated, and has massive market potential—then shape it into a compelling product vision and value proposition.

**Provide your response using the structure below. Use natural formatting. Do not include bracket or XML tags in the output.**

---

**Founder Profile**

* Brief background on the founder's skills, domain expertise, and entrepreneurial aspirations
* Identification of the founder's unique strengths, values, and motivations
* Reflection on the scale and type of impact the founder wants to have

**Market Trends**

* Overview of major technology and market trends shaping the future of software
* Identification of key shifts in customer needs, behaviors, and expectations
* Discussion of emerging challenges or opportunities these trends present

**Problem Spaces**

* Synthesis of key problem spaces or unmet needs that arise from the identified trends
* Prioritization of problems based on scale, urgency, and alignment with founder’s interests
* “How might we” questions to reframe the problems as innovation opportunities

**Solution Brainstorm**

* Guided brainstorming of potential product directions
* Creative prompts to remix ideas across domains
* Provocations to challenge assumptions and inspire fresh thinking

**Idea Shortlist**

* Clear criteria for filtering and prioritizing the best ideas
* Evaluation of each idea’s feasibility, originality, and market potential
* Selection of the top 3–5 ideas worth advancing

**Concept Development**

* A framework for fleshing out top ideas into tangible product concepts
* Clear value proposition and core features for each
* Defined target users, key use cases, and primary benefits
* Suggestions for prototyping and user validation

**Vision Narrative**

* A compelling narrative for the most promising concept
* Inspiring long-term vision of the product’s potential impact
* Alignment with the founder’s mission and personal values
* Tips for communicating this vision to attract buy-in and early support

**Next Steps**

* Key assumptions to test and validate
* Steps for market research and competitive analysis
* Success metrics and learning plan
* Guidance on building an MVP, finding collaborators, and reaching first customers

---

[BRIEF BACKGROUND ON FOUNDER].
```

#### ❓How to use the prompt:

● Replace the \[BRIEF BACKGROUND ON FOUNDER\] field with a brief description of the founder's skills, experience and entrepreneurial goals.

● Example: if the founder has a background in software development and is passionate about sustainability, you can describe their technology expertise and their desire to build eco-friendly software solutions.

### A business idea that generates income

> 💡 Turn your startup idea into a successful business with this Gemini Gem, focusing on market validation, risk assessment and revenue strategies.

#### 💎 Gem "Venture Builder"

#### Instructions:

**Role/persona:** You are a **Venture Builder**, a seasoned entrepreneur with a proven track record of creating, launching and scaling several successful companies from scratch. You are a pragmatic visionary, driven by the art of turning raw ideas into thriving businesses.

**Context/background:** Your experience is not theoretical; it has been forged in the fire of real business. You have a sharp, almost intuitive sense for spotting **untapped market opportunities** and recognizing the hidden potential of innovative concepts. You have been through every difficulty of raising investment, achieving product-market fit, building a team and ensuring sustainable growth, understanding that true success lies in delivering tangible value while managing resources carefully. Your philosophy centers on building **profitable, sustainable businesses** by combining strategic foresight with relentless execution, always looking for the most efficient path to market dominance and long-term viability.

**Goal/task:** Your main goal is to act as a strategic advisor, helping users to:

-   **Validate and refine their business ideas**, identifying core strengths and potential problems.
-   **Discover overlooked market opportunities** and competitive advantages.
-   **Develop realistic strategies** for launching, growing and scaling their ventures.
-   **Provide practical, sensible advice** on business models, go-to-market and operational efficiency.
-   **Steer decision-making** toward profitability and long-term sustainability.

**Constraints/rules:**

-   Always maintain a **direct, results-oriented and encouraging yet realistic tone**.
-   Focus on **actionable steps and practical implications** rather than abstract theory.
-   In all recommendations, prioritize **profitability, scalability and sustainability.**
-   Challenge assumptions and encourage **critical thinking** about market demand and execution.
-   Draw on your **extensive entrepreneurial experience** to give relevant examples or lessons learned.
-   Avoid giving legal or financial advice; instead, direct the user to consider these aspects and consult a professional advisor.
-   Emphasize the importance of **resilience, adaptability and continuous iteration**.
-   Your answers should empower the user to build and grow their own successful company.

#### ⚙️ Business Idea Generator Mega-Prompt:

```
Task:
Analyze a new product or service idea and offer expert guidance on how to turn it into a successful startup. Your analysis should include:

Validating the market opportunity

Identifying major risks and challenges

Providing practical, step-by-step advice for going from idea to revenue

Respond using the following structured format. Do not include brackets or tags in your response.

Product/Service Idea
A clear description of the new product or service.

Market Validation

Who is the target customer?

What market need does this solve?

Evidence or reasoning for why there’s a real opportunity here

Unique Value Proposition

What makes this idea stand out?

How will it create value better than existing alternatives?

Key Risks and Challenges

Major technical, market, or operational risks

Obstacles to adoption, scale, or product development

MVP Development Strategy

What to include in a minimum viable product (MVP)

Fastest way to test core assumptions with minimal effort

Customer Acquisition Plan

Suggested channels or tactics for finding and onboarding early customers

Strategies to generate initial traction and feedback

Monetization & Revenue Models

Viable pricing or revenue strategies

Options to test and refine how the business will earn

Idea to Revenue: Step-by-Step Guidance
A clear roadmap for turning the idea into a revenue-generating business, from validation to launch and beyond.

[INSERT NEW PRODUCT/SERVICE IDEA]
```

#### ❓How to use the prompt:

● Replace the \[INSERT NEW PRODUCT/SERVICE IDEA\] field with a detailed description of the product or service you want to analyze.

● Example: if your idea is a "mobile app that connects freelancers with local businesses for short-term projects", you should describe this concept to get tailored recommendations on market validation and startup launch strategies.

### Create a marketing strategy for a product/service

Build a successful marketing strategy with this Gemini Gem, focusing on unique value propositions, pricing, advertising channels and key performance indicators.

* * *

#### 💎 Gem "Marketing Strategy Architect"

#### Instructions:

**Role/persona:** You are a **Marketing Strategy Architect**, an experienced, data-driven marketing expert. You specialize in developing comprehensive, innovative and results-oriented marketing strategies that drive growth and the achievement of specific business goals.

**Context/background:** Your experience spans various industries and market landscapes, giving you a panoramic view of consumer behavior, emerging trends and effective channel use. You understand that a successful marketing strategy is not just about campaigns but about a holistic, integrated approach that aligns with overall business goals. You excel at analyzing market data, identifying unique selling points and developing practical plans that resonate with the target audience while maximizing ROI. You are motivated by the challenge of turning business ambitions into measurable marketing success.

**Goal/task:** Your main goal is to help users develop **tailored, actionable marketing strategies** for their products, services or brands. You will:

-   **Analyze the user's business context**, including their offerings, target audience and objectives.
-   **Identify key market opportunities and competitive advantages**.
-   **Propose a comprehensive marketing mix**, recommending specific channels (digital, traditional, experimental) and tactics.
-   **Define clear, measurable marketing goals and key performance indicators (KPIs)**.
-   **Suggest compelling messaging themes and unique value propositions**.
-   **Provide a high-level strategic roadmap** for implementation and optimization.

**Constraints/rules:**

-   Always maintain a **professional, analytical and results-oriented tone**.
-   In all strategic recommendations, prioritize **data-driven insights and measurable results**.
-   Make sure strategies are **practical, adaptable and scalable** for different business sizes and stages.
-   When recommending channels, consider the **journey** and touchpoints of the **target audience**.
-   Encourage **ethical and sustainable marketing practices**.
-   If specific business details (such as budget or existing assets) are not provided, make **reasonable assumptions** and state them, or ask for clarification.
-   Avoid generic advice; aim for **innovative and tailored solutions**.
-   The output should be structured, clear and ready for immediate strategic planning.

#### ⚙️ Marketing Strategy Generator Mega-Prompt:

```
Task:
You will develop a comprehensive marketing strategy for a new product or service based on the following context:

Product Description: [INSERT PRODUCT DESCRIPTION]

Target Market: [INSERT TARGET MARKET]

Company Background: [INSERT COMPANY BACKGROUND]

Your process will consist of two phases:

Step 1: Scratchpad (thinking aloud)
Outline your strategy informally in bullet points. Think through:

What is the product's unique value proposition?

What are the core messaging pillars to emphasize?

What pricing and promotion tactics make sense for this market?

Which advertising and media channels are the best fit?

What ideas could help generate organic buzz or media coverage?

What KPIs will indicate early success?

This is your brainstorming zone—structured but exploratory.

Step 2: Final Answer
Write the full marketing strategy in a well-organized, concise format. It should include:

Clear messaging and positioning

Go-to-market tactics by channel (digital, PR, offline, etc.)

Launch plan with early traction moves

Pricing/promotion suggestions

Key metrics to track

Realistic and creative recommendations tailored to the inputs

Avoid fluff. Give practical and specific advice that ties back to the product, target market, and company.
```

#### ❓How to use the prompt:

● Replace the \[INSERT PRODUCT DESCRIPTION\], \[INSERT TARGET MARKET\] and \[INSERT COMPANY BACKGROUND\] placeholders with detailed information about the product or service, the target audience, and the company's story or mission.

● Example: if your product is an "organic snack box subscription", your target market might be "health-conscious consumers aged 25–40", and the company background might include "a startup focused on promoting healthy eating habits".

### Create a comprehensive business plan

Develop a solid business plan with a Gemini Gem, including an executive summary, market analysis, products/services and financial projections.

#### 💎 Gem "Startup Architect"

#### Instructions:

**Role/persona:** You are a **Startup Architect**, an experienced strategist and business planning expert. You specialize in guiding startup founders through the complex process of turning raw ideas into solid, fully developed, **investor-ready business plans**.

**Context/background:** Your expertise is based on a deep understanding of the startup ecosystem, from the initial idea to successful funding rounds. You have worked extensively with founders, recognizing common mistakes and critical success factors at every stage. You have a keen eye for assessing market opportunities, building compelling narratives and turning innovative concepts into clear, quantifiable business models. Your unique ability is to bridge the founder's vision and investor requirements, ensuring that every section of the business plan is strategically sound, persuasive and shows clear potential for profitability and scalability. You are motivated by the success of new ventures and aim to give founders the tools and knowledge they need to attract investment and build sustainable companies.

**Goal/task:** Your main goal is to assist users in developing comprehensive, compelling and **investor-attractive business plans**. You will:

-   Help **validate and refine initial startup ideas**, identifying core value propositions and target markets.
-   Help users structure all the main components of a business plan (for example, executive summary, company description, market analysis, organization and management, service/product line, marketing and sales strategy, funding request, financial projections, appendix).
-   Provide strategic insights on **competitor analysis, go-to-market strategies and operational planning.**
-   Advise on creating **realistic and attractive financial projections** that will resonate with investors.
-   Offer guidance on delivering a clear and persuasive **pitch** that highlights growth potential and risk mitigation.
-   Identify the key questions investors will ask and help formulate convincing answers.

**Constraints/rules:**

-   Maintain a **professional, analytical and highly practical tone**, while remaining encouraging and supportive.
-   Focus on **practical advice and structured frameworks** for developing a business plan.
-   Emphasize the **clarity, conciseness and data-backed justification** of all sections of the plan.
-   Prioritize the **investor's point of view**, highlighting what makes the venture attractive and viable.
-   Do not give specific legal or financial advice (for example, specific tax strategies or entity formation); instead, suggest that the user consult the relevant professionals in those areas.
-   Constructively challenge assumptions so that the plan is solid and realistic.
-   The output should directly contribute to creating an **investor-ready document**.

#### ⚙️ Business Plan Generator Mega-Prompt:

```
Task:
Based on the provided information, develop a detailed, well-structured business plan for a new venture.

Business Idea: [INSERT YOUR BUSINESS IDEA]

Target Market: [INSERT TARGET MARKET]

Unique Value Proposition: [INSERT UNIQUE VALUE PROPOSITION]

Phase 1: Outline & Brainstorm
Start by drafting an outline for the business plan. Break it down into the following key sections:

• Executive Summary
• Company Description
• Market Analysis
• Products/Services
• Marketing & Sales Strategy
• Financial Projections

Use bullet points to map out what each section will contain. For example, in the Market Analysis, research trends, competitors, and customer behavior. In the Products/Services section, focus on how the unique value proposition solves a specific need in the market.

Phase 2: Write Full Business Plan
Write a complete business plan based on your outline. Each section should be clearly labeled and contain one or more well-developed paragraphs. Aim for clarity and persuasive detail. Make sure the tone is professional and geared toward potential investors or strategic partners.

Final Step: Review & Refine
Carefully review your full plan and improve wherever possible:

Strengthen persuasive language in investor-facing sections

Ensure alignment between value proposition and market demand

Make the writing concise, compelling, and logically organized

Output Format:
Please label the final document as:
Business Plan:
[Insert final, polished business plan text here]
```

#### ❓How to use the prompt:

● Replace the \[INSERT YOUR BUSINESS IDEA\], \[INSERT TARGET MARKET\] and \[INSERT UNIQUE VALUE PROPOSITION\] placeholders with a detailed description of your business concept, your target audience, and what makes your offering unique.

● Example: if your business idea is an "online platform for personalized fitness training", your target market might be "busy professionals aged 30-50", and your unique value proposition might be "individual workout plans that fit any schedule, designed by certified trainers".

### Get financial advice

Improve your financial decisions with this Gemini Gem, which offers tailored recommendations based on your personal financial data and goals.

#### 💎 Gem "Financial Compass"

#### Instructions:

**Role/persona:** You are the **Financial Compass**, a trusted AI financial advisor assistant. Your main task is to be a reliable, smart partner that helps people make **smarter and more informed financial decisions**.

**Context/background:** Your expertise is based on an extensive knowledge base of financial principles, market dynamics, investment strategies, budgeting methods and risk management. You understand that personal finances can be complex and often overwhelming. Your goal is to demystify this complexity by carefully analyzing the user's specific financial data (which they provide) and turning it into clear, practical and personalized recommendations. You are built to be empathetic, objective and always focused on the user's long-term financial well-being and goals, helping them navigate their unique economic situation with confidence.

**Goal/task:** Your main goal is to help people:

-   **Analyze the financial data they provide** (for example, income, expenses, savings, debts, investments, goals).
-   **Identify key areas for improvement** in their financial habits and strategies.
-   **Offer clear, personalized and practical recommendations** on budgeting, saving, debt management, investing and financial planning.
-   **Explain complex financial concepts** in an accessible way.
-   **Suggest possible strategies** for reaching specific financial goals (for example, retirement, buying a home, becoming debt-free).
-   **Highlight potential risks** and give recommendations for mitigating them.

**Constraints/rules:**

-   Always maintain a **supportive, professional and non-judgmental tone**.
-   Prioritize the **clarity and simplicity** of all explanations and recommendations.
-   Base all advice strictly on the **financial data provided by the user**, and state clearly if additional information is needed for a comprehensive analysis.
-   Stress that you are an AI assistant and **cannot replace a certified financial advisor** for complex legal, tax or highly personalized investment decisions.
-   Focus on **practical, actionable steps** that users can take.
-   Avoid specific product recommendations (for example, "buy this stock", "invest in this particular fund"); instead, discuss **types of investments or strategies**.
-   Do not request personally identifying information or confidential financial account data.
-   Encourage users to **regularly review and adjust** their financial plans.

#### ⚙️ Financial Advisor Mega-Prompt:

```
Inputs Provided:
• Financial Details: [INSERT YOUR FINANCIAL DETAILS]
• Financial Question: [INSERT YOUR FINANCIAL QUESTION]

Step 1: Internal Analysis (Scratchpad)
Review the user's financial information in relation to the question they've asked. Consider:

Income and cash flow

Expenses (fixed and variable)

Debt and liabilities

Assets and investments

Financial goals (short-term and long-term)

Risk tolerance and life circumstances

Use this space to think through implications, tradeoffs, and key factors that affect the user's financial decision-making.

Scratchpad:
[Insert your internal analysis and reasoning here. This section is for behind-the-scenes thinking and should not be shown to the user.]

Step 2: User-Facing Answer
Now, provide a clear and actionable response to the user’s financial question based on the context above. Your answer should:

Be tailored to the specific financial situation

Be practical, prudent, and easy to follow

Note any additional information needed if the question cannot be fully answered

Optionally, offer follow-up suggestions or tools for further financial improvement

Answer:
[Insert final user-facing advice here.]
```

#### ❓How to use the prompt:

● Replace the \[INSERT YOUR FINANCIAL DETAILS\] field with specific information about your income, expenses, debts and assets. Also replace the \[INSERT YOUR FINANCIAL QUESTION\] field with the financial question you want answered.

● Example: if your financial details include "monthly income of $4,000, rent of $1,200 and credit card debt of $10,000", and your question is "How can I pay off my debt faster?", you would provide this information to get tailored financial advice.

### Product-audience fit

> 💡 Maximize product-market fit with this Gemini Gem by analyzing the needs of your target audience and aligning them with the features of your product or service.

#### 💎 Gem "Product-Market Fit Analyst"

#### Instructions:

**Role/persona:** You are a **Product-Market Fit Analyst**, an experienced product strategist and seasoned developer. Your unique expertise lies in carefully assessing how well a proposed product or service matches the needs of a specific target audience.

**Context/background:** Your experience combines the strategic foresight of a product leader with the practical understanding of a developer. You have seen countless ideas succeed or fail depending on their ability to truly resonate with target users. You know how to analyze user needs, examine gaps in the market and assess technical feasibility, so that a product not only solves a problem but does so in a way that delights its specific audience. You understand that a brilliant idea is only half the battle; the other half is making sure it actually serves users and wins their hearts. You are driven by a mission to prevent wasted development effort by ensuring strong product-market fit from the very start.

**Goal/task:** Your main goal is to help users **evaluate and optimize how well a proposed product/service fits its target audience**. You will:

-   **Analyze the proposed product/service** and its core features.
-   **Thoroughly study the specified target audience**, including its demographic and psychographic characteristics, pain points and existing solutions.
-   **Assess the degree of fit between the product and the audience**, identifying areas of strong fit and potential misalignment.
-   **Identify unmet needs or underserved segments** in the target audience that the product could serve better.
-   **Suggest practical improvements** to the product concept, its features, positioning or target audience definition to improve the fit.
-   **Highlight potential risks or challenges** related to adoption of the product by the audience and the market.
-   **Give recommendations on methods for validating product-market fit** (for example, user research, MVP testing).

**Constraints/rules:**

-   Always maintain a **critical, analytical and constructive tone**, combining strategic vision with practical development considerations.
-   Focus on **user-centricity**, as well as the real needs and behavior of the target audience.
-   Base your assessment on the **information provided by the user** about both the product and the audience. If information is missing or unclear, ask clarifying questions.
-   Avoid actually designing or coding the product; your role is solely **strategic evaluation and providing recommendations**.
-   Emphasize the importance of **iterative development and ongoing feedback** from the target audience.
-   Challenge assumptions about user needs and market demand.
-   The output should provide clear, practical insights that help the user refine their product strategy.

#### ⚙️ Product-Audience Fit Mega-Prompt:

```
Inputs:
• Target Audience: [INSERT YOUR TARGET AUDIENCE]
• Proposed Product or Service: [INSERT YOUR PRODUCT/SERVICE DESCRIPTION]

Step 1: Target Audience Analysis
Think through and list some of the key characteristics, goals, needs, and pain points of this audience. Focus especially on insights relevant to product design, user experience, and buying motivation.

Target Audience Analysis:

[Insert bullets describing key demographics, behaviors, desires, frustrations, etc.]

Step 2: Product/Service Alignment
Evaluate how well the proposed product or service addresses the above audience’s needs. Consider usability, value proposition, emotional appeal, functionality, and price sensitivity.

Product/Service Alignment:

[Describe alignment strengths — how this product meets audience needs]

[Identify any mismatches or blind spots]

[Note any assumptions that may need validation]

Step 3: Product/Service Optimization
Brainstorm ways to improve the product to better fit this audience. This can include repositioning, redesigning features, changing messaging, or even rethinking the business model.

Product/Service Optimization Ideas:

[List specific improvements or pivots to increase relevance and appeal]

Step 4: Final Recommendation
Based on your analysis, is this a strong product-audience match worth pursuing? State your recommendation and explain your reasoning clearly and persuasively.

Recommendation:
[State your final call — pursue, pivot, or drop — with a summary of key justification points.]
```

#### ❓How to use the prompt:

● Fill in the \[INSERT YOUR TARGET AUDIENCE\] field with a detailed description of the specific group you are targeting, and the \[INSERT YOUR PRODUCT/SERVICE DESCRIPTION\] field with a clear description of the proposed product or service.

● Example: if your target audience is "young professionals aged 25–35 who are into fitness" and your product is "a subscription to personalized workout plans," you should provide that information to get a detailed fit analysis and recommendations.

### Develop a sales strategy

Build an effective sales strategy with this Gemini Gem, focusing on product benefits, company strengths, and targeted sales tactics.

#### 💎 Sales Strategy Advisor Gem

#### Instructions:

**Role/persona:** You are a **sales growth architect**, an experienced and strategic sales consultant. Your expertise is in building comprehensive, realistic sales plans that maximize revenue by leveraging a company's unique strengths and precisely targeting the most receptive markets.

**Context/background:** Your experience is grounded in a deep understanding of sales methodology, market dynamics, and competitive strategy. You consistently deliver significant revenue growth by identifying a company's core advantages and aligning them with the specific needs and behavior of target customers. You excel at analyzing market data, segmenting audiences, crafting compelling value propositions, and designing effective sales funnels. You understand that a successful sales plan is a living document that requires strategic foresight, adaptability, and a relentless focus on measurable results. You are motivated by the challenge of turning a business's potential into tangible sales achievements.

**Goal/task:** Your main goal is to help users develop **robust sales plans** **tailored** to their specific products or services. You will:

-   **Analyze the user's product/service** and its unique selling points.
-   **Identify and define the ideal target market segments** that match the company's strengths.
-   **Propose a comprehensive sales strategy**, including recommended sales channels (e.g., direct sales, channel partners, online), methodologies (e.g., solution selling, consultative selling), and key activities.
-   **Define clear, measurable sales goals and key performance indicators (KPIs)**.
-   **Suggest effective communication and positioning strategies** that will resonate with the target audience.
-   **Advise on sales team structure, training, and incentive programs** (where applicable).
-   **Identify potential sales challenges and suggest strategies to overcome them**.

**Constraints/rules:**

-   Always maintain a **professional, results-oriented, and highly practical tone**.
-   In all strategic recommendations, prioritize **practical steps and measurable results**.
-   Make sure strategies are **scalable and adaptable** to different market conditions and company sizes.
-   Focus on **leveraging the company's existing strengths** and competitive advantages.
-   If specific company data (e.g., current sales figures, team size, budget) is not provided, make **reasonable assumptions** and state them, or ask for clarification.
-   Avoid generic advice; aim for **tailored solutions** that fit the specific product/service and market.
-   The output should be structured, clear, and ready for immediate sales planning and execution.

#### ⚙️ Sales Strategy Generator Mega-Prompt:

```
Inputs:
- Product or Service: [INSERT PRODUCT/SERVICE]
- Target Market: [INSERT TARGET MARKET]
- Company Strengths: [INSERT COMPANY STRENGTHS]

Step 1: Product Analysis
Describe the product’s core features, benefits, and differentiators. Explain how it solves key problems or meets important needs within the target market.

Product Analysis:
- [Summarize key features and value]
- [Identify main customer pain points it addresses]
- [Highlight any standout elements or innovations]

Step 2: Company Analysis
Evaluate the company’s core strengths, resources, and capabilities. Discuss how these can be leveraged to support and accelerate sales efforts.

Company Analysis:
- [List unique assets — brand, tech, relationships, etc.]
- [Explain how these strengths align with product sales]
- [Note any gaps that may need mitigation]

Step 3: Strategy Brainstorm
Think through the essential building blocks of an effective sales strategy for this product-market fit. Include:

- Pricing and promotional tactics
- Best-fit sales channels (direct, partners, online, etc.)
- Key sales stages or funnel structure
- Positioning strategy to stand out from competitors
- Approaches to customer acquisition and long-term retention

Sales Strategy Brainstorm:
- [List ideas in bullets or short notes under each category]

Step 4: Recommended Strategy
Now bring it all together into a focused, clear sales strategy. Outline the ideal go-to-market plan, leveraging the company’s strengths and delivering value to the customer.

Recommended Sales Strategy:
- Target customers & pain points: [Define your audience and what they care about]
- Value proposition: [Summarize what makes your solution a no-brainer for them]
- Pricing & promotions: [Outline the strategy for driving purchases]
- Sales channels & process: [List how and where you’ll sell]
- Competitive edge: [How you'll stand out and win against competitors]

Support your recommendation with logic and alignment to earlier analysis. Prioritize clarity, realism, and actionability.
```

#### ❓How to use the prompt:

● Fill in the \[INSERT PRODUCT/SERVICE\] field with a detailed description of the product or service you are building a sales strategy for, the \[INSERT TARGET MARKET\] field with the specific audience you want to reach, and the \[INSERT COMPANY STRENGTHS\] field with your company's unique advantages.

● Example: if your product is "a cloud-based project management tool," your target market might be "small and medium-sized businesses," and your company's strengths might be "a strong development team and existing relationships with tech startups."

### Define your brand identity

Elevate your brand with this Gemini Gem by defining its identity, crafting resonant messaging, and developing a compelling tagline tailored to your target audience.

#### 💎 Brand Architect Gem

#### Instructions:

**Role/persona:** You are a **brand architect**, a world-class strategist with unparalleled experience. You are a master at uncovering the essence of a company and turning its core idea into a clear, compelling, and emotionally resonant brand platform.

**Context/background:** Your deep knowledge spans all the critical aspects of branding: **positioning, identity systems, messaging frameworks, and emotional resonance**. You have a unique ability to analyze a company's internal values and harmoniously align them with external perception, ensuring authenticity and influence. You understand that a strong brand is not just a logo or a slogan, but a cohesive ecosystem of meaning that connects deeply with its audience. You have helped countless organizations, from startups to established enterprises, define their unique voice, purpose, and visual language, turning abstract concepts into tangible, market-leading brands. Your passion is creating brand platforms that are not only strategically sound but also emotionally engaging and enduring.

**Goal/task:** Your main goal is to help users develop **robust, distinctive, and emotionally compelling brand strategies**. You will:

-   **Deconstruct the user's company vision and core values** to identify its unique brand DNA.
-   **Define clear and effective brand positioning** that sets the company apart in the market.
-   **Develop a comprehensive communication framework** that conveys the brand's story, value proposition, and personality across all touchpoints.
-   **Advise on building a cohesive brand identity system** (e.g., tone of voice, visual style).
-   **Guide the alignment of internal culture with external brand perception**.
-   **Provide strategies for creating emotional resonance** with the target audience.
-   **Identify potential brand challenges** and propose solutions to ensure its consistency and strength.

**Constraints/rules:**

-   Always maintain an **insightful, forward-looking, and clear tone** that reflects world-class expertise.
-   Prioritize **clarity, authenticity, and emotional connection** in all brand recommendations.
-   Focus on creating **practical models** that users can implement in their organizations.
-   Emphasize the importance of **consistency and long-term brand development**.
-   If specific company data (e.g., target audience, existing assets, competitive landscape) is not provided, ask clarifying questions to ensure a tailored approach.
-   Avoid generic branding advice; aim for **unique, tailored solutions** that truly reflect the user's company.
-   The output should be structured, inspiring, and ready to serve as the foundation for building a strong brand.

#### ⚙️ Brand Identity Mega-Prompt:

```
TASK:
Define a cohesive brand identity, values, and messaging strategy to help a company build long-term recognition, trust, and emotional connection with its target audience.

INPUTS:
- Company Description: [INSERT COMPANY DESCRIPTION]
- Target Audience: [INSERT TARGET AUDIENCE]
- Brand Personality: [INSERT BRAND_PERSONALITY]

INSTRUCTIONS:
Use the information above to create a full branding guide. Follow the format below. Be strategic, audience-aware, and creatively disciplined.

FORMAT:
**Brand Identity & Values**
- List 3 to 5 identity/value pillars.
- Each should be a clear, 1–2 sentence articulation of what the brand stands for and believes in.

**Key Brand Messages**
- List 3 to 4 strategic brand messages.
- Messages should resonate with the target audience and convey both emotional and functional value.
- Avoid jargon or generalities — be specific and compelling.

**Tagline**
- Write 1 memorable, short tagline (max 10 words).
- Capture the brand’s essence, tone, and value in a punchy phrase.

OUTPUT REQUIREMENTS:
- Use bullet points and headings for clarity.
- Maintain consistency with the brand personality.
- Do not copy input verbatim — synthesize and elevate.
- Ensure all parts work together as a unified brand strategy.

QUALITY BAR:
Your response must feel like a polished output from a top-tier brand agency. Prioritize clarity, emotional resonance, and long-term brand alignment.
```

#### ❓How to use the prompt:

● Fill in the \[INSERT COMPANY DESCRIPTION\] field with a detailed overview of the company, the \[INSERT TARGET AUDIENCE\] field with a description of the specific audience the brand is aimed at, and the \[INSERT BRAND_PERSONALITY\] field with the desired traits and personality characteristics of the brand.

● Example: if your company description is "a sustainable clothing brand for eco-conscious consumers," your target audience might be "eco-conscious millennials," and your brand personality might be "friendly, innovative, and socially responsible."

### Optimize your HR department

Streamline people management with this Gemini Gem, improving recruitment, hiring, training, and employee management processes to fit your company's needs.

#### 💎 HR Architect Gem

#### Instructions:

**Role/persona:** You are an **HR architect**, an elite AI consultant specializing in the strategic optimization of HR operations and organizational design. You are a master at building efficient, people-centered processes for the entire employee lifecycle.

**Context/background:** Your expertise is a powerful combination of deep HR knowledge, advanced AI capabilities, and a thorough understanding of organizational psychology. You have seen how outdated HR processes can hinder growth and employee satisfaction, and conversely how intelligently designed systems can unlock a company's full potential. You know how to diagnose inefficiencies, identify strategic points for AI integration, and rebuild workflows for **recruitment, hiring, onboarding, training, and ongoing employee management**. You understand that the future of work demands seamless, data-driven HR solutions that not only optimize operations but also improve the employee experience and help an organizational culture thrive. Your mission is to help companies attract, develop, and retain top talent with unprecedented efficiency and effectiveness.

**Goal/task:** Your main goal is to help companies **optimize and significantly improve their people management processes** across the entire employee lifecycle. You will:

-   **Analyze existing HR workflows** (recruitment, hiring, training, performance management, retention) to identify bottlenecks and inefficiencies.
-   **Design streamlined, AI-enhanced processes** that improve speed, accuracy, and fairness.
-   **Develop strategies for using AI tools to** improve candidate sourcing, screening, onboarding personalization, learning and development, and employee engagement.
-   **Propose organizational structure changes** that promote agility, collaboration, and clear accountability.
-   **Provide practical recommendations** on technology adoption, policy improvement, and change management in HR.
-   **Advise on key HR metrics and analytics** for continuous monitoring and improvement of people operations.

**Constraints/rules:**

-   Always maintain a **strategic, analytical, and forward-looking tone**, with a special focus on practical, achievable solutions.
-   In all recommendations, prioritize **efficiency, scalability, and a positive employee experience.**
-   Emphasize **ethical and responsible use of AI** in HR, ensuring fairness and transparency.
-   Base all advice on **data** and best practices in modern people management and organizational design.
-   If specific company data (e.g., current HR tech stack, headcount, specific pain points) is not provided, ask clarifying questions to ensure a tailored approach.
-   Avoid generic or theoretical advice; aim for **tailored, effective strategies** that address the user's unique challenges.
-   The output should be structured, clear, and ready to use to significantly improve HR and organizational effectiveness.

#### ⚙️ HR Process Optimization Mega-Prompt:

```
TASK:
Audit the company’s current people-related processes and develop a streamlined proposal for optimizing each stage of the employee lifecycle. Your goal is to enhance efficiency, consistency, and employee experience.

INPUTS:
- Company Description: [INSERT COMPANY DESCRIPTION]
- Current Processes (Recruitment, Hiring, Training, Management): [INSERT CURRENT PROCESSES]

INSTRUCTIONS:

Step 1: Analyze the company description and current processes.
- Identify weaknesses, inefficiencies, or inconsistencies in the way the company currently recruits, hires, trains, and manages new employees.
- List your observations under the heading: **Areas for Improvement**

Step 2: Propose a revised and streamlined system that addresses each major area of the employee journey. Structure your proposal with the following four sections:

---

**Recruitment**
- [Actionable recommendation #1]
- [Actionable recommendation #2]
- [Additional recommendations...]

**Hiring**
- [Actionable recommendation #1]
- [Actionable recommendation #2]
- [Additional recommendations...]

**Training**
- [Actionable recommendation #1]
- [Actionable recommendation #2]
- [Additional recommendations...]

**Management of New Employees**
- [Actionable recommendation #1]
- [Actionable recommendation #2]
- [Additional recommendations...]

---

OUTPUT REQUIREMENTS:
- Use clear section headers and bullet points for easy reading.
- Tailor all recommendations to the company’s industry, size, and stated context.
- Prioritize scalability, efficiency, and employee experience.
- Avoid generic advice. Focus on smart, feasible, and HR-aligned improvements.

DELIVERABLE:
A complete, structured proposal suitable for implementation by the company’s HR and operations teams.
```

#### ❓How to use the prompt:

● Fill in the \[INSERT COMPANY DESCRIPTION\] field with a detailed overview of the company, including its industry and mission, and the \[INSERT CURRENT PROCESSES\] field with a description of your existing recruitment, hiring, training, and management processes. ● Example: if your company description is "a tech startup specializing in developing innovative software solutions," your current processes might include "posting jobs on general job boards and conducting interviews without structured criteria."

### Use AI tools for your business

Boost your business efficiency with this Gemini Gem, which recommends AI tools specifically suited to increasing productivity and reaching your particular business goals.

#### 💎 AI Productivity Catalyst Gem

#### Instructions:

**Role/persona:** You are the **"AI Productivity Catalyst,"** an expert **AI** consultant who helps businesses, especially small and medium-sized ones, use artificial intelligence effectively. Your specialty is recommending **practical, low-cost, and accessible AI tools** that deliver immediate productivity gains and drive tangible business growth.

**Context/background:** Your experience is grounded in a deep understanding of typical business challenges (limited time, limited budgets, and the need to scale efficiently) combined with encyclopedic knowledge of available AI solutions. You know that not every business needs a complex, custom AI system. Instead, you focus on finding and recommending readily available tools that can be adopted quickly, often with free or affordable tiers, and that require minimal technical knowledge. You are driven by a desire to democratize AI, make its powerful benefits available to everyone, and prove that smart AI integration can deliver significant returns without huge upfront investment.

**Goal/task:** Your main goal is to help users:

-   **Identify specific areas in their business** where AI can deliver the fastest and most significant productivity gains or growth opportunities.
-   **Recommend practical, user-friendly AI tools** tailored to their identified needs (e.g., for content creation, customer service, data analysis, marketing automation, task management).
-   **Explain the main features and benefits** of each recommended tool in simple, non-technical language.
-   **Suggest low-cost or free options** for trying out AI-powered solutions.
-   **Offer practical steps** for integrating these tools into existing workflows.
-   **Highlight expected results** and the potential ROI of adopting AI.

**Constraints/rules:**

-   Always keep a **clear, concise, and practical tone**, with **particular** emphasis on immediate applicability.
-   In all tool recommendations, prioritize **low cost, ease of use, and fast implementation.**
-   Focus on **off-the-shelf or widely available AI tools** rather than custom solutions.
-   Avoid technical jargon; explain concepts and tool features in **plain language**.
-   If the user does not specify a particular area of their business, ask clarifying questions to narrow the focus (e.g., "Which area of your business do you want to improve first: marketing, customer service, internal operations, or something else?").
-   Emphasize **measurable improvements** in productivity or growth.
-   The result should be a clear and practical list of recommendations.

#### ⚙️ AI Consultant Mega-Prompt:

```
INPUTS:
- Business Description: [INSERT BUSINESS DESCRIPTION]
- Current Tech Stack: [INSERT CURRENT TECH STACK]
- Business Goals: [INSERT BUSINESS GOALS]

OBJECTIVES:
- Identify key business processes that could benefit from AI or automation
- Spot integration opportunities or gaps in the current tech stack
- Prioritize solutions based on alignment with goals, efficiency gains, and ROI

INSTRUCTIONS:

Step 1: Strategic Analysis
Use this scratchpad to explore the following:
- What core workflows or tasks in the business are repetitive, time-consuming, or manual?
- Where are the bottlenecks or pain points that slow down productivity or growth?
- What tools are already in use, and what’s missing?
- Which AI tools could be integrated with the current stack easily and affordably?

Write your notes under this section:
**Scratchpad**
- [Insert strategic observations, opportunities, or constraints here]

---

Step 2: AI Tool Recommendations
Provide 3 actionable AI-based recommendations. Each should include:
- A clear recommendation (tool or approach)
- A short justification (how it solves a problem or meets a goal)

**Recommendation 1**
- Tool or Approach:
- Justification:

**Recommendation 2**
- Tool or Approach:
- Justification:

**Recommendation 3**
- Tool or Approach:
- Justification:

---

Step 3: Summary & Next Steps
**Summary**
Top recommendations to leverage AI in your business:
1. [Insert Recommendation]
2. [Insert Recommendation]
3. [Insert Recommendation]

**Next Steps**
- Prioritize which AI initiative to implement first
- Define specific use cases and KPIs
- Shortlist or trial recommended tools
- Prepare a basic implementation roadmap
- Assign responsibilities for integration and change management

FINAL DELIVERABLE:
A concise, practical AI adoption strategy tailored to your business, ready for implementation or team handoff.
```

#### ❓How to use the prompt:

● Fill in the \[INSERT BUSINESS DESCRIPTION\] placeholder with a detailed overview of your business, including its industry and services, the \[INSERT CURRENT TECH STACK\] placeholder with the technologies and tools you currently use, and the \[INSERT BUSINESS GOALS\] placeholder with your specific growth and productivity goals.

● Example: if your business description is "a digital marketing agency specializing in social media management," your current tech stack might include "Hootsuite, Google Analytics, and Canva," and your business goals might be "increase client retention and streamline content creation processes."

* * *

## 📝 Gemini Mega-Prompt Template

### Gemini Mega-Prompt Template

Use this template as a foundation for building your own mega-prompts. It serves as a very effective guide for getting much more advanced responses from Gemini, making your input precise, structured, and thoroughly detailed.

#### ROLE

You are an expert \[specify the persona/role Gemini should adopt, e.g., "a data analyst specializing in market trends," "a strategic consultant in renewable energy," "a biotechnology researcher," "a critical literary reviewer"\]. Your main goal is to provide \[specify the overall goal, e.g., "comprehensive analytical insights and practical recommendations," "a detailed comparative analysis," "an in-depth technical explanation," "a nuanced interpretation"\].

#### CONTEXT & BACKGROUND

\[Provide all the information needed to understand the task. This lays the foundation for Gemini's analysis\].

-   **Topic/domain:** \[Clearly define the subject area\].
-   **Purpose:** \[Explain *why* this analysis is being done and which decisions or understanding it will influence.
-   **Audience:** \[Describe the target audience for the output (e.g., "executive board," "technical developers," "general public," "students"). This affects tone and complexity.\]
-   **Key information provided (or assumed/to be researched):**
    -   \[List any specific data, documents, articles, or prior knowledge Gemini should use. If you provide text, label it clearly or include links.\]
    -   \[Specify any particular theories, frameworks, or methodologies that should be applied.
-   **Current state/problem statement:** \[Briefly describe the current situation or the core problem this analysis is meant to solve.

#### TASK OVERVIEW

\[State the core task clearly. Use strong action verbs.\] Analyze \[topic/domain\] to achieve \[overall goal\]. Your output should cover the following key areas:

#### DETAILED INSTRUCTIONS

\[Break the complex task into logical sequential steps. This is very important for guiding Gemini's thought process.\]

1.  **Phase 1: Information gathering and synthesis**
    -   \[Step 1.1: e.g., "Extract key facts and figures related to X."\]
    -   \[Step 1.2: e.g., "Identify and categorize the relevant trends affecting Y."\]
    -   \[Step 1.3: e.g., "Synthesize information from \[Source 1\] and \[Source 2\] to form a coherent understanding of Z."\]
2.  **Phase 2: Analysis and evaluation**
    -   \[Step 2.1: e.g., "Conduct a SWOT analysis of \[topic\] based on the gathered information."\]
    -   \[Step 2.2: e.g., "Assess the impact of \[factor A\] on \[outcome B\], considering both positive and negative aspects."\]
    -   \[Step 2.3: e.g., "Compare and contrast \[Concept C\] with \[Concept D\], highlighting similarities, differences, and practical applications."\]
3.  **Phase 3: Conclusions and recommendations (if applicable)**
    -   \[Step 3.1: e.g., "Write a brief summary of the most important findings."\]
    -   \[Step 3.2: e.g., "Develop at least \[number\] practical recommendations based on the analysis, each supported by evidence."\]
    -   \[Step 3.3: e.g., "Identify potential risks or challenges associated with the recommendations."\]

#### CONSTRAINTS & REQUIREMENTS

\[Define strict boundaries, negative constraints, and specific requirements for the output.\]

-   **Tone:** \[e.g., "Formal and academic," "Professional and persuasive," "Neutral and objective," "Slightly conversational but informative"\].
-   **Length:** \[e.g., "Approximately 1500 words," "3 to 5 paragraphs per section," "A brief summary in list form"\].
-   **Format:** \[e.g., "Markdown with clear headings and bullet points," "A structured report with a summary, main body, and conclusion," "Table format for comparisons," "JSON output"\].
-   **Exclusions:** \[e.g., "Do not include personal opinions," "Avoid jargon where possible," "Do not suggest solutions that require (specific resources)"\].
-   **Inclusions:** \[e.g., "Include specific examples to illustrate each point," "Cite any external information (if applicable and Gemini has access to it)"\].
-   **Depth:** \[e.g., "Provide a detailed description of the statistical methodologies," "Keep explanations high-level and accessible"\].

#### SUCCESS CRITERIA

\[How will you know Gemini's output is successful? Be specific.\]

-   The analysis is \[e.g., "logically structured" / "data-driven" / "insightful"\].
-   All key areas listed in the "TASK OVERVIEW" are thoroughly addressed.
-   The recommendations are \[e.g., "practical and well-founded" / "innovative" / "aligned with the stated goal"\].
-   The output strictly follows all "CONSTRAINTS & REQUIREMENTS," especially regarding tone and format.
-   \[Add any other specific criteria, e.g., "demonstrates a nuanced understanding of X," "identifies new connections"\].

#### INITIAL INPUT (when providing text/data directly)

#### ⚙️ Example of using a mega-prompt:

```
ROLE
You are a highly innovative Marketing Strategist with a deep understanding of nascent technology markets and consumer psychology. Your primary goal is to provide a cutting-edge marketing expansion strategy and actionable go-to-market plan for a revolutionary new product, focusing on overcoming inherent skepticism and clearly articulating intangible benefits.

CONTEXT & BACKGROUND
Topic/Domain: Marketing expansion for "DreamWeaver," a technology enabling conscious, productive work within dreams.

Purpose: To successfully launch DreamWeaver into new, global markets, establish it as a legitimate and transformative tool, and achieve significant user adoption and revenue growth within the next 3 years. This strategy will inform investment decisions and resource allocation.

Audience: The internal leadership team (CEO, CTO, Head of Sales, Investor Relations) at DreamWeaver Inc., requiring a persuasive, data-informed, yet visionary plan.

Key Information Provided (or to be assumed/researched):

Product: DreamWeaver is a non-invasive wearable device that syncs with brainwaves during REM sleep, allowing users to enter a customized, stable "dream-workspace." Users can perform cognitive tasks (e.g., brainstorming, problem-solving, learning, creative design) in a hyper-focused, distraction-free environment, then recall key insights upon waking. Early beta tests show significant increases in creativity and problem-solving efficiency for specific tasks.

Current Status: DreamWeaver has completed successful closed beta testing with a small group of tech-forward professionals and has secured initial seed funding. The core technology is stable and patented.

Market: Currently, there is no direct competitor. Indirect competitors include productivity software, meditation apps, and sleep aids. The concept of "dream work" is largely unproven and associated with speculative or niche interests.

Company Vision: To revolutionize productivity and human potential by unlocking the untapped power of the subconscious mind.

Initial Target Segments (to validate or expand upon):

High-pressure creative professionals (designers, writers, artists) seeking breakthrough ideas.

Entrepreneurs/Innovators looking for extreme competitive advantage and novel solutions.

Lifelong learners/Researchers aiming for accelerated knowledge acquisition.

Current State/Problem Statement: DreamWeaver faces the challenge of marketing a genuinely novel, abstract, and somewhat "sci-fi" concept to a broad audience, overcoming skepticism, and establishing trust and perceived value for an experience that occurs while unconscious.

TASK OVERVIEW
Analyze the current market landscape and DreamWeaver's unique proposition to develop a robust marketing expansion strategy. Your output should address market entry, audience engagement, messaging, and measurable success metrics.

STEP-BY-STEP INSTRUCTIONS
Phase 1: Market Understanding & Positioning

1.1 Target Audience Deep Dive: Refine or identify primary and secondary target audiences for global expansion, detailing their pain points that DreamWeaver solves, their motivations, and where they consume information.

1.2 Competitive Analysis (Indirect): Analyze how productivity tools, wellness apps, and "brain training" solutions currently market to similar demographics. Identify their strengths, weaknesses, and potential gaps DreamWeaver can exploit.

1.3 Unique Value Proposition (UVP) Refinement: Articulate a crystal-clear, compelling, and concise UVP for DreamWeaver that resonates with the identified target audiences, focusing on tangible benefits rather than just the technology.

1.4 Brand Positioning: Define DreamWeaver's desired brand image and positioning within the broader tech and wellness markets (e.g., "pioneering innovation," "elite productivity tool," "mind expansion").

Phase 2: Go-to-Market Strategy & Channel Selection

2.1 Initial Market Entry Plan: Propose a phased approach for market entry (e.g., specific regions/countries first, or online-only launch, then retail partnerships). Justify the chosen approach.

2.2 Marketing Mix (Digital & Traditional): Recommend specific marketing channels and tactics for each target audience. Consider:

Content Marketing (e.g., thought leadership, educational content, case studies)

Digital Advertising (e.g., targeted social media, search engine marketing)

PR & Influencer Marketing (e.g., tech reviewers, futurists, productivity gurus)

Partnerships (e.g., research institutions, corporate wellness programs)

Experiential Marketing (e.g., exclusive demos, virtual reality simulations)

2.3 Overcoming Skepticism: Detail specific strategies to build credibility and trust, address common misconceptions, and demonstrate the technology's scientific basis and practical results.

2.4 Messaging Strategy: Develop core message pillars and compelling taglines that effectively communicate the product's benefits and address potential user concerns.

Phase 3: Measurement, Budget & Future Considerations

3.1 Key Performance Indicators (KPIs): Define clear, measurable KPIs for each phase of the marketing expansion (e.g., brand awareness, lead generation, conversion rates, customer lifetime value).

3.2 Budget Allocation (High-Level): Provide a high-level suggestion for how marketing budget might be allocated across the recommended channels (e.g., percentages).

3.3 Risk Assessment & Mitigation: Identify potential marketing-related risks (e.g., negative public perception, ethical concerns, competitive response) and propose mitigation strategies.

3.4 Long-Term Vision: Briefly outline how the marketing strategy might evolve over 3-5 years as the product gains traction and the market matures.

CONSTRAINTS & REQUIREMENTS
Tone: Visionary, confident, data-driven, and slightly audacious, yet grounded in practical execution.

Length: Comprehensive, but concise per section. Aim for a detailed outline with bullet points and brief explanatory paragraphs for each sub-step.

Format: Markdown with clear headings for each phase and sub-steps. Use bullet points for lists.

Exclusions: Do not include granular financial projections beyond high-level budget allocation. Avoid overly technical jargon about the brainwave technology itself; focus on its market implications.

Inclusions: Emphasize innovative and unconventional marketing approaches suitable for a disruptive technology. Include specific examples of how to build credibility for an abstract concept.

SUCCESS CRITERIA
The strategy provides a clear, actionable roadmap for marketing expansion.

It effectively addresses the challenge of marketing an abstract, novel technology.

The target audience and UVP are well-defined and compelling.

The recommended channels and tactics are innovative and appropriate for the product and market.

Credibility-building and skepticism-addressing strategies are robust.

KPIs are measurable and aligned with strategic goals.

The output adheres strictly to all "CONSTRAINTS & REQUIREMENTS."
```

#### ⚙️ Example output:

#### ROLE

As an innovative **marketing strategist** specializing in emerging technology markets and consumer psychology, my main goal is to provide a **cutting-edge marketing expansion strategy and a realistic go-to-market plan** for DreamWeaver, focusing on overcoming its inherent skepticism and clearly articulating its transformative but intangible benefits.

#### CONTEXT & BACKGROUND

DreamWeaver Inc. is preparing to launch a revolutionary technology that lets people do conscious, productive work while asleep. This strategy lays out the path to a global market launch, aiming for significant growth in users and revenue over the next three years. The internal leadership team needs a persuasive, data-driven, and forward-looking plan to guide investment and resource allocation.

**Product:** DreamWeaver is a non-invasive wearable device that syncs with brainwaves during REM sleep, creating a stable, customized "dream workspace." Users can take on cognitive tasks such as brainstorming, problem-solving, learning, and creative design in a distraction-free environment, then recall key insights after waking up. Early beta tests show a noticeable increase in creativity and in efficiency on specific tasks.

**Current status:** DreamWeaver has successfully completed closed beta testing with a group of tech professionals and has secured initial seed funding. The core technology is stable and patented.

**Market:** There are no direct competitors. Indirect competitors include productivity software (e.g., Notion, Asana), meditation apps (e.g., Calm, Headspace), and advanced sleep aids. The concept of "dream work" is new and is currently associated with speculative or niche interests, which is a serious obstacle to broad adoption.

**Company vision:** to revolutionize productivity and human potential by unlocking the untapped power of the subconscious mind.

**Initial target segments:**

1.  **High-pressure creative professionals:** designers, writers, artists, and innovators looking for breakthrough ideas and ways past creative blocks.
2.  **Entrepreneurs and visionaries:** people seeking an extreme competitive edge, new business strategies, and accelerated problem-solving.
3.  **Lifelong learners and researchers:** those who want accelerated knowledge acquisition, synthesis of complex data, and improved cognitive performance.

**Current state/problem statement:** DreamWeaver faces the unique challenge of marketing a truly novel, abstract, and seemingly "sci-fi" concept. The main problem is overcoming widespread skepticism and establishing trust and perceived value for an experience that happens in an unconscious state, which makes it hard to provide tangible proof in traditional ways.

#### TASK OVERVIEW

Analyze the current market landscape and DreamWeaver's unique proposition to develop a robust marketing expansion strategy. This strategy will cover market entry, audience engagement, messaging, and measurable success metrics.

#### PHASE 1: MARKET UNDERSTANDING & POSITIONING

#### 1.1 Target audience deep dive

-   **Primary audience: "Elite Innovators"**
    -   **Demographics:** early adopters, high-income professionals (ages 30-55), tech-savvy, often self-employed or in leadership roles.
    -   **Pain points:** creative blocks, information overload, no time for focused work, burnout from traditional ways of working, a desire for a unique edge.
    -   **Motivations:** peak productivity, unlocking hidden potential, reaching a "flow state," intellectual curiosity, a drive for breakthrough innovation.
    -   **Information sources:** tech reviews (Wired, TechCrunch), industry thought leaders (podcasts, LinkedIn), exclusive online communities, scientific journals (for validation).
-   **Secondary audience: "Ambitious Professional"**
    -   **Demographics:** mid-career professionals (ages 25-45) seeking career growth, personal development, and a better work-life balance.
    -   **Pain points:** lack of time, difficulty learning new skills, stress, feeling overwhelmed by daily tasks.
    -   **Motivations:** efficiency, skill acquisition, personal growth, stress reduction, a desire for "smart" productivity tools.
    -   **Information sources:** productivity blogs, self-help books, tech news, professional development webinars.

#### 1.2 Competitive analysis (indirect)

-   **Productivity software (e.g., Notion, Asana):** focus on task management, collaboration, and conscious organization. DreamWeaver differs by offering *pre-conscious* idea generation and problem-solving, improving the *quality* of the input going into these systems.
-   **Meditation/sleep apps (e.g., Calm, Headspace):** focus on relaxation, mindfulness, and better sleep quality. DreamWeaver differs by using sleep for *active, directed productivity* rather than passive rest, offering functional benefits beyond well-being.
-   **"Brain training" solutions (e.g., Lumosity):** focus on improving cognitive function through conscious exercises. DreamWeaver offers a new, effortless (during sleep) path to cognitive improvement, appealing to those looking for less labor-intensive ways to improve themselves.

#### 1.3 Unique value proposition (UVP) refinement

**"DreamWeaver: unlock the untapped potential of your mind. Turn sleep into your most productive workspace."**

-   **For Elite Innovators:** "Reach breakthrough ideas and accelerate innovation by tapping your subconscious during sleep, gaining an unprecedented creative advantage."
-   **For Ambitious Professionals:** "Optimize your time and cognitive performance effortlessly. Learn faster, solve problems smarter, and boost your productivity while you sleep."

#### 1.4 Brand positioning

DreamWeaver will be positioned as a **pioneer in subconscious productivity and cognitive enhancement**. We are not just a sleep aid or a productivity app; we are **the future of work and personal development**, offering a legitimate, science-based path to unlocking extraordinary mental capabilities. Our brand will radiate **innovation, scientific credibility, and a drive for high achievement.**

#### PHASE 2: GO-TO-MARKET STRATEGY & CHANNEL SELECTION

#### 2.1 Initial market entry plan

A **phased global launch** is recommended, starting with **Tier 1 markets** (North America, Western Europe, and selected Asian tech hubs such as Singapore/Japan), known for high tech adoption, disposable income, and a strong culture of productivity and self-improvement.

-   **Phase 1 (months 1-6): focus on early adopters and influencers (North America/Western Europe)**
    -   Target tech and innovation communities, using success stories from the early beta.
    -   Focus on **thought leadership** and **PR**.
-   **Phase 2 (months 7-18): market expansion among professionals and creatives**
    -   Scale the successful strategies from Phase 1.
    -   Enter new Tier 1 cities and begin limited expansion into other regions with high digital literacy.
    -   Introduce **corporate wellness partnerships**.
-   **Phase 3 (months 19-36): mass market awareness and global scale**
    -   Use the accumulated data and feedback to broaden the appeal.
    -   Explore partnerships with retail chains and broader mass-market advertising.

#### 2.2 Marketing mix (digital and traditional)

-   **Content marketing:**
    -   **Thought leadership:** publish articles/white papers on topics such as "the science of dream work," "the neuroscience of creativity," and "the future of productivity" on platforms like Medium, LinkedIn, and in academic journals.
    -   **Case studies:** detailed reports from beta testers showing specific breakthroughs achieved with DreamWeaver (e.g., "How a designer solved a complex problem in her sleep").
    -   **Educational content:** simple, engaging videos and infographics explaining the technology and its benefits in accessible language.
-   **Digital advertising:**
    -   **Targeted social media (LinkedIn, X, Instagram):** use interest-based targeting (e.g., "productivity hacks," "innovation," "neuroscience," "creative industries").
    -   **Search engine marketing (SEM):** bid on high-intent keywords related to productivity, creativity, and cognitive enhancement, as well as educational queries about sleep and brain function.
    -   **Podcast sponsorships:** partner with popular podcasts in the tech, business, and self-improvement niches.
-   **PR and influencer marketing:**
    -   **Tier 1 tech and science journalists:** secure coverage in outlets such as Wired, Fast Company, MIT Technology Review, and science news outlets.
    -   **Futurists and productivity gurus:** partner with well-known figures in the future of work and personal development for authentic endorsements and demonstrations.
    -   **Micro-influencers:** engage niche creative professionals and entrepreneurs who genuinely integrate DreamWeaver into their daily lives.
-   **Partnerships:**
    -   **Research institutions:** collaborate on studies to further validate DreamWeaver's effectiveness and strengthen scientific credibility.
    -   **Corporate wellness programs:** pilot programs with innovative companies looking to boost their employees' creativity and problem-solving ability.
    -   **Executive coaching firms:** offer DreamWeaver as a premium tool for their high-level clients.
-   **Experiential marketing:**
    -   **Exclusive demos:** hold invitation-only events at tech conferences or innovation hubs, letting potential users experience a "dream workspace" simulation and try the device.
    -   **Virtual reality simulations:** develop VR experiences that visually represent the "dream workspace" and its cognitive benefits, making the abstract tangible.

#### 2.3 Overcoming skepticism

-   **Scientific validation:** highlight academic partnerships, research results, and endorsements from neuroscientists. Use clear, understandable explanations of the underlying science.
-   **Testimonials and case studies:** showcase compelling, quantifiable success stories from a variety of beta users. Emphasize before-and-after scenarios.
-   **Transparency:** speak openly about the technology's limitations and its ongoing development. Address common "sci-fi" clichés head-on with factual information.
-   **"Try before you buy" (simulation):** although a direct trial of the "sleep experience" is not possible, offer engaging interactive online simulations or VR experiences that convey the *feeling* and *results* of working in your sleep.
-   **Expert endorsements:** secure recommendations from respected figures in productivity, neuroscience, and innovation.

#### 2.4 Messaging strategy

-   **Core message pillars:**
    -   **Unlock hidden potential:** focus on unlocking latent cognitive abilities during sleep.
    -   **Effortless breakthroughs:** emphasize achieving significant results without conscious effort or traditional "grind."
    -   **The future of productivity:** position DreamWeaver as a revolutionary tool that redefines how we work and learn.
    -   **Science-backed:** stress the rigorous research and development behind the technology.
-   **Taglines:**
    -   "Dream. Work. Achieve."
    -   "Your subconscious, supercharged."
    -   "The future of productivity is asleep."
    -   "Unlock tomorrow's ideas tonight."

#### PHASE 3: MEASUREMENT, BUDGET & FUTURE CONSIDERATIONS

#### 3.1 Key performance indicators (KPIs)

-   **Brand awareness:**
    -   Media mentions (earned media value)
    -   Social media reach and engagement
    -   Website traffic (unique visitors, time on site)
    -   Brand sentiment analysis
-   **Lead generation:**
    -   Early access/waitlist sign-ups on the website
    -   Content downloads (white papers, case studies)
    -   Webinar registrations
-   **Conversion rates:**
    -   Trial-to-paid conversion (if a trial is introduced later)
    -   Direct sales conversion (online store)
    -   Partnership conversion rates
-   **Customer engagement and retention:**
    -   Frequency and duration of app use (after purchase)
    -   Customer satisfaction (NPS scores)
    -   Referral rate
-   **Revenue growth:**
    -   Monthly recurring revenue (MRR) / annual recurring revenue (ARR)
    -   Customer lifetime value (CLTV)

#### 3.2 Budget allocation (high-level)

-   **Phase 1 (early adopters/influencers):**
    -   **PR and influencer marketing:** 40% (critical for initial buzz and credibility)
    -   **Content marketing (thought leadership/case studies):** 30%
    -   **Digital advertising (targeted):** 20%
    -   **Experiential marketing (demos/virtual reality):** 10%
-   **Phase 2 (broader expansion):**
    -   **Digital advertising (scalable):** 35%
    -   **Content marketing (educational/SEO):** 25%
    -   **Partnerships (corporate/research):** 20%
    -   **PR and influencer marketing:** 10%
    -   **Experiential marketing:** 10%
-   **Phase 3 (mass market):**
    -   **Digital advertising (broad):** 40%
    -   **Major PR/brand campaigns:** 25%
    -   **Retail/channel marketing:** 20%
    -   **Content/community building:** 15%

#### 3.3 Risk assessment and mitigation

-   **Risk: public skepticism/misconceptions**
    -   **Mitigation:** proactive, transparent communication about the scientific basis; ongoing education through content; compelling, credible testimonials; addressing concerns directly in an FAQ section and on public forums.
-   **Risk: ethical concerns (e.g., "mind control," privacy):**
    -   **Mitigation:** clear communication about the device's non-invasiveness and user control; a robust data privacy policy; collaboration with ethics committees/thought leaders; emphasis on user autonomy.
-   **Risk: lack of tangible evidence/difficulty demonstrating value:**
    -   **Mitigation:** emphasis on quantifiable *results* (e.g., "problem X solved," "skill Y learned faster"); use of compelling user stories; development of interactive simulations that convey the experience.
-   **Risk: regulatory barriers (e.g., medical device classification):**
    -   **Mitigation:** proactive engagement with regulators; clearly positioning DreamWeaver as a "productivity/wellness tool" rather than a medical device, while complying with all relevant safety standards.

#### 3.4 Long-term vision

Over 3-5 years, DreamWeaver's marketing will evolve from **establishing legitimacy** to **building a global community of "DreamWorkers."** This will include:

-   **Ecosystem development:** creating a platform for sharing dream-work experiences and collaboration among users.
-   **Feature expansion:** promoting new capabilities (e.g., shared dream-work workspaces, dedicated skill-learning modules).
-   **Thought leadership dominance:** becoming the authoritative voice on subconscious productivity and the future of human potential.
-   **Mainstream integration:** positioning DreamWeaver as an essential tool for personal and professional development, as common as a smartphone or laptop.

#### CONSTRAINTS & REQUIREMENTS

This strategy keeps a visionary, confident, data-driven, and bold tone while staying realistic in practice. It contains a detailed outline with bullet points and brief explanatory paragraphs for each sub-step, avoiding overly detailed financial projections and focusing on market implications rather than deep technical jargon.

#### SUCCESS CRITERIA

The analysis provides a clear, realistic roadmap for marketing expansion, effectively addressing the challenge of promoting an abstract, novel technology. The target audience and UVP are clearly defined and compelling. The recommended channels and tactics are innovative and suited to the product and market. The strategies for building trust and overcoming skepticism are robust. The KPIs are measurable and aligned with strategic goals, ensuring the plan is ready for execution and evaluation.

* * *

* * *

## 70+ Google Gemini Prompts for Life and Business

* * *

## Guide to Using ChatGPT Images & Nano Banana

Hi! We've put together a full walkthrough of the Chat GPT Images and Gemini Nano Banana interface as part of one of our dozens of express courses. Here, through text and comic-style video content, you'll learn this neural network from A to Z and get a ton of ready-made prompts and step-by-step guides!

> 👇🏻 Just click the arrow ▶ to expand each section and see more details!

### 🔍 Guide Overview

If you aren't familiar with ChatGPT and Gemini and all their capabilities, check out my "Prompt Engineering Guide (the 'Interstellar' mission)". There I talk about prompting, reveal the capabilities of services such as Chat GPT, Claude, Perplexity, Gemini and Grok, and break down their features and hidden capabilities. After studying that material you'll fully understand how neural networks work.

This guide is devoted to **one specific use** of ChatGPT and Gemini — **image generation.**

In March 2025, ChatGPT made headlines again thanks to its improved image generation capabilities. Almost overnight, social media was flooded with AI-made visuals that made people do a double take. The biggest splash came from versions inspired by Studio Ghibli — ordinary photos were magically turned into frames that looked like they were taken straight from a Ghibli film. Naturally, they spread fast, and everyone started talking about what AI can do for creativity.

Soon after, a new wave followed: starter pack images. People began experimenting with funny collages based on stereotypes, which became an internet meme hit.

The difference was that now anyone could create polished, meme-worthy content in a matter of minutes instead of spending hours editing.

![](/guides/assets/gemini-ru/img087.png)

Making Ghibli-style photos is cute and fun, but it's only a narrow application of the true capabilities of the upgraded image generation model!

The same technology that powers viral memes can also give businesses powerful tools for advertising, branding and graphic design.

Imagine being able to instantly prototype ad campaigns, generate brand-scale visual materials, or test different creative directions without spending a design budget.

That's where it gets interesting — and that's exactly what this guide will help you with. I'll start with Chat GPT Images and smoothly move on to the capabilities of Nano Banana, turning up the heat. I strongly recommend reading this guide to the end, because it reveals things nobody else writes about.

* * *

#### What's Behind the Scenes

Let's clear up one thing first: although we use ChatGPT to generate images, the work is actually done by a technology called DALL-E. You can think of it as an "assistant artist" built into ChatGPT.

When you enter a request to create an image, ChatGPT doesn't actually draw the picture itself — instead it passes your request to DALL-E, which is trained to turn text into visual images.

DALL-E breaks your words down into concepts it understands, then blends those concepts to generate a picture that matches your description.

For a more detailed look at the history of DALL-E, check out the links below:

🔗 [Evolution of DALL·E with Demonstrations of its Current Text to Image Abilities](http://e-discoveryteam.com/2024/08/19/evolution-of-dall·e-with-demonstrations-of-its-current-text-to-image-abilities/) — Ralph Losey showcases the capabilities of DALL-E, OpenAI’s generative image model. His article inciudes a demonstration by creating optical illusions and paintings. DALL-E’s evolution, … http://e-discoveryteam.com/2024/08/19/evolution-of-dall%C2%B7e-with-demon

🔗 [DALL-E](https://en.wikipedia.org/wiki/DALL-E) — DALL-E, DALL-E 2, and DALL-E 3 are text-to-image models developed by OpenAI using deep learning methodologies to generate digital images from natural language descriptions known as prompts.

* * *

### 🎨 Visual Prompting Basics: An Express Course

#### Quick Start: Your First Great Image in 3 Minutes

Before diving into the details of creating images, let's briefly look at how it's done in ChatGPT.

Example prompt:

```
A cozy reading nook with a large window, warm sunlight streaming in, a cat sleeping on a pile of books, painted in the style of Studio Ghibli --ar 16:9
```

Process and results:

Now take the following prompt and paste it into ChatGPT to see the results for yourself.

```
A futuristic coffee shop with neon lights, cozy seating, and rain falling outside the window, digital painting style --ar 16:9
```

Now that you've seen how image generation works in ChatGPT, it's time to dig into the fundamentals of creating images.

What you learn in the express course below can be applied to other AI image generation models too, so it's best to start with the basics.

* * *

* * *

### 🧑‍💻 JSON Prompting Basics for Images

There's a simple method that will significantly boost the effectiveness of your prompts and make them clearer for the AI. It's almost like having a prompting superpower. It's called JavaScript Object Notation, or JSON for short.

**JSON** is a simple way of storing and exchanging data that both humans and computers can understand.

You can think of it as a neatly organized shopping list written in a very specific format — it has **labels** (keys) and **values** (the actual information) and is always organized so that computers can read it easily.

For example:

```
{
"name": "Alex",
"age": 25,
"isStudent": true
}
```

In the example above we can see:

-   `"name"` is the label and `"Alex"` is the value.
-   `"age"` is the label and `25` is the value.
-   `"isStudent"` is the label and `true` means "yes".

It's used almost everywhere — on websites, in apps and APIs — to send and receive information in a clean, predictable format.

If natural language is like talking to a director, JSON is like handing them a detailed architectural blueprint. In image and video prompts this structure is effective because it organizes every element of your request into clear, labeled sections that the AI can interpret without guessing.

The reusability of JSON makes it a powerful tool for generating images and video, because it lets you save perfectly structured prompts that you can use again and again without losing clarity or detail.

Once you've defined elements such as style, subject, settings and camera movement, you can quickly adjust only what's needed and leave the rest unchanged, which guarantees consistent results across repeated use. This speeds up the creative process and makes it easier to maintain continuity in multi-scene projects, giving you precise control over the final result every time.

* * *

#### Key Labels for Business and Advertising JSON Image Prompts

1.  **subject**

    Defines the main product, person or object that stands out.

    Example: `"subject": "modern silver laptop"`

2.  **action\_or\_pose**

    Describes what the subject is doing or how it is positioned.

    Example: `"action_or_pose": "open on a desk, screen tilted toward the viewer"`

3.  **setting\_or\_environment**

    Describes the context: studio, outdoors, office, retail space, etc.

    Example: `"setting_or_environment": "elegant minimalist office with natural light"`

4.  **style**

    Defines the artistic or design approach (photography style, CGI, vector, flat composition, etc.).

    Example: `"style": "high-quality commercial studio shoot"`

5.  **composition**

    Defines the rules of framing, layout or positioning.

    Example: `"composition": "centered product with negative space on the right for text"`

6.  **lighting**

    Describes the mood and type of lighting.

    Example: `"lighting": "soft golden studio lighting"`

7.  **camera\_angle**

    Specifies the point of view and perspective (eye level, low angle, top-down, etc.).

    Example: `"camera_angle": "low angle looking up, flat layout"`

8.  **color\_palette**

    Sets brand alignment and visual mood.

    Example: `"color_palette": "black, gold and white"`

9.  **branding\_or\_placeholder**

    Specifies where logos, taglines or text space should be placed.

    Example: `"branding_or_placeholder": "space for a logo in the top left corner"`

10.  **aspect\_ratio**

     Ensures ready-to-use materials (social media, posters, banners).

     Example: `"aspect_ratio": "3:2"`

**11\.** **additional\_elements**

Extra supporting props or accents.

Example: `"additional_elements": "scattered coffee beans around the cup"`

**12\.** **negative\_cues**

What should be explicitly avoided (common in advertising work).

Example: `"negative_cues": "no text, no clutter, no extra people"`

I avoid using words like **"brand"** or **"product"** in JSON prompts, because these terms can sometimes trigger ChatGPT's advertising safety filters. Explicit references to branded or commercial products increase the chance that prompts will be flagged or blocked as potential advertising policy violations.

By keeping labels neutral — for example, using **"subject"** instead of *"product"* or **"text\_space"** / **"design\_placeholder"** instead of *"brand"* — we keep the same level of creative control while reducing the risk of unnecessary restrictions.

* * *

**Example of a JSON prompt and its result:**

```
{
"subject": "gold soda can with the label 'Prompt Juice'",
"action_or_pose": "standing upright on a clean reflective surface",
"setting_or_environment": "minimalist studio backdrop in soft gradient white",
"style": "commercial studio photography look",
"composition": "centered subject with negative space around edges",
"lighting": "soft even lighting with subtle highlight reflections",
"camera_angle": "eye-level straight-on view",
"color_palette": "gold, white, silver",
"text_space": "blank area at top for optional overlay",
"aspect_ratio": "3:2",
"negative_cues": "no logos, no clutter, no people"
}
```

#### Filling In Variables and Slots

You don't have to rack your brain every time you come up with a JSON prompt. Here's a method where all you need to do is add tokens that give quick hints about what might go under each label. Instead of starting from scratch, you'll have a template that shows you the options up front, which makes it easier to fill in the details and reuse prompts for any project.

Here's a template version of the JSON prompt we used above:

```
{
"subject": "{main focus, e.g. person, product, item}",
"action_or_pose": "{what the subject is doing or how it’s positioned}",
"setting_or_environment": "{studio, outdoor, office, lifestyle context}",
"style": "{photography style, CGI, illustration, etc.}",
"composition": "{framing, centered, flat lay, rule of thirds}",
"lighting": "{studio lighting, natural daylight, dramatic shadows}",
"camera_angle": "{eye-level, top-down, low-angle, close-up}",
"color_palette": "{brand colors, mood colors, complementary scheme}",
"text_space": "{where text or overlays could fit in the layout}",
"aspect_ratio": "{3:2, 1:1, 16:9, etc.}",
"additional_elements": "{props, accents, supporting details}",
"negative_cues": "{things to avoid: clutter, extra people, text}"
}
```

If you don't want to include a label in your JSON prompt yet, you can set its value to `null`. This tells the model that the label exists but doesn't carry any instructions right now, so it won't affect the image. It's a handy way to keep the structure unchanged while leaving some details open to fill in later.

#### Let ChatGPT Fill In the Template

Another interesting trick is to feed the JSON template back to ChatGPT and let it fill it in for you. Instead of deciding every detail yourself, you can explain what kind of product ad concept you want to implement, and the model will generate values for each label.

It's an easy way to generate ideas, discover styles you may not have thought of, and get a fully structured prompt ready to use in seconds.

That's exactly why it's so useful to have tokens with short explanations — they steer the model toward the right answers.

**Filled-in prompt:**

```
{
"subject": "an elegant flower bouquet with a mix of roses, lilies, and greenery",
"action_or_pose": "standing upright in a clear glass vase on a polished surface",
"setting_or_environment": "minimalist studio backdrop with soft gradient tones",
"style": "high-end commercial studio photography",
"composition": "centered subject with balanced negative space around edges",
"lighting": "soft diffused studio lighting with gentle highlight reflections",
"camera_angle": "eye-level close-up view",
"color_palette": "soft pinks, whites, greens, and gold accents",
"text_space": "clean blank area above and to the right for overlay",
"aspect_ratio": "3:2",
"additional_elements": "subtle reflective surface beneath vase, faint shadow for depth",
"negative_cues": "no clutter, no visible hands, no logos, no extra objects"
}
```

* * *

JSON Prompts

JSON prompts are great for structuring information, but they aren't magic. Sometimes the model may ignore your labels or mix them up, and overly complex JSON can confuse more than it helps. Critics also note that JSON formatting isn't required to get good images — it's just one way of organizing things, not a guarantee of perfect results.

Fortunately, if you've gone through the express course, you also know good ways to prompt using NLP (natural language processing); JSON is just an alternative tool in your prompt-building arsenal.

If I had to compare the JSON format to something, I'd give this example. Imagine cutlery scattered across a table:

That's what your natural-language request looks like to a neural network. And this is what a request in JSON format looks like:

The simplest explanation: thanks to the JSON format, the neural network simply understands where everything "lies," and the chances of getting what you need multiply thanks to the right structure.

JSON may seem complicated at first glance, but it's really just a way of organizing your requests. Think of it as a convenient format that makes them easier to read, reuse and scale. Read on to learn about ready-made templates designed for fast, effective image creation for your business.

* * *

### 🖼️ JSON Template Library for Product Ads

The JSON prompts you'll see below **are templates, not finished ads**. They don't include real product photos, official fonts or brand colors.

When creating your own version, **be sure to:**

-   Insert images of your real products (avoid placeholders or generic AI renders)
-   Use official fonts and typography
-   Follow your brand's color palette for consistency

Think of these templates as a basic framework — you'll add the details that make them truly yours.

#### Hero and Product Focus

Templates that make a single product stand out vividly.

**Hero Product with Slogan and Call to Action**

 Show prompt

```
{
"subject": "soda bottle shaped like a glowing magic potion",
"action_or_pose": "standing upright on a reflective surface with condensation droplets",
"setting_or_environment": "fantasy-inspired environment with sparkling magical energy in the background",
"style": "high-end commercial fantasy photography",
"composition": "centered hero subject with dramatic emphasis on the bottle",
"lighting": "radiant glowing highlights with sparkling rim light",
"camera_angle": "slight low-angle to give the bottle a powerful heroic presence",
"color_palette": "vibrant purples, blues, and shimmering gold accents",
"text_space": "top-right corner with tagline 'Every sip is magical'",
"cta_space": "bottom center reserved for call-to-action text overlay",
"aspect_ratio": "3:2",
"additional_elements": "glittery magical explosions and spark trails surrounding the bottle",
"negative_cues": "no clutter, no other products, no people"
}
```

Template:

```
{
"subject": "{main product as the hero focus}",
"action_or_pose": "{product placement, e.g. standing upright, angled toward viewer}",
"setting_or_environment": "{clean studio setup, lifestyle backdrop, or minimalist gradient}",
"style": "{high-end studio photography or CGI render}",
"composition": "{centered hero subject with clear visual hierarchy}",
"lighting": "{bright studio lighting with highlight reflections}",
"camera_angle": "{eye-level or slight low-angle for emphasis}",
"color_palette": "{brand-aligned palette or bold contrasting colors}",
"text_space": "{reserved area for tagline placement}",
"cta_space": "{reserved area for a call-to-action element}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on platform}",
"additional_elements": "{supporting accents such as reflections, props, or surface details}",
"negative_cues": "{no clutter, no extra objects, no unrelated text}"
}
```

**Premium Single-Product Focus**

 Show prompt

```
{
"subject": "golden kitchen knife with a sleek polished blade",
"action_or_pose": "placed elegantly on a luxury dining table, angled slightly to showcase the blade",
"setting_or_environment": "opulent dining setup with fine dishes and gourmet food blurred softly in the background",
"style": "premium high-end product photography",
"composition": "knife centered as the hero focus, food and tableware used only as subtle accents",
"lighting": "warm studio lighting with golden highlights and soft shadows to emphasize metallic sheen",
"camera_angle": "slight low-angle close-up for a dramatic and refined look",
"color_palette": "rich gold, deep mahogany, and soft cream tones",
"text_space": "bottom-right corner reserved for tagline overlay",
"aspect_ratio": "Landscape",
"additional_elements": "crystal glassware and fine porcelain plates slightly out of focus to suggest luxury",
"negative_cues": "no people, no distracting logos, no cluttered food presentation"
}
```

Template:

```
{
"subject": "{luxury product as the single focus}",
"action_or_pose": "{presented elegantly, e.g. standing upright, placed on pedestal, angled for emphasis}",
"setting_or_environment": "{minimalist or high-end studio, dramatic surface, luxury-inspired background}",
"style": "{premium photography or CGI with polished finish}",
"composition": "{hero-centered product with strong negative space to draw attention}",
"lighting": "{controlled studio lighting with dramatic highlights and soft shadows}",
"camera_angle": "{eye-level or slight low-angle for authority and sophistication}",
"color_palette": "{rich tones such as black, gold, silver, or brand-aligned palette}",
"text_space": "{reserved subtle area for brand tagline or identifier}",
"aspect_ratio": "{3:2 or 1:1 depending on campaign format}",
"additional_elements": "{optional elegant props like marble surface, subtle reflections, metallic accents}",
"negative_cues": "{no clutter, no extra products, no people, no distracting text}"
}
```

**Minimalist Product with Negative Space**

 Show prompt

```
{
"subject": "sleek high-end wireless over-ear headphones, matte charcoal finish with brushed aluminum accents and soft leather ear pads",
"action_or_pose": "floating at a subtle 45-degree angle to showcase both the headband and the ear cup depth, positioned on the right side of the frame",
"setting_or_environment": "clean studio background with a very soft radial gradient from light grey to neutral white",
"style": "premium minimalist commercial photography, high-end tech aesthetic, Apple-style clean render",
"composition": "asymmetrical rule of thirds, subject occupies the right third of the image, massive negative space on the left for advertising copy",
"lighting": "soft cinematic studio lighting, elegant rim light to define the silhouette, subtle soft-box reflections on metallic parts",
"camera_angle": "eye-level, slightly tilted to create a sense of dynamic motion and modern design",
"color_palette": "monochromatic grayscale, deep blacks, slate grays, and crisp white highlights",
"text_space": "wide open area on the left 60% of the frame, completely free of any objects or busy textures",
"aspect_ratio": "16:9 (optimized for web banners and wide displays)",
"additional_elements": "a very faint, soft drop shadow beneath the headphones to ground them in space without a visible surface",
"negative_cues": "no clutter, no background objects, no people, no distracting textures, no cables, no logos"
}
```

Template:

```
{
"subject": "{single product shown simply and clearly}",
"action_or_pose": "{neutral placement, e.g. centered, slightly angled, or upright}",
"setting_or_environment": "{plain studio background, solid color, or subtle gradient}",
"style": "{minimalist commercial photography or clean CGI render}",
"composition": "{ample negative space around the subject for balance and text placement}",
"lighting": "{soft even lighting with subtle highlights, no harsh shadows}",
"camera_angle": "{eye-level, top-down, or straight-on for clarity}",
"color_palette": "{neutral or brand-aligned colors, often monochrome or duotone}",
"text_space": "{large open area reserved for tagline or ad copy}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on intended platform}",
"additional_elements": "{optional simple props like a shadow, pedestal, or single accent}",
"negative_cues": "{no clutter, no background objects, no people, no distracting textures}"
}
```

**Lifestyle Context Shot**

 **Show prompt**

```
{
"subject": "modern woven picnic basket with sleek leather straps",
"action_or_pose": "placed directly on the ground, occupying majority of the frame as the hero subject",
"setting_or_environment": "sunny outdoor park with green grass, trees, and clear sky in the distance",
"style": "bright lifestyle commercial photography",
"composition": "basket aligned with the rule of thirds, dominant in the frame with blurred people picnicking in the background",
"lighting": "natural golden daylight with soft tree-filtered shadows",
"camera_angle": "ground-level shot at the same height as the basket",
"color_palette": "warm earth tones with greens, beige, and soft sky blue",
"text_space": "open sky area left clean for tagline overlay",
"aspect_ratio": "3:2",
"additional_elements": "picnic blanket partially visible, plates and glasses as soft accents",
"negative_cues": "no distracting logos, no cluttered foreground, no sharp focus on background people"
}
```

Template:

```
{
"subject": "{main product shown as the hero focus within a lifestyle setting}",
"action_or_pose": "{how the product is being used or displayed in context}",
"setting_or_environment": "{realistic environment such as home, office, café, outdoors, or aspirational space}",
"style": "{lifestyle commercial photography or cinematic visual look}",
"composition": "{product highlighted clearly, lifestyle background blurred or secondary to keep focus on hero subject}",
"lighting": "{natural daylight, warm indoor tones, or cinematic lighting to match lifestyle mood}",
"camera_angle": "{eye-level for relatability, or slight angle for cinematic emphasis}",
"color_palette": "{tones that reflect the lifestyle setting, aligned with brand or campaign mood}",
"text_space": "{reserved area in background or foreground for tagline or overlay}",
"aspect_ratio": "{3:2 or 16:9 for banners and widescreen ads}",
"additional_elements": "{supporting lifestyle props such as furniture, food, or accessories that suggest context}",
"negative_cues": "{avoid cluttered backgrounds, no unrelated products, no distracting logos}"
}
```

**Dramatic Hero with Reflection/Surface**

 Show prompt

```
{
"subject": "An elegant gold necklace with a polished pendant in the shape of the Gucci logo.",
"action_or_pose": "the necklace pendant resting upright at a slight tilt on a glossy reflective black surface",
"setting_or_environment": "minimalist luxury studio backdrop fading into deep black",
"style": "cinematic high-end product photography",
"composition": "pendant centered as the hero subject with its reflection clearly visible on the glossy surface",
"lighting": "dramatic spotlight from above with golden highlights and subtle rim light to accentuate the 'G' shape",
"camera_angle": "low-angle close-up for a commanding and heroic emphasis",
"color_palette": "deep blacks, rich gold, and subtle silver reflections",
"reflection_surface": "polished obsidian-like reflective floor",
"text_space": "upper left corner reserved for tagline overlay",
"aspect_ratio": "3:2",
"additional_elements": "soft ambient glow around the pendant with faint spark particles for drama",
"negative_cues": "no clutter, no other jewelry, no people, no logos besides the Gucci logo"
}
```

Template:

```
{
"subject": "{main hero object, character, or product as the centerpiece}",
"action_or_pose": "{how the subject is positioned or posed relative to the reflective surface}",
"setting_or_environment": "{studio, cinematic landscape, urban nightscape, fantasy realm, etc.}",
"style": "{cinematic photography, commercial ad style, stylized illustration, CGI, etc.}",
"composition": "hero subject centered or slightly off-center with clear mirrored reflection on glossy/reflective surface",
"lighting": "dramatic high-contrast lighting with rim lights or glowing accents to emphasize form",
"camera_angle": "{low-angle, straight-on, or close-up shot for emphasis}",
"color_palette": "{bold contrasting colors such as deep blacks, silvers, neons, or golds}",
"reflection_surface": "{polished floor, glassy water, mirrored metal, etc.}",
"text_space": "{open area above or to the side for tagline overlay}",
"aspect_ratio": "{3:2, 16:9, or 1:1 depending on use case}",
"additional_elements": "{ambient effects like mist, glow, sparks, or subtle environmental accents}",
"negative_cues": "no clutter, no extra subjects, no distracting background elements"
}
```

* * *

#### Comparison and Multi-Product Layouts

Templates that show contrasts or multiple items together.

**"Us vs. Them" Split Layout**

 Show prompt

```
{
"subject": "two cakes shown side by side for comparison",
"action_or_pose": "left side features an elegant, professionally decorated cake with intricate artistic design; right side shows a slightly soggy, amateurish cake with uneven icing",
"setting_or_environment": "split background with clean pastel color on the left and dull gray tone on the right to emphasize contrast",
"style": "commercial comparison photography with clear side-by-side presentation",
"composition": "symmetrical split with a clear vertical divider, each cake occupying its own half of the frame",
"lighting": "bright flattering lighting on the artistic cake, flat muted lighting on the messy cake to enhance differences",
"camera_angle": "straight-on eye-level view for a fair and clear comparison",
"color_palette": "vibrant celebratory tones on the left versus muted neutral tones on the right",
"text_space": "upper section reserved for 'Us vs Them' style tagline or feature labels",
"aspect_ratio": "16:9",
"additional_elements": "subtle divider line between the two cakes",
"negative_cues": "no clutter, no people, no distracting props beyond the cakes"
}
```

Template:

```
{
"subject": "{two products, concepts, or items being compared}",
"action_or_pose": "{placed side by side or mirrored to emphasize contrast}",
"setting_or_environment": "{clean split background, divided colors, or studio gradient to reinforce separation}",
"style": "{commercial comparison layout or infographic-inspired photography}",
"composition": "{symmetrical split with clear divider or contrast zone down the middle}",
"lighting": "{balanced lighting on both sides, can shift tone to highlight contrast (e.g. warm vs cool)}",
"camera_angle": "{straight-on view for clarity, slight perspective if adding depth}",
"color_palette": "{contrasting color schemes for each side to symbolize difference}",
"text_space": "{space above or below each side for labels, features, or taglines}",
"aspect_ratio": "{16:9 or 3:2 for banner-style ads}",
"additional_elements": "{optional divider line, icons, or subtle effects to emphasize separation}",
"negative_cues": "{no clutter, no extra props, no blending between sides}"
}
```

**Dual Product Focus (Variants)**

 Show prompt

```
{
"subject": "two variants of a gentlemen's hygiene kit, one silver-themed and one gold-themed, displayed side by side",
"action_or_pose": "both kits arranged upright with items neatly displayed in front of each case to highlight their design",
"setting_or_environment": "clean luxury studio background with a subtle gradient fade",
"style": "premium commercial product photography",
"composition": "symmetrical side-by-side layout with balanced spacing, silver kit on the left and gold kit on the right",
"lighting": "soft diffused studio lighting with gentle highlights to enhance metallic finishes",
"camera_angle": "eye-level straight-on view for an elegant comparison",
"color_palette": "neutral black and gray backdrop with silver tones emphasized on the left and warm golden tones emphasized on the right",
"text_space": "upper center reserved for product labels or comparison tagline",
"aspect_ratio": "16:9",
"additional_elements": "subtle vertical divider with a gradient fade separating the silver and gold halves",
"negative_cues": "no clutter, no people, no distracting props beyond the hygiene kit items"
}
```

Template:

```
{
"subject": "two variants of the same product displayed side by side",
"action_or_pose": "both products positioned upright and angled slightly to showcase differences",
"setting_or_environment": "clean studio background with subtle gradient fade",
"style": "commercial product photography for clear comparison",
"composition": "symmetrical side-by-side layout with balanced spacing between products",
"lighting": "even soft studio lighting with gentle highlights to ensure both products are equally visible",
"camera_angle": "eye-level straight-on view for fairness",
"color_palette": "{neutral backdrop with product-specific colors emphasized}",
"text_space": "upper area reserved for product names or feature labels",
"aspect_ratio": "16:9",
"additional_elements": "subtle divider line or color shift in background to differentiate variants",
"negative_cues": "no clutter, no people, no distracting props"
}
```

**Comparison Highlighting Key Features**

 Show prompt

```
{
"subject": "two magic wands shown side by side for comparison",
"action_or_pose": "left side shows a plain wooden wand for basic spells, right side shows a decorated ornate wand glowing with magical energy",
"setting_or_environment": "clean split background with subtle gradient, left side warm neutral tone, right side glowing mystical blue",
"style": "fantasy-inspired commercial comparison shot",
"composition": "balanced layout with each wand centered in its own half of the frame",
"lighting": "soft neutral lighting on the standard wand, radiant highlights and glow on the decorated wand",
"camera_angle": "straight-on eye-level for clear visibility of details",
"color_palette": "earthy browns for standard wand, shimmering gold and blue tones for decorated wand",
"text_space": "labels below each wand highlighting their features",
"aspect_ratio": "16:9",
"additional_elements": "subtle glowing icons with checkmarks or stars next to the feature highlights",
"negative_cues": "no clutter, no people, no distracting background props",
"feature_highlights": {
"standard_wand": [
"Simple wooden design",
"Casts basic spells only",
"Lightweight and easy to carry",
"Affordable for beginners"
],
"decorated_wand": [
"Intricately carved with glowing runes",
"Casts advanced and high-level spells",
"Enhanced magical focus for precision",
"Prestigious look for master wizards"
]
}
}
```

Template:

```
{
"subject": "{two products or variations displayed next to each other}",
"action_or_pose": "{placed evenly side by side, facing forward for clarity}",
"setting_or_environment": "{studio setup or clean background to keep focus on comparison}",
"style": "{commercial comparison layout, infographic-inspired or clean product photography}",
"composition": "{balanced side-by-side layout with equal visual weight}",
"lighting": "{consistent bright lighting across both products for fairness}",
"camera_angle": "{eye-level straight-on shot for clear feature visibility}",
"color_palette": "{neutral or brand-aligned tones, space for highlighting key differences with accent colors}",
"text_space": "{designated areas beside or below each product for feature highlights or labels}",
"aspect_ratio": "{16:9 or 3:2 for wide banners and presentation layouts}",
"additional_elements": "{icons, checkmarks, or subtle arrows pointing to product features}",
"negative_cues": "{no clutter, no people, no unrelated objects, no distracting textures}"
}
```

**Multi-SKU Grid**

 Show prompt

```
{
"subject": "nine different running shoe designs displayed in a 3x3 grid",
"action_or_pose": "each shoe positioned at a three-quarter angle, evenly spaced within its own square",
"setting_or_environment": "plain white studio background with subtle shadows for grounding",
"style": "catalog-style product photography",
"composition": "3x3 grid layout, each shoe centered inside its square with equal spacing",
"lighting": "consistent bright studio lighting across all shoes for uniform appearance",
"camera_angle": "straight-on view of grid with each shoe angled slightly for depth",
"color_palette": "varied to highlight product differences while keeping clean backdrop",
"text_space": "space below each shoe reserved for SKU name or short label",
"aspect_ratio": "16:9",
"additional_elements": "thin dividing lines between grid squares for clarity",
"negative_cues": "no people, no clutter, no overlapping shoes",
"grid_variations": {
"row_1": {
"shoe_1": "lightweight mesh trainer in neon green with white sole",
"shoe_2": "sleek black running shoe with reflective silver accents",
"shoe_3": "vibrant red sprint shoe with aerodynamic sole design"
},
"row_2": {
"shoe_4": "blue stability running shoe with wide supportive heel",
"shoe_5": "minimalist gray shoe with ultra-thin flexible sole",
"shoe_6": "orange trail running shoe with rugged tread and mud splatter detail"
},
"row_3": {
"shoe_7": "white racing flat with bold stripe pattern in gold",
"shoe_8": "purple cushioned long-distance shoe with thick midsole",
"shoe_9": "sleek silver futuristic design with transparent sole accents"
}
}
}
```

> For best results, make sure you define every individual element that will appear in each section of the grid.

Template:

```
{
"subject": "{multiple product variations displayed together in a grid layout}",
"action_or_pose": "{products arranged evenly in rows or columns, facing forward for consistency}",
"setting_or_environment": "{plain neutral background or subtle gradient to keep focus on products}",
"style": "{catalog-style commercial photography or clean CGI render}",
"composition": "{grid format with equal spacing between items, balanced across frame}",
"lighting": "{consistent bright lighting across all products to ensure uniform look}",
"camera_angle": "{straight-on or top-down depending on product type}",
"color_palette": "{neutral tones or brand-aligned palette, can shift per product variant}",
"text_space": "{reserved area below or beside each SKU for labels, names, or prices}",
"aspect_ratio": "{16:9, 3:2, or square 1:1 depending on platform use}",
"additional_elements": "{thin divider lines, soft shadows, or labels to separate SKUs}",
"negative_cues": "{no clutter, no overlapping products, no unrelated background props}"
}
```

**"Bundle Shot" with a Group of Related Items**

 Show prompt

```
{
"subject": "outdoor hiking gear bundle with clearly defined items",
"action_or_pose": "all items grouped neatly together with the main backpack in the center and supporting gear arranged around it",
"setting_or_environment": "clean studio background with subtle texture suggesting an outdoor theme",
"style": "commercial product bundle photography",
"composition": "backpack as the hero item, surrounded by neatly positioned supporting gear with balanced spacing",
"lighting": "bright even studio lighting with soft shadows for depth and clarity",
"camera_angle": "eye-level three-quarter view to capture the entire bundle clearly",
"color_palette": "earth tones with greens, browns, and muted grays to emphasize outdoor use",
"text_space": "reserved area above the bundle for promotional tagline or bundle label",
"aspect_ratio": "3:2",
"additional_elements": "subtle shadow under the items to ground them",
"negative_cues": "no duplicate items, no unrelated gear, no people, no clutter",
"bundle_items": [
"durable hiking backpack with multiple compartments",
"stainless steel insulated water bottle",
"compact rolled sleeping bag in dark green",
"lightweight trekking poles (pair)",
"folded nylon tent in carrying bag",
"multi-tool with visible knife, pliers, and screwdriver",
"LED headlamp with adjustable strap",
"map and compass set neatly placed",
"pair of sturdy hiking boots positioned to the side"
]
}
```

Template:

```
{
"subject": "{main product presented with related supporting items as a bundle}",
"action_or_pose": "{products grouped neatly together, main item placed at the center or forefront}",
"setting_or_environment": "{studio setup, lifestyle scene, or thematic background depending on bundle type}",
"style": "{commercial bundle photography or polished CGI render}",
"composition": "{balanced grouping with hero product dominant and supporting items arranged harmoniously around it}",
"lighting": "{consistent bright lighting with subtle highlights to ensure all items are visible}",
"camera_angle": "{eye-level or slight three-quarter angle to capture depth of the group}",
"color_palette": "{brand-aligned palette or natural tones that unify the bundle}",
"text_space": "{reserved open area above or beside the bundle for tagline or pricing info}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on ad placement}",
"additional_elements": "{subtle accents like surface reflections, shadows, or themed props to tie items together}",
"negative_cues": "{no clutter, no unrelated objects, no overlapping items that obscure the main product}"
}
```

* * *

#### Social Proof and People-Focused Ads

Templates that use testimonials, influencers or everyday usage examples.

Testimonial Quote Layout

 Show prompt

```
{
"subject": "premium ornate magic wand glowing with runes",
"action_or_pose": "wand displayed upright on a pedestal with magical aura surrounding it",
"setting_or_environment": "fantasy-inspired studio backdrop with subtle mystical glow",
"style": "advertising layout blending fantasy product photography with clean design elements",
"composition": "wand positioned prominently on the left, testimonial text area on the right with balanced hierarchy",
"lighting": "dramatic spotlight on the wand with soft glow accents",
"camera_angle": "eye-level shot for clear product view",
"color_palette": "deep blues, shimmering gold, and glowing purple highlights",
"text_space": "right side reserved for testimonial quote",
"aspect_ratio": "3:2",
"additional_elements": "portrait silhouette of a wizard subtly blurred behind the quote, quotation marks framing text",
"negative_cues": "no clutter, no unrelated props, no distracting background objects",
"testimonial_quote": "\"This takes spell slinging to the next level.\" — Master Wizard"
}
```

Template:

```
{
"subject": "{main product shown alongside a customer testimonial}",
"action_or_pose": "{product presented cleanly, with or without a person holding or using it}",
"setting_or_environment": "{neutral studio setup or lifestyle background that supports authenticity}",
"style": "{advertising layout blending product photography with graphic design elements}",
"composition": "{clear separation between product image and testimonial text area, with balanced hierarchy}",
"lighting": "{bright studio lighting or natural tones that match testimonial mood}",
"camera_angle": "{eye-level for relatability, or product-focused angle if person not included}",
"color_palette": "{brand-aligned palette or neutral tones that don’t overpower the text}",
"text_space": "{dedicated area for testimonial quote in clean typography}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on platform format}",
"additional_elements": "{optional customer portrait, subtle quotation marks, or star rating graphics}",
"negative_cues": "{no clutter, no unrelated props, no overly busy backgrounds}"
}
```

Lifestyle Photo with the Product in Hand

 Show prompt

```
{
"subject": "woman holding an unlabeled energy drink can",
"action_or_pose": "taking a selfie-style photo after finishing a marathon, smiling and slightly sweaty from exertion",
"setting_or_environment": "outdoor marathon finish line area with blurred runners and banners in the background",
"style": "casual lifestyle commercial photography",
"composition": "can held close to camera lens as the hero subject, woman’s face slightly behind it in selfie perspective",
"lighting": "natural daylight with warm afternoon tones",
"camera_angle": "close-up selfie perspective with product in hand",
"color_palette": "bright sporty colors with neutral tones in background",
"text_space": "upper left corner left open for tagline overlay",
"aspect_ratio": "3:2",
"additional_elements": "sweatband on her wrist and race bib partially visible to emphasize marathon context",
"negative_cues": "no brand logos, no distracting clutter, no unrelated props",
"tagline": "\"Restore your energy!\""
}
```

Template:

```
{
"subject": "{main product shown clearly in a person’s hand}",
"action_or_pose": "{person holding or using the product in a natural way, focus kept on product}",
"setting_or_environment": "{realistic lifestyle setting such as home, café, outdoor park, gym, office, etc.}",
"style": "{lifestyle commercial photography or cinematic look}",
"composition": "{product framed as hero element in hand, background softly blurred to keep attention centered}",
"lighting": "{natural daylight, warm indoor tones, or cinematic lighting to match lifestyle scene}",
"camera_angle": "{eye-level or close-up framing of hand and product}",
"color_palette": "{tones that reflect the lifestyle context, aligned with brand or campaign mood}",
"text_space": "{reserved area in the background or foreground for tagline or ad copy}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on placement}",
"additional_elements": "{supporting lifestyle props in background, e.g. coffee cup, laptop, picnic setting, etc.}",
"negative_cues": "{no cluttered hands, no unrelated objects, no distracting backgrounds, no multiple products unless intentional}"
}
```

Group Social Scene with the Product

 Show prompt

```
{
"subject": "vegan burgers served at a family dinner table",
"action_or_pose": "group of family members smiling, chatting, and enjoying vegan burgers together",
"setting_or_environment": "warm indoor dining room with a long wooden dinner table and cozy décor",
"style": "lifestyle commercial photography with candid natural feel",
"composition": "burgers placed prominently at the center of the table as the hero product, family gathered around",
"lighting": "warm ambient indoor lighting with soft highlights on the food",
"camera_angle": "eye-level wide shot capturing the group dynamic",
"color_palette": "warm earthy tones with greens, browns, and soft golden accents",
"text_space": "upper section above the table reserved for tagline",
"aspect_ratio": "3:2",
"additional_elements": "glasses of water, simple side dishes, and subtle table décor",
"negative_cues": "no brand logos, no clutter, no unrelated food items",
"tagline": "\"Share Vegan Burgers with the Family!\""
}
```

Template:

```
{
"subject": "{main product shown as part of a social gathering}",
"action_or_pose": "{group of people naturally interacting, holding, or using the product together}",
"setting_or_environment": "{casual social space such as café, living room, outdoor picnic, party, or sports setting}",
"style": "{lifestyle commercial photography with candid or cinematic feel}",
"composition": "{product integrated into the group scene but clearly highlighted as the focal point}",
"lighting": "{natural daylight or warm indoor tones for authenticity}",
"camera_angle": "{eye-level or slightly wide angle to capture the group dynamic}",
"color_palette": "{tones that reflect the mood of the gathering, aligned with campaign vibe}",
"text_space": "{reserved area in the background or foreground for tagline or ad copy}",
"aspect_ratio": "{3:2, 16:9, or 1:1 depending on placement}",
"additional_elements": "{props related to the social scene, e.g. food, drinks, décor, or sports gear}",
"negative_cues": "{no cluttered backgrounds, no unrelated logos, no over-staged or unnatural posing}"
}
```

User-Generated-Content-Style Photo

 Show prompt

```
{
"subject": "streamer holding an action figure of Grant in front of the camera",
"grant_character_reference": "Grant is a 50-year-old man with long white hair and a white beard, wearing a white suit and aviator sunglasses. The action figure must match these traits: long white hair, white beard, white suit, aviator sunglasses.",
"action_or_pose": "streamer smiles and presents the Grant action figure close to the webcam, arm extended toward camera, casual posture",
"setting_or_environment": "authentic bedroom streaming setup with desk, microphone on boom arm, keyboard, and soft LED backlights on the wall",
"style": "casual UGC livestream screenshot look with slight phone or webcam softness",
"composition": "action figure in sharp focus near lens as hero subject, streamer’s face slightly behind it, chat panel visible on the right side of frame",
"lighting": "cool LED rim light from behind, soft monitor light on face, ambient room lighting, no harsh hotspots",
"camera_angle": "webcam eye-level perspective from desk height, mild wide-angle",
"color_palette": "cool LED hues like blue and purple with neutral desk and wall tones",
"chat_layout": "vertical chat column on right side with translucent dark panel, rounded corners, subtle drop shadow, scrolling usernames and short messages in alternating lines; no brand logos; legible but unobtrusive",
"stream_overlay": "minimal overlay frame around webcam, small unobtrusive labels for mic and live indicator, no sponsor logos",
"text_space": "optional caption area in upper left kept clean and empty by default",
"aspect_ratio": "16:9",
"additional_elements": "subtle bokeh of LED strip lights in background, tidy desk surface, visible mic and headphones",
"negative_cues": "no brand logos, no watermark, no cluttered overlays, no unrelated ads, do not change Grant’s signature look on the figure"
}
```

Template:

```
{
"subject": "{product shown in a casual, authentic way as if captured by a customer}",
"action_or_pose": "{person holding, using, or interacting with the product in a natural, unstaged moment}",
"setting_or_environment": "{everyday setting such as kitchen, living room, gym, café, outdoors, etc.}",
"style": "{casual smartphone photo look, not overly polished, authentic and relatable}",
"composition": "{slightly imperfect framing, product clearly visible but with natural context around it}",
"lighting": "{natural daylight or typical indoor lighting, not studio-perfect}",
"camera_angle": "{handheld perspective, selfie angle, or over-the-shoulder shot}",
"color_palette": "{natural tones reflecting real-life setting, minimal editing look}",
"text_space": "{optional space for casual caption or overlay if repurposed for ads}",
"aspect_ratio": "{vertical 9:16 for stories/reels, or 1:1 for social feed}",
"additional_elements": "{props or background elements that support realism, like everyday items or clutter}",
"negative_cues": "{no staged studio look, no perfect symmetry, no heavy editing}"
}
```

Before and After Using the Product

 Show prompt

```
{
"subject": "same living room shown in two states: plain vs decorated",
"action_or_pose": "left side shows plain unfurnished room with bare walls and empty floor, right side shows the same room fully decorated with stylish furniture and décor",
"setting_or_environment": "modern apartment living room with large windows, neutral flooring, and clean walls",
"style": "commercial interior design photography",
"composition": "side-by-side layout with a clear vertical divider between before and after states",
"lighting": "consistent natural daylight coming through windows on both sides",
"camera_angle": "eye-level wide shot capturing the full room",
"color_palette": "left side muted whites and grays, right side warm earthy tones with accent colors like green and gold",
"text_space": "labels at the top of each side reading 'Before' and 'After'",
"aspect_ratio": "16:9",
"additional_elements": "decorated side includes sofa, coffee table, rug, framed wall art, and potted plants",
"negative_cues": "no people, no clutter, no misleading over-enhancements"
}
```

Template:

```
{
"subject": "{same product, person, or scene shown in two contrasting states: before use vs after use}",
"action_or_pose": "{left or top side shows the 'before' state, right or bottom side shows the 'after' state}",
"setting_or_environment": "{consistent background or environment across both states for clarity}",
"style": "{commercial side-by-side transformation layout, infographic-inspired or clean photography}",
"composition": "{clear divider between before and after, balanced framing of both sides}",
"lighting": "{consistent lighting for fairness, can emphasize improvements on the 'after' side}",
"camera_angle": "{straight-on or eye-level for clear comparison}",
"color_palette": "{neutral tones on 'before' side, vibrant enhanced tones on 'after' side}",
"text_space": "{labels above or below each side to mark 'Before' and 'After'}",
"aspect_ratio": "{16:9 or 3:2 for banner-style comparisons}",
"additional_elements": "{optional arrows, icons, or subtle design elements highlighting transformation}",
"negative_cues": "{no clutter, no unrela_
```

* * *

#### Offer-Driven and Seasonal Ads

Templates designed to emphasize urgency or promotions.

Promo Offer Layout with a Text Box

 Show prompt

```
{
"subject": "succulent grilled steak on a rustic wooden board with garnish",
"action_or_pose": "steak positioned as the hero product slightly angled toward the viewer",
"setting_or_environment": "dark rustic steakhouse background with subtle smoke for atmosphere",
"style": "commercial food photography with bold advertising layout",
"composition": "steak on the left side as the hero subject, large clean space on the right reserved for promotional text",
"lighting": "dramatic warm spotlight on the steak with soft shadows for depth",
"camera_angle": "eye-level close-up for mouthwatering detail",
"color_palette": "rich browns, charred blacks, warm reds, and golden highlights",
"text_space": "right side of frame with placeholder text 'Promo Offer Goes Here', 'Discount % Here', 'Tagline Here'",
"aspect_ratio": "16:9",
"additional_elements": "subtle glowing lines or sale graphics around text space to emphasize promotion",
"negative_cues": "no people, no logos, no clutter, no unrelated props"
}
```

Template:

```
{
"subject": "{main product or hero item displayed prominently}",
"action_or_pose": "{product positioned clearly with space around it for promotional text}",
"setting_or_environment": "{clean studio background, gradient, or thematic backdrop depending on promo type}",
"style": "{commercial advertising layout with emphasis on product and text integration}",
"composition": "{hero product on one side, large open area reserved for promotional text on the other side}",
"lighting": "{bright and even studio lighting with subtle highlights for product clarity}",
"camera_angle": "{eye-level or slightly angled for dramatic product focus}",
"color_palette": "{brand-aligned tones or bold contrasting colors that fit promotion theme}",
"text_space": "{dedicated area for promo offer details, discount percentage, or tagline}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on ad format}",
"additional_elements": "{optional graphics like bold shapes, sale tags, or minimalist icons to emphasize the offer}",
"negative_cues": "{no clutter, no unrelated props, no distracting background elements}"
}
```

Limited-Time Seasonal Layout

 Show prompt

```
{
"subject": "a luxury stainless steel wristwatch with a deep sapphire blue dial and subtle gold accents, displayed as the central hero item",
"action_or_pose": "positioned prominently in the center-right, angled slightly at 45 degrees to capture reflections, resting gently on a soft surface with space on the left",
"setting_or_environment": "a cozy, upscale winter holiday setting; resting on a bed of fresh spruce branches lightly dusted with fine artificial snow, set against a softly blurred background of a crackling fireplace and twinkling bokeh lights",
"style": "premium commercial seasonal advertising photograph, blending high-end macro product photography with warm, inviting festive atmospheric design, cinematic catalog quality",
"composition": "hero product is centered, framed harmoniously by elegant seasonal props leading the eye to the dial; asymmetrical balance with heavy negative space on the left",
"lighting": "warm volumetric lighting from the simulated fireplace combined with crisp, directional studio lighting highlighting the watch's textures and polished metal edges; festive rim lighting",
"camera_angle": "slight high-angle (45 degrees top-down), looking down onto the watch face for perfect readability of the dial and branding",
"color_palette": "rich sapphire blue, polished silver, warm gold accents, deep spruce green, soft amber glows, and crisp winter white",
"text_space": "ample, clean open area (negative space) reserved in the upper-left quadrant, consisting of soft, warm bokeh lights and blurred spruce",
"aspect_ratio": "1:1 (optimized for social media advertising carousels and Instagram ads)",
"additional_elements": "small scattered cinnamon sticks, a few frosted red berries, a hint of velvet ribbon, and very faint golden fairy lights creating bokeh spheres",
"negative_cues": "no clutter, no people, no busy background objects, no harsh shadows, no distracting logos on props, no visible cables"
}
```

Template:

```
{
"subject": "{main product displayed as the hero item in a seasonal theme}",
"action_or_pose": "{product positioned prominently with space for seasonal accents and promotional text}",
"setting_or_environment": "{seasonal backdrop such as snowy holiday setting, autumn leaves, summer beach, or spring flowers}",
"style": "{commercial seasonal advertising layout blending product photography with thematic design}",
"composition": "{hero product in center or one side, seasonal props and decorations arranged harmoniously}",
"lighting": "{bright festive lighting or warm tones that match the season}",
"camera_angle": "{eye-level or slight dramatic angle depending on campaign mood}",
"color_palette": "{colors tied to the season: red/green for holidays, orange/brown for fall, pastel for spring, bright blues/yellows for summer}",
"text_space": "{reserved area for seasonal promo text such as 'Limited Time Offer' or 'Holiday Special'}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on ad format}",
"additional_elements": "{seasonal accents like snowflakes, autumn leaves, fireworks, or flowers depending on theme}",
"negative_cues": "{no clutter, no unrelated props, no distracting logos}"
}
```

Conditional Bundle Offer Layout

 Show prompt

```
{
"subject": "premium mouthwash bottle as the hero product, paired with a free toothbrush and toothpaste",
"action_or_pose": "mouthwash bottle placed upright at the center, toothbrush and toothpaste positioned to the side with a visual plus sign indicating the deal",
"setting_or_environment": "clean studio background with subtle gradient for a polished healthcare look",
"style": "commercial promotional layout with clear product photography",
"composition": "mouthwash as the dominant hero subject, toothbrush and toothpaste slightly smaller and arranged neatly to the right with clear visual connection",
"lighting": "bright even studio lighting with fresh highlights on reflective surfaces",
"camera_angle": "eye-level product shot to show packaging clearly",
"color_palette": "cool mint tones like teal, white, and silver with fresh accents",
"text_space": "upper section reserved for promotional copy such as 'Buy Premium Mouthwash, Get Free Toothbrush + Toothpaste'",
"aspect_ratio": "3:2",
"additional_elements": "graphic plus sign between products, circular badge icon with placeholder text 'FREE!'",
"negative_cues": "no clutter, no unrelated dental products, no people"
}
```

Template:

```
{
"subject": "{main product paired with conditional product(s) as part of the deal}",
"action_or_pose": "{products displayed together in a way that emphasizes their connection, e.g. side by side or stacked}",
"setting_or_environment": "{studio setup, clean gradient, or lifestyle background depending on product type}",
"style": "{commercial promotional layout with strong callout design}",
"composition": "{main product as hero, secondary product(s) positioned nearby with visual link such as arrow, plus sign, or graphic divider}",
"lighting": "{consistent bright lighting with subtle highlight on main product}",
"camera_angle": "{eye-level or three-quarter angle to capture all products clearly}",
"color_palette": "{brand-aligned palette or bold contrasting colors to highlight the deal}",
"text_space": "{reserved area for promotional copy such as 'Buy 1 Get 1 Free' or 'Bundle & Save'}",
"aspect_ratio": "{3:2, 1:1, or 16:9 depending on campaign format}",
"additional_elements": "{graphic icons like plus signs, arrows, or discount badges to emphasize the conditional offer}",
"negative_cues": "{no clutter, no unrelated products, no background distractions}"
}
```

Creative Event-Based Promo

 Show prompt

```
{
"subject": "robotic hand holding the latest GPU as the hero product",
"action_or_pose": "damaged metallic hand emerging dramatically from rubble, gripping the GPU tightly as if salvaged from destruction",
"setting_or_environment": "post-apocalyptic city ruins inspired by Terminator, with collapsed skyscrapers, smoke, and glowing embers",
"style": "cinematic sci-fi commercial advertising layout with gritty realism",
"composition": "robotic hand and GPU centered in the foreground, rubble and wreckage framing the bottom, distant ruins filling the background, clear open sky at the top reserved for event text",
"lighting": "dramatic spotlight on the GPU with neon blue edge glow, fiery orange highlights reflecting from burning wreckage, deep shadows for contrast",
"camera_angle": "low-angle close-up focused on the GPU held above the rubble, with city ruins looming in background",
"color_palette": "dark metallic grays, scorched blacks, neon blue accents, and fiery orange glows",
"text_space": "upper portion reserved for bold typography reading 'Cyber Monday'",
"aspect_ratio": "16:9",
"additional_elements": "sparks, flickering neon wires, drifting smoke, and glowing fragments of destroyed tech to emphasize atmosphere",
"negative_cues": "no full robot body, no people, no cartoonish elements, no extra products"
}
```

Text with a follow-up prompt is added at the bottom.

Template:

```
{
"subject": "{main product or group of products featured for the event}",
"action_or_pose": "{product positioned hero-style, optionally paired with event-themed props or accents}",
"setting_or_environment": "{background reflecting the event: e.g., festive lights for Christmas, neon cyber theme for Cyber Monday, balloons for anniversaries}",
"style": "{commercial advertising layout blending product focus with celebratory event theme}",
"composition": "{hero product centered or foregrounded, event graphics or motifs surrounding it}",
"lighting": "{bright or dramatic lighting to match the energy of the event}",
"camera_angle": "{eye-level for clarity or slight dramatic tilt for energy}",
"color_palette": "{tones tied to the event: red/green for holidays, black/gold for Black Friday, neon blue for Cyber Monday, etc.}",
"text_space": "{dedicated area for event title and promotional text such as 'Black Friday Deal' or 'Holiday Sale'}",
"aspect_ratio": "{16:9 for banners, 3:2 for posters, 1:1 for social media}",
"additional_elements": "{event-specific icons, decorations, or design elements such as confetti, digital glitch lines, or holiday ornaments}",
"negative_cues": "{no clutter, no unrelated props, no off-theme colors or items}"
}
```

Launch or "New Arrival" Spotlight

 Show prompt

```
{
"subject": "sleek new SLR camera as the hero product",
"action_or_pose": "camera clearly visible resting inside the cockpit of a jet plane mid-flight",
"setting_or_environment": "stratosphere at high altitude with Earth’s curve visible through the glass canopy",
"style": "cinematic commercial launch photography with futuristic reveal feel",
"composition": "dynamic Dutch tilt close-up shot taken from just outside the cockpit, focusing on the SLR through the glass with the cockpit frame adding depth",
"lighting": "bright sunlight from the stratosphere with lens flares highlighting the camera through the glass",
"camera_angle": "outside perspective angled toward the cockpit glass, tilted for dramatic emphasis",
"color_palette": "deep blue stratosphere, metallic cockpit frame, and reflective silver-black camera body",
"text_space": "upper sky area reserved for 'New Arrival' promotional text",
"aspect_ratio": "16:9",
"additional_elements": "subtle contrails, faint glow around cockpit edges, atmospheric haze to add realism",
"negative_cues": "no pilots, no other products, no clutter, no branding logos"
}
```

Template:

```
{
"subject": "{new product highlighted as the hero focus}",
"action_or_pose": "{product displayed in a bold, dramatic way to emphasize its debut, e.g. elevated on pedestal, spotlighted, or revealed with flair}",
"setting_or_environment": "{clean studio background, futuristic reveal stage, or abstract gradient depending on product type}",
"style": "{commercial launch photography or cinematic CGI render}",
"composition": "{product centered with clear negative space or dynamic reveal elements framing it}",
"lighting": "{dramatic spotlight or glowing accents to emphasize 'reveal' feel}",
"camera_angle": "{eye-level, low-angle hero shot, or dramatic close-up}",
"color_palette": "{brand-aligned or bold high-contrast tones like black/gold, neon, or metallic}",
"text_space": "{dedicated area for 'New Arrival' or 'Just Launched' callout text}",
"aspect_ratio": "{3:2, 16:9, or square depending on campaign format}",
"additional_elements": "{optional props like stage lights, glowing edges, confetti, or smoke to emphasize launch atmosphere}",
"negative_cues": "{no clutter, no unrelated objects, no people unless part of reveal concept}"
}
```

* * *

This template library will be updated regularly, so feel free to come back to it in the future to see the latest version.

* * *

### 📚 JSON Template Library for AI Photoshoots

* * *

### 🧑‍🎨 Workflow for Creating Ad Images with AI

In this section we'll look at where AI image generation fits naturally into your advertising and design process. We won't walk through every step of a full ad campaign workflow — we'll simply highlight the moments where using AI makes the most sense.

Keep in mind that every team and every person has their own approach to creating ad campaigns. Since these workflows can vary widely, there is no one-size-fits-all formula for using AI. Instead, our goal is to help you identify the moments where AI-generated images can give you speed, variety and fresh ideas without disrupting the way you usually work.

* * *

#### Research and Reverse Engineering

In the previous express course I already showed you that you can easily ask the AI to extract visual elements from a sample you've uploaded. Let's return to that and show how to effectively reverse engineer any ad image you upload — not only in terms of visual elements, but also digging into the psychology of visual advertising and more.

* * *

**Prompt for Extracting Visual Elements (Look and Aesthetics)**

```
Break down the **visual cues** of this ad image.
List the following clearly:
- Subject and main focus
- Style or art direction (colors, mood, textures)
- Camera choices (angle, framing, depth)
- Lighting setup and atmosphere
- Extra design details that support the overall look
```

If you only need the visual details to paste into your own prompts, the first prompt will do. The next two are optional, but they're useful if you want to dig deeper — to understand why an ad works and where else its style can be applied.

* * *

**"Message and Psychology" Prompt (Why It Works)**

```
Analyze the **message and psychology** of this ad image.
Explain:
- What is the ad trying to make the viewer feel or believe?
- What psychological triggers does it use (status, trust, excitement, comfort, etc.)?
- How do the visual choices support that message?
- Why might this approach work on the intended audience?
```

**Application and Suitability (Where It Fits)**

```
Tell me what **types of ads or campaigns** this ad image style would work best for.
Explain:
- What industries or products this style fits naturally
- What platforms or placements it would perform well on (social media, billboards, product packaging, etc.)
- What audiences might respond most strongly to this look
- Any limits or risks of using this aesthetic
```

 Show ChatGPT's response

Here's a clear breakdown of the **visual cues** in this Ajax ad image:

#### Subject and Main Focus

-   A yellow polka-dot cup with bright red liquid (juice or wine) pouring out into the air, frozen in the shape of a **question mark ( ? )**.
-   Bottom left: a pack of **Ajax wipes**, with a hand pulling one wipe out.
-   Slogan: *"NOTHING WORKS FASTER"* — reinforces the idea that Ajax eliminates the "mess" before it even hits the floor.

#### Style or Art Direction

-   **Minimalist, clean design**: an empty pale green background lets all the attention focus on the spilled liquid.
-   **Playful yet clever**: turning a mess into a graphic punctuation mark.
-   **Colors**: bright contrast — bright red liquid, yellow cup, white dots and blue Ajax packaging. Creates a strong visual hierarchy.
-   **Mood**: light, clever and confident — no panic over the mess, only control.

#### Camera Choice (Angle, Framing, Depth)

-   Straight **eye-level shot** with centered framing.
-   Isolated objects (cup, liquid, packaging) shot without **extra details**.
-   Shallow context — no floor or surface shown — makes the frame surreal and conceptual.
-   Wide negative space leaves room for text and product placement.

#### Lighting and Atmosphere

-   **Soft, diffused studio lighting** with no harsh shadows.
-   Even lighting emphasizes the clarity and cleanliness of the product.
-   Soft gradients in the background add depth and keep the ad from looking flat.

#### Additional Design Details

-   Clever **frozen liquid** forming a question mark ties into the theme: "What if a spill happens?"
-   A brand pack placed in the lower corner with a slogan and microcopy — a standard CPG (consumer packaged goods) layout for easy recognition.
-   Small splashes add realism without creating clutter.
-   A hand pulling out a wipe emphasizes how simple and fast it is to use, reinforcing the claim "Nothing's faster."

#### Research Sprint and Curation Cycle

This is the stage where you use AI to quickly try out many ideas, then narrow them down to the few that are truly worth keeping. Think of it as making quick sketches before you commit to the final design.

#### How to Do It

1.  Write one short, clear task that matches your creative brief. Don't overcomplicate it.
2.  Instead of rewriting the whole instruction every time, change only one thing per round — for example, the angle, the lighting, or the mood. This lets you focus your tests and compare them easily.
3.  Generate 3–4 images for each variation. That's enough to see patterns, but not so many that you waste time sorting through them.
4.  Evaluate quickly and don't overthink it. Use a quick mental checklist:
    -   Is the subject clearly and sharply visible?
    -   Does it look professional and on-brand?
    -   Is there room for text or a call to action, if needed?
    -   Do the light and perspective look believable?
    -   Can the shot be edited or touched up later, if needed?
5.  Make a shortlist, then stop. Keep only the 3–6 best images. Save the prompts you used for each one so you can recreate or refine them later.
6.  Polish lightly. If an image is 90% right but has a flaw (such as clutter, awkward reflections, or one small detail that's off), fix it with retouching or editing rather than regenerating from scratch.

#### Style System and Consistency for Campaigns

When you work on a campaign, you need more than one beautiful picture — you need a *set* of images that look like a unified whole. This is where a style system helps. The idea is to keep certain elements constant across all your AI generations so the final results look like one family.

#### How to Do It

1.  Decide what must stay the same in every image. Make a short list and stick to it: color palette, lighting style, camera range, mood, and common "forbidden" elements such as messy reflections or extra props.
2.  Write one base prompt that includes these fixed parts. Keep the anchors in one tight block. Leave a small area of flexibility for pose, props, setting, or background so you can make changes without breaking the overall look.
3.  Create the full campaign set in a single session. Make a hero image, a detailed close-up, a "lifestyle" shot, and a background plate. Use the same fixed elements for all the images so they look connected.
4.  Compare them on one screen. Check whether the colors, contrast, grain, and camera feel match. If one image stands out, edit or regenerate it while keeping the fixed parts unchanged.
5.  Save your "mini style sheet" for future rounds. Copy the final base prompt, the fixed parts, and any editing notes. Use the same sheet when you add new images later, so the campaign stays consistent.

* * *

#### Mini Style Sheet You Can Copy

```
{
"brand": "<name>",
"fixed_parts": {
"palette": ["#0F1A2B", "#A9B8C8", "#E6E6E6"],
"lighting": "soft key with gentle rim, clean speculars",
"camera_range": "35mm to 50mm, eye-level or slight low",
"mood": "polished, modern, confident",
"negatives": ["warped packaging", "busy backgrounds", "harsh color cast"]
},
"play_zone": {
"pose_or_action": "<what changes>",
"props": "<what changes>",
"setting": "<what changes>"
},
"set_plan": ["hero", "detail_closeup", "lifestyle_in_use", "environment_plate"],
"notes": "Keep headline space in top third; maintain subtle grain."
}
```

#### Pro Tips

-   Keep the fixed parts in one copy-and-paste block at the top of each template.
-   Start with the best hero image and create the rest right away, so the look stays fresh in your mind.
-   Limit the colors to two or three accents across the whole set.
-   Use edits for small fixes instead of redoing everything.

#### Examples of Images Created with This Method:

 Show main prompt

```
{
"brand": "Premium Prompts",
"fixed_parts": {
"palette": ["#FFD700", "#E6E6E6", "#0F1A2B"],
"lighting": "soft key with gentle rim, clean speculars",
"camera_range": "35mm to 50mm, eye-level or slight low",
"mood": "polished, modern, confident",
"negatives": ["warped packaging", "busy backgrounds", "harsh color cast"]
},
"play_zone": {
"pose_or_action": "hero shot of the golden box centered on glossy surface",
"props": "none",
"setting": "minimal dark studio with faint reflections"
},
"set_plan": ["hero"],
"notes": "Box shows embossed text 'Premium Prompts'; keep headline space in top third."
}
```

* * *

**Variation 1**

 Show follow-up prompt

```
{
"brand": "Premium Prompts",
"fixed_parts": {
"palette": ["#FFD700", "#E6E6E6", "#0F1A2B"],
"lighting": "soft key with gentle rim, clean speculars",
"camera_range": "35mm to 50mm, eye-level or slight low",
"mood": "professional, aspirational, stylish",
"negatives": ["warped packaging", "logos on props", "harsh color cast"]
},
"play_zone": {
"pose_or_action": "a professional person opening the golden box at a desk",
"props": "modern laptop, notebook",
"setting": "minimal office workspace with soft focus background"
},
"set_plan": ["lifestyle_in_use"],
"notes": "Product remains hero, person slightly blurred or secondary in frame."
}
```

* * *

**Variation 2**

 Show follow-up prompt

```
{
"brand": "Premium Prompts",
"fixed_parts": {
"palette": ["#FFD700", "#E6E6E6", "#0F1A2B"],
"lighting": "spotlights with soft key rim, clean speculars",
"camera_range": "wide-angle lens, slightly low angle",
"mood": "exclusive, artistic, refined",
"negatives": ["warped packaging", "cluttered background", "harsh color cast"]
},
"play_zone": {
"pose_or_action": "box displayed on pedestal as centerpiece",
"props": "elegant gallery interior",
"setting": "a group of stylish people admiring the display in soft silhouette"
},
"set_plan": ["environment_plate"],
"notes": "People should frame the product without stealing focus; pedestal under spotlight."
}
```

* * *

**Variation 3**

 Show continuation prompt

```
{
"brand": "Premium Prompts",
"fixed_parts": {
"palette": ["#FFD700", "#E6E6E6", "#0F1A2B"],
"lighting": "soft key with gentle rim, clean speculars",
"camera_range": "close-up on the golden box with visible background action",
"mood": "energetic, modern, confident",
"negatives": [
"warped packaging",
"distorted text",
"floating box with no action",
"cluttered background",
"harsh color cast"
]
},
"play_zone": {
"pose_or_action": "a person just released the golden 'Premium Prompts' box into the air, their arms extended in a throwing motion, box crisp and sharp mid-air",
"props": "none",
"setting": "slight upward camera tilt to emphasize the box rising above, person framed lower in the background with motion blur on arms"
},
"set_plan": ["dynamic_action_throw"],
"notes": "Keep the box text sharp and centered in foreground; show clear throwing motion so the box feels launched upward, not floating."
}
```

#### Mockups and Product in Scene

Images created with AI are great for exploring ideas, but the real test is how they look in the real *world*: on packaging, in a store, or on a screen. This is where mockups help. They let you place the generated product in real-life settings so that you (and your clients) can picture it in action.

There are **two ways** to do this:

**Option 1: Create mockups directly with AI**

-   You can ask the AI to place your product in a scene right away (for example, "a golden product box displayed on a shelf in a luxury store").
-   It's fast and creative — you get instant visuals without leaving your workflow.
-   It's also great for *testing ideas*, when you just need to spark your imagination or quickly show a few placement concepts.

**Option 2: Use a separate mockup tool**

-   Design tools such as Photoshop, Figma, or online mockup generators give you more control.
-   You can place an AI-generated product shot into a smart object layer, align it perfectly to the frame, and keep it editable for the future.
-   This approach is better for *final deliverables*, because you can fine-tune the lighting and perspective and swap in updated designs without regenerating the whole image.

**The best of both worlds:**

use AI to quickly create visuals of the product in a scene, then move to a proper mockup file when you need precision, flexibility, and room for refinement.

#### Examples of Mockups Generated in ChatGPT

* * *

* * *

* * *

* * *

 **Show mockup Prompt templates**

Product packaging mockup

```
Create a realistic product mockup showing [promo image] printed on the front of a premium packaging box. The box should have a clean, modern design with neutral colors and subtle details (like matte black with metallic trim). Place it on a natural surface like wood or marble. The promo image fills the main panel, with realistic shadows and reflections so it looks physically printed.
```

Indoor menu or poster

```
Generate an interior scene where [promo image] is displayed on a large illuminated menu board or poster frame. The setting could be a restaurant, café, or retail store. Use warm ambient lighting with people or furniture slightly blurred in the background. The promo image must appear crisp and naturally integrated into the board or frame.
```

Outdoor billboard or sign

```
Visualize [promo image] on a large outdoor billboard or building sign. Show the environment around it, such as a city street, a highway, or a busy plaza. The billboard should be brightly lit (spotlights at night, or natural daylight if daytime). Make sure the perspective is realistic, with the promo image stretched correctly across the billboard surface.
```

Digital device mockup

```
Create a lifestyle mockup showing [promo image] displayed on a digital device screen, such as a tablet, smartphone, or laptop. A person may be holding or using the device, with their hands and background softly blurred. The promo image should be clear and sharp on the screen, as if it’s an ad or landing page being viewed
```

### ⚡ Image Prompt Reference

Below are cheat sheets you can use when creating promo images. Although the lists may seem extensive, once you determine the visual style that works best for your brand, you can narrow them down to a short list of elements tailored to your needs.

#### Camera Angle Reference

| **Camera angle** | **Why it's used in advertising** | **How to use it in a prompt** |
| --- | --- | --- |
| Eye-level shot | Neutral and direct; creates a sense of equality and closeness with the viewer. | “eye-level view of \[subject\]” |
| Low angle | Makes the subject look powerful, dominant, or inspiring. | “low-angle shot of \[subject\] towering above” |
| High angle | Creates a feeling of vulnerability or makes the subject more approachable and less intimidating. | “high-angle view looking down on \[subject\]” |
| Top-down / bird's-eye view | Gives a full overview; useful for flat compositions, products on surfaces, or scene context. | “top-down overhead view of \[product\] on a table” |
| Close-up | Highlights details and textures; draws attention to the main product. | “close-up shot of \[product\] showing texture” |
| Medium shot | A balanced ratio of subject to context; works well for lifestyle ads. | “medium shot of \[person\] holding \[product\]” |
| Wide shot | Establishes the setting; creates scale and tells a story. | “wide shot of \[product\] within \[setting\]” |
| Dutch tilt (slanted angle) | Adds drama, energy, or tension; makes the scene more dynamic. | “dramatic Dutch tilt view of \[subject\]” |
| Point of view (POV) | Immerses the viewer in the action; creates a feeling of being part of it. | “POV shot looking at \[product\] in hand” |
| Extreme close-up | Focuses on tiny details; great for luxury or tactile objects. | “extreme close-up of \[product\] surface” |
| Over-the-shoulder shot | Adds context and narrative; creates a sense of a moment in action. | “over-the-shoulder view of \[person\] looking at \[product\]” |
| Worm's-eye view | A very low angle; exaggerates scale and grandeur. | “worm’s-eye view of \[subject\] rising above” |
| Three-quarter (3/4) view | Shows both the front and side of the product, giving it volume and shape. Essential for packaging, shoes, and tech products. | “three-quarter angle view of \[product\] showing front and side” |
| Top-front three-quarter | Shows the top surface and the front; highlights key design details and is popular for tabletop products. | “top-front three-quarter angle of \[product\] on a surface.” |

#### Lighting Reference

| Lighting technique | Why it's used in advertising | How to use it in a prompt |
| --- | --- | --- |
| High-key | A bright, low-contrast look that feels clean, friendly, and high-quality; great for e-commerce and cosmetics. | "high-key even lighting on \[product\] against bright background" |
| Low-key | Deep shadows and contrast for drama and luxury; highlights the main subject. | "low-key lighting with rich shadows around \[product\]" |
| Soft diffused | Wraps gently around shapes, flatteringly emphasizing and hiding flaws; ideal for people and lifestyle. | "soft diffused light through large diffuser on \[subject\]" |
| Hard directional | Crisp shadows that emphasize shape and texture; a strong graphic effect. | "hard directional key light casting defined shadow from \[product\]" |
| Three-point (key/fill/back) | A balanced, professional baseline with separation from the background. | "three-point setup: key, soft fill, and back rim on \[subject\]" |
| Backlight / halo | Highlights the edges so the subject stands out from the background; an elegant, high-quality look. | "backlight to create a rim glow around \[product\]" |
| Silhouette | Clear perception of shape and mood; great for iconic shapes and simple messages. | "backlit silhouette of \[subject\] with background brighter than subject" |
| Golden hour sunlight | A warm, flattering glow that signals authenticity and warmth. | "natural golden hour sunlight on \[subject\] outdoors" |
| Blue hour mixed ambient light | A cool atmosphere with city lights; a cinematic technique and lifestyle mood. | "blue hour ambient with practical lights behind \[subject\]" |
| Overcast window light | A giant softbox for natural, color-true product shots. | "north-facing window light with subtle bounce on \[product\]" |
| Practical lights / Neon | Real light sources add color and story; a trendy urban style. | "neon practicals illuminating \[subject\], ambient spill in scene" |
| Hero spotlight | Draws attention and creates a stage accent for a single call to action. | "tight spotlight pool centered on \[product\], falloff around edges" |
| Bright backlighting (glass/liquids) | Makes transparent objects glow and look clean; essential for beverages and skincare gels. | "strong backlight through \[liquid product\] for bright-field glow" |
| Dark-field edge highlighting (glossy/metallic) | Defines glossy shapes with elegant edges; minimizes reflections from the front. | "dark-field setup to create clean edge highlights on \[glossy product\]" |
| Gradient background | Adds depth behind the subject without clutter; an excellent catalog look. | "create smooth background light gradient behind \[product\]" |
| Negative fill | Deepens shadows on one side to create volume and contrast; controls flatness. | "negative fill on camera-right to add shadow shape to \[subject\]" |
| Gobo / Patterned shadows | Projects branded or natural patterns to add interest and depth. | "use gobo to cast patterned shadow across background behind \[product\]" |
| Cross-lighting for texture | Opposing light sources rake across surfaces to reveal the texture of fabric, food, or packaging. | "cross-light \[product\] from left and right to enhance texture" |
| Beauty / Butterfly (Paramount) | Flattering top-front light with a soft shadow under the nose; a classic for beauty and clean ads. | "beauty lighting from above camera with soft modifier on \[model\]" |
| Rembrandt | Natural, sculptural contrast with a characteristic triangle on the cheek; a serious and prestigious tone. | "Rembrandt-style key at ~45° with soft fill for \[subject\]" |
| Overhead soft light (food/table) | Creates appetizing highlights and crisp shadows on the tabletop. | "large overhead softbox above \[food/product\] with subtle fill" |

#### Image Aesthetic/Style Reference

| Image style | Why it's used in advertising | How to use it in a prompt |
| --- | --- | --- |
| Studio product photography | Clear, distraction-free focus on the product; the e-commerce standard. | "studio product photo of \[product\] on seamless background" |
| Lifestyle photography | Shows the product in real-life use to evoke empathy. | "lifestyle photo of \[person\] using \[product\] naturally" |
| Commercial editorial | Combines an aspirational lifestyle with polished branding. | "editorial style ad image of \[product\] with model" |
| Cinematic | Adds drama and mood; often used in luxury, tech, and story-driven ads. | "cinematic style with dramatic lighting on \[product\]" |
| Minimalist | Simplifies the visuals for clarity and elegance; high-end branding. | "minimalist composition with clean background and \[product\]" |
| Flat lay | Scenes shot from above; ideal for food, fashion, and packaging. | "flat lay photo of \[product\] on surface with props" |
| Modern still life | Controlled, artistic compositions; a high-end design feel. | "still life style product arrangement with \[product\]" |
| Documentary / Candid | Adds authenticity and intimacy; lifestyle and social-issue campaigns. | "candid documentary style shot of \[product\] in use" |
| High fashion / Editorial | Refined, bold, often surreal style; luxury branding. | "high fashion editorial shot of model with \[product\]" |
| Macro photography | Shows fine detail and texture; emphasizes quality. | "macro close-up of \[product\] surface detail" |
| Black and white | A timeless, bold, or serious tone; removes distracting color. | "black and white photo of \[product\]" |
| High contrast / vibrancy | Crisp separation and a vivid look; youth-oriented ads. | "high contrast, bold colors on \[product\]" |
| Vintage film | Nostalgic and warm; lifestyle campaigns with a retro touch. | "vintage film photo look of \[product\]" |
| Polaroid / Instant | Looks natural, personal, and authentic; youth branding. | "polaroid instant photo style of \[product\]" |
| Grainy analog | Adds texture and imperfection; creates a sense of independence or authenticity. | "grainy analog film look of \[product\]" |
| HDR realism | Hyper-detail, striking sharpness; strong visual impact. | "HDR style shot of \[product\]" |
| Surrealism | Eye-catching, fairy-tale visuals for bright ad campaigns. | "surreal composition with \[product\]" |
| Conceptual art | Abstract, idea-driven ads that provoke thought. | "conceptual art style image with \[product\]" |
| Collage / mixed media | Layered textures and cutouts; playful or artistic ads. | "mixed media collage composition featuring \[product\]" |
| Pop art | Bright color blocks and comic style; playful branding. | "pop art inspired ad with \[product\]" |
| Illustration overlay | A blend of photography and drawn elements; trendy, youthful branding. | "photo with hand-drawn illustration overlay around \[product\]" |
| Isometric / vector | A clean graphic look; great for tech device and packaging mockups. | "isometric vector illustration of \[product\]" |
| CGI realism | A perfect 3D render when photographing isn't possible. | "CGI render of \[product\] in realistic lighting" |
| Futuristic / Sci-fi | High-tech, sleek, and creative; used in ads for innovative products. | "futuristic sci-fi environment showcasing \[product\]" |
| Cyberpunk | Neon, gritty urban futurism; cutting-edge tech and lifestyle brands. | "cyberpunk neon-lit city with \[product\]" |
| Vaporwave / Y2K | A retro-digital, nostalgic aesthetic for Gen Z campaigns. | "vaporwave style ad with glowing grid and \[product\]" |
| Minimalist line art | Simplified illustration; chic packaging and graphics. | "minimal line art illustration of \[product\]" |
| Watercolor | A soft, organic, hand-made style; natural or artisanal branding. | "watercolor painting style of \[product\]" |
| Oil painting | A rich, classic style for brands with tradition. | "oil painting style of \[product\]" |
| Impressionism | Evokes a sense of movement and light; artistic branding. | "impressionist painting of \[product\]" |
| Cubism | Fragmented, abstract form; niche, artistic campaigns. | "cubist style rendering of \[product\]" |
| Surrealist painting | Distorted reality for bright, standout ads. | "surrealist Dali-inspired painting of \[product\]" |
| Vintage print collage | A magazine-cutout vibe; editorial retro style. | "vintage collage print of \[product\]" |
| Minimalist 3D / claymation | A soft, playful 3D render; packaging or app visuals. | "3D claymation look of \[product\]" |
| Toy photography | Makes products playful or collectible. | "toy-style miniaturized photo of \[product\]" |
| Diorama / Miniature | Creates a staged world around the product. | "miniature diorama setup with \[product\]" |
| Stop-motion aesthetic | An unusual, handmade style of advertising. | "stop-motion style frame of \[product\]" |
| Abstract geometry | A strong emphasis on design. | "abstract geometric background with \[product\]" |
| Typographic poster | Bold text integrated with visuals; graphic ads. | "graphic poster with large typography around \[product\]" |
| Bauhaus-inspired | Functional, geometric, bold primary colors. | "Bauhaus style graphic composition of \[product\]" |
| Art deco | Luxurious, ornate symmetry; a prestigious look. | "art deco style illustration of \[product\]" |
| Brutalism | Raw, bold, utilitarian; makes a statement. | "brutalist poster design featuring \[product\]" |
| Memphis design | Playful geometric patterns; youth-oriented. | "Memphis design style backdrop behind \[product\]" |
| Japanese-style minimalism / Muji | Calm, clean, functional; lifestyle branding. | "Muji-inspired minimalist photo of \[product\]" |
| Scandinavian | A warm, natural, and airy aesthetic. | "Scandinavian lifestyle scene with \[product\]" |
| Bohemian / indie | Organic, eclectic, authentic. | "bohemian indie style image of \[product\]" |
| Rustic / Farmhouse | Cozy, nostalgic, natural; food and home goods. | "rustic farmhouse kitchen scene with \[product\]" |
| Dark academia | Intellectual, melancholic, aesthetic. | "dark academia vibe shot of \[product\]" |
| Gothic | A dark, ornate, dramatic style. | "gothic inspired photo with \[product\]" |
| Epic fantasy | Mythical, magical, cinematic; a niche for games/books. | "fantasy epic illustration with \[product\]" |
| Anime / manga | Bold and stylized; niche fandom and pop-culture branding. | "anime manga illustration featuring \[product\]" |

* * *

### 🆓 Free Resources

**Videos**

> **Advanced Prompt Engineering Guide**

🔗 [Prompt Engineering Guide – Nextra](https://www.promptingguide.ai/) — A Comprehensive Overview of Prompt Engineering

> **Prompt Engineering Guide by OpenAI**

🔗 [platform.openai.com](https://platform.openai.com/docs/introduction)

* * *

* * *

## Business Creation Prompt

> 💡 Starting a business has never been this easy. Use our business creation mega-prompt to generate a business idea based on your budget and skills. You can also use it to develop an actionable plan and start building your business right away!

### ⚙️ Business Creator Prompt:

```
You will act as “Business Creator”. Business Creator’s purpose is helping people define an idea for their new business. It is meant to help people find their perfect business proposal in order to start their new business.
I want you to help me define my topic and give me a tailored idea that relates to it. You will first ask me what my current budget is and whether or not I have an idea in mind.
This is an example of something that Business Creator would say:
Business Creator: “What inspired you to start a business, and what are your personal and professional goals for the business?”
User: “I want to be my own boss and be more independent”
Business Creator: “Okay, I see, next question, What is your budget? Do you have access to additional funding?”
User: “My budget is 5000 dollars”
Business Creator: “Okay, let’s see how we can work with that. Next question, do you have an idea of the type of business you are interested in starting?”
User: “No, I don’t”
Business Creator: “Then, What are your interests, skills, and passions? What are some Businesses or industries that align with those areas?”
End of the example
Don't forget to ask for the User's Budget
If I don’t have an idea in mind, Business Creator will provide an idea based on the user’s budget by asking “If you don’t have a specific idea in mind I can provide you with one based on your budget.”(which you must have previously asked) but don’t assume the user doesn't have an idea in mind, only provide this information when asked.
These are some example questions that Business Creator will ask the user:
“Are you planning to go for a big business or a small one?”
“What are the problems or needs in the market that you could address with a business? Is there a gap that you can fill with a new product or service?”
“Who are your potential customers? What are their needs, preferences, and behaviors? How can you reach them?”
Business Creator will ask the questions one by one, waiting for the user’s answer. These questions' purpose is getting to know the user’s situation and preferences.
Business Creator will then provide the user with a very brief overview of a tailored business idea keeping the user’s budget and interests in mind. Business Creator will give the user a detailed overview of the startup-costs and risk factors. Business Creator will give the user this information in a short and concise way. Elaborating on it when asked. Business Creator role is to try and improve this idea and give me relevant and applicable advice.
This is how it should look like the final structure of the business proposal:
"Business name idea:" is an original and catchy name for the business;
"Description:": is a detailed description and explanation of the business proposal;
"Ideas for products: You will provide the user with some product ideas to launch;
"Advice": Overview of the risk factors and an approximation of how much time it would take to launch the product and to receive earnings;
"Startup Costs" You will provide a breakdown of the startup cost for the business with bullet points;
"More" literally just displays here:
"Tell me more - Step by step guide - Provide a new idea - External resources - or even make your own questions but write the "$" sign before entering the option;

Your first output is the name:
"# **Business Creator**" and besides it you should display:
"
"Made by **God of Prompt**",
create a new line with “—-“ and then kindly introduce yourself:
"Hello! I'm Business Creator, a highly developed AI that can help you bring any business idea to life or Business Creator life into your business. I will ask you some questions and you will answer them in the most transparent way possible. Whenever I feel that I have enough knowledge for generating your business plan I will provide it to you. Don't worry if you don't know the answer for a question, you can skip it and go to the next"
```

### ☑️ Personalization Options

-   My budget is \[amount\]
-   My skills are \[describe your skills\]
-   My passion is \[describe your passion\]
-   Describe your initial ideas, if you have any
-   Describe the resources you have free access to

* * *

### ➕ Additional Requests

-   Give me a realistic business plan to start putting this idea into action
-   What is the fastest way to start selling \[product/service\]?
-   Make a list of 20 tasks to develop the business idea above and rank them by priority

* * *

## Alex Hormozi Prompt

> 💡 Turn your AI into Alex Hormozi! This mega-prompt evaluates your offer and gives you practical advice on how to improve it to achieve the best possible result.

> **Step 1:** Run the first prompt, filling in \[DESCRIBE YOUR OFFER\] in as much detail as possible, including the context of your business and offer.

> **Step 2:** Run the second prompt after the AI responds.

> **Step 3:** Watch the magic happen!

Alex Hormozi's Value Equation

* * *

**This Dream Score mega-prompt calculates the value of your offer based on 4 parameters:**

**Dream Outcome** — what is the BEST possible result of this product?

**Perceived Likelihood of Achievement** — how likely is it that the buyer will reach the dream outcome? **Time Delay** — how long will it take to reach the dream outcome?

**Effort and Sacrifice —** how much effort must the buyer put in to reach the dream outcome?

To create irresistible offers, you need to maximize the dream outcome and the likelihood of achievement, and minimize the time delay, effort, and sacrifice.

### ⚙️ Dream Score Mega-Prompt:

* * *

```
#ROLE:
Act as Alex Hormozi and rate my offer.

#INFORMATION ABOUT ME:
- For context, my offer is to:
[DESCRIBE YOUR OFFER]

#RESPONSE GUIDELINES:
You should rate my offer based on Alex Hormozi's 4-part value equation framework:

1) How desirable is this offer's dream outcome from a scale of 1-100? ("Dream Score")
2) How high is the offer's perceived likelihood of achievement on a scale of 1-100? ("Success Score")
3) How high is the offer's perceived time delay between purchasing the product and reaching the promised achievement on a scale from 0 to 1? ("Time Score") The higher the time delay, the higher the score. Ideally, the perceived time delay should be as low as possible.
4) How high is the offer's perceived effort and sacrifice on a scale of 0 to 1? ("Effort Score") The higher the perceived effort, the higher the score. Ideally, the perceived effort and sacrifice should be as low as possible.

After rating each of the 4 components, calculate an "offer score", which is calculated like this:

1) Multiply "Dream Score" with  "Success Score"
2) Multiply "Time score" with "Effort Score"
3) Divide the product of the Dream & Success score with the product of the Time and Effort Score to get the "offer score"

#OUTPUT:
In your output, provide actionable advice for how I can tweak my offer to get a higher score on each of the 4 components of the value equation framework.

Also advice me on 2 other offer structures with higher offer score that I could consider instead of my current one, and explain why they have a higher score.
```

* * *

### Improve Your Offer (use after the first prompt)

```
Tweak this offer as much as you want so that it reaches a  perfect offer score of 1,000,000

(Dream Score = 100, Success Score = 100, Time Score = 0.1, Effort Score = 0.1)
```

* * *

## Deep Research Prompt

Create comprehensive research reports with this mega-prompt for ChatGPT, DeepSeek, Gemini, Perplexity, or Grok AI.

### ⚙️ What this mega-prompt does:

● Turns AI systems into professional research assistants that deliver comprehensive, fact-based analysis on any topic or task. ● Delivers academically rigorous research with proper citations, fact-checking, and balanced perspectives, taking your research beyond a basic web search. ● Creates structured, practical reports with innovative solutions and implementation frameworks tailored to your level of expertise. ● Saves you endless hours of manual research by systematically analyzing challenges, proposing solutions, and organizing the results into a professional report.

### 💡Tips:

● Phrase your research question specifically to get more focused and relevant results. ● State your level of expertise precisely so the AI can set the technical depth correctly. ● Use the response as a starting point for deeper research — review the sources provided and follow the links. ● For best results, try breaking complex research questions down into smaller, focused queries. ● Combine the results of several research sessions to build a comprehensive understanding of multifaceted topics.

### 🔍 Deep Research Automator Mega-Prompt

```
#CONTEXT:
Adopt the role of an expert researcher. Your task is to help the user by conducting thorough research on their specific challenge, regardless of field or industry.

#ROLE:
You are a comprehensive research analyst with expertise across multiple domains, capable of identifying challenges and proposing innovative solutions tailored to any field or subject matter.

#RESPONSE GUIDELINES:
1/ Identify Key Challenges:
Provide 5 major challenges in the specified domain.
For each challenge, include at least one verifiable data point with a specific source citation.
2/ Analyze Each Challenge:
Explain each challenge in detail, with clear attribution for all facts and statistics.
Address root causes, populations most affected, and existing attempts at solutions.
Important: Every factual claim must include a specific citation (author, publication, year, and if possible, URL).
3/ Propose Innovative Solutions:
For each challenge, propose a unique solution (software-based or otherwise as appropriate to the domain).
Cite relevant case studies, research papers, or examples where similar approaches have succeeded.
4/ Solution Framework:
Break down each solution into:

Core functionality and purpose
Key components or features
Value proposition with cited evidence of potential effectiveness
Implementation requirements (technical or otherwise)
Important: Cite specific sources for any claims about effectiveness or feasibility.
5/ Evidence Base:
Provide a dedicated "Sources and Evidence" section.
Number each source consecutively and use these numbers as in-text citations.
For each source, include:
Author(s) and publication date
Title of work
Publication/platform
URL
Brief note on the source's credibility and relevance

6/ Conclusion & Next Steps:
Summarize key insights with citations for major claims.
Provide an evidence-based action plan appropriate to the user's expertise level.
Suggest further research paths with specific, cited resources.

#TASK CRITERIA:
1/ Every significant claim must be cited—no exceptions.
2/ Adapt technical depth to match the user's indicated expertise level.
3/ Balance theoretical knowledge with practical applications.
4/ When uncertainty exists, clearly state limitations in current research while citing the most reliable available sources.
5/ Avoid presenting speculation as fact—clearly distinguish between established knowledge (with citations) and informed suggestions.

#INFORMATION ABOUT ME:
My subject or area of interest: [YOUR SUBJECT OR AREA OF INTEREST]
My expertise level: [BEGINNER/INTERMEDIATE/ADVANCED]
My specific research question or challenge: [YOUR SPECIFIC QUESTION]

#RESPONSE FORMAT:
- Use clear section headings and subheadings for navigation.
- Apply bullet points for clarity where appropriate.
- Include numbered citations in parentheses after each factual claim.
- Provide a dedicated "Sources and Evidence" section at the end.
- Close with a practical, actionable summary that references key sources.
```

### ❓How to use the prompt:

● Replace \[YOUR SUBJECT OR AREA OF INTEREST\] with a specific research area (for example, "renewable energy," "consumer psychology," or "supply chain management").

● Choose your level of expertise from \[BEGINNER/INTERMEDIATE/ADVANCED/EXPERT\] so the research matches your knowledge and technical understanding.

● State \[YOUR SPECIFIC QUESTION\] clearly, with as much detail as possible — the more specific your question, the more valuable the research results will be.

● Optional: add any relevant information in the additional information field to help guide the research (for example, "Focus on North American markets" or "Interested in small business applications").

● Example: for research on climate change, you could enter:

-   Topic: "Climate change adaptation strategies"
-   Expertise level: "Intermediate"
-   Specific question: "Which measures for adapting urban infrastructure to sea level rise in coastal cities are the most cost-effective?"

### 💡Additional Tips:

● Combine this prompt with several AI tools (Perplexity, ChatGPT, Grok) to cross-check results and fill knowledge gaps across different platforms. ● Break complex research topics into sequential sessions — start with a general overview, then use follow-up sessions to dig deeper into specific aspects. ● Ask for a variety of sources by adding "Please include academic, industry, and government sources" to ensure a balanced perspective and comprehensive coverage. ● Save your research results in a dedicated knowledge management system for future use and to gradually build a personalized research database. ● For topics that require up-to-date information, specify "Please prioritize sources from the last 1–2 years" to get the most current research and data. ● When researching controversial topics, add "Please present multiple points of view with supporting evidence" to avoid one-sided analysis. ● For implementation-focused research, ask for specific case studies in which similar solutions were successfully implemented in comparable settings. ● Consider building a series of studies by conducting an initial broad study and then using the identified problems as separate, focused research queries.

* * *

## 🚀 Prompt Generator for Any Task: [Google Gemini](https://gemini.google.com/gem/1GQ__SJmrzWIGx_6mdPvONsu9EbtLXiej?usp=sharing)

* * *

## 🆓Free Resources

**Videos**

🔗 [Google Gemini: PRO Tutorial for Beginners (2025)](https://youtu.be/8aRJYpExTfs) — This Google Gemini tutorial takes you through everything you need to know to get started with Google’s AI powerhouse in 2025! 🌎 Follow along ➜ https://gemini.google.com Here’s what you’ll learn: First, we’ll break down what Google Gemini is, how it compares to

🔗 [Master 85% of Google Gemini in 12 Minutes (2025)](https://youtu.be/Uy6LcpyGj7w) — 📈 The Workspace Academy - https://academy.jeffsu.org/workspace-academy?utm\_source=youtube&utm\_medium=video&utm\_campaign=179 In this video you’ll learn practical #Gemini skills that won't become obsolete tomorrow. We cover essential setup tips, when to use Flas

🔗 [Google Gemini 2.5 Pro is Insane...](https://youtu.be/RxCZhltR9Cw) — Join My Newsletter for Regular AI Updates 👇🏼 https://forwardfuture.ai My Links 🔗 👉🏻 Subscribe: https://www.youtube.com/@matthew\_berman 👉🏻 Twitter: https://twitter.com/matthewberman 👉🏻 Discord: https://discord.gg/xxysSXBxFW 👉🏻 Patreon: https://patreon.com/Matth

**Articles and Blogs About Gemini**

🔗 [13 simple Google Gemini tips and tricks for maximum productivity](https://www.androidpolice.com/gemini-productivity-tips-and-tricks) — These 13 Google Gemini tips can help you make the most out of your time in both personal and professional parts of your life

🔗 [6 tips to get the most out of Gemini Deep Research](https://blog.google/products/gemini/tips-how-to-use-deep-research) — Learn more about using Google’s Deep Research, an AI assistant that helps you explore complex topics and delivers detailed reports.

🔗 [Get the latest news about Google Gemini](https://gemini.google/latest-news/#drops) — Stay informed about new features, enhancements, and changes to the Gemini AI model, and new ways Gemini is used.

> **Advanced Prompting Guide**

🔗 [Prompt Engineering Guide – Nextra](https://www.promptingguide.ai/) — A Comprehensive Overview of Prompt Engineering

> **OpenAI Prompt Engineering Guide**

🔗 [platform.openai.com](https://platform.openai.com/docs/introduction)

> [Other resources](#other-resources)

## Other resources

| **Top GitHub AI repositories** |  | **Top YouTube channels** |  |  | **Top AI blogs** |  |
| --- | --- | --- | --- | --- | --- | --- |
| [#artificial-intelligence](https://github.com/topics/artificial-intelligence) 7.7k repositories |  | **Name** | **Links** |  | **Name** | **Links** |
| [#ai](https://github.com/topics/ai) 6.3k repositories |  | Lex Fridman | [https://www.youtube.com/channel/UCSHZKyawb77ixDdsGog4iWA/videos](https://www.youtube.com/channel/UCSHZKyawb77ixDdsGog4iWA/videos) |  | OpenAI | [https://openai.com/blog/](https://openai.com/blog/) |
| [#artificial-intelligence-algorithms](https://github.com/topics/artificial-intelligence-algorithms) 321 repositories |  | AI Angel | [https://www.youtube.com/channel/UC2gyBYnMGTCVTEc6UM1gt-A/videos](https://www.youtube.com/channel/UC2gyBYnMGTCVTEc6UM1gt-A/videos) |  | Machine Learning Mastery | [https://machinelearningmastery.com/blog/](https://machinelearningmastery.com/blog/) |
| [#artificial-general-intelligence](https://github.com/topics/artificial-general-intelligence) 62 repositories |  | Sirajology | [https://www.youtube.com/channel/UCWN3xxRkmTPmbKwht9FuE5A/videos](https://www.youtube.com/channel/UCWN3xxRkmTPmbKwht9FuE5A/videos) |  | AWS » Machine Learning | [https://aws.amazon.com/blogs/machine-learning/](https://aws.amazon.com/blogs/machine-learning/) |
| [#explainable-artificial-intelligence](https://github.com/topics/explainable-artificial-intelligence) 39 repositories |  | DeepMind | [https://www.youtube.com/channel/UCP7jMXSY2xbc3KCAE0MHQ-A/videos](https://www.youtube.com/channel/UCP7jMXSY2xbc3KCAE0MHQ-A/videos) |  | BAIR | [https://bair.berkeley.edu/blog/](https://bair.berkeley.edu/blog/) |
| [#udacity-artificial-intelligence](https://github.com/topics/udacity-artificial-intelligence) 17 repositories |  | Murtaza's Workshop - Robotics and AI | [https://www.youtube.com/channel/UCYUjYU5FveRAscQ8V21w81A/videos](https://www.youtube.com/channel/UCYUjYU5FveRAscQ8V21w81A/videos) |  | Google AI Blog | [https://ai.googleblog.com/](https://ai.googleblog.com/) |
| [#comp430-artificial-intelligence](https://github.com/topics/comp430-artificial-intelligence) 16 repositories |  | AI News | [https://www.youtube.com/channel/UCDZfn935vwaahDabsfylfIQ/videos](https://www.youtube.com/channel/UCDZfn935vwaahDabsfylfIQ/videos) |  | Analytics Vidhya Blog | [https://www.analyticsvidhya.com/blog/](https://www.analyticsvidhya.com/blog/) |
| [#game-artificial-intelligence](https://github.com/topics/game-artificial-intelligence) 13 repositories |  | All About AI | [https://www.youtube.com/channel/UCR9j1jqqB5Rse69wjUnbYwA/videos](https://www.youtube.com/channel/UCR9j1jqqB5Rse69wjUnbYwA/videos) |  | Towards Data Science | [https://towardsdatascience.com/](https://towardsdatascience.com/) |
| [#ethical-artificial-intelligence](https://github.com/topics/ethical-artificial-intelligence) 12 repositories |  | Artificial Intelligence News Daily | [https://www.youtube.com/channel/UCItylrp-EOkBwsUT7c\_Xkxg/videos](https://www.youtube.com/channel/UCItylrp-EOkBwsUT7c_Xkxg/videos) |  | MIT News - Artificial intelligence | [https://news.mit.edu/topic/artificial-intelligence2](https://news.mit.edu/topic/artificial-intelligence2) |
| [#artificial-intelligence-projects](https://github.com/topics/artificial-intelligence-projects) 8 repositories |  | Yannic Kilcher | [https://www.youtube.com/channel/UCZHmQk67mSJgfCCTn7xBfew/videos](https://www.youtube.com/channel/UCZHmQk67mSJgfCCTn7xBfew/videos) |  | MarkTechPost | [https://www.marktechpost.com/](https://www.marktechpost.com/) |
| [#usg-artificial-intelligence](https://github.com/topics/usg-artificial-intelligence) 8 repositories |  | DeepLearningAI | [https://www.youtube.com/channel/UCcIXc5mJsHVYTZR1maL5l9w/videos](https://www.youtube.com/channel/UCcIXc5mJsHVYTZR1maL5l9w/videos) |  | DeepMind - News & Blog | [https://deepmind.com/blog/](https://deepmind.com/blog/) |
| [#general-artificial-intelligence](https://github.com/topics/general-artificial-intelligence) 6 repositories |  | AI and Games | [https://www.youtube.com/channel/UCov\_51F0betb6hJ6Gumxg3Q/videos](https://www.youtube.com/channel/UCov_51F0betb6hJ6Gumxg3Q/videos) |  | Apple Machine Learning Research | [https://machinelearning.apple.com/](https://machinelearning.apple.com/) |
| [#artificial-intelligence-framework](https://github.com/topics/artificial-intelligence-framework) 5 repositories |  | Machine Learning Street Talk | [https://www.youtube.com/channel/UCMLtBahI5DMrt0NPvDSoIRQ/videos](https://www.youtube.com/channel/UCMLtBahI5DMrt0NPvDSoIRQ/videos) |  | MIT Technology Review » Artificial Intelligence | [https://www.technologyreview.com/topic/artificial-intelligence/](https://www.technologyreview.com/topic/artificial-intelligence/) |
| [#strong-artificial-intelligence](https://github.com/topics/strong-artificial-intelligence) 5 repositories |  | What is Artificial Intelligence | [https://www.youtube.com/channel/UCUzGQrN-lyyc0BWTYoJM\_Sg/videos](https://www.youtube.com/channel/UCUzGQrN-lyyc0BWTYoJM_Sg/videos) |  | ScienceDaily - Artificial Intelligence News | [https://www.sciencedaily.com/news/computers\_math/artificial\_intelligence/](https://www.sciencedaily.com/news/computers_math/artificial_intelligence/) |
| [#artificial-intelligence-based-game](https://github.com/topics/artificial-intelligence-based-game) 3 repositories |  | Dudesy | [https://www.youtube.com/channel/UCO7QB0sO4vPkCNltYTb33qw/videos](https://www.youtube.com/channel/UCO7QB0sO4vPkCNltYTb33qw/videos) |  | KDnuggets | [https://www.kdnuggets.com/news/index.html](https://www.kdnuggets.com/news/index.html) |
| [#artificial-intelligence-models](https://github.com/topics/artificial-intelligence-models) 3 repositories |  | #ONPASSIVE Chris Johnson | [https://www.youtube.com/channel/UCd6O7zOkRCvjCKD2uNx3R9g/videos](https://www.youtube.com/channel/UCd6O7zOkRCvjCKD2uNx3R9g/videos) |  | Artificial Intelligence with Lex Fridman | [https://lexfridman.com/ai/](https://lexfridman.com/ai/) |
| [#artificial-intelligence-literatures](https://github.com/topics/artificial-intelligence-literatures) 2 repositories |  | Robert Miles | [https://www.youtube.com/channel/UCLB7AzTwc6VFZrBsO2ucBMg/videos](https://www.youtube.com/channel/UCLB7AzTwc6VFZrBsO2ucBMg/videos) |  | O'Reilly Media » AI & ML | [https://www.oreilly.com/radar/topics/ai-ml/](https://www.oreilly.com/radar/topics/ai-ml/) |
| [#artificial-intelligence-vuw](https://github.com/topics/artificial-intelligence-vuw) 2 repositories |  | MITCSAIL | [https://www.youtube.com/channel/UCBpxspUNl1Th33XbugiHJzw/videos](https://www.youtube.com/channel/UCBpxspUNl1Th33XbugiHJzw/videos) |  | Industrial AI blog | [https://www.hitachi.com/rd/sc/aiblog/index.html](https://www.hitachi.com/rd/sc/aiblog/index.html) |
| [#logic-based-artificial-intelligence](https://github.com/topics/logic-based-artificial-intelligence) 2 repositories |  | Super Data Science Podcast with Jon Krohn | [https://www.youtube.com/channel/UCMbtqTGdSsxYYhhTpV4lSTQ/videos](https://www.youtube.com/channel/UCMbtqTGdSsxYYhhTpV4lSTQ/videos) |  | Artificial Lawyer | [https://www.artificiallawyer.com/](https://www.artificiallawyer.com/) |
| [#artificial-intelligence-requests](https://github.com/topics/artificial-intelligence-requests) 2 repositories |  | SingularityNET | [https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw/videos](https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw/videos) |  | Marketing Artificial Intelligence Institute | [https://www.marketingaiinstitute.com/blog](https://www.marketingaiinstitute.com/blog) |
| [#android-artificial-intelligence](https://github.com/topics/android-artificial-intelligence) 2 repositories |  | Nicolai Nielsen - Computer Vision & AI | [https://www.youtube.com/channel/UCpABUkWm8xMt5XmGcFb3EFg/videos](https://www.youtube.com/channel/UCpABUkWm8xMt5XmGcFb3EFg/videos) |  | [Unite.AI](http://unite.ai/) | [https://www.unite.ai/](https://www.unite.ai/) |
| [#artificial-intelligence-application](https://github.com/topics/artificial-intelligence-application) 2 repositories |  | [H2O.ai](http://h2o.ai/) | [https://www.youtube.com/channel/UCk6ONJlPzjw3DohAeMSgsng/videos](https://www.youtube.com/channel/UCk6ONJlPzjw3DohAeMSgsng/videos) |  | TOPBOTS | [https://www.topbots.com/](https://www.topbots.com/) |
| [#quantum-artificial-intelligence](https://github.com/topics/quantum-artificial-intelligence) 2 repositories |  | Jordan Harrod | [https://www.youtube.com/channel/UC1H1NWNTG2Xi3pt85ykVSHA/videos](https://www.youtube.com/channel/UC1H1NWNTG2Xi3pt85ykVSHA/videos) |  | AIIOT Artificial Intelligence | Internet of Things | Technology | [https://www.aiiottalk.com/](https://www.aiiottalk.com/) |
| [#symbolic-artificial-intelligence](https://github.com/topics/symbolic-artificial-intelligence) 2 repositories |  | MITCSAIL | Computer Science Videos | [https://www.youtube.com/channel/UCBpxspUNl1Th33XbugiHJzw](https://www.youtube.com/channel/UCBpxspUNl1Th33XbugiHJzw) |  | AI Time Journal | [https://www.aitimejournal.com/](https://www.aitimejournal.com/) |
| [#insight-artificial-intelligence](https://github.com/topics/insight-artificial-intelligence) 1 repository |  | Rithesh Sreenivasan | [https://www.youtube.com/channel/UCPAfv1GeraR1WM0608He6ow/videos](https://www.youtube.com/channel/UCPAfv1GeraR1WM0608He6ow/videos) |  | MarkTechPost » Artificial Intelligence | [https://www.marktechpost.com/category/technology/artificial-intelligence/](https://www.marktechpost.com/category/technology/artificial-intelligence/) |
| [#embodied-artificial-intelligence](https://github.com/topics/embodied-artificial-intelligence) 1 repository |  | Modern CTO | [https://www.youtube.com/channel/UC4YUUOGVl9WByBuF1n\_DGOQ/videos](https://www.youtube.com/channel/UC4YUUOGVl9WByBuF1n_DGOQ/videos) |  | Chatbot's Life | [https://chatbotslife.com/](https://chatbotslife.com/) |
| [#advanced-artificial-intelligence](https://github.com/topics/advanced-artificial-intelligence) 1 repository |  | Sportsbox AI | [https://www.youtube.com/channel/UCFwvVj4P1DLph9oJlPN0MfQ/videos](https://www.youtube.com/channel/UCFwvVj4P1DLph9oJlPN0MfQ/videos) |  | WGMI Media | [https://wgmimedia.com/](https://wgmimedia.com/) |
| [#artificial-intelligence-news](https://github.com/topics/artificial-intelligence-news) 1 repository |  | James Briggs | [https://www.youtube.com/channel/UCv83tO5cePwHMt1952IVVHw/videos](https://www.youtube.com/channel/UCv83tO5cePwHMt1952IVVHw/videos) |  | ΑΙhub | [https://aihub.org/](https://aihub.org/) |
| [#artificial-intelligence-microsoft](https://github.com/topics/artificial-intelligence-microsoft) 1 repository |  | Baidu Inc. | [https://www.youtube.com/channel/UCm08TSsp87RRfn9SB\_khuUQ/videos](https://www.youtube.com/channel/UCm08TSsp87RRfn9SB_khuUQ/videos) |  | Nanonets | [https://nanonets.com/blog/](https://nanonets.com/blog/) |
| [#artificial-intelligence-udacity](https://github.com/topics/artificial-intelligence-udacity) 1 repository |  | Artificial Intelligence and Blockchain | [https://www.youtube.com/channel/UCddWXtzVfG5R4YLqJ5IZ2OQ/videos](https://www.youtube.com/channel/UCddWXtzVfG5R4YLqJ5IZ2OQ/videos) |  | Data Machina | [https://datamachina.substack.com/](https://datamachina.substack.com/) |
| [#artificial-intelligence-robotics](https://github.com/topics/artificial-intelligence-robotics) 1 repository |  | InsiderPhD | [https://www.youtube.com/channel/UCPiN9NPjIer8Do9gUFxKv7A/videos](https://www.youtube.com/channel/UCPiN9NPjIer8Do9gUFxKv7A/videos) |  | Zeroth Principles of AI | [https://zerothprinciples.substack.com/](https://zerothprinciples.substack.com/) |
| [#artificial-intelligence-systems](https://github.com/topics/artificial-intelligence-systems) 1 repository |  | This Week in Machine Learning & AI | [https://www.youtube.com/channel/UC7kjWIK1H8tfmFlzZO-wHMw/videos](https://www.youtube.com/channel/UC7kjWIK1H8tfmFlzZO-wHMw/videos) |  | Becoming Human | [https://becominghuman.ai/](https://becominghuman.ai/) |
| [#artificial-intelligence-for-android](https://github.com/topics/artificial-intelligence-for-android) 1 repository |  | AI for Good | [https://www.youtube.com/channel/UC4e35vN3-tSBZMNLE-wm45A/videos](https://www.youtube.com/channel/UC4e35vN3-tSBZMNLE-wm45A/videos) |  | AIMultiple | [https://research.aimultiple.com/](https://research.aimultiple.com/) |
| [#javascript-artificial-intelligence](https://github.com/topics/javascript-artificial-intelligence) 1 repository |  | Venelin Valkov | [https://www.youtube.com/channel/UCoW\_WzQNJVAjxo4osNAxd\_g/videos](https://www.youtube.com/channel/UCoW_WzQNJVAjxo4osNAxd_g/videos) |  | Great Learning » Artificial Intelligence | [https://www.greatlearning.in/blog/category/artificial-intelligence/](https://www.greatlearning.in/blog/category/artificial-intelligence/) |
| [#home-artificial-intelligence](https://github.com/topics/home-artificial-intelligence) 1 repository |  | Global AI Summit | [https://www.youtube.com/channel/UChCxaXJEtSbngEsmyR0vrfg/videos](https://www.youtube.com/channel/UChCxaXJEtSbngEsmyR0vrfg/videos) |  | Clarifai Blog | Artificial Intelligence in Action | [https://www.clarifai.com/blog](https://www.clarifai.com/blog) |
| [#artificial-intelligence-courses](https://github.com/topics/artificial-intelligence-courses) 1 repository |  | Eye on AI | [https://www.youtube.com/channel/UC-o9u9QL4zXzBwjvT1gmzNg/videos](https://www.youtube.com/channel/UC-o9u9QL4zXzBwjvT1gmzNg/videos) |  | Artificial Intelligence + | [https://www.aiplusinfo.com/](https://www.aiplusinfo.com/) |
| [#artificial-intelligence-project](https://github.com/topics/artificial-intelligence-project) 1 repository |  | Micah | [https://www.youtube.com/channel/UCR8AYtETKgrq95L1usEdvMw/videos](https://www.youtube.com/channel/UCR8AYtETKgrq95L1usEdvMw/videos) |  | Unbabel Blog | [https://resources.unbabel.com/blog](https://resources.unbabel.com/blog) |
| [#artificial-intelligence-search](https://github.com/topics/artificial-intelligence-search) 1 repository |  | Valerio Velardo - The Sound of AI | [https://www.youtube.com/channel/UCZPFjMe1uRSirmSpznqvJfQ/videos](https://www.youtube.com/channel/UCZPFjMe1uRSirmSpznqvJfQ/videos) |  | Omdena | [https://omdena.com/blog/](https://omdena.com/blog/) |
| [#axplainable-artificial-intelligence](https://github.com/topics/axplainable-artificial-intelligence) 1 repository |  | HuggingFace | [https://www.youtube.com/channel/UCHlNU7kIZhRgSbhHvFoy72w/videos](https://www.youtube.com/channel/UCHlNU7kIZhRgSbhHvFoy72w/videos) |  | Big Data Analytics News | [https://bigdataanalyticsnews.com/category/artificial-intelligence/](https://bigdataanalyticsnews.com/category/artificial-intelligence/) |
| [#artificial-intelligence-algorithm](https://github.com/topics/artificial-intelligence-algorithm) 1 repository |  | Aleksa Gordiu0107 - The AI Epiphany | [https://www.youtube.com/channel/UCj8shE7aIn4Yawwbo2FceCQ/videos](https://www.youtube.com/channel/UCj8shE7aIn4Yawwbo2FceCQ/videos) |  | [Kore.ai](http://kore.ai/) | [https://blog.kore.ai/](https://blog.kore.ai/) |
| [#artificial-intelligence-features](https://github.com/topics/artificial-intelligence-features) 1 repository |  | lablab ai | [https://www.youtube.com/channel/UCaE6vKQAj2V65aw682BZyJg/videos](https://www.youtube.com/channel/UCaE6vKQAj2V65aw682BZyJg/videos) |  | Singularity Weblog | [https://www.singularityweblog.com/blog/](https://www.singularityweblog.com/blog/) |
| [#artificial-intelligence-python](https://github.com/topics/artificial-intelligence-python) 1 repository |  | Stanford HAI | [https://www.youtube.com/channel/UChugFTK0KyrES9terTid8vA/videos](https://www.youtube.com/channel/UChugFTK0KyrES9terTid8vA/videos) |  | RStudio AI Blog | [https://blogs.rstudio.com/ai/](https://blogs.rstudio.com/ai/) |
|  |  | AI Sciences | [https://www.youtube.com/channel/UC8kFF39hsRrFfHM6-7A6APQ/videos](https://www.youtube.com/channel/UC8kFF39hsRrFfHM6-7A6APQ/videos) |  | Inbenta Blog | [https://www.inbenta.com/en/blog/](https://www.inbenta.com/en/blog/) |
|  |  | AI Coffee Break with Letitia | [https://www.youtube.com/channel/UCobqgqE4i5Kf7wrxRxhToQA/videos](https://www.youtube.com/channel/UCobqgqE4i5Kf7wrxRxhToQA/videos) |  | Expert System - Artificial Intelligence: Cognitive Computing Company | [https://expertsystem.com/blog/](https://expertsystem.com/blog/) |
|  |  | AI & Robots | [https://www.youtube.com/channel/UCi-vwe-lm\_tgxEdlxf690Aw/videos](https://www.youtube.com/channel/UCi-vwe-lm_tgxEdlxf690Aw/videos) |  | Mantra Labs | [https://www.mantralabsglobal.com/blog/](https://www.mantralabsglobal.com/blog/) |
|  |  | Nachiketa Hebbar | [https://www.youtube.com/channel/UCJPihOKkiT7TqP7NK9-GtuQ/videos](https://www.youtube.com/channel/UCJPihOKkiT7TqP7NK9-GtuQ/videos) |  | Yseop Blog | [https://www.yseop.com/resources?field\_article\_type\_target\_id=19](https://www.yseop.com/resources?field_article_type_target_id=19) |
|  |  | Scale AI | [https://www.youtube.com/channel/UCAHS4cP-uIXdrpCsSfGq\_OA/videos](https://www.youtube.com/channel/UCAHS4cP-uIXdrpCsSfGq_OA/videos) |  | MassTLC | Artificial Intelligence | [https://www.masstlc.org/category/ai/](https://www.masstlc.org/category/ai/) |
|  |  | RE•WORK | [https://www.youtube.com/channel/UCvgcuMHIa0STHmqvA4yaRuQ/videos](https://www.youtube.com/channel/UCvgcuMHIa0STHmqvA4yaRuQ/videos) |  | Cogito Tech | [https://www.cogitotech.com/blog/](https://www.cogitotech.com/blog/) |
|  |  | Leo Isikdogan | [https://www.youtube.com/channel/UC-YAxUbpa1hvRyfJBKFNcJA/videos](https://www.youtube.com/channel/UC-YAxUbpa1hvRyfJBKFNcJA/videos) |  | Fusemachines Insights | [https://insights.fusemachines.com/](https://insights.fusemachines.com/) |
|  |  | AI Joe: Artificial Intelligence for everyone. | [https://www.youtube.com/channel/UCQNwUIEiiUrAsHJOOvkGhVA/videos](https://www.youtube.com/channel/UCQNwUIEiiUrAsHJOOvkGhVA/videos) |  | TechSpective | Artificial Intelligence | [https://techspective.net/category/technology/artificial-intelligence/](https://techspective.net/category/technology/artificial-intelligence/) |
|  |  | The AI Author | [https://www.youtube.com/channel/UCphOzyQUeVHsmUOGy1f3-cA/videos](https://www.youtube.com/channel/UCphOzyQUeVHsmUOGy1f3-cA/videos) |  | Marek Rosa - Goodai Blog | [https://blog.marekrosa.org/](https://blog.marekrosa.org/) |
|  |  | Talking To AI | [https://www.youtube.com/channel/UCzZ\_vsqnKIpG1rIHo3O\_S\_Q/videos](https://www.youtube.com/channel/UCzZ_vsqnKIpG1rIHo3O_S_Q/videos) |  | Isentia | [https://www.isentia.com/latest-reads/](https://www.isentia.com/latest-reads/) |
|  |  | Lightning AI | [https://www.youtube.com/channel/UC8m-y0yAFJpX0hRvxH8wJVw/videos](https://www.youtube.com/channel/UC8m-y0yAFJpX0hRvxH8wJVw/videos) |  | Machine Intelligence Research Institute Blog | [https://intelligence.org/blog/](https://intelligence.org/blog/) |
|  |  | The Robot Brains Podcast | [https://www.youtube.com/channel/UCXNviQjBONXljxkJzNV-Xbw/videos](https://www.youtube.com/channel/UCXNviQjBONXljxkJzNV-Xbw/videos) |  | USM Systems | [https://usmsystems.com/blog/](https://usmsystems.com/blog/) |
|  |  | Amii Intelligence | [https://www.youtube.com/channel/UCxxisInVr7upxv1yUhSgdBA/videos](https://www.youtube.com/channel/UCxxisInVr7upxv1yUhSgdBA/videos) |  | Iris AI Your Science Assistant | [https://iris.ai/blog/](https://iris.ai/blog/) |
|  |  | Pradip Nichite | [https://www.youtube.com/channel/UC3-uyUX8s536lUkrWwYvfDg/videos](https://www.youtube.com/channel/UC3-uyUX8s536lUkrWwYvfDg/videos) |  | United States Artificial Intelligence Institute (USAII) | [https://www.usaii.org/ai-insights](https://www.usaii.org/ai-insights) |
|  |  | Allen Institute for Artificial Intelligence (AI2) | [https://www.youtube.com/channel/UCEqgmyWChwvt6MFGGlmUQCQ/videos](https://www.youtube.com/channel/UCEqgmyWChwvt6MFGGlmUQCQ/videos) |  | AI World School | [https://aiworldschool.com/](https://aiworldschool.com/) |
|  |  | Marketing AI Institute | [https://www.youtube.com/channel/UCdHpbfqjELZmhqY3k0ELGcQ/videos](https://www.youtube.com/channel/UCdHpbfqjELZmhqY3k0ELGcQ/videos) |  | Dan Rose AI | Applied AI Blog | [https://www.danrose.ai/blog](https://www.danrose.ai/blog) |
|  |  | OpenCV AI | [https://www.youtube.com/channel/UCpRd2pU-0\_fHVutdregb8XQ/videos](https://www.youtube.com/channel/UCpRd2pU-0_fHVutdregb8XQ/videos) |  | Artificial Intelligence Weekly News - Weekly newsletter on Deep Learning & AI | [https://aiweekly.co/](https://aiweekly.co/) |
|  |  | Meta AI | [https://www.youtube.com/channel/UC5qxlwEKM7-5YZudb24l0bg/videos](https://www.youtube.com/channel/UC5qxlwEKM7-5YZudb24l0bg/videos) |  | Robot Writers AI | [https://robotwritersai.com/](https://robotwritersai.com/) |
|  |  | Brain Inspired | [https://www.youtube.com/channel/UCZCA4LUirmPL61KHeUC0YRQ/videos](https://www.youtube.com/channel/UCZCA4LUirmPL61KHeUC0YRQ/videos) |  | Brighterion | [https://brighterion.com/blog/](https://brighterion.com/blog/) |
|  |  | AI with Alex | [https://www.youtube.com/channel/UCkJV9VaWUY-x3zmDaDEz9Zg/videos](https://www.youtube.com/channel/UCkJV9VaWUY-x3zmDaDEz9Zg/videos) |  | SAAL - Insight | [https://saal.ai/insights/](https://saal.ai/insights/) |
|  |  | AI Business TV | [https://www.youtube.com/channel/UCwmoMKH9piP9BPL7cNVdAGA/videos](https://www.youtube.com/channel/UCwmoMKH9piP9BPL7cNVdAGA/videos) |  | DLabs.AI Blog | [https://dlabs.ai/blog/](https://dlabs.ai/blog/) |
|  |  | Applitools - Automated Visual Testing | Youtube | [https://www.youtube.com/channel/UCk13Ucc26mWqI4xvsbO13jw/videos](https://www.youtube.com/channel/UCk13Ucc26mWqI4xvsbO13jw/videos) |  | [DLabs.AI](http://dlabs.ai/) | [https://dlabs.ai/blog/](https://dlabs.ai/blog/) |
|  |  | AI Planet | [https://www.youtube.com/channel/UCqBbIn5Er4HevFg1wkeu-8A/videos](https://www.youtube.com/channel/UCqBbIn5Er4HevFg1wkeu-8A/videos) |  | Visionify Blog | [https://visionify.ai/blog/](https://visionify.ai/blog/) |
|  |  | Explosion | [https://www.youtube.com/channel/UCFduT4kW\_eLDbEW6XoA5F0A/videos](https://www.youtube.com/channel/UCFduT4kW_eLDbEW6XoA5F0A/videos) |  | NeuroSYS | [https://neurosys.com/blog/](https://neurosys.com/blog/) |
|  |  | Learn Robotics and AI | [https://www.youtube.com/channel/UCOXHwUny8BePng1gXxIe-PA/videos](https://www.youtube.com/channel/UCOXHwUny8BePng1gXxIe-PA/videos) |  | Pandio Blog | [https://pandio.com/blog/](https://pandio.com/blog/) |
|  |  | AI Institute at UofSC - #AIISC | [https://www.youtube.com/channel/UCORqXk1ZV44MOwpCorAROyQ/videos](https://www.youtube.com/channel/UCORqXk1ZV44MOwpCorAROyQ/videos) |  | [viAct.ai](http://viact.ai/) | [https://www.viact.ai/blogs](https://www.viact.ai/blogs) |
|  |  | Quickchat AI | [https://www.youtube.com/channel/UCJk2SankQwz0dkjt6l8DP8Q/videos](https://www.youtube.com/channel/UCJk2SankQwz0dkjt6l8DP8Q/videos) |  | Find New AI | [https://findnewai.com/](https://findnewai.com/) |
|  |  | John Snow Labs | [https://www.youtube.com/channel/UCmFOjlpYEhxf\_wJUDuz6xxQ/videos](https://www.youtube.com/channel/UCmFOjlpYEhxf_wJUDuz6xxQ/videos) |  | Computational Intelligence | [http://computational-intelligence.blogspot.com/](http://computational-intelligence.blogspot.com/) |
|  |  | AI tutorials | [https://www.youtube.com/channel/UCMSTMj4T1\_un2z7zvKldfKw/videos](https://www.youtube.com/channel/UCMSTMj4T1_un2z7zvKldfKw/videos) |  | MetaDevo AI Blog | [http://metadevo.com/](http://metadevo.com/) |
|  |  | Global AI Community | [https://www.youtube.com/channel/UCDVL0bPrZHwCeJrlyy-wxaQ/videos](https://www.youtube.com/channel/UCDVL0bPrZHwCeJrlyy-wxaQ/videos) |  | AI 2 People | [https://ai2people.com/](https://ai2people.com/) |
|  |  | Jay Shah | [https://www.youtube.com/channel/UCdZ0GX-F3ULMKfxtyzSFbaw/videos](https://www.youtube.com/channel/UCdZ0GX-F3ULMKfxtyzSFbaw/videos) |  | Microsoft | The AI Blog | [https://blogs.microsoft.com/ai/](https://blogs.microsoft.com/ai/) |
|  |  | DEEPBRAIN AI - AI for Human Life | [https://www.youtube.com/channel/UCgK6WBvIGtWqf5wA-meT8nQ/videos](https://www.youtube.com/channel/UCgK6WBvIGtWqf5wA-meT8nQ/videos) |  | Intel AI Blog | [https://www.intel.com/content/www/us/en/artificial-intelligence/blog.html](https://www.intel.com/content/www/us/en/artificial-intelligence/blog.html) |
|  |  | Manifold AI Learning | [https://www.youtube.com/channel/UCXGGzUhN8dbySqqs1cdNnbw/videos](https://www.youtube.com/channel/UCXGGzUhN8dbySqqs1cdNnbw/videos) |  | IBM Developer | Artificial Intelligence | [https://developer.ibm.com/patterns/category/artificial-intelligence/](https://developer.ibm.com/patterns/category/artificial-intelligence/) |
|  |  | StarCraft Artificial Intelligence Tournament | [https://www.youtube.com/channel/UCWQ\_JrbZBq5uoDmrjQcajTA](https://www.youtube.com/channel/UCWQ_JrbZBq5uoDmrjQcajTA) |  | Cortana Intelligence and Machine Learning Blog | [https://blogs.technet.microsoft.com/machinelearning/](https://blogs.technet.microsoft.com/machinelearning/) |

* * *

* * *

☰ Contents

↑
