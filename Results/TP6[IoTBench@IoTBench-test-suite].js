
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Group 1', section => {
            section.booleanSetting('group1Enabled').name('Enabled');
            section.deviceSetting('group1Lights').capability(['switch']).name('Which lights?');
            section.timeSetting('group1Start').name('Start Time (hh:mm 24h)');
            section.timeSetting('group1End').name('Stop Time (hh:mm 24h)');

        });


        page.section('Group 2', section => {
            section.booleanSetting('group2Enabled').name('Enabled');
            section.deviceSetting('group2Lights').capability(['switch']).name('Which lights?');
            section.timeSetting('group2Start').name('Start Time (hh:mm 24h)');
            section.timeSetting('group2End').name('Stop Time (hh:mm 24h)');

        });


        page.section('Group 3', section => {
            section.booleanSetting('group3Enabled').name('Enabled');
            section.deviceSetting('group3Lights').capability(['switch']).name('Which lights?');
            section.timeSetting('group3Start').name('Start Time (hh:mm 24h)');
            section.timeSetting('group3End').name('Stop Time (hh:mm 24h)');

        });


        page.section('Group 4', section => {
            section.booleanSetting('group4Enabled').name('Enabled');
            section.deviceSetting('group4Lights').capability(['switch']).name('Which lights?');
            section.timeSetting('group4Start').name('Start Time (hh:mm 24h)');
            section.timeSetting('group4End').name('Stop Time (hh:mm 24h)');

        });


        page.section('Random', section => {
            section.numberSetting('randomMinutes').name('Minutes');

        });


        page.section(''Modes'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('checkForNewSchedule', delay);

        context.api.schedules.runEvery5Minutes('loop', delay);

    })

    .scheduledEventHandler('loop', (context, event) => {
        
        console.log('loop()')
        if (location.mode != mode ) {
        console.log('loop(): Not running in this mode')
        return null
        }
        let now = new Date().time
        for (let i = 0; i <= 3; i++) {
        let groupNum = i + 1
        let groupIdx = i + ''
        console.log("Group # $groupNum" + state.groups[ groupIdx ])
        if (!(state.groups[ groupIdx ]) || !state.groups[ groupIdx ].enabled) {
        console.log("Skipping Group #$groupNum because it is not enabled")
        continue
        }
        let group = state.groups[ groupIdx ]
        let lights
        if (i == 0) {
        lights = group1Lights
        } else {
        if (i == 1) {
        lights = group2Lights
        } else {
        if (i == 2) {
        lights = group3Lights
        } else {
        if (i == 3) {
        lights = group4Lights
        }
        }
        }
        }
        if (!group.on && now > group.start && now < group.end) {
        console.log("Group #$groupNum: Turning on")
        lights.on()
        group.on = true
        } else {
        if (group.on && now > group.end) {
        console.log("Group #$groupNum: Turning off")
        lights.off()
        group.on = false
        } else {
        console.log("Group #$groupNum: No change")
        }
        }
        }
        console.log('loop() complete')
        

	})

    .scheduledEventHandler('checkForNewSchedule', (context, event) => {
        
        Calendar cal = Calendar.getInstance()
        let day = cal.get(Calendar.DAY_OF_YEAR)
        if (state.lastScheduledDay != day ) {
        console.log("Picking a new schedule for day # $day")
        state.groups = [:]
        this.schedule(1, group1Enabled, group1Start, group1End)
        this.schedule(2, group2Enabled, group2Start, group2End)
        this.schedule(3, group3Enabled, group3Start, group3End)
        this.schedule(4, group4Enabled, group4Start, group4End)
        state.lastScheduledDay = day
        }
        this.loop()
        

	})
