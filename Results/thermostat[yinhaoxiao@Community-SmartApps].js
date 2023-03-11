
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Select thermostat');

        });


        page.section('['hideable': true, 'hidden': true], 'Scheduled Setpoints', section => {
            section.booleanSetting('son').name('Run scheduled setpoints');
            section.numberSetting('numscheduled').name('Number of scheduled setpoints');

        });


        page.section('['hideable': true, 'hidden': true], 'Mode-Based Setpoints', section => {
            section.booleanSetting('eon').name('Run mode-based setpoints');
            section.numberSetting('numevent').name('Number of mode-based setpoints');

        });


        page.section('['hideable': true, 'hidden': true], 'Additional Features', section => {
            section.enumSetting('auto').name('Adjust thermostat heating/cooling mode based on current temperature and setpoint');
            section.booleanSetting('fnotifications').name('Resend commands not acknowledged by the theromstat and notify after multiple failed attempts.');

        });


        page.section('['hideable': true, 'hidden': true], 'Notifications', section => {
            section.booleanSetting('snotifications').name('Notify when scheduled setpoints execute');
            section.booleanSetting('enotifications').name('Notify when mode-based setpoints execute');
            section.enumSetting('eventlogging').name('Set the level of event logging in the notification feed');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('MidnightRunner', delay);

    })

    .subscribedEventHandler('tempChangeHandler', (context, event) => {
        
        this.SchedulerIntegrityChecker()
        if (settings.auto == 'Any time') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', ThermostatModeSetter)
    
        }
        

	})

    .scheduledEventHandler('MidnightRunner', (context, event) => {
        
        state.dayoflastrun = this.TodayAsString()
        state.timeoflastevent = this.now()
        try {
        this.unschedule(EarlyStartExecuter)
        }
        catch (let ev) {
        }
        this.SchedulerFunction()
        let i = this.SearchSchedulePoints('2015-08-04T00:00:00.000')
        if (i > 0) {
        this.ThermostatCommander(settings."sheatset$i", settings."scoolset$i", settings.snotifications, "per scheduled setpoint.${state.schedulestring}")
        }
        

	})
