import React, { useState } from 'react';
import TextArea from './ui/TextArea';
import Button from './ui/Button';
import { SendHorizontal } from 'lucide-react';

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  initialValue?: string;
  isLoading?: boolean;
}

const GoalInput: React.FC<GoalInputProps> = ({
  onSubmit,
  initialValue = '',
  isLoading = false
}) => {
  const [goal, setGoal] = useState(initialValue);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!goal.trim()) {
      setError('Please enter your goal');
      return;
    }
    
    if (goal.trim().length < 5) {
      setError('Goal is too short. Please be more specific.');
      return;
    }
    
    setError('');
    onSubmit(goal);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextArea
        label="What's your goal?"
        placeholder="e.g., Write a spooky horror story set in an abandoned amusement park"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="min-h-24 transition-all focus:min-h-32"
        error={error}
        helpText="Be as specific as possible for better results"
      />
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          rightIcon={<SendHorizontal size={16} />}
          isLoading={isLoading}
        >
          Generate Prompt
        </Button>
      </div>
    </form>
  );
};

export default GoalInput;