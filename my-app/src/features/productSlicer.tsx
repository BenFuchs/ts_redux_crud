import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { addData, getData, delData, updData } from './productAPI';
import { Product } from '../models/Product';

// state
export interface productState {
    products: Product[]
}

const initialState: productState = {
    products: []
};

// async
export const getDataAsync = createAsyncThunk(
    'product/getData',
    async () => {
        const response = await getData();
        return response.data;
    }
);

export const addDataAsync = createAsyncThunk(
    'product/addData',
    async (prod:Product) => {
        const response = await addData(prod);
        return response.data;
    }
)

export const delDataAsync = createAsyncThunk(
    'product/delData',
    async (id:String) => {
        console.log(id);
        const response = await delData(id);
        return response.data;
    }
)

export const updateDataAsync = createAsyncThunk(
    'product/updateData',
    async ({ prod, id }: { prod: { desc: string; price: number }; id: string }) => {
        const response = await updData(prod, id);
        return response.data; // Return the updated product from the server
    }
);


// Slicer
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addnum: (state, action) => {
            console.log(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataAsync.fulfilled, (state, action) => {
                state.products = action.payload
                console.log(action.payload);
            })
            .addCase(addDataAsync.fulfilled, (state, action) => {
                state.products.push(action.payload);
                console.log(action.payload);
            })
            .addCase(delDataAsync.fulfilled, (state, action) => {
                state.products=state.products.filter(item => action.payload.id != item.id);
                console.log(action.payload);
            })
            .addCase(updateDataAsync.fulfilled, (state, action: PayloadAction<Product>) => {
                const updatedProduct = action.payload;
            
                // Find the index of the product being updated
                const index = state.products.findIndex(product => product.id === updatedProduct.id);
            
                // If the product exists in the state, update it
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                    console.log('Product updated:', updatedProduct);
                }
            })
    },
});

export const selectProduct = (state: RootState) => state.product.products;
export default productSlice.reducer;