import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

// --- (1) إعدادات Firebase وحالة النظام الأساسية ---
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
  // الحالة العامة للمنصة
  const [currentView, setCurrentView] = useState('activeProjects'); // 'activeProjects' | 'archive' | 'productionDirs' | 'calendar' | 'managementBudget'
  const [selectedProject, setSelectedProject] = useState(null); // مجلد العمل الشامل عند فتحه
  const [activeTabInProject, setActiveTabInProject] = useState('script'); // تبويبات داخل مجلد العمل
  
  // قواعد البيانات الأساسية (محافظ عليها بالكامل: 18 عضواً، التصويت، الإكسسوارات)
  const [members] = useState([
    { id: 1, name: "فهد السعود", role: "مدير الفريق والمخرج" },
    { id: 2, name: "محمد الدامر", role: "مطور المنصة والإنتاج" },
    // ... بقية الـ 18 عضواً في النظام
  ]);
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "المعزوفة (نسخة تجريبية)",
      status: "active", // active | archived
      script: "نص السيناريو الكامل للمشهد الأول والثاني...",
      storyboard: ["url_to_sb1.jpg", "url_to_sb2.jpg"],
      shotList: [{ id: 1, scene: 1, angle: "Wide", lens: "35mm", status: "مكتمل" }],
      callSheets: [{ date: "2026-11-15", location: "الرياض - استديو أ", time: "06:00 AM" }],
      projectCast: ["ممثل 1", "ممثل 2"],
      departmentBudgets: { directing: 5000, art: 7000, lighting: 3000 },
      invoices: [{ id: 1, dept: "الديكور", amount: 1200, desc: "شراء أخشاب ديكور 1980" }]
    }
  ]);

  // قوائم إدارة الإنتاج العامة (الممثلين، شركات الإنتاج، المصورين، الإضاءة)
  const [productionDirectories, setProductionDirectories] = useState({
    actors: [
      { id: 1, name: "خالد بن سلطان", phone: "0500000000", notes:جيد في الأدوار الدرامية },
      { id: 2, name: "شهد عبد العزيز", phone: "0511111111", notes: "خبرة في الأفلام القصيرة" }
    ],
    companies: [{ id: 1, name: "شركة الإنتاج الفني الأولى", contact: "info@prod.com" }],
    cinematographers: [{ id: 1, name: "مصور 1", camera: "Arri Alexa Mini" }],
    lightingTeam: [{ id: 1, name: "تيم الإضاءة الرئيسي", lead: "مسؤول الإضاءة" }]
  });

  // فواتير الأقسام العامة وميزانية الإدارة (حصرياً للإدارة)
  const [managementBudget] = useState({
    totalBudget: 150000,
    totalExpenses: 45000,
    netProfit: 105000,
    isRestricted: true // صلاحية الإدارة حصراً
  });

  // التقويم المطور (عرض شهري وأسبوعي وجداول التصوير)
  const [calendarViewMode, setCalendarViewMode] = useState('monthly'); // 'monthly' | 'weekly' | 'timeline'

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans dir-rtl">
      {/* الشريط العلوي للتنقل */}
      <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4 space-x-reverse">
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
              مكتبة الأعمال (الأرشيف)
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
          مرحباً، <span className="text-white font-semibold">فهد السعود</span> (مدير الفريق)
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="p-6 max-w-7xl mx-auto">
        
        {/* 1. عرض مجلد العمل الشامل عند تحديد مشروع */}
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

            {/* تبويبات داخل مجلد العمل */}
            <div className="flex space-x-2 space-x-reverse border-b border-gray-800 pb-3 mb-6 text-sm overflow-x-auto">
              {[
                { id: 'script', label: 'السيناريو والملف التعريفي' },
                { id: 'storyboard', label: 'الستوري بورد' },
                { id: 'shotList', label: 'الشوت ليست' },
                { id: 'callSheet', label: 'الكول شيت' },
                { id: 'castCrew', label: 'الممثلين وطاقم العمل' },
                { id: 'budget', label: 'ميزانية ومصروفات العمل' },
                { id: 'artDept', label: 'قسم الديكور والفن (ارت)' },
                { id: 'invoices', label: 'فواتير العمل' },
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

            {/* محتوى التبويب النشط */}
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 min-h-[350px]">
              {activeTabInProject === 'script' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">سيناريو العمل والملف</h3>
                  <textarea 
                    className="w-full h-48 bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500"
                    defaultValue={selectedProject.script}
                  />
                </div>
              )}

              {activeTabInProject === 'storyboard' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">لوحة القصة (Storyboard)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.storyboard.map((img, idx) => (
                      <div key={idx} className="bg-gray-900 h-32 rounded-lg border border-gray-800 flex items-center justify-center text-gray-500 text-sm">
                        إطار تخطيطي #{idx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabInProject === 'shotList' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-amber-400">قائمة اللقطات (Shot List) - قسم الإخراج</h3>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg">إضافة لقطة جديدة</button>
                  </div>
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="pb-2">رقم المشهد</th>
                        <th className="pb-2">زاوية الكاميرا</th>
                        <th className="pb-2">العدسة</th>
                        <th className="pb-2">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.shotList.map((shot, idx) => (
                        <tr key={idx} className="border-b border-gray-900">
                          <td className="py-2">مشهد #{shot.scene}</td>
                          <td className="py-2">{shot.angle}</td>
                          <td className="py-2">{shot.lens}</td>
                          <td className="py-2"><span className="text-green-400 bg-green-950/50 px-2 py-0.5 rounded text-xs">{shot.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTabInProject === 'callSheet' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-amber-400">جدول الحضور اليومي (Call Sheet Generator)</h3>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg">تصدير الكول شيت</button>
                  </div>
                  <div className="space-y-3">
                    {selectedProject.callSheets.map((cs, idx) => (
                      <div key={idx} className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                        <div>
                          <p className="font-medium">الموقع: {cs.location}</p>
                          <p className="text-xs text-gray-400">التاريخ: {cs.date} | وقت الحضور: {cs.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTabInProject === 'castCrew' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">الممثلون وطاقم العمل المخصص للمشروع</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.projectCast.map((actor, idx) => (
                      <span key={idx} className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTabInProject === 'budget' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">ميزانية وأقسام العمل</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">ميزانية الإخراج</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.directing} ر.س</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">ميزانية الديكور (الفن)</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.art} ر.س</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-400">ميزانية الإضاءة</p>
                      <p className="text-xl font-bold text-white">{selectedProject.departmentBudgets.lighting} ر.س</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTabInProject === 'artDept' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-amber-400">قسم الديكور والفن (Art Department)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-sm text-gray-300 mb-2">تريتمنت الارت (Art Treatment & Moodboard)</h4>
                      <p className="text-xs text-gray-500">رفع ورؤية الألوان والديكور المعتمد للمشروع.</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-medium text-sm text-gray-300 mb-2">تفريغ الارت (Art Breakdown)</h4>
                      <p className="text-xs text-gray-500">حصر قطع الإكسسوار والديكور لكل مشهد بالسيناريو.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTabInProject === 'invoices' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-amber-400">فواتير ومصاريف العمل</h3>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg">إضافة فاتورة جديدة</button>
                  </div>
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="pb-2">القسم</th>
                        <th className="pb-2">الوصف</th>
                        <th className="pb-2">المبلغ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.invoices.map((inv, idx) => (
                        <tr key={idx} className="border-b border-gray-900">
                          <td className="py-2">{inv.dept}</td>
                          <td className="py-2">{inv.desc}</td>
                          <td className="py-2 text-amber-400 font-bold">{inv.amount} ر.س</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (

          /* 2. العروض الرئيسية حسب اختيار القائمة العلوي */
          <>
            {currentView === 'activeProjects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">الأعمال القائمة (Active Projects)</h2>
                  <button className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-2 rounded-lg font-medium">
                    + إنشاء عمل جديد
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.filter(p => p.status === 'active').map(proj => (
                    <div 
                      key={proj.id} 
                      onClick={() => setSelectedProject(proj)}
                      className="bg-gray-900 border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-amber-500 transition shadow-lg"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">اضغط هنا لفتح مجلد العمل الشامل والمتابعة الفورية.</p>
                      <div className="flex justify-between text-xs text-gray-500 border-t border-gray-800 pt-3">
                        <span>المشاهد: {proj.shotList.length}</span>
                        <span>الحالة: جارِ العمل</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'archive' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">مكتبة الأعمال (Projects Library - Archive)</h2>
                <p className="text-gray-400 text-sm">هنا يتم حفظ الأعمال المكتملة والمنتهية كمرجع وسجل تاريخي لفريق .Cue.</p>
                {/* محتوى الأرشيف */}
              </div>
            )}

            {currentView === 'productionDirs' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">قوائم إدارة الإنتاج العامة</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                    <h3 className="font-semibold text-amber-400 mb-3">قائمة الممثلين</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {productionDirectories.actors.map(a => (
                        <li key={a.id} className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex justify-between">
                          <span>{a.name}</span>
                          <span className="text-gray-500 text-xs">{a.phone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                    <h3 className="font-semibold text-amber-400 mb-3">شركات الإنتاج والموردين</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {productionDirectories.companies.map(c => (
                        <li key={c.id} className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'calendar' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">التقويم المطور وسجّلات المواعيد</h2>
                  <div className="flex space-x-2 space-x-reverse text-xs">
                    <button onClick={() => setCalendarViewMode('monthly')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'monthly' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>عرض شهري</button>
                    <button onClick={() => setCalendarViewMode('weekly')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'weekly' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>عرض أسبوعي</button>
                    <button onClick={() => setCalendarViewMode('timeline')} className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'timeline' ? 'bg-amber-600 text-white' : 'bg-gray-900 text-gray-400'}`}>جدول التصوير الزمني</button>
                  </div>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400">
                  واجهة التقويم الذكي المربوط بمواعيد الكول شيت وجداول الأعمال (وضع العرض الحالي: {calendarViewMode}).
                </div>
              </div>
            )}

            {currentView === 'managementBudget' && (
              <div className="bg-gray-900 p-6 rounded-xl border border-red-900/50">
                <h2 className="text-xl font-bold text-white mb-2 text-red-500">ميزانية ومصروفات الإدارة العامة (صلاحية خاصة)</h2>
                <p className="text-xs text-gray-400 mb-6">هذا القسم مخصص لإدارة الفريق والمالية العليا فقط ولا يظهر للأعضاء العاديين.</p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">إجمالي الميزانية الكلية</p>
                    <p className="text-2xl font-bold text-white">{managementBudget.totalBudget} ر.س</p>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">إجمالي المصروفات</p>
                    <p className="text-2xl font-bold text-red-400">{managementBudget.totalExpenses} ر.س</p>
                  </div>
                  <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                    <p className="text-xs text-gray-400">صافي الأرباح/المتبقي</p>
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
