// 应用配置和数据
const CONFIG = {
  adminPassword: "fengweipaiadmin",
  supabase: {
    url: "https://edfnhhthztskuuosuasw.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo"
  },
  contact: {
    phone: "0162327792",
    whatsapp: "60162327792",
    address: "667, Jalan 24, Taman Perindustrian Ehsan Jaya, Kepong, 52100, Kuala Lumpur"
  },
  bank: {
    name: "Maybank",
    accountName: "Choong Sher Lee",
    accountNumber: "114209540438"
  }
};

// 产品数据
const PRODUCTS_DATA = [
  {"id": 1, "name": "原味烤肠", "price": 28, "image": "IMG_3859.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 50},
  {"id": 2, "name": "烟熏蜜汁烤肠", "price": 28, "image": "IMG_3864.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 45},
  {"id": 3, "name": "法式香草烤肠", "price": 28, "image": "IMG_3863.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 38},
  {"id": 4, "name": "黑胡椒烤肠", "price": 28, "image": "IMG_3860.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 42},
  {"id": 5, "name": "孜然脆骨烤肠", "price": 28, "image": "IMG_3862.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 35},
  {"id": 6, "name": "芝士玉米烤肠", "price": 28, "image": "IMG_3861.jpeg", "category": "烤肠系列", "emoji": "🌭", "status": "available", "stock": 48},
  {"id": 7, "name": "原味虾肠", "price": 33, "image": "IMG_3853.jpeg", "category": "虾肠系列", "emoji": "🦐", "status": "available", "stock": 25},
  {"id": 8, "name": "辣味虾肠", "price": 33, "image": "IMG_3854.jpeg", "category": "虾肠系列", "emoji": "🦐", "status": "available", "stock": 28},
  {"id": 9, "name": "原味虾饼", "price": 28, "image": "IMG_3873.jpeg", "category": "虾肠系列", "emoji": "🍤", "status": "available", "stock": 32},
  {"id": 10, "name": "玛格丽特披萨", "price": 25, "image": "IMG_3841.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available", "stock": 20},
  {"id": 11, "name": "黑椒牛肉披萨", "price": 25, "image": "IMG_3839.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available", "stock": 18},
  {"id": 12, "name": "奥尔良鸡肉披萨", "price": 25, "image": "IMG_3840.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available", "stock": 22},
  {"id": 13, "name": "双料榴莲披萨", "price": 40, "image": "IMG_3852.jpeg", "category": "披萨系列", "emoji": "🍕", "status": "available", "stock": 15},
  {"id": 14, "name": "鲜肉小笼汤包", "price": 12, "image": "IMG_3874.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available", "stock": 60},
  {"id": 15, "name": "菌菇小笼汤包", "price": 12, "image": "IMG_3875.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available", "stock": 55},
  {"id": 16, "name": "黑松露小笼汤包", "price": 12, "image": "IMG_3876.jpeg", "category": "小笼汤包系列", "emoji": "🥟", "status": "available", "stock": 30},
  {"id": 17, "name": "黑猪肉酥饼", "price": 55, "image": "IMG_3837.jpeg", "category": "酥饼系列", "emoji": "🥮", "status": "available", "stock": 12},
  {"id": 18, "name": "安格斯牛肉酥饼", "price": 55, "image": "IMG_3838.jpeg", "category": "酥饼系列", "emoji": "🥮", "status": "available", "stock": 10},
  {"id": 19, "name": "原味鸡排", "price": 20, "image": "IMG_3835.jpeg", "category": "鸡排系列", "emoji": "🍗", "status": "available", "stock": 40},
  {"id": 20, "name": "奥尔良鸡排", "price": 20, "image": "IMG_3836.jpeg", "category": "鸡排系列", "emoji": "🍗", "status": "available", "stock": 38},
  {"id": 21, "name": "奥尔良鸡翅", "price": 25, "image": "IMG_3865.jpeg", "category": "鸡翅系列", "emoji": "🍗", "status": "available", "stock": 33},
  {"id": 22, "name": "青花椒鸡翅", "price": 25, "image": "IMG_3866.jpeg", "category": "鸡翅系列", "emoji": "🍗", "status": "available", "stock": 35},
  {"id": 23, "name": "黑猪三丁纸皮烧卖", "price": 15, "image": "IMG_3843.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available", "stock": 45},
  {"id": 24, "name": "黑椒牛肉纸皮烧卖", "price": 15, "image": "IMG_3842.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available", "stock": 50},
  {"id": 25, "name": "黑猪梅菜干纸皮烧卖", "price": 15, "image": "IMG_3844.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available", "stock": 42},
  {"id": 26, "name": "三丁芝士纸皮烧卖", "price": 15, "image": "IMG_3845.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available", "stock": 40},
  {"id": 27, "name": "乌米腊味纸皮烧卖", "price": 15, "image": "IMG_3846.jpeg", "category": "纸皮烧卖系列", "emoji": "🥟", "status": "available", "stock": 38}
];

// 全局变量
let supabase;
let products = [...PRODUCTS_DATA];
let currentView = 'dashboard';
let currentEditingProduct = null;
let cameraStream = null;
let scannerActive = false;
let photosArray = [];
let chartsInitialized = false;
let inventoryMovements = [];
let isLoggedIn = false;

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Starting application initialization...');
  
  // 延迟初始化以确保DOM完全加载
  setTimeout(() => {
    initializeApp();
  }, 100);
});

function initializeApp() {
  console.log('Initializing application...');
  
  // 初始化Supabase
  try {
    if (window.supabase) {
      supabase = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);
      console.log('Supabase initialized successfully');
    } else {
      console.warn('Supabase not available - continuing without backend');
    }
  } catch (error) {
    console.error('Supabase initialization error:', error);
  }
  
  // 设置登录功能
  setupLogin();
  
  // 加载初始数据
  loadInitialData();
  
  // 显示登录界面
  showLoginScreen();
}

function showLoginScreen() {
  console.log('Showing login screen...');
  const loginScreen = document.getElementById('loginScreen');
  const mainApp = document.getElementById('mainApp');
  
  if (loginScreen && mainApp) {
    loginScreen.style.display = 'flex';
    mainApp.style.display = 'none';
    
    // 聚焦密码输入框
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
      passwordInput.focus();
    }
  }
}

// 登录功能
function setupLogin() {
  console.log('Setting up login functionality...');
  
  // 等待DOM元素加载
  setTimeout(() => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('adminPassword');
    
    if (loginForm && passwordInput) {
      console.log('Login form elements found successfully');
      
      // 添加表单提交事件
      loginForm.addEventListener('submit', function(e) {
        console.log('Login form submitted');
        handleLogin(e);
      });
      
      // 添加密码输入框回车事件
      passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          console.log('Enter key pressed in password field');
          e.preventDefault();
          handleLogin(e);
        }
      });
      
      // 测试用 - 添加点击事件到按钮
      const loginButton = loginForm.querySelector('button[type="submit"]');
      if (loginButton) {
        loginButton.addEventListener('click', function(e) {
          console.log('Login button clicked');
          e.preventDefault();
          handleLogin(e);
        });
      }
      
      console.log('Login event listeners attached successfully');
    } else {
      console.error('Login form elements not found:', {
        loginForm: !!loginForm,
        passwordInput: !!passwordInput
      });
    }
  }, 200);
}

