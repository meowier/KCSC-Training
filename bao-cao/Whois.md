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

## 5. Whois Linux 

Ở linux thì Whois được giao tiếp máy server qua cổng 43, nơi lưu trữ và cung cấp cơ sở dữ liệu. Whois Linux cung cấp thêm các thông tin liên quan đến máy chủ server.

Để cài đặt:

```sh
$ yum install whois		#RHEL/CentOS
$ dnf install whois		#Fedora 22+
$ sudo apt install whois	#Debian/Ubuntu
```

Xem các tùy chọn với Whois:
```
hyp@DESKTOP-JLK4IOP:~$ whois -h
whois: option requires an argument -- 'h'
Usage: whois [OPTION]... OBJECT...

-h HOST, --host HOST   connect to server HOST
-p PORT, --port PORT   connect to PORT
-I                     query whois.iana.org and follow its referral
-H                     hide legal disclaimers
      --verbose        explain what is being done
      --help           display this help and exit
      --version        output version information and exit

These flags are supported by whois.ripe.net and some RIPE-like servers:
-l                     find the one level less specific match
-L                     find all levels less specific matches
-m                     find all one level more specific matches
-M                     find all levels of more specific matches
-c                     find the smallest match containing a mnt-irt attribute
-x                     exact match
-b                     return brief IP address ranges with abuse contact
-B                     turn off object filtering (show email addresses)
-G                     turn off grouping of associated objects
-d                     return DNS reverse delegation objects too
-i ATTR[,ATTR]...      do an inverse look-up for specified ATTRibutes
-T TYPE[,TYPE]...      only look for objects of TYPE
-K                     only primary keys are returned
-r                     turn off recursive look-ups for contact information
-R                     force to show local copy of the domain object even
                       if it contains referral
-a                     also search all the mirrored databases
-s SOURCE[,SOURCE]...  search the database mirrored from SOURCE
-g SOURCE:FIRST-LAST   find updates from SOURCE from serial FIRST to LAST
-t TYPE                request template for object of TYPE
-v TYPE                request verbose template for object of TYPE
-q [version|sources|types]  query specified server info
```

Demo Whois:


```
hyp@DESKTOP-JLK4IOP:~$ whois hypnguyen.com
   Domain Name: HYPNGUYEN.COM
   Registry Domain ID: 2574714526_DOMAIN_COM-VRSN
   Registrar WHOIS Server: whois.namecheap.com
   Registrar URL: http://www.namecheap.com
   Updated Date: 2020-11-27T01:04:59Z
   Creation Date: 2020-11-26T12:58:33Z
   Registry Expiry Date: 2021-11-26T12:58:33Z
   Registrar: NameCheap, Inc.
   Registrar IANA ID: 1068
   Registrar Abuse Contact Email: abuse@namecheap.com
   Registrar Abuse Contact Phone: +1.6613102107
   Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
   Name Server: MIA.NS.CLOUDFLARE.COM
   Name Server: YICHUN.NS.CLOUDFLARE.COM
   DNSSEC: unsigned
   URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
Domain name: hypnguyen.com
Registry Domain ID: 2574714526_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.namecheap.com
Registrar URL: http://www.namecheap.com
Updated Date: 0001-01-01T00:00:00.00Z
Creation Date: 2020-11-26T12:58:33.00Z
Registrar Registration Expiration Date: 2021-11-26T12:58:33.00Z
Registrar: NAMECHEAP INC
Registrar IANA ID: 1068
Registrar Abuse Contact Email: abuse@namecheap.com
Registrar Abuse Contact Phone: +1.6613102107
Reseller: NAMECHEAP INC
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Registry Registrant ID:
Registrant Name: Withheld for Privacy Purposes
Registrant Organization: Privacy service provided by Withheld for Privacy ehf
Registrant Street: Kalkofnsvegur 2
Registrant City: Reykjavik
Registrant State/Province: Capital Region
Registrant Postal Code: 101
Registrant Country: IS
Registrant Phone: +354.4212434
Registrant Phone Ext:
Registrant Fax:
Registrant Fax Ext:
Registrant Email: 2f23eff79df243c38ec4e48398e0338e.protect@withheldforprivacy.com
Registry Admin ID:
Admin Name: Withheld for Privacy Purposes
Admin Organization: Privacy service provided by Withheld for Privacy ehf
Admin Street: Kalkofnsvegur 2
Admin City: Reykjavik
Admin State/Province: Capital Region
Admin Postal Code: 101
Admin Country: IS
Admin Phone: +354.4212434
Admin Phone Ext:
Admin Fax:
Admin Fax Ext:
Admin Email: 2f23eff79df243c38ec4e48398e0338e.protect@withheldforprivacy.com
Registry Tech ID:
Tech Name: Withheld for Privacy Purposes
Tech Organization: Privacy service provided by Withheld for Privacy ehf
Tech Street: Kalkofnsvegur 2
Tech City: Reykjavik
Tech State/Province: Capital Region
Tech Postal Code: 101
Tech Country: IS
Tech Phone: +354.4212434
Tech Phone Ext:
Tech Fax:
Tech Fax Ext:
Tech Email: 2f23eff79df243c38ec4e48398e0338e.protect@withheldforprivacy.com
Name Server: mia.ns.cloudflare.com
Name Server: yichun.ns.cloudflare.com
DNSSEC: unsigned
```
## 6. Thu thập một số thông tin liên quan
Một số những thư viện hay trang web có hỗ trợ lấy các thông tin liên quan như:

* [weppos/whois](https://github.com/weppos/whois) là một repo khá nổi tiếng được viết bằng Ruby và có trích xuất dữ liệu từ `RoboWhois` và `RoboDomain`. Công dụng để tra cứu các bản ghi cho IPv4, IPv6, TLD, ICCAN, ...

* [likexian/whois](https://github.com/likexian/whois) tương tự repo trên nhưng được viết bằng Golang.

* [DNSDumper](https://dnsdumpster.com/) là sản phẩm của nhóm `hackertarget`, là công cụ để tìm các thông tin liên quan đến máy chủ tên miền, không chỉ là tên miền phụ, mà còn có các record MX, TXT, ....

![](https://i.imgur.com/0t3ysRv.png)


* https://web.archive.org/ là một tổ chức phi lợi nhuận, trang web chuyên lưu trữ nội dung các website trên toàn thế giới theo mốc thời gian

![](https://i.imgur.com/DP6tZqq.png)

* https://www.wappalyzer.com/ một tiện ích đa nền tảng giúp khám phá các công nghệ được sử dụng trên các trang web. Nó phát hiện các hệ thống quản lý nội dung, nền tảng thương mại điện tử, khung web, phần mềm máy chủ

![](https://i.imgur.com/askneVc.png)

* [Go Buster](https://github.com/OJ/gobuster) công cụ scan dir trên trang web vô cùng mạnh được viết bằng Golang, ưu điểm chạy được đa luồng. Trong khi `dirb` chỉ chạy 1 luồng.
## 5. Kết
Một số nguồn tham khảo: 

https://cungdaythang.com/archive-org-la-gi/

https://nhanhoa.com/tin-tuc/whois-la-gi.html

https://www.google.com/

