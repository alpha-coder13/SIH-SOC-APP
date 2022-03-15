import React, { Component } from 'react';
import { LoadingContext } from "../../Context/LoadingContext"
import { Grid, Typography, Button, TextField, InputAdornment, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { CloudUploadRounded as UploadIcon, PrintRounded as PrintIcon } from "@material-ui/icons";
import axios from 'axios';
export default class BatchProcess extends Component {
    static contextType = LoadingContext
    constructor(props) {
        super(props);
        this.state = {
            ipFile: "",
            result: [],
        }
    }

    handleSubmit = async () => {
        const formData = new FormData()
        formData.append('ipFile', this.state.ipFile);
        this.context.showSpinner();
        try {
            const response = await axios.post('/api/batchprocess/processfile', formData, { validateStatus: () => true });
            const { data, status } = response;
            this.context.hideSpinner();
            if (status !== 200) {
                this.context.showSnackBar(data.msg);
                return;
            }
            this.setState({ result: data });
            this.context.showSnackBar("File has been processed");
        }
        catch (error) {
            console.log(error);
            this.context.hideSpinner();
            this.context.showSnackBar("Some error occured");
        }
    }

    handleInputChange = (event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.files[0]
        });
        console.log(event.target.files[0]);
    });


    printDiv = function (divName) {
        let currentTime = new Date();
        let timeStamp = Date.now()
        window.$('#' + divName).printThis({
            importCSS: true,
            importStyle: true,
            header: `<b>Report</b>- Generated by CodeHashiras IP Forensic app<br><span>Date: ${currentTime.toDateString()} ${currentTime.toTimeString()} </span>&nbsp;&nbsp;<span class="ml-auto">Timestamp:${timeStamp}</span>`,
        });
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} className="text-center">
                    <input

                        style={{ display: "none" }}
                        id="contained-button-file"
                        name="ipFile"
                        onChange={this.handleInputChange}
                        type="file"
                    />
                    <TextField value={this.state.ipFile.name} variant="outlined" placeholder="Click on upload" disabled
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <label htmlFor="contained-button-file">
                                        <Button variant="outlined" startIcon={<UploadIcon />} color="primary" component="span">
                                            Upload
                                        </Button>
                                    </label>
                                </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} className="text-center">
                    <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>Process</Button>
                    <Button size="large" className="ml-5" startIcon={<PrintIcon />} variant="contained" onClick={this.printDiv.bind(this, 'printarea')}>Print Report</Button>

                </Grid>
                <Grid item xs={12} id="printarea">
                    <TableContainer component={Paper}>
                        <Table aria-lable="batch-processed-info">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ip Address</TableCell>
                                    <TableCell>Bad</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Organisation</TableCell>
                                    <TableCell>NetRange</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.result.map((whois, index) => (
                                    <TableRow>
                                        <TableCell>{whois.inputIp}</TableCell>
                                        <TableCell>{whois.isBad}</TableCell>
                                        <TableCell>{whois.country}</TableCell>
                                        <TableCell>{whois.orgName}</TableCell>
                                        <TableCell>{whois.inetnum ? whois.inetnum : whois.netRange}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}