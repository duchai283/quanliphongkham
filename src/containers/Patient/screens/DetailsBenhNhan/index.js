import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Radio, Button } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ListLichHen from '../../../LichHen/components/ListLichHen';
const DetailsBenhNhan = ({ BenhNhan }) => {
  const [user, setUser] = useState(null);
  const [ListToaThuoc, setListToaThuoc] = useState(null);
  let { id } = useParams();
  const history = useHistory();
  const [selected, setSelected] = useState({});
  const handleSelected = item => {
    if (item.status === 'booked' || item.status === 'invalid') {
      return;
    }

    setSelected(item);
  };
  useEffect(() => {
    const fetchOneBenhNhan = async () => {
      const request = `http://localhost:8088/benh_nhan/getOne?id=${id}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data.id) {
        setUser(data);
      }
    };
    if (id) {
      fetchOneBenhNhan();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllToaThuocByID = async () => {
      const request = `http://localhost:8088/lich_su/getAllByIdBenhNhan?id=${id}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      console.log('data22222', data);
      const listToaThuoc = data.map(item => item.lichHen);
      setListToaThuoc(listToaThuoc);
    };
    fetchAllToaThuocByID();
  }, [id]);

  const handleDatLich = () => {
    history.push(`/home/lichhen/${user.id}`);
  };
  return (
    user && (
      <>
        <Descriptions
          bordered
          title={`THÔNG TIN BỆNH NHÂN CÓ ID LÀ ${user.id} (${user.last_name})`}
          size={'small'}
        >
          <Descriptions.Item label="ID" style={{ border: '1px solid #000' }}>
            {user.id}
          </Descriptions.Item>
          <Descriptions.Item label="Họ" style={{ border: '1px solid #000' }}>
            {user.first_name}
          </Descriptions.Item>
          <Descriptions.Item style={{ border: '1px solid #000' }} label="Tên">
            {user.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Tuổi" style={{ border: '1px solid #000' }}>
            {moment().diff(user.birth_date, 'years')}
          </Descriptions.Item>
          <Descriptions.Item
            label="Số Điện Thoại"
            style={{ border: '1px solid #000' }}
          >
            {user.phone}
          </Descriptions.Item>

          <Descriptions.Item
            label="Địa Chỉ"
            style={{ border: '1px solid #000' }}
          >
            {user.address}
          </Descriptions.Item>
          <Descriptions.Item
            label="Tiền Sử Bệnh"
            style={{ border: '1px solid #000' }}
          >
            {'Bệnh Tiểu Đường, Bệnh Tim Mạch, Ho Ra Máu'
              .split(',')
              .map((item, i) => (
                <span>
                  {`${i + 1}. ${item}`}
                  <br />
                </span>
              ))}
          </Descriptions.Item>
        </Descriptions>
        <div style={{ display: 'flex' }}>
          <ListLichHen
            LichHen={ListToaThuoc}
            BacSi
            handleSelected={handleSelected}
            selected={selected}
            Details
          />
        </div>
        <div
          style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
        >
          <Button type="primary" onClick={handleDatLich}>
            Đặt Lịch Cho Bệnh Nhân
          </Button>
        </div>
      </>
    )
  );
};

export default DetailsBenhNhan;
