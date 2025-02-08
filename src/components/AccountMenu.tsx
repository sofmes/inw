import { useState } from "react";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="dropdown dropdown-end">
        {/* アバター（クリックでメニュー表示） */}
        <button
          type="button"
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-10 rounded-full">
            <img src="src/assets/avatar.png" alt="User Avatar" />
          </div>
        </button>

        {/* メニュー */}
        <ul
          tabIndex={0}
          className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral-700 text-white rounded-box w-48
            transform transition-all duration-300 ease-out
            ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <li>
            <a onClick={() => setIsOpen(false)}>プロフィール</a>
          </li>
          <li>
            <a onClick={() => setIsOpen(false)}>テーマ設定</a>
          </li>
          <li>
            <a onClick={() => setIsOpen(false)}>ログアウト</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountMenu;
