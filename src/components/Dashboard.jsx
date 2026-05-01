import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lightbulb, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { mockData } from '../mockData';
import { interpretMetrics } from '../utils/interpreter';

const Dashboard = () => {
  const { metrics, developer } = mockData;
  const insight = interpretMetrics(metrics);

  const chartData = [
    { name: 'Lead Time', value: metrics.leadTime },
    { name: 'Cycle Time', value: metrics.cycleTime },
    { name: 'PRs', value: metrics.prThroughput },
    { name: 'Deploys', value: metrics.deploymentFreq },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-12 flex flex-col items-center font-sans">
      
      {/* Step 1: User Context & Identification */}
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
        
        <div className="px-10 py-10 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
            <Zap size={12} fill="currentColor" /> Active Performance Profile
          </div>
          <h1 className="text-slate-900 text-4xl font-black tracking-tight">{developer}</h1>
          <p className="text-slate-500 mt-2 font-medium">End-of-Month Performance Summary</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Step 2: Metric Visualization[cite: 1] */}
            <div className="lg:col-span-7">
              <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2 mb-8 uppercase tracking-widest">
                <TrendingUp size={20} className="text-indigo-500" /> Current Metrics
              </h2>
              
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-[350px] min-h-[350px] w-full">
                  {/* Debounce added to prevent initial 0-width console warnings[cite: 1] */}
                  <ResponsiveContainer width="99%" height="100%" debounce={1}>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'Cycle Time' ? '#f43f5e' : '#6366f1'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Step 3: Interpretation & Proposed Action[cite: 1] */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-[3rem] p-10 h-full flex flex-col justify-between shadow-2xl shadow-indigo-200">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
                      <Lightbulb size={24} />
                    </div>
                    <span className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">The Story</span>
                  </div>
                  
                  <p className="text-white text-2xl font-medium leading-relaxed italic">
                    "{insight.story}"
                  </p>
                </div>

                <div className="mt-12 border-t border-slate-800 pt-8">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-wider text-xs">
                    <CheckCircle size={16} /> Practical Next Step
                  </div>
                  <p className="text-slate-400 text-base mb-10 leading-relaxed">
                    {insight.action}
                  </p>
                  <button 
                    onClick={() => alert("Implementation Logged: Suggested ticket decomposition for next sprint.")}
                    className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg active:scale-[0.98]"
                  >
                    Implement Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Summary Performance Context[cite: 1] */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { 
                label: 'Bug Rate', 
                value: `${(metrics.bugRate * 100).toFixed(0)}%`, 
                bgColor: 'bg-emerald-50', 
                textColor: 'text-emerald-700' 
              },
              { 
                label: 'Monthly Deploys', 
                value: metrics.deploymentFreq, 
                bgColor: 'bg-blue-50', 
                textColor: 'text-blue-700' 
              },
              { 
                label: 'PR Throughput', 
                value: metrics.prThroughput, 
                bgColor: 'bg-indigo-50', 
                textColor: 'text-indigo-700' 
              },
              { 
                label: 'Calculated Quality', 
                value: metrics.bugRate === 0 ? 'High' : 'At Risk', 
                bgColor: metrics.bugRate === 0 ? 'bg-amber-50' : 'bg-rose-50', 
                textColor: metrics.bugRate === 0 ? 'text-amber-700' : 'text-rose-700' 
              }
            ].map((stat, idx) => (
              <div key={idx} className={`${stat.bgColor} p-6 rounded-3xl border border-white shadow-sm text-center transition-transform hover:scale-105`}>
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.textColor}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;