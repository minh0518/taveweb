import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    position: absolute;
    bottom: 40px;
    border : 1px solid navy;
    display:flex;
    flex-direction: row;
`;


const Section=styled.div`
border : 1px solid navy;
    
`

const Text=styled.p`
border : 1px solid navy;

`

function Footer() {
    return (
        <Info>
            <Section>
            <h1>TAVE</h1>
            <Text>TAVE는 2018년도 초에 창설된 국내 최초 4차 산업혁명동아리입니다. Technology WAVE의 약자로
                4차 산업혁명 기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.</Text>
            </Section>
            <Section>
            <h1>TAVE</h1>
            <Text>TAVE는 2018년도 초에 창설된 국내 최초 4차 산업혁명동아리입니다. Technology WAVE의 약자로
                4차 산업혁명 기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.</Text>
            </Section>
            <Section>
            <h1>Contact</h1>
            <Text>TAVE는 2018년도 초에 창설된 국내 최초 4차 산업혁명동아리입니다. Technology WAVE의 약자로
                4차 산업혁명 기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.</Text>
            </Section>

        </Info>
    );
}


export default Footer;
