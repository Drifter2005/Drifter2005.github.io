// 音乐播放器初始化
(function() {
  'use strict';

  // APlayer配置
  const aplayer = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    theme: '#74f7d1',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 340,
    lrcType: 3,
    audio: [
      {
        name: '一格格',
        artist: '卫兰',
        url: '/music/一格格 - 卫兰.mp3',
        cover: 'https://via.placeholder.com/300x300?text=一格格',
        lrc: '[00:00]温暖的旋律'
      },
      {
        name: '如果可以 (烟嗓版)',
        artist: '半吨兄弟',
        url: '/music/如果可以 (烟嗓版) - 半吨兄弟.mp3',
        cover: 'https://via.placeholder.com/300x300?text=如果可以',
        lrc: '[00:00]如果可以重来'
      },
      {
        name: '孤独患者',
        artist: '陈奕迅',
        url: '/music/孤独患者 - 陈奕迅.mp3',
        cover: 'https://via.placeholder.com/300x300?text=孤独患者',
        lrc: '[00:00]在孤独中思考'
      },
      {
        name: '小孩',
        artist: '何雨溪',
        url: '/music/小孩 - 何雨溪.mp3',
        cover: 'https://via.placeholder.com/300x300?text=小孩',
        lrc: '[00:00]童心未泯'
      },
      {
        name: '小小的一片云呀 (童年走马灯)',
        artist: '少女泪',
        url: '/music/小小的一片云呀 (童年走马灯) - 少女泪.mp3',
        cover: 'https://via.placeholder.com/300x300?text=童年走马灯',
        lrc: '[00:00]童年的回忆'
      },
      {
        name: '把回忆拼好给你',
        artist: '张妙格',
        url: '/music/把回忆拼好给你 - 张妙格.mp3',
        cover: 'https://via.placeholder.com/300x300?text=把回忆拼好给你',
        lrc: '[00:00]用回忆陪伴你'
      },
      {
        name: '谜',
        artist: '二硕',
        url: '/music/谜 - 二硕.mp3',
        cover: 'https://via.placeholder.com/300x300?text=谜',
        lrc: '[00:00]生活中的谜团'
      }
    ],
    customAudioType: {
      customType: {
        listeningUrl: 'your-custom-listening-url'
      }
    },
    storageName: 'aplayer-settings'
  });

  // 播放器事件监听
  aplayer.on('play', () => {
    document.body.classList.add('music-playing');
  });

  aplayer.on('pause', () => {
    document.body.classList.remove('music-playing');
  });

  aplayer.on('error', () => {
    console.warn('播放器错误：请检查音乐链接');
  });

  // 暴露到全局作用域
  window.aplayer = aplayer;

  console.log('🎵 音乐播放器已加载');
})();
