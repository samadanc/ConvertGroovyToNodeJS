
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select contacts...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which contact sensor(s)?');

        });


        page.section('Select motion sensors...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which motion sensor(s)?');

        });


        page.section('Select buttons...', section => {
            section.deviceSetting('button1').capability(['button']).name('Which button(s)?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('eventLogging', delay);

    })

    .scheduledEventHandler('eventLogging', (context, event) => {
        
        console.log('<<<<<<<<<<<<<<<<<<<< Event Logging >>>>>>>>>>>>>>>>>>>>')
        let queue = []
        let nowLock = this.now()
        let currentLog = new Date(nowLock)
        let currentLogOffset = new Date(nowLock + 1000)
        let previousLog = Date.parse('yyyy-MM-dd\'T\'HH:mm:ssZ', state.previousLog)
        console.log("previousLog: $previousLog, currentLog: $currentLog")
        contact1.each({
        it.statesBetween('contact', previousLog, currentLog, ['max': 300]).each({
        queue << this.processEvent(it)
        })
        })
        motion1.each({
        it.statesBetween('motion', previousLog, currentLog, ['max': 300]).each({
        queue << this.processEvent(it)
        })
        })
        button1.each({
        it.statesBetween('button', previousLog, currentLog, ['max': 300]).each({
        queue << this.processEvent(it)
        })
        })
        let url = 'http://www.baurfam.com/addEvent.php'
        if (queue != []) {
        queue.sort({
        it.eventDateTime
        })
        console.log("Events to be sent to baurfam.com: $queue")
        try {
        asynchttp_v1.put(processResponse, ['uri': url , 'body': queue ])
        state.previousLog = currentLogOffset
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        catch (groovyx.net.http.ResponseParseException e) {
        if (e.statusCode != 200) {
        log.error("Baurfam: $e")
        } else {
        console.log('Baurfam accepted event(s)')
        }
        }
        } else {
        state.previousLog = currentLogOffset
        console.log('Queue Empty')
        }
        

	})
