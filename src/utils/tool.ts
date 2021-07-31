import { IPermission } from "../interface/types";

export const generateTree = (list: IPermission[], parentId?: string) => {
  let permissionList = JSON.parse(JSON.stringify(list)) 
  let pList: IPermission[] = [];
  permissionList.forEach((item: IPermission) => {
    item.key = item.id
    if (item.parentId === parentId) {
      item.children = generateTree(permissionList, item.id);
      pList.push(item)
    }
  })
  return pList

}


