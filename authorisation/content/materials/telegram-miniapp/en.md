# Telegram mini app

Your own app inside Telegram

## Hello everyone. Today we are going to build our own mini app inside Telegram — from an empty screen to a working thing you can show your friends and say “look, I made this”.

## And I want you to understand one thing about this guide right away. You have two doors, and both of them work.

## The first door is the long one. That is when you walk through all the theory and the architecture with me, you understand what is under your hood, and you come out not just with a bot, but with understanding.

## The second door is the fast one. The section about Claude Code and superflow. Thirty minutes — and you have a finished mini app. That one is for people who came not to listen to a lecture, but to touch the result with their own hands today.

## Personally I recommend arriving at the long door eventually, but starting with the short one. Do you know why? It is like with a restaurant. You can buy a ready-made turnkey business and not know where your own kitchen is. Or you can build it yourself and understand every power socket. When something breaks — and it will break — the second option fixes the problem in a minute, while the first one calls a friend at three in the morning. But! For the first time round, the first door may feel hard, and it is perfectly normal that you will choose the short path! For the first time that is fine, you will watch the video lessons later anyway and it will be easier to repeat everything with a ready video in front of you.

## Also, at the end of this manual make sure you look into the “Extras” section. There is a seriously fat bonus from us waiting for you there. It is not even a prompt library! It is 1 of 350 ready-made assistants that writes absolutely any prompt for Claude AI — a thousand times more effective and better formed — for absolutely any task, plus 2 ready-made skills out of 5000 that are perfect for building bots. All 350 assistants, and thousands of ready-made skills for Claude AI, are waiting for you with any subscription to the platform.

## 🤖🧱 Telegram mini apps: a frontend + backend system

Okay. We are opening the first door — and behind it is the main metaphor, which I am asking you to memorise like the metro map of your own city. Without it we will keep getting lost further on.

Any application is a restaurant. A dining room, a kitchen, a storeroom, a waiter. So, a Mini App is also a restaurant. But with one difference.

An ordinary app is a restaurant that has its own separate building. Its own street, its own car park, its own sign, its own guard at the entrance. And to get in, a person has to hear about you, drive over, park, open the door. That is what is called “the barrier to entry”.

A Mini App, on the other hand, is a restaurant that opened inside a huge shopping centre. And the shopping centre is Telegram.

Do you feel the difference? You do not have to build walls from scratch, lay a separate road, hire security and put a barrier on the car park. The shopping centre has already built all of that. Almost a billion people with money in their pockets already walk around inside it. You simply rent a corner — and the flow comes to you immediately.

Technically this “rented corner” is called a WebView — a built-in browser right inside Telegram. In plain words: a little window in which your site runs without ever leaving the messenger.

And how does a person get to you? Through a button. At the entrance of the shopping centre there is a tout — that is your bot. It hands the visitor a flyer: “go over there, there is something interesting”. The person taps — and instead of an ordinary message a full application unfolds in front of them. No downloads, no registration, no “enter your email, invent a password, confirm that you are not a robot”.

What can you open in a corner like that? Anything at all. A shop — pick a product, place an order. A personal account — balance, history, subscriptions. An AI chat — talk to a neural network right inside Telegram. That last thing is exactly what we are going to build together today.

And here is the main reason everyone rushed into making Mini Apps. A person does not need to download ANYTHING. They are already in the shopping centre. They already have the loyalty card on their wrist — Telegram already knows them. You opened the door — they walked in within one second. And every extra second and every extra action at the entrance is people who never made it to you.

## How it works under the hood

Right, a little bit “under the hood” here. Do not be scared by the words — I will lay it all out on the shelves now.

When a person taps the button, Telegram goes to the address (URL) where your site lives and loads it into that very window — the WebView. That is all. No magic, just “open that site over here”.

But what comes next is the interesting part. Along with the opening, Telegram passes your application a thing called initData. Let me explain it on my fingers.

Remember I said the shopping centre already knows the visitor, that they have a loyalty card? Well, initData is exactly that loyalty card. When a person enters your corner, the shopping centre shoves a note at your restaurant on the way in: “here you go — this is visitor number such-and-such, their name is this, their handle is that, and here is the stamp proving they really are ours”. In that note:

-   user\_id — the visitor’s number, their “passport number” inside Telegram;
-   username — their handle;
-   chat data — where they came to you from;
-   a time signature — a stamp with a date, so the note cannot be used a week later.

But there is a trap here, and I want you to remember it. Along with the real note comes its “draft” as well — initDataUnsafe. The word unsafe in the name is not there for decoration. It is a note without a checked stamp. It looks the same, but anyone could have drawn it with a felt-tip pen. Trusting it directly is not allowed. Why — we will go through that a couple of sections later, in the block about authorisation. For now just carve this in: you see the word unsafe, you get suspicious.

Moving on. There is an object called window.Telegram.WebApp. Put simply, it is the remote control for the shopping centre. With it you control not your own restaurant, but the building around you: you can switch the theme to dark or light, show Telegram’s main button, close the application, pull out the user’s data. The centre itself handed you the remote — use it.

And here is the key thought this whole section exists for. Memorise it word for word:

> A Mini App is not a part of Telegram. It is an ordinary site that Telegram simply opens inside itself.

This matters because it removes half of the fear. You are not “programming Telegram”. You are making an ordinary site — the same as any other one on the internet. Telegram simply kindly opens it in its own window and tosses you the visitor’s loyalty card. That is all.

## Mini App architecture

Okay, and now — the anatomy. That very metro map. Three stations, arrows between them. Remember them the way you remember the road from home to work.

The bot → opens the Mini App (this is the Frontend, our dining room). The tout brought the visitor to the door and led them into the room.

The Frontend → sends requests → to the Backend (this is our kitchen). The visitor in the room ordered something — the order went off to the kitchen.

The Backend → works with the database (this is our storeroom). The chef in the kitchen went into the storeroom for ingredients and records.

That is it. Bot, dining room, kitchen, storeroom. This chain is the foundation of almost any real project. Not only a bot. When you go on to build anything at all — a site, a CRM, an application — you will meet exactly this scheme. So point your finger at it and memorise it.

### Frontend (the mandatory part)

The frontend is the dining room of your restaurant. Everything the visitor sees and pokes with a finger. The menu, the buttons, the tables, the pretty cards. If a person sees it with their eyes — it is the frontend.

What can it be built out of? Either from “basic bricks” — HTML, CSS, JavaScript. Or you take the grown-up LEGO sets — React, Vue, Next.js. In this guide, for simplicity, we take the basic bricks; that is more than enough for us.

What is the dining room responsible for? Three things. Showing the visitor a pretty picture. Catching where they tapped. And — pay attention — sending the order to the kitchen. The dining room itself decides nothing serious. It does not count money, it does not check rights. It shows things nicely and passes the order on.

And separately, the dining room knows how to be friends with the shopping centre itself through the Telegram SDK — in plain words that is “a set of ready-made functions from Telegram”. It can show the main button (MainButton), it can close the application, it can pull out the user’s data, it can adapt to the theme by itself — the person has dark mode on, and your app went dark too. A small thing, but the visitor likes it — as if your restaurant adjusted the lighting to their mood.

### Backend (almost always needed)

The backend is the server side that handles all the business logic. In essence it is the kitchen and the head chef. What the visitor does not see, but exactly where the result is born.

The dining room is about “pretty”. The kitchen is about “for real”. Remember the rule: the dining room decides nothing, the kitchen decides. If a glitch makes the price tag in the dining room say “steak — 0”, the restaurant will not go bankrupt. Because the order will go off to the kitchen, the chef will look into their storeroom and say: “nope, the steak costs two thousand, take the client the correct price”.

What does our chef do? Takes the order from the dining room. Checks that loyalty-card note (initData) — is the stamp real. Goes into the storeroom. And runs all the important logic.

Examples of what the kitchen is responsible for in a real bot: whether to let a person in or not (authorisation), how much they have on their balance, whether the payment went through, going to Claude or OpenAI for an answer. Do you see the pattern? Everywhere there is money, rights and access — that is the kitchen’s job. Never the dining room’s.

Why do we separate the dining room and the kitchen at all? Imagine a restaurant with no kitchen, where every visitor walks up to the stove themselves. Chaos will start: one overcooks the meat, another walks off with someone else’s order, a third writes a million bonus points onto their own bill. The separation is not engineers being pedantic. It is so that you do not have to hold the whole chaos in your head at once, and so that nobody robs you.

### Database

The database is the restaurant’s storeroom. Shelves, everything in its place, everything labelled. Logins here, balances here, subscriptions here, history here — who ordered what.

The main thing about the storeroom: the visitor does not go in there themselves. God forbid. Only the chef goes into the storeroom and brings the visitor what they ordered. Go in yourself and you may well get a slap.

And here is a line beginners pay no attention to at all, and they are wrong: “SQLite to start with, PostgreSQL as you grow”.

Let me explain it in human terms. SQLite is a squared notebook. It sits right there with you, simple, cheap, open it and write. For the start it is perfect. You do not need a warehouse with forklifts when you have ten visitors.

PostgreSQL is already a full warehouse system with stock control, racks and storekeepers. You need it when a crowd has stormed in and the notebook stopped being enough.

And here is my thought: do not build a warehouse when what you need is a notebook. Beginners love to pile up an “industrial solution” at the very start for a load that does not exist yet. Start with the notebook. The crowd will come — you will move over calmly. That is normal and everyone does it that way.

## Authorisation in a Mini App

Right, everyone, stop and listen to this section carefully. Remember the loyalty-card note — initData? I promised to come back to why you cannot trust it directly. I am coming back.

The note was handed to you by the shopping centre. It looks official. But technically it can be forged. Someone can draw themselves the same one with a felt-tip pen and write somebody else’s visitor number on it. Telegram passes the user data into initData automatically. However, that data cannot be trusted directly, because in theory it can be faked. On the server you must always verify the signature using the bot token.

That is why the note has to be checked under ultraviolet light. A real note from Telegram has an invisible stamp — it is called the hash. And the ultraviolet lamp under which that stamp appears is your bot token. The secret key of your bot, which only you, the owner of the restaurant, have.

The kitchen takes the note, shines the token-lamp on it and looks: did the real stamp appear or not. It matched — fine, this is a real visitor, we are working. It did not match — the note is fake, goodbye.

And now — what happens if you do not do that check. And here it is not “well, it is undesirable”. Here it is “everything breaks”. Any troublemaker draws themselves a note with a felt-tip pen, writes “I am visitor number 1, I am the admin” on it — and calmly walks into the director’s office. Changes prices, hands themselves bonuses, looks at other people’s data. Your entire security turns to dust.

Remember the engineering principle from the course — Crash Early, “fail immediately”? This is exactly what it is about. The kitchen saw a crooked note — it does not try to “somehow live through this”. It says “no” straight away and slams the door. Better to refuse honestly at the entrance than to let a crook in and shovel out the consequences tomorrow.

Good news: you will not be writing this by hand. You will simply say clearly in the prompt: “verify initData against the bot token on the server”. But understanding why it is needed is your duty. Otherwise the model will offer to cut the corner, you will agree, and you will not realise you have signed your own sentence.

## Linking with the Telegram bot

Everything here is simple, we have already talked it through — we are just fixing the image.

A Mini App is always launched through a bot. The bot is the entry point, that very tout at the doors of the shopping centre. A visitor will not wander into your corner on their own — the bot leads them there.

How exactly? Through a WebApp button. That is the flyer with the address (URL) of your application written on it. The logic could not be simpler: the bot sent a button → the person tapped → the mini app opened.

You can also make inline buttons or a button in the bot menu — those are simply different places where the tout can stand with the flyer. At the entrance, by the escalator, by the food court. The point is the same — give the person a convenient door. The more convenient the door, the more people will come in.

## Exchanging data between the Frontend and the Bot

Two ways for the dining room to pass data. Remember which of them is the grown-up one.

The first way, the correct one — through the backend. The dining room gives the order to the chef, and the chef sorts it out: goes to the storeroom, pokes the bot. Everything through the kitchen, everything under control. That is how serious projects do it.

The second way — through sendData. That is when the dining room shouts the order directly, bypassing the kitchen. The method exists, people sometimes use it, but it has limitations and in normal development it is rarely taken. It is like shouting your order across the whole room — it sort of works, but it is amateur hour, and on anything more complex you will definitely trip over it.

The conclusion is short: everything serious goes through the kitchen. Memorised — moving on.

## UI and UX specifics of Mini Apps

An important moment that many people skip. A Mini App cannot be made like an ordinary site. And here is why.

Your restaurant is not a separate building, but a small corner inside a shopping centre. And you have to behave accordingly.

One — the screen is mobile. You rented a corner, not a country mansion. Do not drag furniture for five rooms in there. The interface must be simple and adaptive — that is, it must sit neatly on a small phone screen.

Two — you are inside somebody else’s building. There are already walls, lighting and Telegram’s own styling around you. Do not overload your corner with flashing fairy lights — it will fight with the centre’s surroundings and look tacky. Minimalism. Clean, calm, to the point.

