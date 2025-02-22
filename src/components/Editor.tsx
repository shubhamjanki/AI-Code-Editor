import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Wand2, Play, Code2 } from 'lucide-react';
import { generateCode, executeCode } from '../lib/gemini';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'sql', name: 'SQL' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
];

export default function CodeEditor() {
  const [code, setCode] = useState('// Start typing your code here...');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [userInput, setUserInput] = useState('');
  const [showInputDialog, setShowInputDialog] = useState(false);

  const handleGenerateCode = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const generatedCode = await generateCode(prompt, language);
      setCode(generatedCode);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [prompt, language]);

  const handleRunCode = useCallback(async () => {
    setExecuting(true);
    setOutput('Executing code...');
    
    try {
      const result = await executeCode(code, language, userInput);
      if (result === 'INPUT_REQUIRED') {
        setShowInputDialog(true);
        setOutput('Waiting for input...');
      } else {
        setOutput(result);
      }
    } catch (error) {
      setOutput(`Error executing code: ${error}`);
    } finally {
      setExecuting(false);
    }
  }, [code, language, userInput]);

  const handleInputSubmit = useCallback(async () => {
    setShowInputDialog(false);
    setExecuting(true);
    setOutput('Executing code with input...');
    
    try {
      const result = await executeCode(code, language, userInput);
      setOutput(result);
    } catch (error) {
      setOutput(`Error executing code: ${error}`);
    } finally {
      setExecuting(false);
    }
  }, [code, language, userInput]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-4 bg-gray-800">
        <div className="flex items-center gap-2 min-w-[200px]">
          <Code2 className="w-5 h-5 text-gray-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what code you want to generate..."
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerateCode()}
        />
        <button
          onClick={handleGenerateCode}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4" />
          {loading ? 'Generating...' : 'Generate'}
        </button>
        <button
          onClick={handleRunCode}
          disabled={executing}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {executing ? 'Running...' : 'Run'}
        </button>
      </div>
      
      <div className="flex-1 grid grid-rows-2 gap-4">
        <div className="w-full h-full">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
        <div className="w-full h-full bg-gray-800 p-4 rounded-lg overflow-auto">
          <pre className="text-sm text-white font-mono whitespace-pre-wrap">
            {output || 'Output will appear here...'}
          </pre>
          
          {showInputDialog && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your input..."
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
              />
              <button
                onClick={handleInputSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}