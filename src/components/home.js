import React, { Component } from "react";
import DPagination from "./pagination";
import Post from "./post";

class Home extends Component {
    render() {

        return (<div className='mt-4'>

            {this.props.posts.map((post) => {
                return <Post {...this.props} images={post.image} tags={post.tags} identifier={post.id} />
            }
            )}

            <div className='row mt-4'>
                <DPagination get_page_data={this.props.get_page_data} state={this.props.state} pages={this.props.pages} current_page={this.props.current_page} />
            </div>


        </div>

        )
    }
}

export default Home;
