import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import imageUrlBuilder from '@sanity/image-url';
import { FormattedAboutInfo, GearItem, SanityImage, WorkItem, ReelPage, QueryResponse, Miscellaneous } from '../interfaces/sanityTypes';
import { apiQueries } from '../utils/apiQueries';
import { apiResponseTransforms } from '../utils/apiResponseTransforms';

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
            query: apiQueries.work,
            transformResponse: apiResponseTransforms.work,
        }),
        aboutInfo: builder.query<FormattedAboutInfo, void>({
            query: apiQueries.about,
            transformResponse: apiResponseTransforms.about,
        }),
        gear: builder.query<Array<GearItem>, void>({
            query: apiQueries.gear,
            transformResponse: (response: QueryResponse<GearItem>) => {
                return response.result;
            },
        }),
        reelPage: builder.query<ReelPage, void>({
            query: apiQueries.reel,
            transformResponse: apiResponseTransforms.reel,
        }),
        miscellaneous: builder.query<Miscellaneous, void>({
            query: apiQueries.miscellaneous,
            transformResponse: apiResponseTransforms.miscellaneous,
        })
    })
})

export const {
    useWorkItemsQuery,
    useLazyWorkItemsQuery,
    useLazyAboutInfoQuery,
    useReelPageQuery,
    useAboutInfoQuery,
    useGearQuery,
    useLazyMiscellaneousQuery,
    useMiscellaneousQuery,
} = sanityApi 



