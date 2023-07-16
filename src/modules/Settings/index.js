import { Form, Input, Card, Button } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import React, { useState } from "react";
const Settings = () => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocode = await geocodeByAddress(address.label);
    const latlng = await getLatLng(geocode[0]);
    setCoordinates(latlng);
  };
  console.log(address);
  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 20 }}>
        <Form.Item label="Restaurant Name" required>
          <Input placeholder="Enter restaurant name" />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyD0g5cZwzDSDdWGZ7qdU1pxooPTgUriE3M"
            selectProps={{ value: address, onChange: getAddressLatLng }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary"> Submit</Button>
        </Form.Item>
      </Form>
      <span>
        {coordinates?.lat} {coordinates?.lng}
      </span>
    </Card>
  );
};
export default Settings;
