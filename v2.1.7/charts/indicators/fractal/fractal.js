define(["jquery","lodash","common/rivetsExtra","jquery-ui","color-picker","ddslick"],function(a,b,c){function d(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function e(e,f){require(["css!charts/indicators/fractal/fractal.css"]),require(["text!charts/indicators/fractal/fractal.html","text!charts/indicators/indicators.json"],function(g,h){var i="#cd0a0a";g=a(g),g.appendTo("body"),h=JSON.parse(h);var j=h.fractal,k={title:j.long_display_name,description:j.description};c.bind(g[0],k),g.find("input[type='button']").button(),g.find("#fractal_color").colorpicker({position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),defaultStrokeColor="#"+c.formatted},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),defaultStrokeColor="#"+c.formatted}}),g.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"fractal-ui-dialog",buttons:[{text:"OK",click:function(){var c=a("#number_of_bars");if(!b.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})});if(0===Math.abs(parseInt(c.val()%2)))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"The number of bars on sides should be an odd number!"})});var e=a(a(".fractal").data("refererChartID")).highcharts().series[0],f={numberOfBars:parseInt(c.val()),color:i,onSeriesID:e.options.id};e.addIndicator("fractal",f),d.call(g)}},{text:"Cancel",click:function(){d.call(this)}}]}),b.isFunction(f)&&f(e)})}return{open:function(b){return 0==a(".fractal").length?void e(b,this.open):void a(".fractal").data("refererChartID",b).dialog("open")}}});