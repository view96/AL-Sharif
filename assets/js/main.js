/**
 * شركة الشريف لصناعة الخزانات
 * Main JavaScript Controller
 * Native JS - Professional Industrial Website
 */

function initApp() {
  initNavbarScroll();
  initMobileDrawer();
  initHeroSlider();
  initTestimonialsSlider();
  initQuoteModal();
  initSpecsModal();
  initProductFilter();
  initHomeProductCards();
  initBarrierGallery();
  initContactForm();
  initScrollToTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   1. Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-main');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close when clicking internal anchor links
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   3. Hero Dynamic Slider
   ========================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section');
  if (!slider) return;

  const track = document.getElementById('heroSliderTrack') || slider.querySelector('.hero-slider-track');
  const slides = slider.querySelectorAll('.hero-slide');
  const prevBtn = slider.querySelector('.js-hero-prev');
  const nextBtn = slider.querySelector('.js-hero-next');
  const indicators = slider.querySelectorAll('.hero-indicator-dot');

  if (!slides.length || !track) return;

  let currentIndex = 0;
  let slideInterval = null;
  const totalSlides = slides.length;
  const autoPlayDelay = 3800; // Smooth continuous transition

  function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    const offsetPercent = -(currentIndex * (100 / totalSlides));
    track.style.transform = `translateX(${offsetPercent}%)`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }

  indicators.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
      if (!isNaN(targetIndex)) {
        showSlide(targetIndex);
        startAutoPlay();
      }
    });
  });

  // Touch Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      startAutoPlay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      startAutoPlay();
    }
  }

  // Initial setup and start moving
  showSlide(0);
}

/* ==========================================================================
   4. Testimonials Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-card-slide');
  const prevBtn = document.querySelector('.js-test-prev');
  const nextBtn = document.querySelector('.js-test-next');
  const dots = document.querySelectorAll('.test-dot');

  if (!slides.length) return;

  let currentIndex = 0;
  let interval = null;

  function updateSlide(index) {
    currentIndex = index;
    // RTL translation: translate in positive direction for RTL or negative depending on layout
    const offset = currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }

  function next() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlide(nextIndex);
  }

  function prev() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(prevIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      resetTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      resetTimer();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        updateSlide(idx);
        resetTimer();
      }
    });
  });

  function resetTimer() {
    clearInterval(interval);
    interval = setInterval(next, 6500);
  }

  interval = setInterval(next, 6500);
}


/* ==========================================================================
   Products Detailed Specifications Database
   ========================================================================== */
