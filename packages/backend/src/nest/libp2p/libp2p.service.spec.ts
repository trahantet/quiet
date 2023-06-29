import { Test, TestingModule } from '@nestjs/testing'
import { TestModule } from '../common/test.module'
import { libp2pInstanceParams } from '../common/test.utils'
import { Libp2pModule } from './libp2p.module'
import { Libp2pService } from './libp2p.service'
import { Libp2pNodeParams } from './libp2p.types'

describe('Libp2pService', () => {
  let module: TestingModule
  let libp2pService: Libp2pService
  let params: Libp2pNodeParams

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestModule, Libp2pModule],
    }).compile()

    libp2pService = await module.resolve(Libp2pService)
    params = await libp2pInstanceParams()
  })

  afterAll(async () => {
    await libp2pService.libp2pInstance?.stop()
    await module.close()
  })

  it('inits libp2p', async () => {
    const libp2pInstance = await libp2pService.createInstance(params)
    expect(libp2pInstance).not.toBeNull()
    expect(libp2pInstance.peerId).toBe(params.peerId)
  })

  it('creates libp2p address with proper ws type (%s)', async () => {
    const libp2pAddress = libp2pService.createLibp2pAddress(params.localAddress, params.peerId.toString())
    expect(libp2pAddress).toStrictEqual(`/dns4/${params.localAddress}/tcp/443/wss/p2p/${params.peerId.toString()}`)
  })

  it('creates libp2p listen address', async () => {
    const libp2pListenAddress = libp2pService.createLibp2pListenAddress(params.listenAddresses[0])
    expect(libp2pListenAddress).toStrictEqual(`/dns4/${params.listenAddresses}/tcp/443/wss`)
  })
})
