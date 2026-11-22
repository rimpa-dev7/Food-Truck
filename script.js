const T=[
{id:1,n:"Smoky Wheels",c:"BBQ",e:"🍖",x:210,y:100,o:1,h:"11:00–21:00",d:"0.2 km",m:[["Pulled pork bun",8],["Brisket tray",12],["Slaw cup",3]]},
{id:2,n:"Taco Tornado",c:"Mexican",e:"🌮",x:480,y:230,o:1,h:"12:00–23:00",d:"0.4 km",m:[["Al pastor taco",4],["Burrito bowl",9],["Churros",5]]},
{id:3,n:"Curry in a Hurry",c:"Indian",e:"🍛",x:120,y:230,o:1,h:"10:30–20:00",d:"0.5 km",m:[["Butter chicken wrap",8],["Veg samosas",4],["Mango lassi",3]]},
{id:4,n:"Bao Bound",c:"Asian",e:"🥟",x:480,y:100,o:0,h:"17:00–00:00",d:"0.7 km",m:[["Pork belly bao",6],["Kimchi dumplings",7],["Bubble tea",5]]},
{id:5,n:"Green Machine",c:"Vegan",e:"🥗",x:300,y:340,o:1,h:"09:00–17:00",d:"0.3 km",m:[["Falafel bowl",9],["Cold-press juice",5],["Chickpea fries",4]]},
{id:6,n:"Sugar Rush",c:"Dessert",e:"🍩",x:300,y:100,o:0,h:"14:00–22:00",d:"0.6 km",m:[["Mini donuts",5],["Waffle cone",6],["Hot chocolate",4]]}];
const $=s=>document.querySelector(s);
const cats=["All","Open now",...new Set(T.map(t=>t.c))];
let f="All",sel=null,tab=1;
const vis=t=>f==="All"||(f==="Open now"?t.o:t.c===f);
const tag=t=>`<span class="open ${t.o?"on":"off"}">${t.o?"OPEN":"CLOSED"}</span>`;
function filters(){$("#tg").innerHTML=cats.map(c=>`<button aria-pressed="${c===f}" data-c="${c}">${c}</button>`).join("")}
function pins(){$("#pins").innerHTML=T.filter(vis).map(t=>`<g class="pin" tabindex="0" role="button" aria-label="${t.n}, ${t.c}" data-id="${t.id}" transform="translate(${t.x} ${t.y})">${t.o?`<g class="ping"><circle r="26"/><circle r="26"/></g>`:""}<rect x="-22" y="-22" width="44" height="44" rx="12" fill="${sel===t.id?"#FF5C8A":"#FFE45E"}" stroke="#231942" stroke-width="4"/><text y="8" text-anchor="middle" font-size="24">${t.e}</text></g>`).join("")}
function side(){const t=T.find(x=>x.id===sel);$("#side").innerHTML=t?`${tag(t)}<h3>${t.n}</h3><div>${t.c} · ${t.d} away</div><div>Today ${t.h}</div><ul style="padding-left:18px;margin:10px 0 0">${t.m.map(i=>`<li>${i[0]} – $${i[1]}</li>`).join("")}</ul>`:`<h3>Tap a truck</h3><p>Pick any pin to see the menu and hours.</p>`}
function menu(){const t=T.find(x=>x.id===tab);
$("#tabs").innerHTML=T.map(x=>`<button role="tab" aria-selected="${x.id===tab}" data-id="${x.id}">${x.e} ${x.n}</button>`).join("");
$("#menu").innerHTML=t.m.map(i=>`<div class="it"><span>${i[0]}</span><i></i><b>$${i[1]}</b></div>`).join("")+`<div class="hrs">${t.o?"Open now":"Closed now"} · ${t.h}</div>`}
$("#tg").onclick=e=>{const b=e.target.closest("button");if(!b)return;f=b.dataset.c;const s=T.find(t=>t.id===sel);if(s&&!vis(s))sel=null;filters();pins();side()};
const pick=p=>{if(p){sel=+p.dataset.id;pins();side()}};
$("#pins").onclick=e=>pick(e.target.closest(".pin"));
$("#pins").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e.target.closest(".pin"))}};
$("#tabs").onclick=e=>{const b=e.target.closest("button");if(b){tab=+b.dataset.id;menu()}};
const msg=t=>$("#msg").textContent=t;
$("#form").onsubmit=e=>{e.preventDefault();try{const l=JSON.parse(localStorage.getItem("ts_emails")||"[]");l.push($("#email").value.trim());localStorage.setItem("ts_emails",JSON.stringify(l))}catch(_){}
 msg("Spot saved. We’ll email you truck updates.");$("#email").value=""};
$("#push").onclick=async()=>{if(!("Notification" in window)){msg("Browser alerts aren’t supported here. Use email instead.");return}
 try{const p=await Notification.requestPermission();msg(p==="granted"?"Browser alerts are on.":"Alerts are blocked. Allow them in browser settings, or use email.")}catch(_){msg("Couldn’t turn on alerts here. Use email instead.")}};
filters();pins();side();menu();
