var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var label = document.getElementById('label');



//マス作成
let L = 300;
let W = 100;

ctx.strokeRect(0, 0, L, L);  

ctx.beginPath();
ctx.moveTo(W, 0);   
ctx.lineTo(W, L);

ctx.moveTo(2*W, 0);   
ctx.lineTo(2*W, L);

ctx.moveTo(0, W);   
ctx.lineTo(L, W);

ctx.moveTo(0, W);   
ctx.lineTo(L, W);
ctx.stroke();

ctx.moveTo(0, 2*W);  
ctx.lineTo(L, 2*W);
ctx.stroke();


//インデックスを受け取ってばつをかく
function draw_batsu(a) {  
    var ix = a % 3;
    var iy = Math.floor(a/3);
    //console.log(ix, iy);
    ctx.beginPath();
    ctx.moveTo(ix*W, iy*W);
    ctx.lineTo(ix*W+W, iy*W+W);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ix*W+W, iy*W);
    ctx.lineTo(ix*W, iy*W+W);
    ctx.stroke();
}


var list_0 = [0,0,0,0,0,0,0,0,0];
var step = 0;

// マウスイベント登録

//ページをリロード
function Onbutton() {
    document.location.reload();
}


//メインの関数
function drawSetup(initial_list) {   //関数ないでは上書きされていく
    canvas.onmousedown = function(e) {   //マウスダウンするたびに関数を呼び出す
        var r = canvas.getBoundingClientRect();
        prevX = e.clientX - r.left;
        prevY = e.clientY - r.top;
        mouseDown = true;
        var ix = Math.floor(prevX/W);      //商を取得
        var iy = Math.floor(prevY/W);
        initial_list[ix + 3*iy] = 1;       //initial_listに1を上書き
        ctx.beginPath();
        ctx.arc(ix*W+W/2, iy*W+W/2, W/2, 0, Math.PI*2.0);   //丸をかく
        ctx.stroke();
        index = three_eyes(initial_list);
        initial_list[index] = 2;     //initial_listに2を上書き
        draw_batsu(index);     //最適な場所にバツをかく
        step = step + 1;
        if (win(initial_list) !== 0) {       //途中で試合終了
            label.innerHTML = win1(initial_list);
        }
        if (step == 5) {      //最後の丸
            label.innerHTML = win1(initial_list);
        }
    }
}

drawSetup(list_0);


//モンテカルロ木探索


//win関数
function win(input_list) {
    if ((input_list[0] == 1 && input_list[1] == 1 && input_list[2] == 1) ||  
        (input_list[3] == 1 && input_list[4] == 1 && input_list[5] == 1) ||
        (input_list[6] == 1 && input_list[7] == 1 && input_list[8] == 1) ||
        (input_list[0] == 1 && input_list[3] == 1 && input_list[6] == 1) ||
        (input_list[1] == 1 && input_list[4] == 1 && input_list[7] == 1) ||
        (input_list[2] == 1 && input_list[5] == 1 && input_list[8] == 1) ||
        (input_list[0] == 1 && input_list[4] == 1 && input_list[8] == 1) ||
        (input_list[2] == 1 && input_list[4] == 1 && input_list[6] == 1)) {
        return 1;
    } 
    if ((input_list[0] == 2 && input_list[1] == 2 && input_list[2] == 2) || 
        (input_list[3] == 2 && input_list[4] == 2 && input_list[5] == 2) ||
        (input_list[6] == 2 && input_list[7] == 2 && input_list[8] == 2) ||
        (input_list[0] == 2 && input_list[3] == 2 && input_list[6] == 2) ||
        (input_list[1] == 2 && input_list[4] == 2 && input_list[7] == 2) ||
        (input_list[2] == 2 && input_list[5] == 2 && input_list[8] == 2) ||
        (input_list[0] == 2 && input_list[4] == 2 && input_list[8] == 2) ||
        (input_list[2] == 2 && input_list[4] == 2 && input_list[6] == 2)) {
        return -1;
    } 
    else {
        return 0;
    }
}


