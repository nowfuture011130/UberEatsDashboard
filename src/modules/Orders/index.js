import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, User2, OrderStatus } from "../../models";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { restaurant } = useRestaurantContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(Order, (o) =>
      o.and((o) => [
        o.orderRestaurantId.eq(restaurant.id),
        o.or((o) => [
          o.status.eq("NEW"),
          o.status.eq("COOKING"),
          o.status.eq("READY_FOR_PICKUP"),
          o.status.eq("ACCEPTED"),
        ]),
      ])
    ).then(setOrders);
  }, [restaurant]);

  const renderorderStatus = (status) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "#fcb900",
      [OrderStatus.READY_FOR_PICKUP]: "#ff6900",
      [OrderStatus.ACCEPTED]: "red",
    };
    return <Tag color={statusToColor[status]}>{status}</Tag>;
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => `${price.toFixed(2)} $`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderorderStatus,
    },
  ];
  return (
    <Card title={"Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default Orders;
