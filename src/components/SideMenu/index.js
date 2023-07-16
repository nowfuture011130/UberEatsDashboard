import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
const SideMenu = () => {
  const navigate = useNavigate();
  const onclick = async (item) => {
    if (item.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(item.key);
    }
  };
  const nemuItem = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Orders History",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "signOut",
      label: "Sign Out",
      danger: "true",
    },
  ];

  return <Menu items={nemuItem} onClick={onclick} />;
};
export default SideMenu;
