// Local Website SEO Services - Main JS

document.addEventListener('DOMContentLoaded', function() {

  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');

      // Close other FAQs
      document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
          item.classList.remove('active');
        }
      });

      document.querySelectorAll('.faq-icon').forEach(item => {
        if (item !== icon) {
          item.classList.remove('active');
        }
      });

      // Toggle current FAQ
      answer.classList.toggle('active');
      icon.classList.toggle('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form submission handler (placeholder for all forms)
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Skip if form has data-skip-handler attribute
    if (form.hasAttribute('data-skip-handler')) {
      return;
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log('Form submission (placeholder):', data);

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'alert alert-success';
      successMsg.textContent = 'Thank you! We\'ll be in touch soon.';

      form.insertAdjacentElement('afterend', successMsg);
      form.reset();

      // Remove message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    });
  });

  // Add active class to current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || currentPath.startsWith(linkPath.replace(/\/$/, '')) && linkPath !== '/') {
      link.classList.add('active');
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards and sections (optional enhancement)
  document.querySelectorAll('.card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});

// Utility function to validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Utility function to validate URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Utility function to generate unique ID
function generateID() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
