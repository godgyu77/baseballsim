'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, FolderOpen, Loader2, AlertCircle, Calendar, Trophy } from 'lucide-react';
import { GameService } from '../services/GameService';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

interface SavedGame {
  teamCode: string;
  teamName: string;
  difficulty: string;
  currentYear: number;
  currentMonth: number;
  currentWeek: number;
  budget: number;
  savedAt: string;
}

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamCode: string;
  teamName?: string;
  difficulty?: string;
  messages: any[];
  onLoadGame: (gameData: { teamCode: string; teamName: string; difficulty: string; messages: any[] }) => void;
}

export default function SaveLoadModal({
  isOpen,
  onClose,
  teamCode,
  teamName,
  difficulty,
  messages,
  onLoadGame,
}: SaveLoadModalProps) {
  const [activeTab, setActiveTab] = useState<'save' | 'load'>('save');
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const { showToast } = useToast();

  // 저장된 게임 목록 불러오기
  useEffect(() => {
    if (isOpen && activeTab === 'load') {
      loadSavedGames();
    }
  }, [isOpen, activeTab]);

  const loadSavedGames = async () => {
    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // game_state에서 저장된 게임 조회
      // ⚠️ supabase join(teams(...))은 FK/스키마 설정에 따라 실패할 수 있어
      // game_state + teams를 2-step으로 안정적으로 조회합니다.
      const { data: gameStates, error: stateError } = await supabase
        .from('game_state')
        .select('my_team_id, difficulty, current_year, current_month, current_week, budget, updated_at, created_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (stateError) {
        throw new Error(`게임 목록 조회 실패: ${stateError.message}`);
      }

      if (!gameStates || gameStates.length === 0) {
        setSavedGames([]);
        setLoading(false);
        return;
      }

      const teamIds = Array.from(new Set((gameStates || []).map((gs: any) => gs.my_team_id).filter(Boolean)));
      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('id, code, name')
        .in('id', teamIds.length > 0 ? teamIds : [-1]);
      if (teamsError) {
        throw new Error(`팀 정보 조회 실패: ${teamsError.message}`);
      }
      const teamById = new Map<number, { id: number; code: string; name: string }>(
        (teams || []).map((t: any) => [t.id, t])
      );

      const gamesWithTeamInfo = (gameStates || [])
        .map((gameState: any) => {
          const team = teamById.get(gameState.my_team_id);
          if (!team) return null;
          return {
            teamCode: team.code,
            teamName: team.name,
            difficulty: gameState.difficulty || 'NORMAL',
            currentYear: gameState.current_year || 2026,
            currentMonth: gameState.current_month || 1,
            currentWeek: gameState.current_week || 1,
            // budget은 teams가 아니라 game_state.budget이 "세이브의 진실"입니다.
            budget: gameState.budget || 0,
            savedAt: gameState.updated_at || gameState.created_at || new Date().toISOString(),
          } as SavedGame;
        })
        .filter((game): game is SavedGame => game !== null);

      setSavedGames(gamesWithTeamInfo);
    } catch (err: any) {
      console.error('저장된 게임 불러오기 오류:', err);
      setError(err.message || '저장된 게임을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 게임 저장
  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        showToast('로그인이 필요합니다.', 'error');
        setSaving(false);
        return;
      }

      const userId = session.user.id;

      // 현재 메시지를 저장
      await GameService.saveGame(userId, teamCode, {
        messages: messages.map((msg: any) => {
          // UIMessage 형식에서 content 추출
          let content = '';
          if (msg.parts && Array.isArray(msg.parts)) {
            content = msg.parts
              .map((part: any) => {
                if (typeof part === 'string') return part;
                if (part.text) return part.text;
                if (part.content) return part.content;
                return '';
              })
              .filter((text: string) => text && text.trim().length > 0)
              .join(' ');
          } else if (msg.content) {
            content = msg.content;
          } else if (msg.text) {
            content = msg.text;
          }

          return {
            role: msg.role,
            content: content,
          };
        }),
        difficulty: difficulty,
      });

      showToast('게임이 저장되었습니다.', 'success');
      onClose();
    } catch (err: any) {
      console.error('게임 저장 오류:', err);
      setError(err.message || '게임 저장 중 오류가 발생했습니다.');
      showToast(`게임 저장 중 오류가 발생했습니다: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // 게임 불러오기
  const handleLoad = async (game: SavedGame) => {
    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        showToast('로그인이 필요합니다.', 'error');
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // GameService를 통해 게임 데이터 불러오기
      const gameData = await GameService.loadGame(userId, game.teamCode);

      // 메시지 형식 변환 (DB에서 불러온 형식을 UIMessage 형식으로)
      const formattedMessages = (gameData.messages || []).map((msg: any, index: number) => ({
        id: `msg-${Date.now()}-${index}`,
        role: msg.role === 'model' ? 'assistant' : msg.role,
        parts: [{ type: 'text', text: msg.content }],
        content: msg.content,
      }));

      onLoadGame({
        teamCode: gameData.teamCode,
        teamName: gameData.teamName,
        difficulty: gameData.difficulty,
        messages: formattedMessages,
      });

      showToast('게임이 불러와졌습니다.', 'success');
      onClose();
    } catch (err: any) {
      console.error('게임 불러오기 오류:', err);
      setError(err.message || '게임 불러오기 중 오류가 발생했습니다.');
      showToast(`게임 불러오기 중 오류가 발생했습니다: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      EASY: { text: '이지', color: 'bg-green-500' },
      NORMAL: { text: '노말', color: 'bg-blue-500' },
      HARD: { text: '하드', color: 'bg-orange-500' },
      HELL: { text: '헬', color: 'bg-red-600' },
    };
    const badge = badges[difficulty as keyof typeof badges] || badges.NORMAL;
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 rounded-t-2xl flex items-center justify-between border-b-2 border-baseball-gold">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-baseball-gold" />
                  <h2 className="text-xl font-bold text-white">저장 / 불러오기</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* 탭 */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveTab('save')}
                  className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'save'
                      ? 'bg-baseball-green text-white border-b-2 border-baseball-gold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>저장</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('load')}
                  className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'load'
                      ? 'bg-baseball-green text-white border-b-2 border-baseball-gold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    <span>불러오기</span>
                  </div>
                </button>
              </div>

              {/* 본문 */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'save' ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border-l-4 border-baseball-green">
                      <h3 className="font-bold text-baseball-green dark:text-baseball-gold mb-2">
                        현재 게임 정보
                      </h3>
                      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <p><span className="font-semibold">팀:</span> {teamName || '알 수 없음'}</p>
                        {difficulty && (
                          <p><span className="font-semibold">난이도:</span> {difficulty}</p>
                        )}
                        <p><span className="font-semibold">메시지 수:</span> {messages.length}개</p>
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full px-6 py-3 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>저장 중...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>게임 저장</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-baseball-green animate-spin" />
                        <span className="ml-3 text-gray-600 dark:text-gray-400">저장된 게임을 불러오는 중...</span>
                      </div>
                    ) : error ? (
                      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-red-700 dark:text-red-400 font-semibold">오류 발생</p>
                          <p className="text-red-600 dark:text-red-500 text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    ) : savedGames.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-2">저장된 게임이 없습니다.</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          새 게임을 시작하여 게임을 저장해보세요.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {savedGames.map((game, index) => (
                          <motion.button
                            key={`${game.teamCode}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleLoad(game)}
                            disabled={loading}
                            className="w-full p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border-2 border-gray-200 dark:border-slate-600 hover:border-baseball-green dark:hover:border-baseball-gold transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-baseball-green dark:group-hover:text-baseball-gold transition-colors">
                                    {game.teamName}
                                  </h3>
                                  {getDifficultyBadge(game.difficulty)}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                      {game.currentYear}년 {game.currentMonth}월 {game.currentWeek}주차
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-semibold">자금:</span>{' '}
                                    {(game.budget / 100000000).toFixed(1)}억 원
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                  저장 시각: {formatDate(game.savedAt)}
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

