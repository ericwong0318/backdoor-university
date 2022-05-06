import React, { useState } from 'react'

import {
    Label,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart, Pie, Sector, Cell, Legend,
} from 'recharts';

import './StatisticsPage.css'
import { data1 } from './SpecDataSet'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';
import { getAllProgramme } from '../../../features/services';

import { useAuth } from '../../../Components/auth/AuthProvider';
import { Typography } from '@mui/material';

// Use Interface to define what this component can take in
interface ITemplateComponentProps {
}

function createData2(
    College: string,
    gpa: number,
    uni: string,
    comment: string,
    uniprog: string,
    ccprog: string,
) {
    return { College, gpa, uni, comment, uniprog, ccprog };
}


// Change the component name and the file name yourselve
const TemplateComponent = (props: ITemplateComponentProps) => {
    const { localString } = useContext(LanguageContext)

    const [comment, setComment] = useState('');

    const auth = useAuth();

    function addComment(inComment: string) {
        console.log(auth.user);
        let currUser = auth.user;

        if (currUser === null) {
            alert("Please login");
        } else {
            data1.unshift({ id: "1", College: "HKCC", gpa: 3.5, uni: "CUHK", comment: inComment, uniprog: "Computer Science", ccprog: "Information Technology" },);
            console.log(data1);
            setRow2([createData2(data1[0].College, data1[0].gpa, data1[0].uni, data1[0].comment, data1[0].uniprog, data1[0].ccprog)]);
        }
    }


    const [rows2, setRow2] = useState([createData2(data1[0].College, data1[0].gpa, data1[0].uni, data1[0].comment, data1[0].uniprog, data1[0].ccprog)]);

    var total = 0;
    var hkccOffer = 0;
    var IVEOffer = 0;
    var spaceOffer = 0;
    var otherOffer = 0;



    for (var i = 1; i < data1.length; i++) {
        rows2.push(createData2(data1[i].College, data1[i].gpa, data1[i].uni, data1[i].comment, data1[i].uniprog, data1[i].ccprog));
        total++;
        if (data1[i].College == "HKCC") {
            hkccOffer++;
        }

        if (data1[i].College == "IVE") {
            IVEOffer++;
        }
        if (data1[i].College == "SPACE") {
            spaceOffer++;
        }
        if (data1[i].College == "Other") {
            otherOffer++;
        }
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const data2 = [
        { name: 'HKCC', value: hkccOffer },
        { name: 'IVE', value: IVEOffer },
        { name: 'SPACE', value: spaceOffer },
        { name: 'Other', value: otherOffer },
    ];



    // You can access the data like this:
    return (

        // Use the data in the props to change the value of components
        <>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart width={800} height={150}>
                    <Pie
                        data={data2}
                        cx={"50%"}
                        cy={"50%"}
                        innerRadius={40}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center" }}> <b>{localString.totalOffer}: </b> {total}, ( <b>HKCC</b>: {hkccOffer}, <b>IVE</b>: {IVEOffer}, <b>SPACE</b>: {spaceOffer}, <b>{localString.otherCC}</b>: {otherOffer} ) </div>

            <ResponsiveContainer width="100%" height={250}>
                <ScatterChart
                    width={500}
                    height={250}
                    margin={{
                        top: 0,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <YAxis type="category" dataKey="College" allowDuplicatedCategory={false} label={{ offset: 100, angle: -90, value: '' }}>
                        <Label position="insideBottom" />
                    </YAxis>
                    <XAxis tickCount={11} type="number" domain={[3, 4]} dataKey="gpa" name="GPA" label={{ value: '', bottom: 100, angle: 0, position: 'insideLeft' }} />
                    <ZAxis type="category" dataKey="ccprog" range={[80, 80]} name="CC Program" />
                    <Tooltip labelFormatter={() => ""} />
                    <CartesianGrid strokeDasharray="3 3" />

                    <Scatter name={data1[0].uni} data={data1} fill={"purple"} fillOpacity={0.5} >
                    </Scatter>


                </ScatterChart>
            </ResponsiveContainer>

            {/* comment */}
            <Typography sx={{ my: '20px' }}>
                <TextField label={localString.your_comment_offer} placeholder={localString.comment_here}
                    fullWidth value={comment} onChange={(event) => { setComment(event.target.value) }} //whenever the text field change, you save the value in state
                />
            </Typography>
            <Typography sx={{ my: '20px' }}>
                <Button variant="contained" onClick={() => {
                    addComment(comment);
                }}>{localString.add_comment}</Button>
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width='1%' size='small'> <b>{localString.CC}</b> </TableCell>
                            <TableCell width='1%' align="left"  > <b>cGPA</b></TableCell>
                            <TableCell width='13%' align="left" > <b>{localString.CCProgramme}</b> </TableCell>
                            <TableCell width='1%' align="left" > <b>{localString.Uni}</b> </TableCell>
                            <TableCell width='13%' align="left" > <b>{localString.UniProgramme}</b> </TableCell>
                            <TableCell align="left"> <b>{localString.comment}</b> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" size={'small'}>
                                    {row.College}
                                </TableCell>
                                <TableCell align="left" size={'small'}>{row.gpa}</TableCell>
                                <TableCell align="left" size={'small'}>{row.ccprog}</TableCell>
                                <TableCell align="left" size={'small'}>{row.uni}</TableCell>
                                <TableCell align="left" size={'small'}>{row.uniprog}</TableCell>
                                <TableCell align="left">{row.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default TemplateComponent;
