var ee=Object.defineProperty;var te=(_,i,s)=>i in _?ee(_,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):_[i]=s;var L=(_,i,s)=>(te(_,typeof i!="symbol"?i+"":i,s),s);import{d as ae,h as le,r,i as oe,o as ie,j as E,a as h,b as g,c as y,e as a,f as t,k as o,l as u,t as c,F as se,p as ne,m as T}from"./index-55c6f72c.js";import{S as de}from"./SiswaService-e0f2eeab.js";import{V as re}from"./ViolationService-95b89a61.js";class ue{constructor(){L(this,"url");L(this,"token");this.url="https://api-sman24dev.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getStudentViolationById(i){return fetch(`${this.url}violations/student/${i}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(s=>s.json()).then(s=>s.data)}createStudentViolation(i){return fetch(`${this.url}violations/student`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({violation_id:i.violation.id,description:i.description,students:i.students})}).then(s=>s.json()).then(s=>s)}deleteStudentViolation(i){return fetch(`${this.url}violations/student`,{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({id:i})}).then(s=>s.json()).then(s=>s)}async getStudentViolationExcelExport(){const i=await fetch(`${this.url}excel/violation`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(v=>v.arrayBuffer()).then(v=>v),s=new File([i],"filename.xlsx",{type:"application/vnd.ms-excel"}),k=URL.createObjectURL(s);window.open(k)}}const ce={class:"grid"},pe={class:"col-12"},me={class:"card"},ve={class:"my-2"},he={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},fe=a("h5",{class:"m-0"},"Data Siswa SMAN 24 Bandung",-1),_e={class:"block mt-2 md:mt-0 p-input-icon-left"},be=a("i",{class:"pi pi-search"},null,-1),ge=a("span",{class:"p-column-title"},"Name",-1),ye=a("span",{class:"p-column-title"},"NIS",-1),Se=a("span",{class:"p-column-title"},"NISN",-1),we=a("span",{class:"p-column-title"},"kelamin",-1),ke=a("span",{class:"p-column-title"},"Kelas",-1),xe={class:"field"},Ne=a("label",{for:"inventoryStatus",class:"mb-3"},"Pelanggaran",-1),Pe={class:"field"},Ve=a("label",{for:"multipleStatus",class:"mb-3"},"Siswa",-1),Ce={key:0,class:"p-1"},De={class:"flex align-items-center"},Te={class:"field"},Ae=a("label",{for:"description"},"Deskripsi",-1),Be={class:"flex align-items-center justify-content-center"},Le=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Ie={key:0},Ue={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},Me=a("h5",{class:"m-0"},"Data Pencapaian SMAN 24",-1),je={class:"block mt-2 md:mt-0 p-input-icon-left"},$e=a("i",{class:"pi pi-search"},null,-1),Ee=a("span",{class:"p-column-title"},"Name",-1),Re=a("span",{class:"p-column-title"},"Code",-1),Oe=a("span",{class:"p-column-title"},"Deskripsi",-1),Ge=a("span",{class:"p-column-title"},"Nilai",-1),ze=a("span",{class:"p-column-title"},"Nilai",-1),Fe={class:"flex align-items-center justify-content-center"},Ke=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Ye={key:0},Je={class:"flex align-items-center justify-content-center"},qe=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),He={key:0},et=ae({__name:"ViolationStudent",setup(_){const i=le(),s=r(null),k=r({}),v=r({}),S=r(!1),x=r(!1);r(!1);const f=r(!1),N=r(!1),d=r({}),P=r(null),I=r(null),V=r({}),C=r({}),A=r(!1),B=r(!0),R=new de,O=new re,b=new ue;oe(()=>{q()}),ie(()=>{R.getAllStudentData().then(n=>s.value=n),O.getAllViolation().then(n=>k.value=n),B.value=!1});const G=()=>{d.value={},A.value=!1,S.value=!0},U=()=>{S.value=!1,x.value=!1,v.value={},A.value=!1},z=async()=>{A.value=!0,await b.createStudentViolation(d.value).then(n=>{n.status?i.add({severity:"success",summary:"Berhasil",detail:"Berhasil Tambah Siswa",life:3e3}):i.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Membuat Data Siswa",life:3e3})}),S.value=!1,d.value={}},F=async n=>{await b.getStudentViolationById(n.student_id).then(l=>{v.value.student=l.student,v.value.score=l.total_score}),x.value=!0},K=n=>{d.value=n,f.value=!0},M=async()=>{f.value=!1,await b.deleteStudentViolation(d.value.id).then(n=>n.status?i.add({severity:"success",summary:"Successful",detail:"berhasil menghapus data",life:3e3}):i.add({severity:"error",summary:"Gagal",detail:"Gagal Menghapus data siswa",life:3e3})),await b.getStudentViolationById(d.value.student_id).then(n=>{v.value.student=n.student,v.value.score=n.total_score}),d.value={}},Y=async()=>{await b.getStudentViolationExcelExport()},J=async()=>{await b.deleteStudentAchievement(P.value).then(n=>n.status?i.add({severity:"success",summary:"Berhasil",detail:"Siswa Terhapus",life:3e3}):i.add({severity:"error",summary:"Gagal",detail:"Siswa Gagal Terhapus",life:3e3})),await b.getStudentAchievementById().then(n=>s.value=n),N.value=!1,P.value=null},q=()=>{V.value={global:{value:null,matchMode:E.CONTAINS}},C.value={global:{value:null,matchMode:E.CONTAINS}}};return(n,l)=>{const H=h("Toast"),p=h("Button"),Q=h("Toolbar"),j=h("InputText"),m=h("Column"),$=h("DataTable"),W=h("Dropdown"),X=h("MultiSelect"),Z=h("Textarea"),w=h("Dialog");return g(),y("div",ce,[a("div",pe,[a("div",me,[t(H),t(Q,{class:"mb-4"},{start:o(()=>[a("div",ve,[t(p,{label:"New",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:G})])]),end:o(()=>[t(p,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:l[0]||(l[0]=e=>Y(e))})]),_:1}),t($,{ref_key:"dt",ref:I,value:s.value,dataKey:"id",paginator:!0,rows:20,filters:V.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[20,50,75,100],loading:B.value,currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} students",responsiveLayout:"scroll"},{header:o(()=>[a("div",he,[fe,a("span",_e,[be,t(j,{modelValue:V.value.global.value,"onUpdate:modelValue":l[1]||(l[1]=e=>V.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:o(()=>[t(m,{field:"name",header:"Name",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[ge,u(" "+c(e.data.name),1)]),_:1}),t(m,{field:"NIS",header:"NIS",sortable:!0,headerStyle:"width:14%; min-width:8rem;"},{body:o(e=>[ye,u(" "+c(e.data.NIS),1)]),_:1}),t(m,{field:"NISN",header:"NISN",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[Se,u(" "+c(e.data.NISN),1)]),_:1}),t(m,{field:"code",header:"Kelamin",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[we,u(" "+c(e.data.code),1)]),_:1}),t(m,{field:"classroom_name",header:"Kelas",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[ke,u(" "+c(e.data.classroom_name),1)]),_:1}),t(m,{header:"action",headerStyle:"min-width:10rem;"},{body:o(e=>[t(p,{icon:"pi pi-search",class:"p-button-rounded p-button-primary mr-2",onClick:D=>F(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","filters","loading"]),t(w,{visible:S.value,"onUpdate:visible":l[5]||(l[5]=e=>S.value=e),style:{width:"450px"},header:"Penambahan Data Pelanggaran Siswa",modal:!0,class:"p-fluid"},{footer:o(()=>[t(p,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:U}),t(p,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:z})]),default:o(()=>[a("div",xe,[Ne,t(W,{id:"inventoryStatus",modelValue:d.value.violation,"onUpdate:modelValue":l[2]||(l[2]=e=>d.value.violation=e),options:k.value,optionLabel:"name"},null,8,["modelValue","options"])]),a("div",Pe,[Ve,t(X,{id:"multipleStatus",modelValue:d.value.students,"onUpdate:modelValue":l[3]||(l[3]=e=>d.value.students=e),options:s.value,optionLabel:"name",placeholder:"Pilih Siswa",filter:!0},{value:o(e=>[(g(!0),y(se,null,ne(e.value,D=>(g(),y("div",{class:"inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2",key:D.id},[a("div",null,c(D.name),1)]))),128)),!e.value||e.value.length===0?(g(),y("div",Ce,"Pilih Siswa")):T("",!0)]),option:o(e=>[a("div",De,[a("div",null,c(e.option.name),1)])]),_:1},8,["modelValue","options"])]),a("div",Te,[Ae,t(Z,{id:"description",modelValue:d.value.description,"onUpdate:modelValue":l[4]||(l[4]=e=>d.value.description=e),modelModifiers:{trim:!0},required:!0},null,8,["modelValue"])])]),_:1},8,["visible"]),t(w,{visible:f.value,"onUpdate:visible":l[7]||(l[7]=e=>f.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[t(p,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[6]||(l[6]=e=>f.value=!1)}),t(p,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:M})]),default:o(()=>[a("div",Be,[Le,d.value?(g(),y("span",Ie,[u("Apakah Anda Yakin Untuk Menghapus Siswa "),a("b",null,c(d.value.name),1),u("?")])):T("",!0)])]),_:1},8,["visible"]),t(w,{visible:x.value,"onUpdate:visible":l[10]||(l[10]=e=>x.value=e),style:{width:"950px"},header:"Data Pencapaian",modal:!0,class:"p-fluid"},{footer:o(()=>[t(p,{label:"Close",icon:"pi pi-times",class:"p-button-text",onClick:U})]),default:o(()=>[t($,{ref_key:"dt",ref:I,value:v.value.student,selection:P.value,"onUpdate:selection":l[9]||(l[9]=e=>P.value=e),dataKey:"id",paginator:!0,rows:5,filters:C.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,15],loading:B.value,currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} students",responsiveLayout:"scroll"},{header:o(()=>[a("div",Ue,[Me,a("span",je,[$e,t(j,{modelValue:C.value.global.value,"onUpdate:modelValue":l[8]||(l[8]=e=>C.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),footer:o(()=>[u("Total Score "+c(v.value.score),1)]),default:o(()=>[t(m,{field:"achievement_name",header:"Name",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[Ee,u(" "+c(e.data.violation_name),1)]),_:1}),t(m,{field:"achievement_code",header:"Kode Pencapaian",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[Re,u(" "+c(e.data.violation_code),1)]),_:1}),t(m,{field:"achievement_code",header:"Deskripsi",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[Oe,u(" "+c(e.data.description),1)]),_:1}),t(m,{field:"achievement_score",header:"Nilai",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[Ge,u(" "+c(e.data.violation_score),1)]),_:1}),t(m,{field:"timestamp",header:"Timestamp",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[ze,u(" "+c(e.data.timestamp),1)]),_:1}),t(m,{header:"action",headerStyle:"min-width:10rem;"},{body:o(e=>[t(p,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:D=>K(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","loading"])]),_:1},8,["visible"]),t(w,{visible:f.value,"onUpdate:visible":l[12]||(l[12]=e=>f.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[t(p,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[11]||(l[11]=e=>f.value=!1)}),t(p,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:M})]),default:o(()=>[a("div",Fe,[Ke,d.value?(g(),y("span",Ye,[u("Apakah Anda Yakin Untuk Menghapus Siswa "),a("b",null,c(d.value.name),1),u("?")])):T("",!0)])]),_:1},8,["visible"]),t(w,{visible:N.value,"onUpdate:visible":l[14]||(l[14]=e=>N.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[t(p,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[13]||(l[13]=e=>N.value=!1)}),t(p,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:J})]),default:o(()=>[a("div",Je,[qe,d.value?(g(),y("span",He,"Apakah Anda Yakin Untuk Menghapus Data-Data Siswa?")):T("",!0)])]),_:1},8,["visible"])])])])}}});export{et as default};
