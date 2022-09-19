import type { WorkItem as WorkItemAsset } from "../../interfaces/sanityTypes"
import {default as _ReactPlayer} from 'react-player';
import {ReactPlayerProps} from "react-player/types/lib";
import { CardMedia, Modal, Box } from '@mui/material';
import { match, P } from "ts-pattern";
import { useState } from "react";
import YouTubePlayer from "react-player/youtube";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const renderVideo = (video:WorkItemAsset, pageOrientation:string) => 
    match(video.link)
        .with(P.string, () => (
            <ReactPlayer
                url={video.link}
                className={pageOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
                width="100%"
                height="100%"
                light={video.thumbnail ? video.thumbnail : true}
                controls={true}
                origin={window.location.origin}
            />
        ))
        .with(P._, () =>
            <div className="thumbnail-preview">
                <img src={video.thumbnail}></img>
            </div>
        )
        .run()

type Props = {
    video: WorkItemAsset,
    orientation: string,
    i: number
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const WorkItem = ({video, orientation, i}: Props) => {
    const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
    const {credits} = video;
    const pageOrientation = orientation.split("-").shift();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(video.link)

    // const youtubeMatch = match(video.link)
    //     .with(P.string, link => link.match(/\?v=([A-Za-z0-9-_]*)/))
    //     .with(P._, link => [])
    //     .run()

    // console.log(video.link.match(/\?v=([A-Za-z0-9-_]*)/))

    const youtubeId = video.link ? match(video.link.match(/\?v=([A-Za-z0-9-_]*)/))
        .with(P.array(P.string), (regexMatches) => regexMatches)
        .with(P._, (matches) => {
            console.log({matches})
            return null 
        })
        : null 

    console.log({link: video.link, youtubeId})

    return(
        <div className={gridId} key={video._id}>
            <img onClick={(e) => video.link ? setOpen(true) : null} className={pageOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"} src={video.thumbnail}></img>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ReactPlayer
                        url={video.link}
                        className={pageOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
                        width="100%"
                        height="100%"
                        light={video.thumbnail ? video.thumbnail : true}
                        controls={true}
                        origin={window.location.origin}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default WorkItem