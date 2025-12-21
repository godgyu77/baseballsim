import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import DifficultySelect from './components/DifficultySelect';
import TeamSelect from './components/TeamSelect';
import ChatInterface from './components/ChatInterface';
import AuthModal from './components/AuthModal';
import ApiKeyModal from './components/ApiKeyModal';
import SaveLoadModal from './components/SaveLoadModal';
import { supabase } from './lib/supabase';
import type { Difficulty } from './constants/GameConfig';
import { SafeSessionStorage } from './lib/safeStorage';

type ViewState = 'START' | 'DIFFICULTY' | 'TEAM_SELECT' | 'GAME';

/**
 * 메인 앱 컴포넌트 (Vite용)
 * 
 * - State Machine 패턴으로 4단계 플로우 구현
 * - START -> DIFFICULTY -> TEAM_SELECT -> GAME
 */
function App() {
  const [view, setView] = useState<ViewState>('START');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null); // 이제 팀 코드 (문자열)
  const [teamName, setTeamName] = useState<string | undefined>(undefined);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSaveLoadModal, setShowSaveLoadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // API Key 확인 함수
  const checkApiKey = () => {
    const storedKey = SafeSessionStorage.getItem('gemini_api_key');
    if (!storedKey || storedKey.trim().length === 0) {
      // API Key가 없으면 모달 표시
      setShowApiKeyModal(true);
    } else {
      setApiKey(storedKey);
    }
  };

  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserId(session.user.id);
          // 로그인된 경우 API Key 확인
          checkApiKey();
        } else {
          // 로그인되지 않은 경우 인증 모달 표시
          setShowAuthModal(true);
        }
      } catch (error) {
        console.error('인증 확인 오류:', error);
        setShowAuthModal(true);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setShowAuthModal(false);
        // 로그인 성공 후 API Key 확인
        checkApiKey();
      } else {
        setUserId(null);
        setShowAuthModal(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 1단계: 새 게임 시작 버튼 클릭
  const handleStartNew = () => {
    console.log('[App] handleStartNew 호출됨, view를 DIFFICULTY로 변경');
    setView('DIFFICULTY');
  };

  // 2단계: 난이도 선택
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    console.log('[App] 난이도 선택:', selectedDifficulty);
    setDifficulty(selectedDifficulty);
    setView('TEAM_SELECT');
  };

  // 3단계: 팀 선택
  const handleSelectTeam = async (selectedTeamCode: string, selectedTeamName: string) => {
    console.log(`[App] 팀 선택 완료: ${selectedTeamName} (Code: ${selectedTeamCode}), 난이도: ${difficulty}`);
    
    // 로그인된 사용자가 있으면 게임 초기화
    if (userId && difficulty) {
      try {
        const { GameService } = await import('./services/GameService');
        await GameService.startNewGame(userId, selectedTeamCode, difficulty);
        console.log(`[App] 게임 초기화 완료: Team ${selectedTeamCode} (${selectedTeamName}), Difficulty ${difficulty}`);
      } catch (error: any) {
        console.error('[App] 게임 초기화 오류:', error);
        // 오류가 있어도 게임 화면으로 이동 (사용자가 수동으로 시작할 수 있음)
        alert(`게임 초기화 중 오류가 발생했습니다: ${error.message}`);
      }
    }
    
    setTeamId(selectedTeamCode); // 이제 teamId는 코드 문자열
    setTeamName(selectedTeamName);
    setView('GAME');
    console.log(`[App] view 상태를 'GAME'으로 변경`);
  };

  // 게임 불러오기
  const handleLoadGame = () => {
    console.log('[App] 게임 불러오기 모달 열기');
    setShowSaveLoadModal(true);
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      // Supabase 세션 종료
      await supabase.auth.signOut();
      
      // 로컬 상태 초기화
      setUserId(null);
      setTeamId(null);
      setTeamName(undefined);
      setDifficulty(null);
      setView('START');
      setApiKey('');
      
      // SessionStorage 정리
      SafeSessionStorage.removeItem('gemini_api_key');
      
      // 인증 모달 표시
      setShowAuthModal(true);
      
      console.log('[App] 로그아웃 완료');
    } catch (error: any) {
      console.error('[App] 로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 저장된 게임 불러오기
  const handleLoadSavedGame = async (gameData: { teamCode: string; teamName: string; difficulty: string; messages: any[] }) => {
    if (!userId) {
      setShowAuthModal(true);
      return;
    }

    try {
      console.log('[App] 저장된 게임 불러오기:', gameData);
      
      setTeamId(gameData.teamCode);
      setTeamName(gameData.teamName);
      setDifficulty(gameData.difficulty as Difficulty);
      setView('GAME');
      setShowSaveLoadModal(false);
      
      // 메시지 히스토리는 ChatInterface에서 불러올 수 있도록 전달 필요
      // (추후 구현)
    } catch (error: any) {
      console.error('게임 불러오기 오류:', error);
      alert(`게임 불러오기 실패: ${error.message}`);
    }
  };

  // 인증 성공 핸들러
  const handleAuthSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setShowAuthModal(false);
    // 로그인 성공 후 API Key 입력 모달 표시
    const storedKey = SafeSessionStorage.getItem('gemini_api_key');
    if (!storedKey || storedKey.trim().length === 0) {
      setShowApiKeyModal(true);
    } else {
      setApiKey(storedKey);
    }
  };

  // API Key 설정 핸들러
  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  return (
    <>
      {/* 메인 뷰 */}
      {(() => {
        switch (view) {
          case 'START':
            return (
              <StartScreen 
                apiKey={apiKey}
                onLogout={userId ? handleLogout : undefined}
                onGameStart={(id, name, diff) => {
                  setTeamId(id);
                  setTeamName(name);
                  if (diff) setDifficulty(diff as Difficulty);
                  setView('GAME');
                }}
                onLoadGame={handleLoadGame}
                onStartNew={() => {
                  console.log('[App] onStartNew prop 호출됨');
                  handleStartNew();
                }}
                onApiKeySet={(key) => {
                  setApiKey(key);
                }}
                onApiKeyRequest={() => {
                  setShowApiKeyModal(true);
                }}
              />
            );

          case 'DIFFICULTY':
            return (
              <DifficultySelect 
                onSelect={handleSelectDifficulty}
                onBack={() => setView('START')}
              />
            );

          case 'TEAM_SELECT':
            return (
              <TeamSelect 
                difficulty={difficulty!}
                onSelect={handleSelectTeam}
                onBack={() => setView('DIFFICULTY')}
              />
            );

          case 'GAME':
            return (
              <ChatInterface 
                teamId={teamId!}
                selectedTeamName={teamName}
                difficulty={difficulty || undefined}
                onLogout={handleLogout}
              />
            );

          default:
            return null;
        }
      })()}

      {/* 저장/불러오기 모달 */}
      <SaveLoadModal
        isOpen={showSaveLoadModal}
        onClose={() => setShowSaveLoadModal(false)}
        teamCode={teamId || ''}
        teamName={teamName}
        difficulty={difficulty || undefined}
        messages={[]}
        onLoadGame={handleLoadSavedGame}
      />

      {/* 인증 모달 */}
      <AuthModal
        isOpen={showAuthModal && !isCheckingAuth}
        onClose={() => {
          // 로그인 없이는 진행 불가 (선택적)
          // setShowAuthModal(false);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* API Key 입력 모달 */}
      <ApiKeyModal
        isOpen={showApiKeyModal && !!userId}
        onClose={() => {
          // API Key가 없으면 게임을 시작할 수 없지만, 나중에 입력할 수 있도록 모달 닫기 허용
          setShowApiKeyModal(false);
        }}
        onApiKeySet={handleApiKeySet}
        initialApiKey={apiKey}
      />
    </>
  );
}

export default App;
