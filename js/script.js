// =========================================================
// ICONS
// =========================================================

if (window.lucide) {
  lucide.createIcons();
}

// =========================================================
// GSAP ANIMATIONS
// =========================================================

window.onload = () => {
  // Hero Elements Reveal
  gsap.to(".hero-text", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Glass Cards Scroll Reveal
  gsap.utils.toArray(".glass-card:not(nav)").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Section Titles Scroll Reveal
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  // Dynamic Metric Counters
  const counters = document.querySelectorAll(".metric-counter");

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));

    const suffix = counter.getAttribute("data-suffix") || "";

    const counterObj = {
      val: 0,
    };

    gsap.to(counterObj, {
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
        toggleActions: "play none none none",
      },

      val: target,
      duration: 2.5,
      ease: "power3.out",

      onUpdate: function () {
        counter.innerHTML = Math.round(counterObj.val) + suffix;
      },
    });
  });
};

// =========================================================
// THEME TOGGLE
// =========================================================

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    // Update Theme Icon
    const iconElement = themeBtn.querySelector("i");

    if (isDark) {
      iconElement.setAttribute("data-lucide", "sun");

      iconElement.classList.replace("text-slate-800", "text-yellow-400");
    } else {
      iconElement.setAttribute("data-lucide", "moon");

      iconElement.classList.replace("text-yellow-400", "text-slate-800");
    }

    lucide.createIcons();
  });
}

// =========================================================
// MOBILE NAVIGATION
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    const mobileMenuToggle =
        document.getElementById('mobile-menu-toggle');

    const mobileMenu =
        document.getElementById('mobile-menu');

    const mobileNavLinks =
        document.querySelectorAll('.mobile-nav-link');


    if (!mobileMenuToggle || !mobileMenu) {
        return;
    }


    const setMenuState = (isOpen) => {

        mobileMenu.classList.toggle(
            'is-open',
            isOpen
        );

        mobileMenuToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        mobileMenuToggle.setAttribute(
            'aria-label',
            isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
        );

    };


    mobileMenuToggle.addEventListener(
        'click',
        () => {

            const isOpen =
                mobileMenu.classList.contains('is-open');

            setMenuState(!isOpen);

        }
    );


    /* Close menu after selecting a section */

    mobileNavLinks.forEach((link) => {

        link.addEventListener('click', () => {

            setMenuState(false);

        });

    });

});

// =========================================================
// HERO PROFILE BUTTON
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById("hero-profile-button");

  if (!profileButton) {
    return;
  }

  profileButton.addEventListener("click", () => {
    const isActive = profileButton.classList.toggle("is-active");

    profileButton.setAttribute("aria-pressed", String(isActive));
  });
});

// =========================================================
// SHOW MORE PROJECTS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const showMoreProjectsBtn = document.getElementById("show-more-projects");

  const extraProjects = document.querySelectorAll("[data-project-extra]");

  if (!showMoreProjectsBtn || extraProjects.length === 0) {
    return;
  }

  showMoreProjectsBtn.addEventListener("click", () => {
    const isHidden = extraProjects[0].classList.contains("hidden");

    extraProjects.forEach((project) => {
      project.classList.toggle("hidden", !isHidden);
    });

    const buttonText = showMoreProjectsBtn.querySelector("span");

    if (buttonText) {
      buttonText.textContent = isHidden
        ? "SHOW LESS PROJECTS"
        : "SHOW MORE PROJECTS";
    }

    const icon = showMoreProjectsBtn.querySelector("[data-lucide]");

    if (icon) {
      icon.setAttribute(
        "data-lucide",
        isHidden ? "chevron-up" : "chevron-down",
      );

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  });
});

// =========================================================
// FINAL ICON INITIALIZATION
// =========================================================

window.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// =========================================================
// BACK TO TOP
// =========================================================

// =========================================================
// BACK TO TOP
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    const backToTop =
        document.getElementById('back-to-top');

    if (!backToTop) {
        return;
    }

    const showAfter = 400;

    const updateBackToTop = () => {

        if (window.scrollY > showAfter) {

            backToTop.classList.add('is-visible');

        } else {

            backToTop.classList.remove('is-visible');

        }

    };

    window.addEventListener(
        'scroll',
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    });

});