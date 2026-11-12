import React, { useState, useEffect } from 'react';
import {
  Film,
  Kanban,
  Folder,
  MessageSquare,
  Plus,
  Users,
  Send,
  MapPin,
  Lock,
  Hash,
  Phone,
  Mail,
  Eye,
  X,
  Cloud,
  Check,
  Clock,
  Shield,
  FileText
} from 'lucide-react';

const createGlobalCloudSync = () => {
  let listeners = new Set();
  
  const saveToCloud = async (data) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cue_global_store', JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('cue_cloud_update', { detail: data }));
      }
    } catch (err) {
      console.warn("Cloud Sync Save Warning:", err);
    }
  };

  const loadFromCloud = () => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cue_global_store');
        return saved ? JSON.parse(saved) : null;
      }
    } catch (err) {}
    return null;
  };

  return {
    saveToCloud,
    loadFromCloud,
    subscribe: (callback) => {
      listeners.add(callback);
      const handler = (e) => {
        if (e.detail) callback(e.detail);
      };
      if (typeof window !== 'undefined') {
        window.addEventListener('cue_cloud_update', handler);
      }
      return () => {
        listeners.delete(callback);
        if (typeof window !== 'undefined') {
          window.removeEventListener('cue_cloud_update', handler);
        }
      };
    }
  };
};

const cloudSync = createGlobalCloudSync();

const TEAM_MEMBERS = [
  { id: 'fahad', name: 'فهد سليمان السعود', role: 'Founder | Management Team | Head of Art Department', status: 'online', avatar: '', phone: '0541105416', email: 'fahadgg08@gmail.com', password: 'cue2026' },
  { id: 'rand', name: 'رند محمد الرميخان', role: 'Co-founder | Management Team | Art Department', status: 'online', avatar: '', phone: '0554095903', email: 'rrand.msa@gmail.com', password: 'cue2026' },
  { id: 'ibrahim', name: 'إبراهيم المطرفي', role: 'Management Team | Head of Production Department', status: 'online', avatar: '', phone: '0560057562', email: 'i.almatrafi.cue@gmail.com', password: 'cue2026' },
  { id: 'abdulaziz', name: 'عبدالعزيز المعاوي', role: 'Management Team | Head of Directing Department', status: 'online', avatar: '', phone: '0554760134', email: 'ajqvvv@gmail.com', password: 'cue2026' },
  { id: 'joud', name: 'جود فهد الغامدي', role: 'Management Team | Directing Department', status: 'online', avatar: '', phone: '0555776788', email: 'joudiwooow@gmail.com', password: 'cue2026' },
  { id: 'khalid', name: 'خالد عبدالله الجمحان', role: 'Production Department', status: 'online', avatar: '', phone: '0564099683', email: 'khalid.al-jamhan@sadufilms.com', password: 'cue2026' },
  { id: 'abdulmalik_d', name: 'عبدالملك الداوود', role: 'Production Department', status: 'online', avatar: '', phone: '0562881333', email: 'aldaudabdul@gmail.com', password: 'cue2026' },
  { id: 'tariq', name: 'طارق عبدالله الدوسري', role: 'Production Department', status: 'online', avatar: '', phone: '0509272230', email: 'Triq091d@gmail.com', password: 'cue2026' },
  { id: 'abdullatif', name: 'عبداللطيف المسعود', role: 'Production Department', status: 'online', avatar: '', phone: '0510545538', email: 'bdalltyfalmy@gmail.com', password: 'cue2026' },
  { id: 'layan', name: 'ليان سعد الغامدي', role: 'Production Department | Art Department', status: 'online', avatar: '', phone: '0569137875', email: 'layanssaadd11@gmail.com', password: 'cue2026' },
  { id: 'abbad', name: 'عباد العتيبي', role: 'Directing Department', status: 'online', avatar: '', phone: '0555552162', email: 'abad.alraqas@gmail.com', password: 'cue2026' },
  { id: 'ghazi', name: 'غازي الكندي', role: 'Directing Department | Art Department', status: 'online', avatar: '', phone: '0535553792', email: 'hhq477@gmail.com', password: 'cue2026' },
  { id: 'haya', name: 'هيا العيسى', role: 'Directing Department', status: 'online', avatar: '', phone: '0559527692', email: 'Haya.11.alessa@gmail.com', password: 'cue2026' },
  { id: 'faisal', name: 'فيصل الجميعه', role: 'Art Department', status: 'online', avatar: '', phone: '0555470681', email: '1414faisalahmad@gmail.com', password: 'cue2026' },
  { id: 'abdulmalik_m', name: 'عبدالملك المعيقل', role: 'Art Department', status: 'online', avatar: '', phone: '0536128116', email: 'mlok.fg87@gmail.com', password: 'cue2026' },
  { id: 'mohammed_s', name: 'محمد ال شفلوت', role: 'Art Department', status: 'online', avatar: '', phone: '0501205773', email: 'm7md.ali.077@gmail.com', password: 'cue2026' },
  { id: 'mohammed_d', name: 'محمد الدامر', role: 'Art Department', status: 'online', avatar: '', phone: '0570750748', email: 'dammhmd049@gmail.com', password: 'cue2026' },
  { id: 'leen', name: 'لين محمد الغامدي', role: 'Art Department', status: 'online', avatar: '', phone: '0549811426', email: 'ileen17m@gmail.com', password: 'cue2026' }
];

