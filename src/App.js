import { BrowserRouter as Router } from 'react-router-dom';
import HeaderBar from './pages/HeaderBar';
import Routes from './routes';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <HeaderBar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
