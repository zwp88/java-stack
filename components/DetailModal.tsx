import React, { useEffect, useState } from 'react';
import { ResourceItem, AIState } from '../types';
import { generateTopicGuide } from '../services/geminiService';
import { X, Sparkles, BookOpen, HelpCircle, List, AlertCircle } from 'lucide-react';

interface DetailModalProps {
  item: ResourceItem;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const [aiState, setAiState] = useState<AIState>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchAIContent = async () => {
      setAiState({ loading: true, data: null, error: null });
      try {
        const guide = await generateTopicGuide(item.title, item.shortDescription);
        if (isMounted) {
          setAiState({ loading: false, data: guide, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setAiState({ 
            loading: false, 
            data: null, 
            error: "生成内容失败，请检查您的 API Key 是否正确。" 
          });
        }
      }
    };

    fetchAIContent();

    return () => {
      isMounted = false;
    };
  }, [item]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {item.title}
              <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 ml-3">
                {item.category}
              </span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Static Description */}
          <section>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">概览 (Overview)</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              {item.shortDescription}
            </p>
          </section>

          {/* AI Content Section */}
          <div className="bg-slate-950/50 rounded-xl border border-indigo-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles size={120} className="text-indigo-500" />
            </div>

            <div className="flex items-center gap-2 mb-6 text-indigo-400">
              <Sparkles size={20} />
              <h3 className="font-semibold uppercase tracking-wider">AI 讲师深度解析</h3>
            </div>

            {aiState.loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">正在通过 Gemini 生成学习指南...</p>
              </div>
            ) : aiState.error ? (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                <AlertCircle size={24} />
                <p>{aiState.error}</p>
              </div>
            ) : aiState.data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Summary */}
                <div className="col-span-1 md:col-span-2">
                   <p className="text-slate-200 italic border-l-4 border-indigo-500 pl-4 py-1 bg-slate-900/50 rounded-r">
                    "{aiState.data.summary}"
                   </p>
                </div>

                {/* Key Concepts */}
                <div>
                  <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                    <BookOpen size={18} className="text-blue-400" /> 核心概念
                  </h4>
                  <ul className="space-y-2">
                    {aiState.data.keyConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Path */}
                <div>
                  <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                    <List size={18} className="text-green-400" /> 推荐学习路径
                  </h4>
                  <div className="space-y-3">
                    {aiState.data.learningPath.map((step, idx) => (
                      <div key={idx} className="flex gap-3 text-sm text-slate-300">
                        <div className="font-mono text-slate-500 font-bold shrink-0">{(idx + 1).toString().padStart(2, '0')}</div>
                        <div>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Questions */}
                <div className="col-span-1 md:col-span-2 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                   <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                    <HelpCircle size={18} className="text-orange-400" /> 面试准备
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {aiState.data.interviewQuestions.map((q, idx) => (
                      <li key={idx} className="bg-slate-800 p-3 rounded text-sm text-slate-300 hover:text-white transition-colors border border-transparent hover:border-slate-600">
                        {q}
                      </li>
                     ))}
                  </ul>
                </div>

              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;