Three — speed, and this is critical. A shopping centre visitor is impatient. They did not drive across the city especially to see you — they were simply walking past. It lags for a couple of seconds and they turn round and go to the neighbour. Remember the rule from the course: the user must not wait. Here it is twice as strict.

To get the look in order quickly, people take Tailwind or the Telegram UI Kit. In plain words — ready-made styling sets. The Telegram UI Kit is made precisely so that your corner looks “native” to the shopping centre. Again — somebody else’s ready-made parts, we are not sweating over every fork ourselves.

## When it is worth using a Mini App

When is it worth opening a corner restaurant at all, instead of getting by with something simpler?

A Mini App is needed where the interface is complex and you cannot make it convenient with ordinary bot buttons. A personal account with a balance and history. A SaaS service right inside Telegram — yes, people make money on that, and rather well. An AI chat, like our project today — where you need a proper dialogue and communication with a server.

A simple rule: many screens, images, visual interaction — that is a Mini App. If a person has to look at something, scroll it, tap on something pretty — open the corner.

## When you should not use a Mini App

And straight away the other side — when you should not open the corner.

If the task is simple and is solved by three buttons in the bot — do not put up a restaurant. It is like opening a place with a dining room, a kitchen and a storeroom when people want a hot dog from a stand. Buttons in a bot are exactly your stand. Fast, cheap, right for a simple task. Remember the application levels from the course: we do not build a “Techno-Monster” when a “Lemonade stand” is enough.

The second point, honestly: if you have absolutely zero frontend experience, it will be a bit hard. But! This material exists precisely to give you the base. So do not turn round — we simply go step by step, and by the end you will have the base.

## The minimum stack to start with

Okay. We have met the crew — now the materials. What we are building out of and with. Do not be scared by the word “stack” — in plain words it is simply “a set of tools”. I go down the list and translate each one.

Frontend: HTML + CSS + JS. Our dining room. The basic bricks: HTML is the walls, CSS is the wallpaper and the paint, JS is what moves and reacts in the room.

Backend: Python3 + aiogram3. Our kitchen. Python is the language the chef speaks. aiogram3 is a ready-made set that lets the chef talk to Telegram specifically. Again — somebody else’s ready-made part, we did not forge it ourselves.

Database: SQLite. Our storeroom. That very squared notebook, we have already talked about it. For the start it is perfect.

Hosting: GitHub Pages. Now this is a new word. Hosting is the place where your restaurant physically stands, its address on the internet. A site does not hang in the air, it has to “live” somewhere. GitHub Pages gives your dining room an address and a roof — for free. Yes, yes, free, with no catch. I know you are used to looking for the trap. Just check for yourself.

And the main thing is that this set is enough. Not “for a toy”, but for most real projects, and you can calmly grow from it. No Kubernetes, no Redis and none of the other scary words people love to frighten you with on other courses. Four tools — and off we go.

## Summary

Okay, everyone, let’s draw the line before the next door. What you now know firmly — briefly, point by point.

One. A Mini App is not a part of Telegram and not some kind of magic. It is an ordinary site. It simply opens not in a separate building, but in a corner of the shopping centre called Telegram — and that is why a flow of people comes to it straight away, with no downloads and no registrations.

Two. The architecture is always the dining room, the kitchen, the storeroom. Frontend, Backend, Database. The bot leads the visitor into the dining room, the dining room sends the order to the kitchen, the kitchen goes into the storeroom. Memorise this chain like a metro map — we will be pointing at it throughout the whole guide.

Three. The three things everything rests on. Security — we check the initData note under the ultraviolet of the bot token, otherwise we let a crook in. Architecture — we do not pile everything into one heap, everyone has their own role. UX — the corner is small and fast, the visitor is impatient.

If you have memorised only the metaphor of the restaurant in the shopping centre — that is already enough not to get lost further on. Everything else we will be hanging onto it.

Next the following door opens — we stop talking and start assembling our mini app by hand through Claude. Let’s go.

## 💬🔑 Building a mini app with Claude 1.0

Okay, everyone. Enough theory — we open the door and start doing something with our hands. From here on, everything I show is vibe coding in its purest form: you write to the model in text, the model writes the code. Full stop. None of this “look at line eight, do you see this loop here”.

What we are building. A small corner restaurant in Telegram with an AI chat running inside it. The tout-bot hands the visitor a flyer with a button, the person taps — and the familiar interface of a model opens inside their Telegram.

Our AI will run on Groq. Do not confuse it with Elon Musk’s Grok — that is something else. Groq, put simply, is a very fast chef. One of the fastest engines for models in the world. Why fast matters — I will say in a minute.

### What this project does

### 🤖 The Telegram bot (main.py)

The file main.py is our kitchen and our tout in one. The bot’s backend. Let’s go through what it can do.

A person writes /start — that means they walked into the shopping centre and came up to your tout. The tout greets them by name and holds out one single flyer: the “Open AI chat” button. And right there, while the person is not looking, it quietly writes them into the notebook — ID, name, handle, time. That is our storeroom, SQLite. Why write it down? So that later you know how many people came to you, and so you have a way to send all of them something.

Next — /admin. This is the director’s office. Only the person whose ID is written in the code can go in there — that is, you. Inside there is a live panel: how many people in total, how many in the last day, week, month, who came in last. This is exactly that analytics from the first lesson — a diary that keeps itself.

And from the same place — /broadcast, the mailing. This is essentially a loudspeaker across the whole shopping centre. You pressed the button, wrote a message — and it flew off to everyone who has ever come to you. A golden thing: this is your direct channel to your audience, nothing in between.

### ⚡ The mini app (index.html)

And index.html is our dining room. The entire frontend. Everything the visitor sees and touches. It is a full AI chat inside Telegram, running on Groq — one of the fastest inference providers in the world. The llama-3.3-70b-versatile model answers so fast that the reply literally streams onto the screen word by word in real time.

And now — why I said Groq is the “fast chef”. Look at the word streaming. An ordinary chef cooks the whole dish and only then brings it out — you sit there staring at an empty plate for ten seconds. Groq brings the dish out piece by piece in real time — the answer types itself onto the screen word by word, as if a living person were typing. Psychologically that is a huge difference: the visitor is not waiting, the visitor is already eating.

What our dining room can do, briefly and to the point:

Talk to the AI in any format — and the answers come back nicely formatted: headings, lists, code blocks. Markdown — in plain words simply “text with proper formatting instead of one solid wall”.

Change the role through 🎭 — five modes: assistant, programmer, translator, writer, coach. Let me explain the trick: it is the same chef, changing clothes. Under the hood the system prompt changes — the starting instruction to the model about who it should be right now. You said “you are a programmer” — it thinks like a programmer. That, by the way, is a mini version of what we do throughout the whole course.

Copy the answer, stop the generation, export the conversation to a file, switch between light and dark themes. And — the history is saved. You closed Telegram, opened it again — you carry on from the same place. Small things? No. It is exactly these small things that build the feeling of “I am using a convenient application” instead of “this is some homemade thing”.

Claude will be building for us — our builder. Specifically, Claude Sonnet 4.6 in Think mode. What does Think mean? It is when the builder thinks first and builds after, instead of grabbing the trowel with a shout. Turn Think on any time the task is even slightly harder than “hi, how are you”.

We create three empty files in the project folder:

-   index.html — the builder will put the whole dining room here, the frontend;
-   main.py — the kitchen here, the bot backend;
-   .env — and this is a small safe for secrets. Remember the word: everything secret — tokens, keys — lives in .env, and does not lie around all over the code.

Let’s start by sending a prompt to Claude:

```

Build me a Telegram Mini App — an AI chat based on the Groq API.

Stack: Python, aiogram 3, SQLite, HTML + CSS + JS (a single index.html file)

Three files: .env, main.py and index.html

main.py — the Telegram bot:

On /start it registers the user in SQLite (user_id, username, first_name, joined_at) and sends a message with an inline button that opens the Mini App.
The /admin command, for ADMIN_IDS only — shows statistics: total users, users in the last 24 hours, week, month, and the last 5 who joined
The /broadcast command — a mailing to all users in the database
All user names must be escaped with html.escape so that the HTML parse_mode does not break
index.html — the Mini App:

The Groq API key is embedded directly in the code as the GROQ_API_KEY constant, no key-entry screens
Model: llama-3.3-70b-versatile via https://api.groq.com/openai/v1/chat/completions
Streaming responses (SSE) — the text appears as it is generated
Light theme by default, with a switch to dark in the header
A 📋 copy button on every AI answer (appears on hover)
A ■ stop generation button — appears while the AI is typing

🎭 Role selection: Assistant, Programmer, Translator, Writer, Coach — each role changes the system prompt

💾 Export the chat to a .txt file

Smart auto-scroll: if the user scrolls up while the AI is writing, auto-scroll stops; as soon as they come back to the bottom, it resumes
4 suggestion chips on the empty screen for a quick start

Deployment will happen through GitHub Pages. In main.py create a MINI_APP_URL constant
```

Now look at the prompt carefully. This is the blueprint of our restaurant, which we hand to the builder. And notice how it is put together — it is not “hey, make me an AI bot”. Everything is on its shelf here: here is the stack (the materials), here are the three files (the floor plans), here is what the kitchen does, here is what the dining room does, here is every button separately. The more precise the blueprint — the more precise the house. If you have our Promptmaster, it assembles exactly these structured blueprints for you.

```

Here is the broadcast code, add it to main.py

1. FSM — broadcast states
class BroadcastFSM(StatesGroup):
    text      = State()   # waiting for the message text
    media     = State()   # waiting for media (photo/video/gif) or a skip
    btn_menu  = State()   # button management menu
    btn_text  = State()   # waiting for the new button text
    btn_url   = State()   # waiting for the new button URL
    btn_color = State()   # waiting for the button colour choice
    btn_row   = State()   # waiting for the row choice (new or current)

2. Main part
def _build_bc_kb(bc_buttons: list) -> InlineKeyboardMarkup | None:
    """Builds the keyboard from the list of button rows."""
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
        [InlineKeyboardButton(text="➕ Add a button", callback_data="bc:add_btn")],
    ]
    if has_buttons:
        rows.append([InlineKeyboardButton(text="🗑 Clear all buttons", callback_data="bc:clear_btns")])
    rows.append([InlineKeyboardButton(text="✅ Done — go to preview", callback_data="bc:done_btns")])
    rows.append([InlineKeyboardButton(text="❌ Cancel the broadcast", callback_data="broadcast:cancel")])
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
        rows.append([InlineKeyboardButton(text="➡️ Into the current row", callback_data="bc_row:current")])
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
    """Sends the broadcast preview."""
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
        "📢 <b>Step 2 — Media</b>\n\nSend a photo, a video or a GIF, or skip:",
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
        "🔗 <b>Enter the button URL</b> (it must start with https://):",
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
        f"<b>Choose the button colour</b>\n\n"
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
        f"<b>Where to add the button?</b>\n\n"
        f"Colour: {COLOR_NAME.get(color, color)}\n"
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
    else:  # current — add to the last row
        bc_buttons[-1].append(btn)

    await state.update_data(
        bc_buttons=bc_buttons,
        bc_temp_btn_text=None,
        bc_temp_btn_url=None,
        bc_temp_btn_color=None,
    )

    COLOR_ICON = {"primary": "🔵", "success": "🟢", "destructive": "🔴"}
    icon = COLOR_ICON.get(btn["style"], "🔵")
    row_label = "the new row" if row_type == "new" or len(bc_buttons) == 1 else "the current row"
    await call.message.answer(
        f"{E_CHECK} Button {icon} <b>{btn['text']}</b> added to {row_label}.",
        parse_mode=ParseMode.HTML)
    await _bc_show_btn_menu(call.message, state)

@admin_router.callback_query(F.data == "bc:clear_btns", BroadcastFSM.btn_menu)
async def bc_clear_btns(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await state.update_data(bc_buttons=[])
    await call.message.answer("🗑 All buttons deleted.")
    await _bc_show_btn_menu(call.message, state)

@admin_router.callback_query(F.data == "bc:add_btn_cancel")
async def bc_add_btn_cancel(call: CallbackQuery, state: FSMContext):
    """Cancelling the button — back to the button menu."""
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

# ── Confirmation and sending ──────────────────────────────────────

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

    status = await call.message.answer("📤 Broadcast started…")
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
        f"{E_CHECK} <b>Broadcast finished</b>\n\n"
        f"Total in the database: <b>{total}</b>\n"
        f"Received: <b>{ok}</b>\n"
        f"Blocked the bot: <b>{blocked}</b>\n"
        f"Other errors: <b>{fail}</b>\n\n"
        f"Actually alive: <b>{active}</b>",
        parse_mode=ParseMode.HTML)

@admin_router.callback_query(F.data == "broadcast:cancel")
async def bc_cancel(call: CallbackQuery, state: FSMContext):
    await call.answer()
    await state.clear()
    await call.message.answer("Broadcast cancelled.", reply_markup=back_main_kb())
```

And one more thing:

