import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

const ProductFormModal = ({ addNewProduct, categoryId }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        addNewProduct({
          ...values,
          categoryId,
          image: "/src/assets/" + values.image,
        });
        setVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="mx-2 cursor-pointer bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-2xl shadow-md transition-colors duration-300 ease-in-out"
      >
        + Add New Product
      </button>
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        centered
        maskClosable={false}
        closable={false}
        className="rounded-2xl shadow-3xl border border-gray-300 bg-white overflow-hidden"
        footer={[
          <button
            key="cancel"
            onClick={handleCancel}
            className="mx-2 cursor-pointer bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-2xl shadow-md transition-colors duration-300 ease-in-out"
          >
            Cancel
          </button>,
          <button
            key="submit"
            onClick={handleOk}
            className="mx-2 cursor-pointer bg-lime-600 hover:bg-lime-500 text-white font-semibold py-2 px-4 rounded-2xl shadow-xl transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>,
        ]}
        styles={{
          body: {
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
          },
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.65)",
          },
        }}
      >
        <Form form={form} layout="vertical" name="productForm">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Please enter the unit" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductFormModal;
