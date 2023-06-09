import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseurl'
import { emptySplitApi } from './emptySplitApi'

export const api = emptySplitApi.injectEndpoints({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    getCards: builder.query({
      query: () => {
        return {
          url: '/cards/',
          method: 'GET',
        }
      },
      providesTags: ['Card', 'GetCard'],
    }),

    getPayments: builder.query({
      query: () => {
        return {
          url: '/api/v1/payments/',
          method: 'GET',
        }
      },
      providesTags: ['Payments', 'GetPayments'],
    }),

    getAllCards: builder.query({
      query: () => {
        return {
          url: '/api/v1/payments/my_cards/',
          method: 'GET',
        }
      },
      providesTags: ['GetAllCard'],
    }),

    addCard: builder.mutation({
      query: (id) => {
        return {
          url: '/api/v1/payments/add_payment_method/',
          method: 'POST',
          body: {
            payment_method: id
          }
        }
      }, invalidatesTags: ['GetAllCard']
    }),

    loginWithApple: builder.mutation({
      query: ({ access_token, id_token }) => {
        return {
          url: '/modules/social-auth/apple/login/',
          method: 'POST',
          body: {
            access_token,
            id_token
          }
        }
      }, invalidatesTags: []
    }),

    chargePayment: builder.mutation({
      query: (sub_id, card_id) => {
        return {
          url: '/api/v1/charge-payment/',
          method: 'POST',
          body: {
            sub_id: sub_id,
            card_id: card_id
          }
        }
      },
    }),

    deleteCard: builder.mutation({
      query: (id) => {
        return {
          url: '/api/v1/payments/revoke_payment_method/',
          method: 'DELETE',
          body: {
            payment_method: id
          }
        }
      }, invalidatesTags: ['GetAllCard']
    }),

    markAsPrimary: builder.mutation({
      query: (id) => {
        return {
          url: '/api/v1/payments/set_default/',
          method: 'POST',
          body: {
            payment_method: id
          }
        }
      }, invalidatesTags: ['GetAllCard']
    }),

    getFolderDetails: builder.query({
      query: (folderId) => {
        return {
          url: `/api/v1/folders/${folderId}/`,
          method: 'GET',
        }
      },
      providesTags: ['Folder'],
    }),

    deleteFolder: builder.mutation({
      query: (folder_id) => {
        return {
          url: `/api/v1/folders/${folder_id}/`,
          method: 'DELETE',
        }
      }, invalidatesTags: ['Folder', 'Folders']
    }),

    uploadFiles: builder.mutation({
      query: (formdata) => {
        const { file, folderId } = formdata;
        console.log('form data', file, folderId);
        const form = new FormData();
        form.append('folder_id', folderId || '44');
        form.append('file', file);
        return {
          url: '/api/v1/upload-file/',
          method: 'POST',
          body: form
        }
      }, invalidatesTags: ['Folder']
    }),

    deleteFile: builder.mutation({
      query: (file_id) => {
        return {
          url: `/api/v1/files/${file_id}/`,
          method: 'DELETE',
        }
      }, invalidatesTags: ['Folder']
    }),

    getMyProfile: builder.query({
      query: () => {
        return {
          url: `/users/profile/`,
          method: 'GET',
        }
      },
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation({
      query: (dataToSubmit) => {

        const userId = dataToSubmit.id;
        delete dataToSubmit.id;
        const form = new FormData();
        Object.keys(dataToSubmit).map(element => {
          console.log('form data...', element, dataToSubmit[element]);
          form.append(element, dataToSubmit[element]);
        });

        return {
          url: `/users/profile/${userId}/`,
          method: 'PUT',
          body: form
        }
      }, invalidatesTags: ['Profile']
    }),

    getSubscriptionsAndPackages: builder.query({
      query: () => '/api/v1/payments/plans/',
    }),

    sendFeedback: builder.mutation({
      query: ({ title, message }) => {
        return {
          url: '/api/v1/feedback/',
          method: 'POST',
          body: {
            title: title,
            message: message,
          }
        }
      },
    }),

    subscribePlan: builder.mutation({
      query: ({ payment_method, plan_ids }) => {
        return {
          url: '/api/v1/payments/subscribe/',
          method: 'POST',
          body: {
            payment_method: payment_method,
            plan_ids: plan_ids
          }
        }
      },
      invalidatesTags: ['Profile', 'Buddies']
    }),

    getStorage: builder.query({
      query: () => '/users/storage-capacity/'
    }),

    verifyOtp: builder.mutation({
      query: ({ code, email }) => {
        console.log('code', code);
        console.log('email', email);
        return {
          url: '/users/reset-password/verify/',
          method: 'POST',
          body: {
            token: code,
            email,
          }
        }
      },
    }),

    setNewPassword: builder.mutation({
      query: ({ confirmNewPassword, email }) => {
        return {
          url: '/users/set/password/',
          method: 'POST',
          body: {
            password: confirmNewPassword,
            email,
          }
        }
      },
    }),

    getBuddies: builder.query({
      query: () => {
        return {
          url: '/users/buddy-invitation/',
          method: 'GET',
        }
      },
      transformResponse: (res) => {
        if (res?.results?.length) {
          return res.results
        }
        return []
      },
      providesTags: ['Buddies']
    }),

    addBuddy: builder.mutation({
      query: ({ email, relationship, member_type }) => {
        // console.log('Buddy...:', { email, relationship });
        return {
          url: '/users/buddy-invitation/',
          method: 'POST',
          body: {
            email,
            relationship,
            member_type
          }
        }
      },
      invalidatesTags: ['Buddies']
    }),

    deleteBuddy: builder.mutation({
      query: (id) => {
        return {
          url: `users/buddy-invitation/${id}/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Buddies']
    }),

    createFolder: builder.mutation({
      query: (name) => {
        return {
          url: '/api/v1/folders/',
          method: 'POST',
          body: { name }
        }
      },
      invalidatesTags: ['Folders']
    }),

    getFolders: builder.query({
      query: () => {
        return {
          url: `/api/v1/folders/?limit=${100}&offset=${0}`,
          method: 'GET',
        }
      },
      providesTags: ['Folders']
    }),

    renameFolder: builder.mutation({
      query: (folder) => {
        return {
          url: `/api/v1/folders/${folder.id}/`,
          method: 'PUT',
          body: { ...folder }
        }
      },
      invalidatesTags: ['Folders']
    }),

    getCountries: builder.query({
      query: () => {
        return {
          url: 'https://countriesnow.space/api/v0.1/countries',
          method: 'GET',
        }
      },
    }),

    addSwapSubscription: builder.mutation({
      query: (items) => {
        return {
          url: '/api/v1/payments/swap_plan/',
          method: 'PATCH',
          body: {
            items: items
          }
        }
      },
      invalidatesTags: ['Profile', 'Buddies']
    }),

    addAddOns: builder.mutation({
      query: (price_id) => {
        const form = new FormData();
        form.append('price_id', price_id);
        return {
          url: '/api/v1/payments/additional_plan/',
          method: 'POST',
          body: form
        }
      },
      invalidatesTags: ['Profile', 'Buddies']
    }),

    getTransactionsHistory: builder.query({
      query: () => {
        return {
          url: '/api/v1/payments/transactions/',
          method: 'GET',
        }
      },
    }),


  }),
  overrideExisting: true,
})

export const {
  useGetCardsQuery,
  useGetPaymentsQuery,
  useGetAllCardsQuery,
  useChargePaymentMutation,
  useDeleteCardMutation,
  useAddCardMutation,
  useGetFolderDetailsQuery,
  useUploadFilesMutation,
  useDeleteFolderMutation,
  useDeleteFileMutation,
  useUpdateProfileMutation,
  useGetMyProfileQuery,
  useMarkAsPrimaryMutation,
  useLoginWithAppleMutation,
  useGetSubscriptionsAndPackagesQuery,
  useSendFeedbackMutation,
  useSubscribePlanMutation,
  useVerifyOtpMutation,
  useGetStorageQuery,
  useSetNewPasswordMutation,
  useGetBuddiesQuery,
  useAddBuddyMutation,
  useDeleteBuddyMutation,
  useCreateFolderMutation,
  useGetFoldersQuery,
  useRenameFolderMutation,
  useGetCountriesQuery,
  useAddSwapSubscriptionMutation,
  useAddAddOnsMutation,
  useGetTransactionsHistoryQuery,
} = api