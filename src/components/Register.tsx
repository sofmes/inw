import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");

  const handleCreate = () => {
    if (username.trim()) {
      alert(`ユーザー「${username}」が作成されました！`);
    } else {
      alert("ユーザー名を入力してください！");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>新規登録</h1>
        <div className="icon-wrapper">
          <div className="photo-icon"></div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="username">ユーザー名</label>
          <input
            type="text"
            id="username"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={handleCreate}>
          作成
        </button>
      </div>
    </div>
  );
};

export default Register;
