import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Button, FormGroup, Label, Input, Table} from 'reactstrap';
import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'

import chain_url from '../burrow/ChainServer'
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";

import sha256 from 'js-sha256';

import * as MainAction from "../reducers/mainActions";

/*
  "Create" component
  @description Page component that allows creating a new product
*/

const sourceStruct = {
    "ProductID": "",
    "fProduction": {
        "Batch": "",
        "Workshop": "",
        "Time": "1970-01-01",
        "Detail": ""
    },
    "fDrug": {
        "ID": "",
        "License": "",
        "Name": "",
        "Detail": ""
    },
    "fInspection": {
        "Type": "",
        "InspectionID": "",
        "InspectionTime": "1970-01-01",
        "InspectionResult": "",
        "InspectionDetail": ""
    },
    "fPhaFactory": [
        {
            "TYPE": "",
            "Name": "",
            "ProLicense": "",
            "ProApprovalNum": "",
            "Detail": "",
            "fEnDepotMsg": {
                "InChargeID": "1",
                "Batch": "1",
                "Time": "1",
                "Detail": "1"
            },
            "fExDepotMsg": {
                "InChargeID": "",
                "Batch": "",
                "Time": "",
                "Detail": ""
            }
        }
    ]
};

const exampleStruct = {
    "ProductID": "0x921749847498328473298477428921",
    "fProduction": {
        "Batch": "201812060332",
        "Workshop": "B76",
        "Time": "2018-12-06",
        "Detail": "无故障发生，巡视员编号B7603"
    },
    "fDrug": {
        "ID": "201672459982fe7",
        "License": "鲁20140463",
        "Name": "999牌感冒灵",
        "Detail": "西药，非处方药"
    },
    "fInspection": {
        "Type": "Excellent",
        "InspectionID": "20181210AE76",
        "InspectionTime": "2018-12-10",
        "InspectionResult": "合格100%",
        "InspectionDetail": "药品质量严打周"
    },
    "fPhaFactory": [
        {
            "TYPE": "生产公司",
            "Name": "山东鲁能第一制药有限公司",
            "ProLicense": "450102200023278",
            "ProApprovalNum": "48893989128",
            "Detail": "山东省济南市历下区经十路27号,建成于2010年",
            "fEnDepotMsg": {
                "InChargeID": "",
                "Batch": "",
                "Time": "",
                "Detail": ""
            },
            "fExDepotMsg": {
                "InChargeID": "",
                "Batch": "",
                "Time": "",
                "Detail": ""
            }
        }
    ]
};

class Create extends Component {
    constructor(props) {
        super(props);

        // initialize the component's state
        this.state = {
            url: chain_url,
            dataSource: JSON.stringify(sourceStruct),
            ProductID: '',
            fProduction: Object.assign({}, sourceStruct.fProduction),
            fDrug: Object.assign({}, sourceStruct.fDrug),
            fPhaFactory: Object.assign({}, sourceStruct.fPhaFactory),
            fInspection: Object.assign({}, sourceStruct.fInspection),
            createButtonDisabled: false,
            companyInfo: ''
        };
    }

    componentDidMount() {
        this.setState({
            companyInfo: this.props.accountInformation,
        });
        if (this.props.accountInformation === '') {
            this.setState({
                createButtonDisabled: true
            });
        }
    }

