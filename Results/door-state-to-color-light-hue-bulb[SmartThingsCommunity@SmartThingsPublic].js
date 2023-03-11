
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens/closese...', section => {
            section.deviceSetting('doorSensor').capability(['doorControl']).name('Select CoopBoss');
            section.deviceSetting('bulbs').capability(['colorControl']).name('pick a bulb');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'doorControl', 'doorState', 'coopDoorStateHandler')

    })

    .subscribedEventHandler('coopDoorStateHandler', (context, event) => {
        
        console.log("${event.descriptionText}, ${event.value}")
        let color = 'White'
        let hueColor = 100
        let saturation = 100
        Map hClr = [:]
        hClr.hex = '#FFFFFF'
        switch (event.value) {
        case 'open':
        color = 'Blue'
        break
        case 'opening':
        color = 'Purple'
        break
        case 'closed':
        color = 'Green'
        break
        case 'closing':
        color = 'Pink'
        break
        case 'jammed':
        color = 'Red'
        break
        case 'forced close':
        color = 'Orange'
        break
        case 'unknown':
        color = 'White'
        break
        }
        switch ( color ) {
        case 'White':
        hueColor = 52
        saturation = 19
        break
        case 'Daylight':
        hueColor = 53
        saturation = 91
        break
        case 'Soft White':
        hueColor = 23
        saturation = 56
        break
        case 'Warm White':
        hueColor = 20
        saturation = 80
        break
        case 'Blue':
        hueColor = 70
        hClr.hex = '#0000FF'
        break
        case 'Green':
        hueColor = 39
        hClr.hex = '#00FF00'
        break
        case 'Yellow':
        hueColor = 25
        hClr.hex = '#FFFF00'
        break
        case 'Orange':
        hueColor = 10
        hClr.hex = '#FF6000'
        break
        case 'Purple':
        hueColor = 75
        hClr.hex = '#BF7FBF'
        break
        case 'Pink':
        hueColor = 83
        hClr.hex = '#FF5F5F'
        break
        case 'Red':
        hueColor = 100
        hClr.hex = '#FF0000'
        break
        }
        bulbs*.setHue(hueColor)
        bulbs*.setSaturation(saturation)
        bulbs*.setColor(hClr)
        

	})
