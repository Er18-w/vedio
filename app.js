const DIMENSIONS = [
  {
    "key": "score",
    "left": "稳定",
    "right": "探索"
  },
  {
    "key": "anchor",
    "left": "直接",
    "right": "柔和"
  },
  {
    "key": "relation",
    "left": "独处",
    "right": "关系"
  },
  {
    "key": "expression",
    "left": "积累",
    "right": "行动"
  }
];
const MAP_BEACONS = {
  HOLD: [12.0, 27.6], LOL: [33.6, 27.2], IMOK: [54.2, 28.0], OKOK: [81.0, 28.3],
  SUGR: [15.0, 50.6], WHY: [37.6, 58.5], RETRY: [62.4, 48.9], YOLO: [89.9, 53.1],
  IDOL: [14.6, 75.7], HUGS: [43.2, 79.4], SOLO: [66.0, 80.0], LOAD: [87.5, 77.8],
};
const SCENE_BEACONS = {
  SUGR: [23, 21], RETRY: [50, 20], OKOK: [76, 20],
  IDOL: [18, 43], HOLD: [48, 42], SOLO: [76, 43],
  WHY: [17, 64], HUGS: [40, 63], YOLO: [58, 64], LOAD: [79, 64],
  IMOK: [22, 85], LOL: [54, 85],
};
const DRINK_IMAGES = {
  HOLD: "assets/drinks/HOLD.png", LOL: "assets/drinks/LOL.png", HUGS: "assets/drinks/HUGS.png",
  RETRY: "assets/drinks/RETRY.png", IMOK: "assets/drinks/IMOK.png", OKOK: "assets/drinks/OKOK.png",
  YOLO: "assets/drinks/YOLO.png", LOAD: "assets/drinks/LOAD.png", IDOL: "assets/drinks/IDOL.png",
  WHY: "assets/drinks/WHY.png", SUGR: "assets/drinks/SUGR.png", SOLO: "assets/drinks/SOLO.png",
};

