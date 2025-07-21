/** @file 
 * @description Component MoveInput để nhập nước đi trong trò chơi cờ vua thông qua 2 textbox và nút Di chuyển.
 * Người dùng sẽ nhập ô xuất phát và ô đích của quân cờ, sau đó nhấn nút Di chuyển để thực hiện nước đi.
 * @external Sử dụng các hàm từ utils/chessLogic để xử lý nước đi.
 * @author Nguyen Duc Tien
 */
// MoveInput.tsx
import React, { useState, useEffect } from "react";

interface MoveInputProps {
  onMoveMade: (from: string, to: string) => void;
  fromValue: string; // Thêm prop để nhận giá trị từ App
  toValue: string;   // Thêm prop để nhận giá trị từ App
}

const MoveInput: React.FC<MoveInputProps> = ({ onMoveMade, fromValue, toValue }) => {
  const [from, setFrom] = useState(fromValue);
  const [to, setTo] = useState(toValue);

  // Sử dụng useEffect để cập nhật state cục bộ khi props thay đổi
  useEffect(() => {
    setFrom(fromValue);
  }, [fromValue]);

  useEffect(() => {
    setTo(toValue);
  }, [toValue]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn form submit gây reload trang
    if (from && to) {
      onMoveMade(from.toLowerCase(), to.toLowerCase()); // Chuyển sang chữ thường trước khi gửi
      // Không cần reset ở đây vì App sẽ reset sau khi nước đi được xử lý
    } else {
      alert("Vui lòng nhập cả ô xuất phát và ô đích.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, marginTop: 10 }}>
      <input
        type="text"
        placeholder="Từ (e.g., e2)"
        value={from} // Gắn giá trị từ state
        onChange={(e) => setFrom(e.target.value)}
        maxLength={2} // Chỉ cho phép 2 ký tự (ví dụ: a1, h8)
        style={{ width: 80, padding: 5 }}
      />
      <input
        type="text"
        placeholder="Đến (e.g., e4)"
        value={to} // Gắn giá trị từ state
        onChange={(e) => setTo(e.target.value)}
        maxLength={2}
        style={{ width: 80, padding: 5 }}
      />
      <button type="submit" style={{ padding: '5px 15px' }}>Di chuyển</button>
    </form>
  );
};

export default MoveInput;