'use strict';

/**
 * MASTERPIECE CONFIGURATION
 */
const MESSAGES = [
    "لقد فعلتها! عبر كل التحديات، أثبتّ أنك الأفضل. العالم ينتظرك. 🎓",
    "اليوم نغلق فصلاً رائعاً لنبدأ كتابة قصة نجاحك الكبرى. فخورون بك! ✨",
    "شهادتك ليست مجرد ورقة، بل هي جواز مرورك نحو أحلامك اللامحدودة. 🚀",
    "نجم جديد يسطع في سماء دفعة 2026. أنت فخرنا الحقيقي. 🌟"
];

// State Management
let uploadedImage = null;
let isAudioPlaying = false;

// DOM Selectors
const select = (id) => document.getElementById(id);
const audio = select('bg-music');
const audioIcon = select('audio-icon');

/**
 * 1. LOADING SCREEN
 */
window.addEventListener('load', () => {
    const loader = select('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.style.display = 'none', 800);
    }, 1500);
});

/**
 * 2. IMAGE UPLOAD LOGIC
 */
const handleUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        select('preview-img').src = uploadedImage;
        select('upload-placeholder').classList.add('hidden');
        select('upload-preview').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
};

select('upload-zone').addEventListener('click', () => select('photo-input').click());
select('photo-input').addEventListener('change', (e) => handleUpload(e.target.files[0]));

select('remove-photo').addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedImage = null;
    select('upload-placeholder').classList.remove('hidden');
    select('upload-preview').classList.add('hidden');
});

/**
 * 3. CELEBRATION ENGINE
 */
function startCelebration() {
    const nameInput = select('student-name');
    const name = nameInput.value.trim();

    if (!name) {
        select('name-error').classList.remove('hidden');
        nameInput.focus();
        return;
    }

    // Prepare Card
    select('cel-name').textContent = name;
    select('cel-message').textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    select('cel-photo').src = uploadedImage || generateFallbackAvatar(name);

    // Transition
    select('input-section').style.opacity = '0';
    setTimeout(() => {
        select('input-section').classList.add('hidden');
        const celSec = select('celebration-section');
        celSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        triggerConfetti();
    }, 400);
}

/**
 * 4. DOWNLOAD FEATURE (High Resolution)
 */
async function downloadMemory() {
    const btn = select('download-btn');
    btn.innerHTML = "جاري التحميل...";
    
    const canvas = await html2canvas(select('celebration-card'), {
        backgroundColor: '#080810',
        scale: 3, // High Res
        useCORS: true,
        borderRadius: 20
    });

    const link = document.createElement('a');
    link.download = `Graduation-2026-${select('cel-name').textContent}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.innerHTML = "تحميل الذكرى";
}

// Audio Toggle
select('audio-toggle').addEventListener('click', () => {
    if (!isAudioPlaying) {
        audio.play();
        audioIcon.textContent = '❚❚';
    } else {
        audio.pause();
        audioIcon.textContent = '♪';
    }
    isAudioPlaying = !isAudioPlaying;
});

function scrollToInput() {
    select('input-section').scrollIntoView({ behavior: 'smooth' });
}

function resetExperience() {
    location.reload();
}

/**
 * UTILS: Confetti & Avatar
 */
function triggerConfetti() {
    const colors = ['#c9a84c', '#ffffff', '#f0d080'];
    const container = select('confetti-container');
    for (let i = 0; i < 100; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute; left: ${Math.random()*100}%; top: -10%;
            width: ${Math.random()*10+5}px; height: ${Math.random()*10+5}px;
            background: ${colors[Math.floor(Math.random()*colors.length)]};
            opacity: ${Math.random()}; border-radius: 50%;
            animation: fall ${Math.random()*3+2}s linear forwards;
        `;
        container.appendChild(p);
    }
}

function generateFallbackAvatar(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 200; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0,0,200,200);
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 80px Tajawal';
    ctx.textAlign = 'center';
    ctx.fillText(name.charAt(0).toUpperCase(), 100, 130);
    return canvas.toDataURL();
}

// Particle Engine (Simple)
const canvas = select('particles-canvas');
const ctx = canvas.getContext('2d');
let w, h;
const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
window.addEventListener('resize', resize);
resize();

const particles = Array(60).fill().map(() => ({
    x: Math.random() * w, y: Math.random() * h,
    s: Math.random() * 2, v: Math.random() * 0.5
}));

function draw() {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(201,168,76,0.3)';
    particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
        p.y -= p.v; if (p.y < 0) p.y = h;
    });
    requestAnimationFrame(draw);
}
draw();
