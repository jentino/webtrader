define(["jquery","charts/chartingRequestMap","websockets/binary_websockets","websockets/ohlc_handler","currentPriceIndicator","charts/indicators/highcharts_custom/indicators","moment","lodash","text!charts/indicators/indicators.json","highcharts-exporting","common/util","paralleljs","jquery-growl"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){var c=a.containerIDWithHash,d=a.timePeriod,e=a.instrumentCode;if(d&&e){var f=b.keyFor(e,d);b.unregister(f,c)}}function k(c,d){var e=d.instrumentName+" ("+d.timePeriod+").csv",f=[],i=[],j=function(a){var b=null;if(h.isArray(a)&&a.length>3){var c=a[0];b='"'+g.utc(c).format("YYYY-MM-DD HH:mm")+'",'+a.slice(1,a.length).join(",")}else b=h.isNumber(a.high)?'"'+g.utc(a.time).format("YYYY-MM-DD HH:mm")+'",'+a.open+","+a.high+","+a.low+","+a.close:h.isArray(a)&&a.length>1?'"'+g.utc(a[0]).format("YYYY-MM-DD HH:mm")+'",'+a[1]:h.isObject(a)&&a.title&&a.text?a instanceof FractalUpdateObject?'"'+g.utc(a.x||a.time).format("YYYY-MM-DD HH:mm")+'",'+(a.isBull?"UP":a.isBear?"DOWN":" "):'"'+g.utc(a.x||a.time).format("YYYY-MM-DD HH:mm")+'",'+a.text:h.isNumber(a.y)?'"'+g.utc(a.x||a.time).format("YYYY-MM-DD HH:mm")+'",'+(a.y||a.close):a.toString();return b};c.series.forEach(function(a,c){if("navigator"===a.options.id)return!0;var e=a.options.data.map(function(a){return j(a)})||[];if(0==c){var h=e[0].split(",").length>2;f.push(h?"Date,Open,High,Low,Close":'Date,"'+a.options.name+'"');var k=b.keyFor(d.instrumentCode,d.timePeriod),l=b.barsTable.chain().find({instrumentCdAndTp:k}).simplesort("time",!1).data();f=f.concat(l.map(function(a){return h?['"'+g.utc(a.time).format("YYYY-MM-DD HH:mm")+'"',a.open,a.high,a.low,a.close].join(","):['"'+g.utc(a.time).format("YYYY-MM-DD HH:mm")+'"',a.close].join(",")}))}else f[0]+=',"'+a.options.name+'"',i.push(e)}),a.growl.notice({message:"Downloading .csv".i18n()}),new Parallel([f,i]).spawn(function(a){var b=a[0],c=a[1];return b=b.map(function(a){return c.forEach(function(b){var c=!1;b.forEach(function(b){if(b){var d=b.split(",");if(a.split(",")[0]===d[0])return a+=","+d.slice(1,d.length).join(","),c=!0,!1}}),-1!=a.indexOf("Date")||c||(a+=",")}),a})}).then(function(a){var b=a.join("\n"),c=new Blob([b],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(c,e);else{var d=document.createElement("a");if(void 0!==d.download){var f=URL.createObjectURL(c);d.setAttribute("href",f),d.setAttribute("download",e),d.style.visibility="hidden",document.body.appendChild(d),d.click(),document.body.removeChild(d)}}},function(b){a.growl.error({message:"Error downloading .csv".i18n()})})}var l=h(JSON.parse(i)).values().value();Highcharts.Chart.prototype.get_indicators=function(){var a=this,b=[];return a.series.length>0&&l.forEach(function(c){var d=c.id;a.series[0][d]&&a.series[0][d]&&a.series[0][d].forEach(function(a){b.push({id:d,name:c.long_display_name,options:a.options})})}),b},Highcharts.Chart.prototype.set_indicators=function(a){var b=this;b.series[0]&&a.forEach(function(a){require(["charts/indicators/"+a.id+"/"+a.id],function(){b.series[0].addIndicator(a.id,a.options)})})},Highcharts.Chart.prototype.get_indicator_series=function(){var a=this,b=[];return a.series.length>0&&l.forEach(function(c){var d=c.id;a.series[0][d]&&a.series[0][d][0]&&b.push({id:d,series:a.series[0][d]})}),b},Highcharts.Chart.prototype.set_indicator_series=function(a){var b=this;0!=b.series.length&&a.forEach(function(a){b.series[0][a.id]=a.series})},Highcharts.Chart.prototype.get_overlay_count=function(){var a=0;return this.series.forEach(function(b,c){b.options.isInstrument&&-1==b.options.id.indexOf("navigator")&&0!=c&&a++}),a},a(function(){Highcharts.setOptions({global:{useUTC:!0,canvasToolsURL:"https://code.highcharts.com/modules/canvas-tools.js"},lang:{thousandsSep:","}})}),f.initHighchartIndicators(b.barsTable);var m={drawChart:function(f,g,h){var i=[],j=[];if(a(f).highcharts()){var k=b.keyFor(g.instrumentCode,g.timePeriod);b.removeChart(k,f);var l=a(f).highcharts();i=l.get_indicators(),j=g.overlays,l.destroy()}g.indicators&&(i=g.indicators,j=g.overlays,a(f).data("overlayCount",j.length)),("candlestick"===g.type||"ohlc"===g.type)&&j.length>0&&(j=[]),a(f).data({instrumentCode:g.instrumentCode,instrumentName:g.instrumentName,timePeriod:g.timePeriod,type:g.type,delayAmount:g.delayAmount}),a(f).highcharts("StockChart",{chart:{events:{load:function(){this.showLoading(),e.init(),c.execute(function(){d.retrieveChartDataAndRender({timePeriod:g.timePeriod,instrumentCode:g.instrumentCode,containerIDWithHash:f,type:g.type,instrumentName:g.instrumentName,series_compare:g.series_compare,delayAmount:g.delayAmount})["catch"](function(b){var c="Error getting data for ".i18n()+instrumentName+"";require(["jquery-growl"],function(a){a.growl.error({message:c})});var d=a(f).highcharts();d&&d.showLoading(c)}).then(function(){var b=a(f).highcharts();setTimeout(function(){b&&b.set_indicators(i),j.forEach(function(a){m.overlay(f,a.symbol,a.displaySymbol,a.delay_amount)})},0)})}),a.isFunction(h)&&h(),"true"===getParameterByName("affiliates")&&"ja"===getLang()?this.credits.element.remove():this.credits.element.onclick=function(){window.open("http://webtrader.binary.com","_blank")}}},spacingLeft:0,marginLeft:45},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{shadow:!1},series:{events:{afterAnimate:function(){this.options.isInstrument&&"navigator"!==this.options.id&&(this.removeCurrentPrice(),this.addCurrentPrice(),require(["common/highcharts.mousewheel"],function(a){a.mousewheel(f)})),this.chart.hideLoading()}}}},title:{text:"true"===getParameterByName("affiliates")?g.instrumentName+" ("+g.timePeriod+")":""},credits:{href:"http://webtrader.binary.com",text:"Binary.com : Webtrader"},xAxis:{events:{afterSetExtremes:function(){}},labels:{formatter:function(){var a=this.axis.defaultLabelFormatter.call(this);return a.replace(".","")}},ordinal:!1},scrollbar:{liveRedraw:!1},yAxis:[{opposite:!1,labels:{formatter:function(){return a(f).data("overlayIndicator")?(this.value>0?" + ":"")+this.value+"%":this.value},align:"center"}}],rangeSelector:{enabled:!1},tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0},exporting:{enabled:!1,url:"https://export.highcharts.com",filename:g.instrumentName.split(" ").join("_")+"("+g.timePeriod+")"}})},destroy:j,triggerReflow:function(b){a(b).highcharts()&&a(b).highcharts().reflow()},generate_csv:k,refresh:function(c,d,e,f,g){var h=a(c).data("instrumentCode");if(d){var i=b.keyFor(h,a(c).data("timePeriod"));b.unregister(i,c),a(c).data("timePeriod",d)}e?a(c).data("type",e):e=a(c).data("type",e);var j=a(c).highcharts(),k=this,l=[],m=void 0;"ohlc"!==e&&"candlestick"!==e&&a(j.series).each(function(a,b){b.options.isInstrument&&(l.push(b.name),m=b.options.compare)}),require(["instruments/instruments"],function(b){g||(g=[],l.forEach(function(d){var e=b.getSpecificMarketData(d);if(void 0!=e.symbol&&a.trim(e.symbol)!=a(c).data("instrumentCode")){var f={symbol:e.symbol,displaySymbol:d,delay_amount:e.delay_amount};g.push(f)}})),k.drawChart(c,{instrumentCode:h,instrumentName:a(c).data("instrumentName"),timePeriod:a(c).data("timePeriod"),type:a(c).data("type"),series_compare:m,delayAmount:a(c).data("delayAmount"),overlays:g,indicators:f})})},addIndicator:function(b,c){if(a(b).highcharts()){var d=a(b).highcharts(),e=d.series[0];e&&d.addIndicator(a.extend({id:e.options.id},c))}},overlay:function(b,e,f,g){if(a(b).highcharts()){var h=a(b).highcharts(),i=h.get_indicator_series(),j=a(b).data("timePeriod"),k=a(b).data("type");h.showLoading();for(var l=0;l<h.series.length;l++){var m=h.series[l];(m.options.isInstrument||m.options.onChartIndicator)&&m.update({compare:"percent"})}return new Promise(function(a){c.execute(function(){d.retrieveChartDataAndRender({timePeriod:j,instrumentCode:e,containerIDWithHash:b,type:k,instrumentName:f,series_compare:"percent",delayAmount:g}).then(function(){h&&h.set_indicator_series(i),a()})["catch"](a)})})}return Promise.resolve()},changeTitle:function(b,c){var d=a(b).highcharts();d.setTitle(c)}};return m});