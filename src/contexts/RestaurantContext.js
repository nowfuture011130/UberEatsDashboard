import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Restaurant } from "../models";
// 创建全环境变量
const RestaurantContext = createContext({});
const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();
  const [refresh, setRefresh] = useState(false);
  const sub = user?.attributes?.sub; //sub是登陆用户的id
  // 获得现在的用户
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setUser);
  }, []);
  // 获得现在用户手下的餐厅
  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Restaurant, (r) => r.adminSub.eq(sub)).then(
      (restaurants) => {
        setRestaurant(restaurants[0]);
      }
    );
  }, [sub]);

  return (
    <RestaurantContext.Provider
      value={{ restaurant, sub, setRestaurant, refresh, setRefresh }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
