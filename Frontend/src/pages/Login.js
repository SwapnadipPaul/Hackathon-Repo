import { useState } from 'react';
import { authAPI, setAuthToken } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    
    try {
      const data = await authAPI.login(email, password, role);
      setAuthToken(data.token);
      setMsg(`Welcome back, ${data.user.name}!`);
      
      // Redirect based on role
      setTimeout(() => {
        if (role === 'student') {
          window.location.href = '/student';
        } else {
          window.location.href = '/teacher';
        }
      }, 1000);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="glass p-8 rounded-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/70">Sign in to your SkillForge account</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Role
            </label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            >
              <option value="student" className="bg-surface">Student</option>
              <option value="teacher" className="bg-surface">Teacher</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {msg && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            msg.includes('Welcome') 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}


