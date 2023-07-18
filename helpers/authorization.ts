import jwt, { JwtPayload } from 'jsonwebtoken';

const checkAuthorization = (req: Request) => {
	const authHeader = req.headers.get('authorization');
	if (!authHeader && !authHeader?.startsWith('Bearer ')) {
		return false;
	}
	const token = authHeader.split('Bearer ')[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
	return decoded;
};

export default checkAuthorization;
