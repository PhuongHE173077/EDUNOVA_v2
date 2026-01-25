module.exports = {
    apps: [
        {
            name: "devCenter360",
            script: "npm",
            args: "run production",
            env: {
                BUILD_MODE: "dev"
            },
            env_production: {
                BUILD_MODE: "production"
            }
        }
    ]
};
