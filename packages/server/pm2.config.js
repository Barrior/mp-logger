const os = require('os')

let instances = 1

// How to make socket.io work well with pm2 when start more than one instance?
// https://github.com/Unitech/pm2/issues/1510
if (process.env.PM2_MULTI_INSTANCE) {
  instances = Math.min(os.cpus().length, 4)
}

module.exports = {
  apps: [
    {
      name: 'mp-logger',
      script: 'dist/main.js',
      watch: false,
      exec_mode: 'cluster',
      instances,
      source_map_support: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
