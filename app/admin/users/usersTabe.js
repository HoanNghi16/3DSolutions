"use client";
import UserRow from "./userRow";

export default function UsersTable({ users }) {
  return (
    <div className="tableWrapper">
        <div className="table">
        <div className="userHeader">
            <h4></h4>
            <h4>Thông tin</h4>
            <h4>Ngày sinh</h4>
            <h4>Trạng thái</h4>
            <h4>Vai trò</h4>
            <h4>Truy cập gần nhất</h4>
            <h4>Cập nhật</h4>
        </div>

        <div className="userBody">
            {users && users.length > 0 ? (
            users.map((user) => (
                <UserRow key={user.email} user={user} />
            ))
            ) : (
            <div>
                <p className="empty">
                    Không có người dùng
                </p>
            </div>
            )}
        </div>
        </div>
    </div>
  );
}