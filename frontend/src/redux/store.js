import {configureStore} from '@reduxjs/toolkit';
import tenantReducer from './tenantSlice';




export default configureStore({
    reducer: {
        tenants: tenantReducer
    }
})

