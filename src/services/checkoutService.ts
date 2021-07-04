import { ChildSpecificProperties } from 'redux/types/cart.types'
import { UpdatedListItems } from 'types'

export default {
  createAggregatedList: async (wishlist: ChildSpecificProperties) => {
    let approvedList: UpdatedListItems[] = []
    let rejectedList: UpdatedListItems[] = []
    for (const key in wishlist) {
      approvedList = [...approvedList, ...wishlist[key].approved]
      rejectedList = [...rejectedList, ...wishlist[key].discarded]
    }

    const mapApproved = new Map()
    approvedList.forEach((item) => {
      if (mapApproved.has(item.productId)) {
        mapApproved.get(item.productId).quantity++
      } else {
        mapApproved.set(item.productId, {
          ...item,
        })
      }
    })
    const updatedApprovedList: UpdatedListItems[] | [] = Array.from(
      mapApproved.values()
    )

    const mapRejected = new Map()
    rejectedList.forEach((item) => {
      if (mapRejected.has(item.productId)) {
        mapRejected.get(item.productId).quantity++
      } else {
        mapRejected.set(item.productId, {
          ...item,
        })
      }
    })
    const updatedRejectedList: UpdatedListItems[] | [] = Array.from(
      mapRejected.values()
    )

    return { updatedApprovedList, updatedRejectedList }
  },
}
