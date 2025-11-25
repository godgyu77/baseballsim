import { useState } from 'react';

const DEFAULT_VOLUME = 0.3;

export function useSound() {
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);

  // 무료 효과음 URL (Zapsplat 또는 다른 무료 사운드 라이브러리)
  const soundUrls = {
    click: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    swoosh: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
    success: 'https://www.soundjay.com/misc/sounds/button-3.wav',
    error: 'https://www.soundjay.com/misc/sounds/button-10.wav',
    coin: 'https://www.soundjay.com/misc/sounds/button-09.wav',
  };

  // 대체로 브라우저 내장 Audio API 사용 (간단한 beep)
  const createBeepSound = (frequency: number, duration: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(isMuted ? 0 : volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playSound = (soundName: keyof typeof soundUrls) => {
    if (isMuted) return;

    try {
      // 간단한 beep 사운드 생성
      const sounds = {
        click: () => createBeepSound(800, 0.1),
        swoosh: () => createBeepSound(400, 0.2),
        success: () => createBeepSound(1000, 0.15),
        error: () => createBeepSound(200, 0.2),
        coin: () => createBeepSound(1200, 0.1),
      };

      if (sounds[soundName]) {
        sounds[soundName]();
      }
    } catch (error) {
      console.warn('사운드 재생 실패:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolumeLevel = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };

  return {
    playSound,
    volume,
    setVolume: setVolumeLevel,
    isMuted,
    toggleMute,
  };
}
