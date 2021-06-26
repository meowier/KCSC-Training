# Tổng quan về Deselization

![](https://i.stack.imgur.com/vLjcq.png)

## 1. "Serialization" là gì?

Serialization quá trình tuần tự chuyển đổi một đối tượng (Object). 

Ví dụ như 1 Object trong Javascript thành một định dạng có thể được gửi qua mạng hoặc được lưu trữ trong bộ nhớ hoặc cơ sở dữ liệu (JSON).

Mục đích của Serialization là để bảo vệ một đối tượng, có nghĩa là đối tượng sẽ tồn tại bên ngoài chương trình nơi mà nó được tạo ra. 

Như vậy, bằng việc tìm hiểu cơ chế của Serialization, ta có thể suy ra cơ chế làm việc của Deserialization như sau:

Deserialization (chuyển đổi cấu trúc dữ liệu ảo) là quá trình sẽ giúp chuyển đổi định dạng dãy byte liên tục trở lại thành một đối tượng "sống".

![](https://s.cystack.net/resource/home/content/03141937/serialize-deserialize.png)

Ví dụ, khi rút tiền từ máy ATM, thông tin của chủ tài khoản và hoạt động yêu cầu được lưu trữ trong một object nội bộ.

Trước khi nó được thực hiện giao dịch thì nó phải được thự hiện tuần tự (Serialization) chuyển dữ liệu từ dạng object thành dạng dãy bytes và phê duyệt các hoạt động cần thiết.

Máy chủ sau khi thực hiện xong lại chuyển đổi cấu trúc từ dạng bytes sang dạng object (Deserialization) sau đó thì phải hồi với chủ tài khoản.

## 2. Phân loại Serialization
Có rất nhiều loại serialization có sẵn phụ thuộc vào đối tượng đang được tuần tự chuyển đổi và mục đích của chúng. Hầu như tất cả các ngôn ngữ lập trình hiện đại đều hỗ trợ serialization. 

Trong Java 1 đối tượng được chuyển đổi thành dạng nhỏ gọn sử dụng luồng byte, và bytes đó được chuyển đổi qua lại giữa object với chúng các loại serialization khác bao gồm:

* **XML**: Chuyển đổi object sang dạng XML, chuyển nó qua network hoặc lưu trữ nó trong 1 database. Truy xuất nó và chuyển đổi nó trở lại object với trạng thái ban đầu. Trong Java sử dụng thư viện JAXB (kiến trúc Java cho liên kết XML). Từ Java 6 nó đi kèm với JDK

* **JSON**: Tương tự như trong Java, có thể thực hiện được bằng cách chuyển đổi đối tượng thành JSON (Javascript Object notation). Hiện nay JSON được tích hợp sẵn trong Javascript.

* **OOP**: Serialization được cung cấp chính bởi OOP. Ví dụ như trong PHP ta có thể seserialization một object làm nó nó visualization lên và được viết trong Object Stream.

![](https://i.stack.imgur.com/Q28YV.png)

Thông qua Serialization, các developer có thể thực hiện các hành động như:

* Gửi đối tượng đến ứng dụng từ xa bằng Web Service. (AJAX)
* Chuyển đối tượng từ domain này sang domain khác. 
* Chuyển đối tượng qua Filewall dưới dạng XML.
* Duy trì bảo mật dành riêng cho người dùng thông tin trên các ứng dụng.

## 3. Các lỗ hổng do Deserialization

![](https://i.ytimg.com/vi/62zA3qJyaIg/maxresdefault.jpg)

TOP 10 OWASP năm 2017 thì Deserialization đứng thứ 7 về nguy cơ bảo mật hành đầu trong các Web Service. Các lỗ hổng được công bố thì chủ yếu nằm ở Java.

CVE-2017-9844	SAP NetWeaver
CVE-2017-9830	Code42 CrashPlan
CVE-2017-9805	Apache Struts
CVE-2017-7504	Red Hat JBoss
CVE-2017-5878	Apache OpenMeetings
CVE-2017-5645	Apache Log4j
CVE-2017-5641	Apache BlazeDS
CVE-2017-5586	OpenText Documentum

....

## 4. Tấn công Deserialization vào website

Hầu hết các cuộc tấn công mà chúng ta thấy đều liên quan đến việc seserialization byte của các đối tượng Java. 

Ngoài ra, chúng ta đã thấy một số cuộc tấn công serialization đến XML và các định dạng khác.

Phân bố các lỗ hổng trên các định dạng seserialization khác nhau:

![](https://s.cystack.net/resource/home/content/03141932/java-native-serialization.jpg)

Trong cuộc tấn công sau, kẻ tấn công đang cố khai thác lỗ hổng CVE-2017-10271. 

Các payload được gửi trong định dạng của yêu cầu HTTP bằng cách sử dụng một đối tượng Java được tuần tự hóa thông qua XML đại diện. 

Vector tấn công chứa mảng java được nối tiếp vào một XML.

![](https://s.cystack.net/resource/home/content/03141930/5-Attack-vector.jpg)

Thực tế đây là một array của Java có thể được nhìn thấy bởi cấu trúc phân cấp của các tham số. 

Với hậu tố của "java / void / array / void / string". Kẻ tấn công đang cố gắng chạy một tập lệnh bash trên máy chủ bị tấn công. Tập lệnh bash này cố gắng gửi một yêu cầu HTTP sử dụng lệnh hệ điều hành `wget` sau đó tải về một tập lệnh trình báo được ngụy trang dưới dạng tệp hình ảnh (lưu ý phần mở rộng tệp jpg) và chạy nó. 

Có rất ít các ghi chú được thực hiện kiểm tra lệnh này:
* Sự tồn tại của lệnh shell và `wget` chỉ ra rằng payload này đang nhắm đến các hệ thống Linux.

* Việc sử dụng một phần mở rộng tệp hình ảnh thường được thực hiện để tránh các điều kiện bảo mật.

* Tham số `-q` đến `wget` là viết tắt của "quiet", nghĩa là `wget` sẽ không có đầu ra cho giao diện điều khiển, do đó sẽ khó ghi nhận rằng yêu cầu đó được thực hiện. Một khi các tập lệnh tải về máy chủ bị nhiễm phần mềm độc hại khai thác tiền ảo, nó sẽ thực hiên quá trình đào tiền ảo Monero (một đồng tiền ảo tương tự như Bitcoin).

Mã Script tiếp theo cố gắng khai thác cùng một lỗ hổng, tuy nhiên thời gian này payload đang nhắm đến các máy chủ Windows bằng lệnh cmd.exe và Powershell để tải phần mềm độc hại và chạy nó. 

Tấn công vector đang cố gắng lây nhiễm cho máy chủ Windows bằng phần mềm độc hại khai thác tiền ảo.

![](https://s.cystack.net/resource/home/content/03141927/6-java-vectors-deserialization.jpg)

Điều này chỉ ra rằng có hai phương pháp lây nhiễm khác nhau cho máy chủ Windows và Linux.

Mỗi hệ thống tương ứng với một tập lệnh riêng được chỉ định của nó. Một ví dụ khác là payload sau  rút ra từ cuộc tấn công Deserialization với một đối tượng được nối tiếp Java.

![](https://s.cystack.net/resource/home/content/03141924/Attack-vector-7.png)

Mã hoá xâu là một sản phẩm của serialization trên Java, nơi mà đối tượng được đại diện trong luồng byte. 

Tuy nhiên, có thể thấy một tập lệnh thuần văn bản được đánh dấu màu vàng. 

`${IFS}` là một biến định nghĩa một dấu cách trường nội bộ, trong trường hợp này nó chỉ là một biến cho dấu cách. 

Biến này có thể được sử dụng thay cho dấu cách để làm cho payload khó phát hiện hơn. Cũng như trong các ví dụ trước, tập lệnh Bash nhắm mục tiêu các máy chủ Linux gửi một yêu cầu HTTP bằng cách sử dụng `wget` để tải xuống một công cụ đào tiền ảo (coin miner).

## 5. Các phương pháp tấn công khác

Điều chung của các cuộc tấn công ở trên là kẻ tấn công website đang cố lây nhiễm phần mềm độc hại khai thác tiền ảo bằng cách sử dụng lỗ hổng Deserialization không an toàn. 

Tuy nhiên tấn công Deserialization không phải là phương pháp duy nhất để đạt được mục tiêu này. 

Dưới đây, chúng ta sẽ thấy một ví dụ về một cuộc tấn công website khác, lần này tại header `Content-Type`.

![](https://s.cystack.net/resource/home/content/03141920/Attack-vector-f8.png)

Cuộc tấn công này cố gắng khai thác CVE-2017-5638, một lỗ hổng nổi tiếng của RCE liên quan đến Apache Struts đã được công bố vào tháng 3 năm 2017. 

Khi được ghi nhận lần đầu, chúng ta không thấy dấu vết của những người khai thác tiền ảo trong các cuộc tấn công liên quan đến CVE này và phần lớn payload là các cuộc tấn công trinh sát. 

Tuy nhiên, trong cuộc tấn công này, payload (đánh dấu màu vàng ở trên) rất giống với payload từ ví dụ trước sử dụng cùng một máy chủ từ xa và cùng một kịch bản chính xác:

* Lây nhiễm vào máy chủ bằng phần mềm độc hại khai thác tiền ảo. 

Phương pháp tấn công cũ này với một payload mới cho thấy một xu hướng mới trong lĩnh vực không gian mạng – những kẻ tấn công website cố gắng khai thác các lỗ hổng của RCE, mới và cũ, để biến các server yếu thành những người khai thác tiền ảo.

## 6. Đi sâu hơn về PHP, Python, Java

| Languages | URL  |
|-----------|------|
| Python    | [Link](/meowier/KCSC-Training/tree/main/bao-cao/deserialization/python.md) |
| PHP       | [Link](/meowier/KCSC-Training/tree/main/bao-cao/deserialization/php.md) |
| Java      | [Link](/meowier/KCSC-Training/tree/main/bao-cao/deserialization/java.md) |

