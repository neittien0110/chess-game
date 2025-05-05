import { Chess, Square } from "chess.js";

const chess = new Chess();

// Kiểm tra xem nước đi có hợp lệ không
export const isValidMove = (from: string, to: string) => {
  const moves = chess.moves({ square: from as Square, verbose: true });
  return moves.some((move) => move.to === to);
};

// Thực hiện nước đi
export const makeMove = (from: string, to: string) => {
  if (isValidMove(from, to)) {
    chess.move({ from, to });
    return true;
  }
  return false;
};

// Lấy trạng thái hiện tại của bàn cờ
export const getBoardState = () => chess.board();

export default chess;
