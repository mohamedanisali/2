/**
 * ═══════════════════════════════════════════════════
 *  GRADUATION CELEBRATION — script.js
 *  Class of 2026
 * ═══════════════════════════════════════════════════
 */

'use strict';

/* ──────────────────────────────────────────────────
   1. STUDENT DATA
   Add or remove students here. If a name matches
   (case-insensitive), the personal message is shown.
   Otherwise a random default message is used.
────────────────────────────────────────────────── */
const STUDENTS = [
  { name: "Mohamed",   message: "You carried this class with grace and fire. The world isn't ready for you — but it's about to find out. ❤️" },
  { name: "Ahmed",     message: "Your quiet brilliance spoke louder than words ever could. Keep shining, always. ✨" },
  { name: "Sara",      message: "You turned every challenge into a stepping stone. Your story is only beginning. 🌟" },
  { name: "Nour",      message: "Light follows you wherever you go. Go illuminate the world. 🌙" },
  { name: "Omar",      message: "From day one you never stopped pushing. That relentless spirit will take you everywhere. 🚀" },
  { name: "Fatima",    message: "The compassion and strength you brought to every room — carry that into every chapter ahead. 💛" },
  { name: "Layla",     message: "Some people are rare. You are one of them. Go write your legend. 🦋" },
  { name: "Karim",     message: "You redefined what it means to show up. The best version of you is still coming. 🎯" },
  { name: "Hana",      message: "Your smile made this journey warmer for everyone. Thank you for being you. 🌸" },
  { name: "Youssef",   message: "The finish line was never the goal — it was the starting line. Now run. 🏆" },
  { name: "Rana",      message: "Fearless, focused, and full of heart. This world needs exactly who you are. 🌺" },
  { name: "Khaled",    message: "You built something rare: a reputation for excellence and kindness. Never stop. ⭐" },
  { name: "Mariam",    message: "Every doubt you overcame is a scar that made you stronger. Wear them proudly. 💪" },
  { name: "Tarek",     message: "The ideas you carry in your mind are worth more than any diploma. Go build them. 💡" },
  { name: "Dina",      message: "You turned 'I can't' into 'watch me'. Keep that energy forever. 🔥" },
];

const DEFAULT_MESSAGES = [
  "You did it. Through every storm, every doubt, every sleepless night — you made it. This is your moment. 🎓",
  "The world gained something extraordinary today — a graduate with your vision, your heart, and your fire. ✨",
  "This diploma doesn't define you. Your courage, your curiosity, your kindness — that's your real degree. 💛",
  "Look back just long enough to appreciate how far you've come. Then run toward everything you've ever dreamed. 🚀",
  "Today you close a chapter, but you hold the pen for every one that comes after. Write something beautiful. 🌟",
];

/* ──────────────────────────────────────────────────
   2. DOM REFERENCES
────────────────────────────────────────────────── */
const loader          = document.getElementById('loader');
const hero            = document.getElementById('hero');
const inputSection    = document.getElementById('inputSection');
const celebrationScreen = document.getElementById('celebrationScreen');

const startBtn        = document.getElementById('startBtn');
const studentNameInput = document.getElementById('studentName');
const nameError       = document.getElementById('nameError');
const celebrateBtn    = document.getElementById('celebrateBtn');
const downloadBtn     = document.getElementById('downloadBtn');
const restartBtn      = document.getElementById('restartBtn');
const musicBtn        = document.getElementById('musicBtn');

const dropZone        = document.getElementById('dropZone');
const photoInput      = document.getElementById('photoInput');
const photoPreview    = document.getElementById('photoPreview');
const previewWrapper  = document.getElementById('previewWrapper');
const dropPlaceholder = document.getElementById('dropPlaceholder');
const removePhoto     = document.getElementById('removePhoto');

const celebrationName    = document.getElementById('celebrationName');
const celebrationMessage = document.getElementById('celebrationMessage');
const celebrationPhoto   = document.getElementById('celebrationPhoto');
const celebrationCard    = document.getElementById('celebrationCard');
const confettiCanvas     = document.getElementById('confettiCanvas');
const particleCanvas     = document.getElementById('particleCanvas');
const bgMusic            = document.getElementById('bgMusic');

/* ──────────────────────────────────────────────────
   3. STATE
────────────────────────────────────────────────── */
let uploadedImageSrc = null;   // base64 data URL
let confettiParticles = [];
let confettiActive = false;
let confettiRaf = null;
let isPlaying = false;
let typingTimeout = null;

