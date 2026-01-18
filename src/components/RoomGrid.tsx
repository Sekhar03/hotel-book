import { Floor } from '../types';
import './RoomGrid.css';

interface RoomGridProps {
  floors: Floor[];
}

export default function RoomGrid({ floors }: RoomGridProps) {
  return (
    <div className="room-grid-container">
      <div className="stairs-indicator">
        <div className="stairs-label">Stairs/Lift</div>
      </div>
      
      <div className="floors-container">
        {floors.map((floor) => (
          <div key={floor.floorNumber} className="floor">
            <div className="floor-label">Floor {floor.floorNumber}</div>
            <div className="rooms-row">
              {floor.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`room ${room.isBooked ? 'booked' : 'available'}`}
                  title={`Room ${room.roomNumber} - Floor ${room.floor} - ${room.isBooked ? 'Booked' : 'Available'}`}
                >
                  {room.roomNumber}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

