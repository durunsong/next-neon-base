// 情侣情感轨迹关系图数据
export const coupleMemoriesData = {
  nodes: [
    // 核心情侣节点
    { id: 'couple', label: '我们', x: 0, y: 0, type: 'couple' },

    // 时间节点
    { id: 'meeting', label: '💕 初次相遇', x: -200, y: -100, type: 'memory' },
    { id: 'confession', label: '💌 表白', x: -150, y: 50, type: 'memory' },
    { id: 'firstdate', label: '🍽️ 第一次约会', x: -100, y: -150, type: 'memory' },
    { id: 'relationship', label: '💑 确定关系', x: 0, y: -200, type: 'memory' },
    { id: 'firstkiss', label: '💋 初吻', x: 100, y: -150, type: 'memory' },
    { id: 'travel', label: '✈️ 第一次旅行', x: 150, y: 50, type: 'memory' },
    { id: 'meetparents', label: '👨‍👩‍👧‍👦 见家长', x: 200, y: -100, type: 'memory' },
    { id: 'anniversary', label: '🎂 周年纪念', x: 0, y: 200, type: 'memory' },

    // 情绪节点
    { id: 'happy', label: '😊 快乐时光', x: -250, y: 150, type: 'emotion' },
    { id: 'sad', label: '😢 难过争吵', x: 250, y: 150, type: 'emotion' },
    { id: 'surprise', label: '😍 惊喜感动', x: -150, y: 250, type: 'emotion' },
    { id: 'growth', label: '🌱 共同成长', x: 150, y: 250, type: 'emotion' },

    // 活动节点
    { id: 'movie', label: '🎬 看电影', x: -300, y: 0, type: 'activity' },
    { id: 'dinner', label: '🍕 一起吃饭', x: 300, y: 0, type: 'activity' },
    { id: 'photo', label: '📸 拍照留念', x: 0, y: -300, type: 'activity' },
    { id: 'gift', label: '🎁 互赠礼物', x: 0, y: 300, type: 'activity' },

    // 朋友圈节点
    { id: 'friends', label: '👫 朋友圈', x: -350, y: -200, type: 'social' },
    { id: 'family', label: '👪 家人', x: 350, y: -200, type: 'social' },
  ],
  edges: [
    // 情侣到回忆的连接
    { source: 'couple', target: 'meeting', label: '开始', relation: 'timeline' },
    { source: 'meeting', target: 'confession', label: '勇敢', relation: 'timeline' },
    { source: 'confession', target: 'firstdate', label: '期待', relation: 'timeline' },
    { source: 'firstdate', target: 'relationship', label: '确认', relation: 'timeline' },
    { source: 'relationship', target: 'firstkiss', label: '甜蜜', relation: 'timeline' },
    { source: 'firstkiss', target: 'travel', label: '冒险', relation: 'timeline' },
    { source: 'travel', target: 'meetparents', label: '认真', relation: 'timeline' },
    { source: 'meetparents', target: 'anniversary', label: '承诺', relation: 'timeline' },

    // 情绪连接
    { source: 'couple', target: 'happy', label: '欢乐', relation: 'emotion' },
    { source: 'couple', target: 'sad', label: '磨合', relation: 'emotion' },
    { source: 'couple', target: 'surprise', label: '惊喜', relation: 'emotion' },
    { source: 'couple', target: 'growth', label: '成长', relation: 'emotion' },

    // 活动连接
    { source: 'couple', target: 'movie', label: '娱乐', relation: 'activity' },
    { source: 'couple', target: 'dinner', label: '日常', relation: 'activity' },
    { source: 'couple', target: 'photo', label: '记录', relation: 'activity' },
    { source: 'couple', target: 'gift', label: '表达', relation: 'activity' },

    // 社交连接
    { source: 'couple', target: 'friends', label: '分享', relation: 'social' },
    { source: 'couple', target: 'family', label: '融入', relation: 'social' },

    // 交叉连接（回忆与情绪/活动）
    { source: 'meeting', target: 'happy', label: '美好', relation: 'cross' },
    { source: 'confession', target: 'surprise', label: '感动', relation: 'cross' },
    { source: 'firstdate', target: 'dinner', label: '约会', relation: 'cross' },
    { source: 'travel', target: 'photo', label: '记录', relation: 'cross' },
    { source: 'anniversary', target: 'gift', label: '庆祝', relation: 'cross' },
  ],
};

// 情侣情感流动数据（适用于 G2 时间线）
export const emotionalTimelineData = [
  { date: '2023-01', emotion: '初遇', value: 60, type: '相识' },
  { date: '2023-02', emotion: '心动', value: 75, type: '暧昧' },
  { date: '2023-03', emotion: '表白', value: 85, type: '告白' },
  { date: '2023-04', emotion: '蜜月期', value: 95, type: '热恋' },
  { date: '2023-05', emotion: '磨合', value: 70, type: '调整' },
  { date: '2023-06', emotion: '第一次吵架', value: 30, type: '冲突' },
  { date: '2023-07', emotion: '和好如初', value: 88, type: '和解' },
  { date: '2023-08', emotion: '一起旅行', value: 92, type: '探索' },
  { date: '2023-09', emotion: '见家长', value: 80, type: '认可' },
  { date: '2023-10', emotion: '深度了解', value: 85, type: '深化' },
  { date: '2023-11', emotion: '计划未来', value: 90, type: '规划' },
  { date: '2023-12', emotion: '周年纪念', value: 98, type: '庆祝' },
];

// 情侣活动频次数据
export const activityFrequencyData = [
  { activity: '看电影', frequency: 15, category: '娱乐' },
  { activity: '一起做饭', frequency: 25, category: '日常' },
  { activity: '散步约会', frequency: 30, category: '浪漫' },
  { activity: '旅行出游', frequency: 8, category: '探索' },
  { activity: '拍照留念', frequency: 40, category: '记录' },
  { activity: '互送礼物', frequency: 12, category: '表达' },
  { activity: '深度聊天', frequency: 50, category: '交流' },
  { activity: '一起运动', frequency: 18, category: '健康' },
];

// 情侣互动类型配置
export const interactionTypeColors = {
  timeline: '#ff6b9d', // 时间线 - 粉色
  emotion: '#8b5cf6', // 情绪 - 紫色
  activity: '#06b6d4', // 活动 - 青色
  social: '#10b981', // 社交 - 绿色
  cross: '#f59e0b', // 交叉 - 橙色
};

// 节点类型配置
export const nodeTypeStyles = {
  couple: {
    size: 50,
    color: '#e11d48',
    icon: '💕',
  },
  memory: {
    size: 35,
    color: '#ff6b9d',
    icon: '🎯',
  },
  emotion: {
    size: 30,
    color: '#8b5cf6',
    icon: '💫',
  },
  activity: {
    size: 28,
    color: '#06b6d4',
    icon: '⭐',
  },
  social: {
    size: 32,
    color: '#10b981',
    icon: '🌟',
  },
};
