const STORAGE_KEYS = {
  tasks: "lora.tasks",
  daily: "lora.daily",
  seq: "lora.taskSeq",
  settings: "lora.settings",
  onboarding: "lora.onboarding",
};

const INITIAL_TASKS = [
  "10,000 Steps",
  "100g Protein",
  "100 Reps",
  "Attend Class",
  "Post to Facebook",
];

const DEFAULT_SETTINGS = {
  appName: "Lora Tracker",
  themeColor: "#ff2d8f",
  appEmoji: "💗",
};

const DEFAULT_EMOJI = "✅";

const TASK_TYPES = {
  checkbox: "checkbox",
  goal: "goal",
  checkboxText: "checkbox-text",
};

const TASK_TYPE_LABELS = {
  [TASK_TYPES.checkbox]: "Checkbox",
  [TASK_TYPES.goal]: "Goal Number",
  [TASK_TYPES.checkboxText]: "Checkbox + Text",
};

const TASK_PRESETS = [
  { title: "10,000 Steps", type: TASK_TYPES.goal, goal: 10000 },
  { title: "100g Protein", type: TASK_TYPES.goal, goal: 100 },
  { title: "100 Reps", type: TASK_TYPES.goal, goal: 100 },
  { title: "Attend Class", type: TASK_TYPES.checkboxText, goal: null },
];

const state = {
  viewDate: new Date(),
  monthDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedTaskId: null,
  activePanel: "checklist",
  onboardingView: null,
};

const dom = {
  menuToggle: document.getElementById("menuToggle"),
  menu: document.getElementById("menu"),
  menuItems: Array.from(document.querySelectorAll(".menu-item")),
  appIcon: document.getElementById("appIcon"),
  appManifest: document.getElementById("appManifest"),
  topbar: document.querySelector(".topbar"),
  hero: document.querySelector(".hero"),
  footer: document.querySelector(".footer"),
  setupChoicePanel: document.getElementById("setupChoicePanel"),
  setupPanel: document.getElementById("setupPanel"),
  setupScratch: document.getElementById("setupScratch"),
  setupLora: document.getElementById("setupLora"),
  setupSubmit: document.getElementById("setupSubmit"),
  setupAppName: document.getElementById("setupAppName"),
  setupThemeColor: document.getElementById("setupThemeColor"),
  setupThemePreview: document.getElementById("setupThemePreview"),
  setupEmoji: document.getElementById("setupEmoji"),
  todayPanel: document.getElementById("todayPanel"),
  settingsPanel: document.getElementById("settingsPanel"),
  calendarPanel: document.getElementById("calendarPanel"),
  appNameHeader: document.getElementById("appNameHeader"),
  appNameHeading: document.getElementById("appNameHeading"),
  appNameInput: document.getElementById("appNameInput"),
  themeColorInput: document.getElementById("themeColorInput"),
  themeColorPreview: document.getElementById("themeColorPreview"),
  appEmojiInput: document.getElementById("appEmojiInput"),
  appEmojiTop: document.getElementById("appEmojiTop"),
  appEmojiBadge: document.getElementById("appEmojiBadge"),
  appEmojiFooter: document.getElementById("appEmojiFooter"),
  resetAppData: document.getElementById("resetAppData"),
  todayLabel: document.getElementById("todayLabel"),
  prevDay: document.getElementById("prevDay"),
  nextDay: document.getElementById("nextDay"),
  dateNav: document.getElementById("dateNav"),
  goToday: document.getElementById("goToday"),
  encouragementText: document.getElementById("encouragementText"),
  todaySummary: document.getElementById("todaySummary"),
  taskList: document.getElementById("taskList"),
  taskForm: document.getElementById("taskForm"),
  taskInput: document.getElementById("taskInput"),
  taskEmoji: document.getElementById("taskEmoji"),
  taskType: document.getElementById("taskType"),
  taskGoal: document.getElementById("taskGoal"),
  taskGoalWrap: document.getElementById("taskGoalWrap"),
  activeTasks: document.getElementById("activeTasks"),
  archivedTasks: document.getElementById("archivedTasks"),
  monthLabel: document.getElementById("monthLabel"),
  prevMonth: document.getElementById("prevMonth"),
  nextMonth: document.getElementById("nextMonth"),
  taskFilter: document.getElementById("taskFilter"),
  calendarGrid: document.getElementById("calendarGrid"),
  calendarLegend: document.getElementById("calendarLegend"),
  monthlyTotals: document.getElementById("monthlyTotals"),
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const taskEmojiMap = [
  { match: /step/i, emoji: "👟" },
  { match: /protein/i, emoji: "🥩" },
  { match: /rep/i, emoji: "🏋️" },
  { match: /class/i, emoji: "🎓" },
  { match: /facebook/i, emoji: "📘" },
];

const encouragements = [
  "Your future self is already cheering for this check-in.",
  "Tiny wins stack up fast, so keep the streak alive today.",
  "Show up for one task and the rest will follow.",
  "Consistency looks good on you, keep it going.",
  "This list is your proof that you do hard things.",
  "One bold checkbox at a time, you are building momentum.",
  "Today is a fresh runway, take the first step.",
  "You are stronger than the scroll, choose the task.",
  "Progress is the vibe, tap a box and claim it.",
  "Every checkmark is a vote for the life you want.",
  "Start small, finish strong, and own the day.",
  "Your streak has a heartbeat, keep it pumping.",
  "Momentum loves a tiny yes, give it one.",
  "You are closer than you think, check it off.",
  "One task now saves you a hundred later.",
  "Show up for five minutes and let it snowball.",
  "The win is in the doing, not the drama.",
  "Make it easy on future you, complete one.",
  "Small steps, loud results, keep moving.",
  "Checklists are magic when you believe in them.",
  "Let today be simple and still count.",
  "A single checkmark can flip your whole mood.",
  "Do the next right thing and watch it add up.",
  "Your goals are listening, give them a signal.",
  "Easy days are made by steady habits.",
  "You are the kind of person who finishes.",
  "Keep the promise you made to yourself today.",
  "You have what it takes, just take the box.",
  "Every task is a doorway, walk through one.",
  "Give today a win, then stack another.",
];

const APP_EMOJI_OPTIONS = [
  "💗",
  "💖",
  "❤️",
  "🩷",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💓",
  "💞",
  "💕",
  "✨",
  "⭐",
  "🌟",
  "🔥",
  "⚡",
  "🌈",
  "☀️",
  "🌙",
  "☁️",
  "🌧️",
  "❄️",
  "🌊",
  "🌸",
  "🌺",
  "🌼",
  "🌻",
  "🍀",
  "🍎",
  "🍓",
  "🍉",
  "🍒",
  "🥑",
  "🥗",
  "🍕",
  "🍣",
  "🍜",
  "🍩",
  "☕",
  "🧋",
  "🏃",
  "🏋️",
  "🧘",
  "🚴",
  "🥊",
  "🎯",
  "🎧",
  "🎶",
  "📚",
  "📝",
  "🧠",
  "💡",
  "🧹",
  "🧼",
  "🛌",
  "🛏️",
  "🧴",
  "🧪",
  "🧬",
  "💼",
  "📅",
  "🗓️",
  "⏰",
  "✅",
  "☑️",
  "✔️",
  "🔔",
  "📣",
  "🎉",
  "🏆",
  "🥇",
  "🚀",
  "🪄",
  "🫧",
  "🎀",
  "🦋",
  "🐱",
  "🐶",
  "🐼",
  "🦄",
];

function getTaskPreset(title) {
  return TASK_PRESETS.find(
    (preset) => preset.title.toLowerCase() === title.toLowerCase()
  );
}

function setupEmojiSelect(selectEl, currentEmoji) {
  if (!selectEl) {
    return;
  }
  const value = currentEmoji || DEFAULT_SETTINGS.appEmoji;
  const options = APP_EMOJI_OPTIONS.includes(value)
    ? APP_EMOJI_OPTIONS
    : [value, ...APP_EMOJI_OPTIONS];
  selectEl.innerHTML = "";
  options.forEach((emoji) => {
    const option = document.createElement("option");
    option.value = emoji;
    option.textContent = emoji;
    selectEl.appendChild(option);
  });
  selectEl.value = value;
}

function normalizeTaskType(type) {
  const values = Object.values(TASK_TYPES);
  return values.includes(type) ? type : TASK_TYPES.checkbox;
}

function parseGoal(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getTaskType(task) {
  return normalizeTaskType(task.type);
}

function getTaskGoal(task) {
  return parseGoal(task.goal, 0);
}

function hasValue(value) {
  return value !== "" && value !== null && value !== undefined;
}

function formatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return new Intl.NumberFormat(undefined).format(numeric);
}

function getTaskEntry(task, record) {
  const raw = record?.entries?.[task.id];
  const type = getTaskType(task);
  const goal = getTaskGoal(task);

  if (raw && typeof raw === "object") {
    const value = raw.value ?? "";
    const open = Boolean(raw.open);
    const rawChecked =
      typeof raw.checked === "boolean" ? raw.checked : undefined;
    if (type === TASK_TYPES.goal) {
      if (!hasValue(value)) {
        return { checked: rawChecked ?? false, value: "", open };
      }
      const numeric = Number(value);
      if (Number.isFinite(numeric)) {
        const checked = rawChecked ?? numeric >= goal;
        return { checked, value: numeric, open };
      }
      return { checked: rawChecked ?? false, value: "", open };
    }
    if (type === TASK_TYPES.checkboxText) {
      const checked = Boolean(raw.checked);
      return { checked, value: typeof value === "string" ? value : "", open };
    }
    const checked = Boolean(raw.checked);
    return { checked, value: "", open };
  }

  if (typeof raw === "boolean") {
    if (type === TASK_TYPES.goal) {
      return raw
        ? { checked: true, value: goal, open: false }
        : { checked: false, value: "", open: false };
    }
    return { checked: raw, value: "", open: false };
  }

  if (typeof raw === "number") {
    if (type === TASK_TYPES.goal) {
      return { checked: raw >= goal, value: raw, open: false };
    }
    return { checked: Boolean(raw), value: "", open: false };
  }

  return { checked: false, value: "", open: false };
}

function buildTaskEntry(task, checked, value, open = false) {
  const type = getTaskType(task);

  if (type === TASK_TYPES.goal) {
    if (!hasValue(value)) {
      return { checked: Boolean(checked), value: "", open: Boolean(open) };
    }
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return { checked: Boolean(checked), value: "", open: Boolean(open) };
    }
    return { checked: Boolean(checked), value: numeric, open: Boolean(open) };
  }

  if (type === TASK_TYPES.checkboxText) {
    return {
      checked: Boolean(checked),
      value: typeof value === "string" ? value : "",
      open: Boolean(open),
    };
  }

  return { checked: Boolean(checked), value: "", open: Boolean(open) };
}

