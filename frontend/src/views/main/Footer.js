import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    background: linear-gradient(to top, #c4d4e0, white);
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: row;
`;

const UnderLine = styled.hr`
    width: 80%;
    margin-left: 0px;
`;
const Section = styled.div``;

const Text = styled.p`
    margin-right: 10%;
`;

function Footer() {
    return (
        <Info>
            <Section>
                <h1>TAVE</h1>
                <UnderLine />
                <Text>
                    TAVE는 2018년도 초에 창설된 국내 최초 4차
                    산업혁명동아리입니다. Technology WAVE의 약자로 4차 산업혁명
                    기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.
                </Text>
            </Section>
            <Section>
                <h1>TAVE</h1>
                <UnderLine />
                <Text>
                    TAVE는 2018년도 초에 창설된 국내 최초 4차
                    산업혁명동아리입니다. Technology WAVE의 약자로 4차 산업혁명
                    기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.
                </Text>
            </Section>
            <Section>
                <h1>TAVE</h1>
                <UnderLine />
                <Text>
                    TAVE는 2018년도 초에 창설된 국내 최초 4차
                    산업혁명동아리입니다. Technology WAVE의 약자로 4차 산업혁명
                    기술의 물결을 선도한다 라는 뜻을 가지고 있습니다.
                </Text>
            </Section>
        </Info>
    );
}

export default Footer;
