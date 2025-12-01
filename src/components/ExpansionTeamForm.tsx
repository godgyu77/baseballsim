import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Team } from '../constants/TeamData';

export type OwnerType = 'A' | 'B' | 'C' | 'D';

interface ExpansionTeamFormProps {
  onComplete: (data: { city: string; teamName: string; ownerType: OwnerType }) => void;
  onBack: () => void;
}

const OWNER_TYPES = [
  {
    id: 'A' as OwnerType,
    name: 'A유형: 성적 지상주의 (Win-Now)',
    description: '즉각적인 성과를 압박하는 구단주',
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'B' as OwnerType,
    name: 'B유형: 비즈니스맨 (Profit-First)',
    description: '가성비와 흑자 경영을 최우선으로 여기는 구단주',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'C' as OwnerType,
    name: 'C유형: 시스템/재건 (Rebuilder)',
    description: '장기적인 시스템 구축을 중시하는 구단주',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'D' as OwnerType,
    name: 'D유형: 의리의 대부 (The Godfather)',
    description: '팀의 로망과 의리를 중시하는 구단주',
    color: 'from-purple-500 to-purple-700',
  },
];

export default function ExpansionTeamForm({ onComplete, onBack }: ExpansionTeamFormProps) {
  const [city, setCity] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedOwnerType, setSelectedOwnerType] = useState<OwnerType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && teamName.trim() && selectedOwnerType) {
      onComplete({
        city: city.trim(),
        teamName: teamName.trim(),
        ownerType: selectedOwnerType,
      });
    }
  };

  const isFormValid = city.trim().length > 0 && teamName.trim().length > 0 && selectedOwnerType !== null;

  return (
    <div className="min-h-screen bg-[#Fdfbf7] flex items-center justify-center p-4 overflow-x-hidden w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-baseball-green mb-2">
            ⚾ 신생 구단 창단
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            구단 정보를 입력해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* 연고지 입력 */}
          <div>
            <label htmlFor="city" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              연고지 (City)
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="예: 서울시, 부산시, 제주시 등"
              className="w-full px-4 py-3 text-sm sm:text-base border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green transition-all"
              required
            />
          </div>

          {/* 구단명 입력 */}
          <div>
            <label htmlFor="teamName" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              구단명 (Team Name)
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="예: 한라 감귤스, 제주 유나이티드 등"
              className="w-full px-4 py-3 text-sm sm:text-base border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green transition-all"
              required
            />
          </div>

          {/* 구단주 유형 선택 */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
              구단주 유형 선택
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {OWNER_TYPES.map((owner) => (
                <motion.button
                  key={owner.id}
                  type="button"
                  onClick={() => setSelectedOwnerType(owner.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    selectedOwnerType === owner.id
                      ? 'border-baseball-green shadow-lg scale-[1.02]'
                      : 'border-gray-300 hover:border-baseball-green/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r ${owner.color} flex items-center justify-center ${
                    selectedOwnerType === owner.id ? 'opacity-100' : 'opacity-0'
                  } transition-opacity`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className={`bg-gradient-to-r ${owner.color} text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 inline-block`}>
                    {owner.id}유형
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-1">
                    {owner.name.split(':')[1].trim()}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {owner.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors touch-manipulation min-h-[48px]"
            >
              뒤로가기
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all touch-manipulation min-h-[48px] ${
                isFormValid
                  ? 'bg-gradient-to-r from-baseball-green to-[#0a3528] hover:from-baseball-green-dark hover:to-[#08251f] text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              창단하기
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

