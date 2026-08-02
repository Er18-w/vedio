const DIMENSIONS = [
  { key: "change", left: "稳定与秩序", right: "探索与变化" },
  { key: "soft", left: "直接表达", right: "柔和缓冲" },
  { key: "relation", left: "独立消化", right: "关系互动" },
  { key: "action", left: "保留积累", right: "转化行动" },
];

const MAP_BEACONS = {
  HOLD: [12.0, 27.6], LOL: [33.6, 27.2], IMOK: [54.2, 28.0], OKOK: [81.0, 28.3],
  SUGR: [15.0, 50.6], WHY: [37.6, 58.5], RETRY: [62.4, 48.9], YOLO: [89.9, 53.1],
  IDOL: [14.6, 75.7], HUGS: [43.2, 79.4], SOLO: [66.0, 80.0], LOAD: [87.5, 77.8],
};

const questions = [
  {
    scene: "计划突然被打乱",
    title: "你已经安排好的一天，临时多出一件急事。你更可能——",
    options: [
      { text: "先重排优先级，把能控制的部分稳住", v: [-2, -1, -1, 1] },
      { text: "顺势改路线，也许意外会带来新体验", v: [2, 0, 0, 1] },
      { text: "先问清楚相关人的情况，再一起调整", v: [-1, 1, 2, 0] },
      { text: "自己消化一下，等想清楚再开始动", v: [-1, 0, -2, -1] },
    ],
  },
  {
    scene: "面对未知",
    title: "去一个完全陌生的城市，你会怎样开始？",
    options: [
      { text: "先把路线、时间和备选方案做清楚", v: [-2, -1, -1, 0] },
      { text: "先去最想去的地方，剩下的现场决定", v: [2, 0, 0, 2] },
      { text: "找当地人聊聊，让真实反馈带路", v: [1, 1, 2, 1] },
      { text: "避开热门清单，按自己的兴趣慢慢逛", v: [1, -1, -2, -1] },
    ],
  },
  {
    scene: "表达不同意见",
    title: "会议上你不认同一个大家都在点头的方案。你会——",
    options: [
      { text: "直接指出问题，并给出可执行替代方案", v: [0, -2, -1, 2] },
      { text: "先肯定可取之处，再补充风险和建议", v: [-1, 2, 1, 1] },
      { text: "追问它成立的依据，直到逻辑说得通", v: [2, -2, -1, 1] },
      { text: "先记下来，会后整理好再单独沟通", v: [-1, 0, -2, -1] },
    ],
  },
  {
    scene: "说出拒绝",
    title: "朋友提出一个你不太方便答应的请求，你通常——",
    options: [
      { text: "说明做不到，也把边界讲清楚", v: [0, -2, -1, 0] },
      { text: "先照顾对方感受，再温和地说不", v: [-1, 2, 2, 0] },
      { text: "给一个自己能接受的折中做法", v: [-1, 1, 2, 1] },
      { text: "不立刻回答，留时间确认真实意愿", v: [-1, 0, -2, -1] },
    ],
  },
  {
    scene: "情绪低落的时候",
    title: "一件事让你很难受，你更需要哪种恢复方式？",
    options: [
      { text: "一个人待会儿，把感受慢慢理清", v: [-1, 0, -2, -2] },
      { text: "找可信的人聊聊，被理解会让我松动", v: [0, 2, 2, -1] },
      { text: "做点具体的事，把情绪变成下一步", v: [0, -1, -1, 2] },
      { text: "换个场景，给自己制造一点新鲜感", v: [2, 1, 0, 2] },
    ],
  },
  {
    scene: "做重要决定",
    title: "面对一个影响很久的选择，你最相信什么？",
    options: [
      { text: "充分信息、清楚标准和可控风险", v: [-2, -1, -1, 0] },
      { text: "自己的感受，即使不符合默认路线", v: [1, -1, -2, -1] },
      { text: "重要关系里的真实反馈", v: [-1, 1, 2, 0] },
      { text: "先小步试一次，再用结果修正判断", v: [2, -1, 0, 2] },
    ],
  },
  {
    scene: "一次不顺利的尝试",
    title: "投入很多却没有成功，你接下来更像——",
    options: [
      { text: "复盘变量，保留有效部分再试一次", v: [-1, -1, -1, 2] },
      { text: "先把这段经历收好，等它慢慢沉淀", v: [-1, 1, -2, -2] },
      { text: "换种讲法或做法，不让这次白白发生", v: [1, 1, 1, 2] },
      { text: "先确认规则是否合理，再决定要不要继续", v: [2, -2, -1, 1] },
    ],
  },
  {
    scene: "被别人误解",
    title: "有人把你理解成了另一个样子，你会怎样处理？",
    options: [
      { text: "马上澄清事实，不让误解继续扩散", v: [-1, -2, -1, 1] },
      { text: "等合适的时机，用对方听得懂的方式解释", v: [-1, 2, 2, 0] },
      { text: "不急着解释，重要的人以后自然会懂", v: [0, 0, -2, -2] },
      { text: "把这件事变成玩笑，先化解尴尬", v: [1, 2, 1, 2] },
    ],
  },
  {
    scene: "多人协作",
    title: "一个小组有很多不同意见，你自然会站到哪个位置？",
    options: [
      { text: "把目标和分工重新钉清楚", v: [-2, -2, 0, 1] },
      { text: "让每个人都说完，再找共同点", v: [-1, 2, 2, 0] },
      { text: "提出一条没人试过的新路径", v: [2, -1, 0, 2] },
      { text: "守住自己负责的部分，不卷入无效拉扯", v: [0, -1, -2, -1] },
    ],
  },
  {
    scene: "一个完全空白的周末",
    title: "没有人约你，也没有必须完成的事。你最想怎么过？",
    options: [
      { text: "按熟悉节奏休息，把生活收拾妥帖", v: [-2, 0, -1, -1] },
      { text: "临时出发，去追一个刚冒出来的念头", v: [2, 0, 0, 2] },
      { text: "约喜欢的人吃饭，把普通一天过成庆祝", v: [1, 2, 2, 1] },
      { text: "独处、阅读或做自己的小众爱好", v: [1, -1, -2, -1] },
    ],
  },
  {
    scene: "饮用偏好 · 不参与人格计分",
    title: "点咖啡时，你对奶制品的态度是——",
    preference: "milk",
    options: [
      { text: "接受，牛奶和奶盖都可以", value: "yes" },
      { text: "更喜欢植物奶", value: "plant" },
      { text: "不接受，希望完全无奶", value: "no" },
    ],
  },
  {
    scene: "饮用偏好 · 不参与人格计分",
    title: "如果只看今天的心情，你更想喝到——",
    preference: "taste",
    options: [
      { text: "浓醇、苦香、扎实的咖啡感", value: "rich" },
      { text: "清爽、果酸、明亮的香气", value: "bright" },
      { text: "都可以，交给今天的豆格", value: "either" },
    ],
  },
];

