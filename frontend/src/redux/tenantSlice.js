import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchTenants, addTenant, fetchTenantById, updateTenant } from '../services/tenantServices'

const initialState = {
    tenants: [],
    status: 'idle',
    error: null,
    loading: false
}

export const fetchTenantsAsync = createAsyncThunk('tenants/fetchTenants', async () => {
    const response = await fetchTenants()
    return response
})

export const addTenantAsync = createAsyncThunk('tenants/addTenant', async (tenant) => {
    const response = await addTenant(tenant)
    return response
})

export const fetchTenantByIdAsync = createAsyncThunk('tenants/fetchTenantById', async (tenantId) => {
    const response = await fetchTenantById(tenantId)
    return response
})

export const updateTenantAsync = createAsyncThunk('tenants/updateTenant', async (tenant) => {
    const response = await updateTenant(tenant)
    return response
})

const tenantSlice = createSlice({
    name: 'tenants',
    initialState,
    reducers: {
        addTenant: (state, action) => {
            state.tenants.push(action.payload)
        },
        updateTenant: (state, action) => {
            const { id, name, phone, houseId } = action.payload
            const existingTenant = state.tenants.find(tenant => tenant.id === id)
            if (existingTenant) {
                existingTenant.name = name
                existingTenant.phone = phone
                existingTenant.houseId = houseId
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenantsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTenantsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tenants = action.payload
            })
            .addCase(fetchTenantsAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addTenantAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addTenantAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tenants.push(action.payload)
            })
            .addCase(addTenantAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchTenantByIdAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTenantByIdAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tenants.push(action.payload)
            })
            .addCase(fetchTenantByIdAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateTenantAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateTenantAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tenants.push(action.payload)
            })
            .addCase(updateTenantAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default tenantSlice.reducer