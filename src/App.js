import React, { Component } from "react";
import Home from "./components/home";

import DNavBar from "./components/navbar";
import UploadForm from "./components/upload";

import { Route, Switch } from "react-router-dom";
import PostDetail from "./components/postdetail";


const endpoint = "http://localhost:8000/";


class App extends Component {
  state = {
    post: [],
    search_result_post: [],
    page_reload: false,
    searched: false,
    count: 0,
    current_page: 1,
    pages: []
  }

  search_tag = async (tag_name) => {

    let url = endpoint + 'posts/?search=' + tag_name;
    const response = await fetch(url, {
      method: 'GET',
    })
    response.json().then(data => this.setState({ ...this.state, post: data.results, searched: true }))
    // this.setState({...this.state,post:response.data})
  }

  fetch_post = async (pagenum = 1) => {
    let url = endpoint + 'posts/?page='+pagenum;
    const response = await fetch(url, {
      method: 'GET'
    })
    response.json().then(data => {
      let pages = this.caliculate_page(data.count)
      this.setState({ ...this.state, post: data.results, searched: false, page_reload: false, count: data.count, current_page: pagenum, pages: pages })
    }
    )

  }
  need_reload_home = () => {
    this.setState({ ...this.state, page_reload: true })
  }

  caliculate_page = (count) => {
    let pages = []
    for (var page = 0; page <= count / 8; page++) {
      pages.push(page + 1)
    }
    return pages
  }

  get_page_data = page =>{
    this.fetch_post(page)
  }


  componentDidMount() {
    this.fetch_post(1)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searched === false && this.state.page_reload === true) {
      this.fetch_post(1)
    }
  }


  render() {
    console.log(this.state)
    return (
      <div>

        <DNavBar search_tag={this.search_tag} />
        <div className='center container'>
          <div className='row'>
            <Switch>

              <Route path="/post/:id" render={(props) => <PostDetail {...props} need_reload_home={this.need_reload_home} posts={this.state.post} />} />
              <Route path="/upload" render={(props) => <UploadForm {...props} need_reload_home={this.need_reload_home} />} />
              <Route path="/" exact render={(props) => <Home get_page_data={this.get_page_data} state={this.state} pages={this.state.pages} current_page={this.state.current_page} posts={this.state.post} {...props} />} />
            </Switch>

          </div>


        </div>


      </div>

    )
  }
}

export default App;
