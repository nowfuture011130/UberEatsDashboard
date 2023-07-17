import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const CreateMenuItem = () => {
  const { restaurant, setRefresh, refresh } = useRestaurantContext();
  const navigation = useNavigate();
  const onFinish = async ({ name, description, price, URL }) => {
    const newDish = await DataStore.save(
      new Dish({
        name,
        description,
        price,
        image: URL,
        restaurantID: restaurant.id,
      })
    );
    message.success("Dish created successfully");
    setRefresh(!refresh);
    navigation("/menu");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validatePositiveNumber = (_, value) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue) && numberValue < 0) {
      return Promise.reject("Please enter a number greater than 0");
    }
    return Promise.resolve();
  };

  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Dish Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter: Dish Name" />
        </Form.Item>
        <Form.Item
          label="Dish Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={3} placeholder="Enter: Dish Description" />
        </Form.Item>
        <Form.Item
          label="Price $"
          name="price"
          rules={[
            { required: true },
            {
              validator: validatePositiveNumber,
            },
          ]}
          required
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Dish Image URL" name="URL">
          <Input placeholder="Enter: Dish Image URL" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CreateMenuItem;
