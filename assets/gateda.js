/* Master app: GateDA core (progress store) + module loaders */
(function(){
  var LS = "gateda.v1.";
  function get(k, d){
    try { var v = localStorage.getItem(LS + k); return v == null ? d : JSON.parse(v); }
    catch(e){ return d; }
  }
  function set(k, v){
    try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch(e){}
  }
  var S = {
    get: get,
    set: set,
    topicState: function(id){ return get("topic." + id, {status:"not-started", confidence:0, bookmarked:false, lastStudied:null, note:""}); },
    setTopic: function(id, patch){
      var cur = S.topicState(id);
      for(var k in patch) cur[k] = patch[k];
      if(patch.status && patch.status !== "not-started") cur.lastStudied = new Date().toISOString();
      set("topic." + id, cur);
      document.dispatchEvent(new CustomEvent("gateda:progress", {detail:{id:id}}));
      return cur;
    },
    attempts: function(){ return get("attempts", []); },
    logAttempt: function(a){ a.ts = new Date().toISOString(); var l = S.attempts(); l.push(a); set("attempts", l); return a; },
    mocks: function(){ return get("mocks", []); },
    logMock: function(m){ m.ts = new Date().toISOString(); var l = S.mocks(); l.push(m); set("mocks", l); return m; },
    plan: function(){ return get("plan", {targetYear:2027, minPerDay:90, priorities:{}}); },
    savePlan: function(p){ set("plan", p); },
    tasks: function(){ return get("tasks", []); },
    saveTasks: function(t){ set("tasks", t); }
  };
  window.GateDA = S;
  window.GateDALoad = function(){
    function loadJSON(u){ return fetch(u, {cache:"no-store"}).then(function(r){ if(!r.ok) throw new Error(u); return r.json(); }); }
    return Promise.all([loadJSON("../data/syllabus-a.json"), loadJSON("../data/syllabus-b.json"), loadJSON("../data/syllabus-meta.json")])
      .then(function(p){ var subs = p[0].subjects.concat(p[1].subjects); return {subjects: subs, meta: p[2]}; });
  };
})();
