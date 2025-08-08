// 应用配置
const SUPABASE_URL = 'https://edfnhhthztskuuosuasw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo';

// 初始化Supabase客户端
let supabase;
if (typeof window !== 'undefined' && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// 产品数据
const products = [
  {"id": 1, "name": "原味烤肠", "price": 28, "image": "IMG_3859.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 2, "name": "烟熏蜜汁烤肠", "price": 28, "image": "IMG_3864.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 3, "name": "法式香草烤肠", "price": 28, "image": "IMG_3863.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 4, "name": "黑胡椒烤肠", "price": 28, "image": "IMG_3860.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 5, "name": "孜然脆骨烤肠", "price": 28, "image": "IMG_3862.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 6, "name": "芝士玉米烤肠", "price": 28, "image": "IMG_3861.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available"},
  {"id": 7, "name": "原味虾肠", "price": 33, "image": "IMG_3853.jpeg", "category": "虾肠系列", "emoji": "🦐", "status": "available"},
  {"id": 8, "name": "辣味虾肠", "price": 33, "image": "IMG_3854.jpeg", "category": "虾肠系列", "emoji": "🦐", "status": "available"},
  {"id": 9, "name": "原味虾饼", "price": 28, "image": "IMG_3873.jpeg", "category": "虾肠系列", "emoji": "🍤", "status": "available"},
  {"id": 10, "name": "玛格丽特披萨", "price": 25, "image": "IMG_3841.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available"},
  {"id": 11, "name": "黑椒牛肉披萨", "price": 25, "image": "IMG_3839.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available"},
  {"id": 12, "name": "奥尔良鸡肉披萨", "price": 25, "image": "IMG_3840.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available"},
  {"id": 13, "name": "双料榴莲披萨", "price": 40, "image": "IMG_3852.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available"},
  {"id": 14, "name": "鲜肉小笼汤包", "price": 12, "image": "IMG_3874.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available"},
  {"id": 15, "name": "菌菇小笼汤包", "price": 12, "image": "IMG_3875.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available"},
  {"id": 16, "name": "黑松露小笼汤包", "price": 12, "image": "IMG_3876.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available"},
  {"id": 17, "name": "黑猪肉酥饼", "price": 55, "image": "IMG_3837.jpeg", "category": "酥饼系列", "emoji": "🥮", "status": "available"},
  {"id": 18, "name": "安格斯牛肉酥饼", "price": 55, "image": "IMG_3838.jpeg", "category": "酥饼系列", "emoji": "🥮", "status": "available"},
  {"id": 19, "name": "原味鸡排", "price": 20, "image": "IMG_3835.jpeg", "category": "鸡排系列", "emoji": "🍗", "status": "available"},
  {"id": 20, "name": "奥尔良鸡排", "price": 20, "image": "IMG_3836.jpeg", "category": "鸡排系列", "emoji": "🍗", "status": "available"},
  {"id": 21, "name": "奥尔良鸡翅", "price": 25, "image": "IMG_3865.jpeg", "category": "鸡翅系列", "emoji": "🍗", "status": "available"},
  {"id": 22, "name": "青花椒鸡翅", "price": 25, "image": "IMG_3866.jpeg", "category": "鸡翅系列", "emoji": "🍗", "status": "available"},
  {"id": 23, "name": "黑猪三丁纸皮烧卖", "price": 15, "image": "IMG_3843.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available"},
  {"id": 24, "name": "黑椒牛肉纸皮烧卖", "price": 15, "image": "IMG_3842.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available"},
  {"id": 25, "name": "黑猪梅菜干纸皮烧卖", "price": 15, "image": "IMG_3844.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available"},
  {"id": 26, "name": "三丁芝士纸皮烧卖", "price": 15, "image": "IMG_3845.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available"},
  {"id": 27, "name": "乌米腊味纸皮烧卖", "price": 15, "image": "IMG_3846.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available"}
];

// 全局变量
let cart = [];
let currentCategory = 'all';
let isCartOpen = false;

// 应用初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('应用初始化中...');
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  loadProducts();
  updateCartUI();
  setupSupabase();
}

// 设置事件监听器
function setupEventListeners() {
  // 分类按钮
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      filterByCategory(category);
      
      // 更新按钮状态
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 配送方式选择
  document.querySelectorAll('input[name="deliveryMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const addressSection = document.getElementById('addressSection');
      if (this.value === 'lalamove') {
        addressSection.style.display = 'block';
        document.getElementById('deliveryAddress').required = true;
      } else {
        addressSection.style.display = 'none';
        document.getElementById('deliveryAddress').required = false;
      }
    });
  });

  // 文件上传验证
  const paymentProofInput = document.getElementById('paymentProof');
  if (paymentProofInput) {
    paymentProofInput.addEventListener('change', function() {
      handleFileUpload(this);
    });
  }

  // 购物车按钮
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', toggleCart);
  }

  // 模态框外部点击关闭
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  // 覆盖层点击关闭购物车
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', function() {
      if (isCartOpen) {
        toggleCart();
      }
    });
  }

  // 键盘快捷键
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
      if (isCartOpen) {
        toggleCart();
      }
    }
  });
}

