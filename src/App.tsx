import React from 'react';
import { Code2 } from 'lucide-react';
import CodeEditor from './components/Editor';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold">AI Code Editor</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 h-[calc(100vh-4rem)]">
        <CodeEditor />
      </main>
    </div>
  );
}

export default App;