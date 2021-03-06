$(function(){
	var cityTemplate = Handlebars.compile($('#city-template').html());
	var photoTemplate = Handlebars.compile($('#photo-template').html());
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/group?id=5368361,5391959,5128581,3448439,2968815,2643743,703448,524901,498817,1526273,1581130,1816670,1609350,2147714,1835848,3128832,6094817,2950158,3169070,360630,292223,1850147,3646738,7284824,3530597,264371,2761369,3571824,727011,3553478,281184,683506,108410,1880252,8133876,5037649,2015306&units=metric&appid=f38b50bfb853fd8b0ad343b91357f364' ,
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
					temp: result.main.temp.toFixed()
				};
			});
			function weatherHandler(weather){
				$('#weather').fadeOut(500);
				$('#cities').fadeIn(500);
				var filteredCities= _.filter(cityInfo, function(city){
					return city.weather == weather;
				});
				if (filteredCities.length === 0) {
					$(".alert-box").fadeIn(500);
					$('#weather').fadeIn();
				}
				$.each(filteredCities.slice(0, 7), function(index, city){
					var city = this;
					$('#cities').append(cityTemplate(city));
					var params = {
						"q": city.cityName + " " + city.weather + " weather",
						"count": "24",
						"offset": "0",
						"mkt": "en-us"
					};

					$.ajax({
						url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
						beforeSend: function(xhrObj){
							xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{c23cfb32ff35416083d4afc22518a3ba");
            			},
						type: "GET",
						format: "jsonp",
						data: "{body}"
					})
					.done(function(data) {
						console.log(data);
						var photoInfo = $.map(data.value, function(result){
							return {
								city: city.id,
								url: result.contentUrl,
								caption: result.name
							};
						});

						$.each(photoInfo, function(index, photo){
							$('.city-'+ photo.city).append(photoTemplate(photo));
						});

					})
					.fail(function() {
						//Do nothing
					});
				});
			}
			$('.clear').on('click', function(){
				weatherHandler('Clear');
			});
			$('.mist').on('click', function(){
				weatherHandler('Mist');
			});
			$('.clouds').on('click', function(){
				weatherHandler('Clouds');
			});
			$('.rain').on('click', function(){
				weatherHandler('Rain');
			});
			$('.thunderstorm').on('click', function(){
				weatherHandler('Thunderstorm');
			});
			$('.snow').on('click', function(){
				weatherHandler('Snow');
			});
			$('.haze').on('click', function(){
				weatherHandler('Haze');
			});
			$('.sand').on('click', function(){
				weatherHandler('Sand');
			});
		}
	});
				$(".what").click(function(){
					$(".overlay").fadeIn(500);
				});

				$("button.closeModal").click(function(){
					$(".overlay").fadeOut(500);
					$(".alert-box").fadeOut(500);
				});

				$('a.reset, a.navbar-brand').click(function(){
					location.reload();
				});

				var $container = jQuery('.grid');
				$container.masonry({
					columnWidth: 200,
					itemSelector: '.photo'
				});
			});
