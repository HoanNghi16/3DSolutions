import { BiEdit, BiTrash, BiUser } from "react-icons/bi";
import './userRow.css';
export default function UserRow({ user , edit = false}) {
  const role = user.is_superuser
    ? "Admin"
    : user.is_staff
    ? "Staff"
    : "Customer";

  const status = user.is_active ? "Hoạt động" : "Bị khóa";

  const isDefaultAvatar = !user.avt || user.avt === "default";

  return (
    <div className="row">
      {/* AVATAR */}
        {isDefaultAvatar ? (
          <div className="avatar">
            <BiUser />
          </div>
        ) : (
          <img
            src={user.avt}
            alt="avatar"
            className="avatar"
          />
        )}

      {/* USER INFO */}
        <div className="userText">
          <div className="name">
            {user.profile?.name || "Chưa có tên"}
          </div>
          <div className="email">{user.email}</div>
          <div className="phone">
            {user.profile?.phone || "-"}
          </div>
        </div>


      <p>{user.profile?.date_of_birth || "-"}</p>

      <p>
        <span className={user.is_active ? "active" : "inactive"}>
          {status}
        </span>
      </p>

      <p className="role">{role}</p>

      <p>{user.last_login || "Chưa đăng nhập"}</p>
        {edit?null : <div className="userBtns">
        <a href={"/admin/users/editUser?id=" + user.id} className="editBtn">
          <BiEdit />
        </a>
        <button className="deleteBtn">
          <BiTrash />
        </button>
      </div>}
    </div>
  );
}