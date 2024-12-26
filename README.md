# AI card generator mini-project for YU-GI-OH cards
## Built with React+TypeScript and Groq for the API

---

## Requirements

- Node: v19.6.1 or higher
- NPM: v9.4.0 or higher
- BROWSER: Preferrably a chromium-based browser like Chrome or Brave but it should work on any browser.
- GIT: Alternatively you can download and unzip the source code.
- GROQ API KEY: go to https://console.groq.com/keys to get a free API key.

---

## Setup instructions



### Step 1: clone the repository

```bash
git clone https://github.com/VenomRevenge/yugi-ai-card-generator.git
```

And navigate to the root of the project ( where `package.json` is located)

```bash
cd yugi-ai-card-generator
```

### Step 2: install the node packages

```bash
npm install
```

or

```bash
npm i
```

### Step 3: create a `.env.local` file

At the root of the project ( where `package.json` is located ) create a `.env.local` file using this template:

```
VITE_GROQ_API_KEY=your_groq_api_key
VITE_DEFAULT_MODEL=llama3-8b-8192
VITE_GROQ_MODELS=gemma2-9b-it,llama3-groq-70b-8192-tool-use-preview,llama3-groq-8b-8192-tool-use-preview,llama-3.1-70b-versatile,llama-3.1-70b-specdec,llama-3.1-8b-instant,llama-3.2-1b-preview,llama-3.2-3b-preview,llama-3.2-11b-vision-preview,llama-3.2-90b-vision-preview,llama-guard-3-8b,llama3-70b-8192,mixtral-8x7b-32768,whisper-large-v3,whisper-large-v3-turbo
VITE_GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
```

> **Note:**
> see a list of available models at https://console.groq.com/docs/models just look at the currently supported models and change them accordingly, the models I listed here are all that were supported at the time

#### Step 4: Run the app

Use this command to start the app:

```bash
npm run dev
```

---

## Features

- **Dynamic Card Type**:  
  - Choose a card type (Trap, Monster, or Spell) based on the title you provide, and the app dynamically applies styles.

- **Attributes and Levels**:  
  - Displays the card’s level using PNG stars.  
  - Marks the card as Continuous (for Spells/Traps), Quickplay (for Spells), or Counter (for Traps).  

- **Monster Details**:  
  - Includes Monster Type (e.g., Warrior, Spellcaster, Machine).  
  - Displays ATK and DEF stats.

> **Note:**  
> The card has fixed styles so you probably shouldn't be viewing it in mobile or a small screen.