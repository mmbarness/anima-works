import type { WorkItem as WorkItemAsset } from "../../types/sanityTypes"
import Carousel from "react-material-ui-carousel"
import { default as _ReactPlayer } from 'react-player';
import { ReactPlayerProps } from "react-player/types/lib";
import { Modal, Box, Paper, Button } from '@mui/material';
import { MouseEvent, useRef, useState } from "react";
import { match, P } from "ts-pattern";
import { Link } from "react-router-dom";
import { WORK_ITEM_STILLS__WIDTH } from "../../utils/constants";
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
           
    const { credits, stills } = video;

    const ref = useRef()

    const [ open, setOpen ] = useState(false);
    const [ videoOrStills, setVideoOrStills ] = useState({
        video: true,
        stills: false
    })

    const handleClose = () => setOpen(false);

    const renderVideo = () => (
        <ReactPlayer
            url={video.link}
            className={orientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
            width="100%"
            height="100%"
            light={video.thumbnail ? video.thumbnail : true}
            controls={true}
            origin={window.location.origin}
        />
    )

    const renderStills = () => (
        <div className="stills-carousel">
            <Carousel
                autoPlay={false}
                sx={{
                    width: '70vw',
                    height: 'maxContent'
                }}
            >
                {
                    video.stills.map((url:string, i) => (        
                        <Paper key={i} >
                            <img style={ {
                                'borderRadius': '0.5rem',
                                'width': WORK_ITEM_STILLS__WIDTH
                            } } src={url} alt="still"/>
                        </Paper>
                    ))
                }
            </Carousel>
        </div>
    )

    const handleVideoOrStillsToggle = (params: {e:MouseEvent<HTMLButtonElement>, target:'video'|'stills'}) => {
        params.e.preventDefault();
        setVideoOrStills(
            match(params.target)
                .with('video', () => ({
                        video: true,
                        stills: false,
                    })
                )
                .with('stills', () => ({
                    video: false,
                    stills: true,
                }))
                .run()
        )
        return
    }

    const decideRender = () => (
        match(videoOrStills)
            .with({
                video: true,
                stills: false,
            }, () => renderVideo())
            .with({
                video: false,
                stills: true, 
            }, () => renderStills())
            .run()
    )

    const modal = () => (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div id="modal-video-container">
                    <div>
                        <Button onClick={(e) => handleVideoOrStillsToggle({e, target:'video'})}>Video</Button>
                        <Button onClick={(e) => handleVideoOrStillsToggle({e, target:'stills'})}>Stills</Button>
                    </div>
                    { decideRender() }
                </div>
                <ul className="video-item-text-container">
                    <li className="video-item-text Title-li" key={`title-${video._id}`}>{video.titleToDisplay}</li>
                    {credits.map((credit) => (
                        <li key={`${credit.title}-${video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                    ))}
                </ul>
                <Link to={`/work/${video._id}`}>
                    See more
                </Link>
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