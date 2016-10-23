'use babel';
import fetch from 'node-fetch';
// 访问新浪的股票接口
function sinaStock(codes, callback) {
  let url = 'http://hq.sinajs.cn/list=' + codes;
  fetch(url).then(function(res) {
    return res.text();
  }).then(function(body) {
    console.log(body);
  });
}

export default sinaStock;
