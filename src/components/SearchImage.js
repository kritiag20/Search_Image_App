import axios from 'axios'
import React, { Component } from 'react'
import Image from '../Icons/searchImage.svg';
import logo from '../Icons/logo.svg'
import ImageResult from './ImageResult';
import seachIcon from '../Icons/searchIcon.svg'

class SearchImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            apiUrl: 'https://pixabay.com/api/',
            apiKey: '21478719-e288059ae6bb86334a6f3a337',
            result: [],
            value: ''
        }
        this.onSearch = this.onSearch.bind(this)
        this.getText = this.getText.bind(this)
    }

    onSearch = () => {

        axios
            .get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&safesearch=true`
            )
            .then(res => this.setState({ result: res.data.hits, value: this.state.searchText }))
            .catch(err => console.log(err))

        console.log("searchClicked");

    }
    getText = (e) => {
        this.setState({ searchText: e.target.value })
        console.log("getTextClicked");
    }


    render() {
        console.log(this.state.searchText);
        console.log("result" , this.state.result);
        return (
            <div className="wrapper">
                <nav>
                    <img className="logo" src={logo} alt="logo" />
                    <div className="heading"><h3>Search Images</h3></div>
                </nav>

                <div className="input-cont">
                    <input className="searchInput"
                        type="search"
                        placeholder="Search high-resolution images"
                        value={this.state.searchText}
                        onChange={(e) => this.getText(e)}
                    />
                    <button type="submit" className="searchBtn" onClick={() => this.onSearch()}>
                        <img src={seachIcon} alt=""/>
                        Search
                    </button>
                </div>

                <div>
                    <div className="searchText">{this.state.value}</div>
                    {this.state.result.length > 0 ? (<ImageResult result={this.state.result} />) :
                        (<img className="bgImg" src={Image} alt="" />)
                    }
                </div>
            </div>
        )
    }
}

export default SearchImage