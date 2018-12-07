/**
 * canvas_init 畫布初始化
 *
 * @return void
 */
function canvas_init(id , debug) {
    // const canvas = document.querySelector('#draw');
    const canvas_id  = id ;
    const canvas = document.getElementById(canvas_id);
    // could be 3d, if you want to make a video game
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //線條樣式
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#00BBFF';
    //線條樣式
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
      // ------------------PC版本
    function draw(e) {
        // stop the function if they are not mouse down
        if (!isDrawing) return;
        //listen for mouse move event
        // console.log(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
        
        if(debug)
        {
            // console.log('lastX: ' +  e.offsetX ) ;
            // console.log('lastY: ' +  e.offsetY ) ;
            var _x  =  'lastX: ' +  e.offsetX ;
            var _y  =  'lastY: ' + e.offsetY ;
            wirte_x_y( _x , _y );
        }
        
      
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    // ------------------PC版本
    // ------------------手機版本
    var lastPt = new Object(); 
    canvas.addEventListener("touchmove", draw2, false);
    canvas.addEventListener("touchend", end, false);

    function draw2(e) {
        e.preventDefault();
        //Iterate over all touches
        for (var i = 0; i < e.touches.length; i++) {
            var id = e.touches[i].identifier;
            if (lastPt[id]) {
                ctx.beginPath();
                ctx.moveTo(lastPt[id].x, lastPt[id].y);
                ctx.lineTo(e.touches[i].pageX, e.touches[i].pageY); 
                ctx.strokeStyle = '#00BBFF';
                ctx.stroke();
            }
            // Store last point
            lastPt[id] = {
                x: e.touches[i].pageX,
                y: e.touches[i].pageY
            };
            
            if(debug)
            {
                //console.log('lastX: ' +  e.touches[i].pageX ) ;
                //console.log('lastY: ' +  e.touches[i].pageY ) ;  
                var _x  =  'lastX: ' +  e.touches[i].pageX ;
                var _y  =  'lastY: ' +  e.touches[i].pageY
                wirte_x_y( _x , _y );
            }
            
        }
    }

    function end(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var id = e.changedTouches[i].identifier;
            // Terminate this touch
            delete lastPt[id];
        }
    }
    // ------------------手機版本
}

/**
 * canvas_init 畫布清空
 *
 * @return void
 */
function clearCanvas(id) {
    var c = document.getElementById(id);
    var cxt = c.getContext("2d");

    cxt.fillStyle = "#FFFFFF";
    cxt.beginPath();
    cxt.fillRect(0, 0, c.width, c.height);
    cxt.closePath();
}
/**
 * 顯示座標
 *
 * @return void
 */
function wirte_x_y( x , y )
{
    // alert(1564);
    var _x=$("#x").html(x);
    var _y=$("#y").html(y);
}


/**
* save
*
* id = 畫布ID
*
* @return void
*/
function saveCanvas(id)
{
	//将canvas内容保存为文件并下载
	// var canvas = document.getElementById("draw");	
	var canvas = document.getElementById(id);
	var dataURL = canvas.toDataURL("image/png");

}



