import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, User2, OrderStatus } from "../../models";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    DataStore.query(Order).then(setOrders);
    //DataStore.query(User2, orders.user2ID);
  }, []);

  const renderorderStatus = (status) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "orange",
      [OrderStatus.READY_FOR_PICKUP]: "red",
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
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
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
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.orderID}`),
        })}
      />
    </Card>
  );
};

export default Orders;
