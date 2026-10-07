/**
 * ==============================================================================
 * VEDIKA MANDE - PERSONAL PORTFOLIO INTERACTION ENGINE
 * Vanilla JavaScript (ES6+) for Theme, Navigation, Filter, Form, Modal & Toast
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initSkillsFilter();
  initCopyEmail();
  initContactForm();
  initProjectModal();
  updateCopyrightYear();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Theme + Persistence)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    showToast(`Switched to ${newTheme} mode`);
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle & Auto-Close
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close menu when any nav item is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Section Scroll Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Skills Filterable Tabs
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.25s ease';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Copy Email To Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  const emailToCopy = 'vedikamande14@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyText) copyText.textContent = 'Copied!';
      showToast('Email address copied to clipboard!');

      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy Email';
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      showToast('Unable to copy automatically. Email: ' + emailToCopy);
    }
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Submission Simulation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const submitBtn = document.getElementById('submit-btn');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulating form transmission
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      form.reset();
      showToast('Thank you! Your message has been sent to Vedika Mande.');
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   7. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectData = {
  'student-portal': {
    title: 'Student Registration Portal',
    category: 'Web Application & Database Project',
    duration: 'Academic Project',
    stack: ['Python', 'MongoDB', 'JWT Authentication', 'HTML5', 'CSS3', 'JavaScript'],
    summary: 'A web-based student registration portal built to manage student registrations, CET applications, and enquiry forms with validation and secure login.',
    features: [
      'Created student registration, CET application, and enquiry forms with field validations.',
      'Built an easy-to-navigate admin dashboard to view and manage student records.',
      'Implemented secure user login using JWT authentication.',
      'Designed a responsive interface that works well on desktop and mobile screens.',
      'Stored and managed student records reliably using MongoDB.'
    ],
    architecture: 'Frontend (HTML / CSS / JavaScript) -> Backend Logic (Python) -> Authentication (JWT) -> Database (MongoDB)'
  },
  'career-consultant': {
    title: 'Career Up Placement Consultant',
    category: 'Placement Consultancy Platform & UX Design',
    duration: 'Collaborative Project',
    stack: ['Wix CMS', 'UI/UX Design', 'Content Strategy', 'MS PowerPoint', 'MS Word', 'Client Relations'],
    summary: 'A collaborative placement consultancy website designed to bridge the opportunity gap between university graduates and corporate recruiters.',
    features: [
      'Collaborated within a multidisciplinary team to design user flows for students seeking career guidance and placement opportunities.',
      'Produced comprehensive documentation, structured content blueprints, and site flowcharts using MS Word.',
      'Constructed and delivered the project pitch deck using MS PowerPoint, presenting core capabilities and student engagement strategy.',
      'Strengthened interpersonal skills in cross-functional teamwork, client-ready communication, and iterative design reviews.'
    ],
    architecture: 'Recruiter & Student Personas -> Wireframing & UX Blueprints -> Wix Platform Deployment -> Stakeholder Presentation'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modal || !modalClose || !modalContent) return;

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-secondary); text-transform: uppercase;">${data.category}</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-top: 0.35rem; margin-bottom: 0.5rem; color: var(--text-primary);">${data.title}</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.summary}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.65rem; color: var(--text-primary);">Key Architectural Highlights</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.875rem; line-height: 1.55;">
          ${data.features.map(f => `<li style="display: flex; gap: 0.5rem; align-items: flex-start;"><i class="fa-solid fa-check" style="color: var(--accent-emerald); margin-top: 0.25rem;"></i><span>${f}</span></li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.5rem; padding: 0.85rem; border-radius: var(--radius-sm); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle);">
        <h4 style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">System Flow</h4>
        <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${data.architecture}</p>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 0.9rem; margin-bottom: 0.65rem; color: var(--text-primary);">Technologies Applied</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${data.stack.map(tech => `<span style="font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); background: rgba(99, 102, 241, 0.1); color: var(--accent-primary); border: 1px solid rgba(99, 102, 241, 0.25);">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project');
      openModal(projectId);
    });
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Global Toast Notification Helper
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   9. Dynamic Year in Footer
   -------------------------------------------------------------------------- */
function updateCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
