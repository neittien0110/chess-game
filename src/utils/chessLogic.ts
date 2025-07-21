/**
 * @file Đóng gói logic của trò chơi cờ vua với 2 tham số riêng: from và to 
 * @description Module chessLogic chứa các hàm xử lý logic của trò chơi cờ vua.  
 * @external Sử dụng thư viện chess.js để quản lý trạng thái bàn cờ và các nước đi.
*/

import { Chess, Square } from "chess.js";

const chess = new Chess();

/**
 * Kiểm tra xem nước đi có hợp lệ không
 * @param from Vị trí ô xuất phát (ví dụ e2)
 * @param to Vị trí ô đích (ví dụ e4)
 * @returns {boolean} Trả về true nếu nước đi hợp lệ, ngược lại false
 */
export const isValidMove = (from: string, to: string) => {
  const moves = chess.moves({ square: from as Square, verbose: true });
  return moves.some((move) => move.to === to);
};


/**
 * Ghi nhận nước cờ vào đối tượng chess.js để xử lý logic toàn bộ hoạt động của ván cờ
 * @param from  Vị trí ô xuất phát (ví dụ e2)
 * @param to  Vị trí ô đích (ví dụ e4)
 * @returns {boolean} Trả về true nếu nước đi hợp lệ và đã được thực hiện, ngược lại false
  */
export const makeMove = (from: string, to: string) => {
  if (isValidMove(from, to)) {
    chess.move({ from, to });
    return true;
  }
  return false;
};

/**
 * @returns Mảng trạng thái hiện tại của tất cả các quân cờ trên bàn cờ.
 */
export const getBoardState = () => chess.board();

export default chess;
