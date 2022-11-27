import { Form, Input, Radio, InputNumber } from "antd";
const { TextArea } = Input;
function FormClientInfo() {
  return (
    <>
      <Form.Item
        label="Họ tên"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Tuổi" name="age">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Giới tính" name="gender">
        <Radio.Group>
          <Radio value="Nam"> Nam </Radio>
          <Radio value="Nữ"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name={"description"}>
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default FormClientInfo;
