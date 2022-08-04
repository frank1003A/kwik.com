import { createSlice, Draft, PayloadAction, current } from '@reduxjs/toolkit'
import { initialClientData } from '../../../components/Data/initialData'
import clients from '../../../model/clients'
import type { RootState } from './store'

type ClientState = {
  client: clients
}

type Pload = {
    client: clients
}

const initialState: ClientState = { 
    client : {}
}

const clientSlice = createSlice({ 
    name: 'client', 
    initialState,
    reducers : {
      updateClient: (state, action: PayloadAction<Pload>) => {
        const clientSelect = action.payload.client
        state.client = clientSelect
      },
      clearCleint: (state) => {
        state.client = {}
      }
    }
})

export const { 
    updateClient
} = clientSlice.actions

export const client = (state: RootState) => state.client.client

export default clientSlice.reducer

