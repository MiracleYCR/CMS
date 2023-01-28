import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
import { createArticle, editArticle } from '@/api/article'

export const commitArticle = async (data) => {
  const result = await createArticle(data)
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return result
}

export const updateArticle = async (data) => {
  const result = await editArticle(data)
  ElMessage.success(i18n.global.t('msg.article.editorSuccess'))
  return result
}
