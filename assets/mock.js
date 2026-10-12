/* GATE DA mock.js — configurable + seeded mock builder.
 * Public API: GateDAMock.build(bank, cfg, seed) -> {questions, gate}
 *   bank     : parsed practice-da.json {questions: [...]}
 *   cfg      : {totalQuestions, subjectWeights, gaMarks, techMarks, durationMin}
 *   seed     : number (determinism)
 * Scoring (official DA): MCQ 1m -1/3, 2m -2/3; MSQ/NAT no negative.
 */
(function(){
  function mulberry32(a){
    return function(){
      a|=0; a=a+0x6D2B79F5|0;
      var t=Math.imul(a^a>>>15,1|a);
      t=t+Math.imul(t^t>>>7,61|t)^t;
      return ((t^t>>>14)>>>0)/4294967296;
    };
  }
  function buildMock(bank, cfg, seed){
    var total = cfg.totalQuestions||65;
    var subW = cfg.subjectWeights||{ga:13,calc:9,prob:10,prog:8,dbms:8,linalg:9,ml:10,ai:8};
    var diffW = cfg.difficultyWeights||{1:1,2:1,3:1};
    var subKeys=Object.keys(subW);
    var subTot=subKeys.reduce(function(a,k){return a+subW[k];},0);
    // Weighted slot allocation
    var slots={};
    for(var i=0;i<total;i++){
      var r=mulberry32((seed||0)+i);
      var acc=0, choice=subKeys[0];
      for(var j=0;j<subKeys.length;j++){
        acc+=subW[subKeys[j]]/subTot;
        if(r<acc){choice=subKeys[j];break;}
      }
      slots[choice]=(slots[choice]||0)+1;
    }
    // Group by subject
    var g={};
    bank.questions.forEach(function(q){if(!g[q.subject])g[q.subject]=[];g[q.subject].push({q:q,i:0})}); // idx filled below
    // We'll collect ids to pick per subject then map to question objects
    var picks=[];
    for(var s in slots){
      var n=slots[s]||0;
      var list=bank.questions.filter(function(q){return q.subject===s;});
      var rng=mulberry32((seed||0)+s.charCodeAt(0)*31+n*7);
      var dc={1:0,2:0,3:0};
      list.forEach(function(q){dc[q.d]++;});
      var arr=[];
      for(var d=1;d<=3;d++){
        var want=Math.max(0,Math.round(n*diffW[d]/(diffW[1]+diffW[2]+diffW[3])-dc[d]));
        var cand=list.filter(function(q){return q.d===d&&!(arr.includes(q.id))});
        for(var j=0;j<want&&j<cand.length;j++) arr.push(cand[j].id);
      }
      if(arr.length<n){
        var all=list.filter(function(q){return !arr.includes(q.id);}).map(function(q){return q.id;});
        for(var k=0;k<all.length&&arr.length<n;k++) arr.push(all[k]);
      }
      arr.sort(function(a,b){return a<b?-1:a>b?1:0});
      arr.forEach(function(id){picks.push(id);});
    }
    picks.sort(function(a,b){return a<b?-1:a>b?1:0});
    picks=Array.from(new Set(picks)).slice(0,total); // dedupe
    var questions=[];
    var idToQ={};
    bank.questions.forEach(function(q){idToQ[q.id]=q;});
    var usedIds={};
    picks.forEach(function(id){ if(idToQ[id] && !usedIds[id]){ questions.push(idToQ[id]); usedIds[id]=true; } });
    // Fallback: fill remaining slots with any UNUSED questions only.
    // Never duplicate a question. If the bank is smaller than `total`,
    // the paper is honestly capped at the available unique questions.
    for(var fi=0; fi<bank.questions.length && questions.length<total; fi++){
      var bq=bank.questions[fi];
      if(!usedIds[bq.id]){ questions.push(bq); usedIds[bq.id]=true; }
    }
    var actualTotal=questions.length;
    var ga=questions.filter(function(q){return q.subject==='ga';});
    var gate={
      total: actualTotal,
      requested: total,
      gaQuestions: ga.length,
      gaMarks: cfg.gaMarks||15,
      techQuestions: actualTotal-ga.length,
      techMarks: cfg.techMarks||85,
      durationMin: cfg.durationMin||180
    };
    return {questions: questions, gate: gate};
  }
  window.GateDAMock={buildMock: buildMock, build: buildMock};
})();
