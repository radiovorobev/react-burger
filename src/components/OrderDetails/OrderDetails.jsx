import successIcon from '../../images/success.svg';

export default function OrderDetails() {
	return (
		<>
			<h2 className={`text text_type_digits-large mt-30 mb-8`}>077388</h2>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img src={successIcon} alt='иконка' className='mb-15'></img>
			<p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
		</>
	)
}