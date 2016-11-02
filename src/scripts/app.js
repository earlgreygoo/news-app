import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from "backbone"

var app = function() {

// MODEL
	var ArticleCollection = Backbone.Collection.extend({
		url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
		_key: "a30a58a6e722476eb77532b42ca43c9b",
		parse: function(rawApiResponse){
			var parsedResponse = rawApiResponse.response.docs
			return parsedResponse
		}
	})

//VIEW


// CONTROLLER
	var Controller = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"search/:term": "handleSearch",
			"detail/:id": "handleDetail",
			"*default": "handleDefault"
		},
		handleHome: function(){
			var articleCollection = new ArticleCollection()
			var promise = articleCollection.fetch({
				data: {
					"api-key": articleCollection._key
				}
			})

			promise.then(function(){
				console.log(articleCollection)
			})
		},
		handleSearch: function(term){
			console.log(term)
		},
		handleDetail: function(id){
			console.log(id)
		},
		handleDefault: function(){
			location.hash = "home"
		},
		initialize: function(){
			Backbone.history.start()
		}
	})

	var controller = new Controller()
}

app()