// Initialize Lucide icons
lucide.createIcons();

// Sample data
const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock: 45, status: 'in-stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 299.99, stock: 12, status: 'in-stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=40&h=40&fit=crop' },
  { id: 3, name: 'Running Shoes', category: 'Clothing', price: 89.99, stock: 0, status: 'out-of-stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=40&h=40&fit=crop' },
  { id: 4, name: 'Laptop Stand', category: 'Electronics', price: 49.99, stock: 28, status: 'in-stock', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=40&h=40&fit=crop' },
  { id: 5, name: 'Coffee Maker', category: 'Home & Garden', price: 129.99, stock: 8, status: 'in-stock', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=40&h=40&fit=crop' }
];

const sampleOrders = [
  { id: 'ORD-001', customer: 'John Doe', items: 3, total: 258.97, status: 'delivered', date: '2024-01-20' },
  { id: 'ORD-002', customer: 'Jane Smith', items: 2, total: 189.98, status: 'processing', date: '2024-01-21' },
  { id: 'ORD-003', customer: 'Bob Johnson', items: 1, total: 79.99, status: 'shipped', date: '2024-01-22' },
  { id: 'ORD-004', customer: 'Alice Brown', items: 4, total: 456.96, status: 'pending', date: '2024-01-23' },
  { id: 'ORD-005', customer: 'Charlie Wilson', items: 2, total: 159.98, status: 'delivered', date: '2024-01-24' }
];

const sampleCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', orders: 12, spent: 1250.50, joined: '2023-06-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', orders: 8, spent: 890.25, joined: '2023-07-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234-567-8902', orders: 15, spent: 2100.75, joined: '2023-05-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234-567-8903', orders: 6, spent: 450.00, joined: '2023-08-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1 234-567-8904', orders: 9, spent: 980.50, joined: '2023-09-12' }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const pageTitle = document.getElementById('pageTitle');
const pages = document.querySelectorAll('.page');
const productModal = document.getElementById('productModal');
const addProductBtn = document.getElementById('addProductBtn');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');

// Navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.dataset.page;
    showPage(targetPage);
    
    // Update active nav link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Update page title
    pageTitle.textContent = link.querySelector('span').textContent;
    
    // Close mobile sidebar
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  });
});

function showPage(pageName) {
  pages.forEach(page => {
    if (page.id === `${pageName}-page`) {
      page.classList.remove('hidden');
    } else {
      page.classList.add('hidden');
    }
  });
}

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && 
      !sidebar.contains(e.target) && 
      !mobileMenuToggle.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Product Modal
addProductBtn.addEventListener('click', () => {
  openProductModal();
});

modalClose.addEventListener('click', () => {
  closeProductModal();
});

modalCancel.addEventListener('click', () => {
  closeProductModal();
});

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveProduct();
});

function openProductModal(product = null) {
  if (product) {
    modalTitle.textContent = 'Edit Product';
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
    productForm.dataset.editId = product.id;
  } else {
    modalTitle.textContent = 'Add Product';
    productForm.reset();
    delete productForm.dataset.editId;
  }
  productModal.classList.add('active');
}

function closeProductModal() {
  productModal.classList.remove('active');
  productForm.reset();
  delete productForm.dataset.editId;
}

