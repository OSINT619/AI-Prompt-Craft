import React from 'react';
import { BrainCircuit, Menu, X } from 'lucide-react';
import Select from './ui/Select';

interface HeaderProps {
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
  onModelChange?: (model: string) => void;
}

const AI_MODELS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'claude-2', label: 'Claude 2' },
  { value: 'llama-2', label: 'Llama 2' },
  { value: 'mistral-7b', label: 'Mistral 7B' },
  { value: 'custom', label: 'Custom Model' }
];

const Header: React.FC<HeaderProps> = ({ onOpenSidebar, isSidebarOpen, onModelChange }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={onOpenSidebar}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-md">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PromptCraft
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Prompt Generator</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-48">
            <Select
              options={AI_MODELS}
              value="gpt-3.5-turbo"
              onChange={(e) => onModelChange?.(e.target.value)}
              className="text-sm"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              History
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Templates
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;