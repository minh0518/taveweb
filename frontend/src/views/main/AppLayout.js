import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <div>
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer/>
        </>
    );
}
