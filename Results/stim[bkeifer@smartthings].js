
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Event Target', section => {
            section.deviceSetting('button').capability(['momentary']).name('Select device to monitor');

        });


        page.section('Graphite Server', section => {
            section.textSetting('graphite_host').name('Graphite Hostname/IP');
            section.numberSetting('graphite_port').name('Graphite Port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('tick', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'momentary', 'momentary.pushed', 'testHandler')

        context.api.schedules.schedule('getBenchmark', delay);

    })

    .subscribedEventHandler('testHandler', (context, event) => {
        
        atomicState.finish = this.now()
        console.log("atomicState.start: ${atomicState.start} - as seen from event handler pre-pause")
        atomicState.rtt = atomicState.finish - atomicState.start
        console.log("atomicState.finish: ${atomicState.finish}")
        console.log("atomicState.rtt: ${atomicState.rtt}")
        this.logData(atomicState.rtt)
        

	})

    .scheduledEventHandler('getBenchmark', (context, event) => {
        
        console.log('--------------------------------------')
        atomicState.start = this.now()
        console.log("atomicState.start: ${atomicState.start} - as seen from scheduled function")
        
        context.api.devices.sendCommands(context.config.button, 'momentary', push)
    
        

	})

    .scheduledEventHandler('tick', (context, event) => {
        
        console.log("Tick: ${this.now()}")
        state.timestamp = this.now()
        

	})
