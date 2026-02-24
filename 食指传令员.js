// ==UserScript==
// @name         食指传令员
// @author       Ulixes
// @version      1.0.1
// @description  使用。获取指令，获取一条随机指令。
// @timestamp    1771955982
// 2026-02-24
// @license      Apache-2
// ==/UserScript==

const ifm = [
    '吞食清道夫15人并纺织面料。',
    '前往图书馆。',
    '屠杀拇指。',
    '9月14日上午10时之前将培根披萨送至8区的丹尼家门口。',
    '5天之内，保持沉默。',
    '问候出门遇见的第1个人，若对方举起右手则挖出对方的心脏，若被无视则挖出自己的心脏。',
    '切下自己的右脚，烤至三成熟后吃掉。（注：无需吃掉骨头）',
    '杀死自己画的画。',
    '制作便当，在下午1点时于11区内的垃圾桶上享用它。',
    '在时针位于7与8之间时制作蛋白酥皮奶油卷筒并一边看电影一边享用它。',
    '和你今天遇到的前五个人中的第5位进行折手指游戏。手指折下去时需要被折断。',
    '将你所遇到的第62个人的指甲修剪整齐。',
    '抚摸5次用四足行走的动物。',
    '通过旋转转盘选出某个被指定的人并朝他扔蛋糕。',
    '吃放置在常温环境下的螃蟹与熟透了的柿子，每样各吃8个。',
    '在屋顶的围栏上大声喊出你所厌恶的人的名字后跳下屋顶。屋顶距离地面的高度无关紧要。',
    '将用餐后余下的碗全部丢弃。',
    '于接受指令后的第二天早上睁开眼睛时便立刻喝下3杯水。',
    '与居住在同一栋楼中的居民们一同进行一场目的地为7区的赛跑比赛。每隔23分钟便测量一次距离，测量距离时与7区相距最远的人将会被淘汰。',
    '在3天内织好一条带有蝴蝶图案的围巾。',
    '随意地拨一通电话，为接电话的人送上新年贺词。',
    '在白色的墙壁上看到绿色。',
    '在你肚子饿时吃添加了洋葱的鸡肉奶酪汉堡。',
    '折39个纸鹤并令它们在屋顶上飞扬。',
    '把首个在职场中大声训斥你的人的耳朵剪掉。',
    '与和自己视线相交了的人打招呼。',
    '立刻回家。有狗在家门前叫过一次后才可以出来。',
    '身着淡绿色的衣物并在三角形的街道上走十步。',
    '请每日睡足八百小时。',
    '请在400000米后右转。',
    '在30分钟内找到一名伴侣，棕色头发为佳。',
    '90小时内挥洒他们的内脏，将房间粉刷一新。',
    '在读完自然常数e之前不要回家。',
    '12月25日19时将家人的内脏挂上圣诞树。（注：有血缘关系的家人）',
    '在2小时内喝下4升血液。',
    '向年龄小于你的人讨要红包。',
    '做一个你上司的老鼠干玩偶并将其摆成大字形放在对方的工位上。',
    '和你的朋友进行一场真心话大冒险游戏，真心话与大冒险必须交替进行，大冒险内容指定为切下一块皮肤。',
    '在路过的第6个十字路口领养一只宠物，并给它取一个五字名。',
    '放飞金智勋。',
    '周六中午12:00在饭店享用一份奶油蘑菇焗饭并光盘。',
    '咬下左耳，将其装裱起来，挂在家门口。',
    '画一幅彩色横插，画完之前不得与别人交流。',
    '戳破所有耳膜，写一首50分钟的交响曲并在剧院指挥它。',
    '在路过的第一个店里买一份冰淇淋。',
    '倒挂在天花板上6小时，保持沉默。',
    '折下你第一个见到的人的肋骨，做成回旋镖并玩耍。',
    '在30分钟内填写完任意一张问卷，在大街上朗读它。',
    '割下4位邻居的五官，用它们拼成一张新脸，戴上它去公司面试。',
    '抽出你的一部分神经做成绳，和一个7岁的孩子进行2场翻花绳游戏。',
    '拆散一对恋人。',
    '将头发染成黑色。',
    '组建一个家庭。',
    '杀死一个吵闹的同事。',
    '用液体勺自杀。',
    '在今天结束前，对遇到的所有人说：“我喜欢你。”',
    '喝下一瓶1升的西梅汁。',
    '给一个H巢的人送一份草莓奶油冰沙馅的饺子。',
    '剪去一只鸟的所有飞羽。',
    '在胸腔内放入一颗新鲜的苹果。',
    '在浴缸里闭气30000分钟。',
    '挖下眼球，并写一份800字的日记。',
    '请穿着西装和拖鞋，嘴叼玫瑰骑三轮车绕最近的商场四圈',
    '请打开音乐软件历史记录里第九首歌并学唱'
];

const memoryDB = {};

function saveData(key, value) {
    memoryDB[key] = value;
}

function loadData(key) {
    return memoryDB[key] || '';
}

let ext = seal.ext.find('Ifm');
if (!ext) {
    ext = seal.ext.new('Ifm', 'Ulixes', '1.0.0');
    seal.ext.register(ext);
}

const cmdIfm = seal.ext.newCmdItemInfo();
cmdIfm.name = '获取指令';
cmdIfm.help = '使用。获取指令，获取一条随机指令。';

cmdIfm.solve = (ctx, msg, cmdArgs) => {
    if (cmdArgs.args.length > 0) {
        seal.replyToSender(ctx, msg, '您似乎不想接收指令？希望这是我的错觉。正确格式：.获取指令');
        return 1; 
    }
    
    const userId = msg.sender.userId;
    const nickname = msg.sender.nickname;
    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `ifm_${userId}`;
    
    let record = loadData(storageKey);
    let lastDate = '';
    let instruction = '';
    
    if (record) {
        const parts = record.split('|');
        if (parts.length === 2) {
            lastDate = parts[0];
            instruction = parts[1];
        }
    }
    
    if (!lastDate || lastDate !== today) {
        const randomIndex = Math.floor(Math.random() * ifm.length);
        instruction = ifm[randomIndex];
        
        saveData(storageKey, `${today}|${instruction}`);
        
        seal.replyToSender(ctx, msg, `致${nickname}：\n${instruction}`);
    } else {
        seal.replyToSender(ctx, msg, `致${nickname}：\n${instruction}`);
    }
    
};

ext.cmdMap['获取指令'] = cmdIfm;

console.log(' 食指传令员插件加载成功！');