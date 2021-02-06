//If the user doesn't have a toke, we send it to login

export default function ({ store, redirect }) {
    store.dispatch('readToken')

    if (!store.state.auth) {
        return redirect('/login')
    }
}