function saveProduct() {
  const productData = {
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    price: parseFloat(document.getElementById('productPrice').value),
    stock: parseInt(document.getElementById('productStock').value),
    description: document.getElementById('productDescription').value
  };
  
  if (productForm.dataset.editId) {
    // Edit existing product
    const index = sampleProducts.findIndex(p => p.id === parseInt(productForm.dataset.editId));
    if (index !== -1) {
      sampleProducts[index] = { ...sampleProducts[index], ...productData };
    }
  } else {
    // Add new product
    const newProduct = {
      id: Math.max(...sampleProducts.map(p => p.id)) + 1,
      ...productData,
      status: productData.stock > 0 ? 'in-stock' : 'out-of-stock',
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=40&h=40&fit=crop`
    };
    sampleProducts.push(newProduct);
  }
  
  renderProducts();
  closeProductModal();
  showNotification('Product saved successfully!');
}

// Render functions
function renderProducts() {
  const tbody = document.getElementById('productsTable');
  tbody.innerHTML = sampleProducts.map(product => `
    <tr>
      <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td><span class="status-badge status-${product.status}">${product.status.replace('-', ' ')}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editProduct(${product.id})">
          <i data-lucide="edit-2"></i>
        </button>
        <button class="btn btn-sm btn-secondary" onclick="deleteProduct(${product.id})">
          <i data-lucide="trash-2"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderOrders() {
  const tbody = document.getElementById('ordersTable');
  tbody.innerHTML = sampleOrders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.items}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td><span class="status-badge status-${order.status}">${order.status}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="viewOrder('${order.id}')">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderCustomers() {
  const tbody = document.getElementById('customersTable');
  tbody.innerHTML = sampleCustomers.map(customer => `
    <tr>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.orders}</td>
      <td>$${customer.spent.toFixed(2)}</td>
      <td>${customer.joined}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="viewCustomer(${customer.id})">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderRecentOrders() {
  const tbody = document.getElementById('recentOrdersTable');
  tbody.innerHTML = sampleOrders.slice(0, 5).map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td><span class="status-badge status-${order.status}">${order.status}</span></td>
      <td>${order.date}</td>
    </tr>
  `).join('');
}

// Product actions
function editProduct(id) {
  const product = sampleProducts.find(p => p.id === id);
  if (product) {
    openProductModal(product);
  }
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    const index = sampleProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      sampleProducts.splice(index, 1);
      renderProducts();
      showNotification('Product deleted successfully!');
    }
  }
}

function viewOrder(orderId) {
  showNotification(`Viewing order ${orderId}`);
}

function viewCustomer(customerId) {
  showNotification(`Viewing customer ${customerId}`);
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--accent);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Charts
function initCharts() {
  // Check if Chart is available
  if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded');
    return;
  }
  
  // Set default Chart.js options for dark theme
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#334155';
  
  // Revenue Chart
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx && revenueCtx.getContext) {
    try {
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [30000, 35000, 32000, 40000, 38000, 45231],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              borderColor: '#334155',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#94a3b8',
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating revenue chart:', error);
    }
  }

  // Order Status Chart
  const orderStatusCtx = document.getElementById('orderStatusChart');
  if (orderStatusCtx && orderStatusCtx.getContext) {
    try {
      new Chart(orderStatusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'Processing', 'Shipped', 'Pending'],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              borderColor: '#334155',
              borderWidth: 1
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating order status chart:', error);
    }
  }

  // Sales Chart (Analytics)
  const salesCtx = document.getElementById('salesChart');
  if (salesCtx && salesCtx.getContext) {
    try {
      new Chart(salesCtx, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Sales',
            data: [12000, 15000, 13000, 18000],
            backgroundColor: '#3b82f6',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              borderColor: '#334155',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  return 'Sales: $' + context.parsed.y.toLocaleString();
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#94a3b8',
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating sales chart:', error);
    }
  }

  // Top Products Chart
  const topProductsCtx = document.getElementById('topProductsChart');
  if (topProductsCtx && topProductsCtx.getContext) {
    try {
      new Chart(topProductsCtx, {
        type: 'pie',
        data: {
          labels: ['Headphones', 'Smart Watch', 'Laptop', 'Shoes', 'Other'],
          datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              borderColor: '#334155',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.parsed + '%';
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating top products chart:', error);
    }
  }

  // Customer Growth Chart
  const customerGrowthCtx = document.getElementById('customerGrowthChart');
  if (customerGrowthCtx && customerGrowthCtx.getContext) {
    try {
      new Chart(customerGrowthCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Customers',
            data: [650, 720, 780, 820, 860, 892],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#f1f5f9',
              bodyColor: '#94a3b8',
              borderColor: '#334155',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#334155',
                drawBorder: false
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating customer growth chart:', error);
    }
  }
}

// Search functionality
document.querySelectorAll('.search-input').forEach(input => {
  input.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const page = document.querySelector('.page:not(.hidden)').id;
    
    if (page === 'products-page') {
      const filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
      renderFilteredProducts(filtered);
    } else if (page === 'orders-page') {
      const filtered = sampleOrders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm)
      );
      renderFilteredOrders(filtered);
    } else if (page === 'customers-page') {
      const filtered = sampleCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
      );
      renderFilteredCustomers(filtered);
    }
  });
});

