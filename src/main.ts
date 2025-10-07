import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// // Mock Service Worker
// import { worker } from './app/mocks/browser';
// // Flag manual para desarrollo
// const isDev = true;

// // Solo iniciar MSW en desarrollo
// if (isDev) {
//   worker.start().then(() => {
//     console.log('Mock Service Worker iniciado');
//   });
// }

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

