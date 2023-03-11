
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('refresh24HourEnergyReport', delay);

        context.api.schedules.runEvery5Minutes('refreshOneHourEnergyReport', delay);

        context.api.schedules.runEvery1Hour('refreshLastWeekEnergyReport', delay);

        context.api.schedules.runEvery1Hour('refreshLastMonthEnergyReport', delay);

        context.api.schedules.runEvery1Hour('refreshSinceStartEnergyReport', delay);

    })

    .scheduledEventHandler('refreshLastWeekEnergyReport', (context, event) => {
        
                this.logDebug("refreshLastWeekEnergyReport() Trying to connect to eGauge meter ip address: $eGaugeIpAddress")
                let result1 = new physicalgraph.device.HubAction("GET /cgi-bin/egauge-show?a&d&n=3&s=6 HTTP/1.1
        HOST: $eGaugeIpAddress:80
        
        ", physicalgraph.device.Protocol.LAN, "$eGaugeIpAddress", ['callback': refreshLastWeekEnergyReportCallback ])
                this.sendHubCommand(result1)
            

	})

    .scheduledEventHandler('refreshOneHourEnergyReport', (context, event) => {
        
                this.logDebug("refreshOneHourEnergyReport() Trying to connect to eGauge meter ip address: $eGaugeIpAddress")
                let result1 = new physicalgraph.device.HubAction("GET /cgi-bin/egauge-show?a&S&n=3&s=3598 HTTP/1.1
        HOST: $eGaugeIpAddress:80
        
        ", physicalgraph.device.Protocol.LAN, "$eGaugeIpAddress", ['callback': refreshOneHourEnergyReportCallback ])
                this.sendHubCommand(result1)
            

	})

    .scheduledEventHandler('refreshLastMonthEnergyReport', (context, event) => {
        
                this.logDebug("refreshLastWeekEnergyReport() Trying to connect to eGauge meter ip address: $eGaugeIpAddress")
                let result1 = new physicalgraph.device.HubAction("GET /cgi-bin/egauge-show?a&d&n=3&s=30 HTTP/1.1
        HOST: $eGaugeIpAddress:80
        
        ", physicalgraph.device.Protocol.LAN, "$eGaugeIpAddress", ['callback': refreshLastMonthEnergyReportCallback ])
                this.sendHubCommand(result1)
            

	})

    .scheduledEventHandler('refresh24HourEnergyReport', (context, event) => {
        
                this.logDebug("refresh24HourEnergyReport() Trying to connect to eGauge meter ip address: $eGaugeIpAddress")
                let result1 = new physicalgraph.device.HubAction("GET /cgi-bin/egauge-show?a&h&n=3&s=23 HTTP/1.1
        HOST: $eGaugeIpAddress:80
        
        ", physicalgraph.device.Protocol.LAN, "$eGaugeIpAddress", ['callback': refresh24HourEnergyReportCallback ])
                this.sendHubCommand(result1)
            

	})

    .scheduledEventHandler('refreshSinceStartEnergyReport', (context, event) => {
        
                this.logDebug("refreshSinceStartEnergyReport() Trying to connect to eGauge meter ip address: $eGaugeIpAddress")
                let result1 = new physicalgraph.device.HubAction("GET /cgi-bin/egauge-show?a&d&s=30 HTTP/1.1
        HOST: $eGaugeIpAddress:80
        
        ", physicalgraph.device.Protocol.LAN, "$eGaugeIpAddress", ['callback': refreshSinceStartEnergyReportCallback ])
                this.sendHubCommand(result1)
            

	})
