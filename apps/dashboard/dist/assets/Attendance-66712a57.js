import{d as H,h as L,r as i,i as j,o as E,j as w,B as T,w as P,a as r,b as I,c as x,f as a,e as o,k as n,l as d,t as f,F as W}from"./index-50b5eccf.js";import{P as $}from"./PresensiService-13e03a8a.js";import{C as Y}from"./ClassroomService-0322e9e9.js";const q={class:"card"},z=o("h1",null,"Rekam Presensi SMAN24 Bandung",-1),J={class:"grid mt-4"},Q={class:"col-12 lg:col-6"},X=o("h5",null,"Silahkan Pilih Tanggal Presensi Dan Generate",-1),Z={class:"col-12 lg:col-6"},ee=o("h5",null,"Silakan Pilih Kelas",-1),ae=o("h3",null,"Generate siswa yang tidak melakukan presensi (Absen)",-1),te={className:"card"},le={class:"flex justify-content-between flex-column sm:flex-row"},ne={class:"text-align-left gap-2"},oe={class:"p-input-icon-left mb-2"},se=o("i",{class:"pi pi-search"},null,-1),ie={key:0},ue={key:1},de=o("h3",null,"Apakah Anda Yakin?",-1),re=o("p",null,[d(" Untuk melakukan penghasilan data, waktu yang dibutuhkan tidak sebentar (tergantung pada jumlah data yang dibutuhkan). Mohon untuk "),o("b",null,"tidak menutup browser dan tab pada browser ketika proses berlangsung"),d(". Pastikan pula bahwa koneksi internet Anda stabil. ")],-1),me={class:"flex justify-content-end gap-2"},ge=H({__name:"Attendance",setup(ce){const V=L(),S=i(null),v=i(null),C=i(null),h=i(null),U=i(!0),k=i(!1),c=i(new Date),B=i(null),g=i(!1),D=i(!1),_=new $,F=new Y;j(()=>{U.value=!1,A()}),E(()=>{_.getStudentAttendences().then(l=>S.value=l),F.getAllClassroom().then(l=>{l.unshift({active_status:1,id:null,name:"ALL"}),C.value=l})});const A=()=>{h.value={global:{value:null,matchMode:w.CONTAINS},name:{operator:T.AND,constraints:[{value:null,matchMode:w.STARTS_WITH}]},NIS:{operator:T.AND,constraints:[{value:null,matchMode:w.STARTS_WITH}]},NISN:{operator:T.AND,constraints:[{value:null,matchMode:w.STARTS_WITH}]}}},G=async()=>{const l=new Date(c.value);k.value&&l.setDate(l.getDate()+1),D.value=!0,V.add({severity:"info",summary:"Sedang melakukan generasi data",detail:"Harap Untuk Tidak Menutup Browser atau Tab pada proses sedang berlangsung",life:5e3}),await _.generateStudentDidNotTapping(l.toISOString()).then(t=>t.status?V.add({severity:"success",summary:"Berhasil",detail:"Data Berhasil Digenerate",life:3e3}):V.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Melakuakan Generasi data",life:3e3})),g.value=!1,D.value=!1},M=()=>{A()},O=async()=>{const l=new Date(c.value);k.value&&l.setDate(l.getDate()+1),await _.getStudentAttendencesExcelExport(l.toISOString())};return P(c,async(l,t)=>{const u=new Date(l),y=v.value==null?null:v.value.id;u.setDate(u.getDate()+1),k.value=!0,await _.getStudentAttendences(u.toISOString(),y).then(N=>S.value=N)}),P(v,async(l,t)=>{const u=new Date(c.value);k.value&&u.setDate(u.getDate()+1),await _.getStudentAttendences(u.toISOString(),l.id).then(y=>S.value=y)}),(l,t)=>{const u=r("Toast"),y=r("Calendar"),N=r("Dropdown"),b=r("Button"),m=r("InputText"),p=r("Column"),R=r("DataTable"),K=r("Dialog");return I(),x(W,null,[a(u),o("div",q,[z,o("div",J,[o("div",Q,[X,a(y,{id:"date",modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),style:{width:"70%"}},null,8,["modelValue"])]),o("div",Z,[ee,a(N,{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=e=>v.value=e),options:C.value,optionLabel:"name",placeholder:"Silakan Pilih Kelas"},null,8,["modelValue","options"])])]),ae,a(b,{type:"button",icon:"pi pi-upload",label:"Generate",class:"p-button mb-2",onClick:t[2]||(t[2]=e=>g.value=!0)})]),o("div",te,[a(R,{ref_key:"dt",ref:B,value:S.value,paginator:!0,class:"p-datatable-gridlines",rows:20,dataKey:"id",rowHover:!0,rowsPerPageOptions:[20,50,100],filters:h.value,"onUpdate:filters":t[6]||(t[6]=e=>h.value=e),filterDisplay:"menu",loading:U.value,responsiveLayout:"scroll",globalFilterFields:["name","NIS","NISN"],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} students"},{header:n(()=>[o("div",le,[o("div",ne,[a(b,{type:"button",icon:"pi pi-filter-slash",label:"Clear",class:"p-button-outlined mb-2",onClick:t[3]||(t[3]=e=>M())}),a(b,{type:"button",icon:"pi pi-upload",label:"Export",class:"p-button-outlined mb-2",onClick:t[4]||(t[4]=e=>O())})]),o("span",oe,[se,a(m,{modelValue:h.value.global.value,"onUpdate:modelValue":t[5]||(t[5]=e=>h.value.global.value=e),placeholder:"Keyword Search",style:{width:"100%"}},null,8,["modelValue"])])])]),empty:n(()=>[d(" Data Tidak Ditemukan. ")]),loading:n(()=>[d(" Memuat Data Presensi, Mohon Tunggu. ")]),default:n(()=>[a(p,{field:"name",header:"Name",style:{"min-width":"12rem"}},{body:n(({data:e})=>[d(f(e.name),1)]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by name"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(p,{field:"NISN",header:"NISN",style:{"min-width":"12rem"}},{body:n(({data:e})=>[d(f(e.NISN),1)]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(p,{field:"classroom_name",header:"Kelas",style:{"min-width":"12rem"}},{body:n(({data:e})=>[d(f(e.classroom_name),1)]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(p,{field:"gender",header:"Kelamin",style:{"min-width":"12rem"}},{body:n(({data:e})=>[d(f(e.code),1)]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(p,{field:"timestamp",header:"timestamp",style:{"min-width":"12rem"}},{body:n(({data:e})=>[d(f(e.timestamp),1)]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),a(p,{field:"is_late",header:"Status",style:{"min-width":"12rem"}},{body:n(({data:e})=>[e.is_late==!0?(I(),x("div",ie," Terlambat ")):(I(),x("div",ue," Tepat Waktu "))]),filter:n(({filterModel:e})=>[a(m,{type:"text",modelValue:e.value,"onUpdate:modelValue":s=>e.value=s,class:"p-column-filter",placeholder:"Search by NISN"},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["value","filters","loading"])]),a(K,{visible:g.value,"onUpdate:visible":t[8]||(t[8]=e=>g.value=e),modal:"",header:"Generate",style:{width:"50rem"}},{default:n(()=>[de,re,o("div",me,[a(b,{type:"button",label:"Cancel",severity:"secondary",onClick:t[7]||(t[7]=e=>g.value=!1)}),a(b,{type:"button",label:"Generate",loading:D.value,onClick:G},null,8,["loading"])])]),_:1},8,["visible"])],64)}}});export{ge as default};
