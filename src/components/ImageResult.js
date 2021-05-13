import React, { Component } from 'react'
import { IconButton, Button, Dialog, DialogActions } from '@material-ui/core';
// import { GridListTile, GridList, GridListTileBar } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import NotFound from '../Icons/NotFound.svg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class ImageResult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            currentImg: '',
            likeIcon: null,
            dislike: true
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen = img => {
        this.setState({ open: true, currentImg: img })
    }

    handleClose = () => {
        this.setState({ open: false })
    }
    handlelike = (id) => {
        this.setState({ likeIcon: id , dislike : !this.state.dislike})
    }

    render() {

        let ImgList
        const images = this.props.result
        console.log("images", images)
        
        let ShowLikeIcon = ''
        let id = this.state.likeIcon
        for (let imgId = 0; imgId < images.length; imgId++) {
            if (id === images[imgId].id) {
                ShowLikeIcon = images[imgId].id
                break
            }
        }

        if (images) {
            ImgList = (
                <div className="displayImg">
                    {images.map(image => (
                        <div className="imgCont" key={image.id}>
                            <div className="image">
                                <img className="imgSize" src={image.webformatURL} alt="" />
                                <div className="pop">

                                    <div className="zoomIconCont" onClick={() => this.handleOpen(image.webformatURL)}>
                                        <ZoomInIcon className="zoomBtn" />
                                    </div>
                                    <div className="zoomIconCont likeBtn" onClick={() => this.handlelike(image.id)}>
                                        {ShowLikeIcon === image.id && this.state.dislike ? <FavoriteIcon className="LikeIcon zoomBtn"/> : <FavoriteBorderIcon className="zoomBtn"/>}
                                    </div>
                                </div>
                            </div>

                            <div className="imgTags">
                                {image.tags}
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            ImgList = (<img src={NotFound} alt="" />)
        }

        return (
            <div>
                <div>
                    {ImgList}
                </div>
                <Dialog className="modal" open={this.state.open}>
                    <img onClick={() => this.handleClose()} className="imghover" src={this.state.currentImg} alt="" />
                    <DialogActions>
                        <Button autoFocus onClick={() => this.handleClose()} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ImageResult