```

Add the code for compulsory channel subscription:

1. Constants:

CHANNEL_ID = "@..."
CHECK_ID = ...
CHANNEL_GIF_FILE_ID: str | None = None

2. Subscription check:

async def check_user_subscription(bot: Bot, user_id: int) -> bool:
    if user_id == ADMIN_ID:
        return True
    try:
        member = await bot.get_chat_member(CHANNEL_ID, user_id)
        return member.status not in ("left", "kicked")
    except Exception as e:
        logger.warning("check_sub ERROR uid=%s: %s", user_id, e)
        return False

3. Keyboard:

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

4. Middleware (the main blocker):

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
            f"<blockquote>Subscribe to our channel and press “Check subscription”</blockquote>"
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

5. The check in /start:

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

6. Handler for the “Check subscription” button:

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
    # show the main menu…

7. Wiring it up in main():

sub_checker = SubscriptionCheckMiddleware()
dp.message.middleware(sub_checker)
dp.callback_query.middleware(sub_checker)
```

And here is an important moment, and I want you to understand the logic rather than just copy it.

Did you notice? We do not describe the second part of the prompt to the builder in words — we give it the ready code for the mailing. A big chunk that simply has to be pasted into main.py.

Why like that, instead of “write the mailing yourself”? Let me explain. The mailing is a treacherous thing: there is a step-by-step scenario in it (enter the text → attach a photo → add buttons → choose a colour → confirm), there are states, there are buttons inside buttons. That is exactly the zone where a model loves to get confused and assemble things crookedly. And instead of driving it back and forth ten times — we give it a ready, tested part.

Modern development is 90% assembly from other people’s ready-made parts. Nobody smelts metal in a blast furnace. This is exactly that. We do not sweat over the mailing from scratch — we take a ready unit and slot it in. That is not “cheating”, that is competent vibe coding: understanding what to write yourself and what to take ready-made.

The blueprint is handed over — now we get the “documents”. Two of them. After we have sent the prompt to Claude, follow the instructions:

### Step 1 — Getting the bot token

First — the bot token. We go to @BotFather. That is essentially Telegram’s passport office for bots. We write /newbot, create a bot step by step — and we are issued a token. The token is a long string, and it is both the passport and the key to your bot at the same time. Do not show it to anyone: with it, a stranger gets full access to your bot.

Second — your own user\_id. We go to @userinfobot — it simply tells you your numeric ID. Why is it needed? Remember /admin, the director’s office? For the kitchen to know that the director is specifically you, your ID has to be written into it. This is your personal pass into the office.

### Step 2 — Getting a Groq API key

Next — the key from Groq. Remember the API from the first lesson — the “service entrance”, the way your restaurant makes an arrangement with an outside service? Groq is exactly that outside service, our fast chef on outsourcing.

We go to console.groq.com, register, press Create API Key, copy it. An API key is a pass through the service entrance. With it, your application gets the right to order generations from Groq. Also a secret, also to be looked after.

To sum up:

1\. Go to console.groq.com

1\. Register → Create API Key → copy it

### Step 3 — Do you need to register the Mini App with BotFather?

Here is a question that can stall a beginner on flat ground. I will remove it straight away: you do not need to register the app with BotFather at the start.

Let me explain simply. Without registration — your corner only has a door from inside the shopping centre: the button in the bot works, the person comes in. For the start that is completely enough.

With registration — the corner also gets a direct link from the street (t.me/bot/app), which you can share anywhere. Convenient, but slightly harder to set up.

My advice: do not complicate things at the start. You put the link into the button — it works — move on. You will make the direct link later, when you want it. We do not build a “Techno-Monster” when a simple entrance is what is needed.

For the start it is enough to simply put the GitHub Pages link into the button — and everything works. Registration with BotFather is only needed if you want to share a direct link to the app.

### Step 3 — Inserting the data

The documents are obtained — we put them in place. In main.py we write in the bot token and our own administrator ID.

As for MINI\_APP\_URL — we do not touch it yet, we leave it as it is. Why? Because that is the address of our dining room on the internet, and we have not published the dining room yet — we will publish it in the next section through GitHub. Right now that address simply does not exist. We will get the link and come back and write it in. Everything in order, no running ahead.

1\. In main.py insert the bot token and the admin id

1\. As for the MINI\_APP\_URL link, leave it as it is for now.

### Step 4 — Testing and polishing

Okay, the moment of truth — we poke it with a finger. We open index.html and put the dining room through its paces: switched the theme, changed the role, exported the chat. We wrote /admin to the bot — looked into the director’s office, checked the statistics.

And here is the essence of vibe coding in one sentence: if something in the interface bothers you, you do not climb into the code by hand. You open the builder and describe it in words: “this button is small, make it bigger”, “the spacing is off, fix it”. The builder fixes it. You are the architect who says what is wrong. Laying the bricks is its job.

Summary:

1\. Open the file index.html

1\. Try switching the theme, the role, exporting the chat

1\. Write /admin to the bot — look at the statistics

Open index.html, and if something in the interface bothers you, write it out to Claude and ask it to fix it. That is how vibe coding works — you do not write the code yourself, you describe what you want to change.

## Notes

And here comes an honest conversation, with nothing papered over. Three points.

First. Above I said: tokens and keys are secrets, we hide them in a safe. And here we simply insert them into a file that will end up in a public repository. Why? Because this is a study project, a training one. Properly speaking, secrets are not stored like that, and in a real production project we will do it right. But right now our goal is for you to get your first result and your first dopamine without drowning in settings. Worried about the key — after the studies just reissue it and forget about it. Nothing terrible.

Second. Someone will ask: why is the whole dining room in a single index.html file instead of being laid out nicely across folders? I answer directly: because it is simpler that way. Some of you are beginners in code, and fiddling with project architecture right now is extra stress. One file — it is easier for you and more convenient for Claude the builder. When you gain experience — you will lay things out. Everything in its own time.

In the next section we will look at how to host a mini site for free using GitHub.

## 🚀🤖 Deploying the mini app through GitHub

## How to host a bot on GitHub Pages: a step-by-step guide

Next comes the door behind which your restaurant finally opens to people.

Look at what the problem is right now. Your dining room — index.html — is sitting on your computer. That is like building a gorgeous restaurant… in your own garage. Beautiful, but the only person who can come in is the one with the key to your garage. That is, nobody.

For visitors to come, the restaurant needs an address in the city. That is called hosting. And now we are going to give our dining room an address — for free, through GitHub Pages.

You remember GitHub from the first course as the insurance company — the place where versions of the code are kept and where you can roll back to. Well, this insurance company has a bonus service: it can also hang your shop window out onto the street. You upload a file, press a couple of buttons — and you get a live link you can send to anyone. No servers, no payments, no scary word “nginx”.

### What GitHub Pages is and why it suits us

An important caveat, and I want you to understand it rather than just nod.

GitHub Pages hangs only the shop window out onto the street — the dining room. Static files: HTML, CSS, JS. The picture the visitor taps on.

But the kitchen (the Python backend) is something GitHub Pages cannot host. It is not made for that. And here comes a logical question: “hang on, we have main.py, the kitchen — where does that go?”

Memorise the arrangement: the dining room, index.html, goes off to GitHub Pages, while the kitchen, main.py, lives on your computer for now and is started by hand. That is a working scheme for studying. Moving the kitchen out permanently, so that it works 24/7, is already the next section, about the server. For now — only the shop window.

### Creating a repository on GitHub

If you do not have a GitHub account yet — register at github.com. It takes a minute.

### 1\. Go to the main page and create a new repository

Step by step, no panic. Do not let the word “repository” scare you — in plain words it is simply the folder of your project, living in the cloud at the insurance company. Remember the analogy from the course: GitHub is Google Drive, only for code. In the top right corner press the + button and choose New repository.

Press + → New repository. We create the folder.

### 2\. Fill in the repository settings

On the repository creation page you need to fill in a few fields:

-   Repository name — any short name, for example my-bot or telegram-bot-ui
-   Visibility — you must choose Public. GitHub Pages only works for public repositories on the free plan. I know, I know: “public, anyone will see my code” — for a study project that is normal, and the free shop window only works this way. We do not touch anything else, we press Create repository.
-   Leave the other fields as they are

An important note: for 30 days you can make your repository private and still connect Pages.

Press Create repository. The repository is created — it is empty for now.

### 3\. Uploading the index.html file

Now you need to add your file to the repository. You can do it straight from the browser — installing Git is not required.

### 4\. Open the file uploader

On the page of the empty repository you will see a hint. Find the link uploading an existing file and click it.

### 5\. Drag the file in and save

Drag your index.html into the upload area, or press choose your files and pick the file by hand. Right in the browser: dragged it with the mouse, scrolled down, pressed the green Commit changes. The word “commit” simply means “save and lock in a version”. Locked it in — the insurance company remembered it.

The file is uploaded. Now it is in the repository — you can see it in the file list.

## Turning on GitHub Pages

The file is there — all that is left is to tell GitHub to make a site out of it.

### Go into the repository settings

In the top panel of the repository find the Settings tab (the gear). We go to Settings → Pages.

Find the Pages section

In the left sidebar of the settings scroll down to the Pages section (below the “Codespaces” section).

### Setting up the source

In the Pages section find the Branch block — by default it says None. Below it another dropdown will appear for choosing the branch. Choose main (or master — it depends on what your branch is called) and leave the folder as / (root).

Press the Save button.

## Waiting for the deploy and checking the result

The word deploy — let me translate it, because you will meet it constantly. A deploy is a “release”, the moment when your work turns from “sitting on my machine” into “hanging on the internet and available to people”.

You pressed Save — and GitHub ran off to glue up your sign. It takes 30 seconds to a couple of minutes. Do not fidget, do not refresh a hundred times. After saving, GitHub starts the publishing process. Usually it takes between 30 seconds and 2 minutes.

### 1\. Check the deploy status

How to tell it is ready: on the Code tab, next to the commit, an orange circle is spinning — still gluing. It turned into a green tick — done, it is up.

Click the icon to see the build details. When the status becomes pages build and deployment — success, the site is ready.

### 2\. Open the site

Go back to Settings → Pages.

And there it is, your prize — in Settings → Pages a link has appeared, in the form:

https://your-login.github.io/repository-name/

That is the address of your restaurant on the internet. You clicked — your dining room opened, live, available to everyone. Right now, if you have got this far — congratulations, you should have a smile on your face. That is that very first hit of dopamine.

Click it — your site will open, live, on the internet, available by link to everyone. That is it. You have just given the order to hang the shop window out onto the street.

By the way, remember MINI\_APP\_URL in main.py, which we left “as it is”? Now we finally have something to write in there. We go back into the file and paste this link. The circle is closed.

## How to update the bot after changes

If you have edited index.html and want to update the version on the internet — the process is simple:

You changed something in the dining room — you have to update the shop window on the street. The logic is the same: opened the file, the little pencil (Edit), made the changes or uploaded a new file, pressed Commit changes. The deploy will start by itself.

So, if you need to update something:

1\. Go into the repository and open the file index.html

1\. Press the pencil icon (Edit) in the top right corner of the file viewer

1\. Make the changes right in the browser, or upload a new file through “uploading an existing file”

1\. Press Commit changes — the deploy will start automatically

And one moment that every second person trips over, so listen carefully. You updated, you open the site — and the old version is there. Panic, “everything is broken”. Calm down. Nothing is broken — this is the browser cache. The browser is lazy: it remembered the old picture and shows it so as not to download everything again. It is cured by one combination — Ctrl+Shift+R, a hard reload. It means “browser, forget what you remembered, download it again”. Memorise this shortcut, it will save you a lot of nerves.

## Summary

Let’s draw the line. What you now have: the dining room of your restaurant is hanging on the internet at a permanent link, for free, and is available to everyone.

But — an honest caveat, so that you do not relax too early. We only hung the shop window out onto the street. The kitchen — main.py — is still on your computer and works only while the computer is on. You turned the PC off — the chef went home, the bot fell silent.

That exact problem — how to make the kitchen work properly 24/7 — is what we solve behind the next door. Let’s go.

## 🏗️🧱 Deploying the project to production

The word production sounds impressive, so let us translate it. Production means “for real”. It is when your bot works properly, around the clock, without you, instead of “while I have not closed the laptop”.

Up to this moment you had a study project. Behind this door — a working service. The difference is fundamental.

For the kitchen to work 24/7, we need a rented kitchen that never switches off. It is called a VPS — a virtual server. In plain words: somebody else’s computer in a data centre, which is always on, and which you rent.

### Why does our bot stop working when the PC is off?

Let me explain why that is, because to a beginner it is not obvious at all.

Here is the key thought: a bot is not a one-off action, it is a permanent process. It is not “pressed a button — got a result”. It is a chef who physically stands at the stove and waits for orders. All the time. While the chef is standing there — the bot answers. The chef left — silence.

When you start the bot:

```

python main.py
```

And where is your chef standing right now? They work locally, that is, right on your computer. Your computer is the building in which they have their kitchen. That means the bot is running as an ordinary program, it lives while your PC is working and it is permanently connected to Telegram. You turned the PC off, closed the terminal — you switched off the lights and locked the building. The chef, naturally, went home. Orders arrive — there is nobody to answer.

📌 Important: a bot is not a one-off launch, it is a permanent process

As soon as you:

-   turn off the computer
-   close the terminal
-   stop the code

👉 the following happens:

-   the python main.py process ends
-   the connection to Telegram breaks
-   the bot stops receiving messages

📌 Result: the bot no longer answers

