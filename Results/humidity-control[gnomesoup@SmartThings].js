
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Humidity Control'', section => {

        });


        page.section('Select a humidifier to control:', section => {
            section.deviceSetting('humSwitch').capability(['switch']).name('Humidifier switch...');
            section.deviceSetting('humPower').capability(['powerMeter']).name('and the humidifier\');

        });


        page.section('Based on this humidity sensor:', section => {
            section.deviceSetting('humLevel').capability(['relativeHumidityMeasurement']).name('Humidity sensor...');

        });


        page.section('When the humidity levels reaches:', section => {
            section.numberSetting('humMax').name('Turn off when humidity reaches...');
            section.numberSetting('humMin').name('Turn on when humidity drops to...');

        });


        page.section('If the humidifier is not drawing power give a push:', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('How often would you like to be notified?', section => {
            section.numberSetting('notifyDelay').name('Once in this many minutes:');

        });


        page.section('Do not notify me in the following modes:', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humPower, 'powerMeter', 'power', 'powerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humSwitch, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humLevel, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let switchValue = switchEvt.value
        console.log("${state.name}: switchHandler called")
        console.log("${state.name}: Switch is $switchValue")
        state.humSwitch = switchValue
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let humidityValue = humidityEvt.value.toInteger()
        console.log("${state.name}: humdityHandler called")
        console.log("${state.name}: ${humSwitch.label} is ${state.humSwitch}")
        console.log("${state.name}: Humidity is $humidityValue")
        state.humLevel = humidityValue
        if (humidityValue > humMax && state.humSwitch == 'on') {
        
        context.api.devices.sendCommands(context.config.humSwitch, 'switch', off)
    
        state.humSwitch = 'off'
        console.log("${state.name}: Turning humidifier OFF")
        } else {
        if (humidityValue < humMin && state.humSwitch == 'off') {
        
        context.api.devices.sendCommands(context.config.humSwitch, 'switch', on)
    
        state.humSwitch = 'on'
        console.log("${state.name}: Turning humidifier ON")
        } else {
        console.log("${state.name}: no action")
        }
        }
        

	})

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        console.log("${state.name}: powerHanlder called")
        let powerValue = powerEvt.value.toInteger()
        let notifyFix = notifyDelay * 60000
        if (!state.lastMessageSent) {
        state.lastMessageSent = this.now() - notifyFix
        }
        let currentTime = this.now()
        let timeSinceLast = currentTime.toInteger() - state.lastMessageSent.toInteger()
        console.log("${humPower.label} is using $powerValue volts")
        console.log("Time since last message sent: ${(timeSinceLast / 60000).toInteger()} minutes")
        console.log("state.humLevel: ${state.humLevel}")
        if (powerValue < 3 && state.humLevel < humMin ) {
        if (currentTime.toInteger() - state.lastMessageSent.toInteger() > notifyFix ) {
        console.log("${state.name}: Humidity and power are low, sending message")
        this.send("${humSwitch.label} is empty. Humdity is ${state.humLevel}")
        console.log("${state.name}: Resetting last message time")
        state.lastMessageSent = this.now()
        }
        }
        

	})
