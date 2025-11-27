import { useState } from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  onApiKeySet: (apiKey: string) => void;
}

export default function ApiKeyModal({ onApiKeySet }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API 키를 입력해주세요.');
      return;
    }
    onApiKeySet(apiKey.trim());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-baseball-green p-1.5 sm:p-2 rounded-lg flex-shrink-0">
            <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Gemini API 키 입력</h2>
        </div>
        
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
          게임을 시작하려면 Google Gemini API 키가 필요합니다.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setError('');
            }}
            placeholder="API 키를 입력하세요"
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent mb-2 touch-manipulation"
          />
          
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mb-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-baseball-green hover:bg-baseball-green-dark active:bg-baseball-green-dark text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors touch-manipulation"
          >
            시작하기
          </button>
        </form>

        <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">
          API 키는 브라우저에 저장되며, 서버로 전송되지 않습니다.
        </p>
      </div>
    </div>
  );
}