/* ──────────────────────────────────────────────────
   4. LOADER — hide after page ready
────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 1400);
});

/* ──────────────────────────────────────────────────
   5. PARTICLE BACKGROUND (hero canvas)
────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = particleCanvas;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.gold = Math.random() > 0.6;
  };

  function initParts() {
    particles = [];
    const count = Math.min(120, Math.floor((W * H) / 10000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(201,168,76,${p.alpha})`
        : `rgba(245,240,232,${p.alpha * 0.5})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initParts();
  draw();
  window.addEventListener('resize', () => { resize(); initParts(); });
})();

/* ──────────────────────────────────────────────────
   6. HERO → INPUT SECTION
────────────────────────────────────────────────── */
startBtn.addEventListener('click', () => {
  inputSection.classList.remove('hidden');
  setTimeout(() => {
    inputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    studentNameInput.focus();
  }, 80);
});

/* ──────────────────────────────────────────────────
   7. IMAGE UPLOAD — drag & drop + file picker
────────────────────────────────────────────────── */

/** Show a preview of the selected file */
function handleFileSelect(file) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 10 * 1024 * 1024) {
    alert('Image is too large. Please choose a file under 10MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageSrc = e.target.result;
    photoPreview.src = uploadedImageSrc;
    dropPlaceholder.classList.add('hidden');
    previewWrapper.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// Click on drop zone → open file picker
dropZone.addEventListener('click', (e) => {
  if (e.target === removePhoto) return;
  photoInput.click();
});
dropZone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') photoInput.click();
});

// File input change
photoInput.addEventListener('change', (e) => {
  handleFileSelect(e.target.files[0]);
});

// Drag events
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFileSelect(e.dataTransfer.files[0]);
});

// Remove photo
removePhoto.addEventListener('click', (e) => {
  e.stopPropagation();
  uploadedImageSrc = null;
  photoPreview.src = '';
  photoInput.value = '';
  previewWrapper.classList.add('hidden');
  dropPlaceholder.classList.remove('hidden');
});

/* ──────────────────────────────────────────────────
   8. VALIDATE & LAUNCH CELEBRATION
────────────────────────────────────────────────── */

/** Find a student's personal message (case-insensitive) */
function findMessage(name) {
  const lower = name.trim().toLowerCase();
  const match = STUDENTS.find(s => s.name.toLowerCase() === lower);
  if (match) return match.message;
  // Partial match — first name only
  const partial = STUDENTS.find(s => lower.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(lower.split(' ')[0]));
  if (partial) return partial.message;
  return DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];
}

celebrateBtn.addEventListener('click', () => {
  const name = studentNameInput.value.trim();

  // Validate name
  if (!name) {
    nameError.classList.remove('hidden');
    studentNameInput.focus();
    return;
  }
  nameError.classList.add('hidden');

  // If no photo, use a placeholder SVG
  const finalPhoto = uploadedImageSrc || generateAvatarSVG(name);
  const message    = findMessage(name);

  showCelebration(name, finalPhoto, message);
});

studentNameInput.addEventListener('input', () => {
  if (studentNameInput.value.trim()) nameError.classList.add('hidden');
});

/* ──────────────────────────────────────────────────
   9. CELEBRATION SCREEN
────────────────────────────────────────────────── */
function showCelebration(name, photoSrc, message) {
  // Populate card
  celebrationPhoto.src = photoSrc;
  celebrationName.textContent = '';
  celebrationMessage.textContent = '';

  // Hide input, show celebration
  inputSection.classList.add('hidden');
  celebrationScreen.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animate name letter by letter
  setTimeout(() => typeName(name), 400);
  // Animate message word by word
  setTimeout(() => typeMessage(message), 900);

  // Fire confetti
  setTimeout(() => startConfetti(), 300);
}

/* ── Typing animation for name ── */
function typeName(name) {
  clearTimeout(typingTimeout);
  celebrationName.textContent = '';
  let i = 0;
  function tick() {
    if (i < name.length) {
      celebrationName.textContent += name[i++];
      typingTimeout = setTimeout(tick, 60);
    }
  }
  tick();
}

/* ── Typing animation for message ── */
function typeMessage(message) {
  celebrationMessage.textContent = '';
  const words = message.split(' ');
  let i = 0;
  function tick() {
    if (i < words.length) {
      celebrationMessage.textContent += (i > 0 ? ' ' : '') + words[i++];
      setTimeout(tick, 70);
    }
  }
  tick();
}

/* ──────────────────────────────────────────────────
   10. CONFETTI SYSTEM
────────────────────────────────────────────────── */
const CONFETTI_COLORS = [
  '#c9a84c', '#f0d080', '#ffffff', '#a04af0',
  '#4af0d0', '#f04a8c', '#ffd700', '#e8e8e8',
];