function isTaskComplete(task, entry) {
  const type = getTaskType(task);
  if (type === TASK_TYPES.goal) {
    return Boolean(entry.checked);
  }
  return Boolean(entry.checked);
}

function getTaskDetail(task, entry) {
  const type = getTaskType(task);
  if (type === TASK_TYPES.checkboxText) {
    return "";
  }
  return "";
}


function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadOnboarding() {
  const stored = loadJson(STORAGE_KEYS.onboarding, null);
  return stored && typeof stored === "object" ? stored : null;
}

function saveOnboarding(mode) {
  saveJson(STORAGE_KEYS.onboarding, { completed: true, mode });
}

function hasStoredData() {
  return (
    localStorage.getItem(STORAGE_KEYS.tasks) ||
    localStorage.getItem(STORAGE_KEYS.settings) ||
    localStorage.getItem(STORAGE_KEYS.daily)
  );
}

function loadSettings() {
  const stored = loadJson(STORAGE_KEYS.settings, {});
  return {
    ...DEFAULT_SETTINGS,
    ...(stored && typeof stored === "object" ? stored : {}),
  };
}

function saveSettings(settings) {
  saveJson(STORAGE_KEYS.settings, settings);
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") {
    return DEFAULT_SETTINGS.themeColor;
  }
  const cleaned = hex.trim();
  if (/^#[0-9a-f]{6}$/i.test(cleaned)) {
    return cleaned.toLowerCase();
  }
  if (/^#[0-9a-f]{3}$/i.test(cleaned)) {
    const [r, g, b] = cleaned.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return DEFAULT_SETTINGS.themeColor;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex).slice(1);
  const int = parseInt(normalized, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbToHsl(r, g, b) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / diff + 2;
        break;
      default:
        h = (rNorm - gNorm) / diff + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h, s, l) {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (value) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
}

