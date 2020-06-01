import React, { useEffect, useState } from 'react';
import { Descriptions, Popconfirm, Button, message, Input } from 'antd';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import TableToaThuoc from '../../../../components/TableToaThuoc';
const text = 'Bạn có chắc là muốn tạo lịch hẹn này?';
const { TextArea } = Input;
const KhamBenhNhan = () => {
  let { idLichKham } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [LichHen, setLichHen] = React.useState({});
  const [user, setUser] = React.useState({});
  const [LoaiKham, setLoaiKham] = React.useState({});
  const [ToaThuoc, setToaThuoc] = React.useState(null);
  const [ChiTietThuoc, setChiTietThuoc] = React.useState(null);
  const [ChuanDoan, setChuanDoan] = React.useState('');
  const history = useHistory();
  useEffect(() => {
    const fetchOneLichHen = async () => {
      const request = `http://localhost:8088/lich_hen/getOneById?id=${idLichKham}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data.id) {
        setLichHen(data);
        if (data.id_benh_nhan) {
          const request2 = `http://localhost:8088/benh_nhan/getOne?id=${data.id_benh_nhan}`;
          const res2 = await fetch(request2, {
            method: 'GET'
          });
          const data2 = await res2.json();
          if (data2.id) {
            setUser(data2);
          }
        }
        if (data.id_loai_kham) {
          const request3 = `http://localhost:8088/loai_kham/getOneById?id=${data.id_loai_kham}`;
          const res3 = await fetch(request3, {
            method: 'GET'
          });
          const data3 = await res3.json();
          setLoaiKham(data3);
        }
      }
    };
    fetchOneLichHen();
  }, [idLichKham]);

  useEffect(() => {
    const fetchToaThuoc = async () => {
      const request = `http://localhost:8088/toa_thuoc/getAllByIdLichHen?id=${idLichKham}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      setToaThuoc(data);
      if (data.id) {
        const request2 = `http://localhost:8088/chi_tiet_toa_thuoc/getAllByIdToaFull?id=${data.id}`;
        const res2 = await fetch(request2, {
          method: 'GET'
        });
        const data2 = await res2.json();
        setChiTietThuoc(data2);
      }
    };
    fetchToaThuoc();
  }, [idLichKham]);

  const handleChuanDoan = ({ currentTarget }) => {
    setChuanDoan(currentTarget.value);
  };

  if (!idLichKham) {
    history.goBack();
  }
  const confirm = () => {
    if (!ToaThuoc.id) {
      handleTaoToaThuoc();
    }
    message.error('MỖI LỊCH HẸN CHỈ CÓ THỂ TẠO 1 TOA THUỐC');
  };
  const handleTaoToaThuoc = async () => {
    if (!ChuanDoan) {
      message.error('CẦN NHẬP CHUẨN ĐOÁN ĐỂ BỐC THUỐC CHO BỆNH NHÂN');
      return;
    }
    setLoading(true);
    const obj = {
      id: '',
      ngay_ke_toa: '',
      id_bac_si: LichHen.id_bac_si,
      id_benh_nhan: LichHen.id_benh_nhan,
      id_loai_kham: LichHen.id_loai_kham,
      chuan_doan: ChuanDoan,
      id_lich_hen: idLichKham
    };

    const res = await fetch('http://localhost:8088/toa_thuoc/addOne ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const data = await res.json();
    console.log('data', data);
    if (data.id) {
      history.push(`/home/bacsi/donthuoc/${data.id}`);
    }
    // loading
    setTimeout(() => {
      message.success('TOA THUỐC ĐÃ ĐƯỢC TẠO CHO LỊCH HẸN CỦA BẠN!');
      setLoading(true);
    }, 1000);
  };

  return (
    <div>
      {user && LoaiKham && (
        <>
          <Descriptions bordered title={`THÔNG TIN LỊCH KHÁM`} size={'small'}>
            <Descriptions.Item
              label="Id Lịch Khám"
              style={{ border: '1px solid #000' }}
            >
              {LichHen.id}
            </Descriptions.Item>
            <Descriptions.Item
              label="Giờ Khám"
              style={{ border: '1px solid #000' }}
            >
              {moment(LichHen.time, 'HH:mm:ss').format('LT')}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ border: '1px solid #000' }}
              label="Ngày Khám"
            >
              {moment(LichHen.date).format('l')}
            </Descriptions.Item>
            <Descriptions.Item
              label="Hình Thức Khám"
              style={{ border: '1px solid #000' }}
            >
              {LoaiKham.ten_hinh_thuc}
            </Descriptions.Item>
            <Descriptions.Item
              label="Giá Tiền Khám"
              style={{ border: '1px solid #000' }}
            >
              {LoaiKham.gia_tien &&
                LoaiKham.gia_tien.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ width: '100%', height: 40 }}></div>
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
            <Descriptions.Item
              label="Tuổi"
              style={{ border: '1px solid #000' }}
            >
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
              {user.tien_su_benh &&
                user.tien_su_benh.split(',').map((item, i) => (
                  <span>
                    {`${i + 1}. ${item}`}
                    <br />
                  </span>
                ))}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ width: '100%', height: 40 }}></div>
          <Descriptions
            bordered
            title={`CHUẨN ĐOÁN BỆNH TỪ BÁC SĨ`}
            size={'small'}
          />
          <div style={{ margin: '10px 0' }}>
            <TextArea
              rows={3}
              placeholder="Chuẩn Đoán Bệnh: "
              onChange={values => {
                handleChuanDoan(values);
              }}
            />
          </div>

          <Descriptions
            bordered
            title={`TOA THUỐC CỦA BỆNH NHÂN`}
            size={'small'}
          />
          {ToaThuoc && ChiTietThuoc && (
            <TableToaThuoc ToaThuoc={ToaThuoc} ChiTietThuoc={ChiTietThuoc} />
          )}
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'flex-start'
            }}
          >
            <Popconfirm
              placement="top"
              title={text}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button
                loading={loading}
                style={{
                  color: '#fff',
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff'
                }}
              >
                TẠO TOA THUỐC
              </Button>
            </Popconfirm>
          </div>
        </>
      )}
    </div>
  );
};

export default KhamBenhNhan;
