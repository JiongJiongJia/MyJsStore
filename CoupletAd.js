function CoupletAdPos(leftAdId,rightAdId,mainClass){
	leftAdId = leftAdId==undefined?"AdLeft":leftAdId,rightAdId = rightAdId==undefined?"AdRight":rightAdId,mainClass = mainClass==undefined?"main":mainClass;
	/*css初始位置是相对Window左0上30%，默认隐藏*/
	var $CoupletLeft = $("#"+leftAdId),
		$CoupletRight = $("#"+rightAdId),
		$Main = $("."+mainClass);
    
	var salt = 10/*px*/,
         adLeftWidth = $CoupletLeft.width() + salt,
         adRightWidth = $CoupletRight.width() + salt,
		barWidth = ( $(window).width() - $Main.width() ) / 2,
         WindowHeight = $(window).height();
    
	var	adLeft = barWidth > adLeftWidth ? ( barWidth - adLeftWidth ) : 0,
		adRight = barWidth > adRightWidth ? ( barWidth - adRightWidth ) : 0,
        _topLeft = WindowHeight - $CoupletLeft.height(),
        _topRight = WindowHeight - $CoupletRight.height(),
		adLeftTop = _topLeft>0 ? ( _topLeft / 2 ) : 0,
		adRightTop = _topRight>0 ? ( _topRight / 2 ) : 0;
    
    
	$CoupletLeft.css({top:adLeftTop+"px"}), $CoupletRight.css({top:adRightTop+"px"});
	$CoupletLeft.show(), $CoupletRight.show();
	$CoupletLeft.animate({left:adLeft+"px"},"slow"),$CoupletRight.animate({right:adLeft+"px"},"slow");
	return true;
}
function closeAd(e){
	var src = e.target || window.event.srcElement;
	$(src).parent().hide();
}