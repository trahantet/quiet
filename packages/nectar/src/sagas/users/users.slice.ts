import { createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { parseCertificate } from '@quiet/identity'
import Certificate from 'pkijs/src/Certificate'
import { StoreKeys } from '../store.keys'
import { certificatesAdapter } from './users.adapter'
import { SendCertificatesResponse } from './users.types'

export class UsersState {
  public certificates: EntityState<Certificate> =
  certificatesAdapter.getInitialState()
}

export const usersSlice = createSlice({
  initialState: { ...new UsersState() },
  name: StoreKeys.Users,
  reducers: {
    // Utility action for testing purposes
    storeUserCertificate: (
      state,
      action: PayloadAction<{ certificate: string }>
    ) => {
      certificatesAdapter.addOne(
        state.certificates,
        parseCertificate(action.payload.certificate)
      )
    },
    responseSendCertificates: (
      state,
      action: PayloadAction<SendCertificatesResponse>
    ) => {
      certificatesAdapter.setAll(
        state.certificates,
        Object.values(action.payload.certificates).map((item) => {
          if (!item) {
            return
          }
          return parseCertificate(item)
        })
      )
    }
  }
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
