<template>
  <div>
    <button
    @click="btn_add()"
      class="btn btn-primary my-3"
      data-toggle="modal"
      data-target="#modal"
      id="btn_add"
    >Add User</button>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.last_name}}</td>
          <td>{{item.country}}</td>
          <td>
            <button
            @click="btn_edit(item)"
              class="btn btn-warning btn-edit"
              data-toggle="modal"
              data-target="#modal"
              id="btn_edit"
              data-id="${element.id}"
            >Edit</button>
            <button
              @click="deleteUser(item.id)"
              class="btn btn-danger btn-delete ml-2"
              data-id="${element.id}"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal ref="modal"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "../components/Modal.vue";
export default {
  name: "Home",
  components: {
    Modal,
  },
  data() {
    return {
      modal: false
    };
  },
  created() {
    // Call getUsers action when the Home it's created
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    ...mapActions(["getUsers", "deleteUser"]),
    btn_add: function () {
      this.$refs.modal.add_init();
    },
    btn_edit: function (item) {
      this.$refs.modal.edit_init(item);
    },
  },
};
</script>
