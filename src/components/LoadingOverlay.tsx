import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-baseball-green animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">⚾</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 mb-1">
              GM이 데이터를 분석 중입니다...
            </p>
            <p className="text-sm text-gray-600">
              잠시만 기다려주세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

