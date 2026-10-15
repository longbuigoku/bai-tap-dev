import { useState } from "react";

export default function TodoItem({ todo, onDoiTrangThai, onSua, onXoa }) {
    // State cục bộ: đang sửa hay không, và nội dung đang gõ dở
    const [dangSua, setDangSua] = useState(false);
    const [ban, setBan] = useState(todo.ten);

    const luu = () => {
        const tenSach = ban.trim();
        if (!tenSach) return;
        onSua(todo.id, tenSach);
        setDangSua(false);
    };

    const huy = () => {
        setBan(todo.ten); // trả về giá trị cũ
        setDangSua(false);
    };

    return (
        <li className="flex items-center gap-2 p-3 border border-gray-200 rounded">
            {dangSua ? (
                <>
                    <input
                        value={ban}
                        onChange={(e) => setBan(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") luu();
                            if (e.key === "Escape") huy();
                        }}
                        autoFocus
                        className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    />
                    <button onClick={luu} className="text-blue-600">Lưu</button>
                    <button onClick={huy} className="text-gray-500">Hủy</button>
                </>
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={todo.xong}
                        onChange={() => onDoiTrangThai(todo.id)}
                    />
                    <span className={`flex-1 ${todo.xong ? "line-through text-gray-400" : ""}`}>
                        {todo.ten}
                    </span>
                    <button onClick={() => setDangSua(true)} className="text-blue-600">Sửa</button>
                    <button onClick={() => onXoa(todo.id)} className="text-red-600">Xóa</button>
                </>
            )}
        </li>
    );
}