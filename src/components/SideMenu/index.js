import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();
  const onclick = async (item) => {
    if (item.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(item.key);
    }
  };

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
      {restaurant && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgray",
          }}
        >
          <h3>{restaurant.name}</h3>
        </div>
      )}
      <Menu items={nemuItem} onClick={onclick} />
    </>
  );
};
export default SideMenu;
