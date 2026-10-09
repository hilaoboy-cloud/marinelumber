/* ==========================================================================
   Marine Lumber Co. — Live Specialist Chatbot Widget (VPS AI Ready)
   ========================================================================== */
(function() {
  "use strict";

  // Configuration (Ready for your VPS AI Model Endpoint)
  window.MLC_CHAT_CONFIG = {
    // When your model is deployed on your VPS, set your API endpoint here:
    // e.g. vpsEndpoint: 'https://vps.yourdomain.com/api/chat',
    vpsEndpoint: null,
    specialistName: 'Sarah Miller',
    specialistTitle: 'Packaging Specialist',
    companyName: 'Marine Lumber Co.',
    phone: '+1 (503) 692-4150',
    email: 'sales@marinelumberco.com',
    delayMs: 3000 // 3 seconds trigger
  };

  // Determine relative path to assets
  var path = window.location.pathname;
  var isSub = path.includes('/products/') || path.includes('/industries/');
  var assetBase = isSub ? '../assets/' : 'assets/';
  var avatarSrc = assetBase + 'img/support-specialist.webp';

  // Inject HTML Structure
  var widget = document.createElement('div');
  widget.className = 'mlc-chat-widget';
  widget.innerHTML = [
    '<!-- Speech Prompt Bubble (3s trigger) -->',
    '<div class="mlc-chat-bubble" id="mlcChatBubble" role="alert" aria-live="polite">',
    '  <button class="mlc-bubble-close" id="mlcBubbleClose" type="button" aria-label="Close message">&times;</button>',
    '  <div class="mlc-bubble-author">',
    '    <span class="mlc-wh-info"><span class="dot"></span></span>',
    '    <strong>Sarah &middot; Packaging Specialist</strong>',
    '  </div>',
    '  <p class="mlc-bubble-text">Hi there! &#128075; Looking for custom crates, lumber or export packaging? Feel free to ask!</p>',
    '</div>',

    '<!-- Avatar Trigger Button -->',
    '<div class="mlc-chat-trigger" id="mlcChatTrigger" role="button" tabindex="0" aria-label="Open chat with packaging specialist">',
    '  <img src="' + avatarSrc + '" alt="Sarah - Customer Specialist" width="62" height="62" loading="eager">',
    '  <span class="mlc-online-dot" title="Online now"></span>',
    '  <span class="mlc-unread-badge" id="mlcUnreadBadge">1</span>',
    '</div>',

    '<!-- Expandable Chat Window -->',
    '<div class="mlc-chat-window" id="mlcChatWindow" role="dialog" aria-modal="true" aria-label="Chat conversation">',
    '  <div class="mlc-window-header">',
    '    <div class="mlc-wh-profile">',
    '      <div class="mlc-wh-avatar">',
    '        <img src="' + avatarSrc + '" alt="Sarah Miller">',
    '      </div>',
    '      <div class="mlc-wh-info">',
    '        <h4>Sarah Miller</h4>',
    '        <p><span class="dot"></span> Packaging Specialist &middot; Online</p>',
    '      </div>',
    '    </div>',
    '    <button class="mlc-wh-close" id="mlcWindowClose" type="button" aria-label="Close chat">&times;</button>',
    '  </div>',
    '  <div class="mlc-window-body" id="mlcChatBody">',
    '    <div class="mlc-time-divider">Today</div>',
    '    <div class="mlc-msg sarah">',
    '      <div class="mlc-msg-bubble">',
    '        Hello! Welcome to Marine Lumber Co. &#128075;<br><br>',
    '        I&rsquo;m Sarah. How can I help with your packaging or lumber needs today?',
    '      </div>',
    '    </div>',
    '    <div class="mlc-quick-replies" id="mlcQuickReplies">',
    '      <button class="mlc-quick-btn" type="button" data-query="Custom Wood Crates">&#128230; Custom Wood Crates</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="Cut-to-Size Lumber & Plywood">&#129685; Lumber &amp; Plywood</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="ISPM 15 Export Compliance">&#9992;&#65039; ISPM 15 Export Rules</button>',
    '      <button class="mlc-quick-btn" type="button" data-query="Speak with a Specialist">&#128222; Call Specialist</button>',
    '    </div>',
    '    <div class="mlc-typing" id="mlcTyping">',
    '      <span class="mlc-typing-dot"></span>',
    '      <span class="mlc-typing-dot"></span>',
    '      <span class="mlc-typing-dot"></span>',
    '    </div>',
    '  </div>',
    '  <div class="mlc-window-footer">',
    '    <form class="mlc-input-row" id="mlcChatForm">',
    '      <input class="mlc-chat-input" id="mlcChatInput" type="text" placeholder="Type your dimensions or question..." autocomplete="off">',
    '      <button class="mlc-chat-send" id="mlcChatSend" type="submit" aria-label="Send message">',
    '        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    '      </button>',
    '    </form>',
    '    <p class="mlc-footer-note">&#128274; Direct consultation &middot; Typically replies in &lt;5 mins</p>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.appendChild(widget);

  // Element handles
  var trigger = document.getElementById('mlcChatTrigger');
  var bubble = document.getElementById('mlcChatBubble');
  var bubbleClose = document.getElementById('mlcBubbleClose');
  var badge = document.getElementById('mlcUnreadBadge');
  var win = document.getElementById('mlcChatWindow');
  var winClose = document.getElementById('mlcWindowClose');
  var body = document.getElementById('mlcChatBody');
  var form = document.getElementById('mlcChatForm');
  var input = document.getElementById('mlcChatInput');
  var typing = document.getElementById('mlcTyping');
  var quickReplies = document.getElementById('mlcQuickReplies');

  var isOpen = false;
  var hasInteracted = sessionStorage.getItem('mlc_chat_read') === 'true';

  // 3-Second Prompt Trigger
  setTimeout(function() {
    if (!isOpen && !hasInteracted) {
      if (bubble) bubble.classList.add('show');
      if (badge) badge.classList.add('show');
      if (trigger) {
        trigger.classList.add('greet');
        setTimeout(function() {
          trigger.classList.remove('greet');
        }, 1200);
      }
    }
  }, window.MLC_CHAT_CONFIG.delayMs || 3000);

  function markRead() {
    hasInteracted = true;
    sessionStorage.setItem('mlc_chat_read', 'true');
    if (bubble) bubble.classList.remove('show');
    if (badge) badge.classList.remove('show');
  }

  function openChat() {
    markRead();
    isOpen = true;
    win.classList.add('open');
    setTimeout(function() {
      if (input) input.focus();
    }, 250);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
  }

  // Trigger Clicks
  trigger.addEventListener('click', function() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  trigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
  });

  // Speech bubble clicks
  if (bubble) {
    bubble.addEventListener('click', function(e) {
      if (e.target === bubbleClose || bubbleClose.contains(e.target)) return;
      openChat();
    });
  }

  if (bubbleClose) {
    bubbleClose.addEventListener('click', function(e) {
      e.stopPropagation();
      markRead();
      bubble.classList.remove('show');
    });
  }

  if (winClose) {
    winClose.addEventListener('click', closeChat);
  }

  // Auto-scroll messages
  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  // Append user message
  function appendUserMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'mlc-msg user';
    msg.innerHTML = '<div class="mlc-msg-bubble">' + escapeHtml(text) + '</div>';
    body.insertBefore(msg, typing);
    scrollToBottom();
  }

  // Append specialist message
  function appendSarahMessage(html) {
    var msg = document.createElement('div');
    msg.className = 'mlc-msg sarah';
    msg.innerHTML = '<div class="mlc-msg-bubble">' + html + '</div>';
    body.insertBefore(msg, typing);
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

  // Process message (Client simulation or VPS AI Endpoint)
  function handleSendMessage(text) {
    if (!text || !text.trim()) return;
    var query = text.trim();
    appendUserMessage(query);
    if (input) input.value = '';

    setTyping(true);

    // If VPS Endpoint is configured, send HTTP request
    if (window.MLC_CHAT_CONFIG.vpsEndpoint) {
      fetch(window.MLC_CHAT_CONFIG.vpsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setTyping(false);
        appendSarahMessage(data.reply || data.message || "Thank you for reaching out. We will review your specifications.");
      })
      .catch(function() {
        setTyping(false);
        appendSarahMessage("Thank you for your message! Our team is on standby at <strong>" + window.MLC_CHAT_CONFIG.phone + "</strong> or <strong>" + window.MLC_CHAT_CONFIG.email + "</strong>.");
      });
      return;
    }

    // Default Client-Side Intelligent Response Simulation
    setTimeout(function() {
      setTyping(false);
      var q = query.toLowerCase();
      var reply = "";

      if (q.includes("crate") || q.includes("box") || q.includes("crating")) {
        reply = "We engineer heavy-duty and precision crates for industrial machinery, electronics, and power equipment. We can build one-off prototypes or recurring high-volume runs with full ISPM 15 compliance.<br><br>👉 Would you like to submit your dimensions via our <a href='" + (isSub ? "../" : "") + "request-a-quote.html' style='color:#E8963A;font-weight:600;text-decoration:underline'>Online Quote Form</a>, or give us a quick call?";
      } else if (q.includes("lumber") || q.includes("plywood") || q.includes("cut")) {
        reply = "We operate high-speed automated sawing lines processing softwood, hardwood, and industrial plywood cut precisely to your BOM specifications.<br><br>What species, dimensions, or volume per month are you working with?";
      } else if (q.includes("ispm") || q.includes("export") || q.includes("customs") || q.includes("phytosanitary")) {
        reply = "All solid wood packaging we build for export is heat-treated and certified with official ISPM 15 stamps, verified bug-free to ensure your shipments meet international import requirements smoothly.";
      } else if (q.includes("call") || q.includes("phone") || q.includes("contact") || q.includes("specialist") || q.includes("sales")) {
        reply = "You can speak directly with our packaging team at <a href='tel:+15036924150' style='color:#E8963A;font-weight:600'>+1 (503) 692-4150</a> (Mon–Fri 7am–4:30pm PST) or email specs to <a href='mailto:sales@marinelumberco.com' style='color:#E8963A;font-weight:600'>sales@marinelumberco.com</a>.";
      } else if (q.includes("price") || q.includes("quote") || q.includes("cost")) {
        reply = "Because our crating and processed timber are engineered to custom dimensions and load weights, we calculate tailored pricing to give you the lowest total transit cost.<br><br>Feel free to leave your email or dimensions here, and an engineer will calculate pricing for you!";
      } else {
        reply = "Thank you for your message! I've noted your inquiry. Could you please share your dimensions, product weight, or a contact email? One of our specialists will follow up promptly.";
      }

      appendSarahMessage(reply);
    }, 900);
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var val = input.value;
      handleSendMessage(val);
    });
  }

  // Quick reply pills
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
