import React, { Component } from "react";
import Post from "./post";

class PostDetail extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    let post_data = this.props.posts.filter((post) => post.id === parseInt(this.props.match.params.id));
    this.state = { post: post_data };

  }

  rotate_image = (id, degree) => {
    // rotate clockwise by 90 degrees
    let image_rotated = document.getElementById(id).style.transform
    if (image_rotated === '') {
      document.getElementById(id).style.transform = 'rotate(' + degree + 'deg)';
      return ''
    }
    else {
      let prev_rot_value;
      if (document.getElementById(id).style.transform.split('rotate')[1].length === 9) {
        prev_rot_value = parseInt(document.getElementById(id).style.transform.split('rotate')[1].slice(1, 5))
      }
      else {
        prev_rot_value = parseInt(document.getElementById(id).style.transform.split('rotate')[1].slice(1, 4))

      }

      console.log(prev_rot_value)
      if (prev_rot_value === 360 || prev_rot_value === -360) {
        degree = 0;
      }
      else if (prev_rot_value > 0) {
        degree = prev_rot_value + 90;
      }
      else {
        degree = prev_rot_value - 90;
      }
      console.log(prev_rot_value, degree)
      document.getElementById(id).style.transform = 'rotate(' + degree + 'deg)';
    }




  }

  rotate = e => {
    let rotation_side = e.target.id;
    let degree = rotation_side === 'left' ? 90 : -90;
    let image_id = document.getElementsByClassName('carousel-item active')[0].lastChild.id
    this.rotate_image(image_id, degree)
  }

  save_rotation = async () => {
    let post_id = parseInt(this.props.match.params.id)
    let parent = document.getElementsByClassName('carousel-item')
    let child = this.get_child_id(parent)
    let rotated_image_dict = this.get_rotated_values(child)
    // const formData = new FormData()

    // data['files'].forEach((file, index) => {
    //   formData.append("image", file)
    // })
    // formData.append('tags', data['tags'])

    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: formData

    // })
    // response.json().then(data => {
    //   if (data.succes === true) {
    //     this.props.need_reload_home()
    //     this.props.history.replace("");
    //   }
    //   else {
    //     this.props.history.replace("/upload");
    //   }
    // })
    console.log(rotated_image_dict)
    const response = await fetch('http://127.0.0.1:8000/rotated/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rotated_image_dict)
    })
    response.json().then(data => {
      if(data.succes===true){
          this.props.need_reload_home()
          this.props.history.replace("");
      }
      })


  }
  get_child_id = (parent) => {
    let child_ids = []
    for (var i = 0; i < parent.length; i++) {
      child_ids.push(parseInt(parent[i]['firstElementChild'].id))
    }
    return child_ids;
  }
  get_rotated_values = (child_ids) => {
    let rotated_dict = {}
    child_ids.map((child) => {
      if (document.getElementById(child).style.transform !== '') {
        let prev_rot_value;
        if (document.getElementById(child).style.transform.split('rotate')[1].length === 9) {
          prev_rot_value = parseInt(document.getElementById(child).style.transform.split('rotate')[1].slice(1, 5))
        }
        else {
          prev_rot_value = parseInt(document.getElementById(child).style.transform.split('rotate')[1].slice(1, 4))

        }
        rotated_dict[child] = prev_rot_value;
      }
    })
    return rotated_dict

  }


  render() {

    return (
      <div className='container'>
        <div className='row'>
          <Post {...this.props} images={this.state.post[0].image} tags={this.state.post[0].tags} identifier={this.state.post[0].id} />

        </div>
        <div className='row'>
          <div className='col-1 mr-2'>
            <button type="button" class="btn btn-primary" onClick={this.rotate} id='left'>left</button>
          </div>

          <div className='col-1 ml-2'>
            <button type="button" class="btn btn-primary" onClick={this.rotate} id='right'>right</button>
          </div>

          <div className='col-1 ml-2'>
            <button type="button" class="btn btn-primary" onClick={this.save_rotation}>save</button>
          </div>



        </div>

      </div >

    )
  }
}

export default PostDetail;
