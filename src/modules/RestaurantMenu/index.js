import { Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const RestaurantMenu = () => {
  const [dishes, setDishes] = useState([]);
  const { restaurant, refresh } = useRestaurantContext();
  useEffect(() => {
    if (!restaurant?.id) {
      return;
    }
    DataStore.query(Dish, (c) => c.restaurantID.eq(restaurant.id)).then(
      setDishes
    );
  }, [restaurant?.id, refresh]);

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
      render: () => <Button danger>Remove</Button>,
    },
  ];

  const renderNewItemButton = () => {
    return (
      <Link to={"create"}>
        <Button type="primary">New Item</Button>
      </Link>
    );
  };

  return (
    <Card title="Menu" style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={dishes} columns={tableColumns} rowKey="id" />
    </Card>
  );
};

export default RestaurantMenu;
