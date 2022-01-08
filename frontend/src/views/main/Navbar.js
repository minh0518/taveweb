import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from './tave_logo.png';

const Nav=styled.nav`
position : fixed;
left 20%;
right 20%;
height 100%;
background: linear-gradient( to bottom, #C4D4E0, white);
border-radius: 4px;
box-shadow: 1px 2px 1px rgba(0,0,0,0.25);
`

const Logo = styled.img`
    width: 100px;
    height: 50px;
`;

const SubMenu = styled.div`
    display: none;
`;

const UnList=styled.ul`
display:flex;
flex-direction: row;
justify-content: space-around;
height:30px;
`


const List=styled.li`
display:flex;
flex-direction: column;
margin:0px;
&:hover ${SubMenu} {
    display:flex;
    flex-direction: column;
}
`

const MenuLink = styled(Link)`
    color: black;
    text-decoration: none;
    transition: 850ms;
    font-weight: bold;
    font-size: 15px;   
    font-family: '"' Noto Sans KR ', sans-serif"';
    float: right;
    
    &:hover {
        color: white;
        background-color: navy;
        border: 1px solid navy;
        border-radius: 4px;
    }
`;

const SubMenuLinks = styled(Link)`
    text-decoration: none;
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
        <Nav>            
            <UnList>  
                <List>               
                    <MenuLink to="/" class="menuLink">          
                        <Logo src={LogoSrc} /> 
                    </MenuLink>
                </List> 
                <List>               
                    <MenuLink to="/" class="menuLink">
                        HOME
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
                        <a href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ" style={{textDecoration:'none'}}>
                            YouTube
                        </a>
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
        </Nav>
    );
}

export default Navbar;