The conclusion is simple: the chef needs a building that never closes. That is exactly what we are going to rent a server for.

Off we go to rent a building for the kitchen. We take the Timeweb Cloud service — roughly speaking, an agency for renting computers in a data centre.

## A step-by-step guide to creating a server. I go through the steps and translate each one so that you do not get stuck:

1\. First of all you need to register.

2\. Then go into the “cloud servers” tab. Here we have a wide range of different operating systems. We choose Ubuntu 24.04. OS — Ubuntu 24.04. The server’s operating system. Not the Windows you are used to — for servers people take Linux, that is what it is made for. You simply choose it from the list, nothing complicated.

3\. Region — abroad. And pay attention here, this is not a whim. Your chef Groq may be blocked if you are in Russia. If you rent a building in Russia, the chef will not get through to Groq, and the bot will not work. So we take the building abroad. Memorise the rule: if the bot goes to AI services — the server is abroad, always.

If your bot does not use any AI APIs and works by script, take a Russian region.

4\. Next comes the configuration. This is a very important but simple section. Since you have only one bot for now, feel free to choose the minimal configuration. This is “how powerful the building is”. You have one small restaurant, it eats 6–10% of the capacity. Renting an expensive mansion for a single corner is throwing money away. Minimal configuration, and have no doubts about it.

5\. Next comes the network; here we save everything and move on to the next point:

6\. Next comes the block about backups.

Backups are reserve copies of your project. They are needed so that you do not lose data and code if something goes wrong:

-   the server broke or froze
-   the SQLite database got corrupted
-   you accidentally deleted files or introduced an error into the code

📌 With backups you can always restore a working version and carry on without losses.

Put simply: backups are the insurance of your project, and they save time and nerves. Here choose at your own discretion.

7\. After that we leave everything as it is and move on to payment. I do not advise paying for a month straight away; take it for a day first, you will still be able to extend it later.

After payment our service should load in roughly 30–60 seconds.

## Instructions for hosting the bot itself

### 1\. Connecting to the server

Go into your service, copy your password (it will be on the right) and enter the console of your server. Okay, now commands in a black window are coming, and I know half of you feel a chill right now: “that’s it, this is not for me, this is hacker stuff”. Calm down. You are simply copying lines one by one and pasting them. There is nothing to learn by heart. I will lay out what each one does.

We connect to the server. You open the console — that is that very black window, a direct conversation with your building. The login is root (that means “the owner of the building, full access”), you paste the password. A small detail: in the console, pasting is Ctrl+Shift+V, not the usual Ctrl+V. And one more thing: when you type the password, nothing appears on the screen, no asterisks, nothing. That is not a bug, it is designed that way for security. Type blind and press Enter.

In total:

1\. Enter

1\. Type the login root

1\. Paste your root password with Ctrl + Shift + V

1\. After that you will see a welcome message

### 2\. Installing the dependencies

Now we need to install the system dependencies and the runtimes. Yes, yes, I know. “Dependencies? Isn’t that a bad thing?”… “What on earth are runtimes, what language is this?” Calm down. The building is empty — we are bringing the equipment in.

apt update and apt upgrade — refresh the lists and update what is there.

Next we install Python (the chef’s language), Node, and pm2. I will say a word about pm2 separately — it is an important fellow.

```

sudo apt update
sudo apt upgrade
sudo apt install python3 python3-pip -y
sudo apt install nodejs npm -y
npm install pm2 -g
```

📌 Important:

-   if (Y/N) appears → always press Y
-   if the console froze → type clear, and the screen is clean.

### 3\. Moving the project onto the server

Next we need to move our folder with the files onto the server. There are two ways to do it — through GitHub or through FileZilla — and we will do it the second way. We drag files from the computer to the server through FileZilla — that is, in plain words, a lorry for files. Installed it, entered the server details (host, login root, password, port 22), dragged the project folder with the mouse — and it drove off to the server.

You can install FileZilla from this link: https://filezilla-project.org/

### 4\. Connecting

After we have installed it and opened it, we need to enter our details:

1\. host (IPv4)

1\. user name – root

1\. password – the root password

1\. port – 22

You can take the password and the host from the dashboard on Timeweb.

### 5\. Transferring the files

Once we have entered our details, move the project folder into FileZilla.

Here generator is my project.

### 6\. Going into the project folder

Next we go into the Timeweb console and move into our folder by running the command:

```

cd /root/your_folder_name
```

To check which files we have in the folder, type the command:

```

ls
```

### 7\. The virtual environment

It sounds scary, in practice it is simple. It is a separate clean room for your project, so that its tools do not mix with other people’s and nothing conflicts. We created it with a command, activated it — and we work inside it.

Next we install the virtual environment with the commands:

```

apt install python3-venv -y
cd ~/your_folder_name
python3 -m venv venv
source venv/bin/activate
```

Download them one at a time

### 8\. Installing the dependencies

And finally we install the dependencies; yours are written down in requirements:

```

pip install aiogram python-dotenv httpx
```

pip install — we bring in the chef’s tools. aiogram, python-dotenv, httpx — these are those very ready-made parts from other people that the bot runs on.

9\. Starting the bot

We start the file:

```

pm2 start main.py
```

pm2 start main.py — we launch it. And now about pm2. What is it? It is the foreman who watches over your chef. An ordinary chef, if they stumble and fall, will just lie there and the bot will go silent. But pm2 stands next to them and keeps watch: the chef fell — pm2 picked them straight back up and returned them to the stove. On top of that, pm2 can show pm2 logs — the diary of what is happening with your chef — and pm2 restart — to restart it when you have changed something. Without it, production is not production.

Done. Your bot now works 24/7. You can turn the computer off — the chef does not care, they are in another building, and it does not close.

More useful commands:

1\. To see the python version, run the command:

```

python --version
```

2\. To see the logs of your project, type the command:

```

pm2 logs
```

3\. To restart the project, run the command:

```

pm2 restart main.py
```

Where main.py is your main file for launching.

## What do I do if I need to change the mechanics in my file?

Sometimes you need to change the bot’s logic: add a feature, fix a bug, release an upgrade or improve the behaviour.

Let’s go through how to do it properly.

### Instructions

### 1\. Connecting to the server

We go into FileZilla and connect to our server, the same as we did in point 4. Now we do not need to move the files any more, they are already there.

### 2\. Opening the file

As soon as we are in, we double-click our folder and then right-click the file itself that we want to edit. You should end up with something like this:

### 3\. Editing

We press “View/Edit” and then choose our IDE.

### 4\. Saving the changes

After we have fixed something, we save the changes with Ctrl + S and go back to FileZilla; a message about the change will pop up → we press “Yes”.

### 5\. Restarting the bot

But! There is one step that literally everyone forgets, and I want you to tattoo it on yourself. The last point of the checklist: restart the bot — pm2 restart main.py.

We go into the Timeweb console and restart the bot with the command:

```

pm2 restart main.py
```

Let me explain why there is no way around it. Your chef is already standing at the stove and working from the old recipe — the one that was there at launch. You rewrote the recipe on a piece of paper, but the chef is still cooking from memory! Until you shout “re-read the recipe” — and that is exactly what pm2 restart is — they will stubbornly keep cooking the old way.

So the golden rule is: changed → saved → restarted → checked. If you skipped the restart, you will sit there guessing why the changes “did not apply”. They did apply. The chef simply has not read them yet.

Done!

## Checklist

```

1. Made the change
2. Saved the file
3. Restarted the bot
4. Checked the result
```

If you have not restarted the bot, nothing will be saved!

## 🧙‍♂️💻 How to build a Telegram Mini App with an AI assistant. A guide for beginners

Okay, everyone. Remember at the very beginning I said you have two doors? The long one and the fast one. The fast one is opening right now.

We are building the same application — the same restaurant, the same AI chat. But with a different crew and different tools. If in the first block we were sweating — the Claude chat, GitHub Pages, renting a server, FileZilla, the console — here the whole process fits into one browser tab. We install nothing on the computer. Nothing at all.

You do not need to know how to program. All the code will be written by the AI (Claude Code), and you will simply give it clear commands (we have prepared them all — copy and paste) and press buttons in Telegram and on the Vercel site.

> 🎯 What you get at the end: your Telegram bot will have a button that opens a beautiful application with tabs (Courses, Schedule, Assistant, Booking, Contacts). And the AI will advise people about your prices, services and addresses — around the clock and for free.

The cost: 0 (everything on free plans).

Time: ~40–60 minutes if it is your first time.

## What all this actually is (unpacking the words on our fingers)

Before we start — a few words in plain language. If something is unclear right now, never mind, it will settle as the guide goes on.

A Telegram Mini App is a site-application that opens right inside Telegram, without installing anything from an app store. Imagine a browser tab, but it lives inside Telegram. Games in Telegram, shops, wallets — all of these are mini apps.

Claude Code is an AI programmer. You write to it in words what you want, and it creates the files and writes the code itself. It works right in the browser at claude.com/code. Think of it as a contractor who instantly does what you asked.

A skill is a “manual” for Claude Code. An ordinary AI can do a thousand things and sometimes “drifts”. But when you give it a skill on a specific topic (in our case, “how to make a Telegram Mini App”), it works like a narrow specialist: it knows the right techniques and does not improvise nonsense. The skill file is here — telegram-mini-app\_skill.md.

telegram-mini-app\_skill.md

GitHub is a “cloud folder” for code (like Google Drive, but for programmers). Your project goes in there.

Deploy and hosting — it sounds scary, in practice it is simple. Your code by itself is just files in a folder. For the application to open for people on the internet 24/7, those files have to sit on some computer that is always on and connected to the network. Such a computer is called a server (hosting), and the process of “putting the code on the server so that it starts working on the internet” is exactly what a deploy is. We use the free Vercel server — it takes the code from GitHub itself and publishes it on the internet.

Groq is the free “brain” for our assistant. It is a service that gives access to AI models (they are the ones composing the answers). It does not ask for money, you only need a free key.

Gemini is Google’s AI. We use it as a helper, to assemble the “knowledge base” about the business and to write the instruction for the assistant.

Ready? Off we go, step by step.

## Part 0. Setting up the accounts (10 minutes, all free)

Register in order. A bank card is not needed anywhere.

> 💡 Register with Vercel through GitHub (the “Continue with GitHub” button) — that way they become friends straight away, and you will need this at the deploy stage.

## Part 1. Creating a bot in Telegram and getting the token

Before making the application, you need the bot itself. Bots in Telegram are created through a special bot — @BotFather (this is the “passport office” for bots: through it a bot is registered and issued its key).

### Step 1.1. Creating the bot

Open @BotFather and send, one after the other:

```

/start
```

```

/newbot
```

Then BotFather will ask:

1\. The bot’s Name — what people see. For example: Tesla Driving School.

1\. The Username — the bot’s address, in Latin letters, and it must end with bot.

For example: tesla\_school\_bot.

### Step 1.2. Saving the token

After creation, BotFather will send the token — it looks like this:

```

8123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The token is the key to your bot. Whoever owns it controls the bot. So do not show it to anyone and do not post it on the internet. Copy it and save it in your notes — it will be needed later. We will call it BOT\_TOKEN.

## Part 2. Getting a free Groq key (for the AI)

1\. Go to https://console.groq.com → sign in with Google.

1\. In the menu choose API Keys → Create API Key → give it a name (for example tesla-bot) → Submit.

1\. Copy the key (it looks like gsk\_...) straight away — it will not be shown a second time. Save it in your notes as GROQ\_API\_KEY.

> ✅ Important about money: you do not need anything on your Groq balance. The llama-3.3-70b-versatile model that we use is free (there is a rate limit, but for a business that is more than enough). If later you see the assistant going silent — the reason is almost certainly not money, but some technical detail (we will go through it in the “If something is wrong” section).

## Part 3. Assembling the knowledge base and the prompt through Gemini (15 minutes)

For the AI to advise people properly, it needs two things:

1\. A knowledge base — all the facts about the business: services, prices, addresses, answers to frequent questions. This is the “textbook” the assistant answers from.

1\. A system prompt — the instruction on HOW to behave: answer in the customer’s language, do not push anything, and send those who want to buy to the “Booking” section or the contacts.

We will assemble both of them through Gemini. It is done in three simple passes.

### Step 3.1. Opening the prompt-writing helper

Follow the link to the ready-made assistant (Gem) that knows how to write prompts:

```

https://gemini.google.com/gem/1b0FlcxEkGezOA7DVFcf33sX5nKvDa7NC?usp=sharing
```

And send it this message (you can copy it as it is):

```

I need you to write a prompt that will follow a link to a website and analyse
the whole site in detail — the name, the plans, the services, where this
business is located, what it provides, what it does, the address, what can be
bought — in short, gather all the information from that site. Out of that
information it has to build a knowledge base about the company or the service
for my bot, which will advise people. The knowledge base must be produced in
English. Write the prompt.
```

Gemini will produce a ready prompt for gathering the knowledge base. Copy it.

### Step 3.2. Gathering the knowledge base from your site

Open a new chat in Gemini. Paste the prompt from step 3.1 into it, and after it the link to your business site. Gemini will analyse the site and produce

a neat structured text: general information, contacts, catalogue of services, prices, FAQ. That is your knowledge base. Copy all of it into your notes.

> 💡 If Gemini cannot open the site (it happens — the site is closed to bots): simply copy the text from your own pages by hand (prices, services, contacts) and paste it into the chat with the request “structure this into a knowledge base using the same template”. For example, send screenshots of the pages.

### Step 3.3. Getting the system prompt for the assistant

Go back to the first chat (where Gemini was writing the prompt) and send this message, pasting your knowledge base from step 3.2 at the end:

```

