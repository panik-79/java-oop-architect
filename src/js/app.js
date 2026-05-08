import { initSearch } from './search.js';
import { initMemorySim } from './memory-sim.js';
import { initMatrix } from './matrix.js';

const sections = {};
const completedSections = JSON.parse(localStorage.getItem('completedSections') || '[]');

// The ordered list of section IDs matching sidebar navigation order
const sectionOrder = [
  'home',
  'why-oop-exists',
  'classes-objects',
  'constructors',
  'encapsulation',
  'abstraction',
  'inheritance',
  'polymorphism',
  'relationships',
  'access-modifiers',
  'static-keyword',
  'final-keyword',
  'interfaces',
  'abstract-classes',
  'object-class',
  'memory-model',
  'immutability',
  'inner-classes',
  'enums',
  'exception-handling',
  'solid-principles',
  'oop-lld-bridge',
  'oop-design-thinking',
  'memory-simulator',
  'decision-matrix',
  'interview-qa',
  'cheat-sheets',
];

// Section display names for nav buttons
const sectionNames = {
  'home': 'Home',
  'why-oop-exists': 'Why OOP Exists',
  'classes-objects': 'Classes & Objects',
  'constructors': 'Constructors',
  'encapsulation': 'Encapsulation',
  'abstraction': 'Abstraction',
  'inheritance': 'Inheritance',
  'polymorphism': 'Polymorphism',
  'relationships': 'Relationships',
  'access-modifiers': 'Access Modifiers',
  'static-keyword': 'Static Keyword',
  'final-keyword': 'Final Keyword',
  'interfaces': 'Interfaces',
  'abstract-classes': 'Abstract Classes',
  'object-class': 'Object Class',
  'memory-model': 'Memory Model',
  'immutability': 'Immutability',
  'inner-classes': 'Inner Classes',
  'enums': 'Enums',
  'exception-handling': 'Exception Handling',
  'solid-principles': 'SOLID Principles',
  'oop-lld-bridge': 'OOP → LLD Bridge',
  'oop-design-thinking': 'Design Thinking',
  'memory-simulator': 'Memory Simulator',
  'decision-matrix': 'Decision Matrix',
  'interview-qa': 'Interview Q&A',
  'cheat-sheets': 'Quick Review Sheet',
};

let currentSection = 'home';

// Pre-load all content from the content directory using Vite's glob import
const contentFiles = import.meta.glob('../content/*.html', { query: '?raw', eager: true });

for (const path in contentFiles) {
  const name = path.split('/').pop().replace('.html', '');
  sections[name] = contentFiles[path].default || contentFiles[path];
}

export function showSection(id) {
  const mainContent = document.getElementById('mainContent');
  
  let sectionEl = document.getElementById(id);
  
  if (!sectionEl && sections[id]) {
    const temp = document.createElement('div');
    temp.innerHTML = sections[id];
    sectionEl = temp.firstElementChild;
    mainContent.appendChild(sectionEl);
    addCopyButtons(sectionEl);
    
    // Initialize tool logic if it's a tool section
    if (id === 'memory-simulator') initMemorySim();
    if (id === 'decision-matrix') initMatrix();
  }

  // Update visibility
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.home-section').forEach(s => {
    if (id === 'home') s.classList.remove('hidden');
    else s.classList.add('hidden');
  });

  if (id !== 'home' && sectionEl) {
    sectionEl.classList.add('active');
  }

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const clicked = [...document.querySelectorAll('.nav-item')].find(n => n.getAttribute('onclick')?.includes(`'${id}'`));
  if (clicked) clicked.classList.add('active');
  
  currentSection = id;
  
  // Close mobile sidebar if open
  closeSidebar();
  
  // Update bottom nav
  updateBottomNav();
  
  // Update reading time
  updateReadingTime(sectionEl);

  // Update Rank
  updateRank();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addCopyButtons(container) {
  container.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerText = 'Copy';
    btn.onclick = () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = 'Copy', 2000);
      });
    };
    pre.appendChild(btn);
  });
}

export function toggleQA(el) {
  el.classList.toggle('open');
  const ans = el.nextElementSibling;
  ans.classList.toggle('open');
}

// Theme Management
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('i');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  if (themeIcon) updateThemeIcon(themeIcon, savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeIcon) updateThemeIcon(themeIcon, newTheme);
  });
}

function updateThemeIcon(icon, theme) {
  const label = themeToggle.querySelector('span');
  if (theme === 'dark') {
    icon.className = 'ri-moon-line';
    if (label) label.textContent = 'Dark Mode';
  } else {
    icon.className = 'ri-sun-line';
    if (label) label.textContent = 'Light Mode';
  }
}

export function filterNav(val) {
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    const search = val.toLowerCase();
    item.style.display = (val === '' || text.includes(search)) ? '' : 'none';
  });
}

export function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    const progressEl = document.getElementById('progress');
    if (progressEl) {
      progressEl.style.width = (total > 0 ? (scrolled / total * 100) : 0) + '%';
    }
    
    // Show/hide scroll-to-top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      scrollBtn.classList.toggle('visible', scrolled > 400);
    }
  }, { passive: true });
}

