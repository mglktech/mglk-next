const Auth = async (req, res) => {
	//console.log(req);
	res.status(200).json(req.headers.cookie ? req.headers.cookie : null);
};
export default Auth;
