"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ClickSpark from "./components/ClickSpark";

type BeanCode =
  | "HOLD"
  | "LOL"
  | "OKOK"
  | "WHY"
  | "LOAD"
  | "IMOK"
  | "IDOL"
  | "YOLO"
  | "HUGS"
  | "SUGR"
  | "RETRY"
  | "SOLO";

type Option = {
  text: string;
  scores: Partial<Record<BeanCode, number>>;
};

type Question = {
  scene: string;
  options: Option[];
};

const families: BeanCode[][] = [
  ["HOLD", "RETRY"],
  ["LOL", "SUGR"],
  ["OKOK", "HUGS"],
  ["WHY", "SOLO"],
  ["LOAD", "IMOK"],
  ["IDOL", "YOLO"],
];

const profiles: Record<
  BeanCode,
  {
    name: string;
    archetype: string;
    title: string;
    verdict: string;
    intro: string;
    visible: string;
    hidden: string;
    strengths: string[];
    risks: string[];
    quote: string;
    coffee: string;
    drink: string;
    color: string;
  }
> = {
  HOLD: {
    name: "稳豆",
    archetype: "水洗卡蒂姆",
    title: "人形应急预案",
    verdict: "先稳住局面，再处理情绪。",
    intro:
      "工作出问题，别人先说“完了”，你先建群、拉表、分工。你活得像一份应急预案：平时没人想看，真出事时所有人都在找你。",
    visible: "冷静、能扛，遇事自动进入处理模式。",
    hidden: "不是没有情绪，而是习惯先保证所有人安全，再允许自己有感觉。",
    strengths: ["把混乱变成步骤", "危机中保持行动力", "承诺感强"],
    risks: ["长期替别人兜底", "把求助误认为能力不足", "事后才发现自己也受伤"],
    quote: "事情可以乱，但不能乱到最后还得我返工。",
    coffee: "干净、平衡、轮廓清楚，像柑橘、坚果、可可或焦糖。",
    drink: "清晰的手冲或美式",
    color: "#51745b",
  },
  LOL: {
    name: "乐豆",
    archetype: "日晒卡蒂姆",
    title: "灾难二次加工厂",
    verdict: "把挫折加工成笑料，恢复速度快。",
    intro:
      "你不是传统意义上的正能量，只是很会在已经发生的破事里，顺手翻出一点能用的东西。别人摔倒立刻爬起来，你可能先趴着看看附近有没有掉钱。",
    visible: "好笑、随和、恢复得快，能把尴尬救回来。",
    hidden: "并非没受过打击，只是不愿让打击长期占用内存。",
    strengths: ["情绪复原速度快", "给糟糕现场找到出口", "自带气氛缓冲层"],
    risks: ["用玩笑跳过难过", "被误以为什么都不在乎", "重要问题也容易先放着"],
    quote: "来都来了，别让这场灾难完全白来。",
    coffee: "成熟果香、果干、莓果或发酵甜感，口感饱满。",
    drink: "日晒感明显的手冲或冷萃",
    color: "#e19b45",
  },
  OKOK: {
    name: "圆豆",
    archetype: "蜜处理卡蒂姆",
    title: "人际关系缓冲垫",
    verdict: "会协调关系，也会给自己留边界。",
    intro:
      "你会给别人台阶，也会给自己留后路。别人觉得你好说话，是因为你拒绝人时不会把门拍到对方脸上。",
    visible: "圆融、会说话、能看见多方立场。",
    hidden: "温和有权限系统；一旦真正失望，对方会被安静地永久下线。",
    strengths: ["化解冲突", "既懂情绪也懂现实", "拒绝时仍留体面"],
    risks: ["解释太多消耗自己", "圆融被误判为没底线", "不满积累到突然断联"],
    quote: "可以都理解，但不代表最后都得听。",
    coffee: "焦糖、蜂蜜、果干和圆润甜感，清晰与饱满居中。",
    drink: "甜感清楚的手冲或温和奶咖",
    color: "#c9896b",
  },
  WHY: {
    name: "反骨豆",
    archetype: "厌氧日晒卡蒂姆",
    title: "系统漏洞侦察员",
    verdict: "不盲从规则，习惯追问为什么。",
    intro:
      "你不是为了反对而反对。你真正受不了的是那些自己也说不清为何存在，却要求所有人感恩遵守的规则。",
    visible: "会追问、敢质疑、对荒谬的东西过敏。",
    hidden: "反骨并不轻松；你常在别人已经接受时，独自承担看见问题的疲惫。",
    strengths: ["发现规则漏洞", "压力中长出新方案", "不被集体情绪带走"],
    risks: ["把事情升级成原则问题", "方案被反对声盖住", "脑内长期高压运算"],
    quote: "我可以先照做，但你最好祈祷我没发现更好的办法。",
    coffee: "热带水果、酒香、香料或更强烈的发酵感。",
    drink: "小杯量直接品鉴",
    color: "#674f7a",
  },
  LOAD: {
    name: "慢豆",
    archetype: "水洗铁皮卡",
    title: "信任加载器",
    verdict: "先观察、确认可靠，再真正投入。",
    intro:
      "刚认识你的人可能觉得你没什么意思；熟悉以后才发现，你只是不向游客开放全部景区。你的信任很贵、加载很慢。",
    visible: "安静、谨慎、慢热，进入关系前会观察。",
    hidden: "有很深的情绪和忠诚，只是不愿交给未经验证的人。",
    strengths: ["判断关系持续性", "认真而不轻易承诺", "稳定、耐心、重质量"],
    risks: ["观察期长到错过机会", "对方不知道如何靠近", "谨慎变成预设失望"],
    quote: "我不是不想熟，我只是想确认熟了以后不会后悔。",
    coffee: "干净、细致，带柑橘、白花、茶感与轻柔甜感。",
    drink: "安静喝的浅烘手冲",
    color: "#6d8490",
  },
  IMOK: {
    name: "硬豆",
    archetype: "日晒铁皮卡",
    title: "情绪加密文件",
    verdict: "感受很深，但通常不会立刻表达。",
    intro:
      "你最擅长把“我非常在意”翻译成“随便”。感动了说还行，委屈了说没事；嘴上说早忘了，心里还保存着高清聊天记录。",
    visible: "淡定、克制、不愿先暴露认真。",
    hidden: "情绪很完整，记忆很高清，只是访问权限极高。",
    strengths: ["感受细腻、记得细节", "不轻易把情绪甩给别人", "认真通常很长情"],
    risks: ["让别人靠猜理解你", "把需要说成不需要", "旧情绪内部反复发酵"],
    quote: "我可以先认真，但绝不能先被发现。",
    coffee: "果干、核果、成熟甜感与饱满口感。",
    drink: "温度逐渐下降的慢饮",
    color: "#556171",
  },
  IDOL: {
    name: "爱豆",
    archetype: "水洗瑰夏",
    title: "自我价值长期供应商",
    verdict: "重视自我价值、舒适和个人边界。",
    intro:
      "没有工资、成长和意义，只是单纯想看你受罪的苦，你一般建议对方自己留着品尝。你不愿把自己用得特别潦草。",
    visible: "重视体验、边界和自我感受，不随便委屈自己。",
    hidden: "并非从没怀疑自己，而是怀疑完以后依然决定站在自己这边。",
    strengths: ["识别长期消耗", "尊重自己的感受与审美", "建立清楚的生活标准"],
    risks: ["把保护变成拒绝不舒服", "标准过高难以开始", "被误读为只在意自己"],
    quote: "别人爱不爱我不稳定，我这里必须保持长期供应。",
    coffee: "茉莉、柑橘、佛手柑、茶感与清晰酸质。",
    drink: "高香气、清晰度好的浅烘手冲",
    color: "#c88096",
  },
  YOLO: {
    name: "浪豆",
    archetype: "日晒瑰夏",
    title: "瞬间收藏家",
    verdict: "看重体验、记忆和当下的心动。",
    intro:
      "别人做选择先问值不值，你先问会不会记得。你偶尔冲动、偶尔上头，但多年以后，你的人生不会只剩一排完成事项。",
    visible: "重感觉、重体验、愿意为瞬间行动。",
    hidden: "不是不懂现实，只是不愿让现实垄断全部表决权。",
    strengths: ["感知细节和氛围", "留下值得记住的经历", "让生活逃出任务表"],
    risks: ["冲动消费或改计划", "热情退潮后收拾残局", "长期问题交给未来"],
    quote: "钱可以再赚，今天的晚霞不负责补拍。",
    coffee: "浓郁花香、莓果、热带水果和果汁感。",
    drink: "香气开放的手冲或冰手冲",
    color: "#df755e",
  },
  HUGS: {
    name: "暖豆",
    archetype: "水洗波旁",
    title: "有密码的地暖",
    verdict: "会体察他人的状态，也重视关系质量。",
    intro:
      "朋友说“我没事”，别人听见的是没事，你听见的是：他今天这个没事，和平时的没事音调不一样。",
    visible: "体贴、敏锐、能记住别人容易被忽略的需求。",
    hidden: "也很想被准确看见，只是常把自己的需要放在最后一格。",
    strengths: ["高质量共情", "关系中有持续行动", "创造安全与被照顾感"],
    risks: ["过度负责别人的情绪", "体贴变成自我审查", "不容易提出需要"],
    quote: "我愿意理解你，但你最好不要利用我的理解。",
    coffee: "柑橘、红糖、可可与圆润甜感，温和而有结构。",
    drink: "温暖平衡的手冲或舒服奶咖",
    color: "#b77d59",
  },
  SUGR: {
    name: "糖豆",
    archetype: "日晒黄波旁",
    title: "快乐扩音器",
    verdict: "喜欢分享快乐，把普通事情变得有意思。",
    intro:
      "一发现好东西，你恨不得在小区门口设推广摊位。你不是没有烦恼，只是不允许烦恼在生活里吃全天自助。",
    visible: "好分享、有感染力、会主动制造小快乐。",
    hidden: "知道苦的存在，所以更不愿错过已经出现的甜。",
    strengths: ["放大积极体验", "让关系有庆祝感", "把普通日子过出节目"],
    risks: ["用热闹盖住疲惫", "替别人决定该开心", "即时快乐忽略后续成本"],
    quote: "今天不一定顺利，但不能一点甜头都不给我。",
    coffee: "黄色水果、蜂蜜、焦糖与成熟甜感。",
    drink: "甜感突出的手冲或冰咖啡",
    color: "#e4a63c",
  },
  RETRY: {
    name: "战豆",
    archetype: "水洗巴天 Batian",
    title: "失败回放分析师",
    verdict: "失败后会复盘、升级，再来一轮。",
    intro:
      "项目失败，别人说算了，你打开《关于本次失败及下次如何让它闭嘴的复盘报告》。别人以为你退出，你睡一觉又回来了。",
    visible: "目标感强、爱复盘，对进步和强者有兴趣。",
    hidden: "对失败敏感，正因为你真的相信自己还能更好。",
    strengths: ["把失败转成经验", "恢复后重新投入", "目标明确、成长快"],
    risks: ["爱好都做成升级任务", "很难允许自己休息", "对自己和队友容错不足"],
    quote: "可以暂时打不过，但不能连技能说明都不看。",
    coffee: "明亮柑橘、红色水果、干净甜感和清楚结构。",
    drink: "清晰明亮的手冲",
    color: "#a94f3f",
  },
  SOLO: {
    name: "独豆",
    archetype: "德热296 × K72多段水洗",
    title: "默认设置拒绝者",
    verdict: "不依赖默认答案，习惯运行自己的系统。",
    intro:
      "别人说“正常人都会这样”，你会认真思考：正常人是谁？那套自定义系统在你身上运行良好，只要没影响别人，你懒得申请外部审批。",
    visible: "独立、小众、自定义生活方式。",
    hidden: "不需要证明自己特殊，只是很怕被默认答案覆盖。",
    strengths: ["不被潮流定义", "建立适合自己的系统", "持续辨认真实自我"],
    risks: ["把不合群理解成清醒", "解释成本高就不解释", "为独立拒绝有用建议"],
    quote: "我不必证明自己特殊，但我必须像我自己。",
    coffee: "白花、柑橘、葡萄柚、甘蔗甜与茶感。",
    drink: "细致的浅烘手冲",
    color: "#4d7476",
  },
};

