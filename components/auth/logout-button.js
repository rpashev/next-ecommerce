const LogoutButton = ({ logoutHandler }) => {
  return (
    <li>
      <button onClick={logoutHandler}>LOGOUT</button>
    </li>
  );
};

export default LogoutButton;
