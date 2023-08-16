import { Card, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { DataStore } from "aws-amplify";
import { Order, OrderStatus } from "../../models";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { restaurant } = useRestaurantContext();
  const navigate = useNavigate();
  // 和orders的唯一区别，过滤方法不一样
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(Order, (o) =>
      o.and((o) => [
        o.orderRestaurantId.eq(restaurant.id),
        o.or((o) => [
          o.status.eq("PICKED_UP"),
          o.status.eq("COMPLETED"),
          o.status.eq("DECLINED_BY_RESTAURANT"),
        ]),
      ])
    ).then(setOrders);
  }, [restaurant]);

  const renderorderStatus = (status) => {
    const statusToColor = {
      [OrderStatus.PICKED_UP]: "green",
      [OrderStatus.COMPLETED]: "green",
      [OrderStatus.DECLINED_BY_RESTAURANT]: "red",
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
    // 和orders很像，都是card里面包含table，且table值和orders里显示的一样，点击事件也一样
    <Card title={"Orders History"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default OrderHistory;
