# Stan TV Coding Challenge

## Instructions

### Quick start

```sh
npm i
npm start
```
Then open [http://localhost:3000](http://localhost:3000)

### Build

```sh
npm run build
```

Then find `app.js`, `styles.css`, `logo.svg` and `index.html` in `dist` folder

### Test

```sh
npm run test
```

## The technical and architectural choices used in the project

* This is NOT a Creat-React-App project. Only essential dependencies are installed to keep it light and simple.

* The code structure follows `UI -> Controller -> Service` work flow.

* **Development tools:** `React + TypeScript + Babel`, use `@babel/preset-typescript` to help with TypeScript compilation.

* **Local server:** `web-dev-server`, since `BrowserRouter` of `react-router-dom` is adopted, set `historyApiFallback: true` to make local dev server only serve `index.html`

* **Building tools:** `webpack`, a couple of loaders are imported to deal with different kinds of files. Since `Babel` is mandatory in requirements, `babel-loader` is chosen rather than `ts-loader` for `.ts .tsx` files.

* **Route tooling:** `react-router-dom`, the path of 2 pages are `/` and `/program/id`, `id` is the parameter which determines the content displayed on program page.

* **State management:** `React context`.

* **Style tools:** `CSS Modules + classnames` to generate random class name for elements. More information about [classnames](https://www.npmjs.com/package/classnames).

* **Test tools:** `Jest + React testing library`.

## The improvements we could do in the future

* **Data fetching:** If there are more programs in database, just fetch a certain number of data once in order to optimize the performance and the response size. For the same reason, we could fetch program by id in `program` page if it's not in state.

* **Lint:** Add eslint, prettier, husky etc to standardize the development and deploy process.

* **Responsive:** Improve the styling part to make the App compatiable with more devices and browsers.

* **User experience:** Add arrow button on carousel for navigation. Add links and pages for navbar items.

## Some questions

* Since `styles.css` is required in `dist`, `Styled Components` may not be a good option, because `Styled Components` is a CSS-in-JS tool which could improve performance and it would be better not to extract it as a `.css` file.

* Sample data is stored in local file `data.json`, fetching data from local file could cause unnecessary path problems sometimes. An online json api was built via [https://mocki.io/fake-json-api](https://mocki.io/fake-json-api) for this project.

