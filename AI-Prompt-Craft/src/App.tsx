import React, { useState, useEffect } from 'react';
import { Session } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { getSessions, deleteSession, updateSession } from './utils/sessionStorage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  
  // Load sessions on initial render
  useEffect(() => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions);
  }, []);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Handle session creation
  const handleSessionCreated = (session: Session) => {
    setSessions((prevSessions) => [session, ...prevSessions]);
  };
  
  // Handle session selection
  const handleSelectSession = (sessionId: string) => {
    // Mobile: close sidebar when a session is selected
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  // Handle session deletion
  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    setSessions((prevSessions) => prevSessions.filter(session => session.id !== sessionId));
  };

  // Handle favorite toggle
  const handleToggleFavorite = (sessionId: string) => {
    setSessions((prevSessions) => {
      const updatedSessions = prevSessions.map(session => {
        if (session.id === sessionId) {
          const updatedSession = {
            ...session,
            isFavorite: !session.isFavorite
          };
          updateSession(updatedSession);
          return updatedSession;
        }
        return session;
      });
      return updatedSessions;
    });
  };

  // Handle AI model change
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onOpenSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen}
        onModelChange={handleModelChange}
      />
      
      <div className="flex-1 flex">
        <Sidebar
          sessions={sessions}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          onToggleFavorite={handleToggleFavorite}
          isOpen={isSidebarOpen}
        />
        
        <div className={`flex-1 transition-all duration-300 lg:ml-72 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
          <div 
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity lg:hidden ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          
          <main className="pb-12">
            <MainContent 
              onSessionCreated={handleSessionCreated}
              selectedModel={selectedModel}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;