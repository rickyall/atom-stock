'use babel';

import StockView from './stock-view';

export default {
  stockView: null,
  subscriptions: null,
  statusBarTile: null, // 底部状态栏的插件选项
  // 插件激活
  activate(state) {
    console.log('finance', 'activate');
  },
  // 这个可选的方法在编辑器窗口关闭时被执行
  deactivate() {
    if (this.statusBarTile) {
      this.statusBarTile.destroy();
    }
    this.statusBarTile = null;
  },
  consumeStatusBar(statusBar) {
    // 建立一个视图
    this.stockView = new StockView();
    this.stockView.initialize(statusBar);
    this.stockView.attach();
  }
};
