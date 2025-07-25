# WEBSITE CỜ VUA

## Lời giới thiệu

Đây là website giúp bạn có thể chơi cờ vua với máy tính. Toàn bộ quá trình đều được thực hiện qua AI với công cụ [Google Gemini](http://gemini.google.com/). Trải nghiệm cho thấy rằng

- :thumbsup: Có thể tạo website game cờ vua trong 45 phút. 10/10đ
- :thumbsup: thêm 3 ngày để hoàn chỉnh chương trình về giao diện, cách tương tác, UI/UX. 7/10đ.
- :thumbsup: AI giải thích chi tiết về một đoạn code có sẵn cực tót. 10/10đ.

- :scream: promt rất nhiều lần, lên tới hàng trăm lượt đề hoàn thiện chương trình, chứ không phải chỉ hỏi vài câu mà có ngay sản phẩm. promt ra kết quả sai dự tính. 3/10đ.
- :scream: tự ý đổi id của các đối tượng để đúng convention, nhưng gây lôi liên kết DOM. 0/10 đ --> __AI phù hợp với OOP hơn__. (Thêm một lý do để phải học OOP :heart: ).
- :scream: mã nguồn do AI cũng cấp gặp nhiều lỗi về phiên bản thư viện, về tương tác. Mặc lỗi lập lại. 6/10.
- :scream: chỉ xử lý các tác vụ ngắn. 7/10đ.

## Kết luận sơ bộ

__Chắc chắn nên sử dụng AI__

- Tác giả cần 2 lần thực hiện promt mới thành công ở mức cơ bản, chơi được cờ vua. Lần promt thứ nhất mã nguồn bị sai, nhưng sửa 1 chỗ thì gây ra lỗi ở 2 chỗ khác, và càng ngày càng nhiều lỗi.
- Copilot/Gemini có khuynh hướng phức tạp hóa dần kết quả, càng gợi ý thì càng phình to chương trình

Với một sản phẩm, ý tưởng, làm việc kết hợp với AI có thể theo lộ trình/roadmap là:

| STT| Việc | Đối tượng thực hiện |
|--:|--|--|
| 1 | Phân tích, thiết kế, chia nhỏ giai đoạn | Người thực hiện theo kiểu topdown |
| 2 | Tạo ra phần khung chương trình với framework, architecture, layout | Người thực hiện. Hỏi thêm AI để sửa khung cho pro hơn, bổ sung ghi chú, nhưng phải cần thận xem lại và tự kiểm soát được.
| 3 | Hoàn thành từng phần chức năng | AI thực hiện. Người cần mô tả rõ input, output trong các lời promt. Cách hiệu quả nhất là đưa hàm ở dạng [test-driven](#ví-dụ-về-test-driven) rồi yêu cầu AI hoàn thiện.|

- Không cần biết chơi cờ vua. Chỉ cần gửi mô tả các nước đi hiện thời cho các mô hình ngôn ngữ lớn LLM, sau đó lấy kết quả về hiển thị --> sự lệ thuộc AI. 

## DÙNG THỬ SẢN PHẨM

[![alt text](./assets/demo.png)](https://neittien0110.github.io/chess-game/)

## PROMT ĐỂ XÂY DỰNG WEB BASED GAME

- Lời promt khởi động để tạo bàn cờ vua với khả năng di chuyển quân bằng ô textbox

  ```plain
    Hãy viết 1 website bằng React Typescript để có trò chơi cờ vua sao cho bàn cờ được hiển thị thành các ô vuông 8x8 và 32 quân cờ chia thành 2 màu đen và trắng. Bàn cờ được đánh tọa độ theo cột với các chữ cái từ A tới H và dòng được đánh số từ 1 tới 8 như trong ảnh. Người chơi có thể di chuyển quân cờ bằng mouse hoặc nhập tọa độ vào ô textbox
  ```
  
  __Kết luận__: bỏ qua 1 lượt promt bị sai, thì với lượt thứ 2 gồm 12 lần promt thì đã tạo được game.

- Lời promt để bổ sung bảng bên phải chứa các nước di chuyển

  - Promt không tốt với hướng dẫn cồng kềnh.

  ```plain
      Promt không tốt: Hãy sửa lại để có lịch sử các bước đi, được ghi lại ở table bên phải
      Answer: Tôi có thể cập nhật ChessBoard.tsx để hiển thị bảng lịch sử các nước đi của ván cờ ở bên phải. Dưới đây là cách làm:
  ```

  ```plain
    Promt hiệu quả:Hãy thêm vào giao diện một Table chứa lịch sử các lượt di chuyển. Và hãy tách thành một Component riêng là HistoryTable.tsx
    Answer: Tôi đã tạo một component riêng HistoryTable.tsx để hiển thị lịch sử các lượt di chuyển của quân cờ. Điều này giúp giữ ChessBoard.tsx gọn gàng và dễ quản lý hơn.
    Promt hiệu quả: Không. Hãy tích hợp HistoryTable.tsx vào App.tsx
    Answer: Đã hiểu! Tôi sẽ tích hợp HistoryTable.tsx vào App.tsx thay vì ChessBoard.tsx.
  ```
  
  __Kết luận__: sau 2 lần đập đi làm lại, lượt thứ 3 với 11 lần promt thì đã tạo được Bảng lịch sử.
  
- 2 lượt promt để cho phép tương tác di chuyển quân cờ bằng mouse

  ```plain
    Promt: Hãy bổ sung hàm sự kiện để xác định được mouse được click vào Square nào và hiện ra alert
  ```

  ```plain
    Promt: Hãy sửa lại ChessBoard để truyền vị trí quân cờ đang được tương tác bằng cách click chuột, để truyền vào component MoveInput
  ```

  __Kết luận__: chỉ cần copy mã nguồn gợi ý và chạy được luôn.

- Sửa lại bảng History để có thêm thông tin về loại quân cờ dã thực hiện dịch chuyển: đen/trắng

  ```plain
    Promt không tốt: hãy sửa lại App.tsx để truyền vào component HistoryTable thêm thông tin về lượt đi là của quân đen hay quân trắng
  ```
  
  ```plain
    Promt hiệu quả: Hãy giữ nguyên cách truyền tham số dạng string như hiện tại, nhưng thêm cú pháp đơn giản để chứa loại quân cờ. Ví dụ w: e2 → e4, sau đó phần hiển thị lịch sử chỉ cần phân tích chuỗi và tách cột
  ```

- Yêu cầu sửa chương trình để có giao diện reponsive. __Thất bại__.
  
  ```plain
    Promt tệ hại: Hãy sửa trang web cho đẹp hơn.
  ```
  
  ```plain
    Promt tệ hại: Hãy sửa lại trang web để có đặc tính reponsive trên cả điện thoại và màn hình máy tính.
  ```
  
  ```plain
    Promt tệ hại: Hãy sửa lại trang web để có đặc tính reponsive, sao cho phần cột thông tin History sẽ không hiện ra, nhưng phần sidebar bên phải vẫn hiển thị đầy đủ.
  ```

  ```plain
      Promt tốt hơn: Mã nguồn là các file đính kèm. Hãy tích hợp Bootstrap CDN theo cách đơn giản nhất.
      Promt tiếp theo: Mã nguồn là các file đính kèm. Hãy tích hợp Bootstrap CDN theo cách đơn giản nhất.
      Promt: Sửa lại layout bổ cục toàn bộ trang web trong file app.tsx sao cho full toàn hình. Chỉ sửa ở phần return, cấm sửa các hàm ở phía trước.
      Promt: Ở bảng History, hãy xử lý để màu nền của các dòng chẵn, lẻ đổi màu bằng css
  ```

## PROMT ĐỂ TẠO PROMT

  ```plain
      Promt: Hãy tạo component mới phụ trách việc hỏi đáp với Microsoft Copilot, với một ô text box để có thể gửi 1 câu hỏi tới copilot, và 1 ô textbox hiện câu trả lời

      Promt: Háy sửa CopilotChat.tsx để sao cho phần câu hỏi sẽ được truyền tới API của Copilot và đón nhận payload trả về, hiển thị lên textbox còn lại
  ```

  __Kết luận__: sau 1 lượt thực hiện với 8 lần promt thì đã tạo được cửa sổ bên trái hiện ra dòng promt để gửi tới các công cụ AI.

## DÀNH CHO DEV

### CD trên GitHub

Chương trình sử dụng thêm gói __gh-pages__ để triển khai sản phẩm trên github cho nhanh. Không liên quan tới sản phẩm. \

Cụ thể thêm __gồm 4 thao tác cài đặt:__

1. Cài đặt gói __gh-pages__ để giúp deploy lên GitHub Pages

   ```shell
      npm install gh-pages --save-dev
   ```

2. Thêm các dòng sau vào file __package.json__

    ```json
    {
        "homepage": "https://<your-username>.github.io/<your-repo-name>",
        "scripts": {
            "deploy": "gh-pages -d build"
        }
    }
    ```

    > __gh-pages__ cần trỏ tới thư mục sau biên dịch thường là __build__ hoặc __dist__. Cần sửa thiết lập này cho phù hợp với từng dự án.

3. Nếu chưa có branch __gh-pages__, hãy tạo mới. Bỏ qua bước này nếu đã có.

4. Trên tài khoản github, trong Repository dự án, vào __Settings / Pages__, thiết lập __Homepage__ 

5. Vẫn ở giao diện __Pages__, lựa chọn __branch gh-pages__ chứa thành phẩm để deploy.\
![alt text](./assets//deploy_gh-pages.png)

Tiếp theo, mỗi lần cần __deploy sản phẩm trên github, chỉ cần thực hiện 1 lệnh__:

```shell
    npm run deploy
```

Đợi vài giây và truy cập lại vào homepage để xem sản phẩm.

### Đăng kí sử dụng Gemini API

__Cách 1: đăng kí qua giao diện web đơn giản__

> Google AI Studio (https://aistudio.google.com/) là cách dễ nhất và phổ biến nhất để bạn bắt đầu với Gemini API và nhận API key. Khi bạn truy cập trang này và đăng nhập bằng tài khoản Google của mình, bạn sẽ thấy tùy chọn để "Get API Key" hoặc "Create API Key". Quá trình này rất nhanh chóng và chỉ cần vài bước nhấp chuột là bạn sẽ có được API key của mình để sử dụng

1. __Truy cập Google AI Studio:__
Mở trình duyệt web của bạn và truy cập địa chỉ: https://aistudio.google.com/
2. __Đăng nhập bằng tài khoản Google của bạn:__
Bạn sẽ cần đăng nhập bằng tài khoản Google cá nhân của mình. Nếu bạn chưa có, bạn có thể tạo một tài khoản Google mới.
3. __Đồng ý với các điều khoản:__
Nếu đây là lần đầu tiên bạn truy cập Google AI Studio, bạn có thể sẽ được yêu cầu đọc và đồng ý với các Điều khoản dịch vụ của Google APIs và Điều khoản bổ sung của Gemini API. Hãy đọc kỹ và chấp nhận để tiếp tục.
4. __Tạo API Key:__
Sau khi đăng nhập và chấp nhận điều khoản, bạn sẽ thấy giao diện Google AI Studio. Tìm và nhấp vào nút "Get API key" hoặc "Create API key" (thường nằm ở góc trên bên trái hoặc giữa trang).
5. __Chọn hoặc tạo dự án:__
Bạn sẽ có tùy chọn để tạo API key trong một dự án Google Cloud mới hoặc sử dụng một dự án hiện có. Đối với việc bắt đầu, tạo một dự án mới thường là cách đơn giản nhất.
6. __Sao chép API Key của bạn:__
Sau khi bạn nhấp để tạo khóa, API Key của bạn sẽ được tự động tạo và hiển thị trên màn hình. Đây là lần duy nhất bạn sẽ thấy toàn bộ khóa này, vì vậy hãy sao chép nó ngay lập tức và lưu trữ ở một nơi an toàn. Đừng chia sẻ khóa này công khai hoặc đưa vào mã nguồn mà bạn push lên các kho lưu trữ công khai như GitHub

__Cách 2: đăng kí qua giao diện web Google Cloud Console__

> Là trung tâm quản lý toàn diện cho tất cả các dịch vụ và tài nguyên trong Google Cloud Platform (GCP), mà Gemini chỉ là 1 tính năng. Tại đây, bạn có quyền kiểm soát chi tiết hơn đối với các hạn chế của API Key (ví dụ: chỉ cho phép từ một địa chỉ IP hoặc một API cụ thể), điều này rất quan trọng cho môi trường production. Tuy nhiên, bạn cần phải tự mình kích hoạt các API cần thiết cho dự án.

__Cách 3: đăng kí qua thư viện lập trình__

Tham khảo <https://ai.google.dev/gemini-api/docs/quickstart?lang=python&hl=vi#javascript>

### Kiếm tra model LLM có được hỗ trợ không

Nguyên lý: Gemini API thường ở URL: _https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}_. Tuy nhiên, Google có thể đổi chính sách nên một model có thể dùng tốt hôm nay, nhưng ngày mai sẽ không chạy được.\

Giải pháp:

- Vân sử dụng URL nói trên, nhưng không chỉ định rõ tham số model, để nhận được danh sách các model được phép sử dụng.

  ```shell
   curl https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}"
  ```

- Thay thế tên model mới vào URL.

### Ví dụ về Test driven

```C
  /** 
    * Hàm chuyển đổi ngày dương lịch --> âm lịch
    * @param ngay_duong Ngày dương lịch. Ví dụ 5.
    */
  int DuongLich2AmLich(int ngay_duong, int thang_duong, int nam_duong, int * ngay_am, int * thang_am, char * nam_am)
  {   
      //TODO by AI
  }

  /** 
    * Test suite kiểm tra chuyển đổi ngày dương lịch sang âm lịch
    */
  void Test_DuongLich2AmLich()
  {
    int ngay_am;
    int thang_am;
    char nam_am[200];
    DuongLich2AmLich(25, 11, 2009, &ngay_am, &thang_am, &nam_am);
    assert(ngay_am == 10  && thang_am == 10 && strcmp(nam_am,"ky suu") );

    DuongLich2AmLich(20, 11, 2012, &ngay_am, &thang_am, &nam_am);
    assert(ngay_am == 7  && thang_am == 10 && strcmp(nam_am,"nham_thin") );

    DuongLich2AmLich(15, 1, 2021, &ngay_am, &thang_am, &nam_am);
    assert(ngay_am == 03  && thang_am == 12 && strcmp(nam_am,"canh ty") );
  }

```  
