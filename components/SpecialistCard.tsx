
import React from 'react';
import { Star, MapPin, Clock, CircleDollarSign, Send, FileCheck } from 'lucide-react';
import { Specialist } from '../types';

interface SpecialistCardProps {
  specialist: Specialist;
  onRefer: (specialist: Specialist) => void;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist, onRefer }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <img 
            src={specialist.photoUrl} 
            alt={specialist.name} 
            className="w-20 h-20 rounded-xl object-cover bg-gray-100"
          />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border shadow-sm">
             <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 px-1">
               <Star className="w-3 h-3 fill-amber-500" />
               {specialist.rating}
             </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 truncate">{specialist.name}</h3>
              <p className="text-xs text-care-teal font-medium uppercase tracking-tight">{specialist.specialty}</p>
            </div>
          </div>

          <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
              <FileCheck className="w-3 h-3" /> Mandatory for Referral
            </p>
            <div className="flex flex-wrap gap-1">
              {specialist.requirements.map(req => (
                <span key={req} className="text-[10px] text-slate-600 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {specialist.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 uppercase tracking-wider font-medium">
            {tag}
          </span>
        ))}
      </div>

      <button 
        onClick={() => onRefer(specialist)}
        className="mt-4 w-full py-2.5 bg-care-teal text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-teal-800 transition-colors shadow-sm group-hover:translate-y-[-1px]"
      >
        <Send className="w-4 h-4" />
        Prepare Referral Packet
      </button>
    </div>
  );
};

export default SpecialistCard;
