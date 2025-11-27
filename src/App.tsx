import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ApiKeyModal from './components/ApiKeyModal';
import StartScreen from './components/StartScreen';
import TeamSelector from './components/TeamSelector';
import ChatInterface from './components/ChatInterface';
import { Team } from './constants/TeamData';
import { GamePhase } from './lib/utils';

const SAVE_KEY = 'baseball_game_save';

type ScreenView = 'start' | 'team_select' | 'game';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
  const [screenView, setScreenView] = useState<ScreenView>('start');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [shouldLoadGame, setShouldLoadGame] = useState(false);

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
    setScreenView('start');
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setScreenView('game');
  };

  const handleLoadGame = () => {
    // 저장된 데이터에서 팀 정보 복원
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.selectedTeam) {
          // 팀 정보 복원
          setSelectedTeam(parsed.selectedTeam);
          setShouldLoadGame(true);
          setScreenView('game');
          return;
        }
      } catch (e) {
        console.error('불러오기 오류:', e);
      }
    }
    
    // 팀 정보가 없으면 기본 흐름
    setShouldLoadGame(true);
    setScreenView('game');
  };

  const handleStartNewGame = () => {
    // 저장된 게임 데이터 삭제
    localStorage.removeItem(SAVE_KEY);
    setShouldLoadGame(false);
    setSelectedTeam(null);
    setScreenView('team_select');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <AnimatePresence mode="wait">
        {showApiKeyModal ? (
          <ApiKeyModal key="api-key-modal" onApiKeySet={handleApiKeySet} />
        ) : screenView === 'start' ? (
          <StartScreen
            key="start-screen"
            onLoadGame={handleLoadGame}
            onStartNew={handleStartNewGame}
          />
        ) : screenView === 'team_select' ? (
          <TeamSelector key="team-selector" onSelect={handleTeamSelect} />
        ) : screenView === 'game' && selectedTeam ? (
          <ChatInterface 
            key="chat-interface" 
            apiKey={apiKey} 
            selectedTeam={selectedTeam}
            onResetApiKey={handleResetApiKey}
            shouldLoadGame={shouldLoadGame}
            onGameLoaded={() => setShouldLoadGame(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;

