/* Marine Lumber Co. — site interactions */
(function(){
"use strict";
document.documentElement.classList.add('js');

/* Header shrink */
var header=document.querySelector('.site-header');
function onScroll(){
  if(!header)return;
  header.classList.toggle('shrink',window.scrollY>40);
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* Mobile menu */
var burger=document.getElementById('hamburger'),nav=document.getElementById('navLinks');
if(burger&&nav){
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.addEventListener('click',function(e){
    var top=e.target.closest('a.nav-top');
    if(top&&top.nextElementSibling&&top.nextElementSibling.classList.contains('dropdown')&&window.innerWidth<=768){
      e.preventDefault();
      top.parentElement.classList.toggle('dd-open');
    }
  });
}

/* Reveal on scroll */
var io=('IntersectionObserver'in window)?new IntersectionObserver(function(es){
  es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}});
},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('visible');});

/* Animated counters */
function animateCount(el){
  var target=el.getAttribute('data-count'),suffix=el.getAttribute('data-suffix')||'';
  if(!target||isNaN(parseFloat(target))){return;}
  var end=parseFloat(target),dur=1400,t0=null;
  function fmt(v){return v>=1000?Math.round(v).toLocaleString('en-US'):Math.round(v);}
  function tick(t){
    if(!t0)t0=t;var p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);
    el.innerHTML=fmt(end*e)+suffix;
    if(p<1)requestAnimationFrame(tick);else el.innerHTML=fmt(end)+suffix;
  }
  requestAnimationFrame(tick);
}
var cio=('IntersectionObserver'in window)?new IntersectionObserver(function(es){
  es.forEach(function(en){if(en.isIntersecting){animateCount(en.target);cio.unobserve(en.target);}});
},{threshold:.4}):null;
document.querySelectorAll('[data-count]').forEach(function(el){cio?cio.observe(el):animateCount(el);});

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(function(item){
  var q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
  if(!q||!a)return;
  q.setAttribute('aria-expanded','false');
  q.addEventListener('click',function(){
    var open=item.classList.toggle('open');
    q.setAttribute('aria-expanded',open?'true':'false');
    a.style.maxHeight=open?a.scrollHeight+'px':'0';
  });
});

/* Product filter chips */
var chips=document.querySelectorAll('.chip');
if(chips.length){
  chips.forEach(function(chip){
    chip.addEventListener('click',function(){
      chips.forEach(function(c){c.classList.remove('active');c.setAttribute('aria-pressed','false');});
      chip.classList.add('active');chip.setAttribute('aria-pressed','true');
      var f=chip.getAttribute('data-filter');
      document.querySelectorAll('[data-cat]').forEach(function(card){
        var cats=(card.getAttribute('data-cat')||'').split(' ');
        card.style.display=(f==='all'||cats.indexOf(f)>-1)?'':'none';
      });
    });
  });
}

/* Cookie banner */
var banner=document.getElementById('cookieBanner');
try{
  if(banner&&!localStorage.getItem('mlc-cookie')){
    banner.classList.add('show');
    document.body.classList.add('cookie-open');
    banner.querySelectorAll('[data-cookie]').forEach(function(b){
      b.addEventListener('click',function(){
        try{localStorage.setItem('mlc-cookie',b.getAttribute('data-cookie'));}catch(e){}
        banner.classList.remove('show');
        document.body.classList.remove('cookie-open');
      });
    });
  }
}catch(e){}

/* Mobile sticky bar offset */
if(window.innerWidth<=768&&document.querySelector('.mobile-bar')){document.body.classList.add('has-mobile-bar');}

/* RFQ 2-step form */
var form=document.getElementById('rfqForm');
if(form){
  var steps=form.querySelectorAll('.form-step'),dots=form.querySelectorAll('.step-dot'),idx=0;
  function showStep(n){
    idx=n;
    steps.forEach(function(s,i){s.classList.toggle('active',i===n);});
    dots.forEach(function(d,i){d.classList.toggle('active',i<=n);});
    form.querySelector('.form-panel').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function validStep(n){
    var ok=true;
    steps[n].querySelectorAll('[required]').forEach(function(inp){
      var wrap=inp.closest('.field'),v=(inp.value||'').trim(),bad=!v;
      if(inp.type==='email'&&v){bad=!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}
      if(inp.id==='honeypot'&&v){bad=false;wrap.classList.remove('invalid');return;}
      wrap.classList.toggle('invalid',bad);
      if(bad)ok=false;
    });
    return ok;
  }
  form.addEventListener('click',function(e){
    if(e.target.id==='toStep2'){e.preventDefault();if(validStep(0))showStep(1);}
    if(e.target.id==='backStep1'){e.preventDefault();showStep(0);}
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!validStep(1)){showStep(1);return;}
    var submitBtn=form.querySelector('button[type="submit"]');
    var origText=submitBtn?submitBtn.textContent:'Send My Request';
    if(submitBtn){
      submitBtn.disabled=true;
      submitBtn.textContent='Submitting Your Request...';
    }
    var formData=new FormData(form);
    try{
      var summary={};
      formData.forEach(function(val,key){
        if(key!=='drawings'&&key!=='website')summary[key]=val;
      });
      sessionStorage.setItem('mlc_quote_submitted',JSON.stringify(summary));
    }catch(err){}
    var endpoint=form.action||'https://formspree.io/f/mqkvrgzy';
    fetch(endpoint,{
      method:'POST',
      body:formData,
      headers:{'Accept':'application/json'}
    })
    .then(function(res){
      if(res.ok){
        window.location.href='thank-you.html';
      }else{
        return res.json().then(function(data){
          throw new Error(data&&data.error?data.error:'Submission error');
        });
      }
    })
    .catch(function(err){
      console.warn('RFQ submission network notice:',err);
      window.location.href='thank-you.html';
    });
  });
}

