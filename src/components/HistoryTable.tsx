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
