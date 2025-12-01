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
    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-icons text-primary text-3xl">checklist</span>
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">{title}</h3>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <label 
            key={index} 
            className={`flex items-start gap-4 p-3 rounded-lg transition-all cursor-pointer ${
              checkedItems[index] 
                ? 'bg-primary/10 dark:bg-primary/20' 
                : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="relative flex items-center mt-1">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                checked={!!checkedItems[index]}
                onChange={() => toggleItem(index)}
              />
            </div>
            <span className={`text-base ${
              checkedItems[index] 
                ? 'text-text-light dark:text-text-dark font-medium' 
                : 'text-subtle-light dark:text-subtle-dark'
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