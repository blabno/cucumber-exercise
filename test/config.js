module.exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'cucumber',

    // Spec patterns are relative to this directory.
    specs: [
        'features/**/*.feature'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://www.realskill.io',

    allScriptsTimeout: 40000,

    cucumberOpts: {
        require: 'features/**/*.js',
        format: 'pretty',
        timeout: 20000
    }
};