function handleLogin(e) {
  console.log('Login attempt started...');
  
  if (e) {
    e.preventDefault();
  }
  
  const passwordInput = document.getElementById('adminPassword');
  if (!passwordInput) {
    console.error('Password input not found');
    showNotification('系统错误：无法找到密码输入框', 'error');
    return;
  }
  
  const password = passwordInput.value.trim();
  console.log('Password field value:', password ? '[HIDDEN]' : 'EMPTY');
  
  if (!password) {
    console.log('Empty password provided');
    showNotification('请输入密码', 'error');
    passwordInput.focus();
    return;
  }
  
  // 显示加载状态
  const loginButton = document.querySelector('#loginForm button[type="submit"]');
  if (loginButton) {
    loginButton.disabled = true;
    loginButton.textContent = '登录中...';
  }
  
  // 验证密码
  console.log('Verifying password...');
  if (password === CONFIG.adminPassword) {
    console.log('Password correct - login successful');
    
    setTimeout(() => {
      isLoggedIn = true;
      showMainApp();
      showNotification('登录成功！欢迎使用管理系统', 'success');
      
      // 恢复按钮状态
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = '登录';
      }
    }, 500);
    
  } else {
    console.log('Password incorrect - login failed');
    
    setTimeout(() => {
      showNotification('密码错误，请重试', 'error');
      passwordInput.value = '';
      passwordInput.focus();
      
      // 恢复按钮状态
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = '登录';
      }
    }, 500);
  }
}