const beans = [
  {
    name: "稳豆", code: "HOLD", image: 1, drink: "美式咖啡", group: "经典意式", dairy: false, profile: "rich",
    target: [-1.8, -1.7, -1.0, 0.8], tagline: "先稳住局面，再处理情绪。",
    evidence: "无奶无糖、结构清晰、提神直接；坚果与焦糖风味，像你可靠而不绕弯的行动方式。",
    result: "你习惯先稳住局面。美式不靠额外修饰，像你一样把有效、清楚和可靠放在第一位。",
    flavor: "清晰直接的入口，带着坚果与焦糖般的可靠尾韵。", tags: ["坚果", "焦糖", "直接", "清晰"],
  },
  {
    name: "乐豆", code: "LOL", image: 2, drink: "玫瑰拿铁", group: "经典意式", dairy: true, profile: "rich",
    target: [0.8, 1.3, 1.1, 1.8], tagline: "会把生活的苦，重新翻译成花香。",
    evidence: "玫瑰花香把咖啡的苦感转译成柔和体验；不是否认苦，而是让苦拥有另一种表达。",
    result: "你不是没有遇到苦，只是总能替生活加一点花香，让糟糕现场不至于白白发生。",
    flavor: "咖啡底色之上浮出玫瑰香气，柔和但不抹掉真实。", tags: ["玫瑰", "柔和", "奶香", "转化"],
  },
  {
    name: "暖豆", code: "HUGS", image: 3, drink: "蜂蜜拿铁", group: "经典意式", dairy: true, profile: "rich",
    target: [-1.0, 1.8, 1.9, -0.2], tagline: "温柔不是变甜，是让难入口的也被接住。",
    evidence: "蜂蜜与牛奶柔和咖啡酸苦，甜感温润而不刺激，像你有分寸、能让人安心的照顾。",
    result: "你的温柔不是把一切变甜，而是让原本难入口的部分，也能被慢慢接住。",
    flavor: "温润蜂蜜与奶香包裹咖啡底色，甜而有分寸。", tags: ["蜂蜜", "温润", "奶香", "安心"],
  },
  {
    name: "战豆", code: "RETRY", image: 4, drink: "澳白（馥芮白）", group: "经典意式", dairy: true, profile: "rich",
    target: [-0.8, -1.0, -0.8, 1.9], tagline: "把无效信息删掉，然后再出发。",
    evidence: "双份浓缩、小杯量、少量牛奶，强调精准比例与核心风味，像复盘后留下真正有用的力量。",
    result: "你不靠声量证明自己。一次次调整比例，留下真正能推动下一轮的力量。",
    flavor: "浓缩感集中、奶量克制，入口短而有力。", tags: ["双份浓缩", "精准", "扎实", "再出发"],
  },
  {
    name: "硬豆", code: "IMOK", image: 5, drink: "Dirty 咖啡", group: "经典意式", dairy: true, profile: "rich",
    target: [-1.0, -1.7, -1.8, -1.7], tagline: "你的硬，更像一种保护。",
    evidence: "热浓缩与冰鲜奶形成冷热分层；第一口浓烈，随后柔软，和你外硬内软的结构高度一致。",
    result: "别人先碰到你的浓烈，熟悉以后才会喝到下面那层柔软。你的硬，更像一种保护。",
    flavor: "冷热分层，第一口浓烈，随后是完整而柔软的奶感。", tags: ["冷热分层", "浓烈", "柔软", "克制"],
  },
  {
    name: "圆豆", code: "OKOK", image: 6, drink: "拿铁咖啡", group: "经典意式", dairy: true, profile: "rich",
    target: [-1.5, 0.8, 1.8, 1.0], tagline: "让不同立场坐在同一张桌上。",
    evidence: "大量牛奶与浓缩充分融合，圆润、顺滑、接受度高；包容并不等于失去咖啡底色。",
    result: "你让不同立场有机会坐在同一张桌上，但温和从来不等于没有自己的味道。",
    flavor: "牛奶与浓缩充分融合，圆润顺滑，也保留咖啡底色。", tags: ["圆润", "顺滑", "融合", "边界"],
  },
  {
    name: "浪豆", code: "YOLO", image: 7, drink: "花魁手冲", group: "精品手冲", dairy: false, profile: "bright",
    target: [1.9, 0.3, 0.7, 1.5], tagline: "愿意把不可复制的当下活得鲜明。",
    evidence: "日晒花魁拥有奔放花香、草莓和热带水果感，香气开放、果汁感鲜明，像你愿意为心动行动。",
    result: "你在意一段经历是否值得记住。花魁的香气不会悄悄路过，它像你一样愿意把当下活得鲜明。",
    flavor: "奔放花香与草莓、热带水果感，像一段不会悄悄路过的经历。", tags: ["花香", "草莓", "热带水果", "果汁感"],
  },
  {
    name: "慢豆", code: "LOAD", image: 8, drink: "云南萨其姆手冲", group: "精品手冲", dairy: false, profile: "bright",
    target: [-1.7, 0.4, -1.5, -1.5], tagline: "加载得慢，却很少敷衍。",
    evidence: "山泉水洗带来干净通透的风味；柑橘、苹果、莓果到红糖回甘逐层展开，需要慢慢理解。",
    result: "你的信任加载得慢，却很少敷衍。像一杯干净手冲，越往后越能喝到稳定的回甘。",
    flavor: "柑橘、苹果与莓果逐层展开，最后落在稳定的红糖回甘。", tags: ["柑橘", "苹果", "莓果", "红糖回甘"],
  },
  {
    name: "爱豆", code: "IDOL", image: 9, drink: "哥伦比亚瑰夏手冲", group: "精品手冲", dairy: false, profile: "bright",
    target: [0.3, 1.0, -0.8, -0.8], tagline: "尊重自己，真正的香气才有机会出现。",
    evidence: "瑰夏以茉莉、橙花、蜜桃与佛手柑香气见长，细腻、标准高，也需要合适环境才能充分表达。",
    result: "你不是难以取悦，而是知道好的表达需要合适的环境。尊重自己，才让真正的香气有机会出现。",
    flavor: "细腻茉莉与橙花香，衔接蜜桃和佛手柑般的明亮感。", tags: ["茉莉", "橙花", "蜜桃", "佛手柑"],
  },
  {
    name: "反骨豆", code: "WHY", image: 10, drink: "酸角特调", group: "创意特调", dairy: false, profile: "bright",
    target: [1.8, -1.7, -0.7, 1.1], tagline: "不反对规则，只反对没有理由的规则。",
    evidence: "云南酸角以明亮果酸进入咖啡结构，用地域风味打破传统苦感，却仍保持酸、甜、苦之间的平衡。",
    result: "你反对的不是规则本身，而是没有理由的规则。酸角也不是为了猎奇，而是在旧结构里提出新的解法。",
    flavor: "明亮果酸切入咖啡结构，在酸、甜、苦之间找到新平衡。", tags: ["酸角", "果酸", "地域风味", "新解法"],
  },
  {
    name: "糖豆", code: "SUGR", image: 11, drink: "苹果奶盖", group: "创意特调", dairy: true, profile: "bright",
    target: [1.0, 1.7, 1.8, 1.7], tagline: "亲手给普通日子加一层庆祝。",
    evidence: "苹果清甜、咸甜奶盖与咖啡形成三层变化，轻松、丰富，又带着把快乐分享出去的冲动。",
    result: "你知道快乐不是自动出现的，所以愿意亲手加一层。苹果、奶盖和咖啡，也把普通一杯变成小型庆祝。",
    flavor: "苹果清甜、咸甜奶盖与咖啡三层展开，轻松又丰富。", tags: ["苹果", "咸甜奶盖", "三层口感", "庆祝"],
  },
  {
    name: "独豆", code: "SOLO", image: 12, drink: "紫苏芭乐迷迭香特调", group: "创意特调", dairy: false, profile: "bright",
    target: [1.7, -0.7, -1.9, -0.8], tagline: "不靠故意不同，也能保持自己的味道。",
    evidence: "芭乐、紫苏与迷迭香构成小众草本表达；元素复杂却自成体系，不以大众熟悉度作为成立条件。",
    result: "你不必通过故意不同来证明自己。只要内部逻辑成立，就有权保持自己的味道。",
    flavor: "芭乐果香连接紫苏与迷迭香，小众、复杂，却自成体系。", tags: ["芭乐", "紫苏", "迷迭香", "草本"],
  },
];

