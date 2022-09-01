import { useNavigate } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import "../components.css";
function UserTable({ user, isNetwork }) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr>
        <th>{user?.name}</th>
        <th>{user?.email}</th>
        <th>{user?.description}</th>
        {isNetwork && (
          <th style={{ display: "flex", justifyContent: "center" }}>
            <div className="portpolioIcon">
              <TbClipboardText
                onClick={() => navigate(`/users/${user.id}`)}
              />
            </div>
          </th>
        )}
      </tr>
    </tbody>
  );
}

export default UserTable;
