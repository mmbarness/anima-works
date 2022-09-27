import '../../styles/workItemModal.scss';
import { SetStateAction, useState, Dispatch } from "react"
import { Modal, Box, Paper, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Carousel from "react-material-ui-carousel"
import { WorkItem } from "../../types/sanityTypes";
import { useAppSelector } from "../../redux/hooks";
import { WORK_ITEM_STILLS__WIDTH } from "../../utils/constants";

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

export const WorkItemModal = (params: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    video: WorkItem
}) => {

    const { currentOrientation } = useAppSelector(state => state.contextSlice);

    const { credits, stills } = params.video;

    const renderVideo = () => (
        <div id="aspect-ratio-enforcer">
            <ReactPlayer
                url={params.video.link}
                className={`modal-video ${currentOrientation}`} 
                width="100%"
                height="100%"
                light={params.video.thumbnail ? params.video.thumbnail : true}
                controls={true}
                origin={window.location.origin}
            />
        </div>
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
            <Box sx={modalStyle}>
                <div id="modal-content-container">
                    { currentRenderFn }
                    <div id="toggle-modal-view">
                        <Button 
                            variant="outlined" 
                            onClick={(e) => setCurrentRenderFn(renderVideo)}
                            style={{
                                margin:"0rem 1rem 0rem 0rem"
                            }}
                        >Video</Button>
                        <Button 
                            variant="outlined" 
                            onClick={(e) => setCurrentRenderFn(renderStills)}
                            style={{
                                margin:"0rem 0rem 0rem 1rem"
                            }}
                            >
                                Stills
                            </Button>
                    </div>
                </div>
                <ul className="modal-text-container">
                    <li className="modal-text Title-li" key={`title-${params.video._id}`}>{params.video.titleToDisplay}</li>
                    {credits.map((credit) => (
                        <li key={`${credit.title}-${params.video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                    ))}
                </ul>
            </Box>
        </Modal>
    )
}