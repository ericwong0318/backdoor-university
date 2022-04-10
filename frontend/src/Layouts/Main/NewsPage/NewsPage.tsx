import { ForkLeft } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { fontSize } from '@mui/system';
import React from 'react';
import './NewsPage.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


interface INewsPageProps {

}

const NewsPage = (props: INewsPageProps) => {
  let uniList=[
    {"id": 1, "name": "CUHK", "image": "/img/cuhk_logo.jpg", "early":"Early Round Deadline: 17 Nov 2021", "main": "Regular Round Deadline: 6 Jan 2022", "extend": "Extended Application Deadline: 31 May 2022"},

    {"id": 2, "name": "HKUST", "image": "/img/hkust_logo.png", "early":"Early Round Deadline: 19 Nov 2021", "main": "Regular Round Deadline: 14 Jan 2022", "extend": "Extended Application Deadline: N/A"},

    {"id": 3, "name": "HKU", "image": "/img/hku_logo.jpg", "early":"Early Round Deadline: 17 Nov 2021", "main": "Regular Round Deadline: 24 Aug 2022", "extend": "Extended Application Deadline: N/A"},

    {"id": 4, "name": "CityU", "image": "/img/cityu_logo.png", "early":"Early Round Deadline: 15 Nov 2021", "main": "Regular Round Deadline: 13 Jan 2022", "extend": "Extended Application Deadline: N/A"},

    {"id": 5, "name": "PolyU", "image": "/img/polyu_logo.png", "early":"Early Round Deadline: 17 November 2021", "main": "Regular Round Deadline: 6 January 2022", "extend": "Extended Application Deadline: 31 May 2022"},

    {"id": 6, "name": "EduHK", "image": "/img/eduhk_logo.png", "early":"Early Round Deadline: 12 Jan 2021", "main": "Regular Round Deadline: 12 May 2022", "extend": "Extended Application Deadline: N/A"},

    {"id": 7, "name": "HSU", "image": "/img/hsu_logo.png", "early":"Early Round Deadline: N/A", "main": "Regular Round Deadline: 8 Aug 2022", "extend": "Extended Application Deadline: N/A"},

    {"id": 8, "name": "LingU", "image": "/img/lingu_logo.png", "early":"Early Round Deadline: 7 Dec 2021", "main": "Regular Round Deadline: 17 May 2022", "extend": "Extended Application Deadline: 28 Jul 2022"},

    {"id": 9, "name": "HKMU", "image": "/img/hkmu_logo.png", "early":"Early Round Deadline: 31 Mar 2021", "main": "Regular Round Deadline: 5 Aug 2022", "extend": "Extended Application Deadline: N/A"},
    
    {"id": 10, "name": "HKBU", "image": "/img/hkbu_logo.png", "early":"Early Round Deadline: N/A", "main": "Regular Round Deadline: 4 Jan 2022", "extend": "Extended Application Deadline: 31 May 2022"}
]


    return (
        <React.Fragment>
            <h1>NewsPage</h1>
            <h2 className="title">
              Application Deadline
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