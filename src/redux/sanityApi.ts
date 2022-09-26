import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { match, P } from 'ts-pattern';
import { AboutInfo, FormattedAboutInfo, GearItem, aboutPageMatchPattern, SanityImage, WorkItem, HomePage, HomePageMatchPattern, QueryResponse, HomePageQuery, NaiveWorkItem } from '../interfaces/sanityTypes';
import { WORK_ITEM_STILLS__WIDTH, WORK_ITEM_THUMBNAIL_WIDTH } from '../utils/constants';
const sanityClient = require('@sanity/client')
const baseURL = 'https://uvsp04xk.api.sanity.io/v2022-10-21/data/query/production';

export const baseSanityClient = sanityClient({
    projectId: 'uvsp04xk',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-10-21',
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
            transformResponse: (response: QueryResponse<NaiveWorkItem>) => response.result.map(workItem => ({
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
        aboutInfo: builder.query<FormattedAboutInfo, void>({
            query: () => '?query=*[_type == "info"]',
            transformResponse: (response: QueryResponse<AboutInfo>) => {
                const [text, images] = response.result.map(result => 
                    match(result)
                        .with({
                            "_createdAt": P.string,
                            "_id": P.string,
                            "_rev": P.string,
                            "_type": P.string,
                            "_updatedAt": P.string,
                            "aboutPageImage": P.select('aboutPageImage'),
                            "aboutPageText": P.select('aboutPageText'),
                            "email": P.string,
                            "instagram": P.string
                        }, result => [result.aboutPageText, result.aboutPageImage])
                        .with(P._, result => [])
                        .run()
                ).reduce((acc:any,ele) => ( 
                    [...acc[0], ele[0], [...acc[1], ele[1]]]
                ),[[],[]])

                const email = response.result[0].email;
                const instagram = response.result[0].instagram

                return ({
                    text,
                    images,
                    email,
                    instagram
                })
            }
        }),
        gear: builder.query<Array<GearItem>, void>({
            query: () => '?query=*[_type == "gear"]{_id, name, features}',
            transformResponse: (response: QueryResponse<GearItem>) => {
                return response.result;
            }
        }),
        homePage: builder.query<HomePage, void>({
            query: () => '?query=*[_type == "homePage"]',
            transformResponse: (response: QueryResponse<HomePageQuery>) => (
                match(response.result[0])
                    .with(HomePageMatchPattern, response => ({reelLink: response.reelLink}))
                    .with(P._, response => ({reelLink: ""}))
                    .run()
            )
        })
    })
})

export const {
    useWorkItemsQuery,
    useLazyWorkItemsQuery,
    useLazyAboutInfoQuery,
    useHomePageQuery,
    useAboutInfoQuery,
    useGearQuery,
} = sanityApi 



