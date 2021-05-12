import React from 'react';
import linebutton from '../../assets/btn_base.png';
import { Section, Img } from '../styled/styledComponents';



const Login = () => {
    const goLoginPage = () => {
        console.log('go login page');
        window.location.href="http://localhost:1337/connect/line"
    }
    return (
        <Section>
            <Img src={linebutton} alt=""  onClick={() => goLoginPage()} />
        </Section>
    )
}

export default Login;