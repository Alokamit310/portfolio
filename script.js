const projects = [
  {
    number: "01",
    category: "research",
    area: "LANGUAGE & UNCERTAINTY",
    title: "Confidence-aware intent classification",
    cover: "Understanding when a classifier should say: outside my scope.",
    description:
      "Compared classical models, recurrent architectures and BERT on imbalanced CLINC150, including out-of-scope detection.",
    tags: ["BERT", "GloVe", "TF-IDF", "OOS detection"],
    contribution:
      "Implemented the technical pipeline, model training and tuning, OOS rejection, ensemble experiments and result analysis.",
    outcome:
      "Reported thresholded BERT results: 90.95% overall test accuracy and 93.21% macro-F1. The weighted BERT + Bi-GRU ensemble reached 92.71% macro-F1 and did not improve over BERT.",
    learning:
      "Test assumptions instead of assuming that complexity helps. Confidence handling and evaluation settings matter alongside classification scores.",
    repo: "Cse440-intent-classification"
  },
  {
    number: "02",
    category: "research",
    area: "BIOLOGICAL SEQUENCES",
    title: "Strand-aware promoter classification",
    cover: "Looking beyond accuracy to examine strand consistency.",
    description:
      "An E. coli Sigma70 promoter study extended from biological and standard k-mer features to canonical reverse-complement-symmetric encoding.",
    tags: ["Canonical k-mers", "SHAP", "SVM", "Random Forest"],
    contribution:
      "Carried out technical implementation and experiments, comparing feature representations and analysing prediction quality and strand consistency.",
    outcome:
      "The extended manuscript reports approximately 82.4% accuracy for canonical Random Forest and 100% reverse-complement consistency across evaluated canonical models. This is an unpublished manuscript.",
    learning:
      "Domain-specific evaluation can expose behaviour hidden by aggregate accuracy. Canonical k-mer encoding is an established technique, not a newly invented method.",
    repo: "E-coli-promoter_canonical-kmer"
  },
  {
    number: "03",
    category: "research",
    area: "MEDICAL IMAGE ANALYSIS",
    title: "Brain tumor segmentation & classification",
    cover: "Two questions: where is the tumor, and what is the image class?",
    description:
      "Explored U-Net and Attention U-Net for segmentation, alongside an encoder-based classifier on the BRISC dataset.",
    tags: ["PyTorch", "U-Net", "Attention U-Net", "OpenCV"],
    contribution:
      "Performed technical work in classification and segmentation, studied and applied U-Net architecture, and analysed model behaviour and outputs.",
    outcome:
      "Evaluated segmentation using Dice, IoU and pixel accuracy, and classification through per-class metrics and confusion matrices. An academic study without clinical validation.",
    learning:
      "Segmentation and classification need different evaluation methods. Visual inspection complements numerical metrics.",
    repo: "Brain-Tumor-Segmentation-Classification"
  },
  {
    number: "04",
    category: "engineering",
    area: "AI & PUBLIC NEEDS",
    title: "Shonkot",
    cover: "Connecting risk information with response and communication.",
    description:
      "A Bangladesh-focused flood-response prototype integrating district risk, weather, hospitals, incidents and authority communication.",
    tags: ["FastAPI", "Random Forest", "React", "MongoDB"],
    contribution:
      "Worked on flood-risk AI, live weather integration, district risk maps and dashboards, automatic updates, emergency broadcasts and broadcast history.",
    outcome:
      "A four-member course prototype with a 64-district map scope. Real-world forecasting reliability, public deployment and social impact have not been established.",
    learning:
      "AI systems also depend on data pipelines, understandable interfaces and coordination between the people using their outputs.",
    repo: "Project_Shongkot_470"
  },
  {
    number: "05",
    category: "engineering",
    area: "INTERACTIVE GRAPHICS",
    title: "SpinStrike 3D",
    cover: "Geometry, motion and interaction—brought together in a game.",
    description:
      "A Python/OpenGL bowling game with shot power, pin interactions, oil zones, obstacles and multiple camera views.",
    tags: ["Python", "OpenGL", "GLUT", "3D graphics"],
    contribution:
      "Collaboratively developed as a CSE423 Computer Graphics project with Sumaiya Akhter Moon.",
    outcome:
      "Runs locally with the required OpenGL/runtime setup. The repository documents controls and dependencies.",
    learning:
      "An interactive application connects transformations, animation, camera positioning and user input in one continuous experience.",
    repo: "SpinStrike-3D"
  }
];

const projectGrid = document.querySelector("#project-grid");

projectGrid.innerHTML = projects.map(project => `
  <article class="project-card reveal" data-category="${project.category}">
    <div class="project-cover">
      <div class="project-cover-top">
        <span>${project.area}</span>
        <span>CASE STUDY ↗</span>
      </div>
      <div class="project-cover-bottom">
        <span>${project.cover}</span>
        <strong class="project-number">${project.number}</strong>
      </div>
    </div>

    <div class="project-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>

      <div class="tags">
        ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      <details class="project-details">
        <summary>
          Contribution, outcomes & learning <span>+</span>
        </summary>

        <h4>My contribution</h4>
        <p>${project.contribution}</p>

        <h4>Outcome & scope</h4>
        <p>${project.outcome}</p>

        <h4>What I take forward</h4>
        <p>${project.learning}</p>
      </details>

      <a class="repository-link"
        href="https://github.com/Alokamit310/${project.repo}"
        target="_blank" rel="noopener">
        Explore repository ↗
      </a>
    </div>
  </article>
`).join("");

// Mobile navigation
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  const open = !navigation.classList.contains("open");
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", event => {
  if (!event.target.closest(".nav")) closeMenu();
});

// Project filters
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    document.querySelectorAll(".project-card").forEach(card => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
    });
  });
});

// Image viewer: native dialog supports Escape and focus containment.
const lightbox = document.querySelector(".lightbox");
let previousFocus = null;

if (lightbox && typeof lightbox.showModal === "function") {
  document.querySelectorAll("[data-lightbox]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      previousFocus = document.activeElement;

      const caption = link.dataset.caption || "";
      const image = lightbox.querySelector("img");

      image.src = link.href;
      image.alt = caption;
      lightbox.querySelector("p").textContent = caption;
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener(
    "click", () => lightbox.close()
  );

  lightbox.addEventListener("click", event => {
    if (event.target !== lightbox) return;

    const bounds = lightbox.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) lightbox.close();
  });

  lightbox.addEventListener("close", () => {
    if (previousFocus) previousFocus.focus();
  });
}

// Scroll progress, scheduled once per animation frame.
const progress = document.querySelector(".scroll-progress");
let scheduled = false;

function updateProgress() {
  const distance =
    document.documentElement.scrollHeight - window.innerHeight;
  const percentage = distance > 0
    ? Math.min(100, Math.max(0, window.scrollY / distance * 100))
    : 0;

  progress.style.width = `${percentage}%`;
  scheduled = false;
}

window.addEventListener("scroll", () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });

window.addEventListener("resize", updateProgress);
updateProgress();

// Entrance animations. Content is always visible without animation.
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window) {
  if (!reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (typeof entry.target.animate === "function") {
          entry.target.animate(
            [
              { opacity: 0, translate: "0 24px" },
              { opacity: 1, translate: "0 0" }
            ],
            {
              duration: 750,
              easing: "cubic-bezier(.22,1,.36,1)"
            }
          );
        }

        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach(element => {
      revealObserver.observe(element);
    });
  }

  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("active", active);

        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });

  document.querySelectorAll("main section[id]").forEach(section => {
    sectionObserver.observe(section);
  });
}