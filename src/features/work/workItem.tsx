import type { WorkItem as WorkItemAsset } from "../../interfaces/sanityTypes"
import {default as _ReactPlayer} from 'react-player';
import {ReactPlayerProps} from "react-player/types/lib";
import { Modal, Box } from '@mui/material';
import { useState } from "react";
import { match, P } from "ts-pattern";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

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
    bgcolor: '#f5f5f5',
    boxShadow: 24,
    borderRadius: 1,
    p: 1,
    "&:focus": {
        outline: "none"
    }
};

const imgClasses = (params: {orientation:string, link:string | null}) => 
    match(params)
        .with({
            orientation: "landscape",
            link: P.string
        }, landscapeModal => "work-video-desktop click-me")
        .with({
            orientation: "landscape",
            link: P._
        }, landscapeThumbnail => "work-video-destop dont-click-me")
        .with({
            orientation: P.string,
            link: P.string
        }, landscapeModal => "work-video-mobile click-me")
        .with({
            orientation: P.string,
            link: P._
        }, landscapeModal => "work-video-mobile dont-click-me")
        .run()

const WorkItem = ({video, orientation, i}: Props) => {
    const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
    const {credits} = video;
    const pageOrientation = orientation.split("-").shift();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    
    return(
        <div className={gridId} key={video._id}>
            <img onClick={(e) => video.link ? setOpen(true) : null} className={imgClasses({orientation, link: video.link})} src={video.thumbnail}></img>
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