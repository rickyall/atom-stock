'use babel';
import sinaStock from './sina-stock';
import {CompositeDisposable} from 'atom';
const subscriptions = new CompositeDisposable();

class StockView extends HTMLDivElement {
  // 初始化状态
  initialize(statusBar) {
    this.statusBar = statusBar;
    // 注册命令
    subscriptions.add(atom.commands.add('atom-workspace', {
      'stock:toggle': () => this.toggle()
    }));
    this.initElement();
  }
  // 初始化元素
  initElement() {
    this.classList.add('stock-status', 'inline-block');
    this.setAttribute('id', 'stock-status');
    this.icon = document.createElement('span');
    this.icon.classList.add('icon-graph', 'inline-block');
    this.appendChild(this.icon);
    this.finance = document.createElement('span');
    this.appendChild(this.finance);
    this.price = document.createElement('span');
  }

  // Tear down any state and detach
  destroy() {
    if (this.tile) {
      this.tile.destroy();
    }
    this.detach();
  }

  toggle() {
    this.hasParent() ? this.detach() : this.attach();
  }

  attach() {
    this.build();
    let seconds = 10;
    if (seconds > 0) {
      setInterval(() => this.build(), seconds * 1000);
    }
  }

  hasParent() {
    let has = false;
    const bar = document.getElementsByTagName('stock-status');
    if (bar != null) {
      if (bar.item(0) != null) {
        has = true;
      }
    }
    return has;
  }

  detach() {
    const bar = document.getElementsByTagName('stock-status');
    if (bar != null) {
      if (bar.item(0) != null) {
        const el = bar[0];
        const parent = el.parentNode;
        if (parent != null) {
          parent.removeChild(el);
        }
      }
    }
  }

  build() {
    sinaStock('sh000001', (result) => {
      this.price.innerHTML = result.join(',');
      this.finance.appendChild(this.price);
      this.tile = this.statusBar.addRightTile({priority: 100, item: this});
      return;
    });
  }

  getElement() {
    return this.element;
  }

}

export default document.registerElement('stock-status', {'prototype': StockView.prototype});
