# ionic-photo-sharing
From tutorial https://www.youtube.com/watch?v=jHy1whzDk1s

My version of the excellent tutorial by Diligent Dev.

Some differences from the tutorial since it's a couple of years old:
 1. I'm using the Firebase V9 modular SDK so the syntax and how things are imported and used is a bit different
 1. The Capacitor Camera API has been updated so the imports and syntax are a bit different
 1. I added the Capacitor PWA Elements (https://capacitorjs.com/docs/web/pwa-elements) so the camera could be used in the browser for testing

## Configuration

After setting up your Firebase project you'll need to paste your configuration into a `firebaseConfig.ts` file in the `src` directory, and that is 
imported into `main.ts`. There's an example of the format in `src/firebaseConfigSample.ts`.
