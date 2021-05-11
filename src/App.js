import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import Index from './component/Index'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './component/config/redux/store';

function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Switch>
          <Index/>
        </Switch>
      </Router>
    // </Provider>
  );
}

export default App;
