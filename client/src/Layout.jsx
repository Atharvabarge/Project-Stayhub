
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Components/Footer'
import Atharv from './Components/Atharv';

const Layout = () => {
  return (
    <>
    <Header />
    <Atharv/>
    <div className="px-20 max-[520px]:px-10 mb-60 flex flex-col min-h-screen">
        <Outlet />
      </div>
        <Footer/>
    </>
  );
}

export default Layout