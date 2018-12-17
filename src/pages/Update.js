import React, {Component} from 'react'
import {connect} from 'react-redux';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {Link} from 'react-router-dom'

import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faArrowAltCircleUp from '@fortawesome/fontawesome-free-solid/faArrowAltCircleUp'

import {
    Button,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

/*
  Update component
  @description Page component used to update a product's information.
*/
class Update extends Component {

    // TODO: get the product details to make sure we have the right information before showing the Update page
    // TODO: before actually updating the product, check if there is a newer version (i.e. someone else updated the product before us)
    constructor(props) {
        super(props);

        this.state = {
            latitude: '',
            longitude: '',
            address: '',
            updateButtonDisabled: false,
            customDataInputs: {}
        };

        this.onChange = (address) => this.setState({address})
    }

    componentDidMount() {
        // shorthand to get the route parameters
        this.params = this.props.match.params;
        console.log(this.props.accountInformation);
    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: "Location (exact address, latitude & longitude, business)"
        }

        return (
            <div>
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
                            <Button disabled={this.state.updateButtonDisabled} color="primary"
                                    >Créer une nouvelle version</Button>
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
