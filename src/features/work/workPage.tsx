import Carousel from "react-material-ui-carousel"
import { Paper } from '@mui/material'
import { useLocation } from "react-router-dom"
import { match, P } from "ts-pattern";
import { useWorkItemsQuery } from "../../redux/sanityApi";
import { WORK_ITEM_STILLS__WIDTH } from "../../utils/constants";

export const WorkPage = () => {

    const location = useLocation();

    const videoId = match(location.pathname.match(/\/work\/(.*)/))
        .with([P.string, P.string], regexMatchGroups => {
            return regexMatchGroups[1]
        })
        .with(P._, () => {
            return 'invalid_id'
        })
        .run()

    const { video } = useWorkItemsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            video: data?.find((video) => video._id === videoId)
        })
    })

    return (
        video ?
            <div className="stills-carousel">
                <Carousel
                    autoPlay={false}
                    sx={{
                        width: '70vw',
                        height: 'maxContent'
                    }}
                >
                    {
                        video.stills?.map((url: string, i) => (
                            <Paper key={i} >
                                <img style={{
                                    'borderRadius': '0.5rem',
                                    'width': WORK_ITEM_STILLS__WIDTH
                                }} src={url} alt="still" />
                            </Paper>
                        ))
                    }
                </Carousel>
            </div>
            : <div></div>
    )
}
