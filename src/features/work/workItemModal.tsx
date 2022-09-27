import { SetStateAction, useState, Dispatch } from "react"
import { Modal, Box, Paper, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Carousel from "react-material-ui-carousel"
import { WorkItem } from "../../types/sanityTypes";
import { useAppSelector } from "../../redux/hooks";
import { WORK_ITEM_STILLS__WIDTH } from "../../utils/constants";

export const WorkItemModal = (params: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    modalStyle: any,
    video: WorkItem
}) => {

    const { currentOrientation } = useAppSelector(state => state.contextSlice);

    const { credits, stills } = params.video;

    const renderVideo = () => (
        <ReactPlayer
        url={params.video.link}
        className={currentOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
        width="100%"
        height="100%"
        light={params.video.thumbnail ? params.video.thumbnail : true}
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
                    stills.map((url:string, i) => (        
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

    const [ currentRenderFn, setCurrentRenderFn ] = useState(renderVideo)

    return (
        <Modal
            open={params.open}
            onClose={() => params.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={params.modalStyle}>
                <div id="modal-video-container">
                    <div>
                        <Button onClick={(e) => setCurrentRenderFn(renderVideo)}>Video</Button>
                        <Button onClick={(e) => setCurrentRenderFn(renderStills)}>Stills</Button>
                    </div>
                    { currentRenderFn }
                </div>
                <ul className="video-item-text-container">
                    <li className="video-item-text Title-li" key={`title-${params.video._id}`}>{params.video.titleToDisplay}</li>
                    {credits.map((credit) => (
                        <li key={`${credit.title}-${params.video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                    ))}
                </ul>
                <Link to={`/work/${params.video._id}`}>
                    See more
                </Link>
            </Box>
        </Modal>
    )
}