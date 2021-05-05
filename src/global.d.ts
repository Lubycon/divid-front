export interface Auth {
  authorize: ({ redirectUri: string }) => void;
}
export interface KakaoSDK {
  Auth: Auth;
  init: (apiKey: string | undefined) => void;
  isInitialized: () => boolean;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}
