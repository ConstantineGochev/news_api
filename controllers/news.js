import NewsPost from '.././models/news_post'

export default class NewsController {
	static get_all(req, res, next) {
		NewsPost.find({}, function(err, news) {
			if(err) {
				throw new Error('Server error..')
			}
			console.log(news)
		})
		res.json(news)
	}
	static add(req, res, next) {

	}
	static sort_by_date(req, res, next) {
				const {order} = req.query
				console.log(order)
				if(!order) {
					return res.sendStatus(400)
				}
				NewsPost.find({}).sort({date:order}).exec(function(err, docs) {
					if(err) console.log(err)
					return res.status(200).json(docs)
				})
	}
	static filter_by_date(req, res, next) {
		    const {start_date, end_date} = req.query
				console.log(start_date)
				console.log(end_date)
				NewsPost.aggregate([
					{
						$match: {
							date: {
								'$lte': new Date(end_date),
								'$gte': new Date(start_date)
							}
						}
					}
				]).exec(function(err, docs) {
					if(err) {
						console.log(err)
					}
					console.log(docs)
					res.status(200).json(docs)
				})
	}
}
