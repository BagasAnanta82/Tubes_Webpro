var R=Object.defineProperty;var H=(h,n,l)=>n in h?R(h,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):h[n]=l;var x=(h,n,l)=>(H(h,typeof n!="symbol"?n+"":n,l),l);import{d as K,h as L,r as c,i as W,o as z,j as N,q as A,w as O,a as p,b as I,c as C,f as a,e as o,k as s,l as m,t as D,F as J}from"./index-c6884a82.js";import{C as q}from"./ClassroomService-4484b5fa.js";class Y{constructor(){x(this,"url");x(this,"token");this.url="https://api-sman24dev.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getStudentAttendences(n=new Date().toISOString(),l=null){return fetch(`${this.url}attandence/records?date_at=${n}&classroom_id=${l}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(d=>d.json()).then(d=>d.data)}async getStudentAttendencesExcelExport(){const n=await fetch(`${this.url}excel/attandence`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(v=>v.arrayBuffer()).then(v=>v),l=new File([n],"filename.xlsx",{type:"application/vnd.ms-excel"}),d=URL.createObjectURL(l);window.open(d)}generateStudentDidNotTapping(n=new Date().toISOString()){return fetch(`${this.url}attandence/generate`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({date_at:n})}).then(l=>l.json()).then(l=>l)}}const Q={class:"card"},X=o("h1",null,"Rekam Presensi SMAN24 Bandung",-1),Z={class:"grid mt-4"},ee={class:"col-12 lg:col-6"},te=o("h5",null,"Silahkan Pilih Tanggal Presensi Dan Generate",-1),ae={class:"col-12 lg:col-6"},le=o("h5",null,"Silahkan Pilih Kelas",-1),ne=o("h3",null,"Generate siswa yang tidak melakukan presensi",-1),oe={className:"card"},se={class:"flex justify-content-between flex-column sm:flex-row"},ie={class:"text-align-left gap-2"},de={class:"p-input-icon-left mb-2"},ue=o("i",{class:"pi pi-search"},null,-1),re={key:0},ce={key:1},pe=o("h3",null,"Apakah Anda Yakin?",-1),me=o("p",null,[m(" Untuk melakukan penghasilan data, waktu yang dibutuhkan tidak sebentar (tergantung pada jumlah data yang dibutuhkan). Mohon untuk "),o("b",null,"tidak menutup browser dan tab pada browser ketika proses berlangsung"),m(". Pastikan pula bahwa koneksi internet Anda stabil. ")],-1),he={class:"flex justify-content-end gap-2"},Se=K({__name:"Attendance",setup(h){const n=L(),l=c(null),d=c(null),v=c(null),y=c(null),U=c(!0),S=c(new Date),$=c(null),b=c(!1),V=c(!1),_=new Y,P=new q;W(()=>{U.value=!1,B()}),z(()=>{_.getStudentAttendences().then(i=>l.value=i),P.getAllClassroom().then(i=>v.value=i)});const B=()=>{y.value={global:{value:null,matchMode:N.CONTAINS},name:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]},NIS:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]},NISN:{operator:A.AND,constraints:[{value:null,matchMode:N.STARTS_WITH}]}}},G=async()=>{const i=new Date(S.value);i.setDate(i.getDate()+1),V.value=!0,n.add({severity:"info",summary:"Sedang melakukan generasi data",detail:"Harap Untuk Tidak Menutup Browser atau Tab pada proses sedang berlangsung",life:5e3}),await _.generateStudentDidNotTapping(i.toISOString()).then(t=>t.status?n.add({severity:"success",summary:"Berhasil",detail:"Data Berhasil Digenerate",life:3e3}):n.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Melakuakan Generasi data",life:3e3})),b.value=!1,V.value=!1},j=()=>{B()},F=async()=>{await _.getStudentAttendencesExcelExport()};return O(S,async(i,t)=>{const u=new Date(i),f=d.value==null?null:d.value.id;u.setDate(u.getDate()+1),await _.getStudentAttendences(u.toISOString(),f).then(T=>l.value=T)}),O(d,async(i,t)=>{const u=new Date(S.value);u.setDate(u.getDate()+1),await _.getStudentAttendences(u.toISOString(),i.id).then(f=>l.value=f)}),(i,t)=>{const u=p("Toast"),f=p("Calendar"),T=p("Dropdown"),k=p("Button"),g=p("InputText"),w=p("Column"),M=p("DataTable"),E=p("Dialog");return I(),C(J,null,[a(u),o("div",Q,[X,o("div",Z,[o("div",ee,[te,a(f,{id:"date",modelValue:S.value,"onUpdate:modelValue":t[0]||(t[0]=e=>S.value=e),style:{width:"70%"}},null,8,["modelValue"])]),o("div",ae,[le,a(T,{modelValue:d.value,"onUpdate:modelValue":t[1]||(t[1]=e=>d.value=e),options:v.value,optionLabel:"name",placeholder:"Silah Pilih Kelas"},null,8,["modelValue","options"])])]),ne,a(k,{type:"button",icon:"pi pi-upload",label:"Generate",class:"p-button mb-2",onClick:t[2]||(t[2]=e=>b.value=!0)})]),o("div",oe,[a(M,{ref_key:"dt",ref:$,value:l.value,paginator:!0,class:"p-datatable-gridlines",rows:20,dataKey:"id",rowHover:!0,rowsPerPageOptions:[20,50,100],filters:y.value,"onUpdate:filters":t[6]||(t[6]=e=>y.value=e),filterDisplay:"menu",loading:U.value,responsiveLayout:"scroll",globalFilterFields:["name","NIS","NISN"]},{header:s(()=>[o("div",se,[o("div",ie,[a(k,{type:"button",icon:"pi pi-filter-slash",label:"Clear",class:"p-button-outlined mb-2",onClick:t[3]||(t[3]=e=>j())}),a(k,{type:"button",icon:"pi pi-upload",label:"Export",class:"p-button-outlined mb-2",onClick:t[4]||(t[4]=e=>F())})]),o("span",de,[ue,a(g,{modelValue:y.value.global.value,"onUpdate:modelValue":t[5]||(t[5]=e=>y.value.global.value=e),placeholder:"Keyword Search",style:{width:"100%"}},null,8,["modelValue"])])])]),empty:s(()=>[m(" Data Tidak Ditemukan. ")]),loading:s(()=>[m(" Memuat Data Presensi, Mohon Tunggu. ")]),default:s(()=>[a(w,{field:"name",header:"Name",style:{"min-width":"12rem"}},{body:s(({data:e})=>[m(D(e.name),1)]),filter:s(({filterModel:e})=>[a(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by name"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(w,{field:"NISN",header:"NISN",style:{"min-width":"12rem"}},{body:s(({data:e})=>[m(D(e.NISN),1)]),filter:s(({filterModel:e})=>[a(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(w,{field:"gender",header:"Kelamin",style:{"min-width":"12rem"}},{body:s(({data:e})=>[m(D(e.code),1)]),filter:s(({filterModel:e})=>[a(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(w,{field:"timestamp",header:"timestamp",style:{"min-width":"12rem"}},{body:s(({data:e})=>[m(D(e.timestamp),1)]),filter:s(({filterModel:e})=>[a(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(w,{field:"is_late",header:"Status",style:{"min-width":"12rem"}},{body:s(({data:e})=>[e.is_late==!0?(I(),C("div",re," Terlambat ")):(I(),C("div",ce," Tepat Waktu "))]),filter:s(({filterModel:e})=>[a(g,{type:"text",modelValue:e.value,"onUpdate:modelValue":r=>e.value=r,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["value","filters","loading"])]),a(E,{visible:b.value,"onUpdate:visible":t[8]||(t[8]=e=>b.value=e),modal:"",header:"Generate",style:{width:"50rem"}},{default:s(()=>[pe,me,o("div",he,[a(k,{type:"button",label:"Cancel",severity:"secondary",onClick:t[7]||(t[7]=e=>b.value=!1)}),a(k,{type:"button",label:"Generate",loading:V.value,onClick:G},null,8,["loading"])])]),_:1},8,["visible"])],64)}}});export{Se as default};