function win1(input_list) {
    if ((input_list[0] == 1 && input_list[1] == 1 && input_list[2] == 1) ||  
        (input_list[3] == 1 && input_list[4] == 1 && input_list[5] == 1) ||
        (input_list[6] == 1 && input_list[7] == 1 && input_list[8] == 1) ||
        (input_list[0] == 1 && input_list[3] == 1 && input_list[6] == 1) ||
        (input_list[1] == 1 && input_list[4] == 1 && input_list[7] == 1) ||
        (input_list[2] == 1 && input_list[5] == 1 && input_list[8] == 1) ||
        (input_list[0] == 1 && input_list[4] == 1 && input_list[8] == 1) ||
        (input_list[2] == 1 && input_list[4] == 1 && input_list[6] == 1)) {
        return "勝ち";
    } 
    if ((input_list[0] == 2 && input_list[1] == 2 && input_list[2] == 2) || 
        (input_list[3] == 2 && input_list[4] == 2 && input_list[5] == 2) ||
        (input_list[6] == 2 && input_list[7] == 2 && input_list[8] == 2) ||
        (input_list[0] == 2 && input_list[3] == 2 && input_list[6] == 2) ||
        (input_list[1] == 2 && input_list[4] == 2 && input_list[7] == 2) ||
        (input_list[2] == 2 && input_list[5] == 2 && input_list[8] == 2) ||
        (input_list[0] == 2 && input_list[4] == 2 && input_list[8] == 2) ||
        (input_list[2] == 2 && input_list[4] == 2 && input_list[6] == 2)) {
        return "負け";
    } 
    else {
        return "引き分け";
    }
}


//要素0のインデックス抽出
function func(input_list){
    var r = [];
    for (let i = 0; i < input_list.length; i++){
        if(input_list[i] == 0){
            r.push(i);
        }
    }
    return r;
}


//表の作成関数
function show(a) {
    console.log(""+a[0]+a[1]+a[2]);
    console.log(""+a[3]+a[4]+a[5]);
    console.log(""+a[6]+a[7]+a[8]);
}
//show(list_0);


//要素0の数を数える関数
function count(initial_list) {
    var a = 0;
    for (let i = 0; i < 9; i++) {
        if (initial_list[i] == 0) {
            a += 1;
        }
    } 
    return a;
}

var List = [0,1,2,0,1,0,0,0,0]   //console用
//再帰関数をかく
function saiki(input_list2) {
    var x = count(input_list2); 
    if (x == 0) { 
        //show(input_list2);                       //終端条件:試合終了(引き分け含む)
        return win(input_list2);
    } 
    if (win(input_list2) !== 0) {              //終端条件:試合終了(引き分け含まず)
        //show(input_list2);
        return win(input_list2);
    }
    i = func(input_list2)
    var y = i[Math.floor(Math.random()*i.length)];     //再帰:決着がついていない
    input_list2[y] = 2 - (x % 2);      
    return saiki(input_list2);
}


//100回分抽出
function evaluate(initial_list) {
    var s = 0;
    var N = 100;
    for (let i = 0; i < 100; i++) {
        var a = Array.from(initial_list);
        s += saiki(a);
    }             
    return s/N;
}


//評価関数(今の状態で、最適な場所のインデックスを返す)
function three_eyes(initial_list) {
    var lists1 = [];
    var lists2 = [];
    for (var i of func(initial_list)) {
        var a = Array.from(initial_list);
        a[i] = 2;
        lists1.push(evaluate(a));
        lists2.push(i);
    }
    y = lists1.indexOf(Math.min.apply(null, lists1));
    z = lists2[y];
    console.log(lists1);
    console.log(lists2);
    console.log(z);
    return z;
}

//console用
show(List);
three_eyes(List);


