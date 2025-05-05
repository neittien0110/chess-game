import React, { useState } from "react";
import { makeMove } from "../utils/chessLogic";

interface MoveInputProps {
  // onMoveMade: () => void;
  onMoveMade: (from: string, to: string) => void 
}

const MoveInput: React.FC<MoveInputProps> = ({ onMoveMade }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div>
      <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Từ ô (ví dụ e2)..." />
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Đến ô (ví dụ e4)..." />
      <button onClick={() => onMoveMade(from, to)}>Di chuyển</button>
    </div>
  )
};

export default MoveInput;
