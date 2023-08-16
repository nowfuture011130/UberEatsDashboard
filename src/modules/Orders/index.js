import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderStatus } from "../../models";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { restaurant } = useRestaurantContext();
  const navigate = useNavigate();

  // 当restaurant更新后，使用restaurantid读取所有在其下面的order并过滤出状态正确的并存进队列
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    DataStore.query(
      Order,
      (o) =>
        o.and((o) => [
          o.orderRestaurantId.eq(restaurant.id),
          o.or((o) => [
            o.status.eq("NEW"),
            o.status.eq("COOKING"),
            o.status.eq("READY_FOR_PICKUP"),
            o.status.eq("ACCEPTED"),
          ]),
        ]),
      {
        sort: (s) => s.createdAt("DESCENDING"),
      }
    ).then(setOrders);
  }, [restaurant]);

  // 用来随时更新Order状态
  useEffect(() => {
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      const { opType, element } = msg;
      if (opType === "INSERT" && element.orderRestaurantId === restaurant?.id) {
        setOrders((e) => [element, ...e]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // 获得状态字符串之后返回一个tag，显示在标题用的
  const renderorderStatus = (status) => {
    const statusToColor = {
      [OrderStatus.NEW]: "green",
      [OrderStatus.COOKING]: "#fcb900",
      [OrderStatus.READY_FOR_PICKUP]: "#ff6900",
      [OrderStatus.ACCEPTED]: "red",
    };
    return <Tag color={statusToColor[status]}>{status}</Tag>;
  };
  // 表格渲染什么内容
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
    // orders为标题，里面有一个表格
    <Card title={"Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        // 把点击行的order id传到detailOrder页面并跳转过去
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default Orders;
