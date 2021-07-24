import React, { Component } from "react";

class Tags extends Component {
    render() {
        // alert('jo')

        return (
            <div>
                {this.props.tags.map((tag) => {

                    return <button type="button" class="btn btn-primary position-relative m-1">
                        {this.props.display?tag.name:tag}
                  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                    </button> 

                })}


            </div>

        )
    }
}

export default Tags;
