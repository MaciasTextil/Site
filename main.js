// Macias Têxtil — interações principais
(function () {
  'use strict';

  // ---------- i18n das strings geradas por JS (segue o lang da <html>) ----------
  const LANG = (document.documentElement.lang || 'pt').slice(0, 2);
  const T = {
    pt: { wa: 'Falar com o comercial no WhatsApp (abre em nova aba)', waMsg: 'Olá! Vim pelo site', sending: 'Enviando…', sent: 'Mensagem enviada! Nosso comercial responde em até 1 dia útil.', err: 'Não consegui enviar agora. Abrindo seu e-mail… ou fale pelo WhatsApp +55 19 99917-0252.', mail: 'Abrindo seu aplicativo de e-mail para enviar a mensagem… Se nada abrir, escreva para vendas@macias.com.br ou fale pelo WhatsApp.', lbView: 'Visualização ampliada', lbClose: 'Fechar', lbPrev: 'Anterior', lbNext: 'Próximo' },
    en: { wa: 'Chat with sales on WhatsApp (opens in a new tab)', waMsg: 'Hello! I came from the website', sending: 'Sending…', sent: 'Message sent! Our sales team replies within 1 business day.', err: 'Could not send right now. Opening your email… or reach us on WhatsApp +55 19 99917-0252.', mail: 'Opening your email app to send the message… If nothing opens, write to vendas@macias.com.br or reach us on WhatsApp.', lbView: 'Enlarged view', lbClose: 'Close', lbPrev: 'Previous', lbNext: 'Next' },
    es: { wa: 'Hablar con ventas por WhatsApp (abre en una pestaña nueva)', waMsg: '¡Hola! Vengo desde el sitio web', sending: 'Enviando…', sent: '¡Mensaje enviado! Nuestro equipo comercial responde en hasta 1 día hábil.', err: 'No se pudo enviar ahora. Abriendo tu correo… o escríbenos por WhatsApp +55 19 99917-0252.', mail: 'Abriendo tu aplicación de correo para enviar el mensaje… Si no se abre, escribe a vendas@macias.com.br o contáctanos por WhatsApp.', lbView: 'Vista ampliada', lbClose: 'Cerrar', lbPrev: 'Anterior', lbNext: 'Siguiente' },
  };
  const t = T[LANG] || T.pt;

  // ---------- Botão flutuante de WhatsApp (todas as páginas) ----------
  // Injetado via JS porque o footer está embutido em cada .html — evita editar
  // dezenas de arquivos. Se o JS falhar, o site continua funcionando normalmente
  // (o WhatsApp segue acessível pelo rodapé e pela página de contato).
  if (!document.querySelector('.wa-float')) {
    const wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.href = 'https://api.whatsapp.com/send?phone=5519999170252&text=' + encodeURIComponent(t.waMsg);
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', t.wa);
    wa.innerHTML =
      '<svg class="wa-float__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>' +
      '</svg>' +
      '<span class="wa-float__label">WhatsApp</span>';
    document.body.appendChild(wa);
  }

  // ---------- Menu mobile ----------
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.main-nav__toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Header: transparente sobre o hero, opaco ao rolar ----------
  const header = document.querySelector('.site-header');
  if (header && !header.classList.contains('is-static')) {
    // 3 estados na Home: topo transparente (banner) → fosco sobre o banner → branco fora dele.
    const hero = document.querySelector('.hero, .page-header');
    const update = () => {
      const y = window.scrollY;
      const fim = hero ? hero.offsetHeight - 80 : Infinity;
      header.classList.toggle('is-scrolled', y > 60 && y <= fim);
      header.classList.toggle('is-solid', y > fim);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach(el => io.observe(el));

    // Segurança: revela o que já está na viewport inicial (ex.: hero) e ao voltar
    // o foco para a aba — evita conteúdo preso invisível quando a página abre em
    // segundo plano (o IntersectionObserver só dispara quando a aba fica visível).
    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(el => {
        if (el.classList.contains('is-visible')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) { el.classList.add('is-visible'); io.unobserve(el); }
      });
    };
    revealInView();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') revealInView();
    });
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Barras de composição: animam "enchendo" ao entrar na viewport ----------
  // À prova de falha: só zeramos o width quando o IntersectionObserver existe.
  // O width final correto já vem inline no HTML (ex. style="width:90%"), então
  // se o JS não rodar (ou for desligado), a barra simplesmente aparece cheia.
  const compFills = document.querySelectorAll('.comp-bar__fill');
  if (compFills.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cio = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const fill = entry.target.querySelector('.comp-bar__fill');
        if (fill) fill.style.width = fill.dataset.w || '';   // restaura o alvo → a transition anima
        cio.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    compFills.forEach((el) => {
      el.dataset.w = el.style.width;           // guarda o alvo (ex. "90%")
      el.style.width = '0%';                    // ponto de partida da animação
      // observa o TRACK (tem largura real); observar o fill (0px) nunca dispara o IO
      const track = el.closest('.comp-bar__track') || el.parentElement || el;
      cio.observe(track);
    });
  }

  // ---------- Marquee: pausa quando fora da viewport (perf) ----------
  const marquees = document.querySelectorAll('[data-marquee]');
  if (marquees.length && 'IntersectionObserver' in window) {
    const mio = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const track = entry.target.querySelector('.marquee__track');
        if (track) track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      }
    });
    marquees.forEach(m => mio.observe(m));
  }

  // ---------- Lightbox vanilla ----------
  const lbTriggers = document.querySelectorAll('[data-lightbox]');
  if (lbTriggers.length) {
    // agrupa por valor de data-lightbox (galeria)
    const groups = {};
    lbTriggers.forEach(el => {
      const g = el.getAttribute('data-lightbox');
      if (!groups[g]) groups[g] = [];
      groups[g].push(el);
    });

    // monta UI (uma vez)
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', t.lbView);
    lb.innerHTML = `
      <img class="lightbox__img" alt="">
      <button class="lightbox__btn lightbox__close" type="button" aria-label="${t.lbClose}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <button class="lightbox__btn lightbox__prev" type="button" aria-label="${t.lbPrev}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="lightbox__btn lightbox__next" type="button" aria-label="${t.lbNext}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="lightbox__counter" aria-live="polite"></div>
    `;
    document.body.appendChild(lb);

    const img = lb.querySelector('.lightbox__img');
    const counter = lb.querySelector('.lightbox__counter');
    const btnPrev = lb.querySelector('.lightbox__prev');
    const btnNext = lb.querySelector('.lightbox__next');
    const btnClose = lb.querySelector('.lightbox__close');

    let currentGroup = null;
    let currentIndex = 0;

    function show(group, index) {
      currentGroup = group;
      currentIndex = (index + group.length) % group.length;
      const el = group[currentIndex];
      const href = el.getAttribute('href') || el.dataset.src || el.querySelector('img')?.src;
      img.src = href;
      img.alt = el.getAttribute('aria-label') || el.querySelector('img')?.alt || '';
      counter.textContent = `${currentIndex + 1} / ${group.length}`;
      counter.style.display = group.length > 1 ? '' : 'none';
      btnPrev.style.display = group.length > 1 ? '' : 'none';
      btnNext.style.display = group.length > 1 ? '' : 'none';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      currentGroup = null;
    }
    function nav(delta) {
      if (currentGroup) show(currentGroup, currentIndex + delta);
    }

    Object.entries(groups).forEach(([name, group]) => {
      group.forEach((el, i) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          show(group, i);
        });
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => nav(-1));
    btnNext.addEventListener('click', () => nav(1));
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') nav(-1);
      else if (e.key === 'ArrowRight') nav(1);
    });
  }

  // ---------- Formulário de contato (envio AJAX p/ Formspree + fallback mailto) ----------
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const val = (n) => { const el = form.elements[n]; return el && el.value ? el.value.trim() : ''; };
    const setMsg = (text, ok) => {
      let m = form.querySelector('.form__feedback');
      if (!m) {
        m = document.createElement('p');
        m.className = 'form__feedback';
        m.setAttribute('role', 'status');
        m.style.cssText = 'margin-top:1rem;padding:.85rem 1rem;border-radius:10px;font-weight:600;line-height:1.5;';
        form.appendChild(m);
      }
      m.textContent = text;
      m.style.background = ok ? '#e8f5e9' : '#fdecea';
      m.style.color = ok ? '#1b5e20' : '#b71c1c';
    };
    const mailtoFallback = () => {
      const subject = val('assunto') ? `[Site] ${val('assunto')}` : `[Site] Contato — ${val('nome')}`;
      const body = [
        `Nome: ${val('nome')}`,
        val('empresa') ? `Empresa: ${val('empresa')}` : null,
        `E-mail: ${val('email')}`,
        val('telefone') ? `Telefone: ${val('telefone')}` : null,
        val('assunto') ? `Assunto: ${val('assunto')}` : null,
        '', val('mensagem')
      ].filter((l) => l !== null).join('\n');
      window.location.href = 'mailto:vendas@macias.com.br?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
      const endpoint = form.getAttribute('action') || '';
      // "configurado" = action é uma URL http(s) real (Formspree/Netlify), não o placeholder
      const configured = /^https?:\/\//.test(endpoint) && !endpoint.includes('SEU_ID');
      if (!configured) {
        setMsg(t.mail, true);
        mailtoFallback();
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      setMsg(t.sending, true);
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        setMsg(t.sent, true);
      } catch (err) {
        setMsg(t.err, false);
        mailtoFallback();
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  });
})();
