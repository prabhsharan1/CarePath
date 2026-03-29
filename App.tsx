
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import BodyPartSearch from './components/BodyPartSearch';
import SpecialistCard from './components/SpecialistCard';
import ReferralModal from './components/ReferralModal';
import LoginPage from './components/LoginPage';
import DoctorLoginPage from './components/DoctorLoginPage';
import LandingPage from './components/LandingPage';
import DoctorDashboard from './components/DoctorDashboard';
import ReferrerDashboard from './components/ReferrerDashboard'; 
import { Specialist, SpecialistCategory, UserRole, Referral } from './types';
import { SPECIALISTS, MOCK_REFERRALS } from './constants';
import { Filter, ChevronDown, ChevronRight, Clock, Activity, ArrowRight, AlertCircle, CheckCircle2, Wallet, LogOut } from 'lucide-react';
import { auth, signInWithGoogle, logout, subscribeToAuthChanges, type User } from './firebase';

type ViewState = 'landing' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SpecialistCategory | null>(null);
  const [referringSpecialist, setReferringSpecialist] = useState<Specialist | null>(null);
  const [activeTab, setActiveTab] = useState<'find' | 'track'>('find');

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('landing');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async (role: UserRole) => {
    try {
      await signInWithGoogle();
      setUserRole(role);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const filteredSpecialists = useMemo(() => {
    if (!selectedCategory) return SPECIALISTS;
    return SPECIALISTS.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  if (currentView === 'landing') return <LandingPage onStart={(role) => { setUserRole(role); setCurrentView('login'); }} />;
  
  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome to CarePath</h2>
          <p className="text-gray-500 mb-8">Sign in as a <span className="font-bold text-care-teal uppercase">{userRole}</span> to continue</p>
          
          <button 
            onClick={() => handleGoogleLogin(userRole!)}
            className="w-full py-4 bg-white border-2 border-gray-100 hover:border-care-teal rounded-2xl flex items-center justify-center gap-3 transition-all group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            <span className="font-black text-gray-700 group-hover:text-care-teal">Sign in with Google</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('landing')}
            className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600"
          >
            Back to Role Selection
          </button>
        </div>
      </div>
    );
  }

  if (userRole === 'specialist') return <DoctorDashboard />;
  if (userRole === 'referrer') return <ReferrerDashboard />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <Header />
      
      <div className="max-w-screen-md mx-auto px-4 flex justify-end mt-4">
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
        >
          <LogOut className="w-3 h-3" /> Logout
        </button>
      </div>
      
      <main className="max-w-screen-md mx-auto px-4">
        <div className="flex gap-4 border-b border-gray-100 mb-6 mt-4">
          <button 
            onClick={() => setActiveTab('find')}
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'find' ? 'text-care-teal' : 'text-gray-400'}`}
          >
            Specialist Directory
            {activeTab === 'find' && <div className="absolute bottom-0 left-0 w-full h-1 bg-care-teal rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('track')}
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'track' ? 'text-care-teal' : 'text-gray-400'}`}
          >
            My Tracked Referrals (2)
            {activeTab === 'track' && <div className="absolute bottom-0 left-0 w-full h-1 bg-care-teal rounded-full" />}
          </button>
        </div>

        {activeTab === 'find' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="py-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Requirement-Smart Search</h2>
              <p className="text-sm text-gray-500 mt-1">See what specialist offices require before your UW doctor appointment.</p>
            </div>
            <BodyPartSearch selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            
            <section className="mt-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Community Specialists</h3>
                <button className="text-[10px] font-bold text-care-teal bg-teal-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <Activity className="w-3 h-3" /> OHIP & Private Integrated
                </button>
              </div>
              <div className="grid gap-4">
                {filteredSpecialists.map(specialist => (
                  <SpecialistCard 
                    key={specialist.id} 
                    specialist={specialist} 
                    onRefer={(s) => alert(`You'll need a referral for ${s.name}. We've highlighted the bloodwork and documentation they require on the card above.`)} 
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="py-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Referral Tracker</h2>
              <p className="text-sm text-gray-500 mt-1">Live status of your specialist journey.</p>
            </div>

            {MOCK_REFERRALS.map(ref => (
              <div key={ref.id} className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{ref.specialistName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-care-teal uppercase tracking-widest">{ref.specialty}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase">
                        <Wallet className="w-3 h-3" /> {ref.coverageType}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    ref.status === 'triage' ? 'bg-blue-50 text-blue-600' : 
                    ref.status === 'declined' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {ref.status}
                  </div>
                </div>

                <div className="relative pt-2 pb-10 px-4">
                  <div className="absolute top-[26px] left-[20px] w-[calc(100%-40px)] h-1.5 bg-gray-100 rounded-full" />
                  <div 
                    className="absolute top-[26px] left-[20px] h-1.5 bg-care-teal rounded-full transition-all duration-1000" 
                    style={{ width: ref.status === 'triage' ? '50%' : ref.status === 'declined' ? '100%' : '100%' }} 
                  />
                  
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="w-6 h-6 bg-care-teal rounded-full ring-4 ring-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[9px] font-black uppercase text-care-teal tracking-tighter">Sent</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group">
                      <div className={`w-6 h-6 rounded-full ring-4 ring-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${ref.status === 'triage' ? 'bg-care-teal' : ref.status === 'declined' ? 'bg-care-teal' : 'bg-gray-200'}`}>
                        {ref.status === 'triage' ? <Clock className="w-3.5 h-3.5 text-white animate-pulse" /> : <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${ref.status === 'triage' ? 'text-care-teal' : 'text-gray-400'}`}>Triage</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group">
                      <div className={`w-6 h-6 rounded-full ring-4 ring-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${ref.status === 'declined' ? 'bg-rose-500' : 'bg-gray-200'}`}>
                        {ref.status === 'declined' ? <XCircle className="w-3.5 h-3.5 text-white" /> : <ArrowRight className="w-3.5 h-3.5 text-gray-300" />}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Decision</span>
                    </div>
                  </div>
                </div>

                {ref.status === 'declined' && (
                  <div className="mt-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-rose-900">Referral Rejected by Specialist</p>
                      <p className="text-xs text-rose-700 leading-relaxed mt-1">{ref.declineReason}</p>
                      <p className="text-[10px] font-bold text-rose-500 uppercase mt-3">Action: Contact UW Admin to fix documentation</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Update</span>
                    <span className="text-[10px] font-bold text-gray-600">{ref.lastUpdated}</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                    Full History <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {referringSpecialist && (
        <ReferralModal 
          specialist={referringSpecialist} 
          onClose={() => setReferringSpecialist(null)} 
        />
      )}
    </div>
  );
};

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

export default App;
