import React, {Component} from 'react'
import {connect} from 'react-redux';
import QRCode from 'qrcode.react'
import {Link} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'
import faThumbtack from '@fortawesome/fontawesome-free-solid/faThumbtack'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'

import AnnotatedSection from '../components/AnnotatedSection'
import * as MainAction from '../reducers/mainActions'

import chain_url from '../burrow/ChainServer'

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

        this.state = {
            url: chain_url,
            haveRightId: false,
            findId: true,
            dataSource: null,
            ProductID: "",
            fProduction: "",
            fDrug: "",
            fPhaFactory: [],
            fInspection: "",
        };
    };


    componentDidMount() {
        this.fetchProduct();
        this.props.dispatch(MainAction.PutInId(this.props.match.params.productId));
        if (this.state.haveRightId)
            this.props.dispatch(MainAction.PutInData(this.state.dataSource));
    }

    fetchProduct() {
        fetch(this.state.url + '/' + this.props.match.params.productId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.raw[0]);
                if (responseJson.raw[0] !== "") {
                    let data = JSON.parse(responseJson.raw[0]);
                    console.log(data);
                    this.setState({
                        haveRightId: true,
                        dataSource: data,
                        ProductID: data.ProductID,
                        fProduction: data.fProduction,
                        fDrug: data.fDrug,
                        fPhaFactory: data.fPhaFactory,
                        fInspection: data.fInspection
                    });
                } else {
                    this.setState({
                        findId: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        const customData = this.state.customDataJson ? JSON.parse(this.state.customDataJson) : {};

        const factories = this.state.fPhaFactory.map((factory, index) => {
            return (
                <AnnotatedSection key={index}
                                  annotationContent={
                                      <div>
                                          <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                                           icon={faInfoCircle}/>
                                          {factory.TYPE}
                                      </div>
                                  }
                                  panelContent={
                                      <Table>
                                          <tbody>
                                          <tr>
                                              <th scope="row">Name</th>
                                              <td><Link to="/">{factory.Name}</Link></td>
                                          </tr>
                                          <tr>
                                              <th scope="row">ProLicense</th>
                                              <td>{factory.ProLicense}</td>
                                          </tr>
                                          <tr>
                                              <th scope="row">ProApprovalNum</th>
                                              <td>{factory.ProApprovalNum}</td>
                                          </tr>
                                          <tr>
                                              <th scope="row">Detail</th>
                                              <td>{factory.Detail}</td>
                                          </tr>
                                          </tbody>
                                      </Table>
                                  }
                />
            )
        });


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
                            {this.state.ProductID === "" ? <div/> :
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
                {factories && factories.length > 0 ?
                    <div>
                        {factories}
                    </div> :
                    {}
                }

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
                            <Link style={{marginLeft: "10px"}} to={"/products/" + this.state.ProductID + "/update"}>
                                <Button color="success">
                                    Update product
                                </Button>
                            </Link>
                            <Link style={{marginLeft: "10px"}}
                                  to={"/products/" + this.state.ProductID}>
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
                {
                    this.state.findId ? "Loading..." :
                        <div>
                            Invalid Product Id. Please back to {" "}
                            <Link to="/">the main page.</Link>
                        </div>
                }

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
        productDataById: state.reducer.productDataById,
        productIdToView: state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(View);