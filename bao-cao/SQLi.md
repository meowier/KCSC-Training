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

## 3. Các kiểu tấn công SQL injection

![](https://images.viblo.asia/9cb0e7e8-ba42-4296-b4e4-cd8c5f7999e5.png)
### @. Truy xuất các dữ liệu ẩn

Xem xét một URL  để hiểu thị các sản phẩm trong danh mục khác nhau. Khi người dùng gửi yêu cầu từ danh mục `Gifts`:

```
http://examplecom/products?category=Gifts
```

Lúc này thì server sẽ gửi truy vấn tới SQL để lấy dữ liệu
```sql
SELECT * FROM products WHERE category = 'Gifts' AND released = 1
```
Return:
* Chi tiết các records từ bảng `products` khi danh mục là `Gifts` và đã được phát hành `released = 1`

Theo dự đoán thì nếu các sản phẩm chưa được phát hành thì `released = 0`  dữ liệu đó bị ẩn trong database

Vì vậy nên hacker dễ dàng truy xuất ra toàn bộ sản phẩm:

```
http://example.com/products?category=Gifts'--
```

Câu truy vấn SQL như sau:

```sql
SELECT * FROM products WHERE category = 'Gifts'--' AND released = 1
```
Chuỗi `--` là 1 comment trong câu truy vấn, thì phần còn lại của truy vấn được hiểu là phần comment nên đã không thực thi vì vậy nên điều kiện `AND released = 1` trở nên vô nghĩa

Cùng với đó thì kẻ tấn công có thể truy xuất ra toàn bộ sản phẩm từ toàn bộ các danh mục với câu truy vấn:

```sql
SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1
```

Tương ứng với gửi yêu cầu từ URL:
```
http://example.com/products?category=Gifts'+OR+1=1--
```

`1 = 1` luôn đúng nên tất cả bản ghi sẽ được hiển thị.

*SQL Injection* có thể chia nhỏ thành các dạng sau

* In-band SQLi
    * Error-based SQLi
    * Union-based SQLi
* Inferential SQLi (Blind SQLi)
* Blind-boolean-based SQLi
    * Time-based-blind SQLi
* Out-of-band SQLi

### 1. In-band SQLi
Đây là dạng tấn công phổ biến nhất và cũng là dễ nhất để khai thác.
In-Band SQLi chia làm 2 loại chính:
* Error-based SQLi
* Union-based SQLi

#### a. Error-based SQLi
Là một kỹ thuật tấn công SQL Injection từ thông báo lỗi của server. Từ error-log đó hacker có thể dẽ dàng tìm ra cái tên thuộc tính của bảng...

![](https://images.viblo.asia/0b0b172a-4973-442c-b01c-affb3938e3b2.png)

#### b. Union-based SQLi
Là một kỹ thuật tấn công SQL Injection dựa vào `UNION` cho phép tổng hợp kết quả của 2 hay nhiều câu truy vấn SELECTION trong cùng 1 kết quả và được trả về Response.

![](https://images.viblo.asia/7b915ff5-7164-4be7-82ec-db06354fc2f3.png)

### 2. Inferential SQLi (Blind SQLi)
Không giống như In-band SQLi, Blind SQLi  tốn nhiều thời gian hơn cho việc tấn công do không có bất kì dữ liệu nào được thực sự trả về thông qua response và không thể theo dõi kết quả trực tiếp như kiểu tấn công In-band.

Thay vào đó, kẻ tấn công sẽ cố gắng xây dựng lại cấu trúc cơ sở dữ liệu bằng việc gửi đi các payloads, dựa vào kết quả phản hồi của web application và kết quả hành vi của database server.

Có 2 dạng tấn công chính
* Blind-boolean-based
* Blind-time-based SQLi

#### a. Blind-boolean-based

Là kĩ thuật tấn công SQL Injection dựa vào việc gửi các truy vấn tới DB bắt buộc  trả về các kết quả khác nhau phụ thuộc vào câu truy vấn là True hay False.

Tuỳ thuộc kết quả trả về của câu truy vấn mà reponse có thể thay đổi.

#### b. Time-based Blind SQLi

Time-base Blind SQLi là kĩ thuật tấn công dựa vào việc gửi những câu truy vấn tới database và buộc database phải chờ một khoảng thời gian trước khi phản hồi.

Thời gian phản hồi (ngay lập tức hay trễ theo khoảng thời gian được set) cho phép kẻ tấn công suy đoán kết quả truy vấn là TRUE hay FALSE.

Kiểu tấn công này cũng tốn nhiều thời gian tương tự như Boolean-based SQLi

### 3. Out-of-band SQLi
Out-of-band SQLi không phải dạng tấn công phổ biến, chủ yếu bởi vì nó phụ thuộc vào các tính năng được bật trên server của database được sở dụng bởi Web server.

Kiểu tấn công này xảy ra khi hacker không thể trực tiếp tấn công và thu thập kết quả trực tiếp trên cùng một kênh (In-band SQLi), và đặc biệt là việc phản hồi từ server là không ổn định.

Kiểu tấn công này phụ thuộc vào khả năng server thực hiện các request DNS hoặc HTTP để chuyển dữ liệu cho kẻ tấn công.


## 3. Cách giảm thiểu và phòng ngừa SQL Injection (prevent SQLi)
Hầu hết các trường hợp dính SQL injection là do việc nối string trong câu lệnh truy vấn SQL, thay vào đó thì ta sẽ tham số hóa các giá trị được truyền vào.
* Tạo blacklist để từ chối truy vấn khi phát hiện người dùng truyền vào các syntax của SQL như ` ORDER BY`, `WHERE`, `UPDATE`, `UNION`,... và các kí tự đặc biệt như: `-`, `#`, `,` , `;`...

* Dùng các hàm có sẵn để giảm thiểu lỗi. Mỗi khi truy vấn thì mọi người nên sử dụng thêm hàm `mysqli_real_escape_string` để chuyển đổi một chuỗi thành một query an toàn.

```php
$id = isset($_GET['id'])?(string)(int)$_GET['id']:false;
$sql= 'SELECT * FROM tbl_user WHERE id= ' . mysqli_real_escape_string($id);
```
## 4. Tham khảo
- https://topdev.vn/blog/sql-injection/

- https://viblo.asia/p/tim-hieu-ve-sql-injection-testing-RQqKLv90l7z
- https://www.hacksplaining.com/exercises/sql-injection#hack-complete
- https://viblo.asia/p/sql-injection-la-gi-co-bao-nhieu-kieu-tan-cong-sql-injection-m68Z0QnMlkG
- https://portswigger.net/web-security/sql-injection