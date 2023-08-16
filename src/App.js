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
  // 取得后端图片并存储
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
    // 必须背context provider包裹才能使用里面的变量
    <RestaurantContextProvider>
      {/* 整个界面布局 */}
      <Layout>
        {/* 边框，显示一个图片和sidemenu组件 */}
        <Sider style={{ height: "100vh", backgroundColor: "white" }}>
          <Image src={image} preview={false} />
          <SideMenu />
        </Sider>
        {/* 除去边框的页面中划分出主显示和页脚 */}
        <Layout>
          <Content>
            {/* 主页面显示的是整个导航区，初始显示第一个元素 */}
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
