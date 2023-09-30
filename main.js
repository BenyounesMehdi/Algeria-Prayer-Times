let cities = [
    "Adrar", "Alger", "Annaba", "Aïn Defla", "Aïn Témouchent", "Batna", "Biskra", "Blida", "	Bordj Badji Mokhtar",
    "	Bordj Bou Arréridj", "Bouira", "Boumerdès", "Béchar", "Béjaïa", "Béni Abbès", "Chlef", "Constantine", "Djanet", "Djelfa", "	El Bayadh",
    "El Meghaier", "El Meniaa", "El Oued", "El Tarf", "Ghardaïa", "Guelma", "Illizi", "In Guezzam", "In Salah", "Jijel", "Khenchela", "Laghouat",
    "M'sila", "Mascara", "Mila", "Mostaganem", "Médéa", "Naama", "Oran", "Ouargla", "Ouled Djellal", "Oum el Bouaghi", "Relizane", "Saïda", 
    "	Sidi Bel Abbès", "Skikda", "Souk Ahras", "Sétif", "Tamanrasset", "Tiaret", "Timimoun", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou", 
    "Tlemcen", "Touggourt", "Tébessa"
  ] ;

  for( let i = 0 ; i < cities.length ; i++ ) {
    document.getElementById("selected-city").innerHTML += `
        <option >${cities[i]}</option>
    ` ;
  }

document.getElementById("selected-city").addEventListener("change", () => {
    let mainCity = document.getElementById("selected-city").value ;
    
        document.querySelector("#city-Name").innerHTML = mainCity ;
        console.log(mainCity) ;
        getPrayersTimmes(mainCity) ;
}) ;

function getPrayersTimmes (cityName) {

    let params = {
        country : "DZ", 
        city : cityName,
        method: 3
    }

    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {

        const timings = response.data.data.timings ;
        console.log(timings) ;
        prayerTime("fajr", timings.Fajr) ;
        prayerTime("sunrise", timings.Sunrise) ;
        prayerTime("dhuhr", timings.Dhuhr) ;
        prayerTime("asr", timings.Asr) ;
        prayerTime("maghrib", timings.Maghrib) ;
        prayerTime("isha", timings.Isha) ;

        document.querySelector("#hijri-date").innerHTML = response.data.data.date.hijri.date ;
        document.querySelector("#gregorian-date").innerHTML = response.data.data.date.gregorian.date ;
    })
        .catch(function (error) {
        console.log(error);
    })
}

function prayerTime (id, time) {
    document.getElementById(id).innerHTML = time ;
}

getPrayersTimmes("Adrar") ;





    