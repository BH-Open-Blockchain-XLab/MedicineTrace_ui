import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Button, FormGroup, Label, Input} from 'reactstrap';
import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'

import chain_url from '../burrow/ChainServer'
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";

/*
  "Create" component
  @description Page component that allows creating a new product
*/

const sourceStruct = {
    "ProductID": "",
    "fProduction": {
        "Batch": "",
        "Workshop": "",
        "Time": "",
        "Detail": ""
    },
    "fDrug": {
        "ID": "",
        "License": "",
        "Name": "",
        "Detail": ""
    },
    "fInspection": {
        "state": "",
        "InspectionID": "",
        "InspectionTime": "",
        "InspectionResult": "",
        "InspectionDetail": ""
    },
    "fPhaFactory": []
};

const exampleStruct = {
    "ProductID": "0x921749847498328473298477428921",
    "fProduction": {
        "Batch": "201812060332",
        "Workshop": "B76",
        "Time": "20181206-15-09-32",
        "Detail": "无故障发生，巡视员编号B7603"
    },
    "fDrug": {
        "ID": "201672459982fe7",
        "License": "鲁20140463",
        "Name": "999牌感冒灵",
        "Detail": "西药，非处方药"
    },
    "fInspection": {
        "state": "Great",
        "InspectionID": "20181210AE76",
        "InspectionTime": "20181210-08-33-27",
        "InspectionResult": "合格100%",
        "InspectionDetail": "药品质量严打周"
    },
    "fPhaFactory": []
};

class Create extends Component {
    constructor(props) {
        super(props);

        // initialize the component's state
        this.state = {
            url: chain_url,
            dataSource: sourceStruct,
            ProductID: '',
            fProduction: sourceStruct.fProduction,
            fDrug: sourceStruct.fDrug,
            fPhaFactory: sourceStruct.fPhaFactory,
            fInspection: sourceStruct.fInspection,
            buttonDisabled: false,
        };
    }

    componentDidMount() {
        // fetch('/data.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             haveRightId: true,
        //             dataSource: responseJson,
        //             ProductID: responseJson.ProductID
        //         })
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
    }

    fetchProduct() {
        console.log(this.state.dataSource);

        let data = {id: this.state.dataSource.ProductID, data: JSON.stringify(this.state.dataSource)};
        let postdata = {value: JSON.stringify(data)};

        fetch(this.state.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postdata)
        }).then(
            (response) => {
                console.log(response.json());
            }
        ).catch((err) => console.log("Fetch error: " + err));

    }


    handleCreateNewProduct = () => {
        this.fetchProduct();
        this.props.history.replace('/');
    };

    setExampleProduct = () => {
        this.setState({
            dataSource: exampleStruct,
            ProductID: exampleStruct.ProductID,
            fProduction: exampleStruct.fProduction,
            fDrug: exampleStruct.fDrug,
            fPhaFactory: exampleStruct.fPhaFactory,
            fInspection: exampleStruct.fInspection,
        });
    };


    render() {

        return (
            <div>
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
                            <Button disabled={this.state.buttonDisabled} color="primary"
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
        ourBurrowChain: state.reducer.ourBurrowChain,
        productIdToView: state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(Create);
