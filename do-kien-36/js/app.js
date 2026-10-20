/**
 * CÔNG TY TNHH ĐỖ KIÊN 36 - INTERACTIVE LOGIC & APP ENGINE
 */
(function () {
  'use strict';

  // Dữ liệu sản phẩm & dịch vụ nổi bật
  const PRODUCTS_DATA = [
    {
      id: 'gqt-01',
      category: 'gioqua',
      name: 'Giỏ Quà Tết Hoàng Kim Phú Quý',
      tag: 'Bán Chạy Nhất',
      price: 650000,
      wholesalePrice: 520000,
      minOrder: '5 giỏ',
      image: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80',
      desc: 'Bao gồm rượu vang nhập khẩu, bánh quy Danisa Đan Mạch, kẹo socola Ferrero Rocher, trà olong búp sen, hạt điều rang củi cao cấp.',
      features: ['Thiết kế giỏ da cao cấp sang trọng', 'Miễn phí in thiệp chúc mừng & logo riêng', 'Giao tận nơi miễn phí tại Rạch Giá']
    },
    {
      id: 'gqt-02',
      category: 'gioqua',
      name: 'Hộp Quà Tết Như Ý Cát Tường',
      tag: 'Quà Doanh Nghiệp',
      price: 450000,
      wholesalePrice: 360000,
      minOrder: '10 hộp',
      image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=600&q=80',
      desc: 'Hộp quà cứng cáp dập kim vàng, bánh kẹo ngoại nhập, trà xanh cao nguyên, nho khô California, cafe phin hảo hạng.',
      features: ['Khắc laser logo công ty miễn phí', 'Đóng gói màng co chống xước', 'Chiết khấu tới 20% đơn từ 50 hộp']
    },
    {
      id: 'gqt-03',
      category: 'gioqua',
      name: 'Giỏ Quà Đoàn Viên An Khang',
      tag: 'Gói Tiết Kiệm',
      price: 280000,
      wholesalePrice: 225000,
      minOrder: '10 giỏ',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80',
      desc: 'Bộ quà ấm cúng gồm dầu ăn Simply, hạt nêm Knorr, nước mắm cá cơm, bánh kẹo Kinh Đô, trà lài thơm ngát.',
      features: ['Rất thích hợp tặng công nhân viên xí nghiệp', 'Hóa đơn VAT đầy đủ theo luật', 'Giao đúng hạn cam kết']
    },
    {
      id: 'bh-01',
      category: 'bachhoa',
      name: 'Nước Ngọt & Nước Giải Khát Các Loại',
      tag: 'Giá Sỉ Tận Gốc',
      price: 185000,
      wholesalePrice: 165000,
      minOrder: '20 thùng',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
      desc: 'Coca-Cola, Pepsi, 7Up, Sting dâu, Trà xanh 0 độ, Bò Húc Redbull chính hãng date mới 100%.',
      features: ['Luôn sẵn hàng số lượng lớn trong kho', 'Giá sỉ cạnh tranh nhất Rạch Giá', 'Hỗ trợ bốc dỡ tận nơi']
    },
    {
      id: 'bh-02',
      category: 'bachhoa',
      name: 'Bia Heineken, Tiger, Sài Gòn, 333',
      tag: 'Phân Phối Đại Lý',
      price: 365000,
      wholesalePrice: 335000,
      minOrder: '30 thùng',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
      desc: 'Tổng kho đại lý bia các loại cho tiệm tạp hóa, nhà hàng tiệc cưới, sự kiện hội nghị tại Kiên Giang.',
      features: ['Đầy đủ chứng từ nguồn gốc nhà máy', 'Công nợ linh hoạt cho khách quen', 'Xe tải giao tận cửa hàng']
    },
    {
      id: 'ny-01',
      category: 'nhuyeupham',
      name: 'Dầu Ăn & Gia Vị Bếp Nấu Công Nghiệp',
      tag: 'Giá Sỉ',
      price: 420000,
      wholesalePrice: 380000,
      minOrder: '10 can/thùng',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      desc: 'Dầu ăn Neptune, Simply, Tường An can 5L - 25L; hạt nêm, bột ngọt Ajinomoto, nước tương, giấm gạo.',
      features: ['Date dài từ 1.5 - 2 năm', 'Giá sỉ buôn tận gốc', 'Phù hợp quán ăn, trường học, bếp ăn']
    },
    {
      id: 'ny-02',
      category: 'nhuyeupham',
      name: 'Hóa Mỹ Phẩm, Nước Giặt Xả OMO, Comfort',
      tag: 'Chính Hãng 100%',
      price: 210000,
      wholesalePrice: 185000,
      minOrder: '15 can/thùng',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
      desc: 'Nước giặt xả OMO Matic, Ariel, Comfort, nước rửa chén Sunlight, nước lau sàn Sunlight thùng lớn tiết kiệm.',
      features: ['Hàng xuất kho trực tiếp từ nhà máy', 'Chiết khấu hấp dẫn theo bậc số lượng', 'Bao đổi trả nếu lỗi bao bì']
    },
    {
      id: 'vt-01',
      category: 'vanchuyen',
      name: 'Dịch Vụ Vận Tải Hàng Hóa Đường Bộ',
      tag: 'Đội Xe Riêng',
      price: 500000,
      wholesalePrice: 400000,
      minOrder: 'Theo chuyến/tháng',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      desc: 'Nhận chở hàng bách hóa, nông sản, vật tư từ Rạch Giá đi các huyện Kiên Lương, Giồng Riềng, Phú Quốc...',
      features: ['Đội xe tải từ 1.5 tấn đến 15 tấn', 'Tài xế nhiều năm kinh nghiệm, cẩn thận', 'Bảo hiểm hàng hóa 100% khi vận chuyển']
    }
  ];

  function formatVND(num) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace('₫', 'đ');
  }

  // Khởi tạo render sản phẩm
  function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const list = filter === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === filter);
    grid.innerHTML = list.map(p => `
      <div class="product-card" data-category="${p.category}">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="product-tag">${p.tag}</span>
        </div>
        <div class="product-content">
          <div class="product-cat-name">${getCategoryName(p.category)}</div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          
          <div class="product-price-block">
            <div>
              <div class="price-label">Giá sỉ tham khảo:</div>
              <div class="price-value">~ ${formatVND(p.wholesalePrice)}</div>
            </div>
            <div class="min-order-pill">Tối thiểu: ${p.minOrder}</div>
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-sm btn-quote" onclick="window.requestProductQuote('${p.id}')">
              <span>Báo Giá Sỉ Ngay</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.openDoKienChat('Tư vấn giá sỉ cho: ${p.name}')">
              <span>Hỏi Nhanh</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function getCategoryName(cat) {
    switch (cat) {
      case 'gioqua': return 'Giỏ Quà Tết Doanh Nghiệp';
      case 'bachhoa': return 'Bách Hóa Tổng Hợp';
      case 'nhuyeupham': return 'Nhu Yếu Phẩm & Gia Vị';
      case 'vanchuyen': return 'Dịch Vụ Vận Tải & Kho';
      default: return 'Sản Phẩm Phân Phối';
    }
  }

  // Bộ tính dự toán đơn hàng sỉ tương tác (Interactive Order Estimator)
  function initEstimator() {
    const typeSelect = document.getElementById('calcType');
    const budgetInput = document.getElementById('calcBudget');
    const qtyInput = document.getElementById('calcQty');
    const resultBox = document.getElementById('calcResult');
    if (!typeSelect || !budgetInput || !qtyInput || !resultBox) return;

    function recalculate() {
      const type = typeSelect.value;
      const budget = parseFloat(budgetInput.value) || 0;
      const qty = parseInt(qtyInput.value, 10) || 1;

      let subtotal = budget * qty;
      let discountRate = 0;

      if (qty >= 50 || subtotal >= 30000000) {
        discountRate = 0.20; // 20%
      } else if (qty >= 20 || subtotal >= 15000000) {
        discountRate = 0.15; // 15%
      } else if (qty >= 10 || subtotal >= 5000000) {
        discountRate = 0.10; // 10%
      } else if (qty >= 5) {
        discountRate = 0.05; // 5%
      }

      const discountVal = subtotal * discountRate;
      const finalTotal = subtotal - discountVal;

      resultBox.innerHTML = `
        <div class="result-row">
          <span>Tổng dự toán ban đầu:</span>
          <strong>${formatVND(subtotal)}</strong>
        </div>
        <div class="result-row discount">
          <span>Chiết khấu số lượng (${(discountRate * 100)}%):</span>
          <strong style="color:var(--brand-accent);">- ${formatVND(discountVal)}</strong>
        </div>
        <div class="result-row total">
          <span>Tổng thanh toán dự kiến:</span>
          <strong class="total-price">${formatVND(finalTotal)}</strong>
        </div>
        <div class="result-per-item">
          Đơn giá sỉ sau chiết khấu: <strong>${formatVND(finalTotal / qty)}</strong> / sản phẩm
        </div>
        <div class="result-bonus">
          🎁 <em>Đặc quyền: Miễn phí vận chuyển tận kho Rạch Giá &amp; Tặng kèm thiệp chúc mừng dập nhũ!</em>
        </div>
      `;
    }

    typeSelect.addEventListener('change', recalculate);
    budgetInput.addEventListener('input', recalculate);
    qtyInput.addEventListener('input', recalculate);
    recalculate();
  }

  // Xử lý modal báo giá
  window.requestProductQuote = function (productId) {
    const item = PRODUCTS_DATA.find(p => p.id === productId);
    if (!item) return;

    const modal = document.getElementById('quoteModal');
    const titleEl = document.getElementById('modalProductTitle');
    const inputProduct = document.getElementById('quoteInputProduct');
    if (!modal) return;

    if (titleEl) titleEl.innerText = item.name;
    if (inputProduct) inputProduct.value = `${item.name} (${item.id})`;

    modal.classList.add('active');
  };

  // Đóng modal
  window.closeQuoteModal = function () {
    const modal = document.getElementById('quoteModal');
    if (modal) modal.classList.remove('active');
  };

  // Dark mode toggle
  function initDarkMode() {
    const btn = document.getElementById('themeToggleBtn');
    const isDark = localStorage.getItem('dk_theme') === 'dark';
    if (isDark) document.body.classList.add('dark-mode');

    if (btn) {
      btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const dark = document.body.classList.contains('dark-mode');
        localStorage.setItem('dk_theme', dark ? 'dark' : 'light');
        btn.innerHTML = dark ? '☀️' : '🌙';
      });
    }
  }

  // Toast Notification
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : 'ℹ️'}</span>
      <div>${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Khởi chạy khi DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    initEstimator();
    initDarkMode();

    // Tab lọc danh mục
    document.querySelectorAll('.filter-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        renderProducts(cat);
      });
    });

    // Bắt sự kiện form liên hệ / gửi báo giá
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cName')?.value.trim();
        const phone = document.getElementById('cPhone')?.value.trim();
        if (!name || !phone) {
          showToast('Vui lòng nhập đầy đủ họ tên và số điện thoại!', 'error');
          return;
        }

        showToast(`Cảm ơn ${name}! Đỗ Kiên 36 đã nhận yêu cầu và sẽ gọi lại số ${phone} trong 5 phút!`);
        contactForm.reset();
      });
    }

    // Modal form submit
    const modalForm = document.getElementById('modalQuoteForm');
    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('mPhone')?.value.trim();
        showToast(`Đã nhận yêu cầu báo giá sỉ! Đỗ Kiên 36 sẽ gửi bảng giá qua Zalo/SĐT ${phone} ngay ạ!`);
        window.closeQuoteModal();
        modalForm.reset();
      });
    }

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggleBtn');
    const navMenu = document.getElementById('mainNavMenu');
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }
  });
})();
