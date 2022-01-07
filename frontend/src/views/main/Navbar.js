import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnList = styled.ul`
    float: right;
    position : relative;
    top 30px;
    
`;
const SubMenu = styled.div`
    display: none;
`;
const List = styled.li`
    margin: 0;
    list-style-type: none;
    float: left;
    border-bottom: 1px solid rgba(44, 44, 44, 0.233);
    &:hover ${SubMenu} {
        display: block;
    }
`;

const MenuLink = styled(Link)`
    color: black;
    text-decoration: none;
    transition: 850ms;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    font-size: 20px;
    width: 200px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    &:hover {
        color: white;
        background-color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;

const SubMenuLinks = styled(Link)`
    display: flex;
    text-decoration: none;
    width: 200px;
    padding-left: 1px;
    padding-right: 1px;
    font-size: 15px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    color: black;
    &:hover {
        color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;

const Anchor = styled.a`
    display: flex;
    text-decoration: none;
    width: 200px;
    padding-left: 1px;
    padding-right: 1px;
    font-size: 15px;
    font-family: '"' Noto Sans KR ', sans-serif"';
    color: black;
    &:hover {
        color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;

function Navbar() {
    return (
        <div className="navbar">
            <UnList>
                <List>
                    <MenuLink to="/" class="menuLink">
                        Home
                    </MenuLink>
                </List>

                <List class="menuhover">
                    <MenuLink to="/about" class="menuLink">
                        TAVE
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/about">TAVE 소개</SubMenuLinks>
                        <SubMenuLinks to="/about/history">연혁</SubMenuLinks>
                        <SubMenuLinks to="/about/manager">
                            운영진 소개
                        </SubMenuLinks>
                        <Anchor href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ">
                            YouTube
                        </Anchor>
                    </SubMenu>
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
                    <MenuLink to="/board" class="menuLink">
                        TAVY
                    </MenuLink>
                    <SubMenu>
                        <SubMenuLinks to="/board">활동 후기</SubMenuLinks>
                        <SubMenuLinks to="/photo">활동 사진</SubMenuLinks>
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
        </div>
    );
}

export default Navbar;
