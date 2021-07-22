module.exports = {
  apps: [
    {
      name: 'shopping-site-server-prod',
      script: 'npm',
      args: 'run start-prod',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
