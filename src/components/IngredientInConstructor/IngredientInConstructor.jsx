import React, { useRef } from 'react';
import {
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	MOVE_INGREDIENT
} from '../../services/actions/actions';
import { useDrag, useDrop } from 'react-dnd';
import styles from './IngredientInConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

export default function IngredientInConstructor({index, ingredient}) {

	const [ingredientCount, setIngredientCount] = React.useState(0);
	const dispatch = useDispatch();

	const moveIngredient = React.useCallback((dragIndex, hoverIndex) => {
		dispatch({ type: MOVE_INGREDIENT, dragIndex: dragIndex, hoverIndex: hoverIndex });
	}, [dispatch]);

	const [ , dragRef] = useDrag({
		type: 'item',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [ , dropRef] = useDrop({
		accept: 'item',
		hover: (item, monitor) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveIngredient(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const ref = useRef(null);
	const dragDropRef = dragRef(dropRef(ref));

	const deleteIngredientFromConstructor = React.useCallback((id) => {
		dispatch({ type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, id: id });
		setIngredientCount(ingredientCount - 1);
	}, [ingredientCount, dispatch]);

	return (
		<li className={`${styles.listItem} mb-4`} draggable ref={dragDropRef}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.item.name}
				price={ingredient.item.price}
				thumbnail={ingredient.item.image}
				handleClose={() => { deleteIngredientFromConstructor(ingredient.id) }}
			/>
		</li>
	)
}