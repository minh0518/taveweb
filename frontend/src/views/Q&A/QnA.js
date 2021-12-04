import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import Navbar from '../Navbar';

const QnA = () => {
    return (
        <div>
            <Navbar>
            <p>QnA 목록</p>
            </Navbar>
        </div>
    );
};

export default QnA;
