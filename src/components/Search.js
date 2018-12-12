import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Button
} from 'reactstrap';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productIdToView: ""
        };
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <Label>Product identifier</Label>
                    <InputGroup>
                        <Input placeholder="Product id ..." value={this.state.productIdToView} onChange={(e) => {
                            this.setState({productIdToView: e.target.value})
                        }}/>
                        <InputGroupAddon addonType="append">
                            <Link to={"/products/" + this.state.productIdToView}><Button
                                style={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}
                                color="primary"
                                onClick={() => this.props.updateSearchId(this.state.productIdToView)}>Search</Button></Link>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }
}


export default Search;

