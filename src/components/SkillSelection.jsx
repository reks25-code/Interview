import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';

const SkillSelection = ({ user, onSave }) => {
  const initial = user?.skills || [];
  const [selected, setSelected] = useState(initial);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const handleSave = () => {
    const updated = { ...user, skills: selected };
    onSave && onSave(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-3">Select your skills / preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={()=>toggle(cat.id)} className={`p-3 border rounded text-left ${selected.includes(cat.id) ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}>
              <div className="font-semibold">{cat.name}</div>
              <div className="text-sm text-slate-500">{cat.icon}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;
