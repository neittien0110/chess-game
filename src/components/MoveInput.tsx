/** @file 
 * @description Component MoveInput để nhập nước đi trong trò chơi cờ vua thông qua 2 textbox và nút Di chuyển.
 * Người dùng sẽ nhập ô xuất phát và ô đích của quân cờ, sau đó nhấn nút Di chuyển để thực hiện nước đi.
 * @external Sử dụng các hàm từ utils/chessLogic để xử lý nước đi.
 * @author Nguyen Duc Tien
 */

import React, { useState } from "react";

interface MoveInputProps {
  onMoveMade: (from: string, to: string) => void 
}

const MoveInput: React.FC<MoveInputProps> = ({ onMoveMade }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div>
      <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Từ ô (ví dụ e2)..." />
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Đến ô (ví dụ e4)..." />
      <button onClick={() => onMoveMade(from, to)}>Di chuyển</button>
    </div>
  )
};

export default MoveInput;
