import type { WorkItem as WorkItemAsset } from "../../interfaces/sanityTypes"
import {default as _ReactPlayer} from 'react-player';
import {ReactPlayerProps} from "react-player/types/lib";
import { Modal, Box } from '@mui/material';
import { useState } from "react";
import { match, P } from "ts-pattern";
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

type Props = {
    video: WorkItemAsset,
    orientation: "landscape" | "portrait",
    i: number
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f5f5f5',
    boxShadow: 24,
    borderRadius: 1,
    p: 1,
    "&:focus": {
        outline: "none"
    }
};

const clickMe = (link: string | null) => 
    match(link)
        .with(P.string, () => "click-me")
        .with(P._, () => "dont-click-me")
        .run();

const desktopOrMobile = (orientation:"landscape" | "portrait") =>
    match(orientation)
        .with("portrait", () => "work-video-mobile")
        .with("landscape", () => "work-video-desktop")
        .with(P._, () => "work-video-desktop")
        .run()

const thumbnailClasses = (params: {orientation:"landscape" | "portrait", link:string | null}) => 
    desktopOrMobile(params.orientation) + " " + clickMe(params.link)

const WorkItem = ({video, orientation, i}: Props) => {
           
    const {credits} = video;

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const modal = () => (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div id="modal-video-container">
                    <ReactPlayer
                        url={video.link}
                        className={orientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
                        width="100%"
                        height="100%"
                        light={video.thumbnail ? video.thumbnail : true}
                        controls={true}
                        origin={window.location.origin}
                    />
                </div>
                <ul className="video-item-text-container">
                    <li className="video-item-text Title-li" key={`title-${video._id}`}>{video.titleToDisplay}</li>
                    {credits.map((credit) => (
                        <li key={`${credit.title}-${video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                    ))}
                </ul>
            </Box>
        </Modal>

    )
    
    return(
        <div className="video-item" key={video._id}>
            <img alt="video thumbnail" className={thumbnailClasses({orientation, link: video.link})} onClick={(e) => video.link ? setOpen(true) : null} src={video.thumbnail}/>
            {modal()}
        </div>
    )
}

export default WorkItem