# ionic-photo-sharing
From tutorial https://www.youtube.com/watch?v=jHy1whzDk1s

My version of the excellent tutorial by Diligent Dev.

The only major deviation is I'm using the Firebase V9 modular SDK so the syntax and how things are imported and used is a bit different.

## Configuration

After setting up your Firebase project you'll need to paste your configuration into a `firebaseConfig.ts` file in the `src` directory, and that is 
imported into `main.ts`. There's an example of the format in `src/firebaseConfigSample.ts`.
