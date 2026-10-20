# Tháng Mười Nở Hoa

Website chúc mừng ngày Phụ nữ Việt Nam 20/10, được xây dựng bằng HTML, CSS và JavaScript thuần. Không cần cài thư viện hoặc bước build.

## Xem trên máy

```sh
python -m http.server 4173 --directory dist
```

Mở `http://localhost:4173`.

## Trải nghiệm

- Ảnh hoa được tạo riêng, hiệu ứng ánh sao theo con trỏ, chuyển động thị sai và cánh hoa tự rơi nhẹ nhàng xuyên suốt trang.
- Bốn loại hoa có lời nhắn riêng: hoa hồng, Sophia, tulip và cúc họa mi. Ý nghĩa được diễn giải trong ngữ cảnh lời chúc của khu vườn.
- Lời chúc bất ngờ, trình soạn thiệp cá nhân, gợi ý nội dung và tải thiệp PNG 1200 × 1600 px.
- Nhạc nền được tổng hợp trực tiếp bằng Web Audio, chỉ phát khi được bật.
- Thiệp được lưu trong bộ nhớ của trình duyệt. Không có máy chủ lưu nội dung lời chúc.
- Giao diện đáp ứng, điều hướng bàn phím, hộp thoại có quản lý focus, hỗ trợ tùy chọn giảm chuyển động.
- Font chữ và hình ảnh được lưu cục bộ; không phụ thuộc dịch vụ ảnh hoặc font bên ngoài.

## Cấu trúc

- `dist/index.html`: nội dung và cấu trúc.
- `dist/styles.css`: thiết kế và bố cục đáp ứng.
- `dist/app.js`: hoạt ảnh, âm thanh, hộp thoại và xuất thiệp.
- `dist/assets/`: ảnh và font chữ.
- `.openai/hosting.json`: cấu hình xuất bản Sites.

Font chữ Be Vietnam Pro và Playfair Display được cung cấp theo SIL Open Font License. Ảnh hoa được tạo riêng cho website.
