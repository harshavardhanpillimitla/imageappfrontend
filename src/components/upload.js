import React, { Component } from "react";
import Tags from "./tags";

const endpoint = "http://localhost:8000/"



class UploadForm extends Component {
    state = {
        tags: [],
        temp_tag: '',
        files: []
    }

    fileSelectedHandler = (e) => {
        this.setState({ ...this.state, files: [...this.state.files, ...e.target.files] })
    }

    uploadImage = async (url = "", data = {}) => {
        const formData = new FormData()

        data['files'].forEach((file, index) => {
            formData.append("image", file)
        })
        formData.append('tags', data['tags'])

        const response = await fetch(url, {
            method: 'POST',
            body: formData

        })
        response.json().then(data => {
            if(data.succes===true){
                this.props.need_reload_home()
                this.props.history.replace("");
            }
            else{
                this.props.history.replace("/upload");
            }
        })
       
    }

    onSubmit = e => {
        e.preventDefault();
        const imageUploadUrl = endpoint + 'postimages/'
        this.uploadImage(imageUploadUrl, this.state)


    }

    add_tag = e => {
        let temp_tag = this.state.temp_tag;
        let tags = this.state.tags;
        tags.push(temp_tag);
        this.setState({ ...this.state, tags:tags, temp_tag: '' })
    }

    entering_tag = e => {
        // let tags = this.state.tags;
        // tags.push(temp_tag);
        // this.setState({...this.state, tags, temp_tag:''})
        this.setState({ ...this.state, temp_tag: e.target.value })
    }
    render() {
        return (
            <div className='mt-4'>


                <form class="row g-3">
                    {this.state.tags.length > 0 ? <Tags tags={this.state.tags} /> : ''}
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="enter tags" aria-label="enter tags" aria-describedby="basic-addon2" onChange={this.entering_tag} value={this.state.temp_tag} />
                        <span class="input-group-text" id="basic-addon2" onClick={this.add_tag}>add tag</span>
                    </div>

                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">you can add multiple images</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple onChange={this.fileSelectedHandler} />
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-3" onClick={this.onSubmit}>Post</button>
                    </div>
                </form>

            </div>

        )
    }
}

export default UploadForm;
