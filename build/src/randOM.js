var cache='OUIAM';

(function(){let $={

  getOne:()=>{

    var list=$._lists[$._active_list]||[],

    index=Math.floor(Math.random()*list.length);

    return list[index];

  },

  getMany:n=>{

    var items=[];

    for(let i=0;i<n;i++){

      items=[...items,$.getOne()];

    }

    return items;

  },

  newList:function(list){

    if(!(list in $._lists)){

      if(!($._active_list in $._lists))$._active_list=list;

      $._lists[list]=[];

      $.save();

    }

  },

  changeList:function(list){

    if(list in $._lists){

      $._active_list=list;

      $.save();

    }

    //handle error

  },

  removeList:function(list){

    if(list in $._lists){

      delete $._active_list[list];

      $.save();

    }

    //handle error

  },

  importList:async function(){

    

  },

  exportList:async function(list){

    if(list in $._lists){

      $.download($._lists[list],list);

    }

    //handle error

  },

  addItem:function(item){

    if ($._active_list in $._lists) {

      $._lists[$._active_list]=$.joinList($._lists[$._active_list],item);

      $.save();

    }

    //handle error

  },

  removeItem:function(item){

    var index=$._lists[$._active_list].indexOf(item);

    if ($._active_list in $._lists&&index>=0) {

      delete $._lists[$._active_list][index];

      $.save();

    }

    //handle error

  },

  joinList:function(list,item){

    if(list.indexOf(item)<0){

      return [...list,item];

    }

    return list;

  },

  download:(function() {

  var a = document.createElement("a");

  document.body.appendChild(a);

  a.style = "display:none";

  return function(data,name) {

    var json = ['# '+name,...data].join('\n'),

      blob = new Blob([json], { type: "text" }),

      url = window.URL.createObjectURL(blob);

    a.href = url;

    a.download = name+'.txt';

    a.click();

    window.URL.revokeObjectURL(url);

  };

  }()),

  save:()=>{

    Lockr.set(cache,{l:$._lists,s:$._active_list,m:$.id});

  },

  id:'OM010102',

  _lists:{},

  _active_list:undefined,

}

window.OM=$;

}());

var newId=()=>{

  var r='OM';

  for(let i=0;i<6;i++){

    r+=Math.floor(Math.random()*16).toString(16);

  }

  return r.toLocaleUpperCase();

}

var tmp={l:{},s:null,m:newId()};

try{

  tmp=Lockr.get(cache)||tmp;

}catch(_){ }

OM._lists=tmp.l;

OM._active_list=tmp.s;

OM.id=tmp.m;

OM.save();
