import {
  AggregatedChildConfirmList,
  ChildSpecificProperties,
  UpdatedListItems,
} from 'types'

const checkoutService = {
  createAggregatedList: async (wishlist: ChildSpecificProperties) => {
    try {
      let approvedList: UpdatedListItems[] = []
      let rejectedList: UpdatedListItems[] = []

      //extract the confirmation lists from the users data and aggregate it in an array
      for (const key in wishlist) {
        approvedList = [...approvedList, ...wishlist[key].approved]
        rejectedList = [...rejectedList, ...wishlist[key].discarded]
      }

      //loop through array and replace duplicates with increased quantity
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
    } catch (error) {
      return null
    }
  },

  findUnconfirmedItem: async (wishlist: ChildSpecificProperties) => {
    try {
      let combinedAggregatedList: AggregatedChildConfirmList = {}

      for (let key in wishlist) {
        let combinedList = [...wishlist[key].properties]

        const findUnconfirmed = combinedList.every(
          (a) => a.confirmed !== 'Pending'
        )

        combinedAggregatedList = {
          ...combinedAggregatedList,
          [key]: findUnconfirmed,
        }
      }
      return {
        aggregatedConfirmedList: combinedAggregatedList,
        allItemsConfirmed: [...Object.values(combinedAggregatedList)].every(
          (a) => a === true
        ),
      }
    } catch (error) {
      return null
    }
  },

  computeTotalOnListItems: async (list: UpdatedListItems[]) => {
    try {
      const computeDiscount = (a: UpdatedListItems) => {
        const result = a.price * a.quantity * (1 - (a.quantity * 10) / 100)
        return parseInt(result.toFixed(2))
      }

      const computeTotal = (a: UpdatedListItems) => {
        const result = a.price * a.quantity
        return parseInt(result.toFixed(2))
      }

      const discountTotal: number = list.reduce((acc, curr) => {
        if (curr.quantity === 1) return acc + curr.price
        return acc + computeDiscount(curr)
      }, 0)

      const withoutDiscount: number = list.reduce((acc, curr) => {
        if (curr.quantity === 1) return acc + curr.price
        return acc + computeTotal(curr)
      }, 0)

      return {
        before: +withoutDiscount.toFixed(2),
        after: +discountTotal.toFixed(2),
      }
    } catch (error) {
      return null
    }
  },
}

export default checkoutService
