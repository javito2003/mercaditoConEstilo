export const state = () => ({
  auth: null,
});

export const mutations = {

  setAuth(state, auth) {
    state.auth = auth;
  },
  updateUserImage(state,image){
    state.userData.image = image;
  },
  
};

export const actions = {

  readToken() {
    let auth = null;
    try {
      auth = JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      console.log(error);
    }
    //saving auth in state
    this.commit("setAuth", auth);
  },
  

};

export const getters = {
  estarActivo: state => !!state.auth
}