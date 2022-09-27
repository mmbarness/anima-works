import type { WorkItem as WorkItemAsset } from "../../types/sanityTypes"
import { match, P } from "ts-pattern";
import { WorkItemModal } from "./workItemModal";
import { useState } from "react";

type Props = {
    video: WorkItemAsset,
    orientation: "landscape" | "portrait",
    i: number
}

const WorkItem = ({video, orientation, i}: Props) => {

    const [ open, setOpen ] = useState(false);
    
    return(
        <div className="video-item" key={video._id}>
            <img alt="video thumbnail" 
                className={
                    match(orientation)
                        .with("portrait", () => "work-video-mobile")
                        .with("landscape", () => "work-video-desktop")
                        .with(P._, () => "work-video-desktop")
                        .run() 
                    + " "
                    + match(video.link)
                        .with(P.string, () => "click-me")
                        .with(P._, () => "dont-click-me")
                        .run()
                } 
                onClick={(e) => video.link ? setOpen(true) : null} 
                src={ video.thumbnail }
            />
            <WorkItemModal
                open={open}
                setOpen={setOpen}
                video={video}
            />
        </div>
    )
}

export default WorkItem