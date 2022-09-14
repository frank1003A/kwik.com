
import { createSlice, Draft, PayloadAction, current } from '@reduxjs/toolkit'
import { ObjectId } from 'mongodb'
import { nanoid } from 'nanoid'
import { initialProductData} from '../../components/Data/initialData'
import products from '../../model/products'
import type { RootState } from './store'

type ProductState = {
  product: Array<products>
  bind: boolean
}

type Pload = {
    products?: products,
    /**
     * Items that have been selected to be used in the 
     * invoice page are not bind by default.
     * This means that changes in the invoice do not affect it.
     * By binding the items, changes in the invoice will reflect 
     * in the invoice.
     */
    bindData?: boolean,
    Id?: string | number | ObjectId
}

const initialState: ProductState = { 
    product : [],
    bind: false
}

const productSlice = createSlice({ 
    name: 'product', 
    initialState,
    reducers : {
      updateProductSelected: (state, action: PayloadAction<Pload>) => {
        const productsSelected = action.payload.products
        state.product.push(productsSelected!)
      },
      createBind: (state, action: PayloadAction<Pload>) => {
        const bindSet = action.payload.bindData
        if (bindSet !== undefined) state.bind = bindSet
      },
      updateProducts: (state, action: PayloadAction<Pload>) => {
        const Id = action.payload.Id
        let newProduct = state.product.filter((p) => p._id !== Id)
        state.product = newProduct
      },
      clearProducts: (state) => {
        state.product.splice(0, state.product.length)
      }
    }
})

export const { 
    updateProductSelected,
    createBind,
    updateProducts,
    clearProducts,
} = productSlice.actions

export const product = (state: RootState) => {
  state.product.product
  state.product.bind
}

export default productSlice.reducer

