import './ControlPanel.css';

interface ControlPanelProps {
  numRooms: number;
  onNumRoomsChange: (value: number) => void;
  onBook: () => void;
  onReset: () => void;
  onRandom: () => void;
}

export default function ControlPanel({
  numRooms,
  onNumRoomsChange,
  onBook,
  onReset,
  onRandom,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label htmlFor="numRooms">No of Rooms:</label>
        <input
          id="numRooms"
          type="number"
          min="1"
          max="5"
          value={numRooms}
          onChange={(e) => onNumRoomsChange(parseInt(e.target.value) || 1)}
          className="num-rooms-input"
        />
      </div>
      
      <button onClick={onBook} className="btn btn-primary">
        Book
      </button>
      
      <button onClick={onReset} className="btn btn-secondary">
        Reset
      </button>
      
      <button onClick={onRandom} className="btn btn-tertiary">
        Random
      </button>
    </div>
  );
}

