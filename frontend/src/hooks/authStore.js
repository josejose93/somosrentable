let user = null
let listeners = []

export function getUser() {
  return user
}

export function setUser(newUser) {
  user = newUser
  listeners.forEach((cb) => cb())
}

export function subscribe(callback) {
  listeners.push(callback)
  return () => {
    listeners = listeners.filter((cb) => cb !== callback)
  }
}
