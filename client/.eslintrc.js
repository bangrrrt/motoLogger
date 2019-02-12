module.exports = {
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": [],
        'react/prefer-stateless-function': 0,
        "jsx-a11y/label-has-for": [ 2, {
            "components": [ "Label" ],
            "required": {
                "some": [ "nesting", "id" ]
            },
            "allowChildren": false
        }]
    },
    "parser": "babel-eslint",
    "env": {
        "browser": true
    }
};
