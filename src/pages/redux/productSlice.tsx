
import { createSlice, Draft, PayloadAction, current } from '@reduxjs/toolkit'
import { ObjectId } from 'mongodb'
import { initialProductData} from '../../../components/Data/initialData'
import products from '../../../model/products'
import type { RootState } from './store'

type ProductState = {
  product: Array<products>
}

type Pload = {
    products?: products,
    Id?: string | number | ObjectId
}

const initialState: ProductState = { 
    product : []
}

const productSlice = createSlice({ 
    name: 'product', 
    initialState,
    reducers : {
      updateProductSelected: (state, action: PayloadAction<Pload>) => {
        const productsSelected = action.payload.products
        state.product.push(productsSelected!)
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
    updateProducts,
    clearProducts
} = productSlice.actions

export const product = (state: RootState) => state.product.product

export default productSlice.reducer