const maxScore: Record<BeanCode, number> = {
  HOLD: 23,
  LOL: 23,
  OKOK: 17,
  WHY: 21,
  LOAD: 22,
  IMOK: 23,
  IDOL: 21,
  YOLO: 22,
  HUGS: 17,
  SUGR: 22,
  RETRY: 21,
  SOLO: 17,
};

const s = (main: BeanCode, neighbor: BeanCode, points = 3): Option["scores"] => ({
  [main]: points,
  [neighbor]: 1,
});

const questions: Question[] = [
  {
    scene:
      "你在一家卖洗脚桶的公司上班。营销部提议找柳智敏做代言人，印在洗脚桶上，领导和同事都觉得特别好。你会：",
    options: [
      { text: "跟着同意，并建议洗脚桶优先推出柳智敏应援色。", scores: s("SUGR", "LOL") },
      { text: "反对；你觉得迪迦奥特曼更合适，红光还能理疗。", scores: s("WHY", "SOLO") },
      { text: "关我屁事，钱到位印我都行。", scores: s("HOLD", "RETRY") },
    ],
  },
  {
    scene: "朋友说搬家“只有一个行李箱”。你到楼下一看，发现整整一货车的行李。你会：",
    options: [
      { text: "认命了，来都来了。", scores: s("HUGS", "OKOK") },
      { text: "只搬一个行李箱，剩下让TA自己搬。", scores: s("IDOL", "YOLO") },
      { text: "当场帮TA下单搬家公司，费用让TA报销。", scores: s("HOLD", "RETRY") },
      { text: "指着TA：从今往后，你不再是我的兄弟。", scores: s("SOLO", "WHY") },
    ],
  },
  {
    scene: "负责人当众说：“这件事没有你根本不行。”你会：",
    options: [
      { text: "说“哪有”，偷偷回味一整天。", scores: s("IMOK", "LOAD") },
      { text: "大方点头：“算你有眼光。”", scores: s("IDOL", "YOLO") },
      { text: "立刻发进家族群，接受全家表扬。", scores: s("SUGR", "LOL") },
    ],
  },
  {
    scene: "去旅行的火车突然停运，酒店还不能退。你会：",
    options: [
      { text: "立刻查大巴、飞机和租车，今天必须到。", scores: s("HOLD", "RETRY") },
      { text: "随便换个城市，反正行李都带了。", scores: s("YOLO", "IDOL") },
      { text: "原地回家睡觉，把酒店当慈善捐款。", scores: s("LOAD", "IMOK") },
    ],
  },
  {
    scene: "你突然多出5000元可以自由支配的钱。你会：",
    options: [
      { text: "立刻、马上、迅速去买一直想要却没闲钱买的东西。", scores: s("YOLO", "IDOL") },
      { text: "寻找这笔钱是谁给的，如果还不了，就这么算了。", scores: s("WHY", "SOLO") },
      { text: "全部存起来，担心被别人找回来。", scores: s("LOAD", "IMOK") },
    ],
  },
  {
    scene: "密室逃脱卡了半小时，门上写着“禁止暴力”，队友已经抬脚准备踹门。你会：",
    options: [
      { text: "拦住TA，规则不能因为急了就消失。", scores: s("HOLD", "RETRY") },
      { text: "帮TA数“三、二、一”，先出去再说。", scores: s("WHY", "SOLO") },
      { text: "按呼叫器问工作人员：“踹坏了能开发票吗？”", scores: s("LOL", "SUGR") },
      { text: "我压根不玩密室。花钱把自己关起来，傻子才会这样做。", scores: s("SOLO", "WHY", 2) },
    ],
  },
  {
    scene: "朋友在你出门后放鸽子，理由是“仓鼠今天过生日”。你会：",
    options: [
      { text: "欣然接受，并祝TA的仓鼠生日快乐。", scores: s("HUGS", "OKOK") },
      { text: "嘴上回“没事”，但一整晚都在想：我竟然没有一只仓鼠重要。", scores: s("IMOK", "LOAD") },
      { text: "告诉TA：从今往后，你不再是我的兄弟。", scores: s("SOLO", "WHY") },
    ],
  },
  {
    scene: "你给喜欢的人发了一大段话，八小时后只收到“哈哈”。你会：",
    options: [
      { text: "回表情包，说自己在玩真心话大冒险哈哈哈哈……（呜呜呜）", scores: s("LOL", "SUGR") },
      { text: "打直球问：“你是没看懂，还是不想回？”", scores: s("OKOK", "HUGS") },
      { text: "再发三段，帮助对方理解全文。", scores: s("HUGS", "OKOK") },
      { text: "开玩笑，我怎么可能去给别人表白呢？", scores: s("IMOK", "LOAD", 2) },
    ],
  },
  {
    scene: "你负责的重要事情在截止前十分钟突然崩了，群里所有人都在发“怎么办”。你会：",
    options: [
      { text: "立刻分工，让大家先闭嘴再干活。", scores: s("HOLD", "RETRY") },
      { text: "先观察三十秒，再询问谁有解决方案。", scores: s("OKOK", "HUGS") },
      { text: "告诉大家：就这样吧，让项目什么的都去死吧。", scores: s("IDOL", "YOLO") },
    ],
  },
  {
    scene: "明天没有任何安排。你会：",
    options: [
      { text: "睡到自然醒，醒了继续躺。", scores: s("IDOL", "YOLO") },
      { text: "坐上随机一班车，去哪算哪。", scores: s("YOLO", "IDOL") },
      { text: "把拖了半年的计划一天做完。", scores: s("RETRY", "HOLD") },
    ],
  },
  {
    scene: "一家网红咖啡馆要排三小时，门口的人都说“不喝会后悔”。你会：",
    options: [
      { text: "排，三小时都来了，必须喝出人生意义。", scores: s("YOLO", "IDOL") },
      { text: "去旁边那家人少的店。", scores: s("SOLO", "WHY") },
      { text: "买瓶矿泉水，坐旁边看TA们后悔。", scores: s("WHY", "SOLO") },
      { text: "我不喜欢去网红店，更不会为了咖啡等3个小时。", scores: s("IDOL", "YOLO", 2) },
    ],
  },
  {
    scene: "朋友向你借一万元开奶茶店，并说将会拳打蜜雪冰城，脚踢茶百道。你会：",
    options: [
      { text: "直接转账，朋友的梦想必须支持。", scores: s("HUGS", "OKOK") },
      { text: "理性劝告生意不好做，但会出一笔钱帮助TA。", scores: s("OKOK", "HUGS") },
      { text: "让TA别做梦，先去捣一个月的奶茶。", scores: s("WHY", "SOLO") },
    ],
  },
  {
    scene: "有人说你认真做的东西“像小学生连夜赶的”。你会：",
    options: [
      { text: "当场不说，洗澡时再赢得辩论。", scores: s("IMOK", "LOAD") },
      { text: "问TA具体哪里像，自己修改。", scores: s("RETRY", "HOLD") },
      { text: "回TA：“反弹。”", scores: s("LOL", "SUGR") },
    ],
  },
  {
    scene: "你拼了两小时的乐高城堡，被猫一脚踹成废墟。你会：",
    options: [
      { text: "按说明书重拼，今天必须恢复原样。", scores: s("RETRY", "HOLD") },
      { text: "把猫和废墟拍照发朋友圈：捣蛋猫只会捣乱。", scores: s("SUGR", "LOL") },
      { text: "把零件扫进盒里，宣布该项目永久烂尾。", scores: s("LOAD", "IMOK") },
      { text: "我喜欢狗，不喜欢猫，所以不会出现这种情况。", scores: s("SOLO", "WHY", 2) },
    ],
  },
  {
    scene: "商场主持人喊：“上台表演一个完全不会的才艺，送一年免费咖啡。”你会：",
    options: [
      { text: "立刻上台，才艺不会，气势先会。", scores: s("YOLO", "IDOL") },
      { text: "先问规则，借三分钟现场练；要丢脸也得比上次强。", scores: s("RETRY", "HOLD") },
      { text: "拉朋友一起上，尴尬必须AA。", scores: s("SUGR", "LOL") },
      { text: "看到主持人举话筒就绕路，这种事轮不到我。", scores: s("LOAD", "IMOK", 2) },
    ],
  },
  {
    scene: "组织规定迟到一分钟就要朗读检讨。负责人迟到半小时，却说“路上堵”。你会：",
    options: [
      { text: "递上检讨书模板，并提醒TA不要有错别字。", scores: s("WHY", "SOLO") },
      { text: "当没看见，毕竟TA是负责人。", scores: s("LOAD", "IMOK") },
      { text: "小声说：堵你大ba。", scores: s("LOL", "SUGR") },
    ],
  },
  {
    scene: "两个朋友吵架，同时问你“你到底站谁”。你会：",
    options: [
      { text: "分别安慰，努力把两个人重新拼回去。", scores: s("OKOK", "HUGS") },
      { text: "站和自己更熟的那个，友情也有会员等级。", scores: s("HUGS", "OKOK") },
      { text: "同时退出两个聊天框，让TA们自行决断。", scores: s("IDOL", "YOLO") },
      { text: "我的朋友之间一般互不认识，不会出现这种情况。", scores: s("LOAD", "IMOK", 2) },
    ],
  },
  {
    scene: "聚餐时有人突然提起你三年前受过的委屈。你会：",
    options: [
      { text: "说“早忘了”，然后准确复述全部细节。", scores: s("IMOK", "LOAD") },
      { text: "当场把话说开，今天必须结案。", scores: s("OKOK", "HUGS") },
      { text: "把它讲成段子，让全桌一起笑。", scores: s("LOL", "SUGR") },
    ],
  },
  {
    scene: "朋友婚礼上，你负责播放爱情视频，却误放成老板年会跳舞。你会：",
    options: [
      { text: "三秒拔掉投影，假装刚才是幻觉。", scores: s("HOLD", "RETRY") },
      { text: "继续播放，并宣布这是婚礼特别节目。", scores: s("YOLO", "IDOL") },
      { text: "先录像保存，装作没慌，回家再慢慢崩溃。", scores: s("IMOK", "LOAD") },
      { text: "我参加婚礼只负责吃席、鼓掌和拍好看的照片。", scores: s("SUGR", "LOL", 2) },
    ],
  },
  {
    scene: "你参加比赛，以一分之差拿了第二名。你会：",
    options: [
      { text: "回家研究第一名，明年必须赢回来。", scores: s("RETRY", "HOLD") },
      { text: "发朋友圈：“遗憾夺得第二名，不过依然开心。”", scores: s("SUGR", "LOL") },
      { text: "当场宣布退役，并寻找下一个兴趣。", scores: s("LOL", "SUGR") },
    ],
  },
];

