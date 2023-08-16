import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();
  // 点击菜单后如果key为登出则登出账号，否则跳转到相应界面
  const onclick = async (item) => {
    if (item.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(item.key);
    }
  };
  // 已经开了餐厅的情况才显示
  const mainMenuItem = [
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
  ];
  // 不管怎样都显示
  const nemuItem = [
    ...(restaurant ? mainMenuItem : []),
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

  return (
    <>
      {/* 如果餐厅不为空，则显示餐厅名字 */}
      {restaurant && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgray",
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 10,
          }}
        >
          <h3>{restaurant.name}</h3>
        </div>
      )}
      {/* 显示侧边菜单 */}
      <Menu items={nemuItem} onClick={onclick} />
    </>
  );
};
export default SideMenu;
