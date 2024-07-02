import{d as O,h as H,r as u,i as J,o as Q,j as W,a as c,b as m,c as v,e as t,f as s,k as o,l as b,t as k,n as V,m as _}from"./index-50b5eccf.js";import{A as X}from"./AchievementService-ccdfbfa4.js";const Z={class:"grid"},ee={class:"col-12"},ae={class:"card"},te={class:"my-2"},le={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},se=t("h5",{class:"m-0"},"Pencapaian SMAN 24",-1),ie={class:"block mt-2 md:mt-0 p-input-icon-left"},oe=t("i",{class:"pi pi-search"},null,-1),ne=t("span",{class:"p-column-title"},"Name",-1),de=t("span",{class:"p-column-title"},"description",-1),ue=t("span",{class:"p-column-title"},"Code",-1),re=t("span",{class:"p-column-title"},"Nilai",-1),ce=t("span",{class:"p-column-title"},"status",-1),me={class:"field"},ve=t("label",{for:"name"},"Nama Pencapaian",-1),pe={key:0,class:"p-invalid"},_e={class:"field"},fe=t("label",{for:""},"Deskripsi",-1),he={class:"field"},be=t("label",{for:"name"},"kode Pencapaian",-1),ye={key:0,class:"p-invalid"},ge={class:"field"},ke=t("label",{for:"name"},"Nilai Pencapaian",-1),Ve={key:0,class:"p-invalid"},Pe={class:"field"},we=t("label",{class:"mb-3"},"Status Pencapaian",-1),xe={class:"formgrid grid"},Ce={class:"field-radiobutton col-6"},Ae=t("label",{for:"category1"},"Aktif",-1),Ne={class:"field-radiobutton col-6"},Me=t("label",{for:"category2"},"Tidak Aktif",-1),Se={class:"field"},De=t("label",{for:"name"},"Nama Pencapaian",-1),Ue={key:0,class:"p-invalid"},Te={class:"field"},qe=t("label",{for:""},"Deskripsi",-1),Be={class:"field"},Ge=t("label",{for:"name"},"kode Pencapaian",-1),Ke={key:0,class:"p-invalid"},Le={class:"field"},Re=t("label",{for:"name"},"Nilai Pencapaian",-1),Ye={key:0,class:"p-invalid"},je={class:"field"},$e=t("label",{class:"mb-3"},"Status Pencapaian",-1),ze={class:"formgrid grid"},Ee={class:"field-radiobutton col-6"},Fe=t("label",{for:"category1"},"Aktif",-1),Ie={class:"field-radiobutton col-6"},Oe=t("label",{for:"category2"},"Tidak Aktif",-1),He={class:"flex align-items-center justify-content-center"},Je=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Qe={key:0},We={class:"flex align-items-center justify-content-center"},Xe=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Ze={key:0},la=O({__name:"Achievement",setup(ea){const p=H(),y=u(null),P=u(!1),w=u(!1),x=u(!1),C=u(!1),a=u({}),g=u(null),S=u(null),A=u({}),n=u(!1),r=new X;J(()=>{$()}),Q(()=>{r.getAllAchievement().then(i=>y.value=i)});const T=()=>{a.value={},a.value.active_status=1,n.value=!1,P.value=!0},D=()=>{P.value=!1,n.value=!1,w.value=!1},q=async()=>{n.value=!0,await r.createAchievement(a.value).then(i=>i.status?p.add({severity:"success",summary:"Berhasil",detail:"Berhasil Menambah Pencapaian",life:3e3}):p.add({severity:"error",summary:"Gagal",detail:"Gagal Menambah Kelas",life:3e3})),await r.getAllAchievement().then(i=>y.value=i),P.value=!1,a.value={}},B=i=>{a.value={...i},w.value=!0},G=async()=>{await r.updateAchievement(a.value).then(i=>i.status?p.add({severity:"success",summary:"Berhasil",detail:"Berhasil Memperbaharui Pencapaian",life:3e3}):p.add({severity:"error",summary:"Gagal",detail:"Gagal Memperbaharui Pencapaian",life:3e3})),await r.getAllAchievement().then(i=>y.value=i),w.value=!1},K=i=>{a.value=i,x.value=!0},L=async()=>{await r.deleteAchievement(a.value.id).then(i=>i.status?p.add({severity:"success",summary:"Berhasil",detail:"Pencapaian Dihapus",life:3e3}):p.add({severity:"error",summary:"Gagal",detail:"Gagal Menghapus Pencapaian",life:3e3})),await r.getAllAchievement().then(i=>y.value=i),x.value=!1,a.value={}},R=()=>{S.value.exportCSV()},Y=()=>{C.value=!0},j=async()=>{await r.deleteMultipleAchievement(g.value).then(i=>i.status?p.add({severity:"success",summary:"Berhasil",detail:"Kelas Terhapus",life:3e3}):p.add({severity:"error",summary:"Gagal",detail:"Kelas Gagal Terhapus",life:3e3})),await r.getAllAchievement().then(i=>y.value=i),C.value=!1,g.value=null},$=()=>{A.value={global:{value:null,matchMode:W.CONTAINS}}};return(i,l)=>{const z=c("Toast"),d=c("Button"),E=c("Toolbar"),f=c("InputText"),h=c("Column"),F=c("DataTable"),U=c("Textarea"),N=c("RadioButton"),M=c("Dialog");return m(),v("div",Z,[t("div",ee,[t("div",ae,[s(z),s(E,{class:"mb-4"},{start:o(()=>[t("div",te,[s(d,{label:"New",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:T}),s(d,{label:"Delete",icon:"pi pi-trash",class:"p-button-danger",onClick:Y,disabled:!g.value||!g.value.length},null,8,["disabled"])])]),end:o(()=>[s(d,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:l[0]||(l[0]=e=>R(e))})]),_:1}),s(F,{ref_key:"dt",ref:S,value:y.value,selection:g.value,"onUpdate:selection":l[2]||(l[2]=e=>g.value=e),dataKey:"id",paginator:!0,rows:20,filters:A.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[20,50,100],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} products",responsiveLayout:"scroll"},{header:o(()=>[t("div",le,[se,t("span",ie,[oe,s(f,{modelValue:A.value.global.value,"onUpdate:modelValue":l[1]||(l[1]=e=>A.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:o(()=>[s(h,{selectionMode:"multiple",headerStyle:"width: 3rem"}),s(h,{field:"name",header:"Name",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[ne,b(" "+k(e.data.name),1)]),_:1}),s(h,{field:"description",header:"Dekripsi",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[de,b(" "+k(e.data.description),1)]),_:1}),s(h,{field:"achievement_code",header:"Kode Pencapaian",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[ue,b(" "+k(e.data.achievement_code),1)]),_:1}),s(h,{field:"score",header:"Nilai",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:o(e=>[re,b(" "+k(e.data.score),1)]),_:1}),s(h,{field:"status",header:"Status",sortable:!0,headerStyle:"width:20rem;"},{body:o(e=>[ce,b(" "+k(e.data.active_status?"Aktif":"Tidak Aktif"),1)]),_:1}),s(h,{headerStyle:"min-width:10rem;"},{body:o(e=>[s(d,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:I=>B(e.data)},null,8,["onClick"]),s(d,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:I=>K(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),s(M,{visible:P.value,"onUpdate:visible":l[9]||(l[9]=e=>P.value=e),style:{width:"450px"},header:"Penambahan Data Pencapaian",modal:!0,class:"p-fluid"},{footer:o(()=>[s(d,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:D}),s(d,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:q})]),default:o(()=>[t("div",me,[ve,s(f,{id:"name",modelValue:a.value.name,"onUpdate:modelValue":l[3]||(l[3]=e=>a.value.name=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.name})},null,8,["modelValue","class"]),n.value&&!a.value.name?(m(),v("small",pe,"Name is required.")):_("",!0)]),t("div",_e,[fe,s(U,{id:"name",modelValue:a.value.description,"onUpdate:modelValue":l[4]||(l[4]=e=>a.value.description=e),modelModifiers:{trim:!0},required:!0,autofocus:""},null,8,["modelValue"])]),t("div",he,[be,s(f,{id:"name",modelValue:a.value.achievement_code,"onUpdate:modelValue":l[5]||(l[5]=e=>a.value.achievement_code=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.achievement_code})},null,8,["modelValue","class"]),n.value&&!a.value.achievement_code?(m(),v("small",ye,"Kode Pencapaian is required.")):_("",!0)]),t("div",ge,[ke,s(f,{type:"number",id:"name",modelValue:a.value.score,"onUpdate:modelValue":l[6]||(l[6]=e=>a.value.score=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.score})},null,8,["modelValue","class"]),n.value&&!a.value.score?(m(),v("small",Ve,"Nilai Pencapaian is required.")):_("",!0)]),t("div",Pe,[we,t("div",xe,[t("div",Ce,[s(N,{id:"category1",name:"true",value:1,modelValue:a.value.active_status,"onUpdate:modelValue":l[7]||(l[7]=e=>a.value.active_status=e)},null,8,["modelValue"]),Ae]),t("div",Ne,[s(N,{id:"category2",name:"false",value:0,modelValue:a.value.active_status,"onUpdate:modelValue":l[8]||(l[8]=e=>a.value.active_status=e)},null,8,["modelValue"]),Me])])])]),_:1},8,["visible"]),s(M,{visible:w.value,"onUpdate:visible":l[16]||(l[16]=e=>w.value=e),style:{width:"450px"},header:"Edit Data Pencapaian",modal:!0,class:"p-fluid"},{footer:o(()=>[s(d,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:D}),s(d,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:G})]),default:o(()=>[t("div",Se,[De,s(f,{id:"name",modelValue:a.value.name,"onUpdate:modelValue":l[10]||(l[10]=e=>a.value.name=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.name})},null,8,["modelValue","class"]),n.value&&!a.value.name?(m(),v("small",Ue,"Name is required.")):_("",!0)]),t("div",Te,[qe,s(U,{id:"name",modelValue:a.value.description,"onUpdate:modelValue":l[11]||(l[11]=e=>a.value.description=e),modelModifiers:{trim:!0},required:!0,autofocus:""},null,8,["modelValue"])]),t("div",Be,[Ge,s(f,{id:"name",modelValue:a.value.achievement_code,"onUpdate:modelValue":l[12]||(l[12]=e=>a.value.achievement_code=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.achievement_code})},null,8,["modelValue","class"]),n.value&&!a.value.achievement_code?(m(),v("small",Ke,"Kode Pencapaian is required.")):_("",!0)]),t("div",Le,[Re,s(f,{type:"number",id:"name",modelValue:a.value.score,"onUpdate:modelValue":l[13]||(l[13]=e=>a.value.score=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:V({"p-invalid":n.value&&!a.value.score})},null,8,["modelValue","class"]),n.value&&!a.value.score?(m(),v("small",Ye,"Nilai Pencapaian is required.")):_("",!0)]),t("div",je,[$e,t("div",ze,[t("div",Ee,[s(N,{id:"category1",name:"true",value:1,modelValue:a.value.active_status,"onUpdate:modelValue":l[14]||(l[14]=e=>a.value.active_status=e)},null,8,["modelValue"]),Fe]),t("div",Ie,[s(N,{id:"category2",name:"false",value:0,modelValue:a.value.active_status,"onUpdate:modelValue":l[15]||(l[15]=e=>a.value.active_status=e)},null,8,["modelValue"]),Oe])])])]),_:1},8,["visible"]),s(M,{visible:x.value,"onUpdate:visible":l[18]||(l[18]=e=>x.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[s(d,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[17]||(l[17]=e=>x.value=!1)}),s(d,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:L})]),default:o(()=>[t("div",He,[Je,a.value?(m(),v("span",Qe,[b("Apakah Anda Yakin Untuk Menghapus "),t("b",null,k(a.value.name),1),b("?")])):_("",!0)])]),_:1},8,["visible"]),s(M,{visible:C.value,"onUpdate:visible":l[20]||(l[20]=e=>C.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[s(d,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:l[19]||(l[19]=e=>C.value=!1)}),s(d,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:j})]),default:o(()=>[t("div",We,[Xe,a.value?(m(),v("span",Ze,"Apakah Anda Yakin Untuk Menghapus Kelas Yang Dipilih?")):_("",!0)])]),_:1},8,["visible"])])])])}}});export{la as default};