module.exports = {
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": []
    },
    "parser": "babel-eslint",
    "env": {
        "browser": true
    }
};