import dotenv from 'dotenv'
dotenv.config();
let configContainer = {

    /**
     * port setting
     */
    PORT: process.env.PORT,

    loadConfig: function loadConfig() {
        let node_env = (process.env.NODE_ENV),
            config = import('../' + node_env);
        config.node_env = config.NODE_ENV = node_env;
        return config;
    },
}

export default configContainer = configContainer;
