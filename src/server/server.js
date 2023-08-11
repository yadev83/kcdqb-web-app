import express from 'express'
import logger from 'morgan'

import bootstrap from './bootstrap'

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'

const server = express()

server.use(logger('tiny'))

// Setup favicon path
const publicPath = path.join('public')
const srcPath = path.join('src')

const faviconPath = path.join(publicPath, 'favicon.ico')
server.use(favicon(faviconPath))

// Setup assets path
server.use('/assets', express.static(path.join(__dirname, publicPath)))

server.use('/download/:filename', (req, res) => {
    const filePath = path.join('/home/web/downloadable', req.params.filename)
    if(!fs.existsSync(filePath))
        return res.sendStatus(404)

    return res.download(path.join('/home/web/downloadable', req.params.filename))
})

server.use('/pack', (req, res) => {
    res.download('/home/web/kcdqb-pack.zip')
})

server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)

	// Pass to next layer of middleware
	next()
})

// no crawlers
server.use('/robots.txt', (req, res) => {
	res.type('text/plain')
	res.send('User-agent: *\nDisallow: /')
})

server.use('/', bootstrap())

export default server