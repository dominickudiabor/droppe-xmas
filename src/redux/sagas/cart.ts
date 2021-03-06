import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loadUiWithFetchedWishList, setLoading } from 'redux/actions'
import {
  FetchWishList,
  FETCH_WISHLIST,
  PushApproveListToApi,
  PUSH_APPROVAL_LIST_TO_API,
} from 'redux/types/cart.types'
import cartService from 'services/cartService'
import { UpdatedListItems, WishList } from 'types'

const cartSagas = [
  takeEvery(FETCH_WISHLIST, onfetchWishListAndUpdateUi),
  takeLatest(PUSH_APPROVAL_LIST_TO_API, onPushApprovedListToApi),
]

export function* onfetchWishListAndUpdateUi({
  payload: { id, name },
}: FetchWishList) {
  try {
    yield put(setLoading(true))
    const wishList: WishList = yield call(cartService.fetchListPerChild, id)
    const updatedWishList: UpdatedListItems[] = yield call(
      cartService.loopListFetchProducts,
      wishList.products
    )
    yield put(loadUiWithFetchedWishList({ list: updatedWishList, name }))
    yield put(setLoading(false))
  } catch (error) {}
}

export function* onPushApprovedListToApi({
  payload: { list },
}: PushApproveListToApi) {
  try {
    yield put(setLoading(true))
    yield call(cartService.pushConfirmedListsToApi, list)
    yield put(setLoading(false))
  } catch (error) {}
}

export default cartSagas
