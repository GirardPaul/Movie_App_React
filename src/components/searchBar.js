import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Veuillez saisir votre film",
      intervalBeforeRequest: 3000,
      lockRequest: false,
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input
            className="form-control input-lg"
            type="text"
            //bind : pour que le this fasse référence à la classe et non à la fonction
            onKeyUp={this.handleChange.bind(this)}
            placeholder={this.state.placeHolder}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              onClick={this.handleOnClick.bind(this)}
            >
              Go
            </button>
          </span>
        </div>
      </div>
    );
  }
  //event.target.value : récupère la valeur de l'input
  handleChange(event) {
    console.log("Saisie", event.target.value);

    //Va modifier le state de searchText
    //Dès que le setState est appelé ça va rappeler le render
    this.setState({ searchText: event.target.value });
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true });
      setTimeout(
        function () {
          this.search();
        }.bind(this),
        this.state.intervalBeforeRequest
      );
    }
  }

  search() {
    this.props.callback(this.state.searchText);
    this.setState({lockRequest:false})
  }
  handleOnClick() {
    this.search();
  }
}
export default SearchBar;
