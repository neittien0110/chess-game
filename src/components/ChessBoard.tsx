import React from "react";
import Square from "./Square";
import Piece from "./Piece";

interface SquareData {
  square: string;
  type: string;
  color: "w" | "b";
}

interface ChessBoardProps {
  board: (SquareData | null)[][];
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board }) => {
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
          {row.map((piece, colIndex) => (
            <Square key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex}>
              {piece && <Piece type={piece.type} color={piece.color} />}
            </Square>
          ))}

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
