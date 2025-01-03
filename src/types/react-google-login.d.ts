declare module 'react-google-login' {
    export interface GoogleLoginResponse {
      profileObj: {
        name: string;
        email: string;
        imageUrl: string;
        googleId: string;
      };
      tokenId: string;
    }
  
    export interface GoogleLoginProps {
      clientId: string;
      buttonText: string;
      onSuccess: (response: GoogleLoginResponse) => void;
      onFailure: (response: any) => void;
      cookiePolicy?: string;
    }
  
    const GoogleLogin: React.FC<GoogleLoginProps>;
  
    export default GoogleLogin;
  }
  