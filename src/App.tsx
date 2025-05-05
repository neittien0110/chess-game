import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import MoveInput from "./components/MoveInput";
import { getBoardState, makeMove } from "./utils/chessLogic";
import HistoryTable from "./components/HistoryTable";

const App: React.FC = () => {
  const [board, setBoard] = useState(getBoardState());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);


  const updateBoard = (from: string, to: string) => {
    if (makeMove(from, to)) {
      const newBoardState = getBoardState(); // Lấy trạng thái mới của bàn cờ
      setBoard(newBoardState); // Cập nhật bàn cờ
      setMoveHistory(prevHistory => [...prevHistory, `${from} → ${to}`]); // Ghi nhận lịch sử nước đi    
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",  }}>
      <h1>Trò chơi Cờ vua</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div>
          {/* khi gọi ChessBoard, truyền setMoveHistory để việc update Board thì triệu gọi cập nhật Lịch sử */}
          <ChessBoard board={board} />
          <MoveInput onMoveMade={(from, to) => updateBoard(from, to)} />
        </div>
        {/* Truyền moveHistory từ App.tsx xuống HistoryTable.tsx */}
        <HistoryTable moveHistory={moveHistory} /> {/* Hiển thị lịch sử nước đi bên phải */}        
      </div>      
    </div>
  );
};

export default App;
