//import '../../../utils/dbConnect';
import ArticleModel from '../../../models/Article';
import dbConnect from '../../../lib/dbConnect';
const Article = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const articles = await ArticleModel.find({});

				res.status(200).json({ success: true, data: articles });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const article = await ArticleModel.create(req.body);
				res.status(201).json({ success: true, data: article });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
export default Article;