function adjustLightness(hex, delta) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const nextL = Math.max(0, Math.min(100, l + delta));
  return hslToHex(h, s, nextL);
}

function applyThemeColor(color) {
  const base = normalizeHex(color);
  const { r, g, b } = hexToRgb(base);
  const root = document.documentElement;
  root.style.setProperty("--pink-600", adjustLightness(base, -12));
  root.style.setProperty("--pink-500", base);
  root.style.setProperty("--pink-400", adjustLightness(base, 10));
  root.style.setProperty("--pink-200", adjustLightness(base, 32));
  root.style.setProperty("--pink-100", adjustLightness(base, 44));
  root.style.setProperty("--theme-rgb", `${r} ${g} ${b}`);
  root.style.setProperty("--theme-bg-1", adjustLightness(base, 40));
  root.style.setProperty("--theme-bg-2", adjustLightness(base, 58));
  root.style.setProperty("--theme-bg-3", adjustLightness(base, 48));

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", base);
  }
}

function buildCheckIconSvg(color) {
  const safeColor = normalizeHex(color);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Lora Tracker">
  <rect width="512" height="512" rx="120" fill="${safeColor}" />
  <path d="M154 268l70 70 134-134" fill="none" stroke="#ffffff" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
}

function updateAppIcon(settings) {
  if (!dom.appIcon) {
    return;
  }
  const onboarding = loadOnboarding();
  if (onboarding?.mode === "scratch") {
    const svg = buildCheckIconSvg(settings.themeColor);
    const encoded = encodeURIComponent(svg);
    dom.appIcon.setAttribute(
      "href",
      `data:image/svg+xml;charset=UTF-8,${encoded}`
    );
    return;
  }
  dom.appIcon.setAttribute("href", "assets/icon.png");
}

