# CBTI 云南咖啡豆人格测试

一个以云南咖啡豆为人格原型的互动测试网站。用户完成 20 道生活情境题后，系统会按照隐藏计分规则、人格曝光上限和决胜规则，生成主人格、副风味及对应的咖啡原型分析。

线上版本：[cbti-yunnan-bean-test.a-msalemariel1386.chatgpt.site](https://cbti-yunnan-bean-test.a-msalemariel1386.chatgpt.site)

## 已实现功能

- 三段式互动开场：拖出飞机、放大寻找咖啡豆、向下拽豆触发坠落动画
- 视频片尾自动揭幕“咖啡豆型人格测试”标题与开始按钮
- 20 道情境题一题一屏翻页、进度显示及返回修改
- 鼠标、触控手势、数字键选择和低动态偏好适配
- 12 种咖啡豆人格隐藏计分
- 按人格曝光上限换算标准分
- 前两名相差不足 5 分时触发价值句决胜题
- 主人格、副风味、同家族双拼或跨风味拼配分析
- 人格优势、风险、咖啡原型、杯中风味及建议喝法
- 结果页打印保存
- PC 端约 1700px 版心及移动端响应式适配

## 技术栈

- React 19
- Next.js 16 API
- Vite 8 + vinext
- TypeScript
- Tailwind CSS 4
- Cloudflare Workers 兼容构建
- pnpm

## 本地运行

### 环境要求

- Node.js `>=22.13.0`
- pnpm

如果电脑尚未安装 pnpm，可以先执行：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

安装依赖并启动：

```bash
pnpm install
pnpm dev
```

终端显示本地地址后，在浏览器中打开即可。

## 构建与检查

```bash
# 生成正式构建
pnpm build

# 运行自动测试（需要先完成构建）
pnpm test

# 构建并测试
pnpm check

# 代码规范检查
pnpm lint
```

## 主要目录

```text
.
├─ app/
│  ├─ components/       # ReactBits 动效改编组件
│  ├─ page.tsx          # 互动开场、题目、计分和人格资料
│  ├─ globals.css       # 全站视觉和响应式样式
│  └─ layout.tsx        # 页面标题与基础布局
├─ public/
│  ├─ media/            # 网页压缩版开场视频与首帧
│  └─ og.png            # 社交分享封面
├─ tests/               # 自动测试
├─ worker/              # Cloudflare Worker 入口
├─ build/               # Sites/Vite 构建支持
├─ .openai/             # 当前 Sites 项目配置
├─ THIRD_PARTY_NOTICES.md
├─ package.json
└─ pnpm-lock.yaml       # 固定依赖版本，请一并提交
```

## 后续替换人物素材

当前咖啡豆人物由 CSS 占位图形呈现。正式拟人化图片到位后，建议放入：

```text
public/characters/
```

例如：

```text
public/characters/hold.webp
public/characters/lol.webp
public/characters/okok.webp
```

图片建议优先使用 WebP，透明背景，单张尽量控制在 500 KB 以内，以保证手机端加载速度。

## 上传到 GitHub

当前目录已经是 Git 仓库，并已有提交记录。先在 GitHub 创建一个空仓库，不要勾选自动生成 README、`.gitignore` 或许可证，然后在本目录执行：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

如果使用 GitHub Desktop，也可以选择“Add Existing Repository”，指向本项目目录后点击“Publish repository”。

## 日常修改与回滚

每完成一批确认无误的修改：

```bash
git add .
git commit -m "说明本次修改内容"
git push
```

查看历史版本：

```bash
git log --oneline
```

临时查看旧版本：

```bash
git switch --detach 某个提交编号
```

返回最新版本：

```bash
git switch main
```

如果要撤销一个已经上传的错误提交，推荐使用可追踪的方式：

```bash
git revert 错误提交编号
git push
```

不要随意使用 `git reset --hard`，以免丢失尚未备份的内容。

## 内容说明

CBTI 是以云南咖啡为媒介的娱乐型人格体验，不属于心理学诊断。杯中风味由品种、产区、成熟度、处理、烘焙和冲煮共同形成，应以实际批次杯测为准。

项目内容、人格文案、题目与角色设定的相关权利归项目方所有。仓库若设为公开，请先确认所有后续加入的字体、图片和人物素材均拥有公开发布授权。
