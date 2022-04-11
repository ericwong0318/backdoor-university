import { ForkLeft } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { fontSize } from '@mui/system';
import './TipsPage.css'
import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

interface ITipsPageProps {

}

const TipsPage = (props: ITipsPageProps) => {
    
    const { localString } = useContext(LanguageContext)

    return (
        <React.Fragment>
            <h1 >TipsPage</h1>
            <img className='tips_img' src={"https://techbullion.com/wp-content/uploads/2021/11/tips.png"}></img>
            <h1 className='Content'>{localString.go_to}</h1>
            <div className='url'>
                <a href="#subtitle1">{localString.title1}</a><br />
                <a href="#subtitle2">{localString.title2}</a><br />
                <a href="#subtitle3">{localString.title3}</a><br />
                <a href="#subtitle4">{localString.title4}</a><br />
                <a href="#subtitle5">{localString.title5}</a><br />
                <a href="#subtitle6">{localString.title6}</a><br />
                <a href="#subtitle7">{localString.title7}</a><br />
                <a href="#subtitle8">{localString.title8}</a><br />
            </div>
            <div className='Title'>{localString.uni_int}</div>
            <div id="subtitle1" className='SubTitle'>{localString.title1}</div>
            <p className='Content'><div className="box">{localString.content1}</div></p>
            <div id="subtitle2" className='SubTitle'>{localString.title2}</div>
            <p className='Content'><div className="box">{localString.content2}</div></p>
            <div id="subtitle3" className='SubTitle'>{localString.title3}</div>
            <p className='Content'><div className="box">{localString.content3}</div></p>
            <div id="subtitle4" className='SubTitle'>{localString.title4}</div>
            <p className='Content'><div className="box">{localString.content4}</div></p>
            <div className="tips_img">
                <img style={{ height: 160 }} src='https://media.istockphoto.com/photos/close-up-on-senior-employee-woman-hand-using-pen-to-writing-schedule-picture-id1220976971?b=1&k=20&m=1220976971&s=170667a&w=0&h=nUzubdoTfJEtF2cWd4o5PThaQ8zxKTjBaWbVUL3utlM='></img>
            </div>
            
            <div id="subtitle5" className='SubTitle'>{localString.title5}</div>
            <p className='Content'><div className="box">{localString.content5}</div></p>
            <div id="subtitle6" className='SubTitle'>{localString.title6}</div>
            <p className='Content'><div className="box">{localString.content6}</div></p>
            <div className="tips_img">
                <img style={{ height: 250 }} src='https://media.istockphoto.com/photos/five-candidates-waiting-for-job-interviews-front-view-crop-picture-id862718314?b=1&k=20&m=862718314&s=170667a&w=0&h=q39-XJx4TGI2OMgoPNR-OIFXdYQGR3sZdjylrsvnldg='></img>
            </div>
            <div id="subtitle7" className='SubTitle'>{localString.title7}</div>
            <p className='Content'><div className="box">{localString.content7}</div></p>
            <div className="tips_img">
                <img style={{ height: 250 }} src='https://i.pinimg.com/564x/eb/75/9d/eb759d31dd9a5848d063f66c269dabf7.jpg'></img>
                <img style={{ height: 250 }} src='https://i.pinimg.com/564x/b4/00/ab/b400ab62fe22869681a460251e248858.jpg'></img>
            </div>
            <div id="subtitle8" className='SubTitle'><div className="box">{localString.title8}</div></div>
            <p className='Content'><div className="box">{localString.content8}</div></p>
            <div style={{ height: 200 }}></div>

        </React.Fragment>

    )
}

export default TipsPage;
