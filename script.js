'use strict';

const icon = (name, className = '') => `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const arrow = icon('arrow');
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

const services = [
  { name: 'Website Design & Development', icon: 'monitor', color: '', text: 'Modern, responsive websites that look great and help your business grow.', detail: 'Bring your business online with a custom, responsive website. From a simple business site to an online store, we focus on clear design, an effortless user experience and performance on every screen.' },
  { name: 'Web Hosting', icon: 'server', color: 'green', text: 'High-performance hosting for your websites and applications.', detail: 'Choose hosting that fits your next idea. Every plan includes an easy-to-use cPanel control panel, a free SSL certificate and access to expert support.' },
  { name: 'Domain Registration', icon: 'globe', color: '', text: 'Find and register the perfect domain for your business.', detail: 'Give your business a memorable address. Explore popular extensions including .com, .in, .online and .store. Final availability and pricing must be confirmed at registration.' },
  { name: 'SSL Certificates', icon: 'lock', color: '', text: 'Secure your website and build trust with your visitors.', detail: 'Keep connections to your website encrypted with an SSL certificate. Free SSL is included with all hosting plans, helping your visitors browse with confidence.' },
  { name: 'SEO Services', icon: 'chart', color: 'purple', text: 'Improve your visibility and reach more customers.', detail: 'Help the right people discover your business through technical SEO, thoughtful content and on-page improvements. Our approach starts with understanding your website and your audience.' },
  { name: 'Website Maintenance', icon: 'settings', color: 'orange', text: 'Keep your website secure, updated and running smoothly.', detail: 'Give your website ongoing care with software updates, security checks, performance monitoring and content support. Maintenance can be tailored to the tools your site uses.' },
  { name: 'Website Migration', icon: 'cloud', color: 'green', text: 'We’ll help you move your website with minimal downtime.', detail: 'Move your existing website, emails and data to Veehoster with expert help. We review your current setup, plan the transfer, test the migrated website and coordinate the final switch.' },
  { name: 'Domain Transfer', icon: 'transfer', color: '', text: 'Move your domain to Veehoster quickly and easily.', detail: 'Manage your domain and hosting in one place. To begin a transfer, your domain should be unlocked and you will need an authorization code from your current registrar. Transfer eligibility depends on your domain extension and registration date.' },
];

document.querySelector('#services-grid').innerHTML = services.map(service => `<article class="service-card"><span class="icon-circle ${service.color}">${icon(service.icon)}</span><div><h3>${service.name}</h3><p>${service.text}</p><button class="text-link" data-service="${escapeHTML(service.name)}" aria-label="Learn more about ${escapeHTML(service.name)}">Learn more ${arrow}</button></div></article>`).join('');

const benefits = [
  ['clock', 'green', '99.9% Uptime', 'Your website stays online, always.'],
  ['rocket', 'pink', 'Blazing Fast Speed', 'Optimized servers for better performance.'],
  ['headset', '', '24/7 Expert Support', 'Real people, real help anytime.'],
  ['shield', 'purple', 'Robust Security', 'Multi-layer protection for your data.'],
  ['growth', 'orange', 'Scalable Solutions', 'Grow your website without limits.'],
  ['heart', 'yellow', 'Trusted by Thousands', 'Businesses trust us across India.'],
];
document.querySelector('#benefits-grid').innerHTML = benefits.map(([symbol, color, title, description]) => `<div class="benefit"><span class="icon-circle ${color}">${icon(symbol)}</span><h3>${title}</h3><p>${description}</p></div>`).join('');

const plans = [
  { name: 'Starter Hosting', subtitle: 'Perfect for small websites', icon: 'spark', color: '', yearly: 249, monthly: 399, features: ['1 Website', '10 GB NVMe Storage', 'Unmetered Bandwidth', 'Free SSL Certificate', 'cPanel Control Panel'] },
  { name: 'Business Hosting', subtitle: 'Ideal for growing businesses', icon: 'users', color: 'green', yearly: 499, monthly: 799, popular: true, features: ['Multiple Websites', '50 GB NVMe Storage', 'Unmetered Bandwidth', 'Free SSL Certificate', 'Daily Backups'] },
  { name: 'Premium Hosting', subtitle: 'For high traffic websites', icon: 'monitor', color: 'orange', yearly: 999, monthly: 1599, features: ['Unlimited Websites', '100 GB NVMe Storage', 'Unmetered Bandwidth', 'Free SSL Certificate', 'Priority Support'] },
  { name: 'Reseller Hosting', subtitle: 'Start your own hosting business', icon: 'server', color: 'purple', yearly: 1999, monthly: 2999, features: ['Unlimited cPanel Accounts', '200 GB NVMe Storage', 'Unmetered Bandwidth', 'Free SSL Certificate', 'WHM Access'] },
];
let billing = 'yearly';
let selectedPlan = null;
const rupees = amount => `₹${amount.toLocaleString('en-IN')}`;

function renderPlans() {
  document.querySelector('#plans-grid').innerHTML = plans.map((plan, index) => `<article class="plan-card ${plan.popular ? 'popular' : ''}">${plan.popular ? '<div class="popular-label">Most Popular</div>' : ''}<div class="plan-heading"><span class="icon-circle ${plan.color}">${icon(plan.icon)}</span><div><h3>${plan.name}</h3><p>${plan.subtitle}</p></div></div><div class="plan-price" aria-label="${rupees(plan[billing])} per month, billed ${billing}">${icon('users')}<strong>${rupees(plan[billing])}</strong><span>/mo</span></div><ul class="plan-features">${plan.features.map(feature => `<li>${icon('check')}${feature}</li>`).join('')}</ul><button class="button ${plan.popular ? '' : 'button-outline'}" data-plan="${index}">Get Started</button><button class="text-link" data-plan-features="${index}" aria-label="See all ${plan.name} features">See all features ${arrow}</button></article>`).join('');
}
renderPlans();

const controls = [
  ['folder', 'Manage Files', 'Upload, edit and manage files easily.'],
  ['database', 'Databases', 'Manage MySQL databases.'],
  ['mail', 'Email Accounts', 'Create and manage email accounts.'],
  ['shield', 'Security Tools', 'Protect your website with advanced tools.'],
  ['cloud', 'One-Click Installs', 'Install popular apps like WordPress.'],
  ['settings', 'Advanced Settings', 'Full control with easy-to-use interface.'],
];
document.querySelector('#control-features').innerHTML = controls.map(([symbol, title, description]) => `<div class="control-feature"><span class="icon-circle">${icon(symbol)}</span><div><h3>${title}</h3><p>${description}</p></div></div>`).join('');
document.querySelector('#cpanel-tools').innerHTML = [...controls, ['globe', 'Domains'], ['chart', 'Metrics'], ['server', 'Applications']].map(([symbol, title]) => `<span class="cpanel-tool">${icon(symbol)}${title}</span>`).join('');

const projects = [
  { name: 'BrightPath Academy', type: 'School Website', category: 'education', image: 'property-1.jpg', alt: 'Light-filled modern building with landscaped gardens' },
  { name: 'StyleCart', type: 'E-commerce Store', category: 'ecommerce', image: 'shop.jpg', alt: 'Gold jewelry photographed for an online boutique' },
  { name: 'Evermore', type: 'Real Estate Website', category: 'realestate', image: 'property-3.jpg', alt: 'Contemporary home with an inviting landscaped entrance' },
  { name: 'FitLife Gym', type: 'Fitness & Wellness', category: 'business', image: 'gym.jpg', alt: 'Fitness training in a professional gym' },
  { name: 'CarePlus', type: 'Healthcare Website', category: 'healthcare', image: 'property-4.jpg', alt: 'Welcoming white building surrounded by greenery' },
];
document.querySelector('#projects-grid').innerHTML = projects.map((project, index) => `<button class="project-card" data-project="${index}" data-category="${project.category}" aria-label="View ${project.name} project"><img src="assets/${project.image}" alt="${project.alt}" width="400" height="225" loading="lazy"><span class="project-info"><span><h3>${project.name}</h3><p>${project.type}</p></span>${icon('external')}</span></button>`).join('');

const faqs = [
  ['Which hosting plan is right for me?', 'Starter Hosting is a good fit for a single small website. Business Hosting adds room for multiple websites and daily backups. Premium Hosting suits larger or busier sites, while Reseller Hosting is designed for managing hosting for your own clients.'],
  ['Can I migrate my existing website?', 'Yes. Our migration service helps move your website, emails and data from your current provider. The team reviews your setup and coordinates the transfer to keep disruption to a minimum.'],
  ['Is SSL certificate included?', 'Yes, a free SSL certificate is included with every hosting plan, so you can serve your website over an encrypted HTTPS connection.'],
  ['Do you provide website design services?', 'Yes. We offer responsive website design and development for business websites, online stores, schools, healthcare organizations and more. Explore the services and portfolio sections to learn more.'],
  ['What payment methods do you accept?', 'Available payment methods and final charges will be shown at checkout. This static website preview does not process payments.'],
  ['Can I upgrade or downgrade my plan anytime?', 'You can request a plan change as your needs evolve. Storage usage, account requirements and billing adjustments should be reviewed before a change is confirmed.'],
];
document.querySelector('#faq-list').innerHTML = faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join('');

const dialog = document.querySelector('#site-dialog');
function showDialog(title, content) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-content').innerHTML = content;
  if (!dialog.open) dialog.showModal();
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

function showPlan(index, select = false) {
  const plan = plans[index];
  if (!plan) return;
  if (select) {
    selectedPlan = { index, billing };
    document.querySelector('.cart-count').textContent = '1';
  }
  const term = select ? selectedPlan.billing : billing;
  showDialog(plan.name, `<p>${plan.subtitle}.</p><div class="detail-price">${rupees(plan[term])}<small> /mo</small></div><p>${term === 'yearly' ? `${rupees(plan.yearly * 12)} billed yearly` : `${rupees(plan.monthly)} billed monthly`}.</p><ul>${plan.features.map(feature => `<li>${feature}</li>`).join('')}<li>24/7 expert support</li><li>Free website migration</li></ul>${select ? '<p class="small-note">Your plan is selected for this visit. Checkout and payment are not available in this static preview.</p>' : `<button class="button" data-plan="${index}">Choose this plan ${arrow}</button>`}`);
}

let domainMode = 'find';
function setDomainMode(mode) {
  domainMode = mode;
  document.querySelectorAll('.domain-tabs button').forEach(button => {
    const active = button.dataset.domainMode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  document.querySelector('#domain-title').textContent = mode === 'find' ? 'Find your perfect domain name' : 'Bring your domain to Veehoster';
  document.querySelector('#domain-name').placeholder = mode === 'find' ? 'Enter your desired domain name' : 'Enter the domain you want to transfer';
  document.querySelector('#domain-submit').textContent = mode === 'find' ? 'Search Domain' : 'Transfer Domain';
}

document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.dataset.billing) {
    billing = target.dataset.billing;
    document.querySelectorAll('[data-billing]').forEach(button => {
      const active = button.dataset.billing === billing;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderPlans();
  }
  if (target.dataset.filter) {
    const filter = target.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button === target;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  }
  if (target.dataset.service) {
    const service = services.find(item => item.name === target.dataset.service);
    if (service) showDialog(service.name, `<p>${service.detail}</p><a class="button" href="${service.name.includes('Domain') ? '#domains' : service.name === 'Web Hosting' ? '#pricing' : '#faq'}">${service.name.includes('Domain') ? 'Explore domains' : service.name === 'Web Hosting' ? 'Compare plans' : 'Explore FAQs'} ${arrow}</a>`);
  }
  if (target.hasAttribute('data-plan')) showPlan(Number(target.dataset.plan), true);
  if (target.hasAttribute('data-plan-features')) showPlan(Number(target.dataset.planFeatures));
  if (target.hasAttribute('data-cart')) {
    if (selectedPlan) {
      const currentBilling = billing;
      billing = selectedPlan.billing;
      showPlan(selectedPlan.index, true);
      billing = currentBilling;
    } else showDialog('Your hosting plan', `<p>You haven’t selected a hosting plan yet. Find the right home for your website.</p><a class="button" href="#pricing">Explore hosting plans ${arrow}</a>`);
  }
  if (target.hasAttribute('data-project')) {
    const project = projects[Number(target.dataset.project)];
    showDialog(project.name, `<img src="assets/${project.image}" alt="${project.alt}"><p><strong>${project.type}</strong></p><p>A portfolio concept showcasing a clear, responsive online presence. Project names and imagery reproduce the supplied design; no live client website is linked.</p>`);
  }
  if (target.dataset.domainMode) setDomainMode(target.dataset.domainMode);
  if (target.dataset.extension) {
    const input = document.querySelector('#domain-name');
    const name = input.value.trim().replace(/\.[a-z.]+$/i, '');
    input.value = `${name}${target.dataset.extension}`;
    input.focus();
    if (!name) input.setSelectionRange(0, 0);
  }
  if (target.dataset.contact) showDialog(target.dataset.contact === 'Support' ? 'How can we help?' : 'Let’s bring your ideas online.', `<p>From your first website to your next big move, we’re here to help you find the right fit.</p><p>Direct contact and support requests are not available in this static preview. Explore the hosting plans and answers to common questions below.</p><div class="button-row"><a class="button" href="#pricing">View plans ${arrow}</a><a class="button button-outline" href="#faq">Browse FAQs</a></div>`);
  if (target.hasAttribute('data-signin')) showDialog('Welcome to Veehoster', `<p>Customer sign-in isn’t connected in this static preview. No account information is collected.</p><a class="button" href="#pricing">Explore hosting ${arrow}</a>`);
  if (target.dataset.social) showDialog(`Veehoster on ${target.dataset.social}`, '<p>Our social profile link will be available here when it is added. This preview does not link to an unverified account.</p>');
  if (target.dataset.policy) showDialog(target.dataset.policy, '<p>This page is a static reproduction of the supplied design. Service terms, privacy details and refund conditions have not been provided and must be published before the website accepts orders or registrations.</p>');
  if (target.matches('#site-dialog a[href^="#"]')) dialog.close();
  if (target.matches('.main-nav a')) closeNavigation();
});

const menuButton = document.querySelector('.menu-toggle');
function closeNavigation() {
  document.querySelector('.main-nav').classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('is-open');
    item.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
  });
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  document.querySelector('.main-nav').classList.toggle('is-open', open);
});
document.querySelectorAll('.nav-trigger').forEach(trigger => trigger.addEventListener('click', () => {
  const open = trigger.getAttribute('aria-expanded') !== 'true';
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('is-open');
    item.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
  });
  trigger.setAttribute('aria-expanded', String(open));
  trigger.parentElement.classList.toggle('is-open', open);
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.navbar')) closeNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});
document.querySelector('.domain-tabs').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const mode = event.key === 'Home' ? 'find' : event.key === 'End' ? 'transfer' : domainMode === 'find' ? 'transfer' : 'find';
  setDomainMode(mode);
  document.querySelector(`.domain-tabs [data-domain-mode="${mode}"]`).focus();
});

document.querySelector('#domain-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#domain-name');
  let domain = input.value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain.includes('.')) domain += '.com';
  const labels = domain.split('.');
  const valid = domain.length <= 253 && labels.length >= 2 && labels.every(label => label.length >= 1 && label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)) && /^[a-z]{2,63}$/.test(labels.at(-1));
  if (!valid) {
    input.setCustomValidity('Enter a valid domain, such as yourbrand.com. Use letters, numbers and hyphens.');
    input.reportValidity();
    return;
  }
  input.value = domain;
  showDialog(domainMode === 'find' ? 'Your next great idea starts here.' : 'Move your domain with confidence.', `<p><strong>${escapeHTML(domain)}</strong></p>${domainMode === 'find' ? '<p>Domain availability and final registration pricing need to be checked with a live registrar. This static preview does not perform a live availability search.</p>' : '<p>Before transferring, unlock your domain with your current registrar and obtain its authorization code. A live transfer service must confirm eligibility and pricing.</p>'}<p class="small-note">No domain has been registered or transferred.</p><a class="button" href="#pricing">Pair it with great hosting ${arrow}</a>`);
});
document.querySelector('#domain-name').addEventListener('input', event => event.target.setCustomValidity(''));

const expandFaqs = document.querySelector('#expand-faqs');
expandFaqs.addEventListener('click', () => {
  const open = ![...document.querySelectorAll('.faq-item')].every(item => item.open);
  document.querySelectorAll('.faq-item').forEach(item => { item.open = open; });
  expandFaqs.innerHTML = `${open ? 'Close All FAQs' : 'View All FAQs'} ${arrow}`;
  expandFaqs.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle', () => {
  const allOpen = [...document.querySelectorAll('.faq-item')].every(faq => faq.open);
  expandFaqs.innerHTML = `${allOpen ? 'Close All FAQs' : 'View All FAQs'} ${arrow}`;
  expandFaqs.setAttribute('aria-expanded', String(allOpen));
}));

document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.newsletter-status').textContent = 'Thanks for your interest! Newsletter signup is not connected in this preview. Your email has not been submitted.';
});
