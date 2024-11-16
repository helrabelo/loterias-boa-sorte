// import page from "./page";
import person from './documents/person'
import page from './documents/page'
import post from './documents/post'
import callToAction from './objects/callToAction'
import infoSection from './objects/infoSection'
import settings from './singletons/settings'
import link from './objects/link'
import blockContent from './objects/blockContent'

// New stuff

// Documents
import {futureGame} from './documents/futureGame'
import {loteryResult} from './documents/loteryResult'
// Objects
import {cidadeGanhador} from './objects/cidadeGanhador'
import {premiacao} from './objects/premiacao'
// Singletons
import {gameConfigs} from './singletons/gameConfigs'

export const schemaTypes = [
  // Singletons
  gameConfigs,
  settings,
  // Documents
  loteryResult,
  futureGame,
  page,
  post,
  person,
  // Objects
  premiacao,
  cidadeGanhador,
  blockContent,
  infoSection,
  callToAction,
  link,
]
