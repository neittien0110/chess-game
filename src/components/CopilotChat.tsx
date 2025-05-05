import React, { useState } from "react";

interface CopilotChatProps {
  moveAsk: string | undefined;
}


const CopilotChat: React.FC<CopilotChatProps> = ({moveAsk}) => {
  const [answer, setAnswer] = useState("");

  const askCopilot = async () => {

    
    try {
      const response = await fetch("https://copilot-api.example.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY",
        },
        body: JSON.stringify({ query: moveAsk }),
      });

      const data = await response.json();
      setAnswer(data.answer || "Không có phản hồi từ Copilot.");
    } catch (error) {
      setAnswer("Lỗi kết nối đến Copilot.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300, marginRight: 20 }}>
      <h3>Hỏi Copilot</h3>
      
      <textarea
        value={moveAsk}
        placeholder="Nhập câu hỏi..."
        style={{ width: "100%", height: 80, padding: 5, marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={askCopilot} style={{ padding: 5 }}>Gửi</button>
        <button onClick={copyToClipboard} style={{ padding: 5 }}>Copy</button>
      </div>      

      <textarea
        value={answer}
        readOnly
        placeholder="Câu trả lời sẽ hiển thị ở đây..."
        style={{ width: "100%", height: 100, padding: 5, marginTop: 10 }}
      />
    </div>
  );
};

export default CopilotChat;
