<template>
  <v-container fluid>
    <v-flex xs12 class="text-xs-center" mt-4>
      <h1>{{name}}</h1>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-4>
      <v-alert type="error" dismissible v-model="alert">
        {{error}}
      </v-alert>
    </v-flex>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark outline slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" required :rules="titleRules" v-model="editedItem.title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description"  v-model="editedItem.description"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-checkbox label="Done?" v-model="editedItem.done"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" outline flat :disabled="loading" @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" outline :disabled="loading" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="red" dark outline class="mb-2" :to="{ name: 'Home' }">Cancel</v-btn>
    <v-flex xs12 class="text-xs-center" v-if="loading" mt-5>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="todos" 
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <tr>
        <td class="text-xs-center"><b>{{ props.item.title }}</b></td>
        <td class="text-xs-center"><b>{{ (props.item.done) ? 'Yes' : 'No' }}</b></td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-btn color="orange" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: function () {
      return {
        name: 'To Do',
        alert: false,
        dialog: false,
        headers: [
          { text: 'Title', value: '', sortable: false, align: 'center', },
          { text: 'Done', value: '', sortable: false, align: 'center', },
          { text: 'Actions', value: 'name', sortable: false, align: 'center', }
        ],
        titleRules: [r => !!r || 'Title is required'],
        editedIndex: -1,
        editedItem: {
          id: '',
          title: '',
          description: '',
          done: false,
        },
        defaultItem: {
          id: '',
          title: '',
          author: {},
          description: '',
          done: false,
        },
      };
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      error() {
        return this.$store.state.error;
      },
      loading() {
        return this.$store.state.loading;
      },
      todos() {
        return this.$store.state.todo;
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      error(value) {
        if (value) {
          this.alert = true;
        }
      },
      alert(value) {
        if (!value) {
          this.$store.commit('setError', null);
        }
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      async initialize () {
        await this.$store.dispatch('getTasks');
      },
      async updateItems () {
        // this.todos.splice(0, 0, this.$store.state.newTask);
      },
      editItem (item) {
        this.editedIndex = this.todos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem (item) {
        // const index = this.todos.indexOf(item);

        if (confirm('Are you sure you want to delete this item?')) {
          this.$store.dispatch('deleteTask', item);
          this.initialize();
        };
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async save () {
        if (this.editedItem.title) {
          if (this.editedIndex > -1) {
            Object.assign(this.todos[this.editedIndex], this.editedItem);
          } else {
            this.$store.dispatch('createTask', this.editedItem);
            this.initialize();
          };
          this.close();
        };
      },
    },
  }
</script>

<style scoped>
  td:-moz-drag-over {
    background-color: lightcyan;
  }
</style>