Great, now write a prompt for my AI assistant, which will advise clients from
the knowledge base. I want to stress: in the prompt, the assistant must answer
in English and must simply answer questions. The assistant must not sell
anything; if a person wants to acquire or buy something, the AI assistant must
send them to the contacts section, to the mini app or to the “Leave a request”
section.

Here is the preliminary knowledge base of the consulting assistant:
<PASTE YOUR KNOWLEDGE BASE FROM STEP 3.2 HERE>
```

Gemini will produce a ready system prompt — with the role, the rules of tone, the ban on selling and the instruction on where to send people who want to buy. Save it — we will hand it to Claude Code in Part 6.

## Part 4. Installing the skill into Claude Code

### Step 4.1. Creating a “cloud folder” (repository) on GitHub

Go to https://github.com/new → think of a name (for example tesla-mini-app) → choose Private → Create repository. Done, this is an empty folder for our project.

### Step 4.2. Opening Claude Code and connecting the repository

Go to claude.com/code, connect the repository you have just created and start a new session (chat).

### Step 4.3. Installing the skill (attaching the file)

Download the file telegram-mini-app\_skill.md (it is below).

telegram-mini-app\_skill.md

In the Claude Code chat attach this file (the paperclip icon, or drag the file into the window).

1\. Write exactly:

```

install and activate the skill
```

Claude Code will read the file and put it into the project (into the service folder .claude/skills/). That is it — now the assistant knows how to make mini apps properly.

> ⚠️ An important nuance: the skill only really “switches on” in a new session. So after installing it, start a new chat in Claude Code — and give the commands from Part 5 there. That is normal, that is how it should be.

## Part 5. Asking Claude Code to build the application itself

Open a new session in Claude Code (so that the skill is active) and send this prompt. Change only the description of the business and the tabs to fit yourself:

```

Using the telegram-mini-app skill, create a Telegram Mini App for my business
(a driving school) on React + Vite + TypeScript.

Requirements:
- Mobile-first design following Telegram’s native theme (light and dark theme
  supported automatically).
- A tab bar at the bottom: Courses, Schedule, Booking, Contacts.
- The “Courses” tab: service categories with plans, prices and a “what’s
  included” list. Every plan has a “Leave a request” button.
- The “Booking” tab: a form (name, phone, plan choice, comment) with validation
  of the entered data. If sending the request to the bot is unavailable, use a
  fallback: open WhatsApp with the request text already filled in.
- The “Contacts” tab: a phone number and social buttons (Telegram, WhatsApp,
  VK) with vector icons (SVG), no emoji.
- Move ALL content (prices, texts, phone numbers, links) into ONE file
  src/data.ts, so that I can edit it easily without touching the code.
- Prepare the project for deployment on Vercel (add vercel.json).

VERY IMPORTANT (so that there are no errors on Vercel):
The project will have server functions in the api folder, and the project runs
in ES modules mode ("type": "module"). So in ALL relative imports inside the
api folder you MUST specify the .js extension — for example:
import { x } from './_lib/telegram.js';
Without the .js you will get the ERR_MODULE_NOT_FOUND error on Vercel and the
functions will crash. Take this into account from the very beginning.
```

Claude will assemble everything in a couple of minutes. Do not dig into the code — the main thing is that it says “done”.

> 🧠 Why did we write about .js in advance? That is the very mistake we tripped over in the real process (see the “If something is wrong” section, error No. 1). By putting the requirement into the prompt straight away, you avoid it completely.

### Step 5.1. Loading in the real business data

Now we will put in the real prices and contacts. Take screenshots of the pages of your site with the plans and the contacts, and send them into the chat with this message:

```

Here are the real prices and contacts of my business (in the screenshots). Move
them carefully into src/data.ts: categories, plans, what is included, prices,
phone number and links to social networks.
```

> 💡 Screenshots are the most reliable way: Claude will carry the data over exactly, without inventing anything. Later, to change something (for example to raise a price), simply write: “change the price of the Standard plan to 9500 in src/data.ts”.

## Part 6. Adding the AI assistant (Groq)

Now — the “brains”. Send Claude Code this prompt, and at the end paste the system prompt that Gemini gave you in Part 3:

```

Add an AI assistant on the free Groq model to the project. It is needed in two
places:

1) A new “Assistant” tab in the mini app — a chat where the user writes a
   question and gets an answer from the AI.
2) Answers in the bot itself: a serverless function api/bot.ts (this is the
   webhook) that receives users’ messages to the bot and answers them via Groq.

Technical conditions:
- Take the Groq key ONLY from the GROQ_API_KEY environment variable (on the
  server), never write the key into the code.
- Default model: llama-3.3-70b-versatile (free).
- Put the system prompt and the knowledge base into a separate file
  api/_lib/assistant.ts.
- In all relative imports inside the api folder use the .js extension
  (for example './_lib/assistant.js') — otherwise Vercel will give
  ERR_MODULE_NOT_FOUND.

Here is the system prompt for the assistant (paste it into
api/_lib/assistant.ts as it is):

<PASTE THE SYSTEM PROMPT FROM PART 3.3 HERE>
```

Done — now the application has an AI tab, and the bot has smart answers.

### Step 6.1. Sending everything into the main version (merge into main)

A small but important explanation. Claude Code works in a “draft” (that is called a branch), while the Vercel server publishes only the “clean copy” (the branch

main). Until the changes have moved from the draft into the clean copy, they will not be in the application.

So at the end simply write to Claude:

```

Create a PR and merge everything into main.
```

(A PR is a “pull request”, and a merge is the merging of the draft into the clean copy itself. Claude will do it by itself.)

## Part 7. Deploying on Vercel (publishing the application to the internet)

### Step 7.1. Importing the project

Go to vercel.com → Add New… → Project.

Find your repository → Import.

Vercel will work out by itself that this is a Vite application. Nothing needs changing.

Press Deploy — we will add the keys afterwards (the next step).

### Step 7.2. Adding the environment variables (the keys)

A small analogy. The keys (the bot token, the Groq key) are like the keys to a safe. They must not be written directly in the code (the code sits in an open GitHub — that is the same

as sticking your flat key onto the door). Instead the keys are put in a protected place on the server — those are exactly the Environment Variables.

In Vercel: your project → Settings → Environment Variables. Add:

For each of them turn on the Sensitive toggle (it means “a secret”) and leave the environment as Production (Preview is fine too). Press Save for each one.

### Step 7.3. Deploying

Press Deploy (or, in the Deployments section, on the top build ⋯ → Redeploy). Wait for the status Ready (~1 minute).

> ⚠️ Remember the rule (rake No. 3): Vercel applies variables only to new builds. Every time you add or change a variable — press Redeploy, otherwise the server will “not see” the key.

Go into your project, the Deployments tab, and your status should change from Building to Ready.

Copy the address of your application — it looks like:

```

https://project-name.vercel.app
```

(ours was https://tesla-mini-app.vercel.app). We will call it APP\_URL.

## Part 8. Connecting the application to the bot through BotFather

Now we will attach the application to the bot so that it gets a launch button.

Open @BotFather → /mybots → choose your bot. The section you need is called Mini Apps (the icon with four little squares).

⚠️ Rake No. 4: the application settings are exactly in Mini Apps, not in “Bot Settings”. In “Bot Settings” you will land on a page with toggles (Inline Mode and so on) — that is not it. If you got lost — go back and look for Mini Apps.

Inside Mini Apps there are two items:

### Step 8.1. Main App (the bot’s application)

1\. Mini Apps → Main App → Enable (or “set URL”).

1\. Paste your APP\_URL, and it must have a slash at the end:

```

<https://tesla-mini-app.vercel.app/>
```

1\. For Launch Mode choose Fullsize (the application at full height — our

tabs at the bottom need the room). Compact is half the screen, Fullscreen is

the whole screen without the Telegram header.

1\. Save.

### Step 8.2. Menu Button (the button to the left of the input field)

1\. Mini Apps → Menu Button.

1\. Paste the same APP\_URL with the slash: https://tesla-mini-app.vercel.app/

1\. Enter the button text, for example Open the driving school.

1\. Save.

> ⚠️ The URL is always the root one and with a slash (.../). If later you connect your own domain (Vercel → Settings → Domains) — put that in instead of \*.vercel.app.

## Part 9. Turning on AI answers in the bot itself (webhook)

What a webhook is in simple words. For the bot to answer messages in the chat, Telegram has to know where to forward those messages. A webhook is simply the address to which Telegram will send every new message. In our case that is our /api/bot function on Vercel. It is set up once — by opening a special link in the browser.

Open a link like this in your browser, substituting your BOT\_TOKEN and your APP\_URL:

```

<https://api.telegram.org/bot><BOT_TOKEN>/setWebhook?url=<APP_URL>/api/bot
```

An example with fake values:

```

<https://api.telegram.org/bot8123456789:AAH.../setWebhook?url=https://tesla-mini-app.vercel.app/api/bot>
```

In response the browser should show:

```

{"ok":true,"result":true,"description":"Webhook was set"}
```

Useful links for the future (they open in the browser the same way):

-   Check the status: https://api.telegram.org/bot<BOT\_TOKEN>/getWebhookInfo
-   Turn it off: https://api.telegram.org/bot<BOT\_TOKEN>/deleteWebhook

## Part 10. Testing 🎉

Open your bot in Telegram:

1\. Press the “Open the driving school” button (or the application launch button) → the application with the tabs should open.

1\. Go to the “Assistant” tab → ask “How much does category B cost?” or “Where are the branches?” → an answer from the AI should arrive.

1\. Write a question straight into the chat with the bot → the AI will answer with a message.

If it is all like that — congratulations, you have a live mini app with an AI consultant! 🚀

## If something is wrong (frequent problems and solutions)

Where to look for the cause: Vercel → your project → Logs (or Deployments → the last build → Logs). Errors of the server functions are visible there. It was exactly the logs that saved us in the real process.

### Error No. 1 — the main one, let’s go through it in detail

What happened: the assistant was silent, and in the Vercel logs the functions were burning red:

```

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/api/_lib/telegram'
```

2026-05-24\_02-17-56 (2).png

Why it happened (on our fingers): our project works in “ES modules” mode. In that mode, when one file includes another file next to it, it must name it with the .js extension. Without the extension the server “does not find” the file and the function crashes — before it even reaches the AI. That is why it looked like “the AI or the balance is to blame”, while the problem was purely technical, in a single letter.

It was (wrong):

```

import { askGroq } from './_lib/assistant';
```

It became (right):

```

