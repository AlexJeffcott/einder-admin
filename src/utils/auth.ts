type CB = () => void

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: CB) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb: CB) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export {fakeAuth}