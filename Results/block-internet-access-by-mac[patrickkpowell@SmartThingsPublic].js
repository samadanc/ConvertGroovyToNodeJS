
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Block Internet Access', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

    })

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switch', log)
    
        let mypath
        if 
        mypath = '/cgi-bin/block.cgi'
        }
        if 
        mypath = '/cgi-bin/allow.cgi'
        }
        console.log('one of the configured switches changed states - calling ' + mypath )
        let params = ['uri': 'http://server.powellcompanies.com', 'path': mypath , 'headers': ['Accept': '*/*', 'DNT': '1', 'Accept-Encoding': 'plain', 'Cache-Control': 'max-age=0', 'Accept-Language': 'en-US,en,q=0.8', 'Connection': 'keep-alive', 'Host': 'smartthings.powellcompanies.com', 'Referer': 'https://smartthings.powellcompanies.com', 'Connection-Control': 'AlsaireaLAERILeaeAejkejIAjrieOJAOEIroaOIRRIAOIfhuefhiuaeiufaieufuUHUIAHUHUEIUHAEFUHIFUFHEaufUHifuahUAEhfiUfhaefiIFUhUfahfjhfhsvgejf', 'User-Agent': 'SmartThings/1.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36']]
        try {
        this.httpGet(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        let theHeaders = resp.getHeaders('Content-Length')
        console.log("response contentType: ${resp.contentType}")
        console.log("response status code: ${resp.status}")
        console.log("response data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})
