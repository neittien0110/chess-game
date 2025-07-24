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
  setMoveAsk: React.Dispatch<React.SetStateAction<string | undefined>>; // Thêm prop để set moveAsk từ component cha
}

const CopilotChat: React.FC<CopilotChatProps> = ({ moveAsk, setMoveAsk }) => {
  const [answer, setAnswer] = useState("");
  // Thêm state để quản lý trạng thái của checkbox "Gợi ý ngắn gọn"
  const [isShortAnsChecked, setIsShortAnsChecked] = useState(false);

  // Định nghĩa đoạn text bổ sung
  const SHORT_ANS_TEXT = "Chỉ trả lời đáp án tốt nhất, gồm tên quân cờ: vị trí cũ -- vị trí mới";

  /**
   * Hàm xử lý sự kiện khi nút bấm Hỏi Copilot được nhấn.
   * @description Gửi yêu cầu đến Copilot API và hiển thị phản hồi trong textbox.
   * @requires      CHƯA HOẠT ĐỘNG
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
   * @remark   PROMT: hãy sinh một đoạn mã typescript cho hàm sự kiện onlick của 1 nút bấm sao cho sẽ lấy nội dung trong 1 textbox có id="mypromt" và gửi nội dung đó tới Gemini API. Sau khi nhận được nội dung thì ghi vào textbox có id="airesponse"
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

  /**
   * Xử lý sự kiện khi checkbox "Gợi ý ngắn gọn" thay đổi trạng thái
   * @param event - Đối tượng sự kiện thay đổi của input checkbox
   */
  const handleShortAnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsShortAnsChecked(checked);

    let newMoveAsk = moveAsk || ""; // Đảm bảo moveAsk không phải là undefined

    if (checked) {
      // Nếu checkbox được chọn, thêm đoạn text vào cuối prompt
      if (!newMoveAsk.includes(SHORT_ANS_TEXT)) { // Kiểm tra để tránh thêm trùng lặp
        newMoveAsk += (newMoveAsk.length > 0 ? " " : "") + SHORT_ANS_TEXT;
      }
    } else {
      // Nếu checkbox bị bỏ chọn, xóa đoạn text khỏi prompt
      if (newMoveAsk.includes(SHORT_ANS_TEXT)) { // Kiểm tra để đảm bảo đoạn text tồn tại
        newMoveAsk = newMoveAsk.replace(SHORT_ANS_TEXT, "").trim(); // Xóa text và loại bỏ khoảng trắng thừa
      }
    }
    setMoveAsk(newMoveAsk); // Cập nhật state moveAsk
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "left", width: 500, marginRight: 20 }}>
      <h3>Hướng dẫn sử dụng</h3>
      <span style={{ color: "gray", marginLeft: 10, marginBottom: 0, fontSizeAdjust: "0.5em" }}>
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
        onChange={(e) => setMoveAsk(e.target.value)} // Cho phép chỉnh sửa prompt trực tiếp
        placeholder="Nhập câu hỏi..."
        style={{ width: "100%", height: 80, padding: 5, margin: 0 }}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={askCopilot} disabled style={{ padding: 5 } }>Hỏi Copilot</button>
        <button id="askGemini" onClick={askGemini} style={{ padding: 5 }}>Hỏi Gemini</button>
        <button onClick={copyToClipboard} style={{ padding: 5 }}>Copy to clipboard</button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="checkbox"
            id="shortans"
            name="shortans"
            checked={isShortAnsChecked}
            onChange={handleShortAnsChange}
          /> {/* <-- Dấu gạch chéo ở đây */}
          <label htmlFor="shortans">Gợi ý ngắn gọn</label>
        </div>
      </div>

      <textarea
        id="airesponse"
        value={answer}
        readOnly
        placeholder="Câu trả lời sẽ hiển thị ở đây..."
        style={{ width: "100%", height: 120, padding: 5, margin:5 }}
      />
    </div>
  );
};

export default CopilotChat;