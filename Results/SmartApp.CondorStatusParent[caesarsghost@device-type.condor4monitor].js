
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zones', section => {

        });


        page.section('Which Arduino Is your Condor Interface?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.condor, 'device.condorShield', 'zone$i.open', 'zoneOpen')

        await context.api.subscriptions.subscribeToDevices(context.config.condor, 'device.condorShield', 'zone$i.closed', 'zoneClose')

    })

    .subscribedEventHandler('zoneClose', (context, event) => {
        
        console.log('Setting Device Closed')
        switch (event.name) {
        case 'zone1':
        
        context.api.devices.sendCommands(context.config.zone1, 'device.virtualContact', closed)
    
        break
        case 'zone2':
        
        context.api.devices.sendCommands(context.config.zone2, 'device.virtualContact', closed)
    
        break
        case 'zone3':
        
        context.api.devices.sendCommands(context.config.zone3, 'device.virtualContact', closed)
    
        break
        case 'zone4':
        
        context.api.devices.sendCommands(context.config.zone4, 'device.virtualContact', closed)
    
        break
        case 'zone5':
        
        context.api.devices.sendCommands(context.config.zone5, 'device.virtualContact', closed)
    
        break
        case 'zone6':
        
        context.api.devices.sendCommands(context.config.zone6, 'device.virtualContact', closed)
    
        break
        }
        

	})

    .subscribedEventHandler('zoneOpen', (context, event) => {
        
        console.log('Setting Device Open')
        switch (event.name) {
        case 'zone1':
        
        context.api.devices.sendCommands(context.config.zone1, 'device.virtualContact', open)
    
        break
        case 'zone2':
        
        context.api.devices.sendCommands(context.config.zone2, 'device.virtualContact', open)
    
        break
        case 'zone3':
        
        context.api.devices.sendCommands(context.config.zone3, 'device.virtualContact', open)
    
        break
        case 'zone4':
        
        context.api.devices.sendCommands(context.config.zone4, 'device.virtualContact', open)
    
        break
        case 'zone5':
        
        context.api.devices.sendCommands(context.config.zone5, 'device.virtualContact', open)
    
        break
        case 'zone6':
        
        context.api.devices.sendCommands(context.config.zone6, 'device.virtualContact', open)
    
        break
        }
        

	})
