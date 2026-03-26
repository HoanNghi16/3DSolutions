"use client";
import UserRow from "./userRow";

export default function UsersTable({ users }) {
  return (
    <div className="tableWrapper">
        <table className="table">
        <thead>
            <tr>
            <th></th>
            <th>Thông tin</th>
            <th>Ngày sinh</th>
            <th>Trạng thái</th>
            <th>Vai trò</th>
            <th>Last Login</th>
            <th>Hành động</th>
            </tr>
        </thead>

        <tbody>
            {users && users.length > 0 ? (
            users.map((user) => (
                <UserRow key={user.email} user={user} />
            ))
            ) : (
            <tr>
                <td colSpan="7" className="empty">
                Không có người dùng
                </td>
            </tr>
            )}
        </tbody>
        </table>
    </div>
  );
}