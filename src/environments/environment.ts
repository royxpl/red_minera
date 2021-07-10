// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM",
    authDomain: "red-minera-2021.firebaseapp.com",
    databaseURL: "https://red-minera-2021-default-rtdb.firebaseio.com",
    projectId: "red-minera-2021",
    storageBucket: "red-minera-2021.appspot.com",
    messagingSenderId: "388589353986",
    appId: "1:388589353986:web:3b54c41775ea4044f93b1b"
  },
  CountryJson: [
    { name: 'Argentina', dial_code: '+35', code: 'AR' },
    { name: 'Bolivia', dial_code: '+21', code: 'BL' },
    { name: 'Brazil', dial_code: '+84', code: 'BR' },
    { name: 'Chile', dial_code: '+36', code: 'CL' },
    { name: 'Colombia', dial_code: '+44', code: 'CO' },
    { name: 'Ecuador', dial_code: '+14', code: 'EC' },
    { name: 'Peru', dial_code: '+51', code: 'PE' },
    { name: 'Uruguay', dial_code: '+54', code: 'UR' },
    { name: 'Venezuela', dial_code: '+37', code: 'VN' },
    ]


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
