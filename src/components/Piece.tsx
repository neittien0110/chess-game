import React from "react";

interface PieceProps {
  type: string;
  color: "w" | "b";
  font_size?: string;
}

const Piece: React.FC<PieceProps> = ({ type, color }) => {
  const pieceFileNames: Record<string, string> = {
    'p': 'pawn',
    'r': 'rook',
    'n': 'knight',
    'b': 'bishop',
    'q': 'queen',
    'k': 'king'
  };

  const getImageSrc = () => {
    const pieceName = pieceFileNames[type.toLowerCase()];
    const folderName = color === "w" ? "white" : "black";
    
    if (!pieceName) {
      console.error(`Không tìm thấy tên file cho loại quân cờ: ${type}`);
      return "";
    }

    return require(`../../assets/${folderName}/${pieceName}.png`);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={getImageSrc()}
        alt={`${color === 'w' ? 'Quân trắng' : 'Quân đen'} ${type}`}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Piece;