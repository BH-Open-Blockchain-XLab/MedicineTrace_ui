import React, {Component} from 'react'
import {connect} from 'react-redux';//通讯班，传递state
import QRCode from 'qrcode.react'//生成二维码
import {Link} from 'react-router-dom'//跳转路由

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'
import faThumbtack from '@fortawesome/fontawesome-free-solid/faThumbtack'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'

import AnnotatedSection from '../components/AnnotatedSection'
import * as MainAction from '../reducers/mainActions'

import {
    Button,
    Table,
    Row
} from 'reactstrap';

/*
  View component
  @description Page component that displays a product's information.
*/

class View extends Component {

    constructor(props) {
        super(props);

        // product information definition921749847498328473298477428921//无故障发生，巡视员编号
        this.state = {
            haveRightId: false,
            dataSource: null,
            ProductID: "",
            fProduction: "",
            fDrug: "",
            fPhaFactory: "",
            fInspection: "",
            fEnDepotMsg: "",
            fExDepotMsg: "",
            fDepot: "",
            fSale: ""
        };
    };


    componentDidMount() {
        this.fetchProduct();
        this.props.dispatch(MainAction.PutInId(this.props.match.params.productId));
    }

    fetchProduct() {
        fetch('/data.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    haveRightId: true,
                    dataSource: responseJson,
                    ProductID: responseJson.ProductID,
                    fProduction: responseJson.fProduction,
                    fDrug: responseJson.fDrug,
                    fPhaFactory: responseJson.fPhaFactory,
                    fInspection: responseJson.fInspection,
                    fEnDepotMsg: responseJson.fEnDepotMsg,
                    fExDepotMsg: responseJson.fExDepotMsg,
                    fDepot: responseJson.fDepot,
                    fSale: responseJson.fSale
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        const customData = this.state.customDataJson ? JSON.parse(this.state.customDataJson) : {};

        const viewPage = (
            <div>
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faThumbtack}/>
                            药品ID
                        </div>
                    }
                    panelContent={
                        <Row style={{marginLeft: "10px"}}>
                            {this.state.ProductID==="" ? <div /> :
                                <QRCode style={{marginRight: "50px"}} value={this.state.ProductID}/>}
                            <div>
                                Unique product identifier
                                <pre>{this.state.ProductID}</pre>
                            </div>
                        </Row>
                    }
                />

                {/* Product definition section 生产信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            生产信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">Batch</th>
                                <td>{this.state.fProduction.Batch}</td>
                            </tr>
                            <tr>
                                <th scope="row">Workshop</th>
                                <td>{this.state.fProduction.Workshop}</td>
                            </tr>
                            <tr>
                                <th scope="row">Time</th>
                                <td>{this.state.fProduction.Time}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fProduction.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 药品信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            药品信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{this.state.fDrug.ID}</td>
                            </tr>
                            <tr>
                                <th scope="row">License</th>
                                <td>{this.state.fDrug.License}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{this.state.fDrug.Name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fDrug.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 药厂信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            药厂信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td><Link to="/">{this.state.fPhaFactory.Name}</Link></td>
                            </tr>
                            <tr>
                                <th scope="row">ProLicense</th>
                                <td>{this.state.fPhaFactory.ProLicense}</td>
                            </tr>
                            <tr>
                                <th scope="row">ProApprovalNum</th>
                                <td>{this.state.fPhaFactory.ProApprovalNum}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fPhaFactory.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 质检信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            质检信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">InspectionID</th>
                                <td>{this.state.fInspection.InspectionID}</td>
                            </tr>
                            <tr>
                                <th scope="row">InspectionTime</th>
                                <td>{this.state.fInspection.InspectionTime}</td>
                            </tr>
                            <tr>
                                <th scope="row">InspectionResult</th>
                                <td>{this.state.fInspection.InspectionResult}</td>
                            </tr>
                            <tr>
                                <th scope="row">InspectionDetail</th>
                                <td>{this.state.fInspection.InspectionDetail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 入库信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            入库信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">InChargeID</th>
                                <td>{this.state.fEnDepotMsg.InChargeID}</td>
                            </tr>
                            <tr>
                                <th scope="row">Batch</th>
                                <td>{this.state.fEnDepotMsg.Batch}</td>
                            </tr>
                            <tr>
                                <th scope="row">FromLink</th>
                                <td>{this.state.fEnDepotMsg.FromLink}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fEnDepotMsg.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 出库信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            出库信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">InChargeID</th>
                                <td>{this.state.fExDepotMsg.InChargeID}</td>
                            </tr>
                            <tr>
                                <th scope="row">Batch</th>
                                <td>{this.state.fExDepotMsg.Batch}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fExDepotMsg.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 仓库信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            仓库信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{this.state.fDepot.ID}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{this.state.fDepot.Name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fDepot.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }
                />
                {/* 销售信息*/}
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faInfoCircle}/>
                            销售信息
                        </div>
                    }
                    panelContent={
                        <Table>
                            <tbody>
                            <tr>
                                <th scope="row">InChargeID</th>
                                <td>{this.state.fSale.InChargeID}</td>
                            </tr>
                            <tr>
                                <th scope="row">Batch</th>
                                <td>{this.state.fSale.Batch}</td>
                            </tr>
                            <tr>
                                <th scope="row">Time</th>
                                <td>{this.state.fSale.Time}</td>
                            </tr>
                            <tr>
                                <th scope="row">License</th>
                                <td>{this.state.fSale.License}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detail</th>
                                <td>{this.state.fSale.Detail}</td>
                            </tr>
                            {
                                Object.keys(customData).map(key =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{customData[key]}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
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
                            <Link style={{marginLeft: "10px"}} to={"/products/"+ this.state.ProductID +"/update"}>
                                <Button color="success">
                                    Update product
                                </Button>
                            </Link>
                            <Link style={{marginLeft: "10px"}}
                                  to={"/products/" + this.state.productID}>
                                <Button color="warning">
                                    See more details
                                </Button>
                            </Link>
                        </div>
                    }
                />
            </div>
        );
        const waiting = (
            <div style={{
                textAlign: "center",
                padding: "1em"
            }}>
                Loading...
            </div>
        );

        return (
            <div>
                {this.state.haveRightId ? viewPage : waiting}
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        productIdToView : state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(View);