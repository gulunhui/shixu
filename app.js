const localDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const TODAY = localDateKey();
const today = new Date(`${TODAY}T12:00:00`);
const navItems = [
  ["home", "⌂", "首页"], ["recipes", "▦", "菜谱"], ["shopping", "□", "采购"],
  ["inventory", "◒", "库存"], ["stats", "◫", "统计"]
];
const initialState = {
  schemaVersion: 4, page: "home", selected: TODAY, expanded: false,
  recipeFilter: "全部",
  shoppingView: "current",
  recipeMode: "list",
  activeRecipe: 0,
  plans: {
    [TODAY]: { breakfast: null, lunch: "番茄鸡蛋面", dinner: "青椒牛柳", late: null },
    [localDateKey(new Date(today.getTime() - 86400000))]: { breakfast: null, lunch: "土豆炖鸡", dinner: "蒜蓉白菜", late: null },
    [localDateKey(new Date(today.getTime() + 86400000))]: { breakfast: "番茄鸡蛋面", lunch: null, dinner: "土豆炖鸡", late: null }
  },
  shopping: [
    { name: "白菜", price: 5, meals: 2, bought: false }, { name: "鸡蛋", price: 12, meals: 5, bought: false },
    { name: "番茄", price: 8, meals: 3, bought: false }, { name: "牛肉", price: 32, meals: 2, bought: false },
    { name: "青椒", price: 6, meals: 2, bought: false }, { name: "挂面", price: 9, meals: 4, bought: false },
    { name: "酸奶", price: 14, meals: 4, bought: false }
  ],
  inventory: [
    { name: "白菜", meals: 1.5, expiry: "8月27日", color: "" }, { name: "鸡蛋", meals: 4, expiry: "8月31日", color: "yellow" },
    { name: "土豆", meals: 3, expiry: "—", color: "blue" }, { name: "番茄", meals: 1, expiry: "8月26日", color: "coral" },
    { name: "胡萝卜", meals: 2, expiry: "8月30日", color: "yellow" }
  ],
  recipes: [
    { name: "番茄鸡蛋面", cat: "快手菜", time: "15分钟", difficulty: "简单", tags: ["面食", "早餐"], uses: 12, method: "煮", servings: 1, link: "", ingredients: [{ name: "番茄", amount: 1, unit: "个" }, { name: "鸡蛋", amount: 2, unit: "个" }, { name: "挂面", amount: 120, unit: "克" }], steps: [{ ingredients: ["番茄", "鸡蛋"], actions: ["切块", "打散"], duration: 3, instruction: "番茄切块，鸡蛋加少量盐打散。" }, { ingredients: ["鸡蛋"], actions: ["炒"], duration: 3, instruction: "鸡蛋炒至凝固后盛出。" }, { ingredients: ["番茄", "挂面"], actions: ["炒", "煮"], duration: 8, instruction: "番茄炒出汁，加水煮开后放入挂面，最后加入鸡蛋调味。" }] },
    { name: "青椒牛柳", cat: "家常菜", time: "25分钟", difficulty: "中等", tags: ["下饭", "牛肉"], uses: 8, method: "炒", servings: 2, link: "", ingredients: [{ name: "牛肉", amount: 250, unit: "克" }, { name: "青椒", amount: 2, unit: "个" }], steps: [{ ingredients: ["牛肉"], actions: ["切丝", "腌制"], duration: 10, instruction: "牛肉切丝，加生抽和淀粉腌制。" }, { ingredients: ["青椒"], actions: ["清洗", "切丝"], duration: 3, instruction: "青椒洗净去籽后切丝。" }, { ingredients: ["牛肉", "青椒"], actions: ["炒", "调味"], duration: 8, instruction: "先滑炒牛肉，再加入青椒大火翻炒并调味。" }] },
    { name: "蒜蓉白菜", cat: "素食", time: "10分钟", difficulty: "简单", tags: ["绿叶菜"], uses: 7, method: "炒", servings: 2, link: "", ingredients: [{ name: "白菜", amount: 300, unit: "克" }, { name: "蒜", amount: 3, unit: "瓣" }], steps: [{ ingredients: ["白菜", "蒜"], actions: ["清洗", "切段", "切末"], duration: 3, instruction: "白菜洗净切段，蒜切末。" }, { ingredients: ["白菜", "蒜"], actions: ["炒", "调味"], duration: 6, instruction: "热锅加油炒香蒜末，加入白菜炒熟并调味。" }] },
    { name: "土豆炖鸡", cat: "家常菜", time: "45分钟", difficulty: "中等", tags: ["炖菜"], uses: 4, method: "炖", servings: 3, link: "", ingredients: [{ name: "土豆", amount: 2, unit: "个" }, { name: "鸡腿", amount: 3, unit: "只" }], steps: [{ ingredients: ["鸡腿"], actions: ["清洗", "焯水"], duration: 8, instruction: "鸡腿切块后焯水，洗净浮沫。" }, { ingredients: ["土豆"], actions: ["去皮", "切块"], duration: 5, instruction: "土豆去皮切滚刀块。" }, { ingredients: ["土豆", "鸡腿"], actions: ["炒", "炖", "调味"], duration: 30, instruction: "鸡腿炒香后加水炖煮，加入土豆煮软并调味。" }] }
  ],
  purchaseHistory: [
    { date: "2026-08-22", amount: 92, beforeKinds: 8, items: [{ name: "白菜", meals: 2, price: 5 }, { name: "鸡蛋", meals: 5, price: 12 }, { name: "猪肉", meals: 3, price: 42 }, { name: "牛奶", meals: 4, price: 33 }] },
    { date: "2026-08-16", amount: 76, beforeKinds: 5, items: [{ name: "番茄", meals: 3, price: 8 }, { name: "土豆", meals: 3, price: 7 }, { name: "鸡腿", meals: 2, price: 61 }] },
    { date: "2026-08-09", amount: 100, beforeKinds: 6, items: [{ name: "牛肉", meals: 2, price: 32 }, { name: "青椒", meals: 2, price: 6 }, { name: "挂面", meals: 4, price: 9 }, { name: "酸奶", meals: 4, price: 53 }] }
  ],
  mealRecords: {},
  logs: [],
  statsRange: "week",
  statsStart: "",
  statsEnd: ""
};

