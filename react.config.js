require('dotenv').config();

module.exports = {
    env: {
        REACT_APP_API_URL = process.env.REACT_APP_API_URL,
        REACT_APP_WS_URL = process.env.REACT_APP_WS_URL,
    },
};