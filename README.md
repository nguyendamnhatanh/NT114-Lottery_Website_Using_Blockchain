# Frontend of Lottery_Website_Using_Blockchain

## Set Up

### Pull from Github

Run `npm install`.

### Set up from scratch (Read this for information/debug only, no need to execute any of instructions below)

Create with ViteJS. Run: 
```
npm create vite@latest
```
Choose React and Javascript.

After Vite create template run: 

```
npm install
```

After the installation complete. Run: 

```
npm run dev
```

to start development server.

Stop the server, modify `package.json` file. Add `--open` into `dev` tag. It should look like this:
```
"dev": "vite --open"
```
By doing this. The development server will automatically open browser.

Stop the server, for deployment, first install `rimraf`. This package is similar with `rm -rf` command in Linux. Use this to remove `build` folder.
```
npm install --save rimraf
```

Modify the `build` command: 
```
"build": "rimraf build && vite build --outDir ./build",
```
So whenever you run `vite build` it will automatically remove the `build` folder and create new one, to avoid some unexpected overwrite error. `--outDir ./build` specify that the build folder will have the name `build` instead of default name `dist`.

The new script will now look like this:
```
"scripts": {
    "dev": "vite --open",
    "build": "rimraf build && vite build --outDir ./build",
    "preview": "vite preview"
},
```
System setup complete. Install the following package
* React-Router-Dom version 6: Routing in the app
* Axios: Call API
* React-Icons: Community icon as JSX Component
* Redux: Required package for React-redux
* React-Redux: Required package for Redux Toolkit
* Redux Toolkit: Creating Redux store
* Tailwind: Dev Dependencies only

Run the following command: 
```
npm install --save axios react-router-dom@6 react-icons redux react-redux @reduxjs/toolkit
```

With Tailwind. From [Tailwind installation guide with ViteJS](https://tailwindcss.com/docs/guides/vite)

Run the following sequence:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Go to `tailwind.config.js`. Replace the `content: []` with 
```
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
```
Find the `index.css` file. Remove all default css. Add: 
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Folder Structure

The project's folder structure shown below. Read the description for more infomation

```
├───public         #folder for index.html file, all the import in the index.html is from here to seperate with /src/assets folder
└───src            #code folder
    ├───assets     #css folder, image folder, font folder, video folder, .etc
    ├───components #JSX component folder, this folder can have multiple sub-folder depend on each requirement, such as: header, footer, .etc
    │   └───demo   #demo folder
    ├───redux      # store all files relate with redux
    │   └───slice  #store all slice files
    └───utils      #global function, variable, .etc. Contain all the code can be used everywhere in the project.
```

## Code Rules

### File extension rules

As describe in Vite.js docs. All the React Component should be `.jsx` extension. Meaning that, if the file contain bot Javascript and HTML, use `.jsx`, if contain HTML only or Javascript only, use `.html` or `.js`

### JSX component

Use arrow functional component for all JSX component. As we use React Hooks, neither component life-cycle nor class component, so we don't need `this` Object. One more thing about `this` Object is the scope problem, without experience with JS, don't use it as it will cause some weird behaviour.

```
let A = { <- this guy have his `this`
  dummy: 3,
  foo: function() { <- this guy also have a `this`
    console.log(this.dummy) <- who the f is dummy ? He will call his parent. Print out [object Window]
  }
}
```

The most common benefit of using arrow function is readable code. So consider using arrow function everywhere.

## Code sample

See all Demo code in the project



