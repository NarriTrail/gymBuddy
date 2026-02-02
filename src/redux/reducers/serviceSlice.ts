import { createSlice } from "@reduxjs/toolkit";


const initialState={
    locatoinStatus:{
        isDeviceLocationEnabled:true,
        isAppLocationEnabled:true,

    }
}
const serviceSlice=createSlice({
    name:'serviceSlice',
    initialState,
    reducers:{
        setLocationStatus:(state,action)=>{
            if ('appLocationStatus' in action.payload) {
                state.locatoinStatus.isAppLocationEnabled = action.payload.appLocationStatus;
            }
            if ('deviceLocationStatus' in action.payload) {
                state.locatoinStatus.isDeviceLocationEnabled = action.payload.deviceLocationStatus;
            }
        }
    }
})
export const {setLocationStatus}=serviceSlice.actions
export default serviceSlice.reducer