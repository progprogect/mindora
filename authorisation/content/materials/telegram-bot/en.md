# Your Own Telegram Bot

From BotFather to accepting payments

## This guide walks you through building your first Telegram bot. It is part of our collection of express courses and combines text, video and comic-style illustrations. Work through the process step by step: set up BotFather, interact with the bot, understand its architecture, add logging, design the interface, connect a database, send broadcasts and learn how to monetize the bot. If you prefer to start by building something, jump to “Creating Your First Bot with AI” for a quick, step-by-step walkthrough you can follow in five minutes.

## Also at the end of this guide, be sure to check out the “Additionally” section. A mega fat bonus from us is waiting for you there. This isn't even a prompt library! This is 1 of 350 ready-made assistants that writes absolutely any, 1000 times more effective correct prompts for Claude AI for absolutely any task, as well as 2 ready-made skills out of 5000 that are perfect for creating bots. All 350 assistants, as well as thousands of ready-made skills for Claude AI, are waiting for you with any subscription to the platform.

## 🤖🪪 Bot Base (BotFather)

Before making a bot with AI, you need to create it in Telegram and get a token.

This is done through a special bot — BotFather.

## What BotFather Is

Telegram is a platform, and BotFather is the official bot for managing other bots.

Through it you:

-   create a bot
-   set the name and description
-   get a token
-   manage functions

Now, simply.

Your Telegram bot is a little restaurant inside a huge hypermarket called Telegram. Before you open your shawarma stand, you have to go somewhere, get documents, a cash register, and a permit to trade.

In Telegram this function is performed by a single official — BotFather. He's basically Telegram's chief bureaucrat. He has no windows, no lines, no ladies in sweaters yelling "lunch!" at three in the afternoon. He's a bot you type a command to in chat — and in 30 seconds you have your bot's birth certificate in your hands.

Through BotFather you:

