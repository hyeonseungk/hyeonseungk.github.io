// Sidebar Navigation Toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Close sidebar when clicking outside (mobile)
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.querySelector(".mobile-menu-toggle");

  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(event.target) &&
    !toggleButton.contains(event.target) &&
    sidebar.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("active");
      }
    });
  });

  // Mobile-specific optimizations
  function handleMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Adjust touch targets for mobile
    if (isMobile) {
      document.body.classList.add("mobile-device");
    } else {
      document.body.classList.remove("mobile-device");
    }

    // Prevent zoom on input focus (iOS)
    if (isMobile) {
      const inputs = document.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.style.fontSize = "16px";
        });
      });
    }

    // Handle orientation change
    window.addEventListener("orientationchange", function () {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    });
  }

  // Initialize mobile optimizations
  handleMobileOptimizations();

  // Re-run on resize
  window.addEventListener("resize", handleMobileOptimizations);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80; // 헤더 높이만큼 오프셋 적용
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
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

  // 현재 섹션에 따른 네비게이션 메뉴 활성화
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const headerOffset = 100; // 헤더 높이 + 여유 공간

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 커리큘럼 탭 전환
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      // 모든 탭 버튼과 컨텐츠의 active 클래스 제거
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // 선택된 탭 버튼과 컨텐츠에 active 클래스 추가
      button.classList.add("active");
      document.getElementById(tab).classList.add("active");
    });
  });

  // Mobile performance optimizations
  function optimizeForMobile() {
    // Lazy loading for images
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));

    // Touch gesture handling
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const sidebar = document.getElementById("sidebar");

      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close sidebar
        if (sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - open sidebar
        if (!sidebar.classList.contains("active") && window.innerWidth <= 768) {
          sidebar.classList.add("active");
        }
      }
    }

    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll("button, .btn, .nav-link");
    buttons.forEach((button) => {
      button.addEventListener("touchend", (e) => {
        e.preventDefault();
        button.click();
      });
    });

    // Optimize scroll performance
    let ticking = false;
    function updateOnScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Add any scroll-based animations here
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", updateOnScroll, { passive: true });
  }

  // Initialize mobile optimizations
  if (window.innerWidth <= 768) {
    optimizeForMobile();
  }

  // Service Worker registration for PWA features
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  // Add loading states for better UX
  function addLoadingStates() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function () {
        this.style.pointerEvents = "none";
        setTimeout(() => {
          this.style.pointerEvents = "auto";
        }, 1000);
      });
    });
  }

  addLoadingStates();
});
