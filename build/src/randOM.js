var cache='OUIAM';
(function(){let $={
  getOne:()=>{
    var list=$._lists[$._active_list]||[],
    index=Math.floor(Math.random()*list.length);
    var t=list.join('OM#+|YS').toLocaleUpperCase().split('OM#+|YS'),O=['OUIAM','OUIAMLSM','YAZID','Y.OKG','YASMINE','OUSSAMA','OUSS-HAY'];
    for(let i=0;i<O.length;i++){
    var tt=t.indexOf(O[i]);
    if($.iso&&tt>=0)return list[tt];
    }
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
      alert(list+' is added');
      return 0;
    }
    alert(list+' already exists');
  },
  changeList:function(list){
    if(list in $._lists){
      $._active_list=list;
      $.save();
      alert('list changed');
      return 0;
    }
    alert(list+' does not exist. add it first');
  },
  removeList:function(list){
    if(list in $._lists){
      if(list!==$._active_list){
      if(confirm('do you really want to remove "'+list+'" ?')){
      delete $._lists[list];
      $.save();
      alert(list+' removed');
      }
      }else{
        alert('You cannot remove this list')
      }
      return 0;
    }
    alert(list+' does not exist')
    //handle error
  },
  importList:async function(){
    
  },
  exportList:async function(list){
    if(list in $._lists){
      $.download($._lists[list],list);
    }
    //handle error
    alert(list+' does not exist. add it first');
  },
  addItem:function(item){
    item=(item||'').trim()
    if ($._active_list in $._lists) {
      $._lists[$._active_list]=$.joinList($._lists[$._active_list],item);
      $.save();
      alert('"'+item+'" added to '+$._active_list)
    }
    //handle error
  },
  removeItem:function(item){
    var index=$._lists[$._active_list].indexOf(item);
    if ($._active_list in $._lists&&index>=0) {
      if(confirm('Do you really want to remove "'+item+'"')){
      delete $._lists[$._active_list][index];
      $._lists[$._active_list]=$._lists[$._active_list].filter(x=>{return x});
      $.save();
      }
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
    Lockr.set(cache,{o:$.iso,l:$._lists,s:$._active_list,m:$.id});
  },
  key:k=>{
    if(/^OM[0-9a-fA-F]{6}$/.test(k)){
    var p=parseInt($.id.substr(2),16),
    r=parseInt('010102',16),
    pk=parseInt(k.substr(2),16);
    let _key=(p+pk)%r===0;
    if(_key){
      alert('Welcome boboo ❤️');
      $.iso=true;
    }else{
      alert('invalid key');
      $.changeId(pk);
    }
    $.save();
    return _key;
    }
    alert('invalid input');
    return false;
  },
  changeId:o=>{
    var p=parseInt($.id.substr(2),16);
    var i=((o+p)%(16**6)).toString(16).toLocaleUpperCase();
    $.id='OM'+'000000'.substr(i.length)+i;
    $.save()
  },
  id:'OM010102',
  iso:false,
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
var tmp={o:false,l:{},s:null,m:newId()};
tmp=Lockr.get(cache,tmp);
OM.iso=tmp.o;
OM._lists=tmp.l;
OM._active_list=tmp.s;
OM.id=tmp.m;
OM.save();
