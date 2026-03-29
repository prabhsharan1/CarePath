
import React from 'react';
import { Heart, Brain, Eye, Activity, Sparkles, Thermometer } from 'lucide-react';
import { SpecialistCategory } from '../types';

interface BodyPartSearchProps {
  selectedCategory: SpecialistCategory | null;
  onSelectCategory: (category: SpecialistCategory | null) => void;
}

const CATEGORIES = [
  { id: SpecialistCategory.MIND, icon: Sparkles, label: 'Mind' },
  { id: SpecialistCategory.HEART, icon: Heart, label: 'Heart' },
  { id: SpecialistCategory.BRAIN, icon: Brain, label: 'Brain' },
  { id: SpecialistCategory.EYE, icon: Eye, label: 'Eye' },
  { id: SpecialistCategory.BONES, icon: Activity, label: 'Bones' },
  { id: SpecialistCategory.GENERAL, icon: Thermometer, label: 'General' },
];

const BodyPartSearch: React.FC<BodyPartSearchProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-6 overflow-x-auto no-scrollbar">
      <div className="flex gap-4 min-w-max px-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 border w-24
                ${isSelected 
                  ? 'bg-care-teal border-care-teal text-white shadow-lg shadow-teal-700/20' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-care-teal/30 hover:bg-teal-50/30'
                }`}
            >
              <div className={`p-2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-soft-blue'}`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-care-teal'}`} />
              </div>
              <span className="text-xs font-medium tracking-wide">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BodyPartSearch;
