import axios from 'axios'
import React, { Component } from 'react'
import Image from '../Icons/searchImage.svg';
import logo from '../Icons/logo.svg'
import ImageResult from './ImageResult';

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
        this.setState(() => {
            axios
                .get(
                    `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&safesearch=true`
                )
                .then(res => this.setState({ result: res.data.hits }))
                .catch(err => console.log(err))
        })
        console.log("searchClicked");
        this.setState({ value: this.state.searchText })

    }
    getText = (e) => {
        this.setState({ searchText: e.target.value })
        console.log("getTextClicked");
    }


    render() {
        console.log(this.state.searchText);
        console.log(this.state.result);
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 
                        3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 
                        4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 
                        9.5 11.99 14 9.5 14z"/>
                        </svg>
                        Search
                    </button>
                </div>

                <div>
                    <div className="searchText">{this.state.value}</div>
                    {this.state.result.length > 0 ? (<ImageResult images={this.state.result} />) :
                        (<img className="bgImg" src={Image} alt="" />)
                    }
                </div>
            </div>
        )
    }
}

export default SearchImage