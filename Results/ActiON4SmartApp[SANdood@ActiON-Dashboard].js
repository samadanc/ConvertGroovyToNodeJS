
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Allow control of these things...', section => {
            section.deviceSetting('holiday').capability(['switch']).name('Which Holiday Lights?');
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('momentaries').capability(['momentary']).name('Which Momentary Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('camera').capability(['imageCapture']).name('Which Cameras?');

        });


        page.section('View state of these things...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion?');
            section.deviceSetting('water').capability(['waterSensor']).name('Which Water Sensors?');
            section.deviceSetting('battery').capability(['battery']).name('Which Battery Status?');
            section.deviceSetting('energy').capability(['energyMeter']).name('Which Energy Meters?');
            section.deviceSetting('power').capability(['powerMeter']).name('Which Power Meters?');

        });


        page.section('Show...', section => {
            section.booleanSetting('showMode').name('Show Mode');
            section.booleanSetting('showHelloHome').name('Show Hello, Home! Actions');
            section.enumSetting('showClock').name('Show Clock');
            section.booleanSetting('roundNumbers').name('Round Off Decimals');

        });


        page.section('Dropcam Video Streams', section => {
            section.textSetting('dropcamStreamT1').name('Title 1');
            section.textSetting('dropcamStreamUrl1').name('URL 1');
            section.textSetting('dropcamStreamT2').name('Title 2');
            section.textSetting('dropcamStreamUrl2').name('URL 2');
            section.textSetting('dropcamStreamT3').name('Title 3 ');
            section.textSetting('dropcamStreamUrl3').name('URL 3');

        });


        page.section('Show Links', section => {
            section.textSetting('linkTitle1').name('Title 1');
            section.textSetting('linkUrl1').name('URL 1');
            section.textSetting('linkTitle2').name('Title 2');
            section.textSetting('linkUrl2').name('URL 2');
            section.textSetting('linkTitle3').name('Title 3');
            section.textSetting('linkUrl3').name('URL 3');

        });


        page.section(''Dashboard Preferences...'', section => {

        });


        page.section('Reset AOuth Access Token...', section => {
            section.booleanSetting('resetOauth').name('Reset AOuth Access Token?');

        });


        page.section('Send text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.holiday, 'switch', 'switch.on', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.water, 'waterSensor', 'water', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.holiday, 'switch', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.holiday, 'switch', 'switch.off', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.energy, 'energyMeter', 'energy', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.holiday, 'switch', 'switch', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("event happened ${e.description}")
        this.updateStateTS()
        

	})
