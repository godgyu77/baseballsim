/**
 * [NEW] GitHub Gist API 기반 완전 무료 저장 전략
 * GitHub Gist는 완전 무료이며, 공개/비공개 저장 가능
 */

import { GameSaveData, SaveMetadata } from './StorageService';

/**
 * [NEW] GitHub Gist 저장 전략
 * GitHub Personal Access Token 필요 (무료)
 */
export class GitHubGistStrategy {
  private token: string | null = null;
  private userId: string | null = null;

  constructor(token?: string, userId?: string) {
    this.token = token || null;
    this.userId = userId || null;
  }

  /**
   * [NEW] GitHub Gist에 게임 데이터 저장
   * 완전 무료, 공개/비공개 선택 가능
   * 
   * @param key 저장 키
   * @param data 게임 저장 데이터
   * @returns 저장 성공 여부
   */
  async save(key: string, data: GameSaveData): Promise<boolean> {
    try {
      if (!this.token) {
        console.warn('[GitHubGistStrategy] GitHub Token이 없어 저장할 수 없습니다.');
        return false;
      }

      // [NEW] Gist 파일명 생성
      const filename = `${key}.json`;
      const content = JSON.stringify(data, null, 2);

      // [NEW] 기존 Gist ID 확인 (있으면 업데이트, 없으면 생성)
      const existingGistId = await this.findGistId(key);
      
      if (existingGistId) {
        // [NEW] 기존 Gist 업데이트
        const response = await fetch(`https://api.github.com/gists/${existingGistId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            files: {
              [filename]: {
                content: content,
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Gist 업데이트 실패: ${response.statusText}`);
        }

        console.log('[GitHubGistStrategy] Gist 업데이트 완료:', existingGistId);
        return true;
      } else {
        // [NEW] 새 Gist 생성
        const response = await fetch('https://api.github.com/gists', {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            description: `Baseball Game Save: ${key}`,
            public: false, // [NEW] 비공개로 저장 (개인정보 보호)
            files: {
              [filename]: {
                content: content,
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Gist 생성 실패: ${response.statusText}`);
        }

        const gistData = await response.json();
        
        // [NEW] Gist ID를 로컬 스토리지에 저장 (다음 업데이트 시 사용)
        if (this.userId) {
          localStorage.setItem(`gist_${this.userId}_${key}`, gistData.id);
        }

        console.log('[GitHubGistStrategy] Gist 생성 완료:', gistData.id);
        return true;
      }
    } catch (error) {
      console.error('[GitHubGistStrategy] 저장 오류:', error);
      return false;
    }
  }

  /**
   * [NEW] GitHub Gist에서 게임 데이터 로드
   * 
   * @param key 저장 키
   * @returns 게임 저장 데이터
   */
  async load(key: string): Promise<GameSaveData | null> {
    try {
      if (!this.token) {
        console.warn('[GitHubGistStrategy] GitHub Token이 없어 로드할 수 없습니다.');
        return null;
      }

      // [NEW] Gist ID 찾기
      const gistId = await this.findGistId(key);
      if (!gistId) {
        return null;
      }

      // [NEW] Gist 데이터 가져오기
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const gistData = await response.json();
      const filename = `${key}.json`;
      const file = gistData.files[filename];

      if (!file) {
        return null;
      }

      const data = JSON.parse(file.content) as GameSaveData;
      
      // [NEW] 메타데이터가 없으면 생성
      if (!data.metadata) {
        data.metadata = {
          lastModified: new Date(gistData.updated_at).getTime(),
        };
      }

      console.log('[GitHubGistStrategy] Gist 로드 완료:', gistId);
      return data;
    } catch (error) {
      console.error('[GitHubGistStrategy] 로드 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] 메타데이터 조회
   * 
   * @param key 저장 키
   * @returns 메타데이터
   */
  async getMetadata(key: string): Promise<SaveMetadata | null> {
    try {
      if (!this.token) {
        return null;
      }

      const gistId = await this.findGistId(key);
      if (!gistId) {
        return null;
      }

      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const gistData = await response.json();
      
      return {
        lastModified: new Date(gistData.updated_at).getTime(),
        userId: this.userId || undefined,
      };
    } catch (error) {
      console.error('[GitHubGistStrategy] 메타데이터 조회 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] Gist ID 찾기
   * 로컬 스토리지에 저장된 Gist ID 조회
   * 
   * @param key 저장 키
   * @returns Gist ID 또는 null
   */
  private async findGistId(key: string): Promise<string | null> {
    if (!this.userId) {
      return null;
    }

    // [NEW] 로컬 스토리지에서 Gist ID 조회
    const storedGistId = localStorage.getItem(`gist_${this.userId}_${key}`);
    if (storedGistId) {
      return storedGistId;
    }

    // [NEW] 로컬에 없으면 GitHub API에서 검색 (선택적)
    // 주의: 이 방법은 모든 Gist를 조회하므로 비효율적
    // 대신 사용자가 Gist ID를 직접 입력하도록 하는 것이 좋음
    
    return null;
  }

  /**
   * [NEW] 데이터 삭제
   * 
   * @param key 저장 키
   * @returns 삭제 성공 여부
   */
  async delete(key: string): Promise<boolean> {
    try {
      if (!this.token) {
        return false;
      }

      const gistId = await this.findGistId(key);
      if (!gistId) {
        return true; // 이미 없음
      }

      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok && this.userId) {
        localStorage.removeItem(`gist_${this.userId}_${key}`);
      }

      return response.ok;
    } catch (error) {
      console.error('[GitHubGistStrategy] 삭제 오류:', error);
      return false;
    }
  }
}

/**
 * [NEW] GitHub Personal Access Token 생성 가이드
 * 
 * 1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
 * 2. "Generate new token (classic)" 클릭
 * 3. 권한 선택:
 *    - gist (Gist 생성/수정/삭제)
 * 4. 토큰 생성 후 복사 (한 번만 표시됨!)
 * 5. 앱에 토큰 입력
 */

