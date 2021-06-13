# SQL Injection
## 1. SQLi là gì?
SQL Injection là một kỹ thuật lợi dụng những lỗ hổng về câu truy vấn của các ứng dụng. Được thực hiện bằng cách chèn thêm một đoạn SQL để làm sai lệnh đi câu truy vấn ban đầu, từ đó có thể khai thác dữ liệu từ database. 

SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác như một người quản trị web, trên cơ sở dữ liệu của ứng dụng.

Ví dụ, trong form đăng nhập, người dùng nhập dữ liệu, trong trường tìm kiếm người dùng nhập văn bản tìm kiếm, trong biểu mẫu lưu dữ liệu, người dùng nhập dữ liệu cần lưu. Tất cả các dữ liệu được chỉ định này đều đi vào cơ sở dữ liệu.

Thay vì nhập dữ liệu đúng, kẻ tấn công lợi dụng lỗ hổng để insert và thực thi các câu lệnh SQL bất hợp pháp để lấy dữ liệu của người dùng… SQL Injection được thực hiện với ngôn ngữ lập trình SQL. SQL (Structured Query Language) được sử dụng để quản lý dữ liệu được lưu trữ trong toàn bộ cơ sở dữ liệu.

## 2. Sự nguy hiểm của SQL Injection
* Hack tài khoản cá nhân.
* Ăn cắp hoặc sao chép dữ liệu của trang web hoặc hệ thống.
* Thay đổi dữ liệu nhạy cảm của hệ thống.
* Xóa dữ liệu nhạy cảm và quan trọng của hệ thống.
Người dùng có thể đăng nhập vào ứng dụng với tư cách người dùng khác, ngay cả với tư cách quản trị viên.
* Người dùng có thể xem thông tin cá nhân thuộc về những người dùng khác, ví dụ chi tiết hồ sơ của người dùng khác, chi tiết giao dịch của họ,…
Người dùng có thể sửa đổi cấu trúc của cơ sở dữ liệu, thậm chí xóa các bảng trong cơ sở dữ liệu ứng dụng.
* Người dùng có thể kiểm soát máy chủ cơ sở dữ liệu và thực thi lệnh theo ý muốn.

![](https://topdev.vn/blog/wp-content/uploads/2019/05/sql-injection.png)
Và đoạn code server xử lý:
```php
if(isset($_POST['username']) && isset($_POST['password'])){
$sql = "SELECT * FROM tbl_user WHERE username='". $_POST['username'] . "' AND password = '" .$_POST['password'] ."'";
}
```
Nếu như người dùng không nhập bình thường nữa mà chẳng hạn như họ có thêm một dấu nháy ' hoặc " vào thì dòng code của bạn sẽ bị lỗi ngay. 

Hoặc họ có thể sửa thành một câu truy vấn luôn luôn đúng như sau:

```sql
SELECT * FROM tbl_user WHERE username = '' OR '1' = '1' and password = '' OR '1' = '1'
```
![](https://topdev.vn/blog/wp-content/uploads/2019/05/sql-inject-form.png)

## 3. Cách giảm thiểu và phòng ngừa SQL Injection
Dùng các hàm có sẵn để giảm thiểu lỗi. Mỗi khi truy vấn thì mọi người nên sử dụng thêm hàm `mysqli_real_escape_string` để chuyển đổi một chuỗi thành một query an toàn.
```php
$id = isset($_GET['id'])?(string)(int)$_GET['id']:false;
$sql= 'SELECT * FROM tbl_user WHERE id= ' . mysqli_real_escape_string($id);
```
## 4. Tham khảo
- https://topdev.vn/blog/sql-injection/

- https://viblo.asia/p/tim-hieu-ve-sql-injection-testing-RQqKLv90l7z