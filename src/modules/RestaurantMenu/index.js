import { Card, Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const RestaurantMenu = () => {
  const [dishes, setDishes] = useState([]);
  const { restaurant, refresh, setRefresh } = useRestaurantContext();
  // 当餐厅被修改或是收到refresh请求后，从新读取餐厅的食物的数据
  useEffect(() => {
    if (!restaurant?.id) {
      return;
    }
    DataStore.query(Dish, (c) => c.restaurantID.eq(restaurant.id)).then(
      setDishes
    );
  }, [restaurant?.id, refresh]);

  // 删除菜并且刷新菜单
  const deleteDish = async (dish) => {
    const d = await DataStore.delete(dish);
    setRefresh(!refresh);
  };

  // 图表需要显示什么内容
  const tableColumns = [
    { title: "Menu Item", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} $`,
    },
    {
      title: "Action",
      key: "action",
      // 显示一个确认语句
      render: (_, item) => (
        <Popconfirm
          placement="topLeft"
          title={"Are you sure you want to delete this dish?"}
          onConfirm={() => deleteDish(item)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  // 创建新物品按钮
  const renderNewItemButton = () => {
    return (
      <Link to={"create"}>
        <Button type="primary">New Item</Button>
      </Link>
    );
  };

  return (
    // 显示卡片名为Menu，且在最左边显示创建新物品按钮
    <Card title="Menu" style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={dishes} columns={tableColumns} rowKey="id" />
    </Card>
  );
};

export default RestaurantMenu;
