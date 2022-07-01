import React, {useRef} from "react";
import {
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	MOVE_INGREDIENT
} from "../../services/actions/actions";
import {useDrag, useDrop} from "react-dnd";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";


export default function IngredientInConstructor({index, ingredient}) {
	const [ingredientCount, setIngredientCount] = React.useState(0);
	const dispatch = useDispatch();
	//DnD


	const moveIngredient = React.useCallback((dragIndex, dropIndex) => {
		dispatch({ type: MOVE_INGREDIENT, dragIndex: dragIndex, dropIndex: dropIndex });
	}, [dispatch]);

	const [{ isDragging }, dragRef] = useDrag({
		type: 'item',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})


	// useDrop - the list item is also a drop area
	const [,dropRef] = useDrop({
		accept: 'item',
		hover: (item, monitor) => {
			const dragIndex = item.index
			const hoverIndex = index
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

			// if dragging down, continue only when hover is smaller than middle Y
			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
			// if dragging up, continue only when hover is bigger than middle Y
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

			moveIngredient(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	// Join the 2 refs together into one (both draggable and can be dropped on)
	const ref = useRef(null)
	const dragDropRef = dragRef(dropRef(ref))

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