function updateManifest(settings) {
  if (!dom.appManifest) {
    return;
  }
  const safeName = settings.appName?.trim() || DEFAULT_SETTINGS.appName;
  const safeTheme = normalizeHex(settings.themeColor);
  const manifest = {
    name: safeName,
    short_name: safeName,
    description: "Daily task tracking with local storage, zero servers.",
    start_url: ".",
    display: "standalone",
    background_color: adjustLightness(safeTheme, 60),
    theme_color: safeTheme,
    icons: [
      {
        src: "assets/icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
  const encoded = encodeURIComponent(JSON.stringify(manifest));
  dom.appManifest.setAttribute(
    "href",
    `data:application/manifest+json;charset=UTF-8,${encoded}`
  );
}

function applySettings(settings) {
  const safeName = settings.appName?.trim() || DEFAULT_SETTINGS.appName;
  const safeEmoji = settings.appEmoji || DEFAULT_SETTINGS.appEmoji;
  const safeTheme = normalizeHex(settings.themeColor);
  dom.appNameHeader.textContent = safeName;
  dom.appNameHeading.textContent = safeName;
  document.title = safeName;
  if (dom.appNameInput) {
    dom.appNameInput.value = safeName;
  }
  if (dom.themeColorInput) {
    dom.themeColorInput.value = safeTheme;
  }
  if (dom.themeColorPreview) {
    dom.themeColorPreview.style.background = safeTheme;
  }
  setupEmojiSelect(dom.appEmojiInput, safeEmoji);
  if (dom.appEmojiTop) {
    dom.appEmojiTop.textContent = safeEmoji;
  }
  if (dom.appEmojiBadge) {
    dom.appEmojiBadge.textContent = safeEmoji;
  }
  if (dom.appEmojiFooter) {
    dom.appEmojiFooter.textContent = safeEmoji;
  }
  applyThemeColor(safeTheme);
  updateAppIcon({ ...settings, themeColor: safeTheme });
  updateManifest({ ...settings, themeColor: safeTheme });
}

function updateSettings(patch) {
  const current = loadSettings();
  const updated = { ...current, ...patch };
  saveSettings(updated);
  applySettings(updated);
}

function getTodayKey() {
  return toDateKey(new Date());
}

function getViewDateKey() {
  return toDateKey(state.viewDate);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthKey(dateKey) {
  return dateKey.slice(0, 7);
}

function ensureTaskSeq(tasks) {
  const seq = Number(loadJson(STORAGE_KEYS.seq, 1));
  const maxId = tasks.reduce((max, task) => Math.max(max, task.id || 0), 0);
  if (!seq || seq <= maxId) {
    saveJson(STORAGE_KEYS.seq, maxId + 1);
  }
}

function getNextTaskId() {
  const seq = Number(loadJson(STORAGE_KEYS.seq, 1)) || 1;
  saveJson(STORAGE_KEYS.seq, seq + 1);
  return seq;
}

function seedTasks() {
  const existing = loadJson(STORAGE_KEYS.tasks, null);
  if (Array.isArray(existing) && existing.length) {
    ensureTaskSeq(existing);
    return;
  }
  const now = new Date().toISOString();
  const seeded = INITIAL_TASKS.map((title) => {
    const preset = getTaskPreset(title);
    const type = preset?.type || TASK_TYPES.checkbox;
    const goal = type === TASK_TYPES.goal ? preset?.goal || 1 : null;
    return {
      id: getNextTaskId(),
      title,
      emoji: taskEmoji(title),
      type,
      goal,
      active: true,
      createdAt: now,
    };
  });
  saveJson(STORAGE_KEYS.tasks, seeded);
}

function loadTasks() {
  const raw = loadJson(STORAGE_KEYS.tasks, []);
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((task) => {
    const title = String(task.title || "");
    const preset = getTaskPreset(title);
    const type = normalizeTaskType(task.type || preset?.type);
    const goal =
      type === TASK_TYPES.goal
        ? parseGoal(task.goal, preset?.goal ?? 1)
        : null;

    return {
      id: Number(task.id),
      title,
      emoji:
        typeof task.emoji === "string" && task.emoji.trim()
          ? task.emoji.trim()
          : null,
      type,
      goal,
      active: Boolean(task.active),
      createdAt: task.createdAt || null,
      archivedAt: task.archivedAt || null,
    };
  });
}

function saveTasks(tasks) {
  saveJson(STORAGE_KEYS.tasks, tasks);
  ensureTaskSeq(tasks);
}

function updateTask(taskId, patch) {
  const tasks = loadTasks();
  const updated = tasks.map((task) =>
    task.id === taskId ? { ...task, ...patch } : task
  );
  saveTasks(updated);
  return updated;
}

function loadDaily() {
  const raw = loadJson(STORAGE_KEYS.daily, {});
  return raw && typeof raw === "object" ? raw : {};
}

function saveDaily(daily) {
  saveJson(STORAGE_KEYS.daily, daily);
}

function getActiveTasks(tasks) {
  return tasks.filter((task) => task.active);
}

function getActiveTaskIds(tasks) {
  return getActiveTasks(tasks).map((task) => task.id);
}

function getOrCreateDayRecord(dateKey, tasks) {
  const daily = loadDaily();
  if (!daily[dateKey]) {
    daily[dateKey] = {
      date: dateKey,
      activeTaskIds: getActiveTaskIds(tasks),
      entries: {},
      updatedAt: new Date().toISOString(),
    };
    saveDaily(daily);
  }
  return { record: daily[dateKey], daily };
}

function updateDayEntry(dateKey, task, entry, tasks) {
  const daily = loadDaily();
  let record = daily[dateKey];
  if (!record) {
    record = {
      date: dateKey,
      activeTaskIds: getActiveTaskIds(tasks),
      entries: {},
    };
  }
  record.entries = record.entries || {};
  record.entries[task.id] = entry;
  record.updatedAt = new Date().toISOString();
  daily[dateKey] = record;
  saveDaily(daily);
}

function addTaskToToday(taskId, tasks) {
  const todayKey = getTodayKey();
  const daily = loadDaily();
  let record = daily[todayKey];
  if (!record) {
    record = {
      date: todayKey,
      activeTaskIds: getActiveTaskIds(tasks),
      entries: {},
    };
  }
  record.activeTaskIds = record.activeTaskIds || [];
  if (!record.activeTaskIds.includes(taskId)) {
    record.activeTaskIds.push(taskId);
  }
  daily[todayKey] = record;
  saveDaily(daily);
}

function removeTaskFromToday(taskId) {
  const todayKey = getTodayKey();
  const daily = loadDaily();
  const record = daily[todayKey];
  if (!record) {
    return;
  }
  record.activeTaskIds = (record.activeTaskIds || []).filter((id) => id !== taskId);
  if (record.entries) {
    delete record.entries[taskId];
  }
  record.updatedAt = new Date().toISOString();
  daily[todayKey] = record;
  saveDaily(daily);
}

function taskEmoji(title) {
  const found = taskEmojiMap.find((item) => item.match.test(title));
  return found ? found.emoji : DEFAULT_EMOJI;
}

function renderToday() {
  const tasks = loadTasks();
  const viewDateKey = getViewDateKey();
  const todayKey = getTodayKey();
  const { record } = getOrCreateDayRecord(viewDateKey, tasks);
  const activeIds = record.activeTaskIds?.length
    ? record.activeTaskIds
    : getActiveTaskIds(tasks);
  const tasksById = new Map(tasks.map((task) => [task.id, task]));
  const displayIds = activeIds.filter((taskId) => tasksById.has(taskId));

  dom.todayLabel.textContent = state.viewDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  if (dom.goToday) {
    dom.goToday.hidden = viewDateKey === todayKey;
  }

  dom.taskList.innerHTML = "";
  if (!displayIds.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const message = document.createElement("p");
    message.className = "muted";
    message.textContent = "No daily tasks yet. Add daily tasks in the Settings menu.";

    const action = document.createElement("button");
    action.type = "button";
    action.className = "task-button alt";
    action.textContent = "Open Settings";
    action.addEventListener("click", () => {
      setActivePanel("settings");
      setMenuOpen(false);
      renderTaskManager();
    });

    emptyState.append(message, action);
    dom.taskList.appendChild(emptyState);
    renderTodaySummary();
    return;
  }

  displayIds.forEach((taskId) => {
    const task = tasksById.get(taskId);
    if (!task) {
      return;
    }
    const type = getTaskType(task);
    let entry = getTaskEntry(task, record);

    const card = document.createElement("div");
    card.className = "task-card";

    const toggleId = `task-${task.id}-${viewDateKey}`;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "task-toggle";
    input.id = toggleId;
    input.setAttribute("aria-label", `Mark ${task.title} as complete`);
    input.checked =
      type === TASK_TYPES.goal ? Boolean(entry.checked) : isTaskComplete(task, entry);

    const check = document.createElement("label");
    check.className = "task-check";
    check.setAttribute("for", toggleId);
    check.setAttribute("aria-hidden", "true");
    let allowUncheck = false;
    check.addEventListener("click", () => {
      allowUncheck = true;
    });

    const body = document.createElement("div");
    body.className = "task-body";

    const title = document.createElement("label");
    title.className = "task-title";
    title.setAttribute("for", toggleId);
    title.textContent = task.title;

    const detail = document.createElement("div");
    detail.className = "task-detail";

    const emoji = document.createElement("span");
    emoji.className = "task-emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = task.emoji || taskEmoji(task.title) || DEFAULT_EMOJI;

    const inputWrap = document.createElement("label");
    inputWrap.className = "task-input";
    const entryInput = document.createElement("input");
    if (type === TASK_TYPES.goal) {
      entryInput.type = "number";
      entryInput.min = "0";
      entryInput.step = "1";
      entryInput.setAttribute("aria-label", `${task.title} number`);
      entryInput.placeholder = formatNumber(getTaskGoal(task));
      if (hasValue(entry.value)) {
        entryInput.value = entry.value;
      }
    } else if (type === TASK_TYPES.checkboxText) {
      entryInput.type = "text";
      entryInput.value = typeof entry.value === "string" ? entry.value : "";
    }
    inputWrap.append(entryInput);

    const updateDetail = (nextEntry) => {
      const text = getTaskDetail(task, nextEntry);
      if (text) {
        detail.textContent = text;
        detail.hidden = false;
      } else {
        detail.textContent = "";
        detail.hidden = true;
      }
    };

    const updateEntry = (nextEntry) => {
      entry = nextEntry;
      updateDayEntry(viewDateKey, task, nextEntry, tasks);
      input.checked =
        type === TASK_TYPES.goal
          ? Boolean(nextEntry.checked)
          : isTaskComplete(task, nextEntry);
      title.textContent = task.title;
      if (type !== TASK_TYPES.checkbox) {
        let showInput = hasValue(nextEntry.value) || Boolean(nextEntry.checked);
        if (type === TASK_TYPES.goal) {
          showInput = Boolean(nextEntry.open) || hasValue(nextEntry.value);
        }
        inputWrap.hidden = !showInput;
      }
      updateDetail(nextEntry);
      renderTodaySummary();
      renderCalendar();
    };

    updateDetail(entry);

    if (type === TASK_TYPES.checkbox) {
      inputWrap.hidden = true;
    } else if (type === TASK_TYPES.goal) {
      inputWrap.hidden = !(entry.open || hasValue(entry.value));
    } else {
      inputWrap.hidden = !(hasValue(entry.value) || Boolean(entry.checked));
    }

    input.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        allowUncheck = true;
      }
    });

    input.addEventListener("change", () => {
      const canUncheck = allowUncheck;
      allowUncheck = false;
      if (!input.checked && !canUncheck) {
        input.checked = true;
        return;
      }
      if (type === TASK_TYPES.goal) {
        if (input.checked) {
          const goalValue = getTaskGoal(task) || 1;
          const numericValue = Number(entry.value);
          const useGoalDefault =
            !hasValue(entry.value) ||
            !Number.isFinite(numericValue) ||
            numericValue < goalValue;
          const nextValue = useGoalDefault ? goalValue : numericValue;
          entryInput.value = nextValue;
          updateEntry(buildTaskEntry(task, true, nextValue, true));
        } else {
          entryInput.value = "";
          updateEntry(buildTaskEntry(task, false, "", false));
        }
        return;
      }

      if (type === TASK_TYPES.checkboxText) {
        if (!input.checked) {
          entryInput.value = "";
          updateEntry(buildTaskEntry(task, false, ""));
          return;
        }
        updateEntry(buildTaskEntry(task, true, entryInput.value));
        return;
      }

      updateEntry(buildTaskEntry(task, input.checked, ""));
    });

    if (type === TASK_TYPES.goal) {
      entryInput.addEventListener("input", () => {
        updateEntry(buildTaskEntry(task, entry.checked, entryInput.value, true));
      });
    }

    if (type === TASK_TYPES.checkboxText) {
      entryInput.addEventListener("change", () => {
        updateEntry(buildTaskEntry(task, true, entryInput.value));
      });
    }

    body.append(title);
    if (type !== TASK_TYPES.checkbox) {
      body.append(inputWrap);
    }
    body.append(detail);
    card.append(input, check, body, emoji);
    dom.taskList.appendChild(card);
  });

  renderTodaySummary();
}

function renderTodaySummary() {
  const tasks = loadTasks();
  const viewDateKey = getViewDateKey();
  const daily = loadDaily();
  const record = daily[viewDateKey];
  const tasksById = new Map(tasks.map((task) => [task.id, task]));
  const activeIds = (record?.activeTaskIds || getActiveTaskIds(tasks)).filter(
    (id) => tasksById.has(id)
  );
  const total = activeIds.length;
  if (!total) {
    dom.todaySummary.textContent = "No tasks yet";
    return;
  }
  const completed = activeIds.reduce((sum, id) => {
    const task = tasksById.get(id);
    if (!task) {
      return sum;
    }
    const entry = getTaskEntry(task, record);
    return sum + (isTaskComplete(task, entry) ? 1 : 0);
  }, 0);
  dom.todaySummary.textContent = `${completed} / ${total} completed`;
}

function renderTaskManager() {
  const tasks = loadTasks();
  const active = tasks.filter((task) => task.active);
  const archived = tasks.filter((task) => !task.active);

  dom.activeTasks.innerHTML = "";
  dom.archivedTasks.innerHTML = "";

  if (!active.length) {
    dom.activeTasks.innerHTML = '<div class="muted">No active tasks.</div>';
  }

  if (!archived.length) {
    dom.archivedTasks.innerHTML = '<div class="muted">No archived tasks.</div>';
  }

  const buildControls = (task) => {
    const controls = document.createElement("div");
    controls.className = "task-controls";

    const typeControl = document.createElement("label");
    typeControl.className = "task-control";
    const typeLabel = document.createElement("span");
    typeLabel.textContent = "Type";
    const typeSelect = document.createElement("select");
    Object.entries(TASK_TYPE_LABELS).forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      typeSelect.appendChild(option);
    });
    typeSelect.value = getTaskType(task);
    typeSelect.addEventListener("change", () => {
      const nextType = normalizeTaskType(typeSelect.value);
      const nextGoal =
        nextType === TASK_TYPES.goal ? parseGoal(task.goal, 1) : null;
      updateTask(task.id, { type: nextType, goal: nextGoal });
      renderAll();
    });
    typeControl.append(typeLabel, typeSelect);

    const goalControl = document.createElement("label");
    goalControl.className = "task-control";
    const goalLabel = document.createElement("span");
    goalLabel.textContent = "Goal";
    const goalInput = document.createElement("input");
    goalInput.type = "number";
    goalInput.min = "0";
    goalInput.step = "1";
    goalInput.value = hasValue(task.goal) ? task.goal : "";
    goalControl.append(goalLabel, goalInput);
    goalControl.hidden = getTaskType(task) !== TASK_TYPES.goal;
    goalInput.addEventListener("change", () => {
      const nextGoal = parseGoal(goalInput.value, 1);
      updateTask(task.id, { goal: nextGoal });
      renderAll();
    });

    controls.append(typeControl, goalControl);
    return controls;
  };

  const buildRow = (task, actionLabel, actionClass, actionHandler) => {
    const row = document.createElement("div");
    row.className = "task-chip";

    const name = document.createElement("div");
    name.className = "task-chip-name";

    const emoji = document.createElement("span");
    emoji.className = "task-chip-emoji";
    emoji.textContent = task.emoji || taskEmoji(task.title) || DEFAULT_EMOJI;

    const label = document.createElement("span");
    label.textContent = task.title;

    const button = document.createElement("button");
    button.type = "button";
    button.className = actionClass;
    button.textContent = actionLabel;
    button.addEventListener("click", actionHandler);

    name.append(emoji, label);
    row.append(name, buildControls(task), button);
    return row;
  };

  active.forEach((task) => {
    const row = buildRow(task, "Remove", "task-button alt", () => {
      const updated = tasks.map((item) =>
        item.id === task.id
          ? { ...item, active: false, archivedAt: new Date().toISOString() }
          : item
      );
      saveTasks(updated);
      removeTaskFromToday(task.id);
      renderAll();
    });
    dom.activeTasks.appendChild(row);
  });

  archived.forEach((task) => {
    const row = buildRow(task, "Restore", "task-button", () => {
      const updated = tasks.map((item) =>
        item.id === task.id
          ? { ...item, active: true, archivedAt: null }
          : item
      );
      saveTasks(updated);
      addTaskToToday(task.id, updated);
      renderAll();
    });
    dom.archivedTasks.appendChild(row);
  });
}

