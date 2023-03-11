
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseEventHandler')

    })

    .subscribedEventHandler('sunriseEventHandler', (context, event) => {
        
                this.ifDebug('sunriseEventHandler', 'info')
                this.setupColorNotification(this.convertRGBToHueSaturation(colorsRGB[ sunriseColor ][1]))
                if (speakSun) {
                    this.speakIt(' Sun rise, time is ' + this.format24hrTime() + ' hours. ')
                }
                this.scheduleNext()
            

	})

    .subscribedEventHandler('musicStoppedEventHandler', (context, event) => {
        
                console.log(event.value)
                console.log(state.audioData)
                if (event.value != 'stopped') {
                    return null
                }
                let dNI = event.device.deviceNetworkId.toString()
                if (!state.audioData."$dNI") {
                    return null
                }
                let sC = state.audioData."$dNI".stopCount
                if (sC > 0) {
                    state.audioData."$dNI".stopCount = sC - 1
                    return null
                }
                let hT = this.getHubType()
                event.device.setLevel(state.audioData."$dNI".volume)
                if (state.audioData."$dNI".trackData?.trackUri && state.audioData."$dNI".status == 'playing') {
                    event.device.playTrack(state.audioData."$dNI".trackData.trackUri)
                }
                if (state.audioData."$dNI".mute != 'unmuted') {
                    event.device.mute()
                }
                state.audioData.remove(dNI)
            

	})

    .subscribedEventHandler('modeEventHandler', (context, event) => {
        
                this.ifDebug('modeEventHandler', 'info')
                if (modeColor) {
                    this.setupColorNotification(this.convertRGBToHueSaturation(colorsRGB[ modeColor ][1]))
                }
                if (speakModes) {
                    this.speakIt(' Location mode changed to ' + location.currentMode.toString() + '. ')
                }
                this.scheduleNext()
            

	})

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (evt) {
                    switch (event.value) {
                        case 'refresh':
                            state.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                            break
                    }
                }
            

	})

    .subscribedEventHandler('sunsetEventHandler', (context, event) => {
        
                this.ifDebug('sunsetEventHandler', 'info')
                this.setupColorNotification(this.convertRGBToHueSaturation(colorsRGB[ sunsetColor ][1]))
                if (speakSun) {
                    this.speakIt(' Sun set, time is ' + this.format24hrTime() + ' hours. ')
                }
                this.scheduleNext()
            

	})

    .subscribedEventHandler('speakerStoppedEventHandler', (context, event) => {
        
                console.log(event.value)
                console.log(state.audioData)
                if (event.value != 'stopped') {
                    return null
                }
                let dNI = event.device.deviceNetworkId.toString()
                if (!state.audioData?."$dNI") {
                    return null
                }
                let sC = state.audioData."$dNI".stopCount
                if (sC > 0) {
                    state.audioData."$dNI".stopCount = sC - 1
                    return null
                }
                let hT = this.getHubType()
                event.device.setLevel(state.audioData."$dNI".volume)
                if (state.audioData."$dNI".trackData?.trackUri && state.audioData."$dNI".status == 'playing') {
                    event.device.playTrack(state.audioData."$dNI".trackData.trackUri)
                }
                if (state.audioData."$dNI".mute != 'unmuted') {
                    event.device.mute()
                }
                state.audioData.remove(dNI)
            

	})
