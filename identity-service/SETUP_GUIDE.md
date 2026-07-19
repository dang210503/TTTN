# Hướng Dẫn Cài Đặt và Chạy Hệ Thống Quản Lý Phòng Khám

## 📋 Tổng Quan

Hệ thống quản lý phòng khám bao gồm:
- **Backend**: Spring Boot REST API (Java)
- **Frontend**: React với Vite

## 🔧 Yêu Cầu Hệ Thống

- Java 21+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+
- npm hoặc yarn

## 🚀 Cài Đặt và Chạy Backend

### 1. Cấu hình Database

Tạo database MySQL:
```sql
CREATE DATABASE IF NOT EXISTS `identity-service`;
```

Hoặc để Spring Boot tự tạo (đã cấu hình trong `application.yaml`)

### 2. Cấu hình kết nối Database

Chỉnh sửa file `src/main/resources/application.yaml` nếu cần:
```yaml
spring:
  datasource:
    url: "jdbc:mysql://localhost:3306/identity-service?createDatabaseIfNotExist=true"
    username: root
    password: root  # Thay đổi theo cấu hình của bạn
```

### 3. Chạy Backend

```bash
# Sử dụng Maven Wrapper
./mvnw spring-boot:run

# Hoặc trên Windows
mvnw.cmd spring-boot:run

# Hoặc sử dụng Maven trực tiếp
mvn spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080/identity**

## 🎨 Cài Đặt và Chạy Frontend

### 1. Cài đặt dependencies

```bash
cd frontend
npm install
```

### 2. Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

## 📝 Các API Endpoints

### User APIs (`/users`)
- `GET /users` - Lấy danh sách tất cả users
- `GET /users/{userId}` - Lấy thông tin user theo ID
- `POST /users` - Tạo user mới
- `PUT /users/{userId}` - Cập nhật user
- `DELETE /users/{userId}` - Xóa user

### Product APIs (`/products`)
- `GET /products` - Lấy danh sách tất cả sản phẩm
- `GET /products/{productId}` - Lấy thông tin sản phẩm theo ID
- `POST /products` - Tạo sản phẩm mới
- `PUT /products/{productId}` - Cập nhật sản phẩm
- `DELETE /products/{productId}` - Xóa sản phẩm

### Appointment APIs (`/appointments`)
- `GET /appointments` - Lấy danh sách tất cả lịch khám
- `GET /appointments/{appointmentId}` - Lấy thông tin lịch khám theo ID
- `POST /appointments` - Tạo lịch khám mới
- `PUT /appointments/{appointmentId}` - Cập nhật lịch khám
- `DELETE /appointments/{appointmentId}` - Xóa lịch khám

## 🎯 Tính Năng

### Quản Lý Bệnh Nhân
- ✅ Thêm/sửa/xóa bệnh nhân, bác sĩ, nhân viên
- ✅ Phân loại theo vai trò (PATIENT, DOCTOR, STAFF)
- ✅ Quản lý thông tin: họ tên, SĐT, email, địa chỉ, ngày sinh

### Quản Lý Thuốc & Dịch Vụ
- ✅ Thêm/sửa/xóa thuốc và dịch vụ y tế
- ✅ Quản lý ngày sản xuất và hạn sử dụng
- ✅ Cảnh báo thuốc sắp hết hạn hoặc đã hết hạn

### Quản Lý Lịch Khám
- ✅ Đặt lịch khám với bệnh nhân và bác sĩ
- ✅ Quản lý trạng thái: Đã đặt, Hoàn thành, Đã hủy
- ✅ Quản lý ngày và giờ khám

## 🔄 Các Thay Đổi Đã Thực Hiện

### Backend
1. ✅ Thêm `Role` enum (PATIENT, DOCTOR, STAFF) vào User
2. ✅ Thêm các trường: phone, email, address, role vào User
3. ✅ Cải thiện Appointment: thêm time, patientId, doctorId, status
4. ✅ Thêm CORS configuration để frontend có thể gọi API
5. ✅ Cập nhật tất cả DTOs và Services

### Frontend
1. ✅ Tạo ứng dụng React với Vite
2. ✅ UI hiện đại, responsive với gradient design
3. ✅ Quản lý đầy đủ CRUD cho Users, Products, Appointments
4. ✅ Form validation và error handling
5. ✅ Hiển thị trạng thái và cảnh báo hết hạn

## 🐛 Xử Lý Lỗi

Nếu gặp lỗi CORS khi frontend gọi API:
- Đảm bảo backend đã có `CorsConfig.java`
- Kiểm tra backend đang chạy tại port 8080
- Kiểm tra frontend đang chạy tại port 3000

Nếu gặp lỗi kết nối database:
- Kiểm tra MySQL đang chạy
- Kiểm tra username/password trong `application.yaml`
- Đảm bảo database `identity-service` đã được tạo

## 📞 Hỗ Trợ

Nếu có vấn đề, vui lòng kiểm tra:
1. Logs của backend trong console
2. Console của browser (F12) để xem lỗi frontend
3. Network tab để kiểm tra API calls

