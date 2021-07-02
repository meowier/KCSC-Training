# SOP_CORS

### 1. SOP (Same Origin Policy) là gì

Same-Origin Policy (SOP) là một phần quan trọng trong hệ thống bảo mật của trình duyệt nhằm ngăn chặn những trang web độc hại truy xuất được các thông tin bí mật của những trang web khác. 

Ví dụ thepriatebay.com không thể truy xuất dữ liệu từ trang Barclays.com vì nó bị chặn bởi SOP.

Phương thức hoạt động rất đơn giản, đó là những trang web khác trang web gốc có thể gửi requests đến những domains khác nhưng không nhận được responses trả về. 

Có một số thành phần không thể chặn được SOP như hình ảnh, scripts – Vì đây là những thành phần mà ứng dụng web sử dụng công khai và những thành phần này không ảnh hưởng đến vấn đề bảo mật của ứng dụng web.

Ví dụ, JavaScript có thể được request từ một domain khác. 

Chẳng hạn http://malicious.site có thể gửi request đến script của http://confidential.site, tuy nhiên đoạn script lúc này sẽ thực thi trên malisious.site vì thế không thể đánh cắp cookies, sessions tokens hoặc các dữ liệu bí mật từ trang confidential.site.

Tóm lại các thành phần không thể bị chặn bởi SOP khi gửi request đến thì nó sẽ chỉ hoạt động tại chính trang thực hiện gửi Request.

Một trang web được xem là "same-origin" khi phải cùng hostname, protocol và port.


Một điều cần chú ý là SOP không ngăn chặn việc khởi tạo và gửi các REQUEST và cũng không ngăn chặn phía Server sẽ không thực thi các REQUEST này, nhưng trình duyệt sẽ giúp ngăn chặn thực thi các RESPONES từ phía SERVER trả về. 

Tuy nhiên một vài REQUEST lại không cần phải thực thi RESPONSE, và lợi dụng điều đó kẻ tấn công vẫn thực hiện được ý đồ của mình – Đây là loại tấn công Cross-Origin Request Forgery (CSRF).

## 2. CORS (Cross-origin Resource Sharing)

CORS là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang đó. CORS là viết tắt của từ.

### 1. Ảnh hưởng của SOP

![](https://i.imgur.com/IOerKiq.png)

Lỗi này xảy ra khi ta cố tình chèn 1 cái script chạy fetch request từ origin khác

CORS được sinh ra là vì same-origin policy, là một chính sách liên quan đến bảo mật được cài đặt vào toàn bộ các trình duyệt hiện nay. 

Chính sách này ngăn chặn việc truy cập tài nguyên của các domain khác một cách vô tội vạ.

Same-origin policy chính là để ngăn chặn những kịch bản như trên để bảo vệ người dùng, giúp an toàn hơn khi lướt web. 

Thế nhưng trong thế giới web, lập trình viên thường xuyên phải thực hiện truy vấn đến các domain khác, đặc biệt là khi làm việc với các API.

Đó là lúc chúng ta cần đến CORS. CORS sử dụng các HTTP header để “thông báo” cho trình duyệt rằng, một ứng dụng web chạy ở origin này (thường là domain này) có thể truy cập được các tài nguyên ở origin khác (domain khác).

Một ứng dụng web sẽ thực hiện truy vấn HTTP cross-origin nếu nó yêu cầu đến các tài nguyên ở origin khác với origin nó đang chạy (khác giao thức, domain, port). 

Sự khác biệt về giao thức ở đây là khác biệt kiểu như HTTP với FTP chứ không phải HTTP và HTTPS (dù nhiều trình duyệt không cho phép trộn lẫn các tài nguyên truy cập bằng HTTP và HTTPS nhưng đó là vấn đề khác, không liên quan đến CORS).

Các trường hợp cần đến CORS rất phổ biến trong thực tế. Một ví dụ rất điển hình như sau: 

* Một ứng dụng web chạy ở domain foo.com và nó cần truy vấn đến bar.com để lấy một vài dữ liệu (thường được thực hiện bởi JavaScript bằng cách sử dụng XMLHttpRequest).

Các trình duyệt đều cài đặt same-origin policy và tuân thủ nó rất chặt chẽ. 

Cài đặt XMLHttpRequest và kể cả Fetch API cũng đều tuân thủ chính sách này. 

Do đó những truy vấn như ở trên sẽ không thu được kết quả gì, trừ khi máy chủ trả về response có các header CORS phù hợp.

Như vậy, bằng việc sử dụng CORS, chúng ta có thể thúc đẩy việc giao tiếp trong ứng dụng web dễ dàng hơn rất nhiều.

### 2. Hoạt động của CORS

Khi trình duyệt gửi một request đến một domain khác để yêu cầu làm một việc gì đó, những request này sẽ được gắn thêm một header có tên là origin để xác định origin của client, giá trị này được thêm tự động bởi trình duyệt và không ai có thể thay đổi nó được. 

Header này đại diện cho nguồn gốc truy vấn.

Origin được cấu tạo dựa trên ba phần:

* Protocol/Scheme: (Http/Https)
* Host: server/domain
* Port: cổng

Server sẽ xem xét xem origin trong request người dùng gửi có hợp lệ hay không, nếu là hợp lệ thì sẽ trả về response kèm với header `Access-Controll-Allow-Origin`. 

Header này sẽ cho biết xem client có phải là hợp lệ hay không rồi từ đó trình duyệt mới tiếp tục thực hiện quá trình request. 

`Access-Control-Allow-Origin` liệt kê các tên miền được phép thực hiện yêu cầu của CORS. 

Ký tự * cho phép tất cả các domain khác thực hiện yêu cầu. 

Tuy nhiên cách này thường được coi là không an toàn ngoại trừ trường hợp API của bạn được sử dụng với mục đích công khai và ai cũng có quyền được phép truy cập.

Ví dụ một reequest từ trang https://foo.example:

```http
GET /api HTTP/1.1
Host: bar.other
Origin: https://foo.example
```

Response:

```http

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/json

{"status": true}
```

Nếu không có header `Access-Control-Allow-Origin` hoặc giá trị của nó không hợp lệ thì trình duyệt sẽ thông báo lỗi.

Các header liên quan đến CORS đều có phần tiền tố bắt đầu bằng `Access-Controll`. Ngoài `Access-Controll-Allow-Origin`, header liên quan đến CORS có thể chứa:

* `Access-Control-Allow-Methods`: danh sách các phương thức HTTP mà server cho phép client sử dụng (GET, POST, PUT, DELETE...), không thể được ghi đè hay sửa đổi.

* `Access-Control-Allow_Headers`: chứa danh sách những header mà phía server hiện đang hỗ trợ (x-authentication-token, ...), nếu trong request phía client gửi không chứa những header không nằm trong danh sách này sẽ bị server bỏ qua.

* `Access-Control-Max-Age`: Mô tả thời gian hợp lệ của preflight request, nếu quá hạn, trình duyệt sẽ tạo môt pre-flight request mới.

### 3. CORS trong thực tế

Trong thực tế việc xử lý SOP đơn giản hơn nhiều khi server ko cần phải bật CORS:

* Dùng Reverse Proxy

* Proxy Webpack(áp dụng cho frontend sử dụng webpack)

## 3. Tham khảo

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

* https://codeaholicguy.com/2018/05/07/cors-la-gi/