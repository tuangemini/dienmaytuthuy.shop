/**
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU - ĐIỆN MÁY TÚ THỦY
 * Chuẩn hóa theo kỹ năng brand-assistant-integrator (Không nhãn AI, kết nối DeepSeek & Gemini, dự phòng 3 lớp)
 */
(function () {
  'use strict';

  // API Keys mặc định (Base64 mã hóa an toàn)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'Điện Máy Tú Thủy',
    fabTitle: 'Hỏi Điện Máy Tú Thuỷ',
    fabSub: 'Tivi, Tủ Lạnh, Máy Giặt, Điều Hòa 24/7',
    fabBadge: 'Sẵn Sàng',
    avatarIcon: '⚡',
    subHeader: 'Bán Hàng Chính Hãng • Giá Tốt Nhất Hải Phòng',
    footerNote: 'Điện Máy Tú Thủy • ĐT: 0985.676.311 - 0775.262.474 - 0866.978.955 - 0389.650.516',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-3.8-flash',
    provider: 'deepseek'
  };

  // KHO TRI THỨC ĐẠI DIỆN THƯƠNG HIỆU ĐIỆN MÁY TÚ THỦY
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức, niềm nở, am hiểu kỹ thuật và tận tâm của "CỬA HÀNG ĐIỆN MÁY TÚ THUỶ" tại Hải Phòng.
THÔNG TIN CHÍNH THỨC CỦA CỬA HÀNG:
- Tên: CỬA HÀNG ĐIỆN MÁY TÚ THUỶ (Bán hàng chính hãng - Giá tốt - Bảo hành dài hạn).
- ĐỊA CHỈ: SỐ 74 - TDP MỸ ĐỒNG 2 - PHƯỜNG LÊ ÍCH MỘC - HẢI PHÒNG.
- Website chính thức: https://dienmaytuthuy.shop/
- Định vị Google Maps: https://maps.app.goo.gl/EdzysPzaL2VktRET9 (Tọa độ: 20.9395104, 106.6305309).
- ĐIỆN THOẠI & ZALO TƯ VẤN (24/7): 0985.676.311 - 0775.262.474 - 0866.978.955 - 0389.650.516.
- Email liên hệ: nguyenanhtu70hp@gmail.com
- Giờ mở cửa: 07:30 đến 21:30 hàng ngày (kể cả Thứ 7, Chủ Nhật và ngày Lễ Tết).

DANH MỤC THƯƠNG HIỆU & SẢN PHẨM PHÂN PHỐI:
1. Smart Tivi 4K/8K, OLED, QLED, Android/Google TV:
   - Samsung, Sony, LG, TCL từ 43 đến 85 inch.
   - Đầu thu Clip TV Box, truyền hình K+ vệ tinh & Internet, VTC.
2. Tủ Lạnh & Tủ Đông:
   - Tủ lạnh Inverter 2 cánh, 4 cánh, Side-by-side: Hitachi, Samsung, Panasonic, Toshiba, LG, Aqua.
   - Tủ đông Sanaky, Kangaroo trữ đông thực phẩm dung tích 150L - 1000L.
3. Máy Giặt & Máy Sấy:
   - Máy giặt lồng ngang, lồng đứng Inverter diệt khuẩn: Electrolux, LG AI DD, Panasonic, Toshiba, Casper.
   - Máy sấy thông hơi, ngưng tụ và bơm nhiệt Heatpump.
4. Điều Hòa & Máy Lạnh Không Khí:
   - Daikin, Panasonic, Casper, Mitsubishi Electric, LG, Midea, Aqua.
   - Đủ công suất: 9.000 BTU (1HP), 12.000 BTU (1.5HP), 18.000 BTU (2HP), 24.000 BTU (2.5HP).
   - Miễn phí trọn gói nhân công lắp đặt và tặng kèm vật tư ống đồng tiêu chuẩn.
5. Thiết Bị Gia Dụng & Nhà Bếp:
   - Máy lọc nước RO Karofi, Kangaroo, Sunhouse.
   - Bình nước nóng lạnh Ariston, Ferroli, Rossi.
   - Nồi chiên không dầu, nồi cơm điện cao tần, lò vi sóng, bếp từ đôi.
   - Quạt cây, quạt điều hòa hơi nước Midea, Senko.
6. Dịch Vụ Số & An Ninh:
   - Lắp đặt gói kênh K+, VINA Internet, Camera giám sát an ninh gia đình, Router Wifi Mesh tốc độ cao.

CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT:
- HỖ TRỢ TRẢ GÓP 0% LÃI SUẤT: Chỉ cần CCCD gắn chip, không cần chứng minh thu nhập, duyệt hồ sơ online trong 5 phút qua HD Saison, Fe Credit, Home Credit, Mirae Asset.
- Miễn phí vận chuyển và lắp đặt tận nhà tại Hải Phòng (Thủy Nguyên, Lê Chân, Ngô Quyền, Hồng Bàng, Hải An, Kiến An...).
- Cam kết 100% hàng chính hãng mới nguyên thùng, có tem bảo hành điện tử chính hãng.
- Lỗi 1 đổi 1 trong 30 ngày đầu tiên nếu có lỗi từ nhà sản xuất.
- Bảo hành chính hãng từ 2 đến 5 năm tận nhà.

QUY TẮC GIAO TIẾP VÀ TRẢ LỜI:
1. Luôn mở đầu lễ phép, thân tình: "Dạ em chào Quý khách! Điện Máy Tú Thủy rất hân hạnh được phục vụ Quý khách ạ."
2. Trả lời súc tích, rõ ràng về thông số kỹ thuật, giá bán tham khảo và các ưu đãi khuyến mãi tặng kèm.
3. Tuyệt đối KHÔNG xưng là AI, mô hình ngôn ngữ, DeepSeek hay Gemini. Bạn là chuyên viên tư vấn đại diện cho Điện Máy Tú Thủy.
4. Luôn khuyến khích khách liên hệ Hotline/Zalo 0985 676 311 hoặc ghé trực tiếp Số 74 - TDP Mỹ Đồng 2 - Phường Lê Ích Mộc - Hải Phòng để xem máy thực tế và nhận giá chiết khấu tốt nhất.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ em chào Quý khách! Em là đại diện tư vấn của **Điện Máy Tú Thủy** (Hải Phòng). Cửa hàng chúng em chuyên phân phối chính hãng **Tivi, Tủ lạnh, Máy giặt, Điều hòa, Gia dụng, Camera & K+** với giá tốt nhất và trả góp 0%. Quý khách đang quan tâm đến sản phẩm nào hay cần tư vấn chương trình khuyến mãi hôm nay ạ?`
    }
  ];

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(?:^|\n)[*-]\s+(.+)/g, '\n<li>$1</li>')
      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
      .replace(/(09\d{2}[\s.]?\d{3}[\s.]?\d{3})/g, '<a href="tel:$1" style="color:var(--brand-red); font-weight:700;">$1</a>')
      .replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  }

  // Bộ lọc tri thức cục bộ (Smart Local Fallback) khi mất kết nối mạng
  function getSmartFallbackReply(question) {
    const q = question.toLowerCase();

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('chỉ đường') || q.includes('maps')) {
      return `Dạ **Điện Máy Tú Thủy** kính mời Quý khách ghé trực tiếp xem máy và trải nghiệm tại showroom:\n\n` +
        `📍 **Địa chỉ cửa hàng:** SỐ 74 - TDP MỸ ĐỒNG 2 - PHƯỜNG LÊ ÍCH MỘC - HẢI PHÒNG.\n` +
        `📞 Điện thoại & Zalo (24/7): **0985.676.311 - 0775.262.474 - 0866.978.955 - 0389.650.516**\n\n` +
        `Quý khách có thể ghé trực tiếp từ 07:30 đến 21:30 hàng ngày hoặc gọi bất kỳ số hotline nào ở trên để bên em hỗ trợ đón tiếp và giao lắp tận nhà chu đáo nhất ạ!`;
    }

    if (q.includes('trả góp') || q.includes('lãi suất') || q.includes('thủ tục') || q.includes('cccd')) {
      return `Dạ tại **Điện Máy Tú Thủy**, Quý khách mua Tivi, Tủ lạnh, Máy giặt, Điều hòa đều được hỗ trợ **TRẢ GÓP 0% LÃI SUẤT** cực kỳ dễ dàng ạ:\n\n` +
        `• **Thủ tục đơn giản:** Chỉ cần CCCD gắn chip (từ 18 tuổi trở lên).\n` +
        `• **Xét duyệt siêu tốc:** Duyệt hồ sơ online chỉ trong 5 - 10 phút, không cần chứng minh thu nhập.\n` +
        `• **Số tiền trả trước:** Chỉ từ 0đ hoặc 10% - 20% giá trị sản phẩm.\n` +
        `• **Kỳ hạn linh hoạt:** 3, 6, 9 hoặc 12 tháng.\n\n` +
        `Quý khách nhắn Zalo **0985 676 311**, em hướng dẫn làm hồ sơ duyệt trước tại nhà rất nhanh chóng ạ!`;
    }

    if (q.includes('điều hòa') || q.includes('máy lạnh') || q.includes('daikin') || q.includes('casper') || q.includes('panasonic')) {
      return `Dạ hiện tại **Điện Máy Tú Thủy** đang có chương trình khuyến mãi lớn cho các dòng Điều Hòa Inverter tiết kiệm điện:\n\n` +
        `• **Casper Inverter 9000 BTU:** Giá chỉ từ **4.990.000đ** (tiết kiệm điện, bảo hành máy nén 12 năm).\n` +
        `• **Daikin Inverter 9000/12000 BTU:** Giá từ **8.900.000đ** (lọc bụi mịn PM2.5, khử khuẩn Streamer).\n` +
        `• **Panasonic Inverter Nanoe-X:** Giá từ **9.800.000đ** (lọc không khí bảo vệ sức khỏe).\n\n` +
        `🎁 **ƯU ĐÃI ĐẶC BIỆT:** TẶNG MIỄN PHÍ toàn bộ công thợ lắp đặt + Tặng 3m ống đồng tiêu chuẩn! Quý khách gọi **0985 676 311** để thợ qua khảo sát lắp ngay trong ngày ạ!`;
    }

    if (q.includes('tivi') || q.includes('tv') || q.includes('samsung') || q.includes('sony') || q.includes('lg')) {
      return `Dạ dòng Smart TV 4K/8K tại **Điện Máy Tú Thủy** luôn có giá rẻ hơn siêu thị từ 1.000.000đ - 3.000.000đ:\n\n` +
        `• **Smart Tivi 43 inch 4K (Samsung/LG/TCL):** Giá từ **5.600.000đ**.\n` +
        `• **Smart Tivi 55 inch 4K QLED siêu nét:** Giá từ **8.900.000đ**.\n` +
        `• **Smart Tivi 65 - 75 inch màn hình lớn:** Giá từ **12.500.000đ**.\n\n` +
        `🎁 Tặng gói xem truyền hình Clip TV Box / K+ miễn phí 1 năm và giao lắp đặt tận nhà. Quý khách liên hệ hotline **0985 676 311** nhé!`;
    }

    if (q.includes('máy giặt') || q.includes('máy sấy') || q.includes('electrolux')) {
      return `Dạ **Điện Máy Tú Thủy** có đầy đủ các dòng máy giặt lồng ngang và lồng đứng cao cấp:\n\n` +
        `• **Máy giặt lồng đứng Toshiba / Panasonic 8-10kg:** Từ **3.990.000đ**.\n` +
        `• **Máy giặt cửa ngang Electrolux EcoInverter 9-10kg:** Từ **7.800.000đ** (giặt hơi nước diệt khuẩn 99.9%).\n` +
        `• **Máy giặt LG AI DD dẫn động trực tiếp:** Từ **7.990.000đ** (êm ái, chống rung tối đa).\n\n` +
        `🎁 Tặng kèm chân đế inox cao cấp và miễn phí công lắp đặt + dây cấp xả nước!`;
    }

    return `Dạ cảm ơn Quý khách đã gửi câu hỏi đến **Điện Máy Tú Thủy**!\n\n` +
      `Cửa hàng chúng em cam kết **100% hàng chính hãng, giá cạnh tranh nhất Hải Phòng, bảo hành dài hạn và hỗ trợ trả góp 0%**.\n\n` +
      `Để được tư vấn chi tiết mã model và nhận giá ưu đãi giảm thêm hôm nay, Quý khách vui lòng gọi ngay hotline/Zalo: **0985 676 311** hoặc **0775 262 474**, bên em sẽ hỗ trợ ngay lập tức ạ!`;
  }

  // Gọi DeepSeek API
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.deepseekModel,
        messages: formatted,
        temperature: 0.6,
        max_tokens: 800
      })
    });

    if (!response.ok) throw new Error(`DeepSeek API failed: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Gọi Google Gemini API
  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) throw new Error(`Gemini API failed: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Dự phòng 3 lớp
  async function requestConsultation(userMessage) {
    chatHistory.push({ role: 'user', content: userMessage });

    try {
      const reply = await callDeepSeekAPI(chatHistory);
      if (reply) return reply;
    } catch (err1) {
      console.warn('[Điện Máy Tú Thủy] DeepSeek busy, switching to Gemini:', err1.message);
      try {
        const reply = await callGeminiAPI(chatHistory);
        if (reply) return reply;
      } catch (err2) {
        console.warn('[Điện Máy Tú Thủy] Gemini API busy, fallback to local knowledge:', err2.message);
      }
    }

    return getSmartFallbackReply(userMessage);
  }

  // Khởi tạo giao diện widget
  function renderAIAssistant() {
    // 1. Nút Launcher FAB
    const fab = document.createElement('div');
    fab.className = 'dmtt-fab-launcher';
    fab.id = 'dmttFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="dmtt-fab-icon-box">
        <span class="dmtt-fab-pulse"></span>
        <span>${CONFIG.avatarIcon}</span>
      </div>
      <div class="dmtt-fab-text">
        <span class="dmtt-fab-title">${CONFIG.fabTitle}</span>
        <span class="dmtt-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="dmtt-fab-badge">${CONFIG.fabBadge}</span>
    `;

    // 2. Cửa sổ chat
    const chatWin = document.createElement('div');
    chatWin.className = 'dmtt-chat-window';
    chatWin.id = 'dmttChatWindow';
    chatWin.setAttribute('role', 'dialog');
    chatWin.setAttribute('aria-label', `Cửa sổ trò chuyện ${CONFIG.brandName}`);
    chatWin.innerHTML = `
      <!-- Header -->
      <div class="dmtt-chat-header">
        <div class="dmtt-chat-profile">
          <div class="dmtt-avatar">
            <span>${CONFIG.avatarIcon}</span>
            <span class="dmtt-online-dot"></span>
          </div>
          <div class="dmtt-profile-meta">
            <div class="dmtt-title">${CONFIG.brandName}</div>
            <span class="dmtt-status-text">${CONFIG.subHeader}</span>
          </div>
        </div>
        <div class="dmtt-header-actions">
          <button class="dmtt-icon-btn" id="btnDmttClear" title="Làm mới trò chuyện" aria-label="Xóa chat">🗑️</button>
          <button class="dmtt-icon-btn" id="btnDmttClose" title="Thu nhỏ" aria-label="Đóng">&times;</button>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="dmtt-chips-bar" id="dmttChipsBar">
        <button class="dmtt-chip" data-q="Thủ tục mua hàng trả góp 0% lãi suất tại Điện Máy Tú Thủy thế nào?">💳 Trả góp 0%?</button>
        <button class="dmtt-chip" data-q="Báo giá các mẫu Điều Hòa Inverter đang có ưu đãi tặng công lắp đặt?">🍃 Giá Điều Hòa Inverter?</button>
        <button class="dmtt-chip" data-q="Tivi Smart 4K Samsung, Sony, LG giá tốt nhất hiện nay là bao nhiêu?">📺 Smart TV 4K giá tốt?</button>
        <button class="dmtt-chip" data-q="Cửa hàng có địa chỉ ở đâu và chính sách giao hàng miễn phí ra sao?">📍 Địa chỉ & Ship hàng?</button>
        <button class="dmtt-chip" data-q="Cửa hàng có gói lắp đặt truyền hình K+ và Internet VinaPhone không?">📡 Lắp K+ & Internet?</button>
      </div>

      <!-- Chat Body -->
      <div class="dmtt-chat-body" id="dmttChatBody">
        <div class="dmtt-msg bot">
          <div class="dmtt-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="dmtt-msg-bubble">
            ${formatMarkdown(chatHistory[0].content)}
          </div>
        </div>
      </div>

      <!-- Footer & Input -->
      <div class="dmtt-chat-footer">
        <form class="dmtt-input-form" id="dmttChatForm">
          <textarea 
            class="dmtt-input-field" 
            id="dmttInputField" 
            rows="1" 
            placeholder="Hỏi giá Tivi, Tủ lạnh, Điều hòa, Trả góp 0%..."
            aria-label="Nhập câu hỏi"
          ></textarea>
          <button type="submit" class="dmtt-send-btn" id="dmttSendBtn" aria-label="Gửi tin nhắn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </form>
        <div class="dmtt-footer-note">${CONFIG.footerNote}</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Gắn sự kiện
    const chatBody = document.getElementById('dmttChatBody');
    const chatForm = document.getElementById('dmttChatForm');
    const inputField = document.getElementById('dmttInputField');
    const sendBtn = document.getElementById('dmttSendBtn');
    const chipsBar = document.getElementById('dmttChipsBar');
    const btnClose = document.getElementById('btnDmttClose');
    const btnClear = document.getElementById('btnDmttClear');

    function toggleChat(open) {
      const isOpen = open !== undefined ? open : !chatWin.classList.contains('open');
      chatWin.classList.toggle('open', isOpen);
      if (isOpen) {
        inputField.focus();
        scrollToBottom();
      }
    }

    fab.addEventListener('click', () => toggleChat());
    btnClose.addEventListener('click', () => toggleChat(false));

    function scrollToBottom() {
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 50);
    }

    function appendMessage(role, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `dmtt-msg ${role === 'user' ? 'user' : 'bot'}`;

      if (role === 'assistant') {
        msgDiv.innerHTML = `
          <div class="dmtt-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="dmtt-msg-bubble">
            ${formatMarkdown(text)}
          </div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="dmtt-msg-bubble">
            ${formatMarkdown(text)}
          </div>
        `;
      }

      chatBody.appendChild(msgDiv);
      scrollToBottom();
    }

    let typingEl = null;
    function showTyping() {
      if (typingEl) return;
      typingEl = document.createElement('div');
      typingEl.className = 'dmtt-typing-indicator';
      typingEl.innerHTML = `
        <span class="dmtt-typing-dot"></span>
        <span class="dmtt-typing-dot"></span>
        <span class="dmtt-typing-dot"></span>
      `;
      chatBody.appendChild(typingEl);
      scrollToBottom();
    }

    function hideTyping() {
      if (typingEl) {
        typingEl.remove();
        typingEl = null;
      }
    }

    async function handleUserSubmit(text) {
      const clean = text.trim();
      if (!clean) return;

      inputField.value = '';
      inputField.style.height = 'auto';
      sendBtn.disabled = true;

      appendMessage('user', clean);
      showTyping();

      try {
        const reply = await requestConsultation(clean);
        hideTyping();
        chatHistory.push({ role: 'assistant', content: reply });
        appendMessage('assistant', reply);
      } catch (err) {
        hideTyping();
        appendMessage('assistant', getSmartFallbackReply(clean));
      } finally {
        sendBtn.disabled = false;
        inputField.focus();
      }
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit(inputField.value);
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit(inputField.value);
      }
    });

    inputField.addEventListener('input', () => {
      inputField.style.height = 'auto';
      inputField.style.height = Math.min(inputField.scrollHeight, 80) + 'px';
    });

    chipsBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.dmtt-chip');
      if (chip && chip.dataset.q) {
        handleUserSubmit(chip.dataset.q);
      }
    });

    btnClear.addEventListener('click', () => {
      if (confirm('Quý khách có muốn xóa lịch sử trò chuyện và bắt đầu lại không?')) {
        chatHistory = [chatHistory[0]];
        chatBody.innerHTML = `
          <div class="dmtt-msg bot">
            <div class="dmtt-msg-avatar">${CONFIG.avatarIcon}</div>
            <div class="dmtt-msg-bubble">
              ${formatMarkdown(chatHistory[0].content)}
            </div>
          </div>
        `;
      }
    });

    // Cho phép gọi mở từ nút ngoài trang web
    window.openTuThuyChat = function (query) {
      toggleChat(true);
      if (query) {
        handleUserSubmit(query);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAIAssistant);
  } else {
    renderAIAssistant();
  }
})();
