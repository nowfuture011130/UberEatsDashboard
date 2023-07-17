import { Card, Descriptions, Divider, List, Button, Tag, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "aws-amplify";
import { Order, User2, OrderDish, Dish, OrderStatus } from "../../models";

const statusToColor = {
  [OrderStatus.NEW]: "green",
  [OrderStatus.COOKING]: "#fcb900",
  [OrderStatus.READY_FOR_PICKUP]: "#ff6900",
  [OrderStatus.ACCEPTED]: "red",
  [OrderStatus.COMPLETED]: "green",
  [OrderStatus.DECLINED_BY_RESTAURANT]: "red",
};
const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, [id]);
  useEffect(() => {
    if (order?.user2ID) {
      DataStore.query(User2, order.user2ID).then(setUser);
    }
  }, [order?.user2ID]);
  useEffect(() => {
    if (!order?.id) {
      return;
    }
    DataStore.query(OrderDish, (c) => c.orderID.eq(order.id)).then(
      async (orderdishes) => {
        const newdishes = await Promise.all(
          orderdishes.map(async (orderdish) => {
            const dish = await DataStore.query(Dish, orderdish.orderDishDishId);
            const newDish = { ...orderdish, Dish: dish };
            return newDish;
          })
        );
        setDishes(newdishes);
      }
    );
  }, [order?.id]);

  if (!order) {
    return <Spin size="large" />;
  }

  const acceptOrder = async () => {
    updatedOrderStatus(OrderStatus.COOKING);
  };

  const declinedOrder = async () => {
    updatedOrderStatus(OrderStatus.DECLINED_BY_RESTAURANT);
  };

  const readyForPickup = async () => {
    updatedOrderStatus(OrderStatus.READY_FOR_PICKUP);
  };

  const updatedOrderStatus = async (newState) => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = newState;
      })
    );
    setOrder(updatedOrder);
  };

  return (
    <Card
      title={
        <span>
          Order {id}
          <Tag
            color={statusToColor[order.status]}
            style={{ marginLeft: "8px" }}
          >
            {order.status}
          </Tag>
        </span>
      }
      style={{ margin: 20 }}
    >
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {user?.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {dishItem.Dish.name} x{dishItem.quantity}
            </div>

            <div>${dishItem.Dish.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>${order?.total?.toFixed(2)}</h2>
      </div>
      <Divider />
      {order?.status === OrderStatus.NEW && (
        <div style={styles.buttonsContainer}>
          <Button
            block
            type="default"
            size="large"
            danger
            style={styles.button}
            onClick={declinedOrder}
          >
            Decline Order
          </Button>
          <Button
            block
            type="primary"
            size="large"
            style={styles.button}
            onClick={acceptOrder}
          >
            Accept Order
          </Button>
        </div>
      )}
      {order?.status === OrderStatus.COOKING && (
        <Button block type="primary" size="large" onClick={readyForPickup}>
          Food Is Done
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
};

export default DetailOrder;
