// 音乐播放器初始化 + 隐藏/显示功能
(function() {
  'use strict';

  // 播放器隐藏状态管理
  const PlayerController = {
    storageKey: 'aplayer-visibility',

    isHidden: function() {
      return localStorage.getItem(this.storageKey) === 'hidden';
    },

    toggle: function() {
      const hidden = this.isHidden();
      if (hidden) {
        this.show();
      } else {
        this.hide();
      }
    },

    hide: function() {
      localStorage.setItem(this.storageKey, 'hidden');
      const aplayer = document.querySelector('.aplayer');
      const toggleBtn = document.querySelector('.aplayer-toggle-btn');
      if (aplayer) {
        aplayer.classList.add('aplayer-hidden');
        if (toggleBtn) toggleBtn.setAttribute('title', '显示播放器');
      }
    },

    show: function() {
      localStorage.setItem(this.storageKey, 'visible');
      const aplayer = document.querySelector('.aplayer');
      const toggleBtn = document.querySelector('.aplayer-toggle-btn');
      if (aplayer) {
        aplayer.classList.remove('aplayer-hidden');
        if (toggleBtn) toggleBtn.setAttribute('title', '隐藏播放器');
      }
    }
  };

  // 等待DOM完全加载
  function initPlayer() {
    const container = document.getElementById('aplayer');
    if (!container) {
      setTimeout(initPlayer, 100);
      return;
    }

    // APlayer配置
    const aplayer = new APlayer({
      container: container,
      fixed: true,
      autoplay: false,
      theme: '#74f7d1',
      loop: 'all',
      order: 'list',
      preload: 'metadata',
      volume: 0.7,
      mutex: true,
      listFolded: false,
      listMaxHeight: 340,
      lrcType: 0,
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

    // 添加隐藏/显示按钮
    setTimeout(() => {
      const aplayerElement = document.querySelector('.aplayer');
      if (aplayerElement && !document.querySelector('.aplayer-toggle-btn')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'aplayer-toggle-btn';
        toggleBtn.innerHTML = '🎵';
        toggleBtn.setAttribute('title', '隐藏播放器');
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          PlayerController.toggle();
        });
        aplayerElement.appendChild(toggleBtn);
      }
    }, 500);

    // 播放器事件监听
    aplayer.on('play', () => {
      document.body.classList.add('music-playing');
    });

    aplayer.on('pause', () => {
      document.body.classList.remove('music-playing');
    });

    aplayer.on('error', (e) => {
      console.error('🎵 播放器错误:', e);
    });

    // 暴露到全局作用域
    window.aplayer = aplayer;
    window.PlayerController = PlayerController;

    console.log('🎵 音乐播放器已加载，共' + aplayer.audio.length + '首歌');

    // 恢复隐藏状态
    if (PlayerController.isHidden()) {
      setTimeout(() => PlayerController.hide(), 600);
    }
  }

  // 页面加载完成后初始化播放器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
})();
