import { Form, Input, Card, Button, message } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const Settings = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const { sub, restaurant, setRestaurant } = useRestaurantContext();

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setImage(restaurant.image);
      setCoordinates({ lat: restaurant.lat, lng: restaurant.lng });
    }
  }, [restaurant]);

  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocode = await geocodeByAddress(address.label);
    const latlng = await getLatLng(geocode[0]);
    setCoordinates(latlng);
  };

  const onSubmit = async () => {
    if (!restaurant) {
      await createNewRestaurant();
    } else {
      await updateRestaurant();
    }
  };

  const updateRestaurant = async () => {
    const updatedRestaurant = await DataStore.save(
      Restaurant.copyOf(restaurant, (updated) => {
        updated.name = name;
        if (address) {
          updated.address = address.label;
          updated.lat = coordinates.lat;
          updated.lng = coordinates.lng;
        }

        updated.image = image;
      })
    );
    setRestaurant(updatedRestaurant);
    message.success("Restaurant updated!");
  };

  const createNewRestaurant = async (value) => {
    const newRestaurant = await DataStore.save(
      new Restaurant({
        name: name,
        image: image,
        deliveryFee: 0.5,
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
  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 20 }} onFinish={onSubmit}>
        <Form.Item label="Restaurant Name" required>
          <Input
            placeholder="Enter restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyD0g5cZwzDSDdWGZ7qdU1pxooPTgUriE3M"
            selectProps={{ value: address, onChange: getAddressLatLng }}
          />
        </Form.Item>
        <Form.Item label="Restaurant Image" required>
          <Input
            placeholder="Enter restaurant image uri"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span>
        {coordinates?.lat} {coordinates?.lng}
      </span>
    </Card>
  );
};
export default Settings;
