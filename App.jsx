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
  Edit3
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
  { id: '1', channelId: 'production', title: 'تأكيد تصاريح التصوير في الدرعية', status: 'done', priority: 'high', assignee: 'فهد', date: '2026-11-05', fileName: '', fileUrl: '' },
  { id: '2', channelId: 'directing', title: 'معاينة زوايا إضاءة المشهد 4 (Studio B)', status: 'in-progress', priority: 'high', assignee: 'عبدالعزيز', date: '2026-11-10', fileName: '', fileUrl: '' }
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

const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    title: 'المعزوفة - فيلم قصير',
    description: 'ملفات السيناريو، الستوري بورد، ومقاطع التصوير الخاصة بالعمل',
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

  const [newDeptTaskTitle, setNewDeptTaskTitle] = useState('');
  const [newDeptTaskFileName, setNewDeptTaskFileName] = useState('');
  const [newDeptTaskFileUrl, setNewDeptTaskFileUrl] = useState('');
  const [showDeptTaskFileInputs, setShowDeptTaskFileInputs] = useState(false);

  const [emailNotificationLog, setEmailNotificationLog] = useState('');

  const [newCsDay, setNewCsDay] = useState('');
  const [newCsDate, setNewCsDate] = useState('');
  const [newCsLocation, setNewCsLocation] = useState('');
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
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('script');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetSize, setNewAssetSize] = useState('2.5 MB');
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

  const handleRemoveMemberFromChannel = async (memberId, memberName) => {
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
    alert(`تم تحديث الرمز السري لـ (${editingChannelForPasscode.name}) بنجاح. تم إغلاق القسم على المتواجدين لإدخال الرمز الجديد.`);
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

    const nextTasks = tasks.filter((t) => t.channelId !== channelId);
    const nextMessages = messages.filter((m) => m.channelId !== channelId);
    const nextPolls = polls.filter((p) => p.channelId !== channelId);

    let nextActiveChannel = activeChannel;
    if (activeChannel === channelId) {
      nextActiveChannel = 'general';
    }

    setCustomChannels(nextCustomChannels);
    setActiveChannel(nextActiveChannel);
    setTasks(nextTasks);
    setMessages(nextMessages);
    setPolls(nextPolls);

    await updateGlobalStore({
      customChannels: nextCustomChannels,
      tasks: nextTasks,
      messages: nextMessages,
      polls: nextPolls
    });
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

    setEmailNotificationLog(`📊 تم إنشاء تصويت جديد في (${chanName}) وإرسال إشعار بريدي للأعضاء.`);
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
      setRegError('رمز دعوة الفريق غير صحيح. اطلب الرمز من إدارة Team .Cue.');
      return;
    }
    if (cleanName.length < 3) {
      setRegError('يرجى كتابة الاسم الكامل بشكل صحيح.');
      return;
    }
    if (cleanPass.length < 4) {
      setRegError('يجب أن يتكون الرمز السري من 4 خانات على الأقل.');
      return;
    }

    const emailExists = allTeamMembers.some((m) => m.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      setRegError('هذا البريد الإلكتروني مسجل مسبقاً! يمكنك تسجيل الدخول مباشرة.');
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
    const updatedPasswords = {
      ...userPasswords,
      [newMemberId]: cleanPass
    };

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

  const handleDeleteCustomMember = async (memberId, memberName) => {
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

    setEmailNotificationLog('✉️ تم إرسال إشعار بريدي للفعالية الجديدة لجميع أعضاء الفريق عبر الإيميلات المسجلة.');
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
      description: newProjectDesc.trim() || 'مجلد ملفات وفيديوهات العمل',
      createdBy: activeUserObj.name.split(' ')[0],
      date: new Date().toLocaleDateString('ar-SA')
    };

    const nextProjects = [newProj, ...projects];
    setProjects(nextProjects);
    updateGlobalStore({ projects: nextProjects });

    setNewProjectTitle('');
    setNewProjectDesc('');
    setShowAddProject(false);
  };

  const handleDeleteProject = (projId, e) => {
    e.stopPropagation();
    const nextProjects = projects.filter((p) => p.id !== projId);
    const nextAssets = assets.filter((a) => a.projectId !== projId);
    setProjects(nextProjects);
    setAssets(nextAssets);
    if (selectedProjectId === projId) setSelectedProjectId(null);
    updateGlobalStore({ projects: nextProjects, assets: nextAssets });
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
      size: newAssetSize.trim() || 'ملف سحابي',
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
      alert('عذراً، هذا القسم مخصص لنشر الأخبار من الإدارة فقط.');
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
      fileName: newDeptTaskFileName.trim(),
      fileUrl: newDeptTaskFileUrl.trim(),
      status: 'todo',
      priority: 'medium',
      assignee: activeUserObj.name.split(' ')[0],
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now()
    };

    setNewDeptTaskTitle('');
    setNewDeptTaskFileName('');
    setNewDeptTaskFileUrl('');
    setShowDeptTaskFileInputs(false);

    const nextTasks = [...tasks, newTask];
    setTasks(nextTasks);
    updateGlobalStore({ tasks: nextTasks });

    setEmailNotificationLog(`✉️ تم إرسال إشعار بريدي للمهمة الجديدة عبر البريد الإلكتروني لأعضاء (${chanName}) فقط.`);
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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!isCloudLoaded) {
      setLoginError('جاري الاتصال بقاعدة البيانات... انتظر ثانية ثم اضغط دخول.');
      return;
    }

    const cleanEmail = (loginEmail || '').trim().toLowerCase();
    const foundUser = allTeamMembers.find((m) => m.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      setLoginError('البريد الإلكتروني غير مسجل. إذا كنت عضواً جديداً اضغط على "سجّل حسابك الآن" بالأسفل.');
      return;
    }

    const savedCustomPassword = userPasswords[foundUser.id];
    const activePassword = savedCustomPassword || DEFAULT_PASSWORD;

    if (activePassword !== loginPassword) {
      setLoginError('الرمز السري غير صحيح. تأكد من إدخال رمزك الشخصي الخاص.');
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
      setPasswordSetupError('يجب أن يتكون الرمز السري من 4 خانات على الأقل.');
      return;
    }
    if (cleanNewPass === DEFAULT_PASSWORD) {
      setPasswordSetupError('يرجى اختيار رمز خاص بك يختلف عن الرمز الافتراضي.');
      return;
    }
    if (cleanNewPass !== confirmPasswordInput.trim()) {
      setPasswordSetupError('الرمزان غير متطابقين، يرجى التأكد وإعادة الإدخال.');
      return;
    }

    const updatedPasswords = {
      ...userPasswords,
      [targetUser.id]: cleanNewPass
    };

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
    alert(`تمت إعادة ضبط رمز (${memberName}) للرمز الافتراضي، وسيُطلب منه تعيين رمز جديد عند دخوله القادم.`);
  };

  const handleLogout = async () => {
    if (currentUser) {
      const leavingId = currentUser.id;
      setOnlinePresence((prev) => ({ ...prev, [leavingId]: 0 }));
      try {
        await setDoc(
          workspaceDocRef,
          { onlinePresence: { [leavingId]: 0 } },
          { merge: true }
        );
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
              لحماية حسابك ومنع دخول أي شخص آخر، قم بتعيين <span className="text-amber-400 font-bold">رمز سري خاص بك</span> الآن (يُحفظ لحسابك بشكل دائم):
            </p>
          </div>

          <form onSubmit={handleSavePersonalPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الرمز السري الجديد الخاص بك:</label>
              <input
                type="password"
                required
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="اكتب رمزك السري الخاص..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">تأكيد الرمز السري الجديد:</label>
              <input
                type="password"
                required
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="أعد كتابة الرمز السري..."
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
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs transition-colors"
              >
                رجوع
              </button>
              <button
                type="submit"
                className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition-colors"
              >
                حفظ الرمز والدخول للمنصة
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
              {authMode === 'login' ? 'منصة المزامنة الحية الموحدة للفريق' : 'إنشاء حساب عضو جديد في الفريق'}
            </p>
          </div>

          {authMode === 'login' ? (
            <>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الرمز السري الخاص بك:</label>
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

              <div className="text-center border-t border-slate-800 pt-4 space-y-2">
                <p className="text-xs text-slate-400">عضو جديد في Team .Cue؟</p>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setLoginError('');
                    setRegError('');
                  }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>سجّل معلوماتك وأنشئ حسابك الآن</span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSelfRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل (الثلاثي):</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="مثال: سعد عبدالله العتيبي"
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
                  <option value="Art Department">Art Department (قسم الديكور والفن)</option>
                  <option value="Production Department">Production Department (قسم الإنتاج)</option>
                  <option value="Directing Department">Directing Department (قسم الإخراج)</option>
                  <option value="Post-Production Department">Post-Production Department (قسم المونتاج)</option>
                  <option value="Cinematography Department">Cinematography Department (التصوير والإضاءة)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال:</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رمز دعوة الفريق:</label>
                  <input
                    type="text"
                    required
                    value={regInviteCode}
                    onChange={(e) => setRegInviteCode(e.target.value)}
                    placeholder="اطلبه من الإدارة"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 uppercase"
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
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">اختر رمزك السري الخاص للدخول:</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="4 خانات على الأقل..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
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
                  onClick={() => {
                    setAuthMode('login');
                    setRegError('');
                  }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  لديك حساب؟ دخول
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  إنشاء الحساب والدخول
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
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1">
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
              onClick={() => { setActiveTab('calendar'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'calendar' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>التقويم والأحداث</span>
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
              onClick={() => {
                setActiveTab('assets');
                setSelectedProjectId(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'assets' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>مكتبة الفريق</span>
            </button>

            <button
              onClick={() => { setActiveTab('team'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'team' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Users className="w-4 h-4" />
                <span>أعضاء الفريق</span>
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
            onClick={() => {
              setNewPasswordInput('');
              setConfirmPasswordInput('');
              setPasswordSetupError('');
              setShowChangePasswordModal(true);
            }}
            className="w-full py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>تغيير رمزي السري</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-center py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium border border-red-500/20 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative w-full">
        <header className="h-14 bg-slate-900/60 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 bg-slate-800 text-amber-400 rounded-lg border border-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-slate-100 text-sm md:text-base truncate">
              {activeTab === 'chat' && (isDirectMessage && dmPartner ? `محادثة خاصة مع ${dmPartner.name}` : 'غرف التواصل ومهام الأقسام')}
              {activeTab === 'calendar' && 'التقويم الملون وأحداث الفريق'}
              {activeTab === 'callsheet' && 'أجندة يوم التصوير والمواقع'}
              {activeTab === 'assets' && 'مكتبة الفريق والأعمال'}
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
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-300 flex items-center gap-2 animate-fade-in">
            <BellRing className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{emailNotificationLog}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-3 md:p-6">
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
                    const isUnlocked = !channel.private || (unlockedChannels[channel.id] === channel.code);
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
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingChannelForPasscode(channel);
                                setNewPasscodeInput('');
                              }}
                              className="p-1 text-slate-400 hover:text-amber-400 rounded hover:bg-amber-500/15 transition-colors"
                              title="تغيير الرمز السري للقسم"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {currentUser?.id === 'fahad' && isCustomDept && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCustomChannel(channel.id, e)}
                              className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-red-500/15 transition-colors"
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
                    <button
                      onClick={() => { setActiveTab('team'); setMobileSidebarOpen(false); }}
                      title="بدء محادثة جديدة من دليل الأعضاء"
                      className="text-[10px] text-amber-400 hover:underline font-bold"
                    >
                      + جديد
                    </button>
                  </div>

                  {dmPartnerList.length === 0 ? (
                    <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                      اختر عضواً من دليل الفريق لبدء محادثة فردية.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {dmPartnerList.map((member) => {
                        const dmId = getDirectChannelId(currentUser.id, member.id);
                        const online = isMemberOnline(member.id);
                        const msgCount = messages.filter((m) => m.channelId === dmId).length;
                        return (
                          <button
                            key={member.id}
                            onClick={() => handleStartDirectChat(member)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                              activeChannel === dmId
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${online ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                              <span className="truncate">{member.name}</span>
                            </div>
                            {msgCount > 0 && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                                {msgCount}
                              </span>
                            )}
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
                          <p className="text-[11px] text-slate-400">{dmPartner.role}</p>
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
                            className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors ${
                              channelSubTab === 'chat'
                                ? 'bg-amber-500 text-slate-950'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>المحادثة</span>
                          </button>
                          <button
                            onClick={() => setChannelSubTab('tasks')}
                            className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors ${
                              channelSubTab === 'tasks'
                                ? 'bg-amber-500 text-slate-950'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <Kanban className="w-3.5 h-3.5" />
                            <span>مهام القسم ({currentChannelTasks.length})</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {!isDirectMessage && (
                    <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-800/60">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-400" /> أعضاء القسم:
                      </span>
                      {activeMembersInChannel.length === 0 ? (
                        <span className="text-[11px] text-slate-500">لا يوجد أعضاء مسجلون بعد</span>
                      ) : (
                        activeMembersInChannel.map((member) => {
                          const online = isMemberOnline(member.id);
                          const canRemove = isManagementUser;
                          return (
                            <span
                              key={member.id}
                              className="text-[10px] px-2 py-1 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700/80 flex items-center gap-1.5"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                              <span>{member.name}</span>
                              {canRemove && (
                                <button
                                  onClick={() => handleRemoveMemberFromChannel(member.id, member.name)}
                                  className="text-red-400 hover:text-red-300 ml-0.5 p-0.5 rounded hover:bg-red-500/20 transition-colors"
                                  title="إخراج من القسم (طرد)"
                                >
                                  <UserMinus className="w-3 h-3" />
                                </button>
                              )}
                            </span>
                          );
                        })
                      )}
                    </div>
                  )}
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
                                <button
                                  onClick={() => handleDeletePoll(poll.id)}
                                  className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                  title="حذف التصويت"
                                >
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
                                      hasVotedThis
                                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                                    }`}
                                  >
                                    <div
                                      className="absolute inset-y-0 right-0 bg-amber-500/10 transition-all duration-300"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                    <div className="relative flex justify-between items-center text-xs">
                                      <div className="flex items-center gap-2">
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${hasVotedThis ? 'bg-amber-500 border-amber-500 text-slate-950 font-black' : 'border-slate-600'}`}>
                                          {hasVotedThis && '✓'}
                                        </span>
                                        <span>{option.text}</span>
                                      </div>
                                      <span className="text-[11px] font-mono text-amber-400">
                                        {optionVotes} صوت ({percentage}%)
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <div className="text-[10px] text-slate-500 text-left">
                              إجمالي الأصوات: {totalVotes}
                            </div>
                          </div>
                        );
                      })}

                      {currentMessages.length === 0 && currentPolls.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm text-center px-4">
                          {isDirectMessage && dmPartner
                            ? `هذه بداية محادثتك الخاصة والمباشرة مع ${dmPartner.name}. اكتب رسالتك أو أنشئ تصويتاً!`
                            : 'لا يوجد رسائل أو تصويتات بعد في هذه الغرفة. ابدأ بإرسال رسالة أو إنشاء تصويت!'}
                        </div>
                      ) : (
                        currentMessages.map((msg) => {
                          const isMine = msg.senderId === currentUser.id;
                          const canDeleteMessage = isMine || msg.sender === activeUserObj.name || (!isDirectMessage && isManagementUser);
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col border p-3 rounded-xl max-w-xl ${
                                isMine
                                  ? 'bg-amber-500/10 border-amber-500/30 mr-auto'
                                  : 'bg-slate-950/70 border-slate-800/80 ml-auto'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4 mb-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                                    {msg.sender.charAt(0)}
                                  </span>
                                  <span className="text-xs font-bold text-amber-400">{msg.sender}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                                  {canDeleteMessage && (
                                    <button
                                      onClick={() => handleDeleteMessage(msg.id)}
                                      title="حذف الرسالة"
                                      className="p-1 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {msg.text && <p className="text-xs text-slate-200 leading-relaxed select-text">{msg.text}</p>}

                              {msg.image && (
                                <div className="mt-2">
                                  <img
                                    src={msg.image}
                                    alt="مرفق صورة"
                                    className="max-h-60 rounded-lg object-cover border border-slate-700 cursor-pointer"
                                    onClick={() => window.open(msg.image, '_blank')}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {allChannels.find((c) => c.id === activeChannel)?.isNews && !isManagementUser ? (
                      <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-center text-xs text-amber-400">
                        📢 هذا القسم للقراءة فقط (مخصص لنشر أخبار وتعاميم الفريق من الإدارة).
                      </div>
                    ) : (
                      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex flex-col gap-2">
                        {imageAttachment && (
                          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 w-fit">
                            <ImageIcon className="w-4 h-4 text-amber-400" />
                            <span className="text-xs text-slate-300">تم إرفاق صورة جاهزة للإرسال</span>
                            <button
                              onClick={() => setImageAttachment(null)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAddPollModal(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold px-3 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
                            title="إنشاء تصويت جديد"
                          >
                            <BarChart2 className="w-4 h-4" />
                            <span className="hidden sm:inline">تصويت</span>
                          </button>

                          <label
                            className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-bold px-3 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0"
                            title="إرفاق صورة"
                          >
                            <ImageIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">صورة</span>
                            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          </label>

                          <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              placeholder={
                                isDirectMessage && dmPartner
                                  ? `اكتب رسالة خاصة إلى ${dmPartner.name}...`
                                  : `أرسل رسالة فورية إلى ${allChannels.find((c) => c.id === activeChannel)?.name}...`
                              }
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
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <form onSubmit={handleAddDeptTask} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newDeptTaskTitle}
                          onChange={(e) => setNewDeptTaskTitle(e.target.value)}
                          placeholder={`أضف مهمة جديدة لـ ${allChannels.find((c) => c.id === activeChannel)?.name}...`}
                          className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowDeptTaskFileInputs(!showDeptTaskFileInputs)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-1 transition-colors ${
                            showDeptTaskFileInputs
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>إرفاق ملف</span>
                        </button>
                        <button
                          type="submit"
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> إضافة
                        </button>
                      </div>

                      {showDeptTaskFileInputs && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                          <input
                            type="text"
                            value={newDeptTaskFileName}
                            onChange={(e) => setNewDeptTaskFileName(e.target.value)}
                            placeholder="اسم الملف المرفق (مثال: قائمة الديكور.pdf)"
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="url"
                            value={newDeptTaskFileUrl}
                            onChange={(e) => setNewDeptTaskFileUrl(e.target.value)}
                            placeholder="رابط الملف (Google Drive / رابط مباشر)..."
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      )}
                    </form>

                    {currentChannelTasks.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 text-xs bg-slate-950/40 border border-slate-800/60 rounded-xl">
                        لا توجد مهام مضافة في هذا القسم حالياً. أضف أول مهمة بالأعلى!
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {currentChannelTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-colors ${
                              task.status === 'done'
                                ? 'bg-slate-950/40 border-emerald-500/20 opacity-75'
                                : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <button
                                  onClick={() => handleCompleteTask(task.id)}
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    task.status === 'done'
                                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                                      : 'border-slate-600 hover:border-amber-400'
                                  }`}
                                >
                                  {task.status === 'done' && <Check className="w-3.5 h-3.5" />}
                                </button>
                                <span className={`text-xs font-semibold ${task.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                  {task.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400">{task.assignee}</span>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  title="حذف المهمة"
                                  className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {(task.fileName || task.fileUrl) && (
                              <div className="mr-7 flex items-center gap-2 text-[11px] bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg w-fit">
                                <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-slate-300">{task.fileName || 'ملف مرفق'}</span>
                                {task.fileUrl && (
                                  <a
                                    href={task.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400 hover:underline font-bold mr-1"
                                  >
                                    فتح الملف ↗
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

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

          {activeTab === 'calendar' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-400">تقويم أحداث ومواعيد الفريق</h3>
                  <p className="text-xs text-slate-400 mt-0.5">تابع مواعيد التصوير، البروفات، والاجتماعات بالألوان المخصصة</p>
                </div>
                <button
                  onClick={() => setShowAddEventModal(!showAddEventModal)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> {showAddEventModal ? 'إغلاق النموذج' : 'إضافة موعد / حدث'}
                </button>
              </div>

              {showAddEventModal && (
                <form onSubmit={handleAddCalendarEvent} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-amber-400">إضافة فعالية جديدة للتقويم وإرسال إشعار بريدي للفريق</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">عنوان الحدث:</label>
                      <input
                        type="text"
                        required
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="مثال: تصوير المشهد الخارجي..."
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">التاريخ:</label>
                      <input
                        type="date"
                        required
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">تصنيف اللون (نوع النشاط):</label>
                      <select
                        value={newEventColor}
                        onChange={(e) => setNewEventColor(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="amber">أصفر (تصوير ومشاهد)</option>
                        <option value="purple">بنفسجي (بروفات وعروض)</option>
                        <option value="emerald">أخضر (اجتماعات وإدارة)</option>
                        <option value="blue">أزرق (مونتاج ومونيتور)</option>
                        <option value="rose">أحمر وردي (موعد نهائي / Deadline)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    حفظ الموعد في التقويم وإرسال الإشعار
                  </button>
                </form>
              )}

              {calendarEvents.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                  لا توجد أحداث مضافة في التقويم حالياً. اضغط على "إضافة موعد / حدث" للبدء.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {calendarEvents.map((ev) => {
                    const colorStyles = {
                      amber: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
                      purple: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
                      emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
                      blue: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
                      rose: 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                    }[ev.color] || 'bg-slate-800 border-slate-700 text-slate-300';

                    const dotColor = {
                      amber: 'bg-amber-400',
                      purple: 'bg-purple-400',
                      emerald: 'bg-emerald-400',
                      blue: 'bg-blue-400',
                      rose: 'bg-rose-400'
                    }[ev.color] || 'bg-slate-400';

                    return (
                      <div key={ev.id} className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${colorStyles}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`}></span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-100">{ev.title}</h4>
                            <p className="text-[11px] opacity-80 mt-0.5">التصنيف: {ev.category} • التاريخ: {ev.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCalendarEvent(ev.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                          title="حذف الحدث"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'callsheet' && (
            <div className="space-y-6 max-w-4xl mx-auto">
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
            <div className="space-y-6 max-w-5xl mx-auto">
              {!selectedProject ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">أعمال ومشاريع الفريق</h3>
                      <p className="text-xs text-slate-400 mt-0.5">اختر عملاً لفتح ملفاته وفيديوهاته أو أنشئ مجلد عمل جديد</p>
                    </div>
                    <button
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <FolderPlus className="w-4 h-4" /> {showAddProject ? 'إغلاق النموذج' : 'إضافة عمل جديد'}
                    </button>
                  </div>

                  {showAddProject && (
                    <form onSubmit={handleAddProject} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-amber-400">إنشاء مجلد عمل جديد في مكتبة الفريق</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1">اسم العمل / المشروع:</label>
                          <input
                            type="text"
                            required
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            placeholder="مثال: فيلم المعزوفة / إعلان اليوم الوطني..."
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">وصف مختصر:</label>
                          <input
                            type="text"
                            value={newProjectDesc}
                            onChange={(e) => setNewProjectDesc(e.target.value)}
                            placeholder="السيناريو، الفيديوهات، ومرفقات الإنتاج..."
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                      >
                        إنشاء العمل في المكتبة
                      </button>
                    </form>
                  )}

                  {projects.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                      لا يوجد أعمال مضافة حالياً. اضغط على "إضافة عمل جديد" لإنشاء أول مجلد عمل.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {projects.map((proj) => {
                        const count = assets.filter((a) => a.projectId === proj.id).length;
                        return (
                          <div
                            key={proj.id}
                            onClick={() => setSelectedProjectId(proj.id)}
                            className="bg-slate-900 hover:bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                                <Folder className="w-6 h-6" />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] bg-slate-950 text-slate-300 px-2.5 py-1 rounded-full border border-slate-800">
                                  {count} ملفات
                                </span>
                                <button
                                  onClick={(e) => handleDeleteProject(proj.id, e)}
                                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                                  title="حذف العمل"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">{proj.title}</h4>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                            </div>

                            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                              <span>بواسطة: {proj.createdBy}</span>
                              <span className="text-amber-400 font-bold">فتح المجلد ←</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedProjectId(null);
                          setShowAddAsset(false);
                        }}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
                      >
                        <ArrowRight className="w-4 h-4" /> رجوع للأعمال
                      </button>
                      <div>
                        <h3 className="text-base font-bold text-amber-400">{selectedProject.title}</h3>
                        <p className="text-xs text-slate-400">{selectedProject.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAddAsset(!showAddAsset)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> {showAddAsset ? 'إغلاق النموذج' : 'إضافة ملف / فيديو'}
                    </button>
                  </div>

                  {showAddAsset && (
                    <form onSubmit={handleAddAsset} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-amber-400">إضافة ملف أو فيديو جديد داخل ({selectedProject.title})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1">اسم الملف أو الفيديو:</label>
                          <input
                            type="text"
                            required
                            value={newAssetTitle}
                            onChange={(e) => setNewAssetTitle(e.target.value)}
                            placeholder="مثال: مونتاج مبدئي V1 / السيناريو.pdf"
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">نوع الملف:</label>
                          <select
                            value={newAssetCategory}
                            onChange={(e) => setNewAssetCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                          >
                            <option value="video">فيديو (Video / Cut)</option>
                            <option value="script">سيناريو (Script)</option>
                            <option value="moodboard">لوحة إلهام / صور (Moodboard)</option>
                            <option value="tech">مخطط تقني / كاميرات</option>
                            <option value="other">ملف عام</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">رابط الملف أو الفيديو (Drive / Frame.io / YouTube):</label>
                          <input
                            type="url"
                            value={newAssetUrl}
                            onChange={(e) => setNewAssetUrl(e.target.value)}
                            placeholder="https://drive.google.com/..."
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                      >
                        حفظ وإضافة الملف للعمل
                      </button>
                    </form>
                  )}

                  {projectAssets.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
                      لا يوجد ملفات أو فيديوهات داخل هذا العمل حتى الآن. اضغط على "إضافة ملف / فيديو" للبدء.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {projectAssets.map((asset) => (
                        <div key={asset.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative">
                          <div className="flex items-start justify-between">
                            {asset.category === 'video' ? (
                              <Video className="w-8 h-8 text-amber-400" />
                            ) : (
                              <FileText className="w-8 h-8 text-amber-400" />
                            )}
                            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {asset.category === 'video' ? 'فيديو' : asset.category === 'script' ? 'سيناريو' : 'ملف'}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-200 mb-1">{asset.title}</h4>
                            <p className="text-[11px] text-slate-400">بواسطة: {asset.updatedBy} ({asset.date})</p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                            {asset.url ? (
                              <a
                                href={asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" /> فتح / مشاهدة
                              </a>
                            ) : (
                              <span className="flex-1 bg-slate-800/60 text-slate-400 text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5">
                                <LinkIcon className="w-3.5 h-3.5" /> بدون رابط
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                              title="حذف الملف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTeamMembers.map((member) => {
                const hasCustomPass = Boolean(userPasswords[member.id]);
                const online = isMemberOnline(member.id);
                const isSelf = currentUser.id === member.id;
                return (
                  <div key={member.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base">
                          {member.name.charAt(0)}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                            online ? 'bg-emerald-400' : 'bg-slate-600'
                          }`}
                        ></span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-200">{member.name}</h4>
                          {member.isCustom && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              جديد
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                        <div className="mt-1 flex items-center gap-2 text-[10px]">
                          <span className={`flex items-center gap-1 font-semibold ${online ? 'text-emerald-400' : 'text-slate-500'}`}>
                            <span className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                            <span>{online ? 'متواجد الآن' : 'غير متصل'}</span>
                          </span>
                          <span className={`px-1.5 py-0.2 rounded ${hasCustomPass ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                            {hasCustomPass ? 'رمز خاص مفعّل' : 'رمز افتراضي'}
                          </span>
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

                      {!isSelf && (
                        <button
                          onClick={() => handleStartDirectChat(member)}
                          className="w-full mt-2 py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/30 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>محادثة خاصة</span>
                        </button>
                      )}

                      {currentUser?.id === 'fahad' && (
                        <button
                          onClick={() => {
                            setEditingRoleMember(member);
                            setNewRoleInput(member.role);
                          }}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل الرتبة / القسم</span>
                        </button>
                      )}

                      {isManagementUser && (
                        <div className="flex gap-1.5 pt-1">
                          {hasCustomPass && (
                            <button
                              onClick={() => handleResetMemberPassword(member.id, member.name)}
                              className="flex-1 py-1.5 bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-lg text-[10px] font-medium border border-slate-700 transition-colors flex items-center justify-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>إعادة ضبط الرمز</span>
                            </button>
                          )}
                          {member.isCustom && (
                            <button
                              onClick={() => handleDeleteCustomMember(member.id, member.name)}
                              className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-[10px] font-medium border border-red-500/20 transition-colors flex items-center justify-center gap-1"
                              title="حذف العضو الجديد"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {editingRoleMember && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> تعديل رتبة {editingRoleMember.name}
                </h3>
                <button onClick={() => setEditingRoleMember(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMemberRole} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">المسمى الوظيفي أو الرتبة:</label>
                  <input
                    type="text"
                    required
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    placeholder="مثال: Management Team | Head of Art"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    أضف <code className="text-amber-400">Management Team</code> لمنح العضو صلاحيات الإدارة الكاملة.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingRoleMember(null)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    حفظ الرتبة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingChannelForPasscode && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" /> تغيير رمز قسم {editingChannelForPasscode.name}
                </h3>
                <button onClick={() => setEditingChannelForPasscode(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateChannelPasscode} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">الرمز السري الجديد:</label>
                  <input
                    type="text"
                    required
                    value={newPasscodeInput}
                    onChange={(e) => setNewPasscodeInput(e.target.value)}
                    placeholder="مثال: 8888"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 font-mono text-center text-base"
                  />
                  <p className="text-[10px] text-amber-400/90 mt-1.5 leading-relaxed">
                    ⚠️ تنبيه: بمجرد الحفظ، سيتطلب من الجميع (بمن فيهم الموجودون حالياً) إدخال الرمز الجديد للدخول مجدداً.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingChannelForPasscode(null)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    تحديث الرمز وإغلاق القسم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddPollModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" /> إنشاء تصويت جديد في القسم
                </h3>
                <button
                  onClick={() => setShowAddPollModal(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePoll} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">سؤال أو موضوع التصويت:</label>
                  <input
                    type="text"
                    required
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="مثال: أي وقت يناسبكم لبروفة المشهد القادم؟"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300">خيارات التصويت:</label>
                  {newPollOptions.map((opt, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        required={index < 2}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newPollOptions];
                          updated[index] = e.target.value;
                          setNewPollOptions(updated);
                        }}
                        placeholder={`الخيار ${index + 1}`}
                        className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
                      />
                      {newPollOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = newPollOptions.filter((_, i) => i !== index);
                            setNewPollOptions(updated);
                          }}
                          className="px-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  {newPollOptions.length < 5 && (
                    <button
                      type="button"
                      onClick={() => setNewPollOptions([...newPollOptions, ''])}
                      className="text-amber-400 hover:underline font-bold text-[11px] pt-1"
                    >
                      + إضافة خيار آخر
                    </button>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddPollModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    نشر التصويت الآن
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddChannelModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> إنشاء قسم أو غرفة جديدة
                </h3>
                <button
                  onClick={() => setShowAddChannelModal(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomChannel} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">اسم القسم الجديد:</label>
                  <input
                    type="text"
                    required
                    value={newChanName}
                    onChange={(e) => setNewChanName(e.target.value)}
                    placeholder="مثال: قسم الديكور الخاص..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">رمز الدخول السري (Passcode):</label>
                  <input
                    type="text"
                    required
                    value={newChanCode}
                    onChange={(e) => setNewChanCode(e.target.value)}
                    placeholder="مثال: 7070"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddChannelModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إنشاء القسم فوراً
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showChangePasswordModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" /> تغيير الرمز السري لحسابك
                </h3>
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePersonalPassword} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">الرمز السري الجديد:</label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="اكتب الرمز الجديد..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">تأكيد الرمز الجديد:</label>
                  <input
                    type="password"
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="أعد كتابة الرمز..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {passwordSetupError && (
                  <p className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                    {passwordSetupError}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowChangePasswordModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl font-bold transition-colors"
                  >
                    حفظ التغيير
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