    postProduct() {
        let data = {id: JSON.parse(this.state.dataSource).ProductID, data: this.state.dataSource};
        let postdata = {value: JSON.stringify(data)};

        fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postdata)
        }).then(
            (response) => {
                //console.log(response.json());
            }
        ).catch((err) => console.log("Fetch error: " + err));
    }

    handleCreateNewProduct = () => {
        let data = {};

        data.fDrug = this.state.fDrug;
        data.fProduction = this.state.fProduction;
        data.fInspection = this.state.fInspection;

        data.fPhaFactory = [];
        data.fPhaFactory.push(sourceStruct.fPhaFactory[0]);
        data.fPhaFactory[0].TYPE = this.state.companyInfo.TYPE;
        data.fPhaFactory[0].Name = this.state.companyInfo.Name;
        data.fPhaFactory[0].ProLicense = this.state.companyInfo.ProLicense;
        data.fPhaFactory[0].ProApprovalNum = this.state.companyInfo.ProApprovalNum;
        data.fPhaFactory[0].Detail = this.state.companyInfo.Detail;

        data.ProductID = '0x' + sha256(JSON.stringify(data)).substring(0,32);

        console.log("ID: ", data.ProductID);
        this.props.dispatch(MainAction.UpdateHistory(data.ProductID));

        this.setState({
            ProductID: data.ProductID,
            dataSource: JSON.stringify(data)
        },() => {
            this.postProduct();
            this.props.history.replace('/');
        });
    };

    setExampleProduct = () => {
        this.setState({
            fProduction: exampleStruct.fProduction,
            fDrug: exampleStruct.fDrug,
            fPhaFactory: exampleStruct.fPhaFactory,
            fInspection: exampleStruct.fInspection,
        });
    };


    render() {
        const companyTable = (
            <div>
                <Table>
                    <tbody>
                    <tr>
                        <th scope="row">Type</th>
                        <td>{this.state.companyInfo.TYPE}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{this.state.companyInfo.Name}</td>
                    </tr>
                    <tr>
                        <th scope="row">LicenseNum</th>
                        <td>{this.state.companyInfo.ProLicense}</td>
                    </tr>
                    <tr>
                        <th scope="row">ApprovalNum</th>
                        <td>{this.state.companyInfo.ProApprovalNum}</td>
                    </tr>
                    <tr>
                        <th scope="row">Detail</th>
                        <td>{this.state.companyInfo.Detail}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );

        const fDrugPage = (
            <AnnotatedSection
                annotationContent={
                    <div>
                        <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faStar}/>
                        Drug information
                    </div>
                }
                panelContent={
                    <div>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input placeholder="Drug name" value={this.state.fDrug.Name} onChange={(e) => {
                                let data = Object.assign({}, this.state.fDrug, {Name: e.target.value});
                                this.setState({
                                    fDrug: data
                                });
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>ID</Label>
                            <Input placeholder="Product id" value={this.state.fDrug.ID}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fDrug, {ID: e.target.value});
                                       this.setState({
                                           fDrug: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>License</Label>
                            <Input placeholder="Product license" value={this.state.fDrug.License}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fDrug, {License: e.target.value});
                                       this.setState({
                                           fDrug: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Detail</Label>
                            <Input placeholder="Product detail" value={this.state.fDrug.Detail}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fDrug, {Detail: e.target.value});
                                       this.setState({
                                           fDrug: data
                                       });
                                   }}/>
                        </FormGroup>
                    </div>
                }
            />
        );

        const fProductionPage = (
            <AnnotatedSection
                annotationContent={
                    <div>
                        <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faStar}/>
                        Product information
                    </div>
                }
                panelContent={
                    <div>
                        <FormGroup>
                            <Label>Batch</Label>
                            <Input placeholder="Production Batch" value={this.state.fProduction.Batch}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fProduction, {Batch: e.target.value});
                                       this.setState({
                                           fProduction: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Workshop</Label>
                            <Input placeholder="Product Workshop" value={this.state.fProduction.Workshop}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fProduction, {Workshop: e.target.value});
                                       this.setState({
                                           fProduction: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="Product Time"
                                   value={this.state.fProduction.Time}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fProduction, {Time: e.target.value});
                                       this.setState({
                                           fProduction: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Detail</Label>
                            <Input placeholder="Product detail" value={this.state.fProduction.Detail}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fProduction, {Detail: e.target.value});
                                       this.setState({
                                           fProduction: data
                                       });
                                   }}/>
                        </FormGroup>
                    </div>
                }
            />
        );

        const fInspectionPage = (
            <AnnotatedSection
                annotationContent={
                    <div>
                        <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faStar}/>
                        Quality Inspection
                    </div>
                }
                panelContent={
                    <div>
                        <FormGroup>
                            <Label>Inspection Type</Label>
                            <Input type="select" name="select" id="exampleSelect" value={this.state.fInspection.Type}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fInspection, {Type: e.target.value});
                                       this.setState({
                                           fInspection: data
                                       });
                                   }}>
                                <option value="Excellent">Excellent (More than 90%)</option>
                                <option value="Good">Good (70% to 90%)</option>
                                <option value="Moderate">Moderate (50% to 70%)</option>
                                <option value="Poor">Poor (30% to 50%)</option>
                                <option value="Fail">Fail (Less than 30%)</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Inspection ID</Label>
                            <Input placeholder="Inspection ID" value={this.state.fInspection.InspectionID}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fInspection, {InspectionID: e.target.value});
                                       this.setState({
                                           fInspection: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Inspection time</Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="Time"
                                   value={this.state.fInspection.InspectionTime}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fInspection, {InspectionTime: e.target.value});
                                       this.setState({
                                           fInspection: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Inspection Result</Label>
                            <Input placeholder="Result" value={this.state.fInspection.InspectionResult}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fInspection, {InspectionResult: e.target.value});
                                       this.setState({
                                           fInspection: data
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Inspection Detail</Label>
                            <Input placeholder="Detail" value={this.state.fInspection.InspectionDetail}
                                   onChange={(e) => {
                                       let data = Object.assign({}, this.state.fInspection, {InspectionDetail: e.target.value});
                                       this.setState({
                                           fInspection: data
                                       });
                                   }}/>
                        </FormGroup>
                    </div>
                }
            />
        );

        return (
            <div>
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faUser}/>
                            Company information
                        </div>
                    }
                    panelContent={
                        this.state.companyInfo ? companyTable :
                            <div>
                                Fail to load your info. Please set your info at{" "}
                                <Link to={"/account"}>here</Link>
                                {" "}, or back to {" "}
                                <Link to={"/"}>the main page</Link>
                                .
                            </div>
                    }
                />

                {fDrugPage}

                {fProductionPage}

                {fInspectionPage}

                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faWrench}/>
                            Actions
                        </div>
                    }
                    panelContent={
                        <div>
                            {this.state.createButtonDisabled ? <div>You need to set your account info.</div> : true}
                            <Button disabled={this.state.createButtonDisabled} color="primary"
                                    onClick={this.handleCreateNewProduct}>Create product</Button>

                            <Button color="warning" style={{marginLeft: "10px"}} onClick={this.setExampleProduct}>
                                Set an example
                            </Button>
                        </div>
                    }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accountInformation: state.reducer.accountInformation,
        productIdToView: state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(Create);
