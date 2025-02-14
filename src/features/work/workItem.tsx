import type { WorkItem as WorkItemAsset } from "../../types/sanityTypes"
import { match, P } from "ts-pattern";
import { WorkItemModal } from "./workItemModal";
import { useState, useRef } from "react";

type Props = {
    video: WorkItemAsset,
    orientation: "landscape" | "portrait",
    i: number
}

const WorkItem = ({ video, orientation }: Props) => {

    const [open, setOpen] = useState(false);

    const itemRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

    return (
        <div className="video-item" key={video._id} ref={itemRef}>
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
                onClick={(e) => { e.preventDefault(); video.link ? setOpen(true) : null }}
                src={video.thumbnail ?? ""}
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
