const defaultConfig = require("./configurationsFolder/defaultConfiguration")
const s20feConfig = require("./configurationsFolder/s20feConfiguration")
const note7proConfig = require("./configurationsFolder/note7proConfiguration")

const configurations = {}

function plainConfigs(config) {
    const plainConfig = {}
    for (const [key, value] of Object.entries(config)) {
        let plainList = []
        for (let index = 0; index < value.benchs.length; index++) {
            const bench = value.benchs[index];
            const bench_parameters = value.parameters[bench]
            for (let index = 0; index < bench_parameters.length; index++) {
                const parameter = bench_parameters[index];
                plainList.push(bench + "-" + parameter)
            }
        }
        plainConfig[key] = plainList
    }
    return plainConfig
}

function addConfig(config){
    configurations[config.key] = {
        "benchmarks": plainConfigs(config.benchmarks),
        "start_execution": config.start_execution,
        "end_execution": config.end_execution
    }
}

function getConfiguration(device) {
    if (device in configurations) {
        return configurations[device]
    } else {
        return configurations["default"]
    }
}



addConfig(defaultConfig)
addConfig(s20feConfig)
addConfig(note7proConfig)

module.exports = { getConfiguration }