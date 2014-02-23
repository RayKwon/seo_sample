exports.index = function(req, res){
  res.render('index', { 
    keywords: 'seo, sample, spa', 
    description: 'show the way to solve seo issue in single page application',
    title: 'Express' 
  });
};

exports.indexSpider = function(req, res){
  res.render('index_spider', { 
    keywords: 'seo, sample, spa', 
    description: 'show the way to solve seo issue in single page application',
    title: 'Express' 
  });
};