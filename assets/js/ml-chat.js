/* Marine Lumber website chat widget — talks to marine-chat API */
(function(){
  var API_URL = "https://api-marine.chenbridge.com/api/chat";
  var FALLBACK_MSG = "Our chat service is temporarily unavailable. Please call us at +1 (503) 692-4150 or email sales@marinelumberco.com.";

  var css = ""
  + ".ml-chat-btn{position:fixed;right:24px;bottom:24px;width:60px;height:60px;border-radius:50%;"
  + "background:#1A1E1B;border:1px solid rgba(232,150,58,.5);cursor:pointer;z-index:9998;"
  + "display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.35);transition:transform .2s}"
  + ".ml-chat-btn:hover{transform:scale(1.06)}"
  + ".ml-chat-btn svg{width:28px;height:28px;fill:#E8963A}"
  + ".ml-chat-panel{position:fixed;right:24px;bottom:96px;width:380px;max-width:calc(100vw - 48px);height:520px;max-height:calc(100vh - 130px);"
  + "background:#fff;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.3);z-index:9999;display:none;flex-direction:column;overflow:hidden;"
  + "border:1px solid #e2e5e3}"
  + ".ml-chat-panel.open{display:flex}"
  + ".ml-chat-head{background:#1A1E1B;color:#fff;padding:14px 18px;display:flex;align-items:center;justify-content:space-between}"
  + ".ml-chat-head strong{font-size:15px}"
  + ".ml-chat-head span{display:block;font-size:11px;color:#9aa3a0;font-weight:400}"
  + ".ml-chat-close{background:none;border:none;color:#9aa3a0;font-size:22px;cursor:pointer;line-height:1}"
  + ".ml-chat-close:hover{color:#fff}"
  + ".ml-chat-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f7f8f7}"
  + ".ml-chat-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}"
  + ".ml-chat-msg.bot{background:#fff;border:1px solid #e2e5e3;color:#1A1E1B;align-self:flex-start;border-bottom-left-radius:4px}"
  + ".ml-chat-msg.user{background:#1A1E1B;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}"
  + ".ml-chat-msg.typing{color:#9aa3a0;font-style:italic}"
  + ".ml-chat-foot{display:flex;border-top:1px solid #e2e5e3;background:#fff}"
  + ".ml-chat-foot input{flex:1;border:none;padding:14px 16px;font-size:14px;outline:none;background:transparent}"
  + ".ml-chat-foot button{background:#E8963A;border:none;color:#fff;padding:0 20px;font-size:14px;font-weight:600;cursor:pointer}"
  + ".ml-chat-foot button:hover{background:#d6852a}"
  + ".ml-chat-foot button:disabled{opacity:.5;cursor:default}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement("button");
  btn.className = "ml-chat-btn";
  btn.setAttribute("aria-label", "Chat with us");
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';

  var panel = document.createElement("div");
  panel.className = "ml-chat-panel";
  panel.innerHTML = ""
    + '<div class="ml-chat-head"><div><strong>Marine Lumber Assistant</strong><span>Typically replies instantly</span></div>'
    + '<button class="ml-chat-close" aria-label="Close chat">&times;</button></div>'
    + '<div class="ml-chat-body"></div>'
    + '<div class="ml-chat-foot"><input type="text" placeholder="Ask about crates, pallets, ISPM-15…" maxlength="500">'
    + '<button type="button">Send</button></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector(".ml-chat-body");
  var input = panel.querySelector("input");
  var sendBtn = panel.querySelector(".ml-chat-foot button");
  var greeted = false;

  function addMsg(text, who){
    var div = document.createElement("div");
    div.className = "ml-chat-msg " + who;
    // strip LEAD_SUMMARY block from display
    text = text.split("LEAD_SUMMARY")[0].trim();
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function setBusy(b){
    sendBtn.disabled = b;
    input.disabled = b;
  }

  function send(){
    var msg = input.value.trim();
    if(!msg) return;
    addMsg(msg, "user");
    input.value = "";
    var typing = addMsg("Typing…", "bot typing");
    setBusy(true);
    fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: msg})
    })
    .then(function(r){ return r.json(); })
    .then(function(d){
      typing.remove();
      if(d.reply){ addMsg(d.reply, "bot"); }
      else { addMsg(FALLBACK_MSG, "bot"); }
    })
    .catch(function(){ typing.remove(); addMsg(FALLBACK_MSG, "bot"); })
    .finally(function(){ setBusy(false); input.focus(); });
  }

  btn.addEventListener("click", function(){
    panel.classList.toggle("open");
    if(panel.classList.contains("open") && !greeted){
      greeted = true;
      addMsg("Hi — I'm Marine Lumber's website assistant. Ask me about our crates, pallets, ISPM-15 export packaging, or getting a quote.", "bot");
    }
    if(panel.classList.contains("open")){ input.focus(); }
  });
  panel.querySelector(".ml-chat-close").addEventListener("click", function(){
    panel.classList.remove("open");
  });
  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){ send(); }
  });
})();
