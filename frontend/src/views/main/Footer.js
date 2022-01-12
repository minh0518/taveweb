import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    background: linear-gradient(to top, #c4d4e0, white);
    display: flex;
    flex-direction: row;
`;

const UnderLine = styled.hr`
    width: 80%;
    margin-left: 0px;
`;
const Section = styled.div`
    margin-left: 3%;
    width: 500px;
`;
const Title = styled.p`
    font-size: xx-large;
    letter-spacing: 30px;
`;

const Contact = styled.p`
    font-size: xx-large;
    letter-spacing: 25px;
`;

const Text = styled.p`
    margin-right: 10%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    font-size: small;
    line-height: 1.7;
    color: #828282;
`;

function Footer() {
    return (
        <Info>
            <div width="100px">
                <Section>
                    <Title>TAVE</Title>
                    <UnderLine />
                    <Text>
                        TAVE는 2018년도 초에 창설된 국내 최초 4차
                        산업혁명동아리입니다. Technology WAVE의 약자로 4차
                        산업혁명 기술의 물결을 선도한다 라는 뜻을 가지고
                        있습니다.
                    </Text>
                </Section>
            </div>
            <div width="30%">
                <Section>
                    <Title>CONTACT</Title>
                    <UnderLine />
                    <Text>
                        TAVE 공식 인스타 ID: tave_wave
                        <br />
                        TAVE 공식 블로그: https://blog.naver.com/t-ave
                        <br />
                    </Text>
                </Section>
            </div>
            <div width="30%">
                <Section>
                    <Contact>TAVE 8th</Contact>
                    <UnderLine />
                    <Text>
                        8기 운영진 회장 오예림 010-xxxx-xxxx
                        <br />
                        기술처장 이우빈 010-xxxx-xxxx
                        <br />
                        경영처장 이동훈 010-xxxx-xxxx
                        <br />
                    </Text>
                </Section>
            </div>
        </Info>
    );
}

export default Footer;
