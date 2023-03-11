
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('SnapPicture', (context, event) => {
        
                log.info("(0D) ${app.label} - ${themotion.label} is active - $settings")
                if (bBurst) {
                    (1.. nBurstShots ).each({ 
                        camera.take(['delay': 1000 * it ])
                        log.trace("(0E) ${app.label} - Burst $it - ${camera.currentImage}")
                    })
                } else {
                    camera.take()
                    log.trace("(0E) ${app.label} - Single - ${camera.currentImage}")
                }
            

	})
