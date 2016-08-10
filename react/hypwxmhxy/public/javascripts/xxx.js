var a = [1,0,0]; //对应id
var b = ["awda", "dawd", "fafa"];  //地名
var c = ["province", "city", "area"];  //省市区字段
var d = {}; //json的对象
a.forEach(function(ele, index) {
    d[c[index]] = a[index] == 0 ? "|" : b[index] + "|" + a[index];
});
console.log(d)