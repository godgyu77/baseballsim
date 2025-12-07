import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ApiKeyModal from './components/ApiKeyModal';
import StartScreen from './components/StartScreen';
import DifficultyModal from './components/DifficultyModal';
import TeamSelector from './components/TeamSelector';
import ExpansionTeamForm, { OwnerType } from './components/ExpansionTeamForm';
import ChatInterface from './components/ChatInterface';
import { ToastProvider } from './context/ToastContext';
import { Team } from './constants/TeamData';
import { Difficulty } from './constants/GameConfig';
import { FileStorageStrategy } from './services/FileStorageStrategy';
import { GameSaveData } from './services/StorageService';
import LoadGameModal from './components/LoadGameModal';
import { SafeStorage } from './lib/safeStorage';

const SAVE_KEY = 'baseball_game_save';

type ScreenView = 'start' | 'difficulty_select' | 'team_select' | 'expansion_form' | 'game';

// [NEW] 내부 App 컴포넌트
function AppContent() {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
  const [screenView, setScreenView] = useState<ScreenView>('start');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [shouldLoadGame, setShouldLoadGame] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [expansionTeamData, setExpansionTeamData] = useState<{ city: string; teamName: string; ownerType: OwnerType } | null>(null);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  useEffect(() => {
    // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
    const savedApiKey = SafeStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyModal(false);
    }
  }, []);

  const handleApiKeySet = (key: string) => {
    // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
    SafeStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleResetApiKey = () => {
    // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
    SafeStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiKeyModal(true);
    setScreenView('start');
    setSelectedTeam(null);
    setDifficulty(null);
  };

  const handleTeamSelect = (team: Team | 'expansion') => {
    if (team === 'expansion') {
      // 신생 구단 선택 시 정보 입력 화면으로 이동
      setScreenView('expansion_form');
    } else {
      // [FIX] 난이도가 선택되었는지 확인 후 게임 화면으로 이동
      // 상태 업데이트가 비동기이므로, 난이도가 없으면 팀 선택 화면 유지
      if (!difficulty) {
        console.warn('[App] 난이도가 선택되지 않았습니다. 난이도를 먼저 선택해주세요.');
        // 난이도 선택 화면으로 돌아가기
        setScreenView('difficulty_select');
        return;
      }
      
      setSelectedTeam(team);
      setScreenView('game');
    }
  };

  const handleExpansionTeamComplete = (data: { city: string; teamName: string; ownerType: OwnerType }) => {
    // [FIX] 난이도가 선택되었는지 확인 후 게임 화면으로 이동
    if (!difficulty) {
      console.warn('[App] 난이도가 선택되지 않았습니다. 난이도를 먼저 선택해주세요.');
      // 난이도 선택 화면으로 돌아가기
      setScreenView('difficulty_select');
      return;
    }
    
    setExpansionTeamData(data);
    // 신생 구단 정보를 바탕으로 팀 객체 생성
    const expansionTeam: Team = {
      id: 'expansion',
      name: data.teamName,
      fullName: `${data.city} ${data.teamName}`,
      color: '#8B5CF6',
      secondaryColor: '#EC4899',
      icon: '⭐',
    };
    setSelectedTeam(expansionTeam);
    setScreenView('game');
  };

  const handleExpansionTeamBack = () => {
    // [FIX] 뒤로 가기 시 난이도는 유지하고 팀 선택 화면으로만 이동
    // 난이도를 초기화하지 않음 (이미 선택된 난이도 유지)
    setScreenView('team_select');
  };

  // 로컬 저장소에서 불러오기
  const handleLoadFromLocal = async () => {
    try {
      // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
      const savedData = SafeStorage.getItem(SAVE_KEY);
      if (!savedData) {
        alert('저장된 게임이 없습니다.\n\n새 게임을 시작해주세요.');
        setIsLoadModalOpen(false);
        return;
      }
      
      try {
        const parsed = JSON.parse(savedData);
        
        // 필수 데이터 검증
        if (!parsed || typeof parsed !== 'object') {
          alert('저장 데이터가 손상되었습니다.\n\n올바른 형식의 저장 파일이 아닙니다.');
          setIsLoadModalOpen(false);
          return;
        }
        
        if (!parsed.selectedTeam) {
          alert('저장 데이터에 팀 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
          setIsLoadModalOpen(false);
          return;
        }
        
        // 메시지 데이터 검증 (게임 진행 여부 확인)
        if (!parsed.messages || !Array.isArray(parsed.messages) || parsed.messages.length === 0) {
          alert('저장 데이터에 게임 진행 정보가 없습니다.\n\n새 게임을 시작해주세요.');
          setIsLoadModalOpen(false);
          return;
        }
        
        setSelectedTeam(parsed.selectedTeam);
        if (parsed.difficulty) {
          if (parsed.difficulty === 'HARD') {
            setDifficulty('HELL');
          } else {
            setDifficulty(parsed.difficulty as Difficulty);
          }
        } else {
          setDifficulty('NORMAL');
        }
        setShouldLoadGame(true);
        setScreenView('game');
        setIsLoadModalOpen(false);
      } catch (parseError) {
        console.error('[App] 파싱 오류:', parseError);
        alert('저장 데이터를 읽을 수 없습니다.\n\n파일이 손상되었거나 올바른 형식이 아닙니다.');
        setIsLoadModalOpen(false);
      }
    } catch (error) {
      console.error('[App] 불러오기 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`게임 불러오기에 실패했습니다.\n\n오류: ${errorMessage}\n\n새 게임을 시작해주세요.`);
      setIsLoadModalOpen(false);
    }
  };

  // [NEW] 파일에서 불러오기
  const handleLoadFromFile = async () => {
    try {
      const input = FileStorageStrategy.createFileUploadInput(
        (data: GameSaveData) => {
          try {
            // [NEW] 필수 데이터 검증
            if (!data || typeof data !== 'object') {
              alert('저장 데이터가 올바른 형식이 아닙니다.\n\n올바른 세이브 파일을 선택해주세요.');
              setIsLoadModalOpen(false);
              return;
            }
            
            // [NEW] 팀 정보 검증
            if (!data.selectedTeam) {
              alert('저장 데이터에 팀 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
              setIsLoadModalOpen(false);
              return;
            }
            
            // [NEW] 메시지 데이터 검증 (게임 진행 여부 확인)
            if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
              alert('저장 데이터에 게임 진행 정보가 없습니다.\n\n올바른 세이브 파일이 아닙니다.');
              setIsLoadModalOpen(false);
              return;
            }
            
            // [NEW] 게임 상태 검증
            if (!data.gameState || typeof data.gameState !== 'object') {
              alert('저장 데이터에 게임 상태 정보가 없습니다.\n\n올바른 세이브 파일이 아닙니다.');
              setIsLoadModalOpen(false);
              return;
            }
            
            setSelectedTeam(data.selectedTeam);
            
            // 난이도 복원
            if (data.difficulty) {
              if (data.difficulty === 'HARD') {
                setDifficulty('HELL');
              } else {
                setDifficulty(data.difficulty as Difficulty);
              }
            } else {
              setDifficulty('NORMAL');
            }
            
            // 파일에서 불러온 데이터를 로컬 스토리지에도 저장
            try {
              // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
              SafeStorage.setItem(SAVE_KEY, JSON.stringify(data));
            } catch (syncError) {
              console.error('로컬 저장 오류:', syncError);
              // 로컬 저장 실패해도 게임은 진행 가능 (경고만 표시)
              console.warn('로컬 저장소 저장에 실패했지만 게임은 계속 진행됩니다.');
            }
            
            setShouldLoadGame(true);
            setScreenView('game');
            setIsLoadModalOpen(false);
            alert('게임이 불러와졌습니다!');
          } catch (validationError) {
            console.error('[App] 데이터 검증 오류:', validationError);
            const errorMessage = validationError instanceof Error ? validationError.message : '알 수 없는 오류';
            alert(`게임 데이터 검증에 실패했습니다.\n\n오류: ${errorMessage}`);
            setIsLoadModalOpen(false);
          }
        },
        (error) => {
          console.error('[App] 파일 불러오기 오류:', error);
          const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
          alert(`파일을 불러오는데 실패했습니다.\n\n오류: ${errorMessage}\n\n올바른 세이브 파일인지 확인해주세요.`);
          setIsLoadModalOpen(false);
        }
      );
      
      input.click();
    } catch (error) {
      console.error('[App] 파일 선택 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`파일 선택에 실패했습니다.\n\n오류: ${errorMessage}`);
      setIsLoadModalOpen(false);
    }
  };

  // [NEW] 불러오기 모달 열기 (StartScreen에서 호출)
  const handleLoadGame = () => {
    setIsLoadModalOpen(true);
  };

  const handleStartNewGame = () => {
    // 저장된 게임 데이터 삭제
    // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
    SafeStorage.removeItem(SAVE_KEY);
    
    setShouldLoadGame(false);
    setSelectedTeam(null);
    setDifficulty(null);
    
    // 난이도 선택 화면으로 이동
    setScreenView('difficulty_select');
  };

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScreenView('team_select');
  };

  return (
    <div className="h-full w-full bg-[#F5F7FA] overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {showApiKeyModal ? (
          <ApiKeyModal key="api-key-modal" onApiKeySet={handleApiKeySet} />
        ) : screenView === 'start' ? (
          <>
            <StartScreen
              key="start-screen"
              apiKey={apiKey}
              onLoadGame={handleLoadGame}
              onStartNew={handleStartNewGame}
            />
            <LoadGameModal
              isOpen={isLoadModalOpen}
              onClose={() => setIsLoadModalOpen(false)}
              onLoadFromLocal={handleLoadFromLocal}
              onLoadFromFile={handleLoadFromFile}
            />
          </>
        ) : screenView === 'difficulty_select' ? (
          <DifficultyModal
            key="difficulty-modal"
            isOpen={true}
            onSelect={handleDifficultySelect}
          />
        ) : screenView === 'team_select' ? (
          <TeamSelector key="team-selector" onSelect={handleTeamSelect} />
        ) : screenView === 'expansion_form' ? (
          <ExpansionTeamForm
            key="expansion-form"
            onComplete={handleExpansionTeamComplete}
            onBack={handleExpansionTeamBack}
          />
        ) : screenView === 'game' && selectedTeam && difficulty ? (
          <ChatInterface 
            key="chat-interface" 
            apiKey={apiKey} 
            selectedTeam={selectedTeam}
            difficulty={difficulty}
            expansionTeamData={expansionTeamData}
            onResetApiKey={handleResetApiKey}
            shouldLoadGame={shouldLoadGame}
            onGameLoaded={() => setShouldLoadGame(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// 외부 App 컴포넌트 (ToastProvider로 감싸기)
function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;

