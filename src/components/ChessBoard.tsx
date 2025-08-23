/** * @file Vẽ bàn cờ cờ vua với các ô và quân cờ
 * @description Component này hiển thị bàn cờ với các ô và quân cờ tương ứng.
 * Mỗi ô được đại diện bởi component Square, và mỗi quân cờ được đại diện by component Piece.
 * Bàn cờ được hiển thị với chỉ số cột (A-H) và chỉ số dòng (1-8) để người dùng dễ dàng nhận biết vị trí của các quân cờ.
 * @returns {JSX.Element} Bàn cờ cờ vua với các ô và quân cờ
 */
import React from "react";
import Square from "./Square";
import Piece from "./Piece";

interface SquareData {
  square: string;
  type: string;
  color: "w" | "b";
}

// Định nghĩa kiểu dữ liệu cho ô vuông được chọn
interface SelectedSquare {
  row: number;
  col: number;
  chessNotation: string;
}

interface ChessBoardProps {
  board: (SquareData | null)[][];
  // Thêm prop cho hàm xử lý click vào ô
  onSquareClick: (row: number, col: number) => void;
  // Thêm props để nhận thông tin ô đã được chọn
  selectedFrom: SelectedSquare | null;
  selectedTo: SelectedSquare | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  onSquareClick,
  selectedFrom,
  selectedTo,
}) => {
  const square_size = "10%";
  const note_font_size = "3.5vmin";
  const piece_font_size = "6vmin";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "90vmin",
        margin: "0 auto",
      }}
    >
      {/* Hiển thị chỉ số cột (A-H) */}
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: square_size }}></div>
        {[...Array(8)].map((_, col) => (
          <div key={`top-${col}`} style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: note_font_size }}>
            {String.fromCharCode(65 + col)}
          </div>
        ))}
        <div style={{ width: square_size }}></div>
      </div>
      
      {/* Hiển thị bàn cờ */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
          <div style={{ width: square_size, textAlign: "center", fontWeight: "bold", fontSize: note_font_size }}>
            {8 - rowIndex}
          </div>
          
          {row.map((piece, colIndex) => {
            const isSelectedFrom = selectedFrom?.row === rowIndex && selectedFrom?.col === colIndex;
            const isSelectedTo = selectedTo?.row === rowIndex && selectedTo?.col === colIndex;

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                onClick={onSquareClick}
                isHighlighted={isSelectedFrom || isSelectedTo}
                highlightColor={isSelectedFrom ? 'yellow' : 'blue'}
              >
                {piece && <Piece type={piece.type} color={piece.color} font_size={piece_font_size}/>}
              </Square>
            );
          })}
          
          <div style={{ width: square_size, textAlign: "center", fontWeight: "bold", fontSize: note_font_size }}>
            {8 - rowIndex}
          </div>
        </div>
      ))}
      
      {/* ... chỉ số dưới cùng ... */}
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: square_size }}></div>
        {[...Array(8)].map((_, col) => (
          <div key={`bottom-${col}`} style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: note_font_size }}>
            {String.fromCharCode(65 + col)}
          </div>
        ))}
        <div style={{ width: square_size }}></div>
      </div>
    </div>
  );
};

export default ChessBoard;