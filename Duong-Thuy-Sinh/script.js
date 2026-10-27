/* ==========================================================================
   DƯƠNG THUỲ SINH - NGƯỜI SẮP CỖ | INTERACTIVE JAVASCRIPT
   Hotline / Zalo: 0917.141.336
   ========================================================================== */

// Gallery Items Database from real images
const offeringsData = [
  {
    id: 1,
    img: "FILE ANH/1.jpg",
    category: "thap-le",
    tag: "Tháp Lễ Thăng Tiến",
    title: "Tháp Thanh Long Thăng Hoa Cát Tường",
    desc: "Sự kết hợp vươn cao kiêu hãnh của những trái thanh long vỏ đỏ tai xanh tươi mọng cùng cành hoa lay ơn hồng thắm. Thế tháp vút cao vững chãi biểu trưng cho sự thăng hoa công danh, vượng khí hanh thông, đón lộc đón tài.",
    specs: ["Thanh long tuyển chọn", "Hoa lay ơn hồng", "Lá măng kiểng", "Kê tháp lụa gấm"],
    elements: "Thanh long ruột trắng/đỏ vỏ dày tai xanh mướt, hoa dơn hồng thắm ngát sắc, kết tán lá xanh vươn đỉnh trời."
  },
  {
    id: 2,
    img: "FILE ANH/2.jpg",
    category: "trau-cau",
    tag: "Phong Vị Cung Đình",
    title: "Tháp Xoài Cát Hoàng Kim & Huệ Trắng Thanh Tịnh",
    desc: "Mâm lễ kết tinh từ những trái xoài cát chu vàng óng căng tròn, điểm xuyết cau hoa chạm khắc tỉ mỉ tựa những đóa cúc ngọc và chùm hoa huệ trắng muốt ngát hương thơm thanh khiết dâng ban thờ gia tiên và đền chùa.",
    specs: ["Xoài cát Hòa Lộc", "Huệ trắng ta thơm ngát", "Cau hoa tỉa cúc", "Lá trầu xanh"],
    elements: "Xoài chín vàng đều không tì vết, hoa huệ ngát hương truyền thống, cau kiểng khía múi tinh xảo."
  },
  {
    id: 3,
    img: "FILE ANH/3.jpg",
    category: "thap-le",
    tag: "Đại Lễ Cửa Thánh",
    title: "Đại Tháp Xoài Cát Phượng Vũ Cung Kính Phụng Tiên",
    desc: "Tuyệt phẩm mâm lễ bề thế với tháp xoài đồ sộ, từng nhánh trầu cánh phượng xanh biếc đan lồng tựa cánh chim loan phượng tung bay, điểm xuyết hoa lay ơn đỏ và đóa lan hồ điệp trắng tinh tế, trang nghiêm tuyệt đối.",
    specs: ["Xoài cát loại 1", "Trầu cánh phượng nghệ thuật", "Lan hồ điệp trắng", "Cau hoa chạm ngọc"],
    elements: "Xoài cát vàng ươm, trầu cau têm phượng tạo hình đối xứng, dơn đỏ vươn cao nghinh tài."
  },
  {
    id: 4,
    img: "FILE ANH/4.jpg",
    category: "hien-dai",
    tag: "Lẵng Lễ Dâng Hương",
    title: "Lẵng Lễ Dâng Hương Hiện Đại Sắc Cam Hưng Thịnh",
    desc: "Bố cục sắc màu ấm áp rực rỡ mang hơi thở đương đại, phối hợp hoàn mỹ giữa hộp bánh quy Biscoff nhập khẩu, đào tiên vàng, cam sành mọng nước cùng hoa hồng cam trà và đóa hồ điệp tao nhã.",
    specs: ["Bánh Biscoff Bỉ", "Hoa hồng cam Spirit", "Hồ điệp trắng", "Cam vàng & đào tiên"],
    elements: "Bánh trà cao cấp, hoa hồng thơm ngọt, cam vàng thắt ruy băng trang trọng."
  },
  {
    id: 5,
    img: "FILE ANH/5.jpg",
    category: "truyen-thong",
    tag: "Dâng Phật - Cát Tường",
    title: "Song Mâm Ngũ Quả & Bạch Liên Hoa Dâng Phật",
    desc: "Cặp mâm lễ cao quý với đóa sen Quan Âm gấp cánh nghệ thuật thanh tao thuần khiết, hòa quyện cùng dưa lưới vàng, nho ngón tay, táo Envy đỏ mọng, lê nâu và xoài cát, biểu trưng cho sự viên mãn, an lạc tuyệt đối.",
    specs: ["Sen Quan Âm gấp cánh", "Dưa lưới hoàng kim", "Táo Envy & nho Mỹ", "Huệ trắng tinh khiết"],
    elements: "Hoa sen trắng gấp cánh công phu, ngũ quả ngoại nhập cao cấp, mâm viền lụa ngọc bích sang trọng."
  },
  {
    id: 6,
    img: "FILE ANH/6.jpg",
    category: "hien-dai",
    tag: "Gia Tiên Rằm - Mùng 1",
    title: "Khay Quả Đa Sắc Phối Hoa Ly Kép & Hồng Nhung",
    desc: "Khay mây tròn tự nhiên mộc mạc làm nổi bật sắc thắm của đóa hoa ly kép hồng phớt đài các, hoa hồng nhung nhung đỏ quyến rũ cùng táo đỏ, cam vàng và quả cau khía múi hoa dâng lên tiên tổ lòng biết ơn sâu sắc.",
    specs: ["Hoa ly kép thơm", "Hoa hồng nhung đỏ", "Lê Hàn Quốc & táo Envy", "Khay mây đan tự nhiên"],
    elements: "Ly kép nở bung rực rỡ, quả nhập khẩu chọn lọc từng trái, trầu cau tỉa nghệ thuật."
  },
  {
    id: 7,
    img: "FILE ANH/7.jpg",
    category: "truyen-thong",
    tag: "Ngũ Quả Tết Cát Tường",
    title: "Mâm Ngũ Quả Tết Đỉnh Bưởi Đỏ Phúc Lộc Sum Vầy",
    desc: "Mâm ngũ quả chuẩn phong vị Tết cổ truyền Việt Nam với nải chuối tiêu xanh nâng đỡ toàn bộ tài lộc, đỉnh ngự quả bưởi đỏ tài lộc căng tròn, điểm xuyết thanh long tai xanh, táo xanh, mận tím và trầu cau tươi xanh mơn mởn.",
    specs: ["Nải chuối xanh ôm lộc", "Bưởi đỏ tiến vua", "Thanh long tai xanh", "Trầu cau têm cánh phượng"],
    elements: "Chuối xanh đều quả cong đẹp ôm trọn mâm lễ, bưởi đỏ vượng khí, đầy đủ Ngũ Hành Kim - Mộc - Thủy - Hỏa - Thổ."
  },
  {
    id: 8,
    img: "FILE ANH/8.jpg",
    category: "hien-dai",
    tag: "Bạch Liên Dâng Mẫu",
    title: "Giỏ Lễ Bạch Liên & Huệ Trắng Dâng Cửa Mẫu",
    desc: "Nét đẹp thuần khiết tôn nghiêm hiếm có: những đóa sen Quan Âm bách diệp gấp cánh tỉ mỉ nở rộ giữa rừng hoa huệ trắng ngát hương, bao bọc quanh mâm quả ngọt lành và hộp bánh trà thanh tao dâng chốn thiền môn, phủ Mẫu.",
    specs: ["Sen Quan Âm bách diệp", "Huệ trắng ngát hương", "Cam vàng & lê nâu", "Khăn xếp lụa trắng"],
    elements: "Tone trắng xanh thanh tịnh tuyệt đối, hoa tươi tỏa hương ngát cửa điện, quả mọng rực rỡ."
  },
  {
    id: 9,
    img: "FILE ANH/9.jpg",
    category: "thap-le",
    tag: "Đại Lễ Cửa Đền",
    title: "Đại Lễ Quả Phối Bánh Trà & Rượu Sapphire Hoàng Gia",
    desc: "Tác phẩm lễ vật hoành tráng bề thế bậc nhất: tháp hoa huệ vút cao uy nghi, kết hợp chai rượu vang Sapphire óng ánh, trà thơm hảo hạng, bánh quy bơ cao cấp cùng dưa hoàng kim, xoài cát và trầu cau cánh phượng nghênh đón tài lộc.",
    specs: ["Rượu vang & trà hảo hạng", "Bánh quy McVitie's", "Dưa hoàng kim & xoài cát", "Huệ trắng vút đỉnh"],
    elements: "Lễ vật dâng Thánh đền phủ lộng lẫy, phối hợp hài hòa giữa hoa quả tươi và phẩm vật thượng phẩm."
  },
  {
    id: 10,
    img: "FILE ANH/10.jpg",
    category: "trau-cau",
    tag: "Trầu Cau Nghệ Thuật",
    title: "Lẵng Trầu Cau Phượng Vũ & Thược Dược Cung Đình",
    desc: "Bàn tay khéo léo của nghệ nhân Dương Thuỳ Sinh tái hiện sống động nghệ thuật têm trầu cánh phượng truyền thống, xếp cánh lá trầu ôm lấy đóa thược dược đỏ rực và hoa thược dược vàng cam đài các, đẹp như một bức tranh thủy mặc.",
    specs: ["Trầu không tươi dày lá", "Cau tươi đốm hoa cúc", "Hoa thược dược cung đình", "Giỏ quai tre tự nhiên"],
    elements: "Lá trầu têm vuốt cánh phượng nhọn sắc sảo, hoa thược dược khoe sắc thắm, cau têm hoa cúc tinh xảo."
  },
  {
    id: 11,
    img: "FILE ANH/11.jpg",
    category: "thap-le",
    tag: "Tông Tím Hoàng Gia",
    title: "Mâm Lễ Quạt Tím & Hoa Ly Trà Phong Vị Hoàng Cung",
    desc: "Thiết kế độc bản mang phong cách quý tộc dâng Mẫu/Tứ Phủ với tông màu tím thủy chung sang trọng: quạt gấm thêu hoa, cẩm tú cầu tím biếc, hoa ly trà, ngọc trai kết chuỗi cùng trà lon cao cấp đan kết nghệ thuật.",
    specs: ["Quạt lụa tím hoàng gia", "Cẩm tú cầu tím & hoa ly", "Hộp bánh trà tím", "Chuỗi ngọc trai điểm xuyết"],
    elements: "Tone màu tím quý phái hiếm thấy, bố cục xòe quạt đăng đối, chi tiết ngọc trai tạo điểm nhấn linh thiêng."
  },
  {
    id: 12,
    img: "FILE ANH/12.jpg",
    category: "truyen-thong",
    tag: "Vạn Thọ Cát Tường",
    title: "Mâm Lễ Dưa Hoàng Kim & Cúc Đại Đóa Vạn Thọ",
    desc: "Nét tươi sáng ấm áp dâng gia tiên với điểm nhấn trái dưa hoàng kim chín vàng tròn trịa tượng trưng cho viên mãn, hòa cùng cúc đại đóa vàng rực mang ý nghĩa trường thọ, cam sành thắt nơ mộc mạc và thanh long thăng hoa.",
    specs: ["Dưa hoàng kim quả to", "Cúc đại đóa vàng & trắng", "Lê Hàn Quốc & kiwi", "Cam vàng thắt nơ mộc"],
    elements: "Sắc vàng hoàng kim rực rỡ nghênh đón vượng khí, hoa cúc tươi lâu bền sắc, mâm gỗ tự nhiên."
  },
  {
    id: 13,
    img: "FILE ANH/13.jpg",
    category: "trau-cau",
    tag: "Phú Quý Bình An",
    title: "Khay Táo Đỏ Phú Quý & Hoa Sen Bích Hồng",
    desc: "Vẻ đẹp đằm thắm tràn đầy phúc khí: những trái táo đỏ căng bóng xếp thành vòng tròn nâng đỡ đóa sen Quan Âm bách diệp gấp cánh màu hồng cánh sen kiêu sa, điểm xuyết trầu cau têm cánh hoa cúc ngọc ngà.",
    specs: ["Táo đỏ Envy mọng nước", "Hoa sen hồng bách diệp", "Cau hoa tỉa cánh cúc", "Mẹt tre mộc mạc"],
    elements: "Táo đỏ son sắc biểu trưng may mắn tài lộc, sen hồng thanh tao mang hương thơm an lạc đến muôn nhà."
  },
  {
    id: 14,
    img: "FILE ANH/14.jpg",
    category: "trau-cau",
    tag: "Hương Cau Dâng Thánh",
    title: "Giỏ Dây Thừng Trầu Cau Nghệ Thuật & Hoa Cau Ngát Hương",
    desc: "Hồn cốt văn hóa làng quê đất Việt được thăng hoa: giỏ bện dây thừng mộc mạc ôm trọn những cánh phượng trầu cau xanh biếc bung nở như một đóa hoa sen khổng lồ, điểm những nhành hoa cau vàng ươm tỏa ngát hương thơm nồng nàn.",
    specs: ["Trầu cánh phượng uốn lượn", "Chùm hoa cau vàng ngát hương", "Giỏ mộc bện dây đay thừng", "Hạt cau bổ cau cánh bướm"],
    elements: "Hương hoa cau ngọt ngào thoang thoảng, cánh trầu xanh biếc xếp lớp đối xứng hoàn hảo, mộc mạc mà đỉnh cao."
  }
];

