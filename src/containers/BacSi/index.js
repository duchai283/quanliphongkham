import React, { useEffect, useState, useCallback } from 'react';
import ListLichHen from '../LichHen/components/ListLichHen';

import moment from 'moment';
const BacSi = () => {
  const initialDay = moment()
    .add(0, 'days')
    .format('ddd DD/MM');
  const [Text, setText] = useState(0);
  const [selected, setSelected] = useState({});
  const [Day, setDay] = useState(initialDay);
  const [index, setIndex] = useState(0);
  const [LichHen, setLichHen] = useState([]);

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
      }
    };
    fetchLichHenByDay();
  }, [index]);

  const handleSelected = item => {
    if (item.status === 'booked') {
      return;
    }
    setSelected(item);
  };

  const onFinish = async values => {};

  const rederNgay = () => {
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

  return (
    <div>
      <h1 style={{ fontSize: 34 }}>LỊCH HẸN CỦA BÁC SĨ</h1>
      <div>{rederNgay()}</div>
      <div style={{ display: 'flex' }}>
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
              BacSi
              LichHen={LichHen}
              selected={selected}
              handleSelected={handleSelected}
            />
          )}
        </div>
        <div style={{ marginTop: '15px' }}></div>
      </div>
    </div>
  );
};

export default BacSi;
