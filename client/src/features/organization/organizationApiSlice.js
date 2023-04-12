import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const OrganizationsAdapter = createEntityAdapter({})

const initialState = OrganizationsAdapter.getInitialState()

export const OrganizationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrganizations: builder.query({
            query: () => '/organizations',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedOrganizations = responseData.map(Organization => {
                    Organization.id = Organization._id
                    return Organization
                });
                return OrganizationsAdapter.setAll(initialState, loadedOrganizations)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Organization', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Organization', id }))
                    ]
                } else return [{ type: 'Organization', id: 'LIST' }]
            }
        }),
        addNewOrganization: builder.mutation({
            query: initialOrganizationData => ({
                url: '/organizations',
                method: 'POST',
                body: {
                    ...initialOrganizationData,
                }
            }),
            invalidatesTags: [
                { type: 'Organization', id: "LIST" }
            ]
        }),
        updateOrganization: builder.mutation({
            query: initialOrganizationData => ({
                url: '/organizations',
                method: 'PATCH',
                body: {
                    ...initialOrganizationData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Organization', id: arg.id }
            ]
        }),
        deleteOrganization: builder.mutation({
            query: ({ id }) => ({
                url: `/organizations`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Organization', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOrganizationsQuery,
    useAddNewOrganizationMutation,
    useUpdateOrganizationMutation,
    useDeleteOrganizationMutation,
} = OrganizationsApiSlice

// returns the query result object
export const selectOrganizationsResult = OrganizationsApiSlice.endpoints.getOrganizations.select()

// creates memoized selector
const selectOrganizationsData = createSelector(
    selectOrganizationsResult,
    OrganizationsResult => OrganizationsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOrganizations,
    selectById: selectOrganizationById,
    selectIds: selectOrganizationIds
    // Pass in a selector that returns the Organizations slice of state
} = OrganizationsAdapter.getSelectors(state => selectOrganizationsData(state) ?? initialState)