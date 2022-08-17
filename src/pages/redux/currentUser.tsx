import { createSlice, Draft, PayloadAction, current } from '@reduxjs/toolkit'
import { initialUserData } from '../../../components/Data/initialData'
import user from '../../../model/user'
import type { RootState } from './store'

type userState = {
  user: user
}

type Pload = {
    user: user
}

const initialState: userState = { 
    user : {}
}

const userSlice = createSlice({ 
    name: 'user', 
    initialState,
    reducers : {
      updateUser: (state, action: PayloadAction<Pload>) => {
        const cUser = action.payload.user
        state.user = cUser
      },
      clearUser: (state) => {
        state.user = {}
      }
    }
})

export const { 
    updateUser
} = userSlice.actions

export const userS = (state: RootState) => state.user.user

export default userSlice.reducer

