# Hotel Booking System

A robust RESTful API for managing hotel bookings, built with Node.js and Express. This system allows users to browse hotels, make bookings, and leave reviews while providing hotel owners the ability to manage their properties and rooms.

## Features

### User Management
- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access**: Support for both customer and hotel owner roles
- **Password Security**: Bcrypt hashing for secure password storage

### Hotel Management
- **Create Hotels**: Hotel owners can add new properties
- **Room Management**: Add and manage rooms with pricing and occupancy details
- **Browse Hotels**: Customers can search and view all available hotels
- **Hotel Details**: Get detailed information including amenities and ratings

### Booking System
- **Create Bookings**: Reserve rooms with check-in and check-out dates
- **View Bookings**: Customers can view their booking history
- **Cancel Bookings**: Cancel existing reservations

### Review System
- **Submit Reviews**: Customers can leave reviews with ratings (1-5 stars)
- **Hotel Ratings**: Track overall hotel ratings based on customer feedback


## Project Structure

```
hotel-booking-system/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── booking.controller.js # Booking management
│   ├── hotel.controller.js   # Hotel and room management
│   └── review.controller.js  # Review submissions
├── middleware/
│   └── auth.middleware.js    # JWT verification and role checks
├── routes/
│   ├── auth.route.js         # Authentication endpoints
│   ├── booking.route.js      # Booking endpoints
│   ├── hotel.route.js        # Hotel endpoints
│   └── review.route.js       # Review endpoints
├── utils/
│   └── validation.js         # Input validation schemas
├── index.js                  # Application entry point
├── package.json              # Project dependencies
└── README.md                 # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Hotels
- `POST /api/hotels` - Create a new hotel (owner only)
- `POST /api/hotels/:hotelId/rooms` - Add a room to hotel (owner only)
- `GET /api/hotels` - List all hotels
- `GET /api/hotels/:hotelId` - Get hotel details

### Bookings
- `POST /api/bookings` - Create a new booking (customer only)
- `GET /api/bookings` - Get user's bookings (customer only)
- `PUT /api/bookings/:bookingId/cancel` - Cancel a booking (customer only)

## Database Schema

Key tables:
- **users** - User accounts with roles
- **hotels** - Hotel properties with amenities
- **rooms** - Rooms in hotels with pricing
- **bookings** - Customer room reservations
- **reviews** - Hotel reviews and ratings