-   register the restaurant (create a bot)
-   hang a sign (name and description)
-   get the key to the door (the token — I'll talk about it separately, this is the most painful part)
-   put a menu at the entrance (bot commands)

Remember this image: BotFather = Service Center for bots. Everyone goes there. Without it, your restaurant exists only in your head.

image - 2026-05-18T135928.930.png

## Creating the bot

### Step 1. Open BotFather and enter the command:

```

/start
```

### Step 2. Create a new bot:

```

/newbot
```

### Step 3.

BotFather will ask for:

1\. Bot name (Name)

👉 This is displayed to users

Example:

```

AI Creator
```

2\. Bot Username

👉 Must:

-   be unique
-   end with bot

Example:

-   aicreator\_bot
-   my\_ai\_helper\_bot

After creation you will receive a bot token (example):

```

123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
```

### What this is

A token is the access key to your bot.

Through it:

-   the code connects to Telegram
-   the bot starts working

### Where to put it

In the code (Python example):

```

BOT_TOKEN = "your_token_here"
```

Main BotFather Commands

Here's what you actually need to know:

### 1\. /mybots

Opens a list of your bots. From there you manage everything

### 2\. /setname

Changes the bot's name

### 3\. /setdescription

Bot description (what it does)

Example:

> A bot for generating text and ideas with AI

### 4\. /setabouttext

Short description (visible in the profile)

### 5\. /setuserpic

Bot avatar

### 6\. /setcommands

Command menu (very important)

Example:

```

start - Start the bot
help - Help
profile - Profile
```

👉 This is what the user sees when typing /

### 7\. /deletebot

Delete the bot (if needed)

## Settings worth doing right away

After creating:

### 1\. Set a description

— so the user understands what the bot does

### 2\. Add commands

— makes the bot more convenient

### 3\. Set an avatar

— affects trust

### 4\. Check the username

— it affects search

## Summary

BotFather is the foundation without which a bot does not exist.

You must:

-   create a bot
-   get a token
-   set up the description and commands
-   connect it to the code

👉 After that you can move on to developing the logic and AI.

## 💬🔑 Interacting with the Bot

Before moving on to writing code and launching a Telegram bot, you need to correctly prepare the working environment. This is a basic stage that directly affects development stability. If the environment is set up incorrectly, you will run into errors out of nowhere — from being unable to run a script to problems installing libraries.

In this context, the development environment means an installed programming language interpreter and a tool for writing code. In our case, that's Python and an IDE (development environment).

### Installing Python

Python is the language on which all of your bot's logic will be built: message handling, working with the Telegram API, integrations, and business logic.

You must download Python only from the official website: https://www.python.org/downloads/

On the download page, the site will automatically offer a version for your operating system. It is recommended to use the latest stable version, since most modern libraries target it.

The installation process is quite simple, but there is a critically important moment that cannot be ignored. On the first screen of the installer, you must enable the option:

Add Python to PATH

If you don't do this, the system will not be able to recognize the python and pip commands in the terminal. This is one of the most common mistakes among beginners.

After that, you can click "Install Now" and wait for the installation to complete.

When the installation is complete, it is important to make sure everything works correctly. To do this, open the terminal (Command Prompt or PowerShell) and run the command:

```

python --version
```

If you see the installed Python version — everything is set up correctly.

Additionally, it is worth checking the pip package manager, which is used to install libraries:

```

pip --version
```

If the command also works — you have a fully ready basic environment for working with Python.

### Installing an IDE (development environment)

The next step is installing the tool in which you will write code. In theory, you can use a regular text editor, but in practice this significantly slows down development and increases the number of errors.

The optimal choice for getting started is Visual Studio Code.

You can download it here: https://code.visualstudio.com/

After installation, open the program and immediately configure it for Python development. To do this, you need to install the official Python extension:

> 1\. Open the Extensions tab

2\. Type "Python" in the search

3\. Install the extension from Microsoft

This extension adds key features:

> • syntax highlighting

-   code autocompletion
-   integration with the Python interpreter
-   convenient script execution

It is also recommended to select the Python interpreter inside the editor. VS Code usually offers this automatically when you first launch a .py file.

### Alternative: PyCharm

If you are planning more in-depth development or want a maximally "ready-made" environment, you can use PyCharm.

You can download it here: https://www.jetbrains.com/pycharm/download/

I'll say right away that in Russia you cannot download it without a VPN. So turn on a VPN for the installation.

PyCharm provides more powerful functionality:

> • built-in work with virtual environments

-   deep project navigation
-   advanced debugging tools

However, you have to pay for this with increased resource consumption. For simple Telegram bots and a start, this is not always justified.

### Why this is important

At this stage you are not writing a single line of bot logic, but you are actually laying the foundation of the entire project. A correctly installed Python and a convenient IDE:

> • reduce the number of technical errors

-   speed up development
-   simplify library installation
-   allow you to focus on the logic, not on setup

### Summary

After completing all the steps, you should have:

1\. Python installed and accessible via the terminal

1\. a working pip for installing libraries

1\. an installed and configured development environment

This is the minimum necessary base for moving on to the next stage — working with the Telegram Bot API and writing the first bot code.

## Interacting with the bot via API Token

After the environment is set up, you can move on to the key question — how exactly your code interacts with the Telegram bot. At this stage it is important not simply to "repeat the code from the example," but to understand the architecture of the process.

### What an API Token is and why it is needed

When you create a bot through Telegram using BotFather, you receive an API token. This is a unique string that looks roughly like this:

```

123456789:AAHf_example_token_string
```

This token is the access key to your bot via the Telegram Bot API. From a technical point of view, it performs the role of authentication: every request to the API contains this token so that the Telegram server understands which exact bot the request came from.

It is important to understand: the token fully determines control over the bot. Anyone who has it can send messages on behalf of the bot, read incoming updates, and manage its behavior.

### How the interaction is structured at the architecture level

The interaction between the user, Telegram, and your code is built on the "client — server — server" model:

> the user sends a message to the bot in Telegram

Telegram servers receive this message

your application receives this event via the API

your code processes the message

your application sends a response back via the API

Telegram delivers the response to the user

The key point is that your code does not communicate with the user directly. It interacts only with the Telegram API, and Telegram then acts as an intermediary.

### How the API Token is used in code

In practice, the token is passed to the library through which you work with the API. For example, when initializing the bot:

```

from aiogram import Bot

API_TOKEN_BOT = "123456789:AAHf_example_token_string"
bot = Bot(token=API_TOKEN_BOT)
```

After that, the library automatically adds the token to all HTTP requests that are sent to Telegram.

If we speak at a lower level, each request looks roughly like this:

```

https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage
```

That is, the token is literally embedded in the URL and used by the server to identify the bot.

### How the bot receives messages (Updates)

There are two main mechanisms for receiving events from Telegram:

1\. Long Polling (server polling)

Your application periodically sends a request to the API with the question: "Are there any new messages?". If there are — Telegram returns them.

This is the simplest way to run a bot. It does not require server setup and is suitable for development and small projects.

2\. Webhook (webhooks)

You specify to Telegram the URL of your server, and Telegram itself sends HTTP requests on every new event.

This approach is used in production because it is more efficient and faster, but requires:

> having a server

HTTPS

a domain

### What happens when sending a reply

When your code wants to reply to the user, it calls an API method, for example sendMessage. The library builds an HTTP request and sends it to the Telegram server.

Example of the logic:

> 1\. you received a /start message

2\. the code identified the command

3\. you call the message sending method

4\. Telegram accepts the request

5\. the user receives the reply

All interaction comes down to exchanging HTTP requests and JSON data.

### API Token security

The token is the most sensitive part of your bot. A breach of its security will lead to complete compromise.

So you got this long gibberish of numbers and letters. Looks like a Wi-Fi password at a bad hotel, right? Well, this is not a Wi-Fi password. This is, essentially, the keys to your restaurant, the passport to your business, and access to the cash register — all in one line.

What happens if you drop this token into a public GitHub (and you will, folks, everyone does, I myself leaked three tokens in a week in 2019)? In 15 minutes some young hacker from a basement will find it with an automated script and hijack your bot. He'll send spam in your name, sell casinos, and users will write you angry messages, while you'll sit there thinking "what the hell, I didn't do anything".

Technical note about .gitignore. In a Python project you must create a .gitignore file and put .env on the first line. That's a command to git: "don't touch this file at all, don't show it, don't commit it". Without .gitignore you'll one day automatically do git add . — and .env will fly into the public repo along with the token. I've personally had this happen three times. With .gitignore — it's physically impossible.

If you've already leaked it — you calmly go to BotFather and type /revoke. It's like going to the bank and blocking a card: the old key dies, you get a new one. Done in 10 seconds.

### Security (critical)

Never:

-   do not share the token
-   do not paste into public repositories
-   do not show on screenshots

If the token leaked:

👉 use the command:

```

/revoke
```

Practical recommendations:

> 1\. do not put the token directly in the code if the project is stored in Git

2\. use environment variables (.env)

3\. never send the token to other people

4\. if the token leaked — immediately reissue it through BotFather

### Summary

The API Token is the entry point to managing the bot. Through it, your code gets access to the Telegram Bot API and can:

receive user messages, process commands, send replies

Understanding this scheme is critically important. Without it, development turns into copying examples without understanding, and any non-standard tasks become difficult.

## 🏗️🧱 Project architecture

Project architecture is the way your bot's code is organized: how it is split into files, where everything lives, and how it all connects.

Architecture determines how convenient it will be for you to work with the code, add new features, and fix bugs.

## One file vs multiple files

When you create a bot through Claude, there are two main approaches:

-   everything in one file (main.py)
-   splitting into multiple files (architecture)

Both options are fine — the choice depends on your tasks.

## One file (main.py)

One file is when all the bot's code is in one place.

Usually this is a main.py file that contains the bot startup, the logic, the buttons, and sometimes even database work.

⚙️ Structure example:

```

main.py
```

Inside this file you have:

-   bot startup
-   command handlers
-   buttons
-   working logic

📌 When to use one file:

One file is better to use if you are just starting, making a simple project, or just want to quickly test an idea.

It's also a good option if you don't want to dig deeply into the project structure.

❌ Cons:

Over time the file starts to grow.

The code becomes long, and it's harder to navigate.

Adding new features can tangle the structure.

📌 Conclusion:

One file is the best option for a start and a “lazy” approach. People actually use it, and that's fine.

## Architecture (multiple files)

Architecture is when the project is split into parts. Each file or folder is responsible for its own task.

By default Claude most often suggests this option, because it is considered more “correct” in development.

⚙️ Structure example:

```

main.py
config.py
handlers/
keyboards/
database/
```

Okay, now the hottest beginner question: "Claude dumped a bunch of files on me, I don't understand anything, put it back how it was". Familiar? I'll break it down in simple terms now.

Imagine you opened a dumpling shop. You have two ways to set up the kitchen:

The "lemonade stand" option — everything in one 12-square-meter room. The stove, the fridge, the cash register, the flour storage, and the stool where you rest. That's main.py — one file that holds absolutely everything. Startup, buttons, logic, the database, your shopping list, and a photo of the dog.

The "proper restaurant" option — a separate kitchen, a separate pantry, a separate dining room, a separate manager's office. That's architecture with folders: handlers/ — the kitchen (logic), keyboards/ — the waiter (buttons), database/ — the pantry, config.py — the safe with the keys.

Here's the trick: both options are fine. Any "real programmer" who tells you "you can't write in one file, that's a disgrace" — let them go assemble their own Tinkoff-style development team. At the start, one file is a blessing. You see the entire code at a glance, you understand where everything is, you don't get lost.

## File breakdown

### 1\. main.py

main.py is the main file, the entry point of the program.

This is where the bot is launched and the rest of the project is connected.

### 2\. config.py

config.py is the settings file.

It usually stores the bot token, API keys, and other parameters.

📌 Important:

Don't store the token directly in main.py — it's better to move it to config.py.

### 3\. handlers/

handlers is the folder with the bot's logic.

This is where command and message handlers live (for example, /start, /help, etc.).

This is where you describe how the bot responds to user actions.

### 4\. keyboards/

keyboards is the folder with buttons.

This is where inline buttons and menus that the user sees in Telegram are created.

### 5\. database/

database is working with data. This can include connecting to a database, saving users, history, etc.

## When to use architecture

Architecture is needed when the project starts to grow.

If you have lots of commands, buttons, and logic — one file becomes inconvenient.

In that case, splitting into files makes the work much easier.

## How to transition properly

The most convenient and practical approach:

First you make the bot in one file.

When the code gets large (around 300–500 lines), you start splitting it into parts.

For example:

-   first you extract handlers
-   then keyboards
-   then config

## How to manage this through Claude

A simple rule I give all my students:

-   0–300 lines of code — write in a single main.py. Don't split anything, don't get fancy.
-   300–500 lines — time to think about splitting. First we extract handlers, then keyboards.
-   500+ lines — that's real architecture. Without it, confusion will start.

Common beginner mistake: Claude often immediately gives you a pretty "proper" project with five folders, and you're like "wow, professional!". And then you don't know where to change a single line. And every change turns into a quest of "find where Claude hid it". So if you don't understand the structure — say it right in the prompt:

You can steer Claude, and that's very important.

If you want the simple option, you need to write that explicitly.

⚙️ Example:

> Make the bot in a single main.py file, without splitting into multiple files.

If you want architecture:

> Make the project structure: main.py, config.py, handlers, keyboards. And explain what is where.

## Common mistake

Claude often gives architecture that a beginner doesn't understand. As a result, the person doesn't know what to change where, and everything breaks.

📌 How to avoid it:

> If you don't understand the structure — don't use it right away.

Either do everything in one file, or ask for an explanation of each file.

## Summary

Architecture is not about “right or wrong”, it's about convenience.

One file gives simplicity and a fast start. Architecture gives order and convenience as the project grows.

📌 The main rule:

> Do it simple first, then make it more complex.

When the project grows to the point where splitting is actually needed — you just write to Claude: "Split my main.py into a structure: handlers/, keyboards/, database/, config.py. Explain what moved where." And the neural net does in two minutes what takes a "real" programmer half a day and coffee at 200 rubles.

## 🧙‍♂️💻 Working with code from Claude

When you work with Claude, it's important not just to get the code, but to accept, insert, and refine it properly.

If you do this without a system — the project breaks very quickly.

## How to accept code properly

Claude generates code in blocks or files. Your job is not to copy everything in a row, but to understand what exactly it gave you.

📌 What you need to do:

First look at the structure: is it one file or several. Then determine what exactly changed — the whole file or only a part. If it's a refinement, don't replace the entire file — insert only the changes.

Common mistake:

You copy the new code from Claude and fully replace the old file.

As a result:

-   old functions break
-   settings disappear
-   errors appear

📌 The right approach:

If the project already exists — always work through adding or changing, not replacing.

## How to insert code without breaking the project

There's a simple rule:

👉 don't rewrite — add

This is the key approach in vibe coding.

📌 How to proceed:

If Claude gave a new function — just insert it in the right place. If it gave a change — find that section and replace only it. If you're not sure — ask:

> Insert the changes into my code without rewriting everything.

📌 Tip:

Always save the old version of the file before making changes. If something breaks — you'll be able to roll back quickly.

## Where to store API and tokens (.env)

.env is a special file for storing secret data.

It usually contains:

-   Telegram bot token
-   API keys
-   passwords
-   settings

⚙️ Example .env:

```

BOT_TOKEN=123456:ABCDEF
OPENAI_API_KEY=sk-xxxx
```

Okay, two small but critically important files without which the restaurant doesn't work. We remember them with images.

.env is the safe in the director's office.

In the safe lie: keys to the cash register, the lease, the sole proprietor stamp, PIN codes for bank cards. Everything valuable. These things are not written on the restaurant door or in the bathroom — otherwise any customer would just take them and drain the account.

Same thing in code: the bot token, API keys for OpenAI, Groq, Stripe — none of this is ever written directly in the code, it lives in a separate .env file. And the code just says "go to the safe, get the key, open the register". Meanwhile the safe doesn't travel with you to GitHub — it stays on your server.

📌 Why you need .env:

It lets you not store secrets directly in the code.

This is important because:

-   the code can accidentally get published
-   the token can get stolen
-   the project will become insecure

📌 How to use it:

In the code you simply load the variables from .env and use them.

## What is requirements.txt

requirements.txt is a file with a list of all the libraries needed for the project to work. Simply put, it's a list for the suppliers at your little restaurant.

Imagine you're opening a branch in another city. You need the kitchen to start working there immediately. What do you do? You don't haul every fork from Moscow — you give the new chef a list: "these ingredients, this cookware, these spices — buy them locally". The list is short, clear, proven.

Same thing with requirements.txt:

⚙️ Example:

```

aiogram==3.13.1
httpx==0.27.2
python-dotenv==1.2.1
```

📌 Why you need it:

When you move the project to a server or hand it to someone else, you need to install all the dependencies.

requirements.txt lets you do this with a single command. It's your bot's recipe sheet. Anyone who gets your project types one command:

⚙️ Installing dependencies:

> pip install -r requirements.txt

The user enters this command and the same "ingredients" in the same versions appear on their computer. Without this file, moving the project to a server turns into a guessing game: "so, which version of aiogram did I use? and httpx? and what even is this?". You spend a day cursing, then find the wrong version — half the code stops working.

One important hygiene point — a virtual environment. Before installing packages always create a virtual environment with the command python -m venv venv and activate it. It's like a separate cupboard just for this project — library versions don't conflict with your other projects on the computer. Without venv you'll one day install aiogram 3 in one bot, and then in an old bot on aiogram 2 everything will fall apart — and you won't have a damn clue why.

How to get requirements.txt

If you've already written a bot and forgot to make requirements.txt — don't panic. In the IDE terminal you type:

> pip freeze > requirements.txt

📌 What this command does:

It saves all installed libraries to a file. After that the project can easily be launched anywhere. One command, zero effort, an hour of time saved.

## Logging — the flight attendant's journal

Logging is a record of what happens in the program.

Simply put:

👉 the bot itself writes down what it's doing and what errors occur

📌 Why logging is needed:

-   understand where the error is
-   track the bot's operation
-   see user actions
-   find bugs quickly

Okay, imagine this scene. Your restaurant is running, customers come in, order, eat, leave. And then at three in the morning everything breaks — a neighbor comes over and says "there's smoke coming out of your kitchen window". You rush over, everything is filled with smoke, the cook is lying unconscious by the stove. And you're like: "what happened?".

If you don't have an event log — you sit there guessing. What did the last customer order? What was the cook frying? Where did it short-circuit? You're like Sherlock without clues: staring at the ashes and trying to guess.

⚙️ Simple example:

```

import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
logging.info("Bot started")
```

If you have a log — you open the journal and see:

01:23 — Customer ordered a steak

01:24 — Cook put a frying pan on burner №3

01:31 — WARNING: cook got distracted by the phone

01:42 — ERROR: frying pan overheated, the oil caught fire

01:43 — Cook fainted

That's it. Investigation over in 30 seconds. The phone is to blame.

If something breaks — you'll see it in the logs instead of guessing. Logging in a bot is the same story. The bot writes itself a diary:

```

2026-03-28 11:16:31,641 - INFO - Bot started
2026-03-28 11:16:31,642 - INFO - Start polling
2026-03-28 11:16:31,714 - INFO - Run polling for bot @GenerateYourAIBot id=8521901543 - 'AI Bots Generator'
```

And when something breaks — you don't wail "why isn't it working?!". You open the log and see a specific line, at a specific second, for a specific user.

Common mistakes

Storing the token directly in the code

→ insecure

Not using requirements.txt

→ the project won't launch on the server

Rewriting Claude's code completely

→ the logic breaks

Not doing logging

→ hard to find errors

## Summary

Working with code from Claude is not just copying.

It's a process where it's important to:

-   make changes carefully
-   not break the structure
-   store secrets separately
-   pin the dependencies
-   log all updates

## 📋🛰️ Logging and monitoring

When you're just starting to make Telegram bots, it seems like the main thing is for the code to "just work". You launch the project, the bot replies, buttons get pressed — everything looks fine. But as soon as the bot reaches real users, the situation changes. Errors appear, strange behavior, freezes, and sometimes the bot just stops responding for no obvious reason.

And this is where the key problem arises: you don't understand what's happening inside the project. You have no information. No history of actions. No starting point to work from. At this moment it becomes clear: without logging, the project turns into a black box.

Logging is a system for recording events that happen inside your bot. Essentially, it's your “journal,” where everything important is recorded: who pressed a button, which command was called, where an error occurred. Thanks to this, you start seeing the real picture instead of just guessing.

Let's break this down with a simple Telegram bot example.

### The basic idea of logging

Imagine a user presses the “Generate text” button. In the usual scenario, the bot will simply send a request to the AI and return a response. If something breaks, the user will either get an error, or nothing will happen at all.

Now let's add logging. The moment the button is pressed, the bot records:

“User 123 pressed the generate button”

Then, if an error occurs, an entry appears in the logs:

“Error generating text: timeout”

Now you already have two important things: who did it and where it broke. This is a fundamentally different level of control.

### Connecting logging in the code

In Python, logging can be set up in just a few lines. You don't need to overcomplicate things right away — a basic configuration is enough.

You add a logger configuration to the project that will output messages to the console. After that, in the relevant places in the code, you start explicitly recording events: bot startup, commands, user actions.

For example, when the bot starts, you record that it launched successfully. This seems like a small thing, but on the server it's the first signal that everything is working correctly. Next — command handlers. When a user writes /start, you log their ID and the fact of the interaction itself.

This practice builds a habit: every important action should leave a trace. You don't need to log absolutely everything, but key points must be covered.

### Logging user actions

A Telegram bot is always interaction. The user presses buttons, sends messages, launches commands. If you don't record these actions, you don't understand how people actually use your product.

So the next step is logging user events.

When a person presses a button, you record:

who did it and what exactly they chose. This is especially important for understanding UX. For example, you might notice that some button isn't used at all, or conversely — it's overloaded.

In a more advanced version, you can log not only the fact of the action, but also the context. For example, what text the user sent, which mode they chose, what result they got.

Over time, such logs become a powerful tool. You start seeing user behavior without any analytics.

### Logging errors

The most important part of the entire system is errors. Logging is done primarily for them.

Errors come in different forms. Sometimes it's a problem in the code. Sometimes it's an external API failure. Sometimes the user enters something unexpected, and the logic breaks. In all these cases you need one thing: to record the problem.

The basic approach is wrapping critical sections of code in a try/except construct. If something goes wrong, you don't just “swallow” the error — you write it to the log.

This way, even if the user sees “Something went wrong,” you will know exactly what actually happened.

It's important to understand: ignoring errors is the worst thing you can do. If you don't log them, you lose control over the project. Even a small error can completely break functionality, and you won't know about it.

At this stage you already have a foundation:

the bot records startup, user actions, and errors. This is a minimal but critically important level.

In part two we will cover how to work with logs on the server, how to receive error notifications directly in Telegram, and how to turn logging into a tool for analyzing and growing the project.

## Logging and monitoring (part 2)

In part one you already set up basic logging: the bot records startup, user actions, and errors. This is the foundation without which it's impossible to properly maintain the project. But for logging to truly become a tool, and not just “text in the console,” you need to add structure and learn to classify events correctly.

That's exactly what logging levels exist for.

### Logging levels: how to get things in order

When a project has a lot of logs, without structure they turn into noise. You see messages, but you don't understand which of them are important and which can be ignored.

The solution is to split events by importance levels.

Three log levels, remember them like a traffic light:

-   🟢 INFO — everything is fine. "Bot started", "User pressed a button", "Message sent". This is white noise, you usually don't read it, but if the bot disappears — this is the first thing you look at.
-   🟡 WARNING — something strange, but the bot is still alive. "User entered some nonsense", "API responded slowly". This isn't a catastrophe, but it's a weak spot that might blow up in the future.
-   🔴 ERROR — a fire. The bot couldn't do something. This should immediately land in your admin chat as a push — don't wait until morning, deal with it now.

In the book Code Complete, Steve McConnell says: "A program without logs is a plane without a black box." It's cheaper to crash than to later not know why you crashed.

### INFO — normal system operation

INFO is used to record ordinary events. This is everything that happens within the bot's normal logic.

You log project startup, user actions, command calls, button presses. These events don't signal problems — they simply show how your bot lives.

Example:

```

2026-05-01 16:23:26,669 | INFO | Database initialised at bot.db
2026-05-01 16:23:26,670 | INFO | Subscription middleware active for channel @cristoferpub
2026-05-01 16:23:27,254 | INFO | Bot started. Polling...
2026-05-01 16:23:27,377 | INFO | Start polling
2026-05-01 16:23:27,476 | INFO | Run polling for bot @TakePremiumEmojiID_Bot id=8677081366 - 'PremiumEmoji ID'
```

When you open such logs, you literally see user behavior. This is the foundation for analyzing and improving the project.

### WARNING — deviations from the norm

WARNING is an intermediate level. It shows that something didn't go as planned, but there's no critical error.

For example, a user entered invalid data, the API responded in a non-standard way, or a situation occurred that you didn't fully anticipate.

The bot keeps working, but these moments are important to track.

```

2026-05-01 16:29:07,884 | WARNING | Sleep for 5.022068 seconds and try again... (tryings = 35, bot id = 8677081366)
```

WARNING helps find weak spots: where users get confused, where the logic isn't stable enough, where future errors are possible.

### ERROR — real problems

ERROR is already a signal that the system failed.

This could be an error in the code, a database problem, an external API crash, or any situation where the bot couldn't complete an action.

Such events are priority number one. They need not just to be logged, but seen immediately.

```

2026-05-01 16:29:07,884 | ERROR | Failed to fetch updates - TelegramConflictError: Telegram server says - Conflict: terminated by other getUpdates request; make sure that only one bot instance is running
```

This is exactly the level where the response is built: if there's an ERROR — that means you need to investigate.

### How to work with logs on the server

After deployment, all these levels start working in a real environment. The logs are no longer in front of your eyes — they're on the server.

Your task is to quickly get access to them and find the information you need.

Usually you connect to the server and look at the latest entries. It's important not to read the entire file, but to go straight to current events — that's where the errors and the latest user actions are. More about logs on the server will be in the Deploy to Production section.

Over time this becomes a habit: something broke → opened the logs → found the cause.

### Error notifications in Telegram

Even with convenient access to the server, a problem remains: you won't check the logs every minute.

So the next step is to make errors come to you on their own.

The simplest way is sending ERROR logs to Telegram. When an error occurs, the bot sends a message to the admin chat.

The message usually contains:

the error text, the user ID, and the action that caused it.

This gives an instant reaction. You don't search for the problem — you know about it immediately.

### Minimal project monitoring

Monitoring isn't necessarily complex systems. At a basic level it's simply understanding: what's happening with the project right now.

Even with logs you can already track:

how many users interact with the bot, what actions they take, where problems arise.

This turns you from “a person who wrote code” into a person who manages a product.

### How to quickly find the problem

When an error occurs, the main thing is not to guess, but to analyze.

Logs give you a sequence of events. It usually looks like this:

user action → processing → result or error.

If you have logging levels set up, you quickly find the right moment. INFO shows the context, WARNING — deviations, ERROR — the problem itself.

This lets you pinpoint the source of the failure instead of spending time on guesses.

The real high is when the logs fly to you in Telegram on their own. You write to Claude:

> "Add an admin chat for errors to the bot. When an ERROR happens — send me in chat ID 123456789 the error text, the user ID, and their last action."

And that's it. Now you're sitting in a cafe on a date with a girl, your phone pings, you look — and the bot writes: "ERROR: API timeout for user 9988, action: /generate". You take a sip of cappuccino, reply "we'll fix it now", and continue the date. That's grown-up development.

### Common mistakes when working with logging

At this stage many people make the same mistakes.

The first is logging “just in case”. As a result, there's too much extra in the logs.

The second is the absence of levels. All messages look the same.

The third is ignoring WARNING. Even though that's often where future problems hide.

The fourth is the absence of notifications. There are errors, but you don't know about them.

Logging should be meaningful. It's a tool, not just “an add-on to the code”.

### Block summary

After this block you should have a simple but working system:

you have logging with INFO, WARNING, and ERROR levels

you understand where to look at logs on the server

you receive error notifications in Telegram

you see user actions and can analyze them

This is the level at which a project stops being “an experiment” and becomes a manageable product.

## 🎨🖼️ UI and bot design

### Why this determines whether people will use your bot

UI is the bot's appearance: text, buttons, message structure. It directly determines how clear the bot is and how “expensive” it feels.

Most beginners in Telegram bot development make the same mistake: they build a working bot but pay no attention to its design. As a result, the bot may perform its function correctly, but it is perceived as a raw, unfinished product. This often shows up as a lack of structure, the use of random emoji, or completely ignoring the visual side.

At the same time, even a simple bot can be made visually high-quality if you approach the interface design properly. And it is the UI that shapes the user's first impression: they are looking at a prototype or a full-fledged product.

### How to make a bot visually appealing

There are several basic principles that directly affect how the interface is perceived.

First, do not overload the interface. An excessive number of buttons, text, or elements makes navigation harder. It is far more effective to use fewer elements, but make them clear and neatly designed.

Second, it is important to keep a consistent style. All messages in the bot should look consistent: the same structure, a similar heading format, a unified approach to text formatting. If the style keeps changing, it creates a sense of chaos.

Third, texts should be short and clear. The user does not read long descriptions — they scan the interface. So it is important to give the essence and the action right away.

Visual accents deserve a separate mention. Headings, spacing, breaking text into blocks — all of this helps the user orient faster and understand what is required of them.

### Text formatting

Text is a key element of the interface. Even with good functionality, poorly formatted messages make the bot inconvenient.

Telegram has support for HTML markup, which you need to use to structure text. With it, you can highlight headings, add emphasis, and separate the semantic parts of a message.

Example of a basic message structure:

```

await message.answer(
    "<b>Welcome</b>\n\nChoose an action:",
    parse_mode="HTML"
)
```

The correct text structure looks as follows: first comes the heading, then spacing, then the main action or description. This format is perceived as much easier than a wall of text.

If you ignore structure, the user gets lost and understands less well what they need to do.

### Common mistakes

In practice, the same problems come up most often.

One of the most common is texts that are too long. Users simply do not read them, especially in a messenger format.

Structure is also often missing: messages look like a wall of text with no breaks, which worsens perception.

Another problem is an overloaded interface. When a bot has too many buttons and elements, the user does not understand where to tap.

Visual chaos is also common — no unified style, different message formats, inconsistent design.

And a separate mistake is copying someone else's code without understanding it. As a result, interface elements are used incorrectly or do not work together.

### Summary

UI is not just design. It is a tool that directly affects user behavior.

It determines whether a person understands what to do next, whether they stay in the bot, and whether they come back. Even a functionally simple bot can be perceived as a quality product with good design. At the same time, strong functionality with a poor UI often loses.

### Formatting tools in Telegram Bot API

Once you understand the principles of good UI, it is important to figure out which exact tools implement this in Telegram Bot API. These are what let you turn an ordinary text bot into a visually neat and clear interface.

### Text formatting

Let's start with text. Text is a key element of the interface. Even with good functionality, poorly formatted text makes the bot inconvenient.

Telegram supports HTML markup, which you must use:

-   <b> — for headings
-   <i> — for clarifications
-   <code> — for technical elements
-   <blockquote> — for quoting
-   <tg-emoji> — for formatting
-   And others

Example

```

await message.answer(
    "<b>Welcome</b>\n\nChoose an action:",
    parse_mode="HTML"
)
```

The correct text structure looks like this: heading, then spacing, then the action or description. A wall of text with no structure is poorly perceived and reduces ease of use.

## Premium emoji

## Premium emoji

Important point: Starting with version 9.4 of Telegram Bot API, bots can use premium emoji. The version itself was released: February 9, 2026. From my experience, regular emoji look cheap, while premium emoji are already product-level.

Premium emoji are custom Telegram emoji that can be inserted into text and buttons.

They are used via an HTML tag <tg-emoji>.

Example of use in text:

```

await message.answer(
    '<b><tg-emoji emoji-id="EMOJI_ID">text</tg-emoji> Settings</b>',
    parse_mode="HTML"
)
```

This allows you to:

-   make the interface neater
-   highlight important elements
-   visually structure messages

📌 Important: this is one of those small details that sharply improve how the bot is perceived

How to get a premium emoji ID. For this case, I created a free bot PremiumEmoji ID: you send a premium emoji, and in response it gives you its ID. There is a full guide and instructions. Link: https://t.me/TakePremiumEmojiID\_Bot

## Inline buttons

Inline buttons are the primary tool for user interaction with the bot. They are placed under the message and are used to perform actions: navigation, selecting options, or triggering logic.

The key task is to make the buttons as clear as possible. The user should immediately understand what will happen after tapping.

Example of inline buttons:

### How to format correctly

Buttons should be short and clear. Don't overload the text — the user should immediately understand what will happen on tap.

Important: inline buttons use custom (premium) emoji via icon\_custom\_emoji\_id, not regular ones.

Example (you can paste this code into preferences but already with a premium emoji id):

```

return InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(
        text="Subscribe",
        url=CHANNEL_LINK,
        icon_custom_emoji_id="EMOJI_ID"
    )],
    [InlineKeyboardButton(
        text="Check",
        callback_data="check",
        icon_custom_emoji_id="EMOJI_ID"
    )],
])
```

## Colored inline buttons

In new versions of Telegram Bot API (starting from 9.4), additional options for button styling appeared. Now you can not only add premium emoji, but also set the button color via the style parameter.

This lets you make the interface clearer and more visually structured: the user finds their way around actions faster, but I'll say right away, adding colored buttons is not required. They are usually used when making an ad post to attract the user.

### Button parameters

style — controls the button color:

-   primary — blue (primary action)
-   success — green (confirmation)
-   danger — red (dangerous action / cancel)

icon\_custom\_emoji\_id — adds a premium emoji before the button text.

Usage example (aiogram 3):

```

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

def get_colored_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[

        # Blue button (primary action)
        [InlineKeyboardButton(
            text="Subscribe to the channel",
            url="https://t.me/example",
            icon_custom_emoji_id="6039422865189638057",
            style="primary",
        )],

        # Green button (confirmation)
        [InlineKeyboardButton(
            text="Check subscription",
            callback_data="check_subscribe",
            icon_custom_emoji_id="5870633910337015697",
            style="success",
        )],

        # Red button (dangerous action)
        [InlineKeyboardButton(
            text="Delete account",
            callback_data="delete_account",
            icon_custom_emoji_id="5870657884844462243",
            style="danger",
        )],

        # Two buttons in one row
        [
            InlineKeyboardButton(
                text="Cancel",
                callback_data="cancel",
                icon_custom_emoji_id="5870657884844462243",
                style="danger",
            ),
            InlineKeyboardButton(
                text="Done",
                callback_data="confirm",
                icon_custom_emoji_id="5870633910337015697",
                style="success",
            ),
        ],

        # Button without style
        [InlineKeyboardButton(
            text="Settings",
            callback_data="settings",
            icon_custom_emoji_id="5870982283724328568",
        )],
    ])
```

You can put this code into preferences (preferences).

### How to use correctly

The button color should match the action:

-   Blue (primary) — the user's main path
-   Green (success) — confirmation or a successful action
-   Red (danger) — deletion, cancel, critical actions

This way the user intuitively understands the interface without extra text.

### Limitations

1\. The style parameter only works in:

-   Bot API 9.4+
-   aiogram 3.20+

1\. icon\_custom\_emoji\_id is available:

-   if the bot owner has Telegram Premium
-   or if the bot has a username purchased through Fragment

1\. If style is not specified — Telegram determines the button color itself.

## Menu (keyboard)

A reply keyboard is buttons that appear at the bottom of the screen and are used for the main navigation through the bot.

Key sections are usually placed there: home, settings, profile, and other main functions.

Usually placed there:

-   main sections
-   settings
-   profile

Example:

```

keyboard = {
    "keyboard": [
        [
            {"text": "Home"}
        ],
        [
            {
                "text": "Settings",
                "icon_custom_emoji_id": "ID"
            },
            {
                "text": "Profile",
                "icon_custom_emoji_id": "ID"
            }
        ]
    ],
    "resize_keyboard": True
}
```

The main rule is not to overload the menu. The user should find their way quickly, not choose from a large number of buttons. Here it is also better to use custom emoji via icon\_custom\_emoji\_id.

## Message effects

Telegram supports animation effects for messages.

They are set via the message\_effect\_id parameter.

Example:

```

await message.answer(
    "Operation completed",
    message_effect_id="EFFECT_ID"
)
```

Effects can be used:

-   on successful actions
-   on payment
-   on notifications

They enhance visual perception and make the bot more “alive”.

## Summary

All these tools — premium emoji, buttons, keyboards, and effects — are means of implementing UI inside Telegram Bot API.

Using them well lets you: simplify user interaction with the bot, make the interface clearer, improve the overall perception of the product

Even basic functionality starts to feel significantly better when it is backed by thoughtful styling.

## 🚀⚡ Advanced level

At this stage you are no longer just “making a bot”, but start thinking like a product developer. What matters is not only the features, but how the user goes through the path inside the bot, how the system reacts to errors, and how easy it is to scale all of this.

## Bot UX — why people leave and don't come back

UX (user experience) is the user's experience when working with the bot. Simply put, how convenient and clear it is for a person to use your bot the first time. This is a very important thing.

Good UX is when the user:

-   immediately understands what to do
-   doesn't get lost in the process
-   quickly gets a result

Bad UX is when:

-   unclear where to tap
-   the bot replies strangely
-   have to think what to do next

This is the most underrated topic among beginners. You wrote a bot, you have three buttons, the bot works. You launch it, give it to friends — and two days later only you are using it. Why?

Because you have bad UX. UX is not "pretty little buttons". UX is the answer to the question: "Does a person understand in 3 seconds what they should do right now?"

I'll give you two examples from real life.

First example: YouTube. You open the app — a big ▶ button on the thumbnail. You tap — the video plays. You want pause — you tap the center of the screen. You want it louder — you turn up the volume. Nobody explained it to you. You just watch the video. That's good UX.

Second example: the 2015 government services website. You open it — 47 sections, 18 colors, portal ads on the right, a "get vaccinated" banner at the top, a chatbot "I'll help you find a service" on the left, and under all of that somewhere in the corner is your service, which you have to click through four forms to reach and specify the sex from the passport. That's very bad UX.

In your bot it's the same. There's very little patience in the user's head. They won't figure it out. They won't read your long "/help". If in 5 seconds they didn't understand what to do — they close the chat and go to the next bot. There are a million of them in Telegram.

### How to make good UX

Every action should be obvious. The user shouldn't “guess”, they should see buttons or clear instructions.

The bot should always lead the user forward. After every step it should be clear what to do next, otherwise the person just leaves.

Don't overload. Better fewer functions, but clear ones, than many, but confusing.

Three rules of good UX in a bot that I suffered through on hundreds of projects:

> 1\. Short phrases. Instead of "Information about the constructor" you can write "About the constructor" or "Created bots" to "My bots". There are many such examples, and going forward it's better to write shorter. Brevity is the sister of talent

> 2\. More inline buttons, meaning the person opened a profile, and at the bottom there should be a “Back” button, and the same in all functions, so it's easier for the user to navigate the bot.

> 3\. Fewer unnecessary commands. These do NOT include /start, /settings, ... In that case it's better to make a menu from which all other functions will come, and leave only the most necessary commands.

## Interaction scenarios

A scenario is the user's path inside the bot from entry to the result.

Example of a simple scenario:

user entered → pressed start → chose an action → got the result

### Why this is important

If the scenario isn't thought through:

-   the user gets stuck
-   doesn't reach the result
-   leaves

### How to do it right

You need to think through in advance: what the user does first, what happens after that, what action options there are,

what to do if they entered the wrong command.

📌 Important:

> Every action should have a logical next step.

Anti-rule: if your bot has more than 5 slash commands (/start, /help, /balance, /buy, /history, /support, /admin, /settings, /donate, /poll) — you're doing something wrong. The user won't even remember three. Replace everything with a button menu, leave two or three commands, the rest — with buttons.

When you give Claude a prompt to create a bot — specify it right away: "Every bot message should end with a 'Back to menu' button. The main menu is called with the /start command or the '🏠 Menu' button. Slash commands — maximum 3." Claude will listen, and the bot will immediately come out human-made, not "programmer-like".

## Error handling

Errors are a normal part of a bot's work. What's important is not to avoid them, but to handle them correctly.

### What kinds of errors there are

The user entered the wrong thing, pressed the wrong place, the logic broke, a server error

### How to handle them correctly

The bot shouldn't just “crash” or stay silent. It should explain what happened.

### Example of a bad version

the bot doesn't reply at all or outputs a technical error

### Example of a good version

the bot writes a clear message and offers an action:

-   try again
-   go back
-   choose another option

📌 Important:

An error is also part of UX.

If it's handled properly, the user won't even feel the problem.

## Scalability

Scalability is a project's ability to grow without a complete rewrite.

### What this means in practice

Today you have 10 users

Tomorrow — 1000

The bot should continue to work normally.

### What scalability depends on

-   Project architecture
-   Code separation
-   Working with the database
-   Request handling logic

### How to build in scalability

Don't store everything in one file, if the project is growing, split the logic (handlers, services, etc.), use a database, not variables and JSON files.

Think ahead: “what happens if there are more users”

## Summary

The advanced level is the transition from “write code” to “make a product”.

UX is responsible for convenience

> Scenarios — for the logic of the user's path

Error handling — for stability

Scalability — for the project's growth

If these things are worked through, the bot starts to be perceived as a full-fledged service, not just a set of functions.

## 🗄️📚 Working with a database

Okay, and here I'll tell you about the most common beginner mistake, the one that 9 out of 10 first bots fail on. That's trying to store user data in a JSON file.

What is JSON for your data? It's an ordinary graph-paper notebook where the chef writes down orders in pencil. One customer came — wrote it down. A second came — wrote it down. As long as there are three customers, and they come one at a time — everything works perfectly.

Now imagine: a line of 50 people at the door, everyone wants to order at the same time. The chef grabs the notebook, starts writing, rips out pages, gets mixed up, someone snatches it from his hands — and the notebook flies into a pot of borscht. All orders are lost. Everyone's offended. The restaurant is closed.

That's JSON when a bot grows. When two users write at the same time, the file can get corrupted, and you lose data. When there are 1000 users — searching the file takes seconds, the bot lags. When you want to add a new "balance" field — you have to rewrite the entire file by hand, because there are no migrations in JSON.

A database is your bot's persistent memory. Without it, the bot works like a person with amnesia: every time a user sends a message, the bot sees only that one message and remembers nothing about previous interactions. It doesn't know who this person is, whether they wrote before, what their settings are, or whether they have a subscription or a balance.

Imagine: a user sent /start. Without a database the bot will reply with a greeting and forget. An hour later the same person writes again — the bot will say "hello, I'm new" again. That's not a product, that's a demo. A real product must remember users, their actions, history, and settings. That's exactly what a database is for.

Any serious bot that plans to grow to at least 100–200 active users must have a database. Without it you're just spending time on a pretty facade that will collapse at the first real load.

Key takeaway: without a DB you don't have a product, you have a demo. Users quickly leave bots that remember nothing

### Why you shouldn't use JSON for storing data

Many beginners start with a JSON file: they create a dictionary, save it with json.dump, and think they've solved the problem. It works for the first 10 users. Then the problems start.

JSON breaks easily under concurrent writes. If two users message the bot in the same second, the file can get corrupted and the data will be lost. Updating the structure is also a pain: you want to add a new field (for example, a balance) — you have to rewrite the entire file by hand or write migrations manually. With a large number of users the file grows to tens of megabytes, searching it becomes slow, and filters and sorts turn into hacks.

JSON is not designed for concurrent access and complex queries. It's only good for configs or very small prototypes where the bot is being tested by you alone.

One conclusion: JSON is for prototypes only. As soon as the bot starts living a real life with several users at once — switch to a proper database.

### Why SQLite is the best choice to start with

SQLite is a real database. It's an electronic Excel with autosave that your bot has direct access to. A few advantages:

-   No separate server needed. It's just a single .db file that sits next to your code. You start the bot — the DB works. No Dockers, no Postgres, no MySQL. One file.
-   Concurrent writes work. Two users hit a button at the same time — both clicks get saved. Nobody disappears.
-   Search is instant. Thousands of users — looking up a specific one by ID takes a millisecond.
-   Moving to a server = copying one file. You copy bot.db to the server, start the bot — the data is there.

When should you leave SQLite? When you have tens of thousands of active users a day and complex analytics. Then we move to PostgreSQL. But for 99% of your first bots, SQLite is the sweet spot for years to come.

I'm not kidding about "years to come". I still have bots in production running on SQLite with 30 000+ users, everything flies, no problems.

Engineering principle: Hunt and Thomas in The Pragmatic Programmer write: "Don't choose a tool because it's fashionable. Choose it for the job." Beginners fall for JSON files because they're "simple". They fall for PostgreSQL because it's "professional". And SQLite sits right in the middle — simple and at the same time production-grade. That's the right choice.

### What a database looks like

A database is a file with a .db extension, and inside it there are tables.

Each table consists of:

-   rows — these are records (for example, users)
-   columns — these are fields (user data)

For example:

-   user\_id
-   username
-   created\_at

Visually it looks like a regular table, like in Excel.

### What information should be in the DB (minimum)

Keep the minimum so you don't create junk. For the users table, required:

-   user\_id — INTEGER PRIMARY KEY (unique identifier from Telegram, never repeats)
-   username — TEXT
-   first\_name — TEXT
-   created\_at — TIMESTAMP DEFAULT CURRENT\_TIMESTAMP (when the user first messaged the bot)
-   last\_activity — TIMESTAMP (when they were last active)

Optionally, depending on the bot's logic:

-   subscription\_status — TEXT or INTEGER (whether the subscription is active)
-   language — TEXT (user's language)
-   referral\_id — INTEGER (who invited them)
-   balance — INTEGER
-   A separate table for action or message history (user\_actions or messages)

The rule is simple: store only what you actually use. The fewer fields — the faster the database works, the fewer the security risks, and the easier the code is to maintain. Don't save everything "just in case".

### Creating a database with Claude

Creating a database with Claude is just a blast. It used to be a separate pain: writing SQL by hand, designing tables, setting constraints.

Today we almost never write SQL by hand — we manage the database through AI. You give Claude (or Grok, GPT) a clear prompt:

> Create a SQLite database for a Telegram bot in Python. users table with fields: user\_id INTEGER PRIMARY KEY, username TEXT, first\_name TEXT, created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP, last\_activity TIMESTAMP. Write functions: database initialization, adding a new user (with an existence check), getting a user by user\_id, updating last\_activity. Use a context manager and parameterized queries for safety.

And that's it. In two minutes you have a working database in your project with ready-made functions. Something that would have taken a "real" programmer an evening.

Claude will output ready-made code with a class or functions. You paste it into the project, check it, and refine it. The main vibe of vibe coding here: you don't write a database from scratch, you describe what you need, and AI generates the structure and methods. This greatly speeds up development.

### Refining the database through AI

Want to add a new field (for example, balance INTEGER DEFAULT 0)? Don't rewrite all the code. You give Claude a new prompt:

> Add a balance INTEGER DEFAULT 0 field to the existing users table. Write a migration that will add the column if it doesn't exist yet, and update all functions for working with the user.

AI will output an ALTER TABLE query and the updated functions. You run the migration once — and the structure is updated. The key skill of modern vibe coding: not rewriting code from scratch, but refining it through clear requests to AI. This saves hours and reduces the number of errors.

### How to download the database from the server

In production the database usually sits next to the bot — the bot.db file in the project root or in the data folder.

To download:

-   Connect to FileZilla.
-   Find the .db file.
-   Download it to your computer.
-   Move it into your IDE.

This is a very useful real-world case: sometimes you need to quickly see what's happening with users, fix a bug, or pull stats manually.

### Instructions

1\. Go into FileZilla.

2\. Click the name of our project folder.

3\. Then go into the data folder, right-click the DB file itself, and download it.

As another option, you can click "View/Folder" and then from the IDE move the file to the working file.

### Common mistakes and how to fix them

-   The database is created empty — you forget to run CREATE TABLE. Always add IF NOT EXISTS to CREATE TABLE.
-   Duplicate users — you don't check that user\_id exists before INSERT. Use INSERT OR IGNORE or ON CONFLICT.
-   Wrong file path — especially when the bot is on the server. Use an absolute path or os.path for reliability.
-   Claude breaks the code — it sometimes generates outdated syntax or doesn't account for asynchronicity (in aiogram 3). Always check: use check\_same\_thread=False for synchronous sqlite in multithreaded bots, or switch to aiosqlite for async.
-   Simultaneous writes from many users — SQLite handles this well, but under very high load there can be locks. Solution: short transactions and proper use of connection.

General fix: test everything locally with several simulated users, use parameterized queries (so there are no SQL injections), and always commit after changes.

Notes:

1\. If your program has code containing SQL code, then when you run the file a data folder will be created automatically with a file (.db extension).

## 📢💰 Broadcast system

A Telegram broadcast is a powerful tool for direct communication with an audience through a chatbot. Essentially, it is mass sending of messages to users who have ever interacted with your bot (wrote to it, ran the /start command, etc.). Unlike channels or groups, the broadcast goes to private chats, which makes it more personal and effective.

### Why you need a broadcast

A broadcast solves several key tasks of businesses and communities at once:

-   Notifications: promptly inform users about important events — product updates, order status, service changes.
-   Sales: announce promotions, discounts, new products or services and gently lead the audience toward a purchase.
-   Winning users back: "warm up" dormant clients, remind those who haven't visited in a long time about yourself.
-   Retention and loyalty: build long-term relationships through useful content, tips, case studies.

The advantages are obvious: high deliverability compared to email, immediacy, the ability to add buttons, images, videos, and even inline keyboards. With the right approach, conversion to actions (clicks, purchases) is significantly higher than with many other channels.

### How a broadcast works

The mechanics are simple and reliable:

1\. User database — this is a list of user\_id (identifiers) of everyone who has ever written to your bot. The bot cannot message first those who have not interacted with it — that is a Telegram rule.

1\. Loop over user\_id — a script or service goes through the database and sequentially (or in parallel with delays) sends a message to each user.

1\. Sending messages — via the Telegram Bot API, the sendMessage, sendPhoto, sendMediaGroup methods, etc. are called. You can add formatting, buttons, and personalization (name, past purchases, etc.).

Important: the broadcast is sent only from the bot the user has already written to. This guarantees legitimacy and reduces the risk of complaints.

### Using broadcasts in practice

Broadcasting is especially effective in two scenarios:

-   Sales — launching promotions, limited offers, personal discounts. Messages with a clear call to action (CTA) and buttons work well.
-   Winning users back — "We missed you!", "Your last order was a month ago — here's a special offer". Such reminders often bring back 5–15% of the dormant audience.

The main thing is to give value, not just sell. Useful content + rare commercial inserts work better than pure advertising.

### Summary

Broadcasting in Telegram is a ready-made, powerful and relatively simple tool that, when implemented correctly, gives you direct access to your audience. You already have a base, you know how to generate logic through Claude, write code and launch the process. Now the main thing is to keep a balance between frequency, usefulness and technical care.

Follow the plan above: collect only a "warm" base, handle errors, add delays, segment and test. Then broadcasting will become one of the highest-converting channels in your arsenal.

### Implementing the broadcast

A broadcast can be implemented in different ways — from simple builders to full-fledged code.

One of the modern approaches is generating logic through our favorite Claude. You describe the task, and AI helps create the script structure, error handling and even ready-made Python code snippets.

My broadcast code. You can copy it in full and paste it into Claude with the request "where should I insert this":

### 1\. FSM — broadcast states

```

class BroadcastFSM(StatesGroup):
    text      = State()   # Waiting for the message text
    media     = State()   # Waiting for media (photo/video/GIF) or skipping this step
    btn_menu  = State()   # Button management menu
    btn_text  = State()   # Waiting for the new button text
    btn_url   = State()   # Waiting for the new button URL
    btn_color = State()   # Waiting for the button color
    btn_row   = State()   # Waiting for the row (new or current)
```

### 2\. Main part

```

def _build_bc_kb(bc_buttons: list) -> InlineKeyboardMarkup | None:
    """Builds a keyboard from a list of button rows."""
    if not bc_buttons:
        return None
    rows = []
    for row in bc_buttons:
        btn_row = []
        for btn in row:
            kwargs = {"text": btn["text"], "url": btn["url"]}
            if btn.get("style"):
                kwargs["style"] = btn["style"]
            btn_row.append(InlineKeyboardButton(**kwargs))
        rows.append(btn_row)
    return InlineKeyboardMarkup(inline_keyboard=rows)

def _bc_buttons_menu_kb(has_buttons: bool) -> InlineKeyboardMarkup:
    rows = [
        [InlineKeyboardButton(text="➕ Add button", callback_data="bc:add_btn")],
    ]
    if has_buttons:
        rows.append([InlineKeyboardButton(text="🗑 Clear all buttons", callback_data="bc:clear_btns")])
    rows.append([InlineKeyboardButton(text="✅ Done — go to preview", callback_data="bc:done_btns")])
    rows.append([InlineKeyboardButton(text="❌ Cancel broadcast", callback_data="broadcast:cancel")])
    return InlineKeyboardMarkup(inline_keyboard=rows)

def _bc_color_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="🔵 Blue",   callback_data="bc_color:primary"),
            InlineKeyboardButton(text="🟢 Green", callback_data="bc_color:success"),
            InlineKeyboardButton(text="🔴 Red", callback_data="bc_color:danger"),      # ← correct
        ],
        [InlineKeyboardButton(text="◁ Cancel", callback_data="bc:add_btn_cancel")],
    ])

def _bc_row_kb(has_existing: bool) -> InlineKeyboardMarkup:
    rows = [[InlineKeyboardButton(text="🆕 New row", callback_data="bc_row:new")]]
    if has_existing:
        rows.append([InlineKeyboardButton(text="➡️ Add to current row", callback_data="bc_row:current")])
    rows.append([InlineKeyboardButton(text="◁ Cancel", callback_data="bc:add_btn_cancel")])
    return InlineKeyboardMarkup(inline_keyboard=rows)

async def _bc_show_btn_menu(msg, state: FSMContext):
    """Shows the button management menu."""
    await state.set_state(BroadcastFSM.btn_menu)
    data = await state.get_data()
    bc_buttons = data.get("bc_buttons", [])

    # In bc_btn_row_select and _bc_show_btn_menu:
    COLOR_ICON = {"primary": "🔵", "success": "🟢", "danger": "🔴"}   # ← was destructive
    COLOR_NAME = {"primary": "🔵 Blue", "success": "🟢 Green", "danger": "🔴 Red"}  # ← was destructive

    text = "📢 <b>Step 3 — Buttons</b>\n\n"
    if bc_buttons:
        text += "<b>Current buttons:</b>\n"
        for i, row in enumerate(bc_buttons, 1):
            parts = []
            for b in row:
                icon = COLOR_ICON.get(b.get("style", "primary"), "🔵")
                parts.append(f"{icon} [{b['text']}]")
            text += f"  Row {i}: {' | '.join(parts)}\n"
        text += "\n"
    else:
        text += "<i>No buttons yet — you can skip this step.</i>\n\n"

    await msg.answer(text, parse_mode=ParseMode.HTML,
                     reply_markup=_bc_buttons_menu_kb(bool(bc_buttons)))

async def _bc_send_preview(msg, state: FSMContext):
    """Sends a broadcast preview."""
    data = await state.get_data()
    bc_buttons = data.get("bc_buttons", [])
    kb       = _build_bc_kb(bc_buttons) if bc_buttons else None
    text     = data.get("bc_text", "")
    entities = data.get("bc_entities")

    await msg.answer("👁 <b>Broadcast preview:</b>", parse_mode=ParseMode.HTML)

    try:
        if data.get("bc_photo"):
            await msg.answer_photo(data["bc_photo"], caption=text,
                                   caption_entities=entities, reply_markup=kb, parse_mode=None)
        elif data.get("bc_video"):
            await msg.answer_video(data["bc_video"], caption=text,
                                   caption_entities=entities, reply_markup=kb, parse_mode=None)
        elif data.get("bc_animation"):
            await msg.answer_animation(data["bc_animation"], caption=text,
                                       caption_entities=entities, reply_markup=kb, parse_mode=None)
        else:
            await msg.answer(text, entities=entities, reply_markup=kb, parse_mode=None)
    except Exception as e:
        await msg.answer(f"⚠️ Preview error: {e}")

    await msg.answer(
        "Send the broadcast to all users?",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="✅ Send", callback_data="broadcast:confirm",
                                  icon_custom_emoji_id="5870633910337015697")],
            [InlineKeyboardButton(text="❌ Cancel",   callback_data="broadcast:cancel",
                                  icon_custom_emoji_id="5870657884844462243")],
        ]))

# ══════════════════════════════════════════════════════════════════
# Broadcast — handlers
# ══════════════════════════════════════════════════════════════════

@admin_router.message(Command("broadcast"))
async def cmd_broadcast(message: Message, state: FSMContext):
    await state.clear()
    await state.set_state(BroadcastFSM.text)
    await message.answer(
        "📢 <b>Broadcast — Step 1</b>\n\nEnter the message text:",
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Cancel", callback_data="broadcast:cancel")
        ]]))

@admin_router.message(BroadcastFSM.text)
async def bc_text(message: Message, state: FSMContext):
    await state.update_data(
        bc_text=message.text,
        bc_entities=message.entities,
        bc_photo=None, bc_video=None, bc_animation=None,
        bc_buttons=[],
        bc_temp_btn_text=None,
        bc_temp_btn_url=None,
        bc_temp_btn_color=None,
    )
    await state.set_state(BroadcastFSM.media)
    await message.answer(
        "📢 <b>Step 2 — Media</b>\n\nSend a photo, video, or GIF, or skip:",
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Skip ▶️", callback_data="broadcast:skip_media")],
            [InlineKeyboardButton(text="❌ Cancel",      callback_data="broadcast:cancel")],
        ]))

@admin_router.message(BroadcastFSM.media, F.photo | F.video | F.animation)
async def bc_media(message: Message, state: FSMContext):
    if message.photo:
        await state.update_data(bc_photo=message.photo[-1].file_id)
    elif message.video:
        await state.update_data(bc_video=message.video.file_id)
    elif message.animation:
        await state.update_data(bc_animation=message.animation.file_id)
    await _bc_show_btn_menu(message, state)

@admin_router.callback_query(F.data == "broadcast:skip_media", BroadcastFSM.media)
async def bc_skip_media(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await _bc_show_btn_menu(call.message, state)

# ── Button management ────────────────────────────────────────────

@admin_router.callback_query(F.data == "bc:add_btn", BroadcastFSM.btn_menu)
async def bc_add_btn_start(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await state.set_state(BroadcastFSM.btn_text)
    await call.message.answer(
        "✏️ <b>Enter the button text:</b>",
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="◁ Cancel", callback_data="bc:add_btn_cancel")
        ]]))

@admin_router.message(BroadcastFSM.btn_text)
async def bc_btn_text_input(message: Message, state: FSMContext):
    await state.update_data(bc_temp_btn_text=message.text.strip())
    await state.set_state(BroadcastFSM.btn_url)
    await message.answer(
        "🔗 <b>Enter the button URL</b> (must start with https://):",
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="◁ Cancel", callback_data="bc:add_btn_cancel")
        ]]))

@admin_router.message(BroadcastFSM.btn_url)
async def bc_btn_url_input(message: Message, state: FSMContext):
    url = message.text.strip()
    if not (url.startswith("https://") or url.startswith("http://")):
        await message.answer(
            "⚠️ The URL must start with <code>https://</code> or <code>http://</code>",
            parse_mode=ParseMode.HTML)
        return
    await state.update_data(bc_temp_btn_url=url)
    await state.set_state(BroadcastFSM.btn_color)
    data = await state.get_data()
    await message.answer(
        f"<b>Choose the button color</b>\n\n"
        f"Text: <b>{data.get('bc_temp_btn_text')}</b>",
        parse_mode=ParseMode.HTML,
        reply_markup=_bc_color_kb())

@admin_router.callback_query(F.data.startswith("bc_color:"), BroadcastFSM.btn_color)
async def bc_btn_color_select(call: CallbackQuery, state: FSMContext):
    await call.answer()
    color = call.data.split(":")[1]  # primary / success / destructive
    await state.update_data(bc_temp_btn_color=color)

    data = await state.get_data()
    bc_buttons = data.get("bc_buttons", [])
    has_existing = bool(bc_buttons)

    await state.set_state(BroadcastFSM.btn_row)

    COLOR_NAME = {"primary": "🔵 Blue", "success": "🟢 Green", "destructive": "🔴 Red"}
    await call.message.answer(
        f"<b>Where should the button be added?</b>\n\n"
        f"Color: {COLOR_NAME.get(color, color)}\n"
        f"Text: <b>{data.get('bc_temp_btn_text')}</b>",
        parse_mode=ParseMode.HTML,
        reply_markup=_bc_row_kb(has_existing))

@admin_router.callback_query(F.data.startswith("bc_row:"), BroadcastFSM.btn_row)
async def bc_btn_row_select(call: CallbackQuery, state: FSMContext):
    await call.answer()
    row_type = call.data.split(":")[1]  # new / current

    data = await state.get_data()
    bc_buttons = data.get("bc_buttons", [])
    btn = {
        "text":  data.get("bc_temp_btn_text", "Button"),
        "url":   data.get("bc_temp_btn_url",  "https://t.me"),
        "style": data.get("bc_temp_btn_color", "primary"),
    }

    if row_type == "new" or not bc_buttons:
        bc_buttons.append([btn])
    else:  # current — append to the last row
        bc_buttons[-1].append(btn)

    await state.update_data(
        bc_buttons=bc_buttons,
        bc_temp_btn_text=None,
        bc_temp_btn_url=None,
        bc_temp_btn_color=None,
    )

    COLOR_ICON = {"primary": "🔵", "success": "🟢", "destructive": "🔴"}
    icon = COLOR_ICON.get(btn["style"], "🔵")
    row_label = "a new row" if row_type == "new" or len(bc_buttons) == 1 else "the current row"
    await call.message.answer(
        f"{E_CHECK} Button {icon} <b>{btn['text']}</b> added to {row_label}.",
        parse_mode=ParseMode.HTML)
    await _bc_show_btn_menu(call.message, state)

@admin_router.callback_query(F.data == "bc:clear_btns", BroadcastFSM.btn_menu)
async def bc_clear_btns(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await state.update_data(bc_buttons=[])
    await call.message.answer("🗑 All buttons have been removed.")
    await _bc_show_btn_menu(call.message, state)

@admin_router.callback_query(F.data == "bc:add_btn_cancel")
async def bc_add_btn_cancel(call: CallbackQuery, state: FSMContext):
    """Cancel adding a button — return to the button menu."""
    await call.answer()
    await state.update_data(
        bc_temp_btn_text=None,
        bc_temp_btn_url=None,
        bc_temp_btn_color=None,
    )
    await _bc_show_btn_menu(call.message, state)

@admin_router.callback_query(F.data == "bc:done_btns", BroadcastFSM.btn_menu)
async def bc_done_btns(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await _bc_send_preview(call.message, state)

# ── Confirm and send ──────────────────────────────────────

@admin_router.callback_query(F.data == "broadcast:confirm")
async def bc_confirm(call: CallbackQuery, state: FSMContext):
    await call.answer()
    data = await state.get_data()
    await state.clear()

    bc_buttons = data.get("bc_buttons", [])
    kb       = _build_bc_kb(bc_buttons) if bc_buttons else None
    text     = data.get("bc_text", "")
    entities = data.get("bc_entities")
    ok = fail = blocked = 0

    status = await call.message.answer("📤 Broadcast started...")
    for uid in get_all_user_ids():
        try:
            if data.get("bc_photo"):
                await call.bot.send_photo(uid, data["bc_photo"], caption=text,
                                          caption_entities=entities, reply_markup=kb, parse_mode=None)
            elif data.get("bc_video"):
                await call.bot.send_video(uid, data["bc_video"], caption=text,
                                          caption_entities=entities, reply_markup=kb, parse_mode=None)
            elif data.get("bc_animation"):
                await call.bot.send_animation(uid, data["bc_animation"], caption=text,
                                              caption_entities=entities, reply_markup=kb, parse_mode=None)
            else:
                await call.bot.send_message(uid, text, entities=entities,
                                            reply_markup=kb, parse_mode=None)
            ok += 1
        except Exception as e:
            err = str(e).lower()
            if "bot was blocked" in err or "user is deactivated" in err or "chat not found" in err:
                mark_user_inactive(uid)
                blocked += 1
            else:
                fail += 1
        await asyncio.sleep(0.05)

    total  = get_users_count()
    active = get_real_active_count()
    await status.edit_text(
        f"{E_CHECK} <b>Broadcast complete</b>\n\n"
        f"Total in DB: <b>{total}</b>\n"
        f"Received: <b>{ok}</b>\n"
        f"Blocked the bot: <b>{blocked}</b>\n"
        f"Other errors: <b>{fail}</b>\n\n"
        f"Actually active: <b>{active}</b>",
        parse_mode=ParseMode.HTML)

@admin_router.callback_query(F.data == "broadcast:cancel")
async def bc_cancel(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await state.clear()
    await call.message.answer("Broadcast cancelled.", reply_markup=back_main_kb())
```

## 💰💎 Monetizing a Telegram bot: how to make money with your bot

Monetization is one of the most important stages after launching a bot. Even if the bot is very useful, without the right earning model it will remain just a hobby. There are several proven ways to generate income from a Telegram bot, but the most effective and stable are paid subscriptions and selling ads.

### Main ways to make money with a bot

1\. Paid subscriptions The most popular and stable model is a monthly subscription. The user pays a fixed amount (for example, 290–990 RUB per month) and gets access to the bot's advanced features.

The "subscription + token limit" model works best (especially relevant for AI bots):

-   Free plan — a limited number of tokens/requests per day (for example, 10–20 messages).
-   Paid subscription — a large token package per month (5000–50 000 tokens) + processing priority, extra features, no ads.

This system is convenient for users: they understand what they are paying for and can control their usage. Automatic subscription renewal increases LTV (customer lifetime value).

1\. Selling ads inside the bot (recommended method) When the bot gets an active audience (from 500–1000 daily users), you can place ads.

-   Direct advertisers pay for mentions of their services or products.
-   Sponsored messages or affiliate links.
-   Advertising of other bots or channels (mutually beneficial exchange).

It's important to show ads unobtrusively — for example, after a certain number of requests or in a separate section. Currently as of 2026, the most common ads are VPN ads, proxies...

1\. Additional monetization models

-   One-time purchases (token packages without a subscription).
-   Selling digital goods through the bot (courses, templates, prompts, etc.).
-   Affiliate programs (a referral system — the user brings friends and gets bonuses).

### Implementation recommendations

-   Start with a freemium model (free + paid) so users try the bot and want more.
-   Use reliable services for accepting payments: Tribute, SBP or Telegram Stars .
-   Automate everything: subscription checks, token issuance, renewal and cutting off access when the subscription ends.
-   Test different prices and token packages — what works in one niche may not work in another.

Proper monetization turns a bot from a tool into a real business. Many successful AI bots on Telegram earn from several hundred thousand rubles a month precisely through subscriptions with a token limit and a mandatory channel subscription.

## Mandatory channel subscription at bot start

Okay, now about the coolest marketing trick in all of bot-building. Remember this trick, it pays for creating the bot all by itself.

How does a cool club work offline? You show up — face control at the door. Don't pass the dress code — you don't get in. Not a friend of someone from the inside — you don't get in. This creates value: people want to get into a place that doesn't let just anyone in.

In the bot world the same thing works incredibly well. You do this: the user starts the bot → the bot says: "Hi! To use it — subscribe to our channel \[button\]. After subscribing, tap 'Check' \[button\]". That's it. Free. Nobody paid a single ruble.

What this gives you:

One. Every new bot user = a new channel subscriber. If the bot grows at a rate of 100 users a day — the channel grows at a rate of 100 subscribers a day, for free.

Two. A channel is a separate asset that you later monetize. Ads in a channel with 10k subscribers cost from 5k rubles per post. A 100k channel — from 50k. And this is not your bot, this is a separate stream of money.

Three. Channel users become warm. They know your brand, see your content, trust you. When you later sell a paid subscription to the bot — conversion will be 3-5 times higher than with "cold" users.

A small aside on the topic.

Okay, you've driven users into the channel through face control. And what do you post in this channel? So the channel doesn't turn into a graveyard of subscribers who unsubscribed a week later?

This is a separate pain point, and many stumble on it: they built the bot, drove in the users, but there's no content — the channel dies. In my course on the Creator plan there's an entire "Freelance 2.0" block — it's a 12-stage system where AI assistants do full-cycle content marketing for you:

-   unpacking expertise and audience segmentation,
-   generator of conversational Reels from voice messages (you drop in a voice note — a 180-word script comes out),
-   generator of expert carousels based on 7 structures,
-   generator of warm-ups for product launches,
-   longreads and notes for Telegram across 5 types.

Not so you "become a blogger in underwear in front of a camera," but so your face-control channel actually lives and warms the audience for future paid subscriptions. More details — here.

Okay, next on face control in the code.

## How it works:

On the bot's first launch (/start) the user sees a message: "To start using the bot, subscribe to our channel → \["Subscribe" button\] After subscribing, press the "Check subscription" button."

Only after a successful subscription check does the bot open full access.

Pros of this approach:

-   Fast growth of channel subscribers.
-   The channel can be additionally monetized (ads, your own paid posts, selling subscriptions).
-   Users become "warm" — they already know your brand.

Tip: add a GIF or a photo to the mandatory-subscription message to dress up that message.

### The mandatory subscription code itself:

1\. Constants (the doorman's notebook):

```

CHANNEL_ID = "@cristo_bot"
CHECK_ID = -1113994288325
CHANNEL_GIF_FILE_ID: str | None = None
```

What this is: the doorman's notebook with the VIP-list address. This is where the details of the channel we'll force people to subscribe to live.

-   CHANNEL\_ID — this is the channel's @-username (works for public channels).
-   CHECK\_ID — this is the channel's internal numeric ID. It's needed for private channels that don't have an @-handle. It always starts with 100.
-   CHANNEL\_GIF\_FILE\_ID — this is the greeting GIF cache. Empty for now (None), but it will fill in on the first send (more on this in Block 5).

Where to insert: at the very top of main.py, in the constants section, next to BOT\_TOKEN and ADMIN\_ID.

Where to get CHECK\_ID: forward any message from your channel to the @userinfobot bot — it will show the channel's internal ID. Copied — pasted.

What to change for yourself: @cristoferpub → your channel's @-username, -1003994288325 → your CHECK\_ID. These two values must be replaced, otherwise the bot will check subscription to someone else's channel.

2\. Subscription check (the doorman picks up the walkie-talkie):

```

async def check_user_subscription(bot: Bot, user_id: int) -> bool:
    if user_id == ADMIN_ID:
        return True
    try:
        member = await bot.get_chat_member(CHANNEL_ID, user_id)
        return member.status not in ("left", "kicked")
    except Exception as e:
        logger.warning("check_sub ERROR uid=%s: %s", user_id, e)
        return False
```

What this is: the doorman picks up the walkie-talkie and asks Telegram — "Is this user on our VIP list?". Telegram replies with one of six statuses: creator, administrator, member, restricted, left, kicked. If the answer is left or kicked — the user is not subscribed. Everything else — subscribed.

Trick #1 (admin bypass): ADMIN\_ID (that's you) is always let through without a check. Why? Because you as the admin shouldn't have to subscribe to your own channel to get into your own bot. That would look like self-deception.

Trick #2 (fail-safe): if Telegram glitched and returned an error (and that regularly happens under heavy load) — the function returns False ("not subscribed"). This is the fail-safe principle: better to accidentally keep one of your own out than to accidentally let a stranger in. One admin gets offended — whatever. If you let in 10 000 free riders — that's already lost money.

Engineering principle: Hunt and Thomas in The Pragmatic Programmer write: "Crash early, fail safe". On failure we close, rather than opening wide. This is exactly that principle.

Where to insert: in main.py, before the handler and middleware declarations. Or in a separate utils.py file, if you have a folder-based architecture.

3\. Keyboard (the sign by the door):

```

def subscribe_kb():
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="Subscribe to the channel",
            url=f"https://t.me/cristoferpub",
        )],
        [InlineKeyboardButton(
            text="Check subscription",
            callback_data="check_subscribe",
        )],
    ])
```

What this is: a sign by the restaurant door with two buttons. The first (url=...) — opens Telegram on the channel page. The second (callback\_data="check\_subscribe") — sends the bot a signal "I've already subscribed, check me".

The difference between the two types of buttons (remember this, it's important):

-   A button with url is a jump outward, Telegram handles it itself, the bot doesn't even know about it. That's why it doesn't trigger anything in the code.
-   A button with callback\_data is a signal into the bot, it triggers a handler (more on that in Block 6).

This is an inline keyboard — it attaches TO the message (visible right under the message text), unlike a reply keyboard (it hangs at the bottom of the screen like the buttons in the Yandex.Taxi bot). Don't mix them up.

Where to insert: in the keyboards.py file (if you have a folder-based architecture) or right in main.py next to the other keyboards.

What to change for yourself: cristo\_bot in the url= line → your channel's @-username without the @.

4\. Middleware (the guard at the door HIMSELF) ⚠️ The most important:

```

class SubscriptionCheckMiddleware(BaseMiddleware):
    ALLOWED_CALLBACKS = {"check_subscribe"}
    ALLOWED_COMMANDS = {"/start"}

    async def __call__(self, handler, event, data):
        user = data.get("event_from_user")
        if not user or user.id == ADMIN_ID:
            return await handler(event, data)

        if hasattr(event, 'data') and event.data in self.ALLOWED_CALLBACKS:
            return await handler(event, data)
        if hasattr(event, 'text') and event.text and event.text.split()[0] in self.ALLOWED_COMMANDS:
            return await handler(event, data)

        bot = data.get("bot")
        if bot is None:
            return await handler(event, data)

        is_subscribed = await check_user_subscription(bot, user.id)
        if is_subscribed:
            return await handler(event, data)

        sub_text = (
            f"<tg-emoji emoji-id='5424972470023104089'>🔥</tg-emoji> "
            f"<b>To use the bot, subscribe to the channel</b>\n\n"
            f"<blockquote>Subscribe to our channel and tap “Check subscription”</blockquote>"
        )
        try:
            if hasattr(event, 'message') and event.message:
                await event.message.answer(sub_text, parse_mode=ParseMode.HTML, reply_markup=subscribe_kb())
                try:
                    await event.answer()
                except Exception:
                    pass
            elif hasattr(event, 'chat'):
                await event.answer(sub_text, parse_mode=ParseMode.HTML, reply_markup=subscribe_kb())
        except Exception as e:
            logger.warning("SubscriptionCheckMiddleware send error: %s", e)
        return
```

This is the most important piece in the entire block. If you're hearing the word "middleware" for the first time — relax, I'll break it down now.

Middleware (in Russian — "intermediate layer") — is a guard at the turnstile before the handlers. Every message, every callback, every whatever from the user first goes through middleware, and only then, if it let them through — it flies into your handler.

How it works step by step (read it like a movie script):

1\. The user clicked a button or wrote something. Middleware intercepts them at the entrance.

1\. "Is this the admin (you)?" → we let through without questions, you're the owner after all.

1\. "Is this the check\_subscribe callback?" → we let through. Otherwise the user won't be able to press the "Check subscription" button — it would be blocked itself, a paradox.

1\. "Is this the /start command?" → we let through. Otherwise the user won't even be able to enter the bot to see the greeting with the subscription buttons.

1\. Everything else: we ask Telegram — subscribed or not?

-   Subscribed → we let them through to the handler.
-   Not subscribed → we show the face-control message and cut off further processing (that same return at the very end).

This is the velvet rope in front of the club entrance.

Where to insert: in a separate middlewares.py file or at the beginning of main.py before the handler declarations.

CRITICAL — whitelist: ALLOWED\_COMMANDS and ALLOWED\_CALLBACKS — this is the whitelist of exceptions. If you add a /help command that should work even for unsubscribed users — add it to ALLOWED\_COMMANDS. Otherwise the user won't even be able to look at help without subscribing to the channel — that's annoying and lowers conversion.

5\. Check in /start (VIP greeting with a gif):

```

is_subscribed = await check_user_subscription(message.bot, message.from_user.id)
if not is_subscribed:
    sub_text = (...)
    if CHANNEL_GIF_FILE_ID:
        await message.answer_animation(animation=CHANNEL_GIF_FILE_ID, caption=sub_text, ...)
    elif os.path.exists(channel_gif_path):
        sent = await message.answer_animation(animation=FSInputFile(channel_gif_path), ...)
        CHANNEL_GIF_FILE_ID = sent.animation.file_id
    else:
        await message.answer(sub_text, reply_markup=subscribe_kb())
    return
```

What this is: an additional check right in the /start handler.

Logical question: why is it needed if there's already middleware from Block 4?

Because in /start we want to show a nice greeting gif — not just dry text. Middleware shows the default message to all unsubscribed users. And in /start we do a VIP address: a greeting gif + text + buttons. This works several times better for conversion than a dry "subscribe".

The CHANNEL\_GIF\_FILE\_ID trick (important to understand, this is the foundation of optimization):

The first time the bot loads the gif from disk (FSInputFile(channel\_gif\_path)) — that's slow. But Telegram returns a file\_id in response — the internal identifier of this gif on Telegram's servers. We cache it in the CHANNEL\_GIF\_FILE\_ID variable.

Every subsequent time the bot sends the gif by file\_id — that's 100 times faster, because the file is already on Telegram's servers, no need to haul it from disk.

Without this optimization, with 1000 simultaneous users hitting /start the bot will lag — every time it will read a heavy gif from disk. This is basic engineering for scaling.

Where to insert: inside the @user\_router.message(CommandStart()) handler (or whatever it's called for you), at the very beginning of the function.

6\. Handler for the "Check subscription" button:

```

@user_router.callback_query(F.data == "check_subscribe")
async def check_subscribe_cb(call: CallbackQuery, state: FSMContext):
    await call.answer()
    is_subscribed = await check_user_subscription(call.bot, call.from_user.id)
    if not is_subscribed:
        await call.answer("You have not subscribed to the channel yet!", show_alert=True)
        return
    try:
        await call.message.delete()
    except Exception:
        pass
    upsert_user(call.from_user.id, call.from_user.username, call.from_user.full_name)
    # show the main menu...
```

What this is: what happens when the user taps "Check subscription". Breakdown step by step:

1\. call.answer() — instantly removes the "spinner" from the button. Otherwise the user will have a loading indicator spinning for about three seconds and will think "the bot froze".

1\. The bot asks Telegram: "Is this user already on our VIP list?"

1\. If no → an alert popup flies out: "You haven't subscribed to the channel yet!" (this is a small popup message, very noticeable, the user will definitely see it).

1\. If yes → it deletes the old message with the subscription buttons (so it doesn't hang as a corpse in the chat), writes the user to the DB via upsert\_user, and shows the bot's main menu.

What upsert is: it's a hybrid of update + insert — "insert a new user if they don't exist yet, or update the data if they already do". We write the user to the DB exactly at the moment of a successful subscription check, not immediately on /start.

Why this matters: so you don't clutter the DB with people who came, saw the subscription requirement, and left right away. With bots that audience is always around 20–30%. If you write them all to the DB on /start — you'll have a million "dead souls" that ruin the stats and bloat the database.

Where to insert: next to the other callback\_query handlers, in the handlers/user.py file or in main.py — wherever you have all the other callbacks.

7\. Connecting in main():

```

sub_checker = SubscriptionCheckMiddleware()
dp.message.middleware(sub_checker)
dp.callback_query.middleware(sub_checker)

```

This is the most treacherous moment. You can write a genius middleware from Block 4 — but if you don't register it in these three lines, it just lies dead in the file. There's no guard at the door, everyone walks in freely.

What these three lines do, line by line:

-   sub\_checker = SubscriptionCheckMiddleware() — we create an instance of the guard (we hire him for the job).
-   dp.message.middleware(sub\_checker) — we put the guard at the messages turnstile. Every incoming message from the user will go through him.
-   dp.callback\_query.middleware(sub\_checker) — we put the same guard at the button-press turnstile. Every click on an inline button also goes through him.

Done ONCE when the bot starts, in the main() function BEFORE dp.start\_polling(). If you put it after start\_polling — it's too late, the bot is already running without security.

Symptom that you forgot to connect it: the bot works, the user writes /start, sees the main menu right away — no face control. If that's you — it means you didn't connect the middleware. You go into main() and add these three lines.

## Face-control finale — three assembly steps

One. Copied all 7 code blocks into your files following the "where to insert" hints. Don't skip a single one — each does its part of the work.

Two. Replaced @cristoferpub and -1003994288325 with your own channel and its ID. Without this the bot will push a subscription to someone else's channel — that doesn't work.

Three. Restarted the bot, unsubscribed from your channel on a test account, sent /start — you should see face-control with two buttons. If you see the main menu right away — you forgot to hook up the middleware in main() (Block 7). Go add it.

Pitfall #1: the bot needs to be made a channel admin, otherwise get\_chat\_member will throw the error "bot is not a member of the channel". Solution: BotFather → or right in the channel itself → Manage → Administrators → add your bot. You can grant minimum permissions — the main thing is that it's among the admins.

Pitfall #2: don't run the check too often. If the user just subscribed and immediately unsubscribed — let them use at least one session, otherwise it feels like "the bot hates me". A check on /start and via middleware on actions is enough. Checking before every generation is overkill, it pisses the user off.

Vibe-coding bonus (once you've got it all): Now that you've figured out what each block does — you can surgically refine the logic through Claude. Example prompts for real tasks:

> "I already have SubscriptionCheckMiddleware (here's the code \[you paste Block 4\]). Add a subscription check for 2 channels — @channel1 and @channel2. The user must be subscribed to both. Don't rewrite all the code — show only what needs to change."

> "Add logging: every time a user passes the subscription check — write it to the subscription\_log table with user\_id, timestamp, and the channel. Use my existing code from Block 6 as a base."

When you understand the architecture — surgical edits take minutes. When you don't — you have to ask Claude to rewrite everything from scratch every time, which ruins all the previous tuning. That's the power of vibe-coding done right: you're not "mashing buttons at random", you're an architect who knows exactly which brick does what.

## 💳⭐ Payment methods in Telegram: theory

Okay, now the favorite moment of the course. How do you take money from users? I cover this in detail in the extended training program in a separate module, but in short — you have two main payment systems, and they are very different.

### Overview of payment methods in Telegram

In 2026, Telegram has three main ways to accept payment in a bot:

1\. Direct transfer — the user sends money directly through Telegram

2\. Telegram Stars — Telegram's built-in currency

3\. CryptoBot — a bot for paying with cryptocurrency

Each method has its own pros, cons, and use cases. Let's go through each in detail.

### Direct transfer

The simplest way — the bot sends the user payment details, the user opens their banking app and makes a regular transfer.

How it works: The user taps "Buy" → the bot sends the details (card number or phone) → the user opens Sber, T-Bank, or any other app → makes a regular transfer → sends a screenshot → the admin checks and grants access manually.

Pros:

-   No technical setup — just send the payment details
-   No legal entity or paperwork needed
-   Works with regular rubles with no conversion
-   Zero fee on transfers between individuals

Cons:

-   Everything is manual — you have to check every payment and grant access yourself
-   You need to be online or the user will wait
-   No automation — the bot cannot credit the payment itself
-   Risk of errors — the user may transfer the wrong amount or fail to send a screenshot

When to use: At the start when there are few payments and it's important not to spend time on setup. When the audience is Russian-speaking users with Russian bank cards. When volume grows — better to switch to Stars or CryptoBot for full automation.

### Telegram Stars

Stars — Telegram's official built-in currency for digital goods and services. Launched in 2024 and became the standard for bot monetization.

How it works: The user buys Stars in advance through Telegram → spends them in the bot with one tap, no card entry.

Pros:

-   Setup in 2 minutes via BotFather
-   No legal entity or paperwork needed
-   High conversion — the user already has Stars
-   Built into Telegram, inspires trust
-   Works worldwide

Cons:

-   30% fee
-   Digital goods only
-   Withdrawal via Fragment in TON — an extra step

When to use: When you sell digital content, subscriptions, access to bot features. Ideal for starting without the bureaucracy.

### Payment via CryptoBot

CryptoBot — Telegram's official bot for accepting cryptocurrency payments. Supports TON, USDT, BTC, ETH and other coins.

How it works: You create an invoice via the CryptoBot API → the user gets a payment link → goes to @CryptoBot and pays from their crypto wallet → the bot receives a payment notification via webhook and delivers the product.

Pros:

-   Simple integration — a ready-made API with documentation
-   No need for your own blockchain wallet
-   Support for many cryptocurrencies (TON, USDT, BTC, ETH, etc.)
-   Works without a legal entity or banks
-   Perfect for international payments
-   Stable payments in USDT without volatility

Cons:

-   Not all users have an account in @CryptoBot
-   Commission of 0.1–1% depending on the currency
-   The user leaves your bot to pay
-   Dependence on a third-party service

When to use: When you need crypto payment without a complex technical implementation, when the audience is international, when you want to accept stablecoins (USDT) without exchange-rate volatility.

My advice - "connect both payment methods. The user chooses how to pay, and conversion grows another 15-20%".

### Comparison of all three methods

Technical off-topic, but important.

Accepting the money is half the job. Then comes what the user doesn't see, but eats up 80% of the owner's time:

-   admin notifications in Telegram: "paid 990₽ from @ivan"
-   recording the client in CRM (Amo, Bitrix)
-   auto-granting access to a paid channel (via invite link)
-   subscription renewals, refunds, receipts to email
-   follow-up nudges to those who opened payment and dropped off (after 10 minutes, 6 hours, 24 hours — as we covered with the subscription)
-   a daily revenue summary report to the admin chat

If you put all this together by hand — congratulations, you have a 6-hour-a-day job for the rest of your life. If you want this to work visually without code — that's the Make module in my full program (view). And if you understand that at 1000 payments a day cloud Make will ruin you on its plans — there's the N8N module: you deploy it on your own server for $5 a month, and as many operations as you want, plus client data doesn't leak into someone else's cloud (view).

This guide is about accepting payment. Those modules are about everything after.

### Which method to choose

Just starting and want to launch monetization quickly: → Telegram Stars. No bureaucracy, setup in 2 minutes.

Want to accept rubles without conversion: → Direct transfer via SBP. Lower commission, rubles go straight to the account.

International audience or need crypto payment without complications: → CryptoBot. Simple integration, support for USDT and other coins, minimal commission.

Optimal strategy for most: Start with Stars → when volume has grown and the 30% commission has become noticeable → add SBP in parallel → when international users appear → add TON.

### Lesson recap

-   In Telegram there are three ways to accept payment: direct transfer, Stars and TON
-   Stars — the best start without documents, but a 30% commission
-   Direct transfer — minimal commission
-   CryptoBot — simple crypto payment with USDT support and a minimal commission
-   In the next lesson we'll write the code for each method with Claude

## Method 1 — Direct transfer

How to use the prompts from this section

In this and the following lessons we provide ready-made prompts for each feature. Here's how it works:

1\. You open Claude

1\. You paste all your bot's code

1\. You insert the prompt from the lesson

1\. Claude adds the feature to your code

You don't need to write anything yourself — just copy the prompt, adapt it to your project, and run it. That's vibe coding in action.

### Direct transfer: adding it to the bot

Roughly what it all looks like:

```

The user taps "Buy"
        ↓
The bot sends the payment details (phone number, bank, amount)
        ↓
The user transfers the money and sends a screenshot
        ↓
The screenshot goes to the admin immediately with "Approve" / "Reject" buttons
        ↓
The admin taps "Approve" → the user gets access

The admin taps "Reject" → the user gets a rejection
```

### Prompt for Claude

```

Add direct bank-transfer payment to the bot. Here is how it should work:
The user taps the "Buy" button → the bot sends a message with the payment details (phone number, bank, recipient name, amount) and asks them to send a screenshot of the payment. When the user sends a photo — it goes to the admin (ADMIN_ID) immediately, with the user's name and ID and two buttons "✅ Approve" and "❌ Reject". If the admin taps Approve — the user gets a message that access has been granted. If they tap Reject — that the payment was not confirmed.
Also add a way in the admin panel to change the payment details from inside the bot — phone number, bank, and recipient name. The details must be stored in the database so that after a change they apply immediately to all new payments.
Do not rewrite all the code — only add what is needed and say exactly where to insert it
```

## Method 2 — Payment via Telegram Stars

How it works:

Unlike a direct transfer, here everything happens automatically — no admin involvement needed. The user presses a button, sees Telegram's native payment window, confirms — and the bot does everything itself. This is the fastest and most convenient payment method for the user because the Stars are already in their wallet and there's no need to go anywhere or take screenshots.

```

The user taps "Buy"
        ↓
The bot sends an invoice straight into the chat
        ↓
The user taps "Pay" and confirms with Stars
        ↓
Telegram automatically notifies the bot about the payment
        ↓
The bot grants access on its own — with no admin involved
```

The main difference from a direct transfer is full automation. No need to check screenshots, no need to sit online and confirm payments manually. The bot works 24/7 and grants access itself right after payment.

Three events that happen during payment:

sendInvoice — the bot sends the user an invoice. Inside we specify the product name, description, price in Stars, and an internal purchase identifier.

pre\_checkout\_query — before deducting Stars, Telegram asks the bot "is everything okay, do we accept the payment?". The bot must reply within 10 seconds. Here you can add any checks — for example whether the user has already purchased. If everything is ok — we reply ok=True and the Stars are deducted.

successful\_payment — Stars have been successfully deducted. Here the bot delivers what was paid for — opens access, credits generations, sends a file, and so on.

Prompt for Claude:

```

Add Telegram Stars payments to the bot. Here is how it should work:

The user taps the "Buy" button → the bot sends an invoice for 100 Stars
with the title "Bot access" and the description "Full access to all features".
After a successful payment the bot automatically sends the user a message
that access has been granted and assigns them the required permissions.

Do not forget to add a pre_checkout_query handler that answers ok=True
and a successful_payment handler that grants access.

Do not rewrite all the code — only add what is needed
```

Common problems:

Stars are not enabled in BotFather — the invoice will be sent but tapping the payment button will produce an error. Solution — enable Stars via BotFather as described above.

No pre\_checkout\_query handler — the payment hangs forever and the user sees a spinning indicator. This is the most common error when implementing Stars. If Claude forgot to add this handler — tell it about this separately.

## Method 3 — Payment via CryptoBot

How it works:

Unlike Stars, here the user briefly leaves your bot — they go to @CryptoBot to confirm the payment. But this method works with cryptocurrency (USDT, TON, BTC, and others) and requires neither a legal entity nor a linked card. For an international audience this is often the only convenient payment option.

```

The user taps "Buy"
        ↓
The bot creates an invoice through the CryptoBot API
        ↓
The bot sends the user a button with a payment link
        ↓
The user opens @CryptoBot and confirms the payment
        ↓
CryptoBot sends a webhook to your bot about the successful payment
        ↓
The bot grants access on its own — with no admin involved
```

The main difference from Stars is that the user leaves the chat to pay. This lowers conversion, but it opens an international audience and lets you accept stablecoins (USDT) without exchange-rate volatility. The bot still works automatically — a webhook from CryptoBot signals payment and access is granted without an admin.

Three steps that happen during payment:

createInvoice — the bot makes a POST request to the CryptoBot API and creates an invoice. We specify the currency (e.g. USDT), the amount, a description, and payload — an internal identifier we'll later use to figure out what was purchased and by whom.

pay\_url — in response to createInvoice, CryptoBot returns a payment link. The bot sends it to the user as an inline button. The user taps it → lands in @CryptoBot → confirms the payment.

webhook / getInvoices — after payment, CryptoBot notifies your bot. There are two options: a webhook (CryptoBot itself sends a notification — recommended) or polling via getInvoices (the bot periodically checks the status). From the payload we identify the user and grant access.

Prompt for Claude

```

Add CryptoBot payments to the bot. Here is how it should work:

The user taps "Buy" → the bot creates an invoice through the CryptoBot API
for 1 USDT with the description "Bot access" and payload = the user's user_id.
The bot sends the user an inline button with the payment link.
After payment CryptoBot sends a webhook — the bot checks the payload,
finds the user, and sends them a message that access has been granted.

The CryptoBot API token is stored in the CRYPTO_BOT_TOKEN variable.
Do not rewrite all the code — only add what is needed.
```

Pitfall #1 with Stars: you must enable Stars in BotFather (/mybots → your bot → Bot Settings → Payments → enable Stars). Without this, the invoice will be created, but when trying to pay the user will see an error, and you'll spend three hours in the debugger looking for "what's wrong".

Pitfall #2 with Stars:

you must handle pre\_checkout\_query — this is a technical handler that Telegram fires before charging money to ask "ok, can we charge?". If you didn't reply to it with ok=True — the payment hangs forever, the user sees a spinning indicator, you look like a scammer. The most common Stars mistake. Claude sometimes forgets to add this — check it manually.

Vibe-coding bonus: Prompt for Claude:

> "Add Telegram Stars payment to the bot. 'Buy premium' button → invoice for 100 Stars titled 'Premium' with the description 'Access to all features for a month'. After successful payment, set the premium\_until field in the DB for this user\_id = current date + 30 days. Be sure to add a pre\_checkout\_query handler that replies ok=True. Don't rewrite all the code — only add what's needed."

Write it exactly like that. Be sure to mention pre\_checkout\_query — it will save you hours of debugging.

## 📝📋 Registration in Claude and basic setup

First you need to create an account.

The registration process is standard:

-   go to the Claude website
-   click the sign-up button
-   enter your email or sign in with Google / Apple
-   confirm your email

After that you land in the model interface and can start working.

## Phone number verification

At certain stages or depending on the region, Claude may require phone number confirmation.

What happens:

-   you enter your number
-   you receive an SMS code
-   you confirm the account

This is done to limit abuse and create a unique user.

## What to keep in mind

-   not all numbers may be accepted by the system
-   sometimes the code arrives with a delay
-   in rare cases verification may not go through on the first try

This is a normal situation, and it can be worked around.

## What to do when you have access problems

During registration or use, restrictions may come up. Below are the main cases and solutions.

### 1\. SMS code doesn't arrive

Possible reasons:

-   service overload
-   region restrictions
-   carrier issues

What you can do:

-   wait 1–2 minutes and request the code again
-   try a different number
-   use a number from a different carrier

### 2\. Service unavailable in the region

Sometimes Claude may restrict access in certain countries.

Solution:

-   use a VPN
-   choose stable regions (e.g. Europe / USA)

Important: after registration, it's better to log in from the same region to avoid extra checks.

### 3\. Sign-in errors

Sometimes issues come up:

-   won't let you into the account
-   session gets dropped
-   infinite loading

What to do:

-   clear the browser cache
-   try a different browser
-   open in incognito mode

### 4\. Usage limits

Over time you may run into limits:

-   a cap on the number of requests
-   temporary generation block

This is normal — all models have limits.

Solutions:

-   wait for the limit to reset
-   use a different account
-   alternate between models

## Important point

At this stage you don't need to go deep into every detail.

Your task is simply to:

-   sign up
-   get access to Claude
-   make sure everything works

The remaining nuances (limits, optimization, etc.) will be covered later in the course.

## Summary

After this block you should have:

-   a working Claude account
-   completed verification
-   an understanding of how to solve basic access problems

This is the foundation without which you can't move on to practice and building projects.

## Claude settings and interface

Working with Claude is not just writing prompts. Understanding the interface and correctly configuring the model for your tasks plays a big role. If you skip this stage, you'll get unstable answers, extra text, and constant errors in the code.

This section covers how the Claude interface is structured, which settings actually affect the result, and how to set them correctly for vibe coding.

## How to get to the settings

To open settings, you need to click on your name (profile) in the Claude interface and go to the Settings / Preferences section.

This is where you set the model's baseline behavior, which will apply to all of your conversations.

## Claude Interface

The Claude interface is designed to be as simple as possible, but it is still important to understand how each element affects the work.

Main interface areas:

-   input field — this is where you write tasks and prompts
-   model selection — switching between Opus, Sonnet, and Haiku
-   Extended Thinking toggle — turns on deep analysis mode
-   conversation history — access to previous chats
-   settings (Settings / Preferences) — customizing the model's behavior

Understanding these elements lets you navigate faster and stay in control of the work process.

## The "My Preferences" (Preferences) section

This is one of the most important sections, and many people underestimate it. In practice, it is what determines how high-quality the answers you get will be.

Here you set the rules the model will follow by default.

## Setting the response style

The first thing you need to set is the response format.

Without settings, the model often:

-   writes too much text
-   goes into theory
-   gives vague answers

To avoid this, you need to specify the format explicitly.

Recommended option:

Respond in a structured way, without fluff. If you provide code — explain what it does. Do not rewrite all the code if I ask you to make changes.

This setting immediately makes answers more practical and convenient to work with.

## Setting behavior when working with code

This is a critically important point for vibe coding.

By default, the model often rewrites the code entirely, even if only one line needs to be changed. This leads to errors and a loss of control over the project.

To avoid this, you need to set clear rules.

Example setting:

```

When working with the code, do not rewrite everything from scratch. Make only the necessary changes and explain exactly what changed.
```

After that, the model starts:

-   making targeted edits
-   taking existing code into account
-   breaking already working parts of the project less

## Setting the work context

Another important point is to tell the model what you do.

Without this, it does not understand what format to give answers in.

Example:

```

I build Telegram bots and websites with AI. I need practical solutions, without extra theory.
```

This allows the model to:

-   give more practical answers
-   not go into unnecessary explanations
-   hit the right format faster

## Extended Thinking (thinking mode)

There is a separate toggle in the interface — thinking.

It turns on a mode in which the model spends more time analyzing the task and produces a more considered answer.

It is worth using in the following cases:

-   complex logic
-   unclear errors
-   architecture design
-   situations where the model gives weak answers

At the same time, it is better not to turn it on for simple tasks, as it slows down the work and increases limit usage.

## How settings affect the result

The difference between a configured and an unconfigured model is very noticeable.

Without settings:

-   a lot of extra text
-   rewriting code
-   generic, vague answers

With configured preferences:

-   answers become shorter and more precise
-   code — more careful
-   fewer edits on your side
-   higher predictability of the result

In essence, you start managing the model rather than adapting to it.

## Minimal set of settings

In short, there is a basic set that you must set.

Response style:

-   structured
-   without fluff

Working with code:

-   do not rewrite everything
-   make only the changes

Context:

-   specify what you do (bots, websites, automation)

This is already enough to greatly improve the quality of the work.

## Summary

Claude settings are not a secondary element, but the foundation of effective work.

They allow you to:

-   reduce the number of errors
-   speed up the development process
-   make answers stable and predictable

If you skip this step, you will spend more time fixing answers than on the development itself.

## The prompt system in vibe coding

The prompt system is the foundation of all work with AI in development. Through prompts, you are not just "talking" to the model — you are actually managing the product creation process. It is important to lock in a key idea right away: you do not need to become an expert at wording or search for the "perfect prompt."

In real work, everything is structured differently. Results come not from a single precise command, but through successive iterations: you set a task, get a result, analyze it, and adjust. This cycle is the foundation of vibe coding.

## How your role changes

In classic programming, you write code directly. In vibe coding, you work at the management level.

Now your task is to:

-   set a clear task
-   check the result
-   make adjustments

AI acts as the executor, and the prompt is your technical specification. The better you manage this process, the higher the quality of the result.

## The mistake that holds most people back

Many beginners initially think they need to formulate requests perfectly, otherwise nothing will work. This creates extra tension and slows the work down.

In practice:

-   you can write in simple words
-   you can formulate imperfectly
-   you can change the task as you go

The main thing is not the precision of the wording, but the ability to get the result to the desired state.

## The basic principle of working with code

There is one rule that critically affects project stability:

### 👉 Do not rewrite the code, add to it

This principle should be used almost always.

If you ask the model to rewrite the code, it starts changing the structure, touches already working parts, and often breaks the logic. As a result, bugs appear that are hard to control.

If you formulate the task as "add", "change", or "extend", the changes happen in a targeted way. The current logic is preserved, the architecture is not broken, and it becomes easier to control the result.

Prompt example:

```

Do not rewrite the whole program; output only the necessary snippets and say exactly where to insert them.
```

## What real work looks like

The process is always iterative. You don't do everything from a single request.

Example of a real interaction:

First you write a simple request:

> add a profile button

The AI gives a result, but it may be inaccurate or messy. After that you clarify:

> don't rewrite the code, just add the button correctly

Then you get the result again and, if needed, correct it once more. This cycle repeats until the result satisfies you.

## Ready-made prompt templates

To avoid spending time on wording every time, basic templates are used. You simply insert them and substitute your task.

### Universal prompt (base)

Used in most cases when you need to create something.

Prompt example

```

Write a Telegram bot in Python, SQLite database, aiogram library, HTML formatting, as a single file, Store API keys in .env and list dependencies in requirements.txt.

The bot should do the following: ....
```

Make the following change in the project:

```

Everything looks good, but add the following changes:
1. ...
2. ...
3. ...
```

Important:

-   don't rewrite the entire code
-   add only what is necessary
-   don't break the existing logic

### Prompt for fixing an error

Used when working with bugs and errors.

Prompt example when the error is visible in the logs:

```

# paste_your_logs_here

Do not rewrite the whole program; output only the necessary snippets and say exactly where to insert them.
```

Prompt example when there is a syntax error:

```

Here is the code and the error:
[code + error]

Fix the error. Do not rewrite all the code. Briefly explain the cause.
```

## Where to insert prompts

This point is simple but important. All prompts are inserted into the regular chat input field.

The process looks like this:

First you open the chat → then insert the template → replace the text with your task → send.

## Practical principles

To work effectively, follow a few simple rules.

First, you shouldn't write huge requests. It's much more effective to break the task into small steps and carry them out sequentially.

Second, always divide the work into stages. Instead of "make the entire project", it's better to go step by step: first the structure, then the functions, then the database, and so on.

Third, don't be afraid to repeat the constraints. If the model ignores them, just write them again — this is normal practice.

And finally, you shouldn't try to "politely pick your words". If the result is wrong, you can say directly: "you did the wrong thing, fix it". This is a working format of interaction.

## Summary

Prompts are not magic and not a separate complex discipline. They are a management tool.

They are built on three things:

-   a clear task
-   constraints
-   adjusting the result

You don't have to write perfectly. Your task is to be able to bring the result to the needed state. It is this skill that makes you effective at vibe coding.

## Claude limitations and how to build stable work

When working with Claude, it is necessary from the start to understand that the model operates within technical limitations. These limitations concern the volume of processed text, the number of requests over a certain period, and the overall computational load. They are not a flaw — this is a basic characteristic of any AI system. The user's main task is not to ignore these limitations, but to build a work process that takes them into account.

## Types of limitations and their impact on work

There are several key types of limitations you will encounter.

The first is limits on the number of requests. During active work, the model may temporarily restrict the frequency of responses or increase response time.

The second is the context limitation. The model can process only a certain amount of text at a time. This volume includes not only your current request, but also previous messages, as well as the model's own response.

The third is the generation speed limitation. Under high load, responses may arrive slowly or get partially cut off.

Understanding these factors allows you to avoid most problems before they even appear.

## Tokens as the foundation of how the model works

The key concept when working with Claude is tokens. The model does not perceive text the way a person does; it splits it into separate elements — tokens.

A token is part of a word, a character, or a short sequence of characters. One paragraph of text may contain tens or hundreds of tokens.

It is important to keep in mind that:

-   the entire dialogue is counted, not just the last message
-   the model's response is counted as well
-   long requests sharply increase token consumption

## The practical impact of tokens on code

When working with code, token limitations become critical. If you paste a large file and ask to make changes, the model may:

-   not see part of the code
-   lose logical connections
-   generate an incorrect result

Therefore the optimal strategy is to work with the code in parts. Divide the project into logical blocks and process them separately. This approach allows you to keep control over the structure and minimize errors.

## Iterative work model

The most effective way of interacting with Claude is an iterative approach. It consists of successive refinement of the result, rather than an attempt to get a final solution in one step.

The process looks as follows:

first a base query is formed → then targeted changes are made → after that, improvements and additional features are added.

This approach ensures:

-   result stability
-   predictability of changes
-   a reduction in the number of errors

## Errors when working with prompts

The most common problem is overloaded queries. The user tries to describe the entire project at once, add all the requirements, and insert a large volume of code.

This leads to the following consequences:

-   decline in response quality
-   loss of structure
-   appearance of unnecessary or incorrect changes

The sound approach is to formulate one query for one task. The simpler and more precise the query, the higher the quality of the result.

## Optimizing work under constraints

To work efficiently, it is necessary to follow several principles.

First, reduce the volume of text. Remove everything unnecessary and do not duplicate information.

Second, break complex tasks into stages. This reduces the load on the model and simplifies control.

Third, use parallel work. Split tasks across different conversations so as not to overload a single context.

## Scaling the work

When the volume of tasks increases, there is a need for scaling. One way is using multiple accounts or sessions.

This allows you to:

-   bypass the limitations of a single work channel
-   perform tasks in parallel
-   maintain a high development pace

However, this approach should be used consciously and without violating the platform's rules.

## Practical workflow

The optimal model of working with Claude is built on the following principle:

a specific task is identified → a short and clear query is formed → a result is obtained → a review is conducted → refinements are made.

If the task is large, it is divided into several stages. If the code is complex — work is done by individual modules.

## Summary

Claude's limitations are not a barrier, but a factor that must be taken into account when building a workflow. Understanding how tokens, context, and limits work makes it possible to significantly increase efficiency and get stable results.

The key takeaway is as follows: the more structured your approach and the less the model is overloaded, the higher the quality of the final result.

## 📜💬 Claude Glossary

> 💡 Anthropic: the team behind Claude is engaged in creating helpful, harmless, and honest artificial intelligence systems.

> 💡 Claude AI: an artificial intelligence chatbot developed by Anthropic, designed to generate conversational, creative, and analytical results while maintaining ease of user interaction.

> 💡 Prompt engineering: the process of developing and refining prompts to obtain specific high-quality results from Claude.

> 💡 Context window: the maximum volume of input data that Claude can process and “remember” at one time. Claude 3 has a context window of ~200 000 tokens, which far exceeds many other artificial intelligence models.

> 💡 Tokens: units of text (for example, words, subwords, or characters) that Claude processes. A token is approximately four characters of text.

> 💡 Prompt: input data provided to Claude, consisting of questions, commands, or instructions that guide its responses.

> 💡 Hallucination: when Claude generates results that are factually inaccurate or entirely fictional. It is important to check responses for reliability so as not to rely on hallucinated content.

> 💡 Role assignment: a technique that allows you to guide Claude's behavior by assigning it a specific role, for example: “You are a productivity expert helping me optimize my workflow.”

> 💡 XML tags: XML (Extensible Markup Language) tags are a way of organizing and structuring input so that Claude can process it in an orderly manner. Think of XML tags as labels that tell Claude: “This part of the input is intended for this specific task.”

Explanation as if to a five-year-old: imagine that you are sorting your toys. You put cars in a box labeled “Cars,” dolls in a box labeled “Dolls,” and puzzles in a box labeled “Puzzles.” These labels (tags) help you — and Claude — understand what goes where and how to use it!

Example:

Suppose you want Claude to prepare a summary of an article and then analyze it. You can use tags to separate these two tasks:

```

<article>
Here is a super long and important article about space exploration.
</article>

<task>
Summarize this article in 3 bullet points and explain why it's significant.
</task>
```

> 💡 Multimodal inputs: the ability to provide Claude with several types of information at once, such as text, tables, or structured data (for example, lists or tags).

Explanation as if to a five-year-old: imagine that you give your friend a coloring book (text) and crayons (data) at the same time so that he can color the pictures. Claude uses both together to create something cool.

Example:

You give Claude a table and ask it to perform an analysis:

```

<data>
Year, Sales
2020, 1500
2021, 1800
2022, 2100
</data>

<task>
Analyze this data and explain the sales trend.
</task>
```

Claude's response: Sales grew steadily by about 300 units per year, demonstrating sustained growth over three years.

> 💡 Chain of Thought (CoT): a prompting strategy that instructs Claude to provide intermediate reasoning steps, breaking complex problems into smaller, logical parts.

Example prompt:

```

Draft personalized emails to donors asking for contributions to this year’s Care for Kids program.

Program information:

<program>{{PROGRAM_DETAILS}}

</program>

Donor information:

<donor>{{DONOR_DETAILS}}

</donor>

Think before you write the email in <thinking> tags. First, think through what messaging might appeal to this donor given their donation history and which campaigns they’ve supported in the past. Then, think through what aspects of the Care for Kids program would appeal to them, given their history. Finally, write the personalized donor email in <email> tags, using your analysis.
```

> 💡 Prompt chaining: Prompt chaining involves breaking complex tasks into sequential, manageable subtasks and processing them step by step. This ensures that Claude's artificial intelligence performs each segment with high accuracy, reducing the number of errors and increasing the overall accuracy of task completion.

When to use prompt chaining

Prompt chaining is ideal for:

-   Multi-stage research synthesis: summarizing articles, data analysis, and conclusions.
-   Iterative content creation: developing outlines, drafts, editing, and formatting.
-   Document analysis: breaking large documents into smaller sections to obtain accurate conclusions.
-   Decision-making tasks: gathering data, evaluating options, and recommending solutions.
-   Error-intolerant processes: creating workflows where accuracy is critical, such as legal due diligence or making important decisions.

How to implement prompt chaining

1\. Identify the subtasks:

-   Break the main task into smaller logical steps.
-   Make sure each step is simple enough for Claude to complete with high accuracy.
-   Example: Research → Plan → Draft → Review.

1\. Define goals for each step:

-   Write clear single-task instructions for each subtask.
-   Example: "Summarize the main arguments in this article and include citations."

1\. Structure the input and output data:

-   Use tags, such as XML, for a smooth transition between prompts.
-   Example:

```

<task1_output>
Summary: {{SUMMARY}}
</task1_output>
```

1\. Iterate:

-   Review Claude's results for each step.
-   Refine the prompts if the answers are unclear or incomplete.

1\. Debug problematic steps:

-   Isolate the problematic subtask and test it separately.
-   Adjust the instructions to improve performance.

1\. Additional advanced method — self-correction chains:

-   Include a feedback and revision loop in which Claude reviews its own results and improves them.

> 💡 Zero-shot Prompting: providing Claude with a single instruction or question without additional context or examples.

> 💡 Prompting with several attempts: providing Claude with examples of inputs and expected outputs to guide its responses and improve accuracy.

> 💡 System message: an instruction for Claude that sets the tone or constraints for the interaction, for example "Respond as a professional financial advisor."

> 💡 API integration: using the Claude API to integrate its capabilities into applications for tasks such as automation, customer support, or data analysis.

> 💡 Prompt creation: the art of writing precise and structured prompts to elicit the desired response from Claude. The best prompts separate sections using tags <xml>.

> 💡 Prompt optimization: Gradual refinement of prompts to improve the quality and relevance of Claude's responses.

> 💡 Human-like tone: a distinctive feature of Claude that allows it to generate conversational, naturally sounding responses suitable for various use cases.

> 💡 Feedback loop: the process of evaluating Claude's results and revising prompts to improve the model's performance.

> 💡 Multimodal inputs: Claude's ability to process various types of inputs, such as text, tables, or structured data, depending on integration capabilities.

> 💡 Prompts with several examples: a method of training or guiding AI models, including Claude, by providing several examples in the prompt to set output expectations. This technique demonstrates the desired format, tone, and structure, helping the model generalize and generate consistent responses for similar tasks.

> 💡 Safety features: Claude's built-in measures to prevent the generation of harmful, unethical, or dangerous responses.

> 💡 Bias mitigation: Claude's training includes steps to reduce bias in its outputs, ensuring fair and equitable responses.

> 💡 Massive context use: using Claude's ability to process large datasets or conversations in a single session.

> 💡 Iterative refinement: the practice of repeatedly adjusting and testing prompts to maximize Claude's effectiveness at completing a task.

> 💡 Explainability: Claude's ability to justify its responses, increasing trust and transparency.

> 💡 Claude's strengths:

-   A massive context window for processing extensive inputs.
-   A natural conversational tone that mimics human interaction.
-   Availability of a free version for basic use cases.

> 💡 Claude's limitations:

-   A tendency to hallucinate in certain scenarios.
-   Requires clear instructions to complete complex tasks.
-   Availability may vary depending on the region.

> 💡 Typical use cases:

1\. Summarizing long documents or articles.

1\. Developing business strategies or proposals.

1\. Data analysis and drawing conclusions.

1\. Developing creative content, such as scripts or blog posts.

1\. Creating text that is as close to human as possible.

1\. Exploring complex problem-solving scenarios.

> 💡 Use cases: Real-world applications of Claude, including content creation, brainstorming, text summarization, answering queries, and data analysis.

## 🚀🤖 Creating the first bot with AI

In this article we will be creating our first fully functional bot with built-in AI. The entire step will be divided into steps: registering the bot, getting API key Groq, vibe-coding the bot with Claude.

## Creating a bot via BotFather

Before moving on to the code and connecting AI, you need to create the bot itself inside Telegram. This is done using the official service — BotFather. This is a special bot through which all Telegram bots are created and configured.

### Step 1. Open BotFather

Open Telegram and enter BotFather in the search bar.

Please note:

-   the bot should have a checkmark (official account)
-   a large number of users

After that, open the chat and press the Start button or send the command:

### Step 2. Start creating the bot

Enter the command:

```

/newbot
```

After that, BotFather will start the creation process and ask you to enter the details.

image - 2026-05-18T143148.593.png

### Step 3. Specify the bot name

First, you need to set the bot name — this is the display name that users will see.

Examples:

-   AI Assistant
-   Smart Helper
-   Vibe Bot

Requirements:

-   you can use any words
-   spaces are allowed
-   this is not a unique parameter

### Step 4. Set the username

Next, you will need to specify the username — the unique identifier of the bot in Telegram.

Example:

```

my_first_ai_bot
```

Important:

-   username must end with bot
-   must be unique
-   only Latin letters, digits, and \_ are used

If the chosen username is already taken, BotFather will ask you to enter another one.

### Step 5. Save the API token

After successful creation, BotFather will send a message with the token.

Token example:

```

123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
```

This token:

-   is used to connect the bot to the code
-   provides access to the Telegram API
-   is the key for managing the bot

❗ Important:

-   do not share the token with third parties
-   do not publish it publicly
-   if it is leaked, be sure to recreate it via BotFather

### Step 6. Check the created bot

After creation, BotFather will send a link to your bot.

Actions:

1\. Follow the link

1\. Open the chat

1\. Press Start

At this stage the bot does not respond yet — this is normal, as the logic is not connected.

### Summary

At this stage you have:

-   a created Telegram bot
-   a unique username
-   an API token

This is the foundation you will work with next. In the next step, the bot will be connected to the code and integrated with the Groq API.

Roughly what you should get:

image - 2026-05-18T143153.506.png

## Getting a Groq API key

Now that the Telegram bot has been created, you need to connect AI to it. For this, we will use the API from Groq.

An API key is a special token that allows your code to send requests to the model and receive responses.

If you want to ask me why Groq specifically, then of all Gemini, ChatGPT, Claude it is free and has a higher request limit. Even if models like Claude were paid, I have no way to pay for tokens from Russia =(. Most likely you won't be able to either.

### Step 1. Go to the Groq website

First, go to the official Groq website: https://console.groq.com

If you don't have an account yet — you need to register.

image - 2026-05-18T143202.645.png

Step 2. Go to the API Keys section

Next, you need to go to the section related to access keys. It is called API Keys. This section displays all created keys and there is an option to generate a new one.

image - 2026-05-18T143206.551.png

### Step 3. Creating a new API key

Next, you need to click Create API Key. Then name your key and click submit, and you will get your API key.

### Step 4. Saving the key

You will get a string that looks something like this:

```

gsk_abc123xyz456example
```

👉 Important:

-   the key is shown once
-   be sure to save it (for example, in config.json)
-   do not publish it publicly

❗ If you lose the key — you will have to create a new one.

### Step 6. Checking access

After receiving the key, you can already:

-   send requests to models
-   receive responses from AI
-   use Groq inside your Telegram bot

At this stage, no additional setup is needed — the key is already ready to use.

### Summary

It is important to understand that this key is direct access to the API. You must save it immediately after creation, because in most cases it is shown only once. Later you will use it in the bot's code, for example by saving it in a configuration file (config.json) or in environment variables.

The security aspect deserves a separate mention. Never publish the API key publicly, do not send it to other people, and do not put it in public repositories. If the key is compromised for any reason, you need to delete it and create a new one through the same Groq panel.

Once the key is obtained, no additional setup is required — you can already send requests to models and receive responses. In practice, this means you now have everything you need to connect the Telegram bot to AI: a token from Telegram and an API key from Groq.

## Creating the bot

In this section we will be creating an intelligent post builder for Telegram that allows users to create visually appealing publications with interactive elements without technical skills.

### Goals:

1\. Provide users with a tool that reduces the time to create interactive publications with buttons, media, and stylish design from 20 minutes to 30 seconds through AI generation and templates.

2\. Make creating complex posts with colored inline buttons and HTML markup accessible to users without technical programming and design skills.

### Features:

### 1\. Colored inline buttons:

With the latest recent update, Telegram made it possible to color inline buttons in colors: red, blue, green, making posts more visually appealing and increasing click conversion.

### 2\. Hybrid AI assistant:

Integration with Groq's free API models allows generating complete posts with buttons, text, and structure from a simple text description in Russian, for example: "Create a post about a 50% discount on sneakers with 3 buttons".

### 3\. Personal post cloud:

Automatic saving of all created posts to a SQLite database with the ability to instantly send them to a configured channel, reuse them, and export history — no longer need to store drafts in notes.

### 4\. Smart settings presets:

The user can set default parameters (button color, layout structure, presence of emoji and media) that are automatically applied when creating new posts, saving up to 70% of time on repetitive actions.

### 5\. Admin panel with CSV export:

Complete bot usage analytics: number of users, created posts, sent messages with the ability to export all data to CSV files for further analysis in Excel or Google Sheets.

## Glossary

## Creating a bot 2.0

Our project is a Telegram bot for creating and managing posts with support for text, media, and interactive buttons. The main idea is to give the user the ability to quickly assemble ready-made posts and publish them to their channels without needing to write code.

The bot supports two operating modes: manual post creation and generation via AI. In manual mode, the user step-by-step assembles a post, adding text, media, and buttons. In AI mode, it is enough to describe what post is needed, after which the bot itself generates the structure and content via API.

Additionally, a post-saving system is implemented so the user can reuse them, as well as a basic admin panel with statistics. All data is stored in SQLite, which makes the project simple to launch and convenient for learning.

This bot is well suited as a learning project because it covers several key aspects at once: working with the Telegram API, state management (FSM), integration with an external API, and basic database work.

The prompt itself:

```

Write me a Telegram bot in Python 3, aiogram 3, SQLite, HTML tags.

The bot should be able to create posts with colored inline buttons, photos, GIFs, and text.

The main menu must include: Settings, Create a bot, My posts, Bot info.

Commands: /start, /settings, and /admin for admins

When you tap Create a bot, two inline buttons appear: Create with AI or Create manually.
If you tap Create manually: enter the post name — send a video, GIF, or photo — enter the text — add inline buttons, and if so how many — then choose a color for the inline buttons. At the end it sends you the post and asks whether to save it to My posts.
You can also send this post to your channels; to do that, paste your link in Settings.
In Settings we can set: whether to include inline buttons, whether to add premium emoji, whether to add a photo, the text, the default button color, and how the buttons are laid out.

When we create posts with AI we will send it a brief, and in the code, in the prompt, all of this will be spelled out (instructions) for how to create the post — including inline buttons, which colors to use, and so on.

In the admin panel we can see the number of users, the number of posts created, and extended stats. Stats can be viewed via a CSV file.
We will work through the Grok API.

Write everything in a single file. Store API keys in .env and list dependencies in requirements.txt.
```

1\. Next you copy this prompt and paste it into Claude Sonnet 4.6 + Think. Enable thinking mode, so it can write better code.

2\. After you have received a response from it, copy the code and paste it into your IDE. Once you have pasted all the necessary files into the folder, install the dependencies with the command:

Example project structure:

```

main.py
.env
requirements.txt
```

Command to download all dependencies:

```

pip install -r requirements.txt
```

3\. Next, after installing all the utilities, start testing the bot itself for errors. The essence of testing is that you go into absolutely every section in your bot and check how everything works, how all the mechanics and functionality work. Write down all errors immediately in Claude.

And then you paste this prompt:

```

# Errors

Fix the code, but do not rewrite the entire program; send me only the snippets that need to be inserted and where to insert them.
```

4\. After you have fixed all the errors, give Claude this prompt:

```

List every technical and UI shortcoming. List critical failures that could occur, and also list every improvement. Then rewrite the entire codebase.
```

Copy this message and paste it into Claude. It will give you the full list of improvements, you choose from them only those that you like, copy and paste them into your next request. Along with your upgrades, also paste your code.

You may wonder why I wrote:

> Rewrite the entire code completely

Well, to insert all the changes, you would need to spend a lot of time. It will be easier to rewrite the entire code, because there are not that many lines in it yet.

5\. After it has sent you the complete code, you start testing it and writing down yourself what you don't like.

And at the end, repeat this cycle:

```

1. Generated the code
2. Ran it
3. Found errors
4. Fixed them with Claude
5. Improved it
6. Repeated
```

to achieve the desired result.

The entire development process through AI is built roughly on this principle. And I'll tell you that with the right prompts and iterations you can put together a full-fledged project in a few days that without AI would have taken weeks.

## ⚡🧠 The Power of Claude Skills

Okay, and now the best part. Claude Skills are the feature after which you will stop writing the same long prompts every time.

Imagine: you have a new chef at the restaurant. Every day you explain to him again: "So, our plates are warm, the sauce only to the right of the meat, we don't mix the side." And every day the same thing. Annoying? Annoying.

What does a normal restaurateur do? Writes an internal kitchen protocol once. Hands it to the chef. The chef reads it once — and then just works by it. The protocol sits in a folder, the chef can see it, and in any complex case opens it and looks.

Claude skills are exactly that kind of protocol, only for a neural net.

Claude's skills feature lets you save sets of instructions that Claude loads automatically when they are relevant to your task.

Instead of repeatedly pasting the same prompts or overloading a project with every instruction you've ever written, skills let you organize your workflows and load only when needed.

Whether you're creating weekly reports, enforcing brand guidelines, or following a specific code review process, skills let you teach Claude once and make it remember the workflow forever.

### What skills are not

Skills are not plugins, not hard-coded functions, and not independent code execution. They are structured sets of instructions that change Claude's approach to a specific task.

Anthropic describes them as onboarding guides for new employees: a document that teaches Claude the right way to do a specific job so you don't have to re-explain it every time.

This makes skills especially effective for tasks you perform regularly, but not constantly.

## How skills work

Skills use progressive disclosure of information to stay efficient. Claude loads instructions in three stages:

Scanning phase (~100 tokens per skill) — when a conversation starts, Claude reads only the name and brief description of each available skill. Full instructions remain inactive until your request matches the skill description.

Activation phase (~5000 tokens) — when a match is found, Claude loads the full contents of SKILL.md into context. This is where the actual instructions are.

Execution phase (on demand) — any additional resources or scripts the skill references are loaded only when they are actually needed during execution, which keeps the token volume small.

Unlike projects, where every instruction is loaded at the start of every conversation regardless of its relevance, skills consume tokens only when activated. Scanning 30 available skills costs roughly 3000 tokens, whereas the same instructions stored in a project's custom instructions would require tens of thousands of tokens.

## What's inside a skill

A skill is a folder containing a file named SKILL.md. The file consists of two parts.

The first is YAML frontmatter, located between two --- markers at the top. It contains the skill name and description (the only content Claude reads during the initial scan) and additional fields for dependencies.

The description controls when Claude activates the skill. A specific, action-oriented description such as "Generate standardized weekly team updates with metrics, wins, and blockers" triggers precisely. A vague description such as "Helps with writing" triggers on almost every request, wasting tokens and cluttering the context.

The second part is the Markdown body containing the full instructions Claude follows when the skill is activated.

-   A well-structured text typically includes several key sections:
-   An overview explaining what the skill does, specific situations in which it should be used,
-   step-by-step instructions for Claude,
-   Examples showing what a good result should look like,
-   troubleshooting recommendations when something goes wrong or edge cases arise,
-   known limitations of the skill and any recommendations or constraints to keep in mind.

Here is an example of a complete, functional skill:

```

---
name: weekly-report
description: Generate standardized weekly team updates with metrics, wins, and blockers.
---

# Weekly Report Generator

## When to Use
When the user asks for a weekly update, status report, or team summary.

## Instructions
1. Start with 3-5 key metrics that matter
2. Bullet the top 3 accomplishments as "Wins"
3. List anything slowing progress as "Blockers"
4. Preview upcoming priorities as "Next Week"

## Guidelines
- Keep the tone professional but human
- No corporate jargon
- Use specific numbers over vague language

## Error Handling
- If the user doesn't provide metrics, ask for them before generating
- If data is incomplete, note gaps clearly rather than fabricating numbers

## Limitations
- Designed for internal team updates, not client-facing reports
- Does not pull live data; all metrics must be provided by the user
```

For complex workflows, keep the main SKILL.md file concise and reference separate files for detailed edge cases or extended examples. Claude loads referenced files only when a specific scenario arises, directly using the progressive disclosure model.

The file name must be exactly SKILL.md. It is case-sensitive. Variants like skill.md, Skill.md, or README.md will not be recognized.

## Standard skills and custom skills

Claude ships with built-in default skills already. Every time you ask Claude to create a document, spreadsheet, presentation, or PDF, ready-made Anthropic skills handle the formatting and structure behind the scenes.

They cover file formats such as .docx, .xlsx, .pptx, and .pdf. It is thanks to them that Claude can create properly structured Word documents and presentations without additional instructions. Most users interact with them daily without realizing it.

Custom skills are those you create yourself or install from the community. They let you precisely define how Claude will perform tasks unique to your workflow: brand style compliance, specialized reports, code review checklists, research frameworks.

Custom skills can include text instructions, scripts, and reference files that Claude can execute or view while performing a task.

Custom skills require a paid plan (Pro, Max, Team, or Enterprise) and enabling code execution in settings. Each active skill adds a small token cost during the initial scan, so focus on the skills you actually use.

## How to enable skills

To use customizable skills, go to "Settings" > "Capabilities" and enable "Code execution and file creation". Once activated, you can turn individual skills on and off in the same menu.

An additional option "Enhanced file creation and analysis" is available in experimental features for richer document workflows.

For Claude Code, personal skills are stored in ~/.claude/skills/skill-name/, while project-specific and team-wide skills are stored in .claude/skills/skill-name/ in the project directory.

For Claude Desktop and the web application, skills are uploaded via "Settings" > "Capabilities" > "Skills".

## Real-life usage examples

Skills are suitable for any role, not just developers. Here's how different roles use them.

### The "Brand Guardian" skill for marketers

The "Brand-guardian" skill contains voice and tone guidelines, approved terminology, formatting standards, and links to the style guide. When Claude writes anything intended for clients, it automatically checks it against these guidelines. No more pasting brand documentation into every conversation.

### Codebase visualizer for Vibe programmers

The "Codebase Visualizer " skill runs scripts that generate HTML maps of project file structures. Instead of manually navigating the file tree, you ask Claude to show how the project is organized and get a visual diagram. Especially useful for non-traditional developers who find complex project structures confusing.

### Job application generator for productivity

The "Job Application" skill stores your resume data, cover letter templates, and personal writing style guidelines. Paste a job description, and the skill will generate tailored application materials using your writing style and background. No more re-uploading documents and re-explaining your qualifications for every application.

### Code review and documentation skills for teams

The code review skill enforces a unified checklist: security vulnerabilities, performance issues, test coverage, style compliance. The documentation skill ensures that every new feature is documented in the same format. These shared skills are placed in the .claude/skills/ directory at the project level so every team member has access to them.

### Community skills worth exploring

In addition to creating your own skills, the community has developed several proven skills worth exploring.

Code review and git-commit skills from Zapier

Designed for engineering workflows. The code review skill enforces a unified checklist covering security, performance, and style. The git-commit skill generates standardized commit messages according to the conventional commit format.

Additional information: ‣

Branding skills

Focused on ensuring visual identity: approved color palettes, typography rules, logo usage guidelines, and tone standards.

Additional information: ‣

Inventory forecasting skills

Serving e-commerce workflows. They contain rules for product categories, seasonal adjustment logic, and report templates for demand forecasting and reorder recommendations.

Additional information: ‣

Voice/audience Skills

Split the instructions into three files: one for voice and tone, one for audience profiles, one for content structure templates. This keeps each component modular and easy to update independently.

Additional information: ‣

These and hundreds of other examples can be found in the official Anthropic skills repository on GitHub and in the VoltAgent community list awesome-agent-skills, which contains over 200 skills across various categories.

On our advanced training you get a ready-made skills library for Claude Code, consisting of more than 1000+ exclusive skills from full application development to profession-specific solutions.

## Creating your first skill

There are three ways to create a custom skill, from fully automatic to fully manual.

### Option 1 — Using the settings interface (the simplest)

Go to "Settings" > "Capabilities" > "Skills" and select "Add" > "Write skill instructions". Claude provides a text field where you can enter skill instructions directly.

This is the fastest way to get a skill running, although it offers less flexibility for complex workflows.

### Option 2 — Using the built-in skill creator (step-by-step guide)

Anthropic includes a built-in skill called "skill creator" that will walk you through the entire process. Just tell Claude what you want: "Help me create a skill for writing product descriptions in our brand's style."

Claude asks clarifying questions about tone, formatting, audience, and constraints, then generates a complete SKILL.md file.

This approach is ideal for users who know what workflow they need but are unsure how to structure the instructions.

### Option 3: Create the SKILL.md file manually (maximum control)

For full control, create the folder and file yourself.

Step 1: Create a new folder named after your skill, using lowercase letters and hyphens: my-first-skill/

Step 2: Inside that folder, create a file named SKILL.md (case-sensitive).

Step 3: Add a YAML header at the top of the file with a name and description. The description is the trigger; make it specific and action-oriented so Claude knows exactly when to activate this skill.

Step 4: Write Markdown text with your instructions. Include sections on when to use the skill, step-by-step instructions, examples of the expected output, and any guidelines or constraints.

Step 5: Place the folder in the right location. For personal skills in Claude Code, use ~/.claude/skills/skill-name/. For project-shared skills, use .claude/skills/skill-name/ in the project directory. For Claude Desktop and the web app, upload via "Settings".

Once the skill is installed, Claude will automatically detect it in the next conversation.

No activation is needed: if the description matches your request, Claude loads and follows the instructions.

## Common mistakes and limitations

The skills ecosystem is still young. Watch out for the following pitfalls.

Overly generic descriptions in the preamble

A description like "Helps with writing" will trigger on almost every request, causing the skill to load when it isn't needed, which wastes tokens and can confuse Claude's output.

Descriptions should be specific and action-oriented, clearly defining the exact task the skill is intended for.

SKILL.md files that are too long

This can significantly reduce the context window. When a skill is activated, its full contents are loaded into context, so a skill with 10 000 tokens reduces the space available for the actual conversation and output.

For complex workflows, it is better to keep the main SKILL.md file concise and reference separate files that Claude loads only when specific scenarios arise.

Skills can only use preinstalled packages

There is no way to install new runtime dependencies on the fly, so any scripts or code within a skill must work with what is already available in Claude's runtime environment.

There is no centralized administration through claude.ai.

Organizations cannot distribute skills to all team members from a central dashboard. Each user manages their own skills in the web app and on the desktop.

For Claude Code, project-level skills in .claude/skills/ provide a workaround for team sharing, but broader organization-wide deployment is not yet supported.

Skills can execute arbitrary code

They should be treated with the same caution as browser extensions or third-party software.

Install skills only from trusted sources and review the contents of any SKILL.md file before enabling it, especially if it contains scripts or links to external resources.

## Where to find additional skills

The skills ecosystem is growing rapidly.

Official Anthropic skills repository

The official Anthropic skills repository on GitHub provides verified and maintained skills as a starting point.

The VoltAgent awesome-agent-skills community

The VoltAgent awesome-agent-skills community contains a list of more than 200 skills across various categories, and the Zapier blog features practical guides on creating skills for real business processes.

Prefer community skills that are already in use and applied in practice over ones that have just been published.

## From prompt development to skill development

Skills change the game. Instead of the question "how do I phrase the request better," the question becomes "how do I save this so I never have to make this request again."

If prompt engineering is focused on creating the right input for a single conversation, then skill development is focused on permanently saving workflows so they never need to be re-prompted.

Skills are natural language files that program Claude's behavior. They don't require an API, code (unless you want it), or technical knowledge. Just Markdown files that scale your knowledge across all future conversations.

Anthropic describes skills as customizable documents for AI: write them once, and Claude will load them automatically from that point on.

And this is a separate conversation.

What we just covered is the very basics of Claude Skills. One skill, one task. Already cool, already saves hours.

But the real power starts when you have thousands of ready-made skills in your arsenal for all typical tasks, and you assemble projects from them like Lego.

I currently have a separate module coming out on next-generation vibe coding. It includes:

-   Google AI Studio — a bundle of Gemini neural networks with your code, free limits, multimodality out of the box
-   Lovable — a generator of full-fledged web applications from a single prompt (literally: you describe an idea — you get a working SaaS with a database and authorization)
-   Claude Code — a terminal agent that writes code itself, tests itself, commits to git itself
-   A library of 5000+ ready-made skills for Claude — from marketplace parsing and landing page generation to complex multi-agent sales systems

So you don't need to write SKILL.md from scratch for three hours. You take a ready-made one for your niche, connect it, it works. And if the standard one doesn't fit — in 5 minutes you assemble your own through skill-creator (as we just covered).

This is the level of vibe coding where you're no longer sitting there with “how do I make a TG bot in a week,” but thinking “how do I assemble five micro-SaaS in an evening and sell them freelance abroad in dollars.” The module is included in the Creator (view) and Full (view) plans.

Okay, back to the finale.

## 📦➕ Additionally:

This section presents a template for creating high-quality prompts for Claude Code, as well as 2 skills that will be indispensable in creating any agents. To install a skill, go to https://github.com/ and create a new repository:

Then open this repo in https://claude.ai/code and write in the chat “Install this skill (link)”.

After that, Claude Code will write to you that it installed this skill in your repository and will send a command to activate the skill in your work. All that's left for you is to write “Use the skill (command) to create a bot (description of your bot)”. Don't forget that you can connect third-party services via API to perform any tasks. At the link below we've gathered more than 10 thousand services for different tasks.

There are APIs for AI, analytics, automation, maps, finance, content generation, working with data, and much more. Convenient when you need to quickly find a ready-made solution for a project, rather than searching for everything manually.

Claude Mega-Prompt template and an infinite library of prompts for Claude AI

Most people ask Claude questions as if they're writing an SMS to a friend. That works for quick questions. But when you need Claude to work like a specialist, you need to talk to him as a system. XML tags are used for this. This template shows you the structure, the logic of each tag, and gives you a ready-to-use structure.

## Why XML tags change everything

Claude was trained to recognize XML tags as structural boundaries. When you wrap your instructions in tags such as <role> or <task>, Claude doesn't just read your words. He analyzes them. He knows where your role definition ends and your task begins. He knows which part is context and which is the actual instruction.

The difference is real. A simple text query dumps everything into one stream and hopes that Claude will understand what's important. A query with XML structure tells Claude exactly what each piece of information is and how to use it.

Simple text query:

```

You are a business strategist. I want you to analyze my startup idea.
My idea is a mobile app for dog walkers. Give me market risks,
personas, and a recommendation. Be detailed and direct.
```

The same prompt, structured in XML:

```

<role>
You are a pragmatic business strategist with expertise in
dissecting business ideas for real-world applicability.
</role>

<task>
Analyze the given business idea objectively. Consider genuine
merits and potential pitfalls. Provide a blunt, balanced
validation and recommendation.
</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
featuring real-time GPS tracking and automated scheduling.
</business_idea>

<response_format>
Business overview, 3 target personas with pain points, market
risks, alternative models, and a final recommendation.
</response_format>
```

The XML version gives Claude clear boundaries. He knows that the role is separate from the task, the business idea is input data, and the response format is output specifications. It's this separation that allows you to get clearer and more structured answers.

## 8 tags that make up the mega-prompt

You don't need to use all of these tags every time. Choose the ones that are truly necessary for your task. Think of this as a menu, not a checklist.

### <role> — Who Claude becomes

Tell Claude in what capacity he should act. The more specific the role, the more specialized the result will be.

Weak version: You are a marketing expert.

Strong: You are a conversion copywriter who specializes in SaaS onboarding sequences for B2B products.

Three things to include: experience, specialization, and context (industry, audience, or application).

```

<role>
You are a conversion-focused email copywriter specializing in
SaaS onboarding sequences for B2B products. You prioritize
clarity over cleverness and always tie copy back to user pain points.
</role>
```

### <goal> — What success looks like

This is the overall result. Not steps, not format. Only the end goal.

Limit yourself to 1-2 sentences. If you need more, you probably have several goals and should split them into separate prompts.

```

<goal>
Create a 5-email onboarding sequence that reduces churn during the
first 14 days by addressing the top 3 reasons users abandon the product.
</goal>
```

### <key\_tasks> — Step-by-step instructions

Break the work into numbered steps. This will prevent Claude from skipping parts or changing the order of your logic. Each step should be a single clear action.

```

<key_tasks>
Step 1: Identify the top 3 churn reasons from the provided user feedback.
Step 2: Map each churn reason to a specific email in the sequence.
Step 3: Write subject lines and body copy for all 5 emails.
Step 4: Add a suggested send schedule with timing rationale.
</key_tasks>
```

When to skip this tag: if your task is simple enough to describe in one sentence, you don't need the tag <key\_tasks>. The tag <goal> will handle this task.

### <response\_structure> — how Claude should think

This tag controls the tone, depth, and character style. It's about the character of the response, not the format (that's <response\_format> below).

```

<response_structure>
- Provide detailed, actionable guidance (not surface-level tips).
- Use a direct, conversational tone. No corporate speak.
- Adopt the perspective of a senior copywriter reviewing a junior's draft.
- Reference real-world SaaS examples where relevant.
</response_structure>
```

### <session\_structure> — how the conversation should flow

Use this tag if you want Claude to have a multi-turn conversation rather than laying everything out in one response. It sets the interaction model.

```

<session_structure>
- Approach: Guided problem-solving.
- Start by asking 3 clarifying questions about my product and audience.
- After I answer, present a draft sequence outline for approval.
- Only write the full emails after I approve the outline.
</session_structure>
```

When to skip this tag: if you want everything in one response, completely remove this tag.

### <examples> — Show Claude how it should be

Few-shot examples are the most powerful control tool you have. One compelling example is better than an entire paragraph of instructions.

Provide Claude with the input AND the desired output. Label them clearly.

```

<examples>
Example 1:
Input: "Users say the dashboard is confusing."
Output:
  Subject: Your dashboard, simplified
  Body: Hey [Name], we heard you. The dashboard can feel like a lot
  on day one. Here's a 2-minute video walkthrough that covers the
  3 panels you'll actually use daily...

Example 2:
Input: "Users forget to complete setup."
Output:
  Subject: You're 80% there (one step left)
  Body: Hey [Name], you started something good. Your account is set up,
  your team is invited, but there's one setting that unlocks [key feature]...
</examples>
```

### <information\_about\_me> — Your contextual data

Provide Claude with specific data about your business, audience, product, or situation. This is the raw material Claude works with.

Include only the variables that relate to your goal and tasks. Random background information only adds noise.

```

<information_about_me>
- Product: TaskFlow, a project management SaaS for remote teams (10-50 employees)
- Top churn reasons: 1) Dashboard overwhelm, 2) Incomplete onboarding,
  3) No integration with existing tools
- Brand voice: Friendly, direct, slightly informal. Never corporate.
- Current onboarding: Single welcome email, no follow-up sequence.
</information_about_me>
```

### <response\_format> — result plan

Tell Claude exactly what form the final result should take. Here you specify the format, not the tone.

```

<response_format>
For each email, provide:
1. Email number and send day (e.g., "Email 1 - Day 0")
2. Subject line
3. Body copy (150-200 words)
4. CTA button text
5. Internal note explaining the strategic purpose of this email

Deliver as a numbered sequence, not a table.
</response_format>
```

## Quick guide — when to use each tag

## Full template (copy and customize)

Take it, fill in what you need, remove what you don't need. Tag names are flexible. You can rename them to anything that makes sense for your use case (<brand\_info> instead of <information\_about\_me>, <steps> instead of <key\_tasks> etc.). Claude reads the structure, not the exact tag name.

```

<role>
[What expert role should Claude adopt? Include expertise,
specialization, and industry context.]
</role>

<goal>
[What is the single outcome you want? Keep it to 1-2 sentences.]
</goal>

<key_tasks>
Step 1: [First action]
Step 2: [Second action]
Step 3: [Third action]
</key_tasks>

<response_structure>
- [Tone and depth guidance]
- [Persona or perspective to adopt]
- [Any stylistic constraints]
</response_structure>

<session_structure>
- [Interaction approach: single response vs. multi-turn]
- [Who leads: you or Claude?]
- [Any checkpoints or approvals needed]
</session_structure>

<examples>
Example 1:
Input: [Sample input]
Output: [The exact output you'd want to see]
</examples>

<information_about_me>
- [Relevant detail #1]
- [Relevant detail #2]
- [Relevant detail #3]
</information_about_me>

<response_format>
[Exact output structure: list, table, narrative, code block, etc.]
[Any length or formatting constraints]
</response_format>
```

## Full example — business idea validator

Here's a full mega-prompt you can test right now. It combines role, task, context, and a structured response format.

```

<role>
You are a pragmatic business strategist with expertise in dissecting
business ideas for real-world applicability.
</role>

<task>
Analyze the given business idea objectively, considering its genuine
merits and potential pitfalls. Create 3 theoretical customer personas
and have each give realistic feedback. End with a blunt validation
and recommendation.
</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
featuring real-time GPS tracking and automated scheduling.
</business_idea>

<response_format>
Structure your response as:
1. Business idea overview (2-3 sentences)
2. Potential target markets
3. Three personas, each with: age, occupation, pain points, and their
   honest reaction to this product (written in first person)
4. Market risks
5. Alternative business models worth considering
6. Final validation and recommendation (be direct, not diplomatic)
</response_format>
```

Note that the tag <response\_format> uses a numbered list to describe the output structure, but does not force Claude to output results in XML format. You structure the input for Claude, rather than requiring a rigid output format. Let Claude write naturally within the structure you define.

And now the main feature! We didn't write out a million prompt templates with a library for you!

In this express course we give you 1 ready-made assistant that writes prompts for Claude and Gemini for ABSOLUTELY ANY TASK!

‣

This is 1 of 350+ ready-made assistants that are available to you on absolutely any subscription!

‣

## 🎁🗺️ P.S. What's next, if this clicked

## This express course is one brick. Building a working TG bot over a weekend is a technique, and you just got it for free. But for the bot to actually make money, you still need a few more things: selling through the bot, retaining the audience with content, building automated funnels, generating visuals and video, connecting payments through CRM, scaling to thousands of users without crashes.

## I have all of this packed into a full program — 6 plans for different levels of immersion:

## Basic (link) — earning with ready-made templates, basic and advanced prompting, a library of preconfigured GPT/Gemini assistants, express courses on Perplexity and Grok. Start from scratch.

## ‣

## Plus (link) — everything from Basic + the "Photo and Video" block (Midjourney, Veo, Kling, Seedance), professional editing in CapCut/Premiere, an AI influencer factory for Fanvue. For those who want visuals.

## ‣

## Creator (link) — everything from Plus + the "AI Assistants" block (system instructions, JSON prompting, auto-funnels via SendPulse), express courses on Gemini/Claude/AI agents, the "Freelance 2.0" library, a new vibe-coding module with 5000+ skills for Claude. For those who want to package AI into money.

## ‣

## Make (link) — a standalone no-code visual automation module. 6 ready-made AI assistants (24/7 manager, call analyst, Facebook Ads analyst, content machine, and others) + 1000+ ready-made templates. For integrators and freelancers in Western markets.

## ‣

## N8N (link) — Enterprise-level: self-hosting on your own server, RAG agents with vector databases, 500+ ready-made templates including sales department call monitoring (which we sell from 800k ₽), an AI blogger factory and trend parsing. For those who want to work with large business.

## ‣

## Full (link) — everything listed above + AI Soft (local neural networks without censorship). An annual plan for those getting into AI seriously and for the long haul.

## ‣

## Choose according to your level. If it's unclear — feel free to write in the chat, we'll figure it out together.

## Remember the main thing: a TG bot is a technique, and vibe-coding is a profession. This guide covered the first. The program covers the second.
