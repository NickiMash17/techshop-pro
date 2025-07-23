# TechShop Pro Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

A robust, scalable, and production-ready backend API for the TechShop Pro e-commerce platform built with modern Node.js technologies.

[Features](#-features) •
[Quick Start](#-quick-start) •
[API Documentation](#-api-documentation) •
[Deployment](#-deployment) •
[Contributing](#-contributing)

</div>

## 🌟 Features

### Core Functionality

- 🔐 **JWT Authentication** - Secure user management with role-based access control
- 💳 **Payment Processing** - Integrated Stripe payment gateway
- 📦 **Order Management** - Complete order lifecycle management
- 🛍️ **Product Catalog** - Advanced product management with categories and search
- 👤 **User Profiles** - Comprehensive user account management

### Technical Features

- ⚡ **RESTful API** - Clean, intuitive API design following REST principles
- 🗄️ **MongoDB Integration** - Robust data persistence with Mongoose ODM
- 🛡️ **Security Hardened** - Rate limiting, CORS, input validation, and secure headers
- 📊 **Comprehensive Logging** - Structured logging with Winston for debugging and monitoring
- 🔄 **Hot Reload** - Development environment with automatic server restart
- 🌱 **Data Seeding** - Pre-populated sample data for development and testing

### Performance & Scalability

- 🚀 **Optimized Queries** - Efficient database operations with proper indexing
- 📈 **Monitoring Ready** - Built-in health checks and performance metrics
- 🔒 **Production Ready** - Environment-based configuration and error handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement  | Version | Installation Guide                                               |
| ------------ | ------- | ---------------------------------------------------------------- |
| **Node.js**  | v16.0+  | [Download Node.js](https://nodejs.org/)                          |
| **MongoDB**  | v6.0+   | [Install MongoDB](https://docs.mongodb.com/manual/installation/) |
| **npm/yarn** | Latest  | Comes with Node.js                                               |

### Optional Tools

- **MongoDB Compass** - GUI for MongoDB management
- **Postman** - API testing and documentation
- **VS Code** - Recommended code editor

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/NickiMash17/techshop-pro-backend.git
cd techshop-pro-backend

# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/techshop-pro

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### 3. Database Setup

```bash
# Start MongoDB (if running locally)
mongod

# Seed the database with sample data
npm run seed
```

### 4. Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

The server will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Headers

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### 🔐 Authentication Endpoints

| Method | Endpoint                | Description            | Auth Required |
| ------ | ----------------------- | ---------------------- | ------------- |
| POST   | `/auth/register`        | Register new user      | ❌            |
| POST   | `/auth/login`           | User login             | ❌            |
| POST   | `/auth/logout`          | User logout            | ✅            |
| GET    | `/auth/profile`         | Get user profile       | ✅            |
| PUT    | `/auth/profile`         | Update user profile    | ✅            |
| POST   | `/auth/forgot-password` | Request password reset | ❌            |
| POST   | `/auth/reset-password`  | Reset password         | ❌            |

#### Example: User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "phone": "+1234567890"
  }'
```

### 🛍️ Product Endpoints

| Method | Endpoint                       | Description                      | Auth Required |
| ------ | ------------------------------ | -------------------------------- | ------------- |
| GET    | `/products`                    | Get all products with pagination | ❌            |
| GET    | `/products/:id`                | Get single product               | ❌            |
| POST   | `/products`                    | Create new product               | ✅ (Admin)    |
| PUT    | `/products/:id`                | Update product                   | ✅ (Admin)    |
| DELETE | `/products/:id`                | Delete product                   | ✅ (Admin)    |
| GET    | `/products/category/:category` | Get products by category         | ❌            |
| GET    | `/products/search`             | Search products                  | ❌            |
| GET    | `/products/featured`           | Get featured products            | ❌            |

#### Query Parameters for Product Listing

```
GET /api/products?page=1&limit=10&sort=createdAt&category=electronics&minPrice=100&maxPrice=1000&search=laptop
```

### 📦 Order Endpoints

| Method | Endpoint              | Description         | Auth Required |
| ------ | --------------------- | ------------------- | ------------- |
| GET    | `/orders`             | Get user orders     | ✅            |
| GET    | `/orders/:id`         | Get single order    | ✅            |
| POST   | `/orders`             | Create new order    | ✅            |
| PUT    | `/orders/:id/status`  | Update order status | ✅ (Admin)    |
| DELETE | `/orders/:id`         | Cancel order        | ✅            |
| POST   | `/orders/:id/payment` | Process payment     | ✅            |

### 👤 User Management Endpoints

| Method | Endpoint            | Description     | Auth Required |
| ------ | ------------------- | --------------- | ------------- |
| GET    | `/users`            | Get all users   | ✅ (Admin)    |
| GET    | `/users/:id`        | Get user by ID  | ✅ (Admin)    |
| PUT    | `/users/:id`        | Update user     | ✅            |
| DELETE | `/users/:id`        | Delete user     | ✅ (Admin)    |
| GET    | `/users/:id/orders` | Get user orders | ✅            |

### 📊 Admin Endpoints

| Method | Endpoint           | Description               | Auth Required |
| ------ | ------------------ | ------------------------- | ------------- |
| GET    | `/admin/dashboard` | Dashboard statistics      | ✅ (Admin)    |
| GET    | `/admin/orders`    | All orders with filters   | ✅ (Admin)    |
| GET    | `/admin/users`     | All users with pagination | ✅ (Admin)    |
| GET    | `/admin/analytics` | Sales and user analytics  | ✅ (Admin)    |

### 🏥 Health & Utility Endpoints

| Method | Endpoint   | Description      | Auth Required |
| ------ | ---------- | ---------------- | ------------- |
| GET    | `/health`  | Health check     | ❌            |
| GET    | `/version` | API version info | ❌            |

## 🗄️ Database Schema

### User Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: Number,
  images: [String],
  category: {
    type: String,
    required: true,
    enum: ['Laptops', 'Smartphones', 'Accessories', 'Tablets']
  },
  brand: String,
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  specifications: Map,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true
  },
  products: [{
    product: {
      type: ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'stripe'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: String,
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables Reference

| Variable            | Description                       | Default               | Required |
| ------------------- | --------------------------------- | --------------------- | -------- |
| `PORT`              | Server port                       | 5000                  | ❌       |
| `NODE_ENV`          | Environment mode                  | development           | ❌       |
| `MONGODB_URI`       | MongoDB connection string         | -                     | ✅       |
| `JWT_SECRET`        | JWT signing secret (min 32 chars) | -                     | ✅       |
| `JWT_EXPIRE`        | JWT expiration time               | 7d                    | ❌       |
| `STRIPE_SECRET_KEY` | Stripe API secret key             | -                     | ✅       |
| `FRONTEND_URL`      | Frontend application URL          | http://localhost:5173 | ❌       |
| `LOG_LEVEL`         | Logging level                     | info                  | ❌       |

### Security Configuration

#### Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Password reset**: 3 requests per hour

#### CORS Settings

```javascript
{
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}
```

## 🧪 Testing

### Manual Testing with cURL

#### Health Check

```bash
curl http://localhost:5000/api/health
```

#### User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login and Get Token

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Get Products

```bash
curl http://localhost:5000/api/products
```

#### Create Order (Protected)

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "products": [
      {
        "product": "PRODUCT_ID",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "country": "USA"
    },
    "paymentMethod": "stripe"
  }'
```

### Using Postman

1. Import the Postman collection (if available)
2. Set up environment variables for base URL and tokens
3. Run the test suite

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Configure production MongoDB instance
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring and logging
- [ ] Configure automated backups

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Cloud Platform Deployment

#### Heroku

```bash
# Install Heroku CLI
heroku create techshop-pro-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

#### Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### DigitalOcean App Platform

1. Create new app from GitHub repository
2. Configure environment variables
3. Set build and run commands

## 📁 Project Structure

```
backend/
├── 📂 config/
│   ├── database.js          # MongoDB connection
│   ├── cloudinary.js        # Image upload config
│   └── stripe.js           # Payment config
├── 📂 controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product management
│   ├── orderController.js   # Order processing
│   ├── userController.js    # User management
│   └── adminController.js   # Admin operations
├── 📂 middleware/
│   ├── auth.js             # JWT authentication
│   ├── admin.js            # Admin authorization
│   ├── rateLimiter.js      # Rate limiting
│   ├── errorHandler.js     # Error handling
│   ├── validation.js       # Input validation
│   └── logging.js          # Request logging
├── 📂 models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   ├── Order.js            # Order schema
│   └── Review.js           # Review schema
├── 📂 routes/
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product routes
│   ├── orders.js           # Order routes
│   ├── users.js            # User routes
│   └── admin.js            # Admin routes
├── 📂 utils/
│   ├── logger.js           # Winston logger setup
│   ├── email.js            # Email utilities
│   ├── helpers.js          # General helpers
│   └── constants.js        # App constants
├── 📂 tests/
│   ├── auth.test.js        # Authentication tests
│   ├── products.test.js    # Product tests
│   └── orders.test.js      # Order tests
├── 📄 .env                 # Environment variables
├── 📄 .env.example         # Environment template
├── 📄 .gitignore          # Git ignore rules
├── 📄 package.json        # Dependencies and scripts
├── 📄 server.js           # Main server file
├── 📄 seedData.js         # Database seeding
└── 📄 README.md           # This file
```

## 🛠️ Available Scripts

| Script             | Command          | Description                        |
| ------------------ | ---------------- | ---------------------------------- |
| **Development**    | `npm run dev`    | Start server with hot reload       |
| **Production**     | `npm start`      | Start production server            |
| **Seed Database**  | `npm run seed`   | Populate database with sample data |
| **Reset Database** | `npm run reset`  | Clear and reseed database          |
| **Test**           | `npm test`       | Run test suite                     |
| **Lint**           | `npm run lint`   | Check code style                   |
| **Format**         | `npm run format` | Format code with Prettier          |

## 🔍 Troubleshooting

### Common Issues

#### MongoDB Connection Issues

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB service
sudo systemctl start mongod

# Check connection string format
mongodb://username:password@host:port/database
```

#### JWT Token Issues

- Ensure JWT_SECRET is at least 32 characters
- Check token expiration settings
- Verify Authorization header format: `Bearer <token>`

#### Stripe Payment Issues

- Verify Stripe keys are correct (test vs live)
- Check webhook endpoints
- Validate payment amount format

#### CORS Issues

- Verify FRONTEND_URL in environment variables
- Check allowed origins in CORS configuration
- Ensure credentials are properly handled

### Debug Mode

```bash
DEBUG=* npm run dev
```

### Log Files

- **Development**: Console output
- **Production**: `logs/error.log` and `logs/combined.log`

## 📊 Monitoring & Analytics

### Health Monitoring

The API includes built-in health checks:

- Database connectivity
- External service status
- Memory usage
- Response time metrics

### Logging

Structured logging with different levels:

- **ERROR**: Application errors
- **WARN**: Warning messages
- **INFO**: General information
- **DEBUG**: Detailed debugging info

### Metrics Collection

- Request/response times
- Error rates
- Database query performance
- Payment processing metrics

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with clear messages
7. **Push** to your branch
8. **Submit** a pull request

### Code Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

### Pull Request Guidelines

- Provide clear description
- Reference related issues
- Include screenshots if applicable
- Ensure CI/CD passes

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 TechShop Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software")...
```

## 🆘 Support & Community

### Getting Help

- 📚 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/techshop-pro-backend/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/techshop-pro-backend/discussions)
- 📧 **Email Support**: support@techshoppro.com

### Community

- 💬 **Discord**: [Join our server](https://discord.gg/techshoppro)
- 🐦 **Twitter**: [@TechShopPro](https://twitter.com/techshoppro)
- 📱 **LinkedIn**: [TechShop Pro](https://linkedin.com/company/techshoppro)

## 🔄 Changelog

### v1.2.0 (Latest)

- ✨ Added payment processing with Stripe
- 🔒 Enhanced security with rate limiting
- 📊 Improved logging and monitoring
- 🐛 Fixed order status update issues

### v1.1.0

- 📦 Added order management system
- 👤 Implemented user profiles
- 🔍 Added product search functionality

### v1.0.0

- 🎉 Initial release
- 🔐 JWT authentication
- 🛍️ Basic product management
- 🗄️ MongoDB integration

## 🚗 Roadmap

### Upcoming Features

- [ ] **Real-time notifications** with WebSocket
- [ ] **Advanced analytics** dashboard
- [ ] **Multi-language support** (i18n)
- [ ] **Inventory management** system
- [ ] **Review and rating** system
- [ ] **Wishlist** functionality
- [ ] **Coupon and discount** system
- [ ] **Bulk operations** API
- [ ] **GraphQL** endpoint
- [ ] **Microservices** architecture

### Long-term Goals

- [ ] **Machine learning** recommendations
- [ ] **Mobile app** API extensions
- [ ] **Third-party integrations** (Amazon, eBay)
- [ ] **Advanced reporting** and analytics

---

<div align="center">

**TechShop Pro Backend API** - Built with ❤️ for modern e-commerce

[![GitHub stars](https://img.shields.io/github/stars/yourusername/techshop-pro-backend?style=social)](https://github.com/yourusername/techshop-pro-backend)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/techshop-pro-backend?style=social)](https://github.com/yourusername/techshop-pro-backend/fork)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/techshop-pro-backend)](https://github.com/yourusername/techshop-pro-backend/issues)

[⬆ Back to Top](#techshop-pro-backend-api)

</div>
