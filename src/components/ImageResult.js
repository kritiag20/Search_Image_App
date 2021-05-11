import React, { Component } from 'react'
import { IconButton, Button, Dialog, DialogActions } from '@material-ui/core';
// import { GridListTile, GridList, GridListTileBar } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Image from '../Icons/searchImage.svg';

export class ImageResult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            currentImg: '',
            imageList: this.props.images
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

    render() {

        let ImgList
        const images = this.state.imageList

        if (images) {
            ImgList = (
                <div className="displayImg">
                    {images.map(image => (
                        <div className="imgCont" key={image.id}>

                            <img className="imgSize" src={image.webformatURL} alt="" />

                            <div className="pop">
                                <IconButton onClick={() => this.handleOpen(image.webformatURL)}>
                                    <ZoomInIcon className="zoomBtn" />
                                </IconButton>
                            </div>


                        </div>
                    ))}

                </div>
            )
        }
        else {
            ImgList = (<img src={Image} alt="" />)
        }

        return (
            <div>
                <div>
                    {ImgList}
                </div>
                <Dialog open={this.state.open}>
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