// Document Ready Setup
document.addEventListener("DOMContentLoaded", () => {
  initStickyNav();
  renderGallery(offeringsData);
  initFilterTabs();
  initLightbox();
  initFaqAccordion();
  initOrderForm();
});

// Sticky Nav Scroll Effect
function initStickyNav() {
  const nav = document.querySelector(".site-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// Render Gallery Cards
function renderGallery(items) {
  const galleryContainer = document.getElementById("galleryGrid");
  if (!galleryContainer) return;

  galleryContainer.innerHTML = items.map(item => `
    <article class="offering-card" data-category="${item.category}" data-id="${item.id}">
      <div class="card-img-wrapper" onclick="openLightbox(${item.id})">
        <span class="category-tag">${item.tag}</span>
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="zoom-overlay">
          <div class="zoom-btn" title="Xem chi tiết ảnh lớn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-specs">
          ${item.specs.map(spec => `<span class="spec-badge">✦ ${spec}</span>`).join("")}
        </div>
        <div class="card-footer">
          <button class="btn-order-card" onclick="selectForOrder('${item.title}')">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Tư Vấn Mâm Này
          </button>
          <a href="tel:0917141336" style="font-size: 0.85rem; font-weight: 600; color: var(--accent-gold-dark);">
            0917.141.336
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

// Filter Tabs Logic
function initFilterTabs() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");
      if (filterVal === "all") {
        renderGallery(offeringsData);
      } else {
        const filtered = offeringsData.filter(item => item.category === filterVal);
        renderGallery(filtered);
      }
    });
  });
}

// Lightbox Logic
let currentItem = null;

function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxClose");

  closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(id) {
  const item = offeringsData.find(o => o.id === id);
  if (!item) return;

  currentItem = item;
  const modal = document.getElementById("lightboxModal");
  const imgElem = document.getElementById("lightboxImg");
  const tagElem = document.getElementById("lightboxTag");
  const titleElem = document.getElementById("lightboxTitle");
  const storyElem = document.getElementById("lightboxStory");
  const elementsElem = document.getElementById("lightboxElements");

  imgElem.src = item.img;
  imgElem.alt = item.title;
  tagElem.textContent = item.tag;
  titleElem.textContent = item.title;
  storyElem.textContent = item.desc;
  elementsElem.textContent = item.elements;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function orderFromLightbox() {
  if (currentItem) {
    selectForOrder(currentItem.title);
    closeLightbox();
  }
}

// Select item and auto-fill in form
function selectForOrder(title) {
  const selectElem = document.getElementById("orderTypeSelect");
  const noteElem = document.getElementById("orderNotes");
  if (selectElem) {
    selectElem.value = "Mâm theo mẫu ảnh";
  }
  if (noteElem) {
    noteElem.value = `Tôi muốn đặt/tư vấn mâm: "${title}".`;
  }
  
  // Scroll smoothly to order form
  const orderSection = document.getElementById("dat-le");
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: "smooth" });
  }
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// Order Form & Zalo Pre-fill
function initOrderForm() {
  const form = document.getElementById("orderConsultForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim() || "Quý khách";
    const phone = document.getElementById("customerPhone").value.trim();
    const occasion = document.getElementById("orderOccasion").value;
    const type = document.getElementById("orderTypeSelect").value;
    const date = document.getElementById("deliveryDate").value;
    const notes = document.getElementById("orderNotes").value.trim();

    if (!phone) {
      alert("Vui lòng điền số điện thoại hoặc Zalo để nghệ nhân Dương Thuỳ Sinh có thể liên hệ lại tư vấn cho quý khách.");
      return;
    }

    // Build Zalo prefill text
    const message = `Kính gửi Nghệ Nhân Dương Thuỳ Sinh (Người Sắp Cỗ):
- Tên tôi: ${name}
- SĐT / Zalo: ${phone}
- Dịp lễ: ${occasion}
- Loại mâm lễ: ${type}
- Ngày cần nhận lễ: ${date || 'Sớm nhất có thể'}
- Yêu cầu chi tiết: ${notes || 'Xin tư vấn mẫu phù hợp và báo giá chi tiết'}
(Đã gửi từ Website)`;

    // Open Zalo chat with the phone number 0917141336
    const encodedMsg = encodeURIComponent(message);
    
    // Copy to clipboard for convenience
    navigator.clipboard.writeText(message).then(() => {
      console.log("Copied to clipboard");
    }).catch(err => console.log("Clipboard not allowed"));

    // Zalo link: https://zalo.me/0917141336
    alert(`Cảm ơn ${name}! Yêu cầu tư vấn của bạn đã được tiếp nhận.\nWebsite sẽ mở cửa sổ Zalo để bạn gửi trực tiếp cho Nghệ Nhân Dương Thuỳ Sinh (0917.141.336).`);
    window.open(`https://zalo.me/0917141336`, "_blank");
  });
}

// Mobile navigation toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const navCta = document.querySelector(".nav-cta");
  if (!navLinks) return;

  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
    if (navCta) navCta.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "80px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.background = "#fff";
    navLinks.style.padding = "2rem";
    navLinks.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    navLinks.style.gap = "1.5rem";

    if (navCta) {
      navCta.style.display = "flex";
      navCta.style.justifyContent = "center";
      navCta.style.paddingBottom = "1.5rem";
      navCta.style.background = "#fff";
    }
  }
}
