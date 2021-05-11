import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import { setFromServerMessage, setServiceResponseTime } from '../redux/action/socket';

const MessageBox = styled.div`
    background-color: #EFAA70;
    width: 500px;
    height: 400px;
`;
const Textarea = styled.textarea`
    background-color: pink; 
    width: 500px;
    height: 80px;
`;

const END_POINT = "http://127.0.0.1:4001";

const Socket = () => {
   const dispatch = useDispatch();
   const serverResponseTime = useSelector(state => state.socket.serverResponseTime);
   const [inputMessage, setInputMessage] = useState("");
   const fromServerMessage = useSelector(state => state.socket.fromServerMessage);
   const [isClick, setIsClick] = useState(false); 


   const socket = socketIOClient(END_POINT);
   useEffect(() => {
       socket.on("FromAPI", data => {
        dispatch(setServiceResponseTime(data));
       })
        socket.on("fromServerMessage", messages => {
        dispatch(setFromServerMessage(messages));
       })
   },[serverResponseTime, isClick, setFromServerMessage])

   const textAreaHandler = (e) => {
    setInputMessage(e.target.value);
   }

   const saveMessage = () => {
       socket.emit("inputMessage", inputMessage);
       setIsClick(!isClick);
   }

   return (
       <div>
            <p>
                It's <time dateTime={serverResponseTime}>{serverResponseTime}</time>
            </p>
            <hr />
            
           <MessageBox>
                {
                    fromServerMessage.map((item ,index) => {
                        return (
                            <div key={index}> {item} </div>
                        )
                    })
                }
            </MessageBox>
            
            <Textarea onChange={(e) => textAreaHandler(e)}>
                {inputMessage}    
            </Textarea> 
            <button onClick={() => saveMessage()}>전송</button> 
       </div>
   )
}

export default Socket;