import React, { Component } from "react";
import Page from "./page";

class DPagination extends Component {
    //  
    render() {
        // alert('jo')
        console.log(this.props)

        return (<nav aria-label="Page navigation example">
            <ul className="pagination">
                {this.props.pages.map((page) => {
                    return <Page get_page_data={this.props.get_page_data} page={page} />
                })}

            </ul>

        </nav>

        )
    }
}

export default DPagination;
