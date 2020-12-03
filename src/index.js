import {ConfigProvider} from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import 'antd/dist/antd.css';
import 'moment/locale/pt-br';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import BasicLayout from './layouts';
import * as serviceWorker from './serviceWorker';
import store from './store';

moment.locale('pt-br');

axios.defaults.baseURL = '/api';

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConfigProvider locale={ptBR}>
          <BasicLayout />
        </ConfigProvider>
      </Router>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
