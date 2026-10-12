/* GATE DA review.js — per-question explanation panel.
 * Public API: GateDA.Review
 *   - show(section, qid) -> renders explanation into #review
 *   - toggle(qid)  -> shows/hides explanation on practice page
 * Reads q's why_wrong, solution, options from localStorage (GateDA.get) OR the
 * current bank question object passed in. Kept decoupled: it does not fetch.
 */
(function(){
  var LS="gateda.v1.", REV="review.v1.";
  function get(k,d){try{return JSON.parse(localStorage.getItem(LS+k))||d}catch(e){return d}}
  function set(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
  function showPanel(qid, q){
    var box=document.getElementById("review");if(!box)return;
    var qdata = q || get("review."+qid, null);
    if(!qdata)return;
    box.innerHTML="";
    var el=document.createElement("div");el.className="rev-card";
    el.innerHTML="<button class='rev close' onclick='GateDA.Review.hide()'>x</button>"
      +"<h3>"+qdata.id+" — "+qdata.subject+" / "+qdata.topic+"</h3>"
      +"<p class='def'><b>Q.</b> "+qdata.q+"</p>"
      +"<p class='sol'><b>Solution:</b> "+qdata.s+"</p>"
      +((qdata.type==="mcq")?
        ("<p class='sol'><b>Why wrong:</b> "+(qdata.why_wrong||"&nbsp;")+"</p>") :
        ((qdata.type==="msq")?
          ("<p class='sol'><b>Selected:</b> "+JSON.stringify(qdata._sel||[])+"</p>"
           +"<p class='sol'><b>Why wrong:</b> "+(qdata.why_wrong||"&nbsp;")+"</p>") :
          ("<p class='sol'><b>Answer:</b> ["+qdata.a[0]+", "+qdata.a[1]+"]</p>"
           +"<p class='sol'><b>Why:</b> "+(qdata.why_wrong||"&nbsp;")+"</p>")));
    if(qdata.tol_note)el.innerHTML+="<p class='note'>Note: "+qdata.tol_note+"</p>";
    box.appendChild(el);
  }
  function toggle(qid, q){
    var box=document.getElementById("review");
    var cur=(box&&box.classList.contains("open"));
    if(cur){box.innerHTML="";box.classList.remove("open");return;}
    showPanel(qid, q);
    if(box)box.classList.add("open");
  }
  function hide(){var b=document.getElementById("review");if(b){b.innerHTML="";b.classList.remove("open");}}
  window.GateDA.Review={show:showPanel, toggle:toggle, hide:hide};
})();
