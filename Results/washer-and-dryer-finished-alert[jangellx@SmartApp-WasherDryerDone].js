
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.wdmon, 'device.WasherAndDryerFinishedMonitor', 'washer', 'handleWasher')

        await context.api.subscriptions.subscribeToDevices(context.config.wdmon, 'device.WasherAndDryerFinishedMonitor', 'dryer', 'handleDryer')

    })

    .subscribedEventHandler('handleDryer', (context, event) => {
        
        console.log('dyer monitor reports done')
        if 
        this.sendPush('Dryer is done!')
        }
        

	})

    .subscribedEventHandler('handleWasher', (context, event) => {
        
        console.log('washer monitor reports done')
        if 
        this.sendPush('Washer is done!')
        }
        

	})
