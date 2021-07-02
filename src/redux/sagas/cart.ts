import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loadUiWithFetchedWishList, setLoading } from 'redux/actions'
import {
  FetchWishList,
  FETCH_WISHLIST,
  UPDATE_CONFIRMED_WISHLIST,
  UPDATE_DISCARDED_WISHLIST,
} from 'redux/types/cart.types'
import cartService from 'services/cartService'
import { UpdatedListItems, WishList } from 'types'

export function* onfetchWishListAndUpdateUi({
  payload: { id, name },
}: FetchWishList) {
  try {
    yield put(setLoading(true))
    const wishList: WishList = yield call(cartService.fetchListPerChild, id)
    wishList.products.map((a) => (a.quantity = 1))
    const updatedWishList: UpdatedListItems[] = yield call(
      cartService.loopListFetchProducts,
      wishList.products
    )
    yield put(loadUiWithFetchedWishList({ list: updatedWishList, name }))
    yield put(setLoading(false))
  } catch (error) {}
}

export default [
  takeEvery(FETCH_WISHLIST, onfetchWishListAndUpdateUi),
  takeLatest(UPDATE_CONFIRMED_WISHLIST, onUpdateConfirmedWishlist),
  takeLatest(UPDATE_DISCARDED_WISHLIST, onUpdateDiscardedWishlist),
]
