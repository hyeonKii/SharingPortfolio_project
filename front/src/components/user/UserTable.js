import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import "./User.css"
function UserTable({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr>
        <th></th>
        <th>{user?.name}</th>
        <th>{user?.email}</th>
        <th>{user?.description}</th>
        {isNetwork && (
          <th style={{ display: "flex", justifyContent: "center" }}>
            <div className="portpolioIcon">
              <TbClipboardText
                href="#"
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
