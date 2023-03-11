
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the Virtual CoopBoss state changes', section => {
            section.deviceSetting('virtualCoopBoss').capability(['garageDoorControl']).name('Select virtual CoopBoss');
            section.deviceSetting('physicalCoopBoss').capability(['doorControl']).name('Select CoopBoss');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.physicalCoopBoss, 'doorControl', 'currentLightLevel', 'coopLuxHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.physicalCoopBoss, 'doorControl', 'Aux1', 'coopLightHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.physicalCoopBoss, 'doorControl', 'TempProb1', 'coopTemperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.physicalCoopBoss, 'doorControl', 'doorState', 'coopDoorStateHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualCoopBoss, 'garageDoorControl', 'switch', 'virtualCoopSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualCoopBoss, 'garageDoorControl', 'door', 'virtualCoopDoorStateHandler')

    })

    .subscribedEventHandler('coopTemperatureHandler', (context, event) => {
        
        log.info("coopTemperatureHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        
        context.api.devices.sendCommands(context.config.virtualCoopBoss, 'garageDoorControl', setTemperature)
    
        

	})

    .subscribedEventHandler('coopLightHandler', (context, event) => {
        
        log.info("coopLightHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        
        context.api.devices.sendCommands(context.config.virtualCoopBoss, 'garageDoorControl', setLight)
    
        

	})

    .subscribedEventHandler('coopDoorStateHandler', (context, event) => {
        
        log.info("coopDoorStateHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        if (event.name == 'doorState' && event.value == 'open') {
        console.log('Coop door is now open.')
        
        context.api.devices.sendCommands(context.config.virtualCoopBoss, 'garageDoorControl', finishOpening)
    
        } else {
        if (event.name == 'doorState' && event.value == 'closed') {
        console.log('Coop door is now closed.')
        
        context.api.devices.sendCommands(context.config.virtualCoopBoss, 'garageDoorControl', finishClosing)
    
        }
        }
        

	})

    .subscribedEventHandler('coopLuxHandler', (context, event) => {
        
        log.info("coopLuxHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        
        context.api.devices.sendCommands(context.config.virtualCoopBoss, 'garageDoorControl', setLux)
    
        

	})

    .subscribedEventHandler('virtualCoopDoorStateHandler', (context, event) => {
        
        log.info("virtualCoopDoorStateHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        if (event.name == 'door' && event.value == 'opening') {
        console.log('virtual coopboss sending OPEN command to physical coopboss')
        
        context.api.devices.sendCommands(context.config.physicalCoopBoss, 'doorControl', openDoor)
    
        } else {
        if (event.name == 'door' && event.value == 'closing') {
        console.log('virtual coopboss sending CLOSE command to physical coopboss')
        
        context.api.devices.sendCommands(context.config.physicalCoopBoss, 'doorControl', closeDoor)
    
        }
        }
        

	})

    .subscribedEventHandler('virtualCoopSwitchHandler', (context, event) => {
        
        log.info("virtualCoopSwitchHandler(evt) called event.name = ${event.name} event.value = ${event.value}")
        if (event.value == 'on') {
        console.log('virtual coopboss sending on command to Aux 1 on physical coopboss')
        
        context.api.devices.sendCommands(context.config.physicalCoopBoss, 'doorControl', Aux1On)
    
        } else {
        console.log('virtual coopboss sending off command to Aux 1 on physical coopboss')
        
        context.api.devices.sendCommands(context.config.physicalCoopBoss, 'doorControl', Aux1Off)
    
        }
        

	})
