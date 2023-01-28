import request from '@/utils/request'

export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}

export const updateArticleList = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}

export const getArticleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}

export const createArticle = (data) => {
  return request({
    url: `/article/create`,
    method: 'POST',
    data
  })
}

export const editArticle = (data) => {
  return request({
    url: `/article/edit`,
    method: 'POST',
    data
  })
}
