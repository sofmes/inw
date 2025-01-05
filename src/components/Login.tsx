import GoogleLogin from "react-google-login";
import "./Login.css";

const Login = () => {
  const onSuccess = (response: any) => {
    console.log("ログイン成功！", response.profileObj);
    alert(`ようこそ、${response.profileObj.name}さん！`);
  };

  const onFailure = (response: any) => {
    console.error("ログイン失敗：", response);
    alert("ログインに失敗しました。もう一度試してください。");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          ログイン / 新規登録
        </h1>
        <div className="google-login-wrapper">
          <GoogleLogin
            clientId="あなたのクライアントIDをここに挿入してください"
            buttonText="Googleで登録"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
