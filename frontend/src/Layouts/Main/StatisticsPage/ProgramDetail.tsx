import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import React from 'react'

import {
    Legend,
    Label,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { data1 } from './SpecDataSet'


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

const rows2 = new Array();

export default function ProgramDetail() {
    let params = useParams();
    rows2.length = 0;
    for (var i = 0; i < data1.length; i++) {
        if (data1[i].id == params.id) {
            rows2.push(createData2(data1[i].College, data1[i].gpa, data1[i].uni, data1[i].comment, data1[i].uniprog, data1[i].ccprog));
        }
    }

    return (
        <div>
            <h1>___</h1>
            <h1> {rows2[0].uni}, {rows2[0].uniprog} non-JUPAS Admission Statistics</h1>
            <ResponsiveContainer width="100%" aspect={6}>
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
                    <ZAxis type="category" dataKey="ccprog" range={[100, 100]} name="CC Program" />
                    <Tooltip labelFormatter={() => ""} />
                    <CartesianGrid strokeDasharray="3 3" />

                    <Scatter name={rows2[0].uni} data={rows2} fill={"orange"} fillOpacity={0.5} >
                    </Scatter>


                </ScatterChart>
            </ResponsiveContainer>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width='1%' size='small'> <b>CC</b> </TableCell>
                            <TableCell width='1%' align="left"  > <b>cGPA</b></TableCell>
                            <TableCell width='15%' align="left" > <b>CC Programme</b> </TableCell>
                            <TableCell align="left"> <b>Comment</b> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row) => (
                            <TableRow
                                key={row.College}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" size={'small'}>
                                    {row.College}
                                </TableCell>
                                <TableCell align="left" size={'small'}>{row.gpa}</TableCell>
                                <TableCell align="left" size={'small'}>{row.ccprog}</TableCell>
                                <TableCell align="left">{row.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}