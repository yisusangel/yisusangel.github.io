

var app = new Vue({
  el: "#cont",
  data: {
    appName: "Growler",
    appImg: "https://pbs.twimg.com/profile_images/378800000361562639/e45b0057a3b71f7a37225178ca5734c2.png",
    appStyle: {
      color: "#0000ff",
      fontFamily: "Verdana",
      margin:10
    },
    bebidas: {
      Ron: "ron",
      Vodka: "vodka",
      Wisky: "wisky",
      Cerveza: "cerveza"
    },
    cosas: ["arroz","chivo","zapato","perro","pixa"],
    colorH3: true,
    textoVisible:false,
    texto: "",
    selectOption: "",
    monedas: [],
  },
  created: function(){
    var that = this;
    axios.get("http://www.apilayer.net/api/live?access_key=0a722f2dcdd9b68c52dd508df4db2e73&format=1")
    .then(function (response) {
      that.monedas = response.data.quotes;
    })
  },
  watch: {
    cosas:function(){
      if(this.cosas.length < 6){
        this.cosas.unshift("borrao");
      }
    }
  },
  methods: {
    sacaAlert:function(aux){
      alert(aux+" "+this.texto);
      this.textoVisible = true;
    },
    entroMouse:function(){
      this.colorH3 = this.colorH3 ? false : true;
      this.cosas.shift();
    },
    clickDerecho:function(event){
      alert("le diste al otro click MALOTEE");
    }
  },
  computed: {
    cosasInversas:function(){
      return this.cosas.sort().reverse();
    }
  },
  filters: {
    filtroPavo:function(value){
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return value;
    },
    filtroFeo:function(value){
      return value+" frito";
    }
  }
});
