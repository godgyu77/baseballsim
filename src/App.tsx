import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ApiKeyModal from './components/ApiKeyModal';
import StartScreen from './components/StartScreen';
import DifficultyModal from './components/DifficultyModal';
import TeamSelector from './components/TeamSelector';
import ChatInterface from './components/ChatInterface';
import { Team } from './constants/TeamData';
import { GamePhase } from './lib/utils';
import { Difficulty } from './constants/GameConfig';

const SAVE_KEY = 'baseball_game_save';

type ScreenView = 'start' | 'difficulty_select' | 'team_select' | 'game';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
  const [screenView, setScreenView] = useState<ScreenView>('start');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [shouldLoadGame, setShouldLoadGame] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

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
    setDifficulty(null);
  };

  const handleTeamSelect = (team: Team | 'expansion') => {
    if (team === 'expansion') {
      // 신생 구단 선택 시 특별 처리
      // 임시로 expansion 팀 객체 생성 (나중에 사용자가 이름을 정할 수 있음)
      const expansionTeam: Team = {
        id: 'expansion',
        name: '신생 구단',
        fullName: '신생 구단 (이름 미정)',
        color: '#8B5CF6',
        secondaryColor: '#EC4899',
        icon: '⭐',
      };
      setSelectedTeam(expansionTeam);
      setScreenView('game');
    } else {
      setSelectedTeam(team);
      setScreenView('game');
    }
  };

  const handleLoadGame = () => {
    // 저장된 데이터에서 팀 정보 및 난이도 복원
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.selectedTeam) {
          // 팀 정보 복원
          setSelectedTeam(parsed.selectedTeam);
          // 난이도 복원 (저장된 데이터에 있으면 사용, 없으면 기본값 NORMAL)
          if (parsed.difficulty) {
            // 기존 HARD는 HELL로 매핑 (호환성)
            if (parsed.difficulty === 'HARD') {
              setDifficulty('HELL');
            } else {
              setDifficulty(parsed.difficulty);
            }
          } else {
            setDifficulty('NORMAL'); // 기본값을 노말 모드로 변경
          }
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
    setDifficulty(null);
    setScreenView('difficulty_select');
  };

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScreenView('team_select');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-0 sm:px-2 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showApiKeyModal ? (
          <ApiKeyModal key="api-key-modal" onApiKeySet={handleApiKeySet} />
        ) : screenView === 'start' ? (
          <StartScreen
            key="start-screen"
            onLoadGame={handleLoadGame}
            onStartNew={handleStartNewGame}
          />
        ) : screenView === 'difficulty_select' ? (
          <DifficultyModal
            key="difficulty-modal"
            isOpen={true}
            onSelect={handleDifficultySelect}
          />
        ) : screenView === 'team_select' ? (
          <TeamSelector key="team-selector" onSelect={handleTeamSelect} />
        ) : screenView === 'game' && selectedTeam && difficulty ? (
          <ChatInterface 
            key="chat-interface" 
            apiKey={apiKey} 
            selectedTeam={selectedTeam}
            difficulty={difficulty}
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

