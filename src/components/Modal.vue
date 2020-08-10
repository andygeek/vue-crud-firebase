<template>
  <div>
    <div
      class="modal fade"
      id="modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-header"
            :class="{'bg-primary text-white': type===0, 'bg-warning text-black': type != 0}"
          >
            <h5 class="modal-title" id="exampleModalLabel">{{type === 0 ? 'Add User': 'Edit User'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row m-1">
              <label class="col-3 col-form-label" for>Name:</label>
              <input type="text" class="form-control col-9" id="txt_name" v-model="name" />
            </div>
            <div class="form-row m-1">
              <label class="col-3 col-form-label" for>Last Name:</label>
              <input type="text" class="form-control col-9" id="txt_last_name" v-model="last_name" />
            </div>
            <div class="form-row m-1">
              <label class="col-3 col-form-label" for>Country:</label>
              <input type="text" class="form-control col-9" id="txt_country" v-model="country"/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click="btn_save()"
              id="save_add"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Save
              changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      // Type is 0 for add and 1 for edit
      type: 0,
      id: "",
      name: "",
      last_name: "",
      country: "",
    };
  },
  methods: {
    ...mapActions(["addUser, editUser"]),
    btn_save: function () {
      let obj = {
        name: this.name,
        last_name: this.last_name,
        country: this.country,
      };
      if (this.type === 0) {
        this.$store.dispatch("addUser", obj);
      } else {
        this.$store.dispatch("editUser", {id:this.id, user: obj});
      }
    },
    // methods that change type of modal
    add_init: function () {
      this.type = 0;
      this.name = "";
      this.last_name = "";
      this.country = "";
    },
    edit_init: function (item) {
      this.type = 1;
      this.id = item.id;
      this.name = item.name;
      this.last_name = item.last_name;
      this.country = item.country;
    },
  },
  computed: {},
};
</script>