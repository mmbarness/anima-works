import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { match, P } from 'ts-pattern';
import { AboutInfo, GearItem, SanityImage, WorkItem, WorkItemQuery } from '../interfaces/sanityTypes';
import { WORK_ITEM_STILLS__WIDTH, WORK_ITEM_THUMBNAIL_WIDTH } from '../utils/constants';
const sanityClient = require('@sanity/client')
const baseURL = 'https://uvsp04xk.api.sanity.io/v2022-09-01/data/query/production';

export const baseSanityClient = sanityClient({
    projectId: 'uvsp04xk',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-02-01',
    token: '',
})

const imageBuilder = imageUrlBuilder(baseSanityClient);

export const imageUrlFor = (source: SanityImage) => imageBuilder.image(source);

export const sanityApi = createApi({
    reducerPath: 'sanity',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        workItems: builder.query<Array<WorkItem>, void>({
            query: () => `?query=*[_type == "video"]|order(orderRank){
                _id,
                titleOfWork,
                titleToDisplay,
                credits,
                embedCode,
                link,
                videoType,
                source,
                thumbnail,
                stills,
                videoType == 'musicVideo' => {
                  artist->{name},
                },
                videoType == 'nonprofit' => {
                  nonprofitInstitution->{name},
                },
                videoType == 'commercial' => {
                  company->{name},
                }
            }`,
            transformResponse: (response: WorkItemQuery) => response.result.map(workItem => ({
                ...workItem,
                stills: match(workItem.stills)
                    .with(P.array({
                        _type: "image",
                        asset: {
                            _ref: P.string,
                            _type: P.string,
                        }
                    }), images => images.map(unbuiltImage => 
                        imageUrlFor(unbuiltImage).width(WORK_ITEM_STILLS__WIDTH).url()
                    ))
                    .with(P._, () => [])
                    .run(),
                thumbnail: workItem.thumbnail ? imageUrlFor(workItem.thumbnail).width(WORK_ITEM_THUMBNAIL_WIDTH).url() : null
            })),
        }),
        aboutInfo: builder.query<Array<AboutInfo>, void>({
            query: () => '?query=*[_type == "info"]'
        }),
        gear: builder.query<Array<GearItem>, void>({
            query: () => '*[_type == "gear"]{_id, name, features}'
        })
    })
})

export const {
    useWorkItemsQuery,
    useLazyWorkItemsQuery,
    useAboutInfoQuery,
    useGearQuery,
} = sanityApi 



