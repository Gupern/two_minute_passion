// 管理各环境配置信息的工程文件 利用node.js处理配置信息
/**
 * 根据命令行运行参数，修改/config.js 里面的项目配置信息，
 */
const fs = require('fs')
const path = require('path')
console.log(path)
console.log(__dirname)
//源文件
const sourceFiles = {
    prefix: '/config/env/',
    dev: 'dev.json',
    prod: 'prod.json'
}
//目标文件
const targetFiles = [{
    prefix: '/',
    filename: 'projectConfig.js'
}]
const preText = 'module.exports = '
// 获取命令行参数
const cliArgs = process.argv.splice(2)
const env = cliArgs[0]
// 判断是否是 prod 环境
const isProd = env.indexOf('prod') > -1 ? true : false
// 根据不同环境选择不同的源文件
const sourceFile = isProd ? sourceFiles.prod : sourceFiles.dev
// 根据不同环境处理数据
console.log(__dirname + sourceFiles.prefix + sourceFile)
fs.readFile(__dirname + sourceFiles.prefix + sourceFile,
    (err, data) => {
        if (err) {
            throw new Error(`Error occurs when reading file ${sourceFile}.nError detail: ${err}`)
            process.exit(1)
        }
        
        // 获取源文件中的内容
        const targetConfig = JSON.parse(data)
        console.log("data", targetConfig)
        // 将获取的内容写入到目标文件中
        targetFiles.forEach(function (item, index) {
            let result = null
            result = preText + JSON.stringify(targetConfig, null, 2)
            console.log(result)
            // 写入文件(这里只做简单的强制替换整个文件的内容)
            console.log(__dirname + item.prefix + item.filename)
            fs.writeFile(__dirname + item.prefix + item.filename, result, 'utf8', (err) => {
                if (err) {
                    throw new Error(`error occurs when reading file ${sourceFile}. Error detail: ${err}`)
                    process.exit(1)
                }
            })
        })
    })