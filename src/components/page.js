import React, { Component } from "react";

class Page extends Component {
    page_clicked = e =>{
        e.preventDefault()
        this.props.get_page_data(parseInt(e.target.id))
    }
    render() {

        return <li className="page-item"  id={this.props.page} onClick={ this.page_clicked}><a className="page-link" id={this.props.page} href="#" onClick={ this.page_clicked}>{this.props.page}</a></li>
    }
}

export default Page;
