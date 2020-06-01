import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  background-color: white;
  width: 200px;
  height: 80px;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
  & .text {
    font-size: 14px;
    margin-bottom: 10px;
  }
  & .block {
    display: block;
    height: 20px;
    line-height: 20px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 11px;
    background-color: #80af46;
    color: #fff;
  }
  .booked {
    background-color: #818792 !important;
  }
  .invalid {
    background-color: #d93025 !important;
  }
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  .block_active {
    background-color: white !important;
    color: #80af46 !important;
  }
`;

const ItemLichHen = ({ item, handleSelected, selected, day }) => {
  const formatDay = moment()
    .add(day, 'days')
    .format('YYYY-MM-DD');

  const beforeTime = moment(
    `${formatDay} ${moment(item.time_end, 'HH:mm:ss').format('LT')}`,
    'YYYY-MM-DD HH:mm'
  ).isBefore(moment());

  if (beforeTime) {
    item.status = 'invalid';
  }

  const renderStatus = () => {
    let status = '';
    switch (item.status) {
      case 'waiting':
        status = 'Còn Trống';
        break;
      case 'booked':
        status = 'Đã Đặt Chỗ';
        break;
      case 'invalid':
        status = 'Đã Hết Hạn';
        break;
      default:
        break;
    }
    return status;
  };

  const renderStatusColor = () => {
    let style = 'block ';
    if (item.id === selected.id && item.status === 'waiting') {
      style += 'block_active ';
    }
    switch (item.status) {
      case 'booked':
        style += 'booked';
        break;
      case 'invalid':
        style += 'invalid';
        break;
      default:
        break;
    }
    return style;
  };

  const renderBlockStatusColor = () => {
    let style = 'block ';
    if (item.id === selected.id && item.status === 'waiting') {
      style += 'active ';
    }
    switch (item.status) {
      case 'waiting':
        style += 'waiting';
        break;
      case 'booked':
        style += 'booked';
        break;
      case 'invalid':
        style += 'invalid';
        break;
      default:
        break;
    }
    return style;
  };
  return (
    <Wrapper
      onClick={() => handleSelected(item)}
      className={renderBlockStatusColor()}
    >
      <div className="text">
        {moment(item.time, 'HH:mm:ss').format('LT') +
          ' - ' +
          moment(item.time_end, 'HH:mm:ss').format('LT')}
      </div>
      <div style={{ display: 'flex' }}>
        <div className={renderStatusColor()}>{renderStatus()}</div>
        {item.idBenhNhan && item.status !== 'invalid' && (
          <div className={renderStatusColor()} style={{ marginLeft: 5 }}>
            {item.last_name}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ItemLichHen;
