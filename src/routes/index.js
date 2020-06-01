import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LichHen from '../containers/LichHen';
import Patient from '../containers/Patient';
import DetailsBenhNhan from '../containers/Patient/screens/DetailsBenhNhan';
import About from '../components/About';
import BacSi from '../containers/BacSi';
import KhamBenhNhan from '../containers/BacSi/screens/KhamBenhNhan';
import ThemThuoc from '../containers/BacSi/screens/ThemThuoc';

const Router = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/benhnhan`}>
        <Patient></Patient>
      </Route>
      <Route exact path={`${path}/benhnhan`}>
        <Patient></Patient>
      </Route>
      <Route path={`${path}/benhnhan/:id`}>
        <DetailsBenhNhan></DetailsBenhNhan>
      </Route>
      <Route exact path={`${path}/lichhen`}>
        <LichHen BacSi={BacSi}></LichHen>
      </Route>
      <Route path={`${path}/lichhen/:id`}>
        <LichHen></LichHen>
      </Route>
      <Route exact path={`${path}/bacsi`}>
        <BacSi></BacSi>
      </Route>
      <Route exact path={`${path}/bacsi/lichhen/:idLichKham`}>
        <KhamBenhNhan></KhamBenhNhan>
      </Route>
      <Route exact path={`${path}/bacsi/donthuoc/:idtoathuoc`}>
        <ThemThuoc></ThemThuoc>
      </Route>

      <Route exact path={`${path}/about`}>
        <About></About>
      </Route>
    </Switch>
  );
};

export default Router;
