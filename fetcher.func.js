// * * fetch one or many things at once 

var fetcher={
	
	callUrl: 'index.php'
	, methods: {}
	
	,
	init: function ()
	{
		fetcher.doReset();
	}
	
	,
	doReset: function() // run on init too
	{
		fetcher.fetch=[]; // array
		fetcher.data={}; // object
	}
	
	,
	addGet: function(key)
	{
		// add something to get (remove first)
		if (fetcher.fetch.indexOf(key)>-1) fetcher.fetch.splice(fetcher.fetch.indexOf(key),1);
		fetcher.fetch.push(key);
	}
	
	,
	addData: function(key, value)
	{
		// replace a data value
		delete fetcher.data[key];
		fetcher.data[key]=value;
	}
	
	,
	addMethod: function (name, func)
	{
		fetcher.methods[name]=func;
	}
	
	,
	loadAndRun: function ()
	{
		// using the variables given load one or more things, sent back as json
		fetcher.addData('get', fetcher.fetch);
		fetcher.addData('ajax', 1);
		
		$.ajax({
			url: fetcher.callUrl
			, dataType: 'JSON'
			, type: 'POST'
			, data: fetcher.data
			, success: function(data){
				fetcher.run(data); //run
			}
		});
	}
	
	, 
	run: function (data)
	{
		// from the data loaded arbitrarily run methods 
		$.each(data, function(k,o){
			if (fetcher.methodExists(k))
			{
				fetcher.methods[k](data[k]);
			}
		});
	}
	
	,
	methodExists: function (name)
	{
		return (typeof fetcher.methods[name]=='function'? true : false);
	}
	
}

