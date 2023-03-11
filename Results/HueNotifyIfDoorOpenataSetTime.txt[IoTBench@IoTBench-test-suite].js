
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your Garage Door Sensor...', section => {
            section.deviceSetting('garageDoorStatus').capability(['contactSensor']).name('Where?');

        });


        page.section('If Open, Close My Garage Door at...', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Color Settings for Hue Bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        let currentState = garageDoorStatus.contactState
        if (currentState?.value == 'open') {
        console.log('Door was open - Notifying.')
        let hueColor = 0
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
        state.previous = [:]
        hues.each({
        state.previous[it.id] = ['switch': it.currentValue('switch'), 'level': it.currentValue('level'), 'hue': it.currentValue('hue'), 'saturation': it.currentValue('saturation')]
        })
        let previousHueColor = (state.hueColor as Integer)
        console.log("current values = $previousHueColor")
        let newValue = ['hue': hueColor , 'saturation': saturation , 'level': (lightLevel as Integer) ? (lightLevel as Integer) : 100]
        console.log("new hue value = $newValue")
        hues*.setColor(newValue)
        let fiveMinuteDelay = 60 * 5
        this.runIn(fiveMinuteDelay, endNotification)
        } else {
        console.log('Door was not open. No Action.')
        }
        

	})
