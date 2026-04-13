// قائمة الجوال
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-menu');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expand = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', String(!expand));
    menu.classList.toggle('show');
  });
}

// التمرير السلس للروابط الداخلية
document.addEventListener('DOMContentLoaded', function() {
  // جميع الروابط التي تبدأ بـ #
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // تجاهل الروابط الفارغة أو التي تحتوي على # فقط
      if (href === '#' || href === '') {
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // إغلاق القائمة في الجوال إذا كانت مفتوحة
        if (menu && menu.classList.contains('show')) {
          menu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        }

        // التمرير السلس للعنصر المستهدف
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// إرسال نموذج إلى واتساب
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const subject = data.get('subject') || '';
    const message = data.get('message') || '';
    const text = `مرحبا، أرغب بالتواصل.\nالاسم: ${name}\nالبريد: ${email}\nالموضوع: ${subject}\nالرسالة: ${message}`;
    const phone = '966567891315';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// تشغيل reveal عند دخول العناصر لمجال الرؤية (IntersectionObserver) مع تأخير خاص لقسم لماذا تختارنا
(function(){
  const whyCards = document.querySelectorAll('.why-us .features > .feature-item.reveal');
  const servicesCards = document.querySelectorAll('.grid.features > .feature.reveal'); // بطاقات صفحة الخدمات
  const contactCards = document.querySelectorAll('.contact-details-grid > .contact-detail-item.reveal'); // بطاقات معلومات التواصل
  const allReveal = document.querySelectorAll('.reveal');
  const nonWhy = Array.from(allReveal).filter(el => !Array.from(whyCards).includes(el) && !Array.from(servicesCards).includes(el) && !Array.from(contactCards).includes(el));

  function makeObserver(targets, options){
    if (!('IntersectionObserver' in window) || !targets.length){
      targets.forEach(el => el.classList.add('is-inview'));
      return null;
    }
    const io = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    targets.forEach(el=>io.observe(el));
    return io;
  }

  // العناصر العامة: تبدأ عند ظهور 10% منها (للبطل وعناوين الأقسام)
  makeObserver(nonWhy, { threshold: 0.10, rootMargin: '0px 0px -5% 0px' });
  // بطاقات لماذا تختارنا: لن تبدأ إلا بعد ظهور 40% من البطاقة داخل الشاشة
  makeObserver(whyCards, { threshold: 0.40, rootMargin: '0px 0px -10% 0px' });
  // بطاقات صفحة الخدمات: تبدأ عند ظهور 30% منها
  makeObserver(servicesCards, { threshold: 0.30, rootMargin: '0px 0px -10% 0px' });
  // بطاقات معلومات التواصل: تبدأ عند ظهور 30% منها
  makeObserver(contactCards, { threshold: 0.30, rootMargin: '0px 0px -10% 0px' });
})();

// تدوير نصوص الخدمات في الصفحة الرئيسية
(function(){
  const servicesElement = document.getElementById('rotating-services');
  if (!servicesElement) return;

  const services = [
    'مراجعة وتدقيق القوائم المالية',
    'مسك الدفاتر والحسابات',
    'القضايا القانونية والخبرة المالية',
    'الاستشارات المالية والاستثمارية',
    'المراجعة الداخلية وتقييم المخاطر',
    'الزكاة والضرائب والإقرارات',
    'التقارير المالية الخاصة',
    'الخدمات الاكتوارية المتخصصة'
  ];

  let currentIndex = 0;

  function rotateServices() {
    // إخفاء النص الحالي
    servicesElement.classList.add('fade-out');

    setTimeout(() => {
      // تغيير النص
      currentIndex = (currentIndex + 1) % services.length;
      servicesElement.textContent = services[currentIndex];

      // إظهار النص الجديد
      servicesElement.classList.remove('fade-out');
      servicesElement.classList.add('fade-in');

      setTimeout(() => {
        servicesElement.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  // بدء التدوير كل 3 ثوانٍ
  setInterval(rotateServices, 3000);
})();

// تدوير نصوص "من نحن" في صفحة about
(function(){
  const aboutElement = document.getElementById('rotating-about');
  if (!aboutElement) return;

  const aboutTexts = [
    'خبراء محاسبون معتمدون بخبرة تزيد عن 15 عاماً',
    'نقدم حلولاً مالية مبتكرة وفق أعلى المعايير المهنية',
    'فريق متخصص يضمن الدقة والشفافية في جميع أعمالنا',
    'شريكك الموثوق في النجاح المالي والنمو المستدام',
    'التزام بالجودة والمواعيد مع خدمة عملاء متميزة'
  ];

  let currentAboutIndex = 0;

  function rotateAboutTexts() {
    // إخفاء النص الحالي
    aboutElement.classList.add('fade-out');

    setTimeout(() => {
      // تغيير النص
      currentAboutIndex = (currentAboutIndex + 1) % aboutTexts.length;
      aboutElement.textContent = aboutTexts[currentAboutIndex];

      // إظهار النص الجديد
      aboutElement.classList.remove('fade-out');
      aboutElement.classList.add('fade-in');

      setTimeout(() => {
        aboutElement.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  // بدء التدوير كل 4 ثوانٍ
  setInterval(rotateAboutTexts, 4000);
})();

// تدوير نصوص الخدمات في صفحة services
(function(){
  const servicesPageElement = document.getElementById('rotating-services-page');
  if (!servicesPageElement) return;

  const servicesTexts = [
    'المحاسبة المالية والإدارية',
    'إعداد القوائم المالية',
    'المراجعة والتدقيق',
    'الاستشارات الضريبية',
    'التخطيط المالي',
    'إدارة الرواتب والأجور',
    'تأسيس الشركات',
    'الاستشارات المالية'
  ];

  let currentServicesPageIndex = 0;

  function rotateServicesPageTexts() {
    // إخفاء النص الحالي
    servicesPageElement.classList.add('fade-out');

    setTimeout(() => {
      // تغيير النص
      currentServicesPageIndex = (currentServicesPageIndex + 1) % servicesTexts.length;
      servicesPageElement.textContent = servicesTexts[currentServicesPageIndex];

      // إظهار النص الجديد
      servicesPageElement.classList.remove('fade-out');
      servicesPageElement.classList.add('fade-in');

      setTimeout(() => {
        servicesPageElement.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  // بدء التدوير كل 3 ثوانٍ (نفس الصفحة الرئيسية)
  setInterval(rotateServicesPageTexts, 3000);
})();

// تدوير نصوص الخدمات في صفحة التواصل
(function(){
  const contactElement = document.getElementById('rotating-contact');
  if (!contactElement) return;

  const contactTexts = [
    'المحاسبة المالية والإدارية',
    'إعداد القوائم المالية',
    'المراجعة والتدقيق',
    'الاستشارات الضريبية',
    'التخطيط المالي',
    'إدارة الرواتب والأجور',
    'تأسيس الشركات',
    'الاستشارات المالية'
  ];

  let currentContactIndex = 0;

  function rotateContactTexts() {
    // إخفاء النص الحالي
    contactElement.classList.add('fade-out');

    setTimeout(() => {
      // تغيير النص
      currentContactIndex = (currentContactIndex + 1) % contactTexts.length;
      contactElement.textContent = contactTexts[currentContactIndex];

      // إظهار النص الجديد
      contactElement.classList.remove('fade-out');
      contactElement.classList.add('fade-in');

      setTimeout(() => {
        contactElement.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  // بدء التدوير كل 3 ثوانٍ (نفس الصفحة الرئيسية)
  setInterval(rotateContactTexts, 3000);
})();


// زر العودة للأعلى
(function(){
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if(!scrollToTopBtn) return;

  // إظهار/إخفاء الزر حسب التمرير
  function toggleScrollButton(){
    if(window.pageYOffset > 300){
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }

  // العودة للأعلى عند الضغط
  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ربط الأحداث
  window.addEventListener('scroll', toggleScrollButton);
  scrollToTopBtn.addEventListener('click', scrollToTop);

  // فحص أولي
  toggleScrollButton();
})();

// قائمة التواصل الاجتماعي العمودية البسيطة
(function(){
  const socialToggle = document.getElementById('socialToggle');
  const socialCircle = document.getElementById('socialCircle');

  if(!socialToggle || !socialCircle) return;

  let isOpen = false;

  function toggleSocialMenu(){
    isOpen = !isOpen;

    if(isOpen){
      socialCircle.classList.add('show');
      socialToggle.classList.add('active');
    } else {
      socialCircle.classList.remove('show');
      socialToggle.classList.remove('active');
    }
  }

  // النقر على الأيقونة الصغيرة
  socialToggle.addEventListener('click', toggleSocialMenu);

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', function(e){
    if(!socialToggle.contains(e.target) && !socialCircle.contains(e.target)){
      if(isOpen){
        toggleSocialMenu();
      }
    }
  });
})();

// ملاحظة: يمكن لاحقًا إضافة تتبع للأحداث عبر GTM إذا رغبت



// عدّاد KPIs عند الظهور
(function(){
  const kpiNums = document.querySelectorAll('.kpi-number');
  if(!kpiNums.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduce ? 0 : 3000;

  function formatNumber(n){
    return n.toLocaleString('en'); // عرض ثابت، يمكن تغييره لاحقًا
  }

  function animateCount(el){
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    if(duration === 0){
      el.textContent = formatNumber(target) + suffix;
      return;
    }
    const start = performance.now();
    function step(ts){
      const p = Math.min((ts - start) / duration, 1);
      const eased = p*p; // easeIn
      const val = Math.floor(target * eased);
      el.textContent = formatNumber(val) + suffix;
      if(p < 1){
        requestAnimationFrame(step);
      } else {
        const item = el.closest('.kpi-item') || el.parentElement;
        if(item) item.classList.add('done');
      }
    }
    requestAnimationFrame(step);
  }

  if(!('IntersectionObserver' in window)){
    kpiNums.forEach(animateCount);
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const section = entry.target;
        section.classList.add('inview');
        // شغّل كل الأرقام داخل القسم مرة واحدة
        kpiNums.forEach(animateCount);
        io.unobserve(section);
      }
    })
  }, {threshold: 0.35});

  const section = document.getElementById('kpis');
  if(section) io.observe(section);

// أيقونات KPI متحركة بجافاسكربت لتبدو حقيقية
(function(){
  const section = document.getElementById('kpis');
  if(!section) return;
  const icons = {
    star: section.querySelector('.icon-star')?.closest('.kpi-ico'),
    list: section.querySelector('.icon-list')?.closest('.kpi-ico'),
    team: section.querySelector('.icon-team')?.closest('.kpi-ico'),
    hand: section.querySelector('.icon-handshake')?.closest('.kpi-ico'),
  };
  function keyframes(el, frames){ el.animate(frames.keyframes, frames.options); }
  const fx = {
    star: { keyframes:[{transform:'scale(.8) rotate(-12deg)', filter:'brightness(1.1)'},{transform:'scale(1.15) rotate(8deg)', filter:'brightness(1.3)'},{transform:'scale(1) rotate(0)', filter:'brightness(1)'}], options:{duration:900, easing:'cubic-bezier(.22,.61,.36,1)'} },
    list: { keyframes:[{transform:'translateX(0)'},{transform:'translateX(-2px)'},{transform:'translateX(2px)'},{transform:'translateX(0)'}], options:{duration:600, easing:'ease-in-out'} },
    team: { keyframes:[{transform:'translateY(0)'},{transform:'translateY(-2px)'},{transform:'translateY(0)'}], options:{duration:1000, easing:'ease-in-out'} },
    hand: { keyframes:[{transform:'rotate(0)'},{transform:'rotate(-6deg)'},{transform:'rotate(6deg)'},{transform:'rotate(0)'}], options:{duration:800, easing:'ease-in-out'} },
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return; // احترام تقليل الحركة

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      // تشغيل تسلسل دخول بسيط لكل أيقونة
      icons.star && keyframes(icons.star, {keyframes:fx.star.keyframes, options:{...fx.star.options, delay:100, fill:'both'}});
      icons.list && keyframes(icons.list, {keyframes:fx.list.keyframes, options:{...fx.list.options, delay:250, fill:'both'}});
      icons.team && keyframes(icons.team, {keyframes:fx.team.keyframes, options:{...fx.team.options, delay:400, fill:'both'}});
      icons.hand && keyframes(icons.hand, {keyframes:fx.hand.keyframes, options:{...fx.hand.options, delay:550, fill:'both'}});

      // نبضة تنفّس خفيفة متكررة لكل أيقونة بعد الدخول
      const loop = (el, dy=1.5)=>{ el && el.animate([{transform:'translateY(0)'},{transform:`translateY(-${dy}px)`},{transform:'translateY(0)'}], {duration:4000, iterations:Infinity, easing:'ease-in-out', delay:1200}); };
      loop(icons.star); loop(icons.list,1.2); loop(icons.team,1.6); loop(icons.hand,1.2);

      io.unobserve(e.target);
    })
  },{threshold:.35});
  io.observe(section);
})();

// إعادة تشغيل Lottie عند دخول القسم (في حال توقف على أول فريم)
(function(){
  const section = document.getElementById('kpis');
  if(!section) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const players = section.querySelectorAll('dotlottie-player');
      players.forEach(p=>{
        try{ p.play && p.play(); }catch(_){ }
      });
      io.unobserve(e.target);
    })
  },{threshold:.3});
  io.observe(section);
})();


})();