const productsData = {
  'v-500': {
    title: 'خزان رأسي 500 لتر',
    badge: 'خزانات رأسية',
    cap: '500 لتر',
    img: 'assets/images/tank-vertical-500.webp',
    desc: 'خزان مياه مدمج وعالي الجودة، معالج ضد الطحالب والبكتيريا ومناسب للمنازل والحدائق والوحدات السكنية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 80 سم | الارتفاع: 110 سم',
    material: 'بولي إيثيلين بيور غذائي عالي الكثافة (HDPE) غير معاد تدويره',
    coating: 'مقاوم للأشعة فوق البنفسجية UV + طبقة داخلية ملساء مانعة للطحالب',
    usage: 'مياه الشرب، أسطح المنازل، ري الحدائق، الوحدات السكنية'
  },
  'v-1000': {
    title: 'خزان رأسي 1,000 لتر',
    badge: 'خزانات رأسية',
    cap: '1,000 لتر',
    img: 'assets/images/tank-vertical-1000.webp',
    desc: 'الخيار الأكثر طلباً لأسطح المنازل والفلل، مصنع من خامات نقية صالحة لمياه الشرب ومقاومة لأشعة الشمس والحرارة.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 105 سم | الارتفاع: 135 سم',
    material: 'بولي إيثيلين بيور غذائي 3 طبقات معتمد لمياه الشرب',
    coating: 'عزل حراري كامل + مقاومة للأشعة البنفسجية + مانع للطحالب',
    usage: 'الفلل السكنية، مياه الشرب، المنازل، الاستراحات'
  },
  'v-1500': {
    title: 'خزان رأسي 1,500 لتر',
    badge: 'خزانات رأسية',
    cap: '1,500 لتر',
    img: 'assets/images/tank-vertical-1500.webp',
    desc: 'سعة عملية متميزة للوحدات السكنية والمباني المتوسطة مع أقصى كفاءة للمساحة وأمان تام لمياه الشرب.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 120 سم | الارتفاع: 150 سم',
    material: 'بولي إيثيلين بيور متعدد الطبقات عالي الكثافة والمتانة',
    coating: 'عازل حراري تام + طبقة داخلية بيضاء ناصعة ملساء',
    usage: 'العائلات الكبيرة، العمائر المتوسطة، المطاعم'
  },
  'v-2000': {
    title: 'خزان رأسي 2,000 لتر',
    badge: 'خزانات رأسية',
    cap: '2,000 لتر',
    img: 'assets/images/tank-vertical-2000.webp',
    desc: 'تصميم رأسي متوازن للأبنية السكنية والمطاعم والمنشآت التجارية مع صلابة فائقة وتحمل للأحوال الجوية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 135 سم | الارتفاع: 160 سم',
    material: 'بولي إيثيلين بيور عالي الكثافة معتمد صحياً لمياه الشرب',
    coating: 'مقاوم للأشعة فوق البنفسجية UV والبكتيريا',
    usage: 'العمائر السكنية، المنشآت الخدمية، الفنادق الصغيرة'
  },
  'v-3000': {
    title: 'خزان رأسي 3,000 لتر',
    badge: 'خزانات رأسية',
    cap: '3,000 لتر',
    img: 'assets/images/tank-vertical-3000.webp',
    desc: 'سعة وافرة تلبي احتياجات المباني السكنية المتعددة الطوابق والمشاريع المتوسطة بكفاءة عالية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 155 سم | الارتفاع: 185 سم',
    material: 'بولي إيثيلين هندسي عالي الكثافة فائق الصلابة والتحمل',
    coating: 'حماية مزدوجة ضد الشمس والتآكل الكيميائي',
    usage: 'الأبراج السكنية، المراكز التجارية، المجمعات'
  },
  'v-5000': {
    title: 'خزان رأسي 5,000 لتر',
    badge: 'خزانات رأسية',
    cap: '5,000 لتر',
    img: 'assets/images/tank-vertical-5000.webp',
    desc: 'مصمم للمجمعات السكنية والمصانع والمنشآت التجارية مع مقاومة استثنائية لضغط المياه الداخلي والخارجي.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 190 سم | الارتفاع: 210 سم',
    material: 'بولي إيثيلين صناعي ثقيل متعدد الطبقات مدعم بأطواق تقوية',
    coating: 'عزل حراري متقدم ومقاومة عالية للضغط والأملاح',
    usage: 'المصانع، المدارس، المجمعات السكنية، القرى السياحية'
  },
  'v-7500': {
    title: 'خزان رأسي 7,500 لتر',
    badge: 'خزانات رأسية',
    cap: '7,500 لتر',
    img: 'assets/images/tank-vertical-7500.webp',
    desc: 'حل هندسي متطور للمستشفيات والقرى السياحية ومحطات الخدمة والمنشآت الصناعية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 220 سم | الارتفاع: 230 سم',
    material: 'بولي إيثيلين إنشائي عالي التحمل مطابق للكود الهندسي',
    coating: 'مقاوم للصدأ والكيماويات والأشعة الشمسية الحارقة',
    usage: 'المستشفيات، القرى السياحية، مزارع الدواجن والإنتاج'
  },
  'v-10000': {
    title: 'خزان رأسي 10,000 لتر',
    badge: 'خزانات رأسية',
    cap: '10,000 لتر',
    img: 'assets/images/tank-vertical-10000.webp',
    desc: 'خزان صناعي ضخم للأغراض التجارية والصناعية والتخزين المركزي لمياه الشرب وشبكات الإطفاء.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 245 سم | الارتفاع: 250 سم',
    material: 'بولي إيثيلين صناعي مسلح بحلقات تقوية هيكلية',
    coating: 'عازل حراري ومقاوم تام للتآكل والتفاعلات الكيميائية',
    usage: 'شبكات الإطفاء، محطات المياه، المجمعات الصناعية'
  },
  'v-15000': {
    title: 'خزان رأسي 15,000 لتر',
    badge: 'خزانات رأسية',
    cap: '15,000 لتر',
    img: 'assets/images/tank-vertical-15000.webp',
    desc: 'سعة تخزينية عملاقة للمجمعات الصناعية والزراعية ومحطات المعالجة المتطورة.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 280 سم | الارتفاع: 285 سم',
    material: 'بولي إيثيلين إنشائي فائق الصلابة مصنع بقوالب دقيقة',
    coating: 'طبقات متراكبة لتحمل الضغط الهيدروستاتيكي العالي',
    usage: 'محطات التحلية، المزارع الكبرى، المدن الصناعية'
  },
  'v-20000': {
    title: 'خزان رأسي 20,000 لتر',
    badge: 'خزانات رأسية',
    cap: '20,000 لتر',
    img: 'assets/images/tank-vertical-20000.webp',
    desc: 'خزان استراتيجي معتمد للمصانع الكبرى وشبكات الإطفاء والتخزين الصناعي المتقدم.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 300 سم | الارتفاع: 320 سم',
    material: 'بولي إيثيلين عالي الكثافة ذو مواصفات خاصة للصناعات الثقيلة',
    coating: 'مقاومة هيدروليكية كاملة وحماية بيئية شاملة',
    usage: 'المصانع الكبرى، التخزين الاستراتيجي، شبكات الإطفاء'
  },
  'v-30000': {
    title: 'خزان رأسي 30,000 لتر',
    badge: 'خزانات رأسية',
    cap: '30,000 لتر',
    img: 'assets/images/tank-vertical-30000.webp',
    desc: 'أكبر سعات الخزانات الرأسية القياسية للمشاريع القومية والمدن الجديدة والمجمعات الصناعية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 340 سم | الارتفاع: 365 سم',
    material: 'بولي إيثيلين معتمد وفق معايير الأيزو والمواصفات القياسية',
    coating: 'أعلى تصنيف لمقاومة الضغوط وعوامل التعرية الجوية',
    usage: 'المشروعات القومية، المدن الجديدة، محطات المعالجة'
  },
  'fish-1000': {
    title: 'حوض استزراع وتربية أسماك 1,000 لتر',
    badge: 'أحواض سمك',
    cap: '1,000 لتر',
    img: 'assets/images/fish-basin-1000.webp',
    desc: 'حوض أسطواني بولي إيثيلين مفتوح مخصص للاستزراع السمكي والمزارع المائية، بسطح أملس معالج يمنع تكون البكتيريا ويسهل التنظيف الدوري.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'القطر: 130 سم | الارتفاع: 90 سم',
    material: 'بولي إيثيلين غذائي آمن 100% للأحياء المائية',
    coating: 'سطح أملس تماماً مانع للبكتيريا والالتصاق',
    usage: 'مزارع الأسماك، التفريخ، مزارع الجمبري، المعامل'
  },
  'h-500': {
    title: 'خزان أفقي 500 لتر',
    badge: 'خزانات أفقية',
    cap: '500 لتر',
    img: 'assets/images/tank-horizontal-500.webp',
    desc: 'خزان أفقي مدمج بقواعد تثبيت متينة، مناسب للأسطح ذات الارتفاعات المحدودة والأماكن الضيقة والمنازل.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 75 سم | الطول: 125 سم',
    material: 'بولي إيثيلين بيور عالي الصلابة بقواعد تثبيت مدمجة',
    coating: 'مقاوم لأشعة الشمس والحرارة، قواعد تثبيت سرجية مدمجة',
    usage: 'الأسطح المنخفضة، الكرفانات، المنازل، الحدائق'
  },
  'h-1000': {
    title: 'خزان أفقي 1,000 لتر',
    badge: 'خزانات أفقية',
    cap: '1,000 لتر',
    img: 'assets/images/tank-horizontal-1000.webp',
    desc: 'خزان أفقي مثبت على قوائم سرجية صلبة، الخيار الأفضل لتوزيع متوازن للأحمال على أسطح الفلل والعمائر.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 95 سم | الطول: 160 سم',
    material: 'بولي إيثيلين بيور غذائي معتمد لمياه الشرب',
    coating: 'عزل حراري تام وقواعد ارتكاز مقاومة للاهتزاز والرياح',
    usage: 'أسطح الفلل، المنازل، المحلات، مياه الشرب'
  },
  'h-2000': {
    title: 'خزان أفقي 2,000 لتر',
    badge: 'خزانات أفقية',
    cap: '2,000 لتر',
    img: 'assets/images/tank-horizontal-2000.webp',
    desc: 'تصميم أفقي متين للأبنية السكنية والحدائق، يمنح ثباتاً فائقاً ومقاومة كاملة للرياح والعوامل الجوية.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 120 سم | الطول: 200 سم',
    material: 'بولي إيثيلين عالي الكثافة بقوائم تثبيت مدمجة قوية',
    coating: 'طبقات متعددة مانعة لتسرب الضوء والحرارة',
    usage: 'المباني السكنية، الحدائق، المنشآت التجارية'
  },
  'h-3000': {
    title: 'خزان أفقي 3,000 لتر',
    badge: 'خزانات أفقية',
    cap: '3,000 لتر',
    img: 'assets/images/tank-horizontal-3000.webp',
    desc: 'سعة عملية متميزة للمشاريع المتوسطة والفلل الكبيرة، مناسب للتخزين السطحي والمدفون لمياه الشرب والري.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 140 سم | الطول: 230 سم',
    material: 'بولي إيثيلين سميك مدعم بأحزمة تقوية دائرية',
    coating: 'مقاوم للتربة والأملاح (سطحي ومدفون)',
    usage: 'الفلل الكبرى، مزارع الري، خزانات الطوارئ'
  },
  'h-5000': {
    title: 'خزان أفقي 5,000 لتر',
    badge: 'خزانات أفقية',
    cap: '5,000 لتر',
    img: 'assets/images/tank-horizontal-5000.webp',
    desc: 'خزان أفقي قوي بسعة 5 آلاف لتر، مثالي للمزارع والمحطات والمستودعات والتطبيقات الصناعية ومزارع الدواجن.',
    warranty: '10 سنوات ضمان معتمد',
    dims: 'القطر: 170 سم | الطول: 260 سم',
    material: 'بولي إيثيلين كثيف عالي التحمل ومقاوم للضغط والكيماويات',
    coating: 'مقاومة عالية للأحماض والكيماويات ومياه الآبار',
    usage: 'المزارع، محطات الوقود، المصانع، التخزين الصناعي'
  },
  'b-orange-single': {
    title: 'حاجز أمان بولي إيثيلين برتقالي مفرد',
    badge: 'حواجز أمان',
    cap: 'مفرد قابل للتعبئة',
    img: 'assets/images/barrier-orange-single.webp',
    desc: 'حاجز أمان طريق مفرد باللون البرتقالي التحذيري، مصنع من البولي إيثيلين، قابل للملء بالماء أو الرمل لتوفير أقصى اتزان وامتصاص للصدمات.',
    warranty: '3 سنوات ضمان مصنع',
    dims: 'الارتفاع: 80 سم | الطول: 100 سم | العرض: 45 سم',
    material: 'بولي إيثيلين عالي الكثافة (HDPE) عالي المرونة ومقاوم للصدمات',
    coating: 'مقاوم للأشعة فوق البنفسجية UV لثبات اللون + عواكس فوسفورية',
    usage: 'تحويلات الطرق، أعمال الإنشاءات، مواقف السيارات، البوابات'
  },
  'b-blue-single': {
    title: 'حاجز أمان بولي إيثيلين أزرق مفرد',
    badge: 'حواجز أمان',
    cap: 'مفرد قابل للتعبئة',
    img: 'assets/images/barrier-blue-single.webp',
    desc: 'حاجز مروري بولي إيثيلين بلون أزرق قياسي معتمد للمشاريع الإنشائية وتحويلات الطرق والمواقف، مقاوم للأشعة فوق البنفسجية.',
    warranty: '3 سنوات ضمان مصنع',
    dims: 'الارتفاع: 80 سم | الطول: 100 سم | العرض: 45 سم',
    material: 'بولي إيثيلين عالي الكثافة (HDPE) صلب ومقاوم للصدمات',
    coating: 'معالج ضد التشققات وبهتان اللون ومقاوم للرياح',
    usage: 'المشروعات الهندسية، تنظيم السير، الحراسات الأمنية'
  },
  'b-orange-chain': {
    title: 'سلسلة حواجز أمان برتقالية متصلة',
    badge: 'حواجز أمان',
    cap: 'نظام تعشيق مترابط',
    img: 'assets/images/barrier-orange-chain.webp',
    desc: 'سلسلة حواجز أمان بولي إيثيلين برتقالية مزودة بنظام تعشيق متكامل لتشكيل جدار أمان مروري متصل على الطرق السريعة.',
    warranty: '3 سنوات ضمان مصنع',
    dims: 'نظام ترابط ممتد | وحدة 100 سم × 80 سم',
    material: 'بولي إيثيلين عالي الكثافة (HDPE) مع لسان تعشيق صلب',
    coating: 'ألوان تحذيرية عاكسة للضوء ليلاً لتأمين الطرق',
    usage: 'الطرق السريعة، المحاور الرئيسية، المشروعات الكبرى'
  },
  'b-blue-chain': {
    title: 'سلسلة حواجز أمان زرقاء متصلة',
    badge: 'حواجز أمان',
    cap: 'نظام تعشيق مترابط',
    img: 'assets/images/barrier-blue-chain.webp',
    desc: 'منظومة حواجز أمان بولي إيثيلين زرقاء مترابطة لتحديد المناطق الأمنية والإنشائية وتنظيم حركة الشاحنات والمركبات.',
    warranty: '3 سنوات ضمان مصنع',
    dims: 'نظام ترابط ممتد | وحدة 100 سم × 80 سم',
    material: 'بولي إيثيلين عالي الكثافة معزز لمقاومة الصدمات وارتطام المركبات',
    coating: 'عاكسات فوسفورية معتمدة لمطابقة معايير السلامة المرورية',
    usage: 'المناطق الأمنية، محيط المنشآت، مصانع ومستودعات، مواقف'
  },
  'booth-1': {
    title: 'كشك شواطئ فيبر جلاس دائري مفتوح (برج إنقاذ ومراقبة)',
    badge: 'أكشاك شواطئ',
    cap: 'دائري مفتوح قطر 105 سم',
    img: 'assets/images/guard-booth-1.webp',
    desc: 'كشك دائري انسيابي مفتوح بقبة زرقاء مصمم خصيصاً للشواطئ والمنتجعات والمسابح ونقاط الإنقاذ، مزود بمقعد داخلي مدمج ومقاوم تماماً للأملاح والرطوبة وأشعة الشمس.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'القطر: 105 سم | الارتفاع: 220 سم',
    material: 'فيبر جلاس مسلح بالبوليستر النقي المعالج ضد الأملاح وعوامل التعرية',
    coating: 'جل كوت بحري عالي النقاء مقاوم للأشعة فوق البنفسجية UV والمياه المالحة',
    usage: 'الشواطئ، المسابح والنوادي، أبراج ونقاط الإنقاذ، القرى السياحية'
  },
  'booth-2': {
    title: 'كشك حراسة فيبر جلاس مربع 105 × 105 سم (أورانج)',
    badge: 'الأكثر طلباً',
    cap: 'مربع 105 × 105 سم',
    img: 'assets/images/guard-booth-2.webp',
    desc: 'المقاس الاقتصادي الأكثر طلباً للبوابات والمصانع ومواقف السيارات، مجهز بباب وشباك ألوميتال برتقالي وزجاج، وسقف وقاعدة برتقالية مع عزل حراري كامل.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 105 × 105 سم | الارتفاع: 225 سم',
    material: 'فيبر جلاس فائق الصلابة مدعم بهيكل أمان وعزل فوم بولي يوريثان',
    coating: 'تشطيب برتقالي وأبيض ثابت الألوان ضد أشعة الشمس وعوامل الطقس',
    usage: 'المصانع، المدارس، البنوك، مواقف السيارات، بوابات الشركات'
  },
  'booth-3': {
    title: 'كشك حراسة فيبر جلاس دائري كلاسيك قطر 105 سم',
    badge: 'دائري كلاسيك',
    cap: 'قطر 105 سم بيج',
    img: 'assets/images/guard-booth-3.webp',
    desc: 'كشك حراسة أسطواني الشكل بلون بيج راقٍ يعطي طابعاً معمارياً متميزاً، مزود بباب نصف دائري محكم الإغلاق ونوافذ ألوميتال جانبية.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'القطر: 105 سم | الارتفاع: 230 سم',
    material: 'ألياف زجاجية مقواة (GRP) متعددة الطبقات مع عزل حراري فائق',
    coating: 'جل كوت بيج فاخر مقاوم للخدش والأتربة وتقلبات درجات الحرارة',
    usage: 'الكمبوندات، واجهات القصور والفلل، المجمعات السكنية والإدارية'
  },
  'booth-4': {
    title: 'كشك حراسة فيبر جلاس سقف قرميد 150 × 150 سم',
    badge: 'بوابات ومشاريع',
    cap: 'مربع 150 × 150 سم',
    img: 'assets/images/guard-booth-4.webp',
    desc: 'كشك حراسة بمساحة رحبة تتسع لفردين ومكتب وأجهزة كمبيوتر ومراقبة، مصمم بسقف قرميدي هرمي فخم يعزل مياه الأمطار والحرارة الشديدة.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 150 × 150 سم | الارتفاع: 240 سم',
    material: 'فيبر جلاس عالي الكثافة مع سقف قرميدي مضلع وعزل بولي يوريثان',
    coating: 'مقاومة تامة لعوامل التعرية الجوية، غير قابل للصدأ أو التأكل',
    usage: 'بوابات المشروعات الكبرى، الموانئ، المعارض، بوابات التفتيش الأمني'
  },
  'booth-5': {
    title: 'كشك حراسة فيبر جلاس سقف قرميد 120 × 120 سم (أخضر)',
    badge: 'طراز حدائق ونوادي',
    cap: 'مربع 120 × 120 سم',
    img: 'assets/images/guard-booth-5.webp',
    desc: 'كشك حراسة أنيق باللونين الأبيض والأخضر يتناسق مع الحدائق والنوادي والمزارع، مجهز بسقف قرميد أخضر، باب وشباك ألوميتال أخضر، ومخارج كهرباء خارجية.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 120 × 120 سم | الارتفاع: 235 سم',
    material: 'فيبر جلاس مسلح بأعمدة زوايا خضراء معززة وسقف عازل للمطر والحرارة',
    coating: 'دهان جل كوت أخضر وأبيض مقاوم للبهتان والأشعة فوق البنفسجية',
    usage: 'النوادي الرياضية، الحدائق، المزارع، الكمبوندات الخضراء، المدارس'
  },
  'booth-6': {
    title: 'كشك حمام متنقل فيبر جلاس W.C (دورة مياه متنقلة جاهزة)',
    badge: 'صحي متنقل W.C',
    cap: '100 × 100 سم W.C',
    img: 'assets/images/guard-booth-6.webp',
    desc: 'كابينة دورة مياه متنقلة جاهزة ومجهزة بالكامل للاستخدام الفوري في مواقع الإنشاءات والمشاريع والفعاليات والمزارع، مزودة بأرضية مانعة للانزلاق وتجهيزات سباكة كاملة.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 100 × 100 سم | الارتفاع: 230 سم',
    material: 'فيبر جلاس صحي مضاد للبكتيريا ومقاوم للمياه والمطهرات الكيميائية',
    coating: 'أرضية فيبر مقاومة للانزلاق، شباك تهوية علوي، وتجهيزات سباكة جاهزة',
    usage: 'مواقع المقاولات والإنشاءات، المزارع، الفعاليات المفتوحة، الحقول النفطية'
  },
  'booth-7': {
    title: 'كشك حراسة أمني فردي سقف مائل 105 × 105 سم (أزرق)',
    badge: 'أمني فردي',
    cap: '105 × 105 سم أزرق',
    img: 'assets/images/guard-booth-7.webp',
    desc: 'كشك حراسة فردي مدمج بتصميم أمني قوي ونقش هندسي جانبي X، مجهز بسقف مائل لتصريف مياه الأمطار وباب ألوميتال أزرق وشباك مراقبة.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 105 × 105 سم | الارتفاع: 230 سم',
    material: 'فيبر جلاس مقوى بجوانب مدعمة ومقاومة للاصطدام والعوامل الجوية',
    coating: 'طبقة حماية ضد التآكل والحرارة وألوان زرقاء وبيضاء ثابتة',
    usage: 'الحواجز المرورية والأمنية، البوابات الفرعية، كبائن تحصيل الرسوم'
  },
  'booth-8': {
    title: 'كشك حراسة مشطوف الزوايا سقف هرمي 120 × 120 سم',
    badge: 'مشطوف الزوايا VIP',
    cap: '120 × 120 سم مثمن',
    img: 'assets/images/guard-booth-8.webp',
    desc: 'تصميم هندسي متقدم بأركان مشطوفة يمنح الكشك متانة إضافية ومجال رؤية أوسع للحارس، مع سقف هرمي متعدد الأوجه ومظهر ديكوري فخم.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 120 × 120 سم | الارتفاع: 240 سم',
    material: 'فيبر جلاس مسلح بزوايا مشطوفة معززة وعزل حراري كامل',
    coating: 'جل كوت غير قابل للاشتعال ومقاوم للأتربة وعوامل الطقس المتغيرة',
    usage: 'الكمبوندات الفاخرة، المصانع، مقار الشركات، المراكز الطبية'
  },
  'booth-9': {
    title: 'كشك حراسة وإدارة بوابات مستطيل 150 × 200 سم (سقف قرميد)',
    badge: 'سعة كبرى',
    cap: 'مستطيل 150 × 200 سم',
    img: 'assets/images/guard-booth-9.webp',
    desc: 'كابينة أمنية وإدارية فسيحة تصلح لغرف المراقبة والتحكم، بوابات الشركات، ونقاط تفتيش المزارع والمصانع، تتسع لطاقم عمل ومعدات تقنية.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'الأبعاد: 150 × 200 سم | الارتفاع: 240 سم',
    material: 'فيبر جلاس عالي الكثافة مع سقف قرميدي مائل وعوازل حرارية وصوتية',
    coating: 'مقاومة كيميائية وجوية شاملة وتشطيب بيج فاخر سهل التنظيف',
    usage: 'غرف تحكم المراقبة، بوابات وزن الشاحنات، المستودعات، المشروعات الكبرى'
  },
  'booth-10': {
    title: 'كشك حراسة فيبر جلاس دائري بانورامي قطر 120 سم',
    badge: 'دائري بانورامي',
    cap: 'قطر 120 سم كلاسيك',
    img: 'assets/images/guard-booth-10.webp',
    desc: 'الكشك الدائري الأكثر رواجاً للفنادق والمجمعات السكنية الفاخرة، يجمع بين القبة الزرقاء الكلاسيكية والباب المقوس مع شباك زجاجي منزلق عريض.',
    warranty: '5 سنوات ضمان مصنع',
    dims: 'القطر: 120 سم | الارتفاع: 235 سم',
    material: 'هيكل أسطواني من الفيبر جلاس النقي مع عزل حراري وزجاج سيكوريت',
    coating: 'ألوان ثابتة ضد الأشعة فوق البنفسجية UV ومقاومة للصدمات والصدأ',
    usage: 'الفنادق، المنتجعات، المجمعات الإدارية، واجهات المولات والكمبوند'
  }
};