const state = {
  current: 0,
  answers: Array(questions.length).fill(null),
  profile: [0, 0, 0, 0],
  result: null,
  viewingResult: null,
  preferences: { milk: "yes", taste: "either" },
  isAdvancing: false,
  advanceTimer: null,
};

const els = {
  screens: document.querySelectorAll(".screen"),
  questionCount: document.querySelector("#question-count"),
  questionKind: document.querySelector("#question-kind"),
  progressBar: document.querySelector("#progress-bar"),
  questionWrap: document.querySelector("#question-wrap"),
  questionScene: document.querySelector("#question-scene"),
  questionTitle: document.querySelector("#question-title"),
  sceneStage: document.querySelector("#scene-stage"),
  stageCounter: document.querySelector("#stage-counter"),
  stageTitle: document.querySelector("#stage-title"),
  stageHint: document.querySelector("#stage-hint"),
  options: document.querySelector("#options"),
  prev: document.querySelector("#prev-question"),
  next: document.querySelector("#next-question"),
  homeHeroVideo: document.querySelector("#home-hero-video"),
  progressRunnerVideo: document.querySelector("#progress-runner-video"),
  progressRunnerCanvas: document.querySelector("#progress-runner-canvas"),
  modal: document.querySelector("#method-modal"),
  toast: document.querySelector("#toast"),
};

