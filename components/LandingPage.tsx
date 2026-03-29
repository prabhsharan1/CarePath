
import React from 'react';
import { ArrowRight, Shield, Zap, Users, CheckCircle, MapPin, Activity, Stethoscope, ClipboardPlus } from 'lucide-react';
import { UserRole } from '../types';

interface LandingPageProps {
  onStart: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-white font-sans text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-care-teal flex items-center justify-center rounded-lg shadow-lg shadow-teal-700/20">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-care-teal">CarePath</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onStart('referrer')} className="text-xs font-bold text-gray-400 hover:text-care-teal transition-colors">Campus Login</button>
            <button onClick={() => onStart('specialist')} className="text-xs font-bold text-gray-400 hover:text-care-teal transition-colors">Specialist Login</button>
            <button 
              onClick={() => onStart('student')}
              className="px-5 py-2.5 bg-care-teal text-white rounded-full text-sm font-bold hover:bg-teal-800 transition-all shadow-md"
            >
              Student Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-care-teal rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-teal-100">
            <Activity className="w-4 h-4" />
            Built for the Ontario Healthcare System
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Bridging Campus & <br />
            <span className="text-care-teal">Specialist Care.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">
            A three-way secure channel between UW Physicians, Community Specialists, and Students. No more fax machine black holes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Student CTA */}
            <button 
              onClick={() => onStart('student')}
              className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] text-left hover:shadow-2xl hover:shadow-teal-900/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              <Users className="w-8 h-8 text-care-teal mb-6 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10 text-gray-900">For Students</h3>
              <p className="text-gray-500 text-xs mb-6 relative z-10">Track your referral status in real-time. Know exactly what labs you need before your appointment.</p>
              <div className="flex items-center gap-2 text-care-teal font-bold text-xs relative z-10">
                Track Referral <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Referrer CTA (NEW) */}
            <button 
              onClick={() => onStart('referrer')}
              className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] text-left hover:shadow-2xl hover:shadow-emerald-900/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              <ClipboardPlus className="w-8 h-8 text-emerald-600 mb-6 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10 text-gray-900">For Clinicians</h3>
              <p className="text-gray-500 text-xs mb-6 relative z-10">For UW Physicians & Admins. Search specialists, attach work-up packets, and send digitally.</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs relative z-10">
                Send Referral <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Specialist CTA */}
            <button 
              onClick={() => onStart('specialist')}
              className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] text-left hover:shadow-2xl hover:shadow-blue-900/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              <Stethoscope className="w-8 h-8 text-blue-600 mb-6 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10 text-gray-900">For Specialists</h3>
              <p className="text-gray-500 text-xs mb-6 relative z-10">Receive complete digital referral packets. Triage and Accept/Decline with one click.</p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs relative z-10">
                Triage Hub <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-6 h-6 bg-gray-400 flex items-center justify-center rounded-md">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <span className="text-sm font-bold">© 2026 CarePath UW Health Services</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
