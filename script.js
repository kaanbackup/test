// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Menüde bir linke tıklanınca kapat
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ========== HEADER SCROLL EFEKTİ ==========
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== SCROLL TO TOP ==========
const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SCROLL REVEAL (Intersection Observer) ==========
const revealElements = document.querySelectorAll(
  '.section-title, .about-content, .projects-grid, .skills-content, .contact-content, .about-stats'
);

revealElements.forEach(el => {
  el.classList.add('reveal', 'fade-up');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// Proje kartlarına stagger efektli reveal ekle
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.classList.add('reveal', 'scale-in');
  card.style.transitionDelay = `${index * 0.1}s`;
  revealObserver.observe(card);
});

// İletişim öğelerine reveal ekle
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach((item, index) => {
  item.classList.add('reveal', 'fade-left');
  item.style.transitionDelay = `${index * 0.1}s`;
  revealObserver.observe(item);
});

// Skill gruplarına reveal ekle
const skillGroups = document.querySelectorAll('.skill-group');
skillGroups.forEach((group, index) => {
  group.classList.add('reveal', 'fade-right');
  group.style.transitionDelay = `${index * 0.15}s`;
  revealObserver.observe(group);
});

// ========== SKILL BAR ANİMASYONU (scroll ile) ==========
const skillBars = document.querySelectorAll('.fill');
let barsAnimated = false;

const animateBars = () => {
  if (barsAnimated) return;
  const skillsSection = document.querySelector('.skills');
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    barsAnimated = true;
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 200);
    });
  }
};

window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);

// ========== STAT COUNTER ANİMASYONU ==========
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) return;
  const aboutSection = document.querySelector('.about');
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    statsAnimated = true;
    statNumbers.forEach(stat => {
      const target = stat.textContent;
      const numericValue = parseInt(target.replace(/\D/g, ''));
      const suffix = target.includes('+') ? '+' : '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(eased * numericValue);
        stat.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  }
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ========== İLETİŞİM FORMU ==========
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && input.value.trim() === '') {
      input.style.borderColor = '#ff4d4d';
      input.style.animation = 'shake 0.5s ease';
      input.addEventListener('animationend', () => {
        input.style.animation = '';
      }, { once: true });
      isValid = false;
    } else {
      input.style.borderColor = '#ddd';
    }
  });

  if (isValid) {
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '✓ Gönderildi!';
    btn.style.background = '#28a745';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 2500);
  }
});

// ========== AKTİF MENÜ ÖĞESİNİ VURGULA ==========
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#6c63ff';
    } else {
      a.style.color = '#555';
    }
  });
});
