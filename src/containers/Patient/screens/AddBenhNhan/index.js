import React from 'react';
import { Row, Col } from 'antd';
import FormBenhNhan from '../../components/FormBenhNhan';

const style = { background: '#0092ff', padding: '8px 0' };

const AddBenhNhan = ({ BenhNhan, setBenhNhan, setAddBN, setSearchResult }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 32, color: 'lightblue' }}>
        TẠO BỆNH NHÂN
      </h1>
      <FormBenhNhan
        BenhNhan={BenhNhan}
        setBenhNhan={setBenhNhan}
        setAddBN={setAddBN}
        setSearchResult={setSearchResult}
      />
    </div>
  );
};

export default AddBenhNhan;
