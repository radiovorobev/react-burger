import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/types';
import { FC, ReactNode } from 'react';

type TProtectedRoute = {
	anonymous: boolean;
	children: ReactNode;
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ anonymous = false, children }) => {
	const { auth } = useSelector(store => store.auth);

	interface ILocation {
		myState: string | undefined;
		from: string | undefined;
	}
	const location = useLocation();
	const myState = location.state as ILocation;
	const from = myState?.from;

	if (anonymous && auth) {
		return <Navigate to={from ? from : '/'} />
	}

	if (!anonymous && !auth) {
		return <Navigate to='/login' state={{ from: location.pathname }} replace={true} />
	}

	return <>{children}</>
}