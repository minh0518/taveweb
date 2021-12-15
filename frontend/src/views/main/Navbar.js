import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/" class="menuLink">
                        Home
                    </Link>
                </li>

                <li class="menuhover">
                    <Link to="/about" class="menuLink">
                        TAVE
                    </Link>

                    <div class="submenu">
                        <Link to="/about">TAVE 소개</Link>
                        <Link to="/about/history">연혁</Link>
                        <Link to="/about/manager">운영진 소개</Link>
                        <a href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ">
                            유튜브
                        </a>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/notice" class="menuLink">
                        Notice
                    </Link>

                    <div class="submenu">
                        <Link to="/notice">공지사항</Link>
                        <Link to="/news">Tavy News</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/board" class="menuLink">
                        TAVY
                    </Link>

                    <div class="submenu">
                        <Link to="/board">활동 후기</Link>
                        <Link to="/photo">활동 사진</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/qna" class="menuLink">
                        Q&A
                    </Link>

                    <div class="submenu">
                        <Link to="/faq">FAQ</Link>
                        <Link to="/qna">Q&A</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/apply" class="menuLink">
                        Recruit
                    </Link>

                    <div class="submenu">
                        <Link to="/apply">지원하기</Link>
                        <Link to="/apply/check">지원 확인</Link>
                        <Link to="/apply/result">합격 확인</Link>
                    </div>
                </li>
            </ul>

            <br />
            <br />
        </div>
    );
}

export default Navbar;
