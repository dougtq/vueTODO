<template>
  <v-container fluid>
    <v-flex xs12 class="text-xs-center" mt-4>
      <h1>{{name}}</h1>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-4>
      <v-alert type="error" dismissible v-model="alert">
        {{ error }}
      </v-alert>
    </v-flex>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="orange" dark outline slot="activator" class="mb-2">New Item</v-btn>
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
                <v-checkbox label="Done?" :disabled="editedIndex === -1" v-model="editedItem.done"></v-checkbox>
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
    <v-btn color="teal" dark outline class="mb-2" @click="initialize">Refresh</v-btn>
    <v-flex xs12 class="text-xs-center" v-if="loading" mt-5>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1">
      <template slot="items" slot-scope="props">
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
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      name: 'To Do',
      alert: false,
      dialog: false,
      headers: [
        { text: 'Title', value: '', sortable: false, align: 'center', },
        { text: 'Done', value: '', sortable: false, align: 'center', },
        { text: 'Actions', value: 'name', sortable: false, align: 'center', }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        title: '',
        author: {},
        description: '',
        done: false,
      },
      defaultItem: {
        _id: '',
        title: '',
        author: {},
        description: '',
        done: false,
      },
      titleRules: [r => !!r || 'Title is required'],
    }),
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
        await this.$store.dispatch('getTasks')
        this.items = this.$store.state.todo
      },
      async updateItems () {
        this.items.splice(0, 0, this.$store.state.newTask)
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)

        if (confirm('Are you sure you want to delete this item?')) {
          this.$store.dispatch('deleteTask', item)
          if (this.error) {
            this.items.splice(index, 1)
          }
        }
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
            Object.assign(this.items[this.editedIndex], this.editedItem)
          } else {
            this.$store.dispatch('createTask', this.editedItem)
            // this.editedItem._id = this.$store.state.newTask._id
            this.editedItem.done = false
            this.items.splice(0, 0, this.editedItem)
          }
          this.close()
        }
      }
    }
  }
</script>
