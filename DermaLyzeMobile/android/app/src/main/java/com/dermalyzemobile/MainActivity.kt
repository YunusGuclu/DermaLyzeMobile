// android/app/src/main/java/com/dermalyzemobile/MainActivity.kt

package com.dermalyzemobile

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

  /**
   * JS tarafındaki AppRegistry.registerComponent adını buraya birebir yaz.
   * app.json’daki "name": "DermaLyzeMobile" olmalı.
   */
  override fun getMainComponentName(): String = "DermaLyzeMobile"

  /**
   * RootView olarak GestureHandler’ın sağladığı sınıfı kullanıyoruz.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      override fun createRootView(): RNGestureHandlerEnabledRootView {
        return RNGestureHandlerEnabledRootView(this@MainActivity)
      }
    }
  }
}
