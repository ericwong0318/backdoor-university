import { ForkLeft } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { fontSize } from '@mui/system';
import React from 'react';
import './NewsPage.css'
import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


interface INewsPageProps {

}

const NewsPage = (props: INewsPageProps) => {
  const { localString } = useContext(LanguageContext)
  let uniList = [
    { "id": 1, "name": localString.cuhk_name, "image": "/img/cuhk_logo.jpg", "early": localString.cuhk_early, "main": localString.cuhk_main, "extend": localString.cuhk_extend },

    { "id": 2, "name": localString.ust_name, "image": "/img/hkust_logo.png", "early": localString.ust_early, "main": localString.ust_main, "extend": localString.ust_extend },

    { "id": 3, "name": localString.hku_name, "image": "/img/hku_logo.jpg", "early": localString.hku_early, "main": localString.hku_main, "extend": localString.hku_extend },

    { "id": 4, "name": localString.cityu_name, "image": "/img/cityu_logo.png", "early": localString.cityu_early, "main": localString.cityu_main, "extend": localString.cityu_extend },

    { "id": 5, "name": localString.polyu_name, "image": "/img/polyu_logo.png", "early": localString.polyu_early, "main": localString.polyu_main, "extend": localString.polyu_extend },

    { "id": 6, "name": localString.edu_name, "image": "/img/eduhk_logo.png", "early": localString.edu_early, "main": localString.edu_main, "extend": localString.edu_extend },

    { "id": 7, "name": localString.hsu_name, "image": "/img/hsu_logo.png", "early": localString.hsu_early, "main": localString.hsu_main, "extend": localString.hsu_extend },

    { "id": 8, "name": localString.lingu_name, "image": "/img/lingu_logo.png", "early": localString.lingu_early, "main": localString.lingu_main, "extend": localString.lingu_extend },

    { "id": 9, "name": localString.hkmu_name, "image": "/img/hkmu_logo.png", "early": localString.hkmu_early, "main": localString.hkmu_main, "extend": localString.hkmu_extend },

    { "id": 10, "name": localString.hkbu_name, "image": "/img/hkbu_logo.png", "early": localString.hkbu_early, "main": localString.hkbu_main, "extend": localString.hkbu_extend }
  ]


  return (
    <React.Fragment>
      <h1>NewsPage</h1>
      <h2 className="title">
        {localString.hm_dl}
      </h2>
      <div className="uni_info">
        <article className="notice">
          <div className="photo-box">
            <img src={uniList[0].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[0].name.toString()}</h1>
              <p className="notice-desc">{uniList[0].early}<br/>{uniList[0].main}<br/>{uniList[0].extend}</p>
              <a href="http://admission.cuhk.edu.hk/non-jupas-yr-1/application-details.html">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[1].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[1].name.toString()}</h1>
              <p className="notice-desc">{uniList[1].early}<br/>{uniList[1].main}<br/>{uniList[1].extend}</p>
              <a href="https://join.hkust.edu.hk/apply">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[2].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[2].name.toString()}</h1>
              <p className="notice-desc">{uniList[2].early}<br/>{uniList[2].main}<br/>{uniList[2].extend}</p>
              <a href="https://ug.hku.hk/hku-applicant/hku/index/login.xhtml">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[3].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[3].name.toString()}</h1>
              <p className="notice-desc">{uniList[3].early}<br/>{uniList[3].main}<br/>{uniList[3].extend}</p>
              <a href="https://www.admo.cityu.edu.hk/apply">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[4].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[4].name.toString()}</h1>
              <p className="notice-desc">{uniList[4].early}<br/>{uniList[4].main}<br/>{uniList[4].extend}</p>
              <a href="https://www38.polyu.edu.hk/eAdmission/index.do">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[5].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[5].name.toString()}</h1>
              <p className="notice-desc">{uniList[5].early}<br/>{uniList[5].main}<br/>{uniList[5].extend}</p>
              <a href="https://www.apply.eduhk.hk/ug/nonjupas">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[6].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[6].name.toString()}</h1>
              <p className="notice-desc">{uniList[6].early}<br/>{uniList[6].main}<br/>{uniList[6].extend}</p>
              <a href="https://www.hsu.edu.hk/en/admissions/">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[7].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[7].name.toString()}</h1>
              <p className="notice-desc">{uniList[7].early}<br/>{uniList[7].main}<br/>{uniList[7].extend}</p>
              <a href="https://www.ln.edu.hk/admissions/ug/non-jupas">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[8].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[8].name.toString()}</h1>
              <p className="notice-desc">{uniList[8].early}<br/>{uniList[8].main}<br/>{uniList[8].extend}</p>
              <a href="https://admissions.hkmu.edu.hk/ug/non-jupas-local/">{localString.apply_now}</a>
          </div>
        </article>

        <article className="notice">
          <div className="photo-box">
            <img src={uniList[9].image} width="1500" height="1368" alt=""></img>
          </div>
          <div className="notice-content">
              <h1 className="notice-title">{uniList[9].name.toString()}</h1>
              <p className="notice-desc">{uniList[9].early}<br/>{uniList[9].main}<br/>{uniList[9].extend}</p>
              <a href="https://iss.hkbu.edu.hk/amsappl_nj/">{localString.apply_now}</a>
          </div>
        </article>

      </div>
   

    </React.Fragment>

  )
}

export default NewsPage;