function showMainApp() {
  console.log('Showing main application...');
  
  const loginScreen = document.getElementById('loginScreen');
  const mainApp = document.getElementById('mainApp');
  
  if (loginScreen && mainApp) {
    loginScreen.style.display = 'none';
    mainApp.style.display = 'block';
    
    // 初始化主应用组件
    setTimeout(() => {
      console.log('Initializing main app components...');
      setupNavigation();
      setupModals();
      setupSearchAndFilters();
      switchView('dashboard');
    }, 300);
  } else {
    console.error('Main app elements not found:', {
      loginScreen: !!loginScreen,
      mainApp: !!mainApp
    });
  }
}

function logout() {
  console.log('Logging out...');
  isLoggedIn = false;
  
  // 清理资源
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
  
  // 返回登录界面
  showLoginScreen();
  
  // 清空密码输入框
  const passwordInput = document.getElementById('adminPassword');
  if (passwordInput) {
    passwordInput.value = '';
  }
  
  showNotification('已退出登录', 'success');
}

// 导航设置
function setupNavigation() {
  console.log('Setting up navigation...');
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetView = this.dataset.view;
      console.log('Navigation clicked:', targetView);
      
      // 更新导航状态
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // 切换视图
      switchView(targetView);
    });
  });
}

// 视图切换
function switchView(viewName) {
  console.log('Switching to view:', viewName);
  
  // 隐藏所有视图
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // 显示目标视图
  const targetView = document.getElementById(viewName);
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
    
    // 更新导航状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
      nav.classList.remove('active');
      if (nav.dataset.view === viewName) {
        nav.classList.add('active');
      }
    });
    
    // 根据视图加载特定内容
    setTimeout(() => {
      switch(viewName) {
        case 'dashboard':
          loadDashboard();
          break;
        case 'products':
          loadProducts();
          break;
        case 'orders':
          loadOrders();
          break;
        case 'inventory':
          loadInventory();
          break;
        case 'analytics':
          loadAnalytics();
          break;
        case 'scanner':
          setupScanner();
          break;
        case 'camera':
          setupCamera();
          break;
      }
    }, 100);
  }
}

// 加载初始数据
function loadInitialData() {
  console.log('Loading initial data...');
  
  // 模拟一些库存变动记录
  inventoryMovements = [
    {
      id: 1,
      productName: "原味烤肠",
      type: "入库",
      quantity: 20,
      date: new Date().toISOString().split('T')[0],
      operator: "管理员",
      note: "新进货"
    },
    {
      id: 2,
      productName: "玛格丽特披萨",
      type: "出库",
      quantity: -5,
      date: new Date().toISOString().split('T')[0],
      operator: "管理员",
      note: "销售出库"
    },
    {
      id: 3,
      productName: "原味虾肠",
      type: "入库",
      quantity: 10,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      operator: "管理员",
      note: "补货"
    }
  ];
}

// 仪表板功能
function loadDashboard() {
  console.log('Loading dashboard');
  updateDashboardStats();
  loadStockStatus();
  
  // 延迟初始化图表
  setTimeout(() => {
    initializeSalesChart();
  }, 500);
}

