var app = angular.module('appWikiViewer',[]);
app.controller("MainFrame",['$scope','$http',function($scope,$http){
$scope.results = [];
$scope.search = function()
{
	if($scope.searchText !== '')
	{
		$scope.results = [];
		var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
		var searchQuery = $scope.searchText;
		var callback = '&callback=JSON_CALLBACK';
		var wikiPage = 'https://en.wikipedia.org/?curid=';
		$http.jsonp(api + searchQuery + callback).success(function(data)
		{
			var whatWeGot = data.query.pages;
			angular.forEach(whatWeGot, function(item,k)
			{
				$scope.results.push({title : item.title, body : item.extract, page : wikiPage+item.pageid});
			});
			
		});
	}
	console.log($scope.results);
}
	
}]);