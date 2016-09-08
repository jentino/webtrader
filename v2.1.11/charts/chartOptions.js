define(["jquery","common/rivetsExtra","charts/chartWindow","charts/charts","moment","charts/chartingRequestMap","common/util"],function(a,b,c,d){function e(a){a.showTimePeriodSelector=!1,a.toggleLoadSaveSelector(null,a),a.toggleChartTypeSelector(null,a),a.toggleDrawingToolSelector(null,a),a.toggleExportSelector(null,a)}function f(b,c){"table"==c?(l[b.newTabId].showChartTypeSelector=!1,b.tableViewCallback&&b.tableViewCallback()):(l[b.newTabId].chartType=q.filter(function(a){return a.value==c})[0],l[b.newTabId].showChartTypeSelector=!1,d.refresh("#"+b.newTabId+"_chart",null,c),a("#"+b.newTabId).trigger("chart-type-changed",c)),e(b)}function g(b){var c=!1,d=a(b).highcharts();return d&&d.series.forEach(function(a){"percent"===a.options.compare&&(c=!0)}),c}function h(a,b){b?(l[a].chartTypes=q,l[a].chartTypes[1].showBorder=!0):l[a].chartTypes=q.filter(function(a){return"candlestick"!==a.value&&"ohlc"!==a.value})}function i(a,b){var c=b.find(".loadSaveOverlay"),d=b.find(".exportOverlay"),e=b.find(".timeperiod"),f=b.find(".chart_type");b.find(".chartTypeOverlay").css("width",o.ct+53+"px");var g=b.find(".shareButton"),h=420+(o.tp.max+o.ct+65-184);b.width()>h?(a.showChartTypeLabel=!0,a.timePeriod_name=a.timePeriod.name,e.css("width",o.tp.max+25+"px"),f.css("width",o.ct+55+"px")):(a.showChartTypeLabel=!1,a.timePeriod_name="en"==i18n_name?a.timePeriod.value.toUpperCase():a.timePeriod.value.i18n(),e.css("width",o.tp.min+27+"px"),f.css("width","45px"));var i=b.width()-(g.offset().left+g.outerWidth()-b.offset().left);b.width()<=730?(i=i>0?i:25,d.css("right",i+"px"),c.css("right",i+35+"px")):(c.css("right","auto"),d.css("right","auto"))}function j(){var b=p.reduce(function(a,b){return a.value.i18n().length>b.value.i18n().length?a:b}),c=p.reduce(function(a,b){return a.name.i18n().length>b.name.i18n().length?a:b}),d=q.reduce(function(a,b){return a.name.i18n().length>b.name.i18n().length?a:b}),e=function(b){var c="0.8em roboto,sans-serif",d=a("<div>"+b.i18n()+"</div>").css({position:"absolute","float":"left","white-space":"nowrap",visibility:"hidden",font:c}).appendTo(a("body")),e=d.width();return d.remove(),e};o.tp={},o.tp.min=e(b.value),o.tp.max=e(c.name),o.ct=e(d.name)}function k(){q.forEach(function(a){"table"!==a.value&&((new Image).src="images/"+a.value+"-w.svg")}),(new Image).src="images/share-w.svg",(new Image).src="images/drawing-w.svg",(new Image).src="images/chart_template-w.svg"}var l=[],m=[],n={},o={},p=[{value:"1t",name:"1 Tick",digit:1,type:"ticks"},{value:"1m",name:"1 Minute",digit:1,type:"minutes"},{value:"2m",name:"2 Minutes",digit:2,type:"minutes"},{value:"3m",name:"3 Minutes",digit:3,type:"minutes"},{value:"5m",name:"5 Minutes",digit:5,type:"minutes"},{value:"10m",name:"10 Minutes",digit:10,type:"minutes"},{value:"15m",name:"15 Minutes",digit:15,type:"minutes"},{value:"30m",name:"30 Minutes",digit:30,type:"minutes"},{value:"1h",name:"1 Hour",digit:1,type:"hours"},{value:"2h",name:"2 Hours",digit:2,type:"hours"},{value:"4h",name:"4 Hours",digit:4,type:"hours"},{value:"8h",name:"8 Hours",digit:8,type:"hours"},{value:"1d",name:"1 Day",digit:1,type:"days"}],q=[{value:"candlestick",name:"Candles"},{value:"ohlc",name:"OHLC"},{value:"line",name:"Line"},{value:"dot",name:"Dot"},{value:"linedot",name:"Line Dot"},{value:"spline",name:"Spline"},{value:"table",name:"Table"}];return i18n_name=(local_storage.get("i18n")||{value:"en"}).value,appURL=getAppURL(),urlShareTemplate=appURL+"?affiliates=true&instrument={0}&timePeriod={1}&lang="+i18n_name,iframeShareTemplate='<iframe src="'+urlShareTemplate+'" width="350" height="400" style="overflow-y : hidden;" scrolling="no" />',twitterShareTemplate="https://twitter.com/share?url={0}&text={1}",fbShareTemplate="https://facebook.com/sharer/sharer.php?u={0}",gPlusShareTemplate="https://plus.google.com/share?url={0}",bloggerShareTemplate="https://www.blogger.com/blog-this.g?u={0}&n={1}",vkShareTemplate="http://vk.com/share.php?url={0}&title={1}",{init:function(o,r,s,t,u,v,w){require(["text!charts/chartOptions.html","css!charts/chartOptions.css"],function(x){j(),m[o]&&m[o].unbind(),l[o]={newTabId:o,timePeriod:p.filter(function(a){return r==a.value})[0],timeperiod_arr:p,chartType:q.filter(function(a){return a.value==s})[0],tableViewCallback:t,instrumentName:u,instrumentCode:v,indicatorsCount:0,overlayCount:0,showTimePeriodSelector:!1,showChartTypeSelector:!1,showTableOption:!0,enableCrosshair:!0,showDrawingToolSelector:!1,showExportSelector:!1,showLoadSaveSelector:!1,showOptions:"undefined"==typeof w?!0:w,exportChartURLShare:urlShareTemplate.format(v,r),exportChartIframeShare:iframeShareTemplate.format(v,r),fbShareLink:fbShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),twitterShareLink:twitterShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),gPlusShareLink:gPlusShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),bloggerShareLink:bloggerShareTemplate.format(urlShareTemplate.format(v,r),u+"("+r+")"),vkShareLink:vkShareTemplate.format(urlShareTemplate.format(v,r),u+"("+r+")")},m[o]=null,l[o].toggleTimerPeriodSelector=function(a,b){var c=!b.showTimePeriodSelector;e(b),b.showTimePeriodSelector=c},l[o].toggleChartTypeSelector=function(b,c){var d=!c.showChartTypeSelector,f=a("#"+c.newTabId+" .chart_type .img img")[0];1==d&&b?(e(c),c.showChartTypeSelector=d,f.src=f.src.replace(".svg","-w.svg")):(c.showChartTypeSelector=!1,f.src=f.src.replace("-w",""))},l[o].addRemoveIndicator=function(a,b){require(["charts/indicators/indicatorManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod.value+")";a.openDialog("#"+b.newTabId+"_chart",c)}),e(b)},l[o].addRemoveOverlay=function(a,b){require(["charts/overlay/overlayManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod.value+")";a.openDialog("#"+b.newTabId+"_chart",c)}),e(b)},l[o].changeChartType=function(b,c){var d=a(b.target).attr("data-charttype");d&&f(c,d)},l[o].changeTimePeriod=function(b,j){var k=b.target.dataset.timeperiod;if(k){j=l[j.newTabId],j.timePeriod=p.filter(function(a){return k==a.value})[0],i(j,a("#"+j.newTabId).find(".chart-view"));var m=isTick(k);!m||"candlestick"!==j.chartType.value&&"ohlc"!==j.chartType.value||f(j,"line"),h(j.newTabId,!m&&!g("#"+o+"_chart")),d.refresh("#"+j.newTabId+"_chart",k,j.chartType.value),"true"===getParameterByName("affiliates")?d.changeTitle("#"+j.newTabId+"_chart",j.instrumentName+" ("+k+")"):c.changeChartWindowTitle(j.newTabId,j.instrumentName,k),e(j),j.exportChartURLShare=urlShareTemplate.format(j.instrumentCode,k),j.exportChartIframeShare=iframeShareTemplate.format(j.instrumentCode,k),j.fbShareLink=fbShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),j.twitterShareLink=twitterShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),j.gPlusShareLink=gPlusShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r))),j.bloggerShareLink=bloggerShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),j.vkShareLink=vkShareTemplate.format(encodeURIComponent(urlShareTemplate.format(v,r)),u+"("+r+")"),a("#"+j.newTabId).trigger("chart-time-period-changed",k)}},h(o,!isTick(r)&&!g("#"+o+"_chart")),t||(l[o].showTableOption=!1),l[o].toggleCrosshair=function(a,b){b.enableCrosshair=!b.enableCrosshair,require(["charts/crosshair"],function(a){a.toggleCrossHair("#"+b.newTabId+"_chart")}),e(b)},l[o].toggleDrawingToolSelector=function(b,c){var d=!c.showDrawingToolSelector,f=a("#"+c.newTabId+" .drawButton .img img")[0];1==d&&b?(e(c),c.showDrawingToolSelector=d,f.src=f.src.replace(".svg","-w.svg")):(c.showDrawingToolSelector=!1,f.src=f.src.replace("-w",""))},l[o].addDrawingTool=function(b,c){var d=b.target.dataset.drawingtool;d&&(require(["charts/draw/highcharts_custom/"+d],function(b){var d="#"+c.newTabId+"_chart";a(d).highcharts().annotate=!0,b.init(d)}),e(c))},l[o].toggleExportSelector=function(b,c){var d=!c.showExportSelector,f=a("#"+c.newTabId+" .shareButton .img img")[0];1==d&&b?(e(c),c.showExportSelector=d,f.src=f.src.replace(".svg","-w.svg")):(c.showExportSelector=!1,f.src=f.src.replace("-w",""))},l[o].toggleLoadSaveSelector=function(b,c){var d=!c.showLoadSaveSelector,f=a("#"+c.newTabId+" .templateButton .img img")[0];1==d&&b?(e(c),c.showLoadSaveSelector=d,f.src=f.src.replace(".svg","-w.svg")):(c.showLoadSaveSelector=!1,f.src=f.src.replace("-w",""))},l[o]["export"]=function(b,c){var f=b.target.dataset.exporttype;if(f){var g="#"+c.newTabId+"_chart",h=a(g).highcharts();switch(f){case"png":h.exportChartLocal();break;case"pdf":h.exportChart({type:"application/pdf"});break;case"csv":d.generate_csv(h,a(g).data());break;case"svg":h.exportChartLocal({type:"image/svg+xml"})}e(c)}},a("#"+o).on("chart-indicators-changed",function(a,b){l[o].indicatorsCount=b.get_indicators().length}),l[o].overlayCount=a("#"+o+"_chart").data("overlayCount"),a("#"+o).on("chart-overlay-add",function(){var b=a("#"+o+"_chart").highcharts();l[o].overlayCount=b.get_overlay_count()}),a("#"+o).on("chart-overlay-remove",function(){var b=a("#"+o+"_chart").highcharts();l[o].overlayCount=b.get_overlay_count()}),"true"==getParameterByName("affiliates")?a(window).resize(function(){i(l[o],a("#"+o).find(".chart-view"))}):a("#"+o).on("resize-event",function(){i(l[o],a(this).find(".chart-view"))}),k();var y=a(x);a("#"+o+"_header").prepend(y),i(l[o],a("#"+o).find(".chart-view")),b.formatters.filter=function(a,b){return a.filter(function(a){return a.type.i18n()==b})},m[o]=b.bind(y[0],l[o]),require(["charts/chartTemplateManager"],function(a){var b=y.find(".chart-template-manager-root");n[o]=a.init(b,o)})})},updateOptions:function(b,e,f,g,j){var k=l[b];k&&(k.chartType=q.filter(function(a){return a.value==e})[0],k.timePeriod=p.filter(function(a){return f==a.value})[0],k.indicatorsCount=g,k.overlayCount=j,h(b,!isTick(f)&&j>0),i(k,a("#"+b).find(".chart-view")),"true"===getParameterByName("affiliates")?d.changeTitle("#"+b+"_chart",l[b].instrumentName+" ("+f+")"):c.changeChartWindowTitle(b,l[b].instrumentName,f))},disableEnableCandlestickAndOHLC:function(a,b){l[a]&&h(a,b)},selectChartType:function(a,b,c){c?l[a].changeChartType(l[a],b):l[a].chartType=q.filter(function(a){return a.value==b})[0]},cleanBinding:function(a){m[a]&&(m[a].unbind(),n[a]&&n[a].unbind(),delete n[a],delete m[a],delete l[a])},setIndicatorsCount:function(a,b){l[b].indicatorsCount=a}}});