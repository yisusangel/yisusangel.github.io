var app = new Vue({
  el: "#cont",
  data: {
    tasas: [],
    tasa1: [],
    tasa2: [],
    tasavs: [],
    valor1: 1,
    valor2: 1,
    valorvs: 1
  },
  created: function(){
    var that = this;
    var tasa = {
      nombre: "Dolar",
      pais: "EEUU",
      valor: 1
    }
    that.tasas.push(tasa);
    that.tasa1 = tasa;
    that.tasavs = tasa;
    axios.get("https://s3.amazonaws.com/dolartoday/data.json")
    .then(function (response) {
      var tasa = {
        nombre: "Bolivar",
        pais: "Venezuela",
        valor: response.data.USD.transferencia
      }
      that.tasas.unshift(tasa);
      that.tasa2 = tasa;
    });
    axios.get("http://www.apilayer.net/api/live?access_key=0a722f2dcdd9b68c52dd508df4db2e73&format=1")
    .then(function (response) {
      for (var key in response.data.quotes) {
        var val = response.data.quotes[key]
        var tasa = {
          nombre: "",
          pais: "",
          valor: 0
        }
        var deseada = false;
        switch(key){
          case "USDARS":
            tasa.nombre = "Peso";
            tasa.pais = "Argentina";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDAWG":
            tasa.nombre = "Florin";
            tasa.pais = "Aruba";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDBOB":
            tasa.nombre = "Boliviano";
            tasa.pais = "Bolivia";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDBRL":
            tasa.nombre = "Real";
            tasa.pais = "Brasil";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDBTC":
            tasa.nombre = "Bitcoin";
            tasa.pais = "Bitcoin";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDCAD":
            tasa.nombre = "Dolar";
            tasa.pais = "Canada";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDCLP":
            tasa.nombre = "Peso";
            tasa.pais = "Chile";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDCOP":
            tasa.nombre = "Peso";
            tasa.pais = "Colombia";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDCRC":
            tasa.nombre = "Colon";
            tasa.pais = "Costa Rica";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDDOP":
            tasa.nombre = "Peso";
            tasa.pais = "Republica Dominicana";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDEUR":
            tasa.nombre = "Euro";
            tasa.pais = "Europa";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDGTQ":
            tasa.nombre = "Quetzal";
            tasa.pais = "Guatemala";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDJMD":
            tasa.nombre = "Dolar";
            tasa.pais = "Jamaica";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDMXN":
            tasa.nombre = "Peso";
            tasa.pais = "Mexico";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDNIO":
            tasa.nombre = "Cordoba";
            tasa.pais = "Nicaragua";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDPAB":
            tasa.nombre = "Balboa";
            tasa.pais = "Panama";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDPEN":
            tasa.nombre = "Nuevo Sol";
            tasa.pais = "Peru";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDPYG":
            tasa.nombre = "Guarani";
            tasa.pais = "Paraguay";
            tasa.valor = val;
            deseada = true;
            break;
          case "USDUYU":
            tasa.nombre = "Peso";
            tasa.pais = "Uruguay";
            tasa.valor = val;
            deseada = true;
            break;
        }
        if(deseada){
          that.tasas.push(tasa);
        }
      }
    })
  },
  methods: {
    cambiarTasa:function(){
      this.valor1 = 1;
      try{
        this.valor2 = (1/this.tasa1.valor)*this.tasa2.valor;
      }catch(err){
        this.valor2 = 1;
      }
    },
    cambiarValor1:function(){
      this.valor2 = (this.valor1/this.tasa1.valor)*this.tasa2.valor;
    },
    cambiarValor2:function(){
      this.valor1 = (this.valor2/this.tasa2.valor)*this.tasa1.valor;
    },
    voltearValores:function(){
      var auxtasa = this.tasa1;
      this.tasa1 = this.tasa2;
      this.tasa2 = auxtasa;
      var auxvalor = this.valor1;
      this.valor1 = this.valor2;
      this.valor2 = auxvalor;
    }
  },
  filters: {
    conversion:function(value,valorvs,tasavs){
      try{
        value = (valorvs/tasavs.valor)*value;
        if(value >= 1){
          value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
        }
      }catch(err){}
      return value;
    },
  }
});