function renderTaskFilter() {
  const tasks = loadTasks();
  dom.taskFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All tasks (daily totals)";
  dom.taskFilter.appendChild(allOption);

  tasks.forEach((task) => {
    const option = document.createElement("option");
    const emoji = task.emoji || taskEmoji(task.title) || DEFAULT_EMOJI;
    option.value = String(task.id);
    option.textContent = task.active
      ? `${emoji} ${task.title}`
      : `${emoji} ${task.title} (archived)`;
    dom.taskFilter.appendChild(option);
  });

  if (state.selectedTaskId) {
    dom.taskFilter.value = String(state.selectedTaskId);
  } else {
    dom.taskFilter.value = "all";
  }
}

function setMenuOpen(open) {
  if (!dom.menu) {
    return;
  }
  dom.menu.classList.toggle("open", open);
  dom.menu.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.setAttribute("data-menu-open", open ? "true" : "false");
}

function setOnboardingView(view) {
  state.onboardingView = view;
  const isOnboarding = Boolean(view);
  if (dom.setupChoicePanel) {
    dom.setupChoicePanel.hidden = view !== "choice";
  }
  if (dom.setupPanel) {
    dom.setupPanel.hidden = view !== "setup";
  }
  if (dom.topbar) {
    dom.topbar.hidden = isOnboarding;
  }
  if (dom.menu) {
    dom.menu.hidden = isOnboarding;
  }
  if (dom.hero) {
    dom.hero.hidden = isOnboarding;
  }
  if (dom.footer) {
    dom.footer.hidden = isOnboarding;
  }
  if (dom.dateNav) {
    dom.dateNav.hidden = isOnboarding || state.activePanel !== "checklist";
  }
  if (dom.todayPanel) {
    dom.todayPanel.hidden = isOnboarding || state.activePanel !== "checklist";
  }
  if (dom.settingsPanel) {
    dom.settingsPanel.hidden = isOnboarding || state.activePanel !== "settings";
  }
  if (dom.calendarPanel) {
    dom.calendarPanel.hidden = isOnboarding || state.activePanel !== "calendar";
  }
  if (isOnboarding) {
    setMenuOpen(false);
  }
}

