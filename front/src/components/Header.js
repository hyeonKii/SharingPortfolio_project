import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import "./Header.css"
function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Nav activeKey={location.pathname} className="mb-5" style={{backgroundColor:"#9DCC90"}}>
      <Nav.Item className="me-auto">
        <Nav.Link disabled style={{fontSize:"24px"}}>Team 11 NOVEMBER</Nav.Link>
      </Nav.Item>
      <Nav.Item className="p-3">
        <Nav.Link className="navbar" onClick={() => navigate("/")}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item className="p-3">
        <Nav.Link className="navbar" onClick={() => navigate("/network")}>네트워크</Nav.Link>
      </Nav.Item >
      {isLogin && (
        <Nav.Item className="p-3">
          <Nav.Link className="navbar" onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
