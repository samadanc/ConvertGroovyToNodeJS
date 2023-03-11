
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Person 1', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Using whose presence');

        });


        page.section('Person 2', section => {
            section.deviceSetting('presence2').capability(['presenceSensor']).name('Using whose presence');

        });


        page.section('Joint Modes', section => {

        });


        page.section('Away Mode', section => {
            section.numberSetting('vacationModeDelay').name('Number of hours to transition to vacation mode');

        });


        page.section('Times', section => {
            section.timeSetting('weekdayNightTime').name('Time to auto transition to night on weekdays');
            section.timeSetting('weekdayDayTime').name('Time to auto transition to day on weekdays');
            section.timeSetting('weekendNightTime').name('Time to auto transition to night on weekends');
            section.timeSetting('weekendDayTime').name('Time to auto transition to day on weekends');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'day2Evening')

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.schedule('evening2NightWeekday', delay);

        context.api.schedules.schedule('night2DayWeekday', delay);

        context.api.schedules.schedule('night2DayWeekend', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.presence2, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.schedule('evening2NightWeekend', delay);

    })

    .subscribedEventHandler('day2Evening', (context, event) => {
        
        console.log('day2Evening: Transitioning timePeriod from Day to Evening')
        atomicState.timePeriod = 'Evening'
        this.calcNewMode()
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler: $evt, source is ${event.source} and display name ${event.displayName}")
        this.calcNewMode()
        

	})

    .scheduledEventHandler('night2DayWeekend', (context, event) => {
        
        if (this.isWeekday()) {
        console.log('night2DayWeekend: No transition, it\'s a Weekday')
        } else {
        console.log('night2DayWeekend: Transitioning timePeriod from Night to Day')
        atomicState.timePeriod = 'day'
        this.calcNewMode()
        }
        

	})

    .scheduledEventHandler('evening2NightWeekday', (context, event) => {
        
        if (this.isWeekday()) {
        console.log('evening2NightWeekday: Transitioning timePeriod from Evening to Night')
        atomicState.timePeriod = 'night'
        this.calcNewMode()
        } else {
        console.log('evening2NightWeekday: No transition, it\'s a Weekend')
        }
        

	})

    .scheduledEventHandler('evening2NightWeekend', (context, event) => {
        
        if (this.isWeekday()) {
        console.log('evening2NightWeekend: No transition, it\'s a Weekday')
        } else {
        console.log('evening2NightWeekend: Transitioning timePeriod from Evening to Night')
        atomicState.timePeriod = 'night'
        this.calcNewMode()
        }
        

	})

    .scheduledEventHandler('night2DayWeekday', (context, event) => {
        
        if (this.isWeekday()) {
        console.log('night2DayWeekday: Transitioning timePeriod from Night to Day')
        atomicState.timePeriod = 'day'
        this.calcNewMode()
        } else {
        console.log('night2DayWeekday: No transition, it\'s a Weekend')
        }
        

	})
