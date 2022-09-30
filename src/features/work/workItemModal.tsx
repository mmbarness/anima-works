import '../../styles/workItemModal.scss';
import { SetStateAction, useState, Dispatch } from "react"
import { Modal, Box, Paper, Button } from '@mui/material';
import ReactPlayer from "react-player";
import Carousel from "react-material-ui-carousel"
import { WorkItem } from "../../types/sanityTypes";
import { useAppSelector } from "../../redux/hooks";

const modalStyle = {
    maxHeight: '90vh',
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "72.5vw",
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
        <Paper 
            elevation={10}
        >
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
        </Paper>
    )
        
    const renderStills = () => (
        <div className="stills-carousel">
            <Carousel
                autoPlay={false}
                sx={{
                    minWidth:"72.5vw",
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%"
                }}
                >
                {
                    stills.map((url:string, i) => (        
                        <Paper 
                            key={i} 
                            elevation={10}
                        >
                            <div className="still-aspect-ratio-enforcer">
                                <img style={ {
                                    borderRadius: '0.5rem',
                                    top: 0,
                                    left: 0,
                                    position:"absolute",
                                    width: "72.5vw",
                                    height: "auto",
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                } } src={url} alt="still"/>
                            </div>
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
                            onClick={() => setCurrentRenderFn(renderVideo)}
                            style={{
                                margin:"0rem 1rem 0rem 0rem"
                            }}
                        >Video</Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => setCurrentRenderFn(renderStills)}
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