const Index = async (req, res) => {
	console.log(req);
	res.status(200).json(req.body);
};
export default Index;
