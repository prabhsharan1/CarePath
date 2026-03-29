
import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, ClipboardCheck, FilePlus, AlertCircle, Send } from 'lucide-react';
import { Specialist, ReferralStatus } from '../types';

interface ReferralModalProps {
  specialist: Specialist | null;
  onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ specialist, onClose }) => {
  const [status, setStatus] = useState<ReferralStatus>('idle');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleReq = (req: string) => {
    setChecklist(prev => ({ ...prev, [req]: !prev[req] }));
  };

  const handleSend = () => {
    setStatus('sending');
    setTimeout(() => {
      setStatus('confirmed');
    }, 1500);
  };

  if (!specialist) return null;

  const allChecksMet = specialist.requirements.every(req => checklist[req]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-black text-slate-900 text-xl tracking-tight">
              {status === 'confirmed' ? 'Packet Dispatched' : 'Smart Referral Form'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Digital Triage System v1.2</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-white rounded-full transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {status === 'confirmed' ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Referral in Triage</h3>
              <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                The digital packet was sent to <span className="font-bold text-slate-900">{specialist.name}</span>. The student's tracker has been updated.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
              >
                Close Portal
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Specialist Info */}
              <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <img src={specialist.photoUrl} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Receiver</p>
                  <p className="text-base font-black text-slate-900">{specialist.name}</p>
                </div>
              </div>

              {/* Mandatory Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandatory Work-up Checklist</label>
                  <span className="text-[10px] font-bold text-rose-500 uppercase">Required for Acceptance</span>
                </div>
                <div className="space-y-2">
                  {specialist.requirements.map(req => (
                    <button 
                      key={req}
                      onClick={() => toggleReq(req)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        checklist[req] 
                        ? 'bg-white border-emerald-200 text-emerald-700 shadow-sm' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-sm font-bold">{req}</span>
                      {checklist[req] ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {!allChecksMet && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-rose-800 leading-relaxed">
                    Warning: Sending a referral without the mandatory work-up leads to a 85% higher decline rate.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button 
                disabled={status === 'sending' || !allChecksMet}
                onClick={handleSend}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none transition-all flex items-center justify-center gap-2 group"
              >
                {status === 'sending' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Dispatch Digital Packet
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
