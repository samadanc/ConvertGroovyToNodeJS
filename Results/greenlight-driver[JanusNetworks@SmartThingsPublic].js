
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Greenlight Setup', section => {
            section.textSetting('name').name('Name for this System/Job');
            section.textSetting('key').name('Your dealer API key for Greenlight');

        });


        page.section('Input', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initialize', delay);

    })

    .subscribedEventHandler('inputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', getDevice)
    
        
        context.api.devices.sendCommands(context.config., '', log)
    
        
        context.api.devices.sendCommands(context.config., '', registerDevice)
    
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config., '', log)
    
        CAPABILITY_MAP.each({ let key, let capability ->
        capability['attributes'].each({ let attribute ->
        
        context.api.devices.sendCommands(context.config., '', subscribe)
    
        })
        })
        
        context.api.devices.sendCommands(context.config., '', runIn)
    
        
        context.api.devices.sendCommands(context.config., '', registerHub)
    
        

	})
