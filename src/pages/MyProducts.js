import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faGroup from '@fortawesome/fontawesome-free-solid/faObjectGroup'

import AnnotatedSection from '../components/AnnotatedSection'
import Search from '../components/Search';

class MyProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    render() {
        const products = this.state.products.map((product, index) => {
            return (
                <Link key={index} to={`/products/${product.id}`}>
                    <div key={index}>
                        <b>{product.name || "Untitled product"}</b> &mdash; {product.description || "No description"}
                        <hr/>
                    </div>
                </Link>
            )
        });

        return (
            <div>
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faSearch}/>
                            View a product
                        </div>
                    }
                    panelContent={
                        <div>
                            <Search/>
                        </div>
                    }
                />
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faList}/>
                            My products
                            <Link style={{marginLeft: "10px"}} to="/create">Create +</Link>
                        </div>
                    }
                    panelContent={
                        <div>
                            {products && products.length > 0 ? products :
                                <div>
                                    You did not create a product yet.
                                    <Link style={{marginLeft: "10px"}} to="/create">Create a product</Link>
                                </div>}
                        </div>
                    }
                />
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faGroup}/>
                            Combine products
                        </div>
                    }
                    panelContent={
                        <div>
                            <div>
                                <Link style={{marginLeft: "10px"}} to="/products/view">List mode</Link>
                            </div>
                            <div>
                                <Link style={{marginLeft: "10px"}} to="/">QR scan mode</Link>
                            </div>
                        </div>
                    }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productIdToView : state.reducer.productIdToView
    };
}

export default connect(mapStateToProps)(MyProducts);
