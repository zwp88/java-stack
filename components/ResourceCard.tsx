import React from 'react';
import { ResourceItem } from '../types';
import { Box, Cpu, Code2, Zap, ShieldCheck, Database, Server, Layers, Container, Cloud, Layout, Network, Wrench, ArrowRight } from 'lucide-react';

interface ResourceCardProps {
  item: ResourceItem;
  onClick: (item: ResourceItem) => void;
}

const IconMap: Record<string, React.FC<any>> = {
  Box, Cpu, Code2, Zap, ShieldCheck, Database, Server, Layers, Container, Cloud, Layout, Network, Wrench
};

const ResourceCard: React.FC<ResourceCardProps> = ({ item, onClick }) => {
  const IconComponent = IconMap[item.iconName] || Code2;
  
  const difficultyConfig = {
    'Beginner': { label: '入门', className: 'text-green-400 bg-green-400/10 border-green-400/20' },
    'Intermediate': { label: '进阶', className: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
    'Advanced': { label: '高级', className: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  };

  const difficulty = difficultyConfig[item.difficulty];

  return (
    <div 
      className="group relative bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(item)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
          <IconComponent size={24} />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${difficulty.className}`}>
          {difficulty.label}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {item.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-4 flex-grow">
        {item.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-700">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center text-indigo-400 text-sm font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        查看 AI 指南 <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};

export default ResourceCard;