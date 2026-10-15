import { useState } from "react";

// 1. Dữ liệu nguồn: mỗi phần tử có một id duy nhất và ổn định
const CONG_VIEC = [
    { id: 1, ten: "Đọc tài liệu về useState", xong: true },
    { id: 2, ten: "Làm bài tập render danh sách", xong: true },
    { id: 3, ten: "Tìm hiểu vì sao cần key", xong: false },
    { id: 4, ten: "Thử lọc bằng conditional rendering", xong: false },
    { id: 5, ten: "Viết component đầu tiên của dự án", xong: false },
];

const BO_LOC = [
    { gia_tri: "tat-ca", nhan: "Tất cả" },
    { gia_tri: "da-xong", nhan: "Đã xong" },
    { gia_tri: "chua-xong", nhan: "Chưa xong" },
];

export default function DanhSachCongViec() {
    // 2. State lưu bộ lọc đang chọn
    const [boLoc, setBoLoc] = useState("tat-ca");

    // Tạo mảng mới đã lọc, không sửa mảng gốc
    const danhSachHienThi = CONG_VIEC.filter((cv) => {
        if (boLoc === "da-xong") return cv.xong;
        if (boLoc === "chua-xong") return !cv.xong;
        return true;
    });

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">Công việc của tôi</h1>

            {/* Các nút lọc: nút đang chọn có kiểu khác (điều kiện trong className) */}
            <div className="flex gap-2 mb-4">
                {BO_LOC.map((b) => (
                    <button
                        key={b.gia_tri}
                        onClick={() => setBoLoc(b.gia_tri)}
                        className={
                            boLoc === b.gia_tri
                                ? "px-3 py-1 rounded bg-blue-600 text-white"
                                : "px-3 py-1 rounded border border-gray-300"
                        }
                    >
                        {b.nhan}
                    </button>
                ))}
            </div>

            {/* 3. Conditional rendering: có item thì hiện danh sách, không thì hiện thông báo */}
            {danhSachHienThi.length > 0 ? (
                <ul className="space-y-2">
                    {danhSachHienThi.map((cv) => (
                        // 4. key = id duy nhất, KHÔNG dùng index vì danh sách thay đổi khi lọc
                        <li
                            key={cv.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded"
                        >
                            <span className={cv.xong ? "line-through text-gray-400" : ""}>
                                {cv.ten}
                            </span>
                            {cv.xong && <span className="text-green-600 text-sm">Đã xong</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Không có công việc nào trong mục này.</p>
            )}
        </div>
    );
}