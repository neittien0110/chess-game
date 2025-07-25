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
      <h3 className="card-title mb-3">Mã nguồn</h3>
      <a className="icon-link" href="https://github.com/neittien0110/chess-game">
        <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
        </svg>
        GitHub
      </a>
      <br/>
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
