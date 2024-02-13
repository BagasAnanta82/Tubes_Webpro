var ae=Object.defineProperty;var le=(S,n,v)=>n in S?ae(S,n,{enumerable:!0,configurable:!0,writable:!0,value:v}):S[n]=v;var B=(S,n,v)=>(le(S,typeof n!="symbol"?n+"":n,v),v);import{d as se,h as oe,r as m,i as ie,o as ne,j as de,w as ue,a as f,b as d,c as u,e as a,f as s,k as i,l as p,t as h,F as M,n as V,m as b,p as j}from"./index-317a674d.js";import{S as re}from"./SiswaService-0ee1283d.js";import{C as ce}from"./ClassroomService-ab738073.js";class me{constructor(){B(this,"url");B(this,"token");this.url="https://api-sman24.matradipti.org/api/v1/",this.token=JSON.parse(window.localStorage.getItem("token")).token}getAllGender(){return fetch(`${this.url}gender`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}}).then(n=>n.json()).then(n=>n.data)}}const ve={class:"grid"},pe={class:"col-12"},_e={class:"card"},fe={class:"my-2"},he={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},be=a("h5",{class:"m-0"},"Data Siswa SMAN 24 Bandung",-1),ge={class:"block mt-2 md:mt-0 p-input-icon-left"},Se=a("i",{class:"pi pi-search"},null,-1),ye=a("span",{class:"p-column-title"},"Name",-1),ke=a("span",{class:"p-column-title"},"NIS",-1),we=a("span",{class:"p-column-title"},"NISN",-1),Ne=a("span",{class:"p-column-title"},"kelamin",-1),Ve=a("span",{class:"p-column-title"},"Kelas",-1),Ce=a("span",{class:"p-column-title"},"Status",-1),xe={class:"field"},Ie=a("label",{for:"name"},"Name",-1),De={key:0,class:"p-invalid"},Ue={class:"field"},Ae=a("label",{for:"name"},"NIS",-1),Pe={key:0,class:"p-invalid"},Me={class:"field"},Te=a("label",{for:"name"},"NISN",-1),Be={key:0,class:"p-invalid"},qe={class:"field"},Ge=a("label",{for:"inventoryStatus",class:"mb-3"},"Kelas",-1),Le={class:"field"},Ke=a("label",{class:"mb-3"},"Kelamin",-1),$e={class:"formgrid grid"},je={class:"field-radiobutton col-6"},Re={for:"category2"},Ye={class:"field"},ze=a("label",{class:"mb-3"},"Status Siswa",-1),Ee={class:"formgrid grid"},Fe={class:"field-radiobutton col-6"},Oe=a("label",{for:"category1"},"Aktif",-1),Je={class:"field-radiobutton col-6"},He=a("label",{for:"category2"},"Tidak Aktif",-1),Qe={class:"flex align-items-center justify-content-center"},We=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Xe={key:0},Ze={class:"field"},et=a("label",{for:"name"},"Name",-1),tt={key:0,class:"p-invalid"},at={class:"field"},lt=a("label",{for:"name"},"NIS",-1),st={key:0,class:"p-invalid"},ot={class:"field"},it=a("label",{for:"name"},"NISN",-1),nt={key:0,class:"p-invalid"},dt={class:"field"},ut=a("label",{for:"inventoryStatus",class:"mb-3"},"Kelas",-1),rt={class:"field"},ct=a("label",{class:"mb-3"},"Kelamin",-1),mt={class:"formgrid grid"},vt={class:"field-radiobutton col-6"},pt={for:"category2"},_t={class:"field"},ft=a("label",{class:"mb-3"},"Status Kelas",-1),ht={class:"formgrid grid"},bt={class:"field-radiobutton col-6"},gt=a("label",{for:"category1"},"Aktif",-1),St={class:"field-radiobutton col-6"},yt=a("label",{for:"category2"},"Tidak Aktif",-1),kt={class:"flex align-items-center justify-content-center"},wt=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Nt={key:0},Vt={class:"flex align-items-center justify-content-center"},Ct=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),xt={key:0},Pt=se({__name:"Student",setup(S){const n=oe(),v=m(null),A=m(null),T=m(null),C=m(!1),x=m(!1),y=m(!1),I=m(!1),t=m({}),w=m(null),q=m(null),P=m({}),r=m(!1),G=m(!0),_=new re,R=new ce,Y=new me;ie(()=>{X()}),ne(()=>{_.getAllStudentData().then(o=>v.value=o),R.getAllClassroom().then(o=>A.value=o),Y.getAllGender().then(o=>T.value=o),G.value=!1});const z=()=>{t.value={},t.value.active_status=1,r.value=!1,C.value=!0},L=()=>{C.value=!1,x.value=!1,r.value=!1},E=async()=>{r.value=!0,await _.createStudentData(t.value).then(o=>{o.status?n.add({severity:"success",summary:"Berhasil",detail:"Berhasil Tambah Siswa",life:3e3}):n.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Membuat Data Siswa",life:3e3})}),await _.getAllStudentData().then(o=>v.value=o),C.value=!1,t.value={}},F=o=>{t.value={...o},t.value.active_status?t.value.active_status=1:t.value.active_status=0,t.value.classroom_id=A.value.filter(l=>l.id==t.value.classroom_id)[0],x.value=!0},O=async()=>{await _.updateStudentData(t.value).then(o=>{o?n.add({severity:"success",summary:"Berhasil",detail:"Berhasil Untuk Pemperbaharui Data Siswa",life:3e3}):n.add({severity:"error",summary:"Gagal",detail:"Gagal Untuk Memperbaharui Data Siswa",life:3e3})}),await _.getAllStudentData().then(o=>v.value=o),x.value=!1},J=o=>{t.value=o,t.value.deleteProductDialog.value=!0},K=async()=>{y.value=!1,await _.deleteStudent(t.value.student_id).then(o=>o?n.add({severity:"success",summary:"Successful",detail:"berhasil menghapus data",life:3e3}):n.add({severity:"error",summary:"Gagal",detail:"Gagal Menghapus data siswa",life:3e3})),await _.getAllStudentData().then(o=>v.value=o),t.value={}},H=()=>{q.value.exportCSV()},Q=()=>{I.value=!0},W=async()=>{await _.deleteMultipleStudent(w.value).then(o=>o.status?n.add({severity:"success",summary:"Berhasil",detail:"Siswa Terhapus",life:3e3}):n.add({severity:"error",summary:"Gagal",detail:"Siswa Gagal Terhapus",life:3e3})),await _.getAllStudentData().then(o=>v.value=o),I.value=!1,w.value=null},X=()=>{P.value={global:{value:null,matchMode:de.CONTAINS}}};return ue(t,(o,l)=>{}),(o,l)=>{const Z=f("Toast"),c=f("Button"),ee=f("Toolbar"),k=f("InputText"),g=f("Column"),te=f("DataTable"),$=f("Dropdown"),N=f("RadioButton"),D=f("Dialog");return d(),u("div",ve,[a("div",pe,[a("div",_e,[s(Z),s(ee,{class:"mb-4"},{start:i(()=>[a("div",fe,[s(c,{label:"New",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:z}),s(c,{label:"Delete",icon:"pi pi-trash",class:"p-button-danger",onClick:Q,disabled:!w.value||!w.value.length},null,8,["disabled"])])]),end:i(()=>[s(c,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:l[0]||(l[0]=e=>H(e))})]),_:1}),s(te,{ref_key:"dt",ref:q,value:v.value,selection:w.value,"onUpdate:selection":l[2]||(l[2]=e=>w.value=e),dataKey:"student_id",paginator:!0,rows:20,filters:P.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[20,50,75,100],loading:G.value,currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} students",responsiveLayout:"scroll"},{header:i(()=>[a("div",he,[be,a("span",ge,[Se,s(k,{modelValue:P.value.global.value,"onUpdate:modelValue":l[1]||(l[1]=e=>P.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:i(()=>[s(g,{selectionMode:"multiple",headerStyle:"width: 3rem"}),s(g,{field:"name",header:"Name",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:i(e=>[ye,p(" "+h(e.data.name),1)]),_:1}),s(g,{field:"NIS",header:"NIS",sortable:!0,headerStyle:"width:14%; min-width:8rem;"},{body:i(e=>[ke,p(" "+h(e.data.NIS),1)]),_:1}),s(g,{field:"NISN",header:"NISN",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:i(e=>[we,p(" "+h(e.data.NISN),1)]),_:1}),s(g,{field:"code",header:"Kelamin",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:i(e=>[Ne,p(" "+h(e.data.code),1)]),_:1}),s(g,{field:"classroom_name",header:"Kelas",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:i(e=>[Ve,p(" "+h(e.data.classroom_name),1)]),_:1}),s(g,{field:"active_status",header:"Status",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:i(e=>[Ce,e.data.active_status?(d(),u(M,{key:0},[p(" Aktif ")],64)):(d(),u(M,{key:1},[p(" Tidak Aktif ")],64))]),_:1}),s(g,{headerStyle:"min-width:10rem;"},{body:i(e=>[s(c,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:U=>F(e.data)},null,8,["onClick"]),s(c,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:U=>J(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","loading"]),s(D,{visible:C.value,"onUpdate:visible":l[10]||(l[10]=e=>C.value=e),style:{width:"450px"},header:"Penambahan Data Siswa",modal:!0,class:"p-fluid"},{footer:i(()=>[s(c,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:L}),s(c,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:E})]),default:i(()=>[a("div",xe,[Ie,s(k,{id:"name",modelValue:t.value.name,"onUpdate:modelValue":l[3]||(l[3]=e=>t.value.name=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.name?(d(),u("small",De,"Name is required.")):b("",!0)]),a("div",Ue,[Ae,s(k,{id:"name",type:"number",modelValue:t.value.NIS,"onUpdate:modelValue":l[4]||(l[4]=e=>t.value.NIS=e),modelModifiers:{trim:!0},required:!0,class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.NIS?(d(),u("small",Pe,"NIS is required.")):b("",!0)]),a("div",Me,[Te,s(k,{id:"name",type:"number",modelValue:t.value.NISN,"onUpdate:modelValue":l[5]||(l[5]=e=>t.value.NISN=e),modelModifiers:{trim:!0},required:!0,class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.NISN?(d(),u("small",Be,"NIS is required.")):b("",!0)]),a("div",qe,[Ge,s($,{id:"inventoryStatus",modelValue:t.value.classroom_id,"onUpdate:modelValue":l[6]||(l[6]=e=>t.value.classroom_id=e),options:A.value,optionLabel:"name"},null,8,["modelValue","options"])]),a("div",Le,[Ke,a("div",$e,[(d(!0),u(M,null,j(T.value,e=>(d(),u("div",je,[s(N,{id:"category2",name:e.code,value:e.id,modelValue:t.value.gender_id,"onUpdate:modelValue":l[7]||(l[7]=U=>t.value.gender_id=U)},null,8,["name","value","modelValue"]),a("label",Re,h(e.gender),1)]))),256))])]),a("div",Ye,[ze,a("div",Ee,[a("div",Fe,[s(N,{id:"category1",name:!0,value:1,modelValue:t.value.active_status,"onUpdate:modelValue":l[8]||(l[8]=e=>t.value.active_status=e)},null,8,["modelValue"]),Oe]),a("div",Je,[s(N,{id:"category2",name:!1,value:0,modelValue:t.value.active_status,"onUpdate:modelValue":l[9]||(l[9]=e=>t.value.active_status=e)},null,8,["modelValue"]),He])])])]),_:1},8,["visible"]),s(D,{visible:y.value,"onUpdate:visible":l[12]||(l[12]=e=>y.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:i(()=>[s(c,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[11]||(l[11]=e=>y.value=!1)}),s(c,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:K})]),default:i(()=>[a("div",Qe,[We,t.value?(d(),u("span",Xe,[p("Apakah Anda Yakin Untuk Menghapus Siswa "),a("b",null,h(t.value.name),1),p("?")])):b("",!0)])]),_:1},8,["visible"]),s(D,{visible:x.value,"onUpdate:visible":l[20]||(l[20]=e=>x.value=e),style:{width:"450px"},header:"Edit Data Siswa",modal:!0,class:"p-fluid"},{footer:i(()=>[s(c,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:L}),s(c,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:O})]),default:i(()=>[a("div",Ze,[et,s(k,{id:"name",modelValue:t.value.name,"onUpdate:modelValue":l[13]||(l[13]=e=>t.value.name=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.name?(d(),u("small",tt,"Name is required.")):b("",!0)]),a("div",at,[lt,s(k,{id:"name",type:"number",modelValue:t.value.NIS,"onUpdate:modelValue":l[14]||(l[14]=e=>t.value.NIS=e),modelModifiers:{trim:!0},required:!0,class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.NIS?(d(),u("small",st,"NIS is required.")):b("",!0)]),a("div",ot,[it,s(k,{id:"name",type:"number",modelValue:t.value.NISN,"onUpdate:modelValue":l[15]||(l[15]=e=>t.value.NISN=e),modelModifiers:{trim:!0},required:!0,class:V({"p-invalid":r.value&&!t.value.name})},null,8,["modelValue","class"]),r.value&&!t.value.NISN?(d(),u("small",nt,"NIS is required.")):b("",!0)]),a("div",dt,[ut,s($,{id:"inventoryStatus",modelValue:t.value.classroom_id,"onUpdate:modelValue":l[16]||(l[16]=e=>t.value.classroom_id=e),options:A.value,optionLabel:"name"},null,8,["modelValue","options"])]),a("div",rt,[ct,a("div",mt,[(d(!0),u(M,null,j(T.value,e=>(d(),u("div",vt,[s(N,{id:"category2",name:e.code,value:e.id,modelValue:t.value.gender_id,"onUpdate:modelValue":l[17]||(l[17]=U=>t.value.gender_id=U)},null,8,["name","value","modelValue"]),a("label",pt,h(e.gender),1)]))),256))])]),a("div",_t,[ft,a("div",ht,[a("div",bt,[s(N,{id:"category1",name:!0,value:1,modelValue:t.value.active_status,"onUpdate:modelValue":l[18]||(l[18]=e=>t.value.active_status=e)},null,8,["modelValue"]),gt]),a("div",St,[s(N,{id:"category2",name:!1,value:0,modelValue:t.value.active_status,"onUpdate:modelValue":l[19]||(l[19]=e=>t.value.active_status=e)},null,8,["modelValue"]),yt])])])]),_:1},8,["visible"]),s(D,{visible:y.value,"onUpdate:visible":l[22]||(l[22]=e=>y.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:i(()=>[s(c,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[21]||(l[21]=e=>y.value=!1)}),s(c,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:K})]),default:i(()=>[a("div",kt,[wt,t.value?(d(),u("span",Nt,[p("Apakah Anda Yakin Untuk Menghapus Siswa "),a("b",null,h(t.value.name),1),p("?")])):b("",!0)])]),_:1},8,["visible"]),s(D,{visible:I.value,"onUpdate:visible":l[24]||(l[24]=e=>I.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:i(()=>[s(c,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[23]||(l[23]=e=>I.value=!1)}),s(c,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:W})]),default:i(()=>[a("div",Vt,[Ct,t.value?(d(),u("span",xt,"Apakah Anda Yakin Untuk Menghapus Data-Data Siswa?")):b("",!0)])]),_:1},8,["visible"])])])])}}});export{Pt as default};
