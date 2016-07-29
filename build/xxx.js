name = "kila";

var obj = {

    name: "sila",

    getname: function() {
        setTimeout(() => {
            console.log(this.name)
        },3000)

    },



};

obj.getname();