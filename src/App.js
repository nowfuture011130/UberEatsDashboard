import SideMenu from "./components/SideMenu";
import { Layout, Image } from "antd";
import AppRoutes from "./components/AppRoutes";
import { Amplify, Auth, DataStore } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import RestaurantContextProvider from "./contexts/RestaurantContext";
import { useEffect, useState } from "react";
import { Restaurant } from "./models";
const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig);

function App() {
  const [image, setImage] = useState("");
  const getImage = async () => {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const restaurant = await DataStore.query(Restaurant, (r) =>
      r.adminSub.eq(user?.attributes?.sub)
    );
    setImage(restaurant[0]?.image);
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <RestaurantContextProvider>
      <Layout>
        <Sider style={{ height: "100vh", backgroundColor: "white" }}>
          <Image src={image} preview={false} />
          <SideMenu />
        </Sider>
        <Layout>
          <Content>
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Uber Eats restaurant Dashboard ©2023
          </Footer>
        </Layout>
      </Layout>
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App);
