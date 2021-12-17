import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDrawer from './AdminDrawer';

export default function AdminLayout() {
    return (
        <Fragment>
            <AdminDrawer />
            {/* <div>
                <div>
                    <Outlet />
                </div>
            </div> */}
        </Fragment>
    );
}
