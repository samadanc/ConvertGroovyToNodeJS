
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Credentials', section => {

        });


        page.section('Timing', section => {
            section.numberSetting('pollfreq').name('Frequency (mins)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
        let sides = ['leftSide', 'rightSide']
        console.log("Poll: sessionId=${state[sessionId]} ...")
        if (state['sessionId'] == null) {
        this.updateSessionId()
        }
        let cookies = ''
        state.cookies.each({ let cookie ->
        cookies += cookie + '; '
        })
        let params = ['uri': "https://prod-api.sleepiq.sleepnumber.com/rest/bed/familyStatus?_k=${state.sessionId}", 'headers': ['Cookie': cookies ]]
        console.log("Retrieving SleepIQ details at ${params.uri} ...")
        try {
        this.httpGet(params, { let resp ->
        resp.headers.each({
        console.log("response header - ${it.name}: ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        console.log("response data: ${resp.data}")
        resp.data.beds.each({ let bed ->
        sides.each({ let side ->
        let devId = "${bed.bedId}$side"
        let childDevice = this.getChildDevice(devId)
        if (childDevice == null) {
        console.log("Failed to find child bed $devId, creating it ...")
        childDevice = this.addChildDevice('jwoodrich', 'SleepIQ Bed', devId, null, ['name': devId , 'label': "SleepIQ Bed $side", 'completedSetup': true])
        }
        childDevice.sendEvent(['name': 'presence', 'value': bed[ side ].isInBed ? 'present' : 'not present'])
        childDevice.sendEvent(['name': 'sleeping', 'value': bed[ side ].isInBed ? 'sleeping' : 'not sleeping'])
        childDevice.sendEvent(['name': 'pressure', 'value': bed[ side ].pressure])
        childDevice.sendEvent(['name': 'sleepNumber', 'value': bed[ side ].sleepNumber])
        })
        })
        })
        }
        catch (let e) {
        log.error("Failed to retrieve SleepIQ data: $e", e)
        if (e.getMessage().contains('Unauthorized')) {
        state.sessionId = null
        }
        }
        

	})