import { askGroq } from './_lib/assistant.js';
```

How to avoid it: we baked this requirement straight into the prompts of Parts 5 and 6 — if you copied them as they are, the error will not happen. If you caught it anyway — simply tell Claude: “add the .js extension to all relative imports in the api folder”, and merge into main.

## What it costs

C27JG5x 2026-05-24 04-05-21.mp4

Total: 0 per month. A bank card is not needed anywhere.

## How to rework the guide for your own business

The architecture is the same — only the content changes:

1\. Content: tell Claude to change the data in src/data.ts (prices, services, addresses, phone, social networks) — or send new screenshots.

1\. Knowledge base and prompt: repeat Part 3 for your own site and ask Claude to update api/\_lib/assistant.ts with the new prompt and base.

1\. Your own bot and keys: your own TELEGRAM\_BOT\_TOKEN and GROQ\_API\_KEY in Vercel.

1\. Connecting: Parts 7–9 (deploy, BotFather, webhook) — unchanged.

Any edit can be asked of Claude in human words: “change the prices”, “update the assistant’s knowledge base”, “create a PR and merge into main”. The main thing is to remember the rakes from the “If something is wrong” section, and everything will come together smoothly.

## Cheat sheet (the whole path in 12 lines)

1\. Set up the accounts: GitHub, Vercel, Groq, Gemini; create the bot in @BotFather.

1\. Save the BOT\_TOKEN (Part 1) and the GROQ\_API\_KEY (Part 2).

1\. Through Gemini assemble the knowledge base and the system prompt (Part 3).

1\. Create a repository on GitHub.

1\. In Claude Code attach telegram-mini-app\_skill.md → “install and activate the skill”.

1\. In a new session — the prompt from Part 5 (create the application, with the .js requirement).

1\. Send the screenshots with the prices → load them into src/data.ts.

1\. The prompt from Part 6 — add the AI assistant and paste the system prompt.

1\. “Create a PR and merge into main”.

1\. Vercel: import the repository → the variables (TELEGRAM\_BOT\_TOKEN, GROQ\_API\_KEY) → Deploy.

1\. BotFather → Mini Apps → Main App + Menu Button (APP\_URL with the slash).

1\. Open the setWebhook link for /api/bot. Check the bot. Done!

## 📝📋 Registering with Claude and the basic setup

To begin with you need to create an account.

The registration process is standard:

-   you go to the Claude site
-   you press the registration button
-   you enter an email or use sign-in through Google / Apple
-   you confirm the email

After that you land in the model’s interface and can start working.

## Phone number verification

At some stages, or depending on the region, Claude may require confirmation of a phone number.

What happens:

-   you enter the number
-   you receive an SMS code
-   you confirm the account

This is done to limit abuse and to create a unique user.

## What is important to keep in mind

-   not all numbers may be accepted by the system
-   sometimes the code arrives with a delay
-   in rare cases verification may not go through the first time

This is a normal situation, and it can be worked around.

## What to do if there are access problems

During registration or use, restrictions may come up. Below are the main cases and their solutions.

### 1\. The SMS code does not arrive

Possible reasons:

-   the service is overloaded
-   regional restrictions
-   problems with the operator

What you can do:

-   wait 1–2 minutes and request the code again
-   try another number
-   use a number from a different operator

### 2\. The service is not available in your region

Sometimes Claude may restrict access in particular countries.

The solution:

-   use a VPN
-   choose stable regions (for example Europe / the USA)

Important: after registering it is better to sign in from the same region, to avoid extra checks.

### 3\. Sign-in errors

Sometimes problems come up:

-   it does not let you into the account
-   the session gets kicked out
-   endless loading

What to do:

-   clear the browser cache
-   try another browser
-   sign in using incognito mode

### 4\. Usage limits

Over time you may run into limits:

-   a restriction on the number of requests
-   a temporary block on generation

This is normal — all models have restrictions.

Solutions:

-   wait for the limit to reset
-   use another account
-   alternate between models

## An important point

At this stage there is no need to go deep into every detail.

Your task is simply to:

-   register
-   get access to Claude
-   make sure everything works

The remaining nuances (limits, optimisation and so on) will be covered later in the course.

## Summary

After this block you should have:

-   a working account in Claude
-   verification completed
-   an understanding of how to solve basic access problems

This is the base, without which it is impossible to move on to practice and to building projects.

## Claude settings and the interface

Working with Claude is not only about writing prompts. Understanding the interface and setting the model up correctly for your tasks plays a big role. If you ignore this stage, you will get unstable answers, extra text and constant errors in the code.

This section goes through how the Claude interface is arranged, which settings really affect the result and how to set them correctly for vibe coding.

## How to get into the settings

To open the settings you need to click on your name (profile) in the Claude interface and go to the Settings / Preferences section.

It is exactly here that the model’s basic behaviour is set, and it will apply to all your conversations.

## The Claude interface

The Claude interface is made as simple as possible, but it is still important to understand how each element affects the work.

The main zones of the interface:

-   the input field — this is where you write tasks and prompts
-   the model selector — switching between Opus, Sonnet and Haiku
-   the Extended Thinking toggle — turns on deep analysis mode
-   the conversation history — access to previous chats
-   the settings (Settings / Preferences) — customising the model’s behaviour

Understanding these elements lets you find your way around faster and stay in control of the process.

## The “My preferences” section (Preferences)

This is one of the most important sections, and many people underrate it. In practice it is exactly what determines how good the answers you get will be.

Here you set the rules by which the model will work by default.

## Setting up the answer style

The first thing to set is the format of the answers.

Without any settings the model often:

-   writes too much text
-   drifts off into theory
-   gives vague answers

To avoid this, you need to state the format explicitly.

The recommended option:

Answer in a structured way, without padding. If you give code — explain what it does. Do not rewrite the whole code if I am asking for a change.

A setting like this immediately makes the answers more practical and more convenient to work with.

## Setting up the behaviour when working with code

This is a critically important point for vibe coding.

By default the model often rewrites the code in full, even when one line needs changing. That leads to errors and to losing control of the project.

To avoid this, you need to set clear rules.

An example of the setting:

```

When working with code, do not rewrite everything from scratch. Make only the necessary changes and explain exactly what has changed.
```

After this the model starts to:

-   make pinpoint edits
-   take the existing code into account
-   break the already working parts of the project less often

## Setting up the working context

One more important moment — tell the model what you do.

Without that it does not understand in what format to give the answers.

An example:

```

I build Telegram bots and websites using AI. What matters to me are practical solutions, without unnecessary theory.
```

This lets the model:

-   give more practical answers
-   avoid unnecessary explanations
-   hit the right format faster

## Extended Thinking (the reasoning mode)

There is a separate toggle in the interface — thinking.

It turns on a mode in which the model spends more time analysing the task and produces a more considered answer.

It is worth using in the following cases:

-   complex logic
-   unclear errors
-   designing the architecture
-   situations where the model gives weak answers

For simple tasks it is better not to turn it on, since it slows the work down and increases the consumption of your limits.

## How the settings affect the result

The difference between a configured and an unconfigured model is very noticeable.

Without settings:

-   a lot of unnecessary text
-   rewriting of the code
-   general, vague answers

With preferences configured:

-   the answers become shorter and more precise
-   the code is tidier
-   fewer corrections on your side
-   a higher predictability of the result

In essence, you start managing the model instead of adapting to it.

## The minimum set of settings

In short, there is a basic set that you definitely need to configure.

The answer style:

-   structured
-   without padding

Working with code:

-   do not rewrite everything
-   make only the changes

Context:

-   state what you do (bots, sites, automation)

That alone is already enough to improve the quality of the work a great deal.

## Summary

Claude’s settings are not a secondary element, they are the foundation of effective work.

They let you:

-   reduce the number of errors
-   speed up the development process
-   make the answers stable and predictable

If you skip this stage, you will spend more time correcting answers than on the development itself.

## The prompt system in vibe coding

The prompt system is the foundation of all work with AI in development. Through prompts you are not simply “chatting” with the model — you are effectively managing the process of creating a product. And it is worth fixing one key thought straight away: you do not need to become an expert in wording or to look for the “perfect prompt”.

In real work everything is built differently. The result is achieved not through one precise command, but through successive iterations: you set the task, get the result, analyse it and correct it. That very cycle is the basis of vibe coding.

## How your role changes

In classical programming you write the code directly. In vibe coding you work at the level of management.

Now your task is to:

-   set a clear task
-   check the result
-   make corrections

The AI acts as the executor, and the prompt is your technical brief. The better you manage this process, the higher the quality of the result.

## The mistake that holds most people back

Many beginners think from the start that they have to word their requests perfectly, otherwise nothing will work. That creates unnecessary tension and slows the work down.

In practice:

-   you can write in simple words
-   you can word things imperfectly
-   you can change the task along the way

What matters is not the precision of the wording, but the ability to bring the result to the state you need.

## The basic principle of working with code

There is one rule that critically affects the stability of a project:

### 👉 Do not rewrite the code, add to it

This principle should be used almost always.

If you ask the model to rewrite the code, it starts changing the structure, touches the parts that already work and often breaks the logic. As a result you get bugs that are hard to control.

But if you word the task as “add”, “change” or “extend”, the changes happen precisely. The current logic is preserved, the architecture is not broken, and the result becomes easier to control.

An example prompt:

```

Do not rewrite the whole program, write out only the necessary pieces of code and say exactly what goes where.
```

## What the real work looks like

The process is always iterative. You do not do everything in one request.

An example of a real interaction:

First you write a simple request:

> add a profile button

The AI gives a result, but it may be imprecise or crooked. After that you clarify:

> do not rewrite the code, just add the button properly

Then you get the result again and, if needed, correct it once more. This cycle repeats until the result suits you.

## Ready-made prompt templates

So as not to spend time on wording every time, people use basic templates. You simply paste them in and substitute your own task.

### The universal prompt (the base)

Used in most cases, when you need to create something.

An example prompt

```

Write a Telegram bot in python, database sqlite, the aiogram library, html fonts, as a single piece of code, the API key in .env, the dependencies in requirements.

The point of the bot is that ....
```

Make the following change in the project:

```

Everything is fine, but the following changes need to be added:
1. ...
2. ...
3. ...
```

Important:

-   do not rewrite the whole code
-   add only what is necessary
-   do not break the existing logic

### The prompt for fixing an error

Used when working with bugs and errors.

An example prompt when the error is visible in the logs:

```

# you_paste_your_logs_here

Do not rewrite the whole program, write out only the necessary pieces of code and say exactly what goes where.
```

An example prompt when there is a syntax error:

```

Here is the code and the error:
[code + error]

Fix the error. Do not rewrite the whole code. Explain the reason briefly.
```

## Where to paste the prompts

This moment is simple but important. All prompts are pasted into the ordinary chat input field.

The process looks like this:

First you open the chat → then you paste the template → replace the text with your own task → send it.

## Practical principles

To work effectively, stick to a few simple rules.

First, it is not worth writing enormous requests. It is far more effective to break the task into small steps and carry them out one after another.

Second, always divide the work into stages. Instead of “make the whole project”, it is better to go step by step: first the structure, then the functions, then the database and so on.

Third, do not be afraid to repeat your constraints. If the model ignores them, simply write them again — that is normal practice.

And finally, there is no need to try to “choose polite words”. If the result is wrong, you can say directly: “you did the wrong thing, fix it”. That is a working format of interaction.

## Summary

Prompts are not magic and not a separate complicated discipline. They are a management tool.

They are built on three things:

-   a clear task
-   constraints
-   correction of the result

You are not obliged to write perfectly. Your task is to be able to bring the result to the state you need. That skill is exactly what makes you effective in vibe coding.

## Claude’s limits and how to build stable work

When working with Claude you need to understand from the start that the model functions within technical limits. These limits concern the volume of text processed, the number of requests within a certain period and the overall computational load. They are not a flaw — they are a basic feature of any AI system. The user’s main task is not to ignore these limits, but to build the working process with them in mind.

## Types of limits and how they affect the work

There are several key types of limits that you will run into.

The first is limits on the number of requests. During active work the model may temporarily restrict how often it answers or increase the response time.

The second is the context limit. The model can process only a certain amount of text at once. That volume includes not only your current request, but also the previous messages and the model’s own answer.

The third is the generation speed limit. Under heavy load the answers may come slowly or break off part way.

Understanding these factors lets you avoid most problems before they even appear.

## Tokens as the basis of how the model works

The key concept when working with Claude is tokens. The model does not perceive text the way a person does; it breaks it into separate elements — tokens.

A token is a part of a word, a character or a short sequence of characters. One paragraph of text can contain dozens or hundreds of tokens.

It is important to keep in mind that:

-   the whole conversation is counted, not only the last message
-   the model’s answer is counted too
-   long requests sharply increase token consumption

## The practical effect of tokens on code

When working with code, token limits become critical. If you paste in a large file and ask for changes, the model may:

-   fail to see part of the code
-   lose the logical connections
-   generate an incorrect result

So the optimal strategy is to work with code in parts. Split the project into logical blocks and handle them separately. This approach lets you keep control of the structure and minimise errors.

## The iterative way of working

The most effective way of interacting with Claude is the iterative approach. It consists of refining the result step by step, rather than trying to get the final solution in one move.

The process looks like this:

first a basic request is formed → then pinpoint changes are made → after that improvements and extra features are added.

This approach provides:

-   stability of the result
-   predictability of the changes
-   a reduced number of errors

## Mistakes when working with prompts

The most widespread problem is overloaded requests. The user tries to describe the whole project at once, add every requirement and paste in a large volume of code.

That leads to the following consequences:

-   the quality of the answer degrades
-   the structure is lost
-   unnecessary or incorrect changes appear

The sensible approach is to form one request for one task. The simpler and more precise the request, the higher the quality of the result.

## Optimising your work around the limits

To work effectively you need to follow a few principles.

First, cut down the volume of text. Remove everything unnecessary and do not duplicate information.

Second, break complex tasks into stages. This reduces the load on the model and makes control simpler.

Third, work in parallel. Split tasks between different conversations so as not to overload a single context.

## Scaling the work

As the volume of tasks grows, the need for scaling appears. One of the ways is to use several accounts or sessions.

This lets you:

-   get around the limits of a single working channel
-   carry out tasks in parallel
-   keep up a high pace of development

However, this approach should be used consciously and without breaking the platform’s rules.

## A practical working scheme

The optimal model of working with Claude is built on the following principle:

a specific task is singled out → a short and clear request is formed → the result is received → a check is carried out → refinements are made.

If the task is large, it is divided into several stages. If the code is complex — the work is done module by module.

## Summary

Claude’s limits are not a barrier, but a factor to take into account when building your working process. Understanding the principles of tokens, context and limits lets you significantly increase your effectiveness and get stable results.

The key conclusion is this: the more structured your approach and the less you overload the model, the higher the quality of the final result.

## 📜💬 Claude glossary

> 💡 Anthropic: the team behind Claude, working on the creation of helpful, harmless and honest artificial intelligence systems.

> 💡 Claude AI: an artificial intelligence chatbot developed by Anthropic, designed to generate conversational, creative and analytical output while keeping interaction with the user comfortable.

> 💡 Prompt engineering: the process of designing and refining prompts to get specific, high-quality results from Claude.

> 💡 Context window: the maximum volume of input that Claude can process and “remember” at one time. Claude 3 has a context window of ~200,000 tokens, which is far ahead of many other artificial intelligence models.

> 💡 Tokens: units of text (for example words, sub-words or characters) that Claude processes. A token is roughly four characters of text.

> 💡 Prompt: the input provided to Claude, consisting of questions, commands or instructions that guide its answers.

> 💡 Hallucination: when Claude generates output that is factually inaccurate or entirely invented. It is important to check answers for reliability so as not to rely on hallucinated content.

> 💡 Assigning a role: a technique for guiding Claude’s behaviour by assigning it a particular role, for example: “You are a productivity expert helping me optimise my workflow”.

> 💡 XML tags: XML (Extensible Markup Language) tags are a way of organising and structuring input so that Claude can process it in an orderly way. Think of XML tags as labels that tell Claude: “this part of the input is for this particular task”.

An explanation for a five-year-old: imagine you are sorting your toys. You put the cars into a box labelled “Cars”, the dolls into a box labelled “Dolls” and the puzzles into a box labelled “Puzzles”. These labels (tags) help you — and Claude — understand what goes where and how to use it!

An example:

Suppose you want Claude to prepare a summary of an article and then analyse it. You can use tags to separate these two tasks:

```

