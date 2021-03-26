var $={
  option:{
    'menu':['menu','lists','items','Ennawawi Mode','get one','more'],
    'lists':['menu','new list','change list','remove list','export list','view lists'],
    'items':['menu','add item','remove item','view items'],
    'more':['menu','activate OM','my ID','about'],
  },
  _delete:function(all,target){
    var r=[];
    all.forEach(v=>{
      if(target.indexOf(v)<0){
        r=[...r,v];
      }
    });
    return r;
  },
  getOp:function(goal){
    var op=YS.option[goal]||[];
    switch(goal){
      case 'menu':
        if(!OM._active_list){
          op=YS._delete(op,['items','get one','get many'])
        }else if(!(OM._lists[OM._active_list]||[]).length){
          op=YS._delete(op,['get one','get many'])
        }
      break;
      case 'lists':
        if(!YS.validChange().slice(1).length){
          op=YS._delete(op,['change list','remove list','export list','view lists'])
        }
      break;
      case 'items':
        if(!(OM._lists[OM._active_list]||[]).length){
          op=YS._delete(op,['remove item','view items'])
        }
      break;
      case 'more':
      if(OM.iso){
        op=YS._delete(op,['activate OM'])
      }
      break;
    }
    return op;
  },
  goal:function(g,input){
    var ng=YS.getOp(g)[input]||g;
    return ng.replace(/\s/g,'');
  },
  list:function(goal){
  var op=YS.getOp(goal),message='';
  for(let i=1;i<op.length;i++){
    message+=i+(OM.iso?$.om():'.')+' '+op[i]+'\n';
  }
  if(message=='')return '';
  message+='0. back\n00. exit';
  return goal+' :\n'+message;
  },
  listChange:function(){
    var m='',i=1;
    for(let x in OM._lists){
      m+=i+'. '+x+(x==OM._active_list?' (on)':'')+'\n';
      i++;
    }
    return m+'0. cancel';
  },
  validChange:function(n){
    var m=[null],i=1;
    n=+n;
    for(x in OM._lists){
      m[i]=x;
      i++;
    }
    return m;
  },
  itemList:function(){
    var items=OM._lists[OM._active_list]||[],m='';
    for(let i=0;i<items.length;i++){
      m+=(i+1)+'. '+items[i]+'\n'
    }
    return m
  },
  validItem:function(index){
    var items=OM._lists[OM._active_list]||[];
    return items[index-1];
  },
  listViewer:function(){
    var m='',i=1;
    for(let x in OM._lists){
      m+=i+'. '+x+' ('+OM._lists[x].length+')'+'\n';
      i++;
    }return m;
  },
  EMView:()=>{
    var list=OM.ennawawiMode(),disp='';
    for(let i=0;i<list.length;i++){
      disp+=(i+1)+'. '+list[i];
    }
    alert(disp);
  },
  listMany:function(e){
    var r=OM.getMany(e),t={};
    for(let i=0;i<r.length;i++){
      t[r[i]]=(t[r[i]]||0)+1;
    }
    var m='';
    for(let g in t){
      m+=`${g} (${t[g]})\n`;
    }
    return m;
  },
  om:()=>{
    var o='❤️,💙'.split(','),
    i=Math.floor(Math.random()*o.length);
    return o[i];
  }
};

window.YS=$;
