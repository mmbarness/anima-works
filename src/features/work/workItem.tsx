import ReactPlayer from "react-player/lazy"
import { Video } from "../../interfaces/assetTypes"

type Props = {
    video: Video,
    orientation: string,
    i: number
}

const WorkItem = ({video, orientation, i}: Props) => {
    const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
    const {credits} = video;
    const pageOrientation = orientation.split("-").shift();
    return(
        <div className={gridId}>
            <ReactPlayer
                url={video.link}
                className={pageOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
                width="100%"
                height="100%"
                light={video.videoType === 'youtube' ? true : false}
                controls={true}
                origin={window.location.origin}
            />
            <ul className="video-item-text-container">
                <li className="video-item-text Title-li" key={`title-${video._id}`}>{video.titleToDisplay}</li>
                {credits.map((credit) => (
                    <li key={`${credit.title}-${video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                ))}
            </ul>
        </div>
    )
}

export default WorkItem