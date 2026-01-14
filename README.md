# 🚀 YazBot

> **Personal Discord selfbot** written in JavaScript

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ⚠️ **CRITICAL WARNING - READ BEFORE USING**

### **This is a SELFBOT**

This bot automates a **user account**, not a bot account from the Developer Portal.

### **LEGAL & SAFETY WARNINGS**
- ❌ **Selfbots violate Discord's Terms of Service**
- ❌ **High risk of permanent account termination**
- ❌ **Advanced detection systems are active (2025-2026)**
- ❌ **I am NOT responsible for bans, data loss, or consequences**

**USE AT YOUR OWN RISK** - Only on throwaway accounts. This code is for educational purposes only.

---

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
  - [📱 Mobile (Termux)](#-mobile-termux)
  - [🐧 Linux Distributions](#-linux-distributions)
  - [🖥️ Windows](#️-windows)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Commands & Permissions](#-commands--permissions)
- [Troubleshooting](#-troubleshooting)
- [Features Overview](#-features-overview)
- [Contributing](#-contributing)
- [License](#-license)
- [Disclaimer](#-disclaimer)

---

## ✨ Features

- 🤖 **AI Integration** - Chat with AI models
- 🎮 **Fun Commands** - Entertainment and games
- 🛠️ **Utility Tools** - General purpose helpers
- 📷 **Media Processing** - Image/video manipulation
- ⚙️ **Server Management** - Admin tools
- 🎭 **Custom Status** - Rich presence control
- 🎯 **Moderation** - Server moderation helpers
- 🔒 **Security Features** - Owner-only controls

---

## 📋 Requirements

### Minimum System Requirements
- **Node.js v18.0+** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **4GB RAM** (recommended)
- **Stable internet connection**

### Verify Installation
```bash
node -v      # Should show v18.0 or higher
npm -v       # Should show version number
git --version # Should show version info
```

---

## 📦 Installation

### 📱 Mobile (Termux)

**Step 1: Install Termux**
```bash
# Install from F-Droid (NOT Google Play Store)
# Download: https://f-droid.org/packages/com.termux/
```

**Step 2: Update & Install Dependencies**
```bash
pkg update && pkg upgrade -y
pkg install git nodejs nano -y
```

**Step 3: Clone Repository**
```bash
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
```

**Step 4: First-Time Setup**
```bash
./start.termux.sh
```

**Step 5: Edit Configuration**
```bash
nano config.yaml
# Add your Discord token and settings
# Save: CTRL + X → Y → Enter
```

### 🐧 Linux Distributions

#### Ubuntu / Debian
```bash
sudo apt update
sudo apt install git nodejs npm nano -y

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
./start.sh
nano config.yaml
```

#### Arch Linux
```bash
sudo pacman -S git nodejs npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
./start.sh
nano config.yaml
```

#### Fedora / RHEL / CentOS
```bash
sudo dnf install git nodejs npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
./start.sh
nano config.yaml
```

#### openSUSE
```bash
sudo zypper install git nodejs20 npm nano

git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
./start.sh
nano config.yaml
```

### 🖥️ Windows

**Step 1: Install Dependencies**
- Download Node.js v18+: https://nodejs.org/
- Download Git: https://git-scm.com/
- **Restart your PC** after installation

**Step 2: Clone Repository**
```batch
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
```

**Step 3: First-Time Setup**
```batch
# Double-click start.bat or run:
start.bat
```

**Step 4: Edit Configuration**
```batch
# Open config.yaml with Notepad or VS Code
# Add your Discord token and settings
```

---

## ⚙️ Configuration

After installation, edit `config.yaml`:

```yaml
# Your Discord user token (REQUIRED)
token: "YOUR_DISCORD_TOKEN_HERE"

# Bot prefix (default: !)
prefix: "!"

# Owner IDs (your Discord user ID)
owners:
  - "123456789012345678"

# Admin role IDs
adminRoles:
  - "123456789012345678"

# Other settings...
```

### 🔑 Getting Your Discord Token
1. Press `CTRL + SHIFT + I` in Discord (Desktop)
2. Go to **Application** tab
3. Expand **Local Storage** → `https://discord.com`
4. Find `token` under Key/Value pairs
5. Copy the value (without quotes)

### 🆔 Getting Discord IDs
1. Enable Developer Mode: User Settings → Advanced → Developer Mode
2. Right-click users/roles/channels → Copy ID

---

## 🚀 Usage

### Starting the Bot

**After initial setup, use these quick commands:**

| Platform | Command |
|----------|---------|
| Windows | `run.bat` |
| Linux | `./run.sh` |
| Termux | `./run.termux.sh` |

**Or manually:**
```bash
npm start
```

### Basic Commands
```bash
!help          # Show available commands
!ping          # Check bot latency
!status        # Show bot status
```

---

## 🔐 Commands & Permissions

### 👑 Owner Commands
Owners have full access to all features:
- **Dev Commands**: `eval`, `reload`, `shutdown`
- **Admin Commands**: Server management, dangerous operations
- **All Features**: Unlimited access

### 👮 Admin Commands
Users with admin roles can use:
- **Moderation**: Ban, kick, mute, clear messages
- **Server Tools**: Role management, channel tools
- **Settings**: Configure bot settings

### 👥 Regular Commands
Available to all users (may require permissions):
- **General**: Utility commands
- **Fun**: Entertainment features
- **Media**: Image/video processing
- **Status**: Custom presence

### 📋 Permission Requirements

| Command Type | Required Discord Permission |
|-------------|----------------------------|
| Ban Users | Ban Members |
| Kick Users | Kick Members |
| Clear Messages | Manage Messages |
| Manage Roles | Manage Roles |
| Manage Channels | Manage Channels |

---

## 🛠️ Troubleshooting

### Common Issues

**❌ "npm install" fails**
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

**❌ Node.js version too old**
```bash
node -v  # Check version
# Update Node.js to v18+ from nodejs.org
```

**❌ Commands not working**
- ✅ Verify you're listed as owner in config.yaml
- ✅ Check command prefix is correct
- ✅ Restart bot after config changes
- ✅ Check console for error messages

**❌ "Token invalid" error**
- ✅ Get fresh token (tokens expire)
- ✅ Don't share your token with anyone
- ✅ Use incognito mode when getting token

**❌ Permission errors**
- ✅ Bot needs appropriate Discord permissions
- ✅ Check role hierarchy
- ✅ Verify admin roles in config

### Getting Help
- Check console output for detailed error messages
- Verify all dependencies are installed
- Ensure config.yaml is properly formatted
- Test with basic commands first

---

## 📁 Features Overview

YazBot uses a modular command system organized by categories:

| Category | Description | Commands |
|----------|-------------|----------|
| **🤖 AI** | AI chat and generation | `chat`, `imagine`, `analyze` |
| **🎮 Fun** | Entertainment & games | `meme`, `joke`, `game` |
| **🛠️ General** | Utility tools | `ping`, `info`, `calc` |
| **📷 Media** | Image/video processing | `resize`, `convert`, `filter` |
| **🔧 Misc** | Miscellaneous tools | `remind`, `poll`, `weather` |
| **⚡ Moderation** | Server moderation | `ban`, `kick`, `mute` |
| **🔞 NSFW** | Adult content (18+) | `nsfw` commands |
| **🏠 Server** | Server utilities | `role`, `channel`, `emoji` |
| **⚙️ Settings** | Configuration | `prefix`, `toggle`, `config` |
| **🎭 Status** | Rich presence | `status`, `activity`, `playing` |
| **😈 Troll** | Prank commands | `troll` commands |
| **🧪 Beta** | Experimental features | `beta` commands |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Commit** changes: `git commit -m "Add feature"`
4. **Push** to branch: `git push origin feature-name`
5. **Submit** a Pull Request

### Development Setup
```bash
git clone https://github.com/YazakiOfficial/YazBot.git
cd YazBot
npm install
cp config.example.yaml config.yaml
# Edit config.yaml with your settings
npm run dev  # Development mode
```

### Guidelines
- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Respect Discord's Terms of Service

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Final Disclaimer

**By using YazBot, you acknowledge and accept:**

1. **Selfbots violate Discord's Terms of Service**
2. **High risk of account suspension or termination**
3. **No warranty or support provided**
4. **Use at your own risk and responsibility**
5. **Developer is not liable for any consequences**

**Remember:** This project exists for educational purposes only. Use responsibly and ethically.

---

<div align="center">

**Made with ❤️ for the Discord community**

[⭐ Star this repo](https://github.com/YazakiOfficial/YazBot) • [🐛 Report issues](https://github.com/YazakiOfficial/YazBot/issues) • [💬 Join discussions](https://github.com/YazakiOfficial/YazBot/discussions)

</div>