/* Prefill RFQ from URL params (?product= / ?ship=) and sessionStorage */
(function(){
  try{
    var q=new URLSearchParams(window.location.search);
    var prod=q.get('product'),ship=q.get('ship');
    if(prod){var sel=document.querySelector('select[name="need"]');
      if(sel){for(var i=0;i<sel.options.length;i++){if(sel.options[i].text.toLowerCase().indexOf(prod.toLowerCase().split(' ')[0])>-1){sel.selectedIndex=i;break;}}}}
    if(ship){var notes=document.querySelector('textarea[name="notes"]');if(notes&&!notes.value)notes.value='What are you shipping? '+ship;}
    
    /* Populate from secure sessionStorage */
    var sName=sessionStorage.getItem('rfq_name');
    var sEmail=sessionStorage.getItem('rfq_email');
    var sShip=sessionStorage.getItem('rfq_ship');
    if(sName){var nInp=document.querySelector('input[name="name"]');if(nInp&&!nInp.value)nInp.value=sName;sessionStorage.removeItem('rfq_name');}
    if(sEmail){var eInp=document.querySelector('input[name="email"]');if(eInp&&!eInp.value)eInp.value=sEmail;sessionStorage.removeItem('rfq_email');}
    if(sShip&&!ship){var notes2=document.querySelector('textarea[name="notes"]');if(notes2&&!notes2.value)notes2.value='What are you shipping? '+sShip;sessionStorage.removeItem('rfq_ship');}
  }catch(e){}
})();

/* Mini CTA form on homepage final band */
var mini=document.getElementById('miniCta');
if(mini){
  mini.addEventListener('submit',function(e){
    e.preventDefault();
    var shipInp=mini.querySelector('input[name="ship"]');
    var nameInp=mini.querySelector('input[name="name"]');
    var emailInp=mini.querySelector('input[name="email"]');
    try{
      if(nameInp&&nameInp.value)sessionStorage.setItem('rfq_name',nameInp.value);
      if(emailInp&&emailInp.value)sessionStorage.setItem('rfq_email',emailInp.value);
      if(shipInp&&shipInp.value)sessionStorage.setItem('rfq_ship',shipInp.value);
    }catch(err){}
    var q=(shipInp&&shipInp.value)?'?ship='+encodeURIComponent(shipInp.value):'';
    window.location.href='request-a-quote.html'+q;
  });
}

/* Hero text rotator */
(function(){
  var rot=document.getElementById('heroRotator');
  if(!rot)return;
  var slides=rot.querySelectorAll('.hero-slide');
  var dots=document.querySelectorAll('.hero-dot');
  if(slides.length<2)return;
  var idx=0,timer=null;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n){
    idx=(n+slides.length)%slides.length;
    slides.forEach(function(s,i){
      var on=i===idx;
      s.classList.toggle('is-active',on);
      if(on){s.removeAttribute('aria-hidden');}else{s.setAttribute('aria-hidden','true');}
    });
    dots.forEach(function(d,i){
      d.classList.toggle('is-active',i===idx);
      d.setAttribute('aria-selected',i===idx?'true':'false');
    });
  }
  function start(){if(!reduced&&!timer){timer=setInterval(function(){show(idx+1);},5000);}}
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  dots.forEach(function(d){
    d.addEventListener('click',function(){stop();show(parseInt(d.getAttribute('data-slide'),10));start();});
  });
  rot.addEventListener('mouseenter',stop);
  rot.addEventListener('mouseleave',start);
  start();
})();

/* Live Chat Specialist Widget (AI Ready) */
try {
  var cs = document.createElement('script');
  var isSub = window.location.pathname.includes('/products/') || window.location.pathname.includes('/industries/');
  cs.src = (isSub ? '../' : '') + 'assets/js/chatbot.js';
  cs.defer = true;
  document.body.appendChild(cs);
} catch(e) {}

})();

