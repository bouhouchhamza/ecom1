# E-Commerce Admin Dashboard

A modern, responsive admin dashboard for managing e-commerce businesses with a dark theme and comprehensive features.

## Features

### 📊 Dashboard Overview
- Real-time statistics cards showing revenue, orders, customers, and products
- Interactive charts for revenue overview and order status
- Recent orders table with quick status indicators
- Responsive grid layout that adapts to all screen sizes

### 📦 Products Management
- Full CRUD operations (Create, Read, Update, Delete)
- Product listing with images, categories, pricing, and stock levels
- Real-time stock status indicators
- Search and filter functionality
- Modal-based product editing with form validation

### 🛍️ Orders Management
- Comprehensive order tracking with status indicators
- Order details including customer information, items, and totals
- Status-based filtering (Pending, Processing, Shipped, Delivered, Cancelled)
- Search functionality for quick order lookup

### 👥 Customer Management
- Customer database with contact information
- Order history and total spending tracking
- Customer registration dates
- Search and filter capabilities

### 📈 Analytics & Reports
- Sales trend charts with customizable date ranges
- Top products performance visualization
- Customer growth analytics
- Interactive charts using Chart.js

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality and data management
- **Chart.js** - Data visualization and analytics charts
- **Lucide Icons** - Modern, consistent iconography

## Design Features

### 🎨 Dark Theme
- Carefully crafted dark color scheme with excellent contrast
- Reduced eye strain for extended usage
- Professional appearance suitable for business environments

### 📱 Responsive Design
- Mobile-first approach with breakpoints for tablets and desktops
- Collapsible sidebar navigation for mobile devices
- Touch-friendly interface elements
- Optimized layouts for all screen sizes

### ⚡ Performance
- Lightweight implementation with minimal dependencies
- Efficient DOM manipulation
- Smooth animations and transitions
- Fast loading times

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd ecommerce-admin-dashboard
   ```

2. **Install dependencies** (optional, for development server)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start a live server at `http://localhost:3000`

4. **Open in browser**
   Simply open `index.html` in your web browser if not using a development server

### Manual Setup

If you prefer not to use npm, you can:
1. Download the project files
2. Open `index.html` in your web browser
3. The dashboard will work immediately with all features

## Usage

### Navigation
- Use the sidebar to navigate between different sections
- On mobile devices, use the hamburger menu to toggle the sidebar
- Click on any section to view its content

### Managing Products
1. Navigate to the Products section
2. Click "Add Product" to create new products
3. Use the edit button to modify existing products
4. Use the delete button to remove products (with confirmation)

### Viewing Orders
1. Navigate to the Orders section
2. View all orders with their current status
3. Use filters to show specific order statuses
4. Search for specific orders by ID or customer name

### Analytics
1. Navigate to the Analytics section
2. View sales trends and performance metrics
3. Use the date range selector to customize the time period
4. Analyze top products and customer growth

## Customization

### Adding New Data
The dashboard uses sample data stored in JavaScript arrays. To use your own data:

1. Replace the sample data arrays in `app.js`:
   - `sampleProducts` for product data
   - `sampleOrders` for order data
   - `sampleCustomers` for customer data

2. Ensure your data structure matches the expected format

### Styling
- Modify `styles.css` to customize colors, fonts, and layouts
- CSS variables are defined at the top for easy theme customization
- Responsive breakpoints are clearly marked

### Adding New Features
- Add new pages by creating HTML sections and corresponding navigation links
- Extend the JavaScript with new functionality
- Add new charts using the Chart.js library

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
ecommerce-admin-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with dark theme
├── app.js             # All JavaScript functionality
├── package.json        # Project metadata and dependencies
└── README.md          # This documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the package.json file for details.

## Support

For issues, questions, or feature requests, please open an issue in the project repository.

---

**Built with ❤️ for e-commerce businesses**
