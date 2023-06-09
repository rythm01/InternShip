import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseurl'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    //prepare headers work need to be done
    prepareHeaders: async (headers, { getState }) => {
      headers.set('accept', 'application/json')
      try {
        const { loggedIn, token } = getState().reducer.auth;
        // store.dispatch(createApi.util.resetApiState())
        if (loggedIn && token) {
          headers.set('authorization', `Token ${token}`)
        } else {
          headers.set('authorization', '')
        }
      } catch (err) {
        headers.set('authorization', '')
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'Cards',
    'Payments',
  ],
})