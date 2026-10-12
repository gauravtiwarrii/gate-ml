/* GATE DA client-side schema validator (subset of _validate_bank.py).
 * Validates a parsed practice-da.json question object / list.
 * Returns {ok:bool, errs:[], gaMarks:number, summary:{...}}.
 */
(function(){
  function validateQuestion(q, idx){
    var tag = q.id || '?#'+idx;
    var errs=[];
    var need=['id','subject','topic','type','marks','q','a','s','d','prov'];
    need.forEach(function(f){if(!(f in q))errs.push(tag+': missing '+f);});
    if(q.id && q.id in validateQuestion.cache) errs.push(tag+': duplicate id');
    validateQuestion.cache[q.id]=true;
    if(q.subject && q.topic){
      var ok = (['ai','calc','dbms','ga','linalg','prob','prog','ml'].indexOf(q.subject)>=0);
      if(!ok) errs.push(tag+': unknown subject '+q.subject);
    }
    if(q.type && !['mcq','msq','nat'].includes(q.type)) errs.push(tag+': bad type');
    if(q.marks && ![1,2].includes(q.marks)) errs.push(tag+': marks must be 1 or 2');
    if(q.d && ![1,2,3].includes(q.d)) errs.push(tag+': difficulty must be 1-3');
    if(q.prov && q.prov!=='practice') errs.push(tag+': prov must be practice');
    if(q.type==='mcq'){
      if(!Array.isArray(q.o)||q.o.length!==4) errs.push(tag+': mcq needs 4 options');
      if(typeof q.a!=='number'||q.a<0||q.a>3) errs.push(tag+': mcq answer must be 0-3');
    }
    if(q.type==='msq'){
      if(!Array.isArray(q.o)||q.o.length!==4) errs.push(tag+': msq needs 4 options');
      if(!Array.isArray(q.a)||q.a.length===0||!q.a.every(function(x){return Number.isInteger(x)&&x>=0&&x<=3;})) errs.push(tag+': msq answer must be non-empty list of 0-3');
    }
    if(q.type==='nat'){
      if(q.o!==undefined) errs.push(tag+': nat must not have options');
      var a=q.a;
      if(!Array.isArray(a)||a.length!==2||!a.every(function(x){return typeof x==='number';})||a[0]>a[1]) errs.push(tag+': nat answer must be [lo,hi]');
      if(!q.tol_note) errs.push(tag+': nat needs tol_note');
    }
    return {ok:errs.length===0, errs:errs};
  }
  validateQuestion.cache={};
  function validateBank(d){
    var Q=d.questions;var errs=[];var seen={};var ga=0;
    Q.forEach(function(q,i){var r=validateQuestion(q,i);if(!r.ok)errs=errs.concat(r.errs);if(q.id)see[q.id]=true;if(q.subject==='ga')ga+=q.marks;});
    return {ok:errs.length===0, errs:errs, gaMarks:ga, count:Q.length};
  }
  window.GateDA.validators={validateQuestion:validateQuestion, validateBank:validateBank};
})();
