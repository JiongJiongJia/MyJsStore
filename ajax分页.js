/*
 * parames
 * wrapSelector:列表的wraper,用于插入分页条
 * apiPathName:api地址
 * isPagebar:是否显示分页条，默认true
 */
function Pager(wrapSelector,apiPathName,isPagebar){
			this.pageNo = 1,
			this.isHasNextPage = true,
			this.isLocked = false,
			this.isPagebar = isPagebar ? isPagebar : true,
			this.init = function(){
				//add-pagebar 
				var insObj = this;
				this.isPagebar && $("<span>加载更多</span>").appendTo($(wrapSelector)).wrap("<div class='pagebar-item'></div>").show() && $(wrapSelector).delegate(".pagebar-item","click",function(){
					insObj.getPage(this);
				});
			},
			this.getPage = function(domObj) {
				if(!this.isHasNextPage || this.isLocked) return;
				this.isLocked = true;
				var apiUrl = location.protocol + '//' + location.hostname + (apiPathName === undefined ? location.pathname : apiPathName) + 'dyindex_' + parseInt(this.pageNo+1) + '.shtml';
				var currPager =  this;
				$.ajax({
					url:apiUrl,
					type:"get",
					cache:false,
					dataType:"html",
					success:function(data){
						$(domObj).before(data);
						currPager.pageNo += 1;
					},
					statusCode:{404:function(){
						currPager.isHasNextPage = false;
						$(domObj).text("已无更多数据");
						$(wrapSelector).undelegate(".pagebar-item","click")
					}},
					error:function(jqxhr,textStatus,error){
						$(domObj).text("发生错误，请刷新重试");
						var err = textStatus + ", " + error;
						console.log( "Request Failed: " + err );
					},
					complete: function(XMLHttpRequest, textStatus){
						currPager.isLocked = false;
					}
				});
			}
}

