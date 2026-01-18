# Hotel Room Reservation System

A React-based hotel room reservation system that optimally assigns rooms based on travel time calculations.

## Features

- **97 Rooms across 10 Floors**: 
  - Floors 1-9: 10 rooms each (101-110, 201-210, etc.)
  - Floor 10: 7 rooms (1001-1007)
  
- **Smart Booking Algorithm**:
  - Prioritizes booking rooms on the same floor
  - Minimizes total travel time when booking across floors
  - Travel time calculation: 1 minute per room (horizontal) + 2 minutes per floor (vertical)

- **Interactive UI**:
  - Visual grid representation of all rooms
  - Input field for number of rooms (1-5)
  - Book button to reserve rooms
  - Reset button to clear all bookings
  - Random occupancy generator

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Booking Rules

1. A guest can book up to 5 rooms at a time
2. Priority is given to booking rooms on the same floor
3. If rooms are not available on the same floor, the system minimizes total travel time between the first and last room
4. Travel time considers both horizontal (1 min/room) and vertical (2 min/floor) movement

## Project Structure

```
src/
  ├── components/       # React components
  │   ├── ControlPanel.tsx
  │   ├── RoomGrid.tsx
  │   └── ...
  ├── utils/           # Utility functions
  │   ├── roomUtils.ts
  │   └── bookingAlgorithm.ts
  ├── types.ts         # TypeScript type definitions
  ├── App.tsx          # Main application component
  └── main.tsx         # Entry point
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3

