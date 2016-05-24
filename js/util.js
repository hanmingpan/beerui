/**
 * 洗牌随机算法
 * @param m
 * @returns {Array}
 */
function shuffle_pick(m) //抽牌法优化牌
{
    //生成m张牌
    var arr = new Array(m);
    for (var i=0; i<m; i++) {
        arr[i] = i;
    }

    //每次抽出一张牌，放在另一堆。把最后一张未抽的牌放在空位子上。
    var arr2 = [];
    for (var i = m; i > 0;) {
        var rnd = Math.floor(Math.random()*i);
        arr2.push(arr[rnd]);
        arr[rnd] = arr[--i];
    }
    return arr2;
}