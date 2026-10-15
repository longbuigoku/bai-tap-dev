import { useState } from "react";

// State của ô nhập là state cục bộ, chỉ form này quan tâm
export default function TodoForm({ onThem }) {
    const [ten, setTen] = useState("");

    const xuLyGui = (e) => {
        e.preventDefault();
        const tenSach = ten.trim();
        if (!tenSach) return; // bỏ qua nếu rỗng
        onThem(tenSach);
        setTen("");
    };

    return (
        <form onSubmit={xuLyGui} className="flex gap-2 mb-4">
            <input
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                placeholder="Nhập công việc mới"
                className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                Thêm
            </button>
        </form>
    );
}