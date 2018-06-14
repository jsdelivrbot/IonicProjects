import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'

import { ConfigurationService } from 'ionic-configuration-service'
import { LoggingService } from 'ionic-logging-service'

import { MyAppComponent } from '../app/app.component'
import { AuthService } from '../shared/services/auth-service'
import { HttpService } from '../shared/services/http-service'
import { StorageService } from '../shared/services/storage-service'

function loadConfiguration(
  configurationService: ConfigurationService,
): () => Promise<void> {
  return () => configurationService.load('assets/settings.json')
}

@NgModule({
  declarations: [MyAppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyAppComponent, {
      preloadModules: true,

      // https://stackoverflow.com/questions/41161705/ionic-2-form-goes-up-when-keyboard-shows
      // the following three lines fix form input scroll issues
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyAppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true,
    },
    LoggingService,
    HttpService,
    StorageService,
  ],
})
export class AppModule {}
