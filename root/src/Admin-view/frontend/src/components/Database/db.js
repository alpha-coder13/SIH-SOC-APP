import React, { Component } from 'react';
import { Container, TextField, IconButton, InputAdornment, Grid, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import axios from 'axios'; 
import { LoadingContext } from '../../Context/LoadingContext';


export default class DataBase extends Component {
    static contextType = LoadingContext;
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    Id: 1,
                    name: "Anubhav",
                    reg_no: "201945646",
                    batch: "CSE",
                    mac_addr: "",
                    block_stat: false,
                    reason: "null"
                },
                {
                    Id: 2,
                    name: "Rishav",
                    reg_no: "201945647",
                    batch: "ECE",
                    mac_addr: "",
                    block_stat: true,
                    reason: "Due to VPN/Proxy"
                },
                {
                    Id: 3,
                    name: "Rohan",
                    reg_no: "201945652",
                    batch: "CSE",
                    mac_addr: "",
                    block_stat: false,
                    reason: "null"
                },
                {
                    Id: 4,
                    name: "Raj",
                    reg_no: "201945660",
                    batch: "CSE",
                    mac_addr: "",
                    block_stat: true,
                    reason: "Due to text moderation"
                }
            ]
        }
    }
    
    render() {

        return (
            <TableContainer component={Paper}>  
            <Table stickyHeader  aria-label="sticky table">  
              <TableHead>  
                <TableRow>  
                  <TableCell>Id</TableCell>  
                  <TableCell align="right">Name</TableCell>  
                  <TableCell align="right">Registration Number</TableCell>  
                  <TableCell align="right">Batch</TableCell>  
                  <TableCell align="right">Mac Address Hash</TableCell>  
                  <TableCell align="right">Block Status</TableCell>  
                  <TableCell align="right">Reason of Block</TableCell>  
                </TableRow>  
              </TableHead>  
              
              <TableBody>  
                { 
                  this.state.data.map((p, index) => {  
                    return <TableRow key={index}>  
                      <TableCell component="th" scope="row">  
                        {p.Id}  
                      </TableCell>  
                      <TableCell align="right">{p.name}</TableCell>  
                      <TableCell align="right">{p.reg_no}</TableCell>  
                      <TableCell align="right">{p.batch}</TableCell>  
                      <TableCell align="right">{p.mac_addr}</TableCell>  
                      <TableCell align="right">{p.block_stat? "Yes" : "No"}</TableCell>  
                      <TableCell align="right">{p.reason}</TableCell>  
                    </TableRow>  
                  }) 
                }  
              </TableBody>  
        </Table>  
    </TableContainer>  
    
    
        );
    }


}