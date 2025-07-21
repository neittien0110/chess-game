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

import React, { ReactNode } from "react";

interface SquareProps {
  row: number;
  col: number;
  type?: string;
  color?: "w" | "b";
  children?: ReactNode;
}

const Square: React.FC<SquareProps> = ({ row, col, type, color, children }) => {
  const isDark = (row + col) % 2 === 1;
  const bgColor = isDark ? "brown" : "darkkhaki";

  return (
    <div
      style={{
        width: 70,
        height: 70,
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Square;
