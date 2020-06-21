const app = new Vue({
  el: '#app',
  data: {
    firstName: '',
    lastName: '',
    email: '',
    ticketQuantity: 1,
    ticketType: 'general',
    referrals: [],
    specialRequests: '',
    purchaseAgreementSigned: false
  },
  computed: {
    fullName: {
      get: function() {
        if (this.firstName && this.lastName) {
          return this.firstName + ' ' + this.lastName;
        } else {
          return this.firstName || this.lastName;
        }
      },
      set: function(newFullName) {
        const names = newFullName.split(' ');

        if (names.length === 2) {
          this.firstName = names[0];
          this.lastName = names[1];
        }
        
        if (names.length <= 1) {
          this.firstName = names[0] || '';
          this.lastName = '';
        }
      }
    },
    ticketDescription: function() {
      let readableTicketType = 'General Admission';
      if (this.ticketType === 'vip') {
        readableTicketType = 'VIP';
      }

      let ticketPluralization = 'tickets';
      if (this.ticketQuantity === 1) {
        ticketPluralization = 'ticket';
      }

      return this.ticketQuantity + ' ' + readableTicketType + ' ' + ticketPluralization;
    }
  },
  watch: {
    specialRequests: function(newRequests, oldRequests) {
      if (newRequests.toLowerCase().includes('meet and greet') || 
          newRequests.toLowerCase().includes('meet-and-greet')) {
        this.ticketType = 'vip';
      }
    }
  },
  methods: {
    resetFields: function() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.ticketQuantity = 1;
      this.ticketType = 'general';
      this.referrals = [];
      this.specialRequests = '';
      this.purchaseAgreementSigned = false;
    }
  }
});

/*data - used for storing known dynamic values
computed - used for computing dynamic values based on known dynamic values 
— can additionally specify a setter by specifying get and set functions
— the setter will update other dynamic values when the computed value changes
watch - used for performing functionality when a specified dynamic value changes
methods - used for storing instance methods to be used throughout the app*/