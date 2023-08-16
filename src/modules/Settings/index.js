import { Form, Input, Card, Button, message, InputNumber } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const Settings = () => {
  // 储存地址和坐标
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const { sub, restaurant, setRestaurant } = useRestaurantContext();
  const [form] = Form.useForm();
  // 如果餐厅已经存在，读取信息更新表单现状
  useEffect(() => {
    if (restaurant) {
      form.setFieldsValue({
        name: restaurant.name,
        image: restaurant.image,
        deliveryFee: restaurant.deliveryFee,
      });
      setCoordinates({ lat: restaurant.lat, lng: restaurant.lng });
    }
  }, [restaurant]);
  // 检查数字合法性
  const validatePositiveNumber = (_, value) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue) && numberValue < 0) {
      return Promise.reject("Please enter a number greater than 0");
    }
    return Promise.resolve();
  };
  // 获得选中地址的坐标并保存
  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocode = await geocodeByAddress(address.label);
    const latlng = await getLatLng(geocode[0]);
    setCoordinates(latlng);
  };

  // 提交表单后如果已经有餐厅则更新餐厅，没餐厅则创建餐厅
  const onSubmit = async (item) => {
    if (!restaurant) {
      await createNewRestaurant(item);
    } else {
      await updateRestaurant(item);
    }
  };

  // 更新餐厅并把更新值传给传给aws和context
  const updateRestaurant = async ({ name, image, deliveryFee }) => {
    const updatedRestaurant = await DataStore.save(
      Restaurant.copyOf(restaurant, (updated) => {
        updated.name = name;
        if (address) {
          updated.address = address.label;
          updated.lat = coordinates.lat;
          updated.lng = coordinates.lng;
        }
        updated.image = image;
        updated.deliveryFee = deliveryFee;
      })
    );
    setRestaurant(updatedRestaurant);
    message.success("Restaurant updated!");
  };

  // 创建一个新餐厅并把数值传给aws和context
  const createNewRestaurant = async ({ name, image, deliveryFee }) => {
    const newRestaurant = await DataStore.save(
      new Restaurant({
        name: name,
        image: image,
        deliveryFee: deliveryFee,
        minDeliveryTime: 5,
        maxDeliveryTime: 10,
        rating: 0,
        address: address.label,
        lat: coordinates.lat,
        lng: coordinates.lng,
        adminSub: sub,
      })
    );
    setRestaurant(newRestaurant);
    message.success("Restaurant has been created!");
  };
  // 渲染表单
  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 20 }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Restaurant Name"
          rules={[{ required: true }]}
          name="name"
          required
        >
          <Input placeholder="Enter restaurant name" />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyD0g5cZwzDSDdWGZ7qdU1pxooPTgUriE3M"
            selectProps={{ value: address, onChange: getAddressLatLng }}
          />
        </Form.Item>

        <Form.Item
          label="Restaurant Image"
          rules={[{ required: true }]}
          name="image"
          required
        >
          <Input placeholder="Enter restaurant image uri" />
        </Form.Item>

        <Form.Item
          label="DeliveryFee $"
          name="deliveryFee"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* 最后显示当前餐厅地址 */}
      <span>Current Address: {restaurant?.address}</span>
    </Card>
  );
};
export default Settings;