let progressRunnerFrame = 0;

function paintProgressRunner() {
  const video = els.progressRunnerVideo;
  const canvas = els.progressRunnerCanvas;
  if (!video || !canvas || document.body.dataset.screen !== "quiz-screen") return;

  if (video.readyState >= 2) {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 310, 40, 390, 500, 0, 0, canvas.width, canvas.height);
    const frame = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < frame.data.length; index += 4) {
      const light = Math.max(frame.data[index], frame.data[index + 1], frame.data[index + 2]);
      if (light < 12) frame.data[index + 3] = 0;
      else if (light < 32) frame.data[index + 3] = Math.round(((light - 12) / 20) * 255);
    }
    context.putImageData(frame, 0, 0);
  }
  progressRunnerFrame = requestAnimationFrame(paintProgressRunner);
}

function startProgressRunner() {
  cancelAnimationFrame(progressRunnerFrame);
  progressRunnerFrame = requestAnimationFrame(paintProgressRunner);
}

function showScreen(id, scroll = true) {
  els.screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  document.body.dataset.screen = id;
  if (els.homeHeroVideo) {
    if (id === "home-screen") {
      const playback = els.homeHeroVideo.play();
      if (playback?.catch) playback.catch(() => {});
    } else {
      els.homeHeroVideo.pause();
    }
  }
  if (els.progressRunnerVideo) {
    if (id === "quiz-screen") {
      const playback = els.progressRunnerVideo.play();
      if (playback?.catch) playback.catch(() => {});
      startProgressRunner();
    } else {
      cancelAnimationFrame(progressRunnerFrame);
      els.progressRunnerVideo.pause();
    }
  }
  if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
}

