module.exports = {
    plugins: [
        ['autoprefixer'],
        [
            'postcss-plugin-px2rem',
            {
                rootValue: 100, // 根元素的fontSize值，如这里写100,则css中 10px终被转换成10/100=0.1rem
                exclude: /(node_modules)/,
                minPixelValue: 1, // 1px以上的生效
                selectorBlackList: ['html', '.px'], //忽略转换的选择器
                propBlackList: ['max-width', 'max-height', 'min-width', 'min-height'] //忽略转换的css属性
            }
        ]
    ]
};
