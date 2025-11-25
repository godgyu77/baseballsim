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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-baseball-green p-2 rounded-lg">
            <Key className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Gemini API 키 입력</h2>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent mb-2"
          />
          
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-baseball-green hover:bg-baseball-green-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            시작하기
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          API 키는 브라우저에 저장되며, 서버로 전송되지 않습니다.
        </p>
      </div>
    </div>
  );
}

