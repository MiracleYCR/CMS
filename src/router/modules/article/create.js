import layout from '@/views/layout'

export default {
  path: '/article',
  name: 'articleCreate',
  component: layout,
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/article/create/index'
        ),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/article/create/index'
        ),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
