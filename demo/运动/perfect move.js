var timer = null;
	
function startMove(obj,json,fn)
{
     clearInterval(obj.timer);
     obj.timer = setInterval(function(){
        var bStop = true;  //这一次运动就结束了----所有的值都到达了
        for(var attr in json)
        {
            //取当前值
            var iCur = 0;
            if(attr == 'opacity'){
            iCur = parseInt(parseFloat(getStyle(obj,attr))*100);//用parseInt解决小数问题
            }else{
            iCur = parseInt(getStyle(obj,attr)); 
            } 
            //算速度
            var speed = (json[attr] - iCur)/15;
           	speed = speed>0?Math.ceil(speed):Math.floor(speed);
            //检测停止
            if(iCur != json[attr])  //说明并不是所有的值到了目标点
            {
               bStop = false;
            }
           	if(attr == 'opacity'){
              obj.style.filter = 'alpha(opacity:'+(iCur+speed)+')';
              obj.style.opacity = (iCur+speed)/100;
            }else{
              obj.style[attr]= iCur + speed + 'px';
            }
        }
        if(bStop)
        {
           	clearInterval(obj.timer);
            if(fn()){
              fn();
            }
        }
     },30);           
}

function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}