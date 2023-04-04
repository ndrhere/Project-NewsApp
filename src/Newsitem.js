import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Newsitem extends Component {
    

  render() {
    let {title, description, urlToImage, url} = this.props;
    return (
<div className="card">
  <img src={urlToImage} class="card-img-top" alt="Image"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={url} target="_blank" class="btn btn-primary">Read More</a>
  </div>
</div>
  
    )
  }
}
