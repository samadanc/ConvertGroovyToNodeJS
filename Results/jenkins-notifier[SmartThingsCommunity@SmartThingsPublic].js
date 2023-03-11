
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The URL to your Jenkins, including the job you want to monitor. Ex. https://jenkins.example.com/job/myproject/', section => {
            section.textSetting('jenkinsUrl').name('Jenkins URL');

        });


        page.section('Jenkins Username', section => {
            section.textSetting('jenkinsUsername').name('Jenkins Username');

        });


        page.section('Jenkins Password', section => {

        });


        page.section('On Failed Build Turn On...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Or Change These Bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');
            section.enumSetting('colorSuccess').name('Hue Color On Success?');
            section.enumSetting('colorFail').name('Hue Color On Fail?');
            section.numberSetting('lightLevelSuccess').name('Light Level On Success?');
            section.numberSetting('lightLevelFail').name('Light Level On Fail?');

        });


        page.section('['hideable': true, 'hidden': true], 'Additional settings', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkServer', delay);

    })

    .scheduledEventHandler('checkServer', (context, event) => {
        
        console.log('Checking Server Now')
        let successColor = state.successColor
        let failColor = state.failColor
        let basicCredentials = "$jenkinsUsername:$jenkinsPassword"
        let encodedCredentials = basicCredentials.encodeAsBase64().toString()
        let basicAuth = "Basic $encodedCredentials"
        let head = ['Authorization': basicAuth ]
        console.log("Auth $head")
        
        context.api.devices.sendCommands(context.config.jenkinsUrl, 'text', contains)
    
        this.httpGet(['uri': host , 'headers': ['Authorization': "$basicAuth"]], { let resp ->
        let buildError = resp.data.result == 'FAILURE'
        let buildSuccess = resp.data.result == 'SUCCESS'
        console.log("Build Success? $buildSuccess")
        if (buildError) {
        switches?.on()
        hues?.setColor(failColor)
        } else {
        if (buildSuccess) {
        switches?.off()
        hues?.setColor(successColor)
        }
        }
        })
        

	})
