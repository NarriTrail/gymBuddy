package com.gymbuddy

import android.content.Context
import android.location.LocationManager
import android.util.Log // ✅ Import Log for debugging
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: Context = reactContext

    init {
        Log.d("LocationModule", "LocationModule initialized") // ✅ Log when the module is initialized
    }

    override fun getName(): String {
        Log.d("LocationModule", "getName() called: LocationModule") // ✅ Log when getName() is called
        return "LocationModule"
    }

    @ReactMethod
    fun isLocationEnabled(promise: Promise) {
        Log.d("LocationModule", "isLocationEnabled() method called") // ✅ Log when method is called

        try {
            val locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
            val isEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                            locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)

            Log.d("LocationModule", "Location enabled: $isEnabled") // ✅ Log the location status
            promise.resolve(isEnabled)
        } catch (e: Exception) {
            Log.e("LocationModule", "Error checking location status", e) // ✅ Log any errors
            promise.reject("LOCATION_ERROR", "Failed to check location status", e)
        }
    }
}
