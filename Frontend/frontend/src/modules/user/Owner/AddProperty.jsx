import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: 'residential',
    propertyAdType: 'rent',
    propertyAddress: '',
    ownerContact: '',
    propertyAmt: 0,
    additionalInfo: ''
  });

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      message.error("Please login again. Token missing.");
      return;
    }

    const formData = new FormData();
    formData.append('propertyType', propertyDetails.propertyType);
    formData.append('propertyAdType', propertyDetails.propertyAdType);
    formData.append('propertyAddress', propertyDetails.propertyAddress);
    formData.append('ownerContact', propertyDetails.ownerContact);
    formData.append('propertyAmt', propertyDetails.propertyAmt);
    formData.append('additionalInfo', propertyDetails.additionalInfo);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append('propertyImages', image[i]);
      }
    }

    try {
      const res = await axios.post('http://localhost:8001/api/owner/postproperty', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('🚨 Error adding property:', error.response?.data || error.message);
      message.error("Something went wrong while adding the property");
    }
  };

  return (
    <Container style={{ border: '1px solid lightblue', borderRadius: '5px', padding: '30px' }}>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Property type</Form.Label>
            <Form.Select name='propertyType' value={propertyDetails.propertyType} onChange={handleChange}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land/plot">Land/Plot</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Property Ad type</Form.Label>
            <Form.Select name='propertyAdType' value={propertyDetails.propertyAdType} onChange={handleChange}>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Property Full Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              name='propertyAddress'
              value={propertyDetails.propertyAddress}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Property Images</Form.Label>
            <Form.Control
              type="file"
              required
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Owner Contact No.</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Contact number"
              required
              name='ownerContact'
              value={propertyDetails.ownerContact}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Property Amt.</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount"
              required
              name='propertyAmt'
              value={propertyDetails.propertyAmt}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <FloatingLabel label="Additional details for the Property" className="mt-4">
          <Form.Control
            name='additionalInfo'
            value={propertyDetails.additionalInfo}
            onChange={handleChange}
            as="textarea"
            placeholder="Leave a comment here"
          />
        </FloatingLabel>

        <div className="mt-4 text-end">
          <Button variant='outline-info' type="submit">Submit form</Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProperty;
