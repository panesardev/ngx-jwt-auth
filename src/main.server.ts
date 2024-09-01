import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
  ]
});

const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);

export default bootstrap;