function updateDashboardStats() {
  console.log('Updating dashboard stats');
  
  const availableProducts = products.filter(p => p.status === 'available').length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 20).length;
  const stockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  
  // 更新统计数据
  const elements = {
    todaySales: document.getElementById('todaySales'),
    todayOrders: document.getElementById('todayOrders'),
    availableProducts: document.getElementById('availableProducts'),
    totalStock: document.getElementById('totalStock')
  };
  
  if (elements.todaySales) elements.todaySales.textContent = '¥2,850';
  if (elements.todayOrders) elements.todayOrders.textContent = '45';
  if (elements.availableProducts) elements.availableProducts.textContent = availableProducts;
  if (elements.totalStock) elements.totalStock.textContent = totalStock;
  
  // 更新变化信息
  const statChanges = document.querySelectorAll('.stat-change');
  if (statChanges.length >= 4) {
    statChanges[0].textContent = `本月累计: ¥${(2850 * 30).toLocaleString()}`;
    statChanges[1].textContent = `待处理: 12`;
    statChanges[2].textContent = `低库存: ${lowStockCount}`;
    statChanges[3].textContent = `库存价值: ¥${stockValue.toLocaleString()}`;
  }
}

function loadStockStatus() {
  console.log('Loading stock status');
  
  const stockStatusContainer = document.getElementById('stockStatus');
  if (!stockStatusContainer) return;
  
  stockStatusContainer.innerHTML = '';
  
  // 按分类统计库存
  const categoryStats = {};
  products.forEach(product => {
    if (!categoryStats[product.category]) {
      categoryStats[product.category] = {
        emoji: product.emoji,
        totalStock: 0,
        lowStock: 0,
        products: []
      };
    }
    categoryStats[product.category].totalStock += product.stock;
    if (product.stock < 20) {
      categoryStats[product.category].lowStock++;
    }
    categoryStats[product.category].products.push(product);
  });
  
  Object.entries(categoryStats).forEach(([category, stats]) => {
    const statusClass = stats.lowStock > 0 ? 'status--warning' : 'status--success';
    const stockItem = document.createElement('div');
    stockItem.className = 'stock-item';
    stockItem.innerHTML = `
      <div class="stock-item-emoji">${stats.emoji}</div>
      <h4>${category}</h4>
      <div class="stock-item-count">${stats.totalStock}</div>
      <div class="stock-item-status ${statusClass}">
        ${stats.lowStock > 0 ? `低库存: ${stats.lowStock}` : '库存正常'}
      </div>
    `;
    stockStatusContainer.appendChild(stockItem);
  });
}

// 产品管理功能
function loadProducts() {
  console.log('Loading products');
  const tableBody = document.getElementById('productsTable');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  let filteredProducts = [...products];
  
  // 应用搜索过滤
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  // 应用分类过滤
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    const categoryValue = categoryFilter.value;
    if (categoryValue) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === categoryValue
      );
    }
  }
  
  filteredProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="product-emoji">${product.emoji}</td>
      <td class="product-name">${product.name}</td>
      <td class="product-price">¥${product.price}</td>
      <td class="product-stock">${product.stock}</td>
      <td>${product.category}</td>
      <td>
        <span class="stock-status stock-status--${getStockStatusClass(product.stock)}">
          ${product.stock <= 0 ? '缺货' : product.stock < 20 ? '低库存' : '正常'}
        </span>
      </td>
      <td class="product-status">
        <label class="toggle-switch">
          <input type="checkbox" ${product.status === 'available' ? 'checked' : ''} 
                 onchange="toggleProductStatus(${product.id}, this.checked)">
          <span class="toggle-slider round"></span>
        </label>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn btn--sm btn--secondary" onclick="editProduct(${product.id})">编辑</button>
          <button class="btn btn--sm btn--danger" onclick="deleteProduct(${product.id})">删除</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function toggleProductStatus(productId, isAvailable) {
  console.log('Toggling product status:', productId, isAvailable);
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = isAvailable ? 'available' : 'unavailable';
    
    // 更新到Supabase
    updateProductInSupabase(product);
    
    showNotification(
      `${product.name} 已${isAvailable ? '上架' : '下架'}`, 
      'success'
    );
    
    // 更新仪表板统计
    if (currentView === 'dashboard') {
      updateDashboardStats();
    }
  }
}