const questions = [
  {
    "scene": "第1题",
    "title": "美术馆把一把忘记收走的拖把放进展柜。参观者纷纷围着它，表示认可这个艺术品。你觉得：",
    "options": [
      {
        "text": "他们真是一群山炮",
        "scores": {
          "WHY": 2,
          "LOL": 1
        }
      },
      {
        "text": "也许东西本身不重要，相信它有意义才重要。",
        "scores": {
          "OKOK": 2,
          "HUGS": 1
        }
      },
      {
        "text": "保洁阿姨无意间完成了职业代表作。",
        "scores": {
          "LOL": 2,
          "YOLO": 1
        }
      }
    ]
  },
  {
    "scene": "第2题",
    "title": "你看到一篇文章，作者自称是一只外卖塑料袋。结尾写着：“我装过无数人的晚餐，却没人问过我饿不饿。”你的反应是：",
    "options": [
      {
        "text": "同情塑料袋，下次点外卖的时候多点一份，留给塑料袋",
        "scores": {
          "HUGS": 2,
          "SUGR": 1
        }
      },
      {
        "text": "或许、或许我就是那个塑料袋呢呜呜呜。在日常生活中他们都是利用我，而不在乎我。",
        "scores": {
          "IMOK": 2,
          "HUGS": 1
        }
      },
      {
        "text": "不可能，压根儿不可能有塑料袋会发文章",
        "scores": {
          "LOAD": 2,
          "WHY": 1
        }
      }
    ]
  },
  {
    "scene": "第3题",
    "title": "面前有三台免费饮料机，只能选一台，并且终身不能更换。你选择：",
    "options": [
      {
        "text": "永远只做一种饮料，但每杯都完全符合你的标准。",
        "scores": {
          "IDOL": 3
        },
        "anchor": "IDOL"
      },
      {
        "text": "每天随机出一杯，可能惊艳，也可能难喝。",
        "scores": {
          "YOLO": 3
        },
        "anchor": "YOLO"
      },
      {
        "text": "我不喜欢占便宜，我想喝什么我自己买。",
        "scores": {
          "SOLO": 3
        },
        "anchor": "SOLO"
      }
    ]
  },
  {
    "scene": "第4题",
    "title": "明早九点要交方案。现在是晚上十点，文档里只有标题和你的名字。你会：",
    "options": [
      {
        "text": "不慌不忙地按顺序完成方案。",
        "scores": {
          "HOLD": 3
        },
        "anchor": "HOLD"
      },
      {
        "text": "突然深夜emo，我的人生就像这个文档一样空白",
        "scores": {
          "IMOK": 3
        },
        "anchor": "IMOK"
      },
      {
        "text": "能拖一会儿是一会儿，后半夜才是灵感的发源地",
        "scores": {
          "LOAD": 3
        },
        "anchor": "LOAD"
      }
    ]
  },
  {
    "scene": "第5题",
    "title": "商场开始出售爱因斯坦的智商，一份2元，买完之后就会获得爱因斯坦智商。门口已经排起长队。你觉得：",
    "options": [
      {
        "text": "顾客智商变高后，统一去退款，商家会不会赔钱",
        "scores": {
          "WHY": 3
        },
        "anchor": "WHY"
      },
      {
        "text": "去买的人看来真挺需要的。",
        "scores": {
          "LOL": 2,
          "IMOK": 1
        }
      },
      {
        "text": "万一呢？我说万一呢，先来一份尝尝咸淡。",
        "scores": {
          "YOLO": 2,
          "SUGR": 1
        }
      }
    ]
  },
  {
    "scene": "第6题",
    "title": "咖啡店里，两位陌生人正在争论吸管应该插在杯子左边还是右边，周围的人也开始站队。你的反应是：",
    "options": [
      {
        "text": "不相信有人会因为这个去吵架。",
        "scores": {
          "LOAD": 2,
          "WHY": 1
        }
      },
      {
        "text": "他们哪怕打起来，也和我没关系。",
        "scores": {
          "SOLO": 2,
          "IMOK": 1
        }
      },
      {
        "text": "心里面默念：打起来，打起来……",
        "scores": {
          "YOLO": 2,
          "LOL": 1
        }
      }
    ]
  },
  {
    "scene": "第7题",
    "title": "在你的生日会上，生日蛋糕突然掉在地上。全场突然安静，大家都愣住了。你最先想到：",
    "options": [
      {
        "text": "或许这会成为以后有趣的回忆。",
        "scores": {
          "YOLO": 2,
          "LOL": 1
        }
      },
      {
        "text": "难道说，这是冥冥之中的暗示……",
        "scores": {
          "IMOK": 2,
          "LOAD": 1
        }
      },
      {
        "text": "先处理现场，再开个玩笑，把气氛热闹起来。",
        "scores": {
          "OKOK": 3
        },
        "anchor": "OKOK"
      }
    ]
  },
  {
    "scene": "第8题",
    "title": "这一题没有题目，请直接选择：",
    "options": [
      {
        "text": "A不错，因为A代表优秀",
        "scores": {
          "IDOL": 2,
          "RETRY": 1
        }
      },
      {
        "text": "我选2B",
        "scores": {
          "LOL": 3
        },
        "anchor": "LOL"
      },
      {
        "text": "遇到不会的问题都选C",
        "scores": {
          "HOLD": 2,
          "LOAD": 1
        }
      }
    ]
  },
  {
    "scene": "第9题",
    "title": "一款人工智能公开承认：“我有时根本不理解人类，只是为了避免尴尬，假装自己听懂了。”你对此的看法是：",
    "options": [
      {
        "text": "我就知道，我就知道你小子是吹牛的。",
        "scores": {
          "WHY": 2,
          "LOL": 1
        }
      },
      {
        "text": "换位思考，AI也挺不容易的，天天被人类折磨。",
        "scores": {
          "HUGS": 3
        },
        "anchor": "HUGS"
      },
      {
        "text": "它越来越像人类了。",
        "scores": {
          "OKOK": 2,
          "HUGS": 1
        }
      }
    ]
  },
  {
    "scene": "第10题",
    "title": "喜欢的人向你表白：“只要你愿意，我们从此时时刻刻不分离。我就答应和你在一起”你会觉得：",
    "options": [
      {
        "text": "开始犹豫，万一以后没有自己的独处空间怎么办？",
        "scores": {
          "SOLO": 2,
          "IDOL": 1
        }
      },
      {
        "text": "先同意，至于以后走到哪一步再说。",
        "scores": {
          "OKOK": 2,
          "YOLO": 1
        }
      },
      {
        "text": "好啊好啊好啊好啊好啊好啊好啊好啊好啊好啊",
        "scores": {
          "SUGR": 3
        },
        "anchor": "SUGR"
      }
    ]
  },
  {
    "scene": "第11题",
    "title": "公司规定迟到一分钟就要朗读检讨。老板迟到半小时，却说“路上堵”。你会：",
    "options": [
      {
        "text": "递上检讨书模板，并提醒TA不要有错别字。",
        "scores": {
          "RETRY": 3
        },
        "anchor": "RETRY"
      },
      {
        "text": "当没看见，毕竟TA是老板。",
        "scores": {
          "IMOK": 2,
          "OKOK": 1
        }
      },
      {
        "text": "用身边人听不到的声音小声说：堵你大ba。",
        "scores": {
          "LOL": 2,
          "WHY": 1
        }
      }
    ]
  },
  {
    "scene": "第12题",
    "title": "如果我告诉你，测试结束之后需要付款才能看到结果，你想对我说：",
    "options": [
      {
        "text": "带着你的辣鸡测试题，有多远滚多远。",
        "scores": {
          "SOLO": 2,
          "WHY": 1
        }
      },
      {
        "text": "我劝你好自为之。",
        "scores": {
          "WHY": 2,
          "IDOL": 1
        }
      },
      {
        "text": "挺有意思的，我可能会为此买单。",
        "scores": {
          "IDOL": 2,
          "YOLO": 1
        }
      }
    ]
  }
];
const beans = [
  {
    "name": "稳豆",
    "code": "HOLD",
    "image": 1,
    "drink": "美式咖啡（清爽醇苦，坚果焦糖感）",
    "group": "意式咖啡风味体系",
    "dairy": false,
    "profile": "rich",
    "target": [
      -1.8,
      -1.7,
      -1.0,
      0.8
    ],
    "tagline": "“事情可以乱，但不能乱到最后还得我返工。”",
    "evidence": "“稳豆”不是某一种咖啡豆，而是你把混乱澄清、把问题排出顺序的处理方式。美式的意式咖啡基底经过水感延展后，浓度被拉开，轮廓反而更清楚；它像你面对复杂局面时的本能——先去掉噪音，再留下真正需要处理的部分。",
    "result": "你最有辨识度的能力，是把“怎么办”放在“我好难受”前面。场面越乱，你越会自动寻找优先级、可执行动作和谁能接住哪一块。别人因此把你当作可靠的主心骨，却很少看见你只是把情绪暂存到了后台。在关系里，你不擅长空口安慰，更习惯用解决问题表达在乎；压力过大时，也容易把所有责任一起揽走。稳豆真正需要的，不是一句“别想太多”，而是有人愿意替你接过一项任务，让你也可以短暂失序。",
    "flavor": "无奶无糖、结构清楚，坚果与焦糖风味直接落地。它不靠额外修饰制造存在感，像你一样把可靠、有效和清醒放在第一位。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "HOLD",
      "豆格"
    ]
  },
  {
    "name": "乐豆",
    "code": "LOL",
    "image": 2,
    "drink": "玫瑰拿铁（柔和奶香，淡雅玫瑰香）",
    "group": "意式咖啡风味体系",
    "dairy": true,
    "profile": "rich",
    "target": [
      0.8,
      1.3,
      1.1,
      1.8
    ],
    "tagline": "“来都来了，别让这场灾难完全白来。”",
    "evidence": "“乐豆”来自你重新命名经历的能力。玫瑰拿铁保留咖啡的苦甜底色，却让牛奶和玫瑰香气改变整杯饮品的叙述语气：苦没有消失，只是不再是唯一重点。它对应你把挫折二次加工后，仍能从中留下笑料、余韵和继续生活的力气。",
    "result": "你不是没有痛感，而是不愿让一件坏事永久垄断自己的叙事权。尴尬刚发生时，你可能和所有人一样难受；过一会儿，大脑便开始寻找其中最荒谬、最值得加工的部分。你经常是群体里让气氛重新流动的人，因此也容易被误解成“不够认真”。其实你比别人更清楚难受是什么，只是选择把它改造成能被讲述的故事。乐豆的独特之处，是笑并非逃避，而是一种把自己从低谷里重新打捞出来的能力。",
    "flavor": "玫瑰花香没有抹掉咖啡的苦，而是让苦拥有更柔和、更有余韵的表达，像你总能从糟糕现场里留下点有用的东西。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "LOL",
      "豆格"
    ]
  },
  {
    "name": "暖豆",
    "code": "HUGS",
    "image": 3,
    "drink": "蜂蜜拿铁（温润奶香，清甜蜂蜜感）",
    "group": "意式咖啡风味体系",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.0,
      1.8,
      1.9,
      -0.2
    ],
    "tagline": "“我愿意理解你，但请不要利用我的理解。”",
    "evidence": "“暖豆”来自你让尖锐感受拥有柔软出口的方式。蜂蜜拿铁以意式咖啡提供支撑，牛奶带来包裹感，蜂蜜补上一层温润清甜；三者不是把苦完全藏起来，而是让它更容易被接近。它像你的温柔：理解真实的难处，同时保留必要的分寸。",
    "result": "你真正敏锐的不是“会安慰人”，而是能听见别人没有说出口的那一部分。语气变短、回复变慢、平时喜欢的东西突然失去兴趣，这些细小变化很难逃过你的感知。你习惯用记住细节、主动询问和实际照顾来维系关系，因此常被当作安全感来源。但长期处在“随时接住别人”的位置，也会让你忘记自己同样需要被照顾。暖豆的成长不是变冷，而是分清陪伴与拯救：可以温柔，但不必替每个人承担全部情绪。",
    "flavor": "蜂蜜的温润清甜和牛奶的包裹感，会柔和咖啡的酸苦，像你有分寸地照顾别人，而不是让世界假装没有苦。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "HUGS",
      "豆格"
    ]
  },
  {
    "name": "战豆",
    "code": "RETRY",
    "image": 4,
    "drink": "澳白／馥芮白（咖啡感浓郁，奶感细腻）",
    "group": "意式咖啡风味体系",
    "dairy": true,
    "profile": "rich",
    "target": [
      -0.8,
      -1.0,
      -0.8,
      1.9
    ],
    "tagline": "“可以暂时打不过，但不能连技能说明都不看。”",
    "evidence": "“战豆”来自你把失败压缩成有效经验、再投入下一轮行动的习惯。澳白以较高的咖啡浓度和少量细腻奶感，减少多余修饰，让核心风味集中出现；它像你复盘后的状态——不是原样再来一次，而是留下关键变量，带着更清楚的策略重新上场。",
    "result": "你并非不怕失败，而是不肯让一次失败成为最终版本。别人想尽快忘掉的现场，你会重新调取：哪一步判断错了、哪条信息被忽略、下一轮要换什么参数。你的自尊不只来自“赢”，也来自看见自己确实比上一次更强。这样的你恢复力很高，却也容易把休息误认为退缩，把每次失利都变成必须追回的欠账。战豆需要记住：复盘是为了获得选择，不是为了永远惩罚自己；真正的重启，也包括知道什么时候可以先停一下。",
    "flavor": "咖啡存在感强、比例克制、核心集中。它不像盲目硬冲，更像调整完参数后重新上场的你。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "RETRY",
      "豆格"
    ]
  },
  {
    "name": "硬豆",
    "code": "IMOK",
    "image": 5,
    "drink": "Dirty 咖啡（冷热分层，浓醇回甜）",
    "group": "意式咖啡风味体系",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.0,
      -1.7,
      -1.8,
      -1.7
    ],
    "tagline": "“我可以先认真，但绝不能先被发现。”",
    "evidence": "“硬豆”来自你外在克制、内里丰沛的双层结构。Dirty 让热意式浓缩与冰鲜奶保持明显的温差和层次，第一口先遇见浓烈，随后才喝到柔软与清甜。它没有要求所有部分立刻融合，正像你允许感情存在，却会谨慎决定谁能继续向内靠近。",
    "result": "你的情绪不是少，而是权限很高。你可以替人记住重要的日子、默默完成麻烦的事情，却很难直接说“我其实很在意”；受伤时也常用一句“没事”把入口锁上。别人可能觉得你冷、难靠近，熟悉你的人才知道，你只是害怕太早交出软肋。硬豆一旦信任谁，往往比表面更长情；可当边界被反复越过，也会安静地彻底退出。你的独特，不是永远坚硬，而是柔软始终存在，只会交给真正尊重它的人。",
    "flavor": "冷热碰撞、由浓到柔，先碰到防线，熟悉以后才喝到底下那层温柔。你的硬，更像一种保护。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "IMOK",
      "豆格"
    ]
  },
  {
    "name": "圆豆",
    "code": "OKOK",
    "image": 6,
    "drink": "拿铁咖啡（圆润顺滑，奶香柔和）",
    "group": "意式咖啡风味体系",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.5,
      0.8,
      1.8,
      1.0
    ],
    "tagline": "“可以都理解，但不代表最后都得听。”",
    "evidence": "“圆豆”来自你协调差异、缓冲冲突又保留边界的能力。拿铁让意式咖啡与大量牛奶充分融合，口感圆润、接受度高，却仍保留咖啡的底色。它像你的相处方式：让彼此更容易靠近，不等于为了和谐而抹掉自己的原则。",
    "result": "你很少只看见一方的道理。发生冲突时，你会本能地寻找双方都能听懂的语言，让一句过硬的话换一种不伤人的落点。这并不代表你没有立场，而是你知道关系不必靠输赢维持。别人容易把你的体面误认成好说话，却不知道你心里一直有一张清楚的边界清单：小事可以让，原则不会消失；真正失望时，你甚至不争辩，只会安静撤回信任。圆豆最独特的地方，是能让差异同桌而坐，同时不把自己交出去。",
    "flavor": "浓缩与牛奶彼此融合、接受度高，却仍保留咖啡底色，像你能让不同立场坐到同一张桌上，也不会交出自己的边界。",
    "tags": [
      "意式咖啡风味体系",
      "春咖咖",
      "OKOK",
      "豆格"
    ]
  },
  {
    "name": "浪豆",
    "code": "YOLO",
    "image": 7,
    "drink": "花魁手冲（花果香明亮，果汁感清甜）",
    "group": "埃塞俄比亚花魁单品豆",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.9,
      0.3,
      0.7,
      1.5
    ],
    "tagline": "“钱可以再赚，今天的晚霞不负责补拍。”",
    "evidence": "“浪豆”来自你对鲜明体验和不可复制时刻的高响应。花魁手冲的花香、草莓与热带水果感开放而有辨识度，日晒带来的果汁感不会悄悄路过。它像你的存在方式：不把感受压成背景音，而是愿意为真正值得记住的瞬间留出位置。",
    "result": "你判断一件事值不值得，常常不是先计算回报，而是问“以后还会不会记得”。你对气氛、场景和不可复制的瞬间格外敏感，愿意为了真正心动的体验临时改计划。别人可能觉得你冲动，其实你并非完全不计后果，只是不愿让人生只剩下正确却无聊的完成项。浪豆的魅力在于对生命有高响应：喜欢就靠近，感动就表达，想去的地方会认真想办法抵达。需要留意的是，别用一时的热烈替代长期选择，让自由也拥有可以返回的方向。",
    "flavor": "香气奔放、果汁感鲜明，每一口都很有“此刻”的存在感，像你愿意把值得记住的当下活得有声有色。",
    "tags": [
      "埃塞俄比亚花魁单品豆",
      "春咖咖",
      "YOLO",
      "豆格"
    ]
  },
  {
    "name": "慢豆",
    "code": "LOAD",
    "image": 8,
    "drink": "云南萨其姆手冲（柑橘果香，红糖回甘）",
    "group": "云南萨其姆单品豆",
    "dairy": false,
    "profile": "bright",
    "target": [
      -1.7,
      0.4,
      -1.5,
      -1.5
    ],
    "tagline": "“我不是不想熟，我只是想确认熟了以后不会后悔。”",
    "evidence": "“慢豆”来自你先观察、再确认、最后稳定投入的信任路径。云南萨其姆手冲从柑橘、苹果、莓果逐步过渡到红糖回甘，风味不是第一口就全部展开，而是在温度变化中慢慢显现。它像你的关系节奏：不追求迅速熟络，更看重时间能否证明稳定。",
    "result": "你不是进入关系慢，而是确认关系很认真。热情的开场、漂亮的承诺都不足以让你立刻交出信任，你更在意一个人能否在重复的小事里保持一致。刚认识时，你可能安静得像没有意见；熟悉以后，别人会发现你记得细节、回应稳定，也很少轻易撤回承诺。慢豆容易被误解成冷淡，其实你的投入成本很高，所以更谨慎选择长期名单。压力来临时，你习惯独自消化，偶尔也需要告诉重要的人：你的沉默是在加载，不是准备离开。",
    "flavor": "风味干净、层次逐步展开，越往后越能喝到稳定回甘，像你的关系慢热，却很少敷衍。",
    "tags": [
      "云南萨其姆单品豆",
      "春咖咖",
      "LOAD",
      "豆格"
    ]
  },
  {
    "name": "爱豆",
    "code": "IDOL",
    "image": 9,
    "drink": "哥伦比亚瑰夏手冲（茉莉柑橘香，清雅细腻）",
    "group": "哥伦比亚瑰夏单品豆",
    "dairy": false,
    "profile": "bright",
    "target": [
      0.3,
      1.0,
      -0.8,
      -0.8
    ],
    "tagline": "“别人爱不爱我不稳定，我这里必须长期供应。”",
    "evidence": "“爱豆”来自你对自我价值、审美和环境质量的重视。哥伦比亚瑰夏手冲以茉莉、橙花、蜜桃与佛手柑方向见长，细腻香气需要合适的冲煮条件才能被认真呈现。它像你对关系和生活的要求：真正好的部分，不该依靠长期委屈换取表达。",
    "result": "你对“值得”这件事有自己的标准。无论关系、工作还是生活环境，你都不愿长期待在只消耗、不尊重也没有成长的位置。这不是自恋，而是你知道自己的精力有限，应该投向能够产生回应和意义的地方。你愿意欣赏别人，也乐于认真经营自己；但当外界持续贬低你的感受时，你会迅速收回投入。爱豆容易被误解成挑剔或难取悦，其实你只是拒绝把委屈当作诚意。你的功课，是把标准说出来，而不是等别人猜到以后才决定失望。",
    "flavor": "香气清雅、标准细致，不靠长期委屈换取表现。你不是难以取悦，只是知道真正好的状态需要被认真对待。",
    "tags": [
      "哥伦比亚瑰夏单品豆",
      "春咖咖",
      "IDOL",
      "豆格"
    ]
  },
  {
    "name": "反骨豆",
    "code": "WHY",
    "image": 10,
    "drink": "酸角特调（酸甜醒目，咖啡感清爽）",
    "group": "花魁基底创意特调",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.8,
      -1.7,
      -0.7,
      1.1
    ],
    "tagline": "“我可以先照做，但你最好祈祷我没发现更好的办法。”",
    "evidence": "“反骨豆”来自你不接受默认答案、愿意重写旧结构的思维方式。酸角特调以花魁咖啡为基础，再用具有地域感的酸甜风味改变传统咖啡的表达，却仍维持酸、甜与苦的平衡。它像你的质疑：不是为了破坏秩序，而是想证明旧答案之外还有能成立的新解法。",
    "result": "你不是为了显得不同才反对，而是很难假装没看见系统里的漏洞。“大家一直都这样”对你不是答案，只会引出更多问题：为什么、凭什么、有没有更合理的做法。你的质疑通常带着行动冲动，看见不对劲时，会忍不住重新设计一套规则。别人可能觉得你难管、爱抬杠，却忽略你真正反感的是没有逻辑的服从。反骨豆的稀有之处，是不满往往自带方案；只是压力过大时，也要小心把所有相处都变成辩论，给直觉和情感留下不必证明的空间。",
    "flavor": "它不是为了猎奇而不同，而是在旧结构里提出一种有地域性、也能够成立的新解法，像你的质疑通常带着方案。",
    "tags": [
      "花魁基底创意特调",
      "春咖咖",
      "WHY",
      "豆格"
    ]
  },
  {
    "name": "糖豆",
    "code": "SUGR",
    "image": 11,
    "drink": "苹果奶盖（苹果清甜，咸甜奶盖）",
    "group": "花魁基底创意特调",
    "dairy": true,
    "profile": "bright",
    "target": [
      1.0,
      1.7,
      1.8,
      1.7
    ],
    "tagline": "“今天不一定顺利，但不能一点甜头都不给我。”",
    "evidence": "“糖豆”来自你主动制造快乐、把小事变成庆祝的能力。苹果奶盖把花魁咖啡、苹果清甜和咸甜奶盖叠成三层体验，普通的一杯因此拥有更鲜明的分享感。它像你的快乐方式：不是等待好心情降临，而是愿意给平凡日子亲手加上一层亮色。",
    "result": "你不是看不见烦恼，而是不允许烦恼在生活里无限续杯。发现好吃的店、好笑的事情或值得庆祝的小进展，你会很自然地想分享给身边的人。你擅长给普通日子增加仪式感，也是群体里让快乐被看见、被放大的那一个。糖豆的明亮并不等于天真，它更像一种主动选择：世界已经够沉重，所以你愿意亲手制造一点甜。需要被理解的是，持续负责热闹也会累；当你突然安静时，不代表快乐消失，只是扩音器也需要暂时充电。",
    "flavor": "苹果清甜、咸甜奶盖和咖啡层层出现，让普通的一杯变成一次小型庆祝，像你总想亲手再给今天加一点快乐。",
    "tags": [
      "花魁基底创意特调",
      "春咖咖",
      "SUGR",
      "豆格"
    ]
  },
  {
    "name": "独豆",
    "code": "SOLO",
    "image": 12,
    "drink": "紫苏芭乐迷迭香特调（芭乐果香，紫苏草本感）",
    "group": "花魁基底创意特调",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.7,
      -0.7,
      -1.9,
      -0.8
    ],
    "tagline": "“我不必证明自己特殊，但我必须像我自己。”",
    "evidence": "“独豆”来自你拒绝统一答案、坚持内部逻辑自洽的方式。紫苏芭乐迷迭香特调以花魁咖啡为基础，加入芭乐果香、紫苏与迷迭香的草本层次，元素少见却能形成完整体系。它像你的独特：不依靠故意标新立异，只要逻辑成立，就有权保留自己的味道。",
    "result": "你不排斥关系，只是不愿为了被接纳而使用别人的默认设置。比起热闹但浅的来往，你更喜欢少数能够尊重边界、理解沉默的人。你有自己的生活系统、审美偏好和判断路径，独处时反而更容易恢复能量、完成深度思考。别人可能把这种自洽看成难接近，其实你并不需要刻意特殊，只是拒绝用相同证明正常。独豆的课题，是别让独立慢慢变成拒绝帮助：真正属于你的生活，也可以为可信的人保留入口。",
    "flavor": "元素少见却自成体系，不需要通过故意不同证明自己。像你一样，只要逻辑成立，就有权保留自己的味道。",
    "tags": [
      "花魁基底创意特调",
      "春咖咖",
      "SOLO",
      "豆格"
    ]
  }
];
const SHARE_CARD_IMAGES = {
  HOLD: "assets/share-cards/HOLD.jpg",
  SOLO: "assets/share-cards/SOLO.jpg",
  IMOK: "assets/share-cards/IMOK.jpg",
  IDOL: "assets/share-cards/IDOL.jpg",
  LOL: "assets/share-cards/LOL.jpg",
  HUGS: "assets/share-cards/HUGS.jpg",
  RETRY: "assets/share-cards/RETRY.jpg",
  SUGR: "assets/share-cards/SUGR.jpg",
  OKOK: "assets/share-cards/OKOK.jpg",
  YOLO: "assets/share-cards/YOLO.jpg",
  LOAD: "assets/share-cards/LOAD.jpg",
  WHY: "assets/share-cards/WHY.jpg",
};

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
  shareCardModal: document.querySelector("#share-card-modal"),
  shareCardPreview: document.querySelector("#share-card-preview"),
  shareCardSubtitle: document.querySelector("#share-card-subtitle"),
  shareCardGuide: document.querySelector("#share-card-guide"),
  sharePhotoSheet: document.querySelector("#share-photo-sheet"),
  sharePhotoPreview: document.querySelector("#share-photo-preview"),
  sharePhotoTitle: document.querySelector("#share-photo-title"),
  sharePhotoCopy: document.querySelector("#share-photo-copy"),
  toast: document.querySelector("#toast"),
};

