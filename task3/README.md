# Task 3 – Database & SQL Queries
Task 3 xây dựng cơ sở dữ liệu quản lý **các trạm xăng**, gồm các bảng:
- `stations`: danh sách trạm xăng.
- `products`: danh sách sản phẩm (xăng, dầu).
- `pumps`: trụ bơm, liên kết trạm và sản phẩm.
- `transactions`: giao dịch bán hàng tại trạm.

Các truy vấn được viết để:
- Lấy danh sách giao dịch theo khoảng ngày.
- Tính doanh thu theo ngày cho trụ bơm / trạm.
- Thống kê top sản phẩm bán chạy.

## 1. Cấu trúc Database

![App Screenshot](.erd.png)

**Chi tiết bảng:**
- `stations`: Lưu thông tin trạm.
- `products`: Lưu thông tin loại xăng/dầu.
- `pumps`: Trụ bơm, gắn với một trạm và một loại sản phẩm.
- `transactions`: Giao dịch phát sinh, có số lượng, đơn giá và doanh thu.
## 2. Cách thực hiện
### 2.1 Tạo bảng
```sql
CREATE TABLE stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE pumps (
    pump_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    product_id INT NOT NULL,
    pump_code VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(station_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    pump_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    transaction_time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (station_id) REFERENCES stations(station_id) ON DELETE CASCADE,
    FOREIGN KEY (pump_id) REFERENCES pumps(pump_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX (transaction_time)
);
```
### 2.2 Thêm dữ liệu mẫu
```sql
INSERT INTO stations(name, address) VALUES
('Trạm xăng Linh Trung', 'Thủ Đức'),
('Trạm xăng Linh Tây', 'Thủ Đức'),
('Trạm xăng Thủ Đức 1', 'Thủ Đức'),
('Trạm xăng Thủ Đức 2', 'Thủ Đức');

INSERT INTO products(name, unit_price) VALUES
('Xăng A95', 23000),
('Xăng E5', 22000),
('Dầu DO', 21000);

-- Thêm pumps và transactions (xem chi tiết trong file gas_station.sql)

```

## 3. Các truy vấn mẫu

### 3.1 Lấy giao dịch trong khoảng ngày cho 1 trạm
```sql
SELECT 
    t.transaction_id,
    s.name AS station_name,
    p.pump_code,
    pr.name AS product_name,
    t.quantity,
    t.unit_price,
    t.total,
    t.transaction_time
FROM transactions t
JOIN stations s ON t.station_id = s.station_id
JOIN pumps p ON t.pump_id = p.pump_id
JOIN products pr ON t.product_id = pr.product_id
WHERE t.station_id = 1
  AND DATE(t.transaction_time) BETWEEN '2025-08-01' AND '2025-08-03'
ORDER BY t.transaction_time;

```
### 3.2 Doanh thu theo ngày cho một trụ bơm
```sql
SELECT 
    DATE(t.transaction_time) AS transaction_date,
    p.pump_code,
    SUM(t.total) AS daily_revenue
FROM transactions t
JOIN pumps p ON t.pump_id = p.pump_id
WHERE p.pump_code = 'LT-A95-01'
GROUP BY DATE(t.transaction_time), p.pump_code
ORDER BY transaction_date;

```

### 3.3 Doanh thu theo ngày cho một trạm
```sql
SELECT 
    DATE(t.transaction_time) AS transaction_date,
    s.name AS station_name,
    SUM(t.total) AS daily_revenue
FROM transactions t
JOIN stations s ON t.station_id = s.station_id
WHERE t.station_id = 1
GROUP BY DATE(t.transaction_time), s.name
ORDER BY transaction_date;
```

### 3.4 Top 3 sản phẩm bán chạy nhất trong tháng
```sql
SELECT 
    pr.name AS product_name,
    SUM(t.quantity) AS total_liters
FROM transactions t
JOIN products pr ON t.product_id = pr.product_id
WHERE t.station_id = 1
  AND DATE_FORMAT(t.transaction_time, '%Y-%m') = '2025-08'
GROUP BY pr.name
ORDER BY total_liters DESC
LIMIT 3;

```