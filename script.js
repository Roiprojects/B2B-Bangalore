document.addEventListener('DOMContentLoaded', () => {
  /* ── LOADER ─────────────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('.loader-fill');
  
  if (loader) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      if (loaderFill) loaderFill.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          document.body.style.overflow = 'auto';
        }, 400);
      }
    }, 200);
  }

  /* ── NAVBAR SCROLL ───────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── MOBILE MENU ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ── ACTIVE LINK ON SCROLL ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  });

  /* ── TESTIMONIAL SLIDER ──────────────────────── */
  const track = document.getElementById('testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const nextBtn = document.getElementById('testi-next');
  const prevBtn = document.getElementById('testi-prev');
  const dotsContainer = document.getElementById('testi-dots');

  if (track && cards.length > 0) {
    let currentIndex = 0;
    
    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('testi-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testi-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider();
    });

    // Auto play
    setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
    }, 6000);
  }

  /* ── GALLERY LIGHTBOX ────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  /* ── CONTACT FORM ────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('form-submit-btn');
      if (btn) {
        btn.textContent = 'Sending...';
      }
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;
      
      const waMessage = `*New Enquiry*\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
      const waUrl = `https://wa.me/919043857228?text=${encodeURIComponent(waMessage)}`;
      
      window.open(waUrl, '_blank');
      
      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Send Message 💬';
          btn.disabled = false;
        }
        contactForm.reset();
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      }, 500);
    });
  }

  /* ── SCROLL TOP ──────────────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      if (scrollTopBtn) scrollTopBtn.style.display = 'flex';
    } else {
      if (scrollTopBtn) scrollTopBtn.style.display = 'none';
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── THEME TOGGLE ────────────────────────────── */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      
      // Save preference
      if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
