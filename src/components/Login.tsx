import GoogleLogin from "react-google-login";

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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ログイン / 新規登録</h1>
      <p>以下のボタンを使ってGoogleアカウントでログインしてください。</p>
      <GoogleLogin
        clientId="あなたのクライアントIDをここに挿入してください"
        buttonText="Googleで登録"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