// ─── BOTTOM NAV ───
function updateBottomNav() {
  const idx = sectionOrder.indexOf(currentSection);
  const prevId = idx > 0 ? sectionOrder[idx - 1] : null;
  const nextId = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;
  
  const nav = document.getElementById('bottomNav');
  if (!nav) return;
  
  // Previous button
  const prevBtn = nav.querySelector('.bottom-nav-prev');
  if (prevId) {
    prevBtn.classList.remove('hidden');
    prevBtn.querySelector('.bottom-nav-label').textContent = sectionNames[prevId] || prevId;
    prevBtn.onclick = () => showSection(prevId);
  } else {
    prevBtn.classList.add('hidden');
  }
  
  // Next button
  const nextBtn = nav.querySelector('.bottom-nav-next');
  if (nextId) {
    nextBtn.classList.remove('hidden');
    nextBtn.querySelector('.bottom-nav-label').textContent = sectionNames[nextId] || nextId;
    nextBtn.onclick = () => showSection(nextId);
  } else {
    nextBtn.classList.add('hidden');
  }

  // Section counter
  const counter = nav.querySelector('.bottom-nav-counter');
  if (counter) {
    counter.textContent = `${idx + 1} / ${sectionOrder.length}`;
  }
  
  nav.classList.toggle('hidden', currentSection === 'home');
  
  // Add Complete Button
  if (currentSection !== 'home') {
    const isCompleted = completedSections.includes(currentSection);
    
    // Remove old button if it exists anywhere
    const existing = document.querySelector('.complete-btn');
    if (existing) existing.remove();

    const btn = document.createElement('button');
    btn.className = `complete-btn ${isCompleted ? 'completed' : ''} floating-mastery`;
    btn.innerHTML = `<i class="ri-checkbox-circle-line"></i> ${isCompleted ? 'Mastered' : 'Mark as Mastered'}`;
    btn.onclick = () => toggleComplete(currentSection, btn);
    
    // Append to main content or a container
    document.querySelector('.main').appendChild(btn);
  }
}

function toggleComplete(id, btn) {
  const idx = completedSections.indexOf(id);
  if (idx > -1) {
    completedSections.splice(idx, 1);
    btn.classList.remove('completed');
    btn.innerHTML = `<i class="ri-checkbox-circle-line"></i> Mark as Mastered`;
  } else {
    completedSections.push(id);
    btn.classList.add('completed');
    btn.innerHTML = `<i class="ri-checkbox-circle-line"></i> Mastered`;
  }
  localStorage.setItem('completedSections', JSON.stringify(completedSections));
  updateRank();
  updateSidebarMastery();
}

function updateSidebarMastery() {
  const items = document.querySelectorAll('.nav-item');
  items.forEach(item => {
    const sectionId = item.getAttribute('onclick').match(/'([^']+)'/)[1];
    const isCompleted = completedSections.includes(sectionId);
    
    let badge = item.querySelector('.mastery-badge');
    if (isCompleted) {
      if (!badge) {
        badge = document.createElement('i');
        badge.className = 'ri-checkbox-circle-fill mastery-badge';
        item.appendChild(badge);
      }
    } else {
      if (badge) badge.remove();
    }
  });
}

const ranks = [
  { limit: 0, name: 'Junior Dev', color: '#94a3b8' },
  { limit: 5, name: 'Mid-Level Engineer', color: '#10b981' },
  { limit: 12, name: 'Senior Architect', color: '#8b5cf6' },
  { limit: 20, name: 'Distinguished Engineer', color: '#f43f5e' }
];

function updateRank() {
  const count = completedSections.length;
  const total = sectionOrder.length - 1; // excluding home
  const percent = (count / total) * 100;

  const progressFill = document.getElementById('rankProgress');
  const rankValue = document.querySelector('.rank-value');
  
  if (progressFill) progressFill.style.width = `${percent}%`;
  
  if (rankValue) {
    const rank = [...ranks].reverse().find(r => count >= r.limit);
    rankValue.textContent = rank.name;
    rankValue.style.color = rank.color;
  }
}

// ─── READING TIME ───
function updateReadingTime(el) {
  const badge = document.getElementById('readingTime');
  if (!badge) return;
  if (!el || currentSection === 'home') {
    badge.classList.add('hidden');
    return;
  }
  badge.classList.remove('hidden');
  const text = el.innerText || '';
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  badge.textContent = `☕ ${mins} min read`;
}

// ─── KEYBOARD NAV ───
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    // Don't navigate when typing in search
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    const idx = sectionOrder.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < sectionOrder.length - 1) showSection(sectionOrder[idx + 1]);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) showSection(sectionOrder[idx - 1]);
    }
  });
}

// ─── SCROLL TO TOP ───
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── SIDEBAR TOGGLE (mobile) ───
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('sidebar-open');
  document.getElementById('sidebarOverlay').classList.toggle('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('sidebar-open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

// Attach to window for the onclick handlers in HTML
window.showSection = showSection;
window.toggleQA = toggleQA;
window.filterNav = filterNav;
window.scrollToTop = scrollToTop;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

document.addEventListener('DOMContentLoaded', () => {
  try {
    initScrollProgress();
    initKeyboardNav();
    
    // Safety check for mainContent
    if (!document.getElementById('mainContent')) {
      console.error('CRITICAL: mainContent container missing');
    }

    // Show initial section
    showSection('home');
    
    // Init Search
    initSearch(sections);
    
    // Update Rank
    updateRank();

    // Update Sidebar
    updateSidebarMastery();
    
    // Post-boot theme sync
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  } catch (err) {
    console.error('Boot error:', err);
  }
});
