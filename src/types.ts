export interface Room {
  id: number;
  floor: number;
  roomNumber: number;
  isBooked: boolean;
}

export interface Floor {
  floorNumber: number;
  rooms: Room[];
}

