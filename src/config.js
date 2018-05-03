const ENV = process.env.NODE_ENV;

const baseConfig = {
    development: {
        baseUrl: 'http://192.168.102.221/ws.php/customization/hema/ThirdPartyApiService/',
    },
    test: {
        baseUrl: 'http://star-test.cdpyun.com:88/ws.php/customization/hema/ThirdPartyApiService/',
    },
    uat: {
        baseUrl: 'http://star-test.cdpyun.com:88/ws.php/customization/hema/ThirdPartyApiService/',
    },
    pre: {
        baseUrl: 'http://101.37.146.44/ws.php/customization/hema/ThirdPartyApiService/',
    },
    production: {
        baseUrl: 'http://star.cdpyun.com/ws.php/customization/hema/ThirdPartyApiService/',
    },
};

module.exports = {
    env: baseConfig[ENV],
};
