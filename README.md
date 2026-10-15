# Bài tập DEV 005 01
# AIO An Gia — Web Virtual Tour

Ứng dụng xem tour 360° tương tác cho dự án bất động sản AIO An Gia, tích hợp krpano viewer, chuyển cảnh theo tầng, la bàn, đa ngôn ngữ (VI/EN).

## Tính năng

- Xem tour 360° nhúng bằng krpano (`KrpanoViewer`).
- Chuyển cảnh theo tầng (55m / 100m) thông qua `FloorPanel`.
- La bàn xoay theo hướng nhìn (`Compass`).
- Zoom controls tùy chỉnh (`KrpanoZoomControls`).
- Nút toàn màn hình (`BtnFullScreen`).
- Màn hình loading trong khi krpano khởi tạo (`Loading`, `BgLoading`).
- Đa ngôn ngữ VI / EN qua `i18next` + `react-i18next`.
- Quản lý state toàn cục (responsive breakpoints, ngôn ngữ) qua Zustand, persist vào `localStorage`.
- Bảo vệ devtools trong môi trường production (`ProductionDevtoolGuard`).
- Deploy tĩnh tại base path `/aio-an-gia/`.

## Tech stack

| Hạng mục | Công nghệ |
| --- | --- |
| Framework và ngôn ngữ | React 19, TypeScript |
| UI / Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Framer Motion |
| Icons | Lucide React |
| State management | Zustand 5 (persist middleware) |
| I18n | i18next + react-i18next (VI / EN) |
| 360° viewer | krpano (nhúng qua script, tương tác qua JS API) |
| Build tool | Vite 8 |
| Quản lý package | npm |

## Cấu trúc thư mục

```
src/
├── main.tsx                      Điểm vào, nạp i18n rồi mount App
├── App.tsx                       Màn hình chính, ghép các component lại
├── index.css                     CSS toàn cục + Tailwind
├── assets/                       Tài nguyên tĩnh nhúng trong bundle
├── components/
│   ├── KrpanoViewer.tsx          Nhúng krpano, expose ref, load scene
│   ├── KrpanoZoomControls.tsx    Nút zoom in/out tùy chỉnh
│   ├── FloorPanel.tsx            Panel chọn tầng (55m / 100m)
│   ├── Compass.tsx               La bàn xoay theo hướng nhìn
│   ├── BtnFullScreen.tsx         Nút toàn màn hình
│   ├── SideTool.tsx              Nhóm nút công cụ bên cạnh
│   ├── Loading.tsx               Màn hình chờ loading
│   ├── BgLoading.tsx             Ảnh nền loading
│   ├── Tooltip.tsx               Tooltip dùng chung
│   └── ProductionDevtoolGuard.tsx Chặn devtools trên production
├── zustand/
│   ├── useCommonStore.ts         Store: breakpoints, ngôn ngữ, filter route
│   └── useKrpanoStore.ts         Store: ref đến krpano instance
├── config/
│   └── translation.ts            Khởi tạo i18next
├── locales/
│   ├── en/translation.json       Chuỗi tiếng Anh
│   └── vi/translation.json       Chuỗi tiếng Việt
└── utils/
    └── path.ts                   Helper assetPath() cho static export
```

## Biến môi trường

Tạo file `.env` tại thư mục gốc:

```env
VITE_PUBLIC_BASE_PATH=/aio-an-gia
```

> File `.env` **không được** commit lên git (đã có trong `.gitignore`).

## Chạy project ở máy local

Yêu cầu: Node.js 20 trở lên.

```bash
# 1. Clone repo và vào thư mục project
git clone <repo-url>
cd web-aio-an-gia

# 2. Tạo file .env
echo "VITE_PUBLIC_BASE_PATH=/aio-an-gia" > .env

# 3. Cài dependency
npm install

# 4. Chạy chế độ dev
npm run dev
```

Mở địa chỉ hiện trong terminal (thường là `http://localhost:5173/aio-an-gia/`).

Các lệnh khác:

```bash
npm run build     # type-check + build production vào dist/
npm run preview   # chạy thử bản build
npm run lint      # kiểm tra lỗi ESLint
```

### Lỗi setup thường gặp

