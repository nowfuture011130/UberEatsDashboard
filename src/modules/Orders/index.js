import orders from "../../../src/dashboard/orders.json";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  const renderorderStatus = (status) => {
    if (status === "Accepted") {
      return <Tag color="green">{status}</Tag>;
    }
    if (status === "Pending") {
      return <Tag color="orange">{status}</Tag>;
    }
    if (status === "Declined") {
      return <Tag color="red">{status}</Tag>;
    }
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} $`,
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
