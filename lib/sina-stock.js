'use babel';
import fetch from 'node-fetch';
// 访问新浪的股票接口
function sinaStock(code, callback) {
  let url = 'http://hq.sinajs.cn/list=' + code;
  fetch(url).then(function(res) {
    return res.text();
  }).then(function(body) {
    let data = body.split('=')[1].substring(1).split(',');
    let open = data[1];
    let current = data[3];
    let diff = (current - open) / open;
    callback([code, current, diff]);// 返回当前价和增幅
  });
}

export default sinaStock;
