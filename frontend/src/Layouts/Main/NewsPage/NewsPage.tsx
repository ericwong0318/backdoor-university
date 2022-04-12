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
  let uniList=[
    {"id": 1, "name": localString.cuhk_name, "image": "/img/cuhk_logo.jpg", "early":localString.cuhk_early, "main": localString.cuhk_main, "extend": localString.cuhk_extend},

    {"id": 2, "name": localString.ust_name, "image": "/img/hkust_logo.png", "early":localString.ust_early, "main": localString.ust_main, "extend": localString.ust_extend},

    {"id": 3, "name": localString.hku_name, "image": "/img/hku_logo.jpg", "early":localString.hku_early, "main": localString.hku_main, "extend": localString.hku_extend},

    {"id": 4, "name": localString.cityu_name,"image": "/img/cityu_logo.png", "early":localString.cityu_early, "main": localString.cityu_main, "extend": localString.cityu_extend},

    {"id": 5, "name": localString.polyu_name,"image": "/img/polyu_logo.png", "early":localString.polyu_early, "main": localString.polyu_main, "extend": localString.polyu_extend},

    {"id": 6, "name": localString.edu_name, "image": "/img/eduhk_logo.png", "early":localString.edu_early, "main": localString.edu_main, "extend": localString.edu_extend},

    {"id": 7, "name": localString.hsu_name, "image": "/img/hsu_logo.png", "early":localString.hsu_early, "main": localString.hsu_main, "extend": localString.hsu_extend},

    {"id": 8, "name": localString.lingu_name, "image":"/img/lingu_logo.png", "early":localString.lingu_early, "main": localString.lingu_main, "extend": localString.lingu_extend},

    {"id": 9, "name": localString.hkmu_name, "image": "/img/hkmu_logo.png", "early":localString.hkmu_early, "main": localString.hkmu_main, "extend": localString.hkmu_extend},
    
    {"id": 10, "name": localString.hkbu_name, "image": "/img/hkbu_logo.png", "early":localString.hkbu_early, "main": localString.hkbu_main, "extend": localString.hkbu_extend}
]


    return (
        <React.Fragment>
            <h1>NewsPage</h1>
            <h2 className="title">
              {localString.hm_dl}
            </h2>
            <div className="container">
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="http://admission.cuhk.edu.hk/non-jupas-yr-1/application-details.html">
                    <CardMedia
                      component="img"
                      image={uniList[0].image}
                      height="240"
                      alt={uniList[0].name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[0].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[0].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[0].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[0].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="http://admission.cuhk.edu.hk/non-jupas-yr-1/application-details.html">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>  

              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://join.hkust.edu.hk/apply">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[1].image}
                      alt={uniList[1].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[1].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[1].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[1].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[1].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://join.hkust.edu.hk/apply">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
              
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://ug.hku.hk/hku-applicant/hku/index/login.xhtml">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[2].image}
                      alt={uniList[2].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[2].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[2].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[2].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[2].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://ug.hku.hk/hku-applicant/hku/index/login.xhtml">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>

              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://www.admo.cityu.edu.hk/apply">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[3].image}
                      alt={uniList[3].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[3].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[3].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[3].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[3].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.admo.cityu.edu.hk/apply">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>

              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://www38.polyu.edu.hk/eAdmission/index.do">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[4].image}
                      alt={uniList[4].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[4].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[4].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[4].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[4].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www38.polyu.edu.hk/eAdmission/index.do">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
                
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://www.apply.eduhk.hk/ug/nonjupas">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[5].image}
                      alt={uniList[5].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[5].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[5].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[5].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[5].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.apply.eduhk.hk/ug/nonjupas">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
                
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://www.hsu.edu.hk/en/admissions/">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[6].image}
                      alt={uniList[6].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[6].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[6].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[6].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[6].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.hsu.edu.hk/en/admissions/">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
                
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://www.ln.edu.hk/admissions/ug/non-jupas">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[7].image}
                      alt={uniList[7].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[7].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[7].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[7].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[7].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.ln.edu.hk/admissions/ug/non-jupas">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>
                
              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://admissions.hkmu.edu.hk/ug/non-jupas-local/">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[8].image}
                      alt={uniList[8].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[8].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[8].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[8].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[8].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://admissions.hkmu.edu.hk/ug/non-jupas-local/">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>

              <div className="box">
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea href="https://admissions.hkmu.edu.hk/ug/non-jupas-local/">
                    <CardMedia
                      component="img"
                      height="240"
                      image={uniList[9].image}
                      alt={uniList[9].name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bold'}}>
                        {uniList[9].name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[9].early}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[9].main}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {uniList[9].extend}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://iss.hkbu.edu.hk/amsappl_nj/">
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </div>

            </div>

        </React.Fragment>
        
    ) 
}

export default NewsPage;