import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

import React from 'react'

const CartIcon = () => {
  return (
    <div className='cart-icon-container'>
        <ShoppingIcon className='shopping-'/>
        <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon