
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pool Pump Switch', section => {
            section.deviceSetting('PoolSwitch').capability(['switch']).name('Pool Switch:');

        });


        page.section('Pool Run Limits', section => {
            section.numberSetting('HotHours').name('Number of Hours to run in Hot Months:');
            section.numberSetting('ColdHours').name('Number of Hours to run in Cold Months:');
            section.timeSetting('TimeToRun').name('Time to execute every day');

        });


        page.section('Manual Activation', section => {
            section.numberSetting('ManualOffMinutes').name('Auto Turn Off Time (minutes)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.PoolSwitch, 'switch', 'switch', 'PoolSwitchHandler')

        context.api.schedules.schedule('Timehandler', delay);

    })

    .subscribedEventHandler('PoolSwitchHandler', (context, event) => {
        
        switch (event.value) {
        case 'on':
        console.log('Pump turned on')
        if (event.isPhysical()) {
        console.log('Pump turned on physically')
        if (!state.AutomaticallyTurnedOn && ManualControlMode ) {
        if (ManualOffMinutes == 0) {
        console.log('Pump Off')
        
        context.api.devices.sendCommands(context.config.PoolSwitch, 'switch', off)
    
        } else {
        console.log('Automatically turn off pool later')
        this.runIn(60 * ManualOffMinutes , TurnOffPoolSwitch)
        }
        }
        state.AutomaticallyTurnedOn = false
        }
        break
        case 'off':
        console.log('Pump turned off')
        state.AutomaticallyTurnedOn = false
        break
        }
        

	})

    .scheduledEventHandler('Timehandler', (context, event) => {
        
        java.lang.Float RunTime
        let now = new Date()
        console.log('Time to Start The Pool!')
        console.log("ColdHours: $ColdHours ")
        console.log("HotHours: $HotHours ")
        state.AutomaticallyTurnedOn = true
        
        context.api.devices.sendCommands(context.config.PoolSwitch, 'switch', on)
    
        let Today_Month = now.month + 1
        console.log("Today's Month: $Today_Month")
        switch ( Today_Month ) {
        case [12, 1, 2]:
        RunTime = ColdHours
        break
        case [3, 11]:
        RunTime = ColdHours + HotHours - ColdHours / 4
        break
        case [4, 10]:
        RunTime = ColdHours + HotHours - ColdHours / 2
        break
        case [5, 9]:
        RunTime = ColdHours + HotHours - ColdHours * 3 / 4
        break
        case [6, 7, 8]:
        RunTime = HotHours
        break
        }
        console.log("RunTime: $RunTime")
        this.sendNotificationEvent("Running the Pool Pump for $RunTime hours.")
        this.runIn(60 * 60 * RunTime , TurnOffPoolSwitch)
        

	})
