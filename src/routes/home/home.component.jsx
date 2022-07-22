import Directory from '../../component/directory/directory.components';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
