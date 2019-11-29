const Alert = class {
  constructor() {}

  getTemplate() {
    return new Promise(resolve => {
      let template = `
    <template >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div :class="[ 'modal-container', loadClass ] ">
            <div >
              {{options.title }}
            </div>

            <div :class="[loadClass]">
              {{options.message}}
            </div>

            <div class="row" v-if="type == 1">
              <button class="btn btn-outline-secondary col" @click="$emit('confirm', false)">Close</button>
            </div>

            <div class="row" v-if="type == 2">
              <button class="btn btn-outline-secondary col-6"  @click="$emit('confirm', false)">Cancel</button>
              <button class="btn btn-outline-dark col-6" @click="$emit('confirm', true)">Ok</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    export default {
      props:{
        options : {
          type: Object
        }
      },
      data () {
        return {
          loadClass: 'alert alert-info',
          type: 0
        }
      },
      methods: {
        setAlertType () {
          let alert = this.options.alert;

          if(alert == null){
            alert = 'info'
          }

          switch (alert) {
            case ("danger"):
                this.loadClass = 'alert alert-danger';
                this.type = 2;
              break;
            case ("info"):
                this.loadClass = 'alert alert-info';
              break;
            case ("success"):
                this.loadClass = 'alert alert-success';
              break;
            case ("warning"):
                this.loadClass = 'alert alert-warning';
                this.type = 1;
              break;
            case ("primary"):
                this.loadClass = 'alert alert-primary';
              break;
          }

        },
        /**
        * type equals 0 means that this modal disappear automatically after 1500 milliseconds
        * type equals 1 means that this modal  will have button close without timer
        * type equals 2 means that this modal will have button close and ok without timer
        */
        setTime () {
          if(this.options.type != null){
            this.type = this.options.type;
          }

          if (this.type < 1 || this.type > 2 || isNaN(this.type)) {
            setTimeout( () => {
              this.$emit('confirm', false);
            }, 1500);
          }
        }

      },
      async mounted() {
        await this.setAlertType();
        await this.setTime();
      }
    }
    </script>

    <style lang="css" scoped>
    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }
    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }
    .modal-container {
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
    </style>
    `;
      resolve(template);
    });
  }
};

module.exports = Alert;
