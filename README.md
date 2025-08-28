# 💎 OPALMATE Jewelry ERP System

A complete, modern jewelry business management system built with React, Node.js, and SQLite/MySQL.

## 🚀 Quick Start

### Option 1: One-Click Start (Windows)
```bash
# Double-click the start-system.bat file
start-system.bat
```

### Option 2: Manual Start
```bash
# Start Backend
cd backend
npm run dev

# In a new terminal, start Frontend
npm start
```

## 🌐 Access the System

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 📋 System Features

### 🏢 Business Management
- **Product Management**: Complete jewelry inventory
- **Customer Management**: CRM with purchase history
- **Employee Management**: Staff and role management
- **Supplier Management**: Vendor relationships
- **Raw Materials**: Inventory tracking
- **Transactions**: Sales and purchase records

### 🔐 Security
- JWT Authentication
- Role-based access control
- Password encryption
- Protected API routes

### 📊 Analytics
- Dashboard with key metrics
- Transaction reports
- Stock alerts
- Customer analytics

## 🗄️ Database

The system uses **SQLite** by default (no setup required) but can be configured for **MySQL**:

### SQLite (Default)
- File-based database
- No installation required
- Perfect for development and small businesses

### MySQL (Production)
Set these environment variables:
```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=opalmate_db
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `GET /api/customers/vip` - VIP customers

### And many more...

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
cd backend && npm install

# Start development servers
npm run dev  # Backend
npm start    # Frontend
```

### Testing
```bash
cd backend
npm test
```

## 📁 Project Structure

```
my-app/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   └── tests/             # API tests
├── src/                   # Frontend React app
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── ...
├── public/               # Static files
└── database.sqlite       # SQLite database file
```

## 🎯 Use Cases

### For Jewelry Stores
- Manage inventory of rings, necklaces, earrings
- Track customer preferences and purchase history
- Monitor stock levels and reorder points
- Generate sales reports and analytics

### For Jewelry Manufacturers
- Track raw materials (gold, diamonds, etc.)
- Manage supplier relationships
- Monitor production costs
- Track work orders and deliveries

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt encryption
- **Input Validation**: Prevent SQL injection
- **CORS Protection**: Secure cross-origin requests
- **Role-based Access**: Admin, Manager, Employee roles

## 📈 Production Deployment

### Environment Variables
```bash
JWT_SECRET=your_jwt_secret
DB_TYPE=mysql
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=5000
```

### Database Setup
1. Install MySQL Server
2. Create database: `CREATE DATABASE opalmate_db;`
3. Set environment variables
4. Run migrations: `npm run migrate`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure ports 3000 and 5000 are available
4. Check database connection settings

## 🎉 Success!

Your OPALMATE Jewelry ERP system is now ready to manage your jewelry business efficiently and professionally!

---

**Built with ❤️ for the jewelry industry**
