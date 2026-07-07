interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="login-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <h3>会员登录</h3>
          <button type="button" className="search-close" onClick={onClose}>×</button>
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>手机号 / 邮箱</label>
            <input placeholder="请输入手机号或邮箱" />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input type="password" placeholder="请输入密码" />
          </div>
          <button type="submit" className="btn-primary btn-block">登录</button>
        </form>
      </div>
    </div>
  );
}
