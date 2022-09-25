import successIcon from '../../images/success.svg';
import React, {FC} from 'react';
import { useSelector } from '../../utils/types';

export const OrderDetails: FC = () => {
	const { order } = useSelector(store => store.inConstructor);
	return (
		<>
			<h2 className={`text text_type_digits-large mt-30 mb-8`}>{order}</h2>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img alt='Заказ создан!' src={successIcon} className='mb-15'></img>
			<p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
		</>
	)
}