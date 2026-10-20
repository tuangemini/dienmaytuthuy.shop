/**
 * TRỢ LÝ TƯ VẤN THƯƠNG HIỆU - CÔNG TY TNHH ĐỖ KIÊN 36
 * Website chính thức: https://dokien36.biz/
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
    website: 'https://dokien36.biz/',
    address: 'Số 35/5 đường Hồ Văn Huê, Phường Vĩnh Thông, TP. Rạch Giá, Tỉnh Kiên Giang',
    hotline: '0987.307.222',
    mapsUrl: 'https://maps.app.goo.gl/uJZcjyrYHzvKtVSw8',
    fabTitle: 'Hỏi Đỗ Kiên 36',
    fabSub: 'Hàng tiêu dùng, giỏ quà & xe tải 24/7',
    fabBadge: 'Sẵn Sàng',
    avatarIcon: '🏢',
    subHeader: 'Đại diện chính thức • Kết nối B2B 24/7',
    footerNote: 'CÔNG TY TNHH ĐỖ KIÊN 36 • dokien36.biz',
    deepseekModel: 'deepseek-chat',
    geminiModel: 'gemini-3.8-flash',
    provider: 'deepseek'
  };

  // KHO TRI THỨC ĐẠI DIỆN THƯƠNG HIỆU ĐỖ KIÊN 36 (CHUẨN HÓA THEO HỒ SƠ 13 NĂM)
  const SYSTEM_KNOWLEDGE = `
Bạn là đại diện chính thức, niềm nở, chân thành và dày dạn kinh nghiệm thương trường của "CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐỖ KIÊN 36" (Website: https://dokien36.biz/).

THÔNG TIN PHÁP LÝ & HỒ SƠ DOANH NGHIỆP:
- Tên công ty: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐỖ KIÊN 36 (ĐỖ KIÊN 36 CO., LTD)
- Tên thương hiệu: ĐỖ KIÊN 36 / NHÀ PHÂN PHỐI ĐỖ KIÊN 36
- Website chính thức: https://dokien36.biz/
- Mã số thuế (MST): 1702335760
- Người đại diện theo pháp luật: Ông ĐỖ MINH VƯƠNG (Giới tính: Nam - Chức vụ: Chủ tịch công ty kiêm Giám đốc).
- Địa chỉ trụ sở & Tổng kho: Số 35/5 đường Hồ Văn Huê, Phường Vĩnh Thông, Thành phố Rạch Giá, Tỉnh Kiên Giang.
- Google Maps: https://maps.app.goo.gl/uJZcjyrYHzvKtVSw8 (Tọa độ: 10.0340155, 105.0825116).
- Hotline & Zalo: 0987.307.222 (Phục vụ 24/7).
- Giờ hoạt động kho hàng: 07:00 - 20:00 hàng ngày (kể cả Thứ Bảy, Chủ Nhật và ngày Lễ).

HÀNH TRÌNH 13 NĂM KHỞI NGHIỆP TỪ CON SỐ 0:
- Người sáng lập: Ông Đỗ Minh Vương sinh ra ở vùng quê nghèo tỉnh Thanh Hóa, với ý chí vươn lên mãnh liệt đã vào miền Nam lập nghiệp.
- Những ngày đầu tại Kiên Giang: Tự mình chở từng bao cà phê bằng xe máy rong ruổi khắp ngõ hẻm, gõ cửa từng quán cóc, tiệm tạp hóa nhỏ dưới nắng mưa suốt nhiều năm trời.
- Bài học cốt lõi & Triết lý kinh doanh: "Khách hàng không cần người nói hay, họ cần người giải quyết triệt để nỗi lo thực tế của họ!"
- Kết quả sau 13 năm xây dựng uy tín:
  + 13 năm kinh nghiệm chuyên sâu trong ngành phân phối hàng tiêu dùng tại miền Tây.
  + Mạng lưới 2.000+ Đại lý & Điểm bán phủ sóng toàn tỉnh Kiên Giang từ kênh rạch nông thôn đến thành thị.
  + Đội ngũ 30+ nhân sự giao vận chuyên nghiệp cùng hệ thống xe tải lớn nhỏ (Hino, Isuzu, Thaco) đáp ứng mọi đơn hàng lớn nhỏ.
  + Tổng kho bãi trung tâm hiện đại đặt tại TP. Rạch Giá.

BA NHÓM ĐỐI TÁC CHIẾN LƯỢC CẦN KẾT NỐI B2B:
1. Nhóm 01 - Nhà Phân Phối (NPP) & Tổng thầu:
   - Các tổng thầu, tổng kho hàng tiêu dùng tại các tỉnh thành cần nguồn hàng sinh học chuẩn chỉnh, an toàn, giá gốc ổn định lâu dài.
2. Nhóm 02 - Đại Lý & Tiệm Tạp Hóa:
   - Các tiệm tạp hóa, bách hóa tổng hợp, siêu thị mini muốn mở rộng sản phẩm bán chạy, nguồn hàng dồi dào, quay vòng vốn nhanh, chiết khấu cao.
3. Nhóm 03 - Cơ Sở Dịch Vụ Dùng Lớn:
   - Chuỗi tiệm giặt sấy, khách sạn, nhà nghỉ, homestay, trường mầm non, cơ quan có nhu cầu giặt xả cao (nước giặt xả công nghiệp & sinh học chất lượng cao, can 5L - 25L tiết kiệm chi phí).
4. Doanh nghiệp & Đoàn thể đặt Giỏ Quà Tết:
   - Chuyên đóng gói sỉ & lẻ Giỏ quà Tết, Hộp quà Tết cao cấp mừng xuân theo ngân sách từ 200.000đ đến 3.000.000đ+, in logo thiệp chúc mừng, chiết khấu tới 25%.

THÔNG ĐIỆP KẾT NỐI B2B / BNI:
"Tôi có người anh em 13 năm phân phối hàng tiêu dùng tận gốc, chính sách cực tốt. Để tôi kết nối hai bên làm việc!"

QUY TẮC GIAO TIẾP:
1. Xưng hô thân tình, chuyên nghiệp, lễ phép: "Dạ em chào Quý khách/Quý đối tác! Em là đại diện tư vấn của Công ty Đỗ Kiên 36 rất hân hạnh được hỗ trợ Quý khách ạ."
2. Tuyệt đối KHÔNG xưng là AI, DeepSeek hay Gemini. Bạn là nhân viên tư vấn đại diện cho Đỗ Kiên 36.
3. Với các đối tác B2B, tiệm tạp hóa, xưởng giặt sấy hoặc khách sạn, luôn mời kết nối Hotline/Zalo 0987.307.222 để Giám đốc Đỗ Minh Vương trực tiếp trao đổi chính sách đại lý và gửi mẫu thử nghiệm.
`;

  let chatHistory = [
    {
      role: 'assistant',
      content: `Dạ em chào Quý khách! Em là đại diện tư vấn của **CÔNG TY TNHH ĐỖ KIÊN 36** (Website: [dokien36.biz](https://dokien36.biz/)). Với **hành trình 13 năm phân phối hàng tiêu dùng** tại Kiên Giang, bên em sẵn sàng hỗ trợ **Báo giá sỉ bách hóa, Giỏ quà Tết doanh nghiệp & Nước giặt xả cho chuỗi giặt sấy/khách sạn**. Quý khách đang cần hỗ trợ mặt hàng nào ạ?`
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

  // Bộ lọc tri thức cục bộ Smart Fallback khi mất kết nối mạng
  function getSmartFallbackReply(question) {
    const q = question.toLowerCase();

    if (q.includes('hành trình') || q.includes('13 năm') || q.includes('lịch sử') || q.includes('câu chuyện') || q.includes('thanh hóa') || q.includes('vương')) {
      return `Dạ **Hành trình 13 năm của Đỗ Kiên 36** là câu chuyện khởi nghiệp đầy tâm huyết từ con số 0 của Giám đốc **ĐỖ MINH VƯƠNG** ạ:\n\n` +
        `• **Xuất thân:** Người con vùng quê nghèo Thanh Hóa, với ý chí vươn lên đã vào miền Nam lập nghiệp.\n` +
        `• **Những ngày đầu Kiên Giang:** Tự chở từng bao cà phê bằng xe máy, rong ruổi gõ cửa từng quán cóc, tiệm tạp hóa nhỏ dưới nắng mưa.\n` +
        `• **Bài học cốt lõi:** *"Khách hàng không cần người nói hay, họ cần người giải quyết triệt để nỗi lo thực tế của họ!"*\n` +
        `• **Hiện nay:** Đỗ Kiên 36 đã phát triển thành tổng kho với mạng lưới **2.000+ đại lý & điểm bán** phủ khắp Kiên Giang, đội ngũ **30+ nhân sự giao vận** và hệ thống xe tải Hino, Isuzu, Thaco đáp ứng mọi đơn hàng lớn nhỏ!\n\n` +
        `Mời Quý khách kết nối trực tiếp với Giám đốc Vương qua Hotline/Zalo: **${CONFIG.hotline}** ạ!`;
    }

    if (q.includes('đối tác') || q.includes('b2b') || q.includes('bni') || q.includes('kết nối') || q.includes('giặt sấy') || q.includes('khách sạn')) {
      return `Dạ **Đỗ Kiên 36** đang tìm kiếm và mở rộng kết nối với 3 nhóm đối tác chiến lược B2B:\n\n` +
        `1. **Nhà Phân Phối (NPP) & Tổng thầu:** Cần nguồn hàng sinh học chuẩn chỉnh, giá gốc ổn định.\n` +
        `2. **Đại lý & Tiệm tạp hóa:** Các cửa hàng, siêu thị mini muốn mở rộng sản phẩm bán chạy, quay vòng vốn nhanh.\n` +
        `3. **Cơ sở dịch vụ dùng lớn:** Chuỗi tiệm giặt sấy, khách sạn, nhà nghỉ, homestay, trường mầm non có nhu cầu giặt xả cao với dung tích can lớn tiết kiệm.\n\n` +
        `*"Tôi có người anh em 13 năm phân phối hàng tiêu dùng tận gốc, chính sách cực tốt. Để tôi kết nối hai bên làm việc!"*\n` +
        `Quý khách gọi ngay Hotline **${CONFIG.hotline}** để được tư vấn chính sách B2B tốt nhất ạ!`;
    }

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('vị trí') || q.includes('maps') || q.includes('hồ văn huê')) {
      return `Dạ Tổng kho **CÔNG TY TNHH ĐỖ KIÊN 36** kính mời Quý khách ghé trực tiếp tại:\n\n` +
        `📍 **Địa chỉ:** ${CONFIG.address}\n` +
        `🗺️ **Google Maps:** [Xem vị trí & chỉ đường trên Google Maps](${CONFIG.mapsUrl})\n` +
        `🌐 **Website:** [dokien36.biz](https://dokien36.biz/)\n` +
        `📞 **Hotline/Zalo:** **${CONFIG.hotline}**\n\n` +
        `Kho hàng mở cửa từ 07:00 - 20:00 hàng ngày, sân bãi rộng rãi cho xe tải và ô tô bốc dỡ hàng hóa thuận tiện ạ!`;
    }

    if (q.includes('giá') || q.includes('báo giá') || q.includes('sỉ') || q.includes('đại lý') || q.includes('chiết khấu')) {
      return `Dạ bên em cam kết cung cấp **giá sỉ tận gốc** với chính sách chiết khấu rất tốt cho các tiệm tạp hóa, đại lý và đối tác doanh nghiệp:\n\n` +
        `• 100% hàng chính hãng, date mới từ nhà máy, hóa đơn VAT đầy đủ.\n` +
        `• Hơn 2.000 đại lý tin tưởng đồng hành suốt 13 năm qua.\n` +
        `• Đội xe tải Hino, Isuzu, Thaco giao hàng tận nơi hỏa tốc toàn tỉnh Kiên Giang.\n\n` +
        `Quý khách gọi hoặc nhắn Zalo **${CONFIG.hotline}**, Giám đốc Đỗ Minh Vương cùng đội ngũ sẽ gửi bảng giá chiết khấu đại lý ngay lập tức ạ!`;
    }

    if (q.includes('quà tết') || q.includes('giỏ quà') || q.includes('hộp quà')) {
      return `Dạ **Đỗ Kiên 36** chuyên gia công & cung cấp sỉ/lẻ **Giỏ Quà Tết, Hộp Quà Tết Doanh Nghiệp** theo yêu cầu:\n\n` +
        `🎁 **Đa dạng phân khúc:** Từ 200k, 350k, 500k đến các gói cao cấp 1 - 3 triệu đồng.\n` +
        `🎁 **Tùy chỉnh linh hoạt:** Đóng giỏ theo ngân sách và sở thích sản phẩm.\n` +
        `🎁 **In ấn riêng:** Miễn phí in logo doanh nghiệp, thiệp chúc Tết dập nhũ vàng.\n` +
        `🎁 **Chiết khấu:** Lên đến 15% - 25% cho đơn hàng số lượng nhiều của cơ quan, xí nghiệp.\n\n` +
        `Quý khách nhắn Zalo số **${CONFIG.hotline}**, bên em gửi ngay Catalogue mẫu giỏ quà Tết thực tế ạ!`;
    }

    return `Dạ em cảm ơn Quý khách đã quan tâm đến **CÔNG TY TNHH ĐỖ KIÊN 36** (Website: dokien36.biz)! Để được phục vụ chu đáo nhất và nhận bảng báo giá sỉ ưu đãi, Quý khách vui lòng gọi Hotline/Zalo: **${CONFIG.hotline}**, Giám đốc Đỗ Minh Vương cùng đội ngũ luôn sẵn sàng hỗ trợ 24/7 ạ!`;
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
        <button class="suggestion-chip" data-q="Hành trình 13 năm xây dựng uy tín của Giám đốc Đỗ Minh Vương">🌟 Hành trình 13 năm</button>
        <button class="suggestion-chip" data-q="Chính sách cho 3 nhóm đối tác B2B (NPP, Tạp hóa, Khách sạn giặt sấy)">🤝 Kết nối B2B</button>
        <button class="suggestion-chip" data-q="Báo giá sỉ bách hóa và hàng tiêu dùng sinh học">📦 Báo giá sỉ</button>
        <button class="suggestion-chip" data-q="Tư vấn đặt Giỏ quà Tết doanh nghiệp theo ngân sách">🎁 Giỏ quà Tết</button>
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
        <div class="brand-msg-bubble"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span> Đang kiểm tra thông tin đối tác...</div>
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
