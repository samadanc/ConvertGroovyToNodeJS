
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Audio group', section => {
            section.deviceSetting('theAudioGroup').capability(['musicPlayer']).name('Audio group');

        });


        page.section('Members of this group', section => {
            section.deviceSetting('theMembers').capability(['musicPlayer']).name('Members of this group');

        });


        page.section(''Version info'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theAudioGroup, 'musicPlayer', 'getDeviceStatus', 'groupStatusUpdated')

        await context.api.subscriptions.subscribeToDevices(context.config.theAudioGroup, 'musicPlayer', 'status', 'groupStatusUpdated')

    })

    .subscribedEventHandler('groupStatusUpdated', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.theAudioGroup, 'musicPlayer', log)
    
        if
        state.lastStatus = ''
        theMembers.each({
        if (!(it.currentState('status').value.equals('group'))) {
        log.warn('setGroupPlayback(true) calling on it: ' + it )
        it.setGroupPlayback(true)
        }
        })
        }
        if
        if (!(state.lastStatus.equals('Ready to cast'))) {
        log.warn('setGroupPlayback(false) calling on theMembers.each')
        state.lastStatus = 'Ready to cast'
        theMembers.each({
        it.setGroupPlayback(false)
        })
        }
        }
        

	})
