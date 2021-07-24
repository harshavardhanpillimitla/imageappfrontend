import React, { Component } from "react";
import Carousel from "./carousel";
import Tags from "./tags";

class Post extends Component {
    postdetail = () => {
        if (!this.props.match.params.id) {
            let url_param = "/post/" + this.props.identifier;
            this.props.history.replace(url_param);
        }

    }
    render() {

        let intial = 1;
        let id_carousel = 'carouselExampleControls' + this.props.identifier;
        let href_id = '#carouselExampleControls' + this.props.identifier;
        return (
            <div className="m-4" id={this.props.identifier} onClick={this.postdetail}>
                <Tags tags={this.props.tags} display={"true"} />
                <div id={id_carousel} class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        {this.props.images.map((image) => {
                            let class_name = intial === 1 ? 'carousel-item  active' : 'carousel-item ';
                            intial += 1;
                            return this.props.rotation ? <Carousel id={image.id} rotation={this.props.rotation} rotate_image={this.props.rotate_image} active={class_name} image={image.image_url} />: <Carousel id={image.id} active={class_name} image={image.image_url} />

                        })}
                        <a class="carousel-control-prev" href={href_id} role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href={href_id} role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>

        )
    }
}

export default Post;