/* ==========================================================================
   5. Interactive Quote Request Modal Controller
   ========================================================================== */
function initQuoteModal() {
  const modal = document.getElementById('quoteModal');
  const openButtons = document.querySelectorAll('.js-open-quote-modal');
  const closeButtons = document.querySelectorAll('.js-close-quote-modal');
  const quoteForm = document.getElementById('quoteRequestForm');
  const productSelect = document.getElementById('quoteProduct');
  const capacityInput = document.getElementById('quoteCapacity');

  if (!modal) return;

  window.openQuoteModal = (productName = '', capacity = '') => {
    if (productSelect && productName) {
      let matched = false;
      const cleanTarget = productName.trim().toLowerCase();

      // Exact match
      for (let option of productSelect.options) {
        if (option.value.trim().toLowerCase() === cleanTarget || option.text.trim().toLowerCase() === cleanTarget) {
          productSelect.value = option.value;
          matched = true;
          break;
        }
      }

      // Substring match
      if (!matched) {
        for (let option of productSelect.options) {
          const optVal = option.value.trim().toLowerCase();
          if (optVal.includes(cleanTarget) || cleanTarget.includes(optVal)) {
            productSelect.value = option.value;
            matched = true;
            break;
          }
        }
      }

      // If still not matched, add custom option
      if (!matched && productName !== 'طلب عام') {
        const customOpt = document.createElement('option');
        customOpt.value = productName;
        customOpt.textContent = productName;
        customOpt.selected = true;
        productSelect.appendChild(customOpt);
      }
    }

    if (capacityInput && capacity) {
      capacityInput.value = capacity;
    }

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || '';
      const capacity = btn.getAttribute('data-capacity') || '';
      window.openQuoteModal(product, capacity);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quoteName')?.value || 'عميل محترم';
      const phone = document.getElementById('quotePhone')?.value || '';
      const product = document.getElementById('quoteProduct')?.value || 'طلب تسعير عام';
      const capacity = document.getElementById('quoteCapacity')?.value || 'غير محدد';
      const location = document.getElementById('quoteLocation')?.value || 'قليوب / القاهرة الكبرى';
      const notes = document.getElementById('quoteNotes')?.value || 'لا يوجد';

      const message = 
`السلام عليكم ورحمة الله،
أرغب في الحصول على عرض سعر من شركة الشريف لصناعة الخزانات:
- الاسم: ${name}
- رقم الهاتف: ${phone}
- المنتج المطلوب: ${product}
- السعة / الكمية / الأبعاد: ${capacity}
- موقع التوريد: ${location}
- تفاصيل إضافية: ${notes}`;

      const whatsappNumber = '201019132698';
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank');
      closeModal();
      quoteForm.reset();
    });
  }
}

