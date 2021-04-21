var countries = [];
function loadContries() {
    setLoading(true);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://restcountries.eu/rest/v2/all', false );
    xmlHttp.send( null );
    countries = JSON.parse(xmlHttp.response);
    setLoading(false);
}

function searchCountry(e) {
    var parent = document.getElementById('autoComplete');
    parent.innerHTML = '';
    if(e.value.length > 1){
        var count = 0;
        for (let i = 0; i < countries.length; i++) {
            const c = countries[i];
            if(c.name.toLowerCase().indexOf(e.value.toLowerCase()) >= 0) {
                var child = document.createElement('span');
                child.innerHTML = c.name;
                child.className = 'autoCompleteValue';
                child.addEventListener("click", function(){onClickCountry(c)}, false);
                parent.appendChild(child);
                count++;
            }
            if(count > 10) {
                break;
            }
        }
    }
}

function onClickCountry(country) {
    document.getElementById('selectedCountry').removeAttribute('style');
    document.getElementById('autoComplete').innerHTML = '';
    document.getElementById('searchBar').value = '';
    document.getElementById('countryName').innerHTML = country.name;
    document.getElementById('ogCountryName').innerHTML = 'Native Name: '+country.nativeName;
    document.getElementById('capital').innerHTML = '<b>Capital:</b> '+country.capital;
    document.getElementById('flag').src = country.flag;
    document.getElementById('region').innerHTML = '<b>Region:</b> '+country.region;
    getBorders(country.borders);
    getLanguages(country.languages);
    getCurrencies(country.currencies);
}

function getBorders(b) {
    var parent = document.getElementById('borders');
    parent.innerHTML = '';
    if(b.length){
        b.forEach(function(border,i) {
            var foundCountry = countries.find(function(c) {
                if(c.alpha3Code === border) {
                    return c;
                }
            });
            var child = document.createElement('p');
            child.innerHTML = foundCountry.name;
            child.className = 'neighborValue';
            child.addEventListener("click", function(){onClickCountry(foundCountry)}, false);
            parent.appendChild(child);
        })
    } else {
        var child = document.createElement('p');
        child.innerHTML = 'The country has no neighbor Countries';
        parent.appendChild(child);
    }
}

function getLanguages(l) {
    var langText = '';
    l.forEach(function(lang, i) {
        langText += lang.name+' ('+lang.nativeName+')'
        langText = l.length-1 === i ? langText : langText+'<br/>';
    })
    document.getElementById('lang').innerHTML = langText;
}

function getCurrencies(c) {
    var curText = '';
    c.forEach(function(currency, i) {
        curText += currency.name+' ('+currency.symbol+')'
        curText = c.length-1 === i ? curText : curText+'<br/>';
    })
    document.getElementById('currency').innerHTML = curText;
    

}



function setLoading(loading) {
    var elems = document.querySelectorAll('#searchBar, #selectedCountry, #loadingCont');
    elems.forEach(function(e) {
        if(loading) {
            e.classList.add('isLoading');
        } else {
            e.classList.remove('isLoading');
        }
    })
}