if (window.location.hash === "#reset-demo") localStorage.removeItem("shixu-demo");
let state;
const localStateRaw = localStorage.getItem("shixu-demo");
try { state = JSON.parse(localStateRaw) || initialState; }
catch { state = initialState; }
if (!state.plans) {
  state.plans = { [TODAY]: state.meals || initialState.plans[TODAY] };
  delete state.meals;
}
state.logs ||= [];
state.mealRecords ||= {};
state.recipeFilter ||= "全部";
state.purchaseHistory ||= initialState.purchaseHistory;
state.shoppingView ||= "current";
state.openPurchaseHistory = null;
state.selected = TODAY;
state.plans[TODAY] ||= { breakfast: null, lunch: null, dinner: null, late: null };
if (!state.schemaVersion || state.schemaVersion < 2) {
  state.shopping.forEach(item => { item.bought = false; });
}
function normalizeRecipe(recipe) {
  if (!Array.isArray(recipe.ingredients)) {
    recipe.ingredients = String(recipe.ingredients || "").split(/[、,，]/).map(name => name.trim()).filter(Boolean).map(name => ({ name, amount: "", unit: "" }));
  }
  if (!Array.isArray(recipe.steps)) {
    const instruction = typeof recipe.steps === "string" ? recipe.steps : "";
    recipe.steps = [{ ingredients: recipe.ingredients.map(item => item.name), actions: recipe.method ? [recipe.method] : [], duration: "", instruction }];
  }
  recipe.steps = recipe.steps.map(step => ({ ingredients: step.ingredients || [], actions: step.actions || [], duration: step.duration || "", instruction: step.instruction || "" }));
  recipe.servings ||= 1;
  recipe.link ||= "";
  return recipe;
}
state.recipes = state.recipes.map(normalizeRecipe);
state.schemaVersion = 4;
state.recipeMode ||= "list";
state.activeRecipe ||= 0;
state.statsRange ||= "week";
state.statsStart ||= "";
state.statsEnd ||= "";
let stateDb;
const openStateDb = () => new Promise(resolve => {
  if (!window.indexedDB) return resolve(null);
  const request = indexedDB.open("shixu-db", 1);
  request.onupgradeneeded = () => request.result.createObjectStore("snapshots");
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => resolve(null);
});
stateDb = openStateDb();
stateDb.then(db => {
  if (!db || localStateRaw) return;
  const request = db.transaction("snapshots", "readonly").objectStore("snapshots").get("current");
  request.onsuccess = () => {
    if (!request.result) return;
    state = { ...initialState, ...request.result, page: "home", selected: TODAY };
    state.recipes = (state.recipes || []).map(normalizeRecipe);
    state.purchaseHistory = (state.purchaseHistory || []).map(normalizePurchaseRecord);
    render();
  };
});
const persistIndexedState = snapshot => stateDb.then(db => {
  if (!db) return;
  const transaction = db.transaction("snapshots", "readwrite");
  transaction.objectStore("snapshots").put(snapshot, "current");
});
const save = () => {
  const snapshot = JSON.parse(JSON.stringify(state));
  try { localStorage.setItem("shixu-demo", JSON.stringify(snapshot)); } catch { /* IndexedDB remains the durable copy. */ }
  persistIndexedState(snapshot);
};
const currentPlan = () => state.plans[state.selected] || { breakfast: null, lunch: null, dinner: null, late: null };
const currentMealRecords = () => state.mealRecords[state.selected] || {};
const selectedDate = () => new Date(`${state.selected}T12:00:00`);
const isPast = () => state.selected < TODAY;
const isFuture = () => state.selected > TODAY;
const formatDate = value => { const date = new Date(`${value}T12:00:00`); return `${date.getMonth() + 1}月${date.getDate()}日`; };
const inStatsRange = value => {
  if (!value) return false;
  const date = new Date(`${value}T12:00:00`);
  const end = new Date(`${TODAY}T12:00:00`);
  const start = new Date(end);
  if (state.statsRange === "month") start.setDate(1);
  else if (state.statsRange === "90d") start.setDate(start.getDate() - 89);
  else if (state.statsRange === "custom") {
    if (!state.statsStart || !state.statsEnd) return true;
    return value >= state.statsStart && value <= state.statsEnd;
  } else {
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);
  }
  return date >= start && date <= end;
};
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
const ingredientSummary = recipe => recipe.ingredients.map(item => `${item.name}${item.amount ? ` ${item.amount}${item.unit}` : ""}`).join("、");
const actionOptions = ["清洗", "去皮", "切片", "切块", "切丝", "切段", "切末", "打散", "腌制", "焯水", "解冻", "搅拌", "炒", "煮", "炖", "蒸", "烤", "炸", "调味", "装盘"];
function foodCatalog() {
  const names = new Set(state.inventory.map(item => item.name));
  state.purchaseHistory.forEach(record => record.items.forEach(item => names.add(typeof item === "string" ? String(item).trim().split(/\s+/)[0] : item.name)));
  state.recipes.forEach(recipe => recipe.ingredients.forEach(item => names.add(item.name)));
  return [...names].filter(Boolean).sort((a, b) => a.localeCompare(b, "zh-CN"));
}
function normalizePurchaseRecord(record) {
  delete record.beforeMeals;
  record.items = (record.items || []).map(item => {
    if (typeof item !== "string") return { name: item.name, meals: Number(item.meals) || 1, price: Number(item.price) || 0 };
    const match = item.match(/^(.*?)(?:\s+(\d+(?:\.\d+)?)顿)?$/);
    return { name: match?.[1] || item, meals: Number(match?.[2]) || 1, price: 0 };
  });
  return record;
}
state.purchaseHistory = state.purchaseHistory.map(normalizePurchaseRecord);
let draftRecipe = null;
let editingRecipeIndex = null;
let pendingMealPhoto = "";
let deferredInstallPrompt = null;

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installPwa.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installPwa.hidden = true;
});

