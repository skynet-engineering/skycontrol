import React from 'react';
import { Route } from 'react-router';
import Global from 'app/react/containers/global';
import OverviewContainer from 'app/react/containers/overview';

const routes = (
  <Global>
    <Route path="*" component={OverviewContainer} />
  </Global>
);

export default routes;
