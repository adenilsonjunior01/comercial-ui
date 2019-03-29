<template>
    <div>
      <v-card-title dark class="display-1">
          <span class="text-md-center">Listagem</span>
        </v-card-title>
      <hr/>
     <v-btn slot="activator" color="primary" small dark class="mb-2" @click="listingItem">Recarregar</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nomeProspecto" label="Nome Prospecto"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.valor" label="Valor"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="desserts"
        hide-actions
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.nomeProspecto }}</td>
          <td class="text-xs-center">{{ props.item.descricao }}</td>
          <td class="text-xs-center">{{ props.item.valor }}</td>
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
        <v-alert :value="true" color="error" icon="warning">
          Sem prospectos cadastrados :(
        </v-alert>
      </template>
      </v-data-table>
    </div>
</template>

<script>
export default {
    data: () => ({
    dialog: false,
    headers: [
      { text: 'Nome Prospecto', align: 'left', sortable: false, value: 'name'
      },
      { text: 'Descição', value: 'descricao', align: 'center', sortable: false },
      { text: 'Valor', value: 'valor', align: 'center', sortable: false },
      { text: 'Actions', value: 'name', align: 'center', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nomeProspecto: '',
      descricao: '',
      valor: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Prospecto'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
    this.listingItem()

  },

  methods: {
    initialize () {
      this.listingItem()
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Deseja realmente excluir esse Prospecto?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    // listingItem () {
    //   this.$http.get('/oportunidades')
    //     .then(resp => {
    //       // eslint-disable-next-line
    //       console.log(resp)
    //       this.desserts = resp.data
    //     })
        
    // }
  }
}
</script>

<style>
  .v-table__overflow {
    overflow-x: hidden !important;
  }
</style>