/* ==========================================================================
   5.5 Product Specifications Modal Controller (كارت مواصفات المنتج)
   ========================================================================== */
function initSpecsModal() {
  const specsModal = document.getElementById('specsModal');
  if (!specsModal) return;

  const closeButtons = specsModal.querySelectorAll('.js-close-specs-modal');
  const openButtons = document.querySelectorAll('.js-open-specs-modal');
  const orderBtn = document.getElementById('specsBtnOrder');
  const directWaLink = document.getElementById('specsDirectWa');

  let currentProduct = null;

  const openSpecsModal = (productId) => {
    const data = productsData[productId];
    if (!data) return;

    currentProduct = data;

    const imgEl = document.getElementById('specsModalImg');
    const badgeEl = document.getElementById('specsModalBadge');
    const nameEl = document.getElementById('specsProductName');
    const descEl = document.getElementById('specsProductDesc');
    const capEl = document.getElementById('specsRowCapacity');
    const dimsEl = document.getElementById('specsRowDimensions');
    const matEl = document.getElementById('specsRowMaterial');
    const coatEl = document.getElementById('specsRowCoating');
    const usageEl = document.getElementById('specsRowUsage');
    const warEl = document.getElementById('specsModalWarranty');

    if (imgEl) {
      imgEl.src = data.img;
      imgEl.alt = data.title;
    }
    if (badgeEl) badgeEl.textContent = data.badge;
    if (nameEl) nameEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (capEl) capEl.textContent = data.cap;
    if (dimsEl) dimsEl.textContent = data.dims;
    if (matEl) matEl.textContent = data.material;
    if (coatEl) coatEl.textContent = data.coating;
    if (usageEl) usageEl.textContent = data.usage;
    if (warEl) warEl.textContent = data.warranty;

    if (directWaLink) {
      const msg = encodeURIComponent(`السلام عليكم، أرغب في طلب: ${data.title} من شركة الشريف`);
      directWaLink.href = `https://wa.me/201019132698?text=${msg}`;
    }

    specsModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeSpecsModal = () => {
    specsModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-product-id');
      if (id) openSpecsModal(id);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpecsModal();
    });
  });

  specsModal.addEventListener('click', (e) => {
    if (e.target === specsModal) closeSpecsModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && specsModal.classList.contains('is-active')) {
      closeSpecsModal();
    }
  });

  if (orderBtn) {
    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentProduct) {
        closeSpecsModal();
        if (typeof window.openQuoteModal === 'function') {
          window.openQuoteModal(currentProduct.title, currentProduct.cap);
        }
      }
    });
  }
}


