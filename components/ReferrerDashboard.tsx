
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Send, 
  FileCheck, 
  Activity, 
  Users, 
  Clock, 
  ArrowRight,
  Bell,
  LayoutGrid,
  ClipboardList
} from 'lucide-react';
import { SPECIALISTS, MOCK_REFERRALS } from '../constants';
import SpecialistCard from './SpecialistCard';
import { Specialist, SpecialistCategory } from '../types';
import BodyPartSearch from './BodyPartSearch';
import ReferralModal from './ReferralModal';

const ReferrerDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SpecialistCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReferral, setActiveReferral] = useState<Specialist | null>(null);

  const filteredSpecialists = SPECIALISTS.filter(s => {
    const matchesCategory = !selectedCategory || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 flex items-center justify-center rounded-lg">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Campus Referrer Portal</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 border-l pl-4 border-gray-100">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900 leading-tight">Gema (Admin)</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">UW Health Services</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-emerald-600">G</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: Specialist Discovery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4">Find Community Specialist</h2>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, sub-specialty, or condition..." 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <BodyPartSearch selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredSpecialists.map(specialist => (
                <SpecialistCard 
                  key={specialist.id} 
                  specialist={specialist} 
                  onRefer={() => setActiveReferral(specialist)} 
                />
              ))}
            </div>
          </div>

          {/* Right: Active Pipeline */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">My Outgoing Pipeline</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-bold">Waiting for Triage</p>
                    <p className="text-[10px] opacity-60 uppercase font-bold">Sent within 48h</p>
                  </div>
                  <span className="text-2xl font-black text-emerald-400">12</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-bold">Action Required</p>
                    <p className="text-[10px] opacity-60 uppercase font-bold">Declined / Needs Work-up</p>
                  </div>
                  <span className="text-2xl font-black text-rose-400">3</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Recent Declines (Needs Fix)</h3>
              <div className="space-y-3">
                {MOCK_REFERRALS.filter(r => r.status === 'declined').map(ref => (
                  <div key={ref.id} className="p-3 bg-rose-50 border border-rose-100 rounded-2xl">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black text-rose-900 uppercase">{ref.studentName}</span>
                      <span className="text-[8px] font-bold text-rose-400">ID: {ref.studentId}</span>
                    </div>
                    <p className="text-[10px] text-rose-700 leading-tight mb-2">"{ref.declineReason}"</p>
                    <button className="text-[9px] font-black text-rose-600 uppercase flex items-center gap-1 hover:underline">
                      Add Document & Resend <ArrowRight className="w-2 h-2" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {activeReferral && (
        <ReferralModal 
          specialist={activeReferral} 
          onClose={() => setActiveReferral(null)} 
        />
      )}
    </div>
  );
};

export default ReferrerDashboard;
