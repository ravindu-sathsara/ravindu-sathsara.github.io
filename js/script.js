/* PERSONAL SETTINGS: add only your real profile URLs below.
   Leave an empty string to hide that link. WhatsApp example:
   https://wa.me/94702542571 (only if this number uses WhatsApp). */
const SOCIAL_LINKS = {
  facebook: "",
  instagram: "",
  whatsapp: "",
  fiverr: ""
};
const themeButton = document.querySelector('.theme-button');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
let savedTheme;
try { savedTheme = localStorage.getItem('ravindu-theme'); } catch (_) {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('ravindu-theme', theme); } catch (_) {}
});
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
navigation.classList.add('menu-collapsed');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  menu.textContent = expanded ? 'Menu' : 'Close';
  navigation.classList.toggle('menu-collapsed', expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.click(); menu.focus();
  }
});
document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
const profile = document.querySelector('.portrait img');
if (profile) {
  const showPhoto = () => { if (profile.naturalWidth) { profile.hidden = false; document.querySelector('.portrait-initials').hidden = true; } };
  profile.addEventListener('load', showPhoto); showPhoto();
}
const socialContainer = document.querySelector('[data-social-links]');
if (socialContainer) Object.entries(SOCIAL_LINKS).forEach(([name, value]) => {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return;
    const link = document.createElement('a');
    link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.textContent = ({facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',fiverr:'Fiverr'})[name] + ' ↗';
    socialContainer.appendChild(link);
  } catch (_) {}
});
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !message) { document.querySelector('#form-status').textContent = 'Please enter your name and a message.'; return; }
  const subject = encodeURIComponent('Website enquiry from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  window.location.href = 'mailto:ravindusathsara2002@gmail.com?subject=' + subject + '&body=' + body;
  document.querySelector('#form-status').textContent = 'Email draft requested. If your email app did not open, use the email link on this page.';
});

