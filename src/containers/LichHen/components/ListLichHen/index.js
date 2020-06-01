import React from 'react';
import ItemLichHen from '../ItemLichHen';
import ItemLichHenBacSi from '../ItemLichHenBacSi';
import { getCurrentUser } from '../../../../utils/localStorage';
const ListLichHen = ({
  LichHen,
  selected,
  handleSelected,
  day,
  BacSi,
  Details
}) => {
  const user = JSON.parse(getCurrentUser());
  console.log('LichHen', LichHen);
  return !BacSi
    ? LichHen &&
        LichHen.map(item => (
          <ItemLichHen
            day={day}
            item={item}
            selected={selected}
            handleSelected={handleSelected}
          />
        ))
    : LichHen &&
        LichHen.map(item => {
          if (user.id === item.id_bac_si)
            return (
              <ItemLichHenBacSi
                day={day}
                item={item}
                selected={selected}
                handleSelected={handleSelected}
                Details
              />
            );
        });
};

export default ListLichHen;