function createConfettiParticle() {
  return {
    x:       Math.random() * window.innerWidth,
    y:       -20,
    w:       Math.random() * 10 + 4,
    h:       Math.random() * 5 + 2,
    color:   CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    angle:   Math.random() * Math.PI * 2,
    spin:    (Math.random() - 0.5) * 0.3,
    vx:      (Math.random() - 0.5) * 3,
    vy:      Math.random() * 4 + 2,
    opacity: 1,
    type:    Math.random() > 0.7 ? 'circle' : 'rect',
  };
}

function startConfetti() {
  const canvas = confettiCanvas;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  confettiParticles = [];
  for (let i = 0; i < 200; i++) {
    const p = createConfettiParticle();
    p.y = Math.random() * -window.innerHeight; // stagger entry
    confettiParticles.push(p);
  }

  confettiActive = true;

  // Stop spawning after 4s, let existing fall
  setTimeout(() => { confettiActive = false; }, 4000);

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach((p, idx) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();

      // Update
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      p.vy    += 0.08; // gravity

      // Fade out near bottom
      if (p.y > canvas.height * 0.7) {
        p.opacity -= 0.015;
      }
    });

    // Remove dead particles and add new ones while active
    confettiParticles = confettiParticles.filter(p => p.opacity > 0 && p.y < canvas.height + 30);

    if (confettiActive && confettiParticles.length < 200) {
      confettiParticles.push(createConfettiParticle());
    }

    if (confettiParticles.length > 0) {
      confettiRaf = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  cancelAnimationFrame(confettiRaf);
  animateConfetti();
}

window.addEventListener('resize', () => {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

/* ──────────────────────────────────────────────────
   11. DOWNLOAD — capture card as PNG
────────────────────────────────────────────────── */
downloadBtn.addEventListener('click', async () => {
  downloadBtn.textContent = 'Capturing…';
  downloadBtn.disabled = true;

  try {
    const canvas = await html2canvas(celebrationCard, {
      backgroundColor: '#0d0d1a',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = `graduation-${celebrationName.textContent.replace(/\s+/g,'_') || 'memory'}-2026.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Download failed:', err);
    alert('Could not capture the card. Try again or take a screenshot!');
  } finally {
    downloadBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="btn__icon">
        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
      </svg>
      Download Memory`;
    downloadBtn.disabled = false;
  }
});

/* ──────────────────────────────────────────────────
   12. RESTART
────────────────────────────────────────────────── */
restartBtn.addEventListener('click', () => {
  // Stop confetti
  confettiActive = false;
  cancelAnimationFrame(confettiRaf);
  confettiParticles = [];
  confettiCanvas.getContext('2d').clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  // Reset form
  studentNameInput.value = '';
  uploadedImageSrc = null;
  photoPreview.src = '';
  photoInput.value = '';
  previewWrapper.classList.add('hidden');
  dropPlaceholder.classList.remove('hidden');
  nameError.classList.add('hidden');

  // Show input section
  celebrationScreen.classList.add('hidden');
  inputSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => studentNameInput.focus(), 400);
});

/* ──────────────────────────────────────────────────
   13. MUSIC TOGGLE
────────────────────────────────────────────────── */
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.title = 'Play music';
  } else {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      // Autoplay blocked — inform user
      console.info('Music playback requires user interaction.');
    });
    musicBtn.classList.add('playing');
    musicBtn.title = 'Pause music';
  }
  isPlaying = !isPlaying;
});

/* ──────────────────────────────────────────────────
   14. AVATAR FALLBACK (if no photo uploaded)
   Generates a gold-on-dark SVG monogram
────────────────────────────────────────────────── */
function generateAvatarSVG(name) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() || '')
    .join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1a1a2e"/>
          <stop offset="100%" stop-color="#0d0d1a"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#g)"/>
      <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a84c" stroke-width="1" stroke-opacity="0.4"/>
      <text
        x="100" y="100"
        font-family="Georgia, serif"
        font-size="64"
        font-weight="600"
        fill="#c9a84c"
        text-anchor="middle"
        dominant-baseline="central"
        letter-spacing="4"
      >${initials}</text>
    </svg>`;

  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ──────────────────────────────────────────────────
   15. SMOOTH SCROLL for hero CTA
────────────────────────────────────────────────── */
// Keyboard accessibility: Enter on drop-zone
dropZone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    photoInput.click();
  }
});

/* ──────────────────────────────────────────────────
   16. MICRO-INTERACTION — input shimmer on focus
────────────────────────────────────────────────── */
studentNameInput.addEventListener('focus', () => {
  studentNameInput.parentElement.querySelector('.input-glow').style.boxShadow =
    '0 0 30px -5px rgba(201,168,76,0.35)';
});
studentNameInput.addEventListener('blur', () => {
  studentNameInput.parentElement.querySelector('.input-glow').style.boxShadow = '';
});

/* ──────────────────────────────────────────────────
   17. ENTER KEY submits form
────────────────────────────────────────────────── */
studentNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') celebrateBtn.click();
});
