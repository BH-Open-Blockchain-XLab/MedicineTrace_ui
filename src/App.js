import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import Notifications from 'react-notify-toast'


import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Container,
    NavbarToggler,
} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const bodyColor = "hsl(136.7, 25%, 96.1%)";

        const appJSX = (
            <div style={{
                minHeight: "100vh",
                borderTop: "4px solid #50b796",
                backgroundColor: "black",
                fontFamily: "Barlow"
            }}>
                <Notifications/>
                <Navbar color="faded" light
                        style={{paddingTop: "1em", paddingBottom: "2em", backgroundColor: bodyColor}} expand="md">
                    <Container>
                        <Link to='/'><img alt="Logo Trace" style={{width: "150px", marginRight: "25px"}}
                                          src="/logo-black.svg"   /></Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/account">
                                        My account
                                        <img alt="Profile avatar" src={require('./pic/truth.png')} style={{
                                            marginLeft: "10px",
                                            width: "25px",
                                            height: "25px",
                                            borderRadius: "3px"
                                        }}/>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <div style={{backgroundColor: bodyColor, paddingBottom: "3em"}}>
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
                <div style={{padding: "2em 0", color: "white", backgroundColor: "#000000"}}>
                    <Container>
                        © Medicine Trace
                    </Container>
                </div>
            </div>
        );

        return (
            <div>
                {appJSX}
            </div>
        );
    }
}

export default withRouter(App);
