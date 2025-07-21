# My Tools

A command-line text processing toolkit designed for macOS Automator integration. This project provides various AI-powered text processing functions including translation, summarization, and grammar improvement.

## Why This Tool Exists

As a programmer, I've been reflecting on how AI can genuinely help my workflow. While many AI tools focus on code generation or automating development tasks like creating PRs or searching wikis, I believe these miss the point of what we actually need as developers.

In my experience, current AI tools don't significantly help with the core programming work - I prefer maintaining full control over my code and the creative process of writing it. When it comes to tasks like reviewing PRs or searching through documentation wikis, I actually find these activities relaxing and refreshing after intense coding sessions. They provide a necessary mental break and help alleviate the cognitive stress that comes with continuous deep work.

However, I realized there's a different category of work where AI can be genuinely valuable: **document processing**. In my daily work, I frequently need to:

- Read and process large amounts of documentation
- Summarize lengthy content for quick reference  
- Translate content when I prefer reading in Chinese rather than struggling through complex English text
- Improve grammar in quick notes or communications

These tasks are repetitive, don't require creative thinking, and often interrupt my flow when I'm focused on more important work. This is where AI can truly add value - handling the mundane text processing so I can focus on what matters most.

That's why I built this toolkit: to automate the boring text work while keeping full control over the meaningful parts of my job.

## Features

This tool supports the following text processing functions:

- **`translate_zh_en`** - Translate Chinese text to English
- **`translate_en_zh`** - Translate English text to Chinese
- **`summarize_to_en`** - Summarize text in English
- **`summarize_to_zh`** - Summarize text in Chinese
- **`better_grammar`** - Improve grammar and writing quality

## Prerequisites

- **Node.js**: Version 20 or higher is required
- **macOS**: This tool is specifically designed for macOS with Automator integration
- **nvm** (recommended): For managing Node.js versions

### Installing Node.js with nvm

If you don't have nvm installed:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Then install and use Node.js 20:

```bash
nvm install 20
nvm use 20
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-tools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup configuration:**
   ```bash
   npm run setup
   ```

4. **Link the command globally:**
   ```bash
   npm link
   ```

After these steps, the `my-tools` command will be available globally on your system.

## Configuration

During the setup process (`npm run setup`), you'll be prompted to configure necessary settings such as API keys. The configuration is stored in `~/.my-ai-tools/.env`.

## Automator Integration

### Setting up Automator Scripts

1. Open **Automator** on macOS
2. Create a new **Quick Action**
3. Add a **Run Shell Script** action
4. Set the shell to `/bin/zsh`
5. Set **Pass input** to `as arguments`
6. Configure the script content as follows:

```bash
export PATH=/usr/local/bin:/Users/plus/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process translate_en_zh $1
```

**Note:** Update the Node.js path (`/Users/plus/.nvm/versions/node/v20.18.3/bin`) to match your actual Node.js installation path. You can find your Node.js path by running:

```bash
which node
```

6. Save the Quick Action with a descriptive name (e.g., "Translate to Chinese")

### Example Automator Scripts

Here are examples for different functions:

#### Translate English to Chinese
```bash
export PATH=/usr/local/bin:$HOME/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process translate_en_zh $1
```

#### Translate Chinese to English
```bash
export PATH=/usr/local/bin:$HOME/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process translate_zh_en $1
```

#### Summarize to English
```bash
export PATH=/usr/local/bin:$HOME/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process summarize_to_en $1
```

#### Summarize to Chinese
```bash
export PATH=/usr/local/bin:$HOME/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process summarize_to_zh $1
```

#### Improve Grammar
```bash
export PATH=/usr/local/bin:$HOME/.nvm/versions/node/v20.18.3/bin:$PATH
my-tools process better_grammar $1
```

## Usage

### Command Line Usage

```bash
my-tools process <function> <text>
```

**Examples:**

```bash
# Translate English to Chinese
my-tools process translate_en_zh "Hello, world!"

# Translate Chinese to English
my-tools process translate_zh_en "你好，世界！"

# Summarize text in English
my-tools process summarize_to_en "Long text content here..."

# Improve grammar
my-tools process better_grammar "This are a text with bad grammar."
```

### Automator Usage

1. Select any text in any application
2. Right-click and choose your configured Quick Action from the Services menu
3. The processed result will be displayed in a dialog box and automatically copied to your clipboard

## How It Works

1. **Text Processing**: The tool uses AI-powered APIs to process text according to the specified function
2. **Result Display**: Results are shown in a macOS dialog box for immediate review
3. **Clipboard Integration**: Processed text is automatically copied to your clipboard for easy pasting
4. **Automator Integration**: Seamlessly works with macOS Services for system-wide text processing

## Development

### Scripts

- `npm start` - Run the CLI tool
- `npm run dev` - Run with file watching for development
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix code style issues
- `npm run setup` - Initialize configuration

### Project Structure

```
my-tools/
├── bin/cli.js           # CLI entry point
├── index.js             # Main application file
├── src/
│   ├── index.js         # Core processing functions
│   └── utils/
│       ├── gpt-utils.js # AI API utilities
│       └── prompt-utils.js # Prompt generation utilities
├── scripts/
│   └── init.js          # Setup script
└── package.json         # Project configuration
```

## Troubleshooting

### Node.js Path Issues

If Automator scripts fail to find Node.js, verify your Node.js installation path:

```bash
which node
```

Update the `PATH` in your Automator scripts accordingly.

### Permission Issues

If you encounter permission issues, ensure the script has execution permissions:

```bash
chmod +x bin/cli.js
```

### Configuration Issues

If the tool fails to run, try reconfiguring:

```bash
npm run setup
```

## License

MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

**Note**: This tool requires proper API configuration during setup. Make sure to follow the setup process completely before using with Automator.