/* ==========================================================================
   6. Products Page Category Filter & Smooth Scroll to First Product
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.modern-product-card, .product-detailed-card');

  if (!filterBtns.length || !productCards.length) return;

  function applyFilter(filterValue) {
    productCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function scrollToFirstProduct(categoryValue) {
    let targetCard = null;
    if (categoryValue && categoryValue !== 'all') {
      // First check for dedicated ID
      if (categoryValue === 'vertical') targetCard = document.getElementById('first-product-vertical');
      else if (categoryValue === 'horizontal') targetCard = document.getElementById('first-product-horizontal');
      else if (categoryValue === 'barriers') targetCard = document.getElementById('first-product-barriers');
      else if (categoryValue === 'booths') targetCard = document.getElementById('first-product-booths');

      if (!targetCard) {
        targetCard = Array.from(productCards).find(card => card.getAttribute('data-category') === categoryValue && card.style.display !== 'none');
      }
    }
    if (!targetCard) {
      targetCard = Array.from(productCards).find(card => card.style.display !== 'none');
    }

    if (targetCard) {
      const headerEl = document.querySelector('.header-main');
      const headerHeight = headerEl ? headerEl.offsetHeight : 70;
      const extraOffset = window.innerWidth <= 768 ? 16 : 24;
      const elementTop = targetCard.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = Math.max(0, elementTop - headerHeight - extraOffset);

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      applyFilter(filterValue);

      // Smooth scroll directly to first product in that category
      scrollToFirstProduct(filterValue);

      // Keep URL hash updated cleanly without jumping
      if (filterValue !== 'all') {
        history.replaceState(null, '', '#' + filterValue);
      } else {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  // Check URL hash on page load or on hashchange (e.g. #vertical, #horizontal, #barriers, #booths)
  const handleHashFilter = (isInitial = false) => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validFilters = ['vertical', 'horizontal', 'barriers', 'booths', 'all'];
    if (hash && validFilters.includes(hash)) {
      const matchingBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
      if (matchingBtn) {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        matchingBtn.classList.add('is-active');
        applyFilter(hash);

        const delay = isInitial ? 280 : 60;
        setTimeout(() => {
          scrollToFirstProduct(hash);
        }, delay);
      }
    }
  };

  handleHashFilter(true);
  window.addEventListener('hashchange', () => handleHashFilter(false));

  if (window.location.hash) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        handleHashFilter(false);
      }, 100);
    });
  }

  // Intercept category links (e.g. in the footer) when already on the products page
  document.querySelectorAll('a[href*="#vertical"], a[href*="#horizontal"], a[href*="#barriers"], a[href*="#booths"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hashIndex = href ? href.indexOf('#') : -1;
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex + 1);
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
        if (targetBtn) {
          e.preventDefault();
          targetBtn.click();
        }
      }
    });
  });
}

/* ==========================================================================
   6.5 Home Page Category Cards Click Handler
   ========================================================================== */
