# Task 1 – Data Report Component

## 1. Mô tả
Task 1 là một **React component** `DataReport` nhằm giúp người dùng:
- Upload file Excel chứa dữ liệu bán hàng.
- Chọn khoảng thời gian `Start Time` và `End Time`.
- Hiển thị **preview bảng dữ liệu** trong khoảng thời gian đã chọn.
- Tính **tổng Amount** của các giao dịch được lọc.

**Tính năng chính:**
1. Upload Excel file và đọc dữ liệu bằng `xlsx`.
2. Nhập thời gian bắt đầu và kết thúc (`input type="time"`).
3. Lọc dữ liệu dựa trên khoảng thời gian.
4. Hiển thị preview table và tổng số tiền.
5. Responsive, sử dụng Bootstrap.

---

## 2. Cấu trúc dự án
task1/
│
├─ DataReport.jsx # React component chính
├─ DataReport.scss # CSS/SCSS cho component
├─ package.json # Dependencies project
└─ node_modules/

**Dependencies:**
- react
- bootstrap
- xlsx

---

## 3. Cách thực hiện

### 3.1 Upload File Excel
- Chọn file `.xlsx` bằng input file.
- Component đọc sheet đầu tiên và chuyển dữ liệu sang JSON bằng `XLSX.utils.sheet_to_json`.

### 3.2 Chọn thời gian
- Nhập `Start Time` và `End Time` (`hh:mm:ss`).
- Kiểm tra hợp lệ: `Start Time` phải nhỏ hơn `End Time`.

### 3.3 Lọc dữ liệu
- Lọc các dòng trong Excel nằm trong khoảng thời gian đã chọn.
- Tính tổng `Amount` (loại bỏ dấu `.` nếu có) và lưu kết quả.

### 3.4 Preview Table
- Hiển thị các cột: `No`, `Date`, `Time`, `Quantity`, `Unit Price`, `Amount`.
- Nếu chưa submit, hiển thị dữ liệu gốc từ file Excel.
- Sau submit, chỉ hiển thị các dòng phù hợp với khoảng thời gian đã chọn.

---

## 4. Hướng dẫn chạy

1. **Cài dependencies**
```bash
npm install react bootstrap xlsx
npm start

