import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Button, FormGroup, Label, Input} from 'reactstrap';
import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'

import chain_url from '../burrow/ChainServer'

/*
  "Create" component
  @description Page component that allows creating a new product
*/
class Create extends Component {

    constructor(props) {
        super(props);

        // initialize the component's state
        this.state = {
            url: chain_url,
            name: '',
            description: '',
            location: '',
            dataSource: null,
            ProductID: '',
            buttonDisabled: false,
        };
    }

    componentDidMount() {
        fetch('/data.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    haveRightId: true,
                    dataSource: responseJson,
                    ProductID: responseJson.ProductID
                })
            })
            .catch((error) => {
                console.error(error);
            })
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
                                <Input placeholder="Product name" value={this.state.name} onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input placeholder="Product description" value={this.state.description}
                                       onChange={(e) => {
                                           this.setState({description: e.target.value})
                                       }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Current location</Label>
                                <Input placeholder="Product location" value={this.state.location}
                                       onChange={(e) => {
                                           this.setState({location: e.target.value})
                                       }}/>
                            </FormGroup>

                            <Button disabled={this.state.buttonDisabled} color="primary"
                                    onClick={this.handleCreateNewProduct}>Create product</Button>
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