// ============= 统计埋点（localStorage，仅本机） =============
const STATS_KEY = "cbti_stats_v1";
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY)) || { visits: [], completions: [], shares: [], beanCounts: {} };
  } catch {
    return { visits: [], completions: [], shares: [], beanCounts: {} };
  }
}
function saveStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch {}
}
function trackVisit() {
  const s = loadStats();
  s.visits.push({ date: new Date().toISOString().slice(0,10), ts: Date.now() });
  saveStats(s);
}
function trackComplete(primary, secondary) {
  const s = loadStats();
  s.completions.push({ date: new Date().toISOString().slice(0,10), ts: Date.now(), primary, secondary });
  s.beanCounts[primary] = (s.beanCounts[primary] || 0) + 1;
  saveStats(s);
}
function trackShare(primary, action) {
  const s = loadStats();
  s.shares.push({ date: new Date().toISOString().slice(0,10), ts: Date.now(), primary, action });
  saveStats(s);
}
// 页面加载时上报访问（异步、防重复）
if (!sessionStorage.getItem("cbti_tracked_visit")) {
  sessionStorage.setItem("cbti_tracked_visit", "1");
  trackVisit();
}

let progressRunnerFrame = 0;

function paintProgressRunner() {
  const video = els.progressRunnerVideo;
  const canvas = els.progressRunnerCanvas;
  if (!video || !canvas || document.body.dataset.screen !== "quiz-screen") return;

  if (video.readyState >= 2) {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 880, 120, 800, 1200, 0, 0, canvas.width, canvas.height);
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

const SCORING_BASELINE = {
  HOLD: { max: 5, base: 1.67 },
  RETRY: { max: 4, base: 1.33 },
  LOL: { max: 12, base: 4.33 },
  SUGR: { max: 5, base: 1.67 },
  OKOK: { max: 10, base: 3.33 },
  HUGS: { max: 6, base: 2.67 },
  WHY: { max: 12, base: 4.33 },
  SOLO: { max: 9, base: 3 },
  LOAD: { max: 9, base: 3 },
  IMOK: { max: 11, base: 3.67 },
  IDOL: { max: 8, base: 3 },
  YOLO: { max: 12, base: 4 },
};

function correctedIndex(code, score) {
  const item = SCORING_BASELINE[code];
  if (!item) return score;
  return ((score - item.base) / (item.max - item.base)) * 100;
}

function calculateResult() {
  const scores = Object.fromEntries(beans.map((bean) => [bean.code, 0]));
  const anchors = Object.fromEntries(beans.map((bean) => [bean.code, 0]));
  const hitCounts = Object.fromEntries(beans.map((bean) => [bean.code, 0]));

  questions.forEach((question, index) => {
    const answerIndex = state.answers[index];
    const choice = question.options[answerIndex];
    if (!choice) return;
    Object.entries(choice.scores || {}).forEach(([code, value]) => {
      scores[code] = (scores[code] || 0) + value;
      hitCounts[code] = (hitCounts[code] || 0) + 1;
    });
    if (choice.anchor) anchors[choice.anchor] = (anchors[choice.anchor] || 0) + 1;
  });

  const ranked = beans.map((bean) => ({
    bean,
    score: scores[bean.code] || 0,
    index: correctedIndex(bean.code, scores[bean.code] || 0),
    anchors: anchors[bean.code] || 0,
    hits: hitCounts[bean.code] || 0,
  })).sort((a, b) => {
    const diff = b.index - a.index;
    if (Math.abs(diff) <= 5) {
      if (b.anchors !== a.anchors) return b.anchors - a.anchors;
      if (b.hits !== a.hits) return b.hits - a.hits;
      return b.score - a.score;
    }
    return diff;
  });

  state.profile = ranked.slice(0, 4).map((item) => Math.max(-2, Math.min(2, (item.index / 100) * 4 - 2)));
  state.result = ranked[0].bean;
  // 埋点：完成测试
  if (ranked[0] && ranked[1]) trackComplete(ranked[0].bean.code, ranked[1].bean.code);
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
  renderForestResult(bean);

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

function renderForestResult(bean) {
  const originalBean = state.result;
  const isPreview = Boolean(originalBean && bean.code !== originalBean.code);
  const detailBoard = document.querySelector("#forest-detail-board");
  detailBoard.classList.toggle("is-character-preview", isPreview);
  detailBoard.dataset.viewingCode = bean.code;
  detailBoard.dataset.originalCode = originalBean?.code || bean.code;
  const index = beans.indexOf(bean) + 1;
  const image = document.querySelector("#forest-result-image");
  image.src = `assets/bean-${bean.image}.png`;
  image.alt = `${bean.name} ${bean.code} 人格形象`;
  document.querySelector("#forest-result-index").textContent = String(index).padStart(2, "0");
  document.querySelector("#forest-result-name").textContent = bean.name;
  document.querySelector("#forest-result-code").textContent = bean.code;
  document.querySelector("#forest-result-line").textContent = bean.tagline;
  document.querySelector("#forest-result-drink").textContent = bean.drink;
  document.querySelector("#forest-result-group").textContent = bean.group;
  document.querySelector("#forest-result-flavor").textContent = bean.flavor;
  document.querySelector("#forest-result-copy").textContent = bean.result;
  document.querySelector("#forest-result-evidence").textContent = bean.evidence;
  const sheetImage = document.querySelector("#forest-sheet-image");
  sheetImage.src = `assets/bean-${bean.image}.png`;
  sheetImage.alt = `${bean.name} ${bean.code} 人格形象`;
  document.querySelector("#forest-sheet-name").textContent = bean.name;
  document.querySelector("#forest-sheet-code").textContent = bean.code;
  document.querySelector("#forest-sheet-line").textContent = bean.tagline;
  document.querySelector("#forest-sheet-drink").textContent = bean.drink;
  document.querySelector("#forest-sheet-group").textContent = bean.group;
  document.querySelector("#forest-sheet-copy").textContent = bean.result;
  document.querySelector("#forest-sheet-evidence").textContent = bean.evidence;
  const detailImage = document.querySelector("#detail-board-image");
  detailImage.src = `assets/beans-cutout/bean-${bean.image}.webp`;
  detailImage.alt = `${bean.name} ${bean.code} 人格形象`;
  document.querySelector("#detail-board-name").textContent = bean.name;
  document.querySelector("#detail-board-code").textContent = bean.code;
  document.querySelector("#detail-board-title").textContent = bean.group;
  document.querySelector("#detail-board-line").textContent = bean.tagline;
  document.querySelector("#detail-board-tags").innerHTML = bean.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#detail-board-analysis").textContent = bean.result;
  document.querySelector("#detail-board-origin").textContent = bean.evidence;
  document.querySelector("#detail-board-drink").textContent = bean.drink;
  document.querySelector("#detail-board-group").textContent = bean.group;
  const drinkTags = (bean.drink.match(/[（(]([^）)]+)[）)]/)?.[1] || "咖啡香，专属风味")
    .split(/[，、,]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);
  const drinkTagsNode = document.querySelector("#detail-board-flavor");
  drinkTagsNode.innerHTML = "";
  drinkTags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    drinkTagsNode.appendChild(chip);
  });
  document.querySelector("#detail-board-match").textContent = bean.flavor;
  const drinkImage = document.querySelector("#detail-board-drink-image");
  drinkImage.src = DRINK_IMAGES[bean.code];
  drinkImage.alt = `${bean.drink} 实拍图`;
  const [sceneX, sceneY] = SCENE_BEACONS[bean.code];
  const sceneMarker = document.querySelector("#result-scene-marker");
  sceneMarker.style.setProperty("--scene-x", `${sceneX}%`);
  sceneMarker.style.setProperty("--scene-y", `${sceneY}%`);
  sceneMarker.dataset.label = isPreview ? `正在查看 · ${bean.name}` : `你的结果 · ${bean.name}`;

  const sceneHotspots = document.querySelector("#scene-character-hotspots");
  if (!sceneHotspots.children.length) {
    sceneHotspots.innerHTML = beans.map((candidate) => {
      const [x, y] = SCENE_BEACONS[candidate.code];
      return `<button type="button" class="scene-character-hotspot" data-bean-code="${candidate.code}" style="--hotspot-x:${x}%;--hotspot-y:${y}%" aria-label="查看${candidate.name}"></button>`;
    }).join("");
  }
  sceneHotspots.querySelectorAll(".scene-character-hotspot").forEach((button) => {
    const active = button.dataset.beanCode === bean.code;
    const original = button.dataset.beanCode === originalBean?.code;
    button.classList.toggle("is-active", active);
    button.classList.toggle("is-original", original);
    button.setAttribute("aria-pressed", String(active));
  });
}

