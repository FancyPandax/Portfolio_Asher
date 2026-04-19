document.addEventListener("DOMContentLoaded", () => {

// ============================
// NAVIGATION
// ============================
function openExternal(url) {
  window.open(url, '_blank');
}

function openInternal(url) {
  window.location.href = url;
}

// ============================
// SECOND CANVAS
// ============================
(function () {
  const ffCanvas = document.createElement('canvas');
  document.body.prepend(ffCanvas);
  const ctx = ffCanvas.getContext('2d');

  ffCanvas.style.position = 'fixed';
  ffCanvas.style.top = 0;
  ffCanvas.style.left = 0;
  ffCanvas.style.width = '100%';
  ffCanvas.style.height = '100%';
  ffCanvas.style.zIndex = '-2';
  ffCanvas.style.pointerEvents = 'none';

  function resize() {
    ffCanvas.width = window.innerWidth;
    ffCanvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * ffCanvas.width,
    y: Math.random() * ffCanvas.height,
    radius: Math.random() * 3 + 2,
    speedY: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.8 + 0.5
  }));

  function animate() {
    const sky = ctx.createLinearGradient(0, 0, 0, ffCanvas.height);
    sky.addColorStop(0, '#2c3e50');
    sky.addColorStop(1, '#8e44ad');

    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, ffCanvas.width, ffCanvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.y -= p.speedY;
      if (p.y < 0) p.y = ffCanvas.height;
    });

    requestAnimationFrame(animate);
  }

  animate();
})();

// ============================
// CURSOR EFFECT (UNCHANGED BEHAVIOR)
// ============================
(function () {
  const hand = document.getElementById('cursor-hand');
  const cards = document.querySelectorAll('.card');

  if (!hand || cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const rect = card.getBoundingClientRect();
      const handRect = hand.getBoundingClientRect();

      const offsetX = 20;
      const offsetY = 0;

      hand.style.left = `${rect.left - handRect.width - offsetX + window.scrollX}px`;
      hand.style.top  = `${rect.top + window.scrollY + (rect.height - handRect.height)/2 + offsetY}px`;
      hand.style.opacity = 1;
    });
  });
})();

// ============================
// MODAL SYSTEM (FIXED)
// ============================
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalLink = document.getElementById("modal-link");
const modalClose = document.getElementById("modal-close");

// project data
const projects = {
  rune: {
    title: "Rune Spellcasting System",
    desc: "Gesture-based magic system where players draw shapes to cast spells.",
    link: "https://thefancypandattv.itch.io/rune-gang"
  },
  softbody: {
    title: "Soft-Body Cube Simulation",
    desc: "C++ + Raylib project featuring interactive soft-body physics.",
    link: "https://github.com/FancyPandax/Squishy-Cubes"
  },
  rift: {
    title: "Rift Alignment",
    desc: "Interactive browser game built from scratch.",
    link: "RiftAllignmentGame/rift-alignment-game.html"
  }
};

// OPEN MODAL (GLOBAL FOR HTML ONCLICK)
window.openProject = function(id) {
  const project = projects[id];
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalLink.href = project.link;

  modal.classList.add("show");
};

// CLOSE MODAL
function closeModal() {
  modal.classList.remove("show");
}

modalClose.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

});

window.filterProjects = function(category) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const tags = card.getAttribute('data-tags');

    if (category === 'all') {
      card.style.display = 'block';
      return;
    }

    if (tags && tags.includes(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};