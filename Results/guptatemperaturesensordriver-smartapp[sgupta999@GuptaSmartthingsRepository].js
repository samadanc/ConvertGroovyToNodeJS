
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick the Temperature Sensor ', section => {
            section.booleanSetting('activated').name('Activate ');
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('Which ');

        });


        page.section('Set Cooling Setpoint (CSP)', section => {

        });


        page.section('Set Heating Setpoint (HSP)', section => {

        });


        page.section('When CSP ON event', section => {
            section.deviceSetting('cspONNswitches').capability(['switch']).name('Turn these switches ON ');
            section.deviceSetting('cspONFswitches').capability(['switch']).name('Turn these switches OFF ');
            section.deviceSetting('cspONNContactSensors').capability(['contactSensor']).name('OPEN these contact sensors ');
            section.deviceSetting('cspONFContactSensors').capability(['contactSensor']).name('CLOSE these contact sensors ');

        });


        page.section('When CSP OFF event', section => {
            section.deviceSetting('cspOFFFswitches').capability(['switch']).name('Turn these switches OFF ');
            section.deviceSetting('cspOFFNswitches').capability(['switch']).name('Turn these switches ON ');
            section.deviceSetting('cspOFFFContactSensors').capability(['contactSensor']).name('CLOSE these contact sensors ');
            section.deviceSetting('cspOFFNContactSensors').capability(['contactSensor']).name('OPEN these contact sensors ');

        });


        page.section('When HSP ON event', section => {
            section.deviceSetting('hspONNswitches').capability(['switch']).name('Turn these switches ON ');
            section.deviceSetting('hspONFswitches').capability(['switch']).name('Turn these switches OFF ');
            section.deviceSetting('hspONNContactSensors').capability(['contactSensor']).name('OPEN these contact sensors ');
            section.deviceSetting('hspONFContactSensors').capability(['contactSensor']).name('CLOSE these contact sensors ');

        });


        page.section('When HSP OFF event', section => {
            section.deviceSetting('hspOFFFswitches').capability(['switch']).name('Turn these switches OFF ');
            section.deviceSetting('hspOFFNswitches').capability(['switch']).name('Turn these switches ON ');
            section.deviceSetting('hspOFFFContactSensors').capability(['contactSensor']).name('CLOSE these contact sensors ');
            section.deviceSetting('hspOFFNContactSensors').capability(['contactSensor']).name('OPEN these contact sensors ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperatureMeasurement.temperature', 'tempHandler')

    })

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        let temp = tempSensor.currentTemperature
        this.processTemp(temp)
        

	})
