import { BiEdit, BiTrash, BiUser } from "react-icons/bi";

export default function UserRow({ user }) {
  const role = user.is_superuser
    ? "Admin"
    : user.is_staff
    ? "Staff"
    : "User";

  const status = user.is_active ? "Hoạt động" : "Bị khóa";

  const isDefaultAvatar = !user.avt || user.avt === "default";

  return (
    <tr className="row">
      {/* AVATAR */}
      <td>
        {isDefaultAvatar ? (
          <div className="avatar">
            <BiUser />
          </div>
        ) : (
          <img
            src={user.avt}
            alt="avatar"
            className="avatar"
            onError={(e) => {
              e.target.src = "/img/avatar/default.png";
            }}
          />
        )}
      </td>

      {/* USER INFO */}
      <td>
        <div className="userText">
          <div className="name">
            {user.profile?.name || "Chưa có tên"}
          </div>
          <div className="email">{user.email}</div>
          <div className="phone">
            {user.profile?.phone || "-"}
          </div>
        </div>
      </td>

      <td>{user.profile?.date_of_birth || "-"}</td>

      <td>
        <span className={user.is_active ? "active" : "inactive"}>
          {status}
        </span>
      </td>

      <td className="role">{role}</td>

      <td>{user.last_login || "Chưa đăng nhập"}</td>

      <td>
        <button className="editBtn">
          <BiEdit />
        </button>
        <button className="deleteBtn">
          <BiTrash />
        </button>
      </td>
    </tr>
  );
}