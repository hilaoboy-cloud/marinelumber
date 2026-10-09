/* ==========================================================================
   Marine Lumber Co. — Interactive AI Chatbot (VPS Ready & Client Fallback)
   ========================================================================== */
window.MLC_CHAT_CONFIG = {
  // VPS AI 真实后端接口
  vpsEndpoint: "https://0230.ccwu.cc/api/chat", 
  specialistName: "Elena Vance",
  specialistRole: "AI Packaging Specialist",
  phone: "+1 (503) 692-4150",
  whatsappUrl: "https://wa.me/15036924150?text=Hello%20Marine%20Lumber%20Co.%2C%20I%20have%20a%20packaging%20inquiry%3A",
  email: "sales@marinelumberco.com"
};

(function() {
  "use strict";

  var path = window.location.pathname;
  var isSub = path.includes('/products/') || path.includes('/industries/');
  var imgPrefix = isSub ? '../assets/img/' : 'assets/img/';
  var rfqUrl = (isSub ? '../' : '') + 'request-a-quote.html';
  var avatarSrc = imgPrefix + 'support-specialist.webp?v=20261009_whitesuit_final';
  var avatarFallback = imgPrefix + 'support-specialist.jpg?v=20261009_whitesuit_final';

  var conversationHistory = [];

  var widget = document.createElement('div');
  widget.className = 'mlc-chat-widget';
  widget.innerHTML = [
    '<!-- Auto Greeting Bubble (Shows after 3.5s) -->',
    '<div class="mlc-chat-bubble" id="mlcChatBubble" role="status">',
    '  <button class="mlc-bubble-close" id="mlcBubbleClose" type="button" aria-label="Dismiss">&times;</button>',
    '  <div class="mlc-bubble-author">',
    '    <span class="dot"></span>',
    '    <strong>' + window.MLC_CHAT_CONFIG.specialistName + ' &middot; ' + window.MLC_CHAT_CONFIG.specialistRole + '</strong>',
    '  </div>',
    '  <p class="mlc-bubble-text">Hi there! Looking for custom crate sizing, pallets or direct lumber pricing today?</p>',
    '</div>',

    '<!-- Floating Specialist Avatar Trigger -->',
    '<div class="mlc-chat-trigger" id="mlcChatTrigger" role="button" tabindex="0" aria-label="Chat with Elena, Technical Packaging Assistant">',
    '  <div class="mlc-trigger-avatar">',
    '    <img src="' + avatarSrc + '" onerror="this.src=\'' + avatarFallback + '\'" alt="' + window.MLC_CHAT_CONFIG.specialistName + '" width="62" height="62" loading="lazy">',
    '  </div>',
    '  <span class="mlc-online-dot" title="Online now"></span>',
    '  <span class="mlc-unread-badge" id="mlcUnreadBadge">1</span>',
    '</div>',

    '<!-- Chat Window -->',
    '<div class="mlc-chat-window" id="mlcChatWindow" role="dialog" aria-modal="true" aria-label="Chat with Packaging Specialist">',
    '  <!-- Header -->',
    '  <div class="mlc-window-header">',
    '    <div class="mlc-wh-profile">',
    '      <div class="mlc-wh-avatar">',
    '        <img src="' + avatarSrc + '" onerror="this.src=\'' + avatarFallback + '\'" alt="' + window.MLC_CHAT_CONFIG.specialistName + '">',
    '      </div>',
    '      <div class="mlc-wh-info">',
    '        <h4>' + window.MLC_CHAT_CONFIG.specialistName + '</h4>',
    '        <p><span class="dot"></span> ' + window.MLC_CHAT_CONFIG.specialistRole + ' &middot; Marine Lumber Co.</p>',
    '      </div>',
    '    </div>',
    '    <div style="display:flex;align-items:center;gap:8px">',
    '      <a href="' + window.MLC_CHAT_CONFIG.whatsappUrl + '" target="_blank" rel="noopener" title="Open WhatsApp" style="color:#25D366;display:flex;align-items:center;padding:4px"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>',
    '      <button class="mlc-wh-close" id="mlcWindowClose" type="button" aria-label="Close chat">&times;</button>',
    '    </div>',
    '  </div>',
    '  <!-- Chat History Stream -->',
    '  <div class="mlc-window-body" id="mlcChatBody">',
    '    <div class="mlc-time-divider">Packaging AI Desk &middot; Online</div>',
    '    <div class="mlc-msg sarah">',
    '      <div class="mlc-msg-bubble">',
    '        Hello! I\'m Elena, Marine Lumber\'s packaging specialist assistant. I can calculate crate estimates, check ISPM-15 export rules, or quote cut lumber across our USA, Brazil &amp; China plants.<br><br>What are you shipping or building today?',
    '      </div>',
    '    </div>',
    '    <div class="mlc-quick-replies" id="mlcQuickReplies">',
    '      <button class="mlc-quick-btn" type="button" data-query="Can you quote custom crates for machinery?">📦 Custom Wood Crates</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="Do you supply cut-to-size lumber and plywood?">🪵 Cut Lumber &amp; Plywood</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="Are your crates ISPM 15 export certified?">📜 ISPM-15 Export Rules</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="How do I speak with an engineer or call?">📞 Speak with Engineer</button>',
    '    </div>',
    '    <div class="mlc-typing" id="mlcTyping">',
    '      <span class="mlc-typing-dot"></span>',
    '      <span class="mlc-typing-dot"></span>',
    '      <span class="mlc-typing-dot"></span>',
    '    </div>',
    '  </div>',
    '  <!-- Footer Input Form -->',
    '  <form class="mlc-window-footer" id="mlcChatForm">',
    '    <div class="mlc-input-row">',
    '      <input class="mlc-chat-input" id="mlcChatInput" type="text" placeholder="Ask about crates, lumber, or specs..." autocomplete="off">',
    '      <button class="mlc-chat-send" type="submit" aria-label="Send message">',
    '        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    '      </button>',
    '    </div>',
    '    <p class="mlc-footer-note">&#128274; Direct AI Desk &middot; Or call <a href="tel:+15036924150" style="color:inherit;text-decoration:underline">+1 (503) 692-4150</a></p>',
    '  </form>',
    '</div>'
  ].join('\n');

  document.body.appendChild(widget);

  var trigger = document.getElementById('mlcChatTrigger');
  var bubble = document.getElementById('mlcChatBubble');
  var bubbleClose = document.getElementById('mlcBubbleClose');
  var unreadBadge = document.getElementById('mlcUnreadBadge');
  var win = document.getElementById('mlcChatWindow');
  var winClose = document.getElementById('mlcWindowClose');
  var body = document.getElementById('mlcChatBody');
  var typing = document.getElementById('mlcTyping');
  var form = document.getElementById('mlcChatForm');
  var input = document.getElementById('mlcChatInput');
  var quickReplies = document.getElementById('mlcQuickReplies');

  var isOpen = false;

  // Auto trigger greeting after 3.5s
  var seenPrompt = sessionStorage.getItem('mlc_desk_seen') === 'true';
  if (!seenPrompt) {
    setTimeout(function() {
      if (!isOpen) {
        if (bubble) bubble.classList.add('show');
        if (unreadBadge) unreadBadge.classList.add('active');
        if (trigger) trigger.classList.add('greet-shake');
      }
    }, 3500);
  }

  function openChat() {
    isOpen = true;
    if (bubble) bubble.classList.remove('show');
    if (unreadBadge) unreadBadge.classList.remove('active');
    if (trigger) trigger.classList.remove('greet-shake');
    try { sessionStorage.setItem('mlc_desk_seen', 'true'); } catch(e){}
    win.classList.add('open');
    setTimeout(function() {
      if (input) input.focus();
    }, 250);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
  }

  trigger.addEventListener('click', function() {
    if (isOpen) closeChat(); else openChat();
  });

  if (bubble) {
    bubble.addEventListener('click', function(e) {
      if (e.target === bubbleClose) return;
      openChat();
    });
  }

  if (bubbleClose) {
    bubbleClose.addEventListener('click', function(e) {
      e.stopPropagation();
      bubble.classList.remove('show');
      if (unreadBadge) unreadBadge.classList.remove('active');
      if (trigger) trigger.classList.remove('greet-shake');
      try { sessionStorage.setItem('mlc_desk_seen', 'true'); } catch(err){}
    });
  }

  if (winClose) {
    winClose.addEventListener('click', closeChat);
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function appendUserMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'mlc-msg user';
    msg.innerHTML = '<div class="mlc-msg-bubble">' + escapeHtml(text) + '</div>';
    body.insertBefore(msg, typing);
    conversationHistory.push({ role: 'user', content: text });
    scrollToBottom();
  }

  function appendElenaMessage(html) {
    var msg = document.createElement('div');
    msg.className = 'mlc-msg sarah';
    msg.innerHTML = '<div class="mlc-msg-bubble">' + html + '</div>';
    body.insertBefore(msg, typing);
    conversationHistory.push({ role: 'assistant', content: html });
    scrollToBottom();
  }

  function setTyping(active) {
    if (active) {
      typing.classList.add('active');
    } else {
      typing.classList.remove('active');
    }
    scrollToBottom();
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Handle message sending (Supports VPS AI Backend and Client-side Engine)
  function handleSendMessage(text) {
    if (!text || !text.trim()) return;
    var query = text.trim();
    appendUserMessage(query);
    if (input) input.value = '';

    setTyping(true);

    function processClientReply(qText) {
      setTimeout(function() {
        setTyping(false);
        var q = qText.toLowerCase();
        var reply = "";

        // Check if user provided email or dimensions
        var emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
        var hasEmail = emailRegex.test(qText);

        if (hasEmail) {
          var detectedEmail = qText.match(emailRegex)[0];
          try {
            var fd = new FormData();
            fd.append('email', detectedEmail);
            fd.append('message', qText);
            fd.append('source', 'Chatbot Lead (Elena)');
            fetch('https://formspree.io/f/mqkvrgzy', { method: 'POST', body: fd, headers: {'Accept': 'application/json'} });
          } catch(e){}

          reply = "✓ Thank you! I have logged your email (<strong>" + detectedEmail + "</strong>). Our engineering and estimating desk will review your specifications and follow up within 4 business hours.<br><br>If you need an immediate price right now, feel free to ping us on <a href='" + window.MLC_CHAT_CONFIG.whatsappUrl + "' target='_blank' style='color:#25D366;font-weight:700'>WhatsApp (+1 503-692-4150)</a>.";
        } else if (q.includes("crate") || q.includes("box") || q.includes("crating") || q.includes("packaging")) {
          reply = "We engineer heavy-duty custom crates, knock-down containers, and commercial storage packaging tailored for industrial machinery, semiconductors, and power equipment.<br><br>• Built to exact BOM specs<br>• High-volume production or single prototypes<br>• Fully ISPM-15 compliant on request<br><br>👉 You can submit drawings on our <a href='" + rfqUrl + "' style='color:#E8963A;font-weight:700;text-decoration:underline'>2-Step RFQ Form</a> or type your cargo dimensions here!";
        } else if (q.includes("lumber") || q.includes("plywood") || q.includes("cut") || q.includes("timber")) {
          reply = "We operate automated high-speed sawing and dimensioning lines in Sherwood (USA), Santa Catarina (Brazil), and Qingdao (China). We supply cut-to-size softwood, hardwood, and industrial plywood panels.<br><br>What thickness, dimensions, or monthly board-footage are you looking for?";
        } else if (q.includes("pallet") || q.includes("skid") || q.includes("runner") || q.includes("dunnage")) {
          reply = "We manufacture custom 2-way and 4-way heavy machinery skids, heat-treated export pallets, grooved dunnage, and pipe chocks engineered to withstand up to 80,000+ lbs dynamic transit loads.<br><br>Would you like standard 48x40 sizes or custom dimensions?";
        } else if (q.includes("ispm") || q.includes("export") || q.includes("heat treat") || q.includes("phytosanitary") || q.includes("stamp")) {
          reply = "Yes! All solid wood packaging for export is kiln heat-treated (56°C core for 30 minutes) and stamped with compliant ISPM 15 markings audited by ALSC, ensuring zero customs holds at global ocean ports.";
        } else if (q.includes("call") || q.includes("phone") || q.includes("speak") || q.includes("engineer") || q.includes("human") || q.includes("contact")) {
          reply = "You can speak directly with our engineering and sales specialists right away:<br><br>📞 <strong>Phone:</strong> <a href='tel:+15036924150' style='color:#E8963A;font-weight:700'>+1 (503) 692-4150</a> (Mon–Fri 7am–4:30pm PST)<br>💬 <strong>WhatsApp:</strong> <a href='" + window.MLC_CHAT_CONFIG.whatsappUrl + "' target='_blank' style='color:#25D366;font-weight:700'>Chat on WhatsApp</a><br>✉️ <strong>Email:</strong> <a href='mailto:sales@marinelumberco.com' style='color:#E8963A;font-weight:700'>sales@marinelumberco.com</a>";
        } else if (q.includes("price") || q.includes("quote") || q.includes("cost") || q.includes("how much")) {
          reply = "Because industrial crating and processed timber are engineered to your specific weight, destination, and dimensions, our engineers provide custom bulk quotes for the best pricing.<br><br>👉 Please type your <strong>length x width x height</strong>, estimated weight, and an email address here, or fill our <a href='" + rfqUrl + "' style='color:#E8963A;font-weight:700;text-decoration:underline'>Quick RFQ page</a>!";
        } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
          reply = "Hello! Nice to meet you. Are you looking for custom crating, pallets, or processed lumber today? Feel free to ask me anything or share your project requirements.";
        } else {
          reply = "Thanks for your question! I've noted that for our engineering desk. To give you accurate pricing and lead times, could you share your dimensions, cargo type, or your work email? Alternatively, feel free to message our team on <a href='" + window.MLC_CHAT_CONFIG.whatsappUrl + "' target='_blank' style='color:#25D366;font-weight:700'>WhatsApp</a>!";
        }

        appendElenaMessage(reply);
      }, 750);
    }

    // Try VPS AI Endpoint first
    if (window.MLC_CHAT_CONFIG && window.MLC_CHAT_CONFIG.vpsEndpoint) {
      fetch(window.MLC_CHAT_CONFIG.vpsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: conversationHistory
        })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setTyping(false);
        var reply = data.reply || data.response || data.message || "";
        if (reply.indexOf('LEAD_SUMMARY') !== -1) {
          reply = reply.split('LEAD_SUMMARY')[0].trim();
        }
        if (reply) {
          appendElenaMessage(reply);
        } else {
          processClientReply(query);
        }
      })
      .catch(function() {
        processClientReply(query);
      });
      return;
    }

    processClientReply(query);
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var val = input.value;
      handleSendMessage(val);
    });
  }

  // Quick reply chips
  if (quickReplies) {
    quickReplies.addEventListener('click', function(e) {
      var btn = e.target.closest('.mlc-quick-btn');
      if (!btn) return;
      var q = btn.getAttribute('data-query');
      handleSendMessage(q);
      quickReplies.style.display = 'none';
    });
  }

})();
