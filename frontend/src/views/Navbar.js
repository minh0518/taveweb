import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
                    <Link to="/About" class="menuLink">
                        TAVE
                    </Link>

                    <div class="submenu">
                        <Link to="/About">TAVE 소개</Link>
                        <Link to="/History">연혁</Link>
                        <Link to="/About_admin">운영진 소개</Link>
                        <a href="https://www.youtube.com/channel/UCLEXVED0YBiMCl7tFCSD7cQ">
                            유튜브
                        </a>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/Notice" class="menuLink">
                        Notice
                    </Link>

                    <div class="submenu">
                        <Link to="/Notice">공지사항</Link>
                        <Link to="/Tavynews">Tavy News</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/Board" class="menuLink">
                        TAVY
                    </Link>

                    <div class="submenu">
                        <Link to="/Board">활동 후기</Link>
                        <Link to="/Photos">활동 사진</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/QnA" class="menuLink">
                        Q&A
                    </Link>

                    <div class="submenu">
                        <Link to="/FAQ">FAQ</Link>
                        <Link to="/QnA">Q&A</Link>
                    </div>
                </li>

                <li class="menuhover">
                    <Link to="/Apply" class="menuLink">
                        Recruit
                    </Link>

                    <div class="submenu">
                        <Link to="/Apply">지원하기</Link>
                        <Link to="/Apply_check">지원 확인</Link>
                        <Link to="/Result">합격 확인</Link>
                    </div>
                </li>
            </ul>

            <br />
            <br />
        </div>
    );
}

export default Navbar;
