import React, { Component } from "react";
import SearchBar from "../components/searchBar";
import VideoList from "./videoList";
import axios from "axios";
import VideoDetail from "../components/videoDetail";
import Video from "../components/Video";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=83c6111d367f0146a56cb5c464466b1b";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
  }
  //Quand le composant va être chargé
  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    //Etabli la requete puis transmets la réponse à la requête dans response
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
      function (response) {
        //Récupère les 5 films les plus populaires à partir de l'index 1
        //Récupère le film le plus populaire
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0],
          },
          function () {
            this.applyVideoToCurrentMovie();
          }
        );

        console.log(this.state.movieList);
        console.log(this.state.currentMovie);
      }.bind(this)
    );
  }

  applyVideoToCurrentMovie() {
    //Etabli la requete puis transmets la réponse à la requête dans response
    axios
      .get(
        `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(
        function (response) {
          const youtubeKey = response.data.videos.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({ currentMovie: newCurrentMovieState });

          console.log(newCurrentMovieState);
        }.bind(this)
      );
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function () {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }

  setRecommendation(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(
      function (response) {
        //Récupère les 5 films les plus populaires à partir de l'index 1
        //Récupère le film le plus populaire
        this.setState(
          {
            movieList: response.data.results.slice(0, 5)
          });
      }.bind(this)
    );
  }

  onClickSearch(searchText) {
    if (searchText) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(
          function (response) {
            if(response.data && response.data.results[0]){
                if(response.data.results[0].id !== this.state.currentMovie.id){
                    this.setState({currentMovie: response.data.results[0]}, () => {
                      this.applyVideoToCurrentMovie();
                      this.setRecommendation();
                    })
                }
            }
           
          }.bind(this)
        );
    }

    console.log(searchText);
  }
  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callback={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
              avis={this.state.currentMovie.vote_average*10}
            />
          </div>
          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
