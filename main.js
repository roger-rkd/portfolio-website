/* ============================================
   TYPEWRITER — only AI Engineer roles
   ============================================ */
const roles = [
  'AI Engineer',
  'Applied AI Engineer',
  'Agentic AI Engineer',
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = roles[ri];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

/* ============================================
   NEURAL CANVAS
   ============================================ */
const canvas = document.getElementById('neuralCanvas');
const ctx    = canvas.getContext('2d');
let W, H, nodes = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initNodes() {
  nodes = Array.from({ length: 55 }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r:  Math.random() * 1.5 + 0.8,
  }));
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  const DIST = 140;

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < DIST) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,212,${(1 - d / DIST) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,245,212,0.3)';
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

resize(); initNodes(); draw();
window.addEventListener('resize', () => { resize(); initNodes(); });

/* ============================================
   ORBIT ICON FALLBACK
   Replace any broken CDN images with a text label
   ============================================ */
document.querySelectorAll('.orbit-icon img').forEach(img => {
  img.onerror = function () {
    const label = document.createElement('span');
    label.className = 'orbit-fallback';
    label.textContent = this.alt;
    this.replaceWith(label);
  };
});

/* ============================================
   FLOATING BADGES
   ============================================ */
const badges = [
  'RAG', 'LLM', 'n8n', 'AI Agent', 'LangChain', 'Pinecone',
  'Vector DB', 'GPT-4o', 'Embeddings', 'Fine-Tuning', 'MLOps',
  'LlamaIndex', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform',
  'Ansible', 'AWS', 'GCP', 'Python', 'LoRA', 'QLoRA',
  'Prompt Eng.', 'Semantic Search', 'RLHF', 'Transformer',
  'Anthropic', 'Ollama', 'ChromaDB', 'FAISS', 'LangGraph',
  'AutoGen', 'GenAI', 'OpenAI API', 'Hugging Face',
];

const layer = document.getElementById('floatLayer');

function spawnBadge() {
  const el = document.createElement('div');
  el.className = 'float-badge';
  el.textContent = badges[Math.floor(Math.random() * badges.length)];
  const dur   = 20 + Math.random() * 20;
  const delay = Math.random() * -dur;
  el.style.cssText = `left:${Math.random() * 100}%;bottom:-40px;animation-duration:${dur}s;animation-delay:${delay}s;`;
  layer.appendChild(el);
  setTimeout(() => el.remove(), (dur + Math.abs(delay)) * 1000 + 500);
}

for (let i = 0; i < 30; i++) spawnBadge();
setInterval(spawnBadge, 1400);

/* ============================================
   NAVBAR SCROLL
   ============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ============================================
   ACTIVE NAV ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObs.observe(s));

/* ============================================
   SCROLL REVEAL
   ============================================ */
/* Add reveal class to elements not already marked in HTML */
document.querySelectorAll(
  '.info-card, .skill-group, .contact-item, .about-text, .about-cards, .roles-section, .contact-form-wrap, .cert-card'
).forEach(el => el.classList.add('reveal'));

/* Observe ALL .reveal elements (including those pre-marked in HTML) */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ============================================
   CONTACT FORM
   ============================================ */
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent';
  btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

/* ============================================
   MOBILE MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinksEl.dataset.open === 'true';
  navLinksEl.dataset.open = isOpen ? 'false' : 'true';
  Object.assign(navLinksEl.style, isOpen ? {
    display: '', flexDirection: '', position: '',
    top: '', left: '', right: '', background: '',
    padding: '', borderBottom: '', gap: ''
  } : {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%', left: '0', right: '0',
    background: 'rgba(5,5,8,0.98)',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    gap: '1.2rem',
  });
});
