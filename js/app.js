$(function(){
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/group?id=5368361,5391959,5128581,3448439,2968815,2643743,703448,524901,498817,1526273,1581130,1816670,1609350,2147714,1835848,3128832,6094817,2950158,3169070,360630,292223,1850147,3646738,7284824,3530597,264371,2761369,3571824,727011,3553478,281184,683506,108410,1880252,8133876&units=metric&appid=44db6a862fba0b067b1930da0d769e98' ,
		method: 'get' ,
		dataType: 'json',
		success: function(data) {
			var cityInfo = $.map(data.list, function(result){
				return {
					id: result.id,
					cityName: result.name,
					country: result.sys.country,
					lattitude: result.coord.lat,
					longitude: result.coord.lon,
					weather: result.weather[0].main,
					temp: result.main.temp
				};
			});
			console.log(cityInfo);
		}
	});
});