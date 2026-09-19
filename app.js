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
  HOLD: "assets/drinks/HOLD.webp", LOL: "assets/drinks/LOL.webp", HUGS: "assets/drinks/HUGS.webp",
  RETRY: "assets/drinks/RETRY.webp", IMOK: "assets/drinks/IMOK.webp", OKOK: "assets/drinks/OKOK.webp",
  YOLO: "assets/drinks/YOLO.webp", LOAD: "assets/drinks/LOAD.webp", IDOL: "assets/drinks/IDOL.webp",
  WHY: "assets/drinks/WHY.webp", SUGR: "assets/drinks/SUGR.webp", SOLO: "assets/drinks/SOLO.webp",
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
    "drink": "人民的咖啡（咖啡香纯粹，清爽提神）",
    "drinkMatch": "你不是没有情绪，只是习惯先把事情处理好，再回头照顾自己的感受。人民的咖啡不靠复杂配料讨好谁，浓缩咖啡、纯净水和冰块把味道留在最清楚的位置；它像你面对生活时的可靠：先把混乱分开，把重要的事稳稳接住。这样的清醒不是冷淡，而是你在替自己和身边的人保留一条可以继续往前走的路。",
    "group": "山屿云川 · 经典咖啡",
    "dairy": false,
    "profile": "rich",
    "target": [
      -1.8,
      -1.7,
      -1.0,
      0.8
    ],
    "tagline": "“事情可以乱，但不能乱到最后还得我返工。”",
    "evidence": "“稳豆”来自你把混乱澄清、把问题排出顺序的处理方式。人民的咖啡只用浓缩咖啡、纯净水与冰块建立清楚骨架，没有多余配料遮盖本味；它像你面对复杂局面时的本能——先去掉噪音，再稳稳留下真正需要处理的部分。",
    "result": "你最有辨识度的能力，是把“怎么办”放在“我好难受”前面。场面越乱，你越会自动寻找优先级、可执行动作和谁能接住哪一块。别人因此把你当作可靠的主心骨，却很少看见你只是把情绪暂存到了后台。在关系里，你不擅长空口安慰，更习惯用解决问题表达在乎；压力过大时，也容易把所有责任一起揽走。稳豆真正需要的，不是一句“别想太多”，而是有人愿意替你接过一项任务，让你也可以短暂失序。",
    "flavor": "无奶无糖、结构清楚，坚果与焦糖风味直接落地。它不靠额外修饰制造存在感，像你一样把可靠、有效和清醒放在第一位。",
    "tags": [
      "经典咖啡",
      "山屿云川",
      "HOLD",
      "豆格"
    ]
  },
  {
    "name": "乐豆",
    "code": "LOL",
    "image": 2,
    "drink": "极边话梅（酸甜生津，果脯回味）",
    "drinkMatch": "你很会把不顺利的事情重新讲一遍，直到它不再只剩下难过。极边话梅先有酸意，随后才慢慢浮出甜和回味，像你面对尴尬、失望和突发状况时的方式：不会假装什么都没发生，但会替这段经历找到一个轻一点的出口。你给别人带来的快乐，并不是因为你从来不痛，而是因为你愿意把痛加工成一句让人重新笑出来的话。",
    "group": "山屿云川 · 极边乌龙特调",
    "dairy": true,
    "profile": "rich",
    "target": [
      0.8,
      1.3,
      1.1,
      1.8
    ],
    "tagline": "“来都来了，别让这场灾难完全白来。”",
    "evidence": "“乐豆”来自你重新命名经历的能力。极边话梅先用乌龙茶托住清香，再让话梅带来鲜明酸甜：酸没有消失，却在回甘里换了一种叙述。它对应你把挫折二次加工后，仍能从中留下笑料、余韵和继续生活的力气。",
    "result": "你不是没有痛感，而是不愿让一件坏事永久垄断自己的叙事权。尴尬刚发生时，你可能和所有人一样难受；过一会儿，大脑便开始寻找其中最荒谬、最值得加工的部分。你经常是群体里让气氛重新流动的人，因此也容易被误解成“不够认真”。其实你比别人更清楚难受是什么，只是选择把它改造成能被讲述的故事。乐豆的独特之处，是笑并非逃避，而是一种把自己从低谷里重新打捞出来的能力。",
    "flavor": "玫瑰花香没有抹掉咖啡的苦，而是让苦拥有更柔和、更有余韵的表达，像你总能从糟糕现场里留下点有用的东西。",
    "tags": [
      "酸甜生津",
      "山屿云川",
      "LOL",
      "豆格"
    ]
  },
  {
    "name": "暖豆",
    "code": "HUGS",
    "image": 3,
    "drink": "初心拿铁（奶香绵密，咖啡顺滑）",
    "drinkMatch": "你常常比别人更早察觉一句话背后的疲惫，也更愿意为对方多做一点。初心拿铁没有把咖啡的苦味完全藏起来，只是用鲜奶把它包住，让靠近变得容易一些；这很像你的温柔：不是替别人否认难处，也不是急着把一切修好，而是告诉对方‘你可以先在这里喘口气’。你给人的安全感，来自理解之后仍然保有分寸。",
    "group": "山屿云川 · 鲜奶咖啡",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.0,
      1.8,
      1.9,
      -0.2
    ],
    "tagline": "“我愿意理解你，但请不要利用我的理解。”",
    "evidence": "“暖豆”来自你让尖锐感受拥有柔软出口的方式。初心拿铁以浓缩咖啡保留真实底色，再由鲜奶带来绵密包裹感；它没有把苦完全藏起来，只是让苦更容易被接近。它像你的温柔：理解真实的难处，同时保留必要的分寸。",
    "result": "你真正敏锐的不是“会安慰人”，而是能听见别人没有说出口的那一部分。语气变短、回复变慢、平时喜欢的东西突然失去兴趣，这些细小变化很难逃过你的感知。你习惯用记住细节、主动询问和实际照顾来维系关系，因此常被当作安全感来源。但长期处在“随时接住别人”的位置，也会让你忘记自己同样需要被照顾。暖豆的成长不是变冷，而是分清陪伴与拯救：可以温柔，但不必替每个人承担全部情绪。",
    "flavor": "蜂蜜的温润清甜和牛奶的包裹感，会柔和咖啡的酸苦，像你有分寸地照顾别人，而不是让世界假装没有苦。",
    "tags": [
      "鲜奶咖啡",
      "山屿云川",
      "HUGS",
      "豆格"
    ]
  },
  {
    "name": "战豆",
    "code": "RETRY",
    "image": 4,
    "drink": "滇红鲜奶茶（滇红醇厚，奶香顺滑）",
    "drinkMatch": "你不是从来不会输，而是不愿意让一次输掉的结果替你定义全部。滇红的醇厚先把底子稳住，鲜奶再把口感拉得顺滑，像你一次次复盘之后的重新出发：保留真正有用的经验，放下已经无法改变的部分，再用更成熟的方式回到现场。你身上的勇气，不是咬牙硬撑，而是知道自己可以带着伤痕继续把事情做完。",
    "group": "山屿云川 · 云南鲜奶茶",
    "dairy": true,
    "profile": "rich",
    "target": [
      -0.8,
      -1.0,
      -0.8,
      1.9
    ],
    "tagline": "“可以暂时打不过，但不能连技能说明都不看。”",
    "evidence": "“战豆”来自你把失败压缩成有效经验、再投入下一轮行动的习惯。滇红鲜奶茶以凤庆滇红打下醇厚底子，再用鲜奶把锋利感磨得顺滑；它像你复盘后的状态——不是原样再来一次，而是保留关键经验，带着更成熟的方式重新上场。",
    "result": "你并非不怕失败，而是不肯让一次失败成为最终版本。别人想尽快忘掉的现场，你会重新调取：哪一步判断错了、哪条信息被忽略、下一轮要换什么参数。你的自尊不只来自“赢”，也来自看见自己确实比上一次更强。这样的你恢复力很高，却也容易把休息误认为退缩，把每次失利都变成必须追回的欠账。战豆需要记住：复盘是为了获得选择，不是为了永远惩罚自己；真正的重启，也包括知道什么时候可以先停一下。",
    "flavor": "咖啡存在感强、比例克制、核心集中。它不像盲目硬冲，更像调整完参数后重新上场的你。",
    "tags": [
      "滇红鲜奶",
      "山屿云川",
      "RETRY",
      "豆格"
    ]
  },
  {
    "name": "硬豆",
    "code": "IMOK",
    "image": 5,
    "drink": "罗望子美式（酸甜醒目，咖啡清爽）",
    "drinkMatch": "你看起来总能把自己照顾好，所以别人很容易忘记，你其实也会在意，也会受伤。罗望子的酸甜很有棱角，美式咖啡又把味道拉回清楚利落的骨架；它像你的边界，先让人看见原则和防线，熟悉之后才会发现里面藏着细腻的回甘。你不是拒绝亲近，只是不愿把柔软交给一个还没有学会珍惜的人。",
    "group": "山屿云川 · 果咖美式",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.0,
      -1.7,
      -1.8,
      -1.7
    ],
    "tagline": "“我可以先认真，但绝不能先被发现。”",
    "evidence": "“硬豆”来自你外在克制、内里丰沛的双层结构。罗望子美式让醒目的酸甜先抵达，再由清爽咖啡撑起利落骨架，入口有棱角，回味却不单薄。它像你的边界：先让人看见原则，只有真正靠近以后，才读得到藏在里面的细腻。",
    "result": "你的情绪不是少，而是权限很高。你可以替人记住重要的日子、默默完成麻烦的事情，却很难直接说“我其实很在意”；受伤时也常用一句“没事”把入口锁上。别人可能觉得你冷、难靠近，熟悉你的人才知道，你只是害怕太早交出软肋。硬豆一旦信任谁，往往比表面更长情；可当边界被反复越过，也会安静地彻底退出。你的独特，不是永远坚硬，而是柔软始终存在，只会交给真正尊重它的人。",
    "flavor": "冷热碰撞、由浓到柔，先碰到防线，熟悉以后才喝到底下那层温柔。你的硬，更像一种保护。",
    "tags": [
      "罗望子美式",
      "山屿云川",
      "IMOK",
      "豆格"
    ]
  },
  {
    "name": "圆豆",
    "code": "OKOK",
    "image": 6,
    "drink": "极边乌龙奶盖茶（乌龙清香，奶盖绵密）",
    "drinkMatch": "你总能听见不同立场背后的那一点合理，也知道一句话怎样说出口才不会让人立刻关上门。极边乌龙的清香和奶盖的绵密各有自己的位置，却能在一杯里彼此托住；像你处理关系的方式，愿意让差异坐到同一张桌边，却不会为了表面的和谐抹掉自己的判断。你的圆融不是没有原则，而是有能力让原则被听见。",
    "group": "山屿云川 · 极边乌龙特调",
    "dairy": true,
    "profile": "rich",
    "target": [
      -1.5,
      0.8,
      1.8,
      1.0
    ],
    "tagline": "“可以都理解，但不代表最后都得听。”",
    "evidence": "“圆豆”来自你协调差异、缓冲冲突又保留边界的能力。极边乌龙保持清爽茶香，绵密奶盖则补上柔和厚度，两种质地彼此托住却没有互相覆盖。它像你的相处方式：让不同立场更容易靠近，不等于为了和谐而抹掉自己的原则。",
    "result": "你很少只看见一方的道理。发生冲突时，你会本能地寻找双方都能听懂的语言，让一句过硬的话换一种不伤人的落点。这并不代表你没有立场，而是你知道关系不必靠输赢维持。别人容易把你的体面误认成好说话，却不知道你心里一直有一张清楚的边界清单：小事可以让，原则不会消失；真正失望时，你甚至不争辩，只会安静撤回信任。圆豆最独特的地方，是能让差异同桌而坐，同时不把自己交出去。",
    "flavor": "浓缩与牛奶彼此融合、接受度高，却仍保留咖啡底色，像你能让不同立场坐到同一张桌上，也不会交出自己的边界。",
    "tags": [
      "乌龙奶盖",
      "山屿云川",
      "OKOK",
      "豆格"
    ]
  },
  {
    "name": "浪豆",
    "code": "YOLO",
    "image": 7,
    "drink": "酸角香水柠檬茶（酸甜明亮，清爽有记忆点）",
    "drinkMatch": "你对生活的感受力很高，一场晚风、一次临时起意，甚至一句恰好说对的话，都可能被你认真收藏。酸角和香水柠檬的酸甜一入口就醒来，清爽得不愿意躲在背景里；它像你对‘值得’的判断，不只看结果，也在意这一刻有没有真正被感受到。你不是不顾后果，只是不愿把人生过成一张只有正确答案的清单。",
    "group": "山屿云川 · 云南果茶",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.9,
      0.3,
      0.7,
      1.5
    ],
    "tagline": "“钱可以再赚，今天的晚霞不负责补拍。”",
    "evidence": "“浪豆”来自你对鲜明体验和不可复制时刻的高响应。酸角与香水柠檬把酸甜和香气同时推到前景，入口明亮、清爽，也很难被忽略。它像你的存在方式：不把感受压成背景音，而是愿意为真正值得记住的瞬间留出位置。",
    "result": "你判断一件事值不值得，常常不是先计算回报，而是问“以后还会不会记得”。你对气氛、场景和不可复制的瞬间格外敏感，愿意为了真正心动的体验临时改计划。别人可能觉得你冲动，其实你并非完全不计后果，只是不愿让人生只剩下正确却无聊的完成项。浪豆的魅力在于对生命有高响应：喜欢就靠近，感动就表达，想去的地方会认真想办法抵达。需要留意的是，别用一时的热烈替代长期选择，让自由也拥有可以返回的方向。",
    "flavor": "香气奔放、果汁感鲜明，每一口都很有“此刻”的存在感，像你愿意把值得记住的当下活得有声有色。",
    "tags": [
      "酸角柠檬",
      "山屿云川",
      "YOLO",
      "豆格"
    ]
  },
  {
    "name": "慢豆",
    "code": "LOAD",
    "image": 8,
    "drink": "雪松蔓越莓冷萃（木质清香，莓果回甘）",
    "drinkMatch": "你不是慢，只是不会把信任交给一场漂亮的开场。雪松的木质感安静而稳定，蔓越莓的果酸则要在冷萃里慢慢展开，像你确认一个人或一段关系的过程：先观察，再靠近，最后才把真正重要的部分放进去。你一旦认定，往往比别人想象得更长情；你需要的不是催促，而是时间一次次证明，对方还在。",
    "group": "山屿云川 · 风味冷萃",
    "dairy": false,
    "profile": "bright",
    "target": [
      -1.7,
      0.4,
      -1.5,
      -1.5
    ],
    "tagline": "“我不是不想熟，我只是想确认熟了以后不会后悔。”",
    "evidence": "“慢豆”来自你先观察、再确认、最后稳定投入的信任路径。雪松蔓越莓冷萃先呈现安静的木质清香，莓果酸甜随后慢慢展开，风味需要时间才能完整显现。它像你的关系节奏：不追求迅速熟络，更看重时间能否证明稳定。",
    "result": "你不是进入关系慢，而是确认关系很认真。热情的开场、漂亮的承诺都不足以让你立刻交出信任，你更在意一个人能否在重复的小事里保持一致。刚认识时，你可能安静得像没有意见；熟悉以后，别人会发现你记得细节、回应稳定，也很少轻易撤回承诺。慢豆容易被误解成冷淡，其实你的投入成本很高，所以更谨慎选择长期名单。压力来临时，你习惯独自消化，偶尔也需要告诉重要的人：你的沉默是在加载，不是准备离开。",
    "flavor": "风味干净、层次逐步展开，越往后越能喝到稳定回甘，像你的关系慢热，却很少敷衍。",
    "tags": [
      "雪松蔓越莓",
      "山屿云川",
      "LOAD",
      "豆格"
    ]
  },
  {
    "name": "爱豆",
    "code": "IDOL",
    "image": 9,
    "drink": "茉莉鲜奶茶（茉莉清香，奶香顺滑）",
    "drinkMatch": "你对美好有自己的辨认方式。茉莉的香气很轻，却需要恰好的温度和比例才能被认真喝见；它像你对生活和关系的期待，不是要求所有事情都完美，而是希望那些珍贵的部分不要总靠委屈自己来换取。你愿意欣赏别人，也愿意把自己照顾得体面，因为你知道，被认真对待不是奢侈，而是一段关系应该有的基本温度。",
    "group": "山屿云川 · 鲜奶茶",
    "dairy": false,
    "profile": "bright",
    "target": [
      0.3,
      1.0,
      -0.8,
      -0.8
    ],
    "tagline": "“别人爱不爱我不稳定，我这里必须长期供应。”",
    "evidence": "“爱豆”来自你对自我价值、审美和环境质量的重视。茉莉鲜奶茶用清雅花香与顺滑鲜奶构成细腻平衡，任何一部分过重都会失去原本的体面。它像你对关系和生活的要求：真正好的部分应当被认真呈现，不该依靠长期委屈换取表达。",
    "result": "你对“值得”这件事有自己的标准。无论关系、工作还是生活环境，你都不愿长期待在只消耗、不尊重也没有成长的位置。这不是自恋，而是你知道自己的精力有限，应该投向能够产生回应和意义的地方。你愿意欣赏别人，也乐于认真经营自己；但当外界持续贬低你的感受时，你会迅速收回投入。爱豆容易被误解成挑剔或难取悦，其实你只是拒绝把委屈当作诚意。你的功课，是把标准说出来，而不是等别人猜到以后才决定失望。",
    "flavor": "香气清雅、标准细致，不靠长期委屈换取表现。你不是难以取悦，只是知道真正好的状态需要被认真对待。",
    "tags": [
      "茉莉鲜奶",
      "山屿云川",
      "IDOL",
      "豆格"
    ]
  },
  {
    "name": "反骨豆",
    "code": "WHY",
    "image": 10,
    "drink": "荆芥冷萃（清爽草本，冷冽回甘）",
    "drinkMatch": "你很难对一个明显不合理的答案假装满意。荆芥的草本感不走熟悉的甜香路线，冷萃却让它保持清爽、干净，不会为了特别而特别；这像你的反骨：你提出问题，不是为了把一切推倒，而是因为你真的相信还有更好的解法。你让人重新思考，也让旧规则有机会被改成更适合现在的样子。",
    "group": "山屿云川 · 草本冷萃",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.8,
      -1.7,
      -0.7,
      1.1
    ],
    "tagline": "“我可以先照做，但你最好祈祷我没发现更好的办法。”",
    "evidence": "“反骨豆”来自你不接受默认答案、愿意重写旧结构的思维方式。荆芥把少见的草本气息带进冷萃咖啡，改变熟悉表达的同时仍保持清爽与回甘。它像你的质疑：不是为了破坏秩序，而是想证明旧答案之外还有能成立的新解法。",
    "result": "你不是为了显得不同才反对，而是很难假装没看见系统里的漏洞。“大家一直都这样”对你不是答案，只会引出更多问题：为什么、凭什么、有没有更合理的做法。你的质疑通常带着行动冲动，看见不对劲时，会忍不住重新设计一套规则。别人可能觉得你难管、爱抬杠，却忽略你真正反感的是没有逻辑的服从。反骨豆的稀有之处，是不满往往自带方案；只是压力过大时，也要小心把所有相处都变成辩论，给直觉和情感留下不必证明的空间。",
    "flavor": "它不是为了猎奇而不同，而是在旧结构里提出一种有地域性、也能够成立的新解法，像你的质疑通常带着方案。",
    "tags": [
      "荆芥冷萃",
      "山屿云川",
      "WHY",
      "豆格"
    ]
  },
  {
    "name": "糖豆",
    "code": "SUGR",
    "image": 11,
    "drink": "玫瑰普洱奶盖茶（玫瑰馥郁，奶盖醇厚）",
    "drinkMatch": "你不是看不见生活的辛苦，只是不愿让辛苦占满全部的空间。玫瑰的香气先把心情提亮，普洱的醇厚把底子稳住，奶盖则像给平凡的一天加上一层柔软的奖励。你总能发现值得庆祝的小事，也愿意把这点甜分给身边的人。你带来的快乐不是轻飘飘的热闹，而是一种很实际的提醒：今天已经够辛苦了，我们可以对自己好一点。",
    "group": "山屿云川 · 普洱奶盖茶",
    "dairy": true,
    "profile": "bright",
    "target": [
      1.0,
      1.7,
      1.8,
      1.7
    ],
    "tagline": "“今天不一定顺利，但不能一点甜头都不给我。”",
    "evidence": "“糖豆”来自你主动制造快乐、把小事变成庆祝的能力。玫瑰香气、醇厚普洱与绵密奶盖叠成丰富层次，让普通的一杯拥有更鲜明的奖励感。它像你的快乐方式：不是等待好心情降临，而是愿意给平凡日子亲手加上一层亮色。",
    "result": "你不是看不见烦恼，而是不允许烦恼在生活里无限续杯。发现好吃的店、好笑的事情或值得庆祝的小进展，你会很自然地想分享给身边的人。你擅长给普通日子增加仪式感，也是群体里让快乐被看见、被放大的那一个。糖豆的明亮并不等于天真，它更像一种主动选择：世界已经够沉重，所以你愿意亲手制造一点甜。需要被理解的是，持续负责热闹也会累；当你突然安静时，不代表快乐消失，只是扩音器也需要暂时充电。",
    "flavor": "苹果清甜、咸甜奶盖和咖啡层层出现，让普通的一杯变成一次小型庆祝，像你总想亲手再给今天加一点快乐。",
    "tags": [
      "玫瑰普洱",
      "山屿云川",
      "SUGR",
      "豆格"
    ]
  },
  {
    "name": "独豆",
    "code": "SOLO",
    "image": 12,
    "drink": "玫瑰普洱鲜奶茶（玫瑰馥郁，普洱醇香）",
    "drinkMatch": "你不需要一杯所有人都会喜欢的饮品来证明自己的选择。玫瑰的香气、普洱的沉稳和鲜奶的柔和放在一起，并不是最普通的组合，却有一套只属于自己的秩序；它像你对生活的坚持，宁愿少一点迎合，也要让每个部分都保留真实的位置。你并非不需要别人，只是希望靠近你的人，愿意理解你的安静，而不是急着把你改成更容易相处的样子。",
    "group": "山屿云川 · 普洱鲜奶茶",
    "dairy": false,
    "profile": "bright",
    "target": [
      1.7,
      -0.7,
      -1.9,
      -0.8
    ],
    "tagline": "“我不必证明自己特殊，但我必须像我自己。”",
    "evidence": "“独豆”来自你拒绝统一答案、坚持内部逻辑自洽的方式。玫瑰、普洱与鲜奶并非最常见的组合，却能在花香、茶韵与柔和奶感之间形成自己的秩序。它像你的独特：不依靠故意标新立异，只要逻辑成立，就有权保留自己的味道。",
    "result": "你不排斥关系，只是不愿为了被接纳而使用别人的默认设置。比起热闹但浅的来往，你更喜欢少数能够尊重边界、理解沉默的人。你有自己的生活系统、审美偏好和判断路径，独处时反而更容易恢复能量、完成深度思考。别人可能把这种自洽看成难接近，其实你并不需要刻意特殊，只是拒绝用相同证明正常。独豆的课题，是别让独立慢慢变成拒绝帮助：真正属于你的生活，也可以为可信的人保留入口。",
    "flavor": "元素少见却自成体系，不需要通过故意不同证明自己。像你一样，只要逻辑成立，就有权保留自己的味道。",
    "tags": [
      "玫瑰普洱",
      "山屿云川",
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
  document.querySelector("#result-flavor").textContent = bean.drinkMatch;
  const resultDrinkImage = document.querySelector("#result-drink-image");
  resultDrinkImage.src = DRINK_IMAGES[bean.code];
  resultDrinkImage.alt = `${bean.drink} 产品图`;
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
  document.querySelector("#forest-result-flavor").textContent = bean.drinkMatch;
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
  document.querySelector("#detail-board-match").textContent = bean.drinkMatch;
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
  const posterDrinkImage = document.querySelector("#poster-drink-image");
  posterDrinkImage.src = DRINK_IMAGES[bean.code];
  posterDrinkImage.alt = `${bean.drink} 产品图`;

  const mobileImage = document.querySelector("#mobile-result-image");
  mobileImage.src = `assets/bean-${bean.image}.png`;
  mobileImage.alt = `${bean.name} ${bean.code} 人格档案`;
  document.querySelector("#mobile-result-name").textContent = bean.name;
  document.querySelector("#mobile-result-code").textContent = bean.code;
  document.querySelector("#mobile-result-line").textContent = bean.tagline;
  document.querySelector("#mobile-result-drink").textContent = bean.drink;
  document.querySelector("#mobile-result-group").textContent = bean.group;
  document.querySelector("#mobile-flavor-tags").innerHTML = bean.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#mobile-result-flavor").textContent = bean.drinkMatch;
  const mobileDrinkImage = document.querySelector("#mobile-drink-image");
  mobileDrinkImage.src = DRINK_IMAGES[bean.code];
  mobileDrinkImage.alt = `${bean.drink} 产品图`;
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
  return `${bean.drink}是你的豆格在山屿云川里的杯中映照。推荐表达的是气质联想，不保证每个人一定喜欢；如有忌口、乳糖或咖啡因顾虑，请以实际身体需求为先。`;
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

// ============= Admin 后台（URL 加 ?admin=1 进入） =============
(function initAdmin() {
  if (new URLSearchParams(location.search).get("admin") !== "1") return;
  const ADMIN_PW = "cbti2026";
  if (sessionStorage.getItem("cbti_admin_ok") !== "1") {
    const pw = prompt("🔒 CBTI 数据后台 - 输入密码");
    if (pw !== ADMIN_PW) { alert("密码错误"); return; }
    sessionStorage.setItem("cbti_admin_ok", "1");
  }
  // 注入后台 UI
  document.body.innerHTML = `
    <div style="min-height:100vh;background:#0f0f0f;color:#e5e5e5;font-family:system-ui,-apple-system,sans-serif;padding:24px 16px;">
      <div style="max-width:1100px;margin:0 auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="margin:0;font-size:24px;">📊 CBTI 数据后台</h1>
            <p style="margin:4px 0 0;color:#888;font-size:13px;">www.cbtidd.top · 本机数据（实时刷新）</p>
          </div>
          <button id="adm-logout" style="padding:6px 14px;border-radius:6px;border:1px solid #444;background:transparent;color:#aaa;cursor:pointer;font-size:13px;">退出</button>
        </div>
        <div style="background:rgba(217,119,6,0.1);border:1px solid rgba(217,119,6,0.3);border-radius:8px;padding:14px 16px;font-size:13px;color:#fbbf24;margin-bottom:20px;">
          <strong style="color:#fcd34d;">⚠️ 关于数据来源</strong><br>
          当前显示的是<strong>本机浏览器</strong>的访问和操作记录。<br>
          要看真实全站访客数据，推荐接入 <strong>Cloudflare Web Analytics</strong>（免费、无需账号）：
          <a href="https://dash.cloudflare.com/?to=/:account/web-analytics" target="_blank" style="color:#60a5fa;">开通链接</a>，
          拿到 beacon 脚本后粘到 index.html 的 &lt;/body&gt; 前即可。
        </div>
        <div id="adm-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:24px;"></div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="margin:0 0 16px;font-size:16px;">📈 最近 7 天访问趋势（本机）</h2>
          <div style="overflow-x:auto;"><svg id="adm-trend" viewBox="0 0 700 220" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;"></svg></div>
        </div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="margin:0 0 16px;font-size:16px;">🫘 豆格分布（主人格，本机）</h2>
          <div id="adm-beans"></div>
        </div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:20px;">
          <h2 style="margin:0 0 16px;font-size:16px;">🕐 最近 20 条完成记录（本机）</h2>
          <div style="overflow-x:auto;"><table id="adm-tbl" style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead><tr style="border-bottom:1px solid #333;"><th style="text-align:left;padding:8px 10px;color:#888;font-weight:500;">时间</th><th style="text-align:left;padding:8px 10px;color:#888;font-weight:500;">主人格</th><th style="text-align:left;padding:8px 10px;color:#888;font-weight:500;">副风味</th></tr></thead>
            <tbody></tbody></table></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("adm-logout").onclick = () => {
    sessionStorage.removeItem("cbti_admin_ok");
    history.replaceState(null, "", location.pathname);
    location.reload();
  };
  const BEAN_NAMES = {HOLD:'稳豆',LOL:'乐豆',OKOK:'圆豆',WHY:'反骨豆',LOAD:'慢豆',IMOK:'硬豆',IDOL:'爱豆',YOLO:'浪豆',HUGS:'暖豆',SUGR:'糖豆',RETRY:'战豆',SOLO:'独豆'};
  const BEAN_COLORS = {HOLD:'#51745b',LOL:'#e19b45',OKOK:'#c9896b',WHY:'#674f7a',LOAD:'#6d8490',IMOK:'#556171',IDOL:'#c88096',YOLO:'#df755e',HUGS:'#b77d59',SUGR:'#e4a63c',RETRY:'#a94f3f',SOLO:'#4d7476'};
  function render() {
    let stats; try { stats = JSON.parse(localStorage.getItem("cbti_stats_v1")) || {visits:[],completions:[],shares:[],beanCounts:{}}; } catch { stats = {visits:[],completions:[],shares:[],beanCounts:{}}; }
    const today = new Date().toISOString().slice(0,10);
    const tv = stats.visits.filter(v => v.date === today).length;
    const tp = stats.completions.length;
    const ts = stats.shares.length;
    const cr = stats.visits.length > 0 ? ((tp / stats.visits.length) * 100).toFixed(1) : "0.0";
    const sr = tp > 0 ? ((ts / tp) * 100).toFixed(1) : "0.0";
    document.getElementById("adm-grid").innerHTML = `
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-left:4px solid #3b82f6;border-radius:12px;padding:16px;"><div style="color:#888;font-size:12px;">总访问量</div><div style="font-size:28px;font-weight:700;color:#fff;margin:4px 0;">${stats.visits.length}</div><div style="color:#666;font-size:11px;">今日 ${tv}</div></div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-left:4px solid #10b981;border-radius:12px;padding:16px;"><div style="color:#888;font-size:12px;">总完成测试</div><div style="font-size:28px;font-weight:700;color:#fff;margin:4px 0;">${tp}</div><div style="color:#666;font-size:11px;">完成率 ${cr}%</div></div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-left:4px solid #f59e0b;border-radius:12px;padding:16px;"><div style="color:#888;font-size:12px;">总分享点击</div><div style="font-size:28px;font-weight:700;color:#fff;margin:4px 0;">${ts}</div><div style="color:#666;font-size:11px;">分享率 ${sr}%</div></div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-left:4px solid #8b5cf6;border-radius:12px;padding:16px;"><div style="color:#888;font-size:12px;">豆格种类数</div><div style="font-size:28px;font-weight:700;color:#fff;margin:4px 0;">${Object.keys(stats.beanCounts).length}</div><div style="color:#666;font-size:11px;">主人格分布</div></div>
    `;
    // 7 天趋势
    const td = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      td.push({date: ds.slice(5), v: stats.visits.filter(x => x.date === ds).length, c: stats.completions.filter(x => x.date === ds).length, s: stats.shares.filter(x => x.date === ds).length});
    }
    const W=700,H=220,pL=40,pR=10,pT=20,pB=30,cw=W-pL-pR,ch=H-pT-pB;
    const mx = Math.max(1, ...td.flatMap(d => [d.v, d.c, d.s]));
    const xS = cw / Math.max(1, td.length - 1);
    const tX = i => pL + i * xS;
    const tY = v => pT + ch - (v / mx) * ch;
    let svg = "";
    [0,0.25,0.5,0.75,1].forEach(p => {
      const y = pT + ch * p;
      svg += `<line x1="${pL}" y1="${y}" x2="${W-pR}" y2="${y}" stroke="#333" stroke-width="0.5"/><text x="${pL-6}" y="${y+4}" fill="#666" font-size="10" text-anchor="end">${Math.round(mx*(1-p))}</text>`;
    });
    td.forEach((d, i) => { svg += `<text x="${tX(i)}" y="${H-10}" fill="#888" font-size="10" text-anchor="middle">${d.date}</text>`; });
    [["v","#3b82f6","访问"],["c","#10b981","完成"],["s","#f59e0b","分享"]].forEach(([k,col]) => {
      const path = td.map((d,i) => `${i===0?'M':'L'}${tX(i)},${tY(d[k])}`).join(" ");
      svg += `<path d="${path}" stroke="${col}" stroke-width="2" fill="none"/>`;
      td.forEach((d,i) => { svg += `<circle cx="${tX(i)}" cy="${tY(d[k])}" r="3" fill="${col}"/>`; });
    });
    svg += `<g transform="translate(${pL},${pT-6})"><circle cx="0" cy="0" r="4" fill="#3b82f6"/><text x="10" y="4" fill="#bbb" font-size="11">访问</text><circle cx="60" cy="0" r="4" fill="#10b981"/><text x="70" y="4" fill="#bbb" font-size="11">完成</text><circle cx="120" cy="0" r="4" fill="#f59e0b"/><text x="130" y="4" fill="#bbb" font-size="11">分享</text></g>`;
    document.getElementById("adm-trend").innerHTML = svg;
    // 豆格分布
    const entries = Object.entries(stats.beanCounts).sort((a,b) => b[1] - a[1]);
    if (entries.length === 0) {
      document.getElementById("adm-beans").innerHTML = '<p style="color:#666;font-size:13px;">暂无数据，打开 cbtidd.top 走一遍测试，这里就会显示。</p>';
    } else {
      const mx2 = Math.max(...entries.map(e => e[1]));
      document.getElementById("adm-beans").innerHTML = entries.map(([code, count]) => {
        const name = BEAN_NAMES[code] || code;
        const color = BEAN_COLORS[code] || "#666";
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;font-size:12px;"><span style="width:60px;color:#aaa;flex-shrink:0;">${name}</span><div style="flex:1;height:18px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden;"><div style="width:${(count/mx2)*100}%;height:100%;background:${color};border-radius:3px;"></div></div><span style="width:35px;text-align:right;font-weight:600;flex-shrink:0;">${count}</span></div>`;
      }).join("");
    }
    // 最近记录
    const recent = stats.completions.slice(-20).reverse();
    const tbody = document.querySelector("#adm-tbl tbody");
    if (recent.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="color:#666;text-align:center;padding:16px;">暂无数据。打开 cbtidd.top 走一遍测试，这里就会显示。</td></tr>';
    } else {
      tbody.innerHTML = recent.map(r => {
        const t = new Date(r.ts);
        const ts2 = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")} ${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;
        return `<tr style="border-bottom:1px solid #222;"><td style="padding:8px 10px;">${ts2}</td><td style="padding:8px 10px;"><span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${BEAN_COLORS[r.primary]||"#666"};color:#fff;font-size:11px;">${BEAN_NAMES[r.primary]||r.primary} · ${r.primary}</span></td><td style="padding:8px 10px;color:#aaa;">${BEAN_NAMES[r.secondary]||r.secondary} · ${r.secondary}</td></tr>`;
      }).join("");
    }
  }
  render();
})();
