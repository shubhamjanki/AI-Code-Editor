# AI Code Editor

A powerful, web-based code editor powered by Google's Gemini AI that allows you to generate, edit, and execute code in multiple programming languages.

![AI Code Editor Screenshot](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000)

## Features

- 🤖 AI-powered code generation using Google's Gemini AI
- 💻 Support for multiple programming languages:
  - JavaScript
  - TypeScript
  - Python
  - Java
  - C#
  - C++
  - Go
  - Rust
  - PHP
  - Ruby
  - Swift
  - Kotlin
  - SQL
  - HTML
  - CSS
- ⚡ Real-time code execution
- 🎨 Beautiful, dark-themed Monaco Editor
- 📝 Interactive input handling for programs
- 🔍 Syntax highlighting
- 🎯 Clean and intuitive user interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-code-editor
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. **Select a Programming Language**: Choose your desired programming language from the dropdown menu.

2. **Generate Code**: 
   - Enter a description of what you want to create in the prompt field
   - Click the "Generate" button or press Enter
   - The AI will generate appropriate code based on your description

3. **Edit Code**:
   - Use the Monaco Editor to modify the generated code
   - Enjoy features like syntax highlighting and auto-completion

4. **Execute Code**:
   - Click the "Run" button to execute your code
   - If your program requires input, you'll be prompted to provide it
   - View the output in the console panel below

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Google Generative AI (Gemini)
- Lucide React Icons

## Project Structure

```
ai-code-editor/
├── src/
│   ├── components/
│   │   └── Editor.tsx
│   ├── lib/
│   │   └── gemini.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for providing the Gemini API
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the powerful code editing capabilities
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [Lucide](https://lucide.dev/) for the elegant icons
- 