function BeanCharacter({ code, small = false }: { code: BeanCode; small?: boolean }) {
  return (
    <div
      className={`bean-character ${small ? "bean-small" : ""}`}
      style={{ "--bean-color": profiles[code].color } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="bean-shine" />
      <span className="bean-eye eye-left" />
      <span className="bean-eye eye-right" />
      <span className="bean-mouth" />
      <span className="bean-arm arm-left" />
      <span className="bean-arm arm-right" />
      <span className="bean-leg leg-left" />
      <span className="bean-leg leg-right" />
    </div>
  );
}

type InteractionStep = "plane" | "zoom" | "bean" | "falling" | "ended";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const gestureRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startProgress: number;
    currentProgress: number;
  } | null>(null);
  const segmentRef = useRef<{
    start: number;
    end: number;
    next: InteractionStep;
  } | null>(null);
  const endingTimerRef = useRef<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [tieChoice, setTieChoice] = useState<BeanCode | null>(null);
  const [entered, setEntered] = useState(false);
  const [videoReveal, setVideoReveal] = useState(false);
  const [muted, setMuted] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [interactionStep, setInteractionStep] =
    useState<InteractionStep>("plane");
  const [interactionProgress, setInteractionProgress] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [isSegmentPlaying, setIsSegmentPlaying] = useState(false);
  const [beanTransferDone, setBeanTransferDone] = useState(false);
  const introVideoSource =
    interactionStep === "plane"
      ? "/media/cbti-intro.mp4"
      : interactionStep === "zoom"
        ? "/media/cbti-zoom.mp4"
        : "/media/cbti-drop.mp4";

  const ranking = useMemo(() => {
    const raw = Object.fromEntries(
      Object.keys(profiles).map((code) => [code, 0]),
    ) as Record<BeanCode, number>;

    answers.forEach((answer, index) => {
      const option = questions[index]?.options[answer];
      if (!option) return;
      Object.entries(option.scores).forEach(([code, points]) => {
        raw[code as BeanCode] += points ?? 0;
      });
    });

    return (Object.keys(raw) as BeanCode[])
      .map((code) => ({
        code,
        raw: raw[code],
        score: (raw[code] / maxScore[code]) * 100,
      }))
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const topTwo = ranking.slice(0, 2);
  const needsTieBreak =
    answers.length === questions.length &&
    topTwo.length === 2 &&
    topTwo[0].score - topTwo[1].score < 5;

  const primaryCode = tieChoice ?? topTwo[0]?.code;
  const secondaryCode =
    tieChoice && topTwo.length === 2
      ? topTwo.find((item) => item.code !== tieChoice)?.code
      : topTwo[1]?.code;

  const choose = useCallback((optionIndex: number) => {
    if (transitioning || answers.length >= questions.length) return;
    setSelectedOption(optionIndex);
    setTransitioning(true);
    window.setTimeout(() => {
      setAnswers((current) => [...current, optionIndex]);
      setSelectedOption(null);
      setTransitioning(false);
    }, 360);
  }, [answers.length, transitioning]);

  const goBack = useCallback(() => {
    if (transitioning) return;
    setAnswers((current) => current.slice(0, -1));
    setSubmitted(false);
    setTieChoice(null);
  }, [transitioning]);

  const restart = () => {
    setAnswers([]);
    setSubmitted(false);
    setTieChoice(null);
    setSelectedOption(null);
    setTransitioning(false);
  };

  const enterQuiz = () => {
    videoRef.current?.pause();
    if (endingTimerRef.current !== null) {
      window.clearTimeout(endingTimerRef.current);
    }
    setEntered(true);
  };

  const playGestureSegment = (step = interactionStep) => {
    const video = videoRef.current;
    if (!video || isSegmentPlaying || !["plane", "zoom", "bean"].includes(step)) {
      return;
    }

    const fallbackDuration =
      step === "plane" ? 1.75 : step === "zoom" ? 2.65 : 9.57;
    const duration =
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : fallbackDuration;
    setInteractionProgress(0);
    setSegmentProgress(0);
    setIsSegmentPlaying(true);
    gestureRef.current = null;

    if (step === "plane") {
      segmentRef.current = { start: 0, end: duration, next: "zoom" };
      video.currentTime = 0;
    } else if (step === "zoom") {
      segmentRef.current = { start: 0, end: duration, next: "bean" };
      video.currentTime = 0;
    } else {
      segmentRef.current = { start: 0, end: duration, next: "ended" };
      video.currentTime = 0;
      setInteractionStep("falling");
      if (endingTimerRef.current !== null) {
        window.clearTimeout(endingTimerRef.current);
      }
      endingTimerRef.current = window.setTimeout(() => {
        setVideoReveal(true);
        setInteractionStep("ended");
      }, 5600);
    }

    void video.play().catch(() => setIsSegmentPlaying(false));
  };

  const startGesture = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      isSegmentPlaying ||
      !["plane", "zoom", "bean"].includes(interactionStep)
    ) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startProgress: interactionProgress,
      currentProgress: interactionProgress,
    };
  };

  const moveGesture = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    const distance =
      interactionStep === "plane"
        ? dx / 120
        : interactionStep === "zoom"
          ? Math.max(dx / 110, -dy / 110)
          : dy / 120;
    const progress = Math.min(1, Math.max(0, gesture.startProgress + distance));
    gesture.currentProgress = progress;
    setInteractionProgress(progress);

    if (progress >= 0.55) {
      playGestureSegment(interactionStep);
    }
  };

  const endGesture = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gestureRef.current = null;
    if (gesture.currentProgress >= 0.2) {
      playGestureSegment(interactionStep);
      return;
    }
    setInteractionProgress(0);
  };

  const skipVideo = () => {
    const video = videoRef.current;
    if (endingTimerRef.current !== null) {
      window.clearTimeout(endingTimerRef.current);
    }
    setVideoReveal(true);
    setInteractionStep("ended");
    setInteractionProgress(0);
    setSegmentProgress(0);
    setIsSegmentPlaying(false);
    segmentRef.current = null;
    if (!video) return;
    if (Number.isFinite(video.duration)) {
      video.currentTime = Math.max(0, video.duration - 1.25);
    }
    video.pause();
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted && interactionStep === "falling") {
      await video.play().catch(() => undefined);
    }
  };

  useEffect(() => {
    const isResult =
      entered && submitted && (!needsTieBreak || tieChoice !== null);
    document.body.classList.toggle("experience-locked", !isResult);
    return () => document.body.classList.remove("experience-locked");
  }, [entered, needsTieBreak, submitted, tieChoice]);

  useEffect(() => {
    if (!entered || submitted || answers.length >= questions.length) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && answers.length > 0) {
        goBack();
        return;
      }
      const index = ["1", "2", "3", "4"].indexOf(event.key);
      if (index >= 0 && index < questions[answers.length].options.length) {
        choose(index);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answers.length, choose, entered, goBack, submitted]);

  useEffect(() => {
    if (!entered || beanTransferDone) return;
    const timer = window.setTimeout(() => setBeanTransferDone(true), 1250);
    return () => window.clearTimeout(timer);
  }, [beanTransferDone, entered]);

  useEffect(
    () => () => {
      if (endingTimerRef.current !== null) {
        window.clearTimeout(endingTimerRef.current);
      }
    },
    [],
  );

  return (
    <ClickSpark className="experience-root" color="#ffd27a" count={12} radius={32}>
      <main className={entered ? "is-entered" : "is-intro"}>
        {!entered && (
          <section
            className={`cinematic-intro ${videoReveal ? "is-revealed" : ""}`}
            id="home"
            style={
              {
                "--gesture-progress": interactionProgress,
              } as React.CSSProperties
            }
          >
            <video
              key={introVideoSource}
              ref={videoRef}
              className="intro-video"
              src={introVideoSource}
              poster="/media/cbti-intro-poster.jpg"
              muted={muted}
              playsInline
              preload="auto"
              onLoadedMetadata={(event) => {
                event.currentTarget.muted = muted;
                event.currentTarget.pause();
                event.currentTarget.currentTime = 0;
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                const segment = segmentRef.current;
                if (segment) {
                  const progress = Math.min(
                    1,
                    Math.max(
                      0,
                      (video.currentTime - segment.start) /
                        (segment.end - segment.start),
                    ),
                  );
                  setSegmentProgress(progress);

                  if (
                    segment.next !== "ended" &&
                    video.currentTime >= segment.end
                  ) {
                    video.pause();
                    video.currentTime = segment.end;
                    segmentRef.current = null;
                    setIsSegmentPlaying(false);
                    setSegmentProgress(0);
                    setInteractionProgress(0);
                    setInteractionStep(segment.next);
                  }
                }
                if (
                  interactionStep === "falling" &&
                  video.duration - video.currentTime <= 4.25
                ) {
                  setVideoReveal(true);
                }
              }}
              onEnded={() => {
                const segment = segmentRef.current;
                if (segment && segment.next !== "ended") {
                  segmentRef.current = null;
                  setIsSegmentPlaying(false);
                  setSegmentProgress(0);
                  setInteractionProgress(0);
                  setInteractionStep(segment.next);
                  return;
                }
                if (interactionStep !== "falling") return;
                if (endingTimerRef.current !== null) {
                  window.clearTimeout(endingTimerRef.current);
                }
                segmentRef.current = null;
                setIsSegmentPlaying(false);
                setSegmentProgress(1);
                setVideoReveal(true);
                setInteractionStep("ended");
              }}
              onError={() => {
                segmentRef.current = null;
                setIsSegmentPlaying(false);
                setVideoReveal(true);
                setInteractionStep("ended");
              }}
            />
            <div className="segment-preloads" aria-hidden="true">
              <video src="/media/cbti-zoom.mp4" muted playsInline preload="auto" />
              <video src="/media/cbti-drop.mp4" muted playsInline preload="auto" />
            </div>
            <div className="intro-wash" aria-hidden="true" />

            <header className="intro-topbar">
              <a className="intro-brand" href="#home" aria-label="CBTI 咖啡豆型人格测试首页">
                <span className="brand-bean" aria-hidden="true" />
                <span>
                  <b>CBTI</b>
                  <small>COFFEE BEAN TYPE INDICATOR</small>
                </span>
              </a>
              <div className="intro-controls">
                <button type="button" onClick={toggleSound}>
                  <span aria-hidden="true">{muted ? "♪" : "◼"}</span>
                  {muted ? "开启声音" : "静音"}
                </button>
                {!videoReveal && (
                  <button type="button" onClick={skipVideo}>
                    跳过动画
                  </button>
                )}
              </div>
            </header>

            {!videoReveal && (
              <div
                className={`interaction-layer step-${interactionStep} ${
                  isSegmentPlaying ? "is-playing" : ""
                }`}
                style={
                  {
                    "--gesture-progress": interactionProgress,
                  } as React.CSSProperties
                }
                onPointerDown={startGesture}
                onPointerMove={moveGesture}
                onPointerUp={endGesture}
                onPointerCancel={endGesture}
              >
                {interactionStep !== "falling" && (
                  <div className="gesture-feedback" aria-hidden="true">
                    <span className="gesture-path" />
                    <i className="gesture-follower">
                      {interactionStep === "plane"
                        ? "→"
                        : interactionStep === "zoom"
                          ? "↗"
                          : "↓"}
                    </i>
                  </div>
                )}

                {interactionStep !== "falling" ? (
                  <div
                    className={`gesture-cue ${isSegmentPlaying ? "is-playing" : ""}`}
                    aria-live="polite"
                  >
                    <span className="gesture-live-icon">
                      <i aria-hidden="true">
                        {isSegmentPlaying
                          ? "●"
                          : interactionStep === "plane"
                            ? "→"
                            : interactionStep === "zoom"
                              ? "↗"
                              : "↓"}
                      </i>
                    </span>
                    <div className="gesture-copy">
                      <span className="gesture-kicker">
                        {isSegmentPlaying
                          ? "动画进行中"
                          : `互动 ${
                              interactionStep === "plane"
                                ? "1"
                                : interactionStep === "zoom"
                                  ? "2"
                                  : "3"
                            } / 3`}
                      </span>
                      <strong>
                        {interactionStep === "plane" &&
                          (isSegmentPlaying
                            ? "“丝绸号”正在穿过云层…"
                            : "把“丝绸号”拉出云端")}
                        {interactionStep === "zoom" &&
                          (isSegmentPlaying
                            ? "镜头正在靠近机腹…"
                            : "拉近镜头，看看机腹下")}
                        {interactionStep === "bean" &&
                          "这颗豆不想掉——把它往下拽"}
                      </strong>
                      <small>
                        {isSegmentPlaying && "已经感受到你的手势，画面会连续播放"}
                        {!isSegmentPlaying &&
                          interactionStep === "plane" &&
                          "轻轻向右一划，动画就会自己继续"}
                        {!isSegmentPlaying &&
                          interactionStep === "zoom" &&
                          "向右或向上一划，让镜头自动靠近"}
                        {!isSegmentPlaying &&
                          interactionStep === "bean" &&
                          "向下一划，看它一路掉进云南"}
                      </small>
                    </div>
                    <div className="gesture-meter" aria-hidden="true">
                      <span
                        style={{
                          width: `${
                            (isSegmentPlaying ? segmentProgress : interactionProgress) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    {!isSegmentPlaying && (
                      <button
                        type="button"
                        className="gesture-assist"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          playGestureSegment();
                        }}
                      >
                        轻触也可以
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="falling-cue" aria-live="polite">
                    <span className="falling-dot" />
                    <span>
                      <small>连续动画播放中</small>
                      <strong>松手——它掉下去了</strong>
                    </span>
                  </div>
                )}

                <div className="chapter-dots" aria-label="互动进度">
                  {(["plane", "zoom", "bean"] as InteractionStep[]).map((step, index) => (
                    <span
                      key={step}
                      className={
                        step === interactionStep
                          ? "is-current"
                          : (interactionStep === "zoom" && index === 0) ||
                              (interactionStep === "bean" && index < 2) ||
                              ["falling", "ended"].includes(interactionStep)
                            ? "is-done"
                            : ""
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="intro-copy" aria-live="polite">
              <p className="intro-eyebrow">一颗云南豆的奇遇，从这里开始</p>
              <h1>
                <span>咖啡豆型</span>
                <span className="title-accent">人格测试</span>
              </h1>
              <p className="intro-lead">
                别急着定义自己。让 20 个生活瞬间，
                <br />
                替你冲出一杯真正的性格风味。
              </p>
              <button className="intro-cta magnetic-button" onClick={enterQuiz}>
                <span>开始萃取我的豆格</span>
                <i aria-hidden="true">→</i>
              </button>
              <div className="intro-meta">
                <span>20 幕生活切片</span>
                <span>12 种云南豆格</span>
                <span>约 3 分钟</span>
              </div>
            </div>

            <div className="playback-line" aria-hidden="true">
              <span />
            </div>
          </section>
        )}

        {entered && (
          <section
            className={`quiz-section ${submitted ? "has-submission" : ""} ${
              beanTransferDone ? "bean-arrived" : "bean-transferring"
            }`}
            id="quiz"
          >
            <div className="quiz-cloud cloud-one" aria-hidden="true" />
            <div className="quiz-cloud cloud-two" aria-hidden="true" />
        <div className="quiz-shell">
          {!beanTransferDone && <span className="bean-transfer" aria-hidden="true" />}
          <header className="quiz-topbar">
            <button className="quiz-brand" onClick={restart} aria-label="重新开始测试">
              <span className="brand-bean" aria-hidden="true" />
              <span><b>CBTI</b><small>咖啡豆型人格测试</small></span>
            </button>
            {!submitted && (
              <span className="quiz-hint">按数字键 1—4 选择 · ← 返回</span>
            )}
          </header>

          {!submitted && (
            <div className="quiz-viewport">
              <div className="progress-row">
                <div>
                  <span className="progress-label">正在采集你的风味</span>
                  <strong>
                    {Math.min(answers.length + 1, questions.length)}
                    <small> / {questions.length}</small>
                  </strong>
                </div>
                <div
                  className="progress-track"
                  aria-label={`已完成 ${answers.length} 题`}
                  style={
                    {
                      "--bean-progress": `${
                        (answers.length / questions.length) * 100
                      }%`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="progress-fill"
                    style={{ width: `${(answers.length / questions.length) * 100}%` }}
                  />
                  <span className="progress-runner" aria-hidden="true">
                    <span className="runner-bean" />
                  </span>
                </div>
                <span className="progress-percent">
                  {Math.round((answers.length / questions.length) * 100)}%
                </span>
              </div>

              {answers.length < questions.length ? (
                <div
                  className={`question-card ${transitioning ? "page-leave" : "page-enter"}`}
                  key={answers.length}
                >
                  <div className="question-heading">
                    <p className="question-kicker">
                      LIFE SCENE · {String(answers.length + 1).padStart(2, "0")}
                    </p>
                    <span className="scene-stamp">云南豆格采样</span>
                  </div>
                  <h2>{questions[answers.length].scene}</h2>
                  <div className="options">
                    {questions[answers.length].options.map((option, optionIndex) => (
                      <button
                        key={option.text}
                        className={selectedOption === optionIndex ? "is-selected" : ""}
                        disabled={transitioning}
                        onClick={() => choose(optionIndex)}
                      >
                        <span>{String.fromCharCode(65 + optionIndex)}</span>
                        <p>{option.text}</p>
                        <i>→</i>
                      </button>
                    ))}
                  </div>
                  {answers.length > 0 && (
                    <button className="back-button" onClick={goBack}>
                      <span aria-hidden="true">←</span> 返回上一幕
                    </button>
                  )}
                </div>
              ) : (
                <div className="ready-card">
                  <div className="mini-beans">
                    <BeanCharacter code="HOLD" small />
                    <BeanCharacter code="YOLO" small />
                    <BeanCharacter code="WHY" small />
                  </div>
                  <p className="eyebrow">BREWING YOUR RESULT</p>
                  <h2>20 个选择，已经萃取完毕。</h2>
                  <p>接下来会校正每种人格的题目曝光差异，再生成你的主人格与副风味。</p>
                  <button className="primary-button" onClick={() => setSubmitted(true)}>
                    打开我的豆格报告 <span>→</span>
                  </button>
                  <button className="back-button" onClick={goBack}>
                    ← 修改最后一题
                  </button>
                </div>
                  )}
            </div>
          )}

          {submitted && needsTieBreak && !tieChoice && (
            <div className="tie-card">
              <p className="eyebrow">ONE LAST SIP</p>
              <h2>两种风味太接近了。</h2>
              <p className="tie-lead">凭第一感觉，哪句话更像你？这道题只决定主人格，不修改原始分。</p>
              <div className="tie-options">
                {topTwo.map(({ code }) => (
                  <button key={code} onClick={() => setTieChoice(code)}>
                    <BeanCharacter code={code} small />
                    <span>
                      <small>{profiles[code].name} · {code}</small>
                      <strong>“{profiles[code].verdict}”</strong>
                    </span>
                    <i>→</i>
                  </button>
                ))}
              </div>
              <button className="back-button" onClick={() => setSubmitted(false)}>
                ← 返回检查答案
              </button>
            </div>
          )}

          {submitted && (!needsTieBreak || tieChoice) && primaryCode && secondaryCode && (
            <Result
              primary={primaryCode}
              secondary={secondaryCode}
              ranking={ranking}
              onRestart={restart}
            />
          )}
        </div>
          </section>
        )}

        {entered && submitted && (!needsTieBreak || tieChoice) && (
          <footer>
            <div className="shell footer-inner">
              <strong>CBTI 咖啡豆型人格测试</strong>
              <p>以云南咖啡为媒介的娱乐型人格体验，不属于心理学诊断。</p>
              <span>© 2026 CBTI</span>
            </div>
          </footer>
        )}
      </main>
    </ClickSpark>
  );
}

function Result({
  primary,
  secondary,
  ranking,
  onRestart,
}: {
  primary: BeanCode;
  secondary: BeanCode;
  ranking: { code: BeanCode; score: number }[];
  onRestart: () => void;
}) {
  const p = profiles[primary];
  const sProfile = profiles[secondary];
  const sameFamily = families.some(
    (family) => family.includes(primary) && family.includes(secondary),
  );

  return (
    <article className="result-page">
      <header
        className="result-hero"
        style={{ "--result-color": p.color } as React.CSSProperties}
      >
        <div className="result-copy">
          <p className="eyebrow">YOUR CBTI PROFILE</p>
          <span className="blend-pill">{sameFamily ? "同家族双拼" : "跨风味拼配"}</span>
          <h2>
            你是 <em>{p.name}</em>
          </h2>
          <h3>{primary} · {p.title}</h3>
          <p className="result-verdict">“{p.verdict}”</p>
        </div>
        <div className="result-character">
          <BeanCharacter code={primary} />
          <span>{p.archetype}</span>
        </div>
      </header>

      <section className="result-intro">
        <span className="section-number">01</span>
        <div>
          <p className="section-label">你的豆格原型</p>
          <h3>{p.intro}</h3>
        </div>
      </section>

      <section className="two-sides">
        <div>
          <p className="section-label">别人看到的你</p>
          <h3>{p.visible}</h3>
        </div>
        <div>
          <p className="section-label">藏在里面的你</p>
          <h3>{p.hidden}</h3>
        </div>
      </section>

      <section className="skills-grid">
        <div className="skill-card good">
          <p className="section-label">高光技能</p>
          {p.strengths.map((item) => <span key={item}>✓ {item}</span>)}
        </div>
        <div className="skill-card risk">
          <p className="section-label">容易翻车</p>
          {p.risks.map((item) => <span key={item}>△ {item}</span>)}
        </div>
      </section>

      <section className="coffee-card">
        <div>
          <p className="section-label">为什么是这颗云南豆</p>
          <h3>{p.archetype}</h3>
          <p>杯中方向偏{p.coffee}最终风味以实际批次杯测为准。</p>
        </div>
        <div className="drink-box">
          <span>建议喝法</span>
          <strong>{p.drink}</strong>
        </div>
      </section>

      <section className="secondary-card">
        <div>
          <p className="section-label">你的副风味</p>
          <h3>{sProfile.name} · {secondary}</h3>
          <p>{sProfile.verdict}</p>
        </div>
        <BeanCharacter code={secondary} small />
        <div className="score-list">
          {ranking.slice(0, 4).map((item) => (
            <div key={item.code}>
              <span>{profiles[item.code].name}</span>
              <i><b style={{ width: `${Math.min(item.score, 100)}%` }} /></i>
              <strong>{Math.round(item.score)}</strong>
            </div>
          ))}
        </div>
      </section>

      <blockquote>“{p.quote}”</blockquote>

      <div className="result-actions">
        <button className="primary-button" onClick={() => window.print()}>
          保存结果页 <span>↗</span>
        </button>
        <button className="outline-button" onClick={onRestart}>再测一次</button>
      </div>
      <p className="result-note">
        这是一场以云南咖啡为媒介的娱乐型人格体验。人格类比不属于心理学诊断；杯中风味由品种、产区、成熟度、处理、烘焙和冲煮共同形成。
      </p>
    </article>
  );
}
