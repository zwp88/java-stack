import React, { useState, useMemo } from 'react';
import { CATEGORIES, RESOURCES } from './constants';
import { Category, ResourceItem } from './types';
import ResourceCard from './components/ResourceCard';
import DetailModal from './components/DetailModal';
import { Search, Terminal, Coffee, Layers } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Filter logic
  const filteredResources = useMemo(() => {
    return RESOURCES.filter(item => {
      const matchesCategory = activeCategory === Category.ALL || item.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(searchLower) || 
        item.shortDescription.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Coffee size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Java全栈知识库</h1>
              <p className="text-xs text-slate-400">Full Stack Resource Library</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="搜索主题、标签或技术..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 rounded-full pl-10 pr-4 py-2 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Intro Banner */}
        <div className="mb-10 text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            精通 Java 全栈生态
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            专为现代 Java 全栈开发者精选的资源集合。
            点击任意主题即可生成专属 AI 学习指南。
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max px-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as Category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === category
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between text-slate-500 text-sm">
          <span>显示 {filteredResources.length} 个资源</span>
          <div className="flex items-center gap-1">
             <Terminal size={14} /> <span>由 Gemini 2.5 驱动</span>
          </div>
        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map(item => (
              <ResourceCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedResource} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
            <Layers className="mx-auto text-slate-600 mb-4" size={48} />
            <h3 className="text-xl text-slate-300 font-semibold">未找到相关资源</h3>
            <p className="text-slate-500">请尝试调整搜索关键词或分类。</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedResource && (
        <DetailModal 
          item={selectedResource} 
          onClose={() => setSelectedResource(null)} 
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Java全栈知识库. 基于 React & Tailwind 构建.</p>
      </footer>
    </div>
  );
}

export default App;