$(function () {
    let success_msg = document.querySelector('.msg');
    let ans_pic = document.querySelector('.ans_pic');
    let ans_btn = document.querySelector('#show_ans');
    let ifshow = false;
    //將位置轉成座標的換算表
    var posConv = {};
    //填入25張圖
    for (var i = 0; i < 25; i++) {
        $("#puzzle_box").append("<div class='PicCell' id='Pic" + i + "'><img src='https://picsum.photos/480/480/?random=1' /></div>");
        var row = parseInt(i / 5);
        var col = i % 5;
        $("#Pic" + i + " img").css("margin-left", col * -96 + 1).css("margin-top", row * -96 + 1);
        //第i個換成第row列第col行
        posConv[i] = { row: row, col: col };
    }
    $("#Pic0 img").remove();//移除左上
    function getNearPos(i) {
        var pool = [];
        var row = posConv[i].row, col = posConv[i].col;
        //toCheck用來放入待比對的對象
        if (row > 0) //上
            pool.push(i - 5);
        if (row < 5) //下
            pool.push(i + 5);
        if (col > 0) //左
            pool.push(i - 1);
        if (col < 5) //右
            pool.push(i + 1);
        return pool;
    }

    //點選動作
    $(".PicCell").click(function () {
        //找尋上下左右有沒有Pic0，有則可以與它交換位置
        //先找出元素是25個中第幾個
        var cells = $("#puzzle_box div");
        var i = cells.index(this);
        var toCheck = getNearPos(i);
        while (toCheck.length > 0) {
            var j = toCheck.pop();
            if (cells.eq(j).attr("id") == "Pic0") //為空白格，交換位子
            {
                //排序，必要時對調，讓i < j
                if (i > j) { var k = j; j = i; i = k; }
                var ahead = cells.eq(i);
                var behind = cells.eq(j);
                var behindPrev = behind.prev();
                //左右對調
                if (Math.abs(i - j) == 1)
                    behind.after(ahead);
                else //上下對調
                {
                    ahead.after(behind);
                    behindPrev.after(ahead);
                }
                break;
            }
        }
        let count = 0;
        let success = true;
        for (item of cells) {
            if (item["id"] == `Pic${count}`) {
                count++;
            }
            else {
                success = false;
                success_msg.innerHTML = '';
                break;
            }
        }
        if (success) {
            success_msg.innerHTML = '遊戲成功';
        }
    });
    $("#start").click(function () {
        for (var i = 0; i < 500; i++) {
            var cells = $("#puzzle_box div");
            //找出空格所在位置，並取得其相鄰圖塊
            var toMove = getNearPos(cells.index($("#Pic0")[0]));
            cells.eq(toMove[ //由空格的相鄰圖塊擇一挪動
                parseInt(Math.random() * toMove.length)
            ]).click();
        }
    });

    $('#show_ans').click(function () {
        ifshow = !ifshow;
        if (ifshow) {
            $(ans_pic).css('display', 'flex');
        }
        else {
            $(ans_pic).css('display', 'none');
        }
    });
});
