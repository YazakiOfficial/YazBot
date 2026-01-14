# YazBot

**Personal Discord selfbot** written in [Python / JavaScript]

---

## ⚠️ IMPORTANT WARNING – READ THIS FIRST ⚠️

This is a **selfbot** — it automates a **user account**, not a bot account created via the Developer Portal.

→ Selfbots are **explicitly against Discord's Terms of Service** (automation / client modification / API abuse)
→ Using this **can and very likely will** result in permanent account termination
→ Detection has become significantly more aggressive in 2025–2026
→ **I am not responsible** for any bans, data loss, or consequences

Use at your own risk — preferably only on **throwaway accounts**.

This bot exists **purely for version control / personal backup / educational purposes**.
Do **NOT** use this code to harass, spam, raid, mass-DM, token-grab, or break any laws / ToS.

---

# 📦 Installation Guide

## Requirements

You must have:

- **Node.js v18+** → https://nodejs.org
- **Git** → https://git-scm.com

Check if installed:
```bash
node -v
npm -v
git --version
```

📱 Mobile (Android – Termux)
```bash
Step 1: Install Termux

Install from F-Droid (NOT Play Store):
👉 https://f-droid.org/packages/com.termux/

Step 2: Update packages
pkg update && pkg upgrade

Step 3: Install dependencies
pkg install git nodejs nano

Step 4: Clone the repository
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

Step 5: Edit config
nano config.yaml

Save: CTRL + X → Y → Enter

Step 6: Start the bot
./start.termux.sh

or

npm start
```

🐧 Linux Distributions

**Ubuntu / Debian**
```bash
sudo apt update
sudo apt install git nodejs npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
nano config.yaml
./start.sh
```

**Arch Linux**
```bash
sudo pacman -S git nodejs npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
nano config.yaml
./start.sh
```

**Fedora / RHEL / CentOS**
```bash
sudo dnf install git nodejs npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
nano config.yaml
./start.sh
```

**openSUSE**
```bash
sudo zypper install git nodejs20 npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
nano config.yaml
./start.sh
```

🖥️ Windows
Step 1: Install dependencies

Node.js → https://nodejs.org

Git → https://git-scm.com

Restart your PC after installing.

Step 2: Clone the bot

Open Command Prompt:

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

Step 3: Edit config

Open config.yaml with Notepad or VS Code.

Step 4: FIRST TIME SETUP (IMPORTANT)

⚠️ You MUST run start.bat before starting the bot manually.

Double-click:

start.bat


This installs all required dependencies.

Step 5: Start the bot

After first setup, use:

npm start


or

node index.js

🚀 Quick Start Scripts (After Setup)

After running the initial setup scripts above, you can use these simple scripts to start the bot:

**Windows:**
```batch
run.bat
```

**Linux:**
```bash
./run.sh
```

**Termux/Android:**
```bash
./run.termux.sh
```

These scripts simply run `npm start` and assume Node.js and dependencies are already installed.

🔐 Command Access & Permissions
Owner Access

In config.yaml, add your Discord ID:

owners:
  - "YOUR_DISCORD_ID"


Owners can use:

Dev commands

Admin commands

Dangerous commands

Reload / Shutdown / Eval

Admin Roles
adminRoles:
  - "ROLE_ID"


Admins can use:

Moderation commands

Server tools

Settings

Discord Permission Checks

Some commands require Discord permissions:

Action	Required Permission
Ban	Ban Members
Kick	Kick Members
Clear	Manage Messages
Roles	Manage Roles
How to Get Your Discord ID

Enable Developer Mode:

Discord → Settings → Advanced → Developer Mode

Then:

Right-click your user → Copy ID

Right-click a role → Copy ID

Right-click a channel → Copy ID

Command List

Use:

!help


or

/help


(depends on your prefix)

🛠️ Troubleshooting
Missing packages
npm install

Node version too old
node -v


Update if below v18.

Commands not working

Make sure:

You are listed as owner

Prefix is correct

Bot was restarted after config changes

Features Overview

YazBot is organized into modular command categories.

Folder	Purpose / Description
AI	AI-related commands (chat, generation, analysis…)
beta	Experimental / unstable / WIP features
fun	Light-hearted entertainment
general	Utility commands
media	Image/video/GIF tools
misc	Miscellaneous tools
moderation	Moderation helpers (dangerous)
nsfw	Adult-only commands (18+)
server	Server utilities
settings	Configuration & toggles
status	Status / presence tools
troll	Prank commands (use ethically)

