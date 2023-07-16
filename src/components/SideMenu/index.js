import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
const SideMenu = () => {
  const navigate = useNavigate();
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
      label: "Order History",
    },
    {
      key: "settings",
      label: "Settings",
    },
  ];

  return <Menu items={nemuItem} onClick={(item) => navigate(item.key)} />;
};
export default SideMenu;
