import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    setUsers: function(state, users) {
      state.users = users;
    },
  },
  actions: {
    // Get users
    getUsers: function(context) {
      let users = [];
      db.collection("users")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            let user = {
              id: doc.id,
              name: doc.data().name,
              last_name: doc.data().last_name,
              country: doc.data().country
            };
            users.push(user);
          });
          context.commit("setUsers", users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Add user
    addUser: function(context, obj) {
      console.log(obj);
      db.collection("users")
        .add(obj)
        .then(function(docRef) {
          // console.log("Document written with ID: ", docRef.id);
          // call to action getUsers
          context.dispatch('getUsers');
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    // Delete user
    deleteUser: function(context, id){
      db.collection("users")
        .doc(id)
        .delete()
        .then(function () {
          context.dispatch('getUsers');
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    // Edit user
    editUser: function(context, data){
      db.collection("users").doc(data.id).update(data.user).then(function () {
      context.dispatch('getUsers');
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
    }
  },
  modules: {},
});
