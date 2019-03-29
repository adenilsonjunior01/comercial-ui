<template>
    <div class="teste">
        <v-card class="card--flex-toolbar mt-4">
            <v-toolbar class="blue darken-3">
                <v-toolbar-title class="body-4 grey--text text--lighten-2 text-xs-center">Cadastro de Vagas</v-toolbar-title>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text >
                <v-flex xs12>
                    <FormCadastro/>
                </v-flex>
                <!-- CONFIGURAR O FORMULÁRIO DE ENVIO -->
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text >
                <v-flex xs12>
                    <ListOfItems/>
                </v-flex>
                <!-- CONFIGURAR O FORMULÁRIO DE ENVIO -->
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import FormCadastro from '@/components/FormCadastro'
import ListOfItems from '@/components/ListOfItems'

export default {
    components: { FormCadastro, ListOfItems }
}
</script>

<style>
    .teste {
        width: 960px !important;
    }
</style>
