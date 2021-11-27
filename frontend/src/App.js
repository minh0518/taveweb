import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import Navbar from './views/Navbar';
import Home from './views/Home';
import About from './views/About';
import Board from './views/Board';
import Apply from './views/Apply';
import QnA from './views/QnA';

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
            <Navbar />
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/About" element={<About />} />
                    <Route exact path="/Board" element={<Board />} />
                    <Route exact path="/Apply" element={<Apply />} />
                    <Route exact path="/QnA" element={<QnA />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