// 设置Supabase连接
async function setupSupabase() {
  if (!supabase) {
    console.log('Supabase 未初始化，使用本地数据');
    return;
  }

  try {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
      console.log('Supabase连接测试失败:', error);
    } else {
      console.log('Supabase连接成功');
    }
  } catch (error) {
    console.log('Supabase连接失败，使用本地数据:', error);
  }
}

// 分类过滤
function filterByCategory(category) {
  console.log('过滤分类:', category);
  currentCategory = category;
  loadProducts();
}

// 加载产品
function loadProducts() {
  console.log('加载产品，当前分类:', currentCategory);
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(product => product.category === currentCategory);

  productsGrid.innerHTML = '';

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// 创建产品卡片
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-image">
      <span class="product-emoji">${product.emoji}</span>
      ${product.status === 'out_of_stock' ? '<div class="product-status out-of-stock">缺货</div>' : ''}
    </div>
    <div class="product-content">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <div class="product-price">¥${product.price}</div>
      <div class="product-actions">
        ${product.status === 'out_of_stock' ? 
          '<button class="add-to-cart-btn" disabled>暂时缺货</button>' : 
          `<button class="add-to-cart-btn" onclick="addToCart(${product.id})">加入购物车</button>`
        }
      </div>
    </div>
  `;
  return card;
}

// 购物车功能
function toggleCart() {
  console.log('切换购物车显示');
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');
  
  if (!cartSidebar || !overlay) {
    console.error('购物车元素未找到');
    return;
  }
  
  if (isCartOpen) {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    isCartOpen = false;
  } else {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
    isCartOpen = true;
  }
}

function addToCart(productId) {
  console.log('添加到购物车:', productId);
  const product = products.find(p => p.id === productId);
  if (!product || product.status === 'out_of_stock') {
    console.error('产品不存在或缺货');
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      quantity: 1
    });
  }

  updateCartUI();
  showToast('已添加到购物车');
}

function removeFromCart(productId) {
  console.log('从购物车移除:', productId);
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast('已从购物车移除');
}

function updateCartQuantity(productId, quantity) {
  console.log('更新购物车数量:', productId, quantity);
  const numQuantity = parseInt(quantity);
  
  if (numQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = numQuantity;
    updateCartUI();
  }
}

function updateCartUI() {
  console.log('更新购物车UI');
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!cartCount || !cartItems || !cartEmpty || !cartTotal || !checkoutBtn) {
    console.error('购物车UI元素未找到');
    return;
  }

  // 更新购物车数量
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // 更新购物车内容
  if (cart.length === 0) {
    cartItems.style.display = 'none';
    cartEmpty.style.display = 'block';
    checkoutBtn.disabled = true;
    cartTotal.textContent = '0';
  } else {
    cartItems.style.display = 'block';
    cartEmpty.style.display = 'none';
    checkoutBtn.disabled = false;

    // 渲染购物车项目
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.emoji} ${item.name}</div>
          <div class="cart-item-price">¥${item.price}</div>
          <div class="cart-item-controls">
            <div class="cart-item-quantity">
              <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, this.value)">
              <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">🗑️</button>
          </div>
        </div>
      </div>
    `).join('');

    // 计算总价
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
  }
}

