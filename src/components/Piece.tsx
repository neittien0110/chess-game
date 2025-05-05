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
        fontSize: 32,
        fontWeight: "bold",
        color: color === "w" ? "white" : "black",
      }}
    >
      {pieceSymbols[type] || "?"}
    </div>
  );
};

export default Piece;
