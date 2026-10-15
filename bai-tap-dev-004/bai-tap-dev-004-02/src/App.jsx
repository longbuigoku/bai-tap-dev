import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const DU_LIEU_BAN_DAU = [
  { id: 1, ten: "Học useState", xong: true },
  { id: 2, ten: "Làm app Todo", xong: false },
];

export default function App() {
  // State duy nhất của app nằm ở component cha (lifting state up)
  const [todos, setTodos] = useState(DU_LIEU_BAN_DAU);

  // CREATE: tạo mảng mới, không push vào mảng cũ
  const themTodo = (ten) => {
    setTodos((truoc) => [...truoc, { id: crypto.randomUUID(), ten, xong: false }]);
  };

  // UPDATE: đổi trạng thái hoàn thành
  const doiTrangThai = (id) => {
    setTodos((truoc) =>
      truoc.map((t) => (t.id === id ? { ...t, xong: !t.xong } : t))
    );
  };

  // UPDATE: sửa tên
  const suaTodo = (id, tenMoi) => {
    setTodos((truoc) =>
      truoc.map((t) => (t.id === id ? { ...t, ten: tenMoi } : t))
    );
  };

  // DELETE: giữ lại những item có id khác
  const xoaTodo = (id) => {
    setTodos((truoc) => truoc.filter((t) => t.id !== id));
  };

  const soConLai = todos.filter((t) => !t.xong).length;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-1">Todo</h1>
      <p className="text-sm text-gray-500 mb-4">Còn {soConLai} việc chưa xong</p>

      <TodoForm onThem={themTodo} />
      <TodoList
        todos={todos}
        onDoiTrangThai={doiTrangThai}
        onSua={suaTodo}
        onXoa={xoaTodo}
      />
    </div>
  );
}