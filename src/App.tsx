import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ApiKeyModal from './components/ApiKeyModal';
import TeamSelector from './components/TeamSelector';
import ChatInterface from './components/ChatInterface';
import { Team } from './constants/TeamData';
import { GamePhase } from './lib/utils';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
  const [gamePhase, setGamePhase] = useState<GamePhase>('TEAM_SELECTION');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 API 키 확인
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyModal(false);
    }
  }, []);

  const handleApiKeySet = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleResetApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiKeyModal(true);
    setGamePhase('TEAM_SELECTION');
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setGamePhase('MAIN_GAME');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <AnimatePresence mode="wait">
        {showApiKeyModal ? (
          <ApiKeyModal key="api-key-modal" onApiKeySet={handleApiKeySet} />
        ) : gamePhase === 'TEAM_SELECTION' ? (
          <TeamSelector key="team-selector" onSelect={handleTeamSelect} />
        ) : selectedTeam ? (
          <ChatInterface 
            key="chat-interface" 
            apiKey={apiKey} 
            selectedTeam={selectedTeam}
            onResetApiKey={handleResetApiKey}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;

