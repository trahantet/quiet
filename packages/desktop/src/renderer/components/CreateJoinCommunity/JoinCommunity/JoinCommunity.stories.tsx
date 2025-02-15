import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { withTheme } from '../../../storybook/decorators'

import PerformCommunityActionComponent, { PerformCommunityActionProps } from '../PerformCommunityActionComponent'
import { CommunityOwnership } from '@quiet/types'

import { createLogger } from '../../../logger'

const logger = createLogger('joinCommunity:stories')

const Template: ComponentStory<typeof PerformCommunityActionComponent> = args => {
  return <PerformCommunityActionComponent {...args} />
}

export const Component = Template.bind({})
export const ServerError = Template.bind({})

const args: PerformCommunityActionProps = {
  open: true,
  communityOwnership: CommunityOwnership.User,
  handleCommunityAction: function (value: string): void {
    logger.info('Joining community: ', value)
  },
  handleRedirection: function (): void {
    logger.info('Redirected to create community')
  },
  handleClose: function (): void {},
  isCloseDisabled: false,
  hasReceivedResponse: false,
  handleClickInputReveal: function (): void {},
  revealInputValue: false,
}

Component.args = args

const component: ComponentMeta<typeof PerformCommunityActionComponent> = {
  title: 'Components/JoinCommunity',
  decorators: [withTheme],
  component: PerformCommunityActionComponent,
}

export default component
