# Task 1 – Data Report
Task 1 là một React component `DataReport` giúp người dùng:
- Upload file Excel chứa dữ liệu bán hàng.
- Chọn khoảng thời gian Start Time và End Time.
- Hiển thị preview bảng dữ liệu trong khoảng thời gian đã chọn.
- Tính tổng Amount của các giao dịch được lọc.

Tính năng chính:
- Upload file Excel và đọc dữ liệu bằng xlsx.
- Nhập thời gian bắt đầu và kết thúc (`input type="time"`).
- Lọc dữ liệu dựa trên khoảng thời gian.
- Hiển thị preview table và tổng số tiền.
- Responsive, sử dụng `Bootstrap`.

## Cấu trúc dự án

```bash
task1/
├─ public/                     
├─ src/                         # Source code chính
│  ├─ components/               # Chứa các component tái sử dụng
│  │  ├─ DataReport.js          # Component hiển thị báo cáo dữ liệu
│  │  └─ DataReport.scss        # File style SCSS cho DataReport
│  ├─ App.css                   # CSS chính cho App
│  ├─ App.js                    # File chính của ứng dụng React
│  ├─ App.test.js               
│  ├─ index.css              
│  ├─ index.js                  # Điểm khởi chạy của React app
│  ├─ logo.svg                  # Logo React mặc định
│  ├─ reportWebVitals.js      
│  └─ setupTests.js            
├─ README.md                    # Tài liệu hướng dẫn project
├─ package-lock.json            # Lock phiên bản dependencies
└─ package.json                 # Cấu hình project + dependencies
```
## Cách thực hiện
- Khởi tạo project React 
```bash
npx create-react-app
```
- Tạo thư mục `components` để chứa các component.
- Xây dựng component `DataReport.js` và file style `DataReport.scss`.
- Import `DataReport` vào `App.js` để hiển thị.
```bash
import DataReport from './DataReport';

function App() {
     return (
       <div>
         <DataReport />
       </div>
     );
   }

```
- Chạy ứng dụng
```bash
npm start
```
## Screenshots

![App Screenshot](./screenshots/demo.png)