import React, { useState } from 'react';
import { Category, GeneratedPrompt, Session } from '../types';
import { Card, CardBody } from './ui/Card';
import CategorySelector from './CategorySelector';
import GoalInput from './GoalInput';
import PromptDisplay from './PromptDisplay';
import { generatePrompt } from '../utils/promptGenerator';
import { generateSessionId, saveSession, updateSession, getSessionById } from '../utils/sessionStorage';
import { categories } from '../data/categories';

interface MainContentProps {
  onSessionCreated: (session: Session) => void;
  selectedModel: string;
}

const MainContent: React.FC<MainContentProps> = ({ onSessionCreated, selectedModel }) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState(categories[0].subcategories[0].id);
  const [goal, setGoal] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  
  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Auto-select first subcategory
    const category = categories.find(c => c.id === categoryId);
    if (category && category.subcategories.length > 0) {
      setSelectedSubcategory(category.subcategories[0].id);
    }
  };
  
  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };
  
  // Load session
  const loadSession = (sessionId: string) => {
    const session = getSessionById(sessionId);
    if (session) {
      setSelectedCategory(session.selectedCategory);
      setSelectedSubcategory(session.selectedSubcategory);
      setGoal(session.goal);
      setGeneratedPrompt(session.generatedPrompt);
      setCurrentSessionId(session.id);
    }
  };
  
  // Handle goal submission
  const handleGoalSubmit = async (goalText: string) => {
    setIsLoading(true);
    setGoal(goalText);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate prompt
      const prompt = generatePrompt({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        goal: goalText
      });
      
      setGeneratedPrompt(prompt);
      
      // Create new session
      const sessionId = generateSessionId();
      const newSession: Session = {
        id: sessionId,
        goal: goalText,
        selectedCategory,
        selectedSubcategory,
        generatedPrompt: prompt,
        output: '',
        feedback: '',
        timestamp: Date.now(),
        model: selectedModel
      };
      
      // Save session
      saveSession(newSession);
      setCurrentSessionId(sessionId);
      
      // Notify parent component
      onSessionCreated(newSession);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle feedback
  const handleFeedback = (feedback: 'positive' | 'negative' | 'neutral') => {
    if (currentSessionId && generatedPrompt) {
      // Update session with feedback
      const updatedSession: Session = {
        id: currentSessionId,
        goal,
        selectedCategory,
        selectedSubcategory,
        generatedPrompt,
        output: '',
        feedback,
        timestamp: Date.now(),
        model: selectedModel
      };
      
      // Update session in storage
      updateSession(updatedSession);
    }
  };
  
  // Handle prompt regeneration
  const handleRegenerate = async (updatedPrompt: GeneratedPrompt) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate new prompt with updated metrics
      const newPrompt = generatePrompt({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        goal,
        metrics: updatedPrompt.metrics
      });
      
      setGeneratedPrompt(newPrompt);
      
      // Update session if it exists
      if (currentSessionId) {
        const updatedSession: Session = {
          id: currentSessionId,
          goal,
          selectedCategory,
          selectedSubcategory,
          generatedPrompt: newPrompt,
          output: '',
          feedback: '',
          timestamp: Date.now(),
          model: selectedModel
        };
        
        updateSession(updatedSession);
      }
    } catch (error) {
      console.error('Error regenerating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Prompt</h2>
      
      <Card className="mb-8">
        <CardBody>
          <div className="space-y-6">
            <CategorySelector
              categories={categories}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
            />
            
            <div className="border-t border-gray-200 pt-6">
              <GoalInput
                onSubmit={handleGoalSubmit}
                initialValue={goal}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardBody>
      </Card>
      
      {generatedPrompt && (
        <PromptDisplay
          prompt={generatedPrompt}
          onFeedback={handleFeedback}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MainContent;