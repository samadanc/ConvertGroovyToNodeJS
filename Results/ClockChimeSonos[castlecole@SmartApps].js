
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeStart').name('Starting');
            section.timeSetting('timeEnd').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('playChime', delay);

    })

    .scheduledEventHandler('playChime', (context, event) => {
        
        if (speakers && this.getOkToRun()) {
        let hour = ((this.parseHour()) as int)
        if (volume) {
        speakers?.setLevel(volume)
        }
        let filename = "https://raw.githubusercontent.com/MichaelStruck/SmartThingsPublic/master/smartapps/michaelstruck/grandfather-sonos.src/$houroclock.mp3"
        let duration = hour * 2 + 23
        speakers?.playSoundAndTrack(filename, duration, '')
        }
        

	})