function buildGallery() {
  const gallery = document.querySelector("#bean-grid");
  if (!gallery) return;
  gallery.innerHTML = beans.map((bean) => `
    <article class="bean-card">
      <img src="assets/bean-${bean.image}.png" alt="${bean.name} ${bean.code} 形象" loading="lazy" />
      <div class="bean-card-info">
        <div><strong>${bean.name}</strong> <span>${bean.code}</span></div>
        <small>${bean.drink}</small>
      </div>
    </article>
  `).join("");
}

function startQuiz() {
  cancelAutoAdvance();
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.result = null;
  state.viewingResult = null;
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.current];
  const answer = state.answers[state.current];
  els.options.classList.remove("is-locked");
  els.questionCount.textContent = `${String(state.current + 1).padStart(2, "0")} / 12`;
  els.questionKind.textContent = question.preference ? "饮用偏好" : "人格情境";
  els.progressBar.style.width = `${((state.current + 1) / questions.length) * 100}%`;
  els.questionScene.textContent = question.scene;
  els.questionTitle.textContent = question.title;
  els.stageCounter.textContent = question.preference
    ? `TASTE ${String(state.current - 9).padStart(2, "0")}`
    : `SCENE ${String(state.current + 1).padStart(2, "0")}`;
  els.stageTitle.textContent = question.preference ? "最后，听听今天的味觉" : question.scene;
  els.stageHint.textContent = question.preference
    ? "口味只影响饮用提醒，不会改写你的豆格。"
    : "跟着第一反应，让豆格慢慢显形。";
  els.sceneStage.className = `quiz-side motion-${state.current % 5} ${question.preference ? "is-preference" : ""}`;
  els.options.innerHTML = question.options.map((option, index) => `
    <button class="option ${answer === index ? "is-selected" : ""}" type="button" data-option="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${option.text}</span>
      <span class="option-check" aria-hidden="true">✓</span>
    </button>
  `).join("");
  els.prev.disabled = state.current === 0;
  els.next.disabled = answer === null;
  els.next.textContent = state.current === questions.length - 1 ? "查看结果 →" : "下一题 →";

  els.questionWrap.classList.remove("is-changing");
  void els.questionWrap.offsetWidth;
  els.questionWrap.classList.add("is-changing");

  els.options.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.isAdvancing) return;
      state.answers[state.current] = Number(button.dataset.option);
      renderQuestion();
      scheduleAutoAdvance(state.current);
    });
  });
}

function cancelAutoAdvance() {
  if (state.advanceTimer) window.clearTimeout(state.advanceTimer);
  state.advanceTimer = null;
  state.isAdvancing = false;
  els.options?.classList.remove("is-locked");
}

function scheduleAutoAdvance(answeredQuestion) {
  state.isAdvancing = true;
  els.options.classList.add("is-locked");
  els.next.disabled = true;
  state.advanceTimer = window.setTimeout(() => {
    if (!state.isAdvancing || state.current !== answeredQuestion) return;
    state.advanceTimer = null;
    state.isAdvancing = false;
    if (state.current < questions.length - 1) {
      state.current += 1;
      renderQuestion();
    } else {
      calculateResult();
    }
  }, 420);
}

function normalizeScores(raw) {
  const maxPositive = [0, 0, 0, 0];
  const maxNegative = [0, 0, 0, 0];
  questions.slice(0, 10).forEach((question) => {
    for (let d = 0; d < 4; d += 1) {
      maxPositive[d] += Math.max(0, ...question.options.map((option) => option.v[d]));
      maxNegative[d] += Math.abs(Math.min(0, ...question.options.map((option) => option.v[d])));
    }
  });
  return raw.map((score, index) => {
    const bound = score >= 0 ? maxPositive[index] : maxNegative[index];
    return Math.max(-2, Math.min(2, (score / bound) * 2));
  });
}

