var n=Object.defineProperty;var s=(o,t,e)=>t in o?n(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var i=(o,t,e)=>(s(o,typeof t!="symbol"?t+"":t,e),e);class r{constructor(){i(this,"url");i(this,"token");this.url="https://api-sman24dev.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getAllViolation(){return fetch(`${this.url}violations`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(t=>t.json()).then(t=>t.data)}createViolation(t){return fetch(`${this.url}violations`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({name:t.name,violation_code:t.violation_code,score:t.score,active_status:t.active_status})}).then(e=>e.json()).then(e=>e)}updateViolation(t){return fetch(`${this.url}violations`,{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({id:t.id,name:t.name,violation_code:t.violation_code,score:t.score,active_status:t.active_status})}).then(e=>e.json()).then(e=>e)}deleteViolation(t){return fetch(`${this.url}violations`,{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({id:t})}).then(e=>e.json()).then(e=>e)}deleteMultipleViolation(t){return fetch(`${this.url}violations/multiple`,{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({json:t})}).then(e=>e.json()).then(e=>e)}}export{r as V};
