(function() {
  'use strict';

  class LikeSystem {
    constructor() {
      this.storageKey = 'blog_likes';
      this.init();
    }

    init() {
      this.loadLikes();
      this.attachListeners();
      this.syncDisplay();
    }

    loadLikes() {
      const stored = localStorage.getItem(this.storageKey);
      this.likes = stored ? JSON.parse(stored) : {};
    }

    saveLikes() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.likes));
    }

    attachListeners() {
      document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleLike(btn);
        });
      });

      document.querySelectorAll('.article-inner').forEach(article => {
        if (!article.querySelector('.like-btn')) {
          this.addLikeButton(article);
        }
      });
    }

    addLikeButton(article) {
      const postUrl = article.querySelector('a[href]')?.href || window.location.pathname;
      const likeCount = this.likes[postUrl] || 0;

      const likeHtml = `
        <div class="article-like">
          <button class="like-btn" data-post="${postUrl}" title="点赞">
            <span class="like-icon">❤️</span>
            <span class="like-count">${likeCount}</span>
          </button>
        </div>
      `;

      const footer = article.querySelector('.article-footer') || article.querySelector('.article-meta');
      if (footer) {
        footer.insertAdjacentHTML('beforeend', likeHtml);
        footer.querySelector('.like-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleLike(e.target.closest('.like-btn'));
        });
      }
    }

    toggleLike(btn) {
      const postUrl = btn.dataset.post;
      const currentCount = this.likes[postUrl] || 0;

      if (btn.classList.contains('liked')) {
        this.likes[postUrl] = currentCount - 1;
        btn.classList.remove('liked');
      } else {
        this.likes[postUrl] = currentCount + 1;
        btn.classList.add('liked');
        this.showLikeAnimation(btn);
      }

      this.saveLikes();
      this.updateDisplay(btn);
    }

    updateDisplay(btn) {
      const postUrl = btn.dataset.post;
      const count = this.likes[postUrl] || 0;
      const countSpan = btn.querySelector('.like-count');
      if (countSpan) {
        countSpan.textContent = count;
      }
    }

    syncDisplay() {
      document.querySelectorAll('.like-btn').forEach(btn => {
        const postUrl = btn.dataset.post;
        const count = this.likes[postUrl] || 0;
        const countSpan = btn.querySelector('.like-count');
        if (countSpan) {
          countSpan.textContent = count;
        }
        if (count > 0) {
          btn.classList.add('has-likes');
        }
      });
    }

    showLikeAnimation(btn) {
      btn.style.animation = 'none';
      setTimeout(() => {
        btn.style.animation = 'likeHeartBeat 0.6s ease-out';
      }, 10);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new LikeSystem();
    });
  } else {
    new LikeSystem();
  }
})();
