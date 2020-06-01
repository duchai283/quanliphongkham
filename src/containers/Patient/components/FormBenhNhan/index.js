import React from 'react';
import { Form, Input, Select, Button, Radio, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const FormBenhNhan = ({ setBenhNhan, BenhNhan, setAddBN, setSearchResult }) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    postUser(values);
  };

  const postUser = async values => {
    const obj = {
      id: '',
      first_name: values.firstname,
      last_name: values.lastname,
      address: values.diachi,
      phone: values.phone,
      tien_su_benh: values.ghichu,
      sex: values.sex,
      birth_date: values.ngaysinh
    };

    const res = await fetch('http://localhost:8088/benh_nhan/addOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.id) {
      message.success('Bạn Đã Tạo Thành Công Bệnh Nhân Có ID Là ' + data.id);
      setAddBN(false);

      const newData = [...BenhNhan, data];
      console.log('newData', newData);
      setBenhNhan(newData);
      setSearchResult(newData);
    } else {
      message.error('Không Tạo Được Bệnh Nhân Vui Lòng Thử Lại Sau');
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '84'
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstname"
        label="Họ"
        rules={[
          {
            required: true,
            message: 'Cần nhập họ'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Tên"
        rules={[
          {
            required: true,
            message: 'Cần nhập tên'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="diachi"
        label="Địa chỉ"
        rules={[
          {
            required: true,
            message: 'Cần nhập địa chỉ'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ngaysinh"
        label="Ngày Sinh"
        rules={[
          {
            required: true,
            message: 'Cần nhập ngày sinh'
          }
        ]}
      >
        <Input placeholder="1998-3-23" />
      </Form.Item>

      <Form.Item label="Giới tính" name="sex">
        <Radio.Group>
          <Radio.Button value="1">Nam</Radio.Button>
          <Radio.Button value="0">Nữ</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Cần nhập số điện thoại của bạn' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="ghichu" label="Ghi chú">
        <Input.TextArea placeholder="bệnh tiểu đường, bệnh nhức đầu, bệnh..." />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Tạo Bệnh Nhân
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBenhNhan;
