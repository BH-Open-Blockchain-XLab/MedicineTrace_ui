import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Button, FormGroup, Label, Input} from 'reactstrap';
import AnnotatedSection from '../components/AnnotatedSection'
import PlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-places-autocomplete'
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
            latitude: '',
            longitude: '',
            address: '',
            availableCertifications: [],
            selectedCertifications: {},
            customDataInputs: {},
            selectedCategories: {},
            buttonDisabled: false,
            //ebayCategoryMap: ebayCategoryMap
        };
        this.onChange = (address) => this.setState({address})
    }


    handleCreateNewProduct = () => {
        this.props.history.replace('/');
    };


    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: "Location (exact address, latitude & longitude, business)"
        };

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
                                <Input placeholder="Product location" value={this.state.latitude}
                                       onChange={(e) => {
                                           this.setState({description: e.target.value})
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

// function mapStateToProps(state) {
//     return {
//         passageInstance: state.reducer.passageInstance,
//         web3Accounts: state.reducer.web3Accounts
//     };
// }

//export default connect(mapStateToProps)(Create);
export default Create;