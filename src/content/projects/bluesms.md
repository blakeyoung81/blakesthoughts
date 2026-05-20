---
title: "BlueSMS - AppleScript SMS Orchestrator"
description: "A batch messaging controller for macOS that coordinates bulk SMS/iMessages via native AppleScript-to-Node bridges."
pubDate: "2025-11-18"
repo: "https://github.com/blakeyoung81/bluesms"
tech: ["JavaScript", "Node.js", "AppleScript", "macOS Automation", "API Gateway"]
cover: "/images/projects/blue-sms-hero.png"
featured: false
category: "Utility"
color: "from-blue-500 to-cyan-500"
order: 19
---

# BlueSMS - AppleScript SMS Orchestrator

BlueSMS is a specialized local developer utility built to automate the sending of batch messages directly from a macOS system. By leveraging native macOS automation (AppleScript) to interface with the built-in Messages app, BlueSMS bypasses the need for expensive third-party SMS APIs (like Twilio) for personal and small business notifications.

## The Architecture

Because AppleScript is a scripting language specific to macOS, running it from a modern web dashboard or backend system requires a bridge. BlueSMS implements a local Node.js server that exposes a REST API. When the server receives a message payload, it compiles and executes AppleScript code on the fly to control the system Messages application.

```
+-----------------------------------------------------------+
|                    BlueSMS REST API                       |
|  POST /api/send                                           |
|  Payload: { phone: "+1234567890", message: "Hello!" }     |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                   Node.js Exec Handler                    |
|  - Validates phone number formats                         |
|  - Escapes text payloads to prevent script injections      |
|  - Spawns child process: osascript                        |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                   AppleScript Compiler                    |
|  tell application "Messages"                              |
|     send "Hello!" to buddy "+1234567890"                  |
|  end tell                                                 |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                    macOS Messages App                     |
|  - Routes as iMessage if recipient is an Apple ID         |
|  - Routes as SMS via cellular forward if not              |
+-----------------------------------------------------------+
```

## Key Engineering Challenges Resolved

### 1. Script Escape Hurdles
Since message contents can contain quotation marks, emoji, and special characters, compiling them into raw shell-executed AppleScript strings was prone to syntax crashes and security vulnerabilities. BlueSMS handles character escaping at the controller level, transforming input text into standard AppleScript character code arrays (e.g., `character id 34`) to ensure complete safety and Unicode compatibility.

### 2. Rate Limiting & Queue Management
The macOS Messages app is designed for human speed. Sending 100 messages instantly can crash the system or trigger spam blocks. BlueSMS implements an asynchronous queue. It processes requests one-by-one, introducing randomized intervals (e.g., 2–4 seconds) between messages and listening to system process returns to confirm delivery status before sending the next one.

### 3. Service Verification
The tool checks if the Messages application is active and running. If the application is closed, the Node.js server programmatically launches the process in the background and initializes the session before sending messages.

## Technical Details

- **Backend Bridge**: Node.js with Express, using child processes to execute the macOS command-line tool `osascript`.
- **Message Dispatching**: Custom AppleScript templates that resolve contacts by phone number or email and route messages appropriately.
- **Frontend Dashboard**: A lightweight client page built to manage contact groups, view dispatch history, check delivery logs, and trigger batch templates.
