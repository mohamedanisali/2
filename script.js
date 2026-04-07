'use strict';

/* ──────────────────────────────────────────────────
   1. STUDENT DATA
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
   2. DOM REFERENCES — matched to actual HTML IDs
────────────────────────────────────────────────── */
const loader             = document.getElementById('loader');
const inputSection       = document.getElementById('input-section');
const celebrationSection = document.getElementById('celebration-section');

const studentNameInput   = document.getElementById('student-name');
const nameError          = document.getElementById('name-error');
const photoError         = document.getElementById('photo-error');

const uploadZone         = document.getElementById('upload-zone');
const photoInput         = document.getElementById('photo-input');
const previewImg         = document.getElementById('preview-img');
const uploadPreview      = document.getElementById('upload-preview');
const uploadPlaceholder  = document.getElementById('upload-placeholder');
const removePhotoBtn     = document.getElementById('remove-photo');

const celPhoto           = document.getElementById('cel-photo');
const celName            = document.getElementById('cel-name');
const celMessage         = document.getElementById('cel-message');
const celebrationCard    = document.getElementById('celebration-card');

const particlesCanvas    = document.getElementById('particles-canvas');
const bgMusic            = document.getElementById('bg-music');
const audioToggle        = document.getElementById('audio-toggle');
const audioIcon          = document.getElementById('audio-icon');

/* ──────────────────────────────────────────────────
   3. STATE
────────────────────────────────────────────────── */
let uploadedImageSrc = null;
let isPlaying = false;

/* ──────────────────────────────────────────────────
   4. LOADER
────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.6s';
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }
  }, 1400);
});

/* ──────────────────────────────────────────────────
   5. PARTICLE BACKGROUND
────────────────────────────────────────────────── */
if (particlesCanvas) {
  const ctx = particlesCanvas.getContext('2d');
  let particles = [];
  let W, H;

  function resizeCanvas() {
    W = particlesCanvas.width  = window.innerWidth;
    H = particlesCanvas.height = window.innerHeight;
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.5 + 0.3;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.gold  = Math.random() > 0.6;
  };

  function initParticles() {
    particles = [];
    const count = Math.min(120, Math.floor((W * H) / 10000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawParticles() {
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
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}

/* ──────────────────────────────────────────────────
   6. SCROLL TO INPUT
────────────────────────────────────────────────── */
function scrollToInput() {
  if (inputSection) {
    inputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { if (studentNameInput) studentNameInput.focus(); }, 400);
  }
}

/* ──────────────────────────────────────────────────
   7. IMAGE UPLOAD
────────────────────────────────────────────────── */
function handleFileSelect(file) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 10 * 1024 * 1024) {
    alert('Image is too large. Please choose a file under 10MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageSrc = e.target.result;
    previewImg.src = uploadedImageSrc;
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
    if (uploadPreview)     uploadPreview.style.display = 'block';
    if (photoError)        photoError.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

if (uploadZone) {
  uploadZone.addEventListener('click', (e) => {
    if (e.target === removePhotoBtn) return;
    photoInput.click();
  });
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = '#c9a84c';
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = '';
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = '';
    handleFileSelect(e.dataTransfer.files[0]);
  });
}

if (photoInput) {
  photoInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files[0]);
  });
}

if (removePhotoBtn) {
  removePhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedImageSrc = null;
    if (previewImg)        previewImg.src = '';
    if (photoInput)        photoInput.value = '';
    if (uploadPreview)     uploadPreview.style.display = 'none';
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'flex';
  });
}

/* ──────────────────────────────────────────────────
   8. FIND MESSAGE
────────────────────────────────────────────────── */
function findMessage(name) {
  const lower = name.trim().toLowerCase();
  const match = STUDENTS.find(s => s.name.toLowerCase() === lower);
  if (match) return match.message;
  const partial = STUDENTS.find(s =>
    lower.includes(s.name.toLowerCase()) ||
    s.name.toLowerCase().includes(lower.split(' ')[0])
  );
  if (partial) return partial.message;
  return DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];
}

/* ──────────────────────────────────────────────────
   9. START CELEBRATION — called by onclick in HTML
────────────────────────────────────────────────── */
function startCelebration() {
  const name = studentNameInput ? studentNameInput.value.trim() : '';

  if (!name) {
    if (nameError) nameError.style.display = 'block';
    if (studentNameInput) studentNameInput.focus();
    return;
  }
  if (nameError) nameError.style.display = 'none';
  if (photoError) photoError.style.display = 'none';

  const finalPhoto = uploadedImageSrc || generateAvatarSVG(name);
  const message    = findMessage(name);

  showCelebration(name, finalPhoto, message);
}

