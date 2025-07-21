/** 
 * @file Hiển thị quan cờ trong bàn cờ vua
 * @description Component này nhận vào loại quân cờ (type) và màu sắc (color) để hiển thị biểu tượng tương ứng.
 * @example <Piece type="p" color="w" /> // Hiển thị quân Tốt trắng
 * @example <Piece type="k" color="b" /> // Hiển thị quân Vua đen
 * @see pieceSymbols Đối tượng ánh xạ loại quân cờ với biểu tượng Unicode tương ứng.
  */

import React from "react";

interface PieceProps {
  type: string;
  color: "w" | "b"; // 'w' = trắng, 'b' = đen
}

const Piece: React.FC<PieceProps> = ({ type, color }) => {
  const pieceSymbols: Record<string, string> = {
    p: "♙", // Tốt
    r: "♖", // Xe
    n: "♘", // Mã
    b: "♗", // Tượng
    q: "♕", // Hậu
    k: "♔", // Vua
  };

  return (
    <div
      style={{
        fontSize: 65,
        fontWeight: "bold",
        color: color === "w" ? "white" : "black",
      }}
    >
      {pieceSymbols[type] || "?"}
    </div>
  );
};

export default Piece;
