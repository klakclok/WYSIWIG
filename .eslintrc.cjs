module.exports = {
    root: true,
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        eqeqeq: 'off',
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
        'vue/valid-v-slot': [
            'error',
            {
                allowModifiers: true,
            },
        ],
        'vue/multi-word-component-names': 'off',
    },
}
