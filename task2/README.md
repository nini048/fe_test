
# Task 2 – Transaction Form

Task 2 là một React component `TransactionForm`giúp người dùng nhập thông tin giao dịch bán hàng:
- Nhập thời gian (datetime-local).
- Nhập số lượng (lít).
- Chọn trụ bơm.
- Nhập đơn giá.
- Tự động tính doanh thu (số lượng × đơn giá).
- Validate dữ liệu bằng `Yup` + `react-hook-form`.
- Hiển thị thông báo thành công bằng `notistack`.

## Cấu trúc dự án


```bash
task2/
├─ public/            
├─ src/                         
│  ├─ components/               # Component tái sử dụng
│  │  ├─ TransactionForm.js     # Form nhập giao dịch (React + Yup + React Hook Form)
│  │  └─ Transaction.scss       # Style SCSS cho TransactionForm
│  ├─ App.css                  
│  ├─ App.js                    # File App chính (render TransactionForm)
│  ├─ App.test.js              
│  ├─ index.css                 # CSS toàn cục
│  ├─ index.js                  # Điểm khởi chạy của ứng dụng React
│  ├─ logo.svg                  
│  ├─ reportWebVitals.js      
│  └─ setupTests.js             
├─ README.md                    # Tài liệu mô tả Task 2
├─ package-lock.json            # Lock dependencies
└─ package.json                 # Khai báo dependencies và scripts
```
## Cách thực hiện
- Khởi tạo project React 
```bash
npx create-react-app
```
- Tạo thư mục `components` để chứa các component.
- Xây dựng component `TransactionForm.js` và file style `Transaction.scss`.
- Import `TransactionForm` vào `App.js` để hiển thị.
```bash
import Transaction from './DataReport';

function App() {
     return (
       <div>
         <TransactionForm />
       </div>
     );
   }

```
- Chạy ứng dụng
```bash
npm start
```
## Screenshots

![App Screenshot](./screenshots/demo1.png)
