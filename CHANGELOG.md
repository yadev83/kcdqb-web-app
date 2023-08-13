# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2023-08-13

### Added
- CDN Routes
    - /api/cdn/list => Lists all the files in the server's /cdn folder (root of the repo)
- .gitignore updated to ignore the /cdn folder. You might have to create a /cdn folder manually in your repo if using /api/cdn routes
- server is now able to serve files to download on :API_URL/cdn/:filename (need a /cdn folder in the project)
- frontend for downloadable files on the react client app

### Changed
- Changed the API_URL for dev env : now using localhost:3001 (necessary for the downloadable files)

### Fixed
- Fixes the issue with proxying to back end on prod env

## [0.1.1] - 2023-08-12

### Added

- 404 page
- Navbar Layout
- Server Info component

### Fixed
- Updated package.json with all possible latest versions
- Peer Deps dependencies : rolled back packages versions to valid ones for concerned items (mainly react)
- New requirements for node / npm versions (see Readme)

## [0.1.0] - 2023-08-12

### Added

- Basic React app with Express Rest API setup