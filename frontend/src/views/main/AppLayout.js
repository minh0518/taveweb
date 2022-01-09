import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'
import styled from 'styled-components';

const Wrapper=styled.div`
height: auto;
min-height: 100%;
padding-bottom: 270px;
`

const Info=styled(Footer)`
height: 270px;
position : relative;
transform : translateY(-100%);
`
export default function AppLayout() {
    return (
        <>
            <Wrapper>
            <Navbar />
                <div>
                    <Outlet />
                </div>
            </Wrapper>
            <Info/>
        </>
    );
}
