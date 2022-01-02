import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import styled from 'styled-components';
import mainTheme from './MainTheme';


function Navbar() {
    return (
        <div className="navbar">
            <Nav>
            <GnbLists>
                <GnbItem>
                    <NavLink to="/" activeClassName="menuLink">
                        Home
                    </NavLink>
                </GnbItem>

                <GnbItem class="menuhover">
                    <NavLink to="/about" class="menuLink">
                        TAVE
                    </NavLink>

                    <div class="submenu">
                        <Link to="/about">TAVE 소개</Link>
                        <Link to="/about/history">연혁</Link>
                        <Link to="/about/manager">운영진 소개</Link>
                        <a href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ">
                            유튜브
                        </a>
                    </div>
                </GnbItem>

                <GnbItem class="menuhover">
                    <NavLink to="/notice" class="menuLink">
                        Notice
                    </NavLink>

                    <div class="submenu">
                        <Link to="/notice">공지사항</Link>
                        <Link to="/news">Tavy News</Link>
                    </div>
                </GnbItem>

                <GnbItem class="menuhover">
                    <NavLink to="/board" class="menuLink">
                        TAVY
                    </NavLink>

                    <div class="submenu">
                        <Link to="/board">활동 후기</Link>
                        <Link to="/photo">활동 사진</Link>
                    </div>
                </GnbItem>

                <GnbItem class="menuhover">
                    <NavLink to="/qna" class="menuLink">
                        Q&A
                    </NavLink>

                    <div class="submenu">
                        <Link to="/faq">FAQ</Link>
                        <Link to="/qna">Q&A</Link>
                    </div>
                </GnbItem>

                <GnbItem class="menuhover">
                    <NavLink to="/apply" class="menuLink">
                        Recruit
                    </NavLink>

                    <div class="submenu">
                        <Link to="/apply">지원하기</Link>
                        <Link to="/apply/check">지원 확인</Link>
                        <Link to="/apply/result">합격 확인</Link>
                    </div>
                </GnbItem>
            </GnbLists>

            <br />
            <br />

            </Nav>
        </div>
    );
}

export default Navbar;
