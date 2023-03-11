
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light(s)', section => {
            section.deviceSetting('lights').capability(['colorControl']).name('Colored Light');

        });


        page.section('Switch(es)', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.numberSetting('lightLevel').name('Light Level? (1-99)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'on') {
        let hueColor = 70
        let saturation = 100
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
        break
        case 'Green':
        hueColor = 39
        break
        case 'Yellow':
        hueColor = 25
        break
        case 'Orange':
        hueColor = 10
        break
        case 'Purple':
        hueColor = 75
        break
        case 'Pink':
        hueColor = 83
        break
        case 'Red':
        hueColor = 100
        break
        }
        let newValue = ['hue': hueColor , 'saturation': saturation , 'level': (lightLevel as Integer) ? (lightLevel as Integer) : 100]
        lights*.setColor(newValue)
        } else {
        if (event.value == 'off') {
        lights*.off()
        }
        }
        

	})
