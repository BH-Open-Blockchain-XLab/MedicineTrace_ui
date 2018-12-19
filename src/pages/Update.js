import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faArrowAltCircleUp from '@fortawesome/fontawesome-free-solid/faArrowAltCircleUp'
import faList from "@fortawesome/fontawesome-free-solid/faList";

import {
    Button,
    FormGroup,
    Label,
    Input,
    Table,
    Progress,
} from 'reactstrap';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateButtonDisabled: true,
            companyInfo: '',
            name: '',
            date: new Date().toLocaleDateString(),
            description: '',
            progress: 0
        };
    }

    componentDidMount() {
        // shorthand to get the route parameters
        this.params = this.props.match.params;
        this.setState({
            companyInfo: this.props.accountInformation,
            updateButtonDisabled: (this.props.accountInformation === ''),
            date: Update.setDate()
        });


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

    handleUpdateProduct = () => {
        this.props.history.replace('/products/' + this.params.productId);
    };


    render() {
        const companyTable = (
            <div>
                <Table>
                    <tbody>
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
                            <Progress animated color="info" value={this.state.progress} />
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
                                <Label for="exampleDate">Date</Label>
                                <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" value={this.state.date}
                                       onChange={(e) => {
                                           this.setState({date: e.target.value});
                                       }}/>
                            </FormGroup>
                            <Button disabled={this.state.updateButtonDisabled} color="primary"
                                    onClick={this.handleUpdateProduct}
                            >Update</Button>
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
