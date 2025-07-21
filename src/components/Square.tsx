/** 
 * @file src/components/Square.tsx 
 * @description Component Square đại diện cho một ô vuông trên bàn cờ vua.
 * Nó có thể chứa quân cờ và có thể được tô màu khác nhau tùy thuộc vào vị trí của nó.
 * @param row Số hàng của ô (0-7)
 * @param col Số cột của ô (0-7)
 * @param type Loại quân cờ (nếu có), ví dụ: "pawn", "rook", "knight", "bishop", "queen", "king"
 * @param color Màu của quân cờ, có thể là "w" (  trắng) hoặc "b" (đen)
 * @param children Nội dung con (có thể là quân cờ hoặc các thành phần khác)
 * @returns JSX Element đại diện cho ô vuông trên bàn cờ. 
 */

// Square.tsx
import React from "react";

interface SquareProps {
  row: number;
  col: number;
  children?: React.ReactNode;
  onClick?: (row: number, col: number) => void;
  isHighlighted?: boolean; // Thêm prop để highlight
  highlightColor?: string; // Thêm prop cho màu highlight
}

const Square: React.FC<SquareProps> = ({
  row,
  col,
  children,
  onClick,
  isHighlighted,
  highlightColor = 'yellow' // Mặc định màu highlight
}) => {
  const isLight = (row + col) % 2 === 0;
  const baseBackgroundColor = isLight ? "#f0d9b5" : "#b58863"; // Màu gỗ sáng và tối

  // Áp dụng màu highlight nếu ô được highlight
  const backgroundColor = isHighlighted ? highlightColor : baseBackgroundColor;

  const handleClick = () => {
    if (onClick) {
      onClick(row, col);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 70,
        height: 70,
        backgroundColor: backgroundColor, // Sử dụng màu đã xác định (có thể là highlight)
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        border: "1px solid #888",
        // Thêm hiệu ứng viền hoặc bóng đổ nhẹ khi được highlight để dễ nhìn hơn
        boxShadow: isHighlighted ? '0 0 0 3px rgba(0, 0, 0, 0.5) inset' : 'none',
        transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default Square;