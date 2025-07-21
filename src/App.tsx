import React, { useState, useEffect } from "react";
import ChessBoard from "./components/ChessBoard";             // Logic của trò chơi cờ vua với 2 tham số riêng: from và to
import MoveInput from "./components/MoveInput";
import { getBoardState, makeMove } from "./utils/chessLogic";
import HistoryTable from "./components/HistoryTable";
import CopilotChat from "./components/CopilotChat";

const App: React.FC = () => {
  const [board, setBoard] = useState(getBoardState());    /// Trạng thái của 64 ô trên bàn cờ hiện tại, phục vụ cho việc hiển thị
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [moveAsk, setMoveAsk] = useState<string>();
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w"); // Trắng đi trước
  
  /**
   *  Hàm cập nhật bàn cờ khi có nước đi mới
   * @description Hàm này sẽ được gọi khi người dùng nhập nước đi và nhấn nút Di chuyển.
   * Nó sẽ kiểm tra tính hợp lệ của nước đi, cập nhật trạng thái bàn cờ, lịch sử nước đi,
   * và chuyển lượt đi.     
   * @param from Vị trí ô xuất phát (ví dụ e2)
   * @param to Vị trí ô đích (ví dụ e4)
   * @callback onMoveMade Hàm callback để thông báo nước đi, được gọi từ component MoveInput.
   */
  const updateBoard = (from: string, to: string) => {
    
    if (makeMove(from, to)) { 
      //-----------------------------------------------------------------
      // Nếu nước đi hợp lệ thì cập nhật luôn vào handler logic trò chơi và tiếp tục xử lý hậu quả...
      //-----------------------------------------------------------------

      // Lấy trạng thái hiện tại của tất cả các ô trên bàn cờ, được cập nhật sớm bởi component MoveInput
      const newBoardState = getBoardState(); 
      // Cập nhật bàn cờ vào biến state, để dành cho compoent ChessBoard hiển thị
      setBoard(newBoardState); 
      
      // Cập nhật lịch sử nước đi bằng cách thêm nước đi mới vào cuối mảng lịch sử, để component HistoryTable hiển thị 
      setMoveHistory(prevHistory => [...prevHistory, `${from} → ${to}`]); 
      
      // Xác định việc chuyển lượt đi giữa quân Trắng và quân Đen
      setCurrentTurn(prevTurn => (prevTurn === "w" ? "b" : "w"));
      
      // Cập nhật câu hỏi promt cho AI Chat
      setMoveAsk(prevAsk =>  (currentTurn === "b")
                ?(prevAsk + `. Sau đó, quân đen đối phương di chuyển quân từ ${from} tới ${to}. Tôi có thể làm gì tiếp theo?`)
                :(`Tôi, quân trắng, di chuyển quân từ ${from} tới ${to}`)
      ); 
    } else {
      // Nếu nước đi không hợp lệ, có thể hiển thị thông báo lỗi hoặc làm gì đó khác
      alert("Nước đi không hợp lệ. Vui lòng kiểm tra lại.");
    }
  };

  
  // Hàm này sẽ được gọi khi component được mount hoặc khi có sự thay đổi trong mảng dependencies
  // Tương đương với hàm onload trong các framework khác
  useEffect(() => {
    // Đây là phần tương đương với hàm onload
    console.log('Component App đã được mount.');

    /// Promt để khởi tạo một ván cờ mới
    setMoveAsk("Một bàn cờ vua ở trạng thái bắt đầu. Tôi là quân trắng và bắt đầu di chuyển quân. Hãy xác nhận đã hiểu và không cần làm gì thêm.")
    
    // Cleanup function (tùy chọn): được chạy khi component unmount hoặc trước khi effect chạy lại
    return () => {
      console.log('Component App sẽ unmount hoặc effect sẽ chạy lại.');
      // Thực hiện các tác vụ cleanup nếu cần
    };
  }, []); // Mảng dependencies rỗng [] có nghĩa là effect này chỉ chạy một lần sau lần render đầu tiên (tương tự onload)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",  }}>
      <h1>Trò chơi Cờ vua</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

        {/* Hiển thị AI Chat bên trái, với lời promt ở biến moveAsk */}
        <CopilotChat moveAsk={moveAsk}/> 
        <div>
          {/* Vẽ bàn cờ, dựa trên danh sách trong mảng các quân cờ board */}
          <ChessBoard board={board} />

          {/* Hiển thị 2 textbox di chuyển và nút Di chuyển, với tham số vào là hàm call back updateBoard */}
          <div style={{ marginTop: 20 }}>Lượt đi: {currentTurn === "w" ? "Trắng" : "Đen"}
            <MoveInput onMoveMade={(from, to) => updateBoard(from, to)} />
          </div>
        </div>

        {/* Vẽ bảng lịch sử nước di chuyển, dựa trên danh sách trong mảng moveHistory */}
        <HistoryTable moveHistory={moveHistory} /> {/* Hiển thị lịch sử nước đi bên phải */}        

      </div>      
    </div>
  );
};

export default App;
