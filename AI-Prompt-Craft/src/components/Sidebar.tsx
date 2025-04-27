import React, { useState } from 'react';
import { Session } from '../types';
import { Clock, Star, Trash2, Filter } from 'lucide-react';
import Button from './ui/Button';

interface SidebarProps {
  sessions: Session[];
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onToggleFavorite: (sessionId: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  onSelectSession,
  onDeleteSession,
  onToggleFavorite,
  isOpen
}) => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get a truncated version of the goal for display
  const truncateGoal = (goal: string, maxLength = 50) => {
    if (goal.length <= maxLength) return goal;
    return goal.substring(0, maxLength) + '...';
  };
  
  // Filter and sort sessions
  const filteredSessions = sessions
    .filter(session => !showFavoritesOnly || session.isFavorite)
    .sort((a, b) => b.timestamp - a.timestamp);
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Filter size={18} />}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={showFavoritesOnly ? 'text-yellow-500' : 'text-gray-400'}
          >
            {showFavoritesOnly ? 'Show All' : 'Favorites'}
          </Button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
            <p className="text-gray-500 text-sm">
              {showFavoritesOnly ? 'No favorite prompts yet' : 'No history yet'}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {showFavoritesOnly ? 'Star prompts to add them to favorites' : 'Your generated prompts will appear here'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredSessions.map((session) => (
              <li key={session.id} className="relative hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => onSelectSession(session.id)}
                  className="w-full text-left px-4 py-3 focus:outline-none focus:bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {truncateGoal(session.goal)}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {formatDate(session.timestamp)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {session.selectedCategory}
                      </span>
                      {session.model && (
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                          {session.model}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                <div className="absolute right-2 top-2 flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(session.id);
                    }}
                    className={`p-1.5 rounded-full hover:bg-gray-100 ${
                      session.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    aria-label={session.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star size={16} fill={session.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                    aria-label="Delete session"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;