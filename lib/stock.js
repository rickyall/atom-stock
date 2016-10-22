'use babel';

import StockView from './stock-view';
import { CompositeDisposable } from 'atom';

export default {

  stockView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.stockView = new StockView(state.stockViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.stockView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stock:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.stockView.destroy();
  },

  serialize() {
    return {
      stockViewState: this.stockView.serialize()
    };
  },

  toggle() {
    console.log('Stock was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
