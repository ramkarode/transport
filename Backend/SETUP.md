# 🚀 Backend Setup Guide

Complete step-by-step guide to get the authentication system running.

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
```bash
# Windows
# Download from: https://www.mongodb.com/try/download/community
# Or use: choco install mongodb-community

# After installation, MongoDB runs on mongodb://localhost:27017
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` with your connection string

### Step 3: Configure Environment

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and update values if needed:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Change to a strong random string
```

### Step 4: Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Server will start on `http://localhost:5000`

## 📝 Complete Setup Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or Atlas account created
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Server running (`npm run dev`)
- [ ] Postman imported for API testing

## 🧪 Testing the API

### Method 1: Using Postman (Recommended)

1. Open Postman
2. Click "Import"
3. Select `postman_collection.json`
4. Update the `base_url` and `token` variables
5. Start making requests!

### Method 2: Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tanu Soni",
    "email": "tanu@example.com",
    "password": "password123",
    "role": "postal_operator"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tanu@example.com",
    "password": "password123"
  }'
```

#### Protected Route (Replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Method 3: Using VS Code REST Client

Create a file `test.rest`:
```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Tanu Soni",
  "email": "tanu@example.com",
  "password": "password123",
  "role": "postal_operator"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "tanu@example.com",
  "password": "password123"
}

### Get Me (use token from login response)
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📚 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Mail Operations (All Protected)
- `POST /api/mail/send-mail` - Send email
- `GET /api/mail/track-parcel/:parcelId` - Track parcel
- `POST /api/mail/register-parcel` - Register new parcel

### Health
- `GET /health` - Server health check

## 🔐 Authenticating Requests

All protected routes require JWT token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example with JavaScript/Fetch
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

fetch('http://localhost:5000/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🐛 Troubleshooting

### Error: Cannot find module 'mongoose'
```bash
npm install
```

### Error: MongoDB Connection Failed
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Try MongoDB Atlas connection string

### Error: Invalid Token
- Token might be expired (expires in 1 hour)
- Login again to get new token
- Check token format in header

### Port Already in Use
```bash
# Change PORT in .env
# OR kill the process:
# Windows: netstat -ano | findstr :5000
# Linux: lsof -i :5000
```

## 📦 Dependencies Explained

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT generation/verification
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **nodemon** - Auto-reload in development

## 🚀 Next Steps

1. **Connect Frontend:**
   - Update Frontend API calls to point to `http://localhost:5000`
   - Store token in localStorage/sessionStorage
   - Pass token in all protected route requests

2. **Add More Routes:**
   - Extend `routes/mail.js` with more endpoints
   - Follow same pattern with authentication middleware

3. **Database:**
   - Add more models (Parcel, Mail, etc.)
   - Create relationships between models
   - Add data validation

4. **Production:**
   - Setup proper environment variables
   - Use strong JWT_SECRET
   - Enable HTTPS
   - Setup logging/monitoring
   - Implement rate limiting

## 📖 File Structure

```
Backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   └── authController.js        # Auth business logic
├── middleware/
│   └── auth.js                  # JWT verification
├── models/
│   └── User.js                  # User schema & methods
├── routes/
│   ├── auth.js                  # Auth endpoints
│   └── mail.js                  # Mail/Parcel endpoints
├── utils/
│   └── validators.js            # Utility functions
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── package.json                 # Dependencies
├── postman_collection.json      # API testing
├── server.js                    # Express app setup
└── README.md                    # Full documentation
```

## ✅ Verification

After setup, verify everything works:

1. Check server is running:
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"success": true, "message": "Server is running"}`

2. Test registration:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
   ```

3. Check MongoDB:
   - Open MongoDB Compass
   - Connect to your MongoDB instance
   - Check if `dynamic-mail-system` database exists

## 🆘 Need Help?

- Check logs in terminal for error messages
- Review error response in API call
- Check `.env` file is configured correctly
- Verify MongoDB is running
- Check firewall settings

---

**You're all set! 🎉 Backend is ready to use.**
