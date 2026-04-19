document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // CANVAS BACKGROUND
  // ============================

  const canvas = document.createElement('canvas');
  canvas.id = 'ffBackground';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ============================
  // PARTICLES
  // ============================

  const particleCount = 150;

  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 2,
    speedY: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.8 + 0.5
  }));

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.fill();
  }

  function animate() {
    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, '#2c3e50');
    sky.addColorStop(1, '#8e44ad');

    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      drawParticle(p);
      p.y -= p.speedY;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  // ============================
  // CURSOR HAND EFFECT
  // ============================

  const hand = document.getElementById('cursor-hand');
  const cards = document.querySelectorAll('.content article');

  if (!hand || cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const rect = card.getBoundingClientRect();
      const handRect = hand.getBoundingClientRect();

      const offsetX = 60;
      const offsetY = 0;

      hand.style.left = `${rect.left - handRect.width - offsetX}px`;
      hand.style.top = `${rect.top + window.scrollY + (rect.height - handRect.height) / 2 + offsetY}px`;
      hand.style.opacity = 1;
    });

    card.addEventListener('mouseleave', () => {
      hand.style.opacity = 0;
    });
  });

});