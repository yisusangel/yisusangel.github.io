var app = new Vue({
  el: "#cont",
  data: {
    tasas: {
      peso:0,
      pesoCompra: 0,
      bolivar:0
    },
    valoresDolar: {
      dolar:1,
      peso:0,
      pesoCompra: 0,
      bolivar:0
    },

    tasasConversion: {
      normal:0,
      recPeso:0,
      recBolivar:0
    },
    bolivarConv: {
      recPeso:0,
      recBolivar:0
    },
    pesoConv: {
      recPeso:1,
      recBolivar:1
    }
  },

  created: function(){
    var that = this;
    function valoresBase(){
      that.tasasConversion.normal = parseFloat(Math.round(that.tasas.bolivar/that.tasas.peso * 100) / 100).toFixed(2);
      that.tasasConversion.recPeso = parseFloat(Math.round(((that.tasas.bolivar/that.tasas.peso)/1.25) * 100) / 100).toFixed(2);
      that.tasasConversion.recBolivar = parseFloat(Math.round((that.tasas.bolivar/that.tasas.peso)*1.13 * 100) / 100).toFixed(2);

      that.bolivarConv.recPeso = that.tasasConversion.recPeso;
      that.bolivarConv.recBolivar = that.tasasConversion.recBolivar;
    };

    axios.get("https://s3.amazonaws.com/dolartoday/data.json")
    .then(function (response) {
      that.tasas.bolivar = parseFloat(Math.round(response.data.USD.transferencia * 100) / 100).toFixed(2);
      that.valoresDolar.bolivar = that.tasas.bolivar;
      valoresBase();
    });

    axios.get("http://www.apilayer.net/api/live?access_key=0a722f2dcdd9b68c52dd508df4db2e73&format=1")
    .then(function (response) {
      that.tasas.peso = parseFloat(Math.round(response.data.quotes["USDCLP"] * 100) / 100).toFixed(2);
      that.tasas.pesoCompra = parseFloat(Math.round((that.tasas.peso*1.02)* 100) / 100).toFixed(2);
      that.valoresDolar.peso = that.tasas.peso;
      that.valoresDolar.pesoCompra = that.tasas.pesoCompra;
      valoresBase();
    });


  },

  methods: {
    cambiarDolarDolar:function(){
      this.valoresDolar.peso = this.valoresDolar.dolar*this.tasas.peso;
      this.valoresDolar.pesoCompra = this.valoresDolar.dolar*this.tasas.pesoCompra;
      this.valoresDolar.bolivar = this.valoresDolar.dolar*this.tasas.bolivar;
    },
    cambiarDolarPeso:function(){
      this.valoresDolar.dolar = this.valoresDolar.peso/this.tasas.peso;
      this.valoresDolar.pesoCompra = this.valoresDolar.dolar*this.tasas.pesoCompra;
      this.valoresDolar.bolivar = this.valoresDolar.dolar*this.tasas.bolivar;
    },
    cambiarDolarPesoCompra:function(){
      this.valoresDolar.dolar = this.valoresDolar.pesoCompra/this.tasas.pesoCompra;
      this.valoresDolar.bolivar = this.valoresDolar.dolar*this.tasas.bolivar;
      this.valoresDolar.peso = this.valoresDolar.dolar*this.tasas.peso;
    },
    cambiarDolarBolivar:function(){
      this.valoresDolar.dolar = this.valoresDolar.bolivar/this.tasas.bolivar;
      this.valoresDolar.pesoCompra = this.valoresDolar.dolar*this.tasas.pesoCompra;
      this.valoresDolar.peso = this.valoresDolar.dolar*this.tasas.peso;
    },

    cambiarPesoRecPeso:function(){
      this.bolivarConv.recPeso = this.tasasConversion.recPeso*this.pesoConv.recPeso;
    },
    cambiarPesoRecBolivar:function(){
      this.bolivarConv.recBolivar = this.tasasConversion.recBolivar*this.pesoConv.recBolivar;
    },

    cambiarBolivarRecPeso:function(){
      this.pesoConv.recPeso = this.bolivarConv.recPeso/this.tasasConversion.recPeso;
    },
    cambiarBolivarRecBolivar:function(){
      this.pesoConv.recBolivar = this.bolivarConv.recBolivar/this.tasasConversion.recBolivar;
    }

  },
});
