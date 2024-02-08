var j=Object.defineProperty;var K=(h,l,s)=>l in h?j(h,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):h[l]=s;var x=(h,l,s)=>(K(h,typeof l!="symbol"?l+"":l,s),s);import{d as H,h as L,r as c,i as W,o as z,j as N,q as A,w as $,a as m,b as I,c as C,f as t,e as n,k as o,l as p,t as T,F as Y}from"./index-94d5278f.js";import{C as q}from"./ClassroomService-4484b5fa.js";class J{constructor(){x(this,"url");x(this,"token");this.url="https://api-sman24dev.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getStudentAttendences(l=new Date().toISOString(),s=null){return fetch(`${this.url}attandence/records?date_at=${l}&classroom_id=${s}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(i=>i.json()).then(i=>i.data)}async getStudentAttendencesExcelExport(){const l=await fetch(`${this.url}excel/attandence`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(v=>v.arrayBuffer()).then(v=>v),s=new File([l],"filename.xlsx",{type:"application/vnd.ms-excel"}),i=URL.createObjectURL(s);window.open(i)}generateStudentDidNotTapping(){return fetch(`${this.url}attandence/generate`,{method:"POST",headers:{Authorization:`Bearer ${this.token}`}}).then(l=>l.json()).then(l=>l)}}const Q={class:"card"},X=n("h1",null,"Rekam Presensi SMAN24 Bandung",-1),Z={class:"grid mt-4"},ee={class:"col-12 lg:col-6"},te=n("h5",null,"Silahkan Pilih Tanggal Presensi",-1),ae={class:"col-12 lg:col-6"},le=n("h5",null,"Kelas",-1),ne=n("h3",null,"Generasi Siswa Yang Tidak Absen",-1),oe={className:"card"},se={class:"flex justify-content-between flex-column sm:flex-row"},ie={class:"text-align-left gap-2"},de={class:"p-input-icon-left mb-2"},ue=n("i",{class:"pi pi-search"},null,-1),re={key:0},ce={key:1},pe=n("h3",null,"Apakah Anda Yakin?",-1),me=n("p",null,[p("Untuk melakukan peng-generate data akan membutuhkan waktu yang tidak sebentar (akan sangat bergantung terpada banyak data yang dibutuhakn). Diharapkan untuk tidak menutup "),n("b",null,"Browser dan Tab pada Browser"),p(" Ketika Proses sedang berlangsung. Serta pastikan bahwa "),n("i",null,"internet connection"),p(" anda pada keadaan yang stabil ")],-1),he={class:"flex justify-content-end gap-2"},ye=H({__name:"Attendance",setup(h){const l=L(),s=c(null),i=c(null),v=c(null),b=c(null),U=c(!0),w=c(new Date),P=c(null),y=c(!1),V=c(!1),_=new J,F=new q;W(()=>{U.value=!1,B()}),z(()=>{_.getStudentAttendences().then(d=>s.value=d),F.getAllClassroom().then(d=>v.value=d)});const B=()=>{b.value={global:{value:null,matchMode:N.CONTAINS},name:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]},NIS:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]},NISN:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]}}},G=async()=>{V.value=!0,l.add({severity:"info",summary:"Sedang melakukan generasi data",detail:"Harap Untuk Tidak Menutup Browser atau Tab pada proses sedang berlangsung",life:5e3}),await _.generateStudentDidNotTapping().then(d=>d.status?l.add({severity:"success",summary:"Berhasil",detail:"Data Berhasil Digenerate",life:3e3}):l.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Melakuakan Generasi data",life:3e3})),y.value=!1,V.value=!1},O=()=>{B()},E=async()=>{await _.getStudentAttendencesExcelExport()};return $(w,async(d,a)=>{const u=new Date(d),S=i.value==null?null:i.value.id;u.setDate(u.getDate()+1),await _.getStudentAttendences(u.toISOString(),S).then(D=>s.value=D)}),$(i,async(d,a)=>{const u=new Date(w.value);u.setDate(u.getDate()+1),await _.getStudentAttendences(u.toISOString(),d.id).then(S=>s.value=S)}),(d,a)=>{const u=m("Toast"),S=m("Calendar"),D=m("Dropdown"),f=m("Button"),g=m("InputText"),k=m("Column"),M=m("DataTable"),R=m("Dialog");return I(),C(Y,null,[t(u),n("div",Q,[X,n("div",Z,[n("div",ee,[te,t(S,{id:"date",modelValue:w.value,"onUpdate:modelValue":a[0]||(a[0]=e=>w.value=e),style:{width:"70%"}},null,8,["modelValue"])]),n("div",ae,[le,t(D,{modelValue:i.value,"onUpdate:modelValue":a[1]||(a[1]=e=>i.value=e),options:v.value,optionLabel:"name",placeholder:"Silah Pilih Kelas"},null,8,["modelValue","options"])])]),ne,t(f,{type:"button",icon:"pi pi-upload",label:"Generate",class:"p-button mb-2",onClick:a[2]||(a[2]=e=>y.value=!0)})]),n("div",oe,[t(M,{ref_key:"dt",ref:P,value:s.value,paginator:!0,class:"p-datatable-gridlines",rows:20,dataKey:"id",rowHover:!0,rowsPerPageOptions:[20,50,75,100],filters:b.value,"onUpdate:filters":a[6]||(a[6]=e=>b.value=e),filterDisplay:"menu",loading:U.value,responsiveLayout:"scroll",globalFilterFields:["name","NIS","NISN"]},{header:o(()=>[n("div",se,[n("div",ie,[t(f,{type:"button",icon:"pi pi-filter-slash",label:"Clear",class:"p-button-outlined mb-2",onClick:a[3]||(a[3]=e=>O())}),t(f,{type:"button",icon:"pi pi-upload",label:"Export",class:"p-button-outlined mb-2",onClick:a[4]||(a[4]=e=>E())})]),n("span",de,[ue,t(g,{modelValue:b.value.global.value,"onUpdate:modelValue":a[5]||(a[5]=e=>b.value.global.value=e),placeholder:"Keyword Search",style:{width:"100%"}},null,8,["modelValue"])])])]),empty:o(()=>[p(" Data Tidak Ditemukan. ")]),loading:o(()=>[p(" Memuat Data Presensi, Mohon Tunggu. ")]),default:o(()=>[t(k,{field:"name",header:"Name",style:{"min-width":"12rem"}},{body:o(({data:e})=>[p(T(e.name),1)]),filter:o(({filterModel:e})=>[t(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by name"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),t(k,{field:"NISN",header:"NISN",style:{"min-width":"12rem"}},{body:o(({data:e})=>[p(T(e.NISN),1)]),filter:o(({filterModel:e})=>[t(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),t(k,{field:"gender",header:"Kelamin",style:{"min-width":"12rem"}},{body:o(({data:e})=>[p(T(e.code),1)]),filter:o(({filterModel:e})=>[t(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),t(k,{field:"timestamp",header:"timestamp",style:{"min-width":"12rem"}},{body:o(({data:e})=>[p(T(e.timestamp),1)]),filter:o(({filterModel:e})=>[t(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),t(k,{field:"is_late",header:"Status",style:{"min-width":"12rem"}},{body:o(({data:e})=>[e.is_late==!0?(I(),C("div",re," Terlambat ")):(I(),C("div",ce," Tepat Waktu "))]),filter:o(({filterModel:e})=>[t(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["value","filters","loading"])]),t(R,{visible:y.value,"onUpdate:visible":a[8]||(a[8]=e=>y.value=e),modal:"",header:"Generate",style:{width:"50rem"}},{default:o(()=>[pe,me,n("div",he,[t(f,{type:"button",label:"Cancel",severity:"secondary",onClick:a[7]||(a[7]=e=>y.value=!1)}),t(f,{type:"button",label:"Generate",loading:V.value,onClick:G},null,8,["loading"])])]),_:1},8,["visible"])],64)}}});export{ye as default};