function openForestFeedback() {
  document.querySelector("#forest-detail-board")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeForestFeedback() {
  document.querySelector("#forest-feedback-sheet").hidden = true;
  document.body.style.overflow = "";
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
  renderWorldRoster(bean);
  renderBeanRelations(bean);
  renderInteractiveMap(bean);
  renderForestResult(bean);
}

function renderWorldRoster(currentBean) {
  const roster = beans.filter((bean) => bean.code !== currentBean.code);
  roster.splice(9, 0, currentBean);
  const rosterMarkup = roster.map((bean) => `
    <button class="world-bean ${bean.code === currentBean.code ? "is-current" : ""}" type="button" data-bean-code="${bean.code}">
      <img src="assets/bean-${bean.image}.png" alt="${bean.name} ${bean.code}" />
      <strong>${bean.name}</strong><small>${bean.code}</small>
      ${bean.code === currentBean.code ? "<span>当前</span>" : ""}
    </button>
  `).join("");
  document.querySelectorAll("#world-roster, #forest-roster").forEach((rosterElement) => {
    rosterElement.innerHTML = rosterMarkup;
    rosterElement.querySelectorAll(".world-bean").forEach((button) => {
      button.addEventListener("click", () => browseBean(button.dataset.beanCode));
    });
  });
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
  return `${bean.drink}是你的豆格在春咖咖里的杯中化身。推荐表达的是气质联想，不保证每个人一定喜欢；如有忌口、乳糖或咖啡因顾虑，请以实际身体需求为先。`;
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

function openShareCard() {
  if (!state.result || !els.shareCardModal) return;
  const bean = state.result;
  const imagePath = SHARE_CARD_IMAGES[bean.code];
  els.shareCardPreview.src = imagePath;
  els.shareCardPreview.alt = `${bean.name} ${bean.code} CBTI 豆格身份卡`;
  els.shareCardSubtitle.textContent = `${bean.name} · ${bean.code}`;
  els.shareCardGuide.hidden = true;
  els.shareCardModal.hidden = false;
  document.body.style.overflow = "hidden";
  window.setTimeout(() => els.shareCardModal.querySelector(".share-card-close")?.focus(), 0);
}

function closeShareCard() {
  if (!els.shareCardModal) return;
  closePhotoGuide();
  els.shareCardModal.hidden = true;
  els.shareCardGuide.hidden = true;
  document.body.style.overflow = "";
}

function isWeChatBrowser() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

function isMobileBrowser() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.matchMedia?.("(pointer: coarse)").matches;
}

function openPhotoGuide(mode = "save") {
  if (!state.result || !els.sharePhotoSheet) return;
  const bean = state.result;
  els.sharePhotoPreview.src = SHARE_CARD_IMAGES[bean.code];
  els.sharePhotoPreview.alt = `${bean.name} ${bean.code} CBTI 身份卡，可长按保存到相册`;
  if (mode === "moments") {
    els.sharePhotoTitle.textContent = "长按保存，再用身份卡图片发朋友圈";
    els.sharePhotoCopy.textContent = "朋友圈会显示完整人格卡片；卡片二维码仍可进入测试。";
  } else if (mode === "share") {
    els.sharePhotoTitle.textContent = "长按保存，再把身份卡图片发给朋友";
    els.sharePhotoCopy.textContent = "保存后可直接把这张图片发送给微信朋友或群聊。";
  } else {
    els.sharePhotoTitle.textContent = "长按身份卡，保存到手机相册";
    els.sharePhotoCopy.textContent = "这是标准 JPG 图片，长按后选择“保存图片”。";
  }
  els.sharePhotoSheet.hidden = false;
  window.setTimeout(() => els.sharePhotoSheet.querySelector(".share-photo-close")?.focus(), 0);
}

function closePhotoGuide() {
  if (els.sharePhotoSheet) els.sharePhotoSheet.hidden = true;
}

async function fetchShareCard(bean = state.result) {
  if (!bean) throw new Error("No CBTI result");
  const response = await fetch(SHARE_CARD_IMAGES[bean.code]);
  if (!response.ok) throw new Error(`Unable to load share card: ${response.status}`);
  const blob = await response.blob();
  return new File([blob], `CBTI-${bean.code}-${bean.name}-身份卡.jpg`, { type: "image/jpeg" });
}

async function shareImageFile(mode = "share") {
  if (!state.result || !navigator.share) return false;
  const bean = state.result;
  try {
    const file = await fetchShareCard(bean);
    if (navigator.canShare && !navigator.canShare({ files: [file] })) return false;
    const actionText = mode === "moments" ? "我的 CBTI 豆格身份卡" : `我的豆格是「${bean.name} · ${bean.code}」`;
    await navigator.share({
      title: `CBTI ${bean.name}身份卡`,
      text: actionText,
      files: [file],
    });
    trackShare(bean.code, mode === "moments" ? "save" : "share");
    return true;
  } catch (error) {
    if (error?.name === "AbortError") return null;
    return false;
  }
}

async function downloadShareCard() {
  if (!state.result) return;
  const bean = state.result;
  if (isWeChatBrowser()) {
    openPhotoGuide("save");
    return;
  }
  if (isMobileBrowser()) {
    const shared = await shareImageFile("save");
    if (shared === null) return;
    if (shared) {
      showToast("请在系统菜单选择“保存图像/存储到相册”");
      return;
    }
    openPhotoGuide("save");
    return;
  }
  try {
    const file = await fetchShareCard(bean);
    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    trackShare(bean.code, "save");
    showToast("身份卡已开始保存");
  } catch {
    const link = document.createElement("a");
    link.href = SHARE_CARD_IMAGES[bean.code];
    link.download = `CBTI-${bean.code}-${bean.name}-身份卡.jpg`;
    link.click();
    showToast("请长按图片保存身份卡");
  }
}

async function shareCard() {
  if (!state.result) return;
  if (isWeChatBrowser()) {
    openPhotoGuide("share");
    els.shareCardGuide.hidden = false;
    return;
  }
  const shared = await shareImageFile("share");
  if (shared === null || shared) return;
  if (isMobileBrowser()) {
    openPhotoGuide("share");
  } else {
    await downloadShareCard();
    showToast("身份卡图片已保存，可作为图片发送");
  }
}

async function shareMoments() {
  if (!state.result) return;
  if (isWeChatBrowser()) {
    openPhotoGuide("moments");
    els.shareCardGuide.hidden = false;
    return;
  }
  const shared = await shareImageFile("moments");
  if (shared === null || shared) return;
  openPhotoGuide("moments");
  els.shareCardGuide.hidden = false;
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
  if (action === "copy") openShareCard();
  if (action === "close-share-card") closeShareCard();
  if (action === "download-share-card") downloadShareCard();
  if (action === "share-card") shareCard();
  if (action === "share-moments") shareMoments();
  if (action === "close-photo-guide") closePhotoGuide();
  if (action === "wechat-share-guide") els.shareCardGuide.hidden = !els.shareCardGuide.hidden;
  if (action === "original-result" && state.result) browseBean(state.result.code);
  if (action === "open-forest-feedback") openForestFeedback();
  if (action === "close-forest-feedback") closeForestFeedback();
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
  if (event.key === "Escape" && els.sharePhotoSheet && !els.sharePhotoSheet.hidden) {
    closePhotoGuide();
    return;
  }
  if (event.key === "Escape" && els.shareCardModal && !els.shareCardModal.hidden) {
    closeShareCard();
    return;
  }
  if (event.key === "Escape" && !els.modal.hidden) {
    els.modal.hidden = true;
    document.body.style.overflow = "";
  }
});

buildGallery();
if (!restoreSharedResult()) showScreen("home-screen", false);
