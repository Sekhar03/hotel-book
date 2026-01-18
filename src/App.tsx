import { useState } from 'react';
import { Floor } from './types';
import { initializeHotel } from './utils/roomUtils';
import { findOptimalRooms } from './utils/bookingAlgorithm';
import RoomGrid from './components/RoomGrid';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  const [floors, setFloors] = useState<Floor[]>(() => initializeHotel());
  const [numRooms, setNumRooms] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  const handleBook = () => {
    if (numRooms < 1 || numRooms > 5) {
      setMessage('Please enter a number between 1 and 5');
      return;
    }

    const roomsToBook = findOptimalRooms(floors, numRooms);
    
    if (!roomsToBook || roomsToBook.length === 0) {
      setMessage(`Sorry, ${numRooms} room(s) are not available.`);
      return;
    }

    // Book the rooms
    setFloors(prevFloors => {
      const newFloors = prevFloors.map(floor => ({
        ...floor,
        rooms: floor.rooms.map(room => {
          const shouldBook = roomsToBook.some(r => r.id === room.id);
          return shouldBook ? { ...room, isBooked: true } : room;
        })
      }));
      return newFloors;
    });

    const roomNumbers = roomsToBook.map(r => r.roomNumber).join(', ');
    setMessage(`Successfully booked ${numRooms} room(s): ${roomNumbers}`);
  };

  const handleReset = () => {
    setFloors(initializeHotel());
    setNumRooms(1);
    setMessage('');
  };

  const handleRandom = () => {
    const newFloors = initializeHotel();
    const allRooms: number[] = [];
    
    newFloors.forEach(floor => {
      floor.rooms.forEach(room => {
        allRooms.push(room.id);
      });
    });

    // Randomly book 30-60% of rooms
    const totalRooms = allRooms.length;
    const numToBook = Math.floor(totalRooms * (0.3 + Math.random() * 0.3));
    
    // Shuffle and select random rooms
    const shuffled = [...allRooms].sort(() => Math.random() - 0.5);
    const roomsToBook = shuffled.slice(0, numToBook);

    setFloors(prevFloors => {
      return prevFloors.map(floor => ({
        ...floor,
        rooms: floor.rooms.map(room => ({
          ...room,
          isBooked: roomsToBook.includes(room.id)
        }))
      }));
    });

    setMessage(`Random occupancy: ${roomsToBook.length} rooms booked`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hotel Room Reservation System</h1>
        <p>97 Rooms across 10 Floors</p>
      </header>
      
      <ControlPanel
        numRooms={numRooms}
        onNumRoomsChange={setNumRooms}
        onBook={handleBook}
        onReset={handleReset}
        onRandom={handleRandom}
      />

      {message && (
        <div className={`message ${message.startsWith('Successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <RoomGrid floors={floors} />
    </div>
  );
}

export default App;

