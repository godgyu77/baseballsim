/**
 * [NEW] 유저 로그인 상태 관리 컨텍스트
 * 클라우드 동기화를 위한 인증 상태 관리
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * [NEW] AuthProvider 컴포넌트
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // [NEW] 초기 로드 시 로컬 스토리지에서 유저 정보 확인
  useEffect(() => {
    const loadUser = async () => {
      try {
        // [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
        // 예시:
        // const savedUser = localStorage.getItem('user');
        // if (savedUser) {
        //   const userData = JSON.parse(savedUser);
        //   setUser(userData);
        // }

        // [NEW] 현재는 스켈레톤이므로 항상 null
        setUser(null);
      } catch (error) {
        console.error('[AuthContext] 유저 로드 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * [NEW] 로그인 함수
   */
  const login = (userData: User) => {
    setUser(userData);
    
    // [NEW] 로컬 스토리지에 유저 정보 저장
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('[AuthContext] 유저 저장 오류:', error);
    }
  };

  /**
   * [NEW] 로그아웃 함수
   */
  const logout = () => {
    setUser(null);
    
    // [NEW] 로컬 스토리지에서 유저 정보 삭제
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('[AuthContext] 유저 삭제 오류:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * [NEW] useAuth 훅
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

