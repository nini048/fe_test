
# Task 1 – Data Report

Task 1 là một React component `DataReport` giúp người dùng:
- Upload file Excel chứa dữ liệu bán hàng.
- Chọn khoảng thời gian Start Time và End Time.
- Hiển thị preview bảng dữ liệu trong khoảng thời gian đã chọn.
- Tính tổng Amount của các giao dịch được lọc.

Tính năng chính:
- Upload file Excel và đọc dữ liệu bằng xlsx.
- Nhập thời gian bắt đầu và kết thúc (input type="time").
- Lọc dữ liệu dựa trên khoảng thời gian.
- Hiển thị preview table và tổng số tiền.
- Responsive, sử dụng Bootstrap.


## Project Structure


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

## Usage/Examples

```javascript
import DataReport from './DataReport';

function App() {
     return (
       <div>
         <DataReport />
       </div>
     );
   }
```



## Installation

- Clone project hoặc copy thư mục task1 vào project React.
- Cài dependencies:
```bash
   npm install react bootstrap xlsx
   ```
- Chạy project
```bash
    npm start