function populateSetupForm(settings) {
  if (dom.setupAppName) {
    dom.setupAppName.value = settings.appName || DEFAULT_SETTINGS.appName;
  }
  if (dom.setupThemeColor) {
    dom.setupThemeColor.value = normalizeHex(settings.themeColor);
  }
  if (dom.setupThemePreview) {
    dom.setupThemePreview.style.background = normalizeHex(settings.themeColor);
  }
  setupEmojiSelect(dom.setupEmoji, settings.appEmoji || DEFAULT_SETTINGS.appEmoji);
}

function handleSetupScratch() {
  populateSetupForm(loadSettings());
  setOnboardingView("setup");
}

function handleSetupLora() {
  saveOnboarding("lora");
  const settings = loadSettings();
  saveSettings(settings);
  seedTasks();
  applySettings(settings);
  setOnboardingView(null);
  renderAll();
}

function handleSetupThemeColor(event) {
  if (dom.setupThemePreview) {
    dom.setupThemePreview.style.background = normalizeHex(event.target.value);
  }
}

function handleSetupSubmit() {
  const settings = {
    appName:
      dom.setupAppName?.value.trim() || DEFAULT_SETTINGS.appName,
    themeColor: normalizeHex(dom.setupThemeColor?.value),
    appEmoji: dom.setupEmoji?.value || DEFAULT_SETTINGS.appEmoji,
  };
  saveSettings(settings);
  saveOnboarding("scratch");
  applySettings(settings);
  setOnboardingView(null);
  renderAll();
}

function setActivePanel(panelName) {
  if (state.onboardingView) {
    return;
  }
  const resolvedPanel = panelName || "checklist";
  state.activePanel = resolvedPanel;
  const isChecklist = resolvedPanel === "checklist";
  if (dom.todayPanel) {
    dom.todayPanel.hidden = !isChecklist;
  }
  if (dom.dateNav) {
    dom.dateNav.hidden = !isChecklist;
  }
  if (dom.settingsPanel) {
    dom.settingsPanel.hidden = resolvedPanel !== "settings";
  }
  if (dom.calendarPanel) {
    dom.calendarPanel.hidden = resolvedPanel !== "calendar";
  }
  dom.menuItems.forEach((item) => {
    const isActive = item.dataset.panel === resolvedPanel;
    item.classList.toggle("active", isActive);
  });
}

