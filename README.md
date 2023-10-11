# Music Player
An open source music player showcasing various data structures as a university project made with react and typescript.
## How to run it locally
For development setup first clone the repo in your local machine, then inside folders "frontend", "backend" and "shared" each run ```npm install``` command. I'm using [concurrently](https://www.npmjs.com/package/concurrently) for the development stage which is required to run both server at a time so run ```npm install concurrently -g``` in a terminal window.
This is an **offline music player** so you have to manually put your musics on the server for the app to work(Just like other offline music players). To do this just create a folder like this ```backend/public/music``` and another folder named "covers" to save our covers' picture, then copy paste your musics in the "music" folder.
Now run two seperate terminal one in "backend" and one in "frontend". Run ```npm run dev``` on each and you should be good to go. 
Default port for server is 5000 and for client 5173. If these ports are used by other apllication(s), change the ports manually. For server go to ```backend/src/server/server.ts``` at line 26 change the ```PORT = 5000``` value. For the client side, go to ```frontend/vite.config.js``` you can change the port as followed: 
```
export default defineConfig({
  plugins: [react()],
  // other configs...
  server: {
    port: yourDesiredPort,
  },
 // other configs... 
});
```
## Features
You can create playlist, add songs to a queue, search the library and track your recenty played songs.
Shout out to [Amirali Nrp](https://github.com/Amirali-Nrp) for pointing at some bugs.
Feel free to inform me if you found any bugs.
