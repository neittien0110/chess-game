// App.tsx
import React, { useState, useEffect } from "react";
import ChessBoard from "./components/ChessBoard";
import MoveInput from "./components/MoveInput";
import { getBoardState, makeMove } from "./utils/chessLogic";
import HistoryTable from "./components/HistoryTable";
import CopilotChat, {SHORT_ANS_TEXT} from "./components/CopilotChat";

interface SelectedSquare {
  row: number;
  col: number;
  chessNotation: string;
}

const App: React.FC = () => {
  const [board, setBoard] = useState(getBoardState());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [moveAsk, setMoveAsk] = useState<string | undefined>();
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w");
  const [isShortAns, setShortAns] = useState<boolean>(true);
  const [selectedFrom, setSelectedFrom] = useState<SelectedSquare | null>(null);
  const [selectedTo, setSelectedTo] = useState<SelectedSquare | null>(null);
  const [allowAskAI, setAllowAskAI] = useState<boolean>(true);
  
  // ✅ Thêm state mới cho thông báo lỗi
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateBoard = (from: string, to: string) => {
    // ✅ Xóa thông báo lỗi cũ mỗi khi người dùng thực hiện nước đi mới
    setErrorMessage(null);

    if (makeMove(from, to)) {
      setSelectedFrom(null);
      setSelectedTo(null);
      const newBoardState = getBoardState();
      setBoard(newBoardState);

      const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
      const fromRow = 8 - parseInt(from.charAt(1));
      let clickedPiece: string;
      switch (board[fromRow][fromCol]?.type) {
        case "p": clickedPiece = "Tốt"; break;
        case "r": clickedPiece = "Xe"; break;
        case "n": clickedPiece = "Mã"; break;
        case "b": clickedPiece = "Tượng"; break;
        case "q": clickedPiece = "Hậu"; break;
        case "k": clickedPiece = "Vua"; break;
        default: clickedPiece = "Không xác định";
      }

      setMoveHistory(prevHistory => [...prevHistory, `${currentTurn}: ${clickedPiece}: ${from} → ${to}`]);
      setCurrentTurn(prevTurn => (prevTurn === "w" ? "b" : "w"));
      setMoveAsk(prevAsk => (currentTurn === "b")
        ? ((prevAsk || "") + `. Sau đó, quân đen đối phương di chuyển quân từ ${from} tới ${to}. Tôi có thể làm gì tiếp theo? ` + ((isShortAns)?SHORT_ANS_TEXT:"")) 
        : (`Tôi, quân trắng, di chuyển quân từ ${from} tới ${to}.`)
      );
      // Nếu là quân đen vừa đi thì hỏi AI.
      setAllowAskAI(currentTurn === "b");
    } else {
      // ✅ Thay thế alert() bằng việc cập nhật state lỗi
      setErrorMessage("Nước đi không hợp lệ. Vui lòng kiểm tra lại.");
      setSelectedFrom(null);
      setSelectedTo(null);
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    // ✅ Xóa thông báo lỗi khi người dùng bắt đầu một lượt click mới
    setErrorMessage(null);
    const chessCol = String.fromCharCode(65 + col).toLowerCase();
    const chessRow = 8 - row;
    const chessNotation = `${chessCol}${chessRow}`;

    if (!selectedFrom) {
      setSelectedFrom({ row, col, chessNotation });
      setSelectedTo(null);
    } else if (selectedFrom.row === row && selectedFrom.col === col) {
      setSelectedFrom(null);
      setSelectedTo(null);
    } else {
      setSelectedTo({ row, col, chessNotation });
      if (selectedFrom.chessNotation && chessNotation) {
        updateBoard(selectedFrom.chessNotation, chessNotation);
      }
    }
  };

  useEffect(() => {
    console.log('Component App đã được mount.');
    setMoveAsk("Một bàn cờ vua ở trạng thái bắt đầu. Tôi là quân trắng và bắt đầu di chuyển quân. Hãy xác nhận đã hiểu và không cần làm gì thêm.");
    return () => {
      console.log('Component App sẽ unmount hoặc effect sẽ chạy lại.');
    };
  }, []);

  return (
  <div className="container-fluid my-4">
    <h2 className="text-center mb-4">Trò chơi Cờ vua</h2>
    <div className="d-flex flex-wrap justify-content-center align-items-start">
      <div className="col-lg-3 col-md-5 mb-3 d-flex justify-content-center">
        <CopilotChat moveAsk={moveAsk} setMoveAsk={setMoveAsk} isShortAns={isShortAns} setShortAns={setShortAns} allowAskAI={allowAskAI} setAllowAskAI={setAllowAskAI} />
      </div>
      <div className="col-lg-auto col-md-auto mb-3 d-flex flex-column align-items-center">
        <ChessBoard
          board={board}
          onSquareClick={handleSquareClick}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
        />
        <div className="mt-4 text-center">
          Lượt đi: {currentTurn === "w" ? "Trắng" : "Đen"}
          <MoveInput
            onMoveMade={updateBoard}
            fromValue={selectedFrom?.chessNotation || ''}
            toValue={selectedTo?.chessNotation || ''}
          />
        </div>
      </div>
      {/* ✅ Bọc thông báo lỗi và bảng lịch sử vào một container Flexbox theo cột */}
      <div className="col-lg-3 col-md-5 mb-3">
        <div className="d-flex flex-column" style={{ width: '100%' }}>
          <div className="mb-3 text-center" style={{ color: 'red', fontWeight: 'bold', height: "30px" }}>
            {errorMessage}
         </div>
          <HistoryTable moveHistory={moveHistory} />
        </div>
      </div>
    </div>
  </div>
);
}

export default App;