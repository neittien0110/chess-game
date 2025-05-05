import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import MoveInput from "./components/MoveInput";
import { getBoardState } from "./utils/chessLogic";

const App: React.FC = () => {
  const [board, setBoard] = useState(getBoardState());

  const updateBoard = () => {
    setBoard(getBoardState());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Trò chơi Cờ vua</h1>
      <ChessBoard board={board} />
      <MoveInput onMoveMade={updateBoard} />
    </div>
  );
};

export default App;
