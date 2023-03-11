
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your Robot', section => {
            section.deviceSetting('therobot').capability(['actuator']).name('Select the robot you want to use!');

        });


        page.section('Select Doors and/or Windows', section => {
            section.deviceSetting('thedoorwindow').capability(['contactSensor']).name('Which door(s) and/or window(s) do you want?');

        });


        page.section('Select Motion Sensors', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Which motion sensor(s) do you want?');

        });


        page.section('Select Switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which switch do you want?');

        });


        page.section('Select Water Sensor(s)', section => {
            section.deviceSetting('thewater').capability(['waterSensor']).name('Which water sensor(s) do you want?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thewater, 'waterSensor', 'water.wet', 'wetDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thedoorwindow, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.therobot, 'actuator', 'cmdReceived.cmdOk', 'receivedCmdHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        let nameSensor = event.displayName
        console.log('Comando al Robot')
        this.sendCommandToRobot(nameSensor, 'active')
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let nameSensor = event.displayName
        console.log('Comando al Robot')
        let valueSensor = event.value
        this.sendCommandToRobot(nameSensor, valueSensor)
        

	})

    .subscribedEventHandler('receivedCmdHandler', (context, event) => {
        
        console.log('Confirmando al Device Handler recepcion de comando')
        
        context.api.devices.sendCommands(context.config.therobot, 'actuator', confirmCommand)
    
        this.sendPush('Command has been received by the Robot!')
        

	})

    .subscribedEventHandler('wetDetectedHandler', (context, event) => {
        
        let nameSensor = event.displayName
        console.log('Comando al Robot')
        this.sendCommandToRobot(nameSensor, 'wet')
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let nameSensor = event.displayName
        console.log('Comando al Robot')
        let valueSensor = event.value
        this.sendCommandToRobot(nameSensor, valueSensor)
        

	})
