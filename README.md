# Hall Booking System

A modern, responsive hall booking system built with React and Node.js, featuring real-time availability checking and comprehensive booking management.

## 🚀 Features

- **Hall Management**: Book multiple halls with different capacities
- **Real-time Availability**: Check and prevent double bookings
- **Time Validation**: Enforce working hours and booking rules
- **User Management**: Track bookings by email and phone
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Built with Tailwind CSS and React Icons

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- React Icons
- Vite

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Zod for validation
- Winston for logging

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tiwari2683/hall-booking-system.git
   cd hall-booking-system
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

## ⚙️ Configuration

1. **Create environment file**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure environment variables**
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # CORS
   CORS_ORIGIN="http://localhost:5173"
   ```

3. **Set up database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend application**
   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📚 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Validation Rules
- No overlapping bookings for same hall and time
- Minimum booking duration: 1 hour
- Maximum booking duration: 4 hours
- Working hours: 8 AM to 10 PM
- Minimum advance notice: 2 hours
- One booking per user per day

## 🏗️ Project Structure

```
hall-booking-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── scripts/
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── .env.example
├── .gitignore
└── README.md
```

## 🔧 Development

### Adding New Halls
Update the `BUSINESS_RULES` object in `backend/src/services/booking.service.js`:
```javascript
HALL_CAPACITIES: {
  'Main Hall': 100,
  'Conference Room': 20,
  'Banquet Hall': 200,
  'Your New Hall': 50
}
```

### Modifying Validation Rules
Edit business rules in `backend/src/services/booking.service.js`:
- `MIN_BOOKING_DURATION`: Minimum booking duration in minutes
- `MAX_BOOKING_DURATION`: Maximum booking duration in minutes
- `WORKING_HOURS`: Operating hours
- `MIN_ADVANCE_NOTICE`: Minimum advance notice in hours

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your DATABASE_URL in .env
   - Ensure Neon database is running
   - Run `npx prisma migrate dev`

2. **CORS Errors**
   - Verify CORS_ORIGIN matches frontend URL
   - Check if backend is running on correct port

3. **Booking Not Saving**
   - Check validation errors in console
   - Verify database schema is up to date
   - Check network requests in browser dev tools

### Database Reset
```bash
npx prisma migrate reset --force
npx prisma migrate dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- **Prashant Tiwari** - Founder & CEO
- **Saurabh Tiwari** - CTO & Co-Founder
- **Rahul Tiwari** - Head of Operations

## 📞 Contact

For support or inquiries:
- Email: info@assentech.com
- Website: https://assentech.com

---

**Built with ❤️ by Prashant Tiwari