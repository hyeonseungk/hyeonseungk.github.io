// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .stat-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add typing effect to hero title (optional enhancement)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        heroTitle.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Form validation for contact forms (if any)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#ff5757";
        } else {
          field.style.borderColor = "";
        }
      });

      if (isValid) {
        // Here you would typically send the data to a server
        alert(
          "문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다."
        );
        form.reset();
      } else {
        alert("모든 필수 항목을 입력해주세요.");
      }
    });
  });
});
