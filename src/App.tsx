import { GoogleLogin } from '@react-oauth/google';

const App = () => {
  const handleSuccess = (credentialResponse: any) => {
    console.log("ログイン成功：", credentialResponse);
  };

  return (
    <div>
      <h1>ログイン / 新規登録</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("ログイン失敗")} />
    </div>
  );
};

export default App;
