import styles from './BurgerIngredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag} from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import {INGREDIENT_MODAL} from "../../services/actions/actions";
import {useDispatch, useSelector} from "react-redux";


export default function BurgerIngredient( {item, handleIngredientClick}) {
    const { ingredientsInConstructor } = useSelector(store => store);
    let [ingredientCount, setIngredientCount] = React.useState(0);
    const [{ getItem, isDrag, isDrop }, ingredientRef] = useDrag({
        type: 'ingredient',
        item: {
            item,
            id: uuidv4()
        },
        collect: monitor => ({
            getItem: monitor.getItem(),
            isDrag: monitor.isDragging(),
            isDrop: monitor.didDrop()
        })
    });

  React.useEffect(() => {

      if (isDrop && getItem.item._id === item._id && getItem.item.type === 'bun') {
        setIngredientCount(ingredientCount + 2);
      } else if (isDrop && getItem.item._id !== item._id && getItem.item.type === 'bun' && item.type === 'bun') {
        setIngredientCount(0);
      } else if (isDrop && getItem.item._id === item._id && getItem.item.type !== 'bun') {
        setIngredientCount(ingredientCount + 1);
      }
  }, [isDrop, ingredientsInConstructor]);


    return (
      <li draggable ref={ingredientRef} className={`${styles.card} mb-8`} onClick={() => { handleIngredientClick(item) }}>
          {ingredientCount > 0 && <Counter count={ingredientCount} />}
          <img alt={item.name} src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
          <span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type='primary' /></span>
          <span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
      </li>
    )
}
