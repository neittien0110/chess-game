import React, { useState } from "react";
// components/Model.jsx
const { GoogleGenerativeAI } = require("@google/generative-ai"); 

interface CopilotChatProps {
  moveAsk: string | undefined;
}

const genAI = new GoogleGenerativeAI("AIzaSyBb4JF9r0kcncypDYb-wjeBO1LZ7ec8jFM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const CopilotChat: React.FC<CopilotChatProps> = ({moveAsk}) => {
  const [answer, setAnswer] = useState("");


  /**
   * Hàm xử lý sự kiện khi nút bấm Hỏi Copilot được nhấn.
   * @description Gửi yêu cầu đến Copilot API và hiển thị phản hồi trong textbox.  
   * @requires    CHƯA HOẠT ĐỘNG
   * @returns 
   */  
  async function askCopilot() {
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

  /**
   * Hàm xử lý sự kiện khi nút bấm Hỏi Gemini được nhấn.
   * @description Gửi yêu cầu đến Gemini API và hiển thị phản hồi trong textbox.
   * @remark  PROMT: hãy sinh một đoạn mã typescript cho hàm sự kiện onlick của 1 nút bấm sao cho sẽ lấy nội dung trong 1 textbox có id="mypromt" và gửi nội dung đó tới Gemini API. Sau khi nhận được nội dung thì ghi vào textbox có id="airesponse"
   * @returns 
   */
  async function askGemini() {
    const promptTextbox = document.getElementById("mypromt") as HTMLTextAreaElement;
    const responseTextbox = document.getElementById("airesponse") as HTMLTextAreaElement;
    if (!promptTextbox) {
      console.error("Không tìm thấy textbox có id 'mypromt'");
      return;
    }    
    if (!responseTextbox) {
      console.error("Không tìm thấy textbox có id 'airesponse'.");
      return;
    }

    const prompt = promptTextbox.value;

    // **Quan trọng:** Thay thế 'YOUR_GEMINI_API_KEY' bằng API key thực tế của bạn.
    const apiKey:string = 'AIzaSyB-FXF7hiNvyALzhlPFNKtpmCwv-PQ-Pyg';
    const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });
  
      if (!response.ok) {
        console.error(`Lỗi khi gọi Gemini API: ${response.status} - ${response.statusText}`);
        responseTextbox.value = `Đã xảy ra lỗi khi giao tiếp với AI: ${response.statusText}`;
        return;
      }
  
      const data = await response.json();
      console.log("Dữ liệu nhận từ Gemini API:", data);
  
      // Xử lý phản hồi từ Gemini API để lấy nội dung
      if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        responseTextbox.value = data.candidates[0].content.parts[0].text;
      } else {
        responseTextbox.value = "Không nhận được phản hồi hợp lệ từ AI.";
      }
  
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      responseTextbox.value = `Đã xảy ra lỗi: ${error}`;
    }
  }

  /**
   * Sao chép nội dung của textbox vào clipboard
   * @param {string} id - ID của textbox cần sao chép
   */
  function copyToClipboard() {
    const textbox = document.getElementById("mypromt") as HTMLTextAreaElement;
    if (textbox) {
      const textToCopy = textbox.value;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Đã sao chép vào clipboard!');
          // Bạn có thể thêm thông báo cho người dùng ở đây nếu muốn
        })
        .catch(err => {
          console.error('Không thể sao chép vào clipboard: ', err);
          // Xử lý lỗi nếu không thể sao chép
        });
    } else {
      console.error('Không tìm thấy textbox với id="mypromt"');
    }
  }
 
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300, marginRight: 20 }}>
      <h3>Nội dung Prompt để hỏi AI</h3>
      
      <textarea
        id="mypromt"
        value={moveAsk}
        placeholder="Nhập câu hỏi..."
        style={{ width: "100%", height: 80, padding: 5, marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={askCopilot} style={{ padding: 5 }}>Gửi</button>
        <button onClick={askGemini} style={{ padding: 5 }}>Hỏi Gemini</button>
        <button onClick={copyToClipboard} style={{ padding: 5 }}>Copy to clipboard</button>
      </div>      

      <textarea
        id="airesponse"      
        value={answer}
        readOnly
        placeholder="Câu trả lời sẽ hiển thị ở đây..."
        style={{ width: "100%", height: 100, padding: 5, marginTop: 10 }}
      />
    </div>
  );
};

export default CopilotChat;
