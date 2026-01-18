import { Room, Floor } from '../types';
import { calculateTotalTravelTime } from './roomUtils';

/**
 * Finds the best combination of rooms on a single floor
 */
function findBestOnSameFloor(
  availableRooms: Room[],
  count: number
): Room[] | null {
  if (availableRooms.length < count) return null;

  // Get all combinations of 'count' consecutive or close rooms
  const maxRooms = availableRooms.length;
  let bestCombination: Room[] | null = null;
  let minTravelTime = Infinity;

  // Try all possible combinations
  for (let start = 0; start <= maxRooms - count; start++) {
    const combination = availableRooms.slice(start, start + count);
    const travelTime = calculateTotalTravelTime(combination);
    
    if (travelTime < minTravelTime) {
      minTravelTime = travelTime;
      bestCombination = combination;
    }
  }

  return bestCombination;
}

/**
 * Finds the best combination across multiple floors
 */
function findBestAcrossFloors(
  floors: Floor[],
  count: number
): Room[] | null {
  const availableRooms: Room[] = [];
  
  // Collect all available rooms
  for (const floor of floors) {
    for (const room of floor.rooms) {
      if (!room.isBooked) {
        availableRooms.push(room);
      }
    }
  }

  if (availableRooms.length < count) return null;

  let bestCombination: Room[] | null = null;
  let minTravelTime = Infinity;

  // Sort rooms by floor and position
  const sortedRooms = [...availableRooms].sort((a, b) => {
    if (a.floor !== b.floor) {
      return a.floor - b.floor;
    }
    const posA = a.floor === 10 ? a.roomNumber - 1000 : a.roomNumber % 100;
    const posB = b.floor === 10 ? b.roomNumber - 1000 : b.roomNumber % 100;
    return posA - posB;
  });

  // Strategy 1: Try consecutive groups in sorted order (rooms close together)
  for (let start = 0; start <= sortedRooms.length - count; start++) {
    const candidate = sortedRooms.slice(start, start + count);
    const travelTime = calculateTotalTravelTime(candidate);
    if (travelTime < minTravelTime) {
      minTravelTime = travelTime;
      bestCombination = candidate;
    }
  }

  // Strategy 2: For small sets, try all combinations to ensure optimal solution
  if (availableRooms.length <= 20 && count <= 5) {
    function generateCombinations(rooms: Room[], start: number, current: Room[]) {
      if (current.length === count) {
        const travelTime = calculateTotalTravelTime(current);
        if (travelTime < minTravelTime) {
          minTravelTime = travelTime;
          bestCombination = [...current];
        }
        return;
      }

      if (start >= rooms.length) return;

      for (let i = start; i < rooms.length; i++) {
        current.push(rooms[i]);
        generateCombinations(rooms, i + 1, current);
        current.pop();
      }
    }
    generateCombinations(sortedRooms, 0, []);
  }

  return bestCombination;
}

/**
 * Main booking algorithm that finds optimal rooms based on the rules:
 * 1. Priority: same floor first
 * 2. If not available on same floor, minimize total travel time
 */
export function findOptimalRooms(floors: Floor[], count: number): Room[] | null {
  if (count <= 0 || count > 5) return null;

  // First, try to find rooms on the same floor
  for (const floor of floors) {
    const availableOnFloor = floor.rooms.filter(room => !room.isBooked);
    if (availableOnFloor.length >= count) {
      const bestOnFloor = findBestOnSameFloor(availableOnFloor, count);
      if (bestOnFloor) {
        return bestOnFloor;
      }
    }
  }

  // If not available on same floor, find across floors minimizing travel time
  return findBestAcrossFloors(floors, count);
}

