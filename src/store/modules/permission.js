// import { asyncRouterMap, constantRouterMap } from '@/router'
import { constantRouterMap, componentsMap } from '@/router'
import Layout from '@/views/layout/Layout'

// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

function generateRouter(item, isParent) {
  var router = {
    path: item.path,
    name: item.name,
    meta: item.meta,
    // component: isParent ? Layout : () => import(item.component)
    component: isParent ? Layout : componentsMap[item.name]
  }
  return router
}
/**
 *将后台的路由表进行格式化
 * @param {*} asyncRouterMap
 */
function convertRouter(asyncRouterMap) {
  const accessedRouters = []
  if (asyncRouterMap) {
    asyncRouterMap.forEach(item => {
      var parent = generateRouter(item, true)
      var children = []
      if (item.children) {
        item.children.forEach(child => {
          children.push(generateRouter(child, false))
        })
      }
      parent.children = children
      accessedRouters.push(parent)
    })
  }
  accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {

    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { asyncRouterMap } = data
        const accessedRouters = convertRouter(asyncRouterMap)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
    // /**
    //  *旧的根据roles匹配路由
    //  * @param {*} param0
    //  * @param {*} data
    //  */
    // GenerateRoutes({ commit }, data) {
    //   return new Promise(resolve => {
    //     const { roles } = data
    //     let accessedRouters
    //     if (roles.indexOf('admin') >= 0) {
    //       accessedRouters = asyncRouterMap
    //     } else {
    //       accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    //     }
    //     console.log(accessedRouters)
    //     commit('SET_ROUTERS', accessedRouters)
    //     resolve()
    //   })
    // }
  }
}

export default permission