function calculateResult() {
  const raw = [0, 0, 0, 0];
  questions.slice(0, 10).forEach((question, index) => {
    const choice = question.options[state.answers[index]];
    choice.v.forEach((value, dimension) => { raw[dimension] += value; });
  });
  state.profile = normalizeScores(raw);
  state.preferences.milk = questions[10].options[state.answers[10]].value;
  state.preferences.taste = questions[11].options[state.answers[11]].value;

  const profileNorm = Math.sqrt(state.profile.reduce((sum, value) => sum + value ** 2, 0)) || 1;
  const ranked = beans.map((bean) => {
    const targetNorm = Math.sqrt(bean.target.reduce((sum, value) => sum + value ** 2, 0)) || 1;
    const similarity = bean.target.reduce((sum, target, index) => {
      const weight = index === 2 ? 1.08 : 1;
      return sum + weight * state.profile[index] * target;
    }, 0) / (profileNorm * targetNorm);
    return { bean, similarity };
  }).sort((a, b) => b.similarity - a.similarity);

  state.result = ranked[0].bean;
  renderResult();
  showScreen("result-screen");
  updateShareUrl();
}

function renderResult() {
  const bean = state.result;
  state.viewingResult = bean;
  const index = beans.indexOf(bean) + 1;
  document.querySelector("#result-index").textContent = String(index).padStart(2, "0");
  document.querySelector("#mobile-result-index").textContent = String(index).padStart(2, "0");
  const image = document.querySelector("#result-image");
  image.src = `assets/bean-${bean.image}.png`;
  image.alt = `${bean.name} ${bean.code} 形象`;
  renderWorldRoster(bean);
  renderPosterResult(bean);
  renderInteractiveMap(bean);
  document.querySelector("#result-name").textContent = bean.name;
  document.querySelector("#result-code").textContent = bean.code;
  document.querySelector("#result-line").textContent = bean.tagline;
  document.querySelector("#result-drink").textContent = bean.drink;
  document.querySelector("#result-group").textContent = bean.group;
  document.querySelector("#result-evidence").textContent = bean.evidence;
  document.querySelector("#result-copy").textContent = bean.result;
  document.querySelector("#result-flavor").textContent = bean.flavor;
  document.querySelector("#flavor-tags").innerHTML = bean.tags.map((tag) => `<span>${tag}</span>`).join("");
  const preferenceNote = getPreferenceNote(bean);
  document.querySelector("#preference-copy").textContent = preferenceNote;
  document.querySelector("#mobile-preference-copy").textContent = preferenceNote;
  renderBeanRelations(bean);

  document.querySelector("#dimension-list").innerHTML = DIMENSIONS.map((dimension, index) => {
    const value = state.profile[index] ?? bean.target[index];
    const position = ((value + 2) / 4) * 100;
    return `
      <div class="dimension-row">
        <span>${dimension.left}</span>
        <div class="dimension-track" aria-label="${dimension.left}到${dimension.right}，位置${Math.round(position)}%">
          <i class="dimension-dot" style="left:${position}%"></i>
        </div>
        <span>${dimension.right}</span>
      </div>
    `;
  }).join("");
}

function renderPosterResult(bean) {
  const index = beans.indexOf(bean) + 1;
  document.querySelector("#result-index").textContent = String(index).padStart(2, "0");
  document.querySelector("#mobile-result-index").textContent = String(index).padStart(2, "0");

  const image = document.querySelector("#poster-result-image");
  image.src = `assets/bean-${bean.image}.png`;
  image.alt = `${bean.name} ${bean.code} 人格档案`;
  document.querySelector("#poster-result-name").textContent = bean.name;
  document.querySelector("#poster-result-code").textContent = bean.code;
  document.querySelector("#poster-result-line").textContent = bean.tagline;
  document.querySelector("#poster-result-drink").textContent = bean.drink;
  document.querySelector("#poster-result-group").textContent = bean.group;
  document.querySelector("#poster-result-detail").textContent = bean.result;
  document.querySelector("#poster-flavor-tags").innerHTML = bean.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");

  const mobileImage = document.querySelector("#mobile-result-image");
  mobileImage.src = `assets/bean-${bean.image}.png`;
  mobileImage.alt = `${bean.name} ${bean.code} 人格档案`;
  document.querySelector("#mobile-result-name").textContent = bean.name;
  document.querySelector("#mobile-result-code").textContent = bean.code;
  document.querySelector("#mobile-result-line").textContent = bean.tagline;
  document.querySelector("#mobile-result-drink").textContent = bean.drink;
  document.querySelector("#mobile-result-group").textContent = bean.group;
  document.querySelector("#mobile-flavor-tags").innerHTML = bean.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#mobile-result-flavor").textContent = bean.flavor;
  document.querySelector("#mobile-result-detail").textContent = bean.result;
  document.querySelector("#mobile-result-evidence").textContent = bean.evidence;
  const preferenceNote = getPreferenceNote(bean);
  document.querySelector("#preference-copy").textContent = preferenceNote;
  document.querySelector("#mobile-preference-copy").textContent = preferenceNote;
}

