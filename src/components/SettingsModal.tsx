/**
 * [NEW] 설정 모달 컴포넌트
 * 파일 저장/불러오기 버튼 UI
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Upload, Save, FolderOpen } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToFile?: () => void;
  onLoadFromFile?: () => void;
  onLocalSave?: () => void;
  onLocalLoad?: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  onSaveToFile,
  onLoadFromFile,
  onLocalSave,
  onLocalLoad,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 border-baseball-green/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">게임 설정</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* 파일 저장/불러오기 섹션 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    파일 백업 (PC ↔ 모바일 동기화)
                  </h3>
                  <div className="space-y-2">
                    {onSaveToFile && (
                      <button
                        onClick={() => {
                          onSaveToFile();
                          onClose();
                        }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-baseball-green to-[#0a3528] text-white font-bold rounded-lg hover:from-baseball-green-dark hover:to-[#08251f] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        <span>파일로 저장 (백업)</span>
                      </button>
                    )}
                    {onLoadFromFile && (
                      <button
                        onClick={() => {
                          onLoadFromFile();
                          onClose();
                        }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>파일 불러오기</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    파일을 Google Drive, Dropbox 등에 업로드하면 다른 기기에서 사용할 수 있습니다.
                  </p>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-200 my-4" />

                {/* 로컬 저장/불러오기 섹션 */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    로컬 저장 (현재 기기만)
                  </h3>
                  <div className="space-y-2">
                    {onLocalSave && (
                      <button
                        onClick={() => {
                          onLocalSave();
                          onClose();
                        }}
                        className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        <span>로컬 저장</span>
                      </button>
                    )}
                    {onLocalLoad && (
                      <button
                        onClick={() => {
                          onLocalLoad();
                          onClose();
                        }}
                        className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        <FolderOpen className="w-5 h-5" />
                        <span>로컬 불러오기</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

