import React, { useState } from "react";
import { makeMove } from "../utils/chessLogic";

interface MoveInputProps {
  onMoveMade: () => void;
}

const MoveInput: React.FC<MoveInputProps> = ({ onMoveMade }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleMove = () => {
    if (makeMove(from, to)) {
      onMoveMade();
      setFrom("");
      setTo("");
    } else {
      alert("Nước đi không hợp lệ!");
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Từ (ví dụ: e2)" 
        value={from} 
        onChange={(e) => setFrom(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Đến (ví dụ: e4)" 
        value={to} 
        onChange={(e) => setTo(e.target.value)} 
      />
      <button onClick={handleMove}>Di chuyển</button>
    </div>
  );
};

export default MoveInput;
