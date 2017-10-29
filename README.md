This is a demo app developed using React-Native using Handwriting.io API


## Running

1 -Clone the repository 

2- Install dependencies using `npm install` or `yarn install`

3- Replace the $USER and the $SECRET fields in `/src/config/constants/`

4- Run 'react-native run-android' or `react-native run-ios` depending on your prefered platform


## Dependencies Used
`react-native v0.48.4`
`axios v0.17.0` - Used to manage API authentication and requests

## Useful Scripts
### `npm start`

Runs your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

