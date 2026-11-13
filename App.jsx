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
  Navigation
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
    day: 'اليوم الأول',
    date: '2026-11-12',
    location: 'حي الطريف - الدرعية التاريخية، الرياض',
    mapLink: 'https://maps.google.com/?q=Diriyah',
    parkingNotes: 'مواقف طاقم الإنتاج بجوار البوابة الرئيسية رقم 3',
    callTime: '06:30 صباحاً',
    weather: 'مشمس 28°C',
    scenes: 'المشهد 1 (خارجي/نهار)، المشهد 2 (غروب)',
    importantNotes: 'الرجاء الحضور قبل 30 دقيقة من الوقت المحدد للمكياج والتجهيز.',
    checkedInMembers: []
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    title: 'المعزوفة - فيلم قصير',
    description: 'ملفات السيناريو، الستوري بورد، ومقاطع التصوير الخاصة بالعمل',
    status: 'قيد التصوير والمونتاج',
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
  const [editingRoleMember, setEditingRoleMember] = useState(null);
  const [newRoleInput, setNewRoleInput] = useState('');

  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('Art Department');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regInviteCode, setRegInviteCode] = useState('');
  const [regError, setRegError] = useState('');

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

  // Project-specific Shot Lists state
  const [shotLists, setShotLists] = useState([
    { id: 'sl_1', projectId: 'proj_1', scene: 'المشهد 1', shotNum: '1', shotSize: 'Wide Shot (WS)', movement: 'Panning', lens: '35mm', description: 'لقطة تأسيسية لموقع التصوير عند الشروق', assignedTo: 'عبدالعزيز / طارق' }
  ]);
  const [showAddShotList, setShowAddShotList] = useState(false);
  const [newSlScene, setNewSlScene] = useState('');
  const [newSlNum, setNewSlNum] = useState('');
  const [newSlSize, setNewSlSize] = useState('Medium Shot (MS)');
  const [newSlMovement, setNewSlMovement] = useState('');
  const [newSlLens, setNewSlLens] = useState('');
  const [newSlDesc, setNewSlDesc] = useState('');
  const [newSlAssign, setNewSlAssign] = useState('');

  const [castList, setCastList] = useState([
    { id: 'cast_1', characterName: 'سلطان', actorName: 'محمد العتيبي', phone: '0500000000', costumeNotes: 'بدلة رسمية كلاسيكية', rehearsalTime: 'الخميس 4 عصراً' }
  ]);
  const [showAddCast, setShowAddCast] = useState(false);
  const [newCastChar, setNewCastChar] = useState('');
  const [newCastActor, setNewCastActor] = useState('');
  const [newCastPhone, setNewCastPhone] = useState('');
  const [newCastCostume, setNewCastCostume] = useState('');
  const [newCastRehearsal, setNewCastRehearsal] = useState('');

  const [propsInventory, setPropsInventory] = useState([
    { id: 'prop_1', name: 'كرسي خشبي عتيق (طراز 1980)', category: 'أثاث', status: 'متاح', location: 'المستودع أ', assignedTo: 'فهد' }
  ]);
  const [showAddProp, setShowAddProp] = useState(false);
  const [newPropName, setNewPropName] = useState('');
  const [newPropCat, setNewPropCat] = useState('أثاث');
  const [newPropStatus, setNewPropStatus] = useState('متاح');
  const [newPropLoc, setNewPropLoc] = useState('');
  const [newPropAssign, setNewPropAssign] = useState('');

  const [budgetItems, setBudgetItems] = useState([
    { id: 'b_1', title: 'إيجار معدات الإضاءة والكاميرات', category: 'إنتاج', amount: '4500', type: 'مصروف', date: '2026-11-10' },
    { id: 'b_2', title: 'ديكورات وتجهيزات المشهد الداخلي', category: 'فنون وديكور', amount: '2000', type: 'مصروف', date: '2026-11-11' }
  ]);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBTitle, setNewBTitle] = useState('');
  const [newBCat, setNewBCat] = useState('إنتاج');
  const [newBAmount, setNewBAmount] = useState('');
  const [newBType, setNewBType] = useState('مصروف');

  const [newDeptTaskTitle, setNewDeptTaskTitle] = useState('');
  const [newDeptTaskAssignee, setNewDeptTaskAssignee] = useState('');
  const [newDeptTaskPriority, setNewDeptTaskPriority] = useState('medium');
  const [newDeptTaskDueDate, setNewDeptTaskDueDate] = useState('');
  const [newDeptTaskFileName, setNewDeptTaskFileName] = useState('');
  const [newDeptTaskFileUrl, setNewDeptTaskFileUrl] = useState('');
  const [showDeptTaskFileInputs, setShowDeptTaskFileInputs] = useState(false);

  const [emailNotificationLog, setEmailNotificationLog] = useState('');

  const [newCsDay, setNewCsDay] = useState('');
  const [newCsDate, setNewCsDate] = useState('');
  const [newCsLocation, setNewCsLocation] = useState('');
  const [newCsMapLink, setNewCsMapLink] = useState('');
  const [newCsParking, setNewCsParking] = useState('');
  const [newCsCallTime, setNewCsCallTime] = useState('');
  const [newCsScenes, setNewCsScenes] = useState('');
  const [newCsNotes, setNewCsNotes] = useState('');
  const [showAddCallSheet, setShowAddCallSheet] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState(INITIAL_EVENTS);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventColor, setNewEventColor] = useState('amber');
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const [customChannels, setCustomChannels] = useState([]);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanCode, setNewChanCode] = useState('');

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectSubTab, setProjectSubTab] = useState('assets'); // 'assets' or 'shotlist'
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState('قيد التحضير');
  const [newProjectBudget, setNewProjectBudget] = useState('');

  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('script');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [showAddAsset, setShowAddAsset] = useState(false);

  const [callSheets, setCallSheets] = useState(INITIAL_CALL_SHEETS);
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [assets, setAssets] = useState([]);
  const [channelMembers, setChannelMembers] = useState({});
  const [syncStatus, setSyncStatus] = useState('جاري الاتصال...');
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  const [unlockedChannels, setUnlockedChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('cue_unlocked_channels_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [passcodeModalChannel, setPasscodeModalChannel] = useState(null);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const rawTeamMembers = [...INITIAL_TEAM_MEMBERS, ...customMembers];
  const allTeamMembers = rawTeamMembers.map((m) => ({
    ...m,
    role: memberRoles[m.id] !== undefined ? memberRoles[m.id] : m.role
  }));

  const allChannels = [...INITIAL_CHANNELS, ...customChannels].map((c) => ({
    ...c,
    code: channelPasscodes[c.id] !== undefined ? channelPasscodes[c.id] : c.code
  }));

  useEffect(() => {
    try {
      localStorage.setItem('cue_unlocked_channels_v2', JSON.stringify(unlockedChannels));
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
          if (data.propsInventory !== undefined) setPropsInventory(data.propsInventory);
          if (data.budgetItems !== undefined) setBudgetItems(data.budgetItems);
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
            propsInventory: [],
            budgetItems: [],
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
    const clockInterval = setInterval(() => {
      setNowTick(Date.now());
    }, 15000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const sendHeartbeat = async () => {
      const now = Date.now();
      setOnlinePresence((prev) => ({ ...prev, [currentUser.id]: now }));
      try {
        await setDoc(
          workspaceDocRef,
          { onlinePresence: { [currentUser.id]: now } },
          { merge: true }
        );
      } catch (err) {
        console.error('Presence update failed:', err);
      }
    };

    sendHeartbeat();
    const hbInterval = setInterval(sendHeartbeat, 25000);

    const handleBeforeUnload = () => {
      setDoc(
        workspaceDocRef,
        { onlinePresence: { [currentUser.id]: 0 } },
        { merge: true }
      ).catch(() => {});
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      clearInterval(hbInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
      propsInventory: newPartialState.propsInventory !== undefined ? newPartialState.propsInventory : propsInventory,
      budgetItems: newPartialState.budgetItems !== undefined ? newPartialState.budgetItems : budgetItems,
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

  const handleRemoveMemberFromChannel = async (memberId) => {
    if (!isManagementUser || activeChannel.startsWith('dm_')) return;
    const currentList = channelMembers[activeChannel] || [];
    const updatedList = currentList.filter((m) => m.id !== memberId);
    
    const updatedChannelMembers = {
      ...channelMembers,
      [activeChannel]: updatedList
    };

    setChannelMembers(updatedChannelMembers);
    await updateGlobalStore({ channelMembers: updatedChannelMembers });
  };

  const handleCreateCustomChannel = async (e) => {
    e.preventDefault();
    if (!newChanName.trim() || !newChanCode.trim() || currentUser?.id !== 'fahad') return;

    const newChannelId = 'dept_' + Date.now();
    const newChannelObj = {
      id: newChannelId,
      name: newChanName.trim(),
      icon: Lock,
      private: true,
      code: newChanCode.trim()
    };

    const nextCustomChannels = [...customChannels, newChannelObj];
    setCustomChannels(nextCustomChannels);
    setUnlockedChannels((prev) => ({ ...prev, [newChannelId]: newChanCode.trim() }));
    setActiveChannel(newChannelId);

    setNewChanName('');
    setNewChanCode('');
    setShowAddChannelModal(false);

    await updateGlobalStore({ customChannels: nextCustomChannels });
  };

  const handleUpdateChannelPasscode = async (e) => {
    e.preventDefault();
    if (!editingChannelForPasscode || !newPasscodeInput.trim() || currentUser?.id !== 'fahad') return;

    const chanId = editingChannelForPasscode.id;
    const newCode = newPasscodeInput.trim();

    const nextPasscodes = { ...channelPasscodes, [chanId]: newCode };
    setChannelPasscodes(nextPasscodes);

    const nextUnlocked = { ...unlockedChannels };
    delete nextUnlocked[chanId];
    setUnlockedChannels(nextUnlocked);

    setEditingChannelForPasscode(null);
    setNewPasscodeInput('');

    await updateGlobalStore({ channelPasscodes: nextPasscodes });
    alert(`تم تحديث الرمز السري لـ (${editingChannelForPasscode.name}) بنجاح.`);
  };

  const handleSaveMemberRole = async (e) => {
    e.preventDefault();
    if (!editingRoleMember || currentUser?.id !== 'fahad') return;

    const nextRoles = { ...memberRoles, [editingRoleMember.id]: newRoleInput.trim() };
    setMemberRoles(nextRoles);
    setEditingRoleMember(null);
    setNewRoleInput('');

    await updateGlobalStore({ memberRoles: nextRoles });
  };

  const handleDeleteCustomChannel = async (channelId, e) => {
    e.stopPropagation();
    if (currentUser?.id !== 'fahad') return;

    const nextCustomChannels = customChannels.filter((c) => c.id !== channelId);
    const nextUnlocked = { ...unlockedChannels };
    delete nextUnlocked[channelId];
    setUnlockedChannels(nextUnlocked);

    let nextActiveChannel = activeChannel;
    if (activeChannel === channelId) {
      nextActiveChannel = 'general';
    }

    setCustomChannels(nextCustomChannels);
    setActiveChannel(nextActiveChannel);

    await updateGlobalStore({ customChannels: nextCustomChannels });
  };

  // Handlers for Project-Specific Shot Lists
  const handleAddShotList = (e) => {
    e.preventDefault();
    if (!newSlScene.trim() || !newSlNum.trim() || !selectedProjectId) return;
    const item = {
      id: 'sl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      projectId: selectedProjectId,
      scene: newSlScene.trim(),
      shotNum: newSlNum.trim(),
      shotSize: newSlSize,
      movement: newSlMovement.trim() || 'ثابت',
      lens: newSlLens.trim() || '50mm',
      description: newSlDesc.trim(),
      assignedTo: newSlAssign.trim() || activeUserObj.name.split(' ')[0]
    };
    const next = [item, ...shotLists];
    setShotLists(next);
    updateGlobalStore({ shotLists: next });
    setNewSlScene('');
    setNewSlNum('');
    setNewSlDesc('');
    setNewSlAssign('');
    setShowAddShotList(false);
  };

  const handleDeleteShotList = (id) => {
    const next = shotLists.filter(s => s.id !== id);
    setShotLists(next);
    updateGlobalStore({ shotLists: next });
  };

  const handleAddCast = (e) => {
    e.preventDefault();
    if (!newCastChar.trim() || !newCastActor.trim()) return;
    const item = {
      id: 'cast_' + Date.now(),
      characterName: newCastChar.trim(),
      actorName: newCastActor.trim(),
      phone: newCastPhone.trim() || 'غير متوفر',
      costumeNotes: newCastCostume.trim() || 'قيد التجهيز',
      rehearsalTime: newCastRehearsal.trim() || 'يُحدد لاحقاً'
    };
    const next = [item, ...castList];
    setCastList(next);
    updateGlobalStore({ castList: next });
    setNewCastChar('');
    setNewCastActor('');
    setNewCastPhone('');
    setNewCastCostume('');
    setNewCastRehearsal('');
    setShowAddCast(false);
  };

  const handleDeleteCast = (id) => {
    const next = castList.filter(c => c.id !== id);
    setCastList(next);
    updateGlobalStore({ castList: next });
  };

  const handleAddProp = (e) => {
    e.preventDefault();
    if (!newPropName.trim()) return;
    const item = {
      id: 'prop_' + Date.now(),
      name: newPropName.trim(),
      category: newPropCat,
      status: newPropStatus,
      location: newPropLoc.trim() || 'المستودع الرئيسي',
      assignedTo: newPropAssign.trim() || activeUserObj.name.split(' ')[0]
    };
    const next = [item, ...propsInventory];
    setPropsInventory(next);
    updateGlobalStore({ propsInventory: next });
    setNewPropName('');
    setNewPropLoc('');
    setNewPropAssign('');
    setShowAddProp(false);
  };

  const handleDeleteProp = (id) => {
    const next = propsInventory.filter(p => p.id !== id);
    setPropsInventory(next);
    updateGlobalStore({ propsInventory: next });
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newBTitle.trim() || !newBAmount.trim()) return;
    const item = {
      id: 'b_' + Date.now(),
      title: newBTitle.trim(),
      category: newBCat,
      amount: newBAmount.trim(),
      type: newBType,
      date: new Date().toISOString().split('T')[0]
    };
    const next = [item, ...budgetItems];
    setBudgetItems(next);
    updateGlobalStore({ budgetItems: next });
    setNewBTitle('');
    setNewBAmount('');
    setShowAddBudget(false);
  };

  const handleDeleteBudget = (id) => {
    const next = budgetItems.filter(b => b.id !== id);
    setBudgetItems(next);
    updateGlobalStore({ budgetItems: next });
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

  const handleCreatePoll = (e) => {
    e.preventDefault();
    if (!newPollQuestion.trim() || !currentUser) return;
    const validOptions = newPollOptions.filter((opt) => opt.trim() !== '');
    if (validOptions.length < 2) return;

    const activeChanObj = allChannels.find((c) => c.id === activeChannel);
    const chanName = activeChanObj ? activeChanObj.name : 'القسم';

    const newPollObj = {
      id: 'poll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      channelId: activeChannel,
      question: newPollQuestion.trim(),
      options: validOptions.map((opt) => ({ text: opt.trim(), votes: [] })),
      createdBy: activeUserObj.name.split(' ')[0],
      createdAt: Date.now()
    };

    const nextPolls = [newPollObj, ...polls];
    setPolls(nextPolls);
    updateGlobalStore({ polls: nextPolls });

    setNewPollQuestion('');
    setNewPollOptions(['', '']);
    setShowAddPollModal(false);

    setEmailNotificationLog(`📊 تم إنشاء تصويت جديد في (${chanName}) وإرسال إشعار بريدي.`);
    setTimeout(() => setEmailNotificationLog(''), 6000);
  };

  const handleVotePoll = (pollId, optionIndex) => {
    if (!currentUser) return;
    const nextPolls = polls.map((poll) => {
      if (poll.id !== pollId) return poll;

      const updatedOptions = poll.options.map((opt, idx) => {
        let newVotes = [...opt.votes];
        const hasVotedThis = newVotes.includes(currentUser.id);

        if (idx === optionIndex) {
          if (hasVotedThis) {
            newVotes = newVotes.filter((id) => id !== currentUser.id);
          } else {
            if (!newVotes.includes(currentUser.id)) newVotes.push(currentUser.id);
          }
        } else {
          newVotes = newVotes.filter((id) => id !== currentUser.id);
        }
        return { ...opt, votes: newVotes };
      });

      return { ...poll, options: updatedOptions };
    });

    setPolls(nextPolls);
    updateGlobalStore({ polls: nextPolls });
  };

  const handleDeletePoll = (pollId) => {
    const nextPolls = polls.filter((p) => p.id !== pollId);
    setPolls(nextPolls);
    updateGlobalStore({ polls: nextPolls });
  };

  const handleSelfRegister = async (e) => {
    e.preventDefault();
    setRegError('');

    if (!isCloudLoaded) {
      setRegError('جاري الاتصال بالسحابة... انتظر ثانية ثم اضغط تسجيل.');
      return;
    }

    const cleanName = regName.trim();
    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanPhone = regPhone.trim();
    const cleanPass = regPassword.trim();
    const cleanInvite = regInviteCode.trim().toUpperCase();

    if (cleanInvite !== TEAM_INVITE_CODE) {
      setRegError('رمز دعوة الفريق غير صحيح.');
      return;
    }
    if (cleanName.length < 3) {
      setRegError('يرجى كتابة الاسم الكامل بشكل صحيح.');
      return;
    }
    if (cleanPass.length < 4) {
      setRegError('يجب أن يتكون الرمز من 4 خانات على الأقل.');
      return;
    }

    const emailExists = allTeamMembers.some((m) => m.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      setRegError('هذا البريد الإلكتروني مسجل مسبقاً!');
      return;
    }

    const newMemberId = 'member_' + Date.now();
    const newMember = {
      id: newMemberId,
      name: cleanName,
      role: regRole,
      status: 'online',
      avatar: '',
      phone: cleanPhone || 'غير مضاف',
      email: cleanEmail,
      isCustom: true
    };

    const updatedCustomMembers = [...customMembers, newMember];
    const updatedPasswords = { ...userPasswords, [newMemberId]: cleanPass };

    setCustomMembers(updatedCustomMembers);
    setUserPasswords(updatedPasswords);

    await updateGlobalStore({
      customMembers: updatedCustomMembers,
      userPasswords: updatedPasswords
    });

    setRegName('');
    setRegPhone('');
    setRegEmail('');
    setRegPassword('');
    setRegInviteCode('');
    setAuthMode('login');
    setCurrentUser(newMember);
  };

  const handleDeleteCustomMember = async (memberId) => {
    if (!isManagementUser) return;
    const updatedCustomMembers = customMembers.filter((m) => m.id !== memberId);
    const updatedPasswords = { ...userPasswords };
    delete updatedPasswords[memberId];
    setCustomMembers(updatedCustomMembers);
    setUserPasswords(updatedPasswords);
    await updateGlobalStore({
      customMembers: updatedCustomMembers,
      userPasswords: updatedPasswords
    });
  };

  const handleAddCalendarEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDate) return;

    const colorMap = {
      amber: 'تصوير ومشاهد',
      purple: 'بروفات وعروض',
      emerald: 'اجتماعات وإدارة',
      blue: 'مونتاج ومونيتور',
      rose: 'موعد نهائي (Deadlines)'
    };

    const newEv = {
      id: 'ev_' + Date.now(),
      title: newEventTitle.trim(),
      date: newEventDate,
      color: newEventColor,
      category: colorMap[newEventColor] || 'عام'
    };

    const nextEvents = [newEv, ...calendarEvents];
    setCalendarEvents(nextEvents);
    updateGlobalStore({ calendarEvents: nextEvents });

    setNewEventTitle('');
    setNewEventDate('');
    setShowAddEventModal(false);

    setEmailNotificationLog('✉️ تم إرسال إشعار بريدي للفعالية الجديدة.');
    setTimeout(() => setEmailNotificationLog(''), 6000);
  };

  const handleDeleteCalendarEvent = (evId) => {
    const nextEvents = calendarEvents.filter((ev) => ev.id !== evId);
    setCalendarEvents(nextEvents);
    updateGlobalStore({ calendarEvents: nextEvents });
  };

  const handleStartDirectChat = (targetMember) => {
    if (!currentUser || targetMember.id === currentUser.id) return;
    const dmChannelId = getDirectChannelId(currentUser.id, targetMember.id);
    if (!openedDmUserIds.includes(targetMember.id)) {
      setOpenedDmUserIds((prev) => [targetMember.id, ...prev]);
    }
    setActiveChannel(dmChannelId);
    setChannelSubTab('chat');
    setActiveTab('chat');
    setMobileSidebarOpen(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !currentUser) return;

    const newProj = {
      id: 'proj_' + Date.now(),
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim() || 'مجلد ملفات العمل',
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

  const handleDeleteProject = (projId, e) => {
    e.stopPropagation();
    const nextProjects = projects.filter((p) => p.id !== projId);
    const nextAssets = assets.filter((a) => a.projectId !== projId);
    const nextShotLists = shotLists.filter((s) => s.projectId !== projId);
    setProjects(nextProjects);
    setAssets(nextAssets);
    setShotLists(nextShotLists);
    if (selectedProjectId === projId) setSelectedProjectId(null);
    updateGlobalStore({ projects: nextProjects, assets: nextAssets, shotLists: nextShotLists });
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAssetTitle.trim() || !currentUser || !selectedProjectId) return;

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

  const handleDeleteAsset = (assetId) => {
    const nextAssets = assets.filter((a) => a.id !== assetId);
    setAssets(nextAssets);
    updateGlobalStore({ assets: nextAssets });
  };

  const handleSelectChannel = (channel) => {
    const currentPasscode = channel.code;
    const isUnlocked = !channel.private || (unlockedChannels[channel.id] === currentPasscode) || currentUser?.id === 'fahad' || isManagementUser;

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
      setMobileSidebarOpen(false);
    } else {
      setPasscodeError('رمز الدخول غير صحيح!');
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageAttachment(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !imageAttachment) || !currentUser) return;

    const targetChan = allChannels.find((c) => c.id === activeChannel);
    if (targetChan?.isNews && !isManagementUser) {
      alert('هذا القسم مخصص لنشر الأخبار من الإدارة فقط.');
      return;
    }

    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      channelId: activeChannel,
      senderId: currentUser.id,
      sender: activeUserObj.name,
      senderAvatar: activeUserObj.avatar,
      text: inputMessage.trim(),
      image: imageAttachment || '',
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setInputMessage('');
    setImageAttachment(null);

    const nextMsgs = [...messages, newMsg];
    setMessages(nextMsgs);
    updateGlobalStore({ messages: nextMsgs });

    // Send Email Notification simulation if Direct Message
    if (activeChannel.startsWith('dm_') && dmPartner) {
      setEmailNotificationLog(`📧 تم إرسال إشعار بريدي إلكتروني إلى (${dmPartner.email}) بخصوص الرسالة الجديدة في المحادثة الخاصة.`);
      setTimeout(() => setEmailNotificationLog(''), 6000);
    }
  };

  const handleDeleteMessage = (msgId) => {
    const nextMsgs = messages.filter((m) => m.id !== msgId);
    setMessages(nextMsgs);
    updateGlobalStore({ messages: nextMsgs });
  };

  const handleAddDeptTask = (e) => {
    e.preventDefault();
    if (!newDeptTaskTitle.trim() || !currentUser) return;

    const activeChanObj = allChannels.find((c) => c.id === activeChannel);
    const chanName = activeChanObj ? activeChanObj.name : 'القسم';

    const newTask = {
      id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 4),
      channelId: activeChannel,
      title: newDeptTaskTitle.trim(),
      assignee: newDeptTaskAssignee.trim() || activeUserObj.name.split(' ')[0],
      priority: newDeptTaskPriority,
      dueDate: newDeptTaskDueDate || 'بدون موعد',
      fileName: newDeptTaskFileName.trim(),
      fileUrl: newDeptTaskFileUrl.trim(),
      status: 'todo',
      createdAt: Date.now()
    };

    setNewDeptTaskTitle('');
    setNewDeptTaskAssignee('');
    setNewDeptTaskDueDate('');
    setNewDeptTaskFileName('');
    setNewDeptTaskFileUrl('');
    setShowDeptTaskFileInputs(false);

    const nextTasks = [...tasks, newTask];
    setTasks(nextTasks);
    updateGlobalStore({ tasks: nextTasks });

    setEmailNotificationLog(`✉️ تم إرسال إشعار بريدي للمهمة الجديدة لأعضاء (${chanName}).`);
    setTimeout(() => setEmailNotificationLog(''), 6000);
  };

  const handleCompleteTask = (taskId) => {
    const nextTasks = tasks.map((t) => (t.id === taskId ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t));
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
      mapLink: newCsMapLink.trim() || '',
      parkingNotes: newCsParking.trim() || 'المواقف المعتمدة للطاقم',
      callTime: newCsCallTime.trim() || '07:00 صباحاً',
      weather: 'معتدل',
      scenes: newCsScenes.trim() || 'جميع مشاهد اليوم',
      importantNotes: newCsNotes.trim() || 'الالتزام بمواعيد التجمع والزي المطلوب.',
      checkedInMembers: []
    };

    const nextCs = [newCs, ...callSheets];
    setCallSheets(nextCs);
    updateGlobalStore({ callSheets: nextCs });

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

  const handleDeleteCallSheet = (csId) => {
    const nextCs = callSheets.filter((cs) => cs.id !== csId);
    setCallSheets(nextCs);
    updateGlobalStore({ callSheets: nextCs });
  };

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
    if (cleanNewPass === DEFAULT_PASSWORD) {
      setPasswordSetupError('يرجى اختيار رمز خاص بك يختلف عن الافتراضي.');
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

  const handleResetMemberPassword = async (memberId, memberName) => {
    if (!isManagementUser) return;
    const updatedPasswords = { ...userPasswords };
    delete updatedPasswords[memberId];
    setUserPasswords(updatedPasswords);
    await updateGlobalStore({ userPasswords: updatedPasswords });
    alert(`تمت إعادة ضبط رمز (${memberName}) للرمز الافتراضي.`);
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

  const isDirectMessage = activeChannel.startsWith('dm_');
  const dmPartner = isDirectMessage && currentUser
    ? allTeamMembers.find((m) => m.id !== currentUser.id && activeChannel === getDirectChannelId(currentUser.id, m.id))
    : null;

  const dmPartnerList = currentUser
    ? allTeamMembers.filter((m) => {
        if (m.id === currentUser.id) return false;
        const dmId = getDirectChannelId(currentUser.id, m.id);
        const hasMessages = messages.some((msg) => msg.channelId === dmId);
        return hasMessages || openedDmUserIds.includes(m.id);
      })
    : [];

  const currentMessages = messages.filter((m) => m.channelId === activeChannel);
  const currentPolls = polls.filter((p) => p.channelId === activeChannel);
  const currentChannelTasks = tasks.filter((t) => (t.channelId || 'general') === activeChannel);
  const activeMembersInChannel = channelMembers[activeChannel] || [];
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const projectAssets = assets.filter((a) => a.projectId === selectedProjectId);
  const projectShotLists = shotLists.filter((s) => s.projectId === selectedProjectId);
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
            <p className="text-xs text-slate-300 leading-relaxed">
              قم بتعيين <span className="text-amber-400 font-bold">رمز سري خاص بك</span> لحسابك:
            </p>
          </div>

          <form onSubmit={handleSavePersonalPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الرمز السري الجديد:</label>
              <input
                type="password"
                required
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="اكتب رمزك السري..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">تأكيد الرمز:</label>
              <input
                type="password"
                required
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="أعد كتابة الرمز..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            {passwordSetupError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                {passwordSetupError}
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs"
              >
                رجوع
              </button>
              <button
                type="submit"
                className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm"
              >
                حفظ والدخول
              </button>
            </div>
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
            <p className="text-[11px] text-slate-400">
              {authMode === 'login' ? 'منصة الاستوديو السينمائي الموحدة' : 'إنشاء حساب عضو جديد'}
            </p>
          </div>

          {authMode === 'login' ? (
            <>
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
                {loginError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                    {loginError}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm shadow-lg shadow-amber-500/10"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="text-center border-t border-slate-800 pt-4 space-y-2">
                <p className="text-xs text-slate-400">عضو جديد في الفريق؟</p>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setLoginError(''); setRegError(''); }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>سجّل حسابك الآن</span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSelfRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="مثال: فهد السعود"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">القسم / التخصص:</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="Art Department">Art Department (الديكور والفن)</option>
                  <option value="Production Department">Production Department (الإنتاج)</option>
                  <option value="Directing Department">Directing Department (الإخراج)</option>
                  <option value="Cinematography Department">Cinematography Department (التصوير)</option>
                  <option value="Post-Production Department">Post-Production Department (المونتاج)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال:</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رمز الدعوة:</label>
                  <input
                    type="text"
                    required
                    value={regInviteCode}
                    onChange={(e) => setRegInviteCode(e.target.value)}
                    placeholder="رمز الفريق"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني:</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الرمز السري الخاص:</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="4 خانات على الأقل"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5"
                />
              </div>
              {regError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                  {regError}
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setRegError(''); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs"
                >
                  رجوع للدخول
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
                >
                  إنشاء الحساب
                </button>
              </div>
            </form>
          )}
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
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            <button
              onClick={() => { setActiveTab('chat'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>الأقسام والمحادثات</span>
            </button>

            <button
              onClick={() => { setActiveTab('cast'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'cast' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>دليل الممثلين والشخصيات</span>
            </button>

            <button
              onClick={() => { setActiveTab('budget'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'budget' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>الميزانية والمصروفات</span>
            </button>

            <button
              onClick={() => { setActiveTab('callsheet'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'callsheet' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>جدول التصوير (Call Sheet)</span>
            </button>

            <button
              onClick={() => { setActiveTab('calendar'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'calendar' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>التقويم والأحداث</span>
            </button>

            <button
              onClick={() => { setActiveTab('assets'); setSelectedProjectId(null); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'assets' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>مكتبة المشاريع والـ Shot Lists</span>
            </button>

            <button
              onClick={() => { setActiveTab('team'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'team' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Users className="w-4 h-4" />
                <span>دليل الأفراد</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">
                {onlineCount} متصل
              </span>
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
          <button
            onClick={() => { setNewPasswordInput(''); setConfirmPasswordInput(''); setPasswordSetupError(''); setShowChangePasswordModal(true); }}
            className="w-full py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-700 flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>تغيير رمزي السري</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-center py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium border border-red-500/20"
          >
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
              {activeTab === 'chat' && (isDirectMessage && dmPartner ? `محادثة خاصة مع ${dmPartner.name}` : 'غرف التواصل ومهام الأقسام')}
              {activeTab === 'cast' && 'دليل طاقم التمثيل والشخصيات'}
              {activeTab === 'budget' && 'نظام تتبع الميزانية والمصروفات'}
              {activeTab === 'calendar' && 'التقويم الملون وأحداث الفريق'}
              {activeTab === 'callsheet' && 'أجندة يوم التصوير والإحداثيات (Call Sheet)'}
              {activeTab === 'assets' && (!selectedProjectId ? 'مكتبة المشاريع وقوائم اللقطات (Shot Lists)' : `مشروع: ${selectedProject?.title}`)}
              {activeTab === 'team' && `دليل أفراد تيم كيو (${onlineCount} متواجد من ${allTeamMembers.length})`}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {isManagementUser && (
              <span className="hidden sm:inline-block text-[11px] px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full font-mono">
                رمز الدعوة: {TEAM_INVITE_CODE}
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5 font-semibold">
              <Cloud className="w-3.5 h-3.5" /> {syncStatus}
            </span>
          </div>
        </header>

        {emailNotificationLog && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-300 flex items-center gap-2 animate-pulse">
            <BellRing className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{emailNotificationLog}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-3 md:p-6">
          {/* TAB: CHAT & DEPARTMENTS */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-4 max-h-48 md:max-h-full overflow-y-auto">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">الأقسام والغرف</h3>
                  {currentUser?.id === 'fahad' && (
                    <button
                      onClick={() => setShowAddChannelModal(true)}
                      className="text-[10px] bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 px-2 py-1 rounded border border-amber-500/30 font-bold flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" /> قسم جديد
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {allChannels.map((channel) => {
                    const isUnlocked = !channel.private || (unlockedChannels[channel.id] === channel.code) || currentUser?.id === 'fahad' || isManagementUser;
                    const IconComponent = channel.icon || Hash;
                    const deptTasksCount = tasks.filter((t) => (t.channelId || 'general') === channel.id && t.status !== 'done').length;
                    const isCustomDept = channel.id.startsWith('dept_');
                    return (
                      <div
                        key={channel.id}
                        onClick={() => handleSelectChannel(channel)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          activeChannel === channel.id
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2 space-x-reverse truncate flex-1">
                          <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${channel.private && !isUnlocked ? 'text-red-400' : 'text-amber-400'}`} />
                          <span className="truncate">{channel.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {deptTasksCount > 0 && isUnlocked && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                              {deptTasksCount}
                            </span>
                          )}
                          {channel.private && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {isUnlocked ? 'مفتوح' : 'مشفر'}
                            </span>
                          )}
                          {currentUser?.id === 'fahad' && channel.private && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setEditingChannelForPasscode(channel); setNewPasscodeInput(''); }}
                              className="p-1 text-slate-400 hover:text-amber-400 rounded hover:bg-amber-500/15"
                              title="تغيير الرمز السري"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {currentUser?.id === 'fahad' && isCustomDept && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCustomChannel(channel.id, e)}
                              className="p-1 text-slate-500 hover:text-red-400 rounded"
                              title="حذف القسم"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">المحادثات الخاصة</h3>
                    <button onClick={() => { setActiveTab('team'); setMobileSidebarOpen(false); }} className="text-[10px] text-amber-400 hover:underline font-bold">
                      + جديد
                    </button>
                  </div>
                  {dmPartnerList.length === 0 ? (
                    <p className="text-[11px] text-slate-500 px-2 leading-relaxed">اختر عضواً من دليل الفريق لبدء محادثة فردية.</p>
                  ) : (
                    <div className="space-y-1">
                      {dmPartnerList.map((member) => {
                        const dmId = getDirectChannelId(currentUser.id, member.id);
                        const online = isMemberOnline(member.id);
                        return (
                          <button
                            key={member.id}
                            onClick={() => handleStartDirectChat(member)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium ${
                              activeChannel === dmId ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${online ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                              <span className="truncate">{member.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden relative min-h-[450px]">
                <div className="px-4 md:px-5 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-col gap-2">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    {isDirectMessage && dmPartner ? (
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                          {dmPartner.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-100">{dmPartner.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${isMemberOnline(dmPartner.id) ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isMemberOnline(dmPartner.id) ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                              {isMemberOnline(dmPartner.id) ? 'متواجد الآن' : 'غير متصل'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{dmPartner.role} • {dmPartner.email}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Hash className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-bold text-slate-200">
                            {allChannels.find((c) => c.id === activeChannel)?.name}
                          </span>
                        </div>
                        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
                          <button
                            onClick={() => setChannelSubTab('chat')}
                            className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 ${channelSubTab === 'chat' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>المحادثة</span>
                          </button>
                          <button
                            onClick={() => setChannelSubTab('tasks')}
                            className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 ${channelSubTab === 'tasks' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                          >
                            <Kanban className="w-3.5 h-3.5" />
                            <span>مهام القسم ({currentChannelTasks.length})</span>
                          </button>
                          {activeChannel === 'art' && (
                            <button
                              onClick={() => setChannelSubTab('props')}
                              className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 ${channelSubTab === 'props' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                              <Box className="w-3.5 h-3.5" />
                              <span>سجل الإكسسوارات والديكور</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {(isDirectMessage || channelSubTab === 'chat') ? (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {currentPolls.map((poll) => {
                        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);
                        const canDeletePoll = poll.createdBy === activeUserObj.name.split(' ')[0] || isManagementUser;
                        return (
                          <div key={poll.id} className="bg-slate-950 border border-amber-500/30 p-4 rounded-xl space-y-3 shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                                  <BarChart2 className="w-4 h-4" />
                                </span>
                                <div>
                                  <span className="text-[10px] text-amber-400 font-bold">تصويت نشط • بواسطة {poll.createdBy}</span>
                                  <h4 className="text-xs font-bold text-slate-100">{poll.question}</h4>
                                </div>
                              </div>
                              {canDeletePoll && (
                                <button onClick={() => handleDeletePoll(poll.id)} className="p-1 text-red-400 hover:text-red-300">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <div className="space-y-2 pt-1">
                              {poll.options.map((option, idx) => {
                                const optionVotes = option.votes.length;
                                const percentage = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
                                const hasVotedThis = option.votes.includes(currentUser.id);
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleVotePoll(poll.id, idx)}
                                    className={`w-full text-right relative overflow-hidden p-2.5 rounded-lg border transition-all ${
                                      hasVotedThis ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    <div className="absolute inset-y-0 right-0 bg-amber-500/10" style={{ width: `${percentage}%` }}></div>
                                    <div className="relative flex justify-between items-center text-xs">
                                      <span>{option.text}</span>
                                      <span className="text-[11px] font-mono text-amber-400">{optionVotes} صوت ({percentage}%)</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {currentMessages.length === 0 && currentPolls.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm text-center px-4">
                          لا توجد رسائل بعد. ابدأ المحادثة أو أنشئ تصويتاً!
                        </div>
                      ) : (
                        currentMessages.map((msg) => {
                          const isMine = msg.senderId === currentUser.id;
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col border p-3 rounded-xl max-w-xl ${
                                isMine ? 'bg-amber-500/10 border-amber-500/30 mr-auto' : 'bg-slate-950/70 border-slate-800/80 ml-auto'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4 mb-1">
                                <span className="text-xs font-bold text-amber-400">{msg.sender}</span>
                                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                              </div>
                              {msg.text && <p className="text-xs text-slate-200">{msg.text}</p>}
                              {msg.image && <img src={msg.image} alt="مرفق" className="mt-2 max-h-60 rounded-lg object-cover" />}
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddPollModal(true)}
                          className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold px-3 py-2.5 rounded-lg text-xs flex items-center gap-1.5"
                        >
                          <BarChart2 className="w-4 h-4" /> تصويت
                        </button>
                        <label className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold px-3 py-2.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer">
                          <ImageIcon className="w-4 h-4" /> صورة
                          <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                        </label>
                        <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="اكتب رسالتك..."
                            className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                          />
                          <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5">
                            <Send className="w-3.5 h-3.5" /> إرسال
                          </button>
                        </form>
                      </div>
                    </div>
                  </>
                ) : channelSubTab === 'props' && activeChannel === 'art' ? (
                  /* PROPS & INVENTORY TRACKER INSIDE ART DEPT */
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div>
                        <h3 className="text-xs font-bold text-amber-400">سجل حجز وإدارة الإكسسوارات والديكور (Props & Inventory)</h3>
                        <p className="text-[11px] text-slate-400">تتبع قطع الديكور والأثاث ومكان تواجدها وحالتها</p>
                      </div>
                      <button
                        onClick={() => setShowAddProp(!showAddProp)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> إضافة قطعة ديكور / إكسسوار
                      </button>
                    </div>

                    {showAddProp && (
                      <form onSubmit={handleAddProp} className="bg-slate-950 border border-amber-500/30 p-4 rounded-xl space-y-3 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="text"
                            required
                            value={newPropName}
                            onChange={(e) => setNewPropName(e.target.value)}
                            placeholder="اسم القطعة أو الإكسسوار..."
                            className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                          />
                          <select
                            value={newPropCat}
                            onChange={(e) => setNewPropCat(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                          >
                            <option value="أثاث">أثاث</option>
                            <option value="إكسسوارات شخصية">إكسسوارات شخصية</option>
                            <option value="قطع تراثية">قطع تراثية</option>
                            <option value="أجهزة ومعدات ديكور">أجهزة ومعدات ديكور</option>
                          </select>
                          <select
                            value={newPropStatus}
                            onChange={(e) => setNewPropStatus(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                          >
                            <option value="متاح">متاح في المستودع</option>
                            <option value="في اللوكيشن">مستخدم في اللوكيشن</option>
                            <option value="مستأجر">مستأجر (يجب إرجاعه)</option>
                            <option value="تحت الصيانة">تحت الصيانة / التعديل</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={newPropLoc}
                            onChange={(e) => setNewPropLoc(e.target.value)}
                            placeholder="الموقع الحالي (مثال: المستودع أ / استوديو التصوير)"
                            className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                          />
                          <input
                            type="text"
                            value={newPropAssign}
                            onChange={(e) => setNewPropAssign(e.target.value)}
                            placeholder="المسؤول عن القطعة"
                            className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                          />
                        </div>
                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg">
                          حفظ القطعة في السجل
                        </button>
                      </form>
                    )}

                    <div className="space-y-2">
                      {propsInventory.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-xs">لا توجد قطع مسجلة حالياً.</div>
                      ) : (
                        propsInventory.map((prop) => (
                          <div key={prop.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-100">{prop.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">{prop.category}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{prop.status}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1">الموقع: {prop.location} • المسؤول: {prop.assignedTo}</p>
                            </div>
                            <button onClick={() => handleDeleteProp(prop.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  /* TASKS TAB WITH DUE DATE, PRIORITY & ASSIGNEE */
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <form onSubmit={handleAddDeptTask} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <input
                          type="text"
                          required
                          value={newDeptTaskTitle}
                          onChange={(e) => setNewDeptTaskTitle(e.target.value)}
                          placeholder="عنوان المهمة..."
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                        />
                        <input
                          type="text"
                          value={newDeptTaskAssignee}
                          onChange={(e) => setNewDeptTaskAssignee(e.target.value)}
                          placeholder="المكلف بالمهمة (الاسم)"
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                        />
                        <select
                          value={newDeptTaskPriority}
                          onChange={(e) => setNewDeptTaskPriority(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                        >
                          <option value="high">أولوية: عالية 🔥</option>
                          <option value="medium">أولوية: متوسطة ⚡</option>
                          <option value="low">أولوية: منخفضة ☕</option>
                        </select>
                        <input
                          type="date"
                          value={newDeptTaskDueDate}
                          onChange={(e) => setNewDeptTaskDueDate(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <button
                          type="button"
                          onClick={() => setShowDeptTaskFileInputs(!showDeptTaskFileInputs)}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Paperclip className="w-3.5 h-3.5" /> إرفاق ملف بالمهمة
                        </button>
                        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> إضافة المهمة
                        </button>
                      </div>

                      {showDeptTaskFileInputs && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                          <input
                            type="text"
                            value={newDeptTaskFileName}
                            onChange={(e) => setNewDeptTaskFileName(e.target.value)}
                            placeholder="اسم الملف (مثال: جدول.pdf)"
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                          />
                          <input
                            type="url"
                            value={newDeptTaskFileUrl}
                            onChange={(e) => setNewDeptTaskFileUrl(e.target.value)}
                            placeholder="رابط الملف..."
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2"
                          />
                        </div>
                      )}
                    </form>

                    <div className="space-y-2.5">
                      {currentChannelTasks.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 text-xs">لا توجد مهام في هذا القسم.</div>
                      ) : (
                        currentChannelTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3.5 rounded-xl border flex flex-col gap-2 ${
                              task.status === 'done' ? 'bg-slate-950/40 border-emerald-500/20 opacity-75' : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <button
                                  onClick={() => handleCompleteTask(task.id)}
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                    task.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
                                  }`}
                                >
                                  {task.status === 'done' && <Check className="w-3.5 h-3.5" />}
                                </button>
                                <span className={`text-xs font-semibold ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                  {task.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                  {task.priority === 'high' ? 'عالية' : task.priority === 'low' ? 'منخفضة' : 'متوسطة'}
                                </span>
                                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400">المكلف: {task.assignee}</span>
                                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">الاستحقاق: {task.dueDate}</span>
                                <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-red-400 hover:bg-red-500/20 rounded">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            {task.fileUrl && (
                              <div className="mr-7 flex items-center gap-2 text-[11px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg w-fit">
                                <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                                <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">
                                  {task.fileName || 'فتح الملف المرفق'} ↗
                                </a>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: CAST & TALENT DIRECTORY */}
          {activeTab === 'cast' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">دليل طاقم التمثيل والشخصيات (Cast & Talent)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">أسماء الشخصيات، الممثلين، أوقات البروفات، وملاحظات الأزياء والمكياج</p>
                </div>
                <button
                  onClick={() => setShowAddCast(!showAddCast)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> {showAddCast ? 'إغلاق النموذج' : 'إضافة ممثل / شخصية'}
                </button>
              </div>

              {showAddCast && (
                <form onSubmit={handleAddCast} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={newCastChar}
                      onChange={(e) => setNewCastChar(e.target.value)}
                      placeholder="اسم الشخصية (مثال: سلطان)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      value={newCastActor}
                      onChange={(e) => setNewCastActor(e.target.value)}
                      placeholder="اسم الممثل"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="tel"
                      value={newCastPhone}
                      onChange={(e) => setNewCastPhone(e.target.value)}
                      placeholder="رقم الجوال"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newCastCostume}
                      onChange={(e) => setNewCastCostume(e.target.value)}
                      placeholder="ملاحظات الأزياء والمكياج"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newCastRehearsal}
                      onChange={(e) => setNewCastRehearsal(e.target.value)}
                      placeholder="موعد البروفة"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                    حفظ الممثل في الدليل
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {castList.length === 0 ? (
                  <div className="col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                    لا يوجد ممثلين مسجلين بعد.
                  </div>
                ) : (
                  castList.map((c) => (
                    <div key={c.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">شخصية: {c.characterName}</span>
                          <h4 className="text-sm font-bold text-slate-100 mt-1">{c.actorName}</h4>
                        </div>
                        <button onClick={() => handleDeleteCast(c.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs space-y-1 text-slate-400 pt-2 border-t border-slate-800">
                        <p>📞 الجوال: {c.phone}</p>
                        <p>👔 الأزياء: {c.costumeNotes}</p>
                        <p className="text-amber-300">📅 موعد البروفة: {c.rehearsalTime}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: BUDGET & EXPENSES */}
          {activeTab === 'budget' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">نظام تتبع الميزانية والمصروفات (Budget Tracker)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">متابعة تكاليف الإنتاج، الديكور، الإيجارات، والمصروفات اليومية</p>
                </div>
                <button
                  onClick={() => setShowAddBudget(!showAddBudget)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> {showAddBudget ? 'إغلاق النموذج' : 'إضافة مصروف / بند'}
                </button>
              </div>

              {showAddBudget && (
                <form onSubmit={handleAddBudget} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      required
                      value={newBTitle}
                      onChange={(e) => setNewBTitle(e.target.value)}
                      placeholder="اسم البند أو التكلفة..."
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <select
                      value={newBCat}
                      onChange={(e) => setNewBCat(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    >
                      <option value="إنتاج">إنتاج ومعدات</option>
                      <option value="فنون وديكور">فنون وديكور</option>
                      <option value="إخراج وطاقم">إخراج وطاقم</option>
                      <option value="مواقع وتصاريح">مواقع وتصاريح</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                    <input
                      type="number"
                      required
                      value={newBAmount}
                      onChange={(e) => setNewBAmount(e.target.value)}
                      placeholder="المبلغ (ريال)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <select
                      value={newBType}
                      onChange={(e) => setNewBType(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    >
                      <option value="مصروف">مصروف (Expense)</option>
                      <option value="تمويل">تمويل / ميزانية مرصودة</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                    حفظ البند المالي
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {budgetItems.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                    لا توجد بنود ميزانية مسجلة حتى الآن.
                  </div>
                ) : (
                  budgetItems.map((b) => (
                    <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-100">{b.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400">{b.category}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${b.type === 'تمويل' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {b.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">التاريخ: {b.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold font-mono text-amber-400">{b.amount} ريال</span>
                        <button onClick={() => handleDeleteBudget(b.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: CALL SHEET (WITH MAPS, PARKING & CHECK-IN) */}
          {activeTab === 'callsheet' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-200">أجندة أيام التصوير وإحداثيات اللوكيشن (Call Sheet)</h3>
                <button
                  onClick={() => setShowAddCallSheet(!showAddCallSheet)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> {showAddCallSheet ? 'إغلاق النموذج' : 'إضافة يوم تصوير جديد'}
                </button>
              </div>

              {showAddCallSheet && (
                <form onSubmit={handleAddCallSheet} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newCsDay}
                      onChange={(e) => setNewCsDay(e.target.value)}
                      placeholder="عنوان اليوم (مثال: اليوم الأول)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="date"
                      value={newCsDate}
                      onChange={(e) => setNewCsDate(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      value={newCsLocation}
                      onChange={(e) => setNewCsLocation(e.target.value)}
                      placeholder="موقع التصوير (الدرعية التاريخية...)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="url"
                      value={newCsMapLink}
                      onChange={(e) => setNewCsMapLink(e.target.value)}
                      placeholder="رابط إحداثيات الخريطة (Google Maps URL)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newCsParking}
                      onChange={(e) => setNewCsParking(e.target.value)}
                      placeholder="ملاحظات مواقف السيارات والتجمع (Parking)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newCsCallTime}
                      onChange={(e) => setNewCsCallTime(e.target.value)}
                      placeholder="وقت التجمع (Call Time: 06:30 صباحاً)"
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    value={newCsScenes}
                    onChange={(e) => setNewCsScenes(e.target.value)}
                    placeholder="المشاهد المستهدفة لهذا اليوم"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                  />
                  <textarea
                    value={newCsNotes}
                    onChange={(e) => setNewCsNotes(e.target.value)}
                    placeholder="تعليمات هامة للطاقم..."
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                  />
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                    حفظ ونشر جدول التصوير
                  </button>
                </form>
              )}

              {callSheets.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                  لا يوجد جدول تصوير مضاف حالياً.
                </div>
              ) : (
                callSheets.map((cs) => {
                  const checkedInCount = (cs.checkedInMembers || []).length;
                  const isCheckedInByMe = (cs.checkedInMembers || []).includes(currentUser?.id);

                  return (
                    <div key={cs.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-xs text-amber-500 font-bold">{cs.day}</span>
                          <h3 className="text-xl font-bold text-slate-100">{cs.date}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold">
                            {cs.weather}
                          </span>
                          <button onClick={() => handleDeleteCallSheet(cs.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs">
                            حذف
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <div>
                              <div className="text-slate-400">موقع التصوير:</div>
                              <div className="font-bold text-slate-200">{cs.location}</div>
                            </div>
                          </div>
                          {cs.mapLink && (
                            <a
                              href={cs.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 hover:bg-amber-400"
                            >
                              <Navigation className="w-3.5 h-3.5" /> الخريطة
                            </a>
                          )}
                        </div>

                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                          <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          <div>
                            <div className="text-slate-400">وقت التجمع (Call Time):</div>
                            <div className="font-bold text-amber-400 text-sm">{cs.callTime}</div>
                          </div>
                        </div>
                      </div>

                      {cs.parkingNotes && (
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                          <span className="text-amber-400 font-bold">🅿️ مواقف السيارات والتجمع: </span>
                          <span className="text-slate-300">{cs.parkingNotes}</span>
                        </div>
                      )}

                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-300">سجل حضور الموقع (Digital Check-in):</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">عدد الحاضرين في الموقع حتى الآن: <span className="text-emerald-400 font-bold">{checkedInCount} عضواً</span></p>
                        </div>
                        <button
                          onClick={() => handleCheckInCallSheet(cs.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                            isCheckedInByMe ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {isCheckedInByMe ? 'تم تسجيل حضورك في الموقع ✓' : 'تسجيل وصولي للموقع الآن'}
                        </button>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-300 mb-1">المشاهد المستهدفة:</h4>
                        <p className="text-xs text-slate-400">{cs.scenes}</p>
                      </div>

                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300">
                        <strong>ملاحظة هامة:</strong> {cs.importantNotes}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">تقويم أحداث ومواعيد الفريق</h3>
                  <p className="text-xs text-slate-400 mt-0.5">مواعيد التصوير والبروفات والاجتماعات</p>
                </div>
                <button
                  onClick={() => setShowAddEventModal(!showAddEventModal)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> إضافة موعد
                </button>
              </div>

              {showAddEventModal && (
                <form onSubmit={handleAddCalendarEvent} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="عنوان الحدث..."
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <input
                      type="date"
                      required
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    />
                    <select
                      value={newEventColor}
                      onChange={(e) => setNewEventColor(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                    >
                      <option value="amber">أصفر (تصوير)</option>
                      <option value="purple">بنفسجي (بروفات)</option>
                      <option value="emerald">أخضر (اجتماعات)</option>
                      <option value="blue">أزرق (مونتاج)</option>
                      <option value="rose">أحمر (موعد نهائي)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                    حفظ الموعد
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {calendarEvents.map((ev) => (
                  <div key={ev.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{ev.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">التصنيف: {ev.category} • التاريخ: {ev.date}</p>
                    </div>
                    <button onClick={() => handleDeleteCalendarEvent(ev.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS & PROJECT-SPECIFIC SHOT LISTS HUB */}
          {activeTab === 'assets' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {!selectedProject ? (
                <>
                  <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">المشاريع القائمة حالياً وقوائم الـ Shot Lists الخاصة بكل عمل</h3>
                      <p className="text-xs text-slate-400 mt-0.5">اضغط على أي مشروع لفتح ملفاته وقائمة اللقطات الخاصة به (تدعم أكثر من 100 لقطة)</p>
                    </div>
                    <button
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <FolderPlus className="w-4 h-4" /> إضافة مشروع جديد
                    </button>
                  </div>

                  {showAddProject && (
                    <form onSubmit={handleAddProject} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                          placeholder="اسم المشروع / العمل..."
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        />
                        <select
                          value={newProjectStatus}
                          onChange={(e) => setNewProjectStatus(e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        >
                          <option value="قيد التحضير والتطوير">قيد التحضير والتطوير</option>
                          <option value="قيد التصوير">قيد التصوير</option>
                          <option value="قيد المونتاج وما بعد الإنتاج">قيد المونتاج وما بعد الإنتاج</option>
                          <option value="منجز وجاهز للعرض">منجز وجاهز للعرض</option>
                        </select>
                        <input
                          type="text"
                          value={newProjectBudget}
                          onChange={(e) => setNewProjectBudget(e.target.value)}
                          placeholder="الميزانية المرصودة (مثال: 20,000 ريال)"
                          className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                        />
                      </div>
                      <input
                        type="text"
                        value={newProjectDesc}
                        onChange={(e) => setNewProjectDesc(e.target.value)}
                        placeholder="وصف مختصر للمشروع والأهداف..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                      />
                      <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                        حفظ وإنشاء المشروع
                      </button>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => {
                      const assetCount = assets.filter((a) => a.projectId === proj.id).length;
                      const shotCount = shotLists.filter((s) => s.projectId === proj.id).length;
                      return (
                        <div
                          key={proj.id}
                          onClick={() => { setSelectedProjectId(proj.id); setProjectSubTab('assets'); }}
                          className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 rounded-xl cursor-pointer transition-all space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                              <Folder className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-bold">
                                {proj.status || 'قيد العمل'}
                              </span>
                              <button onClick={(e) => handleDeleteProject(proj.id, e)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100">{proj.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                            <span>الميزانية: <strong className="text-amber-400">{proj.budgetTotal || 'غير محدد'}</strong></span>
                            <span className="text-amber-400 font-bold">{assetCount} ملفات • {shotCount} لقطة (Shot List) ←</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedProjectId(null)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" /> رجوع للمشاريع
                      </button>
                      <div>
                        <h3 className="text-base font-bold text-amber-400">{selectedProject.title}</h3>
                        <p className="text-xs text-slate-400">الحالة: {selectedProject.status} • الميزانية: {selectedProject.budgetTotal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setProjectSubTab('assets')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${projectSubTab === 'assets' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Folder className="w-3.5 h-3.5" /> ملفات المشروع ({projectAssets.length})
                      </button>
                      <button
                        onClick={() => setProjectSubTab('shotlist')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${projectSubTab === 'shotlist' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Camera className="w-3.5 h-3.5" /> قائمة اللقطات Shot List ({projectShotLists.length})
                      </button>
                    </div>
                  </div>

                  {projectSubTab === 'assets' ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-300">مستندات وملفات هذا المشروع:</h4>
                        <button
                          onClick={() => setShowAddAsset(!showAddAsset)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> إضافة ملف للمشروع
                        </button>
                      </div>

                      {showAddAsset && (
                        <form onSubmit={handleAddAsset} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              required
                              value={newAssetTitle}
                              onChange={(e) => setNewAssetTitle(e.target.value)}
                              placeholder="اسم الملف / المجلد..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <select
                              value={newAssetCategory}
                              onChange={(e) => setNewAssetCategory(e.target.value)}
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            >
                              <option value="video">فيديو وعروض</option>
                              <option value="script">سيناريو</option>
                              <option value="moodboard">لوحة بصرية / صور</option>
                              <option value="other">ملف عام</option>
                            </select>
                            <input
                              type="url"
                              value={newAssetUrl}
                              onChange={(e) => setNewAssetUrl(e.target.value)}
                              placeholder="رابط السحابة (Drive / Frame.io)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                          </div>
                          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                            حفظ الملف
                          </button>
                        </form>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {projectAssets.length === 0 ? (
                          <div className="col-span-3 bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا توجد ملفات مرفقة في هذا المشروع حالياً.
                          </div>
                        ) : (
                          projectAssets.map((asset) => (
                            <div key={asset.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
                              <div className="flex items-start justify-between">
                                <FileText className="w-8 h-8 text-amber-400" />
                                <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">{asset.category}</span>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-200">{asset.title}</h4>
                                <p className="text-[11px] text-slate-400 mt-1">بواسطة: {asset.updatedBy}</p>
                              </div>
                              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                                {asset.url && (
                                  <a
                                    href={asset.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1"
                                  >
                                    <Eye className="w-3.5 h-3.5" /> فتح الرابط
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
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-slate-300">قائمة اللقطات الخاصة بهذا المشروع (تدعم أعداد كبيرة من اللقطات):</h4>
                          <p className="text-[11px] text-slate-400">إجمالي اللقطات المسجلة لهذا العمل: <span className="text-amber-400 font-bold">{projectShotLists.length} لقطة</span></p>
                        </div>
                        <button
                          onClick={() => setShowAddShotList(!showAddShotList)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> إضافة لقطة جديدة (Shot)
                        </button>
                      </div>

                      {showAddShotList && (
                        <form onSubmit={handleAddShotList} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input
                              type="text"
                              required
                              value={newSlScene}
                              onChange={(e) => setNewSlScene(e.target.value)}
                              placeholder="رقم / اسم المشهد (مثال: المشهد 2)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <input
                              type="text"
                              required
                              value={newSlNum}
                              onChange={(e) => setNewSlNum(e.target.value)}
                              placeholder="رقم اللقطة (مثال: Shot 105)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <select
                              value={newSlSize}
                              onChange={(e) => setNewSlSize(e.target.value)}
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            >
                              <option value="Extreme Wide Shot (EWS)">Extreme Wide Shot (EWS)</option>
                              <option value="Wide Shot (WS)">Wide Shot (WS)</option>
                              <option value="Medium Shot (MS)">Medium Shot (MS)</option>
                              <option value="Close Up (CU)">Close Up (CU)</option>
                              <option value="Extreme Close Up (ECU)">Extreme Close Up (ECU)</option>
                            </select>
                            <input
                              type="text"
                              value={newSlMovement}
                              onChange={(e) => setNewSlMovement(e.target.value)}
                              placeholder="حركة الكاميرا (Panning / Tracking)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={newSlLens}
                              onChange={(e) => setNewSlLens(e.target.value)}
                              placeholder="العدسة المستخدمة (مثال: 35mm أو 85mm)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <input
                              type="text"
                              value={newSlAssign}
                              onChange={(e) => setNewSlAssign(e.target.value)}
                              placeholder="المسؤول (المخرج / مدير التصوير)"
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                            <input
                              type="text"
                              value={newSlDesc}
                              onChange={(e) => setNewSlDesc(e.target.value)}
                              placeholder="وصف اللقطة وتكوين الكادر..."
                              className="bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg"
                            />
                          </div>
                          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl">
                            حفظ اللقطة في قائمة الـ Shot List الخاصة بالعمل
                          </button>
                        </form>
                      )}

                      <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto">
                        {projectShotLists.length === 0 ? (
                          <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                            لا توجد لقطات مسجلة لهذا المشروع حتى الآن. أضف أول لقطة!
                          </div>
                        ) : (
                          projectShotLists.map((sl) => (
                            <div key={sl.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-bold">{sl.scene} - لقطة {sl.shotNum}</span>
                                  <span className="text-xs font-semibold text-slate-200">{sl.shotSize}</span>
                                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">حركة: {sl.movement}</span>
                                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-amber-300">عدسة: {sl.lens}</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">{sl.description}</p>
                                <p className="text-[10px] text-slate-500 mt-1">بواسطة: {sl.assignedTo}</p>
                              </div>
                              <button onClick={() => handleDeleteShotList(sl.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg flex-shrink-0">
                                <Trash2 className="w-4 h-4" />
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

          {/* TAB: TEAM DIRECTORY */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTeamMembers.map((member) => {
                const online = isMemberOnline(member.id);
                return (
                  <div key={member.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base">
                          {member.name.charAt(0)}
                        </div>
                        <span className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${online ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-200">{member.name}</h4>
                        <p className="text-xs text-amber-400 font-medium">{member.role}</p>
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
                      {currentUser.id !== member.id && (
                        <button
                          onClick={() => handleStartDirectChat(member)}
                          className="w-full mt-2 py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> محادثة خاصة
                        </button>
                      )}
                      {isManagementUser && member.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomMember(member.id)}
                          className="w-full mt-1 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold"
                        >
                          حذف العضو
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODALS */}
        {showAddChannelModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
              <h3 className="font-bold text-amber-400 text-sm">إنشاء قسم أو غرفة جديدة</h3>
              <form onSubmit={handleCreateCustomChannel} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={newChanName}
                  onChange={(e) => setNewChanName(e.target.value)}
                  placeholder="اسم القسم..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5"
                />
                <input
                  type="text"
                  required
                  value={newChanCode}
                  onChange={(e) => setNewChanCode(e.target.value)}
                  placeholder="رمز الحماية السري..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 font-mono"
                />
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowAddChannelModal(false)} className="flex-1 bg-slate-800 text-slate-300 py-2 rounded-xl font-bold">إلغاء</button>
                  <button type="submit" className="flex-1 bg-amber-500 text-slate-950 py-2 rounded-xl font-bold">إنشاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddPollModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
              <h3 className="font-bold text-amber-400 text-sm">إنشاء تصويت جديد</h3>
              <form onSubmit={handleCreatePoll} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={newPollQuestion}
                  onChange={(e) => setNewPollQuestion(e.target.value)}
                  placeholder="سؤال التصويت..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5"
                />
                <div className="space-y-2">
                  {newPollOptions.map((opt, index) => (
                    <input
                      key={index}
                      type="text"
                      required={index < 2}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newPollOptions];
                        updated[index] = e.target.value;
                        setNewPollOptions(updated);
                      }}
                      placeholder={`الخيار ${index + 1}`}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2"
                    />
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowAddPollModal(false)} className="flex-1 bg-slate-800 text-slate-300 py-2 rounded-xl font-bold">إلغاء</button>
                  <button type="submit" className="flex-1 bg-amber-500 text-slate-950 py-2 rounded-xl font-bold">نشر التصويت</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
