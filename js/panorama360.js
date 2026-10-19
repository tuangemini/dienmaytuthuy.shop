/**
 * INTERACTIVE 360° VIRTUAL TOUR VIEWER - ĐIỆN MÁY TÚ THỦY
 * Trình xem ảnh toàn cảnh 360 độ tương tác mượt mà, hỗ trợ cảm ứng điện thoại,
 * xoay tự động, phóng to/thu nhỏ, các điểm tương tác (Hotspots) và chuyển đổi góc nhìn.
 */

class Panorama360Viewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      initialImage: 'assets/img/storefront-main.jpg',
      autoRotate: true,
      autoRotateSpeed: 0.25,
      fov: 75,
      minFov: 40,
      maxFov: 100
    }, options);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'p360-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.isLoaded = false;
    this.lon = 0;
    this.lat = 0;
    this.targetLon = 0;
    this.targetLat = 0;
    this.fov = this.options.fov;
    this.targetFov = this.fov;

    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.autoRotate = this.options.autoRotate;

    // Hotspots data
    this.hotspots = [
      {
        id: 'tv_zone',
        title: 'Khu Vực Smart Tivi 4K/8K',
        desc: 'Samsung, Sony, LG, TCL từ 43 - 85 inch. Giảm giá đến 35% kèm quà tặng Clip TV Box.',
        lon: 340,
        lat: -5,
        icon: '📺',
        category: 'tivi'
      },
      {
        id: 'wm_zone',
        title: 'Khu Máy Giặt & Máy Sấy',
        desc: 'Electrolux, LG AI DD, Panasonic Inverter. Tặng gói bảo trì vệ sinh máy miễn phí.',
        lon: 45,
        lat: -8,
        icon: '🧺',
        category: 'maygiat'
      },
      {
        id: 'fridge_zone',
        title: 'Khu Tủ Lạnh Side-by-Side',
        desc: 'Hitachi, Samsung, Panasonic ngăn đông mềm Prime Fresh, làm đá tự động.',
        lon: 110,
        lat: -2,
        icon: '❄️',
        category: 'tulanh'
      },
      {
        id: 'ac_zone',
        title: 'Khu Điều Hòa Tiết Kiệm Điện',
        desc: 'Daikin, Casper, Panasonic Inverter. Miễn phí trọn gói công lắp đặt & ống đồng.',
        lon: 190,
        lat: 12,
        icon: '🍃',
        category: 'dieuhoa'
      },
      {
        id: 'installment_zone',
        title: 'Bàn Hỗ Trợ Trả Góp 0%',
        desc: 'Chỉ cần CCCD gắn chip, duyệt hồ sơ 5 phút, nhận máy ngay trong ngày.',
        lon: 260,
        lat: -10,
        icon: '💳',
        category: 'tragop'
      }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.bindEvents();
    this.loadImage(this.options.initialImage);
    this.createControls();
    this.renderHotspots();

    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 800;
    this.height = rect.height || 500;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  loadImage(src) {
    this.isLoaded = false;
    this.image = new Image();
    this.image.crossOrigin = 'anonymous';
    this.image.onload = () => {
      this.isLoaded = true;
      this.draw();
    };
    this.image.src = src;
  }

  bindEvents() {
    const startDrag = (x, y) => {
      this.isDragging = true;
      this.startX = x;
      this.startY = y;
      this.autoRotate = false;
    };

    const doDrag = (x, y) => {
      if (!this.isDragging) return;
      const dx = x - this.startX;
      const dy = y - this.startY;
      this.targetLon -= dx * 0.25;
      this.targetLat += dy * 0.2;
      this.targetLat = Math.max(-60, Math.min(60, this.targetLat));
      this.startX = x;
      this.startY = y;
    };

    const stopDrag = () => {
      this.isDragging = false;
    };

    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => doDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', stopDrag);

    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        doDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', stopDrag);

    // Wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.targetFov += e.deltaY * 0.05;
      this.targetFov = Math.max(this.options.minFov, Math.min(this.options.maxFov, this.targetFov));
    }, { passive: false });
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'p360-controls';
    controls.innerHTML = `
      <button class="p360-btn" id="p360RotateBtn" title="Bật/Tắt Tự Xoay">🔄</button>
      <button class="p360-btn" id="p360ZoomIn" title="Phóng To">+</button>
      <button class="p360-btn" id="p360ZoomOut" title="Thu Nhỏ">−</button>
      <button class="p360-btn" id="p360Fullscreen" title="Toàn Màn Hình">⛶</button>
      <span class="p360-hint">👉 Kéo chuột hoặc chạm vuốt để xoay 360°</span>
    `;
    this.container.appendChild(controls);

    const rotateBtn = controls.querySelector('#p360RotateBtn');
    rotateBtn.addEventListener('click', () => {
      this.autoRotate = !this.autoRotate;
      rotateBtn.classList.toggle('active', this.autoRotate);
    });

    controls.querySelector('#p360ZoomIn').addEventListener('click', () => {
      this.targetFov = Math.max(this.options.minFov, this.targetFov - 10);
    });

    controls.querySelector('#p360ZoomOut').addEventListener('click', () => {
      this.targetFov = Math.min(this.options.maxFov, this.targetFov + 10);
    });

    controls.querySelector('#p360Fullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.container.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
  }

  renderHotspots() {
    this.hotspotLayer = document.createElement('div');
    this.hotspotLayer.className = 'p360-hotspots-layer';
    this.container.appendChild(this.hotspotLayer);

    this.hotspots.forEach(h => {
      const el = document.createElement('div');
      el.className = 'p360-hotspot';
      el.dataset.id = h.id;
      el.innerHTML = `
        <div class="p360-hotspot-pin">
          <span class="p360-pin-pulse"></span>
          <span class="p360-pin-icon">${h.icon}</span>
        </div>
        <div class="p360-hotspot-card">
          <h4>${h.title}</h4>
          <p>${h.desc}</p>
          <button class="p360-hotspot-btn" onclick="window.filterCatalogByCategory('${h.category}')">Xem Sản Phẩm</button>
        </div>
      `;
      this.hotspotLayer.appendChild(el);
    });
  }

  updateHotspotsPosition() {
    if (!this.hotspotLayer) return;
    const elements = this.hotspotLayer.children;

    for (let i = 0; i < this.hotspots.length; i++) {
      const h = this.hotspots[i];
      const el = elements[i];
      if (!el) continue;

      let diffLon = (h.lon - this.lon) % 360;
      if (diffLon > 180) diffLon -= 360;
      if (diffLon < -180) diffLon += 360;

      // Visibility check
      if (Math.abs(diffLon) > this.fov * 0.75) {
        el.style.display = 'none';
        continue;
      }

      const x = (0.5 + (diffLon / this.fov)) * this.width;
      const diffLat = h.lat - this.lat;
      const y = (0.5 - (diffLat / (this.fov * 0.75))) * this.height;

      el.style.display = 'block';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }
  }

  draw() {
    if (!this.isLoaded || !this.image.width) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth panoramic perspective mapping
    const imgW = this.image.width;
    const imgH = this.image.height;

    const normalizedLon = ((this.lon % 360) + 360) % 360;
    const xRatio = normalizedLon / 360;
    const srcX = xRatio * imgW;
    const viewWidth = (this.fov / 360) * imgW;

    // Source coordinates with wrap-around
    const srcY = Math.max(0, Math.min(imgH * 0.4, (imgH * 0.2) - (this.lat / 90) * (imgH * 0.2)));
    const srcH = imgH * 0.65;

    // Left segment
    const chunk1W = Math.min(viewWidth, imgW - srcX);
    const dest1W = (chunk1W / viewWidth) * this.width;

    this.ctx.drawImage(
      this.image,
      srcX, srcY, chunk1W, srcH,
      0, 0, dest1W, this.height
    );

    // Wrap around right segment if needed
    if (chunk1W < viewWidth) {
      const chunk2W = viewWidth - chunk1W;
      const dest2W = (chunk2W / viewWidth) * this.width;
      this.ctx.drawImage(
        this.image,
        0, srcY, chunk2W, srcH,
        dest1W, 0, dest2W, this.height
      );
    }

    // Add subtle cinematic vignette
    const grad = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, this.height * 0.35,
      this.width / 2, this.height / 2, this.width * 0.75
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.4)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.autoRotate && !this.isDragging) {
      this.targetLon += this.options.autoRotateSpeed;
    }

    // Inertial lerp
    this.lon += (this.targetLon - this.lon) * 0.1;
    this.lat += (this.targetLat - this.lat) * 0.1;
    this.fov += (this.targetFov - this.fov) * 0.1;

    this.draw();
    this.updateHotspotsPosition();
  }
}

// Global hook for outside callers
window.Panorama360Viewer = Panorama360Viewer;
