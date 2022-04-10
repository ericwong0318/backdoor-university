import React from 'react';
import { NavLink } from 'react-router-dom'
import './HomePage.css'

interface IHomePageProps {

}

const HomePage = (props: IHomePageProps) => {

    return (
        <React.Fragment>
            <h1>HomePage</h1>
            <div className="bg">
                <div /* style={{padding:100}} */>
                    <h1 className="text">
                        Welcome! All the Non-Jupas student<br/>
                        Here, we provide all the information you need!<br/>
                    </h1>
                </div>
            </div>
            <div>
                <h1 className="title">Things You Have to Know</h1>
            </div>

            <div className="big">
                <article className="notice">
                    <div className="photo-box">
                        <img src="https://media.istockphoto.com/photos/business-executives-brainstorming-discussing-sale-performance-on-new-picture-id1127079447?k=20&m=1127079447&s=612x612&w=0&h=brQ66MH8nKM-eF3qWzxjXJmSP4_xf1JxDI0RUooOD2E=" width="1500" height="1368" alt=""></img>
                    </div>
                    <div className="notice-content">

                        <h1 className="notice-title"><NavLink to="/tips">Interview Tips</NavLink></h1>

                        <p className="notice-desc">Have you got a oppotunity of interview, and are now feeling nervous and wondering how to prepare?</p>

                        <NavLink to="/tips">Click here for more information</NavLink>

                    </div>
                </article>
            </div>

            <div className="big">
                <article className="notice">
                    <div className="photo-box">
                        <img src="https://cdn.pixabay.com/photo/2017/11/27/07/02/time-2980690_960_720.jpg" width="1500" height="1368" alt=""></img>
                    </div>
                    <div className="notice-content">

                        <h1 className="notice-title"><NavLink to="/news">Application Deadline</NavLink></h1>

                        <p className="notice-desc">Remember to apply the non jupas application before the deadline</p>

                        <NavLink to="/news">Click here for more information</NavLink>

                    </div>
                </article>
            </div>
            
            <div style={{ height: 200 }}></div>

        </React.Fragment>
    )
}

export default HomePage;