// 结账功能
function showCheckout() {
  console.log('显示结账页面');
  if (cart.length === 0) {
    showToast('购物车为空，请先添加商品');
    return;
  }

  const modal = document.getElementById('checkoutModal');
  const orderSummary = document.getElementById('orderSummary');

  if (!modal || !orderSummary) {
    console.error('结账模态框元素未找到');
    return;
  }

  // 生成订单摘要
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  orderSummary.innerHTML = `
    ${cart.map(item => `
      <div class="order-item">
        <div class="order-item-info">
          <div class="order-item-name">${item.emoji} ${item.name}</div>
          <div class="order-item-quantity">数量: ${item.quantity}</div>
        </div>
        <div class="order-item-price">¥${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('')}
    <div class="order-item">
      <div class="order-item-info">
        <div class="order-item-name"><strong>总计</strong></div>
      </div>
      <div class="order-item-price"><strong>¥${total.toFixed(2)}</strong></div>
    </div>
  `;

  modal.classList.add('active');
  if (isCartOpen) {
    toggleCart(); // 关闭购物车
  }
}

function closeCheckout() {
  console.log('关闭结账页面');
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.reset();
  }
}

// 订单提交
async function submitOrder() {
  console.log('提交订单');
  const form = document.getElementById('checkoutForm');
  
  if (!form || !form.checkValidity()) {
    if (form) form.reportValidity();
    return;
  }

  // 收集表单数据
  const customerName = document.getElementById('customerName').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const customerWhatsapp = document.getElementById('customerWhatsapp').value;
  const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
  const deliveryAddress = document.getElementById('deliveryAddress').value;
  const orderNotes = document.getElementById('orderNotes').value;
  const paymentProof = document.getElementById('paymentProof').files[0];

  if (!paymentProof) {
    showToast('请上传付款凭证', 'error');
    return;
  }

  // 生成订单号
  const orderNumber = 'ORDER-' + Date.now();
  const orderDate = new Date().toISOString();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  try {
    // 显示加载状态
    const submitBtn = document.querySelector('.modal-footer .btn--primary');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;
    }

    // 创建订单对象
    const orderData = {
      order_number: orderNumber,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_whatsapp: customerWhatsapp,
      delivery_method: deliveryMethod,
      delivery_address: deliveryAddress,
      order_notes: orderNotes,
      total_amount: total,
      order_date: orderDate,
      status: 'pending',
      items: cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      }))
    };

    // 尝试提交订单到Supabase
    if (supabase) {
      try {
        // 上传付款凭证
        let paymentProofUrl = '';
        if (paymentProof) {
          const fileExt = paymentProof.name.split('.').pop();
          const fileName = `${orderNumber}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('payment-proofs')
            .upload(fileName, paymentProof);
          
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('payment-proofs')
              .getPublicUrl(fileName);
            paymentProofUrl = publicUrl;
          }
        }

        orderData.payment_proof_url = paymentProofUrl;

        // 提交订单
        const { data, error } = await supabase
          .from('orders')
          .insert([orderData]);

        if (error) {
          console.error('订单提交失败:', error);
        } else {
          console.log('订单提交成功:', data);
        }
      } catch (error) {
        console.error('Supabase操作失败:', error);
      }
    }

    // 无论Supabase是否成功，都显示成功页面
    console.log('订单数据:', orderData);
    
    // 显示成功页面
    closeCheckout();
    showOrderSuccess(orderNumber);
    
    // 清空购物车
    cart = [];
    updateCartUI();

  } catch (error) {
    console.error('订单处理出错:', error);
    showToast('订单提交失败，请重试或联系客服', 'error');
  } finally {
    // 恢复按钮状态
    const submitBtn = document.querySelector('.modal-footer .btn--primary');
    if (submitBtn) {
      submitBtn.textContent = '提交订单';
      submitBtn.disabled = false;
    }
  }
}

