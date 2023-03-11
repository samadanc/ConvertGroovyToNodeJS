
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('master').capability(['colorControl']).name('Master Virtual Fibaro...');

        });


        page.section('And these Fibaro RGBW will follow...', section => {
            section.deviceSetting('slaves').capability(['colorControl']).name('Slave Fibaro RGBWs...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'adjustedColor', 'switchAdjustedColorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'presetColor', 'switchPresetColorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'level', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch.setLevel', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'whiteLevel', 'switchWhiteLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        let dimmerValue = masters.latestValue('level')
        slaves?.on()
        

	})

    .subscribedEventHandler('switchWhiteLevelHandler', (context, event) => {
        
        let level = event.value.toFloat()
        level = level.toInteger()
        log.info("switchWhiteLevelHandler Event: $level")
        slaves?.setWhiteLevel(level)
        

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        log.info("switchSetLevelHandler Event: $level")
        slaves?.setLevel(level)
        

	})

    .subscribedEventHandler('switchAdjustedColorHandler', (context, event) => {
        
        log.info("switchAdjustedColorHandler Event: ${event.value}")
        let colorMap = event.value.replace('"', '')
        colorMap = colorMap.replace('{', '')
        colorMap = colorMap.replace('}', '')
        console.log("Color Map: $colorMap")
        let map = [:]
        colorMap.split(',').each({ let param ->
        let nameAndValue = param.split(':')
        map[nameAndValue[0]] = nameAndValue[1]
        })
        slaves?.setAdjustedColor(map)
        

	})

    .subscribedEventHandler('switchPresetColorHandler', (context, event) => {
        
        log.info("switchPresetColorHandler Event: ${event.value}")
        switch (event.value) {
        case 'Soft White':
        slaves?.softwhite()
        break
        case 'Daylight':
        slaves?.daylight()
        break
        case 'Warm White':
        slaves?.warmwhite()
        break
        case 'Red':
        slaves?.red()
        break
        case 'Green':
        slaves?.green()
        break
        case 'Blue':
        slaves?.blue()
        break
        case 'Cyan':
        slaves?.cyan()
        break
        case 'Magenta':
        slaves?.magenta()
        break
        case 'Orange':
        slaves?.orange()
        break
        case 'Purple':
        slaves?.purple()
        break
        case 'Yellow':
        slaves?.yellow()
        break
        case 'White':
        slaves?.white()
        break
        case 'Fireplace':
        slaves?.fireplace()
        break
        case 'Storm':
        slaves?.storm()
        break
        case 'Deep Fade':
        slaves?.deepfade()
        break
        case 'Lite Fade':
        slaves?.litefade()
        break
        case 'Police':
        slaves?.police()
        break
        }
        

	})
