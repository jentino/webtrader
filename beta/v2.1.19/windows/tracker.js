define(["windows/windows","websockets/binary_websockets","lodash","navigation/menu"],function(a,b,c,d){function e(){return new Promise(function(a){return b.is_authenticated()?a():void b.events.on_till("login",function(){return a(),!0})})}function f(a,c){var d={assetIndex:"#nav-container .assetIndex",statement:"#nav-container .statement",tradingTimes:"#nav-container .tradingTimes",download:"#nav-container .download",portfolio:"#nav-container .portfolio",profitTable:"#nav-container .profitTable",token:"#nav-container .token-management",deposit:"#nav-container .deposit",withdraw:"#nav-container .withdraw"},f=0,g=function(c,g){if("closed"!==c.position.mode)if(c.is_unique)c.is_authorized?e().then(function(){return $(d[g]).click(),!0}):$(d[g]).click();else if("chartWindow"===g){var h=c.data.instrumentCode;if(a.length>0&&-1===a.indexOf(h))return;c.data.tracker_id=++f,require(["charts/chartWindow"],function(a){a.addNewWindow(c.data)})}else"tradeDialog"===g&&e().then(function(){return c.data.tracker_id=++f,b.send({contracts_for:c.data.symbol.symbol}).then(function(a){require(["trade/tradeDialog"],function(b){var d=b.init(c.data.symbol,a.contracts_for,c.data.template);if(c.position.offset){var e=c.position.offset.left,f=c.position.offset.top;d.dialog("widget").animate({left:e+"px",top:f+"px"},1e3,d.trigger.bind(d,"animated")),d.dialog("option","position",{my:e,at:f})}})})["catch"](void 0),!0})};_.forEach(c,function(a,b){_.isArray(a)?a.forEach(function(a){g(a,b)}):g(a,b)})}function g(a,b,c,d){var e=d.position;e.size&&b.dialog("option","width",e.size.width),e.size&&b.dialog("option","height",e.size.height),c.position.size=e.size,c.position.mode=e.mode,"maximized"===e.mode?setTimeout(function(){b.dialogExtend("maximize"),b.dialog("moveToTop")},10):"minimized"===e.mode&&b.dialogExtend("minimize"),e.offset&&(a.css({left:e.offset.left+"px",top:e.offset.top+"px"}),c.position.offset=e.offset),l()}function h(a,b){var c=b.dialog("widget"),d=null,e={module_id:a.module_id,is_unique:a.is_unique,is_authorized:"true"===b.attr("data-authorized"),data:a.data,position:{size:{width:b.dialog("option","width"),height:b.dialog("option","height")},offset:void 0,mode:"normal"}};if(a.is_unique)i[a.module_id]=e,d=j[a.module_id],d&&("closed"===d.position.mode&&(d=null),delete j[a.module_id]);else if(i[a.module_id]=i[a.module_id]||[],i[a.module_id].push(e),j[a.module_id]&&void 0!==e.data.tracker_id){var f=_.findIndex(j[a.module_id],function(a){return a.data.tracker_id===e.data.tracker_id});-1!==f&&(d=j[a.module_id][f],j[a.module_id].splice(f,1),"closed"===d.position.mode&&(d=null))}return l(),c.on("dragstop",function(){e.position.offset=c.offset(),l()}),c.on("animated",function(){e.position.offset=c.offset(),l()}),c.on("resizestop",function(a,b){e.position.size=b.size,e.position.offset=c.offset(),l()}),b.on("dialogextendminimize",function(){e.position.mode="minimized",l()}),b.on("dialogextendmaximize",function(){e.position.mode="maximized",l()}),b.on("dialogextendrestore",function(){e.position.offset=c.offset(),e.position.mode="normal",l()}),b.on("dialogdestroy",function(){if(e.is_unique)delete i[e.module_id];else if(i[e.module_id]){var a=i[e.module_id].indexOf(e);1==i[e.module_id].length?delete i[e.module_id]:i[e.module_id].splice(a,1)}l()}),b.on("dialogclose",function(){e.position.mode="closed",l()}),b.on("dialogopen",function(){e.position.offset=c.offset(),e.position.mode="normal",l(),d&&(g(c,b,e,d),d=null)}),function(a){e.data=a,l()}}var i=local_storage.get("states")||{},j={},k=b.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(a){var b=d.extractChartableMarkets(a),c=_(b).map("submarkets").flatten().map("instruments").flatten().map("symbol").value();return c})["catch"](function(a){return[]}),l=_.debounce(function(){local_storage.set("states",i)},50);return{track:h,reopen:function(){k.then(function(a){j=i,i={},l(),f(a,j)})},reopen_trade_dialogs:function(a){k.then(function(b){f(b,{tradeDialog:a})})},get_trade_dialogs:function(){return _.cloneDeep(i.tradeDialog||[])},is_empty:function(){var a=_.values(i).filter(function(a){return _.isArray(a)||"closed"!==a.position.mode});return 0===a.length}}});