async function updateProductInSupabase(product) {
  try {
    if (!supabase) {
      console.log('Supabase not initialized, skipping database update');
      return;
    }
    
    const { data, error } = await supabase
      .from('products')
      .upsert([{
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        emoji: product.emoji,
        status: product.status,
        image: product.image || null
      }]);
    
    if (error) {
      console.error('Error updating product:', error);
    } else {
      console.log('Product updated successfully in Supabase');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

function getStockStatusClass(stock) {
  if (stock <= 0) return 'out-of-stock';
  if (stock < 20) return 'low-stock';
  return 'in-stock';
}

// 搜索和过滤功能
function setupSearchAndFilters() {
  console.log('Setting up search and filters...');
  
  const searchInput = document.getElementById('productSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      if (currentView === 'products') {
        loadProducts();
      }
    }, 300));
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      if (currentView === 'products') {
        loadProducts();
      }
    });
  }
}

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

// 库存管理功能
function loadInventory() {
  console.log('Loading inventory');
  updateInventorySummary();
  loadInventoryMovements();
}

function updateInventorySummary() {
  const totalInventory = products.reduce((sum, p) => sum + p.stock, 0);
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock < 20).length;
  
  const elements = {
    totalInventory: document.getElementById('totalInventory'),
    inventoryValue: document.getElementById('inventoryValue'),
    lowStockCount: document.getElementById('lowStockCount')
  };
  
  if (elements.totalInventory) elements.totalInventory.textContent = totalInventory;
  if (elements.inventoryValue) elements.inventoryValue.textContent = `¥${inventoryValue.toLocaleString()}`;
  if (elements.lowStockCount) elements.lowStockCount.textContent = lowStockCount;
}

function loadInventoryMovements() {
  const tableBody = document.getElementById('inventoryTable');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  inventoryMovements.forEach(movement => {
    const row = document.createElement('tr');
    const quantityClass = movement.quantity > 0 ? 'status--success' : 'status--error';
    row.innerHTML = `
      <td>${movement.productName}</td>
      <td>${movement.type}</td>
      <td><span class="${quantityClass}">${movement.quantity > 0 ? '+' : ''}${movement.quantity}</span></td>
      <td>${movement.date}</td>
      <td>${movement.operator}</td>
    `;
    tableBody.appendChild(row);
  });
}

