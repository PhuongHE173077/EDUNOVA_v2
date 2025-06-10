
import axiosCustomize from '@/lib/axios.customize';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    conversations: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false
}

export const fetchConversations = createAsyncThunk(
    'chat/fetchConversations',
    async () => {
        const res = await axiosCustomize.get('v1/conversations')
        return res.data
    }
)

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (userId: string) => {
        const res = await axiosCustomize.get(`v1/messages/${userId}`)
        return res.data
    }
)

export const createMessage = createAsyncThunk(
    'chat/createMessage',
    async ({ cid, data }: { cid: string; data: any }) => {
        const res = await axiosCustomize.post('v1/messages/' + cid, data)
        return res.data
    }
)


export const chatSlide = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        activeConversation: (state, action) => {
            state.selectedUser = action.payload
        },

        updateConversations: (state, action) => {
            state.conversations = action.payload
        },

        updateMessages: (state, action) => {
            state.messages = action.payload
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.pending, (state, action) => {
            state.isUsersLoading = true
        })
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            state.conversations = action.payload
            state.isUsersLoading = false
        })

        builder.addCase(fetchMessages.pending, (state, action) => {
            state.isMessagesLoading = true
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isMessagesLoading = false
        })
        builder.addCase(createMessage.fulfilled, (state, action) => {
            state.messages = action.payload.messages
            state.conversations = action.payload.conversations

        })
    }
})

export const { activeConversation, updateConversations, updateMessages } = chatSlide.actions

export default chatSlide.reducer;