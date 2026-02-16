# 🏋️ AI Fitness Tracker

A full-stack fitness tracking application with AI-powered food image recognition. Track your meals, activities, and progress toward your fitness goals.

## ✨ Features

- 📸 **AI Food Recognition**: Upload food photos and automatically detect food name and calories using Google Gemini AI
- 🍽️ **Food Logging**: Track daily meals (breakfast, lunch, dinner, snacks) with calorie counting
- 🏃 **Activity Tracking**: Log workouts and exercises with calorie burn tracking
- 📊 **Progress Dashboard**: Visual charts and statistics for your fitness journey
- 🎯 **Goal Setting**: Set and track fitness goals (lose/maintain/gain weight)
- 👤 **User Profiles**: Customize your profile with age, weight, height, and daily calorie targets

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Strapi CMS 5.33.4 (Node.js)
- **AI**: Google Gemini API (Gemini 2.5 Flash) for image analysis
- **Database**: SQLite (default)

## 📋 Prerequisites

- Node.js >= 20.0.0 <= 24.x.x
- npm >= 6.0.0
- Google Gemini API Key ([Get it here](https://aistudio.google.com/api-keys))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/srbhcodes/fitness.git
cd fitness
```

### 2. Setup Server (Backend)

```bash
cd server

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env

# Edit .env file and add your:
# - APP_KEYS (4 random strings, comma-separated)
# - ADMIN_JWT_SECRET (random string)
# - API_TOKEN_SALT (random string)
# - TRANSFER_TOKEN_SALT (random string)
# - ENCRYPTION_KEY (random string)
# - GEMINI_API_KEY (your Google Gemini API key)

# Start the server
npm run develop
```

The server will start at `http://localhost:1337`

**First time setup**: When you first run the server, visit `http://localhost:1337/admin` to create an admin account.

**Important**: After creating the admin account, you need to enable permissions:
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Authenticated** role
3. Enable these permissions:
   - **User** → `update`
   - **Food-log** → `find`, `findOne`, `create`, `update`, `delete`
   - **Activity-log** → `find`, `findOne`, `create`, `update`, `delete`
   - **Image-analysis** → `find`, `findOne`, `create`
4. Click **Save**

> **Note**: The server includes automatic permission setup in the bootstrap function, but manual setup ensures everything works correctly.

### 3. Setup Client (Frontend)

Open a **new terminal** and run:

```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# The .env file should already have the correct API URL
# If not, update VITE_STRAPI_API_URL=http://localhost:1337/api

# Start the client
npm run dev
```

The client will start at `http://localhost:5173`

## 📝 Environment Variables

### Server (.env)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
ADMIN_JWT_SECRET=your-secret
API_TOKEN_SALT=your-salt
TRANSFER_TOKEN_SALT=your-salt
ENCRYPTION_KEY=your-key
GEMINI_API_KEY=your-gemini-api-key
DATABASE_CLIENT=sqlite
```

### Client (.env)

```env
VITE_STRAPI_API_URL=http://localhost:1337/api
```

## 🎯 Usage

1. **Sign Up**: Create a new account
2. **Onboarding**: Complete your profile (age, weight, height, fitness goal)
3. **Add Food**: 
   - Manual entry: Click "Add Food Entry"
   - AI Snap: Click "AI Food Snap" and upload a food photo
4. **Track Activities**: Log your workouts and exercises
5. **View Dashboard**: See your progress and statistics

## 🔧 Generating Secrets

For production, generate secure random strings for:
- `APP_KEYS`: 4 random strings (comma-separated)
- `ADMIN_JWT_SECRET`: Random string
- `API_TOKEN_SALT`: Random string
- `TRANSFER_TOKEN_SALT`: Random string
- `ENCRYPTION_KEY`: Random string

You can use:
```bash
# Generate random strings
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 📦 Project Structure

```
fitness/
├── client/          # React frontend
│   ├── src/
│   ├── package.json
│   └── .env.example
├── server/          # Strapi backend
│   ├── src/
│   ├── config/
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🐛 Troubleshooting

### Server won't start
- Check if port 1337 is available
- Verify all environment variables are set
- Check Node.js version (should be 20.x - 24.x)

### Client can't connect to server
- Ensure server is running on port 1337
- Check `VITE_STRAPI_API_URL` in client `.env`
- Verify CORS settings in Strapi

### AI image analysis not working
- Verify `GEMINI_API_KEY` is set correctly in server `.env`
- Check your Gemini API quota/limits
- Ensure the image format is supported (JPEG, PNG, GIF, WebP)

### 403 Forbidden errors
- Enable permissions in Strapi admin panel (see Setup Server step 2)
- Restart the server after enabling permissions

### Strapi admin: Content Manager / Media Library / Content Type Builder not loading
- Ensure `package.json` in `server/` has `"overrides": { "@strapi/admin": "5.33.4" }` to avoid duplicate package issues
- Run `npm install` in the server folder, then restart the server and hard-refresh the browser

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ using React, Strapi, and Google Gemini AI**