const CHANNELS = [
  { id: 'general', name: 'عام - General', icon: Hash, private: false },
  { id: 'director', name: 'غرفة المخرج الخاصة', icon: Lock, private: true, code: '9090' },
  { id: 'management', name: 'قسم الإدارة', icon: Lock, private: true, code: '1010' },
  { id: 'directing', name: 'قسم الإخراج', icon: Lock, private: true, code: '2020' },
  { id: 'production', name: 'قسم الإنتاج', icon: Lock, private: true, code: '3030' },
  { id: 'art', name: 'قسم الديكور والفن (Art Dept)', icon: Lock, private: true, code: '4040' },
  { id: 'post', name: 'قسم المونتاج (Post-Prod)', icon: Lock, private: true, code: '5050' }
];

const INITIAL_TASKS = [
  { id: '1', title: 'تأكيد تصاريح التصوير في الدرعية', status: 'done', priority: 'high', assignee: 'فهد', date: '2026-11-05' },
  { id: '2', title: 'معاينة زوايا إضاءة المشهد 4 (Studio B)', status: 'in-progress', priority: 'high', assignee: 'عبدالعزيز', date: '2026-11-10' }
];

const INITIAL_CALL_SHEETS = [
  {
    id: 'cs-101',
    day: 'اليوم الأول',
    date: '2026-11-12',
    location: 'حي الطريف - الدرعية التاريخية، الرياض',
    callTime: '06:30 صباحاً',
    weather: 'مشمس 28°C',
    scenes: 'المشهد 1 (خارجي/نهار)، المشهد 2 (غروب)',
    importantNotes: 'الرجاء الحضور قبل 30 دقيقة من الوقت المحدد للمكياج والتجهيز.'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [activeChannel, setActiveChannel] = useState('general');

  const [inputMessage, setInputMessage] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [newCsDay, setNewCsDay] = useState('');
  const [newCsDate, setNewCsDate] = useState('');
  const [newCsLocation, setNewCsLocation] = useState('');
  const [newCsCallTime, setNewCsCallTime] = useState('');
  const [newCsScenes, setNewCsScenes] = useState('');
  const [newCsNotes, setNewCsNotes] = useState('');
  const [showAddCallSheet, setShowAddCallSheet] = useState(false);

  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('script');
  const [newAssetSize, setNewAssetSize] = useState('2.5 MB');
  const [showAddAsset, setShowAddAsset] = useState(false);

  const [callSheets, setCallSheets] = useState(INITIAL_CALL_SHEETS);
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const cloudData = cloudSync.loadFromCloud();
    if (cloudData) {
      if (cloudData.messages) setMessages(cloudData.messages);
      if (cloudData.tasks) setTasks(cloudData.tasks);
      if (cloudData.callSheets) setCallSheets(cloudData.callSheets);
      if (cloudData.assets) setAssets(cloudData.assets);
    }

    const unsub = cloudSync.subscribe((data) => {
      if (data.messages) setMessages(data.messages);
      if (data.tasks) setTasks(data.tasks);
      if (data.callSheets) setCallSheets(data.callSheets);
      if (data.assets) setAssets(data.assets);
    });

    return () => unsub();
  }, []);

  const updateGlobalStore = (newPartialState) => {
    const updatedState = {
      messages: newPartialState.messages !== undefined ? newPartialState.messages : messages,
      tasks: newPartialState.tasks !== undefined ? newPartialState.tasks : tasks,
      callSheets: newPartialState.callSheets !== undefined ? newPartialState.callSheets : callSheets,
      assets: newPartialState.assets !== undefined ? newPartialState.assets : assets,
      lastUpdated: Date.now()
    };
    cloudSync.saveToCloud(updatedState);
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAssetTitle.trim() || !currentUser) return;

    const newAsset = {
      id: 'asset_' + Date.now(),
      title: newAssetTitle.trim(),
      category: newAssetCategory,
      size: newAssetSize.trim() || '1.0 MB',
      updatedBy: currentUser.name.split(' ')[0],
      date: new Date().toLocaleDateString('ar-SA')
    };

    const nextAssets = [newAsset, ...assets];
    setAssets(nextAssets);
    updateGlobalStore({ assets: nextAssets });

    setNewAssetTitle('');
    setShowAddAsset(false);
  };

  const handleDeleteAsset = (assetId) => {
    const nextAssets = assets.filter((a) => a.id !== assetId);
    setAssets(nextAssets);
    updateGlobalStore({ assets: nextAssets });
  };

  const [unlockedChannels, setUnlockedChannels] = useState(['general']);
  const [passcodeModalChannel, setPasscodeModalChannel] = useState(null);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const handleSelectChannel = (channel) => {
    if (channel.private && !unlockedChannels.includes(channel.id)) {
      setPasscodeModalChannel(channel);
      setEnteredPasscode('');
      setPasscodeError('');
    } else {
      setActiveChannel(channel.id);
    }
  };

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (!passcodeModalChannel) return;
    if (enteredPasscode === passcodeModalChannel.code) {
      setUnlockedChannels((prev) => [...prev, passcodeModalChannel.id]);
      setActiveChannel(passcodeModalChannel.id);
      setPasscodeModalChannel(null);
      setEnteredPasscode('');
      setPasscodeError('');
    } else {
      setPasscodeError('رمز الدخول غير صحيح!');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentUser) return;

    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      channelId: activeChannel,
      sender: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setInputMessage('');

    const nextMsgs = [...messages, newMsg];
    setMessages(nextMsgs);
    updateGlobalStore({ messages: nextMsgs });
  };

  const handleCompleteTask = (taskId) => {
    const nextTasks = tasks.map((t) => (t.id === taskId ? { ...t, status: 'done' } : t));
    setTasks(nextTasks);
    updateGlobalStore({ tasks: nextTasks });
  };

  const handleDeleteTask = (taskId) => {
    const nextTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(nextTasks);
    updateGlobalStore({ tasks: nextTasks });
  };

  const handleAddCallSheet = (e) => {
    e.preventDefault();
    if (!newCsDay.trim() || !newCsLocation.trim()) return;

    const newCs = {
      id: 'cs_' + Date.now(),
      day: newCsDay.trim(),
      date: newCsDate.trim() || 'قريباً',
      location: newCsLocation.trim(),
      callTime: newCsCallTime.trim() || '07:00 صباحاً',
      weather: 'معتدل',
      scenes: newCsScenes.trim() || 'جميع مشاهد اليوم',
      importantNotes: newCsNotes.trim() || 'الالتزام بمواعيد التجمع والالتزام بالزي المطلوب.'
    };

    const nextCs = [newCs, ...callSheets];
    setCallSheets(nextCs);
    updateGlobalStore({ callSheets: nextCs });

    setNewCsDay('');
    setNewCsDate('');
    setNewCsLocation('');
    setNewCsCallTime('');
    setNewCsScenes('');
    setNewCsNotes('');
    setShowAddCallSheet(false);
  };

  const handleDeleteCallSheet = (csId) => {
    const nextCs = callSheets.filter((cs) => cs.id !== csId);
    setCallSheets(nextCs);
    updateGlobalStore({ callSheets: nextCs });
  };

  const currentMessages = messages.filter((m) => m.channelId === activeChannel);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !currentUser) return;

    const newTask = {
      id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 4),
      title: newTaskTitle.trim(),
      status: 'todo',
      priority: 'medium',
      assignee: currentUser.name.split(' ')[0],
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now()
    };

    setNewTaskTitle('');

    const nextTasks = [...tasks, newTask];
    setTasks(nextTasks);
    updateGlobalStore({ tasks: nextTasks });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const cleanEmail = (loginEmail || '').trim().toLowerCase();
      const foundUser = TEAM_MEMBERS.find((m) => m.email.toLowerCase() === cleanEmail);
      
      if (!foundUser) {
        setLoginError('البريد الإلكتروني غير مسجل في قائمة تيم كيو.');
        return;
      }

      if (foundUser.password !== loginPassword) {
        setLoginError('كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.');
        return;
      }

      setCurrentUser(foundUser);
    } catch (err) {
      console.error("Login Error:", err);
      setLoginError('حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 dir-rtl" dir="rtl">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold text-3xl mx-auto">
              .C
            </div>
            <h1 className="text-2xl font-bold text-amber-400">Team Cue</h1>
            <p className="text-xs text-slate-400">منصة المزامنة الحية الموحدة للفريق</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني المعتمد:</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">كلمة المرور الخاصة بك:</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10"
            >
              تسجيل الدخول إلى حسابك
            </button>
          </form>

          <div className="text-center border-t border-slate-800 pt-4">
            <p className="text-[11px] text-slate-500">
              جميع الحسابات متصلة ومزودة بمزامنة سحابية فورية
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans dir-rtl select-none overflow-hidden" dir="rtl">
      <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold text-xl">
                .C
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none text-amber-400">Team Cue</h1>
                <p className="text-[11px] text-slate-400 mt-1">المزامنة السحابية المباشرة</p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثات الفريق</span>
            </button>

            <button
              onClick={() => setActiveTab('kanban')}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'kanban' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>جدول المهام</span>
            </button>

            <button
              onClick={() => setActiveTab('callsheet')}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'callsheet' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>جدول التصوير (Call Sheet)</span>
            </button>

            <button
              onClick={() => setActiveTab('assets')}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'assets' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>الملفات والسيناريو</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'team' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>أعضاء الفريق</span>
            </button>
          </nav>
        </div>

        <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse p-2 bg-slate-900 rounded-lg border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400 truncate">{currentUser.role.split('|')[0]}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-center py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium border border-red-500/20 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
        <header className="h-14 bg-slate-900/60 border-b border-slate-800 px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3 space-x-reverse">
            <h2 className="font-bold text-slate-100 text-base">
              {activeTab === 'chat' && 'غرف التواصل والمحادثات الحية'}
              {activeTab === 'kanban' && 'إدارة المهام واللقطات'}
              {activeTab === 'callsheet' && 'أجندة يوم التصوير والمواقع'}
              {activeTab === 'assets' && 'مكتبة السيناريو والوسائط'}
              {activeTab === 'team' && 'دليل أفراد تيم كيو'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5 font-semibold">
              <Cloud className="w-3.5 h-3.5" /> الخدمة السحابية نشطة (Free Cloud Sync)
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'chat' && (
            <div className="h-full flex gap-4">
              <div className="w-64 bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">غرف محادثات الأقسام</h3>
                  <div className="space-y-1">
                    {CHANNELS.map((channel) => {
                      const isUnlocked = !channel.private || unlockedChannels.includes(channel.id);
                      const IconComponent = channel.icon || Hash;
                      return (
                        <button
                          key={channel.id}
                          onClick={() => handleSelectChannel(channel)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                            activeChannel === channel.id
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse truncate">
                            <IconComponent className={`w-3.5 h-3.5 ${channel.private && !isUnlocked ? 'text-red-400' : 'text-amber-400'}`} />
                            <span className="truncate">{channel.name}</span>
                          </div>
                          {channel.private && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {isUnlocked ? 'مفتوح' : 'مشفر'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden relative">
                <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Hash className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-slate-200">
                      {CHANNELS.find((c) => c.id === activeChannel)?.name}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {currentMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                      لا يوجد رسائل بعد في غرفة هذا القسم. اكتب رسالة لترسلها لأعضاء الفريق مباشرة!
                    </div>
                  ) : (
                    currentMessages.map((msg) => (
                      <div key={msg.id} className="flex flex-col bg-slate-950/60 border border-slate-800/80 p-3 rounded-lg max-w-xl">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                              {msg.sender.charAt(0)}
                            </span>
                            <span className="text-xs font-bold text-amber-400">{msg.sender}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">{msg.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`أرسل رسالة فورية إلى ${CHANNELS.find((c) => c.id === activeChannel)?.name}...`}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال</span>
                  </button>
                </form>

                {passcodeModalChannel && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-base">غرفة قسم مشفرة</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          أدخل رمز الحماية (Passcode) الخاص بـ <span className="text-amber-400 font-bold">{passcodeModalChannel.name}</span> للدخول:
                        </p>
                      </div>

                      <form onSubmit={handleVerifyPasscode} className="space-y-3">
                        <input
                          type="password"
                          maxLength={6}
                          value={enteredPasscode}
                          onChange={(e) => setEnteredPasscode(e.target.value)}
                          placeholder="أدخل الرمز السرّي..."
                          className="w-full text-center tracking-widest text-lg font-mono bg-slate-950 border border-slate-700 text-slate-100 rounded-xl py-2.5 focus:outline-none focus:border-amber-500"
                        />

                        {passcodeError && (
                          <p className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">{passcodeError}</p>
                        )}

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setPasscodeModalChannel(null)}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-bold transition-colors"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2 rounded-xl text-xs font-bold transition-colors"
                          >
                            تأكيد الرمز
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'kanban' && (
            <div className="space-y-4">
              <form onSubmit={handleAddTask} className="flex gap-2 bg-slate-900 p-3 border border-slate-800 rounded-xl max-w-lg">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="أضف مهمة جديدة للفريق سحابياً..."
                  className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> إضافة مهمة
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { key: 'todo', label: 'قيد الانتظار (To Do)', color: 'border-slate-700' },
                  { key: 'in-progress', label: 'قيد التنفيذ (In Progress)', color: 'border-amber-500' },
                  { key: 'review', label: 'مراجعة المخرج (Review)', color: 'border-blue-500' },
                  { key: 'done', label: 'مكتمل (Done)', color: 'border-emerald-500' }
                ].map((col) => (
                  <div key={col.key} className={`bg-slate-900 border-t-2 ${col.color} border-slate-800 rounded-xl p-3 flex flex-col min-h-[400px]`}>
                    <h3 className="text-xs font-bold text-slate-300 mb-3 flex justify-between items-center">
                      <span>{col.label}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                        {tasks.filter((t) => t.status === col.key).length}
                      </span>
                    </h3>
                    <div className="space-y-2 flex-1">
                      {tasks
                        .filter((t) => t.status === col.key)
                        .map((task) => (
                          <div key={task.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg shadow-sm space-y-2">
                            <h4 className="text-xs font-semibold text-slate-200">{task.title}</h4>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                              <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-400">{task.assignee}</span>
                              <div className="flex items-center gap-1">
                                {task.status !== 'done' && (
                                  <button
                                    onClick={() => handleCompleteTask(task.id)}
                                    title="إتمام المهمة"
                                    className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded transition-colors"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  title="حذف المهمة"
                                  className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'callsheet' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-200">أجندة أيام التصوير الحالية</h3>
                <button
                  onClick={() => setShowAddCallSheet(!showAddCallSheet)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> {showAddCallSheet ? 'إغلاق النموذج' : 'إضافة يوم تصوير جديد'}
                </button>
              </div>

              {showAddCallSheet && (
                <form onSubmit={handleAddCallSheet} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-amber-400">إضافة جدول يوم تصوير جديد (Call Sheet)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">عنوان اليوم:</label>
                      <input
                        type="text"
                        required
                        value={newCsDay}
                        onChange={(e) => setNewCsDay(e.target.value)}
                        placeholder="اليوم الأول / الثاني..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">التاريخ:</label>
                      <input
                        type="date"
                        value={newCsDate}
                        onChange={(e) => setNewCsDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">موقع التصوير (Location):</label>
                      <input
                        type="text"
                        required
                        value={newCsLocation}
                        onChange={(e) => setNewCsLocation(e.target.value)}
                        placeholder="الدرعية / استديو..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">وقت التجمع (Call Time):</label>
                      <input
                        type="text"
                        value={newCsCallTime}
                        onChange={(e) => setNewCsCallTime(e.target.value)}
                        placeholder="06:30 صباحاً"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-slate-400 mb-1">المشاهد المستهدفة:</label>
                    <input
                      type="text"
                      value={newCsScenes}
                      onChange={(e) => setNewCsScenes(e.target.value)}
                      placeholder="المشهد 1، المشهد 3 (خارجي/ليل)"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block text-slate-400 mb-1">ملاحظات وتعليمات هامّة:</label>
                    <textarea
                      value={newCsNotes}
                      onChange={(e) => setNewCsNotes(e.target.value)}
                      placeholder="تعليمات الملابس، الحضور، الإحداثيات..."
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    حفظ ونشر جدول التصوير
                  </button>
                </form>
              )}

              {callSheets.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                  لا يوجد جدول تصوير مضاف حالياً. يمكنك إضافة يوم جديد بالضغط على "إضافة يوم تصوير جديد".
                </div>
              ) : (
                callSheets.map((cs) => (
                  <div key={cs.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 relative">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs text-amber-500 font-bold">{cs.day}</span>
                        <h3 className="text-xl font-bold text-slate-100">{cs.date}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold">
                          {cs.weather}
                        </span>
                        <button
                          onClick={() => handleDeleteCallSheet(cs.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 text-xs transition-colors flex items-center gap-1"
                          title="حذف هذا اليوم"
                        >
                          <X className="w-4 h-4" /> حذف
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <div>
                          <div className="text-slate-400">موقع التصوير:</div>
                          <div className="font-bold text-slate-200">{cs.location}</div>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <div>
                          <div className="text-slate-400">وقت التجمع (Call Time):</div>
                          <div className="font-bold text-amber-400 text-sm">{cs.callTime}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-300 mb-1">المشاهد المستهدفة:</h4>
                      <p className="text-xs text-slate-400">{cs.scenes}</p>
                    </div>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300">
                      <strong>ملاحظة هامة:</strong> {cs.importantNotes}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-200">مكتبة ملفات السيناريو والوسائط</h3>
                <button
                  onClick={() => setShowAddAsset(!showAddAsset)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> {showAddAsset ? 'إغلاق النموذج' : 'إضافة ملف سيناريو أو مستند'}
                </button>
              </div>

              {showAddAsset && (
                <form onSubmit={handleAddAsset} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-amber-400">رفع وإضافة ملف جديد للمكتبة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 mb-1">اسم الملف / المستند:</label>
                      <input
                        type="text"
                        required
                        value={newAssetTitle}
                        onChange={(e) => setNewAssetTitle(e.target.value)}
                        placeholder="مثال: السيناريو النهائي - الحلقة 1.pdf"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">نوع المستند:</label>
                      <select
                        value={newAssetCategory}
                        onChange={(e) => setNewAssetCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="script">سيناريو (Script)</option>
                        <option value="moodboard">لوحة إلهام (Moodboard)</option>
                        <option value="tech">مخطط تقني / كاميرات</option>
                        <option value="other">مستند عام</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    إضافة الملف لمكتبة الفريق
                  </button>
                </form>
              )}

              {assets.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                  لا يوجد ملفات أو سيناريوهات حالياً. اضغط على "إضافة ملف سيناريو أو مستند" لرفع ملف جديد.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative">
                      <div className="flex items-start justify-between">
                        <FileText className="w-8 h-8 text-amber-400" />
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {asset.size}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 mb-1">{asset.title}</h4>
                        <p className="text-[11px] text-slate-400">بواسطة: {asset.updatedBy} ({asset.date})</p>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> معاينة
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                          title="حذف الملف"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-200">{member.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                        <span>{member.status === 'online' ? 'متواجد الآن' : 'غير متصل'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-3.5 h-3.5 text-amber-500" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-3.5 h-3.5 text-amber-500" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}