import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from './tave_logo.png';

const Nav = styled.nav`
    background: linear-gradient(to bottom, #c4d4e0, white);
    position: relative;
    height: 220px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const Logo = styled.img`
    width: 15%;
    height: 50%;
    margin: 2% 1% 1% 9%;
`;

const SubMenu = styled.div`
    display: none;
`;

const UnList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: right;
    height: 120px;
    margin-top: 4%;
`;

const List = styled.li`
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    margin: 3px 25px;
    
    &:hover ${SubMenu} {
        display: flex;
        flex-direction: column;
    }
`;

const MenuLink = styled(Link)`
    color: black;
    padding: 2px 2px 2px 2px;
    text-align: center;
    text-decoration: none;
    transition: 550ms;
    font-size: 20px;
    letter-spacing: 8px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    &:hover {
        color: white;
        background-color: #0066ff;
        border: 1px solid #0066ff;
        border-radius: 4px;
    }
`;

const SubMenuLinks = styled(Link)`
    text-decoration: none;
    text-align: center;
    padding: 1px 1px 1px 1px;
    font-size: 15px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    color: black;
    &:hover {
        color: navy;
        border: 1px solid #0066ff;
        border-radius: 4px;
    }
`;

function Navbar() {
    return (
        <Nav>
            <Logo src={LogoSrc} />
            <UnList>
                <List>
                    <MenuLink to="/" class="menuLink">
                        Home
                    </MenuLink>
                </List>

                <List class="menuhover">
                    <MenuLink to="/notice" class="menuLink">
                        Notice
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/notice">공지사항</SubMenuLinks>
                        <SubMenuLinks to="/news">Tavy News</SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/about/tave" class="menuLink">
                        TAVE
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/about/tave">TAVE 소개</SubMenuLinks>
                        <SubMenuLinks to="/about/history">연혁</SubMenuLinks>
                        <SubMenuLinks to="/about/manager">
                            운영진 소개
                        </SubMenuLinks>
                        <a
                            href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ"
                            style={{
                                textDecoration: 'none',
                                textAlign: 'center',
                            }}
                        >
                            YouTube
                        </a>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/activity/review" class="menuLink">
                        TAVY
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/activity/review">
                            활동 후기
                        </SubMenuLinks>
                        <SubMenuLinks to="/activity/picture">
                            활동 사진
                        </SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/qna" class="menuLink">
                        Q&A
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/faq">FAQ</SubMenuLinks>
                        <SubMenuLinks to="/qna">Q&A</SubMenuLinks>
                    </SubMenu>
                </List>

                <List class="menuhover">
                    <MenuLink to="/apply" class="menuLink">
                        Recruit
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/apply">지원하기</SubMenuLinks>
                        <SubMenuLinks to="/apply/check">지원 확인</SubMenuLinks>
                        <SubMenuLinks to="/apply/result">
                            합격 확인
                        </SubMenuLinks>
                    </SubMenu>
                </List>
            </UnList>

            <br />
            <br />
        </Nav>
    );
}

export default Navbar;
