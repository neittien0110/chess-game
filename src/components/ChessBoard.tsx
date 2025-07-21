/** 
 * @file Vẽ bàn cờ cờ vua với các ô và quân cờ
 * @description Component này hiển thị bàn cờ với các ô và quân cờ tương ứng.
 * Mỗi ô được đại diện bởi component Square, và mỗi quân cờ được đại diện by component Piece.
 * Bàn cờ được hiển thị với chỉ số cột (A-H) và chỉ số dòng (1-8) để người dùng dễ dàng nhận biết vị trí của các quân cờ.
 * @returns {JSX.Element} Bàn cờ cờ vua với các ô và  quân cờ
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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Hiển thị chỉ số cột (A-H) trên cùng */}
      <div style={{ display: "flex" }}>
        <div style={{ width: 30 }}></div> {/* Ô trống để căn chỉnh */}
        {[...Array(8)].map((_, col) => (
          <div key={`top-${col}`} style={{ width: 70, textAlign: "center", fontWeight: "bold" }}>
            {String.fromCharCode(65 + col)}
          </div>
        ))}
        <div style={{ width: 30 }}></div> {/* Ô trống bên phải */}
      </div>

      {/* Hiển thị bàn cờ với chỉ số dòng và cột */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", alignItems: "center" }}>
          {/* Hiển thị số dòng (1-8) bên trái */}
          <div style={{ width: 30, textAlign: "center", fontWeight: "bold" }}>{8 - rowIndex}</div>

          {/* Hiển thị các ô của bàn cờ */}
          {row.map((piece, colIndex) => {
            // Xác định xem ô hiện tại có phải là ô selectedFrom hay selectedTo không
            const isSelectedFrom =
              selectedFrom?.row === rowIndex && selectedFrom?.col === colIndex;
            const isSelectedTo = selectedTo?.row === rowIndex && selectedTo?.col === colIndex;

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                onClick={onSquareClick} // Truyền hàm onSquareClick xuống Square
                // Thêm prop `isHighlighted` cho `Square` để làm nổi bật ô
                isHighlighted={isSelectedFrom || isSelectedTo}
                highlightColor={isSelectedFrom ? 'yellow' : 'blue'} // Màu highlight khác nhau cho from/to
              >
                {piece && <Piece type={piece.type} color={piece.color} />}
              </Square>
            );
          })}

          {/* Hiển thị số dòng (1-8) bên phải */}
          <div style={{ width: 30, textAlign: "center", fontWeight: "bold" }}>{8 - rowIndex}</div>
        </div>
      ))}

      {/* Hiển thị chỉ số cột (A-H) bên dưới */}
      <div style={{ display: "flex" }}>
        <div style={{ width: 30 }}></div> {/* Ô trống bên trái */}
        {[...Array(8)].map((_, col) => (
          <div key={`bottom-${col}`} style={{ width: 70, textAlign: "center", fontWeight: "bold" }}>
            {String.fromCharCode(65 + col)}
          </div>
        ))}
        <div style={{ width: 30 }}></div> {/* Ô trống bên phải */}
      </div>
    </div>
  );
};

export default ChessBoard;