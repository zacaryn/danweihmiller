module.exports = {
  apps: [
    {
      name: 'danweihmiller-api',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      error_file: './logs/error.log',
      out_file: './logs/out.log'
    }
  ]
}; 