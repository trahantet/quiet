import { type Socket } from '../../types'
import { all, takeEvery, cancelled } from 'typed-redux-saga'
import { publicChannelsActions } from './publicChannels.slice'
import { createChannelSaga } from './createChannel/createChannel.saga'
import { deleteChannelSaga } from './deleteChannel/deleteChannel.saga'
import { createGeneralChannelSaga } from './createGeneralChannel/createGeneralChannel.saga'
import { sendInitialChannelMessageSaga } from './createGeneralChannel/sendInitialChannelMessage.saga'
import { clearUnreadChannelsSaga } from './markUnreadChannels/markUnreadChannels.saga'
import { channelsReplicatedSaga } from './channelsReplicated/channelsReplicated.saga'
import { channelDeletionResponseSaga } from './channelDeletionResponse/channelDeletionResponse.saga'
import { sendIntroductionMessageSaga } from './sendIntroductionMessage/sendIntroductionMessage.saga'
import { createLogger } from '../../utils/logger'

const logger = createLogger('publicChannelsMasterSaga')

export function* publicChannelsMasterSaga(socket: Socket): Generator {
  logger.info('publicChannelsMasterSaga starting')
  try {
    yield all([
      takeEvery(publicChannelsActions.createChannel.type, createChannelSaga, socket),
      takeEvery(publicChannelsActions.deleteChannel.type, deleteChannelSaga, socket),
      takeEvery(publicChannelsActions.channelDeletionResponse.type, channelDeletionResponseSaga),
      takeEvery(publicChannelsActions.createGeneralChannel.type, createGeneralChannelSaga),
      takeEvery(publicChannelsActions.sendInitialChannelMessage.type, sendInitialChannelMessageSaga),
      takeEvery(publicChannelsActions.channelsReplicated.type, channelsReplicatedSaga),
      takeEvery(publicChannelsActions.setCurrentChannel.type, clearUnreadChannelsSaga),
      takeEvery(publicChannelsActions.sendIntroductionMessage.type, sendIntroductionMessageSaga),
    ])
  } finally {
    logger.info('publicChannelsMasterSaga stopping')
    if (yield cancelled()) {
      logger.info('publicChannelsMasterSaga cancelled')
    }
  }
}
