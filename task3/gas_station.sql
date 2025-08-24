-- Tao bang stations
CREATE TABLE stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);
-- Tao bang products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);
--Tao bang pumps
CREATE TABLE pumps (
    pump_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    product_id INT NOT NULL,
    pump_code VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(station_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

--Tao bang transactions
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    pump_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL, --tinh theo don vi lit
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED, --tinh tong gia = so luong * gia (lit)
    transaction_time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (station_id) REFERENCES stations(station_id) ON DELETE CASCADE,
    FOREIGN KEY (pump_id) REFERENCES pumps(pump_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX (transaction_time)
);


--Them du lieu mau
INSERT INTO stations(name, address) VALUES
('Trạm xăng Linh Trung', 'Thủ Đức'),
('Trạm xăng Linh Tây', 'Thủ Đức'),
('Trạm xăng Thủ Đức 1', 'Thủ Đức'),
('Trạm xăng Thủ Đức 2', 'Thủ Đức');

INSERT INTO products  (name, unit_price) VALUES
('Xăng A95', 23000),
('Xăng E5', 22000),
('Dầu DO', 21000);

INSERT INTO pumps (station_id, product_id, pump_code) VALUES
(1, 1, 'LT-A95-01'),
(1, 2, 'LT-E5-01'),
(1, 3, 'LT-DO-01'),
(2, 1, 'LTY-A95-01'),
(2, 2, 'LTY-E5-01'),
(2, 3, 'LTY-DO-01'),
(3, 1, 'TD1-A95-01'),
(3, 2, 'TD1-E5-01'),
(3, 3, 'TD1-DO-01'),
(4, 1, 'TD2-A95-01'),
(4, 2, 'TD2-E5-01'),
(4, 3, 'TD2-DO-01');


INSERT INTO transactions (station_id, pump_id, product_id, quantity, unit_price, transaction_time) VALUES
(1, 1, 1, 15.5, 23000, '2025-08-01 08:15:00'),
(1, 2, 2, 20.0, 22000, '2025-08-01 09:20:00'),
(1, 3, 3, 30.0, 21000, '2025-08-01 10:05:00'),
(2, 4, 1, 10.0, 23000, '2025-08-01 11:10:00'),
(2, 5, 2, 18.0, 22000, '2025-08-01 12:25:00'),
(2, 6, 3, 25.0, 21000, '2025-08-01 13:40:00'),
(3, 7, 1, 12.0, 23000, '2025-08-01 14:55:00'),
(3, 8, 2, 22.0, 22000, '2025-08-01 15:30:00'),
(3, 9, 3, 28.5, 21000, '2025-08-01 16:45:00'),
(4, 10, 1, 17.0, 23000, '2025-08-01 17:10:00'),
(4, 11, 2, 21.0, 22000, '2025-08-01 18:20:00'),
(4, 12, 3, 26.0, 21000, '2025-08-01 19:05:00'),
(1, 1, 1, 18.0, 23000, '2025-08-02 08:30:00'),
(1, 2, 2, 25.0, 22000, '2025-08-02 09:45:00'),
(1, 3, 3, 32.0, 21000, '2025-08-02 11:00:00'),
(1, 1, 1, 20.0, 23000, '2025-08-03 08:15:00'),
(1, 2, 2, 28.5, 22000, '2025-08-03 10:20:00'),
(3, 7, 1, 13.5, 23000, '2025-08-02 09:20:00'),
(3, 8, 2, 24.0, 22000, '2025-08-02 11:15:00'),
(3, 9, 3, 27.5, 21000, '2025-08-03 16:30:00'),
(3, 7, 1, 16.0, 23000, '2025-08-04 08:45:00'),
(4, 10, 1, 19.0, 23000, '2025-08-02 09:00:00'),
(4, 11, 2, 23.0, 22000, '2025-08-02 10:30:00'),
(4, 12, 3, 30.5, 21000, '2025-08-03 15:10:00'),
(4, 10, 1, 18.0, 23000, '2025-08-04 09:20:00');


--Lay tat ca giao dich cua 1 tram trong khoang ngay
--VD lay tat ca giao dich cua tram 1 (tram Linh Trung) trong khoang 1/8/2025 - 3/8/2025
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

--Tong doanh thu theo ngay cho mot tru bom
--VD tinh doanh thu cua tru bom co pump_code = 'LT-A95-01' (tram Linh Trung, xang a95, tru 1)
SELECT 
    DATE(t.transaction_time) AS transaction_date,
    p.pump_code,
    SUM(t.total) AS daily_revenue
FROM transactions t
JOIN pumps p ON t.pump_id = p.pump_id
WHERE p.pump_code = 'LT-A95-01'
GROUP BY DATE(t.transaction_time), p.pump_code
ORDER BY transaction_date;

--Tinh doanh thu theo ngay cho mot tram tram
--VD tram 1 (tram Linh Trung)
SELECT 
    DATE(t.transaction_time) AS transaction_date,
    s.name AS station_name,
    SUM(t.total) AS daily_revenue
FROM transactions t
JOIN stations s ON t.station_id = s.station_id
WHERE t.station_id = 1
GROUP BY DATE(t.transaction_time), s.name
ORDER BY transaction_date;

-- Lay top3 hang hoa ban chay nhat va tong so lit cua tram trong mot thang
-- Vd tram1 (tram Linh Trung) trong thang 8/2025
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



