# 🚀 YazBot

> **Personal Discord selfbot** written in JavaScript

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/YazakiOfficial/YazBot?style=social)](https://github.com/YazakiOfficial/YazBot)

---

## ⚠️ **CRITICAL WARNING - READ BEFORE USING**

### **This is a SELFBOT**

This bot automates a **user account**, not a bot account from Discord's Developer Portal.

### **LEGAL & SAFETY WARNINGS**

| Risk | Impact |
|------|--------|
| ❌ **Violates Discord ToS** | Selfbots are explicitly prohibited |
| ❌ **Account Termination** | Permanent ban - no appeals |
| ❌ **Advanced Detection** | Systems active in 2025-2026 |
| ❌ **Zero Liability** | Author is NOT responsible for consequences |

**USE AT YOUR OWN RISK** - Only on throwaway accounts. This code is for **educational purposes only**.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📋 Requirements](#-requirements)
- [📦 Installation](#-installation)
  - [📱 Android (Termux)](#-android-termux)
  - [🐧 Linux](#-linux-distributions)
  - [🖥️ Windows](#️-windows)
- [⚙️ Configuration](#️-configuration)
- [🚀 Usage](#-usage)
- [📁 Command Categories](#-command-categories)
- [🛠️ Troubleshooting](#️-troubleshooting)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 Core Features
- ✅ AI Integration & Chat
- ✅ Custom Commands System
- ✅ Modular Architecture
- ✅ Rich Presence Control
- ✅ Auto-reload Commands

</td>
<td width="50%">

### 🛠️ Functionality
- ✅ Media Processing
- ✅ Server Management
- ✅ Moderation Tools
- ✅ Fun & Games
- ✅ Status Customization

</td>
</tr>
</table>

---

## 📋 Requirements

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Node.js** | v18.0+ | v20.0+ |
| **Internet** | Stable connection | High-speed |

### Required Software

```bash
# Verify installations:
node -v       # Should show v18.0.0 or higher
npm -v        # Should show version number
git --version # Should show git version
```

**Download Links:**
- 📥 [Node.js](https://nodejs.org/) - Choose LTS version
- 📥 [Git](https://git-scm.com/) - Version control system

---

## 📦 Installation

### 📱 Android (Termux)

> ⚠️ **Important:** Install Termux from [F-Droid](https://f-droid.org/packages/com.termux/), **NOT** Google Play Store

**Step 1: Update Termux**
```bash
pkg update && pkg upgrade -y
```

**Step 2: Install Dependencies**
```bash
pkg install git nodejs nano -y
```

**Step 3: Clone Repository**
```bash
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
```

**Step 4: Initial Setup**
```bash
chmod +x *.sh
./start.termux.sh
```

**Step 5: Configure Bot**
```bash
nano config.yaml
# Press CTRL + X, then Y, then ENTER to save
```

**Step 6: Start Bot**
```bash
./run.termux.sh
# Or: npm start
```

---

### 🐧 Linux Distributions

<details>
<summary><b>Ubuntu / Debian</b></summary>

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install git nodejs npm nano -y

# Clone repository
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

# Make scripts executable
chmod +x *.sh

# Run initial setup
./start.sh

# Edit configuration
nano config.yaml

# Start bot
./run.sh
```
</details>

<details>
<summary><b>Arch Linux</b></summary>

```bash
# Update system
sudo pacman -Syu

# Install dependencies
sudo pacman -S git nodejs npm nano

# Clone repository
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

# Make scripts executable
chmod +x *.sh

# Run initial setup
./start.sh

# Edit configuration
nano config.yaml

# Start bot
./run.sh
```
</details>

<details>
<summary><b>Fedora / RHEL / CentOS</b></summary>

```bash
# Update system
sudo dnf update -y

# Install dependencies
sudo dnf install git nodejs npm nano -y

# Clone repository
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

# Make scripts executable
chmod +x *.sh

# Run initial setup
./start.sh

# Edit configuration
nano config.yaml

# Start bot
./run.sh
```
</details>

<details>
<summary><b>openSUSE</b></summary>

```bash
# Update system
sudo zypper refresh && sudo zypper update -y

# Install dependencies
sudo zypper install git nodejs20 npm nano -y

# Clone repository
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot

# Make scripts executable
chmod +x *.sh

# Run initial setup
./start.sh

# Edit configuration
nano config.yaml

# Start bot
./run.sh
```
</details>

---

### 🖥️ Windows

**Step 1: Install Prerequisites**

1. Download and install [Node.js](https://nodejs.org/) (LTS version)
2. Download and install [Git for Windows](https://git-scm.com/)
3. **Restart your computer** after installation

**Step 2: Clone Repository**

Open **Command Prompt** or **PowerShell**:

```cmd
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
```

**Step 3: Initial Setup**

⚠️ **IMPORTANT:** Run setup script first

```cmd
start.bat
```

This automatically installs all dependencies.

**Step 4: Configure Bot**

Edit `config.yaml` with **Notepad**, **VS Code**, or any text editor.

**Step 5: Start Bot**

After initial setup:

```cmd
run.bat
```

Or manually:
```cmd
npm start
```

---

## ⚙️ Configuration

### 🔑 Getting Your Discord Token

> ⚠️ **Warning:** Never share your token with anyone!

<details>
<summary><b>📱 Method 1: Mobile (BlueCord App)</b></summary>

**What is BlueCord?**
BlueCord is a modified Discord client that allows easier token extraction on mobile devices.

**Steps:**
1. **Download BlueCord**
   - Search for "BlueCord Discord" on your mobile browser
   - Download and install the APK (Android) or IPA (iOS)
   - ⚠️ Only download from trusted sources

2. **Login to BlueCord**
   - Open BlueCord app
   - Login with your Discord account credentials
   - Complete any 2FA if enabled

3. **Extract Token**
   - Go to **Settings** in BlueCord
   - Look for **"Bluecord Mods"** and click it
   - Then go to **"Account Switcher"**
   - Find **"Copy Current Token"**
   - Copy the token to your clipboard

4. **Use Token**
   - Paste the token into your `config.yaml` file
   - Replace `"YOUR_DISCORD_TOKEN_HERE"` with your actual token
</details>

<details>
<summary><b>💻 Method 2: Desktop/Browser Console</b></summary>

**Using Discord Desktop App or Web Browser:**

1. **Open Discord**
   - Launch Discord desktop app or go to https://discord.com/app
   - Login to your account

2. **Open Developer Console**
   - Press `Ctrl + Shift + I` (Windows/Linux) or `Cmd + Option + I` (Mac)
   - Click on the **"Console"** tab

3. **Run Token Extraction Code**
   - Copy and paste this code into the console:

```javascript
window.webpackChunkdiscord_app.push([
  [Symbol()],
  {},
  (req) => {
    if (!req.c) return;
    for (let m of Object.values(req.c)) {
      try {
        if (!m.exports || m.exports === window) continue;
        if (m.exports?.getToken) return copy(m.exports.getToken());
        for (let ex in m.exports) {
          if (
            m.exports?.[ex]?.getToken &&
            m.exports[ex][Symbol.toStringTag] !== "IntlMessagesProxy"
          )
            return copy(m.exports[ex].getToken());
        }
      } catch {}
    }
  },
]);
window.webpackChunkdiscord_app.pop();
console.log("%cWorked!", "font-size: 50px");
console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px");
```

4. **Press Enter**
   - The code will run and copy your token to clipboard
   - You should see "Worked!" message in console

5. **Use Token**
   - Paste the token into your `config.yaml` file
</details>

<details>
<summary><b>🔍 Method 3: Network Tab (Advanced)</b></summary>

1. **Open Discord in Browser**
   - Go to https://discord.com/app
   - Login to your account

2. **Open Developer Tools**
   - Press `F12`
   - Click on the **"Network"** tab

3. **Filter Requests**
   - In the filter box, type: `api/v`
   - This will show only Discord API requests

4. **Send a Message**
   - Send any message in any channel
   - This will trigger API requests

5. **Find Authorization Header**
   - Click on any API request in the Network tab
   - Look for **"Request Headers"**
   - Find the **"authorization"** header
   - Copy the value (this is your token)
</details>

<details>
<summary><b>📲 Method 4: Mobile Browser</b></summary>

1. **Open Mobile Browser**
   - Use Chrome, Firefox, or Safari on your phone
   - Go to https://discord.com/app

2. **Enable Desktop Mode**
   - In browser settings, enable "Desktop Site" or "Request Desktop Site"
   - This allows access to developer tools

3. **Open Developer Console**
   - Look for browser menu → "Developer Tools" or "Inspect"
   - Navigate to Console tab

4. **Run Token Code**
   - Paste the JavaScript code from Method 2
   - Copy the extracted token
</details>

---

## 🚀 Usage

### Starting the Bot

| Platform | Quick Start | Manual Start |
|----------|------------|--------------|
| **Windows** | `run.bat` | `npm start` |
| **Linux** | `./run.sh` | `npm start` |
| **Termux** | `./run.termux.sh` | `npm start` |

### Basic Commands

```bash
# View all commands
,help

# Get help for specific command
,help <command>

# Check bot status
,ping

# View bot info
,info
```

---

### Category Details

| Category | Description |
|----------|-------------|
| **🤖 AI** | AI-powered features |
| **🎮 Fun** | Entertainment & games |
| **🛠️ General** | Everyday utilities |
| **📷 Media** | Image/video tools |
| **🔧 Misc** | Miscellaneous helpers |
| **⚡ Moderation** | Server moderation |
| **🔞 NSFW** | Adult content (18+) |
| **🏠 Server** | Server management |
| **⚙️ Settings** | Bot configuration |
| **🎭 Status** | Rich presence control |
| **😈 Troll** | Prank commands |
| **🧪 Beta** | Experimental features |

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

<details>
<summary><b>❌ "npm install" fails</b></summary>

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**On Windows:**
```cmd
del /f /s /q node_modules package-lock.json
npm cache clean --force
npm install
```
</details>

<details>
<summary><b>❌ Node.js version too old</b></summary>

```bash
# Check current version
node -v

# If below v18, update Node.js:
# Download from https://nodejs.org/

# Or use nvm (Node Version Manager):
nvm install 20
nvm use 20
```
</details>

<details>
<summary><b>❌ Commands not responding</b></summary>

**Checklist:**
- ✅ Verify you're listed in `owners` array in config.yaml
- ✅ Check command prefix matches your config
- ✅ Restart bot after any config changes
- ✅ Check console for error messages
- ✅ Ensure Discord token is valid
- ✅ Verify you have required permissions
</details>

<details>
<summary><b>❌ "Invalid token" error</b></summary>

**Solutions:**
1. Get a fresh token (tokens can expire)
2. Ensure no extra spaces or quotes in config.yaml
3. Use incognito/private mode when getting token
4. Check if your account is banned/disabled

**⚠️ Never share your token with anyone!**
</details>

<details>
<summary><b>❌ Permission denied errors</b></summary>

**On Linux/Termux:**
```bash
# Make scripts executable
chmod +x *.sh

# Fix ownership
chown -R $USER:$USER .
```

**On Windows:**
- Run Command Prompt as Administrator
- Check antivirus isn't blocking the bot
</details>

<details>
<summary><b>❌ Port already in use</b></summary>

```bash
# Find process using port
lsof -i :PORT_NUMBER

# Kill the process
kill -9 PID

# Or change port in config.yaml
```
</details>

<details>
<summary><b>❌ Module not found errors</b></summary>

```bash
# Reinstall dependencies
npm install

# Install specific missing module
npm install <module-name>

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```
</details>

---

</div>
