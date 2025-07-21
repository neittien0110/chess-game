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
            <th>Lượt</th>
            <th>Nước đi</th>
          </tr>
        </thead>
        <tbody>
          {moveHistory.map((move, index) => (
             <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2" }}>
              <td>{index + 1}</td>
              <td>{move}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
