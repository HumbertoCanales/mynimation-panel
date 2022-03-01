<template>
  <div>
    <v-data-table
      v-if="!isLoading"
      :headers="headers"
      :items="studios"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>ESTUDIOS</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Agregar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                      <v-text-field
                        v-model="selectedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                    >
                      <v-text-field
                        v-model="selectedItem.description"
                        label="Descripción"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                ¿Estás seguro de borrar este elemento?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  Sí
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { mapActions, mapState } from 'vuex'

export default {
  setup() {
    return {
      isLoading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'NOMBRE', value: 'name' },
        { text: 'DESCRIPCIÓN', value: 'description' },
        { text: 'ACCIONES', value: 'actions' },
      ],
      editedIndex: -1,
      selectedItem: {
        id: '',
        name: '',
        description: '',
      },
      defaultItem: {
        id: '',
        name: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapState(['studios']),
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar estudio' : 'Editar estudio'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.close()
    },
  },
  created() {
    this.isLoading = true
    this.getStudios().then(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions(['getStudios', 'addStudio', 'editStudio', 'deleteStudio']),
    editItem(item) {
      this.editedIndex = this.studios.indexOf(item)
      this.selectedItem = { ...item }
      this.dialog = true
    },
    deleteItem(item) {
      this.selectedItem = { ...item }
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteStudio(this.selectedItem)
      this.close()
    },

    close() {
      this.dialog = false
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
        this.selectedItem = { ...this.defaultItem }
        this.isLoading = true
        this.getStudios().then(() => {
          this.isLoading = false
        })
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.editStudio(this.selectedItem)
      } else {
        this.addStudio(this.selectedItem)
      }
      this.close()
    },
  },
}
</script>
