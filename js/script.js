// ============================================
// A JOB THAT LEGALLY DOES NOT EXIST — shared script
// Used by index.html and every exhibit page.
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Scroll progress bar ----------
  var bar = document.getElementById('scrollbar');
  function updateBar(){
    if(!bar) return;
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateBar);
  updateBar();

  // ---------- Nav background on scroll ----------
  var nav = document.querySelector('.site-nav');
  function updateNav(){
    if(!nav) return;
    if(window.scrollY > 40){ nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ---------- Mobile menu toggle ----------
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // ---------- Reveal-on-scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // ---------- Count-up stats ----------
  var stats = document.querySelectorAll('[data-count]');
  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if(progress < 1){ requestAnimationFrame(step); }
      else { el.textContent = target + suffix; }
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && stats.length){
    var countIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(function(el){ countIO.observe(el); });
  }

});
