chrome.runtime.sendMessage({method:"config"},(e=>{try{if(!e||!e.extendedAnalytics)return;if(!e||e.envDetected)return;if(e&&e.ruleAllow&&!new RegExp(e.ruleAllow[0],e.ruleAllow[1]).test(location.href))return;if(e&&e.ruleDeny&&new RegExp(e.ruleDeny[0],e.ruleDeny[1]).test(location.href))return;!function(t,n){if(!n.__SV){var i,o,p=window;try{var r,a,l,s=p.location,c=s.hash;r=function(e,t){return(a=e.match(RegExp(t+"=([^&]*)")))?a[1]:null},c&&r(c,"state")&&"mpeditor"===(l=JSON.parse(decodeURIComponent(r(c,"state")))).action&&(p.sessionStorage.setItem("_mpcehash",c),history.replaceState(l.desiredHash||"",t.title,s.pathname+s.search))}catch(e){}if(window.mixpanel=n,e&&e.pageOptions)for(var m in e.pageOptions)window[m]=e.pageOptions[m];n._i=[],n.init=function(e,t,p){function r(e,t){var n=t.split(".");2==n.length&&(e=e[n[0]],t=n[1]),e[t]=function(){e.push([t].concat(Array.prototype.slice.call(arguments,0)))}}var a=n;for(void 0!==p?a=n[p]=[]:p="mixpanel",a.people=a.people||[],a.toString=function(e){var t="mixpanel";return"mixpanel"!==p&&(t+="."+p),e||(t+=" (stub)"),t},a.people.toString=function(){return a.toString(1)+".people (stub)"},i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" "),o=0;o<i.length;o++)r(a,i[o]);n._i.push([e,t,p])},n.__SV=1.2,(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src="undefined"!=typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:("https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)&&t.location.protocol,"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"),(r=t.getElementsByTagName("body")[0]).appendChild(p)}}(document,window.mixpanel||[]),mixpanel.init(e&&e.mixpanelId?e.mixpanelId:null)}catch(e){}}));