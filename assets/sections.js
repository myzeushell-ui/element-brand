/* ЭЛЕМЕНТ — общий контент лендинга (nav + секции + футер).
   Единый источник для всех вариантов. Подключается в конце <body>.
   Активный вариант берётся из window.ELEMENT_VARIANT (1|2|3). */
(function () {
  var V = window.ELEMENT_VARIANT || 1;

  var ic = {
    flame: '<svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true"><defs><linearGradient id="navfl" x1="0" y1="1" x2="0.3" y2="0"><stop offset="0" stop-color="#E11D2A"/><stop offset="0.55" stop-color="#FF4D2E"/><stop offset="1" stop-color="#FF9A3D"/></linearGradient></defs><path fill="url(#navfl)" d="M33.7 3.2c1.2 6.4-1.1 11-4.6 14.9-3.7 4.1-8.7 7.8-11.6 13.2-2.7 5-3.4 11 .1 16.7 2.5 4.1 6.6 6.9 11 8.2-2.4-2.3-3.7-5.2-3.4-8.6.3-3.6 2.4-6.4 4.8-9.1.9 2.2 2.2 4 4.2 5.2 2.9 1.8 4.2 4.6 3.9 8-.2 2.2-1.2 4.1-2.7 5.7 5.4-1.6 9.9-5.2 12-10.6 2.2-5.6 1.2-11.6-1.6-16.8-2.1-3.9-5.1-7-7.2-10.9-2.2-4-2.8-8.3-1.3-12.7-2 .9-3.8 2.2-5.2 3.9.4-3.6-.2-7-2.4-10.2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    factory: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l6 4V9l6 4V5l6 0v16H3zM7 21v-4M12 21v-4M17 21v-4"/></svg>',
    gear: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
    shield: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    mining: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l7 7M17.5 6.5L9 15M5 21l4-6M4 14l6 4"/><circle cx="6" cy="18" r="0.5"/></svg>',
    recycle: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10a2 2 0 002-2v-3M3 12V6a2 2 0 012-2h6M21 9V6a2 2 0 00-2-2h-3"/><path d="M3 12l3-3M3 12l3 3M21 16l-3-3M21 16l-3 3"/></svg>',
    boiler: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 2-.5 3.2-1 4.2-.7 1.3-.4 3 1 3.8 1 .6 1.6-.2 1.6-1.2 1.6 1 2.4 2.6 2 4.4-.5 2.3-2.8 3.8-5.2 3.8S5.5 20.3 5 18c-.6-2.6.8-4.7 2.5-6.5C9.6 9.2 11.5 6.6 12 3z"/></svg>',
    fish: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3-4 8-5 12-3 2 1 4 3 6 3-2 0-4 2-6 3-4 2-9 1-12-3z"/><path d="M16 12l4-3M16 12l4 3M8 11.5v.01"/></svg>',
    lean: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16M7 16l4-5 3 3 5-7"/><path d="M19 8h-3M19 8v3"/></svg>',
    pro: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0114 0"/><path d="M8.5 6.5h7"/></svg>',
    resp: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>'
  };

  var NAV_ITEMS = ['О компании','Продукция','Отраслевые решения','Проекты','Производство','Документы','Контакты'];

  function navHTML() {
    return '<div class="nav"><div class="wrap">' +
      '<a class="brand" href="index.html">' + ic.flame + 'ЭЛЕМЕНТ</a>' +
      '<nav class="nav-links">' + NAV_ITEMS.map(function (t) { return '<a href="#">' + t + '</a>'; }).join('') + '</nav>' +
      '<div class="nav-cta"><a class="btn btn-primary" href="#contact">Получить КП</a>' +
      '<button class="burger" aria-label="Меню" onclick="document.documentElement.classList.toggle(\'menu-open\')"><span></span><span></span><span></span></button></div>' +
      '</div></div>';
  }

  function statsHTML() {
    var s = [
      [ic.factory, '8000 м²', 'Производственная площадка'],
      [ic.gear, '480', 'Установок в год'],
      [ic.shield, '100%', 'Собственная разработка и производство']
    ];
    return '<section class="block" style="padding-top:46px"><div class="wrap"><div class="stats">' +
      s.map(function (r) {
        return '<div class="stat reveal"><div class="ic">' + r[0] + '</div><div><b data-count="' +
          (/^\d/.test(r[1]) ? r[1].replace(/[^\d]/g, '') : '') + '" data-suffix="' +
          r[1].replace(/^[\d\s]+/, '') + '">' + r[1] + '</b><span>' + r[2] + '</span></div></div>';
      }).join('') + '</div></div></section>';
  }

  function industriesHTML() {
    var items = [
      [ic.mining, 'Майнинг', 'Автономное энергоснабжение майнинговых ферм в режиме 24/7.'],
      [ic.recycle, 'Перерабатывающие производства', 'Стабильная мощность для промышленных линий.'],
      [ic.boiler, 'Котельные', 'Когенерация: электроэнергия и тепло из одного источника.'],
      [ic.fish, 'Аквакультура', 'Надёжное питание систем аэрации и водоподготовки.']
    ];
    return '<section class="block" id="industries"><div class="wrap">' +
      '<div class="sec-head reveal"><div><span class="eyebrow">Отрасли</span><h2>Отраслевые решения</h2></div>' +
      '<p>Подбираем конфигурацию ГПУ под задачи и условия эксплуатации каждой отрасли.</p></div>' +
      '<div class="industries">' + items.map(function (it) {
        return '<article class="ind reveal"><div class="ic">' + it[0] + '</div>' +
          '<div><h3>' + it[1] + '</h3><p>' + it[2] + '</p></div><span class="glow"></span></article>';
      }).join('') + '</div></div></section>';
  }

  function valuesHTML() {
    var items = [
      [ic.lean, 'Бережливое производство', 'Оптимизируем процессы и ресурсы, чтобы предлагать эффективные и надёжные решения.'],
      [ic.pro, 'Профессионализм', 'Команда экспертов с глубокими компетенциями и опытом реализации сложных проектов.'],
      [ic.resp, 'Ответственность', 'Выполняем обязательства и гарантируем качество на каждом этапе — от проекта до сервиса.']
    ];
    return '<section class="block" style="background:var(--bg-2)" id="values"><div class="wrap">' +
      '<div class="sec-head reveal"><div><span class="eyebrow">Принципы</span><h2>Наши ценности</h2></div></div>' +
      '<div class="values">' + items.map(function (it) {
        return '<article class="value reveal"><div class="ic">' + it[0] + '</div><h3>' + it[1] + '</h3><p>' + it[2] + '</p></article>';
      }).join('') + '</div></div></section>';
  }

  function productsHTML() {
    var items = [
      ['ГПУ 210 кВт', 'для майнинга', 'Оптимальное решение для энергообеспечения майнинговых ферм. Высокая эффективность и стабильная работа в круглосуточном режиме.'],
      ['ГПУ 230 кВт', 'для промышленности', 'Надёжный источник электроэнергии для предприятий и производственных объектов. Долговечность, экономичность и простота обслуживания.']
    ];
    return '<section class="block" id="products"><div class="wrap">' +
      '<div class="sec-head reveal"><div><span class="eyebrow">Каталог</span><h2>Продукция</h2></div>' +
      '<p>Газопоршневые установки собственного производства мощностью от 100 до 2000 кВт.</p></div>' +
      '<div class="products">' + items.map(function (it) {
        return '<article class="product reveal"><div class="ph"><span class="pw">Собственное производство</span>' +
          '<img src="assets/img/genset.svg" alt="' + it[0] + ' ' + it[1] + '" loading="lazy"></div>' +
          '<div class="body"><h3>' + it[0] + '<br>' + it[1] + '</h3><p>' + it[2] + '</p>' +
          '<a class="btn-arrow" href="#contact">Подробнее ' + ic.arrow + '</a></div></article>';
      }).join('') + '</div></div></section>';
  }

  function contactHTML() {
    return '<section class="block" id="contact"><div class="wrap"><div class="contact reveal">' +
      '<div><span class="eyebrow" style="color:#FF8A6E">Заявка</span>' +
      '<h2>Обсудим ваш проект</h2><p>Подготовим техническое решение и коммерческое предложение под задачи вашего бизнеса.</p></div>' +
      '<form class="form" onsubmit="return ELEMENT.submit(event)">' +
      '<input name="name" placeholder="Ваше имя" required>' +
      '<input name="phone" placeholder="Телефон" required>' +
      '<input name="email" type="email" placeholder="E-mail">' +
      '<input name="company" placeholder="Компания">' +
      '<textarea name="message" placeholder="Расскажите о вашем проекте"></textarea>' +
      '<button class="btn btn-primary" type="submit">Отправить заявку</button>' +
      '</form></div></div></section>';
  }

  function footerHTML() {
    return '<footer class="ft"><div class="wrap">' +
      '<a class="brand" href="index.html">' + ic.flame + 'ЭЛЕМЕНТ</a>' +
      '<span>Газопоршневые установки собственного производства</span>' +
      '<span class="sp">© 2026 ЭЛЕМЕНТ · Премиум-концепт (светлая тема)</span>' +
      '</div></footer>';
  }

  function switcherHTML() {
    var names = { 1: 'Двигатель', 2: 'Пламя', 3: 'Энергия' };
    var s = '<div class="vswitch"><span class="lbl">Вариант</span>';
    for (var i = 1; i <= 3; i++) {
      s += '<a href="variant-' + i + '.html" class="' + (i === V ? 'active' : '') +
        '" title="' + names[i] + '">' + i + '</a>';
    }
    return s + '</div>';
  }

  // ---- mount ----
  function mount(sel, html) { var el = document.querySelector(sel); if (el) el.outerHTML = html; }
  mount('[data-nav]', navHTML());
  var sectionsEl = document.querySelector('[data-sections]');
  if (sectionsEl) sectionsEl.outerHTML =
    statsHTML() + industriesHTML() + valuesHTML() + productsHTML() + contactHTML();
  mount('[data-footer]', footerHTML());
  document.body.insertAdjacentHTML('beforeend', switcherHTML());

  // ---- reveal on scroll ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // ---- count-up on stats ----
  var counted = false;
  function runCounts() {
    if (counted) return; counted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (!target) return;
      var suffix = el.getAttribute('data-suffix') || '', start = 0, t0 = performance.now(), dur = 1100;
      function step(t) {
        var k = Math.min(1, (t - t0) / dur), val = Math.round(target * (1 - Math.pow(1 - k, 3)));
        el.textContent = val.toLocaleString('ru-RU') + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statEl = document.querySelector('.stats');
  if (statEl) new IntersectionObserver(function (e) { if (e[0].isIntersecting) runCounts(); }, { threshold: .4 }).observe(statEl);

  // ---- public api ----
  window.ELEMENT = {
    submit: function (e) {
      e.preventDefault();
      var btn = e.target.querySelector('button[type=submit]');
      btn.textContent = 'Заявка отправлена ✓'; btn.style.background = '#1f9d57';
      btn.disabled = true;
      setTimeout(function () { e.target.reset(); btn.textContent = 'Отправить заявку'; btn.style.background = ''; btn.disabled = false; }, 2600);
      return false;
    }
  };
})();
