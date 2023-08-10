// Process manager (PM2) if/when the handling of clustering should be done here
module.exports = {
    apps: [
        {
            name: 'CXP-Node-API',
            script: 'bin/www',
            env_production: { NODE_ENV: 'production' },
        },
    ],
    deploy: {
        production: {
            user: 'nodejs',
            host: '<CHANGE_TO_YOUR_HOST>',
            ref: 'origin/master',
            repo: '<CHANGE_TO_YOUR_GITHUB_REPO>',

            // Make sure this directory exists on your server or change this entry to match your directory structure
            path: '/home/nodejs/deploy',

            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
        },
    },
};
