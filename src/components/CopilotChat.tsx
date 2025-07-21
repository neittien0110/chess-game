/** @file 
 * @description Component CopilotChat để tương tác với AI Copilot và Gemini.
 * @external Copilot API và Gemini API, nhằm minh chứng cách gửi câu hỏi và nhận phản hồi từ AI.
 * @requires @google/generative-ai package để sử dụng Gemini API. 
 * @author Nguyen Duc Tien  
 */
import React, { useState } from "react";
// components/Model.jsx

interface CopilotChatProps {
  moveAsk: string | undefined;
}

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
    const modelName: string = "gemini-1.5-flash";
    const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  
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
        const errorData = await response.json(); // <-- Đọc JSON từ response body
        // Kiểm tra xem errorData có thuộc tính 'error' và 'message' không
        const errorMessage = errorData.error?.message || "Lỗi không xác định từ AI.";
        // Hiển thị thông báo lỗi chi tiết ra responseTextbox
        responseTextbox.value = `Đã xảy ra lỗi khi giao tiếp với AI: ${errorMessage}`;
        console.error(`Lỗi khi gọi Gemini API: ${response.status} - ${response.statusText}`);
        console.error("Chi tiết lỗi:", errorData);
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "left", width: 500, marginRight: 20 }}>
      <h3>Hướng dẫn sử dụng</h3>
      <span style={{ color: "gray", marginLeft: 10, marginBottom: 0 }}>      
      Quân trắng đi trước, sau đó đến quân đen.<br/><br/>
      <b>Cách chơi người-người</b>
      <p>
          Lần lượt click vào quân cờ của mình và click vào ô muốn di chuyển đến. Hoặc tương ứng, điền vị trí quân cờ và 
          ô muốn di chuyển vào textbox bên dưới.
      </p>

      <b>Dùng AI gợi ý cho quân trắng</b>
      <p>
        Bấm nút <b>Hỏi Gemini</b> khi bắt đầu ván chơi mới và bấm <b>Hỏi Gemini</b> sau mỗi nước di chuyển của quân đen. Phần gợi ý di chuyển của quân trắng sẽ hiện ra bên dưới. <br/>
        Đừng quên, dù là 1 lần, vì Gemini sẽ thiếu thông tin lượt di chuyển và đưa ra gợi ý sai.
      </p>
      </span>
      <h3>Nội dung Prompt để hỏi AI</h3>
      
      <textarea
        id="mypromt"
        value={moveAsk}
        placeholder="Nhập câu hỏi..."
        style={{ width: "100%", height: 80, padding: 5, marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={askCopilot} disabled style={{ padding: 5 } }>Hỏi Copilot</button>
        <button id="askGemini" onClick={askGemini} style={{ padding: 5 }}>Hỏi Gemini</button>
        <button onClick={copyToClipboard} style={{ padding: 5 }}>Copy to clipboard</button>
      </div>      

      <textarea
        id="airesponse"      
        value={answer}
        readOnly
        placeholder="Câu trả lời sẽ hiển thị ở đây..."
        style={{ width: "100%", height: 140, padding: 5, marginTop: 10 }}
      />
    </div>
  );
};

export default CopilotChat;
