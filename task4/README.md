# Task 4 - API Processing Script
Task 4 là một script Node.js sử dụng `axios` để:
- Gọi API lấy dữ liệu đầu vào (`input`).
- Xử lý dữ liệu dựa trên các truy vấn (`query`):
   - Loại 1 (`type "1"`): tính tổng các phần tử trong khoảng chỉ định.
   - Loại 2 (`type "2"`): tính tổng chẵn-lẻ, trong đó:
     - Chỉ số chẵn: cộng giá trị
     - Chỉ số lẻ: trừ giá trị
- Gửi kết quả xử lý lên API (`output`) kèm token xác thực.

## 1. Cấu trúc dự án
```bash
task4/
├── node_modules/ 
├── data_queries.js 
├── package-lock.json 
└── package.json 
```
## 2. Cách thực hiện
### 2.1 Gọi API lấy dữ liệu đầu vào
- Script sẽ gửi GET request
```javascript
const inputRes = await axios.get("https://share.shub.edu.vn/api/intern-test/input");

```
- Nhận về dữ liệu gồm
```bash
{
  "token": "string",
  "data": number[],
  "query": [
    { "type": "1"|"2", "range": [l, r] },
    ...
  ]
}

```
### 2.2 Xử lý dữ liệu theo query
- Lặp qua từng query trong query array và kết quả được lưu trong một array result
```javascript
    const result = query.map(q => {
      const [l, r] = q.range;
      if (q.type === "1") {
        // Loại 1: tổng
        let sum = 0;
        for (let i = l; i <= r; i++) sum += data[i];
        return sum;
      } else if (q.type === "2") {
        // Loại 2: chẵn - lẻ
        let sum = 0;
        for (let i = l; i <= r; i++) {
          sum += (i % 2 === 0 ? 1 : -1) * data[i];
        }
        return sum;
      }
    });
  ```
### 2.3 Gửi kết quả lên API
- POST request
```javascript 
    const outputRes = await axios.post(
      "https://share.shub.edu.vn/api/intern-test/output",
      result,
      { headers: { Authorization: `Bearer ${token}` } }
    );

```
### 2.4 In kết quả
- Token, dữ liệu, query và kết quả được in ra console để kiểm tra
```javascrip
    console.log('>>>>>>token', token)
    console.log('>>>>>data', data)
    console.log('>>>>>query', query)
    console.log('>>>>result', result)
    console.log("Output API response:", outputRes.data);

```
## 3. Hướng dẫn thực thi
### 3.1 Clone dự án & cài dependencies
```bash
git clone https://github.com/nini048/fe_test.git
cd task4
npm install
```
### 3.2 Chạy script
```bash
node data_queries.js
```
### 3.3 Kiểm tra kết quả
- Script sẽ in ra console
```bash
>>>>>>token <token nhận được>
>>>>>data <mảng data>
>>>>>query <mảng query>
>>>>result <kết quả tính toán>
```
- Nếu POST thành công, API sẽ trả về thông báo xác nhận
```bash
Output API response: { message: 'Received' }
```
