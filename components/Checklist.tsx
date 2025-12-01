import React, { useState } from 'react';

interface ChecklistItem {
  text: string;
}

interface ChecklistProps {
  title?: string;
  items: string[];
}

const Checklist: React.FC<ChecklistProps> = ({ title = "Downloadable Checklist", items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-8 mt-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <span className="material-icons text-3xl">checklist</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <label
            key={index}
            className={`flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer border ${checkedItems[index]
                ? 'bg-primary/10 border-primary/20 dark:bg-primary/20'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/50'
              }`}
          >
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
                checked={!!checkedItems[index]}
                onChange={() => toggleItem(index)}
              />
            </div>
            <span className={`text-base leading-relaxed ${checkedItems[index]
                ? 'text-slate-900 dark:text-white font-medium'
                : 'text-slate-600 dark:text-slate-300'
              }`}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checklist;