- **Sai bản Node:** kiểm tra bằng `node -v`, cần bản 20 trở lên.
- **Tài nguyên krpano không tải được:** đảm bảo thư mục `public/view360/` chứa file `tour.xml` và các file krpano.
- **Base path sai:** kiểm tra `VITE_PUBLIC_BASE_PATH` trong `.env` khớp với `base` trong `vite.config.ts`.
- **Cổng bị chiếm:** Vite tự đổi cổng, đọc địa chỉ trong terminal.
- **Lỗi lạ sau khi cài:** xóa `node_modules` và chạy lại `npm install`.

## Luồng dữ liệu

```
App (state: currentPlan)
├─ Loading              ← useKrpanoStore (isReady)
├─ KrpanoViewer         → expose krpanoRef vào useKrpanoStore
├─ Compass              ← krpanoRef (đọc hướng nhìn)
├─ KrpanoZoomControls   ← krpanoRef (gọi zoom)
├─ FloorPanel           ← currentPlan / onFloorClick → krpanoRef.call(loadscene)
└─ SideTool             ← BtnFullScreen, các nút phụ trợ
```

State dùng chung (`krpanoRef`, `language`, breakpoints) đặt trong Zustand stores.

# Bài tập DEV 005 02
## Chuẩn bị trình bày codebase

### Thứ tự trình bày đề xuất

1. **Điểm vào** — `index.html` → `main.tsx`: giải thích cách React mount và i18n được khởi tạo trước khi render.
2. **App.tsx** — component gốc: trình bày state `currentPlan`, vòng lặp polling krpano, và cách các component được ghép lại.
3. **KrpanoViewer.tsx** — giải thích cơ chế nhúng krpano qua script, `useImperativeHandle`, `safeLoadScene`.
4. **Zustand stores** — `useKrpanoStore` (ref instance) và `useCommonStore` (breakpoints, ngôn ngữ, persist).
5. **FloorPanel.tsx** — luồng props: `currentPlan` đi xuống, `onFloorClick` đi lên, krpano call.
6. **i18n** — `config/translation.ts`, cấu trúc `locales/`, cách switch ngôn ngữ qua store.
7. **utils/path.ts** — lý do cần `assetPath()` khi deploy tĩnh trên sub-path.

### Những điểm quan trọng cần nắm chắc

- **Tại sao dùng `setInterval` thay vì event krpano?** — krpano không expose event `onscenechange` đơn giản, polling 100ms là cách thực tế nhất để đọc `current_floor`.
- **`useImperativeHandle` dùng để làm gì?** — Cho phép `App.tsx` truy cập trực tiếp krpano JS API qua ref, tách biệt logic viewer khỏi parent.
- **Tại sao Zustand thay vì Context?** — Tránh re-render toàn cây, persist middleware đơn giản, selector giúp component chỉ subscribe đúng slice state cần.
- **Base path `/aio-an-gia/` hoạt động thế nào?** — `base` trong `vite.config.ts` + `assetPath()` trong code đảm bảo mọi asset URL đều có prefix đúng khi deploy.
- **`ProductionDevtoolGuard` làm gì?** — Dùng `disable-devtool` để ngăn người dùng mở DevTools trên môi trường production, bảo vệ source code.

## Sẵn sàng cho buổi Q&A với mentor

### Câu hỏi mentor có thể hỏi

| Câu hỏi | Gợi ý trả lời |
| --- | --- |
| Tại sao chọn Zustand thay vì Redux? | App nhỏ, Zustand boilerplate ít hơn, API đơn giản, tích hợp persist dễ |
| Polling 100ms có ảnh hưởng performance không? | Ảnh hưởng không đáng kể, interval được clear đúng lúc unmount, có thể tối ưu bằng event nếu krpano hỗ trợ |
| Framer Motion dùng ở đâu? | Animation cho Loading screen và các transition UI |
| Làm sao test component phụ thuộc krpano? | Mock `useKrpanoStore`, inject fake ref với các method stub |
| Tại sao không dùng React Router? | App chỉ có một màn hình duy nhất, không cần routing |
| `skipHydration: true` trong Zustand là gì? | Tránh lỗi hydration mismatch khi SSR/SSG, phải gọi `rehydrate()` thủ công |

### Checklist trước buổi trình bày

- [ ] Chạy `npm run dev` và xác nhận tour load bình thường.
- [ ] Mở DevTools → Network, kiểm tra `tour.xml` và krpano assets load đúng base path.
- [ ] Thử chuyển tầng (55m ↔ 100m), xác nhận `FloorPanel` highlight đúng.
- [ ] Chạy `npm run lint` — không có lỗi ESLint.
- [ ] Chạy `npm run build` — build thành công không có lỗi TypeScript.
