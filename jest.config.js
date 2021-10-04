module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
        "\\.svg$": "jest-svg-transformer"
    }
};