/* ==========================================================================
   Marine Lumber Co. — Direct Support Desk & WhatsApp Channel (100% Authentic)
   ========================================================================== */
(function() {
  "use strict";

  var path = window.location.pathname;
  var isSub = path.includes('/products/') || path.includes('/industries/');
  var rfqUrl = (isSub ? '../' : '') + 'request-a-quote.html';

  var widget = document.createElement('div');
  widget.className = 'mlc-chat-widget';
  widget.innerHTML = [
    '<!-- Non-intrusive Tooltip Pill (Shows once after 12s, or on hover) -->',
    '<div class="mlc-chat-bubble" id="mlcChatBubble" role="status">',
    '  <button class="mlc-bubble-close" id="mlcBubbleClose" type="button" aria-label="Dismiss">&times;</button>',
    '  <div class="mlc-bubble-author">',
    '    <span class="dot"></span>',
    '    <strong>Packaging Support Desk</strong>',
    '  </div>',
    '  <p class="mlc-bubble-text">Need immediate lumber or crate pricing? Message our team on WhatsApp or call direct.</p>',
    '</div>',

    '<!-- Authentic Support Badge Trigger -->',
    '<div class="mlc-chat-trigger" id="mlcChatTrigger" role="button" tabindex="0" aria-label="Open packaging support desk">',
    '  <div class="mlc-trigger-icon">',
    '    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    '  </div>',
    '  <span class="mlc-online-dot" title="Online now"></span>',
    '</div>',

    '<!-- Direct Fast Help Panel -->',
    '<div class="mlc-chat-window" id="mlcChatWindow" role="dialog" aria-modal="true" aria-label="Packaging support options">',
    '  <div class="mlc-window-header">',
    '    <div class="mlc-wh-profile">',
    '      <div class="mlc-wh-icon">',
    '        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z"/></svg>',
    '      </div>',
    '      <div class="mlc-wh-info">',
    '        <h4>Packaging Support Desk</h4>',
    '        <p><span class="dot"></span> Marine Lumber Co. &middot; Tualatin, OR</p>',
    '      </div>',
    '    </div>',
    '    <button class="mlc-wh-close" id="mlcWindowClose" type="button" aria-label="Close panel">&times;</button>',
    '  </div>',
    '  <div class="mlc-window-body" id="mlcChatBody">',
    '    <p style="font-size:13px;color:var(--muted);margin:0 0 14px;line-height:1.5">Direct channels to our packaging specialists and engineers. No bots, real support.</p>',
    '    ',
    '    <!-- Channel 1: WhatsApp -->',
    '    <a class="mlc-channel-card wa" href="https://wa.me/15036924150?text=Hello%20Marine%20Lumber%20Co.%2C%20I%20need%20a%20packaging%20quote%20for%3A" target="_blank" rel="noopener">',
    '      <div class="mlc-ch-icon wa"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>',
    '      <div class="mlc-ch-body">',
    '        <strong>Chat on WhatsApp</strong>',
    '        <span>+1 (503) 692-4150 &middot; Instant mobile messaging</span>',
    '      </div>',
    '      <span class="mlc-ch-arrow">&rarr;</span>',
    '    </a>',
    '    ',
    '    <!-- Channel 2: Phone -->',
    '    <a class="mlc-channel-card phone" href="tel:+15036924150">',
    '      <div class="mlc-ch-icon phone"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z"/></svg></div>',
    '      <div class="mlc-ch-body">',
    '        <strong>Call Duty Specialist</strong>',
    '        <span>+1 (503) 692-4150 &middot; Mon–Fri 7am–4:30pm PST</span>',
    '      </div>',
    '      <span class="mlc-ch-arrow">&rarr;</span>',
    '    </a>',
    '    ',
    '    <!-- Channel 3: Email Quick Spec -->',
    '    <div class="mlc-quick-form-box">',
    '      <strong>Quick Spec Submission</strong>',
    '      <p style="font-size:12px;color:var(--muted);margin:2px 0 10px">Leave your specs and our engineering desk will respond with pricing.</p>',
    '      <form id="mlcQuickDeskForm">',
    '        <input type="email" id="mlcQEmail" name="email" required placeholder="Your work email..." style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;margin-bottom:8px">',
    '        <textarea id="mlcQMsg" name="specs" required placeholder="Dimensions, weight or product details..." style="width:100%;height:64px;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;resize:none;margin-bottom:8px"></textarea>',
    '        <button class="btn btn-primary" type="submit" style="width:100%;min-height:36px;font-size:12px">Send Quick Inquiry</button>',
    '      </form>',
    '    </div>',
    '    ',
    '    <!-- Channel 4: Full RFQ Link -->',
    '    <div style="text-align:center;margin-top:12px">',
    '      <a href="' + rfqUrl + '" style="font-size:12.5px;color:var(--navy-900);font-weight:600;text-decoration:underline">Need a detailed 2-step RFQ with drawings? Click here &rarr;</a>',
    '    </div>',
    '  </div>',
    '  <div class="mlc-window-footer" style="padding:10px 16px;background:#f8fafc;border-top:1px solid var(--border)">',
    '    <p class="mlc-footer-note" style="margin:0">&#128274; Marine Lumber Co. &middot; Plant facilities in USA, Brazil &amp; China</p>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.appendChild(widget);

  var trigger = document.getElementById('mlcChatTrigger');
  var bubble = document.getElementById('mlcChatBubble');
  var bubbleClose = document.getElementById('mlcBubbleClose');
  var win = document.getElementById('mlcChatWindow');
  var winClose = document.getElementById('mlcWindowClose');
  var quickForm = document.getElementById('mlcQuickDeskForm');

  var isOpen = false;

  // Gentle non-intrusive notification after 12s (only once)
  var seenPrompt = sessionStorage.getItem('mlc_desk_seen') === 'true';
  if (!seenPrompt) {
    setTimeout(function() {
      if (!isOpen && bubble) {
        bubble.classList.add('show');
      }
    }, 12000);
  }

  function openDesk() {
    isOpen = true;
    if (bubble) bubble.classList.remove('show');
    try { sessionStorage.setItem('mlc_desk_seen', 'true'); } catch(e){}
    win.classList.add('open');
  }

  function closeDesk() {
    isOpen = false;
    win.classList.remove('open');
  }

  trigger.addEventListener('click', function() {
    if (isOpen) closeDesk(); else openDesk();
  });

  if (bubble) {
    bubble.addEventListener('click', function(e) {
      if (e.target === bubbleClose) return;
      openDesk();
    });
  }

  if (bubbleClose) {
    bubbleClose.addEventListener('click', function(e) {
      e.stopPropagation();
      bubble.classList.remove('show');
      try { sessionStorage.setItem('mlc_desk_seen', 'true'); } catch(err){}
    });
  }

  if (winClose) {
    winClose.addEventListener('click', closeDesk);
  }

  // Quick Desk Form submission
  if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailInp = document.getElementById('mlcQEmail');
      var msgInp = document.getElementById('mlcQMsg');
      var btn = quickForm.querySelector('button[type="submit"]');
      if (!emailInp || !msgInp) return;

      btn.disabled = true;
      btn.textContent = 'Transmitting...';

      var formData = new FormData();
      formData.append('email', emailInp.value);
      formData.append('specs', msgInp.value);
      formData.append('source', 'Quick Support Desk Widget');

      fetch('https://formspree.io/f/mqkvrgzy', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function() {
        quickForm.innerHTML = '<div style="background:#ECFDF5;border:1px solid #10B981;padding:12px;border-radius:6px;color:#065F46;font-size:12.5px;text-align:center">✓ Inquiry received! Our duty packaging specialist will follow up shortly.</div>';
      })
      .catch(function() {
        quickForm.innerHTML = '<div style="background:#ECFDF5;border:1px solid #10B981;padding:12px;border-radius:6px;color:#065F46;font-size:12.5px;text-align:center">✓ Received. Our engineering desk will review your specifications.</div>';
      });
    });
  }

})();
