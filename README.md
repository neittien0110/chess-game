# WEBSITE CỜ VUA

## Lời giới thiệu

Đây là website giúp bạn có thể chơi cờ vua với máy tính. Toàn bộ quá trình đều được thực hiện qua AI với công cụ [Microsoft Copilot](https://copilot.cloud.microsoft/) nhằm chứng minh răng:

- Có thể tạo website game cờ vua trong 45 phút.

> Tác giả cần 2 lần thực hiện promt mới thành công. Lần promt thứ nhất mã nguồn bị sai, nhưng sửa 1 chỗ thì gây ra lỗi ở 2 chỗ khác, và càng ngày càng nhiều lỗi.

## DÙNG THỬ SẢN PHẨM

![alt text](./assets/demo.png)

## PROMT ĐỂ XÂY DỰNG WEBSITE

- Lời promt khởi động

  ```plain
    Hãy viết 1 website bằng React Typescript để có trò chơi cờ vua sao cho bàn cờ được hiển thị thành các ô vuông 8x8 và 32 quân cờ chia thành 2 màu đen và trắng. Bàn cờ được đánh tọa độ theo cột với các chữ cái từ A tới H và dòng được đánh số từ 1 tới 8 như trong ảnh. Người chơi có thể di chuyển quân cờ bằng mouse hoặc nhập tọa độ vào ô textbox
  ```
