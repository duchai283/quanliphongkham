import React, { useEffect, useState } from 'react';
import TableThuoc from '../../../../components/TableThuoc';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ThemThuoc = () => {
  let { idtoathuoc } = useParams();
  const [Thuoc, setThuoc] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllThuoc = async () => {
      const request = `http://localhost:8088/thuoc/getAll`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      await setThuoc(data);
    };
    fetchAllThuoc();
  }, []);

  console.log('Thuoc', Thuoc);
  return (
    <div>
      <h1 style={{ fontSize: 32 }}>Tạo Toa Thuốc Cho Bệnh Nhân</h1>

      <TableThuoc
        Thuoc={Thuoc}
        setThuoc={setThuoc}
        idtoathuoc={idtoathuoc}
        history={history}
      />
    </div>
  );
};

export default ThemThuoc;
