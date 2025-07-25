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
    // Sử dụng class Bootstrap 'card' và 'p-3'
    <div className="card p-3 shadow-sm">
      {/* Tiêu đề với class 'card-title' và 'mb-3' */}
      <h3 className="card-title mb-3">Lịch sử nước đi</h3>
      {/* Áp dụng các class Bootstrap cho bảng: 'table', 'table-bordered', 'table-hover', 'table-sm' */}
      <div className="table-responsive"> {/* Đảm bảo bảng responsive trên thiết bị nhỏ */}
        <table className="table table-striped table-bordered table-hover table-sm ">
          <thead className="table-light">
            <tr>
              <th>STT</th>
              <th>Lượt</th>
              <th>Quân cờ</th>
              <th>Nước đi</th>
            </tr>
          </thead>
          <tbody>
            {moveHistory.map((moveString, index) => {
              const parts = moveString.split(': ');
              const turnIndicator = parts[0];
              const pieceType = parts[1];
              const actualMove = parts[2];

              const displayTurn = turnIndicator === 'w' ? 'Trắng' : 'Đen';

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{displayTurn}</td>
                  <td>{pieceType}</td>
                  <td>{actualMove}</td>
                </tr>
              );
            })}
            {moveHistory.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted">Chưa có nước đi nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HistoryTable;
