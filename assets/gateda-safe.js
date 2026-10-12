/* Safe store: schema validation + migration + recovery for gateda.v1.* */
(function(){var LS="gateda.v1.";var STATUSES=["not-started","in-progress","practiced","revision-needed","mastered"];
function safeParse(raw,fb){if(raw==null)return fb;try{return JSON.parse(raw)}catch(e){return{__corrupt:true,fb:fb}}}
function get(k,d){var r=safeParse(localStorage.getItem(LS+k),d);if(r&&r.__corrupt){try{localStorage.setItem(LS+k+".corrupt-bak",localStorage.getItem(LS+k))}catch(e){}return d}return r}
function set(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function topicState(id){var s=get("topic."+id,null);if(!s||typeof s!=="object")s={};return{status:STATUSES.indexOf(s.status)>=0?s.status:"not-started",confidence:(typeof s.confidence==="number"?Math.max(0,Math.min(5,s.confidence)):0),bookmarked:!!s.bookmarked,lastStudied:(typeof s.lastStudied==="string"?s.lastStudied:null),note:(typeof s.note==="string"?s.note:"").slice(0,2000)}}
window.GateDASafe={get:get,set:set,topicState:topicState,STATUSES:STATUSES};})();
