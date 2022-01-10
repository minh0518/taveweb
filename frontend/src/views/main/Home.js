import React from 'react';
import styled from 'styled-components';
import LogoSrc from './tave.png';
import LogoSrc1 from './tave_activity.jpg';

const Info = styled.div`
    margin:auto;
    padding-bottom:20px;
    width:100%;
`;

const StyledH1=styled.p`
   font-family: sans-serif;
   font-size: xx-large;
   font-weight:bold;
   letter-spacing: 10px;
`
const StyledH2=styled.h2`
   font-family: sans-serif;
`

const Logo = styled.img`
    width: 28%;
    height: 20%;
    margin-left:15%;
    display: inline-block;
`;
const Logo1 = styled.img`
    width: 28%;
    height: 20%;
    margin-left:10%;
    display: inline-block;
`;
const ConTent = styled.p`
    margin-left:10%;
    margin-right:10%;
    display: inline-block;
`;

const Section = styled.div`
float: left; 
padding-right:200px;
`;

const Text=styled.span`
line-height:45px;
`

const Home = ()=>{
    return (
        <Info>       
                <Logo src={LogoSrc} /> 
                <Logo1 src={LogoSrc1} />
                <ConTent>

                <StyledH1>TAVE - "Technology WAVE"</StyledH1>
                국내 최초 4차 산업혁명 연합 동아리 TAVE입니다 
                <br/><br/>

                <Section>
                <StyledH2>💎 활동 내용 </StyledH2> 
                <Text>
                정규 커리큘럼 공통 관심사 스터디 및 프로젝트 진행<br/>
                [머신러닝/딥러닝, R, Python, C++, Java 알고리즘, 크롤링, 아두이노, 블록체인 등]<br/>
                TAVE 컨퍼런스 개최<br/>
                친목 Network 형성<br/>
                [다양한 뒷풀이, 번개, Tave의 날 (OB와의 만남)]<br/><br/>
                </Text>
                </Section>

                <Section>
                <StyledH2> 💎 문의 </StyledH2> 
                <Text>
                ❗ 문의는 인스타 DM을 이용해주세요.<br/>
                ❗ 인스타그램 ID: tave_wave<br/>
                ❗ 블로그 https://m.blog.naver.com/t-ave<br/>
                </Text>
                </Section>

                </ConTent>
                <br/> 
        </Info>
    );
};

export default Home;