function renderNav() {
  const activePage = state.page === "recipe-detail" ? "recipes" : state.page;
  const desktop = navItems.map(([id, icon, label]) => `<button class="${activePage === id ? "active" : ""}" data-go="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join("");
  sideNav.innerHTML = desktop;
  mobileNav.innerHTML = navItems.map(([id, icon, label]) => `<button class="${activePage === id ? "active" : ""}" data-go="${id}"><span>${icon}</span>${label}</button>`).join("");
  const weekPlans = Object.entries(state.plans).filter(([date]) => inStatsRange(date)).reduce((sum, [, plan]) => sum + Object.values(plan).filter(Boolean).length, 0);
  sidebarNote.innerHTML = `<b>本周小结</b><br>已规划 ${weekPlans} 顿，库存还有 ${state.inventory.filter(item => item.meals > 0).length} 种食材。`;
}

function renderDates() {
  const start = new Date(today);
  start.setDate(today.getDate() - 3);
  const count = state.expanded ? 14 : 7;
  let html = "";
  for (let i = 0; i < count; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const key = date.toISOString().slice(0, 10);
    html += `<button class="date ${key === state.selected ? "selected" : ""} ${key === TODAY ? "today" : ""}" data-date="${key}"><span>${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}</span><strong>${date.getDate()}</strong></button>`;
  }
  dateGrid.innerHTML = html;
  const date = selectedDate();
  dateLabel.textContent = `${date.getMonth() + 1}月${date.getDate()}日${state.selected === TODAY ? " · 今天" : isPast() ? " · 历史" : " · 计划"}`;
  const weekday = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][today.getDay()];
  todayEyebrow.textContent = `${weekday} · ${today.toLocaleDateString("en-US", { month: "short" }).toUpperCase()} ${today.getDate()}, ${today.getFullYear()}`;
  expandDates.textContent = state.expanded ? "收起日期" : "展开日期";
}

function renderHome() {
  const plan = currentPlan();
  const records = currentMealRecords();
  const meals = [["breakfast", "早饭"], ["lunch", "午饭"], ["dinner", "晚饭"], ["late", "宵夜"]];
  let visible = meals;
  if (isPast()) visible = meals.filter(([key]) => plan[key] || records[key]);
  mealGrid.innerHTML = visible.length ? visible.map(([key, label]) => {
    const value = plan[key];
    const record = records[key];
    return `<div class="meal ${value ? "done" : ""} ${record ? "completed" : ""}">${record?.photo ? `<button class="meal-photo" data-view-meal-record="${key}" title="查看完成记录"><img src="${record.photo}" alt="${escapeHtml(label)}成品照片"></button>` : ""}<div><small><span class="meal-dot"></span>${label}${record ? ` · 已完成 ${escapeHtml(record.time || "")}` : ""}</small><div class="meal-name">${record?.recipeName || value || "还没有安排"}</div></div><div class="meal-actions"><button class="meal-add" data-meal="${key}">${value ? "更换或延期" : "＋ 添加菜谱"}</button>${value && !isFuture() ? `<button class="meal-complete" data-complete-meal="${key}">${record ? "查看记录" : "完成并拍照"}</button>` : ""}</div></div>`;
  }).join("") : `<div class="empty">这一天没有留下用餐计划</div>`;
  const lastPurchase = state.purchaseHistory[0];
  if (lastPurchase) {
    const purchaseDate = new Date(`${lastPurchase.date}T12:00:00`);
    recentPurchaseDate.textContent = `${purchaseDate.getMonth() + 1}月${purchaseDate.getDate()}日 · ¥${lastPurchase.amount}`;
    recentShopping.innerHTML = lastPurchase.items.slice(0, 4).map(item => `<div class="row"><div class="item-left"><span class="food-dot"></span><div><div class="item-name">${escapeHtml(item.name)}</div><div class="item-meta">${item.meals}顿 · ${item.price ? `¥${item.price}` : "金额未记录"}</div></div></div><span class="qty">已入库</span></div>`).join("");
  } else {
    recentPurchaseDate.textContent = "暂无记录";
    recentShopping.innerHTML = `<div class="empty">完成一次采购后会显示在这里</div>`;
  }
  inventoryHome.innerHTML = state.inventory.slice(0, 4).map(item => `<div class="row"><div class="item-left"><span class="food-dot ${item.color || ""}"></span><div><div class="item-name">${item.name}</div><div class="item-meta">${item.expiry === "—" ? "未填写保质期" : `建议在${item.expiry}前吃完`}</div></div></div><span class="qty">${item.meals}顿</span></div>`).join("");
  recentRecipes.innerHTML = state.recipes.slice().sort((a, b) => b.uses - a.uses).slice(0, 3).map(item => `<div class="row"><div><div class="item-name">${item.name}</div><div class="item-meta">${item.method} · ${item.time} · ${item.difficulty}</div></div><span class="qty">${item.uses}次使用</span></div>`).join("");
}

function renderShopping() {
  const picked = state.shopping.filter(item => item.bought);
  shopCount.textContent = state.shopping.length;
  shopBudget.textContent = `¥${state.shopping.reduce((sum, item) => sum + item.price, 0)}`;
  shopPicked.textContent = picked.length;
  shoppingList.innerHTML = state.shopping.map((item, index) => `<div class="row shopping-row"><div class="shopping-item-main"><input type="checkbox" ${item.bought ? "checked" : ""} data-buy="${index}"><div><div class="item-name">${escapeHtml(item.name)}</div><div class="shopping-item-meta"><span class="meal-label">预计可用</span><span class="meal-stepper"><button type="button" title="减少预计可用顿数" data-meal-minus="${index}">−</button><b>${item.meals}顿</b><button type="button" title="增加预计可用顿数" data-meal-plus="${index}">＋</button></span><span class="price-label">金额 ¥${item.price}</span></div></div></div><button class="mini" data-remove="${index}">删除</button></div>`).join("");
  frequentList.innerHTML = ["白菜", "鸡蛋", "番茄", "土豆", "大葱", "牛肉"].map(name => `<button class="chip" data-frequent="${name}">＋ ${name}</button>`).join("");
  pickedSummary.textContent = picked.length ? `已买到 ${picked.length} 项 · ¥${picked.reduce((sum, item) => sum + item.price, 0)}` : "尚未勾选买到的物品";
  document.querySelectorAll("[data-shopping-view]").forEach(button => button.classList.toggle("active", button.dataset.shoppingView === state.shoppingView));
  document.querySelectorAll("[data-shopping-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.shoppingPanel === state.shoppingView));
  purchaseHistoryList.innerHTML = state.purchaseHistory.map((record, index) => {
    const purchaseDate = new Date(`${record.date}T12:00:00`);
    const open = state.openPurchaseHistory === index;
    return `<article class="history-card"><div class="history-head"><div><h3>${formatDate(record.date)}采购</h3><p>${record.items.length} 项 · 采购前剩余 ${record.beforeKinds} 种食材</p></div><div class="history-summary-action"><span class="history-amount">¥${record.amount}</span><button class="mini" data-edit-purchase="${index}">编辑</button><button class="mini" data-toggle-purchase="${index}">${open ? "收起明细" : "查看明细"}</button></div></div><div class="history-items">${record.items.slice(0, 4).map(item => `<span class="history-item">${escapeHtml(item.name)}</span>`).join("")}${record.items.length > 4 ? `<span class="history-item">＋${record.items.length - 4}项</span>` : ""}</div>${open ? `<div class="purchase-detail"><div class="purchase-detail-head"><span>食材</span><span>预计可用</span><span>金额</span></div>${record.items.map(item => `<div class="purchase-detail-row"><b>${escapeHtml(item.name)}</b><span>${item.meals}顿</span><span>${item.price ? `¥${item.price}` : "未记录"}</span></div>`).join("")}<div class="purchase-detail-total"><b>采购合计</b><span></span><strong>¥${record.amount}</strong></div></div>` : ""}</article>`;
  }).join("") || `<div class="empty">还没有历史采购记录</div>`;
}

function renderInventory() {
  inventoryList.innerHTML = state.inventory.length ? state.inventory.map((item, index) => `<div class="row"><div class="stock-main"><div class="item-left"><span class="food-dot ${item.color || ""}"></span><div><div class="item-name">${escapeHtml(item.name)}</div><div class="item-meta">${item.expiry === "—" ? "未填写保质期" : `${escapeHtml(item.expiry)}前`} · ${escapeHtml(item.lastReason || "来自采购")}</div></div></div><div class="progress"><i style="width:${Math.min(100, Math.max(12, item.meals / 5 * 100))}%"></i></div></div><div class="stock-action"><b>${item.meals}顿</b><button class="mini" data-waste="${index}">调整</button></div></div>`).join("") : `<div class="empty">当前没有库存</div>`;
  const logs = state.logs.slice().reverse().slice(0, 12);
  inventoryLogs.innerHTML = logs.length ? logs.map(log => `<div class="row"><div><div class="item-name">${escapeHtml(log.name)}</div><div class="item-meta">${escapeHtml(log.date || "未记录日期")} · ${escapeHtml(log.meal || "不归属餐次")} · ${escapeHtml(log.reason || "调整")}</div></div><b class="${Number(log.amount) < 0 ? "negative" : "positive"}">${Number(log.amount) > 0 ? "+" : ""}${log.amount}顿</b></div>`).join("") : `<div class="empty">还没有库存调整记录</div>`;
}

function renderStats() {
  const purchases = state.purchaseHistory.filter(record => inStatsRange(record.date));
  const logs = state.logs.filter(log => inStatsRange(log.date));
  const planned = Object.entries(state.plans).filter(([date, plan]) => inStatsRange(date)).reduce((sum, [, plan]) => sum + Object.values(plan).filter(Boolean).length, 0);
  const spent = purchases.reduce((sum, record) => sum + (Number(record.amount) || 0), 0);
  const wasteLogs = logs.filter(log => /过期|变质|浪费/.test(log.reason || ""));
  const wasteMeals = wasteLogs.reduce((sum, log) => sum + Math.abs(Number(log.amount) || 0), 0);
  const usedMeals = logs.filter(log => log.type === "auto" && Number(log.amount) < 0).reduce((sum, log) => sum + Math.abs(Number(log.amount) || 0), 0);
  statsSpend.textContent = `¥${spent.toFixed(0)}`;
  statsPlanned.textContent = planned;
  statsWasteRate.textContent = wasteMeals + usedMeals ? `${((wasteMeals / (wasteMeals + usedMeals)) * 100).toFixed(1)}%` : "—";
  document.querySelectorAll("[data-stats-range]").forEach(button => button.classList.toggle("active", button.dataset.statsRange === state.statsRange));
  purchaseStatsRows.innerHTML = purchases.length ? purchases.map(record => {
    const waste = wasteLogs.filter(log => log.date === record.date).map(log => `${escapeHtml(log.name)} · ${escapeHtml(log.reason)}`).join("、") || "无";
    return `<tr><td>${formatDate(record.date)}</td><td>${record.beforeKinds || 0}种食材</td><td>${waste}</td><td>¥${Number(record.amount || 0).toFixed(0)}</td><td><button class="mini" data-edit-purchase="${state.purchaseHistory.indexOf(record)}">编辑</button></td></tr>`;
  }).join("") : `<tr><td colspan="5">该时间范围暂无采购记录</td></tr>`;
  const wasteMap = {};
  wasteLogs.forEach(log => { const key = log.name; wasteMap[key] ||= { count: 0, meals: 0, reason: log.reason }; wasteMap[key].count += 1; wasteMap[key].meals += Math.abs(Number(log.amount) || 0); });
  wasteList.innerHTML = Object.entries(wasteMap).sort((a, b) => b[1].meals - a[1].meals).slice(0, 6).map(([name, data]) => `<div class="row"><div class="item-left"><span class="food-dot coral"></span><div><div class="item-name">${escapeHtml(name)}</div><div class="item-meta">${data.count}次 · ${escapeHtml(data.reason)}</div></div></div><b>${data.meals}顿</b></div>`).join("") || `<div class="empty">该时间范围暂无浪费记录</div>`;
  const target = document.getElementById("frequencyList");
  const frequency = state.recipes.map(recipe => ({ recipe, count: Object.entries(state.plans).filter(([date, plan]) => inStatsRange(date) && Object.values(plan).includes(recipe.name)).length })).filter(item => item.count).sort((a, b) => b.count - a.count);
  target.innerHTML = frequency.slice(0, 4).map((item, index) => `<div class="row"><div class="item-left"><span class="rank">${index + 1}</span><div><div class="item-name">${escapeHtml(item.recipe.name)}</div><div class="item-meta">${escapeHtml(item.recipe.cat)} · ${escapeHtml(item.recipe.method)}</div></div></div><b>${item.count}次</b></div>`).join("") || `<div class="empty">该时间范围暂无计划菜谱</div>`;
}

function renderRecipes() {
  const input = document.getElementById("recipeSearch");
  const query = (input?.value || "").toLowerCase();
  const categories = ["全部", "快手菜", "家常菜", "素食", "汤羹", "自定义"];
  recipeFilters.innerHTML = categories.map(category => `<button class="chip ${state.recipeFilter === category ? "active" : ""}" data-filter="${category}">${category}</button>`).join("");
  const list = state.recipes.filter(item => {
    const matchesText = `${item.name}${ingredientSummary(item)}${item.tags.join("")}`.toLowerCase().includes(query);
    const matchesCategory = state.recipeFilter === "全部" || item.cat === state.recipeFilter;
    return matchesText && matchesCategory;
  });
  recipeList.innerHTML = list.length ? list.map(item => `<div class="recipe-card"><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.method)} · ${escapeHtml(item.time)} · ${escapeHtml(item.difficulty)} · ${escapeHtml(ingredientSummary(item))}</p><div class="tags">${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}<span class="tag">${escapeHtml(item.cat)}</span><span class="tag">${item.steps.length}步</span></div></div><div class="recipe-actions"><span class="qty">${item.uses}次</span><button class="mini" data-view-recipe="${state.recipes.indexOf(item)}">查看</button><button class="mini" data-use-recipe="${state.recipes.indexOf(item)}">安排</button></div></div>`).join("") : `<div class="empty">没有找到匹配的菜谱</div>`;
}

function renderRecipeWorkspace() {
  if (state.page !== "recipe-detail") return;
  if (state.recipeMode === "edit" && draftRecipe) {
    renderRecipeEditor();
    return;
  }
  const recipe = state.recipes[state.activeRecipe];
  if (!recipe) { state.page = "recipes"; return; }
  recipeDetail.innerHTML = `<div class="workspace-head"><button class="ghost" data-back-recipes>← 返回菜谱</button><div class="workspace-actions"><button class="ghost" data-edit-recipe="${state.activeRecipe}">编辑</button><button class="primary" data-use-recipe="${state.activeRecipe}">安排到一餐</button></div></div><article class="recipe-detail-panel"><div class="recipe-detail-hero"><div><span class="eyebrow">${escapeHtml(recipe.cat)} · ${recipe.steps.length} 个步骤</span><h2>${escapeHtml(recipe.name)}</h2><p>${escapeHtml(recipe.method)} · ${escapeHtml(recipe.time)} · ${escapeHtml(recipe.difficulty)} · ${recipe.servings} 人份</p><div class="tags">${recipe.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div><div class="recipe-use-count"><b>${recipe.uses}</b><span>安排次数</span></div></div><div class="recipe-detail-grid"><section><div class="detail-section-head"><h3>食材</h3><span>菜谱总用量</span></div><div class="ingredient-detail-list">${recipe.ingredients.map(item => `<div><b>${escapeHtml(item.name)}</b><span>${escapeHtml(item.amount)} ${escapeHtml(item.unit)}</span></div>`).join("")}</div>${recipe.link ? `<a class="reference-link" href="${escapeHtml(recipe.link)}" target="_blank" rel="noreferrer">打开参考链接 ↗</a>` : ""}</section><section><div class="detail-section-head"><h3>步骤</h3><span>按顺序操作</span></div><div class="step-detail-list">${recipe.steps.map((step, index) => `<article class="step-detail"><span class="step-number">${String(index + 1).padStart(2, "0")}</span><div><div class="step-labels">${step.actions.map(action => `<span>${escapeHtml(action)}</span>`).join("")}${step.duration ? `<span>${escapeHtml(step.duration)} 分钟</span>` : ""}</div><p>${escapeHtml(step.instruction || "暂无步骤说明")}</p><small>${step.ingredients.length ? `使用：${escapeHtml(step.ingredients.join("、"))}` : "本步骤未关联食材"}</small></div></article>`).join("")}</div></section></div></article>`;
}

function renderRecipeEditor() {
  const ingredientNames = draftRecipe.ingredients.map(item => item.name).filter(Boolean);
  const catalog = foodCatalog();
  const catalogOptions = catalog.map(name => `<option value="${escapeHtml(name)}"></option>`).join("");
  const ingredientRows = draftRecipe.ingredients.map((item, index) => {
    return `<div class="ingredient-editor-row" data-ingredient-index="${index}">
      <input data-part="name" list="foodCatalog" value="${escapeHtml(item.name)}" placeholder="选择或输入新食材">
      <input data-part="amount" type="number" step="0.1" value="${escapeHtml(item.amount)}" placeholder="用量">
      <select data-part="unit">${["克", "个", "只", "瓣", "勺", "毫升", "片", "根", "把", "适量"].map(unit => `<option ${item.unit === unit ? "selected" : ""}>${unit}</option>`).join("")}</select>
      <button class="icon-danger" title="删除食材" data-remove-ingredient="${index}">×</button>
    </div>`;
  }).join("");
  const stepRows = draftRecipe.steps.map((step, index) => `<article class="step-editor-card" data-step-index="${index}">
    <div class="step-editor-head"><div><span class="step-number">${String(index + 1).padStart(2, "0")}</span><b>步骤 ${index + 1}</b></div><div class="step-tools"><button title="上移" data-step-up="${index}">↑</button><button title="下移" data-step-down="${index}">↓</button><button title="复制步骤" data-step-copy="${index}">⧉</button><button title="删除步骤" data-step-remove="${index}">×</button></div></div>
    <div class="step-editor-body"><div class="field full"><label>使用食材</label><div class="check-chips">${ingredientNames.length ? ingredientNames.map(name => `<label><input type="checkbox" data-step-ingredient value="${escapeHtml(name)}" ${step.ingredients.includes(name) ? "checked" : ""}><span>${escapeHtml(name)}</span></label>`).join("") : `<small>请先添加食材</small>`}</div></div><div class="field full"><label>处理方式</label><div class="check-chips">${actionOptions.map(action => `<label><input type="checkbox" data-step-action value="${action}" ${step.actions.includes(action) ? "checked" : ""}><span>${action}</span></label>`).join("")}</div></div><div class="field"><label>预计时长（分钟）</label><input data-step-duration type="number" min="0" value="${escapeHtml(step.duration)}" placeholder="选填"></div><div class="field full"><label>步骤说明</label><textarea data-step-instruction placeholder="说明火候、状态或操作要点">${escapeHtml(step.instruction)}</textarea></div></div>
  </article>`).join("");
  recipeDetail.innerHTML = `<div class="workspace-head"><button class="ghost" data-cancel-recipe-editor>← 取消</button><div class="workspace-actions"><button class="primary" id="saveRecipeWorkspace">保存菜谱</button></div></div>
    <div class="recipe-editor-layout">
      <section class="editor-section"><div class="detail-section-head"><h3>基本信息</h3><span>尽量选择，减少填写</span></div><div class="form-grid"><div class="field"><label>菜谱名称</label><input id="rwName" value="${escapeHtml(draftRecipe.name)}" placeholder="例如：香菇青菜"></div><div class="field"><label>分类</label><select id="rwCat">${["快手菜", "家常菜", "素食", "汤羹", "自定义"].map(item => `<option ${draftRecipe.cat === item ? "selected" : ""}>${item}</option>`).join("")}</select></div><div class="field"><label>主要烹饪方式</label><select id="rwMethod">${["炒", "煮", "炖", "蒸", "炸", "烤", "凉拌"].map(item => `<option ${draftRecipe.method === item ? "selected" : ""}>${item}</option>`).join("")}</select></div><div class="field"><label>烹饪时间</label><input id="rwTime" value="${escapeHtml(draftRecipe.time)}" placeholder="例如：20分钟"></div><div class="field"><label>难度</label><select id="rwDiff">${["简单", "中等", "挑战"].map(item => `<option ${draftRecipe.difficulty === item ? "selected" : ""}>${item}</option>`).join("")}</select></div><div class="field"><label>份量</label><input id="rwServings" type="number" min="1" value="${draftRecipe.servings}"></div><div class="field full"><label>标签</label><input id="rwTags" value="${escapeHtml(draftRecipe.tags.join(","))}" placeholder="用逗号分隔"></div><div class="field full"><label>参考链接（选填）</label><input id="rwLink" type="url" value="${escapeHtml(draftRecipe.link)}" placeholder="https://"></div></div></section>
      <section class="editor-section"><div class="detail-section-head"><div><h3>食材总表</h3><span>可选历史食材，也可直接输入新食材</span></div><button class="mini" data-add-ingredient>＋ 添加食材</button></div><datalist id="foodCatalog">${catalogOptions}</datalist><div class="ingredient-editor-list">${ingredientRows}</div><p class="editor-hint">候选来自当前库存、历史采购和已有菜谱。没有库存也可以创建菜谱。</p></section>
      <section class="editor-section"><div class="detail-section-head"><div><h3>烹饪步骤</h3><span>每一步可选择多个食材和处理方式</span></div><button class="primary" data-add-step>＋ 添加步骤</button></div><div class="step-editor-list">${stepRows}</div></section>
    </div>`;
}

function adjustRecipeStock(recipeName, direction, date, meal) {
  const recipe = state.recipes.find(item => item.name === recipeName);
  if (!recipe) return;
  state.inventory.forEach(stock => {
    if (!recipe.ingredients.some(item => item.name === stock.name)) return;
    stock.meals = Math.max(0, stock.meals + direction);
    stock.lastReason = direction < 0 ? `菜谱自动扣减 · ${meal}` : `更换计划自动归还 · ${meal}`;
    state.logs.push({ type: "auto", name: stock.name, amount: direction, reason: stock.lastReason, date, meal });
  });
}

function render() {
  renderNav();
  renderDates();
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.dataset.page === state.page));
  globalDatebar.hidden = state.page !== "home";
  const recipeTitle = state.recipeMode === "edit" ? (editingRecipeIndex === null ? "新建菜谱" : "编辑菜谱") : (state.recipes[state.activeRecipe]?.name || "菜谱详情");
  const labels = { home: ["今天吃什么？", "把买好的食材，变成接下来几天的计划。"], recipes: ["菜谱", "少填写，多选择，把常做的菜记下来。"], "recipe-detail": [recipeTitle, state.recipeMode === "edit" ? "添加食材总表，再用步骤组织烹饪过程。" : "查看完整食材与烹饪步骤。"], shopping: ["采购", "准备本次清单，也可以回看每次买了什么。"], inventory: ["库存", "按顿数管理剩余食材，并保留调整原因。"], stats: ["统计", "从采购、做菜频率和浪费中发现规律。"] };
  [pageTitle.textContent, pageSubtitle.textContent] = labels[state.page];
  renderHome(); renderShopping(); renderInventory(); renderRecipes(); renderStats(); renderRecipeWorkspace(); save();
}

function openModal(content) { modal.innerHTML = content; modalBackdrop.classList.add("open"); }
function closeModal() { modalBackdrop.classList.remove("open"); }
function modalFrame(title, body, action, actionId, data = "") {
  return `<div class="modal-head"><h3>${title}</h3><button class="close">×</button></div>${body}<div class="modal-foot"><button class="ghost close">取消</button><button class="primary" id="${actionId}" ${data}>${action}</button></div>`;
}

function openMealModal(key, preset = "") {
  const labels = { breakfast: "早饭", lunch: "午饭", dinner: "晚饭", late: "宵夜" };
  const current = preset || currentPlan()[key] || "";
  const body = `<div class="field"><label>从已有菜谱选择</label><select id="mealRecipe"><option value="">暂不安排</option>${state.recipes.map(item => `<option ${item.name === current ? "selected" : ""}>${item.name}</option>`).join("")}</select></div><div class="field field-gap"><label>临时选择购买食材</label><input id="mealTemp" placeholder="例如：白菜炒粉丝"></div><div class="field field-gap"><label>计划变更</label><select id="mealMove"><option value="">不延期</option><option value="1">延后到明天同一餐</option><option value="2">延后两天同一餐</option></select></div>`;
  openModal(modalFrame(`安排${labels[key]}`, body, "保存安排", "saveMeal", `data-key="${key}"`));
}

function openMealRecordModal(key) {
  const plan = currentPlan()[key];
  const record = currentMealRecords()[key];
  pendingMealPhoto = record?.photo || "";
  const labels = { breakfast: "早饭", lunch: "午饭", dinner: "晚饭", late: "宵夜" };
  const preview = pendingMealPhoto ? `<img class="photo-preview" id="mealPhotoPreview" src="${pendingMealPhoto}" alt="${labels[key]}成品照片">` : `<div class="photo-placeholder" id="mealPhotoPreview">选择照片后会显示在这里</div>`;
  const body = `<div class="photo-record-layout"><div><label class="photo-dropzone" for="mealPhotoInput">${preview}<span>拍照或选择成品照片</span><input id="mealPhotoInput" type="file" accept="image/*" capture="environment"></label></div><div class="photo-record-copy"><p class="eyebrow">${labels[key]} · ${escapeHtml(state.selected)}</p><h3>${escapeHtml(plan || record?.recipeName || "这顿饭")}</h3><p>${record ? `已记录于 ${escapeHtml(record.time || "")}` : "做完后留下这顿饭的照片，方便回看。"}</p><div class="field field-gap"><label>备注（选填）</label><textarea id="mealRecordNote" placeholder="例如：少盐，下次可以多煎一会儿">${escapeHtml(record?.note || "")}</textarea></div></div></div>`;
  openModal(modalFrame(record ? "查看 / 更新完成记录" : "完成这顿饭", body, "保存完成记录", "saveMealRecord", `data-key="${key}"`));
}

function openMealRecordView(key) {
  const record = currentMealRecords()[key];
  if (!record) return;
  pendingMealPhoto = record.photo || "";
  const labels = { breakfast: "早饭", lunch: "午饭", dinner: "晚饭", late: "宵夜" };
  openModal(`<div class="modal-head"><h3>${labels[key]}完成记录</h3><button class="close">×</button></div>${record.photo ? `<img class="record-view-photo" src="${record.photo}" alt="${labels[key]}成品照片">` : ""}<p class="record-view-meta">${escapeHtml(record.recipeName || "临时菜谱")} · ${escapeHtml(record.time || "")}</p>${record.note ? `<p class="record-view-note">${escapeHtml(record.note)}</p>` : ""}<div class="modal-foot"><button class="ghost close">关闭</button><button class="primary" data-edit-meal-record="${key}">更新记录</button></div>`);
}

function compressMealPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 960 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function openShoppingModal() {
  const body = `<div class="form-grid"><div class="field"><label>食材名称</label><input id="shopName" placeholder="例如：西兰花"></div><div class="field"><label>金额（元）</label><input id="shopPrice" type="number" value="8"></div><div class="field"><label>预计可用顿数</label><input id="shopMealsInput" type="number" step="0.5" value="2"></div><div class="field"><label>保质期（选填）</label><input id="shopExpiry" placeholder="例如：8月30日"></div></div>`;
  openModal(modalFrame("添加采购物品", body, "加入清单", "saveShopping"));
}

function openFinishPurchaseModal() {
  const bought = state.shopping.filter(item => item.bought);
  if (!bought.length) return;
  const total = bought.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const body = `<p>已勾选 ${bought.length} 项，合计 ¥${total.toFixed(2)}。完成后会统一加入库存。</p><div class="field field-gap"><label>实际采购日期</label><input id="finishPurchaseDate" type="date" value="${TODAY}"></div>`;
  openModal(modalFrame("完成采购", body, "确认入库", "saveFinishPurchase"));
}

function openRecipeEditor(index = null) {
  editingRecipeIndex = index;
  draftRecipe = index === null ? { name: "", cat: "家常菜", time: "", difficulty: "简单", tags: [], uses: 0, method: "炒", servings: 2, link: "", ingredients: [{ name: "", amount: "", unit: "克" }], steps: [{ ingredients: [], actions: [], duration: "", instruction: "" }] } : JSON.parse(JSON.stringify(state.recipes[index]));
  state.activeRecipe = index ?? 0;
  state.recipeMode = "edit";
  state.page = "recipe-detail";
  render();
}

function syncDraftFromEditor() {
  if (!draftRecipe || !document.getElementById("rwName")) return;
  draftRecipe.name = rwName.value.trim();
  draftRecipe.cat = rwCat.value;
  draftRecipe.method = rwMethod.value;
  draftRecipe.time = rwTime.value.trim();
  draftRecipe.difficulty = rwDiff.value;
  draftRecipe.servings = Number(rwServings.value) || 1;
  draftRecipe.tags = rwTags.value.split(/[,，]/).map(item => item.trim()).filter(Boolean);
  draftRecipe.link = rwLink.value.trim();
  const oldNames = draftRecipe.ingredients.map(item => item.name);
  const newIngredients = [...document.querySelectorAll("[data-ingredient-index]")].map(row => ({ name: row.querySelector('[data-part="name"]').value.trim(), amount: row.querySelector('[data-part="amount"]').value, unit: row.querySelector('[data-part="unit"]').value }));
  draftRecipe.steps = [...document.querySelectorAll("[data-step-index]")].map(card => ({
    ingredients: [...card.querySelectorAll("[data-step-ingredient]:checked")].map(input => input.value).map(name => { const position = oldNames.indexOf(name); return position >= 0 ? newIngredients[position]?.name || name : name; }),
    actions: [...card.querySelectorAll("[data-step-action]:checked")].map(input => input.value),
    duration: card.querySelector("[data-step-duration]").value,
    instruction: card.querySelector("[data-step-instruction]").value.trim()
  }));
  draftRecipe.ingredients = newIngredients;
}

function openAdjustModal(index = null) {
  const item = index === null ? null : state.inventory[index];
  const body = `<div class="form-grid"><div class="field"><label>食材名称</label><input id="aName" value="${item?.name || ""}" placeholder="例如：白菜" ${item ? "readonly" : ""}></div><div class="field"><label>调整方向</label><select id="aDirection"><option value="add">增加库存</option><option value="remove">减少库存</option></select></div><div class="field"><label>调整顿数</label><input id="aMeals" type="number" min="0.5" step="0.5" value="1"></div><div class="field"><label>日期</label><input id="aDate" type="date" value="${state.selected}"></div><div class="field"><label>归属餐次</label><select id="aMeal"><option>不归属具体餐次</option><option>早饭</option><option>午饭</option><option>晚饭</option><option>宵夜</option></select></div><div class="field full"><label>调整原因</label><select id="aReason"><option>手动消耗</option><option>实际用量与菜谱不同</option><option>盘点修正</option><option>补录采购</option><option>过期丢弃</option><option>变质丢弃</option><option>其他</option></select></div></div>`;
  openModal(modalFrame("调整库存", body, "保存调整", "saveAdjust", item ? `data-index="${index}"` : ""));
}

function openPurchaseEditModal(index) {
  const record = state.purchaseHistory[index];
  if (!record) return;
  const items = record.items.map((item, itemIndex) => `<div class="purchase-edit-row"><input data-purchase-name="${itemIndex}" value="${escapeHtml(item.name)}" readonly><input data-purchase-meals="${itemIndex}" type="number" min="0" step="0.5" value="${item.meals}"><input data-purchase-price="${itemIndex}" type="number" min="0" step="0.01" value="${item.price}"></div>`).join("");
  const body = `<div class="form-grid"><div class="field"><label>采购日期</label><input id="purchaseEditDate" type="date" value="${record.date}"></div><div class="field"><label>采购前库存种类</label><input id="purchaseEditBeforeKinds" type="number" min="0" value="${record.beforeKinds || 0}"></div><div class="field full"><label>采购明细（名称 / 顿数 / 金额）</label><div class="purchase-edit-head"><span>食材</span><span>顿数</span><span>金额</span></div><div class="purchase-edit-list">${items}</div></div></div>`;
  openModal(modalFrame("编辑采购记录", body, "保存修改", "savePurchaseEdit", `data-index="${index}"`));
}

function openStatsRangeModal() {
  const body = `<div class="form-grid"><div class="field"><label>开始日期</label><input id="statsStart" type="date" value="${state.statsStart || TODAY}"></div><div class="field"><label>结束日期</label><input id="statsEnd" type="date" value="${state.statsEnd || TODAY}"></div></div>`;
  openModal(modalFrame("自定义统计范围", body, "应用范围", "saveStatsRange"));
}

document.addEventListener("click", event => {
  const go = event.target.closest("[data-go]");
  if (go) { state.page = go.dataset.go; if (go.dataset.shoppingTarget) state.shoppingView = go.dataset.shoppingTarget; render(); return; }
  const date = event.target.closest("[data-date]");
  if (date) { state.selected = date.dataset.date; render(); return; }
  const meal = event.target.closest("[data-meal]");
  if (meal) { openMealModal(meal.dataset.meal); return; }
  const completeMeal = event.target.closest("[data-complete-meal]");
  if (completeMeal) { openMealRecordModal(completeMeal.dataset.completeMeal); return; }
  const viewMealRecord = event.target.closest("[data-view-meal-record]");
  if (viewMealRecord) { openMealRecordView(viewMealRecord.dataset.viewMealRecord); return; }
  const editMealRecord = event.target.closest("[data-edit-meal-record]");
  if (editMealRecord) { closeModal(); openMealRecordModal(editMealRecord.dataset.editMealRecord); return; }
  const frequent = event.target.closest("[data-frequent]");
  if (frequent) { state.shopping.push({ name: frequent.dataset.frequent, price: 8, meals: 2, bought: false }); render(); return; }
  const remove = event.target.closest("[data-remove]");
  if (remove) { state.shopping.splice(Number(remove.dataset.remove), 1); render(); return; }
  const mealMinus = event.target.closest("[data-meal-minus]");
  if (mealMinus) { const item = state.shopping[Number(mealMinus.dataset.mealMinus)]; item.meals = Math.max(1, Number(item.meals) - 1); render(); return; }
  const mealPlus = event.target.closest("[data-meal-plus]");
  if (mealPlus) { const item = state.shopping[Number(mealPlus.dataset.mealPlus)]; item.meals = Number(item.meals) + 1; render(); return; }
  const waste = event.target.closest("[data-waste]");
  if (waste) { openAdjustModal(Number(waste.dataset.waste)); return; }
  const use = event.target.closest("[data-use-recipe]");
  if (use) { openMealModal("dinner", state.recipes[Number(use.dataset.useRecipe)].name); return; }
  const viewRecipe = event.target.closest("[data-view-recipe]");
  if (viewRecipe) { state.activeRecipe = Number(viewRecipe.dataset.viewRecipe); state.recipeMode = "view"; state.page = "recipe-detail"; render(); return; }
  const editRecipe = event.target.closest("[data-edit-recipe]");
  if (editRecipe) { openRecipeEditor(Number(editRecipe.dataset.editRecipe)); return; }
  if (event.target.closest("[data-back-recipes]")) { state.page = "recipes"; state.recipeMode = "list"; render(); return; }
  if (event.target.closest("[data-cancel-recipe-editor]")) { state.page = editingRecipeIndex === null ? "recipes" : "recipe-detail"; state.recipeMode = editingRecipeIndex === null ? "list" : "view"; draftRecipe = null; render(); return; }
  if (event.target.closest("[data-add-ingredient]")) {
    syncDraftFromEditor();
    draftRecipe.ingredients.push({ name: "", amount: "", unit: "克" });
    render(); return;
  }
  const removeIngredient = event.target.closest("[data-remove-ingredient]");
  if (removeIngredient) { syncDraftFromEditor(); const removed = draftRecipe.ingredients.splice(Number(removeIngredient.dataset.removeIngredient), 1)[0]; draftRecipe.steps.forEach(step => { step.ingredients = step.ingredients.filter(name => name !== removed?.name); }); render(); return; }
  if (event.target.closest("[data-add-step]")) { syncDraftFromEditor(); draftRecipe.steps.push({ ingredients: [], actions: [], duration: "", instruction: "" }); render(); return; }
  const stepUp = event.target.closest("[data-step-up]");
  if (stepUp) { syncDraftFromEditor(); const index = Number(stepUp.dataset.stepUp); if (index > 0) [draftRecipe.steps[index - 1], draftRecipe.steps[index]] = [draftRecipe.steps[index], draftRecipe.steps[index - 1]]; render(); return; }
  const stepDown = event.target.closest("[data-step-down]");
  if (stepDown) { syncDraftFromEditor(); const index = Number(stepDown.dataset.stepDown); if (index < draftRecipe.steps.length - 1) [draftRecipe.steps[index + 1], draftRecipe.steps[index]] = [draftRecipe.steps[index], draftRecipe.steps[index + 1]]; render(); return; }
  const stepCopy = event.target.closest("[data-step-copy]");
  if (stepCopy) { syncDraftFromEditor(); const index = Number(stepCopy.dataset.stepCopy); draftRecipe.steps.splice(index + 1, 0, JSON.parse(JSON.stringify(draftRecipe.steps[index]))); render(); return; }
  const stepRemove = event.target.closest("[data-step-remove]");
  if (stepRemove) { syncDraftFromEditor(); if (draftRecipe.steps.length > 1) draftRecipe.steps.splice(Number(stepRemove.dataset.stepRemove), 1); render(); return; }
  const filter = event.target.closest("[data-filter]");
  if (filter) { state.recipeFilter = filter.dataset.filter; renderRecipes(); save(); return; }
  const shoppingTab = event.target.closest("[data-shopping-view]");
  if (shoppingTab) { state.shoppingView = shoppingTab.dataset.shoppingView; render(); return; }
  const togglePurchase = event.target.closest("[data-toggle-purchase]");
  if (togglePurchase) { const index = Number(togglePurchase.dataset.togglePurchase); state.openPurchaseHistory = state.openPurchaseHistory === index ? null : index; render(); return; }
  const editPurchase = event.target.closest("[data-edit-purchase]");
  if (editPurchase) { openPurchaseEditModal(Number(editPurchase.dataset.editPurchase)); return; }
  const statsRange = event.target.closest("[data-stats-range]");
  if (statsRange) { if (statsRange.dataset.statsRange === "custom") openStatsRangeModal(); else { state.statsRange = statsRange.dataset.statsRange; render(); } return; }
  if (event.target.closest(".close")) { closeModal(); return; }
  if (event.target.id === "expandDates") { state.expanded = !state.expanded; render(); }
  if (event.target.id === "exportData") {
    const blob = new Blob([JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `shixu-backup-${TODAY}.json`; link.click(); URL.revokeObjectURL(link.href); return;
  }
  if (event.target.id === "installPwa") {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(() => { deferredInstallPrompt = null; installPwa.hidden = true; });
    return;
  }
  if (event.target.id === "importData") { importFile.click(); return; }
  if (event.target.id === "customStatsRange") { openStatsRangeModal(); return; }
  if (event.target.id === "quickPlan") openMealModal("dinner");
  if (event.target.id === "addShopping") openShoppingModal();
  if (event.target.id === "addTemplate") {
    const template = [{ name: "鸡蛋", price: 12, meals: 5 }, { name: "番茄", price: 8, meals: 3 }, { name: "白菜", price: 5, meals: 2 }, { name: "土豆", price: 7, meals: 3 }, { name: "牛肉", price: 32, meals: 2 }];
    template.forEach(item => { if (!state.shopping.some(current => current.name === item.name)) state.shopping.push({ ...item, bought: false }); });
    render();
  }
  if (event.target.id === "finishPurchase") {
    openFinishPurchaseModal();
  }
  if (event.target.id === "saveFinishPurchase") {
    const bought = state.shopping.filter(item => item.bought);
    if (!bought.length) return;
    const beforeKinds = state.inventory.filter(item => item.meals > 0).length;
    bought.forEach(item => {
      const existing = state.inventory.find(stock => stock.name === item.name);
      if (existing) existing.meals += item.meals;
      else state.inventory.push({ name: item.name, meals: item.meals, expiry: item.expiry || "—", color: "" });
    });
    state.purchaseHistory.unshift({ date: finishPurchaseDate.value || TODAY, amount: bought.reduce((sum, item) => sum + item.price, 0), beforeKinds, items: bought.map(item => ({ name: item.name, meals: item.meals, price: item.price })) });
    state.shopping = state.shopping.filter(item => !item.bought);
    state.shoppingView = "history";
    closeModal();
    render();
  }
  if (event.target.id === "addRecipe") openRecipeEditor();
  if (event.target.id === "adjustInventory") openAdjustModal();

  if (event.target.id === "saveRecipeWorkspace") {
    syncDraftFromEditor();
    const seenIngredients = new Set();
    draftRecipe.ingredients = draftRecipe.ingredients.filter(item => {
      if (!item.name || seenIngredients.has(item.name)) return false;
      seenIngredients.add(item.name);
      return true;
    });
    draftRecipe.steps = draftRecipe.steps.filter(step => step.instruction || step.actions.length || step.ingredients.length);
    if (!draftRecipe.name || !draftRecipe.ingredients.length || !draftRecipe.steps.length) return;
    draftRecipe.steps.forEach(step => { step.ingredients = step.ingredients.filter(name => draftRecipe.ingredients.some(item => item.name === name)); });
    if (editingRecipeIndex === null) {
      state.recipes.unshift(normalizeRecipe(draftRecipe));
      state.activeRecipe = 0;
    } else {
      state.recipes[editingRecipeIndex] = normalizeRecipe(draftRecipe);
      state.activeRecipe = editingRecipeIndex;
    }
    state.recipeMode = "view";
    draftRecipe = null;
    render();
    return;
  }

  if (event.target.id === "saveMeal") {
    const key = event.target.dataset.key;
    const value = mealRecipe.value || mealTemp.value.trim();
    const delay = Number(mealMove.value || 0);
    const oldValue = currentPlan()[key];
    const source = { ...currentPlan(), [key]: delay ? null : value || null };
    state.plans[state.selected] = source;
    const completedRecord = state.mealRecords[state.selected]?.[key];
    if (oldValue !== value && completedRecord) {
      if (oldValue) adjustRecipeStock(oldValue, 1, state.selected, key);
      delete state.mealRecords[state.selected][key];
    }
    // Planning does not consume inventory; stock is consumed when the meal is marked complete.
    if (delay && value) {
      const target = selectedDate(); target.setDate(target.getDate() + delay);
      const targetKey = target.toISOString().slice(0, 10);
      state.plans[targetKey] = { ...(state.plans[targetKey] || { breakfast: null, lunch: null, dinner: null, late: null }), [key]: value };
    }
    const recipe = state.recipes.find(item => item.name === value);
    if (recipe) recipe.uses += 1;
    closeModal(); render();
  }
  if (event.target.id === "saveMealRecord") {
    const key = event.target.dataset.key;
    state.mealRecords[state.selected] ||= {};
    const previous = state.mealRecords[state.selected][key];
    state.mealRecords[state.selected][key] = { recipeName: currentPlan()[key], photo: pendingMealPhoto || "", note: mealRecordNote.value.trim(), time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) };
    if (!previous && currentPlan()[key]) adjustRecipeStock(currentPlan()[key], -1, state.selected, key);
    pendingMealPhoto = "";
    closeModal(); render();
  }
  if (event.target.id === "saveShopping") {
    const name = shopName.value.trim();
    if (!name) return;
    state.shopping.push({ name, price: Number(shopPrice.value) || 0, meals: Number(shopMealsInput.value) || 1, bought: false, expiry: shopExpiry.value.trim() });
    closeModal(); render();
  }
  if (event.target.id === "savePurchaseEdit") {
    const index = Number(event.target.dataset.index);
    const record = state.purchaseHistory[index];
    if (!record) return;
    const oldItems = record.items.map(item => ({ ...item }));
    record.date = purchaseEditDate.value;
    record.beforeKinds = Number(purchaseEditBeforeKinds.value) || 0;
    record.items = record.items.map((item, itemIndex) => ({ name: document.querySelector(`[data-purchase-name="${itemIndex}"]`).value.trim() || item.name, meals: Number(document.querySelector(`[data-purchase-meals="${itemIndex}"]`).value) || 0, price: Number(document.querySelector(`[data-purchase-price="${itemIndex}"]`).value) || 0 }));
    record.amount = record.items.reduce((sum, item) => sum + item.price, 0);
    oldItems.forEach(oldItem => { const next = record.items.find(item => item.name === oldItem.name); const current = state.inventory.find(item => item.name === oldItem.name); if (current && next) current.meals += next.meals - oldItem.meals; });
    closeModal(); render(); return;
  }
  if (event.target.id === "saveStatsRange") {
    if (!statsStart.value || !statsEnd.value || statsStart.value > statsEnd.value) return;
    state.statsRange = "custom"; state.statsStart = statsStart.value; state.statsEnd = statsEnd.value; closeModal(); render(); return;
  }
  if (event.target.id === "saveAdjust") {
    const index = event.target.dataset.index === undefined ? state.inventory.findIndex(item => item.name === aName.value.trim()) : Number(event.target.dataset.index);
    const name = aName.value.trim();
    if (!name) return;
    const amount = Number(aMeals.value) || 0;
    const delta = aDirection.value === "add" ? amount : -amount;
    if (index < 0) { if (delta < 0) return; state.inventory.push({ name, meals: delta, expiry: "—", color: "", lastReason: aReason.value }); }
    else { state.inventory[index].meals = Math.max(0, state.inventory[index].meals + delta); state.inventory[index].lastReason = aReason.value; }
    state.logs.push({ type: "adjust", name, amount: delta, reason: aReason.value, date: aDate.value, meal: aMeal.value });
    closeModal(); render();
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "mealPhotoInput") {
    const file = event.target.files?.[0];
    if (!file) return;
    compressMealPhoto(file).then(photo => {
      pendingMealPhoto = photo;
      const preview = document.getElementById("mealPhotoPreview");
      if (preview) preview.outerHTML = `<img class="photo-preview" id="mealPhotoPreview" src="${photo}" alt="成品照片">`;
    });
    return;
  }
  if (!event.target.matches("[data-buy]")) return;
  const item = state.shopping[Number(event.target.dataset.buy)];
  item.bought = event.target.checked;
  render();
});
document.addEventListener("focusout", event => {
  if (!event.target.matches('[data-ingredient-index] [data-part="name"]')) return;
  syncDraftFromEditor();
  render();
});
document.addEventListener("input", event => { if (event.target.id === "recipeSearch") renderRecipes(); });
document.addEventListener("change", event => {
  if (event.target.id !== "importFile") return;
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported || !Array.isArray(imported.recipes) || !Array.isArray(imported.inventory) || !Array.isArray(imported.purchaseHistory)) throw new Error("invalid backup");
      state = { ...imported, page: "home", selected: TODAY, schemaVersion: 4, logs: imported.logs || [], mealRecords: imported.mealRecords || {}, plans: imported.plans || {}, shopping: imported.shopping || [], statsRange: imported.statsRange || "week" };
      state.recipes = state.recipes.map(normalizeRecipe); state.purchaseHistory = state.purchaseHistory.map(normalizePurchaseRecord); save(); render();
    } catch { alert("备份文件格式不正确，无法导入。"); }
  };
  reader.readAsText(file, "utf-8");
});
modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });
render();
