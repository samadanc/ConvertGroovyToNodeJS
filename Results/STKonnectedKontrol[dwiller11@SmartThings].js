
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Konnected switch that ARMs the system in STAY mode:', section => {

        });


        page.section('Select the Konnected switch that ARMs the system in AWAY mode:', section => {

        });


        page.section('Select the Konnected contact sensor that indicates the current alarm arming status (armed/disarmed):', section => {

        });


        page.section('Select the virtual switch you created to ARM the system in STAY mode:', section => {

        });


        page.section('Select the virtual switch you created to ARM the system in AWAY mode:', section => {

        });


        page.section('Select the virtual switch you created to DISARM the system:', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.disarmVirtualswitch, 'device.virtualSwitch', 'switch.on', 'setDisarm')

        await context.api.subscriptions.subscribeToDevices(context.config.awaymodeVirtualswitch, 'device.virtualSwitch', 'switch.on', 'setAway')

        await context.api.subscriptions.subscribeToDevices(context.config.staymodeVirtualswitch, 'device.virtualSwitch', 'switch.on', 'setStay')

    })

    .subscribedEventHandler('setStay', (context, event) => {
        
        console.log("setStay (set STAY mode) was called by: $evt")
        
        context.api.devices.sendCommands(context.config.armingstatuscontactsensor, 'device.placeholder', currentState)
    
        if (armingStatus.value == 'closed') {
        console.log('The alarm is disarmed. Arming in STAY mode.')
        
        context.api.devices.sendCommands(context.config.staymodeKonnectedswitch, 'device.placeholder', on)
    
        } else {
        console.log('The alarm is already armed. Doing nothing.')
        }
        
        context.api.devices.sendCommands(context.config.staymodeVirtualswitch, 'device.virtualSwitch', off)
    
        

	})

    .subscribedEventHandler('setAway', (context, event) => {
        
        console.log("setAway (set AWAY mode) was called by: $evt")
        
        context.api.devices.sendCommands(context.config.armingstatuscontactsensor, 'device.placeholder', currentState)
    
        if (armingStatus.value == 'closed') {
        console.log('The alarm is disarmed. Arming in AWAY mode.')
        
        context.api.devices.sendCommands(context.config.awaymodeKonnectedswitch, 'device.placeholder', on)
    
        } else {
        console.log('The alarm is already armed. Doing nothing.')
        }
        
        context.api.devices.sendCommands(context.config.awaymodeVirtualswitch, 'device.virtualSwitch', off)
    
        

	})

    .subscribedEventHandler('setDisarm', (context, event) => {
        
        console.log("setDisarm (disarm the alarm) was called by: $evt")
        
        context.api.devices.sendCommands(context.config.armingstatuscontactsensor, 'device.placeholder', currentState)
    
        if (armingStatus.value == 'open') {
        console.log('The alarm is armed. Disarming.')
        
        context.api.devices.sendCommands(context.config.staymodeKonnectedswitch, 'device.placeholder', on)
    
        } else {
        console.log('The alarm is already disarmed. Doing nothing.')
        }
        
        context.api.devices.sendCommands(context.config.disarmVirtualswitch, 'device.virtualSwitch', off)
    
        

	})
