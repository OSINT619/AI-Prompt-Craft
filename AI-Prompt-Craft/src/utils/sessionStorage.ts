import { Session } from "../types";

// Local storage key
const SESSIONS_KEY = 'prompt_assistant_sessions';

// Get all saved sessions
export const getSessions = (): Session[] => {
  try {
    const sessionsString = localStorage.getItem(SESSIONS_KEY);
    if (!sessionsString) return [];
    return JSON.parse(sessionsString);
  } catch (error) {
    console.error('Error retrieving sessions:', error);
    return [];
  }
};

// Save a new session
export const saveSession = (session: Session): void => {
  try {
    const sessions = getSessions();
    sessions.push(session);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

// Update an existing session
export const updateSession = (updatedSession: Session): void => {
  try {
    const sessions = getSessions();
    const index = sessions.findIndex(session => session.id === updatedSession.id);
    
    if (index !== -1) {
      sessions[index] = updatedSession;
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    }
  } catch (error) {
    console.error('Error updating session:', error);
  }
};

// Delete a session
export const deleteSession = (sessionId: string): void => {
  try {
    const sessions = getSessions();
    const updatedSessions = sessions.filter(session => session.id !== sessionId);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

// Get a specific session by ID
export const getSessionById = (sessionId: string): Session | null => {
  try {
    const sessions = getSessions();
    return sessions.find(session => session.id === sessionId) || null;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};

// Generate a unique session ID
export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};