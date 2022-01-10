import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

const UnderLine = styled.hr`
    width: 70%;
    align: center;
`;

const Apply = () => {
    return (
        <Fragment>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '15px',
                    height: '100vh',
                }}
            >
                <UnderLine /> <p>현재 합격 확인 기간이 아닙니다.</p>
                <UnderLine />
            </div>
        </Fragment>
    );
};

export default Apply;