<article>
Here is a super long and important article about space exploration.
</article>

<task>
Summarize this article in 3 bullet points and explain why it's significant.
</task>
```

> 💡 Multimodal inputs: the ability to give Claude several kinds of information at once, such as text, tables or structured data (for example lists or tags).

An explanation for a five-year-old: imagine you give your friend a colouring book (the text) and pencils (the data) at the same time, so that they can colour the pictures in. Claude uses both together to create something cool.

An example:

You give Claude a table and ask for an analysis:

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

Claude’s answer: sales grew steadily by about 300 units a year, showing sustained growth across the three years.

> 💡 Chain of thought (CoT): a prompting strategy that instructs Claude to provide intermediate reasoning steps, breaking complex problems into smaller, logical parts.

An example prompt:

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

> 💡 Prompt chaining: prompt chaining means breaking complex tasks into sequential, manageable subtasks and handling them step by step. This ensures that Claude’s artificial intelligence performs each segment with high precision, reducing the number of errors and increasing the overall accuracy of the task.

When to use prompt chaining

Prompt chaining is ideal for:

-   Multi-stage research synthesis: summarising articles, analysing data and drawing conclusions.
-   Iterative content creation: developing outlines, drafts, editing and formatting.
-   Document analysis: breaking large documents into smaller sections to get precise conclusions.
-   Decision-making tasks: gathering data, evaluating options and recommending decisions.
-   Error-intolerant processes: creating workflows where accuracy is decisive, for example legal review or important decision-making.

How to implement prompt chaining

1\. Define the subtasks:

-   Break the main task into smaller logical steps.
-   Make sure each step is simple enough for Claude to carry out with high accuracy.
-   Example: Research → Plan → Draft → Review.

1\. Define the goals for each step:

-   Write clear single-task instructions for each subtask.
-   Example: “Summarise the main arguments in this article and include quotations”.

1\. Structure the input and the output:

-   Use tags, such as XML, for a smooth transition between prompts.
-   An example:

```

<task1_output>
Summary: {{SUMMARY}}
</task1_output>
```

1\. Iterate:

-   Review Claude’s results for each step.
-   Refine the prompts if the answers are unclear or incomplete.

1\. Debug the problem steps:

-   Isolate the problematic subtask and test it separately.
-   Adjust the instructions to improve performance.

1\. An additional advanced method — self-correction chains:

-   Include a feedback and revision loop in which Claude reviews its own results and improves them.

> 💡 Zero-shot prompting: giving Claude a single instruction or question without additional context or examples.

> 💡 Few-shot prompting: giving Claude examples of inputs and expected outputs to guide its answers and increase accuracy.

> 💡 System message: an instruction to Claude that sets the tone or the constraints of the interaction, for example “Answer as a professional financial adviser”.

> 💡 API integration: using Claude’s API to integrate its capabilities into applications for tasks such as automation, customer support or data analysis.

> 💡 Prompt creation: the art of writing precise and structured prompts to elicit the desired response from Claude. The best prompts separate sections using <xml> tags.

> 💡 Prompt optimisation: gradually refining prompts to improve the quality and relevance of Claude’s answers.

> 💡 Human-like tone: a distinctive feature of Claude, letting it generate conversational, natural-sounding answers suitable for a variety of use cases.

> 💡 Feedback loop: the process of evaluating Claude’s results and revising the prompts to improve the model’s performance.

> 💡 Multimodal inputs: Claude’s ability to process different types of input, such as text, tables or structured data, depending on the integration capabilities.

> 💡 Multi-example prompting: a method of teaching or guiding AI models, Claude included, by providing several examples in the prompt to set expectations for the output. This technique demonstrates the desired format, tone and structure, helping the model generalise and generate consistent answers for similar tasks.

> 💡 Safety features: Claude’s built-in measures to prevent the generation of harmful, unethical or dangerous responses.

> 💡 Bias mitigation: Claude’s training includes steps to reduce bias in its output, ensuring fair and equitable answers.

> 💡 Bulk context use: making use of Claude’s ability to process large data sets or conversations within a single session.

> 💡 Iterative refinement: the practice of adjusting and testing prompts repeatedly for maximum effectiveness of Claude on a task.

> 💡 Explainability: Claude’s ability to justify its answers, increasing trust and transparency.

> 💡 Claude’s strengths:

-   A massive context window for processing extensive input.
-   A natural conversational tone that mirrors human interaction.
-   The availability of a free version for basic use cases.

> 💡 Claude’s limitations:

-   A tendency to hallucinate in certain scenarios.
-   It requires clear instructions for complex tasks.
-   Availability may vary depending on the region.

> 💡 Typical use scenarios:

1\. Summarising long documents or articles.

1\. Developing business strategies or proposals.

1\. Analysing data and forming conclusions.

1\. Developing creative content, such as scripts or blog posts.

1\. Producing text as close to human writing as possible.

1\. Exploring complex problem-solving scenarios.

> 💡 Use cases: real-world areas where Claude is applied, including content creation, brainstorming, summarising texts, answering queries and analysing data.

## ⚡🧠 The power of Claude skills

Okay, and now the tastiest part. Claude skills are the feature after which you will stop writing the same long prompts over and over.

Imagine: you have a new head chef in your restaurant. Every day you explain it to them from scratch: “right, our plates are warm, the sauce goes only to the right of the meat, we do not mix the side dish”. And every day the same thing. Annoying? Annoying.

What does a normal restaurateur do? They write the kitchen’s internal rulebook once. They hand it to the chef. The chef reads it once — and after that simply works by it. The rulebook sits in a folder, the chef can see it, and in any difficult case they open it and look.

Claude skills are exactly that kind of rulebook, only for the model.

The Claude skills feature lets you save sets of instructions that Claude loads automatically when they are relevant to your task.

Instead of pasting the same prompts again and again, or overloading the project with every instruction you have ever written, skills let you organise your workflows, and they load only when needed.

Whether you are creating weekly reports, enforcing brand guidelines or following a particular code review process, skills let you teach Claude once and make it remember the workflow for good.

### What skills are not

Skills are not plugins, not hard-coded functions and not standalone code execution. They are structured sets of instructions that change Claude’s approach to a specific task.

Anthropic describes them as onboarding guides for new employees: a document that teaches Claude the right way to do a specific job, so that you do not have to explain it from scratch every time.

That makes skills especially effective for tasks you carry out regularly, but not constantly.

## How skills work

Skills use progressive disclosure of information to stay efficient. Claude loads the instructions in three stages:

The scanning phase (~100 tokens per skill) — when a conversation starts, Claude reads only the name and the short description of each available skill. The full instructions stay dormant until your request matches the skill’s description.

The activation phase (~5000 tokens) — when a match is found, Claude loads the full content of SKILL.md into the context. That is where the real instructions live.

The execution phase (on demand) — any additional resources or scripts the skill refers to are loaded only when they are actually needed during execution, which keeps the token volume small.

Unlike projects, where every instruction is loaded at the start of every conversation regardless of its relevance, skills consume tokens only when activated. Scanning 30 available skills costs roughly 3000 tokens, while the same instructions stored in a project’s custom instructions would require tens of thousands of tokens.

## What is inside a skill

A skill is a folder containing a file called SKILL.md. The file consists of two parts.

The first is the YAML frontmatter, placed between two --- markers at the top. It contains the skill’s name and description (the only content Claude reads during the initial scan) and additional fields for dependencies.

The description controls when Claude activates the skill. A specific, action-oriented description such as “Generate standardised weekly team updates with metrics, wins and blockers” triggers precisely. A vague description such as “Helps with writing” triggers on almost every request, wasting tokens and cluttering the context.

The second part is the Markdown body containing the full instructions that Claude follows when the skill is activated.

-   A well-structured text usually includes several key sections:
-   an overview explaining what the skill does, the specific situations in which it should be used,
-   step-by-step instructions for Claude,
-   examples showing what a good result should look like,
-   guidance for handling errors when something goes wrong or edge cases come up,
-   the known limitations of the skill and any recommendations or constraints to keep in mind.

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

For complex workflows, keep the main SKILL.md file concise and refer to separate files for detailed edge cases or advanced examples. Claude loads the referenced files only when the specific scenario arises, using the progressive disclosure model directly.

The file name must be exactly SKILL.md. It is case-sensitive. Variants such as skill.md, Skill.md or README.md will not be recognised.

## Default skills and custom skills

Claude comes with default skills already built in. Every time you ask Claude to create a document, a spreadsheet, a presentation or a PDF, Anthropic’s ready-made skills handle the formatting and structure behind the scenes.

They cover file formats such as .docx, .xlsx, .pptx and .pdf. It is thanks to them that Claude can create properly structured Word documents and presentations without extra instructions. Most users interact with them daily without realising it.

Custom skills are the ones you create yourself or install from the community. They let you define precisely how Claude will carry out tasks unique to your workflow: following a brand style, specialised reports, code review checklists, research frameworks.

Custom skills can include text instructions, scripts and reference files that Claude can execute or look through while carrying out the task.

Custom skills require a paid plan (Pro, Max, Team or Enterprise) and code execution enabled in the settings. Each active skill adds a small token cost during the initial scan, so concentrate on the skills you actually use.

## How to turn skills on

To use custom skills, go to Settings > Capabilities and enable “Code execution and file creation”. Once activated, you can switch individual skills on and off in the same menu.

An additional option, “Enhanced file creation and analysis”, is available in the experimental features for richer document workflows.

For Claude Code, personal skills are stored in ~/.claude/skills/skill-name/, while project-specific skills shared across the team go into .claude/skills/skill-name/ in the project directory.

For Claude Desktop and the web application, skills are loaded through Settings > Capabilities > Skills.

## Real-life examples of use

Skills suit any role, not only developers. Here is how different roles use them.

### The “Brand guardian” skill for marketers

The “Brand guardian” skill holds the voice and tone guidelines, the approved terminology, the formatting standards and links to the style guide. When Claude writes anything customer-facing, it automatically checks it against those guidelines. No more pasting brand documentation into every conversation.

### The codebase visualiser for vibe coders

The “Codebase visualiser” skill runs scripts that generate HTML maps of the project’s file structures. Instead of navigating the file tree by hand, you ask Claude to show how the project is organised and get a visual diagram. It is especially useful for non-traditional developers who find complex project structures bewildering.

### A job application generator for productivity

The “Job application” skill stores your CV data, cover letter templates and personal guidance on writing style. Paste in the job description, and the skill generates tailored application materials using your style of writing and your background. No more re-uploading documents and re-explaining your qualifications for every application.

### Code review and documentation skills for teams

A code review skill enforces a single checklist: security vulnerabilities, performance issues, test coverage, style compliance. A documentation skill guarantees that every new feature is documented in the same format. These shared skills are placed in the .claude/skills/ directory at project level so that every member of the team has access to them.

### Community skills worth exploring

Besides creating your own skills, the community has developed several proven ones worth exploring.

The code review and git-commit skills from Zapier

Designed for engineering workflows. The code review skill enforces a single checklist covering security, performance and style. The git-commit skill generates standardised commit messages following the conventional commit format.

More information: ‣

Branding skills

Focused on maintaining visual identity: approved colour palettes, typography rules, logo usage guidelines and tone-of-voice standards.

More information: ‣

Stock forecasting skills

Serving e-commerce workflows. They hold rules for product categories, seasonal adjustment logic and report templates for demand forecasting and reorder recommendations.

More information: ‣

Voice / audience skills

Split the instructions into three files: one for voice and tone, one for audience profiles, one for content structure templates. This keeps every component modular and easy to update independently.

More information: ‣

These and hundreds of other examples can be found in Anthropic’s official skills repository on GitHub and in the VoltAgent community list awesome-agent-skills, which contains more than 200 skills across various categories.

In our extended training you get a ready-made library of skills for Claude Code, consisting of more than 1000+ exclusive skills, from complete application development to solutions for specific professions.

## Creating your first skill

There are three ways to create a custom skill, from fully automatic to fully manual.

### Option 1 — Using the settings interface (the simplest)

Go to Settings > Capabilities > Skills and choose “Add” > “Write skill instructions”. Claude provides a text field into which you can type the skill instructions directly.

This is the fastest way to get a skill running, though it offers less flexibility for complex workflows.

### Option 2 — Using the built-in skill creator (a step-by-step guide)

Anthropic includes a built-in skill called “skill creator” that walks you through the whole process. Simply tell Claude what you want: “Help me create a skill for writing product descriptions in our brand style”.

Claude asks clarifying questions about tone, formatting, audience and constraints, and then generates a complete SKILL.md file.

This approach is ideal for users who know what workflow they need but are not sure how to structure the instructions.

### Option 3: Create the SKILL.md file by hand (maximum control)

For full control, create the folder and the file yourself.

Step 1: create a new folder named after your skill, using lower-case letters and hyphens: my-first-skill/

Step 2: inside that folder create a file called SKILL.md (case-sensitive).

Step 3: add a YAML header with the name and description at the top of the file. The description is the trigger — make it specific and action-oriented so that Claude knows exactly when to activate this skill.

Step 4: write the Markdown body with your instructions. Include sections on when to use the skill, step-by-step instructions, examples of the expected result and any recommendations or constraints.

Step 5: put the folder in the right place. For personal skills in Claude Code use ~/.claude/skills/skill-name/. For skills shared across a project use .claude/skills/skill-name/ in the project directory. For Claude Desktop and the web application, upload it through Settings.

As soon as the skill is installed, Claude will detect it automatically in the next conversation.

No activation is needed: if the description matches your request, Claude loads and follows the instructions.

## Common mistakes and limitations

The skills ecosystem is still young. Watch out for the following pitfalls.

Descriptions in the preamble that are too general

A description like “Helps with writing” will trigger on almost every request, causing the skill to load when it is not needed, which wastes tokens and can confuse Claude’s output.

Descriptions should be specific and action-oriented, clearly defining the exact task the skill is meant for.

SKILL.md files that are too long

This can significantly reduce the context window. When a skill is activated, its full content is loaded into the context, so a skill of 10,000 tokens reduces the space available for the actual conversation and output.

For complex workflows it is better to keep the main SKILL.md file concise and refer to separate files that Claude loads only when specific scenarios arise.

Skills can only use pre-installed packages

There is no way to install new runtime dependencies on the fly, so any scripts or code inside a skill must work with what is already available in Claude’s runtime environment.

There is no centralised administration through claude.ai.

Organisations cannot push skills to all team members from a central control panel. Each user manages their own skills in the web application and on the desktop.

For Claude Code, project-level skills in .claude/skills/ provide a workaround for sharing within a team, but wider deployment across an organisation is not yet supported.

Skills can execute arbitrary code

They should be treated with the same caution as browser extensions or third-party software.

Install skills only from trusted sources and review the content of any SKILL.md file before enabling it, especially if it contains scripts or links to external resources.

## Where to find more skills

The skills ecosystem is growing fast.

Anthropic’s official skills repository

Anthropic’s official skills repository on GitHub provides vetted and maintained skills as a starting point.

The VoltAgent community awesome-agent-skills

The VoltAgent community awesome-agent-skills holds a list of more than 200 skills across various categories, and the Zapier blog offers practical guides to creating skills for real business processes.

Give preference to community skills that are already in use and tested in practice, rather than ones that have just been published.

## From prompt engineering to skill engineering

Skills change the rules of the game. Instead of the question “how do I word this request better”, the question becomes “how do I save this so that I never have to ask it again”.

While prompt engineering focuses on creating the right input for a single conversation, skill engineering focuses on saving workflows permanently, so that they never need to be prompted again.

Skills are natural-language files that program Claude’s behaviour. They require no API, no code (unless you want it) and no technical knowledge. Just Markdown files that scale your knowledge across all future conversations.

Anthropic describes skills as customisable documents for the AI: write them once, and Claude will load them automatically from then on.

And here a separate conversation begins.

What we have just gone through is the very base of Claude Skills. One skill, one task. Already great, already saving hours.

But the real power starts when you have thousands of ready-made skills in your arsenal for every standard task, and you assemble projects out of them like Lego.

I have a separate module on next-generation vibe coding coming out right now. It includes:

-   Google AI Studio — linking the Gemini models with your code, free limits, multimodality out of the box
-   Lovable — a generator of full web applications from a single prompt (literally: you describe an idea and get a working SaaS with a database and authorisation)
-   Claude Code — a terminal agent that writes the code itself, tests it itself and commits to git itself
-   A library of 5000+ ready-made skills for Claude — from scraping marketplaces and generating landing pages to complex multi-agent sales systems

So you do not have to spend three hours writing a SKILL.md from scratch. You take a ready one for your niche, connect it, and it works. And if the standard one does not fit — in 5 minutes you assemble your own through skill-creator (exactly as we have just gone through).

This is the level of vibe coding at which you are no longer sitting there thinking “how do I make a Telegram bot in a week”, but thinking “how do I put together five micro-SaaS in one evening and sell them as a freelancer abroad in dollars”. The module comes with the Creator (see it) and Full (see it) plans.

Okay, back to the finale.

## 📦➕ Extras:

This section contains a template for creating high-quality prompts for Claude Code, plus 2 skills that will be indispensable in building any agents. To install a skill, go to https://github.com/ and create a new repository:

Then open this repo in https://claude.ai/code and write in the chat “Install this skill (link)”.

After that, Claude Code will tell you that it has installed this skill into your repository and will send you the command to activate the skill in your work. All that is left for you is to write “Use the skill (command) to create a bot (description of your bot)”. Do not forget that you can connect third-party services by API to carry out any task. At the link below we have gathered more than ten thousand services for different tasks.

There are APIs for AI, analytics, automation, maps, finance, content generation, working with data and much more. It is convenient when you need to quickly find a ready solution for a project instead of searching for everything by hand.

The Claude Mega-Prompt template and an endless prompt library for Claude AI

Most people ask Claude questions as if they were texting a friend. That is fine for quick questions. But when you need Claude to work like a specialist, you have to talk to it like a system. XML tags are used for that. This template shows you the structure, the logic of each tag, and gives you a ready-to-use framework.

## Why XML tags change everything

Claude was trained to recognise XML tags as structural boundaries. When you wrap your instructions in tags such as <role> or <task>, Claude does not simply read your words. It parses them. It knows where your role definition ends and your task begins. It knows which part is context and which is the actual instruction.

The difference is real. A plain-text request dumps everything into one stream and hopes Claude works out what matters. A request with an XML structure tells Claude exactly what each piece of information is and how to use it.

A plain-text request:

```

