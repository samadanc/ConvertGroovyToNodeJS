
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Basic Fan info', section => {
            section.textSetting('ipAddress').name('Fan IP Address');
            section.numberSetting('maxFanSpeed').name('Maximum fan speed for this model');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('autoSpeedAdjust', delay);

    })

    .subscribedEventHandler('autoOnOff', (context, event) => {
        
        console.log('Executing \'autoOnOff\'')
        let childWHF = this.getChildDevice(this.convertIPtoHex(settings.ipAddress))
        if (childWHF.currentValue('switch') == 'on' && !(this.windowsOpenGo())) {
        this.sendNotificationEvent('The whole house fan is shutting off becuase there aren\'t enough windows open.')
        childWHF.off()
        return null
        }
        let outsideTemp = outsideTempSensor.currentTemperature
        let insideTemp = insideTempSensor.currentTemperature
        if (childWHF.currentValue('switch') == 'on' && settings.autoStopFan) {
        if (outsideTemp >= insideTemp ) {
        console.log('autoOnOff is turing off the fan')
        this.sendNotificationEvent('Based on your auto stop preferences, the whole house fan is turning off')
        childWHF.off()
        return null
        }
        if (insideTemp <= settings.autoStopLowTemp) {
        console.log('autoOnOff is turing off the fan because of low temp shutoff')
        this.sendNotificationEvent('The inside temperature is below the minimum inside temperature, the whole house fan is turning off')
        childWHF.off()
        return null
        }
        } else {
        if (childWHF.currentValue('switch') == 'off' && settings.autoStartFan) {
        if (outsideTemp < insideTemp && insideTemp > settings.autoStopLowTemp) {
        if (this.windowsOpenGo() && autoStartMode.contains(location.currentMode)) {
        console.log('autoOnOff starting fan becuase all conditions met')
        this.sendNotificationEvent('The Whole House Fan is starting because its cooler outside.')
        childWHF.on()
        } else {
        console.log('autoOnOff not starting because windows not open or incorrect mode')
        }
        } else {
        console.log('autoOnOff not starting because not cool enough outside or too cold inside')
        }
        } else {
        console.log('autoOnOff nothing to do.')
        }
        }
        

	})

    .scheduledEventHandler('autoSpeedAdjust', (context, event) => {
        
        console.log('Executing \'autoSpeedAdjust\'')
        let childWHF = this.getChildDevice(this.convertIPtoHex(settings.ipAddress))
        let waitForReturn = childWHF.refresh()
        if (childWHF.currentValue('switch') != 'on') {
        console.log('autoSpeedAdjust fan not running... exit')
        } else {
        let outsideTemp = outsideTempSensor.currentTemperature
        let insideTemp = insideTempSensor.currentTemperature
        let tempDiff = insideTemp - outsideTemp
        let currentSpeed = childWHF.currentValue('fanSpeed').toInteger()
        if (autoSpeedMode.contains(location.currentMode)) {
        if (tempDiff > settings.autoSpeedDelta && currentSpeed < settings.maxFanSpeed) {
        console.log("autoSpeedControl temperature difference is >= delta of ${settings.autoSpeedDelta} speeding up")
        this.sendNotificationEvent('The Whole House Fan is speeding up because of the inside/outside temperature difference.')
        childWHF.speedUp()
        } else {
        if (tempDiff <= settings.autoSpeedDelta && currentSpeed > 1) {
        console.log("autoSpeedControl temperature difference is not >= delta of ${settings.autoSpeedDelta} slowing down")
        this.sendNotificationEvent('The Whole House Fan is slowing down because of the inside/outside temperature difference.')
        childWHF.speedDown()
        } else {
        console.log('autoSpeedControl in butter zone, nothing to adjust.')
        }
        }
        } else {
        console.log('autoSpeedControl current mode not selected for autoSpeedControl')
        }
        }
        

	})
