# Triển khai PICC 2026

Hệ thống chạy bằng Docker và **mở đúng một cổng HTTP thuần**. Bên đối tác trỏ
nginx của họ vào cổng đó. TLS, tên miền và HSTS thuộc về phía họ.

```
Người dùng ──HTTPS──▶  nginx của đối tác  ──HTTP──▶  cổng của bạn (APP_PORT)
                                                        │
                                                   picc-nginx ──▶ picc-api ──▶ Postgres
```

**Đường dẫn gắn app là biến lúc chạy, không phải lúc build.** Đổi `APP_BASE_PATH`
rồi `docker compose up -d` là xong — không phải build lại image.

---

## 1. Cài trên server của bạn

```bash
cp .env.example .env
```

Sửa `.env`, tối thiểu bốn thứ:

| Biến | Ghi chú |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối Postgres. API **không khởi động** nếu thiếu. |
| `JWT_SECRET` | Tối thiểu 32 ký tự. Sinh bằng `openssl rand -base64 48`. |
| `APP_PORT` | Cổng bạn sẽ đưa cho bên đối tác. Mặc định `8080`. |
| `APP_BASE_PATH` | Đường dẫn công khai bên họ. Xem mục 2. |

Chạy:

```bash
docker compose up -d --build
```

Kiểm tra:

```bash
curl -i http://127.0.0.1:8080/health
```

Tạo tài khoản quản trị (mật khẩu không hiển thị khi gõ):

```bash
docker compose exec api npx tsx scripts/createAdmin.ts
```

---

## 2. Chọn `APP_BASE_PATH`

Giá trị này phải **khớp với đường dẫn công khai** bên đối tác dùng.

| Bên họ mở app tại | `APP_BASE_PATH` |
|---|---|
| `https://doitac.edu.vn/` (tên miền hoặc subdomain riêng) | `/` |
| `https://doitac.edu.vn/cuocthi/` | `/cuocthi/` |
| `https://doitac.edu.vn/picc-2026/` | `/picc-2026/` |

Sai giá trị này thì trang sẽ trắng: trình duyệt đi xin asset ở sai chỗ.

Đổi đường dẫn về sau:

```bash
sed -i 's#^APP_BASE_PATH=.*#APP_BASE_PATH=/duong-dan-moi/#' .env
docker compose up -d
```

---

## 3. `TRUSTED_PROXY_CIDRS` — đừng bỏ qua mục này

Đây là biến dễ sai nhất và hậu quả chỉ lộ ra khi đông người dùng.

nginx cần biết địa chỉ nào được phép khai báo `X-Forwarded-For`. Nếu địa chỉ
nginx của đối tác **không** nằm trong danh sách, mọi request trông như đến từ
cùng một IP. Giới hạn nộp hồ sơ là 5 lần/phút, nên **sau 5 lượt nộp trên toàn hệ
thống, tất cả thí sinh còn lại sẽ nhận lỗi 429**.

Hỏi bên đối tác địa chỉ IP nginx của họ, rồi đặt:

```bash
TRUSTED_PROXY_CIDRS="203.0.113.10/32"
```

Nếu nginx của họ chạy cùng máy với bạn thì giá trị mặc định (loopback + dải
private) là đủ.

Kiểm chứng sau khi đấu nối — cột `X-Real-IP` phải là IP thật của khách, không
phải IP proxy:

```bash
docker compose logs api | tail -20
```

---

## 4. Gửi cho bên đối tác

> Ứng dụng chạy ở `http://<ip-server>:8080` (HTTP thuần, không TLS).
>
> Vui lòng proxy **giữ nguyên tiền tố đường dẫn** — đừng cắt bỏ nó:
>
> ```nginx
> location /cuocthi/ {
>     proxy_pass http://<ip-server>:8080;   # KHÔNG có dấu / ở cuối
>
>     proxy_http_version 1.1;
>     proxy_set_header Host              $host;
>     proxy_set_header X-Real-IP         $remote_addr;
>     proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
>     proxy_set_header X-Forwarded-Proto $scheme;
>
>     client_max_body_size 50M;
>     proxy_read_timeout   60s;
> }
> ```
>
> Hai điểm quan trọng:
>
> 1. **`proxy_pass` không có dấu `/` ở cuối.** Có dấu `/` là nginx cắt mất tiền
>    tố `/cuocthi/`, ứng dụng sẽ không tìm thấy tài nguyên.
> 2. **Phải chuyển tiếp `X-Forwarded-For`.** Thiếu header này, mọi thí sinh bị
>    tính chung một hạn mức và cổng đăng ký sẽ khoá sau vài lượt nộp.
>
> Cho chúng tôi biết địa chỉ IP nginx của bên bạn để đưa vào danh sách tin cậy.

Nếu bên họ **bắt buộc** phải cắt tiền tố (`proxy_pass http://ip:8080/;`) thì đặt
`APP_BASE_PATH=/` phía bạn. Khi đó app tự coi mình nằm ở gốc, và đường dẫn tương
đối vẫn giải đúng.

---

## 5. Kiểm tra sau khi đấu nối

```bash
# Thay bằng URL công khai thật
URL=https://doitac.edu.vn/cuocthi/

curl -o /dev/null -s -w 'trang chu      %{http_code}\n' "$URL"
curl -o /dev/null -s -w 'deep link      %{http_code}\n' "${URL}dang-ky"
curl -s "${URL}api/v1/public/competition/status" | head -c 200; echo
curl -s "$URL" | grep -o '<base href="[^"]*"'
```

`<base href>` in ra phải trùng với đường dẫn công khai. Nếu thấy
`__PICC_BASE_PATH__` nghĩa là container chạy không qua entrypoint.

---

## 6. Những thứ hay hỏng

| Triệu chứng | Nguyên nhân |
|---|---|
| Trang trắng, console báo 404 file `.js` | `APP_BASE_PATH` không khớp đường dẫn công khai, hoặc proxy đã cắt tiền tố |
| Vào thẳng `/cuocthi/dang-ky` thì 404 | Bên họ chỉ proxy đúng một đường dẫn thay vì cả tiền tố `/cuocthi/` |
| Đăng ký báo 429 dù ít người | `TRUSTED_PROXY_CIDRS` thiếu IP nginx của đối tác |
| API trả 502 | Container `api` chưa healthy — xem `docker compose logs api` |
| `docker compose up` báo thiếu biến | Chưa điền `DATABASE_URL` hoặc `JWT_SECRET` trong `.env` |
| Không đăng nhập được admin | Chưa tạo tài khoản — chạy `createAdmin.ts` ở mục 1 |

---

## 7. Sao lưu

Dữ liệu đăng ký nằm hoàn toàn trong Postgres, không có file nào trong container.
Sao lưu là sao lưu database:

```bash
./scripts/backup-db.sh
```
