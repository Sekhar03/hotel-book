import { Room, Floor } from '../types';

/**
 * Creates the hotel structure with 97 rooms across 10 floors
 * Floors 1-9: 10 rooms each (101-110, 201-210, etc.)
 * Floor 10: 7 rooms (1001-1007)
 */
export function initializeHotel(): Floor[] {
  const floors: Floor[] = [];

  // Floors 1-9: 10 rooms each
  for (let floor = 1; floor <= 9; floor++) {
    const rooms: Room[] = [];
    for (let roomNum = 1; roomNum <= 10; roomNum++) {
      const roomNumber = floor * 100 + roomNum;
      rooms.push({
        id: roomNumber,
        floor,
        roomNumber,
        isBooked: false,
      });
    }
    floors.push({ floorNumber: floor, rooms });
  }

  // Floor 10: 7 rooms (1001-1007)
  const floor10Rooms: Room[] = [];
  for (let roomNum = 1; roomNum <= 7; roomNum++) {
    const roomNumber = 1000 + roomNum;
    floor10Rooms.push({
      id: roomNumber,
      floor: 10,
      roomNumber,
      isBooked: false,
    });
  }
  floors.push({ floorNumber: 10, rooms: floor10Rooms });

  return floors;
}

/**
 * Calculates horizontal travel time (1 minute per room between adjacent rooms)
 */
export function calculateHorizontalTime(room1: number, room2: number, floor: number): number {
  const room1Num = floor === 10 
    ? room1 - 1000 
    : room1 % 100;
  const room2Num = floor === 10 
    ? room2 - 1000 
    : room2 % 100;
  
  return Math.abs(room1Num - room2Num);
}

/**
 * Calculates vertical travel time (2 minutes per floor)
 */
export function calculateVerticalTime(floor1: number, floor2: number): number {
  return Math.abs(floor1 - floor2) * 2;
}

/**
 * Calculates total travel time between two rooms
 */
export function calculateTravelTime(room1: Room, room2: Room): number {
  if (room1.floor === room2.floor) {
    // Same floor: only horizontal travel
    return calculateHorizontalTime(room1.roomNumber, room2.roomNumber, room1.floor);
  } else {
    // Different floors: go to stairs (left side), move vertically, then to destination room
    const verticalTime = calculateVerticalTime(room1.floor, room2.floor);
    const room1Pos = room1.floor === 10 ? room1.roomNumber - 1000 : room1.roomNumber % 100;
    const room2Pos = room2.floor === 10 ? room2.roomNumber - 1000 : room2.roomNumber % 100;
    
    // Time to go from room1 to stairs (position 0) + vertical travel + from stairs to room2
    return room1Pos + verticalTime + room2Pos;
  }
}

/**
 * Calculates total travel time for a set of rooms (time from first to last room)
 */
export function calculateTotalTravelTime(rooms: Room[]): number {
  if (rooms.length <= 1) return 0;
  
  const sortedRooms = [...rooms].sort((a, b) => {
    if (a.floor !== b.floor) {
      return a.floor - b.floor;
    }
    const posA = a.floor === 10 ? a.roomNumber - 1000 : a.roomNumber % 100;
    const posB = b.floor === 10 ? b.roomNumber - 1000 : b.roomNumber % 100;
    return posA - posB;
  });

  const firstRoom = sortedRooms[0];
  const lastRoom = sortedRooms[sortedRooms.length - 1];

  return calculateTravelTime(firstRoom, lastRoom);
}

