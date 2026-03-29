
import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Download, 
  Plus, 
  Clock, 
  User, 
  Bell, 
  ExternalLink, 
  CalendarDays, 
  CheckCircle2, 
  XCircle,
  FileUp,
  Loader2,
  FileText,
  ClipboardList,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MOCK_REFERRALS } from '../constants';

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'triage' | 'schedule'>('triage');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) { clearInterval(interval); return 100; }
          return prev + 10;
        });
      }, 200);
      setTimeout(() => { setIsUploading(false); setUploadProgress(0); alert('Referral packet uploaded.'); }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />

      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded-lg">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Provider Triage Hub</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">SM</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-slate-200/50 p-1 rounded-2xl w-fit mb-8">
          <button 
            onClick={() => setActiveTab('triage')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'triage' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Triage Inbox (8)
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Schedule
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">New Referrals</h2>
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 flex items-center gap-1">
                <FileUp className="w-3 h-3" /> Upload Paper Referral
              </button>
            </div>

            {MOCK_REFERRALS.filter(r => r.status === 'triage').map((ref) => (
              <div key={ref.id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{ref.studentName}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase">ID: {ref.studentId}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Awaiting Triage</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-3 rounded-2xl border ${ref.hasWorkup ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                    <p className="text-[10px] font-bold uppercase opacity-60">Mandatory Work-up</p>
                    <p className="text-xs font-bold">{ref.hasWorkup ? 'Attached (Labs/X-ray)' : 'Missing Documentation'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Sent By</p>
                    <p className="text-xs font-bold text-slate-700">UW Health Services</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                    <CheckCircle2 className="w-4 h-4" /> Accept Referral
                  </button>
                  <button className="px-5 py-3 border border-slate-200 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-50 transition-all flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                  <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Pipeline Stats</h3>
              <div className="space-y-4 text-sm font-bold">
                <div className="flex justify-between"><span>Wait for Triage</span><span className="text-blue-400">2.4 Weeks</span></div>
                <div className="flex justify-between"><span>Decline Rate (UW)</span><span>14%</span></div>
                <div className="flex justify-between"><span>Total In-Review</span><span>12</span></div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Wait-Time Targets</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">Urgent Triage</span>
                  <span className="text-emerald-600">24 hrs</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">Standard Triage</span>
                  <span className="text-slate-900">7 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
