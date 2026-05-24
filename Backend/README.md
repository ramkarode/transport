# Dynamic Mail Transmission System - Backend

Complete authentication system for MERN stack with JWT, bcryptjs, and MongoDB.

## 🚀 Features

- ✅ User registration with email validation
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token generation (expires in 1 hour)
- ✅ User login with password verification
- ✅ Protected routes middleware
- ✅ MongoDB integration with Mongoose
- ✅ Clean, modular code structure
- ✅ Error handling and validation
- ✅ Sample protected routes (mail, parcel operations)

## 📋 Project Structure

```
Backend/
├── models/
│   └── User.js              # Mongoose User model
├── controllers/
│   └── authController.js    # Auth logic (register, login)
├── middleware/
│   └── auth.js              # JWT verification middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   └── mail.js              # Protected sample routes
├── config/
│   └── db.js                # MongoDB connection
├── server.js                # Express server setup
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## 🛠 Installation

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Setup MongoDB
- Install MongoDB locally OR use MongoDB Atlas
- Update `MONGODB_URI` in `.env` file

### 3. Configure Environment Variables
Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dynamic-mail-system
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=1h
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Tanu Soni",
  "email": "tanu@example.com",
  "password": "password123",
  "role": "postal_operator"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Tanu Soni",
    "email": "tanu@example.com",
    "role": "postal_operator"
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "tanu@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Tanu Soni",
    "email": "tanu@example.com",
    "role": "postal_operator"
  }
}
```

#### 3. Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Mail Routes (Protected)

#### 1. Send Mail
```http
POST /api/mail/send-mail
Authorization: Bearer <token>
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is a test email"
}
```

#### 2. Track Parcel
```http
GET /api/mail/track-parcel/PKG-123456789
Authorization: Bearer <token>
```

#### 3. Register Parcel
```http
POST /api/mail/register-parcel
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientName": "John Doe",
  "address": "123 Main St, City, Country",
  "weight": "5kg"
}
```

## 🔐 Authentication

### JWT Token Usage

Include token in request header:
```
Authorization: Bearer <token>
```

### Token Details
- **Algorithm:** HS256
- **Expiration:** 1 hour
- **Secret:** Stored in `JWT_SECRET` environment variable

### Example with cURL
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔒 Security Features

1. **Password Hashing**
   - Uses bcryptjs with 10 salt rounds
   - Passwords never stored in plain text

2. **JWT Token**
   - Secure token generation
   - Automatic expiration
   - Secret key protection

3. **Email Validation**
   - Regex pattern validation
   - Unique email constraint

4. **Error Handling**
   - Specific error messages
   - Token expiration handling
   - Invalid token detection

## 👤 User Model

```javascript
{
  name: String,           // Required, max 50 chars
  email: String,          // Required, unique, validated
  password: String,       // Required, min 6 chars, hashed
  role: String,           // user, admin, postal_operator, transport_manager
  createdAt: Date         // Auto-generated
}
```

## 🧪 Testing with Postman

1. **Register a user:**
   - POST to `http://localhost:5000/api/auth/register`
   - Copy the returned token

2. **Login:**
   - POST to `http://localhost:5000/api/auth/login`
   - Copy the returned token

3. **Use protected routes:**
   - Add `Authorization: Bearer <token>` header
   - Access `/api/auth/me` or `/api/mail/*` routes

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/db |
| JWT_SECRET | JWT signing secret | your_secret_key |
| JWT_EXPIRE | Token expiration time | 1h |
| NODE_ENV | Environment mode | development |

## 🚀 Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Set NODE_ENV to 'production'
- [ ] Enable HTTPS
- [ ] Setup rate limiting
- [ ] Add request validation
- [ ] Implement refresh tokens
- [ ] Setup CORS properly
- [ ] Add logging service
- [ ] Setup monitoring

## 📄 License

MIT

## 👨‍💻 Support

For issues or questions, contact the development team.
