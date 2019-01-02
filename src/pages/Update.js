import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faArrowAltCircleUp from '@fortawesome/fontawesome-free-solid/faArrowAltCircleUp'
import faList from "@fortawesome/fontawesome-free-solid/faList";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";

import {
    Button,
    FormGroup,
    Label,
    Input,
    Table,
} from 'reactstrap';
import chain_url from "../burrow/ChainServer";


class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: chain_url,
            updateButtonDisabled: true,
            companyInfo: '',

            companyState: 'in',
            changeID: '',
            batch: '',
            date: new Date().toLocaleDateString(),
            description: '',

            haveRightId: false,
            checkUpdate: true,
            dataSource: null,
            WrongInfo: ''
        };
    }

    componentDidMount() {
        this.params = this.props.match.params;
        this.setState({
            companyInfo: this.props.accountInformation,
            updateButtonDisabled: (this.props.accountInformation === ''),
            date: Update.setDate(),
        }, () => {
            this.fetchProduct();
        });
    }

    fetchProduct() {
        fetch(this.state.url + '/' + this.params.productId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.raw[0] !== "") {
                    let data = JSON.parse(responseJson.raw[0]);
                    console.log(data);
                    this.setState({
                        haveRightId: true,
                        dataSource: data,
                    });
                } else {
                    this.setState({
                        updateButtonDisabled: true
                    });
                    console.log("Wrong Product ID");
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    static setDate() {
        let date = new Date();
        let nowMonth = date.getMonth() + 1;
        let strDate = date.getDate();

        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return date.getFullYear() + "-" + nowMonth + "-" + strDate;
    }

    setExampleProduct = () => {
        if (this.state.companyState === 'in') {
            this.setState({
                changeID: "E56",
                batch: "20181210E573",
                date: "2019-02-28",
                description: "非处方药,999牌感冒灵,本批次共装箱80,总3200盒"
            });
        }

        if (this.state.companyState === 'out') {
            this.setState({
                changeID: "E02",
                batch: "20190124S820",
                date: "2019-03-28",
                description: "非处方药,999牌感冒灵,本批次共装箱54,总2120盒"
            });
        }
    };

    postProduct(sourcedata) {
        let data = {id: JSON.parse(sourcedata).ProductID, data: sourcedata};
        let postdata = {value: JSON.stringify(data)};

        fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postdata)
        }).then(
            () => {
                this.setState({
                    checkUpdate: false,
                    WrongInfo: "Waiting..."
                }, () => {
                    let time = (new Date()).getTime();  //获取当前的unix时间戳
                    while ((new Date()).getTime() - time < 2000) {
                    }
                    this.props.history.replace('/products/' + this.params.productId);
                });
            }
        ).catch((err) => console.log("Fetch error: " + err));
    }

    handleUpdateProduct = () => {
        let length = this.state.dataSource.fPhaFactory.length;

        if (this.state.companyState === 'in') {
            if (this.state.dataSource.fPhaFactory[length - 1].fExDepotMsg.Batch === '') {
                this.setState({
                    checkUpdate: false,
                    WrongInfo: "This drug needs to out of the library."
                });
                return;
            }
            let data = this.state.dataSource;
            let updata = {
                TYPE: this.state.companyInfo.TYPE,
                Name: this.state.companyInfo.Name,
                ProLicense: this.state.companyInfo.ProLicense,
                ProApprovalNum: this.state.companyInfo.ProApprovalNum,
                Detail: this.state.companyInfo.Detail,
                fEnDepotMsg: {
                    "InChargeID": this.state.changeID,
                    "Batch": this.state.batch,
                    "Time": this.state.date,
                    "Detail": this.state.description
                },
                fExDepotMsg: {
                    "InChargeID": "",
                    "Batch": "",
                    "Time": "",
                    "Detail": ""
                }
            };

            data.fPhaFactory.push(updata);
            console.log(data);
            this.postProduct(JSON.stringify(data));
        }

        if (this.state.companyState === 'out') {
            console.log(this.state.dataSource.fPhaFactory[length - 1].ProLicense);
            if (this.state.dataSource.fPhaFactory[length - 1].ProLicense !== this.state.companyInfo.ProLicense || this.state.dataSource.fPhaFactory[length - 1].fExDepotMsg.Batch !== '') {
                this.setState({
                    checkUpdate: false,
                    WrongInfo: "This drug is not in your library."
                });
                return;
            }
            let data = this.state.dataSource;
            data.fPhaFactory[length - 1].fExDepotMsg.Batch = this.state.batch;
            data.fPhaFactory[length - 1].fExDepotMsg.InChargeID = this.state.changeID;
            data.fPhaFactory[length - 1].fExDepotMsg.Time = this.state.date;
            data.fPhaFactory[length - 1].fExDepotMsg.Detail = this.state.description;

            this.postProduct(JSON.stringify(data));
        }
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

        const EnterInfoSet = (
            <div>
                <FormGroup>
                    <Label>InChargeID</Label>
                    <Input placeholder="InChargeID" value={this.state.changeID} onChange={(e) => {
                        this.setState({changeID: e.target.value})
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label>Batch</Label>
                    <Input placeholder="Product Batch" value={this.state.batch}
                           onChange={(e) => {
                               this.setState({batch: e.target.value})
                           }}/>
                </FormGroup>
                <FormGroup>
                    <Label>Date</Label>
                    <Input type="date" name="date" id="exampleDate" placeholder="date placeholder"
                           value={this.state.date}
                           onChange={(e) => {
                               this.setState({date: e.target.value});
                           }}/>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input placeholder="Product description" value={this.state.description}
                           onChange={(e) => {
                               this.setState({description: e.target.value})
                           }}/>
                </FormGroup>
            </div>
        );


        return (
            <div>
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faList}/>
                            My company
                        </div>
                    }
                    panelContent={
                        this.state.companyInfo ? companyTable :
                            <div>
                                Fail to load your info. Please back to {" "}
                                <Link to={"/"}>the main page</Link>
                                .
                            </div>
                    }
                />
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faArrowAltCircleUp}/>
                            New information
                        </div>
                    }
                    panelContent={
                        <div>
                            <FormGroup>
                                <Label for="exampleSelect">Info Type</Label>
                                <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                                    this.setState({companyState: e.target.value})
                                }}>
                                    <option value="in">Enter the library</option>
                                    <option value="out">Out of the library</option>
                                </Input>
                            </FormGroup>
                            {EnterInfoSet}
                        </div>
                    }
                />
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
                            {this.state.checkUpdate ? true : <div>{this.state.WrongInfo}</div>}
                            <Button disabled={this.state.updateButtonDisabled} color="primary"
                                    onClick={this.handleUpdateProduct}
                            >Update product</Button>

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
        productIdToView: state.reducer.productIdToView,
        accountInformation: state.reducer.accountInformation
    };
}

export default connect(mapStateToProps)(Update);
