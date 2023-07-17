import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Restaurant } from "../models";
const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();
  const [refresh, setRefresh] = useState(false);
  const sub = user?.attributes?.sub;
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Restaurant, (r) => r.adminSub.eq(sub)).then((restaurants) =>
      setRestaurant(restaurants[0])
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
