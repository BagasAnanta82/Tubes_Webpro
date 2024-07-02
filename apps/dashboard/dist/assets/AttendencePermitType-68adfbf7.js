import{d as q,h as z,r as u,i as O,o as K,j as H,a as c,b as h,c as y,e as t,f as a,k as o,l as g,t as C,F as D,m as V}from"./index-ac5318e7.js";import{A as J}from"./AttendencePermitTypeService-e171d858.js";const Q={class:"grid"},W={class:"col-12"},X={class:"card"},Z={class:"my-2"},ee={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},te=t("h5",{class:"m-0"},"Data Tipe Presensi SMAN24 Bandung",-1),ae={class:"block mt-2 md:mt-0 p-input-icon-left"},le=t("i",{class:"pi pi-search"},null,-1),se=t("span",{class:"p-column-title"},"Name",-1),ie=t("span",{class:"p-column-title"},"Status",-1),oe={class:"field"},ne=t("label",{for:"name"},"Nama status",-1),de={class:"field"},ue=t("label",{class:"mb-3"},"Status Pencapaian",-1),re={class:"formgrid grid"},ce={class:"field-radiobutton col-6"},me=t("label",{for:"category1"},"Aktif",-1),pe={class:"field-radiobutton col-6"},ve=t("label",{for:"category2"},"Tidak Aktif",-1),fe={class:"field"},_e=t("label",{for:"name"},"Nama status",-1),be={class:"field"},he=t("label",{class:"mb-3"},"Status Pencapaian",-1),ye={class:"formgrid grid"},ge={class:"field-radiobutton col-6"},ke=t("label",{for:"category1"},"Aktif",-1),Pe={class:"field-radiobutton col-6"},Te=t("label",{for:"category2"},"Tidak Aktif",-1),we={class:"flex align-items-center justify-content-center"},Se=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),xe={key:0},Ae={class:"flex align-items-center justify-content-center"},Ce=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),De={key:0},Ne=q({__name:"AttendencePermitType",setup(Ve){const r=z(),A=u(null),s=u({}),k=u({}),m=u(null),v=u(!1),f=u(!1),p=u(null),_=u(!1),b=u(!1),d=new J;O(()=>{Y()}),K(()=>{d.getAllAttendencePermitTypeService().then(i=>m.value=i)});const M=()=>{s.value={},s.value.active_status=1,v.value=!0},B=async()=>{await d.createAttendencePermitTypeService(s.value).then(i=>i.status?r.add({severity:"success",summary:"Berhasil",detail:"Berhasil Menambah Data",life:3e3}):r.add({severity:"error",summary:"Gagal",detail:"Gagal Menambah Data",life:3e3})),await d.getAllAttendencePermitTypeService().then(i=>m.value=i),s.value={},v.value=!1},N=async()=>{await d.updateAttendencePermitTypeService(s.value).then(i=>i.status?r.add({severity:"success",summary:"Berhasil",detail:"Berhasil Memperbaharui Data",life:3e3}):r.add({severity:"error",summary:"Gagal",detail:"Gagal Memperbaharui Data",life:3e3})),await d.getAllAttendencePermitTypeService().then(i=>m.value=i),f.value=!1,s.value={}},U=i=>{s.value={...i},f.value=!0},S=()=>{v.value=!1,_.value=!1,b.value=!1,s.value={}},G=()=>{A.value.exportCSV()},L=i=>{s.value={...i},_.value=!0},R=async()=>{await d.deleteAttendencePermitTypeService(s.value).then(i=>i.status?r.add({severity:"success",summary:"Berhasil",detail:"Berhasil Menghapus Data",life:3e3}):r.add({severity:"error",summary:"Gagal",detail:"Gagal Menghapus Data",life:3e3})),await d.getAllAttendencePermitTypeService().then(i=>m.value=i),_.value=!1},F=async()=>{await d.deleteMutltipleAttandencePermitTypeService(p.value).then(i=>i.status?r.add({severity:"success",summary:"Berhasil",detail:"Berhasil Menghapus Data",life:3e3}):r.add({severity:"error",summary:"Gagal",detail:"Gagal Menghapus Data",life:3e3})),await d.getAllAttendencePermitTypeService().then(i=>m.value=i),p.value=null,b.value=!1},Y=()=>{k.value={global:{value:null,matchMode:H.CONTAINS}}};return(i,l)=>{const j=c("Toast"),n=c("Button"),$=c("Toolbar"),x=c("InputText"),P=c("Column"),E=c("DataTable"),T=c("RadioButton"),w=c("Dialog");return h(),y("div",Q,[t("div",W,[t("div",X,[a(j),a($,{class:"mb-4"},{start:o(()=>[t("div",Z,[a(n,{label:"New",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:M}),a(n,{label:"Delete",icon:"pi pi-trash",class:"p-button-danger",onClick:l[0]||(l[0]=e=>b.value=!0),disabled:!p.value||!p.value.length},null,8,["disabled"])])]),end:o(()=>[a(n,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:l[1]||(l[1]=e=>G(e))})]),_:1}),a(E,{ref_key:"dt",ref:A,value:m.value,selection:p.value,"onUpdate:selection":l[3]||(l[3]=e=>p.value=e),dataKey:"id",paginator:!0,rows:20,filters:k.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[20,50,100],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} students",responsiveLayout:"scroll"},{header:o(()=>[t("div",ee,[te,t("span",ae,[le,a(x,{modelValue:k.value.global.value,"onUpdate:modelValue":l[2]||(l[2]=e=>k.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:o(()=>[a(P,{selectionMode:"multiple",headerStyle:"width: 3rem"}),a(P,{field:"name",header:"Name",sortable:!0,headerStyle:"width:20%; min-width:20rem;"},{body:o(e=>[se,g(" "+C(e.data.name),1)]),_:1}),a(P,{field:"active_status",header:"Status",sortable:!0,headerStyle:"width:20%; min-width:20rem;"},{body:o(e=>[ie,e.data.active_status?(h(),y(D,{key:0},[g(" Aktif ")],64)):(h(),y(D,{key:1},[g(" Tidak Aktif ")],64))]),_:1}),a(P,{headerStyle:"min-width:10rem;"},{body:o(e=>[a(n,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:I=>U(e.data)},null,8,["onClick"]),a(n,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:I=>L(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),a(w,{visible:v.value,"onUpdate:visible":l[7]||(l[7]=e=>v.value=e),style:{width:"450px"},header:"Penambahan Data Pencapaian",modal:!0,class:"p-fluid"},{footer:o(()=>[a(n,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:S}),a(n,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:B})]),default:o(()=>[t("div",oe,[ne,a(x,{id:"name",modelValue:s.value.name,"onUpdate:modelValue":l[4]||(l[4]=e=>s.value.name=e),required:"true",autofocus:""},null,8,["modelValue"])]),t("div",de,[ue,t("div",re,[t("div",ce,[a(T,{id:"category1",name:"true",value:1,modelValue:s.value.active_status,"onUpdate:modelValue":l[5]||(l[5]=e=>s.value.active_status=e)},null,8,["modelValue"]),me]),t("div",pe,[a(T,{id:"category2",name:"false",value:0,modelValue:s.value.active_status,"onUpdate:modelValue":l[6]||(l[6]=e=>s.value.active_status=e)},null,8,["modelValue"]),ve])])])]),_:1},8,["visible"]),a(w,{visible:f.value,"onUpdate:visible":l[12]||(l[12]=e=>f.value=e),style:{width:"450px"},header:"Penambahan Data Pencapaian",modal:!0,class:"p-fluid"},{footer:o(()=>[a(n,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:l[11]||(l[11]=e=>f.value=!1)}),a(n,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:N})]),default:o(()=>[t("div",fe,[_e,a(x,{id:"name",modelValue:s.value.name,"onUpdate:modelValue":l[8]||(l[8]=e=>s.value.name=e),required:"true",autofocus:""},null,8,["modelValue"])]),t("div",be,[he,t("div",ye,[t("div",ge,[a(T,{id:"category1",name:"true",value:1,modelValue:s.value.active_status,"onUpdate:modelValue":l[9]||(l[9]=e=>s.value.active_status=e)},null,8,["modelValue"]),ke]),t("div",Pe,[a(T,{id:"category2",name:"false",value:0,modelValue:s.value.active_status,"onUpdate:modelValue":l[10]||(l[10]=e=>s.value.active_status=e)},null,8,["modelValue"]),Te])])])]),_:1},8,["visible"]),a(w,{visible:_.value,"onUpdate:visible":l[13]||(l[13]=e=>_.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[a(n,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:S}),a(n,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:R})]),default:o(()=>[t("div",we,[Se,s.value?(h(),y("span",xe,[g("Apakah Anda Yakin Untuk Menghapus "),t("b",null,C(s.value.name),1),g("?")])):V("",!0)])]),_:1},8,["visible"]),a(w,{visible:b.value,"onUpdate:visible":l[14]||(l[14]=e=>b.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:o(()=>[a(n,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:S}),a(n,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:F})]),default:o(()=>[t("div",Ae,[Ce,s.value?(h(),y("span",De,"Apakah Anda Yakin Untuk Menghapus Data Yang Dipilih?")):V("",!0)])]),_:1},8,["visible"])])])])}}});export{Ne as default};
