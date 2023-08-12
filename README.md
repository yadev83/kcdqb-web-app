# KCDQB Web app

### `development`
To start both the client app and the rest api server : `npm run dev`

### `deployment`
`npm build` followed by `serve -s build` to serve the static build on the default 3000 port. (only for client)  
Still need to have `npm run server` running for the rest api  
recommended to use pm2 to have both the static site and api server running as services on a debian host

### Dependencies  
Made possible using `create-react-app`, `npm` and `express`