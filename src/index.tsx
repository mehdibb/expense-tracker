import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'
import {Application} from './pages';
import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  document.getElementById('root'),
);