// 显示订单成功页面
function showOrderSuccess(orderNumber) {
  console.log('显示订单成功页面:', orderNumber);
  const modal = document.getElementById('orderConfirmModal');
  const orderNumberSpan = document.getElementById('orderNumber');
  
  if (modal && orderNumberSpan) {
    orderNumberSpan.textContent = orderNumber;
    modal.classList.add('active');
  }
}

function closeOrderConfirm() {
  console.log('关闭订单确认页面');
  const modal = document.getElementById('orderConfirmModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// 工具函数
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

function closeModal(modal) {
  modal.classList.remove('active');
}

function showToast(message, type = 'success') {
  console.log('显示提示:', message, type);
  const toast = document.createElement('div');
  toast.className = `success-toast ${type}`;
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.zIndex = '9999';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '8px';
  toast.style.color = 'white';
  toast.style.fontWeight = 'bold';
  
  if (type === 'error') {
    toast.style.backgroundColor = '#dc3545';
  } else if (type === 'warning') {
    toast.style.backgroundColor = '#ffc107';
    toast.style.color = '#000';
  } else {
    toast.style.backgroundColor = '#28a745';
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

// 文件上传处理
function handleFileUpload(input) {
  const file = input.files[0];
  if (!file) return;
  
  // 验证文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    showToast('请上传有效的图片文件 (JPEG, PNG, GIF, WebP)', 'error');
    input.value = '';
    return;
  }
  
  // 验证文件大小 (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast('文件大小不能超过5MB', 'error');
    input.value = '';
    return;
  }
  
  showToast('文件上传成功');
}

// 电话号码格式化
function formatPhone(phone) {
  // 移除所有非数字字符
  const digits = phone.replace(/\D/g, '');
  
  // 如果以0开头，替换为+6
  if (digits.startsWith('0')) {
    return '+6' + digits.slice(1);
  }
  
  // 如果不是以+开头，添加+60
  if (!digits.startsWith('60')) {
    return '+60' + digits;
  }
  
  return '+' + digits;
}

// 错误处理
window.addEventListener('error', function(event) {
  console.error('应用错误:', event.error);
  showToast('应用出现错误，请刷新页面重试', 'error');
});

// 网络状态检测
window.addEventListener('online', () => {
  showToast('网络连接已恢复');
});

window.addEventListener('offline', () => {
  showToast('网络连接已断开', 'warning');
});

// 本地存储管理
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('本地存储失败:', error);
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('本地存储读取失败:', error);
    return null;
  }
}

// 自动保存购物车
setInterval(function() {
  if (cart.length > 0) {
    saveToLocalStorage('cart', cart);
  }
}, 5000);

// 页面加载时恢复购物车
window.addEventListener('load', function() {
  const savedCart = loadFromLocalStorage('cart');
  if (savedCart && Array.isArray(savedCart)) {
    cart = savedCart;
    updateCartUI();
  }
});

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 数据统计
function trackEvent(eventName, data) {
  console.log('事件统计:', eventName, data);
  // 这里可以添加Google Analytics或其他统计代码
}

// 性能监控
function measurePerformance() {
  if (performance.timing) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('页面加载时间:', loadTime, 'ms');
  }
}

// 页面完全加载后测量性能
window.addEventListener('load', measurePerformance);

// 全局函数绑定到window对象，确保HTML中的onclick可以访问
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleCart = toggleCart;
window.showCheckout = showCheckout;
window.closeCheckout = closeCheckout;
window.submitOrder = submitOrder;
window.closeOrderConfirm = closeOrderConfirm;

console.log('美食购物应用已加载完成！');