/* ──────────────────────────────────────────────────
   10. SHOW CELEBRATION SCREEN
────────────────────────────────────────────────── */
function showCelebration(name, photoSrc, message) {
  if (celPhoto)   celPhoto.src = photoSrc;
  if (celName)    celName.textContent = '';
  if (celMessage) celMessage.textContent = '';

  if (inputSection)       inputSection.style.display = 'none';
  if (celebrationSection) {
    celebrationSection.classList.remove('hidden');
    celebrationSection.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => typeName(name),       400);
  setTimeout(() => typeMessage(message), 900);
  setTimeout(() => startConfetti(),      300);
}

function typeName(name) {
  if (!celName) return;
  celName.textContent = '';
  let i = 0;
  function tick() {
    if (i < name.length) { celName.textContent += name[i++]; setTimeout(tick, 60); }
  }
  tick();
}

function typeMessage(message) {
  if (!celMessage) return;
  celMessage.textContent = '';
  const words = message.split(' ');
  let i = 0;
  function tick() {
    if (i < words.length) {
      celMessage.textContent += (i > 0 ? ' ' : '') + words[i++];
      setTimeout(tick, 70);
    }
  }
  tick();
}

/* ──────────────────────────────────────────────────
   11. CONFETTI
────────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#c9a84c','#f0d080','#ffffff','#a04af0','#4af0d0','#f04a8c','#ffd700'];

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

function startConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      const size = Math.random() * 10 + 5;
      el.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${Math.random() * 100}vw;
        width: ${size}px;
        height: ${size * 0.5}px;
        background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
        pointer-events: none;
        z-index: 9999;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 5500);
    }, i * 30);
  }
}

/* ──────────────────────────────────────────────────
   12. DOWNLOAD — called by onclick in HTML
────────────────────────────────────────────────── */
async function downloadMemory() {
  const btn = document.getElementById('download-btn');
  if (btn) { btn.textContent = 'Capturing…'; btn.disabled = true; }

  try {
    const canvas = await html2canvas(celebrationCard, {
      backgroundColor: '#0d0d1a',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });
    const link = document.createElement('a');
    link.download = `graduation-${(celName ? celName.textContent : 'memory').replace(/\s+/g,'_')}-2026.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    alert('Could not capture the card. Try a screenshot!');
  } finally {
    if (btn) { btn.textContent = '📸 Download My Memory'; btn.disabled = false; }
  }
}

/* ──────────────────────────────────────────────────
   13. RESET — called by onclick in HTML
────────────────────────────────────────────────── */
function resetExperience() {
  uploadedImageSrc = null;
  if (previewImg)        previewImg.src = '';
  if (photoInput)        photoInput.value = '';
  if (uploadPreview)     uploadPreview.style.display = 'none';
  if (uploadPlaceholder) uploadPlaceholder.style.display = 'flex';
  if (studentNameInput)  studentNameInput.value = '';
  if (nameError)         nameError.style.display = 'none';
  if (photoError)        photoError.style.display = 'none';

  const container = document.getElementById('confetti-container');
  if (container) container.innerHTML = '';

  if (celebrationSection) {
    celebrationSection.classList.add('hidden');
    celebrationSection.style.display = 'none';
  }
  if (inputSection) inputSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { if (studentNameInput) studentNameInput.focus(); }, 400);
}

/* ──────────────────────────────────────────────────
   14. MUSIC TOGGLE
────────────────────────────────────────────────── */
if (audioToggle && bgMusic) {
  audioToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      if (audioIcon) audioIcon.textContent = '♪';
      isPlaying = false;
    } else {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {});
      if (audioIcon) audioIcon.textContent = '❚❚';
      isPlaying = true;
    }
  });
}

/* ──────────────────────────────────────────────────
   15. AVATAR FALLBACK
────────────────────────────────────────────────── */
function generateAvatarSVG(name) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() || '').join('');
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
      <text x="100" y="100" font-family="Georgia, serif" font-size="64" font-weight="600"
        fill="#c9a84c" text-anchor="middle" dominant-baseline="central" letter-spacing="4">${initials}</text>
    </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ──────────────────────────────────────────────────
   16. ENTER KEY submits
────────────────────────────────────────────────── */
if (studentNameInput) {
  studentNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startCelebration();
  });
}
