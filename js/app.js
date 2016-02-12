$(function(){
	var cityTemplate = Handlebars.compile($('#city-template').html());
	var photoTemplate = Handlebars.compile($('#photo-template').html());
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/group?id=5368361,5391959,5128581&units=metric&appid=44db6a862fba0b067b1930da0d769e98' ,
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
			
			$.each(cityInfo, function(index, city){
				$('#cities').append(cityTemplate(city));
				$.ajax({
					url:'https://api.instagram.com/v1/media/search?lat=' + city.lattitude + '&lng='+city.longitude+ '&client_id=d49da08a520f47cbb6e7618f077f33ef',
					method: 'get',
					dataType: 'jsonp',
					context: city,
					success: function (data) {
						var city =this;
						var photoInfo = $.map(data.data, function(result){
							return {
								city: city.id,
								username: result.user.username,
								url: result.images.low_resolution.url,
								caption: result.caption ? result.caption.text : ''
							}
						})
						console.log(photoInfo);
						$.each(photoInfo, function(index, photo){
							$('.city-'+ photo.city).append(photoTemplate(photo));
						})
					}
				})
			})
			console.log(cityInfo);
		}
	});
});

//Clear,Mist,Clouds,Rain,Thunderstorm,Snow,Haze,Fog
//,3448439,2968815,2643743,703448,524901,498817,1526273,1581130,1816670,1609350,2147714,1835848,3128832,6094817,2950158,3169070,360630,292223,1850147,3646738,7284824,3530597,264371,2761369,3571824,727011,3553478,281184,683506,108410,1880252,8133876