
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let everyone_here = this.presense_is_after(monitor_presence, 'present', 10)
                let everyone_gone = this.presense_is_after(monitor_presence, 'not present', 10)
                let current_count = monitor_presence.findAll({ 
                    it.currentPresence == 'present'
                }).size()
                this.webhook(['displayName': event.displayName, 'value': event.value, 'daytime': this.is_daytime(), 'mode': location.mode, 'current_count': current_count , 'everyone_here': everyone_here , 'everyone_gone': everyone_gone ])
                if (mode == 'Pause') {
                    this.webhook(['at': 'paused'])
                    log.info('No actions taken in Pause mode')
                } else {
                    let lights = [ switches , hues ].flatten()
                    if (event.displayName == 'motion@stairs' && event.value == 'active') {
                        this.webhook(['at': 'stair_motion_lights'])
                        lights.findAll({ let s ->
                            s.displayName == 'stairs' || s.displayName == 'loft' || s.displayName == 'entry'
                        }).findAll({ let s ->
                            s.currentSwitch == 'off'
                        }).each({ let s ->
                            if ('setLevel' in s.supportedCommands.collect({ 
                                it.name
                            })) {
                                if (location.mode == 'Sleep') {
                                    s.setLevel(50)
                                } else {
                                    if (location.mode == 'Home / Night') {
                                        s.setLevel(75)
                                    } else {
                                        s.setLevel(100)
                                    }
                                }
                            }
                            s.on()
                        })
                    }
                    if (event.value == 'Yawn') {
                        this.webhook(['at': 'yawn'])
                        lights.findAll({ let s ->
                            s.displayName == 'loft' || s.displayName == 'entry' || s.displayName == 'chandelier'
                        }).findAll({ let s ->
                            s.currentSwitch == 'off'
                        }).each({ let s ->
                            if ('setLevel' in s.supportedCommands.collect({ 
                                it.name
                            })) {
                                s.setLevel(75)
                            }
                            s.on()
                        })
                    }
                    if (event.value == 'Home / Day') {
                        this.webhook(['at': 'home_day'])
                        lights.each({ let s ->
                            if (s.currentSwitch == 'off') {
                                s.on()
                            }
                            if ('setLevel' in s.supportedCommands.collect({ 
                                it.name
                            })) {
                                s.setLevel(100)
                            }
                        })
                    }
                    if (event.displayName == 'sunset' && current_count > 0 && location.mode == 'Home / Day') {
                        this.webhook(['at': 'sunset'])
                        this.changeMode('Home / Night')
                    }
                    if (event.value == 'Home / Night') {
                        this.webhook(['at': 'home_night'])
                        lights.findAll({ let s ->
                            'setLevel' in s.supportedCommands.collect({ 
                                it.name
                            })
                        }).each({ let s ->
                            log.info("Night mode enabled, dimming ${s.displayName}")
                            s.setLevel(75)
                        })
                        lights.findAll({ let s ->
                            s.displayName == 'downstairs door'
                        }).each({ let s ->
                            log.info("Night mode enabled, turning off ${s.displayName}")
                            s.off()
                        })
                    }
                    if (event.value == 'Sleep') {
                        this.webhook(['at': 'sleep'])
                        lights.findAll({ let s ->
                            s.currentSwitch == 'on'
                        }).each({ let s ->
                            log.info("Sleep mode enabled, turning off ${s.displayName}")
                            s.off()
                        })
                    }
                    if (everyone_gone && location.mode != 'Away') {
                        this.webhook(['at': 'away'])
                        this.changeMode('Away')
                        lights.findAll({ let s ->
                            s.currentSwitch == 'on'
                        }).each({ let s ->
                            log.info("Away mode enabled, turning off ${s.displayName}")
                            s.off()
                        })
                    }
                    if (current_count > 0 && location.mode == 'Away') {
                        this.webhook(['at': 'home'])
                        this.changeMode('Home')
                    }
                    if (event.value == 'Home') {
                        this.webhook(['at': 'home_day_night'])
                        if (this.is_daytime()) {
                            this.changeMode('Home / Day')
                        } else {
                            this.changeMode('Home / Night')
                        }
                    }
                    if (this.canSchedule()) {
                        this.runIn(61, tick)
                    } else {
                        this.webhook(['can_schedule': 'false'])
                        log.error('can_schedule=false')
                    }
                }
            

	})
