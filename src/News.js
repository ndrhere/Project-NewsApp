import React, { Component } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
    };
  }

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e74ea13a66be48acb3aa52c127704e11&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    console.log(data);
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  //  handlePrevClick = async() => {

  //    this.setState({
  //     page: this.state.page - 1,

  //    }, ()=>{
  //     this.updateNews();
  //    })

  //   }

  //  handleNextClick = async ()=> {

  //    this.setState ({
  //   page: this.state.page + 1,

  //  }, ()=>{
  //   this.updateNews();
  //  })

  // }

  fetchMore = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e74ea13a66be48acb3aa52c127704e11&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    
    console.log(parsedData);
    this.setState({
     
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  //In React, state updates are asynchronous, meaning that when you call setState(), React may not immediately update the state object. It may batch multiple state updates together for better performance. Therefore, if you want to perform some action immediately after a state update, you need to use a callback function.In the case of this code, when you click the "Next" button, the handleNextClick() method is called, and it updates the state of the page to the next page number. But since state updates are asynchronous, the state update may not happen immediately. Therefore, if you immediately call the this.updateNews() method, it may still fetch the old data from the previous page.To make sure that the state is updated before calling the this.updateNews() method, you can pass a callback function to the setState() method. This callback function will be executed after the state has been updated.So, in your updated code, you are passing a callback function to the setState() method, which sets the page state and then calls the this.updateNews() method. This ensures that the state is updated before the this.updateNews() method is called, and the correct page of news data is fetched from the API.//

  render() {
    return (
      <div className="container my-4" style={{ marginTop: "191px"}}>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-4" key = {element.url} >
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      urlToImage={element.urlToImage}
                      url={element.url}
                    />
                  </div>
                );
              })}
              {/* <div className="d-flex justify-content-between">
<button onClick={this.handlePrevClick} disabled = {this.state.page === 1 || this.state.loading} type="button" class="btn btn-primary">Previous</button>
<button onClick={this.handleNextClick} disabled = {this.state.page + 1 === Math.ceil(this.state.totalResults/this.props.pageSize) || this.state.loading}type="button" class="btn btn-primary">Next</button>
</div> */}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
