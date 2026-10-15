import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDoiTrangThai, onSua, onXoa }) {
    if (todos.length === 0) {
        return <p className="text-gray-500">Chưa có công việc nào. Hãy thêm một việc.</p>;
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDoiTrangThai={onDoiTrangThai}
                    onSua={onSua}
                    onXoa={onXoa}
                />
            ))}
        </ul>
    );
}