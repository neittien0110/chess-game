import React, { useState, useEffect } from "react";
import ChessBoard from "./components/ChessBoard";
import MoveInput from "./components/MoveInput";
import { getBoardState, makeMove } from "./utils/chessLogic";
import HistoryTable from "./components/HistoryTable";
import CopilotChat from "./components/CopilotChat";

const App: React.FC = () => {
  const [board, setBoard] = useState(getBoardState());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [moveAsk, setMoveAsk] = useState<string>();
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w"); // Trắng đi trước
  
  const updateBoard = (from: string, to: string) => {
    if (makeMove(from, to)) {
      const newBoardState = getBoardState(); // Lấy trạng thái mới của bàn cờ
      setBoard(newBoardState); // Cập nhậ t bàn cờ
      setMoveHistory(prevHistory => [...prevHistory, `${from} → ${to}`]); // Ghi nhận lịch sử nước đi    
      setCurrentTurn(prevTurn => (prevTurn === "w" ? "b" : "w")); // Chuyển lượt
      setMoveAsk(prevAsk =>  (currentTurn === "b")
                ?(prevAsk + `. Sau đó, đối phương di chuyển quân từ ${from} tới ${to}. Tôi có thể làm gì tiếp theo?`)
                :(`Tôi di chuyển quân từ ${from} tới ${to}`)
      ); // Cập nhật câu hỏi cho Copilot Chat 
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",  }}>
      <h1>Trò chơi Cờ vua</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
         <CopilotChat moveAsk={moveAsk}/> {/* Hiển thị Copilot Chat bên trái */}
        <div>
          {/* khi gọi ChessBoard, truyền setMoveHistory để việc update Board thì triệu gọi cập nhật Lịch sử */}
          <ChessBoard board={board} />
          <div style={{ marginTop: 20 }}>Lượt đi: {currentTurn === "w" ? "Trắng" : "Đen"}
            <MoveInput onMoveMade={(from, to) => updateBoard(from, to)} />
          </div>
        </div>
        {/* Truyền moveHistory từ App.tsx xuống HistoryTable.tsx */}
        <HistoryTable moveHistory={moveHistory} /> {/* Hiển thị lịch sử nước đi bên phải */}        
      </div>      
    </div>
  );
};

export default App;
