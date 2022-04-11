import React from 'react';
import { NavLink } from 'react-router-dom'
import './HomePage.css'
import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

interface IHomePageProps {

}

const HomePage = (props: IHomePageProps) => {
    const { localString } = useContext(LanguageContext)

    return (
        <React.Fragment>
            <h1>HomePage</h1>
            <div className="bg">
            <div>
                    <h1 className="text">
                    <h1 className="bigtitle">
                            BACKDOOR UNIVERSITY
                        </h1>
                        {localString.wel_1speech}<br/>
                        {localString.wel_2speech}<br/>
                    </h1>
                </div>
            </div>
            <div>
                <h1 className="title">{localString.hm_title}</h1>
            </div>

            <div className="big">
                <article className="notice">
                    <div className="photo-box">
                        <img src="https://media.istockphoto.com/photos/business-executives-brainstorming-discussing-sale-performance-on-new-picture-id1127079447?k=20&m=1127079447&s=612x612&w=0&h=brQ66MH8nKM-eF3qWzxjXJmSP4_xf1JxDI0RUooOD2E=" width="1500" height="1368" alt=""></img>
                    </div>
                    <div className="notice-content">

                        <h1 className="notice-title"><NavLink to="/tips">{localString.hm_tips}</NavLink></h1>

                        <p className="notice-desc">{localString.hm_tips_content}</p>

                        <NavLink to="/tips">{localString.click_here}</NavLink>

                    </div>
                </article>
            </div>

            <div className="big">
                <article className="notice">
                    <div className="photo-box">
                        <img src="https://cdn.pixabay.com/photo/2017/11/27/07/02/time-2980690_960_720.jpg" width="1500" height="1368" alt=""></img>
                    </div>
                    <div className="notice-content">

                        <h1 className="notice-title"><NavLink to="/news">{localString.hm_dl}</NavLink></h1>

                        <p className="notice-desc">{localString.hm_dl_content}</p>

                        <NavLink to="/news">{localString.click_here}</NavLink>

                    </div>
                </article>
            </div>
            
            <div style={{ height: 200 }}></div>

        </React.Fragment>
    )
}

export default HomePage;