// Search bar functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm) {
        showNotification(`Searching for: ${searchTerm}`);
        e.target.value = '';
      }
    }
  });
}

function renderFilteredProducts(products) {
  const tbody = document.getElementById('productsTable');
  tbody.innerHTML = products.map(product => `
    <tr>
      <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td><span class="status-badge status-${product.status}">${product.status.replace('-', ' ')}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editProduct(${product.id})">
          <i data-lucide="edit-2"></i>
        </button>
        <button class="btn btn-sm btn-secondary" onclick="deleteProduct(${product.id})">
          <i data-lucide="trash-2"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderFilteredOrders(orders) {
  const tbody = document.getElementById('ordersTable');
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.items}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td><span class="status-badge status-${order.status}">${order.status}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="viewOrder('${order.id}')">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderFilteredCustomers(customers) {
  const tbody = document.getElementById('customersTable');
  tbody.innerHTML = customers.map(customer => `
    <tr>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.orders}</td>
      <td>$${customer.spent.toFixed(2)}</td>
      <td>${customer.joined}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="viewCustomer(${customer.id})">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Add delay to ensure DOM and Chart.js are fully loaded
  setTimeout(() => {
    renderProducts();
    renderOrders();
    renderCustomers();
    renderRecentOrders();
    
    // Initialize charts only if Chart is available
    if (typeof Chart !== 'undefined') {
      initCharts();
    } else {
      console.warn('Chart.js not loaded, skipping chart initialization');
    }
    
    // Re-initialize Lucide icons after DOM is ready
    lucide.createIcons();
    
    // Initialize notification functionality
    initNotificationSystem();
  }, 200);
});

// Notification system
function initNotificationSystem() {
  const notificationBtn = document.getElementById('notificationBtn');
  const dropdown = document.getElementById('notificationDropdown');
  
  if (!notificationBtn || !dropdown) {
    console.error('Notification elements not found');
    return;
  }
  
  console.log('Setting up notification system...');
  
  notificationBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log('Notification button clicked!');
    
    console.log('Current display:', dropdown.style.display);
    console.log('Dropdown element:', dropdown);
    console.log('Dropdown parent:', dropdown.parentElement);
    
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
      console.log('Hiding dropdown');
    } else {
      dropdown.style.display = 'block';
      console.log('Showing dropdown');
    }
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!notificationBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
  
  // Mark all as read
  const markAllBtn = document.getElementById('markAllRead');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const unreadItems = document.querySelectorAll('.notification-item.unread');
      unreadItems.forEach(item => item.classList.remove('unread'));
      
      const badge = document.querySelector('.notification-badge');
      if (badge) badge.style.display = 'none';
      
      alert('All notifications marked as read');
    });
  }
  
  // Individual notification clicks
  const items = document.querySelectorAll('.notification-item');
  items.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.remove('unread');
      
      const unreadCount = document.querySelectorAll('.notification-item.unread').length;
      const badge = document.querySelector('.notification-badge');
      
      if (unreadCount === 0) {
        badge.style.display = 'none';
      } else {
        badge.textContent = unreadCount;
      }
    });
  });
  
  console.log('Notification system ready!');
}

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('active');
  }
});
