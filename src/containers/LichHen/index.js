import React, { useEffect, useState } from 'react';
import ListLichHen from './components/ListLichHen';
import { LichHenInitial, LichHenInitial2 } from '../../utils/fakeData';
import { Input, Button, Form, message, Select, Popconfirm } from 'antd';
import TableTimUser from '../../components/TableTimUser';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const text = 'Bạn có chắc là muốn tạo lịch hẹn này?';

const { Search } = Input;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const LichHen = () => {
  const initialDay = moment()
    .add(0, 'days')
    .format('ddd DD/MM');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState({});
  const [Text, setText] = useState(null);
  const [Day, setDay] = useState(initialDay);
  const [index, setIndex] = useState(0);
  const [LichHen, setLichHen] = useState([]);
  const [BacSi, setBacSi] = useState([]);
  const [LoaiKham, setLoaiKham] = useState([]);

  const [BacSiSelected, setBacSiSelected] = useState(0);
  const [LoaiKhamSelected, setLoaiKhamSelected] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    const fetchBacSi = async () => {
      const request = `http://localhost:8088/user/getAll`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data) {
        setBacSi(data.filter(item => item.role === 99));
      }
    };
    fetchBacSi();
  }, []);

  useEffect(() => {
    const fetchLoaiKham = async () => {
      const request = `http://localhost:8088/loai_kham/getAll`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data) {
        setLoaiKham(data);
      }
    };
    fetchLoaiKham();
  }, []);

  useEffect(() => {
    const fetchLichHenByDay = async () => {
      const formatDay = moment()
        .add(index, 'days')
        .format('YYYY-MM-DD');

      const request = `http://localhost:8088/lich_hen/getAllToDay?inputdate=${formatDay}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data) {
        setLichHen(data);
        console.log('data', data);
      }
    };
    fetchLichHenByDay();
  }, [index]);

  useEffect(() => {
    if (id) {
      setText(id);
    }
  }, [id]);

  const onChange = value => {
    setBacSiSelected(parseFloat(value));
  };

  const onChangeLoaiKham = value => {
    setLoaiKhamSelected(parseFloat(value));
  };

  const handleSelected = item => {
    if (item.status === 'booked' || item.status === 'invalid') {
      return;
    }

    setSelected(item);
  };

  const confirm = () => {
    onFinish();
  };
  console.log('BacSiSelected', BacSiSelected);
  console.log('BacSi', BacSi);
  const onFinish = async values => {
    let formatDay = '';
    if (index >= 0 || index <= 7) {
      formatDay = moment()
        .add(index, 'days')
        .format('YYYY-MM-DD');
    } else {
      return message.error('VUI LÒNG CHỌN NGÀY ĐỂ ĐẶT LỊCH HẸN!');
    }
    if (!selected) {
      return message.error('VUI LÒNG CHỌN GIỜ ĐỂ ĐẶT LỊCH HẸN!');
    }

    if (!BacSiSelected) {
      return message.error('VUI LÒNG CHỌN BÁC SĨ ĐỂ KHÁM!');
    }

    if (!LoaiKhamSelected) {
      return message.error('VUI LÒNG CHỌN LOẠI KHÁM ĐỂ KHÁM!');
    }

    if (Text) {
      const request = `http://localhost:8088/benh_nhan/getOne?id=${Text + ''}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (!data.id) {
        return message.error(
          'BỆNH NHÂN ID CỦA BẠN VỪA NHẬP KHÔNG TỒN TẠI, VUI LÒNG NHẬP 1 BỆNH NHÂN ID MỚI!'
        );
      }
    } else {
      return message.error('VUI LÒNG NHẬP ID CỦA BỆNH NHÂN ĐỂ ĐẶT LỊCH HẸN');
    }

    setLoading(true);
    postLichHen(Text, selected, formatDay);
  };

  const postLichHen = async (Text, selected, formatDay) => {
    const obj = {
      id: '',
      time: selected.time,
      id_benh_nhan: Text,
      status: selected.status,
      ghi_chu: '',
      date: formatDay,
      last_name: '',
      id_bac_si: BacSiSelected,
      id_loai_kham: LoaiKhamSelected
    };

    const res = await fetch('http://localhost:8088/lich_hen/addOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const data = await res.json();
    if (data.error) {
      message.error(`ĐẶT LỊCH THẤT BẠI, VUI LÒNG THỬ LẠI SAU`);
    } else {
      const formatDay = moment()
        .add(index, 'days')
        .format('YYYY-MM-DD');

      const request = `http://localhost:8088/lich_hen/getAllToDay?inputdate=${formatDay}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data) {
        setTimeout(() => {
          setLoading(false);
          message.success(`ĐẶT LỊCH THÀNH CÔNG CHO BỆNH NHÂN CÓ ID LÀ ${Text}`);
          setLichHen(data);
        }, 1000);
      }
    }
  };

  const renderNgay = () => {
    const date = [];
    for (let i = 0; i <= 6; i++) {
      date.push(
        moment()
          .add(i, 'days')
          .format('ddd DD/MM')
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {date.map((day, i) => (
          <ItemDay day={day} index={i} />
        ))}
      </div>
    );
  };

  const ItemDay = ({ day, index }) => {
    const thu = day.split(' ')[0];
    const ngay = day.split(' ')[1];
    const styleThu = {
      textTransform: 'uppercase',
      fontSize: 20,
      textAlign: 'center',
      color: '#40485a'
    };
    const styleNgay = {
      fontSize: 13,
      fontWeight: 500,
      textAlign: 'center',
      color: '#40485a'
    };

    if (day === Day) {
      styleThu.color = '#80af46';
      styleNgay.color = '#80af46';
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => {
          setDay(day);
          setIndex(index);
        }}
      >
        <strong style={styleThu}>{thu}</strong>
        <span style={styleNgay}>{ngay}</span>
      </div>
    );
  };

  const filter = () => {
    if (LichHen.length !== 0) {
      const filterLichHen = [...LichHenInitial];
      for (let i = 0; i < filterLichHen.length; i++) {
        filterLichHen[i].status = 'waiting';
        filterLichHen[i].idBenhNhan = null;
        for (let j = 0; j < LichHen.length; j++) {
          if (filterLichHen[i].time === LichHen[j].time) {
            filterLichHen[i].status = 'booked';
            filterLichHen[i].idBenhNhan = LichHen[j].id_benh_nhan;
            filterLichHen[i].last_name = LichHen[j].last_name;
          }
        }
      }
      return filterLichHen;
    } else {
      return LichHenInitial2.map(item => {
        item.status = 'waiting';
        return item;
      });
    }
  };

  const filterLichHen = filter();

  return (
    <div>
      <h1 style={{ fontSize: 34 }}>LỊCH HẸN</h1>
      <div>{renderNgay()}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 5 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '60%'
          }}
        >
          {!Day ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <h1 style={{ color: 'red' }}>* VUI LÒNG CHỌN NGÀY</h1>
            </div>
          ) : (
            <ListLichHen
              day={index}
              LichHen={filterLichHen}
              selected={selected}
              handleSelected={handleSelected}
            />
          )}
        </div>
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: 15 }}>
            <h3>Chọn Bác Sĩ</h3>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="* Chọn Bác Sĩ Khám"
              optionFilterProp="children"
              onChange={onChange}
              style={{ width: '100%' }}
            >
              {BacSi &&
                BacSi.map(item => (
                  <Option value={item.id}>{item.username}</Option>
                ))}
            </Select>
          </div>
          <div style={{ marginBottom: 15 }}>
            <h3>Chọn Loại Hình Khám</h3>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="* Chọn Loại Hình Khám"
              optionFilterProp="children"
              onChange={onChangeLoaiKham}
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {LoaiKham &&
                LoaiKham.map(item => (
                  <Option value={item.id}>{item.ten_hinh_thuc}</Option>
                ))}
            </Select>
          </div>
          <div>
            <h3>Tìm Kiếm Bệnh Nhân</h3>
            <Search
              placeholder="* NHẬP ID BỆNH NHÂN"
              onSearch={value => setText(value)}
            />
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <div style={{ marginBottom: 30 }}>
                <TableTimUser Text={Text} />
              </div>
              <Popconfirm
                placement="top"
                title={text}
                onConfirm={confirm}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  loading={loading}
                  style={{
                    color: '#fff',
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff'
                  }}
                >
                  ĐẶT LỊCH HẸN
                </Button>
              </Popconfirm>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichHen;
