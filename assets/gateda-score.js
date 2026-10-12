/* GateDA scoring engine (shared by practice + mocks). Official DA marking. */
(function(){function scoreOne(q,ans){if(ans===undefined||ans===null||ans==="")return{score:0,state:"unanswered"};
if(q.type==="mcq"){if(ans===q.a)return{score:q.marks,state:"correct"};return{score:-(q.marks===1?1/3:2/3),state:"wrong"}}
if(q.type==="msq"){if(!Array.isArray(ans))return{score:0,state:"unanswered"};var a=ans.slice().sort().join(","),b=q.a.slice().sort().join(",");if(a===b)return{score:q.marks,state:"correct"};return{score:0,state:"wrong"}}
if(q.type==="nat"){var v=parseFloat(ans);if(isNaN(v))return{score:0,state:"wrong"};if(v>=q.a[0]&&v<=q.a[1])return{score:q.marks,state:"correct"};return{score:0,state:"wrong"}}
return{score:0,state:"wrong"}}
function scorePaper(qs,ansMap){var t=0,mx=0,ok=0,wr=0,un=0;qs.forEach(function(q){mx+=q.marks;var r=scoreOne(q,ansMap[q.id]);t+=r.score;if(r.state==="correct")ok++;else if(r.state==="wrong")wr++;else un++});return{score:Math.round(t*100)/100,total:mx,correct:ok,wrong:wr,unanswered:un}}
window.GateDAScore={one:scoreOne,paper:scorePaper};})();
