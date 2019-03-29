<template>
    <div>
      <div dark class="display-1" style="margin-top: 30px;">
          <span class="text-md-center">Cadastro de Prospecto</span>
        </div>
      <v-form lazy-validation>
          <v-text-field
              v-model="prospecto.nomeProspecto"
              :rules="nameRules"
              label="Prospecto"
              required
              type="text"
          ></v-text-field>

          <v-text-field
              v-model="prospecto.descricao"
              :rules="prospectoRules"
              label="Descrição"
              required
              type="text"
          ></v-text-field>

          <v-text-field
              v-model.number="prospecto.valor"
              label="Valor"
              required
              prefix="R$"
              :error="valorInvalid || !Number.isInteger(prospecto.valor)"
              type="number"
          ></v-text-field>

          <v-btn color="success" @click.prevent="submit">Adicionar</v-btn>
          
      </v-form>
          
      <v-card-title dark class="display-1 text-md-center">
        <span class="">Listagem</span>
      </v-card-title>
      <v-data-table :headers="headers" :items="prospectos" hide-actions class="elevation-1">
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

    <!-- Dialog update/delete item -->
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
            <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 

    </div>
</template>

<script>

export default {
    data() {
        return {
            dialog: false,
            titleDialog: -1,
            prospectos: [],
            prospecto: {
                nomeProspecto: '',
                descricao: '',
                valor: 0,
            },

            defaultProspecto: {
                nomeProspecto: '',
                descricao: '',
                valor: 0,
            },
            
            editedItem: {
                nomeProspecto: '',
                descricao: '',
                valor: 0,
            },
            nameRules: [
                v => !!v || 'Campo obrigatório',
            ],
            prospectoRules: [
                v => !!v || 'Campo obrigatório',
            ],
            headers: [
                { text: 'Nome Prospecto', align: 'left', sortable: false, value: 'name' },
                { text: 'Descição', value: 'descricao', align: 'center', sortable: false },
                { text: 'Valor', value: 'valor', align: 'center', sortable: false },
                { text: 'Actions', value: 'name', align: 'center', sortable: false }
            ],
        }
    },
    
    computed: {
        valorInvalid() {
            return this.valor < 0
        },

        formTitle () {
            return this.titleDialog === -1 ? 'Novo Item' : 'Editar Prospecto'
        },
    },

    created () {
        this.initialize()
    },

    methods: {
        submit() {               
            this.$http.post('/oportunidades', {
                "nomeProspecto": this.prospecto.nomeProspecto,
                "descricao": this.prospecto.descricao,
                "valor": this.prospecto.valor
            })
            .then(() => {
                this.limpar()
                this.initialize()
            })
            .catch(error => {
                return error
            })
        },


        editItem (item) {
            // alterar o titulo do Dialog
            this.titleDialog = this.prospectos.indexOf(item)

            // Object.assign() faz uma copia de 'item' e atribui ao objeto 'editedItem'
            this.editedItem = Object.assign({}, item)

            this.dialog = true

            this.$http.put(`/oportunidades/${item.id}`, {
                "nomeProspecto": this.editedItem.nomeProspecto,
                "descricao": this.editedItem.descricao,
                "valor": this.editedItem.valor
            })
            .then(() => {
                this.initialize()
            })
        },

        deleteItem (item) {
            confirm('Deseja realmente excluir esse Prospecto?') && 
              this.$http.delete(`/oportunidades/${item.id}`)
                .then(() => this.initialize())
        },

        save () {
            // Se titleDialog for maior que 1, significa que tem Objeto e então entra na condicional
            if (this.titleDialog > -1) {
                // Faz uma copia do novo objeto e atribui ao array 'prospectos' e então faz o two-way data bind
                Object.assign(this.prospectos[this.titleDialog], this.editedItem)
            } else {
                this.prospectos.push(this.editedItem)
            }
            this.close()
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                // Reseta o formulário depois de
                this.editedItem = Object.assign({}, this.defaultProspecto)
                this.titleDialog = -1
            }, 300)
        },

        initialize () {
            this.listingItem()
        },

        listingItem() {
            this.$http.get('/oportunidades')
                .then(resp => { this.prospectos = resp.data})
                .catch(e => { return e })
        },

        limpar() {
            this.prospecto.nomeProspecto = ' ',
            this.prospecto.descricao = ' ',
            this.prospecto.valor = 0
        },
    },
    
}
</script>

<style>
    .v-table__overflow {
        overflow-x: hidden !important;
    }
</style>
