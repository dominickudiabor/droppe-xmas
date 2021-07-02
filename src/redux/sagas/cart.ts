import { call, put, takeEvery } from 'redux-saga/effects'
import {
  loadUiWithFetchedWishList,
  setLoading,
  updateConfirmedWishList,
  updateDiscardedWishList,
  wishlistItemStatus,
} from 'redux/actions'
import {
  ExecuteWishListItemStatus,
  EXECUTE_WISHLIST_ITEM_STATUS,
  FetchWishList,
  FETCH_WISHLIST,
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

export function* onExecuteWishlistStatusAlter({
  payload: { item, status, name },
}: ExecuteWishListItemStatus) {
  try {
    yield put(wishlistItemStatus({ item, status, name }))
    if (status === 'Confirmed') return yield put(updateConfirmedWishList(item))

    if (status === 'Discarded') return yield put(updateDiscardedWishList(item))
  } catch (error) {}
}

export default [
  takeEvery(FETCH_WISHLIST, onfetchWishListAndUpdateUi),
  takeEvery(EXECUTE_WISHLIST_ITEM_STATUS, onExecuteWishlistStatusAlter),
]
