import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// --- (1) إعدادات Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyYourApiKeyHere",
  authDomain: "team-cue.firebaseapp.com",
  projectId: "team-cue",
  storageBucket: "team-cue.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function TeamCueApp() {
  const [currentView, setCurrentView] = useState('activeProjects'); // 'activeProjects' | 'archive' | 'productionDirs' | 'calendar' | 'managementBudget'
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTabInProject, setActiveTabInProject] = useState('script');

  // قاعدة بيانات المشاريع
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "المعزوفة (نسخة تجريبية)",
      status: "active",
      script: "نص السيناريو الكامل للمشهد الأول والثاني...",
      storyboard: ["إطار 1", "إطار 2"],
      shotList: [{ id: 1, scene: 1, angle: "Wide", lens: "35mm", status: "مكتمل" }],
      callSheets: [{ id: 1, date: "2026-11-15", location: "الرياض - استديو أ", time: "06:00 AM" }],
      projectCast: ["خالد بن سلطان", "شهد عبد العزيز"],
      departmentBudgets: { directing: 5000, art: 7000, lighting: 3000 },
      invoices: [{ id: 1, dept: "الديكور", amount: 1200, desc: "شراء أخشاب ديكور 1980" }]
    }
  ]);

  // قوائم الإنتاج العامة (مع إمكانية الإضافة والتعديل والحذف)
  const [productionDirectories, setProductionDirectories] = useState({
    actors: [
      { id: 1, name: "خالد بن سلطان", phone: "0500000000", notes: "جيد في الأدوار الدرامية" },
      { id: 2, name: "شهد عبد العزيز", phone: "0511111111", notes: "خبرة في الأفلام القصيرة" }
    ],
    companies: [{ id: 1, name: "شركة الإنتاج الفني الأولى", contact: "info@prod.com" }],
    cinematographers: [{ id: 1, name: "مصور 1", camera: "Arri Alexa Mini" }],
    lightingTeam: [{ id: 1, name: "تيم الإضاءة الرئيسي", lead: "مسؤول الإضاءة" }]
  });

  // حالات الإدخال المؤقتة للإضافة
  const [newActorName, setNewActorName] = useState('');
  const [newActorPhone, setNewActorPhone] = useState('');
  const [newActorNotes, setNewActorNotes] = useState('');
  
  const [newShotScene, setNewShotScene] = useState('');
  const [newShotAngle, setNewShotAngle] = useState('');
  const [newShotLens, setNewShotLens] = useState('');

  const [newCsDate, setNewCsDate] = useState('');
  const [newCsLoc, setNewCsLoc] = useState('');
  const [newCsTime, setNewCsTime] = useState('');

  const [newInvDept, setNewInvDept] = useState('');
  const [newInvDesc, setNewInvDesc] = useState('');
  const [newInvAmount, setNewInvAmount] = useState('');

  // ميزانية الإدارة الحصرية
  const [managementBudget] = useState({
    totalBudget: 150000,
    totalExpenses: 45000,
    netProfit: 105000
  });

  const [calendarViewMode, setCalendarViewMode] = useState('monthly');

  // --- دوال التحكم والإضافة والتعديل والحذف ---

  // 1. إضافة ممثل للقائمة العامة
  const handleAddActor = (e) => {
    e.preventDefault();
    if (!newActorName) return;
    const newItem = {
      id: Date.now(),
      name: newActorName,
      phone: newActorPhone || 'غير محدد',
      notes: newActorNotes || ''
    };
    setProductionDirectories({
      ...productionDirectories,
      actors: [...productionDirectories.actors, newItem]
    });
    setNewActorName('');
    setNewActorPhone('');
    setNewActorNotes('');
  };

  // حذف ممثل من القائمة العامة
  const handleDeleteActor = (id) => {
    setProductionDirectories({
      ...productionDirectories,
      actors: productionDirectories.actors.filter(a => a.id !== id)
    });
  };

  // 2. إضافة لقطة جديدة داخل مجلد العمل (Shot List)
  const handleAddShot = (e) => {
    e.preventDefault();
    if (!newShotScene) return;
    const updatedShotList = [...selectedProject.shotList, {
      id: Date.now(),
      scene: newShotScene,
      angle: newShotAngle || 'Wide',
      lens: newShotLens || '50mm',
      status: 'قيد العمل'
    }];
    const updatedProj = { ...selectedProject, shotList: updatedShotList };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
    setNewShotScene('');
    setNewShotAngle('');
    setNewShotLens('');
  };

  const handleDeleteShot = (shotId) => {
    const updatedShotList = selectedProject.shotList.filter(s => s.id !== shotId);
    const updatedProj = { ...selectedProject, shotList: updatedShotList };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
  };

  // 3. إضافة كول شيت داخل العمل
  const handleAddCallSheet = (e) => {
    e.preventDefault();
    if (!newCsLoc) return;
    const updatedCS = [...selectedProject.callSheets, {
      id: Date.now(),
      date: newCsDate || '2026-11-20',
      location: newCsLoc,
      time: newCsTime || '07:00 AM'
    }];
    const updatedProj = { ...selectedProject, callSheets: updatedCS };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
    setNewCsLoc('');
    setNewCsDate('');
    setNewCsTime('');
  };

  const handleDeleteCallSheet = (csId) => {
    const updatedCS = selectedProject.callSheets.filter(c => c.id !== csId);
    const updatedProj = { ...selectedProject, callSheets: updatedCS };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
  };

  // 4. إضافة فاتورة داخل العمل
  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!newInvDesc || !newInvAmount) return;
    const updatedInvoices = [...selectedProject.invoices, {
      id: Date.now(),
      dept: newInvDept || 'عام',
      desc: newInvDesc,
      amount: parseFloat(newInvAmount)
    }];
    const updatedProj = { ...selectedProject, invoices: updatedInvoices };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
    setNewInvDept('');
    setNewInvDesc('');
    setNewInvAmount('');
  };

  const handleDeleteInvoice = (invId) => {
    const updatedInvoices = selectedProject.invoices.filter(i => i.id !== invId);
    const updatedProj = { ...selectedProject, invoices: updatedInvoices };
    setSelectedProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans" dir="rtl">
      {/* الشريط العلوي */}
      <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-6 space-x-reverse">
          <h1 className="text-xl font-bold tracking-wider text-amber-500">.CUE Workspace</h1>
          <nav className="flex space-x-2 space-x-reverse text-sm">
            <button 
              onClick={() => { setSelectedProject(null); setCurrentView('activeProjects'); }}
              className={`px-3 py-1.5 rounded-lg transition ${currentView === 'activeProjects' && !selectedProject ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              الأعمال القائمة
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setCurrentView('archive'); }}
              className={`px-3 py-1.5 rounded-lg transition ${currentView === 'archive' && !selectedProject ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              مكتبة الأعمال
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setCurrentView('productionDirs'); }}
              className={`px-3 py-1.5 rounded-lg transition ${currentView === 'productionDirs' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              قوائم الإنتاج العامة
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setCurrentView('calendar'); }}
              className={`px-3 py-1.5 rounded-lg transition ${currentView === 'calendar' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              التقويم المطور
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setCurrentView('managementBudget'); }}
              className={`px-3 py-1.5 rounded-lg transition ${currentView === 'managementBudget' ? 'bg-red-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              ميزانية الإدارة (خاص)
            </button>
          </nav>
        </div>
        <div className="text-sm text-gray-400">
          المخرج: <span className="text-white font-semibold">فهد السعود</span>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-6 max-w-7xl mx-auto">
        
        {/* عرض مجلد العمل الشامل عند تحديده */}
        {selectedProject ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-sm text-amber-500 hover:underline mb-2 block"
                >
                  ← العودة للقائمة الرئيسية
                </button>
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              </div>
              <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30">
                مجلد العمل الشامل
              </span>
            </div>

            {/* التبويبات الداخلية */}
            <div className="flex space-x-2 space-x-reverse border-b border-gray-800 pb-3 mb-6 text-sm overflow-x-auto">
              {[
                { id: 'script', label: 'السيناريو' },
                { id: 'storyboard', label: 'الستوري بورد' },
                { id: 'shotList', label: 'الشوت ليست' },
                { id: 'callSheet', label: 'الكول شيت' },
                { id: 'castCrew', label: 'الممثلين وطاقم العمل' },
                { id: 'budget', label: 'الميزانية' },
                { id: 'artDept', label: 'قسم الديكور والفن' },
                { id: 'invoices', label: 'الفواتير والمصاريف' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabInProject(tab.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${activeTabInProject === tab.id ? 'bg-amber-600 text-white font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 min-h-[350px]">
              
              {/* تبويب السيناريو */}
              {activeTabInProject === 'script' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">سيناريو العمل</h3>
                  <textarea 
                    className="w-full h-48 bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
                    defaultValue={selectedProject.script}
                  />
                </div>
              )}

              {/* تبويب الستوري بورد */}
              {activeTabInProject === 'storyboard' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">لوحة القصة (Storyboard)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.storyboard.map((sb, idx) => (
                      <div key={idx} className="bg-gray-900 h-32 rounded-lg border border-gray-800 flex items-center justify-center text-gray-400 text-sm">
                        {sb}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* تبويب الشوت ليست (مع الإضافة والحذف) */}
              {activeTabInProject === 'shotList' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">قائمة اللقطات (Shot List)</h3>
                  <form onSubmit={handleAddShot} className="flex gap-2 mb-6 bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <input type="text" placeholder="رقم المشهد" value={newShotScene} onChange={e => setNewShotScene(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/4 text-white" />
                    <input type="text" placeholder="زاوية الكاميرا (Wide, Close...)" value={newShotAngle} onChange={e => setNewShotAngle(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/3 text-white" />
                    <input type="text" placeholder="العدسة (35mm...)" value={newShotLens} onChange={e => setNewShotLens(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/4 text-white" />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-sm font-medium">إضافة لقطة</button>
                  </form>
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="pb-2">المشهد</th>
                        <th className="pb-2">الزاوية</th>
                        <th className="pb-2">العدسة</th>
                        <th className="pb-2">الحالة</th>
                        <th className="pb-2">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.shotList.map(shot => (
                        <tr key={shot.id} className="border-b border-gray-900">
                          <td className="py-2">مشهد #{shot.scene}</td>
                          <td className="py-2">{shot.angle}</td>
                          <td className="py-2">{shot.lens}</td>
                          <td className="py-2"><span className="text-green-400 bg-green-950/50 px-2 py-0.5 rounded text-xs">{shot.status}</span></td>
                          <td className="py-2">
                            <button onClick={() => handleDeleteShot(shot.id)} className="text-red-400 hover:text-red-300 text-xs bg-red-950/40 px-2 py-1 rounded">حذف</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* تبويب الكول شيت (مع الإضافة والحذف) */}
              {activeTabInProject === 'callSheet' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">جدول الحضور اليومي (Call Sheet)</h3>
                  <form onSubmit={handleAddCallSheet} className="flex gap-2 mb-6 bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <input type="date" value={newCsDate} onChange={e => setNewCsDate(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm text-white" />
                    <input type="text" placeholder="موقع التصوير" value={newCsLoc} onChange={e => setNewCsLoc(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm flex-1 text-white" />
                    <input type="text" placeholder="وقت الحضور" value={newCsTime} onChange={e => setNewCsTime(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm text-white" />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-sm font-medium">إضافة كول شيت</button>
                  </form>
                  <div className="space-y-3">
                    {selectedProject.callSheets.map(cs => (
                      <div key={cs.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                        <div>
                          <p className="font-medium">الموقع: {cs.location}</p>
                          <p className="text-xs text-gray-400">التاريخ: {cs.date} | الوقت: {cs.time}</p>
                        </div>
                        <button onClick={() => handleDeleteCallSheet(cs.id)} className="text-red-400 bg-red-950/40 px-3 py-1 rounded text-xs">حذف</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* تبويب الممثلين وطاقم العمل */}
              {activeTabInProject === 'castCrew' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">طاقم وممثلو العمل</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.projectCast.map((actor, idx) => (
                      <span key={idx} className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* تبويب الميزانية */}
              {activeTabInProject === 'budget' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">ميزانية أقسام العمل</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">الإخراج</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.directing} ر.س</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">الديكور (الفن)</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.art} ر.س</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">الإضاءة</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.lighting} ر.س</p>
                    </div>
                  </div>
                </div>
              )}

              {/* تبويب قسم الديكور والفن */}
              {activeTabInProject === 'artDept' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-amber-400">قسم الديكور والفن (Art Department)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-sm text-gray-300 mb-2">تريتمنت الارت (Art Treatment)</h4>
                      <p className="text-xs text-gray-500">رفع وإدارة رؤية المخرج الفني والألوان.</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-sm text-gray-300 mb-2">تفريغ الارت (Art Breakdown)</h4>
                      <p className="text-xs text-gray-500">حصر الإكسسوارات لكل مشهد.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* تبويب الفواتير (مع الإضافة والمسح) */}
              {activeTabInProject === 'invoices' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">فواتير ومصاريف العمل</h3>
                  <form onSubmit={handleAddInvoice} className="flex gap-2 mb-6 bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <input type="text" placeholder="القسم (ديكور، إخراج...)" value={newInvDept} onChange={e => setNewInvDept(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/4 text-white" />
                    <input type="text" placeholder="وصف المصروف" value={newInvDesc} onChange={e => setNewInvDesc(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm flex-1 text-white" />
                    <input type="number" placeholder="المبلغ" value={newInvAmount} onChange={e => setNewInvAmount(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/4 text-white" />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-sm font-medium">إضافة فاتورة</button>
                  </form>
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="pb-2">القسم</th>
                        <th className="pb-2">الوصف</th>
                        <th className="pb-2">المبلغ</th>
                        <th className="pb-2">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.invoices.map(inv => (
                        <tr key={inv.id} className="border-b border-gray-900">
                          <td className="py-2">{inv.dept}</td>
                          <td className="py-2">{inv.desc}</td>
                          <td className="py-2 text-amber-400 font-bold">{inv.amount} ر.س</td>
                          <td className="py-2">
                            <button onClick={() => handleDeleteInvoice(inv.id)} className="text-red-400 bg-red-950/40 px-2 py-1 rounded text-xs">حذف</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        ) : (

          /* الشاشات الرئيسية الأخرى */
          <>
            {currentView === 'activeProjects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">الأعمال القائمة (Active Projects)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.filter(p => p.status === 'active').map(proj => (
                    <div 
                      key={proj.id} 
                      onClick={() => setSelectedProject(proj)}
                      className="bg-gray-900 border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-amber-500 transition shadow-lg"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">اضغط لفتح مجلد العمل الشامل (سيناريو، كول شيت، شوت ليست، فواتير).</p>
                      <div className="flex justify-between text-xs text-gray-500 border-t border-gray-800 pt-3">
                        <span>اللقطات: {proj.shotList.length}</span>
                        <span>الحالة: جارِ العمل</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'archive' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">مكتبة الأعمال (الأرشيف)</h2>
                <p className="text-gray-400 text-sm">الأعمال المكتملة والمنتهية لحفظ التاريخ الفني لفريق .Cue.</p>
              </div>
            )}

            {/* قوائم الإنتاج العامة (مع إضافة وحذف الممثلين) */}
            {currentView === 'productionDirs' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">قوائم إدارة الإنتاج العامة</h2>
                
                {/* قسم الممثليين مع نموذج الإضافة والحذف */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
                  <h3 className="font-semibold text-amber-400 mb-4">قائمة الممثلين العامة (إضافة وتعديل وحذف)</h3>
                  <form onSubmit={handleAddActor} className="flex gap-2 mb-4">
                    <input type="text" placeholder="اسم الممثل" value={newActorName} onChange={e => setNewActorName(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm flex-1 text-white" />
                    <input type="text" placeholder="رقم الجوال" value={newActorPhone} onChange={e => setNewActorPhone(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm w-1/4 text-white" />
                    <input type="text" placeholder="ملاحظات / نوع الأدوار" value={newActorNotes} onChange={e => setNewActorNotes(e.target.value)} className="bg-gray-950 border border-gray-800 px-3 py-2 rounded text-sm flex-1 text-white" />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-sm font-medium">إضافة ممثل</button>
                  </form>
                  <div className="space-y-2">
                    {productionDirectories.actors.map(actor => (
                      <div key={actor.id} className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex justify-between items-center text-sm">
                        <div>
                          <span className="font-bold text-white">{actor.name}</span> - <span className="text-gray-400">{actor.phone}</span>
                          <p className="text-xs text-gray-500 mt-1">{actor.notes}</p>
                        </div>
                        <button onClick={() => handleDeleteActor(actor.id)} className="text-red-400 bg-red-950/40 px-3 py-1 rounded text-xs">حذف</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentView === 'calendar' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">التقويم المطور</h2>
                  <div className="flex space-x-2 space-x-reverse text-xs">
                    <button onClick={() => setCalendarViewMode('monthly')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'monthly' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>عرض شهري</button>
                    <button onClick={() => setCalendarViewMode('weekly')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'weekly' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>عرض أسبوعي</button>
                    <button onClick={() => setCalendarViewMode('timeline')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'timeline' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>جدول التصوير</button>
                  </div>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400">
                  التقويم متصل بمواعيد الكول شيت وجداول الأعمال (العرض الحالي: {calendarViewMode}).
                </div>
              </div>
            )}

            {currentView === 'managementBudget' && (
              <div className="bg-gray-900 p-6 rounded-xl border border-red-900/50">
                <h2 className="text-xl font-bold text-white mb-2 text-red-500">ميزانية ومصروفات الإدارة العامة (خاص)</h2>
                <p className="text-xs text-gray-400 mb-6">هذا القسم مرئي حصرياً للإدارة العليا لفهد الفريق.</p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">الميزانية الكلية</p>
                    <p className="text-2xl font-bold text-white">{managementBudget.totalBudget} ر.س</p>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">المصروفات</p>
                    <p className="text-2xl font-bold text-red-400">{managementBudget.totalExpenses} ر.س</p>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">صافي الأرباح</p>
                    <p className="text-2xl font-bold text-green-400">{managementBudget.netProfit} ر.س</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}