function renderInteractiveMap(activeBean) {
  const hotspotLayer = document.querySelector("#bean-map-hotspots");
  if (!hotspotLayer.children.length) {
    hotspotLayer.innerHTML = beans.map((bean) => {
      const [x, y] = MAP_BEACONS[bean.code];
      return `
        <button
          class="bean-map-hotspot"
          type="button"
          data-bean-code="${bean.code}"
          style="--bean-x:${x}%;--bean-y:${y}%"
          aria-label="查看${bean.name} ${bean.code}资料"
        >
          <em>你的结果</em>
          <span>${bean.name}</span>
        </button>
      `;
    }).join("");
  }

  const originalBean = state.result;
  state.viewingResult = activeBean;
  const [x, y] = MAP_BEACONS[activeBean.code];
  const map = document.querySelector("#interactive-bean-map");
  map.style.setProperty("--active-x", `${x}%`);
  map.style.setProperty("--active-y", `${y}%`);
  map.classList.toggle("is-browsing", activeBean.code !== originalBean.code);

  hotspotLayer.querySelectorAll(".bean-map-hotspot").forEach((button) => {
    const isActive = button.dataset.beanCode === activeBean.code;
    const isOriginal = button.dataset.beanCode === originalBean.code;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-original", isOriginal);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelector("#map-viewing-name").textContent = `${activeBean.name} · ${activeBean.code}`;
  document.querySelector("#map-original-name").textContent = `${originalBean.name} · ${originalBean.code}`;
  document.querySelector("#map-return-copy").textContent = activeBean.code === originalBean.code ? "当前" : "点此返回";
}

function browseBean(code) {
  const bean = beans.find((item) => item.code === code);
  if (!bean || !state.result) return;
  renderPosterResult(bean);
  renderBeanRelations(bean);
  renderInteractiveMap(bean);
}

function renderWorldRoster(currentBean) {
  const roster = beans.filter((bean) => bean.code !== currentBean.code);
  roster.splice(9, 0, currentBean);
  document.querySelector("#world-roster").innerHTML = roster.map((bean) => `
    <article class="world-bean ${bean.code === currentBean.code ? "is-current" : ""}">
      ${bean.code === currentBean.code ? "<span>本次揭示</span>" : ""}
      <img src="assets/bean-${bean.image}.png" alt="${bean.name} ${bean.code}" />
    </article>
  `).join("");
}

function renderBeanRelations(bean) {
  const ranked = beans
    .filter((candidate) => candidate.code !== bean.code)
    .map((candidate) => ({
      bean: candidate,
      distance: candidate.target.reduce(
        (sum, value, index) => sum + ((value - bean.target[index]) ** 2),
        0,
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  const cardMarkup = ({ bean: related }) => `
    <article class="relation-bean">
      <img src="assets/bean-${related.image}.png" alt="${related.name} ${related.code}" />
      <strong>${related.name}</strong>
      <small>${related.code}</small>
    </article>
  `;

  const adjacent = ranked.slice(0, 4);
  const opposite = ranked.slice(-4).reverse();
  document.querySelector("#adjacent-beans").innerHTML = adjacent.map(cardMarkup).join("");
  document.querySelector("#opposite-beans").innerHTML = opposite.map(cardMarkup).join("");

  const posterMarkup = ({ bean: related }) => `
    <span><img src="assets/bean-${related.image}.png" alt="${related.name} ${related.code}" /></span>
  `;
  document.querySelector("#poster-adjacent-beans").innerHTML = adjacent.map(posterMarkup).join("");
  document.querySelector("#poster-opposite-beans").innerHTML = opposite.map(posterMarkup).join("");
  document.querySelector("#mobile-adjacent-beans").innerHTML = adjacent.map(posterMarkup).join("");
  document.querySelector("#mobile-opposite-beans").innerHTML = opposite.map(posterMarkup).join("");
}

function getPreferenceNote(bean) {
  const notes = [];
  if (bean.dairy && state.preferences.milk === "plant") {
    notes.push(`你的豆格结果不变；点单时可询问是否能将${bean.drink}替换为植物奶，风味结构会更轻盈。`);
  } else if (bean.dairy && state.preferences.milk === "no") {
    notes.push(`你的豆格结果不变；这杯含奶，点单前请确认是否有无乳版本。若希望完全无奶，可把同样强调人格镜像的手冲或美式作为当日备选。`);
  } else if (!bean.dairy && state.preferences.milk === "yes") {
    notes.push("这杯本身不依赖奶制品，能更清楚地呈现咖啡与配料的原始结构。");
  }

  if (state.preferences.taste !== "either" && state.preferences.taste !== bean.profile) {
    const wanted = state.preferences.taste === "rich" ? "浓醇苦香" : "清爽果酸";
    notes.push(`你今天更偏好${wanted}，可能与这杯的主表达不同；可以先向咖啡师确认风味或杯量，再决定是否尝试。`);
  }

  if (!notes.length) {
    notes.push("你的饮用偏好与这杯的主要结构较为接近。真实风味会受温度、批次与制作方式影响，点单时仍可向咖啡师确认。 ");
  }
  return notes.join("");
}

function updateShareUrl() {
  if (!state.result || location.protocol === "file:") return;
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("result", state.result.code);
  url.searchParams.set("milk", state.preferences.milk);
  url.searchParams.set("taste", state.preferences.taste);
  history.replaceState({}, "", url);
}

function restoreSharedResult() {
  const params = new URLSearchParams(location.search);
  const code = params.get("result");
  const bean = beans.find((item) => item.code === code);
  if (!bean) return false;
  state.result = bean;
  state.profile = [...bean.target];
  state.preferences.milk = params.get("milk") || "yes";
  state.preferences.taste = params.get("taste") || "either";
  renderResult();
  showScreen("result-screen", false);
  return true;
}

function showToast(text) {
  els.toast.textContent = text;
  els.toast.classList.add("is-visible");
  window.setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

async function copyResult() {
  if (!state.result) return;
  const bean = state.result;
  const shareUrl = location.protocol === "file:" ? "" : `\n${location.href}`;
  const text = `我的 CBTI 豆格是「${bean.name} · ${bean.code}」\n杯中化身：${bean.drink}\n${bean.result}${shareUrl}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("结果已复制，去分享你的豆格吧");
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast("结果已复制");
  }
}

document.addEventListener("click", (event) => {
  const beanCode = event.target.closest("[data-bean-code]")?.dataset.beanCode;
  if (beanCode) {
    browseBean(beanCode);
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "home") {
    cancelAutoAdvance();
    showScreen("home-screen");
    if (location.protocol !== "file:") history.replaceState({}, "", location.pathname);
  }
  if (action === "start" || action === "restart") startQuiz();
  if (action === "browse") document.querySelector("#beans-gallery")?.scrollIntoView({ behavior: "smooth" });
  if (action === "method") {
    els.modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  if (action === "close-modal") {
    els.modal.hidden = true;
    document.body.style.overflow = "";
  }
  if (action === "copy") copyResult();
  if (action === "original-result" && state.result) browseBean(state.result.code);
  if (action === "toggle-audio" && els.homeHeroVideo) {
    els.homeHeroVideo.muted = !els.homeHeroVideo.muted;
    const button = event.target.closest("[data-action='toggle-audio']");
    button.classList.toggle("is-on", !els.homeHeroVideo.muted);
    button.setAttribute("aria-pressed", String(!els.homeHeroVideo.muted));
    document.querySelector("#audio-toggle-label").textContent = els.homeHeroVideo.muted ? "开启声音" : "关闭声音";
    const playback = els.homeHeroVideo.play();
    if (playback?.catch) playback.catch(() => {});
  }
});

els.prev.addEventListener("click", () => {
  if (state.isAdvancing) return;
  if (state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
});

els.next.addEventListener("click", () => {
  if (state.isAdvancing) return;
  if (state.answers[state.current] === null) return;
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
  } else {
    calculateResult();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.modal.hidden) {
    els.modal.hidden = true;
    document.body.style.overflow = "";
  }
});

buildGallery();
if (!restoreSharedResult()) showScreen("home-screen", false);
