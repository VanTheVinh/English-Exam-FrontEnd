# ENGLISH EXAM WEB

> ## Giới thiệu
English Exam Web là một trang Web cho học sinh có thể đăng nhập để truy cập vào lớp và tham gia làm bài thi,
học sinh có thể xem kết quả khi kết thúc bài thi. 
Đối với trang của giáo viên, giáo viên có thể quản lý học sinh, lớp, bài thi, các câu hỏi và kết quả.  

> ## Các chức năng chính
### Chức năng chung
- **Đăng nhập**: Với tên tài khoản và mật khẩu đã được tạo bởi quản trị viên
- **Đăng xuất**: Thoát tài khoản khỏi trang Web

### Học sinh
- **Truy cập bài thi**: Sau khi đăng nhập thành công, học sinh vào lớp học của mình và chọn bài thi
- **Làm bài thi**: Nhấp vào bài thi để làm bài, tiến trình sẽ được lưu khi học sinh đăng xuất hệ thống hoặc gặp trục trặc kĩ thuật trong quá trình thi
- **Nộp bài**: Sau khi làm xong nhấn nộp bài hệ thống sẽ tính điểm và lưu vào cơ sở dữ liệu
- **Xem điểm**: Sau khi đã hoàn thành bài thi học sinh có thể vào phần lịch sử thi để xem điểm số của mình, 
trang kết quả sẽ bao gồm các thông tin như mã lớp, mã bài thi, thời gian, số câu hỏi, điểm số và thời điểm nộp bài

### Giáo viên
- **Quản lý lớp học**: Thêm, cập nhật, xóa, và xem chi tiết thông tin lớp học
- **Quản lý bài thi**: Tạo bài thi chứa mã lớp, chỉnh sửa, và xóa xóa bài thi
- **Quản lý ngân hàng câu hỏi**: Tạo mới câu hỏi chứa mã bài thi, sửa, xóa câu hỏi

> ## Cài đặt và chạy dự án
1. Tạo thư mục trống chứa mã nguồn dự án (Ví dụ: English Exam)
2. Mở thư mục vừa tạo trên VS Code
3. Mở Terminal 
- Gõ lệnh `git -v`, sẽ sang bước tiếp theo nếu kết quả là:

   ```bash
   git version 2.46.0.windows.1 (Hoặc các phiên bản khác)
   ```
   Nếu không bạn cần đến trang [Git download](https://git-scm.com/downloads) để tải phiên bản Git về máy.
- Gõ lệnh `node -v`, sẽ sang bước tiếp theo nếu kết quả là:

   ```bash
   v20.16.0
   ```
   Nếu không hãy vào trang [Node.js version 20](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi) để tải Node về máy.
- Gõ lệnh `git init` để khởi tạo một Repository Git mới trong thư mục hiện tại
4. Clone Repository từ Github về máy
- Sau lệnh khởi tạo Repository Git, tiếp tục gõ lệnh:
   ```bash
   git clone https://github.com/VanTheVinh/English-Exam-FrontEnd.git
- Di chuyển tới thư mục chứa mã nguồn
   ```bash
   cd English-Exam-FrontEnd
   ```
- Gõ lệnh `npm i` để cài đặt tất cả các gói cần thiết cho dự án

- Nếu không có lỗi gì gõ tiếp lệnh `npm start` để chạy dự án
- Chạy thành công Folder Front-end, ở terminal sẽ giống ảnh bên dưới

<img src="https://i.imgur.com/afZl21U.png" alt="image info" style="width:400px; margin-left:24px;"/>

- Mở một terminal mới dẫn tới Folder chứa mã nguồn dự án (English Exam) để tải mã nguồn Back-end
   ```bash
   git clone https://github.com/VanTheVinh/English-Exam-BackEnd.git
- Di chuyển tới thư mục chứa mã nguồn
   ```bash
   cd English-Exam-BackEnd
   ```
- Gõ lệnh `npm i` để cài đặt tất cả các gói cần thiết cho dự án
- Nếu không có lỗi gì gõ tiếp lệnh `npm start` để chạy dự án
- Chạy thành công Folder Back-end, ở terminal sẽ giống ảnh bên dưới

<img src="https://i.imgur.com/7KeZAIL.png" alt="image info" style="width:400px; margin-left:24px;"/>

- Sau khi chạy thành công Front-end và Back-end hệ thống sẽ tự động chuyển tới trình duyệt, nếu không bạn hãy lên trình duyệt với đường dẫn http://localhost:3000/

