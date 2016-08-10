module.exports = function() {
    var nowtime = new Date();
    var year = nowtime.getFullYear();
    var month = /^\d$/.test(nowtime.getMonth()) ? "0" + nowtime.getMonth() : nowtime.getMonth();
    var day = /^\d$/.test(nowtime.getDate()) ? "0" + nowtime.getDate() : nowtime.getDate();
    var hour = /^\d$/.test(nowtime.getHours()) ? "0" + nowtime.getHours() : nowtime.getHours();
    var minutes = /^\d$/.test(nowtime.getMinutes()) ? "0" + nowtime.getMinutes() : nowtime.getMinutes();
    var seconds = /^\d$/.test(nowtime.getSeconds()) ? "0" + nowtime.getSeconds() : nowtime.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}