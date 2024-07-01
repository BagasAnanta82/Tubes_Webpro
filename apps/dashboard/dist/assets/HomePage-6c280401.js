var C=Object.defineProperty;var S=(s,l,t)=>l in s?C(s,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[l]=t;var d=(s,l,t)=>(S(s,typeof l!="symbol"?l+"":l,t),t);import{d as D,u as T,r as o,o as A,w as B,a as j,b as u,c as k,e,t as r,f as g,g as K,F as O}from"./index-50b5eccf.js";class H{constructor(){d(this,"url");d(this,"token");this.url="https://api-smktelkombandung.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getDashboardData(){return fetch(`${this.url}static/dashboard`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(l=>l.json()).then(l=>l.data)}}const G=e("div",{class:"card"},[e("h1",null,"Selamat Datang Di Dashboard SMK Telkom Bandung"),e("p",null,"Jl. Radio Palasari Road, Citeureup, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257")],-1),L={class:"grid"},E={class:"col-12 lg:col-6 xl:col-3"},I={class:"card mb-0"},J={class:"flex justify-content-between mb-3"},N=e("span",{class:"block text-500 font-medium mb-3"},"Total Siswa Aktif",-1),F={class:"text-900 font-medium text-xl"},M=e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-users text-blue-500 text-xl"})],-1),R={class:"col-12 lg:col-6 xl:col-3"},$={class:"card mb-0"},z={class:"flex justify-content-between mb-3"},W=e("span",{class:"block text-500 font-medium mb-3"},"Total Absen Hari Ini",-1),q={class:"text-900 font-medium text-xl"},Q=e("div",{class:"flex align-items-center justify-content-center bg-orange-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-map-marker text-orange-500 text-xl"})],-1),U={class:"col-12 lg:col-6 xl:col-3"},X={class:"card mb-0"},Y={class:"flex justify-content-between mb-3"},Z=e("span",{class:"block text-500 font-medium mb-3"},"Total Daftar Pencapaian",-1),ee={class:"text-900 font-medium text-xl"},te=e("div",{class:"flex align-items-center justify-content-center bg-cyan-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-inbox text-cyan-500 text-xl"})],-1),ae={class:"col-12 lg:col-6 xl:col-3"},le={class:"card mb-0"},oe={class:"flex justify-content-between mb-3"},se=e("span",{class:"block text-500 font-medium mb-3"},"Total Daftar Pelanggaran",-1),ne={class:"text-900 font-medium text-xl"},ie=e("div",{class:"flex align-items-center justify-content-center bg-purple-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-comment text-purple-500 text-xl"})],-1),ce={class:"col-12 xl:col-6"},re={class:"card flex flex-column align-items-center"},de=e("h5",{class:"text-left w-full"},"Perbandingan Keaktifan status siswa",-1),ue={class:"col-12 xl:col-6"},ge={class:"card flex flex-column align-items-center"},pe=e("h5",{class:"text-left w-full"},"Perbandingan pencapaian dan pelanggaran",-1),he={class:"col-12 xl:col-6"},_e={class:"card flex flex-column align-items-center"},me=e("h5",{class:"text-left w-full"},"Perbandingan Gender Siswa",-1),ve={class:"col-12 xl:col-6"},be={class:"card flex flex-column align-items-center"},xe=e("h5",{class:"text-left w-full"},"Perbandingan Kehadiran",-1),fe={key:0},Ve=D({__name:"HomePage",setup(s){const{isDarkTheme:l}=T();let t=getComputedStyle(document.documentElement),n=t.getPropertyValue("--text-color");const a=o({}),p=o({}),h=o({}),_=o({}),m=o({}),v=o({}),b=o({}),x=o({}),f=o({}),y=o(null),P=new H;A(async()=>{await P.getDashboardData().then(i=>a.value=i),p.value={labels:["Siswa Aktif","Siswa Tidak Aktif"],datasets:[{data:[a.value.student_active,a.value.student_nonactive],backgroundColor:[t.getPropertyValue("--indigo-500"),t.getPropertyValue("--purple-500"),t.getPropertyValue("--teal-500")],hoverBackgroundColor:[t.getPropertyValue("--indigo-400"),t.getPropertyValue("--purple-400"),t.getPropertyValue("--teal-400")]}]},h.value={plugins:{legend:{labels:{usePointStyle:!0,color:n}}}},_.value={labels:["Laki-Laki","Perempuan"],datasets:[{data:[a.value.student_gender_male,a.value.student_gender_female],backgroundColor:[t.getPropertyValue("--indigo-500"),t.getPropertyValue("--purple-500"),t.getPropertyValue("--teal-500")],hoverBackgroundColor:[t.getPropertyValue("--indigo-400"),t.getPropertyValue("--purple-400"),t.getPropertyValue("--teal-400")]}]},m.value={plugins:{legend:{labels:{usePointStyle:!0,color:n}}}},v.value={labels:["Pelanggaran Siswa","Pencapaian Siswa"],datasets:[{data:[a.value.student_violation,a.value.student_achievement],backgroundColor:[t.getPropertyValue("--indigo-500"),t.getPropertyValue("--purple-500"),t.getPropertyValue("--teal-500")],hoverBackgroundColor:[t.getPropertyValue("--indigo-400"),t.getPropertyValue("--purple-400"),t.getPropertyValue("--teal-400")]}]},b.value={plugins:{legend:{labels:{usePointStyle:!0,color:n}}}},x.value={labels:["Tepat Waktu","Terlambat"],datasets:[{data:[a.value.attandence_notlate,a.value.attandence_islate],backgroundColor:[t.getPropertyValue("--indigo-500"),t.getPropertyValue("--purple-500"),t.getPropertyValue("--teal-500")],hoverBackgroundColor:[t.getPropertyValue("--indigo-400"),t.getPropertyValue("--purple-400"),t.getPropertyValue("--teal-400")]}]},f.value={plugins:{legend:{labels:{usePointStyle:!0,color:n}}}}});const V=()=>{y.value={plugins:{legend:{labels:{color:"#495057"}}},scales:{x:{ticks:{color:"#495057"},grid:{color:"#ebedef"}},y:{ticks:{color:"#495057"},grid:{color:"#ebedef"}}}}},w=()=>{y.value={plugins:{legend:{labels:{color:"#ebedef"}}},scales:{x:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}},y:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}}}}};return B(l,i=>{i?w():V()},{immediate:!0}),(i,ye)=>{const c=j("Chart");return u(),k(O,null,[G,e("div",L,[e("div",E,[e("div",I,[e("div",J,[e("div",null,[N,e("div",F,r(a.value.student_active),1)]),M])])]),e("div",R,[e("div",$,[e("div",z,[e("div",null,[W,e("div",q,r(a.value.attandence),1)]),Q])])]),e("div",U,[e("div",X,[e("div",Y,[e("div",null,[Z,e("div",ee,r(a.value.achievement),1)]),te])])]),e("div",ae,[e("div",le,[e("div",oe,[e("div",null,[se,e("div",ne,r(a.value.violation),1)]),ie])])]),e("div",ce,[e("div",re,[de,g(c,{type:"pie",data:p.value,options:h.value},null,8,["data","options"])])]),e("div",ue,[e("div",ge,[pe,g(c,{type:"doughnut",data:v.value,options:b.value},null,8,["data","options"])])]),e("div",he,[e("div",_e,[me,g(c,{type:"doughnut",data:_.value,options:m.value},null,8,["data","options"])])]),e("div",ve,[e("div",be,[xe,a.value.attandence_notlate==0?(u(),k("h3",fe,"Tidak Ada Kehadiran Hari Ini")):(u(),K(c,{key:1,type:"pie",data:x.value,options:f.value},null,8,["data","options"]))])])])],64)}}});export{Ve as default};
