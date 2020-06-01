import React, { useState, useEffect } from 'react';
import TableAntd from '../../components/Table';
import { Input, Button } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import AddBenhNhan from './screens/AddBenhNhan';

const { Search } = Input;

const Patient = () => {
  const [BenhNhan, setBenhNhan] = useState([]);
  const [addBN, setAddBN] = useState(false);
  const [SearchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:8088/benh_nhan/getAll', {
        method: 'GET'
      });
      const data = await res.json();
      setBenhNhan(data);
      setSearchResult(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const results = BenhNhan.filter(person => {
      const fullname = person.first_name + ' ' + person.last_name;
      const id = person.id + '';
      return (
        id.toLowerCase().includes(SearchValue) ||
        fullname.toLowerCase().includes(SearchValue)
      );
    });
    setSearchResult(results);
  }, [SearchValue]);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 40
        }}
      >
        {!addBN ? (
          <Search
            placeholder="input search text"
            onChange={({ currentTarget }) => {
              setSearchValue(currentTarget.value);
            }}
            style={{ width: 400 }}
          />
        ) : null}

        <div style={{ width: 200, marginLeft: 'auto' }}>
          <Button type="primary" block onClick={() => setAddBN(!addBN)}>
            {!addBN ? (
              <>
                TẠO BỆNH NHÂN <UsergroupAddOutlined />
              </>
            ) : (
              'Tìm Kiếm Bệnh Nhân'
            )}
          </Button>
        </div>
      </div>
      {addBN ? (
        <AddBenhNhan
          BenhNhan={BenhNhan}
          setBenhNhan={setBenhNhan}
          setSearchResult={setSearchResult}
          setAddBN={setAddBN}
        />
      ) : (
        <TableAntd BenhNhan={searchResult} />
      )}
    </div>
  );
};

export default Patient;
