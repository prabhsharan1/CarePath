
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Stethoscope, UserCircle } from 'lucide-react';

interface DoctorLoginPageProps {
  onLogin: () => void;
}

const DoctorLoginPage: React.FC<DoctorLoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 flex items-center justify-center rounded-2xl mx-auto mb-4 shadow-xl">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Specialist Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Community Health Provider Network</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Professional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clinic.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Provider Login
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button 
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100"
              >
                <UserCircle className="w-4 h-4" />
                Continue as Guest
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-3 justify-center text-gray-300">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Verified Secure Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
