import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Button, FormGroup, Label, Input} from 'reactstrap';
import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'



/*
  "Create" component
  @description Page component that allows creating a new product
*/
class Create extends Component {

    constructor(props) {
        super(props);

        // initialize the component's state
        this.state = {
            name: '',
            description: '',
            location: '',
            dataSource: null,
            buttonDisabled: false,
        };
    }

    fetchProduct() {
        fetch('/data.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }


    handleCreateNewProduct = () => {
        this.fetchProduct();
        this.props.ourBurrowChain.setNewValue("0x921749847498328473298477428921",this.state.dataSource);
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
        productIdToView : state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(Create);
