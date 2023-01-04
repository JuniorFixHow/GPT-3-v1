import React, { useEffect, useState } from 'react';
import './home.css';
import {HiPaperAirplane} from 'react-icons/hi';
import {FcAndroidOs} from 'react-icons/fc';
import {FaUser} from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
   const [message, setMessage] = useState('');
   const [typing, setTyping] = useState('Idle');
   const [aistate, setAiState] = useState('Idle');
   const [userInput, setUserInput] = useState('');
   const [timer, setTimer] = useState(null);
   let mess = document.getElementById('message'); 

   
   const userType = (e)=>{
       if(e.target.value !==""){
           setTyping('Typing')
           clearTimeout(timer);
           const newTimer = setTimeout(()=>{
            setTyping('Thinking')
           },5000)
           setTimer(newTimer);
        }
        else{
           setTyping('Thinking')
       }
   }
    const uniqueId = ()=>{
        const date = Date.now();
        const rand = Math.random();
        const hex = rand.toString(16);
        return `id-${date}-${hex}`;
    }

   const [isEmpty, setIsEmpty] = useState(false);
   const [aiFeedback, setAiFeedback] = useState('');
   const [black, setBlack] = useState(true);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setAiFeedback('')
        setAiState('Thinking');
        setTyping('Waiting')
        if(message===''){
            setIsEmpty(true);
            setTyping('Idle')
            setAiState('Idle');
        }
        else{
            const data = {
                prompt:message
            }

            await axios.post('https://gpt-3-v1.onrender.com/api/requests', data).then(res=>{
                setAiState('Idle');
                setTyping('Idle')
                setUserInput(message);
                // console.log(res.data);
                document.getElementById('myform').reset();
                let chatbox = document.getElementById('feed');
                let newData = res.data.bot;
                if(res.status ===200){
                    // console.log(newData);
                    let index = 0;
                    let interval = setInterval(() => {
                        if(index<newData.length){
                            chatbox.innerHTML+=newData.charAt(index)
                            setAiFeedback(undefined);
                            chatbox.scrollTop = chatbox.scrollHeight;
                            index++;
                        }
                        else{
                            clearInterval(interval)
                        }
                    }, 20);
                    setTyping('Reading')
                }
                else{
                    setAiFeedback('Error occured in the operation');
                }
            })
            .catch(err=>{
                console.log(err);
                setAiState('Idle')
            })
        }
    }
    useEffect(()=>{
        const keyDownHandler =e=>{
            // alert('user pressed:', e.key)
            if(e.key==='Enter'){
                handleSubmit();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return ()=>{
            document.removeEventListener('keydown', keyDownHandler);
        }
    },[])
    // console.log(uniqueId())
    const handleGit = ()=>{
        window.open('https://github.com/JuniorFixHow/GPT-3-v1.git','blank')
    }
    return (
        <div className='home' >
          <div className="top">
              <span onClick={handleGit} className="left">Make this page better</span>
                <div onClick={()=>setBlack(!black)} className={black? "white-box":"black-box"}></div>
            </div> 
          <div className={black?"center":"center-white"}>
                <div className="actions">
                    <div className="user">
                        <FaUser className={black?'user-icon':'user-icon-white'} />
                        <span className={black?'user-question':'user-question-white'} >{typing}</span>
                    </div>
                    <div className="ai">
                        <FcAndroidOs className='ai-icon' />
                        <span className={black?'ai-answer':'ai-answer-white'} >{aistate}</span>
                    </div>
                    <div className="data">
                        <span className={black?"question":"question-white"} >{userInput}</span>
                        <span className={black? "answer":"answer-white"} id='feed'>{aiFeedback}</span>
                    </div>
                </div>
            <div className="down">
                <form onSubmit={handleSubmit} id='myform'>
                    <input type='text' className={black?'text-input':"text-input-white"} id='message' onChange={(e)=>setMessage(e.target.value)}  onFocus={(e)=>setTyping('Thinking')} onBlur={(e)=>setTyping('Idle')}  onInput ={userType}  placeholder={isEmpty?'* Required':'Ask your question...'} />
                </form>
            </div>
          </div>
        </div>
    )
}

export default Home