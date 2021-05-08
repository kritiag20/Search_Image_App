import axios from 'axios'
import React, { Component } from 'react'

class SearchImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            apiUrl: 'https://pixabay.com/api/',
            apiKey: '21478719-e288059ae6bb86334a6f3a337',
            result: []
        }
        this.onSearch = this.onSearch.bind(this)
        this.onSearchText = this.onSearchText.bind(this)
    }

    onSearchText = e => {
        this.setState({ searchText : e.target.value })
    }

    onSearch = e => {
        this.setState(() => {
            axios
                .get(
                    `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&safesearch=true`
                )
                .then(res => this.setState({ result: res.data.hits }))
                .catch(err => console.log(err))
        })
    }

    render() {
        console.log(this.state.result);
        console.log("searchText"+ this.state.searchText);
        return (
            <div className="wrapper">
                <div className="input-cont">
                    <input className="searchImage"
                        type="search"
                        placeholder="Search Images"
                        // name="searchText"
                        value={this.state.searchText}
                        onChange={(e) => this.onSearchText(e)}
                    />
                    <button type="submit" className="searchBtn" onClick={(e) => this.onSearch(e)}>Search</button>
                </div>
                <div>
                    {this.state.result.length > 0 && (
                        <div className="displayImg">
                            {this.state.result.map(image => (
                                <div key={image.id}>
                                    <img className="imgSize" src={image.webformatURL} alt="" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default SearchImage