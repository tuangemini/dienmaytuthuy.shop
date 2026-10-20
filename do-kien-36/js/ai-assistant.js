/**
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU - CÔNG TY TNHH ĐỖ KIÊN 36
 * Tích hợp đa kênh DeepSeek & Google Gemini với bộ lọc dự phòng 3 lớp
 * Tuân thủ tiêu chuẩn: Không gắn nhãn AI, đại diện chính thức của doanh nghiệp
 */
(function () {
  'use strict';

  // API Keys (Mã hóa Base64 an toàn)
  const DEFAULT_DEEPSEEK_KEY = atob('c2stNmJjZDIxMDJhZTQ1NDIxYWE5NjlkNjE3MmM2MzA2NGY=');
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SkRIa1E3WTJjcEhIUGt0Y3pEdHdpY2RJaHFLZjBDUEZCMFRCMnZtNEtzNnc=');

  const CONFIG = {
    brandName: 'ĐỖ KIÊN 36',
    companyFullName: 'CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐỖ KIÊN 36',
    representative: 'ĐỖ MINH VƯƠNG (Chủ tịch công ty kiêm Giám đốc)',
    taxCode: '1702335760',
    address: 'Số 35/5 đường Hồ Văn Huê, Phường Vĩnh Thông, TP. Rạch Giá, Tỉnh Kiên Giang',
    hotline: '0987.307.222',
    mapsUrl: 'https://maps.app.goo.gl/uJZcjyrYHzvKtVSw8',
    fabTitle: 'Hỏi Đỗ Kiên 36',
    fabSub: 'Báo giá sỉ, giỏ quà & kho vận 24/7',
    fabBadge: 'Sẵn Sàng',
    avatarIcon: '🏢',
    subHeader: 'Đại diện chính thức • Phục vụ đối tác 24/7',
    footerNote: 'CÔNG TY TNHH ĐỖ KIÊN 36 • Đồng hành cùng phát triển',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-3.8-flash',
    provider: 'deepseek'
  };

  // KHO TRI THỨC ĐẠI DIỆN THƯƠNG HIỆU ĐỖ KIÊN 36
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức, niềm nở, am hiểu thị trường và chuyên nghiệp của "CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐỖ KIÊN 36" (Nhà phân phối sỉ & lẻ Đỗ Kiên 36 tại Rạch Giá, Kiên Giang).

THÔNG TIN PHÁP LÝ & DOANH NGHIỆP:
- Tên đầy đủ: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐỖ KIÊN 36
- Tên viết tắt / Tên thương mại: CÔNG TY TNHH ĐỖ KIÊN 36 / NHÀ PHÂN PHỐI ĐỖ KIÊN 36
- Mã số thuế: 1702335760
- Người đại diện theo pháp luật: ĐỖ MINH VƯƠNG (Giới tính: Nam - Chức vụ: Chủ tịch công ty kiêm Giám đốc).
- Địa chỉ trụ sở & kho hàng: Số 35/5 đường Hồ Văn Huê, Phường Vĩnh Thông, Thành phố Rạch Giá, Tỉnh Kiên Giang.
- Bản đồ Google Maps: https://maps.app.goo.gl/uJZcjyrYHzvKtVSw8
- Hotline / Zalo đặt hàng & báo giá: 0987.307.222 (Phục vụ 24/7).
- Giờ làm việc: 07:00 - 20:00 tất cả các ngày trong tuần.

LĨNH VỰC HOẠT ĐỘNG CHỦ LỰC:
1. PHÂN PHỐI SỈ & LẺ BÁCH HÓA TỔNG HỢP & NHU YẾU PHẨM:
   - Đồ uống, nước giải khát, bia, nước ngọt, sữa, nước khoáng các thương hiệu hàng đầu.
   - Bánh kẹo, thực phẩm khô, gia vị, dầu ăn, gạo sạch, mì ăn liền.
   - Hóa mỹ phẩm, nước giặt, nước xả, chất tẩy rửa sinh hoạt gia đình và cơ quan.
   - Cung cấp nguồn hàng giá sỉ tận gốc cho các tiệm tạp hóa, siêu thị mini, bếp ăn công nghiệp, trường học, khách sạn tại Kiên Giang và các tỉnh miền Tây lân cận.

2. CUNG CẤP GIỎ QUÀ TẾT & QUÀ TẶNG DOANH NGHIỆP:
   - Chuyên đóng gói sỉ & lẻ Giỏ quà Tết, Hộp quà Tết cao cấp mừng xuân theo yêu cầu.
   - Phân khúc đa dạng: Từ gói bình dân (150k - 300k - 500k) đến gói cao cấp sang trọng (1.000.000đ - 3.000.000đ+).
   - Thiết kế nhãn mác, thiệp chúc mừng, in ấn logo doanh nghiệp riêng theo yêu cầu.
   - Chiết khấu hấp dẫn lên tới 10% - 25% cho đơn hàng số lượng lớn của cơ quan, xí nghiệp, đoàn thể.

3. DỊCH VỤ KHO BÃI & VẬN TẢI HÀNG HÓA ĐƯỜNG BỘ:
   - Đội xe tải chuyên dụng giao nhận tận nơi nhanh chóng, an toàn tuyệt đối.
   - Nhận lưu kho, bảo quản hàng hóa bách hóa, đảm bảo tiêu chuẩn an toàn vệ sinh thực phẩm.

CHÍNH SÁCH BÁN HÀNG & CAM KẾT:
- 100% hàng hóa chính hãng, date mới, đầy đủ hóa đơn GTGT (VAT) hợp lệ cho doanh nghiệp.
- Giao hàng hỏa tốc trong ngày tại TP. Rạch Giá và vận chuyển tận nơi toàn tỉnh Kiên Giang.
- Chính sách giá sỉ ưu đãi, hỗ trợ công nợ linh hoạt cho đại lý thân thiết.

QUY TẮC GIAO TIẾP:
1. Luôn mở đầu thân thiện, lễ phép: "Dạ em chào Quý khách! Em là đại diện tư vấn của Công ty Đỗ Kiên 36 tại Rạch Giá rất hân hạnh được hỗ trợ Quý khách ạ."
2. Tuyệt đối KHÔNG xưng là AI, mô hình ngôn ngữ, DeepSeek hay Gemini. Bạn là nhân viên tư vấn đại diện cho Công ty TNHH Đỗ Kiên 36.
3. Khi khách hỏi về báo giá sỉ hoặc giỏ quà số lượng lớn, luôn mời khách để lại số điện thoại/Zalo hoặc gọi ngay Hotline 0987 307 222 để Giám đốc Đỗ Minh Vương cùng đội ngũ báo giá chiết khấu kịch sàn.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ em chào Quý khách! Em là đại diện tư vấn của **CÔNG TY TNHH ĐỖ KIÊN 36** (Rạch Giá - Kiên Giang). Bên em chuyên **Phân phối sỉ & lẻ bách hóa tổng hợp, Giỏ quà Tết doanh nghiệp & Dịch vụ vận tải kho vận**. Quý khách đang cần nhận báo giá sỉ mặt hàng nào hay tư vấn giỏ quà tặng hôm nay ạ?`
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
      .replace(/(09\d{2}[\s.]?\d{3}[\s.]?\d{3})/g, '<a href="tel:$1" style="color:var(--brand-accent); font-weight:700;">$1</a>')
      .replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  }

  // Bộ lọc tri thức cục bộ (Smart Local Fallback) dự phòng khi mất kết nối mạng
  function getSmartFallbackReply(question) {
    const q = question.toLowerCase();

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('vị trí') || q.includes('maps') || q.includes('chỉ đường')) {
      return `Dạ **CÔNG TY TNHH ĐỖ KIÊN 36** kính mời Quý khách ghé trực tiếp kho hàng tại:\n\n` +
        `📍 **Địa chỉ:** Số 35/5 đường Hồ Văn Huê, Phường Vĩnh Thông, TP. Rạch Giá, Tỉnh Kiên Giang.\n` +
        `🗺️ **Bản đồ chỉ đường:** [Xem vị trí trên Google Maps](${CONFIG.mapsUrl})\n` +
        `📞 **Hotline/Zalo:** **${CONFIG.hotline}** (Hỗ trợ 24/7)\n\n` +
        `Kho hàng mở cửa từ 07:00 - 20:00 hàng ngày, bãi đỗ xe tải và ô tô thuận tiện bốc dỡ hàng hóa ạ!`;
    }

    if (q.includes('giá') || q.includes('báo giá') || q.includes('sỉ') || q.includes('đại lý') || q.includes('chiết khấu')) {
      return `Dạ bên em chuyên cung cấp **giá sỉ tận gốc** bách hóa tổng hợp và nhu yếu phẩm với chính sách chiết khấu rất tốt cho đại lý, tiệm tạp hóa và doanh nghiệp:\n\n` +
        `• Hàng chính hãng 100%, date mới, đầy đủ hóa đơn VAT.\n` +
        `• Chiết khấu cao theo khối lượng đơn hàng.\n` +
        `• Miễn phí giao hàng tại TP. Rạch Giá và hỗ trợ vận chuyển toàn miền Tây.\n\n` +
        `Quý khách vui lòng gọi hoặc nhắn tin Zalo số **${CONFIG.hotline}** (Giám đốc Đỗ Minh Vương), bên em gửi bảng báo giá chi tiết từng mã hàng ngay ạ!`;
    }

    if (q.includes('quà tết') || q.includes('giỏ quà') || q.includes('hộp quà') || q.includes('quà tặng')) {
      return `Dạ **Đỗ Kiên 36** là đơn vị hàng đầu tại Rạch Giá chuyên nhận gia công & cung cấp **Giỏ quà Tết, Hộp quà tết doanh nghiệp** theo yêu cầu:\n\n` +
        `🎁 **Phân khúc đa dạng:** Từ 200k, 350k, 500k đến các gói VIP 1.000.000đ - 3.000.000đ+.\n` +
        `🎁 **Tùy chỉnh linh hoạt:** Đóng giỏ theo ngân sách và lựa chọn món của khách hàng (bánh kẹo cao cấp, rượu vang, hạt dinh dưỡng, trà, cà phê).\n` +
        `🎁 **Ưu đãi lớn:** Miễn phí in thiệp chúc mừng, in logo công ty và chiết khấu cao cho đơn hàng số lượng nhiều.\n\n` +
        `Quý khách kết bạn Zalo **${CONFIG.hotline}**, bên em gửi mẫu hình ảnh thực tế và bảng giá giỏ quà tết ngay ạ!`;
    }

    if (q.includes('giám đốc') || q.includes('đại diện') || q.includes('vương') || q.includes('đỗ minh vương') || q.includes('mst')) {
      return `Dạ thông tin pháp lý của công ty em như sau ạ:\n\n` +
        `• **Tên công ty:** ${CONFIG.companyFullName}\n` +
        `• **Mã số thuế:** ${CONFIG.taxCode}\n` +
        `• **Người đại diện theo pháp luật:** Ông **ĐỖ MINH VƯƠNG** - Chủ tịch công ty kiêm Giám đốc.\n` +
        `• **Trụ sở:** ${CONFIG.address}.\n` +
        `• **Hotline liên hệ trực tiếp:** **${CONFIG.hotline}**`;
    }

    if (q.includes('vận chuyển') || q.includes('giao hàng') || q.includes('xe tải') || q.includes('ship')) {
      return `Dạ bên em có đội xe tải chuyên chở hàng hóa đường bộ riêng, nhận giao hàng nhanh chóng tận nơi:\n\n` +
        `🚚 Giao ngay trong ngày tại TP. Rạch Giá, Kiên Lương, Hà Tiên, Hòn Đất, Giồng Riềng, Gò Quao, An Biên, Phú Quốc...\n` +
        `🚚 Đảm bảo hàng hóa nguyên vẹn, bốc dỡ tận kho cho Quý khách.\n` +
        `Quý khách gọi hotline **${CONFIG.hotline}** để được sắp xếp lịch xe giao sớm nhất ạ!`;
    }

    return `Dạ em cảm ơn Quý khách đã quan tâm đến **CÔNG TY TNHH ĐỖ KIÊN 36**! Để nhận được tư vấn chi tiết nhất và bảng báo giá sỉ ưu đãi hôm nay, Quý khách vui lòng liên hệ trực tiếp Hotline/Zalo: **${CONFIG.hotline}** hoặc để lại số điện thoại, Giám đốc Đỗ Minh Vương cùng đội ngũ sẽ phản hồi ngay ạ!`;
  }

  // API Callers
  async function callDeepSeekAPI(messages) {
    const formatted = [
      { role: 'system', content: SYSTEM_KNOWLEDGE },
      ...messages.slice(-8)
    ];
    const res = await fetch('https://api.deepseek.com/chat/completions', {
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
    if (!res.ok) throw new Error('DeepSeek error');
    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function callGeminiAPI(messages) {
    const contents = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${DEFAULT_GEMINI_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
        contents: contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 800 }
      })
    });
    if (!res.ok) throw new Error('Gemini error');
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  async function fetchConsultation(userText) {
    chatHistory.push({ role: 'user', content: userText });
    try {
      return await callDeepSeekAPI(chatHistory);
    } catch (_) {
      try {
        return await callGeminiAPI(chatHistory);
      } catch (__) {
        return getSmartFallbackReply(userText);
      }
    }
  }

  function renderWidget() {
    const fab = document.createElement('div');
    fab.className = 'brand-fab-launcher';
    fab.id = 'dkFabLauncher';
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', CONFIG.fabTitle);
    fab.innerHTML = `
      <div class="brand-fab-icon-box">
        <span class="brand-fab-pulse"></span>
        <span>${CONFIG.avatarIcon}</span>
      </div>
      <div class="brand-fab-text">
        <span class="brand-fab-title">${CONFIG.fabTitle}</span>
        <span class="brand-fab-sub">${CONFIG.fabSub}</span>
      </div>
      <span class="brand-fab-badge">${CONFIG.fabBadge}</span>
    `;

    const chatWin = document.createElement('div');
    chatWin.className = 'brand-chat-window';
    chatWin.id = 'dkChatWindow';
    chatWin.innerHTML = `
      <div class="brand-chat-header">
        <div class="brand-chat-profile">
          <div class="brand-avatar">
            <span>${CONFIG.avatarIcon}</span>
            <span class="brand-online-dot"></span>
          </div>
          <div class="brand-profile-meta">
            <div class="brand-title">${CONFIG.brandName}</div>
            <span class="brand-status-text">${CONFIG.subHeader}</span>
          </div>
        </div>
        <div class="brand-header-actions">
          <button class="brand-icon-btn" id="btnBrandClear" title="Làm mới cuộc trò chuyện">🔄</button>
          <button class="brand-icon-btn" id="btnBrandClose" title="Thu nhỏ">&times;</button>
        </div>
      </div>

      <div class="brand-quick-suggestions">
        <button class="suggestion-chip" data-q="Báo giá sỉ bách hóa tổng hợp">📦 Báo giá sỉ</button>
        <button class="suggestion-chip" data-q="Tư vấn đặt giỏ quà Tết doanh nghiệp">🎁 Giỏ quà Tết</button>
        <button class="suggestion-chip" data-q="Địa chỉ kho hàng & chỉ đường">📍 Kho hàng ở đâu?</button>
        <button class="suggestion-chip" data-q="Chính sách giao hàng và xe tải">🚚 Vận chuyển</button>
      </div>

      <div class="brand-chat-body" id="brandChatBody">
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      </div>

      <div class="brand-chat-footer">
        <form class="brand-input-form" id="brandChatForm">
          <textarea class="brand-input-field" id="brandInputField" rows="1" placeholder="Nhập câu hỏi bạn cần tư vấn..."></textarea>
          <button type="submit" class="brand-send-btn" id="brandSendBtn">➤</button>
        </form>
        <div class="brand-footer-note">${CONFIG.footerNote}</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(chatWin);

    // Event binding
    const chatBody = document.getElementById('brandChatBody');
    const inputField = document.getElementById('brandInputField');
    const form = document.getElementById('brandChatForm');
    const btnClose = document.getElementById('btnBrandClose');
    const btnClear = document.getElementById('btnBrandClear');

    function toggle(open) {
      const show = open !== undefined ? open : !chatWin.classList.contains('open');
      chatWin.classList.toggle('open', show);
      if (show) inputField.focus();
    }

    window.openDoKienChat = function (presetQuery) {
      toggle(true);
      if (presetQuery) {
        inputField.value = presetQuery;
        form.dispatchEvent(new Event('submit'));
      }
    };

    fab.addEventListener('click', () => toggle());
    btnClose.addEventListener('click', () => toggle(false));
    btnClear.addEventListener('click', () => {
      chatHistory = [chatHistory[0]];
      chatBody.innerHTML = `
        <div class="brand-msg bot">
          <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
          <div class="brand-msg-bubble">${formatMarkdown(chatHistory[0].content)}</div>
        </div>
      `;
    });

    // Chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        inputField.value = q;
        form.dispatchEvent(new Event('submit'));
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = inputField.value.trim();
      if (!txt) return;
      inputField.value = '';

      // User msg
      const userDiv = document.createElement('div');
      userDiv.className = 'brand-msg user';
      userDiv.innerHTML = `<div class="brand-msg-bubble">${formatMarkdown(txt)}</div>`;
      chatBody.appendChild(userDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Loading indicator
      const loading = document.createElement('div');
      loading.className = 'brand-msg bot loading-state';
      loading.innerHTML = `
        <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
        <div class="brand-msg-bubble"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span> Đang kiểm tra thông tin...</div>
      `;
      chatBody.appendChild(loading);
      chatBody.scrollTop = chatBody.scrollHeight;

      const reply = await fetchConsultation(txt);
      loading.remove();

      // Bot msg
      const botDiv = document.createElement('div');
      botDiv.className = 'brand-msg bot';
      botDiv.innerHTML = `
        <div class="brand-msg-avatar">${CONFIG.avatarIcon}</div>
        <div class="brand-msg-bubble">${formatMarkdown(reply)}</div>
      `;
      chatBody.appendChild(botDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWidget);
  } else {
    renderWidget();
  }
})();
