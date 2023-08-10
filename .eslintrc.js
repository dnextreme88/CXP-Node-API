module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true,
    },
    extends: ['airbnb-base'],
    parserOptions: { ecmaVersion: 2018 },
    rules: {
        indent: [
            'error',
            4,
            { SwitchCase: 1 },
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'arrow-body-style': ['off'],
        'class-methods-use-this': ['off'],
        'no-param-reassign': ['off'],
        'no-plusplus': ['off'],
        'object-curly-newline': ['off'],
    },
};
