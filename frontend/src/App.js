import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Router, Link } from 'react-router-dom';
import AppLayout from './views/AppLayout';
import Navbar from './views/Navbar';
import Home from './views/Home';
import About from './views/TAVE/About';
import About_admin from './views/TAVE/About_admin';
import History from './views/TAVE/History';
import Notice from './views/Notice/Notice';
import Tavynews from './views/Notice/Tavynews';
import Board from './views/TAVY/Board';
import Photos from './views/TAVY/Photos';
import Apply from './views/Recruit/Apply';
import Apply_check from './views/Recruit/Apply_check';
import Result from './views/Recruit/Result';
import QnA from './views/Q&A/QnA';
import FAQ from './views/Q&A/FAQ';
import Admin from './views/admin/admin';

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
                    <Route exact path="/admin" element={<Admin />} />
                    <Route path="/" element={<AppLayout />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/About" element={<About />} />
                        <Route
                            exact
                            path="/About_admin"
                            element={<About_admin />}
                        />
                        <Route exact path="/History" element={<History />} />
                        <Route exact path="/Notice" element={<Notice />} />
                        <Route exact path="/Tavynews" element={<Tavynews />} />
                        <Route exact path="/Board" element={<Board />} />
                        <Route exact path="/Photos" element={<Photos />} />
                        <Route exact path="/Apply" element={<Apply />} />
                        <Route
                            exact
                            path="/Apply_check"
                            element={<Apply_check />}
                        />
                        <Route exact path="/Result" element={<Result />} />
                        <Route exact path="/QnA" element={<QnA />} >
                            
                        <Route exact path=":id" element={<Home />} />
                        </Route>
                        <Route exact path="/FAQ" element={<FAQ />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
