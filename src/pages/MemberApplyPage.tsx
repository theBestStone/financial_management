import { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export default function MemberApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: 'personal',
    name: '',
    company: '',
    phone: '',
    email: '',
    region: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb currentTitle="申请入会" />
        <h1 className="page-title">申请入会</h1>
      </div>
      <div className="form-page">
        {submitted ? (
          <div className="alert alert-success">
            您的入会申请已提交成功！协会秘书处将在3-5个工作日内审核并与您联系，请保持电话畅通。
          </div>
        ) : (
          <>
            <p style={{ marginBottom: 20, color: '#666', lineHeight: 1.6 }}>
              欢迎申请成为中国企业财务管理协会会员。请如实填写以下信息，提交后协会秘书处将进行审核。
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  会员类型 <span className="required">*</span>
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="personal">个人会员</option>
                  <option value="company">单位会员</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    {form.type === 'company' ? '单位名称' : '姓名'}{' '}
                    <span className="required">*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>联系电话 <span className="required">*</span></label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>电子邮箱 <span className="required">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>所在地区</label>
                  <input
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                  />
                </div>
              </div>
              {form.type === 'personal' && (
                <div className="form-group">
                  <label>所在单位</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              )}
              <div className="form-group">
                <label>申请理由</label>
                <textarea
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="请简要说明申请入会的原因"
                />
              </div>
              <button type="submit" className="btn-primary">
                提交申请
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
