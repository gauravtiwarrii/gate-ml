/* GATE DA syllabus.js — syllabus-aware cross-linking (lessons → topics → questions).
 * Public API: GateDASyllabus
 *   - load() -> Promise[{subjects, meta}]  (fetches syllabus-a.json, syllabus-b.json)
 *   - getSubj(id), getTopic(subjId, topicId)
 *   - topicQuestions(subjId, topicId) -> [{q},...] from practice-da.json (client)
 *   - coverage() -> {total, covered, missing:[...]} via GateDA.coverage()
 */
(function(){
  var LS="gateda.v1.", SUB="syllabus.subjects.v1";
  function get(k,d){try{return JSON.parse(localStorage.getItem(LS+k))||d}catch(e){return d}}
  function set(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
  function fold(subs){var m={};subs.forEach(function(s){m[s.id]=s;});return m;}
  function load(){
    return fetch("../data/syllabus-a.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("a");return r.json();})
    .then(function(a){return fetch("../data/syllabus-b.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("b");return r.json();}).then(function(b){var subs=a.subjects.concat(b.subjects);set(SUB,subs);return{subjects:subs,meta:a.meta||{}}})});
  }
  function getSubj(id){return get(SUB,{})[id]||null;}
  function getTopic(subjId, topicId){
    var s=getSubj(subjId);if(!s)return null;
    return s.topics.filter(function(t){return t.id===topicId})[0]||null;
  }
  function topicQuestions(subjId, topicId){
    return GateDA.get("qbank",{}).questions.filter(function(q){
      return q.subject===subjId && q.topic===topicId;
    });
  }
  function coverage(){
    var subs={
      ai:{id:"ai",name:"AI",src:"syllabus-a"},
      calc:{id:"calc",name:"Calculus",src:"syllabus-a"},
      dbms:{id:"dbms",name:"DBMS",src:"syllabus-b"},
      ga:{id:"ga",name:"Aptitude",src:"syllabus-a"},
      linalg:{id:"linalg",name:"Linear Algebra",src:"syllabus-a"},
      ml:{id:"ml",name:"Machine Learning",src:"syllabus-b"},
      prob:{id:"prob",name:"Probability",src:"syllabus-a"}
    };
    var bank=get("qbank",{questions:[]});
    var covered=0,total=0,missing=[];
    for(var s in subs){
      var ss=subs[s];total+=ss.topics.length;
      (ss.topics||[]).forEach(function(t){
        var found=bank.questions.some(function(q){return q.subject===ss.id&&q.topic===t.id;});
        if(found)covered++; else missing.push({sub: ss.id, topic: t.id, name:t.name||t.id});
      });
    }
    return {total:total, covered:covered, missing:missing};
  }
  window.GateDASyllabus={load:load, getSubj:getSubj, getTopic:getTopic, topicQuestions:topicQuestions, coverage:coverage};
})();
