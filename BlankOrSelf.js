/*解析URL*/
function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  // var a = new URL(url);
  return {
    source: url,
    protocol: a.protocol=="" ? location.protocol.replace(':', '') : a.protocol.replace(':', ''), 
    host: a.hostname=="" ? location.hostname : a.hostname,
    port: a.port=="" ? location.port : a.port,
    query: a.search,
    params: (function() {
      var params = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          p;
      for (var i = 0; i < len; i++) {
        if (seg[i]) {
           p = seg[i].split('=');
           params[p[0]] = p[1];   
        }
      }
      return params;
   })(),
   hash: a.hash.replace('#', ''),
   path: a.pathname.replace(/^([^\/])/, '/$1')
  };
}
/*判断是否应该新窗口打开*/
function isBlank(href){
	if ( href==undefined || href=="" ) return false; 
	var h = parseURL(href);
	var _t1 = /\/\d{1,2}\/\d+\.(shtml|html)$/.test( h.path ),
		_t2 = h.host != location.host;
	return _t1 || _t2;
}
/*执行a标签遍历*/
window.jQuery && $("a").each(function(i){
    if( $(this).hasClass("nail-link") ) return true;
    var _a_href = $(this).attr("href") || $(this).attr("_href");
    if (isBlank(_a_href)) { $(this).attr("target","_blank");$(this).attr("rel","noopener noreferrer"); } else { $(this).attr("target","_self");}
});