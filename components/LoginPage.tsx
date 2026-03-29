
import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle, UserCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

type AuthMode = 'signin' | 'signup' | 'verify' | 'success';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Handle resend countdown
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateEmail = (email: string) => {
    return email.toLowerCase().endsWith('@uwaterloo.ca');
  };

  const startResendTimer = () => {
    setResendTimer(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode !== 'verify' && !validateEmail(email)) {
      setError('Please use a valid @uwaterloo.ca email address.');
      return;
    }

    setIsLoading(true);

    if (mode === 'signin') {
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } else if (mode === 'signup') {
      setTimeout(() => {
        setIsLoading(false);
        setMode('verify');
        setResendTimer(60);
      }, 1200);
    } else if (mode === 'verify') {
      setTimeout(() => {
        setIsLoading(false);
        if (verificationCode.length === 6) {
          setMode('success');
          setTimeout(() => onLogin(), 1500);
        } else {
          setError('Invalid verification code. Please try again.');
        }
      }, 1000);
    }
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  if (mode === 'success') {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl text-center max-w-sm w-full animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Verified!</h2>
          <p className="text-gray-500 text-sm">Welcome to CarePath. Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-care-teal flex items-center justify-center rounded-2xl mx-auto mb-4 shadow-lg shadow-teal-700/20">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current">
               <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CarePath</h1>
          <p className="text-gray-500 mt-2 font-medium">Student Wellness Portal</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-white relative overflow-hidden">
          {mode === 'verify' && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
              <div className="h-full bg-care-teal w-2/3 transition-all duration-500"></div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Check your email'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'signin' 
                ? 'Sign in to access your referrals and care network.' 
                : mode === 'signup' 
                  ? 'Use your university email to join the network.' 
                  : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-bold leading-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode !== 'verify' ? (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">UW Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@uwaterloo.ca"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-care-teal/50 transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-care-teal/50 transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  <input 
                    type="text" 
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full px-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-center text-3xl font-black tracking-[0.5em] text-gray-900 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-care-teal/50 transition-all placeholder:text-gray-200"
                    autoFocus
                    required
                  />
                </div>
                
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Resend available in {resendTimer}s
                    </p>
                  ) : (
                    <button 
                      type="button" 
                      onClick={startResendTimer}
                      className="text-[10px] text-care-teal font-black uppercase tracking-widest hover:underline"
                    >
                      Didn't get it? Resend Code
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="pt-2 space-y-3">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-care-teal text-white rounded-xl font-bold shadow-lg shadow-teal-700/20 hover:bg-teal-800 disabled:bg-gray-200 disabled:shadow-none transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading && mode !== 'verify' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create My Account' : 'Verify & Enter'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {(mode === 'signin' || mode === 'signup') && (
                <button 
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <UserCircle className="w-4 h-4" />
                  Continue as Guest
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-gray-50">
            {mode === 'signin' ? (
              <p className="text-xs text-gray-500">
                New student?{' '}
                <button onClick={() => { setMode('signup'); setError(''); }} className="text-care-teal font-bold hover:underline">Create account</button>
              </p>
            ) : mode === 'signup' ? (
              <p className="text-xs text-gray-500">
                Already registered?{' '}
                <button onClick={() => { setMode('signin'); setError(''); }} className="text-care-teal font-bold hover:underline">Log in here</button>
              </p>
            ) : (
              <button 
                onClick={() => { setMode('signup'); setError(''); setVerificationCode(''); }} 
                className="text-xs text-gray-400 font-bold hover:underline"
              >
                ← Back to email entry
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-8 font-medium uppercase tracking-tighter">
          Official Wellness Portal &bull; University of Waterloo &bull; 2026
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
