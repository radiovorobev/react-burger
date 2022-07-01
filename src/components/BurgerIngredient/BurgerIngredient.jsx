import styles from './BurgerIngredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag} from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import {INGREDIENT_MODAL} from "../../services/actions/actions";
import {useDispatch, useSelector} from "react-redux";


export default function BurgerIngredient( {item, handleIngredientClick}) {
    const { ingredientsInConstructor } = useSelector(store => store);
  const bun = ingredientsInConstructor.find(el => el.item.type === 'bun');
    const [ingredientCount, setIngredientCount] = React.useState(0);
    const [{ getItemType, getItem, isDrag, isDrop }, ingredientRef] = useDrag({
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

  /*React.useMemo(() => {
      if (isDrag && isDrop && getItem.item._id === item._id && getItem.item.type === 'bun' && ingredientCount === 0) {
        setIngredientCount(ingredientCount + 2);
      } else if (isDrop && getItem.item._id !== item._id && getItem.item.type === 'bun' && item.type === 'bun') {
        setIngredientCount(0);
        console.log(getItem);
        console.log(item);
        console.log(isDrag);
        console.log(getItemType);
      }
      else if (ingredientsInConstructor.length >= 0 && item.type !== 'bun') {
        let count = 0;
        ingredientsInConstructor.forEach(itemInConstructor => {
          if (itemInConstructor.item._id === item._id) {
            count++;
          }
        });
        setIngredientCount(count);
      }
  }, [isDrop, isDrag, ingredientsInConstructor]);*/

  React.useMemo(() => {
    if (isDrag && getItem.item._id === item._id) {
      if (isDrop) {
        if (item.type === 'bun' && ingredientCount < 2) {
          setIngredientCount(ingredientCount + 2);
        } else if (item.type !== 'bun') {
          setIngredientCount(ingredientCount + 1);
        }
      }
    } else if (ingredientsInConstructor.length <= 0 ||
      bun && item.type === 'bun' && item._id !== bun.item._id) {
      setIngredientCount(0);
    } else if (item.type !== 'bun' && ingredientsInConstructor.length > 0) {
      let num = 0;
      ingredientsInConstructor.forEach(element => {
        if (element.item._id === item._id) {
          num++;
        }
      });
      setIngredientCount(num);
    }
  }, [isDrag, isDrop, ingredientsInConstructor, bun]);


  /*else if (ingredientsInConstructor.length > 0 && item.type !== 'bun') {
			let count = 0;
			ingredientsInConstructor.forEach(item => {
				if (item.item._id === item._id) {
					count++;
				}
			});
			setIngredientCount(count);
		}*/
    return (
      <li draggable ref={ingredientRef} className={`${styles.card} mb-8`} onClick={() => { handleIngredientClick(item) }}>
          {ingredientCount > 0 && <Counter count={ingredientCount} />}
          <img alt={item.name} src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
          <span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type='primary' /></span>
          <span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
      </li>
    )
}
