import React, { useState, useEffect } from 'react';
import teamLogo from './logo.png.png';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
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
  FileText,
  Trash2,
  Paperclip,
  ArrowRight,
  Video,
  Link as LinkIcon,
  FolderPlus,
  KeyRound,
  RotateCcw,
  MessageCircle,
  UserPlus,
  Calendar as CalendarIcon,
  UserMinus,
  Menu,
  BellRing,
  BarChart2,
  Image as ImageIcon,
  Shield,
  Edit3,
  Camera,
  DollarSign,
  Box,
  CheckCircle2,
  Navigation,
  CheckSquare,
  Briefcase
} from 'lucide-react';

const TEAM_LOGO_URL = teamLogo;
const DEFAULT_PASSWORD = 'cue2026';
const TEAM_INVITE_CODE = 'CUE2026';

const firebaseConfig = {
  apiKey: "AIzaSyB4oVmgfNYFTxhajHnmtBtGXCPE80wTdEI",
  authDomain: "team-cue.firebaseapp.com",
  projectId: "team-cue",
  storageBucket: "team-cue.firebasestorage.app",
  messagingSenderId: "440352265117",
  appId: "1:440352265117:web:5c7844a2af2e430ab19574"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const workspaceDocRef = doc(db, 'workspaces', 'team_cue_main');

const INITIAL_TEAM_MEMBERS = [
  { id: 'fahad', name: 'فهد سليمان السعود', role: 'Founder | Management Team | Head of Art Department', status: 'online', avatar: '', phone: '0541105416', email: 'fahadgg08@gmail.com' },
  { id: 'rand', name: 'رند محمد الرميخان', role: 'Co-founder | Management Team | Art Department', status: 'online', avatar: '', phone: '0554095903', email: 'rrand.msa@gmail.com' },
  { id: 'ibrahim', name: 'إبراهيم المطرفي', role: 'Management Team | Head of Production Department', status: 'online', avatar: '', phone: '0560057562', email: 'i.almatrafi.cue@gmail.com' },
  { id: 'abdulaziz', name: 'عبدالعزيز المعاوي', role: 'Management Team | Head of Directing Department', status: 'online', avatar: '', phone: '0554760134', email: 'ajqvvv@gmail.com' },
  { id: 'joud', name: 'جود فهد الغامدي', role: 'Management Team | Directing Department', status: 'online', avatar: '', phone: '0555776788', email: 'joudiwooow@gmail.com' },
  { id: 'khalid', name: 'خالد عبدالله الجمحان', role: 'Production Department', status: 'online', avatar: '', phone: '0564099683', email: 'khalid.al-jamhan@sadufilms.com' },
  { id: 'abdulmalik_d', name: 'عبدالملك الداوود', role: 'Production Department', status: 'online', avatar: '', phone: '0562881333', email: 'aldaudabdul@gmail.com' },
  { id: 'tariq', name: 'طارق عبدالله الدوسري', role: 'Production Department', status: 'online', avatar: '', phone: '0509272230', email: 'Triq091d@gmail.com' },
  { id: 'abdullatif', name: 'عبداللطيف المسعود', role: 'Production Department', status: 'online', avatar: '', phone: '0510545538', email: 'bdalltyfalmy@gmail.com' },
  { id: 'layan', name: 'ليان سعد الغامدي', role: 'Production Department | Art Department', status: 'online', avatar: '', phone: '0569137875', email: 'layanssaadd11@gmail.com' },
  { id: 'abbad', name: 'عباد العتيبي', role: 'Directing Department', status: 'online', avatar: '', phone: '0555552162', email: 'abad.alraqas@gmail.com' },
  { id: 'ghazi', name: 'غازي الكندي', role: 'Directing Department | Art Department', status: 'online', avatar: '', phone: '0535553792', email: 'hhq477@gmail.com' },
  { id: 'haya', name: 'هيا العيسى', role: 'Directing Department', status: 'online', avatar: '', phone: '0559527692', email: 'Haya.11.alessa@gmail.com' },
  { id: 'faisal', name: 'فيصل الجميعه', role: 'Art Department', status: 'online', avatar: '', phone: '0555470681', email: '1414faisalahmad@gmail.com' },
  { id: 'abdulmalik_m', name: 'عبدالملك المعيقل', role: 'Art Department', status: 'online', avatar: '', phone: '0536128116', email: 'mlok.fg87@gmail.com' },
  { id: 'mohammed_s', name: 'محمد ال شفلوت', role: 'Art Department', status: 'online', avatar: '', phone: '0501205773', email: 'm7md.ali.077@gmail.com' },
  { id: 'mohammed_d', name: 'محمد الدامر', role: 'Art Department', status: 'online', avatar: '', phone: '0570750748', email: 'dammhmd049@gmail.com' },
  { id: 'leen', name: 'لين محمد الغامدي', role: 'Art Department', status: 'online', avatar: '', phone: '0549811426', email: 'ileen17m@gmail.com' }
];

const INITIAL_CHANNELS = [
  { id: 'general', name: 'عام - General', icon: Hash, private: false },
  { id: 'news', name: 'أخبار الفريق الهامة', icon: BellRing, private: false, isNews: true },
  { id: 'director', name: 'غرفة المخرج الخاصة', icon: Lock, private: true, code: '9090' },
  { id: 'management', name: 'قسم الإدارة', icon: Lock, private: true, code: '1010' },
  { id: 'directing', name: 'قسم الإخراج', icon: Lock, private: true, code: '2020' },
  { id: 'production', name: 'قسم الإنتاج', icon: Lock, private: true, code: '3030' },
  { id: 'art', name: 'قسم الديكور والفن (Art Dept)', icon: Lock, private: true, code: '4040' },
  { id: 'post', name: 'قسم المونتاج (Post-Prod)', icon: Lock, private: true, code: '5050' }
];

const INITIAL_TASKS = [
  { id: '1', channelId: 'production', title: 'تأكيد تصاريح التصوير في الدرعية', status: 'todo', priority: 'high', assignee: 'فهد', dueDate: '2026-11-20', date: '2026-11-05' },
  { id: '2', channelId: 'directing', title: 'معاينة زوايا إضاءة المشهد 4 (Studio B)', status: 'in-progress', priority: 'high', assignee: 'عبدالعزيز', dueDate: '2026-11-18', date: '2026-11-10' }
];

const INITIAL_CALL_SHEETS = [
  {
    id: 'cs-101',
    projectId: 'proj_1',
    day: 'اليوم الأول',
    date: '2026-11-12',
    location: 'حي الطريف - الدرعية التاريخية، الرياض',
    mapLink: 'https://maps.google.com/?q=Diriyah',
    parkingNotes: 'مواقف طاقم الإنتاج بجوار البوابة الرئيسية رقم 3',
    callTime: '06:30 صباحاً',
    weather: 'مشمس 28°C',
    scenes: 'المشهد 1 (خارجي/نهار)، المشهد 2 (غروب)',
    importantNotes: 'الرجاء الحضور قبل 30 دقيقة للمكياج والتجهيز.',
    checkedInMembers: []
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    title: 'المعزوفة - فيلم قصير',
    description: 'ملفات السيناريو، الستوري بورد، ومقاطع التصوير',
    status: 'current',
    budgetTotal: '15,000 ريال',
    createdBy: 'فهد',
    date: '2026-11-12'
  }
];

const INITIAL_EVENTS = [
  { id: 'ev_1', title: 'يوم التصوير الأول (الدرعية)', date: '2026-11-12', color: 'amber', category: 'تصوير' },
  { id: 'ev_2', title: 'بروفة طاقم التمثيل', date: '2026-11-15', color: 'purple', category: 'بروفة' },
  { id: 'ev_3', title: 'اجتماع إدارة الإنتاج', date: '2026-11-18', color: 'emerald', category: 'اجتماع' }
];

function getDirectChannelId(userAId, userBId) {
  const sorted = [userAId, userBId].sort();
  return `dm_${sorted[0]}_${sorted[1]}`;
}

function TeamLogo({ size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const dimensions = size === 'lg' ? 'w-16 h-16 text-3xl rounded-2xl' : 'w-9 h-9 text-xl rounded-xl';

  if (TEAM_LOGO_URL && !imgError) {
    return (
      <img
        src={TEAM_LOGO_URL}
        alt="Team Cue Logo"
        onError={() => setImgError(true)}
        className={`${dimensions} object-cover border border-amber-500/30 bg-slate-950`}
      />
    );
  }

  return (
    <div className={`${dimensions} bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold`}>
      .C
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [customMembers, setCustomMembers] = useState([]);
  const [memberRoles, setMemberRoles] = useState({});
  const [userPasswords, setUserPasswords] = useState({});
  const [onlinePresence, setOnlinePresence] = useState({});
  const [nowTick, setNowTick] = useState(Date.now());

  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordSetupError, setPasswordSetupError] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [activeTab, setActiveTab] = useState('chat');
  const [activeChannel, setActiveChannel] = useState('general');
  const [channelSubTab, setChannelSubTab] = useState('chat');
  const [openedDmUserIds, setOpenedDmUserIds] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [inputMessage, setInputMessage] = useState('');
  const [imageAttachment, setImageAttachment] = useState(null);

  const [channelPasscodes, setChannelPasscodes] = useState({});
  const [editingChannelForPasscode, setEditingChannelForPasscode] = useState(null);
  const [newPasscodeInput, setNewPasscodeInput] = useState('');

  const [polls, setPolls] = useState([]);
  const [showAddPollModal, setShowAddPollModal] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  // Project Library States
  const [projectsTab, setProjectsTab] = useState('current');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectSubTab, setProjectSubTab] = useState('files');

  // Production Directory States
  const [productionDirectoryTab, setProductionDirectoryTab] = useState('actors');
  const [prodActors, setProdActors] = useState([
    { id: 'pa_1', name: 'محمد العتيبي', phone: '0500000000', notes: 'ممثل دراما وتراجيديا' }
  ]);
  const [prodCompanies, setProdCompanies] = useState([
    { id: 'pc_1', name: 'شركة ساديو للإنتاج', contact: '0560000000', notes: 'تأجير استديوهات ومعدات' }
  ]);
  const [prodDPs, setProdDPs] = useState([
    { id: 'pd_1', name: 'عبدالعزيز (مدير تصوير)', contact: '0550000000', notes: 'خبير إضاءة سينمائية' }
  ]);
  const [prodLighting, setProdLighting] = useState([
    { id: 'pl_1', name: 'تريق إضاءة الرياض', contact: '0501111111', notes: 'أجهزة Arri' }
  ]);

  // Art Department States
  const [artSubTab, setArtSubTab] = useState('treatment');
  const [artTreatments, setArtTreatments] = useState([
    { id: 'at_1', title: 'تريتمنت ألوان المعزوفة', desc: 'درجات الدافئ (Warm Amber) مع ظل داكن.', author: 'فهد السعود' }
  ]);
  const [artBreakdowns, setArtBreakdowns] = useState([
    { id: 'ab_1', scene: 'المشهد 1', items: 'طاولة خشبية قديمة، فنجان قهوة نحاس', status: 'جاهز' }
  ]);
  const [artInvoices, setArtInvoices] = useState([
    { id: 'ai_1', title: 'شراء إكسسوارات من سوق الديرة', amount: '450 ريال', date: '2026-11-10' }
  ]);

  // General Budget (Management Only)
  const [budgetItems, setBudgetItems] = useState([
    { id: 'b_1', title: 'إيجار معدات الإضاءة والكاميرات', category: 'إنتاج', amount: '4500', type: 'مصروف', date: '2026-11-10' }
  ]);

  // Calendar filter state
  const [calendarFilter, setCalendarFilter] = useState('all');

  const [shotLists, setShotLists] = useState([
    { id: 'sl_1', projectId: 'proj_1', scene: 'المشهد 1', shotNum: '1', shotSize: 'Wide Shot (WS)', movement: 'Panning', lens: '35mm', description: 'لقطة تأسيسية', assignedTo: 'عبدالعزيز' }
  ]);
  const [castList, setCastList] = useState([
    { id: 'cast_1', projectId: 'proj_1', characterName: 'سلطان', actorName: 'محمد العتيبي', phone: '0500000000', costumeNotes: 'بدلة رسمية', rehearsalTime: 'الخميس 4 عصراً' }
  ]);
  const [callSheets, setCallSheets] = useState(INITIAL_CALL_SHEETS);
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_EVENTS);
  const [customChannels, setCustomChannels] = useState([]);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [assets, setAssets] = useState([]);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [messages, setMessages] = useState([]);
  const [channelMembers, setChannelMembers] = useState({});
  const [syncStatus, setSyncStatus] = useState('جاري الاتصال...');
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  // Modals
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState('current');
  const [newProjectBudget, setNewProjectBudget] = useState('');

  const [showAddCallSheet, setShowAddCallSheet] = useState(false);
  const [newCsDay, setNewCsDay] = useState('');
  const [newCsDate, setNewCsDate] = useState('');
  const [newCsLocation, setNewCsLocation] = useState('');
  const [newCsMapLink, setNewCsMapLink] = useState('');
  const [newCsParking, setNewCsParking] = useState('');
  const [newCsCallTime, setNewCsCallTime] = useState('');
  const [newCsScenes, setNewCsScenes] = useState('');
  const [newCsNotes, setNewCsNotes] = useState('');

  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('script');
  const [newAssetUrl, setNewAssetUrl] = useState('');

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventColor, setNewEventColor] = useState('amber');

  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanCode, setNewChanCode] = useState('');

  const [passcodeModalChannel, setPasscodeModalChannel] = useState(null);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [emailNotificationLog, setEmailNotificationLog] = useState('');

  const rawTeamMembers = [...INITIAL_TEAM_MEMBERS, ...customMembers];
  const allTeamMembers = rawTeamMembers.map((m) => ({
    ...m,
    role: memberRoles[m.id] !== undefined ? memberRoles[m.id] : m.role
  }));

  const allChannels = [...INITIAL_CHANNELS, ...customChannels].map((c) => ({
    ...c,
    code: channelPasscodes[c.id] !== undefined ? channelPasscodes[c.id] : c.code
  }));

  const [unlockedChannels, setUnlockedChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('cue_unlocked_channels_v4');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cue_unlocked_channels_v4', JSON.stringify(unlockedChannels));
    } catch {}
  }, [unlockedChannels]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      workspaceDocRef,
      (docSnap) => {
        setSyncStatus('متصل لحظياً (Firebase Live)');
        setIsCloudLoaded(true);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.messages !== undefined) setMessages(data.messages);
          if (data.tasks !== undefined) setTasks(data.tasks);
          if (data.callSheets !== undefined) setCallSheets(data.callSheets);
          if (data.assets !== undefined) setAssets(data.assets);
          if (data.projects !== undefined) setProjects(data.projects);
          if (data.channelMembers !== undefined) setChannelMembers(data.channelMembers);
          if (data.userPasswords !== undefined) setUserPasswords(data.userPasswords);
          if (data.onlinePresence !== undefined) setOnlinePresence(data.onlinePresence);
          if (data.customMembers !== undefined) setCustomMembers(data.customMembers);
          if (data.memberRoles !== undefined) setMemberRoles(data.memberRoles);
          if (data.calendarEvents !== undefined) setCalendarEvents(data.calendarEvents);
          if (data.customChannels !== undefined) setCustomChannels(data.customChannels);
          if (data.channelPasscodes !== undefined) setChannelPasscodes(data.channelPasscodes);
          if (data.polls !== undefined) setPolls(data.polls);
          if (data.shotLists !== undefined) setShotLists(data.shotLists);
          if (data.castList !== undefined) setCastList(data.castList);
          if (data.budgetItems !== undefined) setBudgetItems(data.budgetItems);
          if (data.prodActors !== undefined) setProdActors(data.prodActors);
          if (data.prodCompanies !== undefined) setProdCompanies(data.prodCompanies);
          if (data.prodDPs !== undefined) setProdDPs(data.prodDPs);
          if (data.prodLighting !== undefined) setProdLighting(data.prodLighting);
          if (data.artTreatments !== undefined) setArtTreatments(data.artTreatments);
          if (data.artBreakdowns !== undefined) setArtBreakdowns(data.artBreakdowns);
          if (data.artInvoices !== undefined) setArtInvoices(data.artInvoices);
        } else {
          setDoc(workspaceDocRef, {
            messages: [],
            tasks: INITIAL_TASKS,
            callSheets: INITIAL_CALL_SHEETS,
            projects: INITIAL_PROJECTS,
            assets: [],
            channelMembers: {},
            userPasswords: {},
            onlinePresence: {},
            customMembers: [],
            memberRoles: {},
            calendarEvents: INITIAL_EVENTS,
            customChannels: [],
            channelPasscodes: {},
            polls: [],
            shotLists: [],
            castList: [],
            budgetItems: [],
            prodActors: [],
            prodCompanies: [],
            prodDPs: [],
            prodLighting: [],
            artTreatments: [],
            artBreakdowns: [],
            artInvoices: [],
            lastUpdated: Date.now()
          });
        }
      },
      (error) => {
        console.error('Firestore Sync Error:', error);
        setSyncStatus('خطأ في المزامنة');
        setIsCloudLoaded(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => setNowTick(Date.now()), 15000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const sendHeartbeat = async () => {
      const now = Date.now();
      setOnlinePresence((prev) => ({ ...prev, [currentUser.id]: now }));
      try {
        await setDoc(workspaceDocRef, { onlinePresence: { [currentUser.id]: now } }, { merge: true });
      } catch (err) {}
    };
    sendHeartbeat();
    const hbInterval = setInterval(sendHeartbeat, 25000);
    return () => clearInterval(hbInterval);
  }, [currentUser]);

  const isMemberOnline = (memberId) => {
    if (currentUser && currentUser.id === memberId) return true;
    const lastSeen = onlinePresence[memberId];
    if (!lastSeen) return false;
    return nowTick - lastSeen < 65000;
  };

  const updateGlobalStore = async (newPartialState) => {
    const updatedState = {
      messages: newPartialState.messages !== undefined ? newPartialState.messages : messages,
      tasks: newPartialState.tasks !== undefined ? newPartialState.tasks : tasks,
      callSheets: newPartialState.callSheets !== undefined ? newPartialState.callSheets : callSheets,
      projects: newPartialState.projects !== undefined ? newPartialState.projects : projects,
      assets: newPartialState.assets !== undefined ? newPartialState.assets : assets,
      channelMembers: newPartialState.channelMembers !== undefined ? newPartialState.channelMembers : channelMembers,
      userPasswords: newPartialState.userPasswords !== undefined ? newPartialState.userPasswords : userPasswords,
      customMembers: newPartialState.customMembers !== undefined ? newPartialState.customMembers : customMembers,
      memberRoles: newPartialState.memberRoles !== undefined ? newPartialState.memberRoles : memberRoles,
      calendarEvents: newPartialState.calendarEvents !== undefined ? newPartialState.calendarEvents : calendarEvents,
      customChannels: newPartialState.customChannels !== undefined ? newPartialState.customChannels : customChannels,
      channelPasscodes: newPartialState.channelPasscodes !== undefined ? newPartialState.channelPasscodes : channelPasscodes,
      polls: newPartialState.polls !== undefined ? newPartialState.polls : polls,
      shotLists: newPartialState.shotLists !== undefined ? newPartialState.shotLists : shotLists,
      castList: newPartialState.castList !== undefined ? newPartialState.castList : castList,
      budgetItems: newPartialState.budgetItems !== undefined ? newPartialState.budgetItems : budgetItems,
      prodActors: newPartialState.prodActors !== undefined ? newPartialState.prodActors : prodActors,
      prodCompanies: newPartialState.prodCompanies !== undefined ? newPartialState.prodCompanies : prodCompanies,
      prodDPs: newPartialState.prodDPs !== undefined ? newPartialState.prodDPs : prodDPs,
      prodLighting: newPartialState.prodLighting !== undefined ? newPartialState.prodLighting : prodLighting,
      artTreatments: newPartialState.artTreatments !== undefined ? newPartialState.artTreatments : artTreatments,
      artBreakdowns: newPartialState.artBreakdowns !== undefined ? newPartialState.artBreakdowns : artBreakdowns,
      artInvoices: newPartialState.artInvoices !== undefined ? newPartialState.artInvoices : artInvoices,
      lastUpdated: Date.now()
    };
    try {
      await setDoc(workspaceDocRef, updatedState, { merge: true });
    } catch (err) {
      console.error('Failed to save to Firestore:', err);
    }
  };

  const activeUserObj = allTeamMembers.find((m) => m.id === currentUser?.id) || currentUser;
  const isManagementUser = activeUserObj?.role?.includes('Management Team') || activeUserObj?.id === 'fahad';

  const handleSelectChannel = (channel) => {
    const currentPasscode = channel.code;
    const isUnlocked = !channel.private || (unlockedChannels[channel.id] === currentPasscode);
    if (channel.private && !isUnlocked) {
      setPasscodeModalChannel(channel);
      setEnteredPasscode('');
      setPasscodeError('');
    } else {
      setActiveChannel(channel.id);
      setMobileSidebarOpen(false);
    }
  };

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (!passcodeModalChannel) return;
    if (enteredPasscode === passcodeModalChannel.code) {
      setUnlockedChannels((prev) => ({ ...prev, [passcodeModalChannel.id]: passcodeModalChannel.code }));
      setActiveChannel(passcodeModalChannel.id);
      setPasscodeModalChannel(null);
      setEnteredPasscode('');
      setPasscodeError('');
    } else {
      setPasscodeError('رمز الدخول غير صحيح!');
    }
  };

  // Project Handlers
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !currentUser) return;
    const newProj = {
      id: 'proj_' + Date.now(),
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim() || 'ملفات العمل',
      status: newProjectStatus,
      budgetTotal: newProjectBudget.trim() || 'غير محدد',
      createdBy: activeUserObj.name.split(' ')[0],
      date: new Date().toLocaleDateString('ar-SA')
    };
    const nextProjects = [newProj, ...projects];
    setProjects(nextProjects);
    updateGlobalStore({ projects: nextProjects });
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectBudget('');
    setShowAddProject(false);
  };

  const handleDeleteProj = (projId, e) => {
    e.stopPropagation();
    const nextProjects = projects.filter(p => p.id !== projId);
    setProjects(nextProjects);
    if (selectedProjectId === projId) setSelectedProjectId(null);
    updateGlobalStore({ projects: nextProjects });
  };

  const handleToggleProjStatus = (projId) => {
    const nextProjects = projects.map(p => {
      if (p.id !== projId) return p;
      return { ...p, status: p.status === 'current' ? 'completed' : 'current' };
    });
    setProjects(nextProjects);
    updateGlobalStore({ projects: nextProjects });
  };

  // Asset Handlers inside Project
  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAssetTitle.trim() || !selectedProjectId) return;
    const newAsset = {
      id: 'asset_' + Date.now(),
      projectId: selectedProjectId,
      title: newAssetTitle.trim(),
      category: newAssetCategory,
      url: newAssetUrl.trim(),
      updatedBy: activeUserObj.name.split(' ')[0],
      date: new Date().toLocaleDateString('ar-SA')
    };
    const nextAssets = [newAsset, ...assets];
    setAssets(nextAssets);
    updateGlobalStore({ assets: nextAssets });
    setNewAssetTitle('');
    setNewAssetUrl('');
    setShowAddAsset(false);
  };

  const handleDeleteAsset = (id) => {
    const next = assets.filter(a => a.id !== id);
    setAssets(next);
    updateGlobalStore({ assets: next });
  };

  // Call Sheet Handler
  const handleAddCallSheet = (e) => {
    e.preventDefault();
    if (!newCsDay.trim() || !newCsLocation.trim() || !selectedProjectId) return;
    const newCs = {
      id: 'cs_' + Date.now(),
      projectId: selectedProjectId,
      day: newCsDay.trim(),
      date: newCsDate.trim() || 'قريباً',
      location: newCsLocation.trim(),
      mapLink: newCsMapLink.trim() || '',
      parkingNotes: newCsParking.trim() || 'المواقف المعتمدة',
      callTime: newCsCallTime.trim() || '07:00 صباحاً',
      weather: 'معتدل',
      scenes: newCsScenes.trim() || 'جميع مشاهد اليوم',
      importantNotes: newCsNotes.trim() || 'الالتزام بمواعيد التجمع.',
      checkedInMembers: []
    };
    const next = [newCs, ...callSheets];
    setCallSheets(next);
    updateGlobalStore({ callSheets: next });
    setNewCsDay('');
    setNewCsDate('');
    setNewCsLocation('');
    setNewCsMapLink('');
    setNewCsParking('');
    setNewCsCallTime('');
    setNewCsScenes('');
    setNewCsNotes('');
    setShowAddCallSheet(false);
  };

  const handleDeleteCallSheet = (id) => {
    const next = callSheets.filter(cs => cs.id !== id);
    setCallSheets(next);
    updateGlobalStore({ callSheets: next });
  };

  const handleCheckInCallSheet = (csId) => {
    const next = callSheets.map(cs => {
      if (cs.id !== csId) return cs;
      const checked = cs.checkedInMembers || [];
      if (checked.includes(currentUser.id)) {
        return { ...cs, checkedInMembers: checked.filter(id => id !== currentUser.id) };
      } else {
        return { ...cs, checkedInMembers: [...checked, currentUser.id] };
      }
    });
    setCallSheets(next);
    updateGlobalStore({ callSheets: next });
  };

  // General auth & login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!isCloudLoaded) {
      setLoginError('جاري الاتصال بقاعدة البيانات...');
      return;
    }
    const cleanEmail = (loginEmail || '').trim().toLowerCase();
    const foundUser = allTeamMembers.find((m) => m.email.toLowerCase() === cleanEmail);
    if (!foundUser) {
      setLoginError('البريد الإلكتروني غير مسجل.');
      return;
    }
    const savedCustomPassword = userPasswords[foundUser.id];
    const activePassword = savedCustomPassword || DEFAULT_PASSWORD;
    if (activePassword !== loginPassword) {
      setLoginError('الرمز السري غير صحيح.');
      return;
    }
    if (!savedCustomPassword) {
      setPendingUser(foundUser);
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setPasswordSetupError('');
      return;
    }
    setCurrentUser(foundUser);
  };

  const handleSavePersonalPassword = async (e) => {
    e.preventDefault();
    setPasswordSetupError('');
    const targetUser = pendingUser || currentUser;
    if (!targetUser) return;
    const cleanNewPass = newPasswordInput.trim();
    if (cleanNewPass.length < 4) {
      setPasswordSetupError('يجب أن يكون الرمز 4 خانات على الأقل.');
      return;
    }
    if (cleanNewPass !== confirmPasswordInput.trim()) {
      setPasswordSetupError('الرمزان غير متطابقين.');
      return;
    }
    const updatedPasswords = { ...userPasswords, [targetUser.id]: cleanNewPass };
    setUserPasswords(updatedPasswords);
    await updateGlobalStore({ userPasswords: updatedPasswords });
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setShowChangePasswordModal(false);
    if (pendingUser) {
      setCurrentUser(pendingUser);
      setPendingUser(null);
    }
  };

  const handleLogout = async () => {
    if (currentUser) {
      const leavingId = currentUser.id;
      setOnlinePresence((prev) => ({ ...prev, [leavingId]: 0 }));
      try {
        await setDoc(workspaceDocRef, { onlinePresence: { [leavingId]: 0 } }, { merge: true });
      } catch {}
    }
    setCurrentUser(null);
    setPendingUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const onlineCount = allTeamMembers.filter((m) => isMemberOnline(m.id)).length;

  if (pendingUser) {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 dir-rtl" dir="rtl">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-amber-400">مرحباً {pendingUser.name.split(' ')[0]}!</h2>
            <p className="text-xs text-slate-300">قم بتعيين رمز سري خاص بك:</p>
          </div>
          <form onSubmit={handleSavePersonalPassword} className="space-y-4">
            <input
              type="password"
              required
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              placeholder="الرمز السري الجديد..."
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
            <input
              type="password"
              required
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              placeholder="تأكيد الرمز السري..."
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
            {passwordSetupError && <div className="text-xs text-red-400">{passwordSetupError}</div>}
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm">
              حفظ والدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 dir-rtl" dir="rtl">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2 flex flex-col items-center">
            <TeamLogo size="lg" />
            <h1 className="text-2xl font-bold text-amber-400">Team .Cue</h1>
            <p className="text-sm font-semibold text-amber-300/90">هنا نصنع الإبداع</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني:</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الرمز السري:</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            {loginError && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">{loginError}</div>}
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm shadow-lg">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans dir-rtl select-none overflow-hidden" dir="rtl">
      <aside className={`fixed md:static inset-y-0 right-0 z-50 w-64 bg-slate-900 border-l border-slate-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 space-x-reverse">
              <TeamLogo size="md" />
              <div>
                <h1 className="font-bold text-lg leading-none text-amber-400">Team .Cue</h1>
                <p className="text-[11px] text-amber-300/80 font-medium mt-1">هنا نصنع الإبداع</p>
              </div>
            </div>
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden text-slate-400"><X className="w-5 h-5" /></button>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            <button
              onClick={() => { setActiveTab('chat'); setSelectedProjectId(null); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'chat' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>الأقسام والغرف</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setSelectedProjectId(null); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'projects' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Folder className="w-4 h-4" />
              <span>مكتبة الأعمال والمشاريع</span>
            </button>

            <button
              onClick={() => { setActiveTab('production_dir'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'production_dir' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>دليل موارد الإنتاج</span>
            </button>

            <button
              onClick={() => { setActiveTab('art_dept'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'art_dept' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Box className="w-4 h-4" />
              <span>أقسام وفواتير الديكور</span>
            </button>

            {isManagementUser && (
              <button
                onClick={() => { setActiveTab('budget'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'budget' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <DollarSign className="w-4 h-4" />
                <span>الميزانية العامة (إدارة)</span>
              </button>
            )}

            <button
              onClick={() => { setActiveTab('calendar'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'calendar' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>التقويم الشامل</span>
            </button>

            <button
              onClick={() => { setActiveTab('team'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === 'team' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Users className="w-4 h-4" />
                <span>دليل الأفراد</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">{onlineCount} متصل</span>
            </button>
          </nav>
        </div>

        <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 space-x-reverse p-2 bg-slate-900 rounded-lg border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              {activeUserObj.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">{activeUserObj.name}</p>
              <p className="text-[10px] text-amber-400 truncate">{activeUserObj.role.split('|')[0]}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-center py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium border border-red-500/20">
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative w-full">
        <header className="h-14 bg-slate-900/60 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button onClick={() => setMobileSidebarOpen(true)} className="md:hidden p-1.5 bg-slate-800 text-amber-400 rounded-lg border border-slate-700">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-slate-100 text-sm md:text-base truncate">
              {activeTab === 'chat' && 'غرف التواصل ومهام الأقسام'}
              {activeTab === 'projects' && (selectedProjectId ? `إدارة مشروع: ${selectedProject?.title}` : 'مكتبة الأعمال والمشاريع')}
              {activeTab === 'production_dir' && 'دليل موارد وقوائم الإنتاج'}
              {activeTab === 'art_dept' && 'قسم الديكور والفن (تريتمنت، تفريغ، فواتير)'}
              {activeTab === 'budget' && 'الميزانية العامة ومتابعة التكاليف (خاص بالإدارة)'}
              {activeTab === 'calendar' && 'التقويم الشامل والمواعيد'}
              {activeTab === 'team' && 'دليل أفراد الفريق'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5 font-semibold">
              <Cloud className="w-3.5 h-3.5" /> {syncStatus}
            </span>
          </div>
        </header>

        {emailNotificationLog && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-300 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{emailNotificationLog}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-3 md:p-6">
          {/* TAB: CHAT */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-4 max-h-48 md:max-h-full overflow-y-auto">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">الأقسام والغرف</h3>
                <div className="space-y-1">
                  {allChannels.map((channel) => {
                    const isUnlocked = !channel.private || (unlockedChannels[channel.id] === channel.code);
                    const IconComponent = channel.icon || Hash;
                    return (
                      <div
                        key={channel.id}
                        onClick={() => handleSelectChannel(channel)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                          activeChannel === channel.id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <IconComponent className={`w-3.5 h-3.5 ${channel.private && !isUnlocked ? 'text-red-400' : 'text-amber-400'}`} />
                          <span>{channel.name}</span>
                        </div>
                        {channel.private && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {isUnlocked ? 'مفتوح' : 'مشفر'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden relative">
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-200">{allChannels.find(c => c.id === activeChannel)?.name}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.filter(m => m.channelId === activeChannel).length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">لا توجد رسائل في هذا القسم بعد.</div>
                  ) : (
                    messages.filter(m => m.channelId === activeChannel).map(msg => (
                      <div key={msg.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl max-w-lg">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-amber-400">{msg.sender}</span>
                          <span className="text-slate-500 text-[10px]">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-200">{msg.text}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-slate-800 bg-slate-950/60">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!inputMessage.trim()) return;
                    const newMsg = {
                      id: 'msg_' + Date.now(),
                      channelId: activeChannel,
                      senderId: currentUser.id,
                      sender: activeUserObj.name,
                      text: inputMessage.trim(),
                      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
                    };
                    const next = [...messages, newMsg];
                    setMessages(next);
                    updateGlobalStore({ messages: next });
                    setInputMessage('');
                  }} className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="اكتب رسالة..."
                      className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                    <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1">
                      <Send className="w-3.5 h-3.5" /> إرسال
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROJECTS (LIBRARY WITH CURRENT & COMPLETED WORKSPACES) */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {!selectedProjectId ? (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-3">
                    <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setProjectsTab('current')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${projectsTab === 'current' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        الأعمال القائمة ({projects.filter(p => p.status === 'current').length})
                      </button>
                      <button
                        onClick={() => setProjectsTab('completed')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${projectsTab === 'completed' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        الأعمال المنجزة ({projects.filter(p => p.status === 'completed').length})
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <FolderPlus className="w-4 h-4" /> إنشاء مجلد عمل جديد
                    </button>
                  </div>

                  {showAddProject && (
                    <form onSubmit={handleAddProject} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                      <h4 className="font-bold text-amber-400 text-sm">مجلد عمل سينمائي متكامل جديد</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                          placeholder="اسم العمل..."
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        />
                        <select
                          value={newProjectStatus}
                          onChange={(e) => setNewProjectStatus(e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        >
                          <option value="current">أعمال قائمة حالياً</option>
                          <option value="completed">عمل منجز وخلصنا منه</option>
                        </select>
                        <input
                          type="text"
                          value={newProjectBudget}
                          onChange={(e) => setNewProjectBudget(e.target.value)}
                          placeholder="الميزانية المرصودة (ريال)"
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        />
                      </div>
                      <input
                        type="text"
                        value={newProjectDesc}
                        onChange={(e) => setNewProjectDesc(e.target.value)}
                        placeholder="وصف مختصر..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                      />
                      <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl">
                        حفظ المجلد وإنشائه
                      </button>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.filter(p => p.status === projectsTab).length === 0 ? (
                      <div className="col-span-3 bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center text-slate-500 text-xs">
                        لا توجد أعمال في هذا القسم حالياً.
                      </div>
                    ) : (
                      projects.filter(p => p.status === projectsTab).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => setSelectedProjectId(proj.id)}
                          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl cursor-pointer transition-all space-y-4 flex flex-col justify-between group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                              <Folder className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleProjStatus(proj.id); }}
                                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700"
                              >
                                {proj.status === 'current' ? 'نقل للمنجزة ✓' : 'إعادة للقائمة ⟲'}
                              </button>
                              <button onClick={(e) => handleDeleteProj(proj.id, e)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">{proj.title}</h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                          </div>
                          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                            <span>الميزانية: <strong className="text-amber-400">{proj.budgetTotal}</strong></span>
                            <span className="text-amber-400 font-bold">فتح مجلد العمل شامل ←</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                /* PROJECT WORKSPACE */
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedProjectId(null)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" /> رجوع للمشاريع
                      </button>
                      <div>
                        <h3 className="text-base font-bold text-amber-400">{selectedProject.title}</h3>
                        <p className="text-xs text-slate-400">الميزانية: {selectedProject.budgetTotal} • أنشأه: {selectedProject.createdBy}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
                      <button
                        onClick={() => setProjectSubTab('files')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${projectSubTab === 'files' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        السيناريو والملفات
                      </button>
                      <button
                        onClick={() => setProjectSubTab('cast')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${projectSubTab === 'cast' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        طاقم التمثيل
                      </button>
                      <button
                        onClick={() => setProjectSubTab('shotlist')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${projectSubTab === 'shotlist' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Shot List
                      </button>
                      <button
                        onClick={() => setProjectSubTab('callsheets')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${projectSubTab === 'callsheets' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        الكول شيت والخريطة
                      </button>
                    </div>
                  </div>

                  {projectSubTab === 'files' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-amber-400">ملفات السيناريو والمستندات</h4>
                        <button
                          onClick={() => setShowAddAsset(!showAddAsset)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> رفع ملف / سيناريو
                        </button>
                      </div>

                      {showAddAsset && (
                        <form onSubmit={handleAddAsset} className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                              type="text"
                              required
                              value={newAssetTitle}
                              onChange={(e) => setNewAssetTitle(e.target.value)}
                              placeholder="اسم الملف..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <select
                              value={newAssetCategory}
                              onChange={(e) => setNewAssetCategory(e.target.value)}
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            >
                              <option value="script">سيناريو (Script)</option>
                              <option value="moodboard">لوحة بصرية / ستوري بورد</option>
                              <option value="video">فيديو تجريبي</option>
                              <option value="other">ملف عام</option>
                            </select>
                            <input
                              type="url"
                              value={newAssetUrl}
                              onChange={(e) => setNewAssetUrl(e.target.value)}
                              placeholder="رابط السحابة..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                          </div>
                          <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded-lg">
                            إضافة للمجلد
                          </button>
                        </form>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {assets.filter(a => a.projectId === selectedProjectId).length === 0 ? (
                          <div className="col-span-3 bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا توجد ملفات مرفقة لهذا المشروع.
                          </div>
                        ) : (
                          assets.filter(a => a.projectId === selectedProjectId).map(asset => (
                            <div key={asset.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
                              <div className="flex items-start justify-between">
                                <FileText className="w-8 h-8 text-amber-400" />
                                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400">{asset.category}</span>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-100">{asset.title}</h5>
                                <p className="text-[10px] text-slate-400 mt-0.5">بواسطة: {asset.updatedBy}</p>
                              </div>
                              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                                {asset.url && (
                                  <a href={asset.url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-amber-500/20 text-amber-400 text-xs font-bold py-2 rounded-lg text-center">
                                    فتح الملف ↗
                                  </a>
                                )}
                                <button onClick={() => handleDeleteAsset(asset.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {projectSubTab === 'cast' && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-amber-400">طاقم التمثيل والشخصيات</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {castList.filter(c => c.projectId === selectedProjectId || !c.projectId).length === 0 ? (
                          <div className="col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا يوجد ممثلون مضافون.
                          </div>
                        ) : (
                          castList.filter(c => c.projectId === selectedProjectId || !c.projectId).map(c => (
                            <div key={c.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">شخصية: {c.characterName}</span>
                              <h5 className="text-sm font-bold text-slate-100">{c.actorName}</h5>
                              <p className="text-xs text-slate-400">📞 الجوال: {c.phone} • 👔 الأزياء: {c.costumeNotes}</p>
                              <p className="text-xs text-amber-300">📅 البروفة: {c.rehearsalTime}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {projectSubTab === 'shotlist' && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-amber-400">الـ Shot List وزوايا الكاميرا</h4>
                      <div className="space-y-2">
                        {shotLists.filter(sl => sl.projectId === selectedProjectId || !sl.projectId).length === 0 ? (
                          <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا توجد لقطات مسجلة.
                          </div>
                        ) : (
                          shotLists.filter(sl => sl.projectId === selectedProjectId || !sl.projectId).map(sl => (
                            <div key={sl.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                              <div>
                                <span className="text-xs font-bold text-amber-400">{sl.scene} - لقطة {sl.shotNum} ({sl.shotSize})</span>
                                <p className="text-xs text-slate-300 mt-1">{sl.description}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {projectSubTab === 'callsheets' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-amber-400">الكول شيت والإحداثيات</h4>
                        <button
                          onClick={() => setShowAddCallSheet(!showAddCallSheet)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> إضافة كول شيت جديد
                        </button>
                      </div>

                      {showAddCallSheet && (
                        <form onSubmit={handleAddCallSheet} className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              value={newCsDay}
                              onChange={(e) => setNewCsDay(e.target.value)}
                              placeholder="اليوم الأول..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded-lg"
                            />
                            <input
                              type="date"
                              value={newCsDate}
                              onChange={(e) => setNewCsDate(e.target.value)}
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded-lg"
                            />
                            <input
                              type="text"
                              required
                              value={newCsLocation}
                              onChange={(e) => setNewCsLocation(e.target.value)}
                              placeholder="موقع التصوير..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded-lg"
                            />
                            <input
                              type="url"
                              value={newCsMapLink}
                              onChange={(e) => setNewCsMapLink(e.target.value)}
                              placeholder="رابط الخريطة..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded-lg"
                            />
                          </div>
                          <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded-lg">
                            حفظ الكول شيت
                          </button>
                        </form>
                      )}

                      <div className="space-y-4">
                        {callSheets.filter(cs => cs.projectId === selectedProjectId).length === 0 ? (
                          <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا توجد جداول كول شيت.
                          </div>
                        ) : (
                          callSheets.filter(cs => cs.projectId === selectedProjectId).map(cs => (
                            <div key={cs.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <div>
                                  <span className="text-xs text-amber-500 font-bold">{cs.day}</span>
                                  <h5 className="text-base font-bold text-slate-100">{cs.date}</h5>
                                </div>
                                <button onClick={() => handleDeleteCallSheet(cs.id)} className="p-1 text-red-400 hover:bg-red-500/20 rounded">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-amber-500" />
                                    <span>{cs.location}</span>
                                  </div>
                                  {cs.mapLink && (
                                    <a href={cs.mapLink} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded text-[10px] flex items-center gap-1">
                                      <Navigation className="w-3 h-3" /> الخريطة
                                    </a>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleCheckInCallSheet(cs.id)}
                                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                                  (cs.checkedInMembers || []).includes(currentUser.id) ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-amber-400 border border-amber-500/30'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                {(cs.checkedInMembers || []).includes(currentUser.id) ? 'تم تسجيل حضورك في الموقع ✓' : 'تسجيل وصولي للموقع الآن (Check-in)'}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: PRODUCTION DIRECTORY */}
          {activeTab === 'production_dir' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">دليل وموارد قسم الإنتاج</h3>
                  <p className="text-xs text-slate-400 mt-0.5">القوائم المعتمدة للممثلين، شركات الإنتاج، المصورين، وتيم الإضاءة</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex-wrap">
                <button
                  onClick={() => setProductionDirectoryTab('actors')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${productionDirectoryTab === 'actors' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  الممثلين المعتمدين
                </button>
                <button
                  onClick={() => setProductionDirectoryTab('companies')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${productionDirectoryTab === 'companies' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  شركات الإنتاج والموردين
                </button>
                <button
                  onClick={() => setProductionDirectoryTab('dps')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${productionDirectoryTab === 'dps' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  المصورين (DPs)
                </button>
                <button
                  onClick={() => setProductionDirectoryTab('lighting')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${productionDirectoryTab === 'lighting' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  تيم الإضاءة والقبضة
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productionDirectoryTab === 'actors' && prodActors.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                    <p className="text-xs text-slate-400">📞 الجوال: {item.phone}</p>
                    <p className="text-xs text-amber-400">{item.notes}</p>
                  </div>
                ))}
                {productionDirectoryTab === 'companies' && prodCompanies.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                    <p className="text-xs text-slate-400">📞 التواصل: {item.contact}</p>
                    <p className="text-xs text-amber-400">{item.notes}</p>
                  </div>
                ))}
                {productionDirectoryTab === 'dps' && prodDPs.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                    <p className="text-xs text-slate-400">📞 التواصل: {item.contact}</p>
                    <p className="text-xs text-amber-400">{item.notes}</p>
                  </div>
                ))}
                {productionDirectoryTab === 'lighting' && prodLighting.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                    <p className="text-xs text-slate-400">📞 التواصل: {item.contact}</p>
                    <p className="text-xs text-amber-400">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ART DEPT */}
          {activeTab === 'art_dept' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">أقسام الديكور والفن (Art Department)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">تريتمنت الأرت، تفريغ العناصر، وفواتير القسم</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setArtSubTab('treatment')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${artSubTab === 'treatment' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  تريتمنت الأرت
                </button>
                <button
                  onClick={() => setArtSubTab('breakdown')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${artSubTab === 'breakdown' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  تفريغ الأرت
                </button>
                <button
                  onClick={() => setArtSubTab('invoices')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold ${artSubTab === 'invoices' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  فواتير قسم الديكور
                </button>
              </div>

              <div className="space-y-3">
                {artSubTab === 'treatment' && artTreatments.map(t => (
                  <div key={t.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-amber-400">{t.title}</h4>
                    <p className="text-xs text-slate-200">{t.desc}</p>
                    <p className="text-[10px] text-slate-500">بواسطة: {t.author}</p>
                  </div>
                ))}
                {artSubTab === 'breakdown' && artBreakdowns.map(b => (
                  <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-amber-400">{b.scene}</h4>
                    <p className="text-xs text-slate-200">العناصر المطلوبة: {b.items}</p>
                  </div>
                ))}
                {artSubTab === 'invoices' && artInvoices.map(inv => (
                  <div key={inv.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{inv.title}</h4>
                      <p className="text-[11px] text-slate-400">التاريخ: {inv.date}</p>
                    </div>
                    <span className="text-sm font-bold font-mono text-amber-400">{inv.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BUDGET (MANAGEMENT ONLY) */}
          {activeTab === 'budget' && isManagementUser && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">الميزانية العامة ومتابعة التكاليف (خاص بالإدارة فقط)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">سجل مالي شامل لإدارة مصروفات الاستوديو والمشاريع</p>
                </div>
              </div>

              <div className="space-y-3">
                {budgetItems.map(b => (
                  <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-100">{b.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400">{b.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">التاريخ: {b.date}</p>
                    </div>
                    <span className="text-base font-bold font-mono text-amber-400">{b.amount} ريال</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-3">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">التقويم الشامل وأحداث الاستوديو</h3>
                  <p className="text-xs text-slate-400 mt-0.5">فلترة سلسة لمواعيد التصوير والبروفات والاجتماعات</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={calendarFilter}
                    onChange={(e) => setCalendarFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2"
                  >
                    <option value="all">كل الفئات</option>
                    <option value="تصوير">تصوير</option>
                    <option value="بروفة">بروفة</option>
                    <option value="اجتماع">اجتماع</option>
                  </select>
                  <button
                    onClick={() => setShowAddEventModal(true)}
                    className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> إضافة حدث
                  </button>
                </div>
              </div>

              {showAddEventModal && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newEventTitle.trim() || !newEventDate) return;
                  const newEv = {
                    id: 'ev_' + Date.now(),
                    title: newEventTitle.trim(),
                    date: newEventDate,
                    color: newEventColor,
                    category: newEventColor === 'amber' ? 'تصوير' : 'بروفة'
                  };
                  const next = [newEv, ...calendarEvents];
                  setCalendarEvents(next);
                  updateGlobalStore({ calendarEvents: next });
                  setNewEventTitle('');
                  setNewEventDate('');
                  setShowAddEventModal(false);
                }} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="عنوان الحدث..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                  />
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                  />
                  <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl">
                    حفظ الموعد
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {calendarEvents.filter(ev => calendarFilter === 'all' || ev.category === calendarFilter).map(ev => (
                  <div key={ev.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{ev.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">التصنيف: {ev.category} • التاريخ: {ev.date}</p>
                    </div>
                    <button onClick={() => {
                      const next = calendarEvents.filter(e => e.id !== ev.id);
                      setCalendarEvents(next);
                      updateGlobalStore({ calendarEvents: next });
                    }} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TEAM */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTeamMembers.map((member) => (
                <div key={member.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{member.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* PASSCODE MODAL */}
      {passcodeModalChannel && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 text-right">
            <h3 className="font-bold text-amber-400 text-sm">غرفة مغلقة مشفرة</h3>
            <p className="text-xs text-slate-400">أدخل الرمز السري للوصول إلى ({passcodeModalChannel.name}):</p>
            <form onSubmit={handleVerifyPasscode} className="space-y-3">
              <input
                type="password"
                required
                value={enteredPasscode}
                onChange={(e) => setEnteredPasscode(e.target.value)}
                placeholder="الرمز السري..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
              />
              {passcodeError && <div className="text-xs text-red-400">{passcodeError}</div>}
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setPasscodeModalChannel(null)} className="flex-1 bg-slate-800 text-slate-300 py-2 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="flex-1 bg-amber-500 text-slate-950 py-2 rounded-xl text-xs font-bold">دخول</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
