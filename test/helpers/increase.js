export const duration = {
  seconds: function (val) {
    return val
  },
  minutes: function (val) {
    return val * this.seconds(60)
  },
  hours: function (val) {
    return val * this.minutes(60)
  },
  days: function (val) {
    return val * this.hours(24)
  },
  weeks: function (val) {
    return val * this.days(7)
  },
  years: function (val) {
    return val * this.days(365)
  },
}

// Increases testrpc time by the passed duration in seconds
export function increaseTime(duration) {
  const id = Date.now()

  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [duration],
        id: id,
      },
      (err1) => {
        if (err1) return reject(err1)

        web3.currentProvider.send(
          {
            jsonrpc: '2.0',
            method: 'evm_mine',
            id: id + 1,
          },
          (err2, res) => {
            return err2 ? reject(err2) : resolve(res)
          }
        )
      }
    )
  })
}

export async function increaseBlocks(n) {
  for (let i = 0; i < n; i++) {
    await new Promise((resolve, reject) =>
      web3.currentProvider.send(
        {
          jsonrpc: '2.0',
          method: 'evm_mine',
          id: Date.now() + i,
        },
        (err2, res) => {
          return err2 ? reject(err2) : resolve(res)
        }
      )
    )
  }
}
