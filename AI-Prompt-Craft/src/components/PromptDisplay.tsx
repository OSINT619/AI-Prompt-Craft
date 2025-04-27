import React, { useState } from 'react';
import { GeneratedPrompt } from '../types';
import { Card, CardBody, CardFooter, CardHeader } from './ui/Card';
import MetricsList from './MetricsList';
import Button from './ui/Button';
import TextArea from './ui/TextArea';
import { Copy, CheckCircle2, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

interface PromptDisplayProps {
  prompt: GeneratedPrompt;
  onFeedback: (feedback: 'positive' | 'negative' | 'neutral') => void;
  onRegenerate?: (updatedPrompt: GeneratedPrompt) => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ 
  prompt, 
  onFeedback,
  onRegenerate 
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedPrompt.text);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleMetricChange = (updatedMetric: any) => {
    setEditedPrompt(prev => ({
      ...prev,
      metrics: prev.metrics.map(metric => 
        metric.id === updatedMetric.id ? updatedMetric : metric
      )
    }));
  };

  const handlePromptTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPrompt(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(editedPrompt);
    }
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditedPrompt(prompt);
    setIsEditing(true);
  };
  
  return (
    <Card className="mt-6 transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-medium text-gray-800">Generated Prompt</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            onClick={copyToClipboard}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RefreshCw size={16} />}
            onClick={isEditing ? () => setIsEditing(false) : startEditing}
          >
            {isEditing ? 'Cancel Edit' : 'Edit & Regenerate'}
          </Button>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-4">
          {isEditing ? (
            <TextArea
              value={editedPrompt.text}
              onChange={handlePromptTextChange}
              className="min-h-[120px] font-mono text-sm"
              placeholder="Edit your prompt here..."
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-64">
              <p className="whitespace-pre-wrap text-gray-700 font-mono text-sm">
                {editedPrompt.text}
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Metrics</h4>
              {isEditing && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleRegenerate}
                  leftIcon={<RefreshCw size={16} />}
                >
                  Regenerate
                </Button>
              )}
            </div>
            <MetricsList 
              metrics={editedPrompt.metrics} 
              onMetricChange={handleMetricChange}
              isEditable={isEditing}
            />
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Is this prompt helpful?</p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ThumbsUp size={16} />}
            onClick={() => onFeedback('positive')}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ThumbsDown size={16} />}
            onClick={() => onFeedback('negative')}
          >
            No
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptDisplay;