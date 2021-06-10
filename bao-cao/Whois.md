# Whois

## 1. Whois là gì
Whois là một dạng công cụ  để kiểm tra thông tin về tên miền (domain). Bao gồm các thông tin như: Tên chủ sở hữu, email/SĐT chủ sở hữu, nơi đăng kí, ngày đăng kí, ngày hết hạn,... Whois là một công cụ hoàn toàn miễn phí.
## 2. Đặc điểm và tính năng
Theo luật quốc tế thì mỗi tên miền đều phải được đăng kí. Điều này là rất quan trọng để kiểm soát hành vi của website mà còn để theo dõi các tội phạm và bảo vệ thương hiệu của website...

Người dùng sử dụng Whois để kiểm tra tên miền đó đã có ai đăng kí hay chưa, nếu có người sở hữu rồi thì có thể sẽ liên hệ với chủ sở hữu để mua lại hoặc chọn một tên miền khác thay thế. 

Trang web mà mình hay sử dụng để tra cứu thông tin tên miền whois là: https://who.is

## 3. Các thông tin Whois cung cấp
Đầu tiên là về nhà cung cấp tên miền: (Registrar)
Là các tổ chức công ty được ủy quyền để phân phối tên miền, bao gồm các thông tin  liên quan đến server whois và giấy phép được ủy quyền.
![](https://i.imgur.com/L8AZ2FV.png)

Tiếp theo là các thông tin liên quan đến ngày đăng kí tên miền, ngày gia hạn cuồi cùng và ngày hết hạn.
![](https://i.imgur.com/rQPMk7p.png)

Sau đó là các thông tin liên quan đến tên máy chủ mà tên miền này trỏ tới, tên chủ sở hữu và các thông tin liên quan đến chủ sở hữu nhưng địa chỉ, nơi ở, Zipcode, SĐT, email,..

## 4. Bảo vệ các thông tin đó như thế nào
Hiện nay 1 số nhà cung cấp tên miền cung cấp dịch vụ Whois Privacy để ẩn các thông tin chính xác của chủ sở hữu tên miền đi về chỉ được lưu trên máy chủ whois của họ. Các tội phạm mạng lợi dụng thông tin cá nhân để mưu lợi bất chính, mua bán thông tin cá nhân cho các danh sách spam. 

Nhưng điều này vô hình chung đã tạo tên sự khó khăn trong việc tìm kiếm thu thập các thông tin, nhưng nếu có liên quan đến pháp luật thì việc truy tìm này cũng không hề khó.

![](https://i.imgur.com/mjiYq2S.png)

Đối với các tên miền được mua ở Việt Nam thì việc khai báo các thông tin chính xác là điều bắt buộc cho các nhà cung cấp.

Tra cứu các thông tin tên miền được mua tại các nhà cung cấp của Việt Nam: https://vnnic.vn/whois-information

## 5. Thu thập một số thông tin liên quan
Một số những thư viện hay trang web có hỗ trợ lấy các thông tin liên quan như:

* [weppos/whois](https://github.com/weppos/whois) là một repo khá nổi tiếng được viết bằng Ruby và có trích xuất dữ liệu từ `RoboWhois` và `RoboDomain`. Công dụng để tra cứu các bản ghi cho IPv4, IPv6, TLD, ICCAN, ...

* [likexian/whois](https://github.com/likexian/whois) tương tự repo trên nhưng được viết bằng Golang.

* [DNSDumper](https://dnsdumpster.com/) là sản phẩm của nhóm `hackertarget`, là công cụ để tìm các thông tin liên quan đến máy chủ tên miền, không chỉ là tên miền phụ, mà còn có các record MX, TXT, ....

![](https://i.imgur.com/0t3ysRv.png)


* https://web.archive.org/ là một tổ chức phi lợi nhuận, trang web chuyên lưu trữ nội dung các website trên toàn thế giới theo mốc thời gian

![](https://i.imgur.com/DP6tZqq.png)

* https://www.wappalyzer.com/ một tiện ích đa nền tảng giúp khám phá các công nghệ được sử dụng trên các trang web. Nó phát hiện các hệ thống quản lý nội dung, nền tảng thương mại điện tử, khung web, phần mềm máy chủ

![](https://i.imgur.com/askneVc.png)

## 5. Kết
Một số nguồn tham khảo: 

https://cungdaythang.com/archive-org-la-gi/

https://nhanhoa.com/tin-tuc/whois-la-gi.html

https://www.google.com/

