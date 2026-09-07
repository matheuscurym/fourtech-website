
// Preferência visual local; o padrão da marca permanece escuro.
function applyTheme(theme) {
  const light = theme === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  document.querySelector('meta[name="theme-color"]').content = light ? '#F5F7FA' : '#0A0A0A';
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.setAttribute('aria-pressed', String(light));
    button.setAttribute('aria-label', light ? 'Ativar modo escuro' : 'Ativar modo claro');
    button.title = light ? 'Ativar modo escuro' : 'Ativar modo claro';
  }
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('fourtech-theme') || 'dark'; } catch {}
applyTheme(savedTheme);
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(document.documentElement.dataset.theme);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('fourtech-theme', next); } catch {}
  });
});
window.addEventListener('storage', event => {
  if (event.key === 'fourtech-theme' || event.key === null) applyTheme(event.newValue || 'dark');
});

document.addEventListener("DOMContentLoaded", () => {

    'use strict';
    // CONFIGURAÇÃO DE CONTATO — substitua os exemplos e mude active para true.
    // Nunca coloque senhas, tokens ou webhooks neste HTML.
    const CONTACT = {
      whatsapp: { number: '5521999999999', active: true }, // Exemplo: DDI 55 + DDD + número, apenas dígitos.
      email: { address: 'contato@seudominio.com.br', active: false }, // Exemplo: substitua pelo e-mail real.
      instagram: 'https://www.instagram.com/nucleo.fourtech/'
    };
    const toggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    function closeMenu(returnFocus = false) { mobileNav.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menu'); if(returnFocus) toggle.focus(); }
    toggle.addEventListener('click', () => { const open = mobileNav.hidden; mobileNav.hidden = !open; toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu'); });
    mobileNav.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
    document.addEventListener('click', e => { if(!e.target.closest('.header') && !mobileNav.hidden) closeMenu(); });
    matchMedia('(min-width:961px)').addEventListener('change', e => { if(e.matches) closeMenu(); });
    document.documentElement.classList.add('js-enhanced');
    const projects = [{"key": "barbearia", "image": "barbearia-silva", "name": "Barbearia Silva", "category": "Beleza e cuidado", "service": "Landing Page", "summary": "Cortes, estilo e um caminho direto para agendar.", "idea": "Reunir o estilo da barbearia, os serviços e as informações que alguém procura antes de marcar um horário.", "features": ["Apresentação dos serviços e preços", "Galeria de cortes e do espaço", "Contato para agendamento pelo WhatsApp"]}, {"key": "restaurante", "image": "restaurante-sabor-carioca", "name": "Sabor Carioca", "category": "Gastronomia", "service": "Site Institucional", "summary": "O cardápio e a experiência da casa antes da visita.", "idea": "Apresentar os pratos e o ambiente do restaurante, ajudando o visitante a planejar sua visita.", "features": ["Cardápio digital organizado", "Localização e horário de funcionamento", "Canal de contato para reservas"]}, {"key": "clinica", "image": "clinica-bem-estar", "name": "Clínica Bem Estar", "category": "Saúde e bem-estar", "service": "Site Completo", "summary": "Especialidades e equipe apresentadas com clareza.", "idea": "Organizar as informações da clínica e facilitar o contato com a recepção, com linguagem clara e visual acolhedor.", "features": ["Apresentação da equipe e especialidades", "Informações para a primeira consulta", "Canal de solicitação de agendamento"]}, {"key": "loja", "image": "loja-estilo", "name": "Estilo Boutique", "category": "Comércio local", "service": "Reformulação de Site", "summary": "Uma vitrine digital para sua próxima coleção.", "idea": "Criar uma apresentação visual dos produtos e conectar o interesse por uma peça ao atendimento da loja.", "features": ["Vitrine com produtos em destaque", "Organização por coleções", "Contato para consultar e comprar pelo WhatsApp"]}, {"key": "pizzaria", "image": "pizzaria-dom-giovanni", "name": "Dom Giovanni", "category": "Gastronomia", "service": "Landing Page", "summary": "Do cardápio ao pedido, uma conversa de distância.", "idea": "Reunir sabores, preços e informações de entrega em uma página, com um caminho direto para fazer o pedido.", "features": ["Cardápio de pizzas por categoria", "Informações sobre atendimento e entrega", "Pedido pelo canal de WhatsApp da pizzaria"]}, {"key": "salao", "image": "salao-elegance", "name": "Elegance Salon", "category": "Beleza e cuidado", "service": "Site Institucional", "summary": "Serviços e trabalhos que ajudam a escolher.", "idea": "Apresentar a identidade do salão, seus serviços e profissionais, incentivando o contato para conhecer os horários.", "features": ["Apresentação de serviços e profissionais", "Galeria de trabalhos", "Contato para solicitar um horário"]}];
    const projectMap = new Map(projects.map(p => [p.key, p]));
    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    // Digitação única; o texto completo reserva espaço e continua acessível.
    const titleTypewriter = document.getElementById('hero-typewriter');
    const typedTitle = titleTypewriter.querySelector('.typewriter-visual');
    const titleLetters = Array.from(titleTypewriter.querySelector('.typewriter-reserve').textContent);
    let titleFrame = 0;
    let titleStartedAt = null;
    function finishTitleTyping() {
      cancelAnimationFrame(titleFrame);
      titleTypewriter.classList.remove('is-typing');
      typedTitle.textContent = '';
    }
    function typeTitle(time) {
      if (prefersReducedMotion.matches || document.hidden) { finishTitleTyping(); return; }
      if (titleStartedAt === null) titleStartedAt = time;
      const elapsed = time - titleStartedAt;
      const count = Math.min(titleLetters.length, Math.floor(elapsed / 1000 * titleLetters.length));
      typedTitle.textContent = titleLetters.slice(0, count).join('');
      if (elapsed < 1000) titleFrame = requestAnimationFrame(typeTitle);
      else finishTitleTyping();
    }
    if (!prefersReducedMotion.matches && !document.hidden) {
      titleTypewriter.classList.add('is-typing');
      titleFrame = requestAnimationFrame(typeTitle);
    }
    prefersReducedMotion.addEventListener('change', () => { if (prefersReducedMotion.matches) finishTitleTyping(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finishTitleTyping(); });
    // Prévia do projeto real em duas larguras; sem interação dentro das miniaturas.
    document.querySelectorAll('[data-preview-width]').forEach(viewport => {
      const fit = () => viewport.style.setProperty('--preview-scale', String(viewport.clientWidth / Number(viewport.dataset.previewWidth)));
      fit();
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(viewport);
      else window.addEventListener('resize', fit);
    });
    const life = document.getElementById('hero-identity');
    const lifeControl = document.getElementById('life-control');
    const lifeLabel = document.getElementById('life-control-label');
    const lifeCaption = document.getElementById('life-caption');
    let lifeElapsed = 0, lifeLast = null, lifeFrame = 0;
    let lifeVisible = false, lifePaused = false, lifeComplete = false;
    const lifeDuration = 10500;
    function paintLife() {
      const progress = lifeComplete ? 1 : Math.min(1, lifeElapsed / lifeDuration);
      life.style.setProperty('--life-progress', String(progress));
      life.style.setProperty('--cursor-approach', String(Math.max(0, Math.min(1, (lifeElapsed - 2000) / 1700))));
      life.classList.toggle('build-clicked', lifeElapsed >= 3700);
      life.style.setProperty('--loading-angle', Math.max(0, (lifeElapsed - 3700) / 900 * 360) + 'deg');
      document.getElementById('build-trigger-label').textContent = lifeElapsed >= 3700 ? 'Preparando seu site' : 'Construir meu site';
      life.classList.toggle('build-revealed', lifeElapsed >= 5100 || lifeComplete);
      life.classList.toggle('build-phone-visible', lifeElapsed >= 6900 || lifeComplete);
      lifeCaption.textContent = lifeComplete ? "O próximo passo do seu negócio começa com um clique." : lifeElapsed < 3700 ? 'O primeiro passo é um clique.' : lifeElapsed < 5100 ? 'Sua ideia começa a ganhar forma.' : lifeElapsed < 6900 ? 'Um site pensado para expandir seu negócio.' : "O próximo passo do seu negócio começa com um clique.";
      lifeLabel.textContent = lifeComplete ? 'Repetir' : lifePaused ? 'Retomar' : 'Pausar';
      lifeControl.setAttribute('aria-label', (lifeComplete ? 'Repetir' : lifePaused ? 'Retomar' : 'Pausar') + ' animação');
      lifeControl.hidden = prefersReducedMotion.matches;
    }
    function tickLife(time) {
      if (lifeLast !== null) lifeElapsed += time - lifeLast;
      lifeLast = time;
      lifeComplete = lifeElapsed >= lifeDuration;
      paintLife();
      if (!lifeComplete) lifeFrame = requestAnimationFrame(tickLife);
    }
    function syncLife() {
      cancelAnimationFrame(lifeFrame); lifeLast = null;
      if (prefersReducedMotion.matches) { lifeComplete = true; lifeElapsed = lifeDuration; }
      paintLife();
      if (lifeVisible && !document.hidden && !lifePaused && !lifeComplete) lifeFrame = requestAnimationFrame(tickLife);
    }
    lifeControl.addEventListener('click', () => {
      if (lifeComplete) { lifeElapsed = 0; lifeComplete = false; lifePaused = false; }
      else lifePaused = !lifePaused;
      syncLife();
    });
    document.addEventListener('visibilitychange', syncLife);
    prefersReducedMotion.addEventListener('change', syncLife);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { lifeVisible = entries[0].isIntersecting; syncLife(); }, {threshold:.25}).observe(life);
    } else { lifeVisible = true; }
    syncLife();
    const whatsappReady = CONTACT.whatsapp.active && /^\d{12,13}$/.test(CONTACT.whatsapp.number);
    const emailReady = CONTACT.email.active && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT.email.address) && CONTACT.email.address !== 'contato@seudominio.com.br';
    const form = document.getElementById('contact-form');
    const serviceField = document.getElementById('contact-service');
    const floatLink = document.getElementById('floating-contact');
    const formStatus = document.getElementById('form-status');
    const preparedMessage = document.getElementById('prepared-message');
    const copyFeedback = document.getElementById('copy-feedback');
    const result = document.getElementById('message-result');
    const year = document.getElementById('year');
    year.textContent = String(new Date().getFullYear());

    // WhatsApp provisório solicitado pela equipe; substitua o número em CONTACT antes do uso comercial.
    if (whatsappReady) {
      const link = document.getElementById('contact-whatsapp');
      link.href = 'https://wa.me/' + CONTACT.whatsapp.number;
      link.hidden = false;


      document.getElementById('form-intro').textContent = 'Preencha os dados e prepare uma mensagem para nosso canal de atendimento.';
    }
    if (emailReady) {
      const link = document.getElementById('contact-email');
      link.href = 'mailto:' + CONTACT.email.address;
      link.textContent = CONTACT.email.address + ' ↗';
      link.hidden = false;
    }
    document.querySelectorAll('.instagram-link, #message-instagram').forEach(a => { a.href = CONTACT.instagram; });
    floatLink.href = '#contato';

    // Uma única fonte para a seleção exibida, seja pelo card, modal ou seletor.
    function syncServiceSelection() {
      formStatus.textContent = 'Interesse selecionado: ' + serviceField.value + '.';
    }
    // Os links de serviço mantêm a navegação por âncora e levam a seleção ao formulário.
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-service]');
      if (!link) return;
      const choice = link.dataset.service;
      if ([...serviceField.options].some(o => o.value === choice)) {
        serviceField.value = choice;
        result.hidden = true;
        copyFeedback.textContent = '';
        syncServiceSelection();
      }
    });

    // <dialog> mantém o foco dentro da janela e deixa o fundo inerte.
    const dialog = document.getElementById('project-dialog');
    const privacyDialog = document.getElementById('privacy-dialog');
    const gitapDialog = document.getElementById('gitap-dialog');
    const dialogOpeners = new WeakMap();
    function openDialog(target, opener) {
      dialogOpeners.set(target, opener || document.activeElement);
      target.showModal();
      document.body.classList.add('locked');
      target.querySelector('[data-close-dialog]').focus({preventScroll:true});
    }
    [dialog, privacyDialog, gitapDialog].forEach(target => {
      target.querySelector('[data-close-dialog]').addEventListener('click', () => target.close());
      target.addEventListener('click', e => {
        if (e.target !== target) return;
        const box = target.getBoundingClientRect();
        if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) target.close();
      });
      target.addEventListener('close', () => {
        document.body.classList.remove('locked');
        const opener = dialogOpeners.get(target);
        if (opener && opener.isConnected) opener.focus({preventScroll:true});
      });
    });
    document.querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('click', () => {
        const project = projectMap.get(button.dataset.project);
        if (!project) return;
        const image = document.getElementById('dialog-image');
        image.src = document.querySelector('#project-' + project.key + ' img').src;
        image.alt = 'Imagem conceitual do projeto demonstrativo ' + project.name;
        document.getElementById('dialog-title').textContent = project.name;
        document.getElementById('dialog-category').textContent = project.category + ' / ' + project.service;
        document.getElementById('dialog-description').textContent = project.summary;
        document.getElementById('dialog-idea').textContent = project.idea;
        const list = document.getElementById('dialog-features');
        list.replaceChildren(...project.features.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
        document.getElementById('dialog-cta').dataset.service = project.service;
        openDialog(dialog, button);
        dialog.querySelector('.dialog-scroll').scrollTop = 0;
      });
    });
    document.getElementById('gitap-case-open').addEventListener('click', e => {
      openDialog(gitapDialog, e.currentTarget);
      gitapDialog.querySelector('.dialog-scroll').scrollTop = 0;
    });
    document.getElementById('gitap-case-cta').addEventListener('click', () => gitapDialog.close());
    document.getElementById('dialog-cta').addEventListener('click', () => dialog.close());
    document.getElementById('privacy-button').addEventListener('click', e => openDialog(privacyDialog, e.currentTarget));

    function composeMessage(values) {
      return ['Olá, equipe FourTech! Gostaria de conversar sobre um projeto.', '',
        'Nome: ' + values.name, 'Negócio: ' + values.business, 'Interesse: ' + values.service,
        values.message ? '\nMinha ideia: ' + values.message : '',
        values.phone ? '\nWhatsApp para retorno: ' + values.phone : '',
        values.email ? 'E-mail para retorno: ' + values.email : ''
      ].filter((line, i) => line !== '' || i === 1).join('\n');
    }
    function refreshSendLinks() {
      const text = preparedMessage.value;
      const w = document.getElementById('message-whatsapp');
      const mail = document.getElementById('message-email');
      if (whatsappReady) { w.href = 'https://wa.me/' + CONTACT.whatsapp.number + '?text=' + encodeURIComponent(text); w.hidden = false; }
      if (emailReady) { mail.href = 'mailto:' + CONTACT.email.address + '?subject=' + encodeURIComponent('Orçamento — Núcleo FourTech') + '&body=' + encodeURIComponent(text); mail.hidden = false; }
    }
    ['contact-name','contact-business'].forEach(id => {
      const input = document.getElementById(id);
      input.addEventListener('input', () => input.setCustomValidity(''));
    });
    const phoneField = document.getElementById('contact-phone');
    const mailField = document.getElementById('contact-mail');
    function updateReturnChannel() {
      const phoneSelected = form.querySelector('[name="return-channel"]:checked').value === 'phone';
      phoneField.disabled = !phoneSelected;
      phoneField.required = phoneSelected;
      mailField.disabled = phoneSelected;
      mailField.required = !phoneSelected;
      document.getElementById('phone-field').hidden = !phoneSelected;
      document.getElementById('email-field').hidden = phoneSelected;
      phoneField.setCustomValidity('');
      mailField.setCustomValidity('');
    }
    form.querySelectorAll('[name="return-channel"]').forEach(input => input.addEventListener('change', updateReturnChannel));
    phoneField.addEventListener('input', () => {
      const digits = phoneField.value.replace(/\D/g, '');
      phoneField.setCustomValidity(/^(?:55)?[1-9][0-9]9[0-9]{8}$/.test(digits) ? '' : 'Informe um número de WhatsApp válido com DDD, como (21) 99999-9999.');
    });
    updateReturnChannel();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('contact-name');
      const business = document.getElementById('contact-business');
      if (!name.value.trim() || !business.value.trim()) {
        const invalid = !name.value.trim() ? name : business;
        invalid.setCustomValidity('Preencha este campo com seu nome ou negócio.');
        invalid.reportValidity(); return;
      }
      if (!form.reportValidity()) return;
      preparedMessage.value = composeMessage({name:name.value.trim(),business:business.value.trim(),service:serviceField.value,message:document.getElementById('contact-message').value.trim(),phone:phoneField.disabled ? '' : phoneField.value.trim(),email:mailField.disabled ? '' : mailField.value.trim()});
      copyFeedback.textContent = '';
      refreshSendLinks();
      result.hidden = false;
      formStatus.textContent = 'Mensagem preparada. Ela ainda não foi enviada.';
      document.getElementById('result-title').focus({preventScroll:true});
      result.scrollIntoView({behavior:prefersReducedMotion.matches?'auto':'smooth',block:'nearest'});
    });
    function handleFormChange(event) {
      const hadPreparedMessage = !result.hidden;
      if (hadPreparedMessage) { result.hidden = true; copyFeedback.textContent = ''; }
      if (event.target === serviceField) {
        syncServiceSelection();
      } else if (hadPreparedMessage) {
        formStatus.textContent = 'Você alterou os dados. Prepare a mensagem novamente para atualizar o pedido.';
      }
    }
    form.addEventListener('input', handleFormChange);
    form.addEventListener('change', handleFormChange);
    preparedMessage.addEventListener('input', () => { copyFeedback.textContent = ''; refreshSendLinks(); });
    document.getElementById('copy-message').addEventListener('click', async () => {
      if (!preparedMessage.value.trim()) { copyFeedback.textContent = 'Escreva uma mensagem antes de copiar.'; preparedMessage.focus(); return; }
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(preparedMessage.value);
        copyFeedback.textContent = 'Mensagem copiada. Abra o Instagram e cole na conversa com @nucleo.fourtech.';
      } catch {
        preparedMessage.focus(); preparedMessage.select();
        copyFeedback.textContent = 'O texto foi selecionado. Use Copiar no seu dispositivo e cole na conversa com @nucleo.fourtech.';
      }
    });

    // Movimento breve; nenhum conteúdo depende da animação para aparecer.
    if ('IntersectionObserver' in window) {
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (!prefersReducedMotion.matches && entry.target.animate) entry.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:480,easing:'cubic-bezier(.2,.7,.3,1)'});
          reveal.unobserve(entry.target);
        });
      },{threshold:.10});
      document.querySelectorAll('.project,.plan,.steps li,.about-grid,.founder,.section-head').forEach(el => reveal.observe(el));
      new IntersectionObserver(entries => { floatLink.classList.toggle('is-muted', entries[0].isIntersecting); },{threshold:0}).observe(document.getElementById('contato'));
    }
    const topButton = document.getElementById('back-top');
    const progress = document.getElementById('reading-progress');
    let scrollQueued = false;
    function updateScroll() {
      const available = document.documentElement.scrollHeight - innerHeight;
      const ratio = available > 0 ? Math.min(1,Math.max(0,scrollY / available)) : 0;
      progress.style.transform = 'scaleX(' + ratio + ')';
      topButton.hidden = scrollY < 700;
      scrollQueued = false;
    }
    addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } },{passive:true});
    addEventListener('resize', updateScroll);
    updateScroll();
    topButton.addEventListener('click', () => { scrollTo({top:0,behavior:prefersReducedMotion.matches?'auto':'smooth'}); document.querySelector('.brand').focus({preventScroll:true}); });

  
});
