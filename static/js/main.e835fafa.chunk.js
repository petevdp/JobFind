(this.webpackJsonpjobfind=this.webpackJsonpjobfind||[]).push([[0],{13:function(e,a,t){},15:function(e,a,t){},17:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(4),o=t.n(r),s=(t(13),t(1)),l=t(7),i=t(2),m=t.n(i),u=(t(15),t(5)),p=t.n(u),E=t(6),A=t.n(E);function d(e){for(var a=e.toString(),t=[],n=0;n<a.length;n+=3)t.push(a.slice(n,n+3));return t.join(",")}var g=function(e){var a=e.job,t=a.name,n=a.hiring_company,r=a.location,o=a.posted_time_friendly,s=a.snippet,l=a.url,i=a.salary_max_annual,m=a.salary_min_annual;function u(e){e.nativeEvent.stopPropagation(),e.stopPropagation()}return c.a.createElement(p.a,{collapsed:!0,render:function(e){var a=e.toggle,p=e.setCollapsibleElement;return c.a.createElement("section",{className:"job-posting",onClick:a},c.a.createElement("span",{className:"title"},t),c.a.createElement("span",{className:"hiring-company"},n.name),c.a.createElement("span",{className:"location"},r),c.a.createElement("span",{className:"posted-time"},o),c.a.createElement("div",{className:"url-container"},c.a.createElement("a",{className:"url",href:l,onClick:u},c.a.createElement("img",{src:A.a,alt:"url",width:30,height:30}))),c.a.createElement("div",{className:"collapsible",ref:p},c.a.createElement("h4",{className:"description-heading"},"Description"),c.a.createElement("section",{className:"snippet",dangerouslySetInnerHTML:{__html:s}}),c.a.createElement("section",{className:"salary-container"},c.a.createElement("div",{className:"salary-min"},c.a.createElement("label",{className:"label"},"Min Salary:"),c.a.createElement("span",{className:"value"},"$",d(m))),c.a.createElement("div",{className:"salay-max"},c.a.createElement("label",{className:"label"},"Max Salary:"),c.a.createElement("span",{className:"value"},"$",d(i))))))}})},h=function(e){var a=e.jobs.map((function(e){return c.a.createElement("li",{key:e.id},c.a.createElement(g,{job:e}))}));return c.a.createElement("ul",{id:"job-list"},a)},b="https://api.ziprecruiter.com/jobs/v1",f="mthpyw9ea7zyswfuj3zur6bt55fce7qf";var v=function(){var e=Object(n.useState)({location:"",search:"",jobList:[],searchStatus:"noSearches"}),a=Object(l.a)(e,2),t=a[0],r=a[1],o=t.location,i=t.search,u=t.jobList;var p={noSearches:function(){return c.a.createElement("h3",{className:"usage-prompt no-searches"},"Time to look for a job!")},notFound:function(){return c.a.createElement("h3",{className:"usage-prompt not-found"},"No jobs matching these search terms found!")},success:function(){return c.a.createElement("h3",{className:"usage-prompt success"},"Jobs found!")}}[t.searchStatus]();return c.a.createElement("div",{className:"App"},c.a.createElement("nav",{id:"top-bar",className:"title"},c.a.createElement("h1",{id:"app-title"},"JobFind")),c.a.createElement("div",{className:"content-container"},c.a.createElement("div",{className:"search-container"},p,c.a.createElement("form",{id:"search-form",onSubmit:function(e){e.preventDefault(),function(e,a){var t;return m.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=encodeURI(b+"?api_key=".concat(f,"&location=").concat(e,"&search=").concat(a)),n.next=3,m.a.awrap(fetch(t,{mode:"cors"}));case 3:return n.abrupt("return",n.sent.json());case 4:case"end":return n.stop()}}))}(o,i).then((function(e){r(Object(s.a)({},t,{jobList:e.jobs,searchStatus:e.jobs.length>0?"success":"notFound"}))}))}},c.a.createElement("label",{className:"location-label"},"Location"),c.a.createElement("input",{name:"location",type:"text",value:o,onChange:function(e){r(Object(s.a)({},t,{location:e.target.value}))},placeholder:"location"}),c.a.createElement("label",{className:"keywords-label"},"Keywords"),c.a.createElement("input",{name:"keywords",type:"text",value:i,onChange:function(e){r(Object(s.a)({},t,{search:e.target.value}))},placeholder:"job keywords"}),c.a.createElement("div",{className:"button-row"},c.a.createElement("input",{type:"submit"}))),c.a.createElement(h,{jobs:u}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},6:function(e,a){e.exports="data:image/png;base64,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"},8:function(e,a,t){e.exports=t(17)}},[[8,1,2]]]);
//# sourceMappingURL=main.e835fafa.chunk.js.map