var alive = true,
  message = 'Welcome to randOM\nany key to start',
  _default = '',
  goal = 'run';
while (alive) {
  if (message) var input = prompt(message, _default);
  if (input == '00') {
    if (confirm('Do you want to leave the app?')) break;
  }
  switch (goal) {
    case 'run':
      goal = 'menu';
      message = YS.list(goal);
      break;
    case 'lists':
    case 'menu':
    case 'items':
    case 'more':
      goal = YS.goal(goal, input);
      message = YS.list(goal);
      break;
    case 'newlist':
      var list_ = (prompt('new list name :\n0. cancel') || '').trim();
      if (list_) {
        goal = 'lists';
        message = YS.list(goal);
        list_ != '0' && OM.newList(list_);
      }
      break;
    case 'changelist':
      var list = (prompt(YS.listChange()) || '').trim(),
        list_ = YS.validChange()[list];
      if (list_ || list == '0') {
        goal = 'lists';
        message = YS.list(goal);
        list_ && OM.changeList(list_);
      }
      break;
    case 'removelist':
      var list = (prompt(YS.listChange()) || '').trim(),
        list_ = YS.validChange()[list];
      if (list_ || list == '0') {
        goal = 'lists';
        message = YS.list(goal);
        list_ && OM.removeList(list_);
      }
      break;
    case 'exportlist':
      var list = (prompt(YS.listChange()) || '').trim(),
        list_ = YS.validChange()[list];
      if (list_ || list == '0') {
        goal = 'lists';
        message = YS.list(goal);
        list_ && OM.exportList(list_);
      }
      break;
    case 'viewlists':
      alert(YS.listViewer());
      goal = 'lists';
      message = YS.list(goal);
      break;
    case 'additem':
      var item = (prompt('new item :\n0. cancel') || '').trim();
      if (item) {
        goal = 'items';
        message = YS.list(goal);
        item != '0' && OM.addItem(item);
      }
      break;
    case 'removeitem':
      var item = (prompt(YS.itemList() + '0. back') || '').trim(),
        item_ = YS.validItem(item);
      if (item_ || item == '0') {
        goal = 'items';
        message = YS.list(goal);
        item_ && OM.removeItem(item_);
      }
      break;
    case 'viewitems':
      alert(YS.itemList());
      goal = 'items';
      message = YS.list(goal);
      break;
    case 'myID':
      alert(OM.id);
      goal = 'more';
      message = YS.list(goal);
      break;
    case 'activateOM':
      var key = prompt('Enter the key:');
      OM.key(key);
      goal = 'more';
      message = YS.list(goal);
      break;
    case 'getone':
      alert(OM.getOne());
      goal = 'menu';
      message = YS.list(goal);
      break;
    case 'getmany':
      var a=Number(prompt('number:'));
      if(a){
        alert(YS.listMany(a));
        goal = 'menu';
        message = YS.list(goal); 
      }
    break;
    case 'EnnawawiMode':
      YS.EMView();
      goal = 'menu';
      message = YS.list(goal);
    break;
    case 'about':
      alert('randOM (beta)\nby @Y.OKGs\ngithub https://github.com/yokgs');
      goal = 'more';
      message = YS.list(goal); 
    break;
  }
}
