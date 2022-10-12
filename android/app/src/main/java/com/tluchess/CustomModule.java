package com.tluchess;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public static Callback destroyFunction;

    private final LifecycleEventListener mLifecycleEventListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {

        }

        @Override
        public void onHostPause() {

        }

        @Override
        public void onHostDestroy() {
            destroyFunction.invoke();
        }
    };

    CustomModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        reactContext.addLifecycleEventListener(mLifecycleEventListener);
    }

    @ReactMethod
    public void setOnDestroy(Callback destroyFunctionParam) {
        destroyFunction = destroyFunctionParam;
    }

    @NonNull
    @Override
    public String getName() {
        return "ABC";
    }
}
