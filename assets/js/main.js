(function () {
  "use strict";

  // System Helpers Selection
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * System Core Loader Setup
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.remove();
        }, 400);
      }, 400);
    });
  }

  /**
   * Typed Animation Engine Configuration
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2500,
      cursorChar: "_",
    });
  }

  /**
   * Global Interactive Modal System Core
   */
  const interactiveCards = select("[data-modal-target]", true);
  const modals = select(".cyber-modal-overlay", true);

  interactiveCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent modal opening inside modal links or direct buttons
      if (e.target.closest(".portfolio-lightbox") || e.target.closest(".btn-cyber-link")) return;

      const targetId = card.getAttribute("data-modal-target");
      const targetModal = select(`#${targetId}`);
      if (targetModal) {
        targetModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Lock global screen scroll
      }
    });
  });

  // Close Mechanism
  modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".close-modal-btn");

    // Close via close button
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    }

    // Close via backdrop hit
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  /**
   * GLightbox Core Engine Deployment
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Scroll Animations Implementation (AOS)
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
