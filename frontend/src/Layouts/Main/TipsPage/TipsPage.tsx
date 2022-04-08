import { ForkLeft } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { fontSize } from '@mui/system';
import './TipsPage.css'
import React from 'react';

interface ITipsPageProps {

}

const TipsPage = (props: ITipsPageProps) => {

    return (
        <React.Fragment>
            <h1 >TipsPage</h1>
            <img className='tips_img' src="https://techbullion.com/wp-content/uploads/2021/11/tips.png"></img>
            <h1 className='Content'>Go to</h1>
            <div className='url'>
                <a href="#subtitle1">-How to prepare for a university interview</a><br />
                <a href="#subtitle2">-Practice answers to common questions</a><br />
                <a href="#subtitle3">-Re-read your personal statement</a><br />
                <a href="#subtitle4">-Make sure you can attend</a><br />
                <a href="#subtitle5">-Remember to bring any additional documents</a><br />
                <a href="#subtitle6">-Arrive early</a><br />
                <a href="#subtitle7">-Dress smartly</a><br />
                <a href="#subtitle8">-Prepare your own questions in advance</a><br />
            </div>
            <div className='Title'>University Interview</div>
            <div id="subtitle1" className='SubTitle'>How to prepare for a university interview</div>
            <p className='Content'>Being asked to attend an interview is the mark of an excellent application but remember that you'll be competing against other strong candidates. So, it's important to prepare well. These university interview tips listed below will help increase your chances of success.</p>
            <div id="subtitle2" className='SubTitle'>Practice answers to common questions</div>
            <p className='Content'>Most interview will ask 'Why do you want to study the subject?' and 'Why do you want to go to this university?'. Prepare the response to these question well , better memorize and polish it before the interview, but need to speak naturally and not like scripted. </p>
            <div id="subtitle3" className='SubTitle'>Re-read your personal statement</div>
            <p className='Content'>You might be asked about some of the things you included, so make sure you familiarise yourself with what you wrote. Double check the personal statement to ensure that there is no any mistakes.</p>
            <div id="subtitle4" className='SubTitle'>Make sure you can attend</div>
            <p className='Content'>If you're not able to attend the interview, contact the interview for rearrangement. Don't cancel it at the last minutes which give give the interviewee a bad images.</p>
            <div id="subtitle5" className='SubTitle'>Remember to bring any additional documents</div>
            <p className='Content'>You might be asked to bring a portfolio of your work if you’re applying for a creative arts course. Check this well in advance, as much of your interview may be focused on this work.</p>
            <div id="subtitle6" className='SubTitle'>Arrive early</div>
            <p className='Content'>If your interview is in face-to-face, arrive the campus half hour before the interview as you may get lost. Also, it allows you to have some time to get ready and familiarise yourself with the location and avoid adding any unnecessary stress. If you’re doing a virtual interview, ensure that the wifi connection is strong and all the communication devices are well functioned.</p>
            <div id="subtitle7" className='SubTitle'>Dress smartly</div>
            <p className='Content'>Looking clean and tidy will ensure that you leave a good impression. For business programme, you may need to dress formal. For others, you may be ask to dress smart causal.</p>
            <img style={{ height: 300 }} src='https://i.pinimg.com/564x/eb/75/9d/eb759d31dd9a5848d063f66c269dabf7.jpg'></img>
            <img style={{ height: 300 }} src='https://i.pinimg.com/564x/b4/00/ab/b400ab62fe22869681a460251e248858.jpg'></img>
            <div id="subtitle8" className='SubTitle'>Prepare your own questions in advance</div>
            <p className='Content'>When the interview is finished, you may have the chance to ask some question. Make sure that you have prepared the questions to show your interest to the programme. </p>
            <div style={{ height: 200 }}></div>

        </React.Fragment>

    )
}

export default TipsPage;
