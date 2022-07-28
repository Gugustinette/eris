# Eris
<p align="center">
    <img src="src/assets/logo.png">
</p>

Eris is a chrome extension that allows you to customize the look and feel of websites.<br>
It works by injecting CSS into pages for certain domains.<br>
The extension lets you create, manage and share custom themes.

## Initialization
You first need to give all permissions to the scripts.
Run this command :
```
chmod 777 ./scripts/*
```

## Project setup for extension
All commands concerning the extension start with `ext`.
- `ext:install`: Install all dependencies.
- `ext:uninstall`: Uninstall all dependencies.
- `ext:serve`: Serve the extension for development.
- `ext:serve-prod`: Serve the extension for development with production mode.
- `ext:build`: Build the extension for distribution.
- `ext:lint`: Lint the extension code.

## Project setup for server
All commands concerning the server start with `server`.
- `server:install`: Install all dependencies.
- `server:dev`: Serve the server for development.
- `server:deploy`: Build & deploy the server to local machine.
    - You need [pm2](https://www.npmjs.com/package/pm2) installed globally on your system.
Server is running on port [9050](http://localhost:9050/).

## Project setup for website
All commands concerning the website start with `website`.
- `website:install`: Install all dependencies.
- `website`: Serve the website for development.
- `website:deploy`: Build & deploy the website to local machine.
    - You need [pm2](https://www.npmjs.com/package/pm2) installed globally on your system.
    - You need [serve](https://www.npmjs.com/package/serve) installed globally on your system.
Website is running on port [9060](http://localhost:9060/).

## Made by
- [Augustin MERCIER "Gugustinette"]( https://twitter.com/gugustinette )
- [Jason MOULIN "Zukaarimoto"]( https://sallt.fr )
