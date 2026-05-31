import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, icon, trend }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col space-y-4 relative overflow-hidden group">
    <div className="flex justify-between items-center relative z-10">
      <span className="text-3xl filter drop-shadow-[0_0_8px_#00f2ff]">{icon}</span>
      <span className={`text-[10px] font-black px-2 py-1 rounded-md tracking-tighter ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
      </span>
    </div>
    <div className="relative z-10">
      <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[2px]">{title}</h3>
      <p className="text-3xl font-black mt-1 tracking-tight text-white">{value}</p>
    </div>
  </motion.div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isPatching, setIsPatching] = useState(false);
  const [patchProgress, setPatchProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(null);
  const [stats, setStats] = useState({ totalErrors: 0, activeKeys: 0, aiFixes: 0, recentLogs: [] });
  const [connStatus, setConnStatus] = useState('Checking...');
  
  // AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Cloud Status State
  const [cloudStatus, setCloudStatus] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setConnStatus('Connected');
      } else {
        setConnStatus(`Error ${res.status}`);
      }
    } catch (err) {
      setConnStatus(`Waiting for Swarm...`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCloudStatus = async () => {
    try {
      const res = await fetch('/api/cloud/status');
      if (res.ok) {
        const data = await res.json();
        setCloudStatus(data);
      }
    } catch (err) {
      console.error('Cloud status fetch failed');
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCloudStatus();
    const interval = setInterval(() => {
      fetchStats();
      fetchCloudStatus();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (msg) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const handleStartPatch = () => {
    setIsPatching(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setPatchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPatching(false);
          setPatchProgress(0);
          addNotification('AI Swarm Patch Applied Successfully');
        }, 500);
      }
    }, 50);
  };

  const runAnalysis = async (errorId) => {
    setAnalyzing(true);
    setAiAnalysis(null);
    try {
        const res = await fetch(`/api/analyze/${errorId}`, { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            setAiAnalysis(data);
            addNotification('AI Analysis Complete');
        } else {
            addNotification('Analysis Failed');
        }
    } catch (err) { addNotification('Connection Error'); }
    finally { setAnalyzing(false); }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Errors" value={stats.totalErrors} icon="👾" trend={-12} />
              <StatCard title="AI Fixes" value={stats.aiFixes} icon="✨" trend={24} />
              <StatCard title="Active Keys" value={stats.activeKeys} icon="⚡" trend={5} />
              <StatCard title="System Health" value="99.9%" icon="🛡️" trend={1} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass-card p-8 min-h-[400px]">
                <h3 className="text-lg font-bold mb-8 flex items-center space-x-3"><span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" /><span>Live AI Diagnostics</span></h3>
                <div className="space-y-4">
                  {stats.recentLogs.length > 0 ? stats.recentLogs.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group" onClick={() => setShowAnalysis(log)}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black">0{i + 1}</div>
                        <div>
                          <p className="font-black text-sm group-hover:text-cyan-400 transition-colors">{log.project_name || 'E-Commerce'}</p>
                          <p className="text-xs text-gray-500 font-mono mt-1">{(log.error_message || log.message || '').substring(0, 50)}...</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors">ANALYZE ➜</span>
                    </div>
                  )) : <div className="text-center py-20 opacity-30 italic text-sm tracking-widest">Veri bekleniyor... SDK'yı çalıştırın.</div>}
                </div>
              </div>
              <div className="glass-card p-8 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/5 border-cyan-500/30">
                  <h3 className="text-xl font-black mb-4 tracking-tighter">Quick AI Fix</h3>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    {isPatching ? 'AI Swarm aktif edildi. Kodlar taranıyor...' : 'Sistemde bekleyen kritik hata tespit edildi. Otomatik onarımı başlatmak ister misiniz?'}
                  </p>
                  <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-cyan-400">
                      <span>{isPatching ? 'Progressing' : 'Success Probability'}</span>
                      <span>{isPatching ? `${patchProgress}%` : '92%'}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5"><motion.div animate={{ width: isPatching ? `${patchProgress}%` : '92%' }} className="h-full bg-cyan-400 rounded-full shadow-[0_0_15px_#00f2ff]" /></div>
                  </div>
                  <button onClick={handleStartPatch} disabled={isPatching} className="cyber-button w-full py-5 text-xs font-black uppercase tracking-[3px]">
                    {isPatching ? 'PATCHING...' : 'START AUTO-PATCH'}
                  </button>
              </div>
            </div>
          </motion.div>
        );
      case 'ai agents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {[
              { name: 'Fixer-Bot', role: 'Code Repair', status: 'Active', icon: '🛠️', task: 'Optimizing DB queries' },
              { name: 'Guardian', role: 'Security Shield', status: 'Scanning', icon: '🛡️', task: 'Analyzing traffic patterns' },
              { name: 'Scout', role: 'Error Hunter', status: 'Thinking', icon: '🔍', task: 'Searching for memory leaks' },
              { name: 'Architect', role: 'Orchestrator', status: 'Online', icon: '📐', task: 'Managing swarm resources' }
            ].map((agent) => (
              <div key={agent.name} className="glass-card p-8 border-l-4 border-l-cyan-400 hover:border-l-purple-500 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">{agent.icon}</div>
                <div className="flex justify-between items-start mb-8">
                   <div className="text-4xl group-hover:scale-110 transition-transform">{agent.icon}</div>
                   <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-3 py-1 rounded-full border border-cyan-500/20">{agent.status}</span>
                </div>
                <h4 className="text-2xl font-black mb-1">{agent.name}</h4>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">{agent.role}</p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Current Task</p>
                  <p className="text-xs text-cyan-400 font-mono italic">{agent.task}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'error logs':
        return (
          <div className="glass-card p-8 m-4">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black tracking-tight">Centralized Logs</h3>
              <button onClick={() => addNotification('Logs Exported')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export JSON</button>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                  <tr><th className="p-6">Timestamp</th><th className="p-6">Project</th><th className="p-6">Error</th><th className="p-6">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.recentLogs.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="p-6 font-mono text-gray-400">{new Date(row.created_at).toLocaleTimeString()}</td>
                      <td className="p-6 font-black">{row.project_name || 'E-Commerce'}</td>
                      <td className="p-6 text-gray-300 font-medium">{row.error_message}</td>
                      <td className="p-6">
                        <button onClick={() => setShowAnalysis(row)} className="text-cyan-400 font-black text-[10px] uppercase tracking-widest hover:underline">Analysis</button>
                      </td>
                    </tr>
                  ))}
                  {stats.recentLogs.length === 0 && (
                    <tr><td colSpan="4" className="p-24 text-center text-gray-600 italic tracking-[4px] uppercase text-xs">No records found. Waiting for SDK...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'shield':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div className="glass-card p-10 min-h-[450px] flex flex-col justify-between border-cyan-500/20">
              <h3 className="text-2xl font-black mb-8 flex items-center space-x-4">
                <span className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]" />
                <span>Firewall Traffic</span>
              </h3>
              <div className="flex items-end space-x-3 h-48 mb-10">
                {[40, 70, 45, 90, 65, 80, 30, 60, 100, 50, 75, 40].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-cyan-400/10 border-t-2 border-t-cyan-500/50 rounded-t-lg shadow-[0_-5px_15px_rgba(0,242,255,0.15)]" />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span>
              </div>
            </div>
            <div className="glass-card p-10 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 flex flex-col justify-center items-center text-center">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-8xl mb-8 relative">
                 <span className="relative z-10">🛡️</span>
                 <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
               </motion.div>
               <h3 className="text-4xl font-black mb-4">Shield Active</h3>
               <p className="text-gray-500 font-medium max-w-xs">System is under hybrid protection. All incoming packets are being verified by the Scout agent.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-3xl space-y-8 p-4">
            <section className="glass-card p-10 space-y-8">
              <h3 className="text-2xl font-black tracking-tighter text-cyan-400">Cloud Integration</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-3 block tracking-widest">Public API Key</label>
                  <div className="flex space-x-3">
                    <input type="password" value="xeyal_test_key_2026_d7f8a9..." readOnly className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono focus:border-cyan-500/50 outline-none transition-all" />
                    <button onClick={() => { navigator.clipboard.writeText('xeyal_test_key_2026_d7f8a9...'); addNotification('Copied to Clipboard'); }} className="bg-white/5 hover:bg-white/10 px-6 rounded-2xl transition-all border border-white/5">📋</button>
                  </div>
                </div>
                <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
                  <p className="text-xs font-bold text-cyan-400 mb-4 uppercase tracking-widest">Quick Start SDK</p>
                  <code className="block text-[10px] font-mono text-gray-400 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                    npm install xeyal-sdk-node<br/>
                    const sdk = new XeyalSDK('YOUR_KEY');<br/>
                    sdk.capture_error(error);
                  </code>
                </div>
                <button onClick={() => addNotification('Project Re-synced')} className="cyber-button w-full py-5 text-xs font-black uppercase tracking-[3px]">SYNC ALL PROJECTS</button>
              </div>
            </section>
          </div>
        );
      case 'cloud':
        return (
          <div className="space-y-8 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cloud Health Card */}
              <div className="glass-card p-8 border-cyan-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-5xl group-hover:scale-110 transition-transform group-hover:rotate-12 group-hover:text-cyan-400">🌐</div>
                <h3 className="text-xl font-black mb-8 tracking-tighter uppercase">Cloud Cluster Status</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Status</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${cloudStatus?.status === 'Operational' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                      {cloudStatus?.status || 'Searching...'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[2px] mb-1">Region</p>
                      <p className="text-sm font-bold text-white">{cloudStatus?.region || 'Detecting...'}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[2px] mb-1">Nodes</p>
                      <p className="text-sm font-bold text-white">{cloudStatus?.cluster_nodes || '0'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database & Runtime Card */}
              <div className="lg:col-span-2 glass-card p-8 border-purple-500/20">
                <h3 className="text-xl font-black mb-8 tracking-tighter uppercase flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                  <span>Backend Infrastructure</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Database</p>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-3">
                        <span className={`w-2 h-2 rounded-full ${cloudStatus?.database === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-bold">{cloudStatus?.database || 'Offline'}</span>
                     </div>
                   </div>
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Memory Load</p>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-sm font-bold text-cyan-400 font-mono">{cloudStatus?.memory || 'N/A'}</span>
                     </div>
                   </div>
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Node Runtime</p>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-sm font-bold text-white">{cloudStatus?.node_version || 'N/A'}</span>
                     </div>
                   </div>
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-3xl">
                   <div className="flex justify-between items-center">
                     <div>
                       <h4 className="text-sm font-black uppercase tracking-widest text-purple-400">Hybrid AI Bridge</h4>
                       <p className="text-[10px] text-gray-500 mt-1">Automatic failover between Ollama and Gemini is enabled.</p>
                     </div>
                     <div className="flex space-x-2">
                       <span className="text-[9px] font-black bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">OLLAMA: READY</span>
                       <span className="text-[9px] font-black bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">GEMINI: LINKED</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Cloud API Management */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">API Key Management</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-widest">Monitor and rotate SaaS access tokens</p>
                </div>
                <button onClick={() => addNotification('New Key Generated')} className="cyber-button px-8 py-4 text-[10px] font-black uppercase tracking-[3px]">GENERATE NEW KEY</button>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                    <tr><th className="p-6">Key Name</th><th className="p-6">Prefix</th><th className="p-6">Created</th><th className="p-6">Status</th><th className="p-6 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Main Production', prefix: 'xeyal_pr...', date: '2026-04-20', status: 'Active' },
                      { name: 'Staging Environment', prefix: 'xeyal_st...', date: '2026-04-22', status: 'Active' },
                      { name: 'Local Test Node', prefix: 'xeyal_lt...', date: '2026-04-25', status: 'Paused' }
                    ].map((key, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="p-6 font-black">{key.name}</td>
                        <td className="p-6 font-mono text-cyan-400/70">{key.prefix}</td>
                        <td className="p-6 text-gray-500 text-xs font-bold">{key.date}</td>
                        <td className="p-6">
                           <span className={`text-[9px] font-black px-2 py-1 rounded border ${key.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                             {key.status.toUpperCase()}
                           </span>
                        </td>
                        <td className="p-6 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Rotate</button>
                           <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex text-white overflow-hidden bg-[#050508] relative font-['Outfit']">
      <div className="fixed top-8 right-8 z-[100] flex flex-col space-y-3">
        <AnimatePresence>{notifications.map(n => (
          <motion.div key={n.id} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="bg-cyan-500 text-black font-black px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,242,255,0.3)]">✨ {n.msg}</motion.div>
        ))}</AnimatePresence>
      </div>

      <AnimatePresence>{showAnalysis && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6" onClick={() => { setShowAnalysis(null); setAiAnalysis(null); }}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-card max-w-4xl w-full p-10 border-cyan-500/50 shadow-[0_0_100px_rgba(0,242,255,0.15)] flex flex-col max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-black text-cyan-400 tracking-tighter">Diagnostic Report</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mt-2">Project: {showAnalysis.project_name || 'System App'}</p>
              </div>
              <button onClick={() => { setShowAnalysis(null); setAiAnalysis(null); }} className="text-gray-500 hover:text-white text-2xl transition-colors">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 overflow-hidden">
                {/* Left Side: Error & Breadcrumbs */}
                <div className="space-y-6 overflow-y-auto pr-4 scrollbar-hide">
                    <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl">
                        <p className="text-[10px] font-black text-red-400 uppercase mb-2 tracking-widest">Error Message</p>
                        <p className="text-sm font-bold text-gray-200 font-mono">{showAnalysis.error_message || showAnalysis.message}</p>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Event Timeline (Breadcrumbs)</p>
                        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                            {(showAnalysis.metadata?.breadcrumbs || []).map((b, i) => (
                                <div key={i} className="pl-10 relative">
                                    <div className="absolute left-[10px] top-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f2ff]" />
                                    <p className="text-[10px] font-black text-cyan-400/60 mb-1">{new Date(b.timestamp).toLocaleTimeString()} • {b.category.toUpperCase()}</p>
                                    <p className="text-xs text-gray-300 font-medium">{b.message}</p>
                                </div>
                            ))}
                            {(!showAnalysis.metadata?.breadcrumbs || showAnalysis.metadata.breadcrumbs.length === 0) && (
                                <p className="text-xs text-gray-600 italic pl-10">No events recorded before this error.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: AI Analysis */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-between overflow-y-auto scrollbar-hide">
                    {!aiAnalysis && !analyzing && (
                        <div className="text-center py-20">
                            <div className="text-4xl mb-6 opacity-30">🤖</div>
                            <h4 className="text-lg font-bold mb-4 opacity-50">AI Analysis Pending</h4>
                            <button onClick={() => runAnalysis(showAnalysis.id)} className="px-8 py-4 bg-cyan-400 text-black font-black rounded-2xl hover:scale-105 transition-all uppercase text-[10px] tracking-widest">Run Hybrid Diagnostic</button>
                        </div>
                    )}

                    {analyzing && (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest animate-pulse">Consulting Hybrid Swarm...</p>
                        </div>
                    )}

                    {aiAnalysis && (
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-cyan-400 uppercase mb-2 tracking-widest">AI Reasoning</p>
                                <p className="text-sm text-gray-300 leading-relaxed font-medium">{aiAnalysis.reason || aiAnalysis.explanation}</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Recommended Fix</p>
                                <p className="text-xs text-green-400 font-mono italic mb-4">{aiAnalysis.fix}</p>
                                <pre className="text-[10px] bg-black/60 p-4 rounded-xl text-gray-400 overflow-x-auto"><code>{aiAnalysis.example_code}</code></pre>
                            </div>
                            <button onClick={() => { addNotification('Patch Deployed to Swarm'); setShowAnalysis(null); }} className="w-full py-4 bg-green-500 text-black font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]">Deploy Fix</button>
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <aside className="w-80 bg-[#08080c]/90 backdrop-blur-3xl border-r border-white/5 p-10 flex flex-col justify-between hidden lg:flex relative z-20">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-20 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-[0_0_20px_rgba(0,242,255,0.3)]">X</div>
            <h1 className="text-2xl font-black tracking-tighter">XEYAL CLOUD</h1>
          </div>
          <nav className="space-y-3">
            {[
              { id: 'overview', icon: '📊', label: 'Overview' },
              { id: 'cloud', icon: '☁️', label: 'Cloud' },
              { id: 'ai agents', icon: '🤖', label: 'AI Agents' },
              { id: 'error logs', icon: '📜', label: 'Error Logs' },
              { id: 'shield', icon: '🛡️', label: 'Shield' },
              { id: 'settings', icon: '⚙️', label: 'Settings' }
            ].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-5 px-6 py-4 rounded-2xl transition-all duration-500 group ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <span className="text-xl transition-transform group-hover:scale-125">{item.icon}</span>
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="glass-card p-6 border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
          <div className="flex items-center space-x-3 mb-2 relative z-10">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-cyan-400">Hybrid Engine Online</span>
          </div>
          <p className="text-[10px] text-gray-500 font-bold italic">V1.5.2 "Swarm" Active</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 lg:p-16 relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-6xl font-black tracking-tighter capitalize leading-none">System <span className="text-cyan-400">{activeTab}</span></h2>
            <div className="flex flex-col mt-4">
              <span className={`text-[10px] font-black uppercase tracking-widest ${connStatus === 'Connected' ? 'text-green-400' : 'text-cyan-400 animate-pulse'}`}>{connStatus}</span>
              <p className="text-gray-500 font-medium text-sm italic mt-2">Mimar, kontrol tamamen sende.</p>
            </div>
          </div>
          <button onClick={() => { fetchStats(); addNotification('Manual Stats Refreshing...'); }} className="cyber-button px-10 py-5 text-[10px] font-black uppercase tracking-[4px]">Refresh</button>
        </header>
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>

      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
};

export default App;
