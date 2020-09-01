/*
*导航选中效果
*C:2019.05.31
*U:2020-09-01，修复语法错误和li不直接嵌套a标签dom筛选失效问题;
*/

/*<ul id="nav" class="dh"><li class="home"><a href="">首页</a></li><li><a href="">频道1</a></li></ul>*/
addNavOn(".dh");
addNavOn(".subnav");
function addNavOn(navClass){
var $nav = $(navClass);
if(!!!$nav.length)return false;//不存在nav直接返回false
var loc = location.pathname;
var locPath = loc.substr(1,loc.lastIndexOf("/"));
$nav.each(function(j){
	$nav.find("li a").each(function(i){
		var h = $(this).attr("href");
		var t0 = h.replace("//",""),
		t1 = t0.substr(t0.indexOf("/")),
		t2 = t1.indexOf(".")>0 ? t1.substr(0,t1.indexOf(".")) : t1,
		t3 = t2.substr(1,t2.lastIndexOf("/"));//获取到href的pathname
		if( locPath.indexOf(t3)==0 ){ 
			if(locPath.length>t3.length && $(this).closest("li").hasClass("home")) return true;//详情页特殊跳过
			$(this).closest("li").addClass("con");return false; 
		}
	});
})
}