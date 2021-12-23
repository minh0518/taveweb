import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Router, Link } from 'react-router-dom';

// Main
import AppLayout from './views/main/AppLayout';
import Home from './views/main/Home';
import About from './views/main/about/About';
import AboutManager from './views/main/about/AboutManager';
import History from './views/main/about/History';
import Notice from './views/main/notice/Notice';
import News from './views/main/notice/News';
import Board from './views/main/tavy/Board';
import Photos from './views/main/tavy/Photos';
import Apply from './views/main/recruit/Apply';
import ApplyCheck from './views/main/recruit/ApplyCheck';
import Result from './views/main/recruit/Result';
import QnA from './views/main/qna/QnA';
import FAQ from './views/main/qna/FAQ';
import DisplayAnswers from './views/main/qna/Display'

// Admin
import AdminLayout from './views/admin/AdminLayout';
import AdminNotice from './views/admin/notice/AdminNotice';
import AdminHome from './views/admin/AdminHome';
import AdminAbout from './views/admin/about/AdminAbout';
import AdminAboutManager from './views/admin/about/AdminAboutManager';
import AdminHistory from './views/admin/about/AdminHistory';

function App() {
    const [lists, setLists] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/hi').then((response) => {
            console.log('response', response);
        });
    }, []);

    useEffect(() => {
        axios.get('/api/values').then((response) => {
            console.log('response', response);
            setLists(response.data);
        });
    }, []);

    const changeHandler = (event) => {
        setValue(event.currentTarget.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post('/api/value', { value: value }).then((response) => {
            if (response.data.success) {
                console.log('response', response);
                setLists([...lists, response.data]);
                setValue('');
            } else {
                alert('값을 DB에 넣는데 실패했습니다.');
            }
        });
    };

    return (
        <div>
            <div className="App">
                <Routes>
                    {/* Admin */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route exact path="" element={<AdminHome />} />
                        <Route exact path="about" element={<AdminAbout />} />
                        <Route
                            exact
                            path="about/history"
                            element={<AdminHistory />}
                        />
                        <Route
                            exact
                            path="about/manager"
                            element={<AdminAboutManager />}
                        />
                        <Route exact path="notice" element={<AdminNotice />} />
                        <Route exact path="news" element={<News />} />
                        <Route exact path="board" element={<Board />} />
                        <Route exact path="photo" element={<Photos />} />
                        <Route exact path="apply" element={<Apply />} />
                        <Route
                            exact
                            path="apply/check"
                            element={<ApplyCheck />}
                        />
                        <Route exact path="apply/result" element={<Result />} />
                        <Route exact path="qna" element={<QnA />} />
                        <Route exact path="faq" element={<FAQ />} />
                    </Route>

                    {/* Main */}
                    <Route path="/" element={<AppLayout />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about" element={<About />} />
                        <Route
                            exact
                            path="/about/manager"
                            element={<AboutManager />}
                        />
                        <Route
                            exact
                            path="/about/history"
                            element={<History />}
                        />
                        <Route exact path="/notice" element={<Notice />} />
                        <Route exact path="/news" element={<News />} />
                        <Route exact path="/board" element={<Board />} />
                        <Route exact path="/photo" element={<Photos />} />
                        <Route exact path="/apply" element={<Apply />} />
                        <Route
                            exact
                            path="/apply/check"
                            element={<ApplyCheck />}
                        />
                        <Route
                            exact
                            path="/apply/result"
                            element={<Result />}
                        />

                        <Route exact path="/qna" element={<QnA />} />
                        <Route exact path="/qna/:questionID" element={<DisplayAnswers/>}/>
                        
                        <Route exact path="/faq" element={<FAQ />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
