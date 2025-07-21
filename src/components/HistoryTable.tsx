/** 
 * @file Vẽ lịch sử nước đi trong trò chơi cờ vua.
 * @description Component này hiển thị lịch sử các nước đi đã thực hiện trong trò chơi cờ vua.
 * Nó nhận vào một mảng các nước đi và hiển thị chúng trong một bảng.
 * Mỗi nước đi được hiển thị với lượt đi và mô tả nước đi, trong 1 dòng.
 * @returns {JSX.Element} Bảng lịch sử nước đi.
 */

import React from "react";

interface HistoryTableProps {
  moveHistory: string[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ moveHistory }) => {
  return (
    <div style={{ marginLeft: 20 }}>
      <h3>Lịch sử nước đi</h3>
      <table border={1} style={{ borderCollapse: "collapse", width: "200px" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Lượt</th>
            <th>Quân cờ</th>
            <th>Nước đi</th>
          </tr>
        </thead>
        <tbody>
          {moveHistory.map((moveString, index) => {
          const parts = moveString.split(': '); // Tách chuỗi thành 3 phần: "w" hoặc "b", "k"|"n",  và "e2 → e4"
          const turnIndicator = parts[0]; // "w" hoặc "b"
          const pieceType = parts[1]; // "P" hoặc "N" hoặc "B" hoặc "R" hoặc "Q" hoặc "K"
          const actualMove = parts[2];   // "e2 → e4"

          const displayTurn = turnIndicator === 'w' ? 'Trắng' : 'Đen';

          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{displayTurn}</td> {/* Cột cho lượt đi */}
              <td>{pieceType}</td>    {/* Cột cho loại quân cờ */}
              <td>{actualMove}</td>    {/* Cột cho nước đi */}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
