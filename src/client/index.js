import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './globalStore';
import pages from './pages';

const router = (
  <Provider store={store}>{pages}</Provider>
);

ReactDOM.render(router, document.getElementById('container'));
