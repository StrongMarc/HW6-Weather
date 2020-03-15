/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> */

 var customer = {
        firstName: "John",
        lastName: "Smith",
        age: 25,
        address: {
          streetAddress: "21 2nd Street",
          city: "New York",
          state: "NY",
          postalCode: "10021"
        },
        phoneNumber: [{
          type: "home",
          number: "212 555-1234"
        }, {
          type: "fax",
          number: "646 555-4567"
        }]
      };
      console.log(customer.firstName)
    console.log(customer["firstName"])
    