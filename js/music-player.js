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
        name: '观测站主题曲',
        artist: 'Drifter Observatory',
        url: 'https://music.example.com/theme.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Observatory',
        lrc: '[00:00]欢迎来到观测站'
      },
      {
        name: '算法之旅',
        artist: 'Coding Journey',
        url: 'https://music.example.com/algorithm.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Algorithm',
        lrc: '[00:00]在代码的星辰中探索'
      },
      {
        name: '深夜编程',
        artist: 'Night Coder',
        url: 'https://music.example.com/night-coding.mp3',
        cover: 'https://via.placeholder.com/300x300?text=NightCode',
        lrc: '[00:00]月光下敲击键盘的声音'
      },
      {
        name: '安全探险',
        artist: 'Security Seeker',
        url: 'https://music.example.com/security.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Security',
        lrc: '[00:00]在漏洞的迷宫中寻找真理'
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
