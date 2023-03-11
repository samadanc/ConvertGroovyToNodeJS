
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the information flag switches', section => {
            section.deviceSetting('presenceSwitchLiving').capability(['switch']).name('Pick your Living switch');
            section.deviceSetting('presenceSwitchCocina').capability(['switch']).name('Pick your Cocina switch');
            section.deviceSetting('presenceSwitchPasillo').capability(['switch']).name('Pick your Pasillo switch');
            section.deviceSetting('presenceSwitchEstudio').capability(['switch']).name('Pick your Estudio switch');
            section.deviceSetting('presenceSwitchComputador').capability(['switch']).name('Pick your Computador switch');
            section.deviceSetting('presenceSwitchBanoi').capability(['switch']).name('Pick your Baño Invitado switch');
            section.deviceSetting('presenceSwitchDormitorio').capability(['switch']).name('Pick your Dormitorio switch');
            section.deviceSetting('presenceSwitchCloset').capability(['switch']).name('Pick your Closet switch');
            section.deviceSetting('presenceSwitchBanop').capability(['switch']).name('Pick your Baño Principal switch');

        });


        page.section('Set the light switch for each room', section => {
            section.deviceSetting('lightsLiving').capability(['switch']).name('Pick your Living lights');
            section.deviceSetting('lightsCocina').capability(['switch']).name('Pick your Cocina lights');
            section.deviceSetting('lightsPasillo').capability(['switch']).name('Pick your Pasillo lights');
            section.deviceSetting('lightsEstudio').capability(['switch']).name('Pick your Estudio lights');
            section.deviceSetting('lightsBanoi').capability(['switch']).name('Pick your Baño Invitado lights');
            section.deviceSetting('lightsDormitorio').capability(['switch']).name('Pick your Dormitorio lights');
            section.deviceSetting('lightsCloset').capability(['switch']).name('Pick your Closet lights');
            section.deviceSetting('lightsBanop').capability(['switch']).name('Pick your Baño Principal lights');

        });


        page.section('Configuration', section => {
            section.numberSetting('offDelay').name('Set the delay to turn off a light at exiting the zone');
            section.deviceSetting('presenceSwitchOutside').capability(['switch']).name('Pick your Outside switch');
            section.deviceSetting('lightsOutside').capability(['switch']).name('Pick your Outside event lights');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchCocina, 'switch', 'switch', 'lightsCocinaHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchBanoi, 'switch', 'switch', 'lightsBanoiHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchOutside, 'switch', 'switch', 'lightsOutsideHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchDormitorio, 'switch', 'switch', 'lightsDormitorioHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchBanop, 'switch', 'switch', 'lightsBanopHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchPasillo, 'switch', 'switch', 'lightsPasilloHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchEstudio, 'switch', 'switch', 'lightsEstudioHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchLiving, 'switch', 'switch', 'lightsLivingHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSwitchCloset, 'switch', 'switch', 'lightsClosetHandler')

    })

    .subscribedEventHandler('lightsOutsideHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsOutside, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('lightsBanopHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsBanop, 'switch', on)
    
        } else {
        this.runIn(offDelay, offBanop)
        }
        

	})

    .subscribedEventHandler('lightsClosetHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsCloset, 'switch', on)
    
        } else {
        this.runIn(offDelay, offCloset)
        }
        

	})

    .subscribedEventHandler('lightsLivingHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsLiving, 'switch', on)
    
        } else {
        this.runIn(offDelay, offLiving)
        }
        

	})

    .subscribedEventHandler('lightsCocinaHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsCocina, 'switch', on)
    
        } else {
        this.runIn(offDelay, offCocina)
        }
        

	})

    .subscribedEventHandler('lightsPasilloHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsPasillo, 'switch', on)
    
        } else {
        this.runIn(offDelay, offPasillo)
        }
        

	})

    .subscribedEventHandler('lightsEstudioHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsEstudio, 'switch', on)
    
        } else {
        this.runIn(offDelay, offEstudio)
        }
        

	})

    .subscribedEventHandler('lightsDormitorioHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsDormitorio, 'switch', on)
    
        } else {
        this.runIn(offDelay, offDormitorio)
        }
        

	})

    .subscribedEventHandler('lightsBanoiHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.lightsBanoi, 'switch', on)
    
        } else {
        this.runIn(offDelay, offBanoi)
        }
        

	})