function initHomeProductCards() {
  const homeCards = document.querySelectorAll('.products-grid-home .modern-product-card');
  homeCards.forEach(card => {
    const link = card.querySelector('.btn-category-browse');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a, button')) {
          link.click();
        }
      });
    }
  });
}

/* ==========================================================================
   7. Contact Form Handler (Opens WhatsApp with structured query)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactPageForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value || '';
    const phone = document.getElementById('contactPhone')?.value || '';
    const subject = document.getElementById('contactSubject')?.value || 'استفسار عام';
    const messageText = document.getElementById('contactMessage')?.value || '';

    const message = 
`السلام عليكم، استفسار جديد عبر الموقع الإلكتروني لشركة الشريف للخزانات:
- الاسم: ${name}
- الهاتف: ${phone}
- الموضوع: ${subject}
- نص الرسالة: ${messageText}`;

    const whatsappNumber = '201019132698';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    contactForm.reset();
  });
}

/* ==========================================================================
   8. Barrier Gallery Thumbnail Switcher
   ========================================================================== */
function initBarrierGallery() {
  const thumbsContainer = document.getElementById('barrierThumbs');
  const mainImg = document.getElementById('barrierMainImg');
  if (!thumbsContainer || !mainImg) return;

  const thumbButtons = thumbsContainer.querySelectorAll('.barrier-thumb-btn');
  thumbButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSrc = btn.getAttribute('data-img');
      if (!targetSrc) return;

      mainImg.style.opacity = '0.4';
      mainImg.src = targetSrc;
      mainImg.onload = () => {
        mainImg.style.opacity = '1';
      };

      thumbButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

/* ==========================================================================
   9. Scroll To Top Floating Button (زر الصعود لأعلى الصفحة)
   ========================================================================== */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  const toggleScrollBtn = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    if (scrollPos > 250) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });
  toggleScrollBtn();

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