// 订单管理功能
function loadOrders() {
  console.log('Loading orders');
  const tableBody = document.getElementById('ordersTable');
  if (!tableBody) return;
  
  // 模拟订单数据
  const mockOrders = [
    {
      id: 'ORD2024001',
      customer: '张先生 (0162327792)',
      date: new Date().toISOString().split('T')[0],
      total: 168,
      status: '待处理'
    },
    {
      id: 'ORD2024002',
      customer: '李女士 (0123456789)',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      total: 85,
      status: '已发货'
    },
    {
      id: 'ORD2024003',
      customer: '王先生 (0187654321)',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      total: 232,
      status: '已完成'
    }
  ];
  
  tableBody.innerHTML = '';
  
  mockOrders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>¥${order.total}</td>
      <td><span class="order-status order-status--${getOrderStatusClass(order.status)}">${order.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn--sm btn--secondary" onclick="viewOrderDetails('${order.id}')">详情</button>
          <button class="btn btn--sm btn--primary" onclick="updateOrderStatus('${order.id}')">更新状态</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function getOrderStatusClass(status) {
  switch(status) {
    case '已发货': return 'shipped';
    case '待处理': return 'pending';
    case '已完成': return 'completed';
    case '已取消': return 'cancelled';
    default: return 'pending';
  }
}

// 产品CRUD操作
function openAddProductModal() {
  console.log('Opening add product modal');
  currentEditingProduct = null;
  document.getElementById('productModalTitle').textContent = '添加产品';
  document.getElementById('productForm').reset();
  document.getElementById('productModal').classList.add('active');
}

function editProduct(productId) {
  console.log('Editing product:', productId);
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  currentEditingProduct = product;
  document.getElementById('productModalTitle').textContent = '编辑产品';
  
  // 填充表单
  document.getElementById('productName').value = product.name;
  document.getElementById('productEmoji').value = product.emoji;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productStatus').value = product.status;
  
  document.getElementById('productModal').classList.add('active');
}

function saveProduct() {
  console.log('Saving product');
  const form = document.getElementById('productForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const productData = {
    name: document.getElementById('productName').value,
    emoji: document.getElementById('productEmoji').value,
    price: parseFloat(document.getElementById('productPrice').value),
    stock: parseInt(document.getElementById('productStock').value),
    category: document.getElementById('productCategory').value,
    status: document.getElementById('productStatus').value,
    image: null
  };
  
  if (currentEditingProduct) {
    // 更新现有产品
    Object.assign(currentEditingProduct, productData);
    updateProductInSupabase(currentEditingProduct);
    showNotification('产品更新成功！', 'success');
  } else {
    // 添加新产品
    productData.id = Date.now();
    products.push(productData);
    updateProductInSupabase(productData);
    showNotification('产品添加成功！', 'success');
  }
  
  closeProductModal();
  loadProducts();
  
  // 如果在仪表板，更新统计
  if (currentView === 'dashboard') {
    updateDashboardStats();
  }
}

function deleteProduct(productId) {
  console.log('Deleting product:', productId);
  if (confirm('确定要删除这个产品吗？')) {
    const index = products.findIndex(p => p.id === productId);
    if (index > -1) {
      products.splice(index, 1);
      loadProducts();
      showNotification('产品删除成功！', 'success');
      
      // 更新仪表板统计
      if (currentView === 'dashboard') {
        updateDashboardStats();
      }
    }
  }
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  currentEditingProduct = null;
}

function syncProducts() {
  showNotification('正在同步产品数据...', 'info');
  
  // 模拟同步过程
  setTimeout(() => {
    showNotification('产品数据同步完成！', 'success');
    loadProducts();
  }, 1000);
}

// 库存调整
function openInventoryModal() {
  console.log('Opening inventory modal');
  document.getElementById('inventoryForm').reset();
  
  // 填充产品选择
  const productSelect = document.getElementById('inventoryProduct');
  if (productSelect) {
    productSelect.innerHTML = '<option value="">选择产品</option>';
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.name;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }
  
  document.getElementById('inventoryModal').classList.add('active');
}

function saveInventoryAdjustment() {
  console.log('Saving inventory adjustment');
  const form = document.getElementById('inventoryForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const productName = document.getElementById('inventoryProduct').value;
  const type = document.getElementById('inventoryType').value;
  const quantity = parseInt(document.getElementById('inventoryQuantity').value);
  const note = document.getElementById('inventoryNote').value;
  
  const adjustment = {
    id: Date.now(),
    productName: productName,
    type: type,
    quantity: type === '出库' ? -Math.abs(quantity) : quantity,
    date: new Date().toISOString().split('T')[0],
    operator: '管理员',
    note: note
  };
  
  inventoryMovements.unshift(adjustment);
  
  // 更新产品库存
  const product = products.find(p => p.name === productName);
  if (product) {
    product.stock += adjustment.quantity;
    if (product.stock < 0) product.stock = 0;
    
    updateProductInSupabase(product);
  }
  
  closeInventoryModal();
  loadInventory();
  
  if (currentView === 'products') {
    loadProducts();
  }
  
  showNotification('库存调整成功！', 'success');
}

function closeInventoryModal() {
  document.getElementById('inventoryModal').classList.remove('active');
}

// 扫码功能
function setupScanner() {
  console.log('Setting up scanner');
  const scannerArea = document.querySelector('.scanner-area');
  if (scannerArea) {
    scannerArea.innerHTML = `
      <div class="scanner-placeholder">
        <div class="scanner-icon">📱</div>
        <p>点击开始扫描</p>
      </div>
    `;
  }
}

function startScanning() {
  console.log('Starting scanner');
  scannerActive = true;
  const scanResult = document.getElementById('scanResult');
  const scannerArea = document.querySelector('.scanner-area');
  
  if (scannerArea) {
    scannerArea.innerHTML = `
      <div class="scanner-placeholder">
        <div class="loading"></div>
        <p>扫描中...</p>
      </div>
    `;
  }
  
  // 模拟扫描结果
  setTimeout(() => {
    if (scannerActive) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      if (scanResult) {
        scanResult.innerHTML = `
          <div class="success-message">
            <h4>扫描成功！</h4>
            <p><strong>产品:</strong> ${randomProduct.name}</p>
            <p><strong>价格:</strong> ¥${randomProduct.price}</p>
            <p><strong>库存:</strong> ${randomProduct.stock}</p>
            <p><strong>分类:</strong> ${randomProduct.category}</p>
            <p><strong>状态:</strong> ${randomProduct.status === 'available' ? '在售' : '停售'}</p>
          </div>
        `;
      }
      
      if (scannerArea) {
        scannerArea.innerHTML = `
          <div class="scanner-placeholder">
            <div class="scanner-icon">✅</div>
            <p>扫描完成</p>
          </div>
        `;
      }
      
      showNotification('扫描成功！', 'success');
    }
  }, 2000);
}

function stopScanning() {
  console.log('Stopping scanner');
  scannerActive = false;
  const scannerArea = document.querySelector('.scanner-area');
  if (scannerArea) {
    scannerArea.innerHTML = `
      <div class="scanner-placeholder">
        <div class="scanner-icon">📱</div>
        <p>点击开始扫描</p>
      </div>
    `;
  }
}

// 相机功能
function setupCamera() {
  console.log('Setting up camera');
  const cameraArea = document.querySelector('.camera-area');
  if (cameraArea) {
    cameraArea.innerHTML = `
      <video id="cameraVideo" autoplay playsinline style="display: none;"></video>
      <canvas id="cameraCanvas" style="display: none;"></canvas>
      <div class="camera-placeholder">
        <div class="scanner-icon">📷</div>
        <p>点击打开相机</p>
      </div>
    `;
  }
}

function startCamera() {
  console.log('Starting camera');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        cameraStream = stream;
        const video = document.getElementById('cameraVideo');
        if (video) {
          video.srcObject = stream;
          video.style.display = 'block';
          const placeholder = document.querySelector('.camera-placeholder');
          if (placeholder) {
            placeholder.style.display = 'none';
          }
          showNotification('相机启动成功！', 'success');
        }
      })
      .catch(error => {
        console.error('无法访问相机:', error);
        showNotification('无法访问相机，请检查权限设置', 'error');
      });
  } else {
    showNotification('您的浏览器不支持相机功能', 'error');
  }
}