You are a business strategist. I want you to analyze my startup idea.
My idea is a mobile app for dog walkers. Give me market risks,
personas, and a recommendation. Be detailed and direct.
```

The same prompt, structured with XML:

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

The XML version gives Claude clear boundaries. It knows that the role is separate from the task, that the business idea is the input and that the response format is the output specification. It is exactly this separation that produces clearer, better-structured answers.

## The 8 tags that make up a mega-prompt

You do not have to use all of these tags every time. Choose the ones that are genuinely needed for your task. Treat this as a menu, not a checklist.

### <role> — who Claude becomes

Tell Claude in what capacity it should act. The more specific the role, the more specialised the result will be.

The weak version: You are a marketing expert.

The strong one: You are a conversion copywriter who specialises in onboarding sequences for B2B SaaS products.

Three things to include: experience, specialisation and context (the industry, the audience or the application).

```

<role>
You are a conversion-focused email copywriter specializing in
SaaS onboarding sequences for B2B products. You prioritize
clarity over cleverness and always tie copy back to user pain points.
</role>
```

### <goal> — what success looks like

This is the overall result. Not the steps, not the format. Only the end goal.

Keep it to 1–2 sentences. If you need more, you probably have several goals and should split them into separate prompts.

```

<goal>
Create a 5-email onboarding sequence that reduces churn during the
first 14 days by addressing the top 3 reasons users abandon the product.
</goal>
```

### <key\_tasks> — the step-by-step instruction

Break the work into numbered steps. This stops Claude from skipping parts or changing the order of your logic. Each step should be one clear action.

```

<key_tasks>
Step 1: Identify the top 3 churn reasons from the provided user feedback.
Step 2: Map each churn reason to a specific email in the sequence.
Step 3: Write subject lines and body copy for all 5 emails.
Step 4: Add a suggested send schedule with timing rationale.
</key_tasks>
```

When to skip this tag: if your task is simple enough to describe in one sentence, you do not need the <key\_tasks> tag. The <goal> tag will handle it.

### <response\_structure> — how Claude should think

This tag controls the tone, the depth and the style of the character. It is about the nature of the answer, not the format (that is <response\_format> below).

```

<response_structure>
- Provide detailed, actionable guidance (not surface-level tips).
- Use a direct, conversational tone. No corporate speak.
- Adopt the perspective of a senior copywriter reviewing a junior's draft.
- Reference real-world SaaS examples where relevant.
</response_structure>
```

### <session\_structure> — how the conversation should flow

Use this tag if you want Claude to hold a multi-turn conversation rather than dumping everything into one answer. It sets the interaction model.

```

<session_structure>
- Approach: Guided problem-solving.
- Start by asking 3 clarifying questions about my product and audience.
- After I answer, present a draft sequence outline for approval.
- Only write the full emails after I approve the outline.
</session_structure>
```

When to skip this tag: if you want everything in a single answer, remove this tag completely.

### <examples> — show Claude how it should be

Few-shot examples are the most powerful steering tool you have. One convincing example beats a whole paragraph of instructions.

Give Claude the input AND the desired output. Label them clearly.

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

### <information\_about\_me> — your context data

Give Claude the specific data about your business, audience, product or situation. This is the raw material Claude works with.

Include only the variables relevant to your goal and tasks. Random background information only adds noise.

```

<information_about_me>
- Product: TaskFlow, a project management SaaS for remote teams (10-50 employees)
- Top churn reasons: 1) Dashboard overwhelm, 2) Incomplete onboarding,
  3) No integration with existing tools
- Brand voice: Friendly, direct, slightly informal. Never corporate.
- Current onboarding: Single welcome email, no follow-up sequence.
</information_about_me>
```

### <response\_format> — the blueprint of the result

Tell Claude exactly what shape the final result should take. Here you specify the format, not the tone.

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

## A quick guide — when to use each tag

## The full template (copy and adjust)

Take it, fill in what you need, delete what you do not. The tag names are flexible. You can rename them to anything that makes sense for your use case (<brand\_info> instead of <information\_about\_me>, <steps> instead of <key\_tasks>, and so on). Claude reads the structure, not the exact tag name.

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

## A complete example — a business idea validator

Here is a complete mega-prompt that you can test right now. It combines the role, the task, the context and a structured response format.

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

Note that the <response\_format> tag uses a numbered list to describe the structure of the output, but does not force Claude to produce the results in XML format. You are structuring the input for Claude, not demanding a rigid output format. Let Claude write naturally within the structure you define.

And now the main treat! We did not go and write out a million prompt templates with a library for you!

In this express course we are giving you 1 ready-made assistant that writes prompts for Claude and Gemini for ABSOLUTELY ANY TASK!

‣

This is 1 of the 350+ ready-made assistants that are available to you on absolutely any subscription!

‣

telegram-mini-app\_skill.md

## 🎁🗺️ P.S. What comes next, if this landed well

## This express course is one brick. Making a working Telegram bot over a weekend is a technique, and you have just taken it for free. But for the bot to actually bring in money, a few more things are needed: selling through the bot, holding the audience with content, building automatic funnels, generating visuals and video, connecting payments through a CRM, scaling to thousands of users without falling over.

## I have all of that packed into the full programme — 6 plans for different levels of depth:

## Basic (link) — earning with ready-made templates, basic and advanced prompting, a library of preconfigured GPT/Gemini assistants, express courses on Perplexity and Grok. A start from zero.

## ‣

## Plus (link) — everything from Basic + the “Photo and Video” block (Midjourney, Veo, Kling, Seedance), professional editing in CapCut/Premiere, a factory of AI influencers for Fanvue. For those who want visuals.

## ‣

## Creator (link) — everything from Plus + the “AI Assistants” block (system instructions, JSON prompting, auto funnels through SendPulse), express courses on Gemini/Claude/AI agents, the “Freelance 2.0” library, the new vibe coding module with 5000+ skills for Claude. For those who want to package AI into money.

## ‣

## Make (link) — a separate module on visual automation without code. 6 ready AI assistants (a 24/7 manager, a call analyst, a Facebook Ads analyst, a content machine and others) + 1000+ ready templates. For integrators and freelancers in Western markets.

## ‣

## N8N (link) — Enterprise level: self-hosting on your own server, RAG agents with vector databases, 500+ ready templates including sales department call monitoring (which we sell from 800k) and a factory of AI bloggers and trend scraping. For those who want to work with large businesses.

## ‣

## Full (link) — everything listed above + AI Soft (local models without censorship). An annual plan for those entering AI seriously and for the long run.

## ‣

## Choose by your own level. If it is unclear — write into the chat without hesitation and we will work it out together.

## Remember the main thing: a Telegram bot is a technique, while vibe coding is a profession. This guide closed the first one. The programme closes the second.
