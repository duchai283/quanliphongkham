import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
    background-color: #ffba00;
    color: #fff;
  }

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  .block_active {
    background-color: white !important;
    color: #80af46 !important;
  }
  .done {
    background-color: lightblue !important;
    color: #fff !important;
  }
`;

const ItemLichHenBacSi = ({ item, selected, day, Details }) => {
  const renderStatus = () => {
    let status = 'Đang Chờ';
    if(Details){
      status = 'Đã Xong';
    }
    return status;
  };

  const renderStatusColor = () => {
    let style = 'block ';
    if (item.id === selected.id && item.status === 'waiting') {
      style += 'block_active ';
    }
    if(Details){
      style += 'done';
    }
    return style;
  };

  const renderBlockStatusColor = () => {
    let style = 'block ';
    return style;
  };

  return (
    <Link to={`/home/bacsi/lichhen/${item.id}`} style={{ color: '#000' }}>
      <Wrapper className={renderBlockStatusColor()}>
        <div className="text">
          {moment(item.time, 'HH:mm:ss').format('LT') +
            ' - ' +
            moment(item.time, 'HH:mm:ss')
              .add(30, 'm')
              .format('LT')}
        </div>
        <div style={{ display: 'flex' }}>
          <div className={renderStatusColor()}>{renderStatus()}</div>
          {item.id_benh_nhan && (
            <div className={renderStatusColor()} style={{ marginLeft: 5 }}>
              {item.last_name}
            </div>
          )}
        </div>
      </Wrapper>
    </Link>
  );
};

export default ItemLichHenBacSi;