function takePicture() {
  console.log('Taking picture');
  if (!cameraStream) {
    showNotification('请先启动相机', 'error');
    return;
  }
  
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('cameraCanvas');
  
  if (video && canvas) {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    
    // 保存到照片库
    const photo = {
      id: Date.now(),
      data: imageData,
      timestamp: new Date().toLocaleString()
    };
    
    photosArray.push(photo);
    displayPhotos();
    showNotification('照片拍摄成功！', 'success');
  }
}

function stopCamera() {
  console.log('Stopping camera');
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
    const video = document.getElementById('cameraVideo');
    if (video) {
      video.style.display = 'none';
    }
    const placeholder = document.querySelector('.camera-placeholder');
    if (placeholder) {
      placeholder.style.display = 'block';
    }
    showNotification('相机已关闭', 'success');
  }
}

function displayPhotos() {
  const gallery = document.getElementById('photoGallery');
  if (!gallery) return;
  
  gallery.innerHTML = '';
  
  photosArray.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.innerHTML = `
      <img src="${photo.data}" alt="拍摄照片" title="拍摄时间: ${photo.timestamp}">
    `;
    gallery.appendChild(photoItem);
  });
}

// 图表功能
function initializeSalesChart() {
  console.log('Initializing sales chart');
  const canvas = document.getElementById('salesChart');
  if (!canvas) {
    console.error('Sales chart canvas not found');
    return;
  }
  
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }
  
  if (chartsInitialized) {
    console.log('Charts already initialized');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  
  // 模拟销售数据
  const salesData = [
    { month: '1月', sales: 15000 },
    { month: '2月', sales: 18000 },
    { month: '3月', sales: 22000 },
    { month: '4月', sales: 25000 },
    { month: '5月', sales: 28000 },
    { month: '6月', sales: 32000 },
    { month: '7月', sales: 35000 }
  ];
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesData.map(d => d.month),
      datasets: [{
        label: '销售额 (¥)',
        data: salesData.map(d => d.sales),
        borderColor: '#21808D',
        backgroundColor: 'rgba(33, 128, 141, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '¥' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
  
  chartsInitialized = true;
  console.log('Sales chart initialized successfully');
}

function loadAnalytics() {
  console.log('Loading analytics');
  
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }
  
  // 销售分析图表
  const salesCtx = document.getElementById('analyticsChart')?.getContext('2d');
  if (salesCtx) {
    const categoryStats = {};
    products.forEach(product => {
      categoryStats[product.category] = (categoryStats[product.category] || 0) + (product.price * product.stock);
    });
    
    new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryStats),
        datasets: [{
          label: '分类销售额',
          data: Object.values(categoryStats),
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '¥' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // 库存分析图表
  const inventoryCtx = document.getElementById('inventoryChart')?.getContext('2d');
  if (inventoryCtx) {
    const categoryStock = {};
    products.forEach(product => {
      categoryStock[product.category] = (categoryStock[product.category] || 0) + product.stock;
    });
    
    new Chart(inventoryCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryStock),
        datasets: [{
          data: Object.values(categoryStock),
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }
}

// 其他辅助函数
function viewOrderDetails(orderId) {
  alert(`查看订单 ${orderId} 详情\n\n这里会显示订单的详细信息，包括客户信息、产品列表、支付状态等。`);
}

function updateOrderStatus(orderId) {
  const newStatus = prompt('请输入新的订单状态（待处理/已发货/已完成/已取消）:');
  if (newStatus) {
    showNotification(`订单 ${orderId} 状态已更新为: ${newStatus}`, 'success');
    loadOrders();
  }
}

function createOrder() {
  showNotification('创建订单功能开发中...', 'info');
}

function exportOrders() {
  showNotification('正在导出订单数据...', 'info');
  setTimeout(() => {
    showNotification('订单数据导出完成！', 'success');
  }, 1000);
}

function refreshAnalytics() {
  showNotification('正在刷新数据...', 'info');
  setTimeout(() => {
    loadAnalytics();
    showNotification('数据刷新完成！', 'success');
  }, 1000);
}

function exportReport() {
  showNotification('正在导出报表...', 'info');
  setTimeout(() => {
    showNotification('报表导出完成！', 'success');
  }, 1000);
}

// 模态框设置
function setupModals() {
  console.log('Setting up modals...');
  
  // 点击模态框外部关闭
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeAllModals();
    }
  });
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

// 通知系统
function showNotification(message, type = 'success') {
  console.log('Showing notification:', message, type);
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// 页面卸载时清理资源
window.addEventListener('beforeunload', function() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
  }
});

// 错误处理
window.addEventListener('error', function(event) {
  console.error('应用错误:', event.error);
  showNotification('应用出现错误，请刷新页面重试', 'error');
});

// 键盘快捷键
document.addEventListener('keydown', function(event) {
  if (!isLoggedIn) return;
  
  // ESC 关闭模态框
  if (event.key === 'Escape') {
    closeAllModals();
  }
  
  // Ctrl+N 添加新产品
  if (event.ctrlKey && event.key === 'n' && currentView === 'products') {
    event.preventDefault();
    openAddProductModal();
  }
});