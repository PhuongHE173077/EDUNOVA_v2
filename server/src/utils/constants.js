import { env } from "~/config/environment"


export const WHITELIST_DOMAINS = [
  'http://localhost:5173',
  'http://localhost:3000'
]



export const DEFAULT_PAGE = 1


export const DEFAULT_ITEMS_PER_PAGE = 12


export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT

export const TYPE_QUESTION = {
  QUESTION: 'question',
  ASSIGNMENT: 'assignment'
}

export const ITEMS_PER_PAGE = 10

export const STATUS_EXAM = {
  PENDING: 'pending',
  START: 'start',
  FINISHED: 'finished',
  DOING: 'doing'
}