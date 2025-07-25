// MoveInput.tsx
import React, { useState, useEffect } from "react";

interface MoveInputProps {
  onMoveMade: (from: string, to: string) => void;
  fromValue: string;
  toValue: string;
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
    event.preventDefault();
    if (from && to) {
      onMoveMade(from.toLowerCase(), to.toLowerCase());
      // Không cần reset ở đây vì App sẽ reset sau khi nước đi được xử lý
    } else {
      alert("Vui lòng nhập cả ô xuất phát và ô đích.");
    }
  };

  return (
    // Sử dụng class Bootstrap 'input-group' và 'mb-3' để nhóm input và nút
    <form onSubmit={handleSubmit} className="input-group mt-3">
      {/* Input 'Từ' với class 'form-control' */}
      <input
        type="text"
        className="form-control" // 'form-control' cho kiểu dáng input
        placeholder="Từ (e.g., e2)"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        maxLength={2}
      />
      {/* Input 'Đến' với class 'form-control' */}
      <input
        type="text"
        className="form-control" // 'form-control' cho kiểu dáng input
        placeholder="Đến (e.g., e4)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        maxLength={2}
      />
      {/* Nút Di chuyển với class 'btn' và 'btn-success' */}
      <button type="submit" className="btn btn-success">
        Di chuyển
      </button>
    </form>
  );
};

export default MoveInput;