function renderCalendar() {
  const tasks = loadTasks();
  const daily = loadDaily();
  const activeTaskIds = getActiveTaskIds(tasks);
  const tasksById = new Map(tasks.map((task) => [task.id, task]));
  const monthDate = state.monthDate;
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const todayKey = getTodayKey();
  const todayDate = new Date();

  dom.monthLabel.textContent = monthDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  dom.calendarGrid.innerHTML = "";
  dayNames.forEach((name) => {
    const head = document.createElement("div");
    head.className = "day-name";
    head.textContent = name;
    dom.calendarGrid.appendChild(head);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    dom.calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = toDateKey(new Date(year, month, day));
    const dateObj = new Date(year, month, day);
    const record = daily[dateKey];
    const activeIds = record?.activeTaskIds?.length
      ? record.activeTaskIds
      : activeTaskIds;

    const cell = document.createElement("div");
    cell.className = "day";

    if (dateKey === todayKey) {
      cell.classList.add("today");
    }

    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = String(day);

    const count = document.createElement("span");
    count.className = "day-count";

    if (state.selectedTaskId) {
      const taskId = state.selectedTaskId;
      const task = tasksById.get(taskId);
      const scheduled = activeIds.includes(taskId);
      if (!scheduled) {
        cell.classList.add("not-scheduled");
        count.textContent = "—";
      } else if (dateObj > todayDate) {
        cell.classList.add("future");
        count.textContent = "";
      } else {
        const entry = task ? getTaskEntry(task, record) : { checked: false };
        if (task && isTaskComplete(task, entry)) {
          cell.classList.add("done");
          count.innerHTML =
            '<svg class="calendar-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.4 4.4L19 7.3" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        } else {
          cell.classList.add("missed");
          count.textContent = "";
        }
      }
    } else {
      const doneCount = activeIds.reduce((sum, id) => {
        const task = tasksById.get(id);
        if (!task) {
          return sum;
        }
        const entry = getTaskEntry(task, record);
        return sum + (isTaskComplete(task, entry) ? 1 : 0);
      }, 0);
      const total = activeIds.length || 0;
      count.textContent = total ? `${doneCount}/${total}` : "—";
      if (total) {
        if (doneCount === total) {
          cell.classList.add("all-done");
        } else if (doneCount > 0) {
          cell.classList.add("some-done");
        } else {
          cell.classList.add("none-done");
        }
      }
    }

    cell.append(number, count);
    dom.calendarGrid.appendChild(cell);
  }

  renderLegend();
  renderMonthlyTotals();
}

function renderLegend() {
  dom.calendarLegend.innerHTML = "";
  if (state.selectedTaskId) {
    dom.calendarLegend.appendChild(
      buildLegendChip("Done", "rgba(40, 200, 120, 0.7)")
    );
    dom.calendarLegend.appendChild(
      buildLegendChip("Missed", "rgba(255, 77, 109, 0.7)")
    );
    dom.calendarLegend.appendChild(
      buildLegendChip("Not scheduled", "rgba(120, 120, 120, 0.5)")
    );
  } else {
    const chip = document.createElement("div");
    chip.className = "legend-chip";
    chip.textContent = "Format: completed / total tasks";
    dom.calendarLegend.appendChild(chip);
  }
}

function buildLegendChip(label, color) {
  const chip = document.createElement("div");
  chip.className = "legend-chip";

  const swatch = document.createElement("span");
  swatch.className = "legend-swatch";
  swatch.style.background = color;

  const text = document.createElement("span");
  text.textContent = label;

  chip.append(swatch, text);
  return chip;
}

function renderMonthlyTotals() {
  const daily = loadDaily();
  const tasks = loadTasks();
  const activeTaskIds = getActiveTaskIds(tasks);
  const tasksById = new Map(tasks.map((task) => [task.id, task]));
  const monthMap = new Map();

  Object.keys(daily).forEach((dateKey) => {
    const record = daily[dateKey];
    const monthKey = getMonthKey(dateKey);
    const stats = monthMap.get(monthKey) || { completed: 0, total: 0 };

    if (state.selectedTaskId) {
      const task = tasksById.get(state.selectedTaskId);
      const scheduled = record.activeTaskIds?.includes(state.selectedTaskId);
      if (scheduled) {
        stats.total += 1;
        const entry = task ? getTaskEntry(task, record) : { checked: false };
        if (task && isTaskComplete(task, entry)) {
          stats.completed += 1;
        }
      }
    } else {
      const ids = record.activeTaskIds?.length
        ? record.activeTaskIds
        : activeTaskIds;
      stats.total += ids.length;
      stats.completed += ids.reduce((sum, id) => {
        const task = tasksById.get(id);
        if (!task) {
          return sum;
        }
        const entry = getTaskEntry(task, record);
        return sum + (isTaskComplete(task, entry) ? 1 : 0);
      }, 0);
    }

    monthMap.set(monthKey, stats);
  });

  const currentMonthKey = getMonthKey(getTodayKey());
  if (!monthMap.has(currentMonthKey)) {
    monthMap.set(currentMonthKey, { completed: 0, total: 0 });
  }

  const sortedMonths = Array.from(monthMap.keys()).sort().reverse();
  dom.monthlyTotals.innerHTML = "";

  sortedMonths.forEach((monthKey) => {
    const stats = monthMap.get(monthKey);
    const [year, month] = monthKey.split("-").map(Number);
    const label = new Date(year, month - 1, 1).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    const card = document.createElement("div");
    card.className = "month-card";

    const name = document.createElement("span");
    name.textContent = label;

    const detail = document.createElement("div");
    if (state.selectedTaskId) {
      detail.textContent = `${stats.completed} done / ${stats.total} scheduled`;
    } else {
      detail.textContent = `${stats.completed} done / ${stats.total} total`;
    }

    card.append(name, detail);
    dom.monthlyTotals.appendChild(card);
  });
}

function addTask(title, emoji, type, goal) {
  const tasks = loadTasks();
  const trimmed = title.trim();
  if (!trimmed) {
    return;
  }
  const chosenEmoji = emoji?.trim() || taskEmoji(trimmed) || DEFAULT_EMOJI;
  const safeType = normalizeTaskType(type);
  const safeGoal =
    safeType === TASK_TYPES.goal ? parseGoal(goal, 1) : null;
  const newTask = {
    id: getNextTaskId(),
    title: trimmed,
    emoji: chosenEmoji,
    type: safeType,
    goal: safeGoal,
    active: true,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  addTaskToToday(newTask.id, tasks);
  renderAll();
}

function renderAll() {
  if (state.onboardingView) {
    return;
  }
  renderToday();
  renderTaskManager();
  renderTaskFilter();
  renderCalendar();
  setActivePanel(state.activePanel);
}

function handleFormSubmit(event) {
  event.preventDefault();
  addTask(
    dom.taskInput.value,
    dom.taskEmoji.value,
    dom.taskType?.value,
    dom.taskGoal?.value
  );
  dom.taskInput.value = "";
  if (dom.taskEmoji) {
    dom.taskEmoji.value = DEFAULT_EMOJI;
  }
  if (dom.taskType) {
    dom.taskType.value = TASK_TYPES.checkbox;
  }
  if (dom.taskGoal) {
    dom.taskGoal.value = "";
  }
  if (dom.taskGoalWrap) {
    dom.taskGoalWrap.hidden = true;
  }
}

function handleMonthChange(direction) {
  state.monthDate = new Date(
    state.monthDate.getFullYear(),
    state.monthDate.getMonth() + direction,
    1
  );
  renderCalendar();
}

function handleTaskFilterChange(event) {
  const value = event.target.value;
  state.selectedTaskId = value === "all" ? null : Number(value);
  renderCalendar();
}

function handleMenuToggle() {
  const isOpen = dom.menu?.classList.contains("open");
  setMenuOpen(!isOpen);
}

function handleMenuItem(event) {
  const panelName = event.currentTarget.dataset.panel;
  setActivePanel(panelName);
  if (panelName === "calendar") {
    renderCalendar();
  }
  setMenuOpen(false);
}

function handleSettingsName(event) {
  updateSettings({ appName: event.target.value });
}

function handleSettingsTheme(event) {
  updateSettings({ themeColor: event.target.value });
  if (dom.themeColorPreview) {
    dom.themeColorPreview.style.background = normalizeHex(event.target.value);
  }
}

function handleSettingsEmoji(event) {
  updateSettings({ appEmoji: event.target.value });
}

function handleTaskTypeChange(event) {
  const type = normalizeTaskType(event.target.value);
  if (!dom.taskGoalWrap || !dom.taskGoal) {
    return;
  }
  const showGoal = type === TASK_TYPES.goal;
  dom.taskGoalWrap.hidden = !showGoal;
  if (showGoal && !dom.taskGoal.value) {
    dom.taskGoal.value = "1";
  }
  if (!showGoal) {
    dom.taskGoal.value = "";
  }
}

function handleDocumentClick(event) {
  if (!dom.menu?.classList.contains("open")) {
    return;
  }
  if (dom.menu.contains(event.target) || dom.menuToggle.contains(event.target)) {
    return;
  }
  setMenuOpen(false);
}

function handleMenuBackdropClick(event) {
  if (event.target === dom.menu) {
    setMenuOpen(false);
  }
}

function handleDayChange(direction) {
  const next = new Date(state.viewDate);
  next.setDate(next.getDate() + direction);
  state.viewDate = next;
  renderToday();
}

function handleGoToday() {
  state.viewDate = new Date();
  renderToday();
}

function handleResetAppData() {
  const confirmed = window.confirm(
    "Delete all Lora Tracker data from this browser? This cannot be undone."
  );
  if (!confirmed) {
    return;
  }
  Object.keys(localStorage)
    .filter((key) => key.startsWith("lora."))
    .forEach((key) => localStorage.removeItem(key));
  window.location.reload();
}

function setRandomEncouragement() {
  const randomIndex = Math.floor(Math.random() * encouragements.length);
  dom.encouragementText.textContent = encouragements[randomIndex];
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js");
    });
  }
}

