import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const AppLayout = () => (
    <>
        <Navbar />
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    </>
);

export default AppLayout;
