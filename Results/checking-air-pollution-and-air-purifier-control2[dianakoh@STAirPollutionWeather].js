
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This is a smartApp for checking air pollution and control air purifier', section => {
            section.enumSetting('inOrOut').name('Select whether to use outdoor fine dust value or indoor fine dust value');
            section.deviceSetting('air1').capability(['airQualitySensor']).name('Select a outdoor device for checking air pollution');
            section.deviceSetting('air2').capability(['airQualitySensor']).name('Select a indoor device for checking air pollution');
            section.deviceSetting('color1').capability(['colorControl']).name('Select a color control device for for checking air pollution');
            section.deviceSetting('alarm1').capability(['alarm']).name('Select an alarm for checking air pollution');
            section.deviceSetting('switch1').capability(['switch']).name('Select a switch for air purifier');
            section.numberSetting('setpoint').name('The point of turning on the air purifier (if you do not set the point, default is 80.0(outdoor) or 50.0(indoor))');
            section.timeSetting('settime').name('Time to send SMS/push notification everyday');
            section.enumSetting('push').name('if you want to send push notifications?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('executeHandler', delay);

        context.api.schedules.schedule('sendMessage', delay);

    })

    .scheduledEventHandler('executeHandler', (context, event) => {
        
        String airQualityValue
        if ("$inOrOut" == '0') {
        
        context.api.devices.sendCommands(context.config.air1, 'airQualitySensor', currentValue)
    
        } else {
        if ("$inOrOut" == '1') {
        
        context.api.devices.sendCommands(context.config.air2, 'airQualitySensor', currentValue)
    
        }
        }
        java.lang.Double airQ = Double.parseDouble(airQualityValue)
        this.colorHandler(airQualityValue, airQ)
        this.alarmHandler(airQualityValue, airQ)
        this.airPurifierControl(airQualityValue, airQ)
        

	})

    .scheduledEventHandler('sendMessage', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.air1, 'airQualitySensor', currentValue)
    
        
        context.api.devices.sendCommands(context.config.air2, 'airQualitySensor', currentValue)
    
        java.lang.Double airQ = Double.parseDouble(airQualityValue)
        java.lang.Double airQ2 = Double.parseDouble(airQualityValue2)
        let msg = "
        ?? ?? ???? ??? $airQualityValue? "
        if (airQ < 30.0) {
        msg += '?? ?????.\n???? ?? ????.'
        } else {
        if (airQ >= 30.0 && airQ < 80.0) {
        msg += '?? ?????.\n???? ??????.'
        } else {
        if (airQ >= 80.0 && airQ < 150.0) {
        msg += '?? ?????.\n???? ????? ??? ???? ????? ?????.'
        } else {
        if (airQ >= 150.0) {
        msg += '?? ?? ?????.\n???? ????? ??? ?????.'
        }
        }
        }
        }
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts(msg, recipients)
        } else {
        if ("$push" == '1') {
        this.sendPush(msg)
        }
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        

	})
