import React from 'react';

interface CodeHighlighterProps {
  code: string;
  language?: string;
}

export function CodeHighlighter({ code, language = 'javascript' }: CodeHighlighterProps) {
  // Simple syntax highlighting logic using regex for common tokens
  const highlight = (code: string) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Keywords
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'interface', 'class', 'extends', 'async', 'await', 'try', 'catch'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    highlighted = highlighted.replace(keywordRegex, '<span class="text-pink-400">$1</span>');

    // Strings
    highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="text-green-300">$1$2$1</span>');

    // Comments
    highlighted = highlighted.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>');

    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-300">$1</span>');

    // Functions calls
    highlighted = highlighted.replace(/\b(\w+)(?=\()/g, '<span class="text-yellow-200">$1</span>');

    // Types
    highlighted = highlighted.replace(/\b(string|number|boolean|any|void|React\.FC|BlogPost|Comment)\b/g, '<span class="text-blue-300">$1</span>');

    return highlighted;
  };

  return (
    <div className="relative group my-8">
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{language}</span>
        </div>
        <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-white/10">
          <code dangerouslySetInnerHTML={{ __html: highlight(code.trim()) }} />
        </pre>
      </div>
    </div>
  );
}