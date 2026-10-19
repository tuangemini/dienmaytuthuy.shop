/**
 * MAIN INTERACTIVE APPLICATION SCRIPT - ĐIỆN MÁY TÚ THỦY
 * Xử lý dữ liệu sản phẩm, bộ lọc tìm kiếm, giỏ tư vấn, tính trả góp 0%, đặt hàng và sự kiện trang.
 */

(function () {
  'use strict';

  // 1. Kho dữ liệu sản phẩm chính hãng
  const PRODUCTS = [
    {
      id: 'tv-sam-55q60',
      name: 'Smart Tivi QLED Samsung 4K 55 inch 55Q60B',
      category: 'tivi',
      brand: 'samsung',
      originalPrice: 15900000,
      salePrice: 10890000,
      badge: 'Bán Chạy',
      rating: 5.0,
      reviews: 48,
      image: 'assets/img/products/tv-sam-55q60.jpg',
      specs: ['Màn hình 55 inch QLED 4K', 'Quantum HDR 1 tỷ màu', 'Công nghệ âm thanh OTS Lite', 'Tặng gói Clip TV 1 năm'],
      features: 'Màn hình chấm lượng tử 100% dải màu, thiết kế AirSlim thanh mảnh siêu mỏng sang trọng.'
    },
    {
      id: 'tv-sony-65x80',
      name: 'Google Tivi Sony 4K 65 inch KD-65X80K',
      category: 'tivi',
      brand: 'sony',
      originalPrice: 20900000,
      salePrice: 14990000,
      badge: 'Ưa Chuộng',
      rating: 4.9,
      reviews: 62,
      image: 'assets/img/products/tv-sony-65x80.jpg',
      specs: ['65 inch 4K X-Reality PRO', 'Bộ xử lý 4K HDR X1', 'Âm thanh Dolby Atmos', 'Điều khiển giọng nói tiếng Việt'],
      features: 'Màu sắc sống động tự nhiên với Triluminos Pro, âm thanh vòm đỉnh cao như tại rạp chiếu phim.'
    },
    {
      id: 'tv-lg-50ur',
      name: 'Smart Tivi LG 4K 50 inch 50UR7550PSC',
      category: 'tivi',
      brand: 'lg',
      originalPrice: 11900000,
      salePrice: 7990000,
      badge: 'Giá Sốc',
      rating: 4.8,
      reviews: 35,
      image: 'assets/img/products/tv-lg-50ur.jpg',
      specs: ['50 inch Real 4K UHD', 'Bộ xử lý AI α5 Gen6', 'Magic Remote chuột bay', 'webOS 23 mới nhất'],
      features: 'Hình ảnh sắc nét, điều khiển chuột bay Magic Remote độc quyền cực kỳ tiện lợi cho gia đình.'
    },
    {
      id: 'ac-daikin-9k',
      name: 'Điều Hòa Daikin Inverter 1 HP (9.000 BTU) FTKF25XVMV',
      category: 'dieuhoa',
      brand: 'daikin',
      originalPrice: 11500000,
      salePrice: 8990000,
      badge: 'Tiết Kiệm Điện',
      rating: 5.0,
      reviews: 84,
      image: 'assets/img/products/ac-daikin-9k.jpg',
      specs: ['Công suất 9.000 BTU (1HP)', 'Công nghệ lọc khí Streamer', 'Màng lọc Enzyme Blue + PM2.5', 'Gas R32 thân thiện môi trường'],
      features: 'Tiết kiệm điện vượt trội với mắt thần thông minh, luồng gió Coanda không thổi trực tiếp vào người.'
    },
    {
      id: 'ac-casper-9k',
      name: 'Điều Hòa Casper Inverter 1 HP (9.000 BTU) TC-09IS35',
      category: 'dieuhoa',
      brand: 'casper',
      originalPrice: 6990000,
      salePrice: 4890000,
      badge: 'Giá Rẻ Nhất',
      rating: 4.8,
      reviews: 51,
      image: 'assets/img/products/ac-casper-9k.jpg',
      specs: ['9.000 BTU Inverter i-Saving', 'Làm lạnh siêu tốc Turbo', 'Cơ chế tự làm sạch iClean', 'Bảo hành 1 đổi 1 trong 1 năm'],
      features: 'Làm lạnh tức thì chỉ sau 30 giây, vận hành êm ái bền bỉ, chi phí cực kỳ tiết kiệm.'
    },
    {
      id: 'ac-pana-12k',
      name: 'Điều Hòa Panasonic Inverter 1.5 HP (12.000 BTU) CU/CS-XPU12XKH-8',
      category: 'dieuhoa',
      brand: 'panasonic',
      originalPrice: 14200000,
      salePrice: 11490000,
      badge: 'Kháng Khuẩn',
      rating: 4.9,
      reviews: 43,
      image: 'assets/img/products/ac-pana-12k.jpg',
      specs: ['12.000 BTU cho phòng 15-20m²', 'Diệt khuẩn Nanoe-X & Nanoe-G', 'Công nghệ ECO tích hợp AI', 'Dàn tản nhiệt BlueFin chống ăn mòn'],
      features: 'Bảo vệ sức khỏe cả gia đình với khả năng lọc sạch 99% bụi mịn PM2.5 và vi khuẩn.'
    },
    {
      id: 'fridge-hita-450',
      name: 'Tủ Lạnh Hitachi Inverter 406 Lít R-FVX510PGV9 (GBK)',
      category: 'tulanh',
      brand: 'hitachi',
      originalPrice: 16500000,
      salePrice: 12900000,
      badge: 'Cao Cấp',
      rating: 5.0,
      reviews: 39,
      image: 'assets/img/products/fridge-hita-450.jpg',
      specs: ['Dung tích 406L mặt kính đen', 'Ngăn đông mềm Chilled', 'Hệ thống quạt kép Dual Fan', 'Cảm biến nhiệt Eco thông minh'],
      features: 'Mặt gương nguyên khối sang trọng, bảo quản thịt cá tươi ngon không cần rã đông.'
    },
    {
      id: 'fridge-sam-sbs',
      name: 'Tủ Lạnh Side By Side Samsung Inverter 655 Lít RS62R5001M9',
      category: 'tulanh',
      brand: 'samsung',
      originalPrice: 21900000,
      salePrice: 15490000,
      badge: 'Dung Tích Lớn',
      rating: 4.9,
      reviews: 29,
      image: 'assets/img/products/fridge-sam-sbs.jpg',
      specs: ['Dung tích siêu lớn 655L', 'Công nghệ viền siêu mỏng SpaceMax', 'Làm lạnh vòm All-around Cooling', 'Khử mùi than hoạt tính Deodorizer'],
      features: 'Mở rộng không gian lưu trữ thực phẩm cho gia đình 5-7 người, khay kính chịu lực cao cấp.'
    },
    {
      id: 'wm-elec-9k',
      name: 'Máy Giặt Cửa Ngang Electrolux Inverter 9 Kg EWF9024P5SB',
      category: 'maygiat',
      brand: 'electrolux',
      originalPrice: 12900000,
      salePrice: 8890000,
      badge: 'Giặt Hơi Nước',
      rating: 5.0,
      reviews: 57,
      image: 'assets/img/products/wm-elec-9k.jpg',
      specs: ['Khối lượng giặt 9kg cửa trước', 'Công nghệ giặt hơi nước Hygienic Care', 'Động cơ EcoInverter siêu êm', 'Công nghệ UltraMix hòa tan bột giặt'],
      features: 'Bảo vệ sợi vải không bị phai màu, loại bỏ 99.9% vi khuẩn và tác nhân gây dị ứng da.'
    },
    {
      id: 'wm-lg-10k',
      name: 'Máy Giặt LG Inverter AI DD 10 Kg FV1410S4P',
      category: 'maygiat',
      brand: 'lg',
      originalPrice: 13900000,
      salePrice: 9490000,
      badge: 'Công Nghệ AI',
      rating: 4.9,
      reviews: 64,
      image: 'assets/img/products/wm-lg-10k.jpg',
      specs: ['Khối lượng 10kg màu xám khói', 'Trí tuệ nhân tạo AI DD bảo vệ sợi vải', 'Giặt nhanh TurboWash 59 phút', 'Điều khiển từ xa qua SmartThinQ'],
      features: 'Tự động cảm biến chất liệu sợi vải và độ bẩn để đưa ra chuyển động giặt tối ưu nhất.'
    },
    {
      id: 'gd-locnuoc-karofi',
      name: 'Máy Lọc Nước RO Nóng Nguội Karofi KAD-D52 (10 Lõi)',
      category: 'giadung',
      brand: 'karofi',
      originalPrice: 8500000,
      salePrice: 5990000,
      badge: 'Nóng Nguội',
      rating: 4.9,
      reviews: 31,
      image: 'assets/img/products/gd-locnuoc-karofi.jpg',
      specs: ['10 lõi lọc công nghệ Smax gấp đôi công suất', '2 vòi 3 chế độ Nóng - Nguội', 'Màng RO Purifim Mỹ chuẩn y tế', 'Bổ sung khoáng chất Hydrogen'],
      features: 'Uống trực tiếp tại vòi không cần đun sôi, tiện lợi pha trà, cà phê, nấu mì nhanh chóng.'
    },
    {
      id: 'kplus-tvbox',
      name: 'Trọn Bộ Thiết Bị Clip TV Box & K+ HD Xem Ngoại Hạng Anh',
      category: 'dichvuso',
      brand: 'kplus',
      originalPrice: 1690000,
      salePrice: 990000,
      badge: 'Tặng Thuê Bao',
      rating: 5.0,
      reviews: 78,
      image: 'assets/img/products/kplus-tvbox.jpg',
      specs: ['Độ phân giải Full HD & 4K siêu mượt', 'Trọn gói các kênh Ngoại hạng Anh độc quyền', 'Hỗ trợ kết nối WiFi và dây LAN', 'Tích hợp kho phim và YouTube'],
      features: 'Biến mọi tivi thường thành Smart TV, xem truyền hình ổn định không giật lag.'
    }
  ];

  // Giỏ tư vấn tạm thời
  let inquiryCart = JSON.parse(localStorage.getItem('dmtt_inquiry_cart') || '[]');

  // Format tiền tệ Việt Nam
  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  // Khởi tạo các thành phần giao diện
  document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initInstallmentCalculator();
    initCartDrawer();
    initQuickSearch();
    init360TourViewer();
    initContactForms();
    updateCartBadge();
    initThemeToggle();
  });

  // -------------------------------------------------------------------------
  // 2. KHỞI TẠO VÀ LỌC DANH MỤC SẢN PHẨM
  // -------------------------------------------------------------------------
  let activeCategory = 'all';
  let activeBrand = 'all';
  let activeSort = 'featured';

  function initCatalog() {
    renderProducts(PRODUCTS);

    // Bắt sự kiện Tabs danh mục
    const catTabs = document.querySelectorAll('.cat-tab');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.category || 'all';
        applyFilters();
      });
    });

    // Lọc theo thương hiệu
    const brandSelect = document.getElementById('filterBrand');
    if (brandSelect) {
      brandSelect.addEventListener('change', (e) => {
        activeBrand = e.target.value;
        applyFilters();
      });
    }

    // Sắp xếp
    const sortSelect = document.getElementById('sortProducts');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        applyFilters();
      });
    }
  }

  window.filterCatalogByCategory = function (cat) {
    activeCategory = cat;
    const catTabs = document.querySelectorAll('.cat-tab');
    catTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.category === cat);
    });
    applyFilters();

    // Cuộn tới mục sản phẩm
    const section = document.getElementById('catalogSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function applyFilters() {
    let filtered = [...PRODUCTS];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (activeBrand !== 'all') {
      filtered = filtered.filter(p => p.brand.toLowerCase() === activeBrand.toLowerCase());
    }

    if (activeSort === 'price-asc') {
      filtered.sort((a, b) => a.salePrice - b.salePrice);
    } else if (activeSort === 'price-desc') {
      filtered.sort((a, b) => b.salePrice - a.salePrice);
    } else if (activeSort === 'discount') {
      filtered.sort((a, b) => (b.originalPrice - b.salePrice) - (a.originalPrice - a.salePrice));
    }

    renderProducts(filtered);
  }

  function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="no-products">
          <div style="font-size:3rem; margin-bottom:12px;">🔍</div>
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>Quý khách vui lòng chọn danh mục khác hoặc liên hệ hotline <strong>0985 676 311</strong> để được kiểm tra kho ngay ạ!</p>
          <button class="btn btn-primary" onclick="window.filterCatalogByCategory('all')">Xem Tất Cả Sản Phẩm</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(p => {
      const discountPercent = Math.round(((p.originalPrice - p.salePrice) / p.originalPrice) * 100);
      const estInstallment = Math.round(p.salePrice / 6);

      return `
        <div class="product-card" data-id="${p.id}">
          <div class="product-img-box">
            <span class="product-badge badge-discount">-${discountPercent}%</span>
            ${p.badge ? `<span class="product-badge badge-feature">${p.badge}</span>` : ''}
            <img src="${p.image}" alt="${p.name}" loading="lazy" class="product-img">
            <div class="product-overlay-actions">
              <button class="btn-quick-view" onclick="window.openProductDetail('${p.id}')">Xem Chi Tiết</button>
            </div>
          </div>

          <div class="product-info">
            <div class="product-brand-tag">${p.brand.toUpperCase()} • CHÍNH HÃNG</div>
            <h3 class="product-title" onclick="window.openProductDetail('${p.id}')">${p.name}</h3>

            <ul class="product-spec-list">
              ${p.specs.slice(0, 2).map(s => `<li>• ${s}</li>`).join('')}
            </ul>

            <div class="product-price-box">
              <div class="product-sale-price">${formatVND(p.salePrice)}</div>
              <div class="product-orig-price">${formatVND(p.originalPrice)}</div>
            </div>

            <div class="product-installment-tag">
              ⚡ Trả góp 0%: chỉ từ <strong>${formatVND(estInstallment)}/tháng</strong>
            </div>

            <div class="product-card-footer">
              <button class="btn-card-cart" onclick="window.addToInquiryCart('${p.id}')" title="Thêm vào giỏ tư vấn">
                <span>🛒 Thêm Giỏ Hàng</span>
              </button>
              <a href="tel:0985676311" class="btn-card-call" title="Gọi Hotline đặt ngay">
                <span>📞 Gọi Ngay</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // -------------------------------------------------------------------------
  // 3. TÌM KIẾM NHANH (QUICK SEARCH)
  // -------------------------------------------------------------------------
  function initQuickSearch() {
    const input = document.getElementById('searchProductInput');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        applyFilters();
        return;
      }

      const results = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.features.toLowerCase().includes(q)
      );

      renderProducts(results);
    });
  }

  // -------------------------------------------------------------------------
  // 4. MODAL CHI TIẾT SẢN PHẨM
  // -------------------------------------------------------------------------
  window.openProductDetail = function (id) {
    const p = PRODUCTS.find(item => item.id === id);
    if (!p) return;

    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productModalContent');
    if (!modal || !content) return;

    const discount = Math.round(((p.originalPrice - p.salePrice) / p.originalPrice) * 100);

    content.innerHTML = `
      <div class="modal-product-layout">
        <div class="modal-product-left">
          <img src="${p.image}" alt="${p.name}" class="modal-product-img">
          <div class="modal-store-badges">
            <div class="badge-item">🛡️ 100% Chính Hãng</div>
            <div class="badge-item">🚚 Miễn phí ship Hải Phòng</div>
            <div class="badge-item">🔄 Đổi mới 30 ngày</div>
            <div class="badge-item">🛠️ Bảo hành 2 - 5 năm</div>
          </div>
        </div>
        <div class="modal-product-right">
          <div class="modal-brand-badge">${p.brand.toUpperCase()}</div>
          <h2>${p.name}</h2>
          <div class="modal-rating">⭐⭐⭐⭐⭐ (${p.reviews} lượt đánh giá từ khách hàng Hải Phòng)</div>

          <div class="modal-price-row">
            <span class="modal-sale-price">${formatVND(p.salePrice)}</span>
            <span class="modal-orig-price">${formatVND(p.originalPrice)}</span>
            <span class="modal-discount-pill">Tiết kiệm ${discount}%</span>
          </div>

          <div class="modal-installment-banner">
            💳 <strong>Chương trình Trả Góp 0% Lãi Suất:</strong> Trả trước 0đ, chỉ cần CCCD gắn chip, duyệt hồ sơ online trong 5 phút.
          </div>

          <h4>Đặc Điểm Nổi Bật:</h4>
          <p>${p.features}</p>

          <h4>Thông Số Kỹ Thuật:</h4>
          <ul class="modal-specs-list">
            ${p.specs.map(s => `<li>✓ ${s}</li>`).join('')}
          </ul>

          <div class="modal-action-buttons">
            <button class="btn btn-primary" onclick="window.addToInquiryCart('${p.id}'); window.closeProductDetail();">
              🛒 Thêm Vào Giỏ Tư Vấn
            </button>
            <button class="btn btn-outline" onclick="window.calculateInstallmentFor('${p.salePrice}', '${p.name}'); window.closeProductDetail();">
              📊 Tính Trả Góp 0%
            </button>
            <a href="tel:0985676311" class="btn btn-call-now">
              📞 Gọi 0985 676 311 Nhận Giá Tốt
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  window.closeProductDetail = function () {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('active');
  };

  // -------------------------------------------------------------------------
  // 5. CÔNG CỤ TÍNH TRẢ GÓP 0% (INSTALLMENT CALCULATOR)
  // -------------------------------------------------------------------------
  let calcPrice = 10000000;
  let calcDownPaymentPercent = 20;
  let calcTerm = 6;

  function initInstallmentCalculator() {
    const priceSlider = document.getElementById('calcPriceSlider');
    const priceInput = document.getElementById('calcPriceInput');
    const downButtons = document.querySelectorAll('.calc-down-btn');
    const termButtons = document.querySelectorAll('.calc-term-btn');

    if (!priceSlider || !priceInput) return;

    function updateCalculator() {
      priceSlider.value = calcPrice;
      priceInput.value = formatVND(calcPrice);

      const downPayment = Math.round(calcPrice * (calcDownPaymentPercent / 100));
      const loanAmount = calcPrice - downPayment;
      const monthlyPayment = Math.round(loanAmount / calcTerm);

      document.getElementById('calcDownPaymentVal').textContent = formatVND(downPayment);
      document.getElementById('calcLoanAmountVal').textContent = formatVND(loanAmount);
      document.getElementById('calcMonthlyPaymentVal').textContent = formatVND(monthlyPayment);
      document.getElementById('calcTermDisplay').textContent = `${calcTerm} tháng`;
    }

    priceSlider.addEventListener('input', (e) => {
      calcPrice = parseInt(e.target.value, 10);
      updateCalculator();
    });

    downButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        downButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        calcDownPaymentPercent = parseInt(btn.dataset.percent, 10);
        updateCalculator();
      });
    });

    termButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        termButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        calcTerm = parseInt(btn.dataset.term, 10);
        updateCalculator();
      });
    });

    updateCalculator();
  }

  window.calculateInstallmentFor = function (price, productName) {
    calcPrice = parseInt(price, 10) || 10000000;
    const calcSection = document.getElementById('installmentSection');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
    const nameEl = document.getElementById('calcCurrentProduct');
    if (nameEl) nameEl.textContent = `Đang tính cho: ${productName}`;

    const priceSlider = document.getElementById('calcPriceSlider');
    if (priceSlider) {
      priceSlider.value = calcPrice;
      priceSlider.dispatchEvent(new Event('input'));
    }
  };

  // -------------------------------------------------------------------------
  // 6. GIỎ TƯ VẤN (INQUIRY CART DRAWER)
  // -------------------------------------------------------------------------
  function initCartDrawer() {
    const triggerBtn = document.getElementById('headerCartBtn');
    const drawer = document.getElementById('cartDrawer');
    const closeBtn = document.getElementById('closeCartBtn');
    const overlay = document.getElementById('cartDrawerOverlay');

    function toggle(open) {
      const show = open !== undefined ? open : !drawer.classList.contains('active');
      drawer.classList.toggle('active', show);
      if (overlay) overlay.classList.toggle('active', show);
      if (show) renderCartItems();
    }

    if (triggerBtn) triggerBtn.addEventListener('click', () => toggle(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
    if (overlay) overlay.addEventListener('click', () => toggle(false));

    // Xử lý gửi đơn tư vấn
    const submitBtn = document.getElementById('btnSubmitInquiry');
    if (submitBtn) {
      submitBtn.addEventListener('click', handleInquirySubmit);
    }
  }

  window.addToInquiryCart = function (id) {
    const p = PRODUCTS.find(item => item.id === id);
    if (!p) return;

    const existing = inquiryCart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      inquiryCart.push({
        id: p.id,
        name: p.name,
        price: p.salePrice,
        image: p.image,
        quantity: 1
      });
    }

    saveCart();
    updateCartBadge();
    showToast(`✅ Đã thêm "${p.name.slice(0, 32)}..." vào giỏ tư vấn!`);
  };

  function saveCart() {
    localStorage.setItem('dmtt_inquiry_cart', JSON.stringify(inquiryCart));
  }

  function updateCartBadge() {
    const total = inquiryCart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = total;
      b.style.display = total > 0 ? 'inline-flex' : 'none';
    });
  }

  function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalPrice');
    if (!list) return;

    if (inquiryCart.length === 0) {
      list.innerHTML = `
        <div class="empty-cart-msg">
          <div style="font-size:2.5rem; margin-bottom:8px;">🛒</div>
          <p>Giỏ tư vấn của Quý khách đang trống.</p>
          <small>Hãy chọn các sản phẩm tivi, tủ lạnh, điều hòa... để nhận báo giá trọn gói ưu đãi nhất!</small>
        </div>
      `;
      if (totalEl) totalEl.textContent = '0đ';
      return;
    }

    let totalPrice = 0;
    list.innerHTML = inquiryCart.map(item => {
      const subtotal = item.price * item.quantity;
      totalPrice += subtotal;

      return `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${formatVND(item.price)}</div>
            <div class="cart-qty-ctrls">
              <button onclick="window.changeCartQty('${item.id}', -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="window.changeCartQty('${item.id}', 1)">+</button>
              <button class="cart-remove-btn" onclick="window.removeCartItem('${item.id}')" title="Xóa">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (totalEl) totalEl.textContent = formatVND(totalPrice);
  }

  window.changeCartQty = function (id, delta) {
    const item = inquiryCart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      inquiryCart = inquiryCart.filter(i => i.id !== id);
    }
    saveCart();
    updateCartBadge();
    renderCartItems();
  };

  window.removeCartItem = function (id) {
    inquiryCart = inquiryCart.filter(i => i.id !== id);
    saveCart();
    updateCartBadge();
    renderCartItems();
  };

  function handleInquirySubmit() {
    if (inquiryCart.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm vào giỏ tư vấn!');
      return;
    }

    const name = document.getElementById('inquiryName')?.value.trim() || 'Khách hàng';
    const phone = document.getElementById('inquiryPhone')?.value.trim();
    const address = document.getElementById('inquiryAddress')?.value.trim() || 'Hải Phòng';
    const notes = document.getElementById('inquiryNotes')?.value.trim() || 'Tư vấn giao hàng & trả góp';

    if (!phone) {
      alert('Quý khách vui lòng nhập số điện thoại để Điện Máy Tú Thủy gọi lại báo giá ưu đãi nhé!');
      document.getElementById('inquiryPhone')?.focus();
      return;
    }

    const total = inquiryCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const productListText = inquiryCart.map(i => `- ${i.name} (SL: ${i.quantity}, Đơn giá: ${formatVND(i.price)})`).join('%0A');

    const msg = `Kính gửi Điện Máy Tú Thủy,%0A%0ATôi là ${name} (SĐT: ${phone})%0AĐịa chỉ: ${address}%0A%0ATôi cần tư vấn và nhận báo giá các sản phẩm:%0A${productListText}%0A%0ATổng dự tính: ${formatVND(total)}%0AGhi chú: ${notes}%0A%0AXin cảm ơn!`;

    // Tạo link mở Zalo hoặc gọi trực tiếp
    const zaloUrl = `https://zalo.me/0985676311?text=${encodeURIComponent(decodeURIComponent(msg))}`;

    // Mở Zalo và gửi email
    window.open(zaloUrl, '_blank');

    showToast('🎉 Đang mở kết nối Zalo với Điện Máy Tú Thủy! Cửa hàng sẽ phản hồi trong giây lát.');

    // Xóa giỏ sau khi gửi
    inquiryCart = [];
    saveCart();
    updateCartBadge();
    renderCartItems();
    document.getElementById('cartDrawer')?.classList.remove('active');
  }

  // -------------------------------------------------------------------------
  // 7. KHỞI CHẠY TOUR ẢNH 360 SHOWROOM
  // -------------------------------------------------------------------------
  function init360TourViewer() {
    if (typeof window.Panorama360Viewer === 'function') {
      window.tuThuyP360 = new window.Panorama360Viewer('panorama360Container', {
        initialImage: 'assets/img/storefront-main.jpg',
        autoRotate: true,
        autoRotateSpeed: 0.2
      });

      // Switch angle buttons
      const angleButtons = document.querySelectorAll('.tour-angle-btn');
      angleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          angleButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const src = btn.dataset.src;
          if (src && window.tuThuyP360) {
            window.tuThuyP360.loadImage(src);
          }
        });
      });
    }
  }

  // -------------------------------------------------------------------------
  // 8. FORM LIÊN HỆ & TOAST THÔNG BÁO
  // -------------------------------------------------------------------------
  function initContactForms() {
    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value || '';
        const phone = document.getElementById('contactPhone')?.value || '';
        const msg = document.getElementById('contactMsg')?.value || '';

        // Mailto backup to nguyenanhtu70hp@gmail.com
        const subject = encodeURIComponent(`Yêu cầu tư vấn từ khách hàng: ${name} (${phone})`);
        const body = encodeURIComponent(`Họ tên: ${name}\nSố điện thoại: ${phone}\nNội dung: ${msg}`);
        window.location.href = `mailto:nguyenanhtu70hp@gmail.com?subject=${subject}&body=${body}`;

        showToast('✉️ Đã gửi thông tin! Chuyên viên Điện Máy Tú Thủy sẽ gọi lại ngay cho Quý khách.');
        contactForm.reset();
      });
    }
  }

  function showToast(text) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'dmtt-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'dmtt-toast-item';
    toast.textContent = text;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // -------------------------------------------------------------------------
  // 9. THEME TOGGLE (SÁNG / TỐI)
  // -------------------------------------------------------------------------
  function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    const currentTheme = localStorage.getItem('dmtt_theme') || 'light';
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('dmtt_theme', isDark ? 'dark' : 'light');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  window.showToast = showToast;
})();
