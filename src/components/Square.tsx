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
  const bgColor = isDark ? "brown" : "beige";

  return (
    <div
      style={{
        width: 50,
        height: 50,
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