function init() {
  setRandomEncouragement();
  applySettings(loadSettings());
  setupEmojiSelect(dom.taskEmoji, DEFAULT_EMOJI);
  if (dom.taskType) {
    dom.taskType.value = TASK_TYPES.checkbox;
  }
  if (dom.taskGoalWrap) {
    dom.taskGoalWrap.hidden = true;
  }

  if (!loadOnboarding() && hasStoredData()) {
    saveOnboarding("legacy");
  }

  const onboarding = loadOnboarding();
  if (!onboarding || !onboarding.completed) {
    setOnboardingView("choice");
  } else {
    if (onboarding.mode === "lora") {
      seedTasks();
    }
    renderAll();
  }

  dom.taskForm.addEventListener("submit", handleFormSubmit);
  dom.prevMonth.addEventListener("click", () => handleMonthChange(-1));
  dom.nextMonth.addEventListener("click", () => handleMonthChange(1));
  dom.taskFilter.addEventListener("change", handleTaskFilterChange);
  dom.prevDay.addEventListener("click", () => handleDayChange(-1));
  dom.nextDay.addEventListener("click", () => handleDayChange(1));
  if (dom.goToday) {
    dom.goToday.addEventListener("click", handleGoToday);
  }
  if (dom.resetAppData) {
    dom.resetAppData.addEventListener("click", handleResetAppData);
  }
  dom.menuToggle.addEventListener("click", handleMenuToggle);
  dom.menuItems.forEach((item) =>
    item.addEventListener("click", handleMenuItem)
  );
  document.addEventListener("click", handleDocumentClick);
  if (dom.menu) {
    dom.menu.addEventListener("click", handleMenuBackdropClick);
  }
  if (dom.appNameInput) {
    dom.appNameInput.addEventListener("input", handleSettingsName);
  }
  if (dom.themeColorInput) {
    dom.themeColorInput.addEventListener("input", handleSettingsTheme);
  }
  if (dom.appEmojiInput) {
    dom.appEmojiInput.addEventListener("change", handleSettingsEmoji);
  }
  if (dom.taskType) {
    dom.taskType.addEventListener("change", handleTaskTypeChange);
  }
  if (dom.setupScratch) {
    dom.setupScratch.addEventListener("click", handleSetupScratch);
  }
  if (dom.setupLora) {
    dom.setupLora.addEventListener("click", handleSetupLora);
  }
  if (dom.setupSubmit) {
    dom.setupSubmit.addEventListener("click", handleSetupSubmit);
  }
  if (dom.setupThemeColor) {
    dom.setupThemeColor.addEventListener("input", handleSetupThemeColor);
  }

  registerServiceWorker();
}

init();
