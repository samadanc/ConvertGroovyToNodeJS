
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this Button is Pressed', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Choose Button');

        });


        page.section('Push Project', section => {
            section.textSetting('push_project').name('Project Name (for push action)');

        });


        page.section('Push Task', section => {
            section.textSetting('push_description').name('What you\');

        });


        page.section('Double Project', section => {
            section.textSetting('double_project').name('Project Name (for double action), blank for noop');

        });


        page.section('Double Task', section => {
            section.textSetting('double_description').name('What you\');

        });


        page.section('Toggl API key', section => {
            section.textSetting('apikey').name('API key (find me @ https://track.toggl.com/profile)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'buttonEventHandler')

    })

    .subscribedEventHandler('buttonEventHandler', (context, event) => {
        
        let buttonNumber = event.jsonData.buttonNumber
        console.log(buttonNumber)
        console.log("${event.value}")
        let action
        let project
        let description
        if ("${event.value}" == 'pushed') {
        action = 'start'
        project = push_project
        description = push_description
        } else {
        if ("${event.value}" == 'double') {
        if
        return null
        } else {
        action = 'start'
        project = double_project
        description = double_description
        }
        } else {
        if ("${event.value}" == 'held') {
        description = ''
        project = ''
        action = 'stop'
        } else {
        this.sendPush("Problem parsing value: ${event.value}")
        return null
        }
        }
        }
        let params = ['uri': 'http://157.245.238.3:5432', 'path': '/toggl_smartapp', 'query': ['action': action , 'desc': description.trim
        let content = ''
        try {
        this.httpGet(params, { let resp ->
        console.log("DATA: ${resp.data}
        STATUS:${resp.status}")
        if (action == 'start') {
        content = "Timer for $description in $project started."
        } else {
        content = 'Timer stopped.'
        }
        if (resp.data.toString().startsWith('ERR')) {
        content = content + resp.data
        }
        })
        }
        catch (let e) {
        content = "something went wrong: $e"
        }
        this.sendPush("EVENT: Button ${event.value}
        MESSAGE: $content")
        

	})
