
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control Close Buttons...', section => {
            section.deviceSetting('switchesOpen').capability(['button']).name('Open Buttons');
            section.deviceSetting('switchesClose').capability(['button']).name('Close Buttons');
            section.deviceSetting('switchesPause').capability(['button']).name('Pause Buttons');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('shades').capability(['switchLevel']).name('Shades');
            section.booleanSetting('invertControl').name('Invert controls');

        });


        page.section('Timers...', section => {
            section.timeSetting('theTimeOpen').name('Time to execute Open');
            section.timeSetting('theTimeHalf').name('Time to execute 50%');
            section.timeSetting('theTimeClose').name('Time to execute Close');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'dimmersEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesClose, 'button', 'button', 'buttonEventClose')

        context.api.schedules.schedule('handlerSchClose', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.switchesOpen, 'button', 'button', 'buttonEventOpen')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesPause, 'button', 'button', 'buttonEventPause')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.setLevel', 'dimmersEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.on', 'dimmersEvent')

        context.api.schedules.schedule('handlerSchOpen', delay);

        context.api.schedules.schedule('handlerSchHalf', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch.off', 'dimmersEvent')

    })

    .subscribedEventHandler('buttonEventOpen', (context, event) => {
        
        console.log("Opening shades: $evt")
        if (this.isWorking()) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        } else {
        if (switchesClose == null) {
        if (this.getLevel() < 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        } else {
        if (event.value == 'held' && !invertControl || event.value == 'pushed' && invertControl ) {
        console.log('button was held')
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (event.value == 'pushed' && !invertControl || event.value == 'held' && invertControl ) {
        if (this.getLevel() <= 100 && this.getLevel() > 75) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 75 && this.getLevel() > 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 50 && this.getLevel() > 25) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() <= 25 && this.getLevel() > 0) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        }
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('dimmersEvent', (context, event) => {
        
        log.info("switchSetLevelHandler Event: $level")
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        return null
        }
        if (event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        

	})

    .subscribedEventHandler('buttonEventPause', (context, event) => {
        
        console.log("Pausing Shades: $evt")
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        

	})

    .subscribedEventHandler('buttonEventClose', (context, event) => {
        
        console.log("Closing Shades: $evt")
        if (this.isWorking()) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', pause)
    
        } else {
        if (event.value == 'held' && !invertControl || event.value == 'pushed' && invertControl ) {
        console.log('button was held')
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (event.value == 'pushed' && !invertControl || event.value == 'held' && invertControl ) {
        console.log('button was pushed')
        if (this.getLevel() < 100 && this.getLevel() >= 75) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() < 75 && this.getLevel() >= 50) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() < 50 && this.getLevel() >= 25) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        } else {
        if (this.getLevel() < 25 && this.getLevel() >= 0) {
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        }
        }
        }
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('handlerSchHalf', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        

	})

    .scheduledEventHandler('handlerSchOpen', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        

	})

    .scheduledEventHandler('handlerSchClose', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.shades, 'switchLevel', setLevel)
    
        

	})
