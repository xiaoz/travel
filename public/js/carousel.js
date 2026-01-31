// assets/js/carousel.js
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.hugo-carousel').forEach(container => {
      const slides = container.querySelector('.carousel-slides');
      if (!slides) return;
  
      const slideCount = container.querySelectorAll('.carousel-slide').length;
      let currentIndex = 0;
      let autoPlayTimer = null;
  
      // 初始化：显示第一张
      const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        currentIndex = index;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  
        // 更新指示器
        container.querySelectorAll('.carousel-indicators button').forEach((btn, i) => {
          btn.classList.toggle('active', i === currentIndex);
          btn.style.background = i === currentIndex ? 'white' : 'rgba(255,255,255,0.5)';
        });
      };
  
      const nextSlide = () => goToSlide(currentIndex + 1);
      const prevSlide = () => goToSlide(currentIndex - 1);
  
      // 按钮事件
      container.querySelector('.carousel-next')?.addEventListener('click', nextSlide);
      container.querySelector('.carousel-prev')?.addEventListener('click', prevSlide);
  
      // 指示器事件
      container.querySelectorAll('.carousel-indicators button').forEach((btn, i) => {
        btn.addEventListener('click', () => goToSlide(i));
      });
  
      // 自动播放（如果 data-autoplay="true"）
      const autoplay = container.dataset.autoplay === 'true';
      const interval = parseInt(container.dataset.interval) || 5000;
      if (autoplay) {
        autoPlayTimer = setInterval(nextSlide, interval);
        container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        container.addEventListener('mouseleave', () => {
          autoPlayTimer = setInterval(nextSlide, interval);
        });
      }
  
      // 键盘导航
      container.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      });
  
      // 启动
      goToSlide(0);
    });
  });