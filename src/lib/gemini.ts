import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateCode(prompt: string, language: string = 'javascript'): Promise<string> {
  try {
    // Enhance the prompt to specify the target language
    const enhancedPrompt = `Generate ${language} code for the following request. Only provide the code without any explanation or markdown: ${prompt}`;
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let code = response.text();
    
    // Clean up markdown code blocks if present
    code = code.replace(/```[a-z]*\n/g, '').replace(/```$/g, '').trim();
    
    return code;
  } catch (error) {
    console.error('Error generating code:', error);
    return '// Error generating code. Please try again.';
  }
}

export async function executeCode(code: string, language: string, userInput?: string): Promise<string> {
  try {
    // Check for empty or default code
    if (!code || code.trim() === '' || code.trim() === '// Start typing your code here...') {
      return 'Please enter some code before running.';
    }

    // Improved input detection patterns
    const inputPatterns = {
      cpp: ['cin', 'std::cin', 'scanf'],
      python: ['input(', 'raw_input('],
      javascript: ['prompt(', 'readline', 'process.stdin'],
      java: ['Scanner', 'System.console()', 'BufferedReader'],
    };

    // Check if code contains any input patterns for the selected language
    const patterns = inputPatterns[language as keyof typeof inputPatterns] || [];
    const requiresInput = patterns.some(pattern => code.includes(pattern));

    if (requiresInput && !userInput) {
      return 'INPUT_REQUIRED';
    }

    let prompt = `Execute the following ${language} code and return ONLY the output or error message. If there is no output, return "No output". Do not include any explanations or markdown:

${code}

${userInput ? `Use this as input if needed: ${userInput}` : ''}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let output = response.text();
    
    // Clean up markdown code blocks and extra whitespace
    output = output.replace(/```[a-z]*\n/g, '').replace(/```$/g, '').trim();
    
    // If the output looks like it's waiting for input but we didn't detect it earlier
    if (output.toLowerCase().includes('input') && output.includes('...')) {
      return 'INPUT_REQUIRED';
    }

    // Handle empty or unclear output
    if (!output || output.trim() === '') {
      return 'No output';
    }
    
    return output;
  } catch (error) {
    console.error('Error executing code:', error);
    return 'Error